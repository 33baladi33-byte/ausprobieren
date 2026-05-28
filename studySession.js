// ============================================
// studySession.js - نظام جلسات المراجعة (النسخة النهائية)
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
            closeEndBtn: document.getElementById('closeEndOverlayBtn')
        };
    }
    
    // ====== إخفاء رسالة "المراجعة شغالة" تماماً ======
    function showActiveMessage() {
        // لا تفعل شيء - العبارة مخفية
    }
    
    function hideActiveMessage() {
        // لا تفعل شيء
    }
    
    // ====== تشغيل صوت نهاية الجلسة ======
    let audioContext = null;
    function playEndSound() {
        try {
            if (audioContext) audioContext.close();
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioCtx();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sine';
            oscillator.frequency.value = 880;
            gainNode.gain.value = 0.2;
            oscillator.start();
            setTimeout(() => {
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.4);
                oscillator.stop(audioContext.currentTime + 0.4);
            }, 500);
            audioContext.resume();
        } catch(e) {}
    }
    
    // ====== إدارة وقت المراجعة اليومي (مخفي تماماً) ======
    function getTodayKey() {
        return `session_total_${new Date().toISOString().split('T')[0]}`;
    }
    
    function getTodayReviewedMinutes() {
        return parseInt(localStorage.getItem(getTodayKey())) || 0;
    }
    
    function addTodayReviewedMinutes(minutes) {
        const newTotal = getTodayReviewedMinutes() + minutes;
        localStorage.setItem(getTodayKey(), newTotal);
        // تم إخفاء updateTodayDisplay
        if (newTotal >= 120 && newTotal - minutes < 120) {
            showMessage("🔥 اليوم كنت مركز بزاف!");
        } else if (newTotal >= 60 && newTotal - minutes < 60) {
            showMessage("🇩🇪 تقدم ممتاز اليوم!");
        }
    }
    
    function showMessage(msg) {
        let bubble = document.getElementById('tempMsg');
        if (bubble) bubble.remove();
        bubble = document.createElement('div');
        bubble.id = 'tempMsg';
        bubble.textContent = msg;
        bubble.style.cssText = `position:fixed;bottom:80px;right:20px;background:#4ade80;color:#1a1a2e;padding:5px 12px;border-radius:40px;font-size:0.7rem;z-index:13999;`;
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }
    
    // تم إخفاء عرض وقت المراجعة اليومي نهائياً
    function updateTodayDisplay() {
        let display = document.getElementById('todayReviewedDisplay');
        if (display) {
            display.style.display = 'none';
            display.remove();
        }
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
    
    // ====== فتح/إغلاق النافذة ======
    function openModal() {
        const { modal } = getElements();
        if (!modal) return;
        if (activeSession) { 
            showMessage("⚠️ المراجعة شغالة حالياً");
            return; 
        }
        modal.classList.add('active');
    }
    
    function closeModal() {
        const { modal } = getElements();
        if (modal) modal.classList.remove('active');
    }
    
    // ====== تحديث العداد (دقائق وثواني) ======
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
    
    // ====== Bubble الـ 20% ======
    function showBubble() {
        let bubble = document.getElementById('timeBubble');
        if (bubble) bubble.remove();
        const msgs = ["🔥 بقي القليل", "🇩🇪 كمل للنهاية", "☕ الشاي قريب"];
        bubble = document.createElement('div');
        bubble.id = 'timeBubble';
        bubble.className = 'session-timer-bubble';
        bubble.textContent = msgs[Math.floor(Math.random() * msgs.length)];
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3500);
    }
    
    // ====== بدء الجلسة ======
    function startSession(minutes) {
        if (activeSession) return;
        
        totalSeconds = minutes * 60;
        remainingSeconds = totalSeconds;
        activeSession = true;
        closeModal();
        updateTimerDisplay();
        
        // تم إخفاء showActiveMessage();
        
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
                const percent = (remainingSeconds / totalSeconds) * 100;
                if (percent <= 20 && percent > 19.5 && !window._bubbleShown) {
                    showBubble();
                    window._bubbleShown = true;
                }
            }
        }, 1000);
    }
    
    // ====== إنهاء الجلسة ======
    function endSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        playEndSound();
        const minutesSpent = Math.floor(totalSeconds / 60);
        addTodayReviewedMinutes(minutesSpent);
        activeSession = false;
        
        // تم إخفاء hideActiveMessage();
        
        const { timerBar, endOverlay } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        if (endOverlay) endOverlay.style.display = 'flex';
        
        window._bubbleShown = false;
        const bubble = document.getElementById('timeBubble');
        if (bubble) bubble.remove();
        
        setTimeout(() => { 
            if (endOverlay) endOverlay.style.display = 'none'; 
        }, 5000);
    }
    
    // ====== إلغاء الجلسة ======
    function cancelSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        activeSession = false;
        
        // تم إخفاء hideActiveMessage();
        
        const { timerBar } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        
        window._bubbleShown = false;
        const bubble = document.getElementById('timeBubble');
        if (bubble) bubble.remove();
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
            updateTodayDisplay();
            console.log("✅ studySession.js جاهز - النسخة النهائية");
        }, 200);
    }
    
    init();
})();
