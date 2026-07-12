/**
 * auth.js - نظام إدارة تسجيل الدخول والجلسات
 * ✅ بطاقة ترحيب بسيطة وحديثة
 * ✅ Loading Spinner داخل الزر
 * ✅ Toast Notifications حديثة (أعلى الشاشة)
 * ✅ نظام Caching لتقليل طلبات API
 * ✅ التحقق فقط عند فتح الموقع أو تحديثه
 * ✅ نافذة الملف الشخصي (مودال) مع UID
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;
let isLoggingIn = false;
let sessionChecked = false;

// ============================================
// نظام Caching لتقليل طلبات API
// ============================================
let userStatusCache = null;
let userStatusCacheTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 دقائق
let isCheckingStatus = false;

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
    
    // ✅ تحديث الكاش عند تسجيل الدخول
    userStatusCache = null;
    userStatusCacheTime = 0;
}

function clearSessionData() {
    localStorage.removeItem('zertiva_email');
    localStorage.removeItem('zertiva_session_token');
    localStorage.removeItem('zertiva_device_id');
    localStorage.removeItem('zertiva_last_session_check');
    
    // ✅ مسح الكاش عند الخروج
    userStatusCache = null;
    userStatusCacheTime = 0;
    sessionChecked = false;
}

function isUserLoggedIn() {
    return getLoggedInEmail() !== null && getSessionToken() !== null;
}

// ============================================
// عناصر DOM (للملف الشخصي الجديد)
// ============================================
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');
const profileDisplayName = document.getElementById('profileDisplayName');
const profileUid = document.getElementById('profileUid');
const profileExpiry = document.getElementById('profileExpiry');
const profileStatus = document.getElementById('profileStatus');
const profileLogoutBtnModal = document.getElementById('profileLogoutBtnModal');

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
// نافذة الملف الشخصي
// ============================================

function openProfileModal() {
    if (profileModal) profileModal.classList.add('active');
}

function closeProfileModalFunc() {
    if (profileModal) profileModal.classList.remove('active');
}

function updateProfileModal(user) {
    if (!user) {
        if (profileDisplayName) profileDisplayName.innerText = 'غير مسجل';
        if (profileUid) profileUid.innerText = '---';
        if (profileExpiry) profileExpiry.innerText = '';
        if (profileStatus) {
            profileStatus.innerHTML = '<span style="color: #94a3b8;">🆓 مجاني</span>';
        }
        return;
    }
    
    try {
        const docRef = db.collection('users').doc(user.uid);
        docRef.get().then(docSnap => {
            if (docSnap.exists) {
                const data = docSnap.data();
                if (profileDisplayName) {
                    profileDisplayName.innerText = data.username || user.email.split('@')[0] || 'مستخدم';
                }
                if (profileUid) {
                    const uid = user.uid;
                    profileUid.innerText = uid.length > 24 ? uid.substring(0, 24) + '...' : uid;
                }
                
                // الحالة
                getUserStatusGlobal().then(status => {
                    if (profileStatus) {
                        if (status === 'premium') {
                            profileStatus.innerHTML = '<span style="color: #10b981;">⭐ مشترك (Premium)</span>';
                        } else {
                            profileStatus.innerHTML = '<span style="color: #94a3b8;">🆓 مجاني (Free)</span>';
                        }
                    }
                });
                
                // تاريخ الانتهاء
                if (profileExpiry && data.premiumUntil) {
                    const date = new Date(data.premiumUntil);
                    const formatted = date.toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    });
                    profileExpiry.innerText = `📅 ينتهي: ${formatted}`;
                } else if (profileExpiry) {
                    profileExpiry.innerText = '';
                }
            }
        }).catch(err => {
            console.warn('⚠️ فشل جلب بيانات المستخدم:', err);
        });
    } catch (err) {
        console.warn('⚠️ فشل جلب بيانات المستخدم:', err);
    }
}

// ============================================
// بطاقة ترحيب بسيطة وحديثة ✅
// ============================================

function showWelcomeCard(email, isPremium, expiryDate) {
    // إزالة البطاقة القديمة إن وجدت
    const existing = document.querySelector('.welcome-overlay');
    if (existing) existing.remove();
    
    // تنسيق التاريخ بالصيغة المطلوبة: DD-MM-YYYY
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
    
    // ===== بناء المحتوى =====
    let statusText = '';
    let statusColor = '';
    let expiryText = '';
    let buttonText = '';
    let buttonAction = '';
    
    if (isPremium && expiryDate) {
        statusText = '✅ الحساب مفعل';
        statusColor = '#22c55e'; // أخضر
        expiryText = `📅 صالح حتى ${formatDateSimple(expiryDate)}`;
        buttonText = '🚀 ابدأ المراجعة';
        buttonAction = 'review';
    } else {
        statusText = '📖 حساب مجاني';
        statusColor = '#38bdf8'; // أزرق
        expiryText = '📚 متاح بعض الامتحانات';
        buttonText = '✨ اشترك للوصول الكامل';
        buttonAction = 'subscribe';
    }
    
    // ===== بناء البطاقة الجديدة =====
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
    
    // إظهار البطاقة مع Animation
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
    
    // إغلاق عند النقر خارج البطاقة
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeWelcomeCard(overlay);
        }
    });
    
    // زر البطاقة
    const subscribeBtn = document.getElementById('welcomeSubscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWelcomeCard(overlay);
            
            if (buttonAction === 'review') {
                // المستخدم Premium -> يذهب إلى قائمة الامتحانات
                window.location.href = 'index.html#list';
            } else {
                // المستخدم مجاني -> يذهب إلى صفحة الاشتراك
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
// الحصول على حالة المستخدم - مع Caching
// ============================================

async function getUserStatus(forceRefresh = false) {
    const email = getLoggedInEmail();
    if (!email) return 'guest';
    
    // ✅ استخدام الكاش إذا كان حديثاً
    const now = Date.now();
    if (!forceRefresh && userStatusCache && (now - userStatusCacheTime) < CACHE_DURATION) {
        return userStatusCache;
    }
    
    // ✅ منع الطلبات المتزامنة المتعددة
    if (isCheckingStatus) {
        await new Promise(resolve => {
            const checkInterval = setInterval(() => {
                if (!isCheckingStatus) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
        return userStatusCache || 'free';
    }
    
    isCheckingStatus = true;
    
    try {
        const result = await checkUser(email);
        if (result && result.exists && result.expiry) {
            const today = new Date().toISOString().slice(0, 10);
            if (today <= result.expiry) {
                currentExpiry = result.expiry;
                userStatusCache = 'premium';
                userStatusCacheTime = now;
                return 'premium';
            }
        }
        userStatusCache = 'free';
        userStatusCacheTime = now;
        return 'free';
    } catch (e) {
        userStatusCache = 'free';
        userStatusCacheTime = now;
        return 'free';
    } finally {
        isCheckingStatus = false;
    }
}

async function getExpiryDate(email) {
    // ✅ استخدام الكاش أولاً
    if (currentExpiry) {
        return currentExpiry;
    }
    
    try {
        const result = await checkUser(email);
        if (result && result.exists && result.expiry) {
            currentExpiry = result.expiry;
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

async function updateProfileDropdown(forceRefresh = false) {
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
        
        // ✅ استخدم الكاش
        const status = await getUserStatus(forceRefresh);
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
    
    // ✅ مسح الكاش
    userStatusCache = null;
    userStatusCacheTime = 0;
    currentExpiry = null;
    localStorage.removeItem('zertiva_last_session_check');
    
    // إغلاق نافذة الملف الشخصي إذا كانت مفتوحة
    closeProfileModalFunc();
    
    if (showMessage) {
        showToast('تم تسجيل الخروج بنجاح', 'success', 3000);
    }
    setTimeout(() => location.reload(), 300);
}

// ============================================
// نافذة الاشتراك - توجيه إلى subscribe.html
// ============================================

function showLockedMessage(examTitle) {
    showPremiumModal(examTitle);
}

// ============================================
// معالجة تسجيل الدخول - مع Loading Spinner ✅ معدل
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
        let result = await loginWithGoogleSheets(email);
        
        if (!result) {
            showToast('⚠️ لم يتم استلام رد من الخادم', 'error', 3000);
            restoreLoginButton(loginBtn, originalText);
            return;
        }
        
        console.log('LOGIN RESULT:', result);
        
        if (!result.success) {
            if (result.status === 'already_logged_in' || 
                result.status === 'session_expired' || 
                result.status === 'already_exists') {
                
                const retryResult = await loginWithGoogleSheets(email);
                
                if (retryResult && retryResult.success) {
                    result = retryResult;
                } else {
                    const errorMsg = retryResult?.message || 'تعذر تسجيل الدخول';
                    showToast('⚠️ ' + errorMsg, 'error', 3000);
                    restoreLoginButton(loginBtn, originalText);
                    return;
                }
            } else if (result.status === 'expired') {
                showToast('⏰ انتهت صلاحية اشتراكك.', 'warning', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            } else if (result.status === 'connection_error') {
                showToast('⚠️ خطأ في الاتصال. حاول مرة أخرى.', 'error', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            } else if (result.status === 'user_not_found') {
                showToast('❌ البريد الإلكتروني غير مسجل.', 'error', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            } else if (result.status === 'wrong_password') {
                showToast('❌ كلمة السر غير صحيحة.', 'error', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            } else if (result.status === 'no_data') {
                showToast('⚠️ لا توجد بيانات في الورقة.', 'error', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            } else if (result.status === 'invalid_expiry') {
                showToast('⚠️ تاريخ الصلاحية غير صحيح.', 'error', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            } else {
                const errorMsg = result.message || 'حدث خطأ غير متوقع';
                showToast('⚠️ ' + errorMsg, 'error', 3000);
                restoreLoginButton(loginBtn, originalText);
                return;
            }
        }
        
        // ✅ تخزين بيانات الجلسة
        if (result.sessionToken) {
            setSessionData(email, result.sessionToken, getDeviceId());
        } else {
            const tempToken = 'temp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 8);
            setSessionData(email, tempToken, getDeviceId());
        }
        
        // ✅ تحديث الكاش بعد تسجيل الدخول
        userStatusCache = result.isPremium ? 'premium' : 'free';
        userStatusCacheTime = Date.now();
        currentExpiry = result.expiry;
        
        sessionChecked = false;
        await updateProfileDropdown(true);
        hideLoginPopup();
        
        // ✅ تحديث نافذة الملف الشخصي
        const user = auth.currentUser;
        if (user) {
            updateProfileModal(user);
        }
        
        // ✅ عرض البطاقة المناسبة
        const status = await getUserStatus(true);
        if (status === 'premium') {
            showWelcomeCard(email, true, result.expiry);
        } else {
            showWelcomeCard(email, false, null);
        }
        
        showToast(`✅ مرحباً ${email}`, 'success', 3000);
        
        setTimeout(() => {
            restoreLoginButton(loginBtn, originalText);
        }, 500);
        
    } catch (error) {
        console.error('Login Error:', error);
        showToast('⚠️ خطأ في الاتصال: ' + error.message, 'error', 3000);
        restoreLoginButton(loginBtn, originalText);
    } finally {
        isLoggingIn = false;
    }
}

// ============================================
// دالة مساعدة لإعادة زر تسجيل الدخول
// ============================================

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
    
    // ============================================
    // ربط زر الملف الشخصي الجديد (👤)
    // ============================================
    if (profileBtn) {
        profileBtn.onclick = function(e) {
            e.preventDefault();
            const user = auth.currentUser;
            if (user) {
                updateProfileModal(user);
                openProfileModal();
            } else {
                showToast('⚠️ يرجى تسجيل الدخول أولاً', 'info', 3000);
            }
        };
    }
    
    // إغلاق نافذة الملف الشخصي
    if (closeProfileModal) {
        closeProfileModal.onclick = closeProfileModalFunc;
    }
    
    // إغلاق عند الضغط خارج النافذة
    if (profileModal) {
        profileModal.onclick = function(e) {
            if (e.target === profileModal) closeProfileModalFunc();
        };
    }
    
    // زر تسجيل الخروج في نافذة الملف الشخصي
    if (profileLogoutBtnModal) {
        profileLogoutBtnModal.onclick = function() {
            closeProfileModalFunc();
            logoutUser(true);
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
// تهيئة النظام - التحقق عند فتح الموقع فقط
// ============================================

async function initAuth() {
    bindAuthEvents();
    
    // ✅ التحقق عند فتح الموقع فقط (مع forceRefresh)
    await getUserStatus(true);
    await updateProfileDropdown(true);
    await validateDevice(true);
    
    // ❌ تم إزالة setInterval - لا نريد تحقق دوري
    // يتم التحقق فقط عند فتح الموقع أو تحديثه
}

// ============================================
// التحقق من الجلسة
// ============================================

async function validateDevice(forceCheck = false) {
    const email = getLoggedInEmail();
    const sessionToken = getSessionToken();
    
    if (!email || !sessionToken) return true;
    
    // ✅ إذا تم التحقق مسبقاً وليس هناك طلب قسري، استخدم الكاش
    if (sessionChecked && !forceCheck) return true;
    
    // ✅ لا تتحقق أكثر من مرة كل 5 دقائق (فقط إذا كان هناك طلب قسري)
    const lastCheck = parseInt(localStorage.getItem('zertiva_last_session_check') || '0');
    const now = Date.now();
    if (!forceCheck && (now - lastCheck) < 5 * 60 * 1000) {
        sessionChecked = true;
        return true;
    }
    
    try {
        const result = await checkSession(email, sessionToken);
        sessionChecked = true;
        localStorage.setItem('zertiva_last_session_check', now.toString());
        
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
// ✅ التحقق عند العودة للمتصفح (بعد تصغيره)
// ============================================

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // المستخدم عاد للمتصفح - تحقق من الحالة
        getUserStatus(true);
        updateProfileDropdown(true);
    }
});

// ============================================
// ✅ التحقق عند إعادة فتح المتصفح (pageshow)
// ============================================

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // الصفحة تم تحميلها من Cache المتصفح
        getUserStatus(true);
        updateProfileDropdown(true);
    }
});

// ============================================
// بدء التشغيل
// ============================================

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

// ============================================
// تصدير الدوال للاستخدام الخارجي
// ============================================

window.getUserStatusGlobal = getUserStatus;
window.getLoggedInEmailGlobal = getLoggedInEmail;
window.logoutUserGlobal = logoutUser;
window.showWelcomeCard = showWelcomeCard;
window.showLockedMessage = showLockedMessage;
window.showPremiumModal = showPremiumModal;
window.updateProfileModal = updateProfileModal;
window.openProfileModal = openProfileModal;
window.closeProfileModalFunc = closeProfileModalFunc;
