// ============================================
// notifications.js - نظام الإشعارات المتكامل (نسخة متوافقة مع HTML)
// ============================================

(function() {
    // ========== المتغيرات العامة ==========
    let notificationsData = [];
    let unreadCount = 0;
    let dropdownOpen = false;
    let showAllMode = false;
    
    // ========== عناصر DOM ==========
    let notificationBell = null;
    let notificationBadge = null;
    let notificationDropdown = null;
    let notificationsList = null;
    let markAllReadBtn = null;
    
    // ========== الإشعارات الافتراضية ==========
    function getDefaultNotifications() {
        return [
            { id: 15, title: "🆕 تحديث محتوى", message: "الخوت، راه تزادت تيما جديدة فـ Schreiben B2", time: "11 ماي 2026", unread: true },
            { id: 14, title: "🆕 تحديث محتوى", message: "الخوت، راه تزادت تيما جديدة فـ Schreiben B2", time: "10 ماي 2026", unread: true },
            { id: 13, title: "📖 تحديث Lesen Teil 3", message: "الخوت، راه درنا واحد التعديل فالموضوع", time: "10 ماي 2026", unread: true },
            { id: 12, title: "✍️ تحديث Schreiben", message: "الخوت راه تزادت تيما جديدة", time: "9 ماي 2026", unread: true },
            { id: 11, title: "📝 تحديث Sprachbausteine Teil 2", message: "الخوت راه تزادت موضوع جديد", time: "8 ماي 2026", unread: true },
            { id: 10, title: "📚 المواضيع اللي تحطات", message: "السلام الخوت، هادي خلاصة ديال ڭاع المواضيع", time: "7 ماي 2026", unread: true }
        ];
    }
    
    // ========== دالة تحميل الإشعارات ==========
    async function loadNotifications() {
        try {
            const response = await fetch('data/notifications.json');
            if (response.ok) {
                const data = await response.json();
                notificationsData = data.notifications || [];
            } else {
                notificationsData = getDefaultNotifications();
            }
        } catch (error) {
            console.warn('❌ فشل تحميل notifications.json، استخدام البيانات الافتراضية');
            notificationsData = getDefaultNotifications();
        }
        
        notificationsData.sort((a, b) => b.id - a.id);
        loadReadStatus();
        updateUnreadCount();
        renderNotificationsList();
        updateBadge();
    }
    
    // ========== حفظ واسترجاع حالة القراءة ==========
    function saveReadStatus() {
        const readIds = notificationsData.filter(n => !n.unread).map(n => n.id);
        localStorage.setItem('zertiva_notifications_read', JSON.stringify(readIds));
    }
    
    function loadReadStatus() {
        const saved = localStorage.getItem('zertiva_notifications_read');
        if (saved) {
            try {
                const readIds = JSON.parse(saved);
                notificationsData.forEach(notification => {
                    notification.unread = !readIds.includes(notification.id);
                });
            } catch(e) {}
        }
    }
    
    function updateUnreadCount() {
        unreadCount = notificationsData.filter(n => n.unread === true).length;
    }
    
    function updateBadge() {
        if (!notificationBadge) return;
        if (unreadCount > 0) {
            notificationBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function getNotificationIcon(title) {
        if (title.includes('🆕')) return '🆕';
        if (title.includes('📖')) return '📖';
        if (title.includes('✍️')) return '✍️';
        if (title.includes('📝')) return '📝';
        if (title.includes('📚')) return '📚';
        if (title.includes('🐟')) return '🐟';
        if (title.includes('🐱')) return '🐱';
        if (title.includes('⚠️')) return '⚠️';
        if (title.includes('🦁')) return '🦁';
        if (title.includes('🪑')) return '🪑';
        if (title.includes('🚗')) return '🚗';
        return '📢';
    }
    
    function renderNotificationsList() {
        if (!notificationsList) return;
        
        let notificationsToShow = showAllMode ? notificationsData : notificationsData.slice(0, 3);
        
        if (notificationsToShow.length === 0) {
            notificationsList.innerHTML = '<div class="notification-empty">📭 لا توجد إشعارات</div>';
            return;
        }
        
        let html = '';
        for (const n of notificationsToShow) {
            const unreadClass = n.unread ? 'unread' : '';
            html += `
                <div class="notification-item ${unreadClass}" data-id="${n.id}">
                    <div class="notification-icon">${getNotificationIcon(n.title)}</div>
                    <div class="notification-content">
                        <div class="notification-title">${escapeHtml(n.title)}</div>
                        <div class="notification-message">${escapeHtml(n.message.substring(0, 80))}${n.message.length > 80 ? '...' : ''}</div>
                        <div class="notification-time">🕐 ${escapeHtml(n.time)}</div>
                    </div>
                </div>
            `;
        }
        
        notificationsList.innerHTML = html;
        
        // إضافة زر "عرض الكل"
        if (!showAllMode && notificationsData.length > 3) {
            const showAllDiv = document.createElement('div');
            showAllDiv.className = 'notification-show-all';
            showAllDiv.innerHTML = '<button class="show-all-btn">📋 عرض جميع الإشعارات</button>';
            notificationsList.appendChild(showAllDiv);
            
            showAllDiv.querySelector('.show-all-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                showAllMode = true;
                renderNotificationsList();
            });
        }
        
        if (showAllMode && notificationsData.length > 3) {
            const showLessDiv = document.createElement('div');
            showLessDiv.className = 'notification-show-less';
            showLessDiv.innerHTML = '<button class="show-less-btn">⬆️ عرض أقل</button>';
            notificationsList.appendChild(showLessDiv);
            
            showLessDiv.querySelector('.show-less-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                showAllMode = false;
                renderNotificationsList();
            });
        }
        
        // ربط حدث النقر على الإشعارات
        document.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(item.dataset.id);
                if (!isNaN(id)) {
                    const notif = notificationsData.find(n => n.id === id);
                    if (notif && notif.unread) {
                        notif.unread = false;
                        updateUnreadCount();
                        renderNotificationsList();
                        updateBadge();
                        saveReadStatus();
                    }
                }
            });
        });
    }
    
    function markAllAsRead() {
        let changed = false;
        for (const n of notificationsData) {
            if (n.unread) {
                n.unread = false;
                changed = true;
            }
        }
        if (changed) {
            updateUnreadCount();
            renderNotificationsList();
            updateBadge();
            saveReadStatus();
        }
        setTimeout(() => closeDropdown(), 300);
    }
    
    function toggleDropdown() {
        if (!notificationDropdown) return;
        
        if (dropdownOpen) {
            notificationDropdown.classList.remove('active');
            dropdownOpen = false;
            if (showAllMode) {
                showAllMode = false;
                renderNotificationsList();
            }
        } else {
            notificationDropdown.classList.add('active');
            dropdownOpen = true;
            
            // ✅ عند فتح القائمة، نعتبر جميع الإشعارات مقروءة
            let changed = false;
            for (const n of notificationsData) {
                if (n.unread) {
                    n.unread = false;
                    changed = true;
                }
            }
            if (changed) {
                updateUnreadCount();
                renderNotificationsList();
                updateBadge();
                saveReadStatus();
            }
        }
    }
    
    function closeDropdown() {
        if (notificationDropdown && dropdownOpen) {
            notificationDropdown.classList.remove('active');
            dropdownOpen = false;
        }
    }
    
    // ========== تهيئة العناصر الموجودة في HTML ==========
    function initializeElements() {
        notificationBell = document.getElementById('notificationBell');
        notificationBadge = document.getElementById('notificationBadge');
        notificationDropdown = document.getElementById('notificationDropdown');
        notificationsList = document.getElementById('notificationsList');
        markAllReadBtn = document.getElementById('markAllReadBtn');
        
        if (!notificationBell) {
            console.warn('⚠️ زر الإشعارات غير موجود في الصفحة');
            return false;
        }
        
        // ربط حدث النقر على الجرس
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });
        
        // ربط زر "تحديد الكل كمقروء"
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                markAllAsRead();
            });
        }
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (dropdownOpen && notificationDropdown && 
                !notificationDropdown.contains(e.target) && 
                e.target !== notificationBell) {
                closeDropdown();
            }
        });
        
        return true;
    }
    
    // ========== دوال عامة للاستخدام من خارج الملف ==========
    window.addNotification = function(title, message, time) {
        const newId = notificationsData.length > 0 ? Math.max(...notificationsData.map(n => n.id)) + 1 : 1;
        notificationsData.unshift({
            id: newId,
            title: title,
            message: message,
            time: time || 'الآن',
            unread: true
        });
        updateUnreadCount();
        renderNotificationsList();
        updateBadge();
        saveReadStatus();
        return newId;
    };
    
    window.refreshNotifications = function() {
        loadNotifications();
    };
    
    // ========== بدء التشغيل ==========
    function init() {
        if (initializeElements()) {
            loadNotifications();
            console.log('✅ notifications.js تم التحميل بنجاح');
        } else {
            console.warn('⚠️ notifications.js: العناصر غير جاهزة، إعادة المحاولة بعد 500ms');
            setTimeout(init, 500);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
