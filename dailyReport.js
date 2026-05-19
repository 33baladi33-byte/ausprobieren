// ============================================
// dailyReport.js - نظام التقرير اليومي (يعمل مع DailyTracker)
// ============================================

(function() {
    "use strict";
    
    // ========== رسائل تحفيزية ==========
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
        "🚀 أنت تتطور فعلاً! أفضل من أمس بـ {percent}%"
    ];
    
    const NO_COMPARISON_MESSAGES = [
        "💪 أنت في الطريق الصحيح، استمر",
        "🌟 يوم ممتاز، واصل بنفس الطاقة",
        "🎯 أنت تتحسن مع كل يوم، لا تتوقف",
        "🔥 أداء رائع، استمر هكذا",
        "⭐ أنت تبلي حسناً، النجاح قريب"
    ];
    
    const DECLINE_MESSAGES = [
        "📉 اليوم كان أقل من الأمس، لكن غداً فرصة جديدة",
        "💪 يوم عادي، غداً ستكون أفضل إن شاء الله",
        "🎯 لا تقلق، كل يوم له ظروفه، استمر في المحاولة",
        "🌟 المهم أنك لم تتوقف، غداً أفضل بإذن الله",
        "📚 استمر، النجاح يحتاج إلى صبر"
    ];
    
    // ========== الحصول على اسم القسم ==========
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
    
    // ========== جلب بيانات اليوم من DailyTracker ==========
    function getTodayData() {
        // التحقق من وجود DailyTracker
        if (typeof DailyTracker === 'undefined') {
            console.warn("⚠️ DailyTracker غير متوفر!");
            return {
                exams: [],
                examsCount: 0,
                gamesCount: 0,
                correctAnswers: 0
            };
        }
        
        const exams = DailyTracker.getTodayExams();
        const examsCount = DailyTracker.getTodayExamsCount();
        const gamesCount = DailyTracker.getTodayGamesCount();
        const correctAnswers = DailyTracker.getTodayCorrectAnswers();
        
        console.log(`📊 [تقرير اليوم] تم جلب البيانات: ${examsCount} امتحان، ${gamesCount} لعبة، ${correctAnswers} إجابة صحيحة`);
        
        return {
            exams: exams,
            examsCount: examsCount,
            gamesCount: gamesCount,
            correctAnswers: correctAnswers
        };
    }
    
    // ========== جلب بيانات الأمس للمقارنة ==========
    function getYesterdayComparison() {
        if (typeof DailyTracker === 'undefined') return null;
        
        const yesterdayStats = DailyTracker.getYesterdayStats();
        const todayCorrect = DailyTracker.getTodayCorrectAnswers();
        
        if (!yesterdayStats || yesterdayStats.examsCount === 0) {
            return null;
        }
        
        const todayTotal = todayCorrect;
        const yesterdayTotal = yesterdayStats.correctAnswers;
        
        if (yesterdayTotal === 0) return null;
        
        const diff = todayTotal - yesterdayTotal;
        const percent = Math.round(Math.abs(diff / yesterdayTotal) * 100);
        
        if (diff > 0) {
            const msg = IMPROVEMENT_MESSAGES[Math.floor(Math.random() * IMPROVEMENT_MESSAGES.length)];
            return msg.replace('{percent}', percent);
        } else if (diff < 0) {
            const msg = DECLINE_MESSAGES[Math.floor(Math.random() * DECLINE_MESSAGES.length)];
            return msg;
        }
        
        return null;
    }
    
    // ========== تحديد الأجزاء الضعيفة ==========
    function getWeakParts(exams) {
        const weak = [];
        const urgent = [];
        
        exams.forEach(exam => {
            if (exam.score <= 40) {
                urgent.push(exam);
            } else if (exam.score <= 50) {
                weak.push(exam);
            }
        });
        
        return { weak, urgent };
    }
    
    // ========== تحديد أفضل جزء ==========
    function getBestPart(exams) {
        if (exams.length === 0) return null;
        return exams.reduce((max, current) => {
            return (current.score > max.score) ? current : max;
        }, exams[0]);
    }
    
    // ========== اقتراح امتحانات لغد ==========
    function getTomorrowReviews(weak, urgent) {
        const allReviews = [...urgent, ...weak];
        const unique = [];
        const seen = new Set();
        
        for (const item of allReviews) {
            const key = `${item.skill}_${item.examId}`;
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(item);
            }
        }
        
        return unique.slice(0, 5);
    }
    
    // ========== الحصول على رسالة تحفيزية ==========
    function getMotivationMessage(examsCount, gamesCount, yesterdayComparison) {
        const totalActivity = examsCount + gamesCount;
        
        if (totalActivity === 0) {
            return "📚 لم تقم بأي نشاط اليوم، ابدأ مراجعتك الآن!";
        }
        
        if (yesterdayComparison) {
            return yesterdayComparison;
        }
        
        // أول يوم أو لا توجد مقارنة
        if (examsCount === 0) {
            return FIRST_DAY_MESSAGES[Math.floor(Math.random() * FIRST_DAY_MESSAGES.length)];
        }
        
        return NO_COMPARISON_MESSAGES[Math.floor(Math.random() * NO_COMPARISON_MESSAGES.length)];
    }
    
    // ========== إنشاء نافذة التقرير ==========
    function createReportModal() {
        // إزالة المودال القديم
        const oldModal = document.getElementById('reportModal');
        if (oldModal) oldModal.remove();
        
        // جلب البيانات
        const todayData = getTodayData();
        const exams = todayData.exams;
        const examsCount = todayData.examsCount;
        const gamesCount = todayData.gamesCount;
        const correctAnswers = todayData.correctAnswers;
        
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
        
        // إذا لم يقم المستخدم بأي نشاط اليوم
        if (examsCount === 0 && gamesCount === 0) {
            const modal = document.createElement('div');
            modal.id = 'reportModal';
            modal.className = 'report-modal-overlay';
            modal.innerHTML = `
                <div class="report-modal-container" style="max-width: 380px;">
                    <div class="report-modal-header">
                        <h3>📊 تقرير اليوم</h3>
                        <button class="close-report-modal">✕</button>
                    </div>
                    <div class="report-modal-body" style="text-align: center; padding: 40px 24px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">📚</div>
                        <div style="font-size: 1.1rem; font-weight: 500; color: #5dade2; margin-bottom: 12px;">لم تقم بأي مراجعة اليوم بعد</div>
                        <div style="color: #a0a0a0; font-size: 0.85rem;">أنهِ امتحاناً أو لعبة تدريبية، ثم عد إلى هنا لترى تقريرك</div>
                    </div>
                    <div class="report-modal-footer">🌟 ابدأ المراجعة الآن</div>
                </div>
            `;
            document.body.appendChild(modal);
            return modal;
        }
        
        // حساب الأجزاء الضعيفة
        const { weak, urgent } = getWeakParts(exams);
        const bestPart = getBestPart(exams);
        const tomorrowReviews = getTomorrowReviews(weak, urgent);
        const yesterdayComparison = getYesterdayComparison();
        const motivationMsg = getMotivationMessage(examsCount, gamesCount, yesterdayComparison);
        
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
                            <div class="stat-number">${examsCount}</div>
                            <div class="stat-label">امتحانات أنجزتها</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${gamesCount}</div>
                            <div class="stat-label">ألعاب تدريبية</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${correctAnswers}</div>
                            <div class="stat-label">إجابة صحيحة</div>
                        </div>
                    </div>
                    
                    ${bestPart ? `
                    <div class="best-part">
                        <div class="best-part-label">🏆 أفضل جزء لديك اليوم</div>
                        <div class="best-part-value">${getSkillName(bestPart.skill)} — ${bestPart.examTitle || `Exam ${bestPart.examId}`}</div>
                        <div style="font-size: 0.75rem; color: #5dade2; margin-top: 5px;">${bestPart.score}%</div>
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
                    
                    <div class="motivation-message">
                        <div class="motivation-icon">💪</div>
                        <div class="motivation-text">${motivationMsg}</div>
                    </div>
                </div>
                <div class="report-modal-footer">🌟 كل يوم خطوة أقرب إلى B2</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }
    
    function closeReportModal() {
        const modal = document.getElementById('reportModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
            document.body.style.overflow = '';
        }
    }
    
    function openReportModal() {
        const modal = createReportModal();
        if (modal) {
            setTimeout(() => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 10);
        }
        
        const closeBtn = modal?.querySelector('.close-report-modal');
        if (closeBtn) closeBtn.addEventListener('click', closeReportModal);
        modal?.addEventListener('click', (e) => { if (e.target === modal) closeReportModal(); });
    }
    
    // ========== إضافة زر التقرير ==========
    function addReportButton() {
        const rightSide = document.querySelector('.top-bar .right-side');
        if (!rightSide) { setTimeout(addReportButton, 500); return; }
        if (document.getElementById('dailyReportBtn')) return;
        
        const reportBtn = document.createElement('button');
        reportBtn.id = 'dailyReportBtn';
        reportBtn.className = 'daily-report-btn';
        reportBtn.innerHTML = '📊 أنا أنهيت المراجعة اليوم';
        reportBtn.setAttribute('title', 'عرض تقرير أدائك اليومي');
        rightSide.appendChild(reportBtn);
        reportBtn.addEventListener('click', openReportModal);
        console.log('📊 زر التقرير اليومي تمت إضافته بنجاح');
    }
    
    // ========== مراقبة الصفحة ==========
    function observePageForReportButton() {
        const reportBtn = document.getElementById('dailyReportBtn');
        if (!reportBtn) return;
        
        const listPage = document.getElementById('list');
        const examPage = document.getElementById('exam');
        
        function updateVisibility() {
            if ((listPage && listPage.classList.contains('active')) || (examPage && examPage.classList.contains('active'))) {
                reportBtn.style.display = 'flex';
            } else {
                reportBtn.style.display = 'none';
            }
        }
        
        const observer = new MutationObserver(updateVisibility);
        if (listPage) observer.observe(listPage, { attributes: true, attributeFilter: ['class'] });
        if (examPage) observer.observe(examPage, { attributes: true, attributeFilter: ['class'] });
        updateVisibility();
    }
    
    // ========== التهيئة ==========
    function init() {
        addReportButton();
        setTimeout(observePageForReportButton, 100);
        console.log('📊 نظام التقرير اليومي جاهز (يعمل مع DailyTracker)');
    }
    
    init();
})();
