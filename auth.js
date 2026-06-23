/**
 * auth.js - نظام تسجيل دخول مبسط ومستقر
 * ✅ بدون Device ID
 * ✅ بدون Session Token
 * ✅ Google Sheet هو المصدر الوحيد
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let isLoggingIn = false;

// ============================================
// دوال الجلسة - مبسطة
// ============================================

function getLoggedInEmail() {
    return localStorage.getItem('zertiva_email');
}

function setLoggedInEmail(email) {
    if (email) {
        localStorage.setItem('zertiva_email', email);
    } else {
        localStorage.removeItem('zertiva_email');
    }
}

function clearSessionData() {
    localStorage.removeItem('zertiva_email');
}

function isUserLoggedIn() {
    return getLoggedInEmail() !== null;
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'info', duration = 3000) {
    const existing = document.querySelector('.zertiva-center-toast');
    if (existing) existing.remove();
    
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    
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
    
    let titleText = titles[type] || 'معلومات';
    let messageText = message;
    
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
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        removeToast(toast);
    });
    
    toast.addEventListener('click', function(e) {
        if (e.target !== closeBtn) {
            removeToast(toast);
        }
    });
    
    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);
    
    toast._timeout = timeout;
}

function removeToast(toast) {
    if (toast._removing) return;
    toast._removing = true;
    clearTimeout(toast._timeout);
    toast.classList.add('removing');
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
        const container = document.querySelector('.toast-container');
        if (container && container.children.length === 0) {
            container.remove();
        }
    }, 250);
}

// ============================================
// بطاقة ترحيب
// ============================================

function showWelcomeCard(email, isPremium, expiryDate) {
    const existing = document.querySelector('.welcome-overlay');
    if (existing) existing.remove();
    
    function formatDateSimple(dateString) {
        if (!dateString) return 'غير محدد';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } catch(e) {
            return dateString;
        }
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    
    const card = document.createElement('div');
    card.className = 'welcome-card';
    
    let statusText = '';
    let statusColor = '';
    let expiryText = '';
    let buttonText = '';
    let buttonAction = '';
    
    if (isPremium && expiryDate) {
        statusText = '✅ الحساب مفعل';
        statusColor = '#22c55e';
        expiryText = `📅 صالح حتى ${formatDateSimple(expiryDate)}`;
        buttonText = '🚀 ابدأ المراجعة';
        buttonAction = 'review';
    } else {
        statusText = '📖 حساب مجاني';
        statusColor = '#38bdf8';
        expiryText = '📚 متاح بعض الامتحانات';
        buttonText = '✨ اشترك للوصول الكامل';
        buttonAction = 'subscribe';
    }
    
    card.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="color: #38bdf8; font-size: 0.85rem; font-weight: 500; word-break: break-all; direction: ltr; text-align: left;">
                📧 ${email}
            </div>
            <div style="color: ${statusColor}; font-size: 0.9rem; font-weight: 600;">
                ${statusText}
            </div>
            <div style="color: #d1d5db; font-size: 0.8rem; font-weight: 400;">
                ${expiryText}
            </div>
            <button class="welcome-subscribe-btn" id="welcomeSubscribeBtn" style="
                margin-top: 6px;
                background: #38bdf8;
                color: #0a0e1a;
                border: none;
                border-radius: 12px;
                padding: 10px 0;
                width: 100%;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
            ">
                ${buttonText}
            </button>
        </div>
    `;
    
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeWelcomeCard(overlay);
        }
    });
    
    const subscribeBtn = document.getElementById('welcomeSubscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWelcomeCard(overlay);
            
            if (buttonAction === 'review') {
                window.location.href = 'index.html#list';
            } else {
                window.location.href = 'subscribe.html';
            }
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
        window.location.href = 'subscribe.html';
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
// تحديث القائمة المنسدلة
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
        
        const result = await checkUser(email);
        const isPremium = result && result.exists && result.isPremium;
        const expiry = result && result.exists ? result.expiry : null;
        
        profileEmail.innerHTML = `📧 ${email}`;
        
        if (isPremium && expiry) {
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
// تسجيل الخروج - مبسط
// ============================================

function logoutUser(showMessage = true) {
    clearSessionData();
    if (showMessage) {
        showToast('تم تسجيل الخروج بنجاح', 'success', 3000);
    }
    setTimeout(() => location.reload(), 300);
}

function showLockedMessage(examTitle) {
    showPremiumModal(examTitle);
}

// ============================================
// معالجة تسجيل الدخول - مبسطة جداً ✅
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
        // ✅ تسجيل الدخول
        const result = await loginWithGoogleSheets(email);
        
        // ✅ إذا فشل الاتصال
        if (!result || !result.success) {
            const errorMsg = result?.message || '⚠️ حدث خطأ غير متوقع';
            showToast(errorMsg, 'error', 3000);
            restoreLoginButton(loginBtn, originalText);
            return;
        }
        
        // ✅ حفظ البريد الإلكتروني
        setLoggedInEmail(email);
        
        // ✅ تحديث الواجهة
        await updateProfileDropdown();
        hideLoginPopup();
        
        // ✅ عرض البطاقة
        const isPremium = result.isPremium || false;
        const expiry = result.expiry || null;
        showWelcomeCard(email, isPremium, expiry);
        
        // ✅ رسالة نجاح
        showToast(`✅ مرحباً ${email}`, 'success', 3000);
        
        // ✅ إعادة الزر
        setTimeout(() => {
            restoreLoginButton(loginBtn, originalText);
        }, 500);
        
    } catch (error) {
        console.error('Login Error:', error);
        showToast('⚠️ حدث خطأ غير متوقع', 'error', 3000);
        restoreLoginButton(loginBtn, originalText);
    } finally {
        isLoggingIn = false;
    }
}

function restoreLoginButton(loginBtn, originalText) {
    if (loginBtn) {
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
        loginBtn.style.cursor = 'pointer';
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
            window.location.href = 'subscribe.html';
        };
    }
    
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
// تهيئة النظام - مبسطة
// ============================================

async function initAuth() {
    bindAuthEvents();
    await updateProfileDropdown();
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

window.getLoggedInEmailGlobal = getLoggedInEmail;
window.logoutUserGlobal = logoutUser;
window.showWelcomeCard = showWelcomeCard;
window.showLockedMessage = showLockedMessage;
window.showPremiumModal = showPremiumModal;
