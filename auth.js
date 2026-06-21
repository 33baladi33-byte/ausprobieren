/**
 * auth.js - نظام إدارة تسجيل الدخول والاشتراك لموقع Zertiva B2
 * ✅ يستخدم Google Sheets + Apps Script
 * ⚠️ يعتمد على auth_google.js (يجب تحميله قبله)
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;

const YOUCAN_STORE_URL = 'https://zertivab2.youcan.store/';

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
        logoutWithGoogleSheets(email);
    }
    localStorage.removeItem('zertiva_email');
    localStorage.removeItem('zertiva_password');
    alert("تم تسجيل الخروج بنجاح");
    location.reload();
}

function isUserLoggedIn() {
    return getLoggedInEmail() !== null;
}

// ============================================
// جلب المستخدمين المميزين
// ============================================

async function getPremiumUsers() {
    try {
        const users = await getAllUsersFromSheets();
        if (Object.keys(users).length > 0) {
            return users;
        }
        const response = await fetch('premium.json?_=' + Date.now());
        return await response.json();
    } catch(e) {
        try {
            const response = await fetch('premium.json?_=' + Date.now());
            return await response.json();
        } catch(err) {
            return {};
        }
    }
}

// ============================================
// الحصول على حالة المستخدم
// ============================================

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

// ========== نافذة الاشتراك المنبثقة ==========
function showLockedMessage(examTitle) {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.classList.add('active');
}

// ============================================
// تحديث القائمة المنسدلة للمستخدم
// ============================================

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

// ============================================
// معالجة تسجيل الدخول - دخول مباشر
// ============================================

async function handleLogin() {
    let email = document.getElementById('popupEmail').value.trim();
    let password = document.getElementById('popupPassword').value.trim();
    
    if(!email || !password) {
        alert("يرجى إدخال البريد الإلكتروني وكلمة السر");
        return;
    }
    
    const result = await loginWithGoogleSheets(email);
    
    if (!result.success) {
        if (result.status === 'wrong_device') {
            const confirmTransfer = confirm(
                `${result.message}\n\nإذا ضغطت "موافق"، سيتم نقل الحساب إلى هذا الجهاز.`
            );
            if (confirmTransfer) {
                const transferResult = await transferAccount(email);
                if (transferResult.success) {
                    alert('✅ تم نقل الحساب بنجاح!');
                    setLoggedInUser(email, password);
                    hideLoginPopup();
                    await updateProfileDropdown();
                    location.reload();
                    return;
                } else {
                    alert(transferResult.message);
                    return;
                }
            } else {
                return;
            }
        } else if (result.status === 'expired') {
            alert(`⏰ انتهت صلاحية اشتراكك.\nيرجى التواصل مع الدعم.`);
            return;
        } else if (result.status === 'connection_error') {
            alert('⚠️ خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
            return;
        } else {
            // أي حالة أخرى → نسمح بالدخول (سيتم إنشاء الحساب تلقائياً)
            console.log('📝 محاولة الدخول بحساب:', email);
        }
    }
    
    // ✅ تسجيل الدخول
    setLoggedInUser(email, password);
    
    const status = await getUserStatus();
    if (status === 'premium') {
        const expiry = await getExpiryDate(email);
        alert(`✅ مرحباً ${email}\n🎉 حسابك مفعل حتى ${expiry}`);
    } else {
        alert(`✅ مرحباً ${email}\n📖 حسابك مجاني (أول 6 امتحانات).`);
    }
    
    hideLoginPopup();
    await updateProfileDropdown();
    location.reload();
}

// ============================================
// إعداد زر التالي المقفل
// ============================================

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

// ============================================
// ربط الأحداث
// ============================================

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
