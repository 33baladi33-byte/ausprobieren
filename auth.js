/**
 * auth.js - نظام إدارة تسجيل الدخول والجلسات
 * ✅ سريع
 * ✅ يعرض بطاقة ترحيب أنيقة في وسط الشاشة
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;
let isLoggingIn = false;
let sessionChecked = false;

// ============================================
// دوال الجلسة (localStorage)
// ============================================

function getLoggedInEmail() {
    return localStorage.getItem('zertiva_email');
}

function getSessionToken() {
    return localStorage.getItem('zertiva_session_token');
}

function getDeviceId() {
    return localStorage.getItem('zertiva_device_id');
}

function setSessionData(email, sessionToken, deviceId) {
    localStorage.setItem('zertiva_email', email);
    localStorage.setItem('zertiva_session_token', sessionToken);
    localStorage.setItem('zertiva_device_id', deviceId);
}

function clearSessionData() {
    localStorage.removeItem('zertiva_email');
    localStorage.removeItem('zertiva_session_token');
    localStorage.removeItem('zertiva_device_id');
}

function isUserLoggedIn() {
    return getLoggedInEmail() !== null && getSessionToken() !== null;
}

// ============================================
// بطاقة ترحيب أنيقة (بديل Toast)
// ============================================

function showWelcomeCard(email, isPremium, expiryDate) {
    // إزالة أي بطاقة موجودة
    const existing = document.querySelector('.welcome-overlay');
    if (existing) existing.remove();
    
    // إنشاء الخلفية
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    
    // إنشاء البطاقة
    const card = document.createElement('div');
    card.className = 'welcome-card';
    
    let icon, iconClass, statusText, message, buttonHtml = '';
    
    if (isPremium) {
        // ✅ حساب مفعل
        icon = '🎉';
        iconClass = 'premium';
        const formattedExpiry = formatDate(expiryDate);
        statusText = `حسابك <span class="premium-date">مفعل</span> حتى`;
        message = `
            <div style="font-size: 1.3rem; font-weight: 700; color: #38bdf8; margin: 4px 0;">${formattedExpiry}</div>
            <div style="color: #9ca3af; font-size: 0.8rem;">استمتع بجميع الامتحانات والمميزات</div>
        `;
    } else {
        // ✅ حساب مجاني
        icon = '✅';
        iconClass = 'free';
        statusText = 'حسابك <span class="highlight">مجاني</span> حالياً';
        message = `
            <div style="color: #d1d5db; font-size: 0.85rem; margin-top: 2px;">📚 متاح <span style="color: #ffd54f;">بعض الامتحانات</span> من كل قسم</div>
            <div style="color: #9ca3af; font-size: 0.8rem; margin-top: 6px;">✨ للوصول الكامل، اضغط <span style="color: #38bdf8;">"اشتراك"</span></div>
        `;
        buttonHtml = `<button class="welcome-subscribe-btn" id="welcomeSubscribeBtn">✨ اشترك الآن</button>`;
    }
    
    // بناء البطاقة
    card.innerHTML = `
        <div class="welcome-icon ${iconClass}">${icon}</div>
        <div class="welcome-title">مرحباً 👋</div>
        <div class="welcome-email">${email}</div>
        <div class="welcome-divider"></div>
        <div class="welcome-status">${statusText}</div>
        ${isPremium ? `<div style="font-size: 1.3rem; font-weight: 700; color: #38bdf8; margin: 4px 0;">${formatDate(expiryDate)}</div>` : ''}
        <div class="welcome-message">${isPremium ? 'استمتع بجميع الامتحانات والمميزات' : '📚 متاح بعض الامتحانات من كل قسم<br>✨ للوصول الكامل، اضغط "اشتراك"'}</div>
        ${buttonHtml}
    `;
    
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    
    // ظهور البطاقة
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    
    // إغلاق البطاقة بالضغط خارجها
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeWelcomeCard(overlay);
        }
    });
    
    // ✅ زر الاشتراك - يذهب إلى subscribe.html
    const subscribeBtn = document.getElementById('welcomeSubscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWelcomeCard(overlay);
            window.location.href = 'subscribe.html';
        });
    }
}

function closeWelcomeCard(overlay) {
    if (!overlay) return;
    overlay.classList.remove('active');
    setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
}

// ============================================
// بطاقة صغيرة (للحالات السريعة)
// ============================================

function showCenterToast(message, type = 'info', duration = 500) {
    const existing = document.querySelector('.zertiva-center-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'zertiva-center-toast';
    
    const bgColor = 'rgba(56, 189, 248, 0.92)';
    
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: ${bgColor};
        color: #0a0e1a;
        padding: 12px 24px;
        border-radius: 16px;
        z-index: 99999;
        max-width: 90%;
        width: auto;
        min-width: 200px;
        max-width: 400px;
        font-size: 13px;
        line-height: 1.6;
        text-align: center;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        font-weight: 500;
        opacity: 0;
        transition: all 0.15s ease;
        pointer-events: auto;
        cursor: pointer;
        border: 1px solid rgba(255,255,255,0.2);
        direction: rtl;
        word-break: break-word;
    `;
    
    if (window.innerWidth <= 768) {
        toast.style.padding = '8px 16px';
        toast.style.fontSize = '11px';
        toast.style.minWidth = '150px';
        toast.style.maxWidth = '85%';
        toast.style.borderRadius = '12px';
    }
    
    toast.innerHTML = message.replace(/\n/g, '<br>');
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    toast.onclick = function(e) {
        e.stopPropagation();
        closeCenterToast(toast);
    };
    
    const closeHandler = function(e) {
        if (!toast.contains(e.target)) {
            closeCenterToast(toast);
            document.removeEventListener('click', closeHandler);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeHandler);
    }, 100);
    
    setTimeout(() => {
        closeCenterToast(toast);
        document.removeEventListener('click', closeHandler);
    }, duration);
}

function closeCenterToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -50%) scale(0.9)';
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 150);
}

// ============================================
// نافذة انتهاء الجلسة
// ============================================

function showSessionExpiredModal() {
    const existing = document.getElementById('sessionExpiredModal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'sessionExpiredModal';
    modal.className = 'zertiva-modal';
    modal.innerHTML = `
        <div class="zertiva-modal-content">
            <div class="modal-icon">🔐</div>
            <h3 class="modal-title">تم تسجيل الدخول من جهاز آخر</h3>
            <p class="modal-text">
                تم تسجيل الدخول إلى هذا الحساب من جهاز آخر.<br>
                يرجى إدخال البريد الإلكتروني مرة أخرى.
            </p>
            <div class="modal-buttons">
                <button class="modal-btn primary" id="sessionExpiredOkBtn">حسناً</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    document.getElementById('sessionExpiredOkBtn').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            clearSessionData();
            location.reload();
        }, 300);
    };
}

// ============================================
// الحصول على حالة المستخدم
// ============================================

async function getUserStatus() {
    const email = getLoggedInEmail();
    if (!email) return 'guest';
    
    try {
        const result = await checkUser(email);
        if (result && result.exists && result.expiry) {
            const today = new Date().toISOString().slice(0, 10);
            if (today <= result.expiry) {
                currentExpiry = result.expiry;
                return 'premium';
            } else {
                return 'free';
            }
        }
        return 'free';
    } catch (e) {
        return 'free';
    }
}

async function getExpiryDate(email) {
    try {
        const result = await checkUser(email);
        if (result && result.exists && result.expiry) {
            return result.expiry;
        }
        return null;
    } catch (e) {
        return null;
    }
}

function formatDate(dateString) {
    if (!dateString) return 'غير محدد';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    } catch(e) {
        return dateString;
    }
}

// ============================================
// تحديث القائمة المنسدلة للمستخدم
// ============================================

async function updateProfileDropdown() {
    const email = getLoggedInEmail();
    const profileEmail = document.getElementById('profileEmail');
    const profileExpiry = document.getElementById('profileExpiry');
    const profileStatus = document.getElementById('profileStatus');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const profileIcon = document.getElementById('profileIcon');
    const navLoginBtn = document.getElementById('navLoginBtn');
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    
    if (!profileEmail) return;
    
    if (email) {
        const oldUpgradeBtn = document.getElementById('dropdownUpgradeBtn');
        if (oldUpgradeBtn) oldUpgradeBtn.remove();
        
        const status = await getUserStatus();
        const expiry = currentExpiry;
        
        profileEmail.innerHTML = `📧 ${email}`;
        
        if (status === 'premium' && expiry) {
            const expiryDate = new Date(expiry);
            const formattedExpiry = `${expiryDate.getDate()}/${expiryDate.getMonth()+1}/${expiryDate.getFullYear()}`;
            profileExpiry.innerHTML = `📅 الصلاحية: حتى ${formattedExpiry}`;
            profileStatus.innerHTML = `✅ <span style="color: #10b981;">مشترك (Pro)</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'none';
        } else {
            profileExpiry.innerHTML = `⏰ انتهت الصلاحية`;
            profileStatus.innerHTML = `📖 <span style="color: #94a3b8;">مجاني</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        }
        
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'block';
        if (profileIcon) profileIcon.style.display = 'flex';
        if (navLoginBtn) navLoginBtn.style.display = 'none';
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
        upgradeBtn.onclick = () => {
            window.location.href = 'subscribe.html';
        };
        
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            const oldBtn = document.getElementById('dropdownUpgradeBtn');
            if (oldBtn) oldBtn.remove();
            dropdown.appendChild(upgradeBtn);
        }
        
        if (profileLogoutBtn) profileLogoutBtn.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'none';
        if (navLoginBtn) navLoginBtn.style.display = 'inline-block';
        if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
    }
}

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function showLoginPopup() {
    const popup = document.getElementById('loginPopup');
    if (popup) popup.style.display = 'flex';
}

function hideLoginPopup() {
    const popup = document.getElementById('loginPopup');
    if (popup) popup.style.display = 'none';
}

// ============================================
// تسجيل الخروج
// ============================================

function logoutUser(showMessage = true) {
    const email = getLoggedInEmail();
    if (email) {
        logoutWithGoogleSheets(email);
    }
    clearSessionData();
    sessionChecked = false;
    if (showMessage) {
        showCenterToast('تم تسجيل الخروج بنجاح', 'info', 500);
    }
    setTimeout(() => location.reload(), 300);
}

// ============================================
// نافذة الاشتراك - توجيه إلى subscribe.html
// ============================================

function showLockedMessage(examTitle) {
    window.location.href = 'subscribe.html';
}

// ============================================
// معالجة تسجيل الدخول
// ============================================

async function handleLogin() {
    if (isLoggingIn) return;
    
    const email = document.getElementById('popupEmail').value.trim();
    const password = document.getElementById('popupPassword').value.trim();
    
    if (!email || !password) {
        showCenterToast('يرجى إدخال البريد الإلكتروني وكلمة السر', 'info', 500);
        return;
    }
    
    isLoggingIn = true;
    const loginBtn = document.getElementById('popupLoginBtn');
    if (loginBtn) {
        loginBtn.textContent = '⏳ جاري التحميل...';
        loginBtn.disabled = true;
    }
    
    try {
        const result = await loginWithGoogleSheets(email);
        
        if (loginBtn) {
            loginBtn.textContent = 'دخول / إنشاء حساب';
            loginBtn.disabled = false;
        }
        
        if (!result.success) {
            if (result.status === 'expired') {
                showCenterToast('⏰ انتهت صلاحية اشتراكك.', 'info', 500);
                return;
            } else if (result.status === 'connection_error') {
                showCenterToast('⚠️ خطأ في الاتصال. حاول مرة أخرى.', 'info', 500);
                return;
            } else {
                showCenterToast(result.message || 'حدث خطأ', 'info', 500);
                return;
            }
        }
        
        if (result.sessionToken) {
            setSessionData(email, result.sessionToken, getDeviceId());
        } else {
            setSessionData(email, result.sessionToken || 'temp', getDeviceId());
        }
        
        sessionChecked = false;
        await updateProfileDropdown();
        hideLoginPopup();
        
        // ✅ عرض بطاقة الترحيب الأنيقة
        const status = await getUserStatus();
        if (status === 'premium') {
            showWelcomeCard(email, true, result.expiry);
        } else {
            showWelcomeCard(email, false, null);
        }
        
        setTimeout(() => location.reload(), 300);
        
    } catch (error) {
        showCenterToast('حدث خطأ: ' + error.message, 'info', 500);
    } finally {
        isLoggingIn = false;
        if (loginBtn) {
            loginBtn.textContent = 'دخول / إنشاء حساب';
            loginBtn.disabled = false;
        }
    }
}

// ============================================
// ربط الأحداث
// ============================================

function bindAuthEvents() {
    const navLoginBtn = document.getElementById('navLoginBtn');
    if (navLoginBtn) navLoginBtn.onclick = showLoginPopup;
    
    const popupLoginBtn = document.getElementById('popupLoginBtn');
    if (popupLoginBtn) popupLoginBtn.onclick = handleLogin;
    
    const closePopupBtn = document.getElementById('closePopupBtn');
    if (closePopupBtn) closePopupBtn.onclick = hideLoginPopup;
    
    const loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
        loginPopup.onclick = function(e) {
            if (e.target === loginPopup) hideLoginPopup();
        };
    }
    
    const profileIcon = document.getElementById('profileIcon');
    if (profileIcon) profileIcon.onclick = toggleProfileDropdown;
    
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    if (profileLogoutBtn) profileLogoutBtn.onclick = () => logoutUser(true);
    
    const logoBtn = document.getElementById('logoHomeBtn');
    if (logoBtn) {
        logoBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }
    
    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        notificationBell.onclick = function(e) {
            e.preventDefault();
            const dropdown = document.getElementById('notificationDropdown');
            if (dropdown) dropdown.classList.toggle('active');
        };
    }
    
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.onclick = function(e) {
            e.preventDefault();
            const modal = document.getElementById('settingsModal');
            if (modal) modal.classList.add('active');
        };
    }
    
    // ✅ زر اشتراك في الشريط العلوي
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    if (navSubscribeBtn) {
        navSubscribeBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'subscribe.html';
        };
    }
    
    // ✅ زر اشتراك في الصفحة الرئيسية
    const featuresSubscribeBtn = document.getElementById('featuresSubscribeBtn');
    if (featuresSubscribeBtn) {
        featuresSubscribeBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'subscribe.html';
        };
    }
    
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('profileDropdown');
        const profileIconElem = document.getElementById('profileIcon');
        if (dropdown && profileIconElem && !profileIconElem.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// ============================================
// تهيئة النظام
// ============================================

async function initAuth() {
    bindAuthEvents();
    await updateProfileDropdown();
    await validateDevice();
}

async function validateDevice() {
    const email = getLoggedInEmail();
    const sessionToken = getSessionToken();
    
    if (!email || !sessionToken) return true;
    if (sessionChecked) return true;
    
    try {
        const result = await checkSession(email, sessionToken);
        sessionChecked = true;
        
        if (result && result.valid) {
            return true;
        } else {
            showSessionExpiredModal();
            return false;
        }
    } catch (error) {
        return true;
    }
}

// ============================================
// بدء التشغيل
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

// ============================================
// تحسين مظهر الهواتف
// ============================================

function applyMobileAuthStyles() {
    if (window.innerWidth <= 768) {
        const loginPopupContent = document.querySelector('.login-popup-content');
        if (loginPopupContent) {
            loginPopupContent.style.padding = '18px';
            loginPopupContent.style.width = '260px';
            loginPopupContent.style.borderRadius = '18px';
        }
        
        const inputs = document.querySelectorAll('.login-popup-content input');
        inputs.forEach(input => {
            input.style.padding = '8px';
            input.style.fontSize = '12px';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    applyMobileAuthStyles();
});

// ============================================
// دوال عامة للاستخدام من أي مكان
// ============================================

window.getUserStatusGlobal = getUserStatus;
window.getLoggedInEmailGlobal = getLoggedInEmail;
window.logoutUserGlobal = logoutUser;
window.showWelcomeCard = showWelcomeCard;
window.showLockedMessage = showLockedMessage;
