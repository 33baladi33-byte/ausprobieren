// ============================================
// studySession.js - نظام جلسات المراجعة (نسخة مصححة)
// ============================================

(function() {
    "use strict";
    
    // متغيرات الجلسة
    let activeSession = false;
    let sessionTimer = null;
    let remainingSeconds = 0;
    let totalSeconds = 0;
    
    // عناصر DOM - مع التحقق من وجودها
    let sessionModal = document.getElementById('studySessionModal');
    let sessionBtn = document.getElementById('studySessionBtn');
    let timerBar = document.getElementById('sessionTimerBar');
    let timerMinutesSpan = document.getElementById('timerMinutes');
    let timerSecondsSpan = document.getElementById('timerSeconds');
    let cancelBtn = document.getElementById('cancelSessionBtn');
    let endOverlay = document.getElementById('sessionEndOverlay');
    let closeEndBtn = document.getElementById('closeEndOverlayBtn');
    
    // ==== دالة للبحث عن العناصر مرة أخرى (لأنها قد تضاف بعد التحميل) ====
    function refreshElements() {
        sessionModal = document.getElementById('studySessionModal');
        sessionBtn = document.getElementById('studySessionBtn');
        timerBar = document.getElementById('sessionTimerBar');
        timerMinutesSpan = document.getElementById('timerMinutes');
        timerSecondsSpan = document.getElementById('timerSeconds');
        cancelBtn = document.getElementById('cancelSessionBtn');
        endOverlay = document.getElementById('sessionEndOverlay');
        closeEndBtn = document.getElementById('closeEndOverlayBtn');
    }
    
    // ==== تخزين وقت المراجعة اليومي ====
    function getTodayKey() {
        const today = new Date().toISOString().split('T')[0];
        return `session_total_${today}`;
    }
    
    function getTodayReviewedMinutes() {
        const key = getTodayKey();
        const saved = localStorage.getItem(key);
        return saved ? parseInt(saved) : 0;
    }
    
    function addTodayReviewedMinutes(minutes) {
        const current = getTodayReviewedMinutes();
        const newTotal = current + minutes;
        localStorage.setItem(getTodayKey(), newTotal);
        updateTodayDisplay();
        
        if (newTotal >= 120 && newTotal - minutes < 120) {
            showEncouragementMessage("🔥 اليوم كنت مركز بزاف!");
        } else if (newTotal >= 60 && newTotal - minutes < 60) {
            showEncouragementMessage("🇩🇪 تقدم ممتاز اليوم!");
        }
    }
    
    function updateTodayDisplay() {
        const minutes = getTodayReviewedMinutes();
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        let displayText = "";
        if (hours > 0) {
            displayText = `${hours}h ${mins}m`;
        } else {
            displayText = `${mins}m`;
        }
        
        let displayDiv = document.getElementById('todayReviewedDisplay');
        if (!displayDiv && sessionBtn) {
            displayDiv = document.createElement('div');
            displayDiv.id = 'todayReviewedDisplay';
            displayDiv.className = 'today-reviewed-display';
            displayDiv.innerHTML = `🇩🇪 راجعت اليوم: ${displayText}`;
            displayDiv.style.cssText = `
                font-size: 0.7rem;
                color: #a0a0b0;
                margin-left: 8px;
                background: rgba(100,150,200,0.1);
                padding: 4px 10px;
                border-radius: 30px;
                white-space: nowrap;
            `;
            sessionBtn.insertAdjacentElement('afterend', displayDiv);
        } else if (displayDiv) {
            displayDiv.innerHTML = `🇩🇪 راجعت اليوم: ${displayText}`;
        }
    }
    
    function showEncouragementMessage(msg) {
        let bubble = document.getElementById('encouragementBubble');
        if (bubble) bubble.remove();
        
        bubble = document.createElement('div');
        bubble.id = 'encouragementBubble';
        bubble.textContent = msg;
        bubble.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #4ade80;
            color: #1a1a2e;
            padding: 8px 16px;
            border-radius: 40px;
            font-size: 0.8rem;
            font-weight: 500;
            z-index: 13999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: bubblePulse 0.4s ease;
        `;
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }
    
    // ==== عرض/إخفاء الزر حسب الصفحة (المشكلة الأساسية) ====
    function toggleSessionButton() {
        refreshElements();
        if (!sessionBtn) return;
        
        const homePage = document.getElementById('home');
        const listPage = document.getElementById('list');
        const examPage = document.getElementById('exam');
        
        // التحقق من وجود الصفحات و active
        if (homePage && homePage.classList && homePage.classList.contains('active')) {
            sessionBtn.style.display = 'none';
            if (timerBar) timerBar.style.display = 'none';
        } 
        else if ((listPage && listPage.classList && listPage.classList.contains('active')) || 
                 (examPage && examPage.classList && examPage.classList.contains('active'))) {
            sessionBtn.style.display = 'flex';
        } 
        else {
            sessionBtn.style.display = 'none';
        }
    }
    
    // ==== فتح/إغلاق النافذة (المشكلة الثانية) ====
    function openModal() {
        refreshElements(); // تأكد من وجود العنصر
        
        if (!sessionModal) {
            console.error("❌ sessionModal غير موجود في DOM");
            return;
        }
        
        if (activeSession) {
            alert("يوجد جلسة نشطة حالياً. أنهِها أولاً.");
            return;
        }
        
        sessionModal.classList.add('active');
    }
    
    function closeModal() {
        refreshElements();
        if (sessionModal) {
            sessionModal.classList.remove('active');
        }
    }
    
    // ==== بدء الجلسة ====
    function startSession(minutes) {
        if (activeSession) return;
        
        totalSeconds = minutes * 60;
        remainingSeconds = totalSeconds;
        activeSession = true;
        
        closeModal();
        updateTimerDisplay();
        if (timerBar) timerBar.style.display = 'flex';
        
        sessionTimer = setInterval(() => {
            if (remainingSeconds <= 0) {
                endSession();
            } else {
                remainingSeconds--;
                updateTimerDisplay();
                
                const percentLeft = (remainingSeconds / totalSeconds) * 100;
                if (percentLeft <= 20 && percentLeft > 19.5 && !window._bubbleShown) {
                    showTimeRemainingBubble();
                    window._bubbleShown = true;
                }
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        if (!timerMinutesSpan || !timerSecondsSpan) return;
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        timerMinutesSpan.textContent = mins.toString().padStart(2, '0');
        timerSecondsSpan.textContent = secs.toString().padStart(2, '0');
    }
    
    function showTimeRemainingBubble() {
        let bubble = document.getElementById('timeRemainingBubble');
        if (bubble) bubble.remove();
        
        const messages = [
            "🔥 بقي القليل فقط",
            "🇩🇪 ممتاز… كمل للنهاية",
            "☕ الشاي قريب 😂",
            "💪 أنت على وشك الإنجاز"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        
        bubble = document.createElement('div');
        bubble.id = 'timeRemainingBubble';
        bubble.className = 'session-timer-bubble';
        bubble.textContent = randomMsg;
        document.body.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), 4000);
    }
    
    function endSession() {
        if (sessionTimer) {
            clearInterval(sessionTimer);
            sessionTimer = null;
        }
        
        const minutesSpent = Math.floor(totalSeconds / 60);
        addTodayReviewedMinutes(minutesSpent);
        
        activeSession = false;
        if (timerBar) timerBar.style.display = 'none';
        window._bubbleShown = false;
        
        const existingBubble = document.getElementById('timeRemainingBubble');
        if (existingBubble) existingBubble.remove();
        
        // عرض نافذة النهاية
        if (endOverlay) endOverlay.style.display = 'flex';
        
        setTimeout(() => {
            if (endOverlay) endOverlay.style.display = 'none';
        }, 5000);
    }
    
    function cancelSession() {
        if (sessionTimer) {
            clearInterval(sessionTimer);
            sessionTimer = null;
        }
        activeSession = false;
        if (timerBar) timerBar.style.display = 'none';
        window._bubbleShown = false;
        
        const existingBubble = document.getElementById('timeRemainingBubble');
        if (existingBubble) existingBubble.remove();
    }
    
    // ==== ربط الأحداث مع تأخير صغير لضمان وجود العناصر ====
    function bindEvents() {
        refreshElements();
        
        if (sessionBtn) {
            sessionBtn.removeEventListener('click', openModal);
            sessionBtn.addEventListener('click', openModal);
        }
        
        const closeModalBtn = document.querySelector('.close-session-modal');
        if (closeModalBtn) {
            closeModalBtn.removeEventListener('click', closeModal);
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (cancelBtn) {
            cancelBtn.removeEventListener('click', cancelSession);
            cancelBtn.addEventListener('click', cancelSession);
        }
        
        if (closeEndBtn) {
            closeEndBtn.removeEventListener('click', () => {});
            closeEndBtn.addEventListener('click', () => {
                if (endOverlay) endOverlay.style.display = 'none';
            });
        }
        
        // أزرار الوقت
        const timeOptions = document.querySelectorAll('.time-option');
        timeOptions.forEach(btn => {
            btn.removeEventListener('click', () => {});
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.dataset.minutes);
                startSession(minutes);
            });
        });
        
        // إغلاق النافذة بالضغط خارجها
        if (sessionModal) {
            sessionModal.removeEventListener('click', (e) => {});
            sessionModal.addEventListener('click', (e) => {
                if (e.target === sessionModal) closeModal();
            });
        }
    }
    
    // ==== مراقبة تغيير الصفحات ====
    function setupPageObserver() {
        const homePage = document.getElementById('home');
        const listPage = document.getElementById('list');
        const examPage = document.getElementById('exam');
        
        const observer = new MutationObserver(() => {
            toggleSessionButton();
        });
        
        if (homePage) observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
        if (listPage) observer.observe(listPage, { attributes: true, attributeFilter: ['class'] });
        if (examPage) observer.observe(examPage, { attributes: true, attributeFilter: ['class'] });
        
        toggleSessionButton();
    }
    
    // ==== التهيئة ====
    function init() {
        setTimeout(() => {
            refreshElements();
            bindEvents();
            setupPageObserver();
            updateTodayDisplay();
            console.log("✅ studySession.js جاهز ومصَحَّح");
        }, 500);
    }
    
    init();
})();
