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
// ========== نظام الإشعارات (إضافة جديدة) ==========

let notificationsData = null;

async function loadNotifications() {
    try {
        const response = await fetch('notifications.json?_=' + Date.now());
        if (!response.ok) return;
        const data = await response.json();
        notificationsData = data;
        
        const savedRead = localStorage.getItem('notifications_read');
        if (savedRead) {
            const readStatus = JSON.parse(savedRead);
            if (notificationsData.notifications) {
                notificationsData.notifications.forEach(n => {
                    if (readStatus[n.id]) n.read = true;
                });
            }
        }
        updateNotificationBadge();
    } catch(e) {
        console.log("no notifications file");
    }
}

function updateNotificationBadge() {
    if (!notificationsData || !notificationsData.notifications) return;
    const unread = notificationsData.notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        if (unread > 0) {
            badge.textContent = unread > 9 ? '9+' : unread;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function formatNotificationDate(dateStr) {
    const today = new Date().toISOString().slice(0,10);
    if (dateStr === today) return 'اليوم';
    return dateStr;
}

async function renderNotifications() {
    const list = document.getElementById('notificationsList');
    if (!list) return;
    
    if (!notificationsData || !notificationsData.notifications || notificationsData.notifications.length === 0) {
        list.innerHTML = '<div class="notifications-loading">📭 لا توجد إشعارات</div>';
        return;
    }
    
    const sorted = [...notificationsData.notifications].reverse();
    let html = '';
    for (const n of sorted) {
        const typeIcon = n.type === 'sale' ? '🛒' : (n.type === 'success' ? '✅' : '📢');
        const isUnread = !n.read;
        html += `
            <div class="notification-item ${isUnread ? 'unread' : 'read'}" data-id="${n.id}" data-link="${n.link || ''}">
                <div class="notification-icon">${typeIcon}</div>
                <div class="notification-content">
                    <div class="notification-title">${n.title}</div>
                    <div class="notification-message">${n.message}</div>
                    <div class="notification-date">📅 ${formatNotificationDate(n.date)}</div>
                </div>
                ${isUnread ? '<div class="notification-unread-dot"></div>' : ''}
            </div>
        `;
    }
    list.innerHTML = html;
    
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', async (e) => {
            const id = parseInt(item.dataset.id);
            const link = item.dataset.link;
            await markNotificationRead(id);
            if (link && link !== '') window.location.href = link;
        });
    });
}

async function markNotificationRead(id) {
    if (!notificationsData) return;
    const n = notificationsData.notifications.find(n => n.id === id);
    if (n && !n.read) {
        n.read = true;
        const readStatus = {};
        notificationsData.notifications.forEach(n => { if (n.read) readStatus[n.id] = true; });
        localStorage.setItem('notifications_read', JSON.stringify(readStatus));
        updateNotificationBadge();
        await renderNotifications();
    }
}

async function markAllNotificationsRead() {
    if (!notificationsData) return;
    let changed = false;
    notificationsData.notifications.forEach(n => {
        if (!n.read) { n.read = true; changed = true; }
    });
    if (changed) {
        const readStatus = {};
        notificationsData.notifications.forEach(n => { if (n.read) readStatus[n.id] = true; });
        localStorage.setItem('notifications_read', JSON.stringify(readStatus));
        updateNotificationBadge();
        await renderNotifications();
    }
}

function toggleNotifications() {
    const dropdown = document.getElementById('notificationsDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function bindNotificationEvents() {
    const btn = document.getElementById('notificationBtn');
    if (btn) btn.addEventListener('click', toggleNotifications);
    
    const markBtn = document.getElementById('markAllReadBtn');
    if (markBtn) markBtn.addEventListener('click', markAllNotificationsRead);
    
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('notificationsDropdown');
        const btn = document.getElementById('notificationBtn');
        if (dropdown && dropdown.classList.contains('show')) {
            if (!btn?.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        }
    });
    
    loadNotifications();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindNotificationEvents);
} else {
    bindNotificationEvents();
}
