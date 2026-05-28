// ============================================
// studySession.js - نظام جلسات المراجعة
// ============================================

(function() {
    "use strict";
    
    // متغيرات الجلسة
    let activeSession = false;
    let sessionTimer = null;
    let remainingSeconds = 0;
    let totalSeconds = 0;
    let bubbleTimeout = null;
    
    // عناصر DOM
    const sessionModal = document.getElementById('studySessionModal');
    const sessionBtn = document.getElementById('studySessionBtn');
    const closeModalBtn = document.querySelector('.close-session-modal');
    const timeOptions = document.querySelectorAll('.time-option');
    const timerBar = document.getElementById('sessionTimerBar');
    const timerMinutesSpan = document.getElementById('timerMinutes');
    const timerSecondsSpan = document.getElementById('timerSeconds');
    const cancelBtn = document.getElementById('cancelSessionBtn');
    const endOverlay = document.getElementById('sessionEndOverlay');
    const closeEndBtn = document.getElementById('closeEndOverlayBtn');
    
    // عناصر اليوم
    const todayReviewedSpan = document.getElementById('todayReviewedSpan');
    
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
        
        // رسالة تشجيعية إذا تجاوز ساعة أو ساعتين
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
        
        // تحديث العرض إذا كان موجوداً
        let displayDiv = document.getElementById('todayReviewedDisplay');
        if (!displayDiv) {
            // إضافة العرض أسفل زر الجلسة
            const leftSide = document.querySelector('.left-side');
            if (leftSide && sessionBtn) {
                const existing = document.getElementById('todayReviewedDisplay');
                if (existing) existing.remove();
                
                displayDiv = document.createElement('div');
                displayDiv.id = 'todayReviewedDisplay';
                displayDiv.className = 'today-reviewed-display';
                displayDiv.innerHTML = `🇩🇪 راجعت اليوم: ${displayText}`;
                sessionBtn.insertAdjacentElement('afterend', displayDiv);
                
                // تنسيقه
                displayDiv.style.cssText = `
                    font-size: 0.7rem;
                    color: #a0a0b0;
                    margin-left: 8px;
                    background: rgba(100,150,200,0.1);
                    padding: 4px 10px;
                    border-radius: 30px;
                    white-space: nowrap;
                `;
            }
        } else {
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
        
        setTimeout(() => {
            if (bubble) bubble.remove();
        }, 3000);
    }
    
    // ==== عرض/إخفاء الزر حسب الصفحة ====
    function toggleSessionButton() {
        if (!sessionBtn) return;
        const homePage = document.getElementById('home');
        const listPage = document.getElementById('list');
        const examPage = document.getElementById('exam');
        
        if (homePage && homePage.classList.contains('active')) {
            sessionBtn.style.display = 'none';
            if (timerBar) timerBar.style.display = 'none';
        } else if ((listPage && listPage.classList.contains('active')) || (examPage && examPage.classList.contains('active'))) {
            sessionBtn.style.display = 'flex';
        } else {
            sessionBtn.style.display = 'none';
        }
    }
    
    // ==== فتح/إغلاق النافذة ====
    function openModal() {
        if (activeSession) {
            alert("يوجد جلسة نشطة حالياً. أنهِها أولاً.");
            return;
        }
        sessionModal.classList.add('active');
    }
    
    function closeModal() {
        sessionModal.classList.remove('active');
    }
    
    // ==== بدء الجلسة ====
    function startSession(minutes) {
        if (activeSession) return;
        
        totalSeconds = minutes * 60;
        remainingSeconds = totalSeconds;
        activeSession = true;
        
        closeModal();
        updateTimerDisplay();
        timerBar.style.display = 'flex';
        
        sessionTimer = setInterval(() => {
            if (remainingSeconds <= 0) {
                endSession();
            } else {
                remainingSeconds--;
                updateTimerDisplay();
                
                // إظهار Bubble عند 20% المتبقية
                const percentLeft = (remainingSeconds / totalSeconds) * 100;
                if (percentLeft <= 20 && percentLeft > 19.5 && !window._bubbleShown) {
                    showTimeRemainingBubble();
                    window._bubbleShown = true;
                }
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        if (timerMinutesSpan) timerMinutesSpan.textContent = mins.toString().padStart(2, '0');
        if (timerSecondsSpan) timerSecondsSpan.textContent = secs.toString().padStart(2, '0');
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
        
        setTimeout(() => {
            if (bubble) bubble.remove();
        }, 4000);
    }
    
    function endSession() {
        if (sessionTimer) {
            clearInterval(sessionTimer);
            sessionTimer = null;
        }
        
        const minutesSpent = Math.floor(totalSeconds / 60);
        addTodayReviewedMinutes(minutesSpent);
        
        activeSession = false;
        timerBar.style.display = 'none';
        window._bubbleShown = false;
        
        // إزالة أي bubble متبقية
        const existingBubble = document.getElementById('timeRemainingBubble');
        if (existingBubble) existingBubble.remove();
        
        // تشغيل صوت خفيف (اختياري)
        try {
            const audio = new Audio('data:audio/wav;base64,U3RlYWx0aCBzb3VuZCBub3QgYXZhaWxhYmxl');
            audio.volume = 0.3;
            audio.play().catch(() => {});
        } catch(e) {}
        
        // عرض نافذة النهاية
        endOverlay.style.display = 'flex';
        
        // إخفاؤها بعد 5 ثوانٍ أو بالضغط على الزر
        setTimeout(() => {
            if (endOverlay.style.display === 'flex') {
                endOverlay.style.display = 'none';
            }
        }, 5000);
    }
    
    function cancelSession() {
        if (sessionTimer) {
            clearInterval(sessionTimer);
            sessionTimer = null;
        }
        activeSession = false;
        timerBar.style.display = 'none';
        window._bubbleShown = false;
        
        const existingBubble = document.getElementById('timeRemainingBubble');
        if (existingBubble) existingBubble.remove();
    }
    
    // ==== ربط الأحداث ====
    if (sessionBtn) sessionBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', cancelSession);
    if (closeEndBtn) closeEndBtn.addEventListener('click', () => {
        endOverlay.style.display = 'none';
    });
    
    timeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const minutes = parseInt(btn.dataset.minutes);
            startSession(minutes);
        });
    });
    
    // إغلاق النافذة بالضغط خارجها
    if (sessionModal) {
        sessionModal.addEventListener('click', (e) => {
            if (e.target === sessionModal) closeModal();
        });
    }
    
    // مراقبة تغيير الصفحات
    const homePage = document.getElementById('home');
    const listPage = document.getElementById('list');
    const examPage = document.getElementById('exam');
    
    const observer = new MutationObserver(toggleSessionButton);
    if (homePage) observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
    if (listPage) observer.observe(listPage, { attributes: true, attributeFilter: ['class'] });
    if (examPage) observer.observe(examPage, { attributes: true, attributeFilter: ['class'] });
    
    // تهيئة العرض
    toggleSessionButton();
    updateTodayDisplay();
    
    // تصفير اليوم عند منتصف الليل (عند إعادة تحميل الصفحة فقط - كافٍ)
    console.log("✅ studySession.js جاهز");
})();