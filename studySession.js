// ============================================
// studySession.js - نظام جلسات المراجعة (نسخة نهائية)
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
    
    // ====== تشغيل صوت نهاية الجلسة ======
    let audioContext = null;
    
    function playEndSound() {
        try {
            if (audioContext) {
                audioContext.close();
            }
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioCtx();
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 880;
            gainNode.gain.value = 0.25;
            
            oscillator.start();
            
            setTimeout(() => {
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, 600);
            
            audioContext.resume();
        } catch(e) {
            console.log("⚠️ الصوت غير مدعوم");
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
        updateTodayDisplay();
        
        if (newTotal >= 120 && newTotal - minutes < 120) {
            showTempMessage("🔥 اليوم كنت مركز بزاف!");
        } else if (newTotal >= 60 && newTotal - minutes < 60) {
            showTempMessage("🇩🇪 تقدم ممتاز اليوم!");
        }
    }
    
    function showTempMessage(msg) {
        let bubble = document.getElementById('tempMessage');
        if (bubble) bubble.remove();
        bubble = document.createElement('div');
        bubble.id = 'tempMessage';
        bubble.textContent = msg;
        bubble.style.cssText = `position:fixed;bottom:80px;right:20px;background:#4ade80;color:#1a1a2e;padding:6px 14px;border-radius:40px;font-size:0.75rem;z-index:13999;box-shadow:0 4px 12px rgba(0,0,0,0.2);`;
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }
    
    function updateTodayDisplay() {
        const minutes = getTodayReviewedMinutes();
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const text = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
        
        let display = document.getElementById('todayReviewedDisplay');
        const { btn } = getElements();
        if (!display && btn) {
            display = document.createElement('div');
            display.id = 'todayReviewedDisplay';
            display.style.cssText = `font-size:0.65rem;color:#a0a0b0;margin-left:8px;background:rgba(100,150,200,0.1);padding:3px 8px;border-radius:30px;white-space:nowrap;`;
            btn.insertAdjacentElement('afterend', display);
        }
        if (display) display.innerHTML = `🇩🇪 راجعت اليوم: ${text}`;
    }
    
    // ====== إظهار/إخفاء الزر حسب الصفحة ======
    function toggleSessionButton() {
        const { btn } = getElements();
        if (!btn) return;
        const home = document.getElementById('home');
        const list = document.getElementById('list');
        const exam = document.getElementById('exam');
        
        if (home && home.classList.contains('active')) {
            btn.style.display = 'none';
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
            showTempMessage("⚠️ يوجد جلسة نشطة حالياً"); 
            return; 
        }
        modal.classList.add('active');
    }
    
    function closeModal() {
        const { modal } = getElements();
        if (modal) modal.classList.remove('active');
    }
    
    // ====== تحديث العداد ======
    function updateTimerDisplay() {
        const { timerMinutes, timerSeconds } = getElements();
        if (!timerMinutes || !timerSeconds) return;
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        timerMinutes.textContent = mins.toString().padStart(2, '0');
        timerSeconds.textContent = secs.toString().padStart(2, '0');
    }
    
    // ====== إظهار Bubble عند 20% المتبقية ======
    function showRemainingBubble() {
        let bubble = document.getElementById('timeBubble');
        if (bubble) bubble.remove();
        const messages = ["🔥 بقي القليل فقط", "🇩🇪 ممتاز… كمل للنهاية", "☕ الشاي قريب 😂"];
        bubble = document.createElement('div');
        bubble.id = 'timeBubble';
        bubble.className = 'session-timer-bubble';
        bubble.textContent = messages[Math.floor(Math.random() * messages.length)];
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 4000);
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
        if (timerBar) timerBar.style.display = 'flex';
        
        sessionTimer = setInterval(() => {
            if (remainingSeconds <= 0) {
                endSession();
            } else {
                remainingSeconds--;
                updateTimerDisplay();
                
                const percent = (remainingSeconds / totalSeconds) * 100;
                if (percent <= 20 && percent > 19.5 && !window._bubbleShown) {
                    showRemainingBubble();
                    window._bubbleShown = true;
                }
            }
        }, 1000);
    }
    
    // ====== إنهاء الجلسة ======
    function endSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        
        // تشغيل الصوت
        playEndSound();
        
        const minutesSpent = Math.floor(totalSeconds / 60);
        addTodayReviewedMinutes(minutesSpent);
        activeSession = false;
        
        const { timerBar, endOverlay } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        if (endOverlay) endOverlay.style.display = 'flex';
        
        window._bubbleShown = false;
        const bubble = document.getElementById('timeBubble');
        if (bubble) bubble.remove();
        
        // إغلاق النافذة تلقائياً بعد 5 ثوانٍ
        setTimeout(() => { 
            if (endOverlay) endOverlay.style.display = 'none'; 
        }, 5000);
    }
    
    // ====== إلغاء الجلسة ======
    function cancelSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        activeSession = false;
        
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
            opt.addEventListener('click', () => startSession(parseInt(opt.dataset.minutes)));
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
            console.log("✅ studySession.js جاهز");
        }, 100);
    }
    
    init();
})();
