/**
 * auth.js - نظام إدارة تسجيل الدخول والاشتراك لموقع Zertiva B2
 */

const WA_NUMBER = "212687561491";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

let currentUserStatus = 'guest';
let currentExpiry = null;

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
        // حذف زر الترقية إذا كان موجوداً (للمستخدم المسجل)
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
        
        // إضافة زر الترقية للمستخدم غير المسجل (لون رمادي مزرق)
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
            // فتح نافذة تسجيل الدخول أولاً
            showLoginPopup();
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
    
    // إذا كان المستخدم مسجل (مجاني أو منتهي) نوجهه لصفحة الاشتراك
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
