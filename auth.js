/**
 * auth.js - نظام إدارة تسجيل الدخول والاشتراك لموقع Zertiva B2
 * ✅ مع إضافة نظام منع الدخول المتعدد (جلسة واحدة لكل حساب)
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;

const YOUCAN_STORE_URL = 'https://zertivab2.youcan.store/';

// ============================================
// 🔒 نظام الجلسات النشطة (منع الدخول المتعدد)
// ============================================

// تخزين الجلسات النشطة في localStorage مؤقتاً
// في حالة وجود خادم، يفضل تخزينها في قاعدة البيانات
const ACTIVE_SESSIONS_KEY = 'zertiva_active_sessions';

function getActiveSessions() {
    try {
        const data = localStorage.getItem(ACTIVE_SESSIONS_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function saveActiveSessions(sessions) {
    localStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(sessions));
}

function isSessionActive(email) {
    const sessions = getActiveSessions();
    const sessionData = sessions[email];
    
    if (!sessionData) return false;
    
    // التحقق من انتهاء الصلاحية (5 دقائق من آخر نشاط)
    const now = Date.now();
    const inactiveTime = now - sessionData.lastActivity;
    
    // إذا كان غير نشط لأكثر من 5 دقائق، نعتبر الجلسة منتهية
    if (inactiveTime > 5 * 60 * 1000) {
        delete sessions[email];
        saveActiveSessions(sessions);
        return false;
    }
    
    return true;
}

function activateSession(email) {
    const sessions = getActiveSessions();
    sessions[email] = {
        sessionId: generateSessionId(),
        lastActivity: Date.now(),
        createdAt: Date.now()
    };
    saveActiveSessions(sessions);
}

function terminateSession(email) {
    const sessions = getActiveSessions();
    delete sessions[email];
    saveActiveSessions(sessions);
}

function updateSessionActivity(email) {
    const sessions = getActiveSessions();
    if (sessions[email]) {
        sessions[email].lastActivity = Date.now();
        saveActiveSessions(sessions);
    }
}

function generateSessionId() {
    return 'sid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ============================================
// دوال تسجيل الدخول الأساسية
// ============================================

function getLoggedInEmail() {
    return localStorage.getItem('zertiva_email');
}

function getLoggedInPassword() {
    return localStorage.getItem('zertiva_password');
}

function setLoggedInUser(email, password) {
    localStorage.setItem('zertiva_email', email);
    localStorage.setItem('zertiva_password', password);
}

function logoutUser() {
    const email = getLoggedInEmail();
    if (email) {
        terminateSession(email);
    }
    localStorage.removeItem('zertiva_email');
    localStorage.removeItem('zertiva_password');
    alert("تم تسجيل الخروج بنجاح");
    location.reload();
}

function isUserLoggedIn() {
    return getLoggedInEmail() !== null;
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
    
    // التحقق من الجلسة النشطة
    if (!isSessionActive(email)) {
        // الجلسة غير نشطة - تسجيل الخروج التلقائي
        localStorage.removeItem('zertiva_email');
        localStorage.removeItem('zertiva_password');
        return 'guest';
    }
    
    // تحديث وقت النشاط
    updateSessionActivity(email);
    
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

// ========== نافذة الاشتراك المنبثقة ==========
function showLockedMessage(examTitle) {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.classList.add('active');
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
        
        // إضافة زر الترقية للمستخدم غير المسجل
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
            const modal = document.getElementById('subscriptionModal');
            if (modal) modal.classList.add('active');
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
    
    // ✅ التحقق من وجود جلسة نشطة لنفس البريد
    if (isSessionActive(email)) {
        const confirmTerminate = confirm(
            `⚠️ هذا الحساب (${email}) مستخدم حالياً من قبل شخص آخر.\n\n` +
            `هل تريد طرد الجلسة القديمة والدخول؟`
        );
        
        if (!confirmTerminate) {
            return; // المستخدم رفض الدخول
        }
        
        // إنهاء الجلسة القديمة
        terminateSession(email);
        alert(`✅ تم طرد الجلسة القديمة. يمكنك الدخول الآن.`);
    }
    
    // تسجيل الدخول
    setLoggedInUser(email, password);
    
    // تفعيل الجلسة الجديدة
    activateSession(email);
    
    let status = await getUserStatus();
    if(status === 'premium') {
        let expiry = currentExpiry;
        let expiryDate = new Date(expiry);
        let formattedExpiry = `${expiryDate.getDate()}/${expiryDate.getMonth()+1}/${expiryDate.getFullYear()}`;
        alert(`✅ مرحباً ${email}\n🎉 حسابك مفعل حتى ${formattedExpiry}\nجميع الامتحانات متاحة لك.`);
    } else if(status === 'expired') {
        alert(`⚠️ مرحباً ${email}\n⏰ انتهت صلاحية اشتراكك.\n✨ يرجى الاشتراك مرة أخرى.`);
    } else {
        alert(`✅ مرحباً ${email}\n📖 حسابك مجاني حالياً.\n✨ متاح لك فقط الامتحان الأول من كل قسم.\nللوصول إلى كل الامتحانات، اضغط "اشتراك" ثم ادفع.`);
    }
    
    hideLoginPopup();
    await updateProfileDropdown();
    location.reload();
}

async function setupLockedNextButton() {
    let status = await getUserStatus();
    let nextBtn = document.getElementById('nextExamBtn');
    
    if(nextBtn && status !== 'premium') {
        nextBtn.classList.add('locked-nav');
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modal = document.getElementById('subscriptionModal');
            if (modal) modal.classList.add('active');
            return false;
        };
    }
}

function bindAuthEvents() {
    let navLoginBtn = document.getElementById('navLoginBtn');
    if(navLoginBtn) navLoginBtn.addEventListener('click', showLoginPopup);
    
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
    if(profileLogoutBtn) profileLogoutBtn.addEventListener('click', logoutUser);
    
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

// ============================================
// تحديث النشاط كل دقيقة (للحفاظ على الجلسة)
// ============================================

setInterval(() => {
    const email = getLoggedInEmail();
    if (email && isSessionActive(email)) {
        updateSessionActivity(email);
    }
}, 60000); // كل 60 ثانية

// ============================================
// عند إغلاق المتصفح أو المغادرة
// ============================================

window.addEventListener('beforeunload', function() {
    const email = getLoggedInEmail();
    if (email) {
        // لا نحذف الجلسة فوراً، بل تبقى 5 دقائق
        // حتى يتمكن المستخدم من العودة بسرعة
    }
});

// ============================================
// تحسين مظهر الهواتف في auth.js
// ============================================

function applyMobileAuthStyles() {
    if (window.innerWidth <= 768) {
        const loginPopupContent = document.querySelector('.login-popup-content');
        if (loginPopupContent) {
            loginPopupContent.style.padding = '20px';
            loginPopupContent.style.width = '280px';
            loginPopupContent.style.borderRadius = '20px';
        }
        
        const popupTitle = document.querySelector('.login-popup-content h3');
        if (popupTitle) popupTitle.style.fontSize = '1rem';
        
        const popupText = document.querySelector('.login-popup-content p');
        if (popupText) popupText.style.fontSize = '11px';
        
        const inputs = document.querySelectorAll('.login-popup-content input');
        inputs.forEach(input => {
            input.style.padding = '8px';
            input.style.fontSize = '12px';
        });
        
        const btns = document.querySelectorAll('.btn-popup-login, .btn-popup-close');
        btns.forEach(btn => {
            btn.style.padding = '8px';
            btn.style.fontSize = '12px';
        });
        
        const profileDropdown = document.querySelector('.profile-dropdown');
        if (profileDropdown) {
            profileDropdown.style.minWidth = '220px';
            profileDropdown.style.padding = '12px 15px';
        }
        
        const profileEmail = document.querySelector('.profile-email');
        if (profileEmail) profileEmail.style.fontSize = '11px';
        
        const profileExpiry = document.querySelector('.profile-expiry');
        if (profileExpiry) profileExpiry.style.fontSize = '10px';
        
        const profileStatus = document.querySelector('.profile-status');
        if (profileStatus) profileStatus.style.fontSize = '10px';
        
        const profileLogout = document.querySelector('.profile-logout');
        if (profileLogout) {
            profileLogout.style.padding = '6px 12px';
            profileLogout.style.fontSize = '11px';
        }
        
        const dropdownUpgradeBtn = document.getElementById('dropdownUpgradeBtn');
        if (dropdownUpgradeBtn) {
            dropdownUpgradeBtn.style.padding = '8px 12px';
            dropdownUpgradeBtn.style.fontSize = '11px';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyMobileAuthStyles();
});

const originalShowLoginPopup = window.showLoginPopup;
if (originalShowLoginPopup) {
    window.showLoginPopup = function() {
        originalShowLoginPopup();
        setTimeout(applyMobileAuthStyles, 50);
    };
}

const originalShowLockedMessage = window.showLockedMessage;
if (originalShowLockedMessage) {
    window.showLockedMessage = function(examTitle) {
        originalShowLockedMessage(examTitle);
        setTimeout(applyMobileAuthStyles, 50);
    };
}

const originalUpdateProfileDropdown = window.updateProfileDropdown;
if (originalUpdateProfileDropdown) {
    window.updateProfileDropdown = async function() {
        await originalUpdateProfileDropdown();
        setTimeout(applyMobileAuthStyles, 50);
    };
}
