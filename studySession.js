// ============================================
// studySession.js - نظام جلسات المراجعة (متكامل مع الإحصائيات)
// ============================================

(function() {
    "use strict";
    
    let activeSession = false;
    let sessionTimer = null;
    let remainingSeconds = 0;
    let totalSeconds = 0;
    
    // ====== الثوابت الخاصة بالإحصائيات ======
    const STATS_KEY = 'stats_daily_data';
    const DEFAULT_GOAL = 120; // دقيقة
    
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
            totalHoursValue: document.getElementById('totalHoursValue'),
            // عناصر الإحصائيات الجديدة
            goalDisplay: document.getElementById('statsGoalDisplay'),
            goalRingText: document.getElementById('statsRingGoalText'),
            goalRingUnit: document.getElementById('statsRingGoalUnit'),
            ringFg: document.querySelector('.stats-ring-fg'),
            streakNumber: document.getElementById('statsStreakNumber'),
            yesterdayValue: document.getElementById('statsYesterdayValue'),
            yesterdayUnit: document.getElementById('statsYesterdayUnit'),
            completedValue: document.getElementById('statsCompletedValue'),
            historyList: document.getElementById('statsHistoryList'),
            editGoalBtn: document.getElementById('statsEditGoalBtn'),
            goalModal: document.getElementById('statsGoalModal'),
            goalModalClose: document.getElementById('statsGoalModalClose'),
            goalSelect: document.getElementById('statsGoalSelect'),
            goalSaveBtn: document.getElementById('statsGoalSaveBtn'),
            historyBtn: document.getElementById('statsHistoryBtn'),
            historyModal: document.getElementById('statsHistoryModal'),
            historyModalClose: document.getElementById('statsHistoryModalClose')
        };
    }
    
    // ====== إدارة بيانات الإحصائيات ======
    function getDefaultStats() {
        return {
            goal: DEFAULT_GOAL,
            history: [] // [{date: '2026-08-04', minutes: 45}, ...]
        };
    }
    
    function loadStats() {
        try {
            const raw = localStorage.getItem(STATS_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                if (!data.history) data.history = [];
                if (!data.goal) data.goal = DEFAULT_GOAL;
                return data;
            }
        } catch (e) {}
        return getDefaultStats();
    }
    
    function saveStats(data) {
        try {
            localStorage.setItem(STATS_KEY, JSON.stringify(data));
        } catch (e) {}
    }
    
    // ====== دوال مساعدة ======
    function getTodayString() {
        return new Date().toISOString().split('T')[0];
    }
    
    function getYesterdayString() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().split('T')[0];
    }
    
    function getStudyMinutesForDate(dateStr) {
        const key = `session_total_${dateStr}`;
        return parseInt(localStorage.getItem(key)) || 0;
    }
    
    function getTodayMinutes() {
        return getStudyMinutesForDate(getTodayString());
    }
    
    function getYesterdayMinutes() {
        return getStudyMinutesForDate(getYesterdayString());
    }
    
    // ====== حساب التقدم ======
    function calculateProgress(todayMinutes, goalMinutes) {
        if (goalMinutes <= 0) return 0;
        const ratio = todayMinutes / goalMinutes;
        return Math.min(ratio, 1);
    }
    
    // ====== حساب Streak ======
    function calculateStreak(goal) {
        if (goal <= 0) return 0;
        let streak = 0;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        for (let i = 0; i < 365; i++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const minutes = getStudyMinutesForDate(dateStr);
            if (minutes >= goal) {
                streak++;
            } else {
                break;
            }
            currentDate.setDate(currentDate.getDate() - 1);
        }
        return streak;
    }
    
    // ====== تحديث واجهة الإحصائيات ======
    function updateStatsUI() {
        const els = getElements();
        const data = loadStats();
        const goal = data.goal;
        const todayMinutes = getTodayMinutes();
        const yesterdayMinutes = getYesterdayMinutes();
        const progress = calculateProgress(todayMinutes, goal);
        const streak = calculateStreak(goal);
        const circumference = 339.292;
        const offset = circumference * (1 - progress);
        
        // تحديث الدائرة
        if (els.ringFg) {
            els.ringFg.style.strokeDashoffset = offset;
        }
        
        // تحديث النص داخل الدائرة
        if (els.goalRingText) {
            const hours = Math.floor(goal / 60);
            const mins = goal % 60;
            let display = '';
            if (hours > 0) {
                display = hours;
                els.goalRingUnit.textContent = (hours === 1) ? 'ساعة' : 'ساعات';
            } else {
                display = mins;
                els.goalRingUnit.textContent = 'دقيقة';
            }
            els.goalRingText.textContent = display;
        }
        
        // تحديث "هدف اليوم" في الأعلى
        if (els.goalDisplay) {
            const hours = Math.floor(goal / 60);
            const mins = goal % 60;
            let text = '';
            if (hours > 0) {
                text = hours + (hours === 1 ? ' ساعة' : ' ساعات');
                if (mins > 0) text += ' ' + mins + ' دقيقة';
            } else {
                text = mins + ' دقيقة';
            }
            els.goalDisplay.textContent = text;
        }
        
        // تحديث Streak
        if (els.streakNumber) {
            els.streakNumber.textContent = streak;
        }
        
        // تحديث Yesterday
        if (els.yesterdayValue) {
            if (yesterdayMinutes === 0) {
                els.yesterdayValue.textContent = '0';
                els.yesterdayUnit.textContent = 'دقيقة';
            } else {
                const hours = Math.floor(yesterdayMinutes / 60);
                const mins = yesterdayMinutes % 60;
                if (hours > 0) {
                    if (mins === 0) {
                        els.yesterdayValue.textContent = hours;
                        els.yesterdayUnit.textContent = (hours === 1) ? 'ساعة' : 'ساعات';
                    } else {
                        const decimal = Math.round((yesterdayMinutes / 60) * 10) / 10;
                        els.yesterdayValue.textContent = decimal;
                        els.yesterdayUnit.textContent = (decimal === 1) ? 'ساعة' : 'ساعات';
                    }
                } else {
                    els.yesterdayValue.textContent = mins;
                    els.yesterdayUnit.textContent = (mins === 1) ? 'دقيقة' : 'دقائق';
                }
            }
        }
        
        // تحديث Completed (الوقت المنجز اليوم)
        if (els.completedValue) {
            const hours = Math.floor(todayMinutes / 60);
            const mins = todayMinutes % 60;
            let text = '';
            if (hours > 0) {
                text = hours + (hours === 1 ? ' ساعة' : ' ساعات');
                if (mins > 0) text += '، ' + mins + ' دقيقة';
            } else {
                text = mins + ' دقيقة';
            }
            els.completedValue.textContent = text || '0 دقيقة';
        }
        
        // تحديث المجموع الكلي (من studySession)
        updateTotalDisplay();
    }
    
    // ====== تحديث السجل ======
    function updateHistoryUI() {
        const els = getElements();
        if (!els.historyList) return;
        const data = loadStats();
        const history = data.history || [];
        if (history.length === 0) {
            els.historyList.innerHTML = '<div class="stats-history-empty">📭 لا يوجد سجل بعد</div>';
            return;
        }
        const recent = history.slice(-30).reverse();
        let html = '';
        recent.forEach(entry => {
            const date = entry.date;
            const minutes = entry.minutes;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            let timeStr = '';
            if (hours > 0) {
                timeStr = hours + (hours === 1 ? ' ساعة' : ' ساعات');
                if (mins > 0) timeStr += ' ' + mins + ' دقيقة';
            } else {
                timeStr = mins + (mins === 1 ? ' دقيقة' : ' دقائق');
            }
            html += `
                <div class="stats-history-item">
                    <span class="date">${date}</span>
                    <span class="time">${timeStr}</span>
                </div>
            `;
        });
        els.historyList.innerHTML = html;
    }
    
    // ====== دالة تُستدعى عند إضافة وقت دراسة ======
    function updateStatsAfterStudy(minutes) {
        // تحديث السجل
        const todayStr = getTodayString();
        const data = loadStats();
        const history = data.history || [];
        const existingIndex = history.findIndex(item => item.date === todayStr);
        const todayMinutes = getTodayMinutes();
        if (existingIndex !== -1) {
            history[existingIndex].minutes = todayMinutes;
        } else {
            history.push({ date: todayStr, minutes: todayMinutes });
        }
        history.sort((a, b) => a.date.localeCompare(b.date));
        data.history = history;
        saveStats(data);
        
        // تحديث الواجهة إذا كانت النافذة مفتوحة
        const modal = document.getElementById('studySessionModal');
        if (modal && modal.classList.contains('active')) {
            updateStatsUI();
        }
    }
    
    // ====== تصدير الدالة للاستخدام من studySession ======
    window.updateStatsAfterStudy = updateStatsAfterStudy;
    
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
        if (totalMinutes < 120) {
            return hours.toFixed(1) + ' ساعة';
        } else {
            return Math.round(hours) + ' ساعات';
        }
    }
    
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
    
    // ====== إدارة وقت المراجعة اليومي (للجلسات) ======
    function getTodayKey() {
        return `session_total_${new Date().toISOString().split('T')[0]}`;
    }
    
    function addTodayReviewedMinutes(minutes) {
        const newTotal = getTodayMinutes() + minutes;
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
    
    // ====== إظهار/إخفاء زر الجلسة ======
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
    
    // ====== فتح وإغلاق النافذة ======
    function openModal() {
        const { modal } = getElements();
        if (!modal) return;
        if (activeSession) {
            showMessage("⚡ المراجعة شغالة");
            return;
        }
        // تحديث الإحصائيات قبل الفتح
        updateStatsUI();
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
        if (timerBar) timerBar.style.display = 'flex';
        
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
    
    // ====== إنهاء الجلسة (عند انتهاء الوقت) ======
    function endSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        
        const elapsedSeconds = totalSeconds - remainingSeconds;
        const minutesSpent = Math.floor(elapsedSeconds / 60);
        
        if (minutesSpent > 0) {
            addTodayReviewedMinutes(minutesSpent);
            addTotalStudyMinutes(minutesSpent);
            // تحديث الإحصائيات
            updateStatsAfterStudy(minutesSpent);
        }
        
        playEndSound();
        activeSession = false;
        
        const { timerBar, endOverlay } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        if (endOverlay) endOverlay.style.display = 'flex';
        
        updateTotalDisplay();
        
        setTimeout(() => {
            if (endOverlay) endOverlay.style.display = 'none';
        }, 4000);
    }
    
    // ====== إلغاء الجلسة (بواسطة المستخدم) ======
    function cancelSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        
        const elapsedSeconds = totalSeconds - remainingSeconds;
        const minutesSpent = Math.floor(elapsedSeconds / 60);
        
        if (minutesSpent > 0) {
            addTodayReviewedMinutes(minutesSpent);
            addTotalStudyMinutes(minutesSpent);
            updateStatsAfterStudy(minutesSpent);
        }
        
        activeSession = false;
        
        const { timerBar } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        
        updateTotalDisplay();
    }
    
    // ====== نوافذ تعديل الهدف والسجل ======
    function openGoalModal() {
        const els = getElements();
        if (!els.goalModal) return;
        const data = loadStats();
        els.goalSelect.value = data.goal;
        els.goalModal.classList.add('active');
        els.goalModal.style.display = 'flex';
    }
    
    function closeGoalModal() {
        const els = getElements();
        if (!els.goalModal) return;
        els.goalModal.classList.remove('active');
        setTimeout(() => {
            els.goalModal.style.display = 'none';
        }, 300);
    }
    
    function saveGoal() {
        const els = getElements();
        if (!els.goalSelect) return;
        const newGoal = parseInt(els.goalSelect.value);
        if (isNaN(newGoal) || newGoal <= 0) return;
        const data = loadStats();
        data.goal = newGoal;
        saveStats(data);
        closeGoalModal();
        updateStatsUI();
        showMessage('✅ تم تحديث الهدف');
    }
    
    function openHistoryModal() {
        const els = getElements();
        if (!els.historyModal) return;
        updateHistoryUI();
        els.historyModal.classList.add('active');
        els.historyModal.style.display = 'flex';
    }
    
    function closeHistoryModal() {
        const els = getElements();
        if (!els.historyModal) return;
        els.historyModal.classList.remove('active');
        setTimeout(() => {
            els.historyModal.style.display = 'none';
        }, 300);
    }
    
    // ====== ربط الأحداث ======
    function bindEvents() {
        const els = getElements();
        
        // زر فتح النافذة
        if (els.btn) {
            els.btn.addEventListener('click', openModal);
        }
        
        // إغلاق النافذة الرئيسية
        const closeBtn = document.querySelector('.close-session-modal');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (els.modal) {
            els.modal.addEventListener('click', function(e) {
                if (e.target === els.modal) closeModal();
            });
        }
        
        // أزرار المدة
        document.querySelectorAll('.time-option').forEach(opt => {
            opt.addEventListener('click', function() {
                startSession(parseInt(this.dataset.minutes));
            });
        });
        
        // إلغاء الجلسة
        if (els.cancelBtn) {
            els.cancelBtn.addEventListener('click', cancelSession);
        }
        
        // إغلاق نافذة النهاية
        if (els.closeEndBtn) {
            els.closeEndBtn.addEventListener('click', function() {
                if (els.endOverlay) els.endOverlay.style.display = 'none';
            });
        }
        
        // تعديل الهدف
        if (els.editGoalBtn) {
            els.editGoalBtn.addEventListener('click', openGoalModal);
        }
        if (els.goalModalClose) {
            els.goalModalClose.addEventListener('click', closeGoalModal);
        }
        if (els.goalSaveBtn) {
            els.goalSaveBtn.addEventListener('click', saveGoal);
        }
        if (els.goalModal) {
            els.goalModal.addEventListener('click', function(e) {
                if (e.target === els.goalModal) closeGoalModal();
            });
        }
        
        // السجل
        if (els.historyBtn) {
            els.historyBtn.addEventListener('click', openHistoryModal);
        }
        if (els.historyModalClose) {
            els.historyModalClose.addEventListener('click', closeHistoryModal);
        }
        if (els.historyModal) {
            els.historyModal.addEventListener('click', function(e) {
                if (e.target === els.historyModal) closeHistoryModal();
            });
        }
        
        // إغلاق النوافذ بالـ ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (els.modal && els.modal.classList.contains('active')) closeModal();
                if (els.goalModal && els.goalModal.classList.contains('active')) closeGoalModal();
                if (els.historyModal && els.historyModal.classList.contains('active')) closeHistoryModal();
            }
        });
    }
    
    // ====== مراقبة تغيير الصفحات ======
    function setupObserver() {
        const home = document.getElementById('home');
        const list = document.getElementById('list');
        const exam = document.getElementById('exam');
        const observer = new MutationObserver(() => {
            setTimeout(toggleSessionButton, 20);
        });
        if (home) observer.observe(home, { attributes: true, attributeFilter: ['class'] });
        if (list) observer.observe(list, { attributes: true, attributeFilter: ['class'] });
        if (exam) observer.observe(exam, { attributes: true, attributeFilter: ['class'] });
        toggleSessionButton();
    }
    
    // ====== التهيئة ======
    function init() {
        setTimeout(() => {
            // تهيئة البيانات إذا كانت فارغة
            const data = loadStats();
            if (!data.history || data.history.length === 0) {
                saveStats(data);
            }
            bindEvents();
            setupObserver();
            updateTotalDisplay();
            // تصدير الدالة لاستخدامها خارجياً
            window.toggleSessionButton = toggleSessionButton;
            console.log("✅ studySession.js جاهز - النسخة المتكاملة مع الإحصائيات");
        }, 200);
    }
    
    init();
})();
