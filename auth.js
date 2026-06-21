/**
 * auth.js - نظام إدارة تسجيل الدخول والجلسات
 * ✅ بطاقة ترحيب أنيقة
 * ✅ Loading Spinner داخل الزر
 * ✅ Toast Notifications حديثة (أعلى الشاشة)
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
// Toast Notifications - نظام حديث
// ============================================

function showToast(message, type = 'info', duration = 3000) {
    // إزالة Toast القديم
    const existing = document.querySelector('.zertiva-center-toast');
    if (existing) existing.remove();
    
    // إنشاء الحاوية إذا لم تكن موجودة
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // إنشاء عنصر Toast
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    
    // الأيقونات حسب النوع
    const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    
    const titles = {
        success: 'نجاح',
        warning: 'تنبيه',
        error: 'خطأ',
        info: 'معلومات'
    };
    
    // تقسيم الرسالة إلى عنوان ونص
    let titleText = titles[type] || 'معلومات';
    let messageText = message;
    
    // إذا كانت الرسالة تحتوي على سطرين، استخدم الأول كعنوان
    const lines = message.split('\n');
    if (lines.length > 1) {
        titleText = lines[0];
        messageText = lines.slice(1).join('\n');
    }
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
        <div class="toast-content">
            <div class="toast-title">${titleText}</div>
            ${messageText ? `<div class="toast-message">${messageText}</div>` : ''}
        </div>
        <button class="toast-close">✕</button>
    `;
    
    container.appendChild(toast);
    
    // إغلاق بالضغط على ×
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeToast(toast);
    });
    
    // إغلاق بالضغط على Toast نفسه
    toast.addEventListener('click', function(e) {
        if (e.target !== closeBtn) {
            removeToast(toast);
        }
    });
    
    // إغلاق تلقائي
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);
    
    // حفظ timeout للإلغاء
    toast._timeout = timeout;
}

function removeToast(toast) {
    if (toast._removing) return;
    toast._removing = true;
    clearTimeout(toast._timeout);
    toast.classList.add('removing');
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
        // حذف الحاوية إذا كانت فارغة
        const container = document.querySelector('.toast-container');
        if (container && container.children.length === 0) {
            container.remove();
        }
    }, 250);
}

// ============================================
// بطاقة ترحيب مصغرة وأنيقة ✅ معدلة
// ============================================

function showWelcomeCard(email, isPremium, expiryDate) {
    const existing = document.querySelector('.welcome-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    
    const card = document.createElement('div');
    card.className = 'welcome-card';
    
    // ===== بناء المحتوى =====
    let statusHtml = '';
    let messageHtml = '';
    let buttonHtml = '';
    
    if (isPremium) {
        const formattedExpiry = formatDate(expiryDate);
        statusHtml = `
            <div class="welcome-status">
                🎉 حسابك <span style="color: #38bdf8;">مفعل</span> حتى
            </div>
        `;
        messageHtml = `
            <div style="font-size: 1.1rem; font-weight: 700; color: #38bdf8; margin: 4px 0;">${formattedExpiry}</div>
            <div style="color: #9ca3af; font-size: 0.7rem;">استمتع بجميع الامتحانات والمميزات</div>
        `;
    } else {
        statusHtml = `
            <div class="welcome-status">
                📖 حساب <span style="color: #38bdf8;">مجاني</span>
            </div>
        `;
        messageHtml = `
            <div style="color: #d1d5db; font-size: 0.7rem; margin-top: 4px;">
                📚 متاح <span style="color: #ffd54f;">بعض الامتحانات</span> من كل قسم
            </div>
            <div style="color: #9ca3af; font-size: 0.65rem; margin-top: 2px;">
                ✨ للوصول الكامل اضغط <span style="color: #38bdf8;">"اشتراك"</span>
            </div>
        `;
        buttonHtml = `
            <button class="welcome-subscribe-btn" id="welcomeSubscribeBtn">
                ✨ اشترك الآن
            </button>
        `;
    }
    
    // ===== بناء البطاقة =====
    card.innerHTML = `
        <div class="welcome-title">مرحباً 👋</div>
        <div class="welcome-email">${email}</div>
        <div class="welcome-divider"></div>
        ${statusHtml}
        ${messageHtml}
        ${buttonHtml}
    `;
    
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    
    // إظهار البطاقة مع أنيميشن
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    
    // إغلاق عند النقر خارج البطاقة
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeWelcomeCard(overlay);
        }
    });
    
    // زر الاشتراك
    const subscribeBtn = document.getElementById('welcomeSubscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWelcomeCard(overlay);
            // فتح واتساب مباشرة بدلاً من subscribe.html
            window.open(WA_URL, '_blank');
        });
    }
}

function closeWelcomeCard(overlay) {
    if (!overlay) return;
    overlay.classList.remove('active');
    setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 250);
}

// ============================================
// نافذة Premium Access
// ============================================

function showPremiumModal(examTitle) {
    const existing = document.getElementById('premiumModal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'premiumModal';
    modal.className = 'premium-modal';
    modal.innerHTML = `
        <div class="premium-card">
            <div class="premium-card-header">
                <div class="premium-badge">
                    <span class="premium-icon">✦</span>
                    <span>PREMIUM ACCESS</span>
                </div>
                <h2 class="premium-title">Exclusive Content</h2>
                <p class="premium-subtitle">هذا المحتوى متاح للمشتركين</p>
            </div>
            <div class="premium-card-body">
                <ul class="premium-features">
                    <li><span class="check">✓</span> جميع امتحانات B2</li>
                    <li><span class="check">✓</span> اجوبة صحيحة 100%</li>
                    <li><span class="check">✓</span> بطاقات ذكية للحفظ السريع</li>
                    <li><span class="check">✓</span> لعبة التحدي السريع</li>
                    <li><span class="check">✓</span> التخلص من ارهاق Pdf</li>
                </ul>
                <button id="premiumUpgradeBtn" class="premium-btn">
                    ✦ Join Premium
                    <span>→</span>
                </button>
                <button id="premiumLaterBtn" class="premium-later">ليس الآن</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    document.getElementById('premiumUpgradeBtn').onclick = () => {
        window.open(WA_URL, '_blank');
    };
    
    document.getElementById('premiumLaterBtn').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    };
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
            <p class="modal-text">تم تسجيل الدخول إلى هذا الحساب من جهاز آخر.<br>يرجى إدخال البريد الإلكتروني مرة أخرى.</p>
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
            window.open(WA_URL, '_blank');
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
        showToast('تم تسجيل الخروج بنجاح', 'success', 3000);
    }
    setTimeout(() => location.reload(), 300);
}

// ============================================
// نافذة الاشتراك - توجيه إلى واتساب
// ============================================

function showLockedMessage(examTitle) {
    showPremiumModal(examTitle);
}

// ============================================
// معالجة تسجيل الدخول - مع Loading Spinner
// ============================================

async function handleLogin() {
    if (isLoggingIn) return;
    
    const email = document.getElementById('popupEmail').value.trim();
    const password = document.getElementById('popupPassword').value.trim();
    
    if (!email || !password) {
        showToast('يرجى إدخال البريد الإلكتروني وكلمة السر', 'info', 3000);
        return;
    }
    
    isLoggingIn = true;
    const loginBtn = document.getElementById('popupLoginBtn');
    const originalText = loginBtn ? loginBtn.textContent : 'دخول / إنشاء حساب';
    
    if (loginBtn) {
        loginBtn.innerHTML = `<span class="spinner"></span> جاري التحميل...`;
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
        loginBtn.style.cursor = 'wait';
    }
    
    try {
        const result = await loginWithGoogleSheets(email);
        
        if (!result.success) {
            if (result.status === 'expired') {
                showToast('⏰ انتهت صلاحية اشتراكك.', 'warning', 3000);
            } else if (result.status === 'connection_error') {
                showToast('⚠️ خطأ في الاتصال. حاول مرة أخرى.', 'error', 3000);
            } else {
                showToast(result.message || 'حدث خطأ', 'error', 3000);
            }
            return;
        }
        
        if (result.sessionToken) {
            setSessionData(email, result.sessionToken, getDeviceId());
        } else {
            setSessionData(email, result.sessionToken || 'temp', getDeviceId());
        }
        
        sessionChecked = false;
        await updateProfileDropdown();
        hideLoginPopup();
        
        const status = await getUserStatus();
        if (status === 'premium') {
            showWelcomeCard(email, true, result.expiry);
        } else {
            showWelcomeCard(email, false, null);
        }
        
    } catch (error) {
        showToast('حدث خطأ: ' + error.message, 'error', 3000);
    } finally {
        isLoggingIn = false;
        if (loginBtn) {
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            loginBtn.style.opacity = '1';
            loginBtn.style.cursor = 'pointer';
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
    
    const navSubscribeBtn = document.getElementById('navSubscribeBtn');
    if (navSubscribeBtn) {
        navSubscribeBtn.onclick = function(e) {
            e.preventDefault();
            window.open(WA_URL, '_blank');
        };
    }
    
    const featuresSubscribeBtn = document.getElementById('featuresSubscribeBtn');
    if (featuresSubscribeBtn) {
        featuresSubscribeBtn.onclick = function(e) {
            e.preventDefault();
            window.open(WA_URL, '_blank');
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}

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

window.getUserStatusGlobal = getUserStatus;
window.getLoggedInEmailGlobal = getLoggedInEmail;
window.logoutUserGlobal = logoutUser;
window.showWelcomeCard = showWelcomeCard;
window.showLockedMessage = showLockedMessage;
window.showPremiumModal = showPremiumModal;
