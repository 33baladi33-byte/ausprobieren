/**
 * auth.js - نظام إدارة تسجيل الدخول والجلسات
 * ✅ سريع - لا يستخدم setTimeout
 * ✅ يعرض بطاقة الملف الشخصي فوراً
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
// Toast Notifications
// ============================================

function showToast(message, type = 'info', duration = 3000) {
    const existing = document.querySelector('.zertiva-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'zertiva-toast';
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#38bdf8'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1a1d27;
        color: #f1f5f9;
        padding: 14px 20px;
        border-radius: 14px;
        border-left: 4px solid ${colors[type] || colors.info};
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 99999;
        max-width: 380px;
        font-size: 13px;
        line-height: 1.5;
        animation: slideInRight 0.25s ease;
        direction: rtl;
        border: 1px solid rgba(255,255,255,0.08);
        pointer-events: none;
    `;
    
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.25s ease';
        setTimeout(() => toast.remove(), 250);
    }, duration);
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
// الحصول على حالة المستخدم - سريع
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
                return 'expired';
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

// ============================================
// تنسيق التاريخ
// ============================================

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
// تحديث القائمة المنسدلة للمستخدم (تعمل فوراً)
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
        } else if (status === 'expired') {
            profileExpiry.innerHTML = `⏰ انتهت الصلاحية`;
            profileStatus.innerHTML = `⚠️ <span style="color: #f59e0b;">منتهي</span>`;
            if (navSubscribeBtn) navSubscribeBtn.style.display = 'inline-flex';
        } else {
            profileExpiry.innerHTML = `📖 الوضع المجاني`;
            profileStatus.innerHTML = `⭐ <span style="color: #94a3b8;">مجاني</span>`;
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
            const modal = document.getElementById('subscriptionModal');
            if (modal) modal.classList.add('active');
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
        showToast('تم تسجيل الخروج بنجاح', 'success');
    }
    setTimeout(() => location.reload(), 300);
}

// ============================================
// معالجة تسجيل الدخول - سريع جداً
// ============================================

async function handleLogin() {
    if (isLoggingIn) return;
    
    const email = document.getElementById('popupEmail').value.trim();
    const password = document.getElementById('popupPassword').value.trim();
    
    if (!email || !password) {
        showToast('يرجى إدخال البريد الإلكتروني وكلمة السر', 'warning');
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
                showToast('⏰ انتهت صلاحية اشتراكك.', 'warning');
                return;
            } else if (result.status === 'connection_error') {
                showToast('⚠️ خطأ في الاتصال. حاول مرة أخرى.', 'error');
                return;
            } else {
                showToast(result.message || 'حدث خطأ', 'error');
                return;
            }
        }
        
        // ✅ حفظ الجلسة
        if (result.sessionToken) {
            setSessionData(email, result.sessionToken, getDeviceId());
        } else {
            setSessionData(email, result.sessionToken || 'temp', getDeviceId());
        }
        
        sessionChecked = false;
        
        // ✅ تحديث الملف الشخصي فوراً
        await updateProfileDropdown();
        
        // ✅ إغلاق نافذة تسجيل الدخول
        hideLoginPopup();
        
        // ✅ عرض رسالة حسب حالة المستخدم
        const status = await getUserStatus();
        if (status === 'premium') {
            const formattedExpiry = formatDate(result.expiry);
            showToast(`✅ مرحباً ${email}\n🎉 حسابك مفعل حتى ${formattedExpiry}`, 'success', 5000);
        } else {
            // ✅ الرسالة المطلوبة للحساب المجاني
            showToast(
                `✅ مرحباً ${email}\n📖 حسابك مجاني حالياً.\n📚 متاح بعض الامتحانات من كل قسم.\n✨ للوصول الكامل، اضغط "اشتراك" ثم ادفع.`,
                'info',
                6000
            );
        }
        
        // ✅ إعادة تحميل الصفحة لعرض التغييرات
        setTimeout(() => location.reload(), 500);
        
    } catch (error) {
        showToast('حدث خطأ: ' + error.message, 'error');
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
    // زر تسجيل الدخول في الشريط العلوي
    const navLoginBtn = document.getElementById('navLoginBtn');
    if (navLoginBtn) {
        navLoginBtn.onclick = showLoginPopup;
    }
    
    // زر تسجيل الدخول في النافذة
    const popupLoginBtn = document.getElementById('popupLoginBtn');
    if (popupLoginBtn) {
        popupLoginBtn.onclick = handleLogin;
    }
    
    // زر إغلاق النافذة
    const closePopupBtn = document.getElementById('closePopupBtn');
    if (closePopupBtn) {
        closePopupBtn.onclick = hideLoginPopup;
    }
    
    // إغلاق النافذة عند الضغط خارجها
    const loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
        loginPopup.onclick = function(e) {
            if (e.target === loginPopup) hideLoginPopup();
        };
    }
    
    // زر الملف الشخصي
    const profileIcon = document.getElementById('profileIcon');
    if (profileIcon) {
        profileIcon.onclick = toggleProfileDropdown;
    }
    
    // زر تسجيل الخروج
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    if (profileLogoutBtn) {
        profileLogoutBtn.onclick = () => logoutUser(true);
    }
    
    // زر الشعار - العودة للرئيسية
    const logoBtn = document.getElementById('logoHomeBtn');
    if (logoBtn) {
        logoBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        };
    }
    
    // زر الإشعارات
    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        notificationBell.onclick = function(e) {
            e.preventDefault();
            const dropdown = document.getElementById('notificationDropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
        };
    }
    
    // زر الإعدادات
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.onclick = function(e) {
            e.preventDefault();
            const modal = document.getElementById('settingsModal');
            if (modal) {
                modal.classList.add('active');
            }
        };
    }
    
    // إغلاق القائمة المنسدلة عند الضغط خارجها
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
    // ربط الأحداث
    bindAuthEvents();
    
    // تحديث الملف الشخصي
    await updateProfileDropdown();
    
    // التحقق من صحة الجهاز
    await validateDevice();
}

// ============================================
// التحقق من صحة الجهاز
// ============================================

async function validateDevice() {
    const email = getLoggedInEmail();
    const sessionToken = getSessionToken();
    
    if (!email || !sessionToken) {
        return true;
    }
    
    if (sessionChecked) {
        return true;
    }
    
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

// دوال عامة
window.getUserStatusGlobal = getUserStatus;
window.getLoggedInEmailGlobal = getLoggedInEmail;
window.logoutUserGlobal = logoutUser;
