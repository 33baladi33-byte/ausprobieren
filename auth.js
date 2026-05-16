/**
 * auth.js - نظام إدارة تسجيل الدخول والاشتراك لموقع Zertiva B2
 * مع إضافة نظام منع مشاركة الحساب (جهاز واحد لكل حساب)
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;

// ============================================
// نظام منع مشاركة الحساب - جهاز واحد لكل حساب
// ============================================

// إنشاء معرف جلسة فريد
function generateSessionId() {
    return Date.now() + '-' + Math.random().toString(36).substr(2, 16) + '-' + navigator.userAgent.substring(0, 20);
}

// الحصول على معرف الجهاز (بسيط)
function getDeviceId() {
    let deviceId = localStorage.getItem('zertiva_device_id');
    if (!deviceId) {
        deviceId = 'dev-' + Date.now() + '-' + Math.random().toString(36).substr(2, 10);
        localStorage.setItem('zertiva_device_id', deviceId);
    }
    return deviceId;
}

// تسجيل الدخول مع إنشاء جلسة
function registerSession(email) {
    const sessionId = generateSessionId();
    const deviceId = getDeviceId();
    const loginTime = Date.now();
    
    // حفظ جلسة هذا المستخدم
    localStorage.setItem('zertiva_session_id', sessionId);
    localStorage.setItem('zertiva_session_time', loginTime);
    
    // حفظ الجلسات النشطة لكل بريد
    const activeSessions = JSON.parse(localStorage.getItem('zertiva_active_sessions') || '{}');
    activeSessions[email] = {
        sessionId: sessionId,
        deviceId: deviceId,
        loginTime: loginTime,
        lastActive: loginTime
    };
    localStorage.setItem('zertiva_active_sessions', JSON.stringify(activeSessions));
    
    return true;
}

// التحقق من صحة الجلسة (هل هذا الجهاز هو النشط لهذا البريد)
function isSessionValid() {
    const email = localStorage.getItem('zertiva_email');
    const currentSession = localStorage.getItem('zertiva_session_id');
    const currentDevice = getDeviceId();
    
    if (!email || !currentSession) return true; // لا توجد جلسة، لا مشكلة
    
    const activeSessions = JSON.parse(localStorage.getItem('zertiva_active_sessions') || '{}');
    const sessionData = activeSessions[email];
    
    // إذا لم تكن هناك جلسة مسجلة لهذا البريد -> مسموح
    if (!sessionData) return true;
    
    // التحقق: نفس الجلسة ونفس الجهاز
    const isValid = (sessionData.sessionId === currentSession && sessionData.deviceId === currentDevice);
    
    if (!isValid) {
        console.log("⚠️ تم اكتشاف جلسة أخرى لنفس الحساب!");
    }
    
    return isValid;
}

// تحديث آخر نشاط
function updateLastActivity() {
    const email = localStorage.getItem('zertiva_email');
    const currentSession = localStorage.getItem('zertiva_session_id');
    
    if (!email || !currentSession) return;
    
    const activeSessions = JSON.parse(localStorage.getItem('zertiva_active_sessions') || '{}');
    if (activeSessions[email] && activeSessions[email].sessionId === currentSession) {
        activeSessions[email].lastActive = Date.now();
        localStorage.setItem('zertiva_active_sessions', JSON.stringify(activeSessions));
    }
    localStorage.setItem('zertiva_last_activity', Date.now());
}

// تسجيل الخروج مع إزالة الجلسة
function logoutUser(message) {
    const email = localStorage.getItem('zertiva_email');
    const currentSession = localStorage.getItem('zertiva_session_id');
    
    // إزالة الجلسة النشطة
    if (email) {
        const activeSessions = JSON.parse(localStorage.getItem('zertiva_active_sessions') || '{}');
        if (activeSessions[email] && activeSessions[email].sessionId === currentSession) {
            delete activeSessions[email];
            localStorage.setItem('zertiva_active_sessions', JSON.stringify(activeSessions));
        }
    }
    
    // مسح بيانات المستخدم
    localStorage.removeItem('zertiva_email');
    localStorage.removeItem('zertiva_password');
    localStorage.removeItem('zertiva_session_id');
    localStorage.removeItem('zertiva_session_time');
    localStorage.removeItem('zertiva_last_activity');
    
    if (message) {
        alert(message);
    }
    
    location.reload();
}

// مراقبة الجلسة بشكل مستمر (كل 5 ثواني)
let sessionMonitorInterval = null;

function startSessionMonitor() {
    if (sessionMonitorInterval) clearInterval(sessionMonitorInterval);
    
    sessionMonitorInterval = setInterval(() => {
        const isLoggedIn = localStorage.getItem('zertiva_email');
        if (isLoggedIn) {
            if (!isSessionValid()) {
                logoutUser("⚠️ تم تسجيل الدخول من جهاز آخر. تم تسجيل خروجك للحفاظ على أمان حسابك.");
            } else {
                updateLastActivity();
            }
        }
    }, 5000); // فحص كل 5 ثواني
}

// ============================================
// الدوال الأصلية (معدلة)
// ============================================

function getLoggedInEmail() {
    // التحقق من صحة الجلسة قبل إرجاع البريد
    if (!isSessionValid()) {
        return null;
    }
    return localStorage.getItem('zertiva_email');
}

function getLoggedInPassword() {
    if (!isSessionValid()) {
        return null;
    }
    return localStorage.getItem('zertiva_password');
}

function setLoggedInUser(email, password) {
    // تسجيل الجلسة الجديدة
    registerSession(email);
    localStorage.setItem('zertiva_email', email);
    localStorage.setItem('zertiva_password', password);
}

async function getPremiumUsers() {
    try {
        const response = await fetch('premium.json?_=' + Date.now());
        return await response.json();
    } catch(e) {
        return {};
    }
}

async function getUserStatus() {
    let email = getLoggedInEmail();
    if(!email) return 'guest';
    
    try {
        const premium = await getPremiumUsers();
        if(premium[email]) {
            let expiry = premium[email];
            let today = new Date().toISOString().slice(0,10);
            if(today <= expiry) {
                currentExpiry = expiry;
                return 'premium';
            } else {
                return 'expired';
            }
        }
        return 'free';
    } catch(e) {
        return 'free';
    }
}

async function getExpiryDate(email) {
    try {
        const premium = await getPremiumUsers();
        return premium[email] || null;
    } catch(e) {
        return null;
    }
}

function showLockedMessage(examTitle) {
    let modal = document.createElement('div');
    modal.id = 'lockedModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 100000;
        display: flex; justify-content: center; align-items: center;
        direction: rtl;
    `;
    
    modal.innerHTML = `
        <div style="background:white; border-radius:28px; padding:35px; max-width:360px; width:85%; text-align:center; box-shadow:0 25px 50px rgba(0,0,0,0.3); direction:rtl;">
            <div style="font-size:55px; margin-bottom:15px;">🔒</div>
            <h2 style="color:#2b5876; margin-bottom:12px; font-size:24px;">محـتوى مقفل</h2>
            <p style="color:#555; margin-bottom:20px;">المرجو ترقية الحساب للوصول لهذا المحتوى</p>
            <div style="background:#e9d5ff; padding:12px; border-radius:18px; margin-bottom:20px; color:#6b21a5; font-weight:bold;">📚 ${examTitle}</div>
            <p style="color:#888; margin-bottom:25px; font-size:14px;">يتطلب باقة: <strong style="color:#2b5876;">Pro</strong></p>
            <div style="display:flex; flex-direction:column; gap:12px; justify-content:center; align-items:center; margin-top:10px;">
                <button id="upgradeNowBtnModal" style="background:linear-gradient(135deg, #2b5876, #4e4376); color:white; border:none; padding:12px 28px; border-radius:50px; cursor:pointer; font-weight:bold; font-size:15px; width:80%;">🚀 ترقية الحساب الآن</button>
                <button id="closeModalBtn" style="background:#e2e8f0; border:none; padding:12px 28px; border-radius:50px; cursor:pointer; font-weight:bold; font-size:15px; color:#4a5568; width:80%;">ليس الآن</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let upgradeBtn = document.getElementById('upgradeNowBtnModal');
    let closeBtn = document.getElementById('closeModalBtn');
    
    if(upgradeBtn) {
        upgradeBtn.onclick = function() {
            window.location.href = 'subscribe.html';
        };
    }
    
    if(closeBtn) {
        closeBtn.onclick = function() {
            modal.remove();
        };
    }
    
    modal.onclick = function(e) {
        if(e.target === modal) modal.remove();
    };
}

async function updateProfileDropdown() {
    let email = getLoggedInEmail();
    let profileEmail = document.getElementById('profileEmail');
    let profileExpiry = document.getElementById('profileExpiry');
    let profileStatus = document.getElementById('profileStatus');
    let profileLogoutBtn = document.getElementById('profileLogoutBtn');
    let profileIcon = document.getElementById('profileIcon');
    let navLoginBtn = document.getElementById('navLoginBtn');
    let navSubscribeBtn = document.getElementById('navSubscribeBtn');
    
    if(!profileEmail) return;
    
    if(email) {
        const oldUpgradeBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldUpgradeBtn) oldUpgradeBtn.remove();
        
        let status = await getUserStatus();
        let expiry = currentExpiry;
        
        profileEmail.innerHTML = `📧 ${email}`;
        
        if(status === 'premium' && expiry) {
            let expiryDate = new Date(expiry);
            let formattedExpiry = `${expiryDate.getDate()}/${expiryDate.getMonth()+1}/${expiryDate.getFullYear()}`;
            profileExpiry.innerHTML = `📅 الصلاحية: حتى ${formattedExpiry}`;
            profileStatus.innerHTML = `✅ الحالة: <span class="status-premium">مشترك (Pro)</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        } else if(status === 'expired') {
            profileExpiry.innerHTML = `⏰ انتهت الصلاحية`;
            profileStatus.innerHTML = `⚠️ الحالة: <span class="status-free">منتهي</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        } else {
            profileExpiry.innerHTML = `📖 الوضع المجاني`;
            profileStatus.innerHTML = `⭐ الحالة: <span class="status-free">مجاني</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        }
        
        if(profileLogoutBtn) profileLogoutBtn.style.display = 'block';
        if(profileIcon) profileIcon.style.display = 'flex';
        if(navLoginBtn) navLoginBtn.style.display = 'none';
    } else {
        profileEmail.innerHTML = '👤 غير مسجل';
        profileExpiry.innerHTML = 'الوصول محدود لبعض الامتحانات';
        profileStatus.innerHTML = '';
        
        const upgradeBtn = document.createElement('button');
        upgradeBtn.id = 'dropdownUpgradeBtn';
        upgradeBtn.innerHTML = 'الترقية إلى الحساب الكامل →';
        upgradeBtn.style.cssText = `
            margin-top: 12px;
            background: #64748B;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 25px;
            cursor: pointer;
            width: 100%;
            font-size: 13px;
            font-weight: bold;
            transition: all 0.3s ease;
        `;
        upgradeBtn.onmouseenter = function() {
            this.style.background = '#475569';
        };
        upgradeBtn.onmouseleave = function() {
            this.style.background = '#64748B';
        };
        upgradeBtn.onclick = function() {
            showLoginPopup();
        };
        
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            const oldBtn = document.getElementById('dropdownUpgradeBtn');
            if (oldBtn) oldBtn.remove();
            dropdown.appendChild(upgradeBtn);
        }
        
        if(profileLogoutBtn) profileLogoutBtn.style.display = 'none';
        if(profileIcon) profileIcon.style.display = 'none';
        if(navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
    }
}

function toggleProfileDropdown() {
    let dropdown = document.getElementById('profileDropdown');
    if(dropdown) {
        dropdown.classList.toggle('show');
    }
}

function showLoginPopup() {
    let popup = document.getElementById('loginPopup');
    if(popup) popup.style.display = 'flex';
}

function hideLoginPopup() {
    let popup = document.getElementById('loginPopup');
    if(popup) popup.style.display = 'none';
}

async function handleLogin() {
    let email = document.getElementById('popupEmail').value.trim();
    let password = document.getElementById('popupPassword').value.trim();
    
    if(!email || !password) {
        alert("يرجى إدخال البريد الإلكتروني وكلمة السر");
        return;
    }
    
    setLoggedInUser(email, password);
    
    let status = await getUserStatus();
    if(status === 'premium') {
        let expiry = currentExpiry;
        let expiryDate = new Date(expiry);
        let formattedExpiry = `${expiryDate.getDate()}/${expiryDate.getMonth()+1}/${expiryDate.getFullYear()}`;
        alert(`✅ مرحباً ${email}\n🎉 حسابك مفعل حتى ${formattedExpiry}\nجميع الامتحانات متاحة لك.\n\n🔐 تنبيه: حسابك مقيد بجهاز واحد فقط. إذا دخلت من جهاز آخر، سيتم تسجيل خروجك من هذا الجهاز.`);
    } else if(status === 'expired') {
        alert(`⚠️ مرحباً ${email}\n⏰ انتهت صلاحية اشتراكك.\n✨ يرجى الاشتراك مرة أخرى.`);
    } else {
        alert(`✅ مرحباً ${email}\n📖 حسابك مجاني حالياً.\n✨ متاح لك فقط الامتحان الأول من كل قسم.\nللوصول إلى كل الامتحانات، اضغط "اشتراك" ثم ادفع.\n\n🔐 تنبيه: حسابك مقيد بجهاز واحد فقط.`);
    }
    
    hideLoginPopup();
    await updateProfileDropdown();
    
    if (status !== 'premium') {
        window.location.href = 'subscribe.html';
    } else {
        location.reload();
    }
}

async function setupLockedNextButton() {
    let status = await getUserStatus();
    let nextBtn = document.getElementById('nextExamBtn');
    
    if(nextBtn && status !== 'premium') {
        nextBtn.classList.add('locked-nav');
        let oldClick = nextBtn.onclick;
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLockedMessage("الامتحان التالي (يتطلب ترقية)");
            return false;
        };
    }
}

function bindAuthEvents() {
    let navLoginBtn = document.getElementById('navLoginBtn');
    if(navLoginBtn) navLoginBtn.addEventListener('click', showLoginPopup);
    
    let navSubscribeBtn = document.getElementById('navSubscribeBtn');
    if(navSubscribeBtn) navSubscribeBtn.addEventListener('click', () => {
        if(isUserLoggedIn()) {
            window.location.href = 'subscribe.html';
        } else {
            showLoginPopup();
        }
    });
    
    let popupLoginBtn = document.getElementById('popupLoginBtn');
    if(popupLoginBtn) popupLoginBtn.addEventListener('click', handleLogin);
    
    let closePopupBtn = document.getElementById('closePopupBtn');
    if(closePopupBtn) closePopupBtn.addEventListener('click', hideLoginPopup);
    
    let loginPopup = document.getElementById('loginPopup');
    if(loginPopup) {
        loginPopup.addEventListener('click', function(e) {
            if(e.target === loginPopup) hideLoginPopup();
        });
    }
    
    let profileIcon = document.getElementById('profileIcon');
    if(profileIcon) profileIcon.addEventListener('click', toggleProfileDropdown);
    
    let profileLogoutBtn = document.getElementById('profileLogoutBtn');
    if(profileLogoutBtn) profileLogoutBtn.addEventListener('click', () => logoutUser("تم تسجيل الخروج بنجاح"));
    
    let logoHomeBtn = document.getElementById('logoHomeBtn');
    if(logoHomeBtn) {
        logoHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    document.addEventListener('click', function(e) {
        let dropdown = document.getElementById('profileDropdown');
        let profileIconElem = document.getElementById('profileIcon');
        if(dropdown && profileIconElem && !profileIconElem.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function observePageChanges() {
    const observer = new MutationObserver(() => {
        let listPage = document.getElementById('list');
        if(listPage && listPage.classList.contains('active')) {
            setTimeout(setupLockedNextButton, 300);
        }
        let examPage = document.getElementById('exam');
        if(examPage && examPage.classList.contains('active')) {
            setTimeout(setupLockedNextButton, 300);
        }
    });
    
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
}

async function initAuth() {
    bindAuthEvents();
    await updateProfileDropdown();
    observePageChanges();
    setTimeout(setupLockedNextButton, 800);
    startSessionMonitor(); // بدء مراقبة الجلسة
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}
