// ============================================
// dailyReport.js - نظام التقرير اليومي
// ============================================

(function() {
    "use strict";
    
    // ========== رسائل تحفيزية ==========
    const MOTIVATION_MESSAGES = [
        "🎉 أنت تتحسن بسرعة! استمر على هذا المنوال",
        "🌟 اليوم كان ممتازاً! أنت في الطريق الصحيح",
        "💪 أنت تتطور فعلاً! النتائج بدأت تظهر",
        "📈 أداؤك رائع! واصل بنفس الطاقة",
        "🔥 أنت في الطريق الصحيح، لا تتوقف!"
    ];
    
    const FIRST_DAY_MESSAGES = [
        "🎯 هذه بداية ممتازة، استمر على هذا الطريق!",
        "🌟 اليوم الأول جيد، وسنبدأ من هنا إلى النجاح",
        "💪 أنت بدأت المراجعة، وهذا شيء رائع! استمر",
        "📚 خطوة أولى موفقة! غداً سنكون أفضل إن شاء الله",
        "🎉 بداية قوية! الطريق إلى B2 يبدأ بخطوة"
    ];
    
    const IMPROVEMENT_MESSAGES = [
        "📈 أنت أفضل من أمس بنسبة {percent}%! تطور ملحوظ",
        "🎯 أداؤك تحسن اليوم! +{percent}% عن الأمس",
        "⭐ ممتاز! تقدمك مستمر ({percent}% زيادة)",
        "🚀 أنت تتطور فعلاً! أفضل من أمس بـ {percent}%",
        "💪 واصل هكذا، الفرق {percent}% لصالحك"
    ];
    
    const DECLINE_MESSAGES = [
        "📉 اليوم كان أقل من الأمس، لكن غداً فرصة جديدة",
        "💪 يوم عادي، غداً ستكون أفضل إن شاء الله",
        "🎯 لا تقلق، كل يوم له ظروفه، استمر في المحاولة",
        "🌟 المهم أنك لم تتوقف، غداً أفضل بإذن الله",
        "📚 استمر، النجاح يحتاج إلى صبر"
    ];
    
    // ========== تخزين البيانات ==========
    let dailyData = {
        lastDate: null,
        examsCompleted: 0,
        gamesPlayed: 0,
        correctAnswers: 0,
        examResults: []  // { skill, examId, examTitle, score, date }
    };
    
    // ========== تحميل بيانات اليوم ==========
    function loadTodayData() {
        const today = new Date().toISOString().slice(0,10);
        const saved = localStorage.getItem('zertiva_daily_report');
        
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.lastDate === today) {
                    dailyData = parsed;
                } else {
                    // يوم جديد، حفظ اليوم السابق للمقارنة
                    const yesterdayData = { ...parsed };
                    dailyData = {
                        lastDate: today,
                        examsCompleted: 0,
                        gamesPlayed: 0,
                        correctAnswers: 0,
                        examResults: []
                    };
                    localStorage.setItem('zertiva_daily_report_yesterday', JSON.stringify(yesterdayData));
                }
            } catch(e) {}
        }
        
        // تجميع نتائج الامتحانات من localStorage
        collectExamResults();
    }
    
    // ========== تجميع نتائج الامتحانات ==========
    function collectExamResults() {
        const today = new Date().toISOString().slice(0,10);
        const examResults = [];
        let totalCorrect = 0;
        let examsCount = 0;
        
        // البحث عن جميع نتائج الامتحانات
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('exam_result_')) {
                const score = parseFloat(localStorage.getItem(key));
                if (!isNaN(score)) {
                    // استخراج المعلومات من المفتاح
                    const parts = key.split('_');
                    const skill = parts[2];
                    const examId = parts[3];
                    
                    // الحصول على تاريخ النتيجة (إذا كان محفوظاً)
                    const dateKey = `exam_date_${skill}_${examId}`;
                    const examDate = localStorage.getItem(dateKey) || today;
                    
                    // إذا كانت النتيجة من اليوم
                    if (examDate === today) {
                        totalCorrect += Math.round(score);
                        examsCount++;
                        
                        examResults.push({
                            skill: skill,
                            examId: parseInt(examId),
                            examTitle: getExamTitle(skill, examId),
                            score: score,
                            date: examDate
                        });
                    }
                }
            }
        }
        
        dailyData.examsCompleted = examsCount;
        dailyData.correctAnswers = totalCorrect;
        dailyData.examResults = examResults;
        
        // حفظ البيانات
        saveTodayData();
    }
    
    // ========== الحصول على عنوان الامتحان ==========
    function getExamTitle(skill, examId) {
        // محاولة الحصول من examsDatabase إذا كانت متاحة
        if (typeof examsDatabase !== 'undefined' && examsDatabase[skill]) {
            const exam = examsDatabase[skill].find(e => e.id === examId);
            if (exam) return exam.title;
        }
        return `${skill.toUpperCase()} Exam ${examId}`;
    }
    
    // ========== حفظ بيانات اليوم ==========
    function saveTodayData() {
        localStorage.setItem('zertiva_daily_report', JSON.stringify(dailyData));
    }
    
    // ========== حساب الفرق مع الأمس ==========
    function getComparisonWithYesterday() {
        const yesterday = localStorage.getItem('zertiva_daily_report_yesterday');
        if (!yesterday) return null;
        
        try {
            const yesterdayData = JSON.parse(yesterday);
            const todayTotal = dailyData.correctAnswers;
            const yesterdayTotal = yesterdayData.correctAnswers || 0;
            
            if (yesterdayTotal === 0) return null;
            
            const diff = todayTotal - yesterdayTotal;
            const percent = Math.round((diff / yesterdayTotal) * 100);
            
            return {
                diff: diff,
                percent: Math.abs(percent),
                isBetter: diff > 0,
                isWorse: diff < 0
            };
        } catch(e) {
            return null;
        }
    }
    
    // ========== تحديد الأجزاء الضعيفة ==========
    function getWeakParts() {
        const weak = [];
        const urgent = [];
        
        dailyData.examResults.forEach(result => {
            if (result.score <= 40) {
                urgent.push({
                    skill: result.skill,
                    examId: result.examId,
                    examTitle: result.examTitle,
                    score: result.score
                });
            } else if (result.score <= 50) {
                weak.push({
                    skill: result.skill,
                    examId: result.examId,
                    examTitle: result.examTitle,
                    score: result.score
                });
            }
        });
        
        return { weak, urgent };
    }
    
    // ========== تحديد أفضل جزء في اليوم ==========
    function getBestPart() {
        if (dailyData.examResults.length === 0) return null;
        
        const best = dailyData.examResults.reduce((max, current) => {
            return (current.score > max.score) ? current : max;
        }, dailyData.examResults[0]);
        
        return best;
    }
    
    // ========== اقتراح امتحانات لغد ==========
    function getTomorrowReviews() {
        const { weak, urgent } = getWeakParts();
        const allReviews = [...urgent, ...weak];
        
        // إزالة التكرارات
        const unique = [];
        const seen = new Set();
        for (const item of allReviews) {
            const key = `${item.skill}_${item.examId}`;
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(item);
            }
        }
        
        // أخذ أول 5 اقتراحات
        return unique.slice(0, 5);
    }
    
    // ========== الحصول على رسالة تحفيزية ==========
    function getMotivationMessage() {
        const comparison = getComparisonWithYesterday();
        const isFirstDay = dailyData.examsCompleted === 0 && dailyData.gamesPlayed === 0;
        
        // إذا كان أول استخدام أو لا توجد بيانات للمقارنة
        if (isFirstDay || !comparison) {
            const randomIndex = Math.floor(Math.random() * FIRST_DAY_MESSAGES.length);
            return FIRST_DAY_MESSAGES[randomIndex];
        }
        
        // إذا كان هناك تحسن
        if (comparison.isBetter) {
            const randomIndex = Math.floor(Math.random() * IMPROVEMENT_MESSAGES.length);
            return IMPROVEMENT_MESSAGES[randomIndex].replace('{percent}', comparison.percent);
        }
        
        // إذا كان هناك تراجع
        const randomIndex = Math.floor(Math.random() * DECLINE_MESSAGES.length);
        return DECLINE_MESSAGES[randomIndex];
    }
    
    // ========== الحصول على اسم القسم بالعربية ==========
    function getSkillName(skill) {
        const names = {
            'hoeren1': 'Hören Teil 1',
            'hoeren2': 'Hören Teil 2',
            'hoeren3': 'Hören Teil 3',
            'lesen1': 'Lesen Teil 1',
            'lesen2': 'Lesen Teil 2',
            'lesen3': 'Lesen Teil 3',
            'sprach1': 'Sprachbausteine Teil 1',
            'sprach2': 'Sprachbausteine Teil 2',
            'schreiben': 'Schreiben',
            'mündlich': 'Mündlich',
            'tips': 'Tips'
        };
        return names[skill] || skill;
    }
    
    // ========== إنشاء نافذة التقرير ==========
    function createReportModal() {
        if (document.getElementById('reportModal')) return;
        
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
        
        const bestPart = getBestPart();
        const { weak, urgent } = getWeakParts();
        const tomorrowReviews = getTomorrowReviews();
        const comparison = getComparisonWithYesterday();
        const motivationMessage = getMotivationMessage();
        const isFirstDay = dailyData.examsCompleted === 0 && dailyData.gamesPlayed === 0;
        
        const modal = document.createElement('div');
        modal.id = 'reportModal';
        modal.className = 'report-modal-overlay';
        modal.innerHTML = `
            <div class="report-modal-container">
                <div class="report-modal-header">
                    <h3>📊 تقرير اليوم</h3>
                    <button class="close-report-modal">✕</button>
                </div>
                <div class="report-modal-body">
                    <div class="report-date">📅 ${formattedDate}</div>
                    
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number">${dailyData.examsCompleted}</div>
                            <div class="stat-label">امتحانات أنجزتها</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${dailyData.gamesPlayed}</div>
                            <div class="stat-label">ألعاب تدريبية</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${dailyData.correctAnswers}</div>
                            <div class="stat-label">إجابة صحيحة</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${dailyData.examResults.length}</div>
                            <div class="stat-label">امتحانات مختبرة</div>
                        </div>
                    </div>
                    
                    ${bestPart ? `
                    <div class="best-part">
                        <div class="best-part-label">🏆 أفضل جزء لديك اليوم</div>
                        <div class="best-part-value">${getSkillName(bestPart.skill)} — ${bestPart.examTitle || `Exam ${bestPart.examId}`}</div>
                    </div>
                    ` : ''}
                    
                    ${(weak.length > 0 || urgent.length > 0) ? `
                    <div class="weak-parts">
                        <div class="section-title">⚠️ الأجزاء التي تحتاج مراجعة</div>
                        <ul class="weak-list">
                            ${urgent.map(w => `
                                <li>
                                    <span>📖 ${getSkillName(w.skill)} — ${w.examTitle || `Exam ${w.examId}`}</span>
                                    <span class="urgent-badge">ضعيف جداً (${w.score}%)</span>
                                </li>
                            `).join('')}
                            ${weak.map(w => `
                                <li>
                                    <span>📖 ${getSkillName(w.skill)} — ${w.examTitle || `Exam ${w.examId}`}</span>
                                    <span class="weak-badge">يحتاج مراجعة (${w.score}%)</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${tomorrowReviews.length > 0 ? `
                    <div class="tomorrow-review">
                        <div class="section-title">📚 غداً أعد هذه الامتحانات</div>
                        <ul class="review-list">
                            ${tomorrowReviews.map(r => `
                                <li>📖 ${getSkillName(r.skill)} — ${r.examTitle || `Exam ${r.examId}`}</li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${!isFirstDay && comparison ? `
                    <div class="comparison-box">
                        <div class="comparison-text">
                            ${comparison.isBetter ? `📈 أنت أفضل من أمس بـ ${comparison.percent}%` : 
                              comparison.isWorse ? `📉 اليوم كان أقل من أمس بـ ${comparison.percent}%` : 
                              '📊 أداؤك اليوم مماثل للأمس'}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="motivation-message">
                        <div class="motivation-icon">💪</div>
                        <div class="motivation-text">${motivationMessage}</div>
                    </div>
                </div>
                <div class="report-modal-footer">
                    🌟 كل يوم خطوة أقرب إلى B2
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.close-report-modal');
        closeBtn.addEventListener('click', () => closeReportModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeReportModal();
        });
        
        return modal;
    }
    
    function closeReportModal() {
        const modal = document.getElementById('reportModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function openReportModal() {
        loadTodayData();
        
        let modal = document.getElementById('reportModal');
        if (modal) modal.remove();
        
        modal = createReportModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // ========== إضافة زر التقرير في الصفحة الرئيسية ==========
    function addReportButton() {
        const rightSide = document.querySelector('.top-bar .right-side');
        if (!rightSide) {
            setTimeout(addReportButton, 500);
            return;
        }
        
        if (document.getElementById('dailyReportBtn')) return;
        
        const reviewsBtn = document.getElementById('reviewsStatsBtn');
        const tipsBtn = document.getElementById('tipsTriggerBtn');
        
        const reportBtn = document.createElement('button');
        reportBtn.id = 'dailyReportBtn';
        reportBtn.className = 'daily-report-btn';
        reportBtn.innerHTML = '📊 أنا أنهيت المراجعة اليوم';
        reportBtn.setAttribute('title', 'عرض تقرير أدائك اليومي');
        
        // إضافة الزر بعد زر التقييمات
        if (reviewsBtn) {
            rightSide.insertBefore(reportBtn, reviewsBtn.nextSibling);
        } else if (tipsBtn) {
            rightSide.insertBefore(reportBtn, tipsBtn.nextSibling);
        } else {
            rightSide.insertBefore(reportBtn, rightSide.firstChild);
        }
        
        reportBtn.addEventListener('click', openReportModal);
        console.log('📊 زر التقرير اليومي تمت إضافته بنجاح');
    }
    
    // ========== مراقبة الصفحة الرئيسية ==========
    function observeHomePageForReport() {
        const homePage = document.getElementById('home');
        const reportBtn = document.getElementById('dailyReportBtn');
        
        if (!homePage || !reportBtn) return;
        
        const observer = new MutationObserver(() => {
            if (homePage.classList.contains('active')) {
                reportBtn.style.display = 'flex';
            } else {
                reportBtn.style.display = 'none';
            }
        });
        
        observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
        
        if (homePage.classList.contains('active')) {
            reportBtn.style.display = 'flex';
        } else {
            reportBtn.style.display = 'none';
        }
    }
    
    // ========== تسجيل نتائج الامتحان مع التاريخ ==========
    function registerExamResult(skill, examId, score) {
        const today = new Date().toISOString().slice(0,10);
        const dateKey = `exam_date_${skill}_${examId}`;
        localStorage.setItem(dateKey, today);
        
        // إعادة تحميل البيانات
        loadTodayData();
    }
    
    // ربط الدالة بالنطاق العام
    window.registerExamResult = registerExamResult;
    
    // ========== التهيئة ==========
    function init() {
        loadTodayData();
        addReportButton();
        setTimeout(observeHomePageForReport, 100);
    }
    
    init();
})();