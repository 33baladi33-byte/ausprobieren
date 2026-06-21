/**
 * auth.js - نظام إدارة تسجيل الدخول والاشتراك
 * ✅ يعتمد فقط على Google Sheets
 * ✅ لا يستخدم premium.json
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;
let isLoggingIn = false;

// ============================================
// دوال تسجيل الدخول الأساسية
// ============================================

function getLoggedInEmail() {
    return localStorage.getItem('zertiva_email');
}

function setLoggedInUser(email) {
    localStorage.setItem('zertiva_email', email);
}

function logoutUser(showMessage = true) {
    const email = getLoggedInEmail();
    if (email) {
        logoutWithGoogleSheets(email);
    }
    localStorage.removeItem('zertiva_email');
    localStorage.removeItem('zertiva_device_id');
    if (showMessage) {
        showToast('تم تسجيل الخروج بنجاح', 'success');
    }
    setTimeout(() => location.reload(), 500);
}

function isUserLoggedIn() {
    return getLoggedInEmail() !== null;
}

// ============================================
// الحصول على حالة المستخدم - فقط من Google Sheets
// ============================================

async function getUserStatus() {
    let email = getLoggedInEmail();
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
// Toast Notifications (بديل alert)
// ============================================

function showToast(message, type = 'info', duration = 4000) {
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
        padding: 16px 24px;
        border-radius: 16px;
        border-left: 4px solid ${colors[type] || colors.info};
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 99999;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.6;
        animation: slideInRight 0.3s ease;
        direction: rtl;
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// نافذة نقل الحساب الأنيقة
// ============================================

function showTransferModal(onConfirm, onCancel) {
    const existing = document.getElementById('transferModal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'transferModal';
    modal.className = 'zertiva-modal';
    modal.innerHTML = `
        <div class="zertiva-modal-content">
            <div class="modal-icon">🔐</div>
            <h3 class="modal-title">الحساب مستخدم على جهاز آخر</h3>
            <p class="modal-text">
                إذا كنت تريد نقل الحساب إلى هذا الجهاز،<br>
                سيتم تسجيل الخروج تلقائياً من الجهاز السابق.
            </p>
            <div class="modal-buttons">
                <button class="modal-btn primary" id="transferConfirmBtn">نقل الحساب</button>
                <button class="modal-btn secondary" id="transferCancelBtn">إلغاء</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    document.getElementById('transferConfirmBtn').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
        if (onConfirm) onConfirm();
    };
    
    document.getElementById('transferCancelBtn').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
        if (onCancel) onCancel();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
            if (onCancel) onCancel();
        }
    };
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
// معالجة تسجيل الدخول
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
    const originalText = loginBtn ? loginBtn.textContent : '';
    if (loginBtn) {
        loginBtn.textContent = '⏳ جاري التحميل...';
        loginBtn.disabled = true;
    }
    
    try {
        const result = await loginWithGoogleSheets(email);
        
        if (!result.success) {
            if (result.status === 'wrong_device') {
                showTransferModal(
                    async () => {
                        const transferResult = await transferAccount(email);
                        if (transferResult.success) {
                            showToast('✅ تم نقل الحساب بنجاح!', 'success');
                            setLoggedInUser(email);
                            hideLoginPopup();
                            await updateProfileDropdown();
                            // تسجيل خروج الجهاز القديم
                            logoutWithGoogleSheets(email);
                            setTimeout(() => location.reload(), 500);
                        } else {
                            showToast(transferResult.message || 'حدث خطأ أثناء النقل', 'error');
                        }
                    },
                    () => {
                        // إلغاء
                    }
                );
                return;
            } else if (result.status === 'expired') {
                showToast('⏰ انتهت صلاحية اشتراكك. يرجى التواصل مع الدعم.', 'warning');
                return;
            } else if (result.status === 'not_found') {
                // إنشاء حساب جديد
                const newResult = await loginWithGoogleSheets(email);
                if (newResult.success) {
                    setLoggedInUser(email);
                    showToast(`✅ مرحباً ${email}\n📖 حسابك مجاني حالياً.\n📚 متاح لك أول 6 امتحانات من كل قسم.`, 'info', 5000);
                    hideLoginPopup();
                    await updateProfileDropdown();
                    setTimeout(() => location.reload(), 500);
                    return;
                } else {
                    showToast('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.', 'error');
                    return;
                }
            } else if (result.status === 'connection_error') {
                showToast('⚠️ خطأ في الاتصال. يرجى المحاولة مرة أخرى.', 'error');
                return;
            } else {
                showToast(result.message || 'حدث خطأ غير متوقع', 'error');
                return;
            }
        }
        
        // ✅ تسجيل الدخول الناجح
        setLoggedInUser(email);
        
        const status = await getUserStatus();
        if (status === 'premium') {
            const expiry = await getExpiryDate(email);
            const formattedExpiry = formatDate(expiry);
            showToast(`✅ مرحباً ${email}\n🎉 حسابك مفعل حتى ${formattedExpiry}`, 'success', 5000);
        } else if (status === 'expired') {
            showToast(`⏰ مرحباً ${email}\nانتهت صلاحية اشتراكك.`, 'warning');
        } else {
            showToast(`✅ مرحباً ${email}\n📖 حسابك مجاني حالياً.\n📚 متاح لك أول 6 امتحانات من كل قسم.`, 'info', 5000);
        }
        
        hideLoginPopup();
        await updateProfileDropdown();
        setTimeout(() => location.reload(), 500);
        
    } catch (error) {
        showToast('حدث خطأ: ' + error.message, 'error');
    } finally {
        isLoggingIn = false;
        if (loginBtn) {
            loginBtn.textContent = originalText || 'دخول / إنشاء حساب';
            loginBtn.disabled = false;
        }
    }
}

// ============================================
// التحقق من صحة الجهاز (للجهاز القديم)
// ============================================

async function validateDevice() {
    const email = getLoggedInEmail();
    if (!email) return true;
    
    try {
        const result = await checkUser(email);
        if (result && result.exists) {
            const storedDeviceId = localStorage.getItem('zertiva_device_id');
            if (storedDeviceId && result.deviceId && storedDeviceId !== result.deviceId) {
                // الجهاز غير مطابق - تسجيل الخروج
                showToast('⚠️ تم تسجيل الدخول من جهاز آخر. سيتم تسجيل الخروج.', 'warning', 3000);
                setTimeout(() => {
                    logoutUser(false);
                }, 1500);
                return false;
            }
            return true;
        }
        return true;
    } catch (e) {
        return true;
    }
}

// ============================================
// إعداد زر التالي المقفل
// ============================================

async function setupLockedNextButton() {
    const status = await getUserStatus();
    const nextBtn = document.getElementById('nextExamBtn');
    
    if (nextBtn && status !== 'premium' && status !== 'guest') {
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

// ============================================
// ربط الأحداث
// ============================================

function bindAuthEvents() {
    const navLoginBtn = document.getElementById('navLoginBtn');
    if (navLoginBtn) navLoginBtn.addEventListener('click', showLoginPopup);
    
    const popupLoginBtn = document.getElementById('popupLoginBtn');
    if (popupLoginBtn) popupLoginBtn.addEventListener('click', handleLogin);
    
    const closePopupBtn = document.getElementById('closePopupBtn');
    if (closePopupBtn) closePopupBtn.addEventListener('click', hideLoginPopup);
    
    const loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
        loginPopup.addEventListener('click', function(e) {
            if (e.target === loginPopup) hideLoginPopup();
        });
    }
    
    const profileIcon = document.getElementById('profileIcon');
    if (profileIcon) profileIcon.addEventListener('click', toggleProfileDropdown);
    
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', () => logoutUser(true));
    
    const logoHomeBtn = document.getElementById('logoHomeBtn');
    if (logoHomeBtn) {
        logoHomeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('profileDropdown');
        const profileIconElem = document.getElementById('profileIcon');
        if (dropdown && profileIconElem && !profileIconElem.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function observePageChanges() {
    const observer = new MutationObserver(() => {
        const listPage = document.getElementById('list');
        if (listPage && listPage.classList.contains('active')) {
            setTimeout(setupLockedNextButton, 300);
        }
        const examPage = document.getElementById('exam');
        if (examPage && examPage.classList.contains('active')) {
            setTimeout(setupLockedNextButton, 300);
        }
    });
    
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
}

// ============================================
// تهيئة النظام
// ============================================

async function initAuth() {
    bindAuthEvents();
    await updateProfileDropdown();
    observePageChanges();
    setTimeout(setupLockedNextButton, 800);
    
    // ✅ التحقق من صحة الجهاز عند تحميل الصفحة
    await validateDevice();
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
            loginPopupContent.style.padding = '20px';
            loginPopupContent.style.width = '280px';
            loginPopupContent.style.borderRadius = '20px';
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
// دالة للتحقق من حالة المستخدم من أي مكان
// ============================================

window.getUserStatusGlobal = getUserStatus;
window.getLoggedInEmailGlobal = getLoggedInEmail;
window.logoutUserGlobal = logoutUser;
