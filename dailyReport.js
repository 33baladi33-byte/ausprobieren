// ============================================
// dailyReport.js - نظام التقرير اليومي الحقيقي
// يعتمد فقط على النشاط الفعلي للمستخدم في اليوم الحالي
// ============================================

(function() {
    "use strict";
    
    // ========== رسائل تحفيزية ==========
    const FIRST_DAY_MESSAGES = [
        "🎯 خطوة أولى موفقة! غداً سنكون أفضل إن شاء الله",
        "🌟 بداية رائعة! استمر على هذا المنوال",
        "💪 أنت بدأت المراجعة، وهذا شيء رائع!",
        "📚 اليوم الأول جيد، الطريق إلى B2 يبدأ بخطوة",
        "🎉 ممتاز! كل يوم تتعلم شيئاً جديداً"
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
        "🎯 أنت تتحسن مع كل يوم، لا تتوقف"
    ];
    
    // ========== تخزين البيانات ==========
    let todayData = {
        date: null,
        examsCompleted: [],     // { skill, examId, examTitle, score, date }
        gamesPlayed: 0,
        correctAnswers: 0
    };
    
    // ========== الحصول على تاريخ اليوم ==========
    function getTodayDate() {
        return new Date().toISOString().slice(0,10);
    }
    
    // ========== تسجيل نتيجة امتحان مع التاريخ ==========
    function registerExamResult(skill, examId, score, examTitle) {
        const today = getTodayDate();
        const resultKey = `exam_${skill}_${examId}`;
        const existing = localStorage.getItem(resultKey);
        let existingData = existing ? JSON.parse(existing) : null;
        
        // حفظ أو تحديث النتيجة مع التاريخ
        localStorage.setItem(resultKey, JSON.stringify({
            score: score,
            date: today,
            title: examTitle || getExamTitle(skill, examId)
        }));
        
        console.log(`📝 تم تسجيل نتيجة ${skill} Exam ${examId}: ${score}% في ${today}`);
    }
    
    // ========== الحصول على عنوان الامتحان ==========
    function getExamTitle(skill, examId) {
        if (typeof examsDatabase !== 'undefined' && examsDatabase[skill]) {
            const exam = examsDatabase[skill].find(e => e.id === examId);
            if (exam) return exam.title;
        }
        return `${skill.toUpperCase()} Exam ${examId}`;
    }
    
    // ========== جلب جميع نتائج اليوم فقط ==========
    function loadTodayResults() {
        const today = getTodayDate();
        const examsCompleted = [];
        let gamesPlayed = 0;
        let correctAnswers = 0;
        
        // البحث في localStorage عن جميع نتائج الامتحانات
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('exam_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.date === today) {
                        // استخراج skill و examId من المفتاح
                        const parts = key.split('_');
                        const skill = parts[1];
                        const examId = parseInt(parts[2]);
                        
                        examsCompleted.push({
                            skill: skill,
                            examId: examId,
                            examTitle: data.title || getExamTitle(skill, examId),
                            score: data.score,
                            date: data.date
                        });
                        
                        // حساب الإجابات الصحيحة (score هي النسبة المئوية)
                        // نفترض أن كل امتحان له 25 سؤال
                        const totalQuestions = 25;
                        const correctCount = Math.round((data.score / 100) * totalQuestions);
                        correctAnswers += correctCount;
                    }
                } catch(e) {}
            }
        }
        
        // الحصول على عدد الألعاب التي لعبها اليوم (من localStorage آخر)
        const gamesKey = `games_played_${today}`;
        const savedGames = localStorage.getItem(gamesKey);
        if (savedGames) {
            gamesPlayed = parseInt(savedGames) || 0;
        }
        
        return {
            date: today,
            examsCompleted: examsCompleted,
            gamesPlayed: gamesPlayed,
            correctAnswers: correctAnswers
        };
    }
    
    // ========== تسجيل لعبة تم لعبها اليوم ==========
    function registerGamePlayed() {
        const today = getTodayDate();
        const gamesKey = `games_played_${today}`;
        let current = parseInt(localStorage.getItem(gamesKey)) || 0;
        current++;
        localStorage.setItem(gamesKey, current);
        console.log(`🎮 تم تسجيل لعبة اليوم: ${current}`);
    }
    
    // ========== جلب بيانات الأمس للمقارنة ==========
    function getYesterdayData() {
        const today = getTodayDate();
        let yesterdayData = null;
        
        // البحث عن اليوم السابق (آخر يوم له نشاط قبل اليوم)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('exam_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.date !== today) {
                        if (!yesterdayData || data.date > yesterdayData.date) {
                            yesterdayData = data;
                        }
                    }
                } catch(e) {}
            }
        }
        
        if (!yesterdayData) return null;
        
        // جمع نتائج ذلك اليوم
        const results = [];
        let totalCorrect = 0;
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('exam_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.date === yesterdayData.date) {
                        results.push(data);
                        totalCorrect += Math.round((data.score / 100) * 25);
                    }
                } catch(e) {}
            }
        }
        
        return {
            date: yesterdayData.date,
            examsCount: results.length,
            correctAnswers: totalCorrect
        };
    }
    
    // ========== تحديد الأجزاء الضعيفة (من امتحانات اليوم فقط) ==========
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
    
    // ========== تحديد أفضل جزء في اليوم ==========
    function getBestPart(exams) {
        if (exams.length === 0) return null;
        return exams.reduce((max, current) => {
            return (current.score > max.score) ? current : max;
        }, exams[0]);
    }
    
    // ========== اقتراح امتحانات لغد ==========
    function getTomorrowReviews(weak, urgent) {
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
        return unique.slice(0, 5);
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
    
    // ========== حساب المقارنة مع الأمس ==========
    function getComparisonMessage(yesterdayData, todayCorrect, todayExamsCount) {
        if (!yesterdayData || yesterdayData.examsCount === 0) {
            return null;
        }
        
        const todayTotal = todayCorrect;
        const yesterdayTotal = yesterdayData.correctAnswers;
        
        if (yesterdayTotal === 0) return null;
        
        const diff = todayTotal - yesterdayTotal;
        const percent = Math.round(Math.abs(diff / yesterdayTotal) * 100);
        
        if (diff > 0) {
            const messages = [...IMPROVEMENT_MESSAGES];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            return randomMsg.replace('{percent}', percent);
        } else if (diff < 0) {
            return `📉 اليوم كان أقل من الأمس بـ ${percent}%، لكن غداً فرصة جديدة للتحسن`;
        }
        return null;
    }
    
    // ========== الحصول على رسالة تحفيزية ==========
    function getMotivationMessage(examsCount, yesterdayData, comparisonMsg) {
        if (examsCount === 0) {
            return null;
        }
        
        if (!yesterdayData || yesterdayData.examsCount === 0) {
            const randomIndex = Math.floor(Math.random() * FIRST_DAY_MESSAGES.length);
            return FIRST_DAY_MESSAGES[randomIndex];
        }
        
        if (comparisonMsg) {
            return comparisonMsg;
        }
        
        const randomIndex = Math.floor(Math.random() * NO_COMPARISON_MESSAGES.length);
        return NO_COMPARISON_MESSAGES[randomIndex];
    }
    
    // ========== إنشاء نافذة التقرير ==========
    function createReportModal() {
        if (document.getElementById('reportModal')) return;
        
        // تحميل بيانات اليوم الحقيقية
        const todayResults = loadTodayResults();
        const exams = todayResults.examsCompleted;
        const examsCount = exams.length;
        const gamesCount = todayResults.gamesPlayed;
        const correctAnswers = todayResults.correctAnswers;
        
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
        
        // إذا لم يقم المستخدم بأي نشاط اليوم
        if (examsCount === 0 && gamesCount === 0) {
            const noActivityModal = document.createElement('div');
            noActivityModal.id = 'reportModal';
            noActivityModal.className = 'report-modal-overlay';
            noActivityModal.innerHTML = `
                <div class="report-modal-container" style="max-width: 380px;">
                    <div class="report-modal-header">
                        <h3>📊 تقرير اليوم</h3>
                        <button class="close-report-modal">✕</button>
                    </div>
                    <div class="report-modal-body" style="text-align: center; padding: 40px 24px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">📚</div>
                        <div style="font-size: 1.1rem; font-weight: 500; color: #5dade2; margin-bottom: 12px;">لم تقم بأي مراجعة اليوم بعد</div>
                        <div style="color: #a0a0a0; font-size: 0.85rem;">هذه الخاصية تعمل بعد أن تنهي مراجعتك اليومية</div>
                    </div>
                    <div class="report-modal-footer">
                        🌟 ابدأ المراجعة الآن، وستظهر نتائجك هنا
                    </div>
                </div>
            `;
            document.body.appendChild(noActivityModal);
            return noActivityModal;
        }
        
        // حساب الأجزاء الضعيفة (من امتحانات اليوم فقط)
        const { weak, urgent } = getWeakParts(exams);
        const bestPart = getBestPart(exams);
        const tomorrowReviews = getTomorrowReviews(weak, urgent);
        
        // المقارنة مع الأمس
        const yesterdayData = getYesterdayData();
        const comparisonMsg = getComparisonMessage(yesterdayData, correctAnswers, examsCount);
        const motivationMsg = getMotivationMessage(examsCount, yesterdayData, comparisonMsg);
        
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
                    
                    <div class="motivation-message">
                        <div class="motivation-icon">💪</div>
                        <div class="motivation-text">${motivationMsg || "أنت في الطريق الصحيح، استمر!"}</div>
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
    
    // ========== إضافة زر التقرير في الصفحة الرئيسية ==========
    function addReportButton() {
        const rightSide = document.querySelector('.top-bar .right-side');
        if (!rightSide) {
            setTimeout(addReportButton, 500);
            return;
        }
        
        if (document.getElementById('dailyReportBtn')) return;
        
        const reviewsBtn = document.getElementById('reviewsStatsBtn');
        
        const reportBtn = document.createElement('button');
        reportBtn.id = 'dailyReportBtn';
        reportBtn.className = 'daily-report-btn';
        reportBtn.innerHTML = '📊 أنا أنهيت المراجعة اليوم';
        reportBtn.setAttribute('title', 'عرض تقرير أدائك اليومي');
        
        // إضافة الزر بعد زر التقييمات
        if (reviewsBtn) {
            rightSide.insertBefore(reportBtn, reviewsBtn.nextSibling);
        } else {
            rightSide.insertBefore(reportBtn, rightSide.firstChild);
        }
        
        reportBtn.addEventListener('click', openReportModal);
        console.log('📊 زر التقرير اليومي تمت إضافته بنجاح');
    }
    
    // ========== ربط دوال التسجيل بالنطاق العام ==========
    window.registerExamResult = registerExamResult;
    window.registerGamePlayed = registerGamePlayed;
    
    // ========== مراقبة الصفحة الرئيسية ==========
    function observeHomePageForReport() {
        const homePage = document.getElementById('home');
        const reportBtn = document.getElementById('dailyReportBtn');
        
        if (!homePage || !reportBtn) return;
        
        const observer = new MutationObserver(() => {
            reportBtn.style.display = homePage.classList.contains('active') ? 'flex' : 'none';
        });
        
        observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
        reportBtn.style.display = homePage.classList.contains('active') ? 'flex' : 'none';
    }
    
    // ========== التهيئة ==========
    function init() {
        addReportButton();
        setTimeout(observeHomePageForReport, 100);
    }
    
    init();
})();