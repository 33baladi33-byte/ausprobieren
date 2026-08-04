// ============================================
// studySession.js - نظام جلسات المراجعة (مع Pause/Resume، Streak فوري)
// ============================================

(function() {
    "use strict";
    
    // ====== المتغيرات العامة ======
    let activeSession = false;
    let sessionTimer = null;
    let remainingSeconds = 0;
    let totalSeconds = 0;
    let isPaused = false;
    let pausedMinutes = 0; // الوقت المنقضي عند الإيقاف المؤقت
    
    // ====== الثوابت الخاصة بالإحصائيات ======
    const STATS_KEY = 'stats_daily_data';
    const DEFAULT_GOAL = 120; // دقيقة
    const PAUSE_STATE_KEY = 'session_pause_state';
    const STREAK_ACHIEVED_KEY = 'streak_achieved_today';
    
    // ====== الحصول على العناصر ======
    function getElements() {
        return {
            modal: document.getElementById('studySessionModal'),
            btn: document.getElementById('studySessionBtn'),
            timerBar: document.getElementById('sessionTimerBar'),
            timerMinutes: document.getElementById('timerMinutes'),
            timerSeconds: document.getElementById('timerSeconds'),
            cancelBtn: document.getElementById('cancelSessionBtn'),
            pauseBtn: document.getElementById('pauseSessionBtn'),
            endOverlay: document.getElementById('sessionEndOverlay'),
            closeEndBtn: document.getElementById('closeEndOverlayBtn'),
            totalHoursValue: document.getElementById('totalHoursValue'),
            // عناصر الإحصائيات
            goalRingText: document.getElementById('statsRingGoalText'),
            goalRingUnit: document.getElementById('statsRingGoalUnit'),
            ringFg: document.querySelector('.stats-ring-fg'),
            streakNumber: document.getElementById('statsStreakNumber'),
            yesterdayValue: document.getElementById('statsYesterdayValue'),
            yesterdayUnit: document.getElementById('statsYesterdayUnit'),
            completedValue: document.getElementById('statsCompletedValue'),
            historyList: document.getElementById('statsHistoryList'),
            // أزرار الصفحات الداخلية
            editGoalBtn: document.getElementById('statsEditGoalBtn'),
            goalContent: document.getElementById('statsGoalContent'),
            goalBackBtn: document.getElementById('statsGoalBackBtn'),
            goalSelect: document.getElementById('statsGoalSelect'),
            goalSaveBtn: document.getElementById('statsGoalSaveBtn'),
            historyBtn: document.getElementById('statsHistoryBtn'),
            historyContent: document.getElementById('statsHistoryContent'),
            historyBackBtn: document.getElementById('statsHistoryBackBtn'),
            mainContent: document.getElementById('statsMainContent')
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
    
    // ====== التحقق من اليوم الجديد وإعادة ضبط Streak ======
    function checkNewDay() {
        const today = getTodayString();
        const lastDate = localStorage.getItem('stats_last_date');
        if (lastDate !== today) {
            // اليوم الجديد: إعادة ضبط Streak إذا لم يتحقق الهدف أمس
            const data = loadStats();
            const goal = data.goal;
            const yesterdayMinutes = getStudyMinutesForDate(lastDate || today);
            // إذا كان الأمس غير محقق، نضبط Streak إلى 0 (يتم حسابه تلقائياً لاحقاً)
            // لكننا لا نحذف Streak نهائياً، بل نعيد حسابه من جديد
            localStorage.setItem('stats_last_date', today);
            // إزالة علامة تحقيق الهدف اليوم
            localStorage.removeItem(STREAK_ACHIEVED_KEY);
            // سيتم إعادة حساب Streak عند التحديث
        }
    }
    
    // ====== حساب Streak ======
    function calculateStreak(goal) {
        if (goal <= 0) return 0;
        let streak = 0;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); // نبدأ من الأمس
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
    
    // ====== تحديث Streak فوراً عند تحقيق الهدف ======
    function updateStreakIfGoalMet() {
        const data = loadStats();
        const goal = data.goal;
        const todayMinutes = getTodayMinutes();
        const today = getTodayString();
        const achievedKey = `${STREAK_ACHIEVED_KEY}_${today}`;
        
        // إذا تم تحقيق الهدف ولم نسجل ذلك اليوم
        if (todayMinutes >= goal && !localStorage.getItem(achievedKey)) {
            // سجل أننا حققنا الهدف اليوم
            localStorage.setItem(achievedKey, 'true');
            // تحديث Streak (سيتم حسابه في refreshAll)
            refreshAll();
            // عرض تأثير بسيط
            showMessage('🎯 تم تحقيق الهدف اليومي!');
        }
    }
    
    // ====== حساب التقدم ======
    function calculateProgress(todayMinutes, goalMinutes) {
        if (goalMinutes <= 0) return 0;
        const ratio = todayMinutes / goalMinutes;
        return Math.min(ratio, 1);
    }
    
    // ====== تحديث واجهة الإحصائيات ======
    function refreshAll() {
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
        
        // تحديث Completed
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
        
        // تحديث المجموع الكلي
        updateTotalDisplay();
        
        // التحقق من تحقيق الهدف لتحديث Streak فوراً
        updateStreakIfGoalMet();
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
        if (minutes <= 0) return;
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
            refreshAll();
        }
        // تحديث Streak فوراً
        updateStreakIfGoalMet();
    }
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
    
    // ====== إدارة وقت المراجعة اليومي ======
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
    
    // ====== إدارة الصفحات الداخلية ======
    function showMainContent() {
        const els = getElements();
        if (els.mainContent) els.mainContent.style.display = 'block';
        if (els.goalContent) els.goalContent.style.display = 'none';
        if (els.historyContent) els.historyContent.style.display = 'none';
    }
    
    function showGoalContent() {
        const els = getElements();
        if (els.mainContent) els.mainContent.style.display = 'none';
        if (els.goalContent) els.goalContent.style.display = 'flex';
        if (els.historyContent) els.historyContent.style.display = 'none';
        // تعيين القيمة الحالية في الـ select
        const data = loadStats();
        els.goalSelect.value = data.goal;
    }
    
    function showHistoryContent() {
        const els = getElements();
        if (els.mainContent) els.mainContent.style.display = 'none';
        if (els.goalContent) els.goalContent.style.display = 'none';
        if (els.historyContent) els.historyContent.style.display = 'flex';
        updateHistoryUI();
    }
    
    // ====== فتح وإغلاق النافذة ======
    function openModal() {
        const { modal } = getElements();
        if (!modal) return;
        if (activeSession) {
            showMessage("⚡ المراجعة شغالة");
            return;
        }
        // التحقق من اليوم الجديد
        checkNewDay();
        // عرض المحتوى الرئيسي
        showMainContent();
        refreshAll();
        modal.classList.add('active');
    }
    
    function closeModal() {
        const { modal } = getElements();
        if (modal) modal.classList.remove('active');
        showMainContent();
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
    
    // ====== حفظ واستعادة حالة الإيقاف المؤقت ======
    function savePauseState(state) {
        try {
            localStorage.setItem(PAUSE_STATE_KEY, JSON.stringify(state));
        } catch (e) {}
    }
    
    function loadPauseState() {
        try {
            const raw = localStorage.getItem(PAUSE_STATE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) {}
        return null;
    }
    
    function clearPauseState() {
        localStorage.removeItem(PAUSE_STATE_KEY);
    }
    
    // ====== بدء الجلسة ======
    function startSession(minutes) {
        if (activeSession) return;
        
        // التحقق من وجود حالة موقفة
        const savedState = loadPauseState();
        if (savedState && savedState.isPaused) {
            // استئناف الجلسة
            totalSeconds = savedState.totalSeconds;
            remainingSeconds = savedState.remainingSeconds;
            activeSession = true;
            isPaused = false;
            pausedMinutes = 0;
            clearPauseState();
            closeModal();
            updateTimerDisplay();
            const { timerBar, pauseBtn } = getElements();
            if (timerBar) timerBar.style.display = 'flex';
            if (pauseBtn) pauseBtn.textContent = '⏸';
            if (sessionTimer) clearInterval(sessionTimer);
            sessionTimer = setInterval(() => {
                if (remainingSeconds <= 0) {
                    endSession();
                } else {
                    remainingSeconds--;
                    updateTimerDisplay();
                }
            }, 1000);
            showMessage('▶️ استئناف الجلسة');
            return;
        }
        
        // بدء جلسة جديدة
        totalSeconds = minutes * 60;
        remainingSeconds = totalSeconds;
        activeSession = true;
        isPaused = false;
        pausedMinutes = 0;
        closeModal();
        updateTimerDisplay();
        
        const { timerBar, pauseBtn } = getElements();
        if (timerBar) timerBar.style.display = 'flex';
        if (pauseBtn) pauseBtn.textContent = '⏸';
        
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
    
    // ====== إيقاف مؤقت (Pause) ======
    function pauseSession() {
        if (!activeSession || isPaused) return;
        
        // حساب الوقت المنقضي
        const elapsedSeconds = totalSeconds - remainingSeconds;
        const minutesSpent = Math.floor(elapsedSeconds / 60);
        
        if (minutesSpent > 0) {
            // إضافة الوقت المنقضي إلى اليوم والمجموع الكلي
            addTodayReviewedMinutes(minutesSpent);
            addTotalStudyMinutes(minutesSpent);
            updateStatsAfterStudy(minutesSpent);
        }
        
        // حفظ حالة الإيقاف المؤقت
        savePauseState({
            totalSeconds: totalSeconds,
            remainingSeconds: remainingSeconds,
            isPaused: true
        });
        
        // إيقاف المؤقت
        if (sessionTimer) clearInterval(sessionTimer);
        isPaused = true;
        activeSession = false; // مؤقتاً
        
        // تغيير زر Pause إلى Resume
        const { pauseBtn } = getElements();
        if (pauseBtn) pauseBtn.textContent = '▶';
        
        // نترك العداد ظاهراً (لا نخفيه)
        // تحديث الإحصائيات
        refreshAll();
        showMessage('⏸️ تم إيقاف الجلسة مؤقتاً');
    }
    
    // ====== استئناف (Resume) - يتم استدعاؤه من زر Pause مرة أخرى ======
    function resumeSession() {
        const savedState = loadPauseState();
        if (!savedState || !savedState.isPaused) return;
        
        // استئناف الجلسة
        totalSeconds = savedState.totalSeconds;
        remainingSeconds = savedState.remainingSeconds;
        activeSession = true;
        isPaused = false;
        clearPauseState();
        
        const { pauseBtn } = getElements();
        if (pauseBtn) pauseBtn.textContent = '⏸';
        
        if (sessionTimer) clearInterval(sessionTimer);
        sessionTimer = setInterval(() => {
            if (remainingSeconds <= 0) {
                endSession();
            } else {
                remainingSeconds--;
                updateTimerDisplay();
            }
        }, 1000);
        showMessage('▶️ استئناف الجلسة');
    }
    
    // ====== تبديل Pause/Resume ======
    function togglePause() {
        if (isPaused) {
            resumeSession();
        } else {
            pauseSession();
        }
    }
    
    // ====== إنهاء الجلسة (عند انتهاء الوقت) ======
    function endSession() {
        if (sessionTimer) clearInterval(sessionTimer);
        
        const elapsedSeconds = totalSeconds - remainingSeconds;
        const minutesSpent = Math.floor(elapsedSeconds / 60);
        
        if (minutesSpent > 0) {
            addTodayReviewedMinutes(minutesSpent);
            addTotalStudyMinutes(minutesSpent);
            updateStatsAfterStudy(minutesSpent);
        }
        
        playEndSound();
        activeSession = false;
        isPaused = false;
        clearPauseState();
        
        const { timerBar, endOverlay, pauseBtn } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        if (pauseBtn) pauseBtn.textContent = '⏸';
        if (endOverlay) endOverlay.style.display = 'flex';
        
        updateTotalDisplay();
        refreshAll();
        
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
        isPaused = false;
        clearPauseState();
        
        const { timerBar, pauseBtn } = getElements();
        if (timerBar) timerBar.style.display = 'none';
        if (pauseBtn) pauseBtn.textContent = '⏸';
        
        updateTotalDisplay();
        refreshAll();
    }
    
    // ====== ربط الأحداث ======
    function bindEvents() {
        const els = getElements();
        
        // زر فتح النافذة
        if (els.btn) {
            els.btn.addEventListener('click', openModal);
        }
        
        // إغلاق النافذة الرئيسية
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
        
        // زر Pause/Resume
        if (els.pauseBtn) {
            els.pauseBtn.addEventListener('click', togglePause);
        }
        
        // إغلاق نافذة النهاية
        if (els.closeEndBtn) {
            els.closeEndBtn.addEventListener('click', function() {
                if (els.endOverlay) els.endOverlay.style.display = 'none';
            });
        }
        
        // ====== الصفحات الداخلية ======
        // Edit Goal
        if (els.editGoalBtn) {
            els.editGoalBtn.addEventListener('click', function() {
                if (activeSession) {
                    showMessage('⚠️ أنهِ الجلسة أولاً');
                    return;
                }
                showGoalContent();
            });
        }
        if (els.goalBackBtn) {
            els.goalBackBtn.addEventListener('click', showMainContent);
        }
        if (els.goalSaveBtn) {
            els.goalSaveBtn.addEventListener('click', function() {
                const newGoal = parseInt(els.goalSelect.value);
                if (isNaN(newGoal) || newGoal <= 0) return;
                const data = loadStats();
                data.goal = newGoal;
                saveStats(data);
                showMainContent();
                refreshAll();
                showMessage('✅ تم تحديث الهدف');
            });
        }
        
        // History
        if (els.historyBtn) {
            els.historyBtn.addEventListener('click', function() {
                if (activeSession) {
                    showMessage('⚠️ أنهِ الجلسة أولاً');
                    return;
                }
                showHistoryContent();
            });
        }
        if (els.historyBackBtn) {
            els.historyBackBtn.addEventListener('click', showMainContent);
        }
        
        // إغلاق النوافذ بالـ ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (els.modal && els.modal.classList.contains('active')) {
                    // إذا كانت صفحة داخلية مفتوحة، نغلقها أولاً
                    if (els.goalContent && els.goalContent.style.display === 'flex') {
                        showMainContent();
                    } else if (els.historyContent && els.historyContent.style.display === 'flex') {
                        showMainContent();
                    } else {
                        closeModal();
                    }
                }
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
            // التأكد من وجود بيانات
            const data = loadStats();
            if (!data.history || data.history.length === 0) {
                saveStats(data);
            }
            // التحقق من اليوم الجديد
            checkNewDay();
            bindEvents();
            setupObserver();
            updateTotalDisplay();
            // تصدير الدوال
            window.toggleSessionButton = toggleSessionButton;
            window.refreshStats = refreshAll;
            
            // التحقق من وجود حالة إيقاف مؤقت عند التحميل
            const savedState = loadPauseState();
            if (savedState && savedState.isPaused) {
                console.log('⏸️ توجد جلسة موقفة مؤقتاً. اضغط على زر Pause لاستئنافها.');
                // تحديث العداد إذا كان ظاهراً
                if (savedState.remainingSeconds) {
                    remainingSeconds = savedState.remainingSeconds;
                    totalSeconds = savedState.totalSeconds;
                    updateTimerDisplay();
                    const { timerBar, pauseBtn } = getElements();
                    if (timerBar) timerBar.style.display = 'flex';
                    if (pauseBtn) pauseBtn.textContent = '▶';
                    isPaused = true;
                    activeSession = false;
                }
            }
            
            console.log("✅ studySession.js جاهز - مع Pause/Resume و Streak فوري");
        }, 200);
    }
    
    init();
})();
