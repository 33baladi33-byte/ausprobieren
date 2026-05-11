// ============================================
// notifications.js - نظام الإشعارات المتكامل
// يدعم: إخفاء البادج فور رؤية الإشعارات
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
    
    // ========== دالة تحميل الإشعارات من ملف JSON ==========
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
            console.warn('❌ فشل تحميل notifications.json، استخدام البيانات الافتراضية:', error);
            notificationsData = getDefaultNotifications();
        }
        
        // ترتيب الإشعارات من الأحدث إلى الأقدم
        notificationsData.sort((a, b) => b.id - a.id);
        
        // تحميل حالة القراءة المحفوظة من localStorage
        loadReadStatus();
        
        // تحديث عدد الإشعارات غير المقروءة
        updateUnreadCount();
        
        // تحديث واجهة المستخدم
        renderNotificationsList();
        updateBadge();
    }
    
    // ========== الإشعارات الافتراضية ==========
    function getDefaultNotifications() {
        return [
            { id: 3, title: "📚 إشعار تجريبي 3", message: "هذا إشعار تجريبي", time: "منذ يوم", unread: true },
            { id: 2, title: "💡 إشعار تجريبي 2", message: "هذا إشعار تجريبي آخر", time: "منذ يومين", unread: true },
            { id: 1, title: "🎉 مرحبا بك!", message: "نتمنى لك تجربة ممتعة", time: "منذ 3 أيام", unread: false }
        ];
    }
    
    // ========== حفظ حالة القراءة في localStorage ==========
    function saveReadStatus() {
        const readIds = notificationsData
            .filter(n => !n.unread)
            .map(n => n.id);
        localStorage.setItem('zertiva_notifications_read', JSON.stringify(readIds));
    }
    
    // ========== تحميل حالة القراءة ==========
    function loadReadStatus() {
        const saved = localStorage.getItem('zertiva_notifications_read');
        if (saved) {
            try {
                const readIds = JSON.parse(saved);
                notificationsData.forEach(notification => {
                    if (readIds.includes(notification.id)) {
                        notification.unread = false;
                    } else {
                        notification.unread = true;
                    }
                });
            } catch(e) {}
        }
    }
    
    // ========== تحديث عدد الإشعارات غير المقروءة ==========
    function updateUnreadCount() {
        unreadCount = notificationsData.filter(n => n.unread === true).length;
    }
    
    // ========== تحديث البادج الحمراء ==========
    function updateBadge() {
        if (!notificationBadge) return;
        if (unreadCount > 0) {
            notificationBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    // ========== عرض قائمة الإشعارات ==========
    function renderNotificationsList() {
        if (!notificationsList) return;
        
        let notificationsToShow = [];
        if (showAllMode) {
            notificationsToShow = notificationsData;
        } else {
            notificationsToShow = notificationsData.slice(0, 3);
        }
        
        if (notificationsToShow.length === 0) {
            notificationsList.innerHTML = `
                <div class="notification-empty">
                    <span>📭 لا توجد إشعارات</span>
                </div>
            `;
            return;
        }
        
        let html = '';
        for (let i = 0; i < notificationsToShow.length; i++) {
            const n = notificationsToShow[i];
            const unreadClass = n.unread ? 'unread' : '';
            html += `
                <div class="notification-item ${unreadClass}" data-id="${n.id}">
                    <div class="notification-icon">${getNotificationIcon(n.title)}</div>
                    <div class="notification-content">
                        <div class="notification-title">${escapeHtml(n.title)}</div>
                        <div class="notification-message">${escapeHtml(n.message)}</div>
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
            showAllDiv.innerHTML = '<button id="showAllNotificationsBtn" class="show-all-btn">📋 عرض جميع الإشعارات</button>';
            notificationsList.appendChild(showAllDiv);
            
            const showAllBtnElement = document.getElementById('showAllNotificationsBtn');
            if (showAllBtnElement) {
                showAllBtnElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showAllMode = true;
                    renderNotificationsList();
                });
            }
        }
        
        if (showAllMode && notificationsData.length > 3) {
            const showLessDiv = document.createElement('div');
            showLessDiv.className = 'notification-show-less';
            showLessDiv.innerHTML = '<button id="showLessNotificationsBtn" class="show-less-btn">⬆️ عرض أقل</button>';
            notificationsList.appendChild(showLessDiv);
            
            const showLessBtnElement = document.getElementById('showLessNotificationsBtn');
            if (showLessBtnElement) {
                showLessBtnElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showAllMode = false;
                    renderNotificationsList();
                });
            }
        }
        
        // إضافة حدث النقر على كل إشعار
        const items = notificationsList.querySelectorAll('.notification-item');
        items.forEach(item => {
            if (!item.classList.contains('notification-show-all') && !item.classList.contains('notification-show-less')) {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = parseInt(item.dataset.id);
                    if (!isNaN(id)) {
                        markAsRead(id);
                    }
                });
            }
        });
    }
    
    // ========== استخراج أيقونة ==========
    function getNotificationIcon(title) {
        if (title.includes('🎉')) return '🎉';
        if (title.includes('💡')) return '💡';
        if (title.includes('📚')) return '📚';
        if (title.includes('✅')) return '✅';
        if (title.includes('⚠️')) return '⚠️';
        if (title.includes('🔔')) return '🔔';
        if (title.includes('🆕')) return '🆕';
        if (title.includes('📖')) return '📖';
        if (title.includes('✍️')) return '✍️';
        if (title.includes('📝')) return '📝';
        return '📢';
    }
    
    // ========== ترميز النص ==========
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ========== تحديد إشعار واحد كمقروء ==========
    function markAsRead(notificationId) {
        let changed = false;
        for (let i = 0; i < notificationsData.length; i++) {
            if (notificationsData[i].id === notificationId && notificationsData[i].unread) {
                notificationsData[i].unread = false;
                changed = true;
                break;
            }
        }
        
        if (changed) {
            updateUnreadCount();
            renderNotificationsList();
            updateBadge();
            saveReadStatus();
        }
    }
    
    // ========== تحديد الكل كمقروء ==========
    function markAllAsRead() {
        let changed = false;
        for (let i = 0; i < notificationsData.length; i++) {
            if (notificationsData[i].unread) {
                notificationsData[i].unread = false;
                changed = true;
            }
        }
        
        if (changed) {
            updateUnreadCount();
            renderNotificationsList();
            updateBadge();
            saveReadStatus();
        }
        
        setTimeout(() => {
            closeDropdown();
        }, 500);
    }
    
    // ========== فتح القائمة ==========
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
            
            // 🔥 المهم: عند فتح القائمة، نعتبر جميع الإشعارات مقروءة
            markAllAsReadWhenOpened();
        }
    }
    
    // ========== إغلاق القائمة ==========
    function closeDropdown() {
        if (notificationDropdown && dropdownOpen) {
            notificationDropdown.classList.remove('active');
            dropdownOpen = false;
            if (showAllMode) {
                showAllMode = false;
                renderNotificationsList();
            }
        }
    }
    
    // ========== عند فتح القائمة، نعتبر جميع الإشعارات مقروءة ==========
    function markAllAsReadWhenOpened() {
        let changed = false;
        for (let i = 0; i < notificationsData.length; i++) {
            if (notificationsData[i].unread) {
                notificationsData[i].unread = false;
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
    
    // ========== إضافة زر الإشعارات إلى الـ Navbar ==========
    function addNotificationButton() {
        const topBar = document.querySelector('.top-bar');
        if (!topBar) {
            setTimeout(addNotificationButton, 500);
            return;
        }
        
        const rightButtons = topBar.querySelector('.right-buttons');
        if (!rightButtons) {
            setTimeout(addNotificationButton, 500);
            return;
        }
        
        if (topBar.querySelector('.notification-container')) {
            initializeElements();
            return;
        }
        
        const container = document.createElement('div');
        container.className = 'notification-container';
        
        const bell = document.createElement('button');
        bell.id = 'notificationBell';
        bell.className = 'notification-bell';
        bell.innerHTML = '🔔';
        
        const badge = document.createElement('span');
        badge.id = 'notificationBadge';
        badge.className = 'notification-badge';
        badge.style.display = 'none';
        bell.appendChild(badge);
        
        const dropdown = document.createElement('div');
        dropdown.id = 'notificationDropdown';
        dropdown.className = 'notification-dropdown';
        
        const header = document.createElement('div');
        header.className = 'notification-header';
        header.innerHTML = `
            <span>📬 الإشعارات</span>
            <button id="markAllReadBtn" class="mark-all-read">✅ تحديد الكل كمقروء</button>
        `;
        
        const list = document.createElement('div');
        list.id = 'notificationsList';
        list.className = 'notification-list';
        
        dropdown.appendChild(header);
        dropdown.appendChild(list);
        
        container.appendChild(bell);
        container.appendChild(dropdown);
        
        // إضافة زر الإشعارات داخل right-buttons
        rightButtons.insertBefore(container, rightButtons.firstChild);
        
        console.log('✅ تم إضافة زر الإشعارات بنجاح');
        initializeElements();
    }
    
    // ========== تهيئة العناصر ==========
    function initializeElements() {
        notificationBell = document.getElementById('notificationBell');
        notificationBadge = document.getElementById('notificationBadge');
        notificationDropdown = document.getElementById('notificationDropdown');
        notificationsList = document.getElementById('notificationsList');
        markAllReadBtn = document.getElementById('markAllReadBtn');
        
        if (notificationBell) {
            notificationBell.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleDropdown();
            });
        }
        
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                markAllAsRead();
            });
        }
        
        document.addEventListener('click', (e) => {
            if (dropdownOpen && notificationDropdown && !notificationDropdown.contains(e.target) && e.target !== notificationBell) {
                closeDropdown();
            }
        });
        
        loadNotifications();
    }
    
    // ========== دوال عامة ==========
    window.addNotification = function(title, message, time) {
        const newId = notificationsData.length > 0 ? Math.max(...notificationsData.map(n => n.id)) + 1 : 1;
        const newNotification = {
            id: newId,
            title: title,
            message: message,
            time: time || 'الآن',
            unread: true
        };
        notificationsData.unshift(newNotification);
        updateUnreadCount();
        renderNotificationsList();
        updateBadge();
        saveReadStatus();
        return newId;
    };
    
    window.getUnreadCount = function() {
        return unreadCount;
    };
    
    window.getNotifications = function() {
        return [...notificationsData];
    };
    
    window.refreshNotifications = async function() {
        await loadNotifications();
    };
    
    // ========== بدء التشغيل ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addNotificationButton);
    } else {
        addNotificationButton();
    }
    
    console.log('✅ notifications.js تم التحميل بنجاح');
    
})();
