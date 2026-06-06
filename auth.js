/**
 * auth.js - نظام إدارة تسجيل الدخول والاشتراك لموقع Zertiva B2
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;

const YOUCAN_STORE_URL = 'https://zertivab2.youcan.store/';

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
// دالة showLockedMessage - تفتح النافذة عند الضغط على امتحان مقفل
function showLockedMessage(examTitle) {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.classList.add('active');
}

// دالة setupLockedNextButton - تفتح النافذة عند الضغط على زر "التالي" لامتحان مقفل
async function setupLockedNextButton() {
    let status = await getUserStatus();
    let nextBtn = document.getElementById('nextExamBtn');
    
    if(nextBtn && status !== 'premium') {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modal = document.getElementById('subscriptionModal');
            if (modal) modal.classList.add('active');
            return false;
        };
    }
}

// زر الترقية في القائمة المنسدلة
upgradeBtn.onclick = function() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.classList.add('active');
};
        
        const dropdown = document.getElementById('profileDropdown');
        if (dropdown) {
            // حذف الزر القديم إذا كان موجوداً
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
// تحسين مظهر الهواتف في auth.js
// ============================================

function applyMobileAuthStyles() {
    if (window.innerWidth <= 768) {
        // تصغير نافذة تسجيل الدخول
        const loginPopupContent = document.querySelector('.login-popup-content');
        if (loginPopupContent) {
            loginPopupContent.style.padding = '20px';
            loginPopupContent.style.width = '280px';
            loginPopupContent.style.borderRadius = '20px';
        }
        
        // تصغير العناوين
        const popupTitle = document.querySelector('.login-popup-content h3');
        if (popupTitle) popupTitle.style.fontSize = '1rem';
        
        const popupText = document.querySelector('.login-popup-content p');
        if (popupText) popupText.style.fontSize = '11px';
        
        // تصغير حقول الإدخال
        const inputs = document.querySelectorAll('.login-popup-content input');
        inputs.forEach(input => {
            input.style.padding = '8px';
            input.style.fontSize = '12px';
        });
        
        // تصغير الأزرار
        const btns = document.querySelectorAll('.btn-popup-login, .btn-popup-close');
        btns.forEach(btn => {
            btn.style.padding = '8px';
            btn.style.fontSize = '12px';
        });
        
        // تصغير نافذة القفل (الامتحانات المقفلة)
        const lockedModal = document.querySelector('#lockedModal > div');
        if (lockedModal) {
            lockedModal.style.padding = '20px';
            lockedModal.style.maxWidth = '280px';
            lockedModal.style.borderRadius = '24px';
        }
        
        const lockedTitle = document.querySelector('#lockedModal h2');
        if (lockedTitle) lockedTitle.style.fontSize = '18px';
        
        const lockedText = document.querySelector('#lockedModal p');
        if (lockedText) lockedText.style.fontSize = '11px';
        
        const lockedButtons = document.querySelectorAll('#lockedModal button');
        lockedButtons.forEach(btn => {
            btn.style.padding = '8px 16px';
            btn.style.fontSize = '12px';
        });
        
        // تصغير القائمة المنسدلة للملف الشخصي
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

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    applyMobileAuthStyles();
});

// استدعاء الدالة بعد فتح نافذة تسجيل الدخول
const originalShowLoginPopup = window.showLoginPopup;
if (originalShowLoginPopup) {
    window.showLoginPopup = function() {
        originalShowLoginPopup();
        setTimeout(applyMobileAuthStyles, 50);
    };
}

// استدعاء الدالة بعد فتح نافذة القفل
const originalShowLockedMessage = window.showLockedMessage;
if (originalShowLockedMessage) {
    window.showLockedMessage = function(examTitle) {
        originalShowLockedMessage(examTitle);
        setTimeout(applyMobileAuthStyles, 50);
    };
}

// استدعاء الدالة بعد تحديث القائمة المنسدلة
const originalUpdateProfileDropdown = window.updateProfileDropdown;
if (originalUpdateProfileDropdown) {
    window.updateProfileDropdown = async function() {
        await originalUpdateProfileDropdown();
        setTimeout(applyMobileAuthStyles, 50);
    };
}
