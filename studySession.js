// ============================================
// studySession.js - نظام جلسات المراجعة (النسخة النهائية مع المجموع الكلي)
// ============================================

(function() {
    "use strict";
    
    let activeSession = false;
    let sessionTimer = null;
    let remainingSeconds = 0;
    let totalSeconds = 0;
    
    // ====== الحصول على العناصر ======
    function getElements() {
        return {
            modal: document.getElementById('studySessionModal'),
            btn: document.getElementById('studySessionBtn'),
            timerBar: document.getElementById('sessionTimerBar'),
            timerMinutes: document.getElementById('timerMinutes'),
            timerSeconds: document.getElementById('timerSeconds'),
            cancelBtn: document.getElementById('cancelSessionBtn'),
            endOverlay: document.getElementById('sessionEndOverlay'),
            closeEndBtn: document.getElementById('closeEndOverlayBtn'),
            totalHoursValue: document.getElementById('totalHoursValue')
        };
    }
    
    // ====== إدارة مجموع ساعات الدراسة (الكلي) ======
    function getTotalStudyMinutes() {
        return parseInt(localStorage.getItem('total_study_minutes')) || 0;
    }
    
    function addTotalStudyMinutes(minutes) {
        const newTotal = getTotalStudyMinutes() + minutes;
        localStorage.setItem('total_study_minutes', newTotal);
    }
    
    function formatTotalHours() {
        const totalMinutes = getTotalStudyMinutes();
        const hours = totalMinutes / 60;
        
        if (totalMinutes < 120) { // أقل من ساعتين
            return hours.toFixed(1) + ' ساعة';
        } else {
            return Math.round(hours) + ' ساعات';
        }
    }
    
    // ====== عرض المجموع الكلي في النافذة ======
    function updateTotalDisplay() {
        const { totalHoursValue } = getElements();
        if (totalHoursValue) {
            totalHoursValue.textContent = formatTotalHours();
        }
    }
    
    // ====== تشغيل صوت نهاية الجلسة ======
    let endSound = null;
    
    function playEndSound() {
        try {
            if (endSound) {
                endSound.pause();
                endSound.currentTime = 0;
            }
            endSound = new Audio('sounds/end-sound.mp3');
            endSound.volume = 0.25;
            endSound.play().catch(e => console.log("⚠️ الصوت لم يتم تشغيله"));
        } catch(e) {
            console.log("❌ خطأ في تشغيل الصوت:", e);
        }
    }
    
    // ====== إدارة وقت المراجعة اليومي ======
    function getTodayKey() {
        return `session_total_${new Date().toISOString().split('T')[0]}`;
    }
    
    function getTodayReviewedMinutes() {
        return parseInt(localStorage.getItem(getTodayKey())) || 0;
    }
    
    function addTodayReviewedMinutes(minutes) {
        const newTotal = getTodayReviewedMinutes() + minutes;
        localStorage.setItem(getTodayKey(), newTotal);
    }
    
    // ====== رسالة مؤقتة ======
    function showMessage(msg) {
        let bubble = document.getElementById('tempMsg');
        if (bubble) bubble.remove();
        bubble = document.createElement('div');
        bubble.id = 'tempMsg';
        bubble.textContent = msg;
        bubble.style.cssText = `position:fixed;bottom:80px;right:20px;background:#2d2f36;color:#e0e0e0;padding:5px 12px;border-radius:40px;font-size:0.7rem;z-index:13999;opacity:0.9;`;
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }
    
    // ====== إظهار/إخفاء الزر حسب الصفحة ======
    function toggleSessionButton() {
        const { btn, timerBar } = getElements();
        if (!btn) return;
        const home = document.getElementById('home');
        const list = document.getElementById('list');
        const exam = document.getElementById('exam');
        
        if (home && home.classList.contains('active')) {
            btn.style.display = 'none';
            if (timerBar) timerBar.style.display = 'none';
        } else if ((list && list.classList.contains('active')) || (exam && exam.classList.contains('active'))) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }
    
    // ====== فتح النافذة ======
    function openModal() {
        const { modal } = getElements();
        if (!modal) return;
        if (activeSession) { 
            showMessage("⚡ المراجعة شغالة");
            return; 
        }
        updateTotalDisplay(); // تحديث المجموع عند الفتح
        modal.classList.add('active');
    }
    
    function closeModal() {
        const { modal } = getElements();
        if (modal) modal.classList.remove('active');
    }
    
    // ====== تحديث العداد ======
    function updateTimerDisplay() {
        const { timerMinutes, timerSeconds } = getElements();
        if (!timerMinutes) return;
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        timerMinutes.textContent = mins.toString().padStart(2, '0');
        if (timerSeconds) {
            timerSeconds.textContent = secs.toString().padStart(2, '0');
            timerSeconds.style.display = 'inline';
        }
    }
    
    // ====== بدء الجلسة ======
    function startSession(minutes) {
        if (activeSession) return;
        
        totalSeconds = minutes * 60;
        remainingSeconds = totalSeconds;
        activeSession = true;
        closeModal();
        updateTimerDisplay();
        
        const { timerBar } = getElements();
        if (timerBar) {
            timerBar.style.display = 'flex';
        }
        
        if (sessionTimer) clearInterval(sessionTimer);
        sessionTimer = setInterval(() => {
            if (remainingSeconds <= 0) {
                endSession();
            } else {
                remainingSeconds--;
                updateTimerDisplay();
            }
        }, 1000);
    }
    
    // ====== إنهاء الجلسة ======
    function endSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        
        // حساب الوقت الفعلي المستغرق
        const elapsedSeconds = totalSeconds - remainingSeconds;
        const minutesSpent = Math.floor(elapsedSeconds / 60);
        
        // إضافة للمجموع اليومي والكلي (إذا كان هناك وقت مستغرق)
        if (minutesSpent > 0) {
            addTodayReviewedMinutes(minutesSpent);
            addTotalStudyMinutes(minutesSpent);
        }
        
        playEndSound();
        activeSession = false;
        
        const { timerBar, endOverlay } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        if (endOverlay) endOverlay.style.display = 'flex';
        
        // تحديث عرض المجموع
        updateTotalDisplay();
        
        setTimeout(() => { 
            if (endOverlay) endOverlay.style.display = 'none'; 
        }, 4000);
    }
    
    // ====== إلغاء الجلسة ======
    function cancelSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        
        // حساب الوقت الفعلي المستغرق عند الإلغاء
        const elapsedSeconds = totalSeconds - remainingSeconds;
        const minutesSpent = Math.floor(elapsedSeconds / 60);
        
        // إضافة للمجموع اليومي والكلي (إذا كان هناك وقت مستغرق)
        if (minutesSpent > 0) {
            addTodayReviewedMinutes(minutesSpent);
            addTotalStudyMinutes(minutesSpent);
        }
        
        activeSession = false;
        
        const { timerBar } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        
        // تحديث عرض المجموع
        updateTotalDisplay();
    }
    
    // ====== ربط الأحداث ======
    function bindEvents() {
        const { btn, cancelBtn, closeEndBtn, modal } = getElements();
        
        if (btn) {
            btn.removeEventListener('click', openModal);
            btn.addEventListener('click', openModal);
        }
        
        const closeBtn = document.querySelector('.close-session-modal');
        if (closeBtn) {
            closeBtn.removeEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (cancelBtn) {
            cancelBtn.removeEventListener('click', cancelSession);
            cancelBtn.addEventListener('click', cancelSession);
        }
        
        if (closeEndBtn) {
            closeEndBtn.removeEventListener('click', () => {});
            closeEndBtn.addEventListener('click', () => {
                const { endOverlay } = getElements();
                if (endOverlay) endOverlay.style.display = 'none';
            });
        }
        
        document.querySelectorAll('.time-option').forEach(opt => {
            opt.removeEventListener('click', () => {});
            opt.addEventListener('click', () => {
                startSession(parseInt(opt.dataset.minutes));
            });
        });
        
        if (modal) {
            modal.removeEventListener('click', (e) => {});
            modal.addEventListener('click', (e) => { 
                if (e.target === modal) closeModal(); 
            });
        }
    }
    
    // ====== مراقبة تغيير الصفحات ======
    function setupObserver() {
        const home = document.getElementById('home');
        const list = document.getElementById('list');
        const exam = document.getElementById('exam');
        
        const observer = new MutationObserver(() => toggleSessionButton());
        if (home) observer.observe(home, { attributes: true, attributeFilter: ['class'] });
        if (list) observer.observe(list, { attributes: true, attributeFilter: ['class'] });
        if (exam) observer.observe(exam, { attributes: true, attributeFilter: ['class'] });
        
        toggleSessionButton();
    }
    
    // ====== التهيئة ======
    function init() {
        setTimeout(() => {
            bindEvents();
            setupObserver();
            updateTotalDisplay();
            console.log("✅ studySession.js جاهز - النسخة النهائية مع المجموع الكلي");
        }, 200);
    }
    
    init();
})();
