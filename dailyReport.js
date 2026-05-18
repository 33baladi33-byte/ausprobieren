// ============================================
// dailyReport.js - نظام التقرير اليومي الحقيقي V3
// يعتمد فقط على النشاط الفعلي للمستخدم في اليوم الحالي
// ============================================

(function() {
    "use strict";
    
    // ========== مفاتيح التخزين ==========
    const STORAGE_KEYS = {
        COMPLETED_EXAMS: 'zertiva_completed_exams',
        COMPLETED_GAMES: 'zertiva_completed_games'
    };
    
    // ========== تسجيل امتحان مكتمل ==========
    function registerCompletedExam(examData) {
        const today = new Date().toISOString().slice(0,10);
        
        // جلب الامتحانات المسجلة سابقاً
        let completedExams = [];
        const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_EXAMS);
        if (saved) {
            try {
                completedExams = JSON.parse(saved);
            } catch(e) {}
        }
        
        // إزالة أي تسجيل سابق لنفس الامتحان في نفس اليوم (لتجنب التكرار)
        completedExams = completedExams.filter(e => 
            !(e.skill === examData.skill && e.examId === examData.examId && e.date === today)
        );
        
        // إضافة الامتحان الجديد
        completedExams.push({
            skill: examData.skill,
            examId: examData.examId,
            examTitle: examData.examTitle,
            score: examData.score,
            correctAnswers: examData.correctAnswers,
            totalQuestions: examData.totalQuestions || 25,
            date: today,
            completedAt: examData.completedAt || new Date().toISOString()
        });
        
        localStorage.setItem(STORAGE_KEYS.COMPLETED_EXAMS, JSON.stringify(completedExams));
        console.log(`✅ [تقرير اليوم] تم تسجيل امتحان مكتمل: ${examData.skill} - Exam ${examData.examId} (${examData.score}%) في ${today}`);
        console.log(`📊 [تقرير اليوم] إجمالي الامتحانات المسجلة: ${completedExams.length}`);
    }
    
    // ========== تسجيل لعبة مكتملة ==========
    function registerCompletedGame() {
        const today = new Date().toISOString().slice(0,10);
        
        let completedGames = [];
        const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_GAMES);
        if (saved) {
            try {
                completedGames = JSON.parse(saved);
            } catch(e) {}
        }
        
        // البحث عن اليوم الحالي
        const existingIndex = completedGames.findIndex(g => g.date === today);
        if (existingIndex !== -1) {
            completedGames[existingIndex].count++;
            completedGames[existingIndex].lastUpdated = new Date().toISOString();
        } else {
            completedGames.push({
                date: today,
                count: 1,
                lastUpdated: new Date().toISOString()
            });
        }
        
        localStorage.setItem(STORAGE_KEYS.COMPLETED_GAMES, JSON.stringify(completedGames));
        console.log(`🎮 [تقرير اليوم] تم تسجيل لعبة مكتملة. إجمالي اليوم: ${completedGames.find(g => g.date === today)?.count || 1}`);
    }
    
    // ========== جلب امتحانات اليوم ==========
    function getTodayCompletedExams() {
        const today = new Date().toISOString().slice(0,10);
        const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_EXAMS);
        
        if (!saved) {
            console.log('📊 [تقرير اليوم] لا توجد امتحانات مسجلة');
            return [];
        }
        
        try {
            const allExams = JSON.parse(saved);
            const todayExams = allExams.filter(exam => exam.date === today);
            console.log(`📊 [تقرير اليوم] تم العثور على ${todayExams.length} امتحان مكتمل اليوم`);
            todayExams.forEach(exam => {
                console.log(`   - ${exam.skill} Exam ${exam.examId}: ${exam.score}%`);
            });
            return todayExams;
        } catch(e) {
            console.error('خطأ في قراءة الامتحانات:', e);
            return [];
        }
    }
    
    // ========== جلب عدد الألعاب اليوم ==========
    function getTodayGamesCount() {
        const today = new Date().toISOString().slice(0,10);
        const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_GAMES);
        
        if (!saved) return 0;
        
        try {
            const games = JSON.parse(saved);
            const todayGames = games.find(g => g.date === today);
            return todayGames ? todayGames.count : 0;
        } catch(e) {
            return 0;
        }
    }
    
    // ========== حساب إجمالي الإجابات الصحيحة اليوم ==========
    function getTodayCorrectAnswers(exams) {
        return exams.reduce((sum, exam) => sum + (exam.correctAnswers || Math.round((exam.score / 100) * (exam.totalQuestions || 25))), 0);
    }
    
    // ========== الحصول على اسم القسم ==========
    function getSkillName(skill) {
        const names = {
            'hoeren1': 'Hören Teil 1', 'hoeren2': 'Hören Teil 2', 'hoeren3': 'Hören Teil 3',
            'lesen1': 'Lesen Teil 1', 'lesen2': 'Lesen Teil 2', 'lesen3': 'Lesen Teil 3',
            'sprach1': 'Sprachbausteine Teil 1', 'sprach2': 'Sprachbausteine Teil 2',
            'schreiben': 'Schreiben', 'mündlich': 'Mündlich', 'tips': 'Tips'
        };
        return names[skill] || skill;
    }
    
    // ========== جلب بيانات الأمس للمقارنة ==========
    function getYesterdayStats() {
        const today = new Date().toISOString().slice(0,10);
        const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_EXAMS);
        
        if (!saved) return null;
        
        try {
            const allExams = JSON.parse(saved);
            const yesterdayExams = allExams.filter(exam => exam.date !== today);
            
            if (yesterdayExams.length === 0) return null;
            
            // تجميع حسب التاريخ
            const groupedByDate = {};
            yesterdayExams.forEach(exam => {
                if (!groupedByDate[exam.date]) {
                    groupedByDate[exam.date] = [];
                }
                groupedByDate[exam.date].push(exam);
            });
            
            // أخذ أحدث تاريخ
            const dates = Object.keys(groupedByDate).sort().reverse();
            const lastDate = dates[0];
            const lastExams = groupedByDate[lastDate];
            
            const totalCorrect = lastExams.reduce((sum, exam) => sum + (exam.correctAnswers || Math.round((exam.score / 100) * 25)), 0);
            
            return {
                date: lastDate,
                examsCount: lastExams.length,
                correctAnswers: totalCorrect
            };
        } catch(e) {
            return null;
        }
    }
    
    // ========== رسائل تحفيزية ==========
    const FIRST_DAY_MESSAGES = [
        "🎯 خطوة أولى موفقة! غداً سنكون أفضل إن شاء الله",
        "🌟 بداية رائعة! استمر على هذا المنوال",
        "💪 أنت بدأت المراجعة، وهذا شيء رائع!",
        "📚 اليوم الأول جيد، الطريق إلى B2 يبدأ بخطوة"
    ];
    
    const IMPROVEMENT_MESSAGES = [
        "📈 أنت أفضل من أمس بنسبة {percent}%! تطور ملحوظ",
        "🎯 أداؤك تحسن اليوم! +{percent}% عن الأمس",
        "⭐ ممتاز! تقدمك مستمر ({percent}% 증가)"
    ];
    
    const NO_COMPARISON_MESSAGES = [
        "💪 أنت في الطريق الصحيح، استمر",
        "🌟 يوم ممتاز، واصل بنفس الطاقة",
        "🎯 أنت تتحسن مع كل يوم، لا تتوقف"
    ];
    
    // ========== إنشاء نافذة التقرير ==========
    function createReportModal() {
        // إزالة أي مودال قديم
        const oldModal = document.getElementById('reportModal');
        if (oldModal) oldModal.remove();
        
        const exams = getTodayCompletedExams();
        const gamesCount = getTodayGamesCount();
        const examsCount = exams.length;
        const correctAnswers = getTodayCorrectAnswers(exams);
        
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
                    <div class="report-modal-footer">
                        🌟 ابدأ المراجعة الآن
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            return modal;
        }
        
        // حساب الأجزاء الضعيفة
        const weak = exams.filter(e => e.score > 40 && e.score <= 50);
        const urgent = exams.filter(e => e.score <= 40);
        
        // أفضل جزء
        const bestPart = exams.length > 0 ? exams.reduce((max, e) => e.score > max.score ? e : max, exams[0]) : null;
        
        // اقتراحات الغد
        const tomorrowReviews = [...urgent, ...weak].slice(0, 5);
        
        // المقارنة مع الأمس
        const yesterdayStats = getYesterdayStats();
        let comparisonMsg = null;
        let showComparison = false;
        
        if (yesterdayStats && yesterdayStats.examsCount > 0) {
            const todayTotal = correctAnswers;
            const yesterdayTotal = yesterdayStats.correctAnswers;
            if (yesterdayTotal > 0) {
                showComparison = true;
                const diff = todayTotal - yesterdayTotal;
                const percent = Math.round(Math.abs(diff / yesterdayTotal) * 100);
                if (diff > 0) {
                    const msg = IMPROVEMENT_MESSAGES[Math.floor(Math.random() * IMPROVEMENT_MESSAGES.length)];
                    comparisonMsg = msg.replace('{percent}', percent);
                } else if (diff < 0) {
                    comparisonMsg = `📉 اليوم كان أقل من أمس بـ ${percent}%، غداً فرصة جديدة للتحسن`;
                } else {
                    comparisonMsg = `📊 أداؤك اليوم مماثل للأمس`;
                }
            }
        }
        
        // رسالة تحفيزية نهائية
        let motivationMsg = comparisonMsg;
        if (!motivationMsg) {
            if (!yesterdayStats || yesterdayStats.examsCount === 0) {
                motivationMsg = FIRST_DAY_MESSAGES[Math.floor(Math.random() * FIRST_DAY_MESSAGES.length)];
            } else {
                motivationMsg = NO_COMPARISON_MESSAGES[Math.floor(Math.random() * NO_COMPARISON_MESSAGES.length)];
            }
        }
        
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
                        <div style="font-size: 0.8rem; color: #5dade2; margin-top: 5px;">${bestPart.score}%</div>
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
                    
                    ${showComparison ? `
                    <div class="comparison-box">
                        <div class="comparison-text">${comparisonMsg}</div>
                    </div>
                    ` : ''}
                    
                    <div class="motivation-message">
                        <div class="motivation-icon">💪</div>
                        <div class="motivation-text">${motivationMsg}</div>
                    </div>
                </div>
                <div class="report-modal-footer">
                    🌟 كل يوم خطوة أقرب إلى B2
                </div>
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
        if (closeBtn) {
            closeBtn.addEventListener('click', closeReportModal);
        }
        
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeReportModal();
        });
    }
    
    // ========== إضافة زر التقرير في الشريط العلوي (يظهر فقط في صفحة القائمة والامتحانات) ==========
    function addReportButton() {
        const rightSide = document.querySelector('.top-bar .right-side');
        if (!rightSide) {
            setTimeout(addReportButton, 500);
            return;
        }
        
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
    
    // ========== إظهار/إخفاء الزر حسب الصفحة ==========
    function observePageForReportButton() {
        const reportBtn = document.getElementById('dailyReportBtn');
        if (!reportBtn) return;
        
        const homePage = document.getElementById('home');
        const listPage = document.getElementById('list');
        const examPage = document.getElementById('exam');
        
        function updateButtonVisibility() {
            if (listPage && listPage.classList.contains('active')) {
                reportBtn.style.display = 'flex';
            } else if (examPage && examPage.classList.contains('active')) {
                reportBtn.style.display = 'flex';
            } else {
                reportBtn.style.display = 'none';
            }
        }
        
        const observer = new MutationObserver(updateButtonVisibility);
        if (homePage) observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
        if (listPage) observer.observe(listPage, { attributes: true, attributeFilter: ['class'] });
        if (examPage) observer.observe(examPage, { attributes: true, attributeFilter: ['class'] });
        
        updateButtonVisibility();
    }
    
    // ========== ربط الدوال بالنطاق العام ==========
    window.registerCompletedExam = registerCompletedExam;
    window.registerCompletedGame = registerCompletedGame;
    
    // ========== التهيئة ==========
    function init() {
        addReportButton();
        setTimeout(observePageForReportButton, 100);
        console.log('📊 نظام التقرير اليومي جاهز');
        console.log('💡 استخدم window.registerCompletedExam() لتسجيل امتحان مكتمل');
        console.log('💡 استخدم window.registerCompletedGame() لتسجيل لعبة مكتملة');
    }
    
    init();
})();
