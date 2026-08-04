// statsDashboard.js - لوحة الإحصائيات اليومية المتكاملة
(function() {
    "use strict";
    
    // ====== الثوابت ======
    const STORAGE_KEY = 'stats_dashboard_data';
    const DEFAULT_GOAL = 120; // 2 ساعات بالدقائق
    
    // ====== الحصول على العناصر ======
    function getElements() {
        return {
            overlay: document.getElementById('statsDashboardOverlay'),
            card: document.querySelector('.stats-card'),
            closeBtn: document.getElementById('statsCloseBtn'),
            openBtn: document.getElementById('statsDashboardBtn'),
            goalDisplay: document.getElementById('statsGoalDisplay'),
            editGoalBtn: document.getElementById('statsEditGoalBtn'),
            goalModal: document.getElementById('statsGoalModal'),
            goalModalClose: document.getElementById('statsGoalModalClose'),
            goalSelect: document.getElementById('statsGoalSelect'),
            goalSaveBtn: document.getElementById('statsGoalSaveBtn'),
            streakNumber: document.getElementById('statsStreakNumber'),
            yesterdayValue: document.getElementById('statsYesterdayValue'),
            yesterdayUnit: document.getElementById('statsYesterdayUnit'),
            historyBtn: document.getElementById('statsHistoryBtn'),
            historyModal: document.getElementById('statsHistoryModal'),
            historyModalClose: document.getElementById('statsHistoryModalClose'),
            historyList: document.getElementById('statsHistoryList'),
            ringFg: document.querySelector('.stats-ring-fg'),
            goalCenter: document.querySelector('.stats-goal-center'),
            goalSection: document.querySelector('.stats-goal-section')
        };
    }
    
    // ====== إدارة البيانات ======
    function getDefaultData() {
        return {
            goal: DEFAULT_GOAL,
            history: [] // [{date: '2026-08-04', minutes: 45}, ...]
        };
    }
    
    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                // التأكد من وجود الحقول الأساسية
                if (!data.history) data.history = [];
                if (!data.goal) data.goal = DEFAULT_GOAL;
                return data;
            }
        } catch (e) {
            console.warn('⚠️ فشل في تحميل بيانات الإحصائيات، استخدام القيم الافتراضية');
        }
        return getDefaultData();
    }
    
    function saveData(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('⚠️ فشل في حفظ بيانات الإحصائيات');
        }
    }
    
    // ====== الحصول على وقت اليوم الحالي ======
    function getTodayString() {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    }
    
    function getYesterdayString() {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().split('T')[0];
    }
    
    // ====== الحصول على دقائق الدراسة لليوم المحدد ======
    function getStudyMinutesForDate(dateStr) {
        // نستخدم مفتاح الجلسات اليومية من studySession
        const key = `session_total_${dateStr}`;
        return parseInt(localStorage.getItem(key)) || 0;
    }
    
    // ====== حساب التقدم بالنسبة للهدف ======
    function calculateProgress(todayMinutes, goalMinutes) {
        if (goalMinutes <= 0) return 0;
        const ratio = todayMinutes / goalMinutes;
        return Math.min(ratio, 1); // لا يتجاوز 100%
    }
    
    // ====== تحديث دائرة التقدم ======
    function updateProgressRing(progress) {
        const { ringFg, goalDisplay, goalSection } = getElements();
        if (!ringFg) return;
        
        const circumference = 339.292; // 2 * PI * 54
        const offset = circumference * (1 - progress);
        ringFg.style.strokeDashoffset = offset;
        
        // تحديث النص في المنتصف
        if (goalDisplay) {
            const data = loadData();
            const goalMinutes = data.goal;
            const todayMinutes = getStudyMinutesForDate(getTodayString());
            // نعرض الوقت المحقق / الهدف
            const hours = Math.floor(todayMinutes / 60);
            const mins = todayMinutes % 60;
            let displayText = '';
            if (hours > 0) {
                displayText = hours + 'h';
                if (mins > 0) displayText += ' ' + mins + 'm';
            } else {
                displayText = mins + 'm';
            }
            goalDisplay.textContent = displayText;
        }
        
        // إضافة تأثير عند اكتمال الهدف
        if (progress >= 1) {
            goalSection.classList.add('stats-goal-complete');
        } else {
            goalSection.classList.remove('stats-goal-complete');
        }
    }
    
    // ====== تحديث Streak ======
    function calculateStreak(data) {
        // نحتاج إلى معرفة الأيام المتتالية التي حقق فيها الهدف
        // نبدأ من اليوم السابق ونتجه للخلف
        const goal = data.goal;
        if (goal <= 0) return 0;
        
        let streak = 0;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); // نبدأ من الأمس
        
        // نتحقق لمدة 365 يوم كحد أقصى
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
    
    function updateStreakDisplay(data) {
        const { streakNumber } = getElements();
        if (!streakNumber) return;
        const streak = calculateStreak(data);
        streakNumber.textContent = streak;
    }
    
    // ====== تحديث Yesterday ======
    function updateYesterdayDisplay() {
        const { yesterdayValue, yesterdayUnit } = getElements();
        if (!yesterdayValue) return;
        
        const yesterdayStr = getYesterdayString();
        const minutes = getStudyMinutesForDate(yesterdayStr);
        
        if (minutes === 0) {
            yesterdayValue.textContent = '0';
            yesterdayUnit.textContent = 'دقيقة';
            return;
        }
        
        // تحويل إلى ساعات ودقائق
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        let displayValue, unit;
        if (hours > 0) {
            if (mins === 0) {
                displayValue = hours;
                unit = (hours === 1) ? 'ساعة' : 'ساعات';
            } else {
                // نعرض بالساعات العشرية
                const decimal = Math.round((minutes / 60) * 10) / 10;
                displayValue = decimal;
                unit = (decimal === 1) ? 'ساعة' : 'ساعات';
            }
        } else {
            displayValue = mins;
            unit = (mins === 1) ? 'دقيقة' : 'دقائق';
        }
        
        yesterdayValue.textContent = displayValue;
        yesterdayUnit.textContent = unit;
    }
    
    // ====== تحديث السجل (History) ======
    function updateHistoryDisplay() {
        const { historyList } = getElements();
        if (!historyList) return;
        
        const data = loadData();
        const history = data.history || [];
        
        if (history.length === 0) {
            historyList.innerHTML = '<div class="stats-history-empty">📭 لا يوجد سجل بعد</div>';
            return;
        }
        
        // نعرض آخر 30 يوم (أو أقل)
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
                    <span class="stats-history-date">${date}</span>
                    <span class="stats-history-time">${timeStr}</span>
                </div>
            `;
        });
        
        historyList.innerHTML = html;
    }
    
    // ====== تحديث كل البيانات ======
    function refreshAll() {
        const data = loadData();
        const todayStr = getTodayString();
        const todayMinutes = getStudyMinutesForDate(todayStr);
        const progress = calculateProgress(todayMinutes, data.goal);
        
        updateProgressRing(progress);
        updateStreakDisplay(data);
        updateYesterdayDisplay();
        // لا نقوم بتحديث التاريخ تلقائياً هنا، يتم عند فتح نافذة التاريخ
    }
    
    // ====== دالة تحديث الإحصائيات بعد جلسة دراسة (تُستدعى من studySession) ======
    window.updateStatsAfterStudy = function(minutes) {
        // تحديث اليوم الحالي
        const todayStr = getTodayString();
        // يتم التحديث تلقائياً لأن localStorage قد تغير
        // نقوم بتحديث الواجهة إذا كانت مفتوحة
        const overlay = document.getElementById('statsDashboardOverlay');
        if (overlay && overlay.classList.contains('active')) {
            refreshAll();
        } else {
            // تحديث البيانات في الخلفية (للبطاقة عند فتحها لاحقاً)
            // لا حاجة، لأن refreshAll سيقرأ من localStorage
        }
        
        // حفظ تاريخ اليوم في السجل (إذا لم يكن موجوداً)
        const data = loadData();
        const history = data.history || [];
        const existingIndex = history.findIndex(item => item.date === todayStr);
        const todayMinutes = getStudyMinutesForDate(todayStr);
        
        if (existingIndex !== -1) {
            history[existingIndex].minutes = todayMinutes;
        } else {
            history.push({ date: todayStr, minutes: todayMinutes });
        }
        // نحافظ على الترتيب حسب التاريخ
        history.sort((a, b) => a.date.localeCompare(b.date));
        data.history = history;
        saveData(data);
        
        // تحديث Streak و Yesterday إذا كانت البطاقة مفتوحة
        if (overlay && overlay.classList.contains('active')) {
            refreshAll();
        }
    };
    
    // ====== فتح وإغلاق البطاقة ======
    function openDashboard() {
        const { overlay } = getElements();
        if (!overlay) return;
        
        // تحديث البيانات قبل الفتح
        refreshAll();
        overlay.classList.add('active');
        overlay.style.display = 'flex';
    }
    
    function closeDashboard() {
        const { overlay } = getElements();
        if (!overlay) return;
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 350);
    }
    
    // ====== فتح وإغلاق نافذة تعديل الهدف ======
    function openGoalModal() {
        const { goalModal, goalSelect } = getElements();
        if (!goalModal) return;
        const data = loadData();
        goalSelect.value = data.goal;
        goalModal.classList.add('active');
        goalModal.style.display = 'flex';
    }
    
    function closeGoalModal() {
        const { goalModal } = getElements();
        if (!goalModal) return;
        goalModal.classList.remove('active');
        setTimeout(() => {
            goalModal.style.display = 'none';
        }, 350);
    }
    
    function saveGoal() {
        const { goalSelect } = getElements();
        if (!goalSelect) return;
        const newGoal = parseInt(goalSelect.value);
        if (isNaN(newGoal) || newGoal <= 0) return;
        
        const data = loadData();
        data.goal = newGoal;
        saveData(data);
        closeGoalModal();
        refreshAll();
        // عرض رسالة تأكيد
        showToast('✅ تم تحديث الهدف اليومي');
    }
    
    // ====== فتح وإغلاق نافذة السجل ======
    function openHistoryModal() {
        const { historyModal, historyList } = getElements();
        if (!historyModal) return;
        // تحديث السجل قبل الفتح
        updateHistoryDisplay();
        historyModal.classList.add('active');
        historyModal.style.display = 'flex';
    }
    
    function closeHistoryModal() {
        const { historyModal } = getElements();
        if (!historyModal) return;
        historyModal.classList.remove('active');
        setTimeout(() => {
            historyModal.style.display = 'none';
        }, 350);
    }
    
    // ====== رسائل Toast بسيطة ======
    function showToast(message) {
        let toast = document.getElementById('statsToast');
        if (toast) toast.remove();
        toast = document.createElement('div');
        toast.id = 'statsToast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.92);
            color: #f1f5f9;
            padding: 10px 24px;
            border-radius: 40px;
            font-size: 14px;
            font-weight: 500;
            z-index: 99999;
            border: 1px solid rgba(56, 189, 248, 0.3);
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            animation: toastFadeIn 0.3s ease;
            direction: rtl;
            backdrop-filter: blur(8px);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // ====== ربط الأحداث ======
    function bindEvents() {
        const {
            openBtn, closeBtn, overlay,
            editGoalBtn, goalModalClose, goalSaveBtn,
            historyBtn, historyModalClose,
            goalModal
        } = getElements();
        
        // فتح البطاقة
        if (openBtn) {
            openBtn.addEventListener('click', openDashboard);
        }
        
        // إغلاق البطاقة
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDashboard);
        }
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeDashboard();
            });
        }
        
        // تعديل الهدف
        if (editGoalBtn) {
            editGoalBtn.addEventListener('click', openGoalModal);
        }
        if (goalModalClose) {
            goalModalClose.addEventListener('click', closeGoalModal);
        }
        if (goalSaveBtn) {
            goalSaveBtn.addEventListener('click', saveGoal);
        }
        if (goalModal) {
            goalModal.addEventListener('click', function(e) {
                if (e.target === goalModal) closeGoalModal();
            });
        }
        
        // السجل
        if (historyBtn) {
            historyBtn.addEventListener('click', openHistoryModal);
        }
        if (historyModalClose) {
            historyModalClose.addEventListener('click', closeHistoryModal);
        }
        const historyModal = document.getElementById('statsHistoryModal');
        if (historyModal) {
            historyModal.addEventListener('click', function(e) {
                if (e.target === historyModal) closeHistoryModal();
            });
        }
        
        // إغلاق النوافذ بالضغط على ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (overlay && overlay.classList.contains('active')) closeDashboard();
                if (goalModal && goalModal.classList.contains('active')) closeGoalModal();
                const histModal = document.getElementById('statsHistoryModal');
                if (histModal && histModal.classList.contains('active')) closeHistoryModal();
            }
        });
    }
    
    // ====== التهيئة ======
    function init() {
        // التأكد من وجود البيانات الأولية
        const data = loadData();
        if (!data.history || data.history.length === 0) {
            // محاولة استيراد البيانات القديمة من session_total إذا وجدت
            // ولكن نتركها فارغة، سيتم ملؤها عند أول جلسة
            saveData(data);
        }
        
        // تسجيل الدالة للتحديث الخارجي
        window.updateStatsAfterStudy = window.updateStatsAfterStudy || function(minutes) {
            // تنفيذ التحديث كما هو موضح أعلاه
            const todayStr = getTodayString();
            const data = loadData();
            const history = data.history || [];
            const existingIndex = history.findIndex(item => item.date === todayStr);
            const todayMinutes = getStudyMinutesForDate(todayStr);
            
            if (existingIndex !== -1) {
                history[existingIndex].minutes = todayMinutes;
            } else {
                history.push({ date: todayStr, minutes: todayMinutes });
            }
            history.sort((a, b) => a.date.localeCompare(b.date));
            data.history = history;
            saveData(data);
            
            // تحديث الواجهة إذا كانت مفتوحة
            const overlay = document.getElementById('statsDashboardOverlay');
            if (overlay && overlay.classList.contains('active')) {
                refreshAll();
            }
        };
        
        // ربط الأحداث بعد تحميل DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                bindEvents();
                // لا نقوم بتحديث تلقائي، سيتم عند فتح البطاقة
                console.log('✅ statsDashboard.js جاهز');
            });
        } else {
            bindEvents();
            console.log('✅ statsDashboard.js جاهز');
        }
    }
    
    init();
})();
