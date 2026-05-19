// ============================================
// dailyTracker.js - نظام تتبع الأداء اليومي
// مسؤول فقط عن تسجيل واسترجاع بيانات اليوم
// ============================================

(function() {
    "use strict";
    
    // ========== مفاتيح التخزين ==========
    const STORAGE_KEYS = {
        DAILY_EXAMS: 'zertiva_daily_exams',      // امتحانات اليوم
        DAILY_GAMES: 'zertiva_daily_games',      // ألعاب اليوم
        LAST_RESET_DATE: 'zertiva_last_reset'    // تاريخ آخر تصفير
    };
    
    // ========== الحصول على تاريخ اليوم ==========
    function getTodayDate() {
        return new Date().toISOString().slice(0,10);
    }
    
    // ========== التحقق من الحاجة لتصفير البيانات ==========
    function checkAndResetIfNewDay() {
        const today = getTodayDate();
        const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
        
        if (lastReset !== today) {
            // يوم جديد → تصفير البيانات
            localStorage.setItem(STORAGE_KEYS.DAILY_EXAMS, JSON.stringify([]));
            localStorage.setItem(STORAGE_KEYS.DAILY_GAMES, JSON.stringify([]));
            localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
            console.log(`📅 [DailyTracker] يوم جديد (${today})، تم تصفير البيانات`);
        }
    }
    
    // ========== تسجيل امتحان مكتمل ==========
    function registerDailyExam(skill, examId, examTitle, score, correctAnswers, totalQuestions) {
        const today = getTodayDate();
        
        // التأكد من أن اليوم هو اليوم الحالي
        checkAndResetIfNewDay();
        
        // جلب الامتحانات المسجلة اليوم
        let dailyExams = [];
        const saved = localStorage.getItem(STORAGE_KEYS.DAILY_EXAMS);
        if (saved) {
            try {
                dailyExams = JSON.parse(saved);
            } catch(e) {}
        }
        
        // إزالة أي تسجيل سابق لنفس الامتحان في نفس اليوم (تحديث)
        dailyExams = dailyExams.filter(e => 
            !(e.skill === skill && e.examId === examId)
        );
        
        // إضافة الامتحان الجديد
        dailyExams.push({
            skill: skill,
            examId: examId,
            examTitle: examTitle,
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: totalQuestions || 25,
            date: today,
            timestamp: Date.now()
        });
        
        localStorage.setItem(STORAGE_KEYS.DAILY_EXAMS, JSON.stringify(dailyExams));
        console.log(`✅ [DailyTracker] تم تسجيل امتحان: ${skill} - Exam ${examId} (${correctAnswers}/${totalQuestions} إجابة صحيحة، ${score}%)`);
        
        return dailyExams;
    }
    
    // ========== تسجيل لعبة مكتملة ==========
    function registerDailyGame() {
        const today = getTodayDate();
        
        checkAndResetIfNewDay();
        
        let dailyGames = [];
        const saved = localStorage.getItem(STORAGE_KEYS.DAILY_GAMES);
        if (saved) {
            try {
                dailyGames = JSON.parse(saved);
            } catch(e) {}
        }
        
        dailyGames.push({
            date: today,
            timestamp: Date.now()
        });
        
        localStorage.setItem(STORAGE_KEYS.DAILY_GAMES, JSON.stringify(dailyGames));
        console.log(`✅ [DailyTracker] تم تسجيل لعبة (المجموع: ${dailyGames.length})`);
        
        return dailyGames.length;
    }
    
    // ========== جلب امتحانات اليوم ==========
    function getTodayExams() {
        checkAndResetIfNewDay();
        
        const saved = localStorage.getItem(STORAGE_KEYS.DAILY_EXAMS);
        if (!saved) return [];
        
        try {
            return JSON.parse(saved);
        } catch(e) {
            return [];
        }
    }
    
    // ========== جلب عدد ألعاب اليوم ==========
    function getTodayGamesCount() {
        checkAndResetIfNewDay();
        
        const saved = localStorage.getItem(STORAGE_KEYS.DAILY_GAMES);
        if (!saved) return 0;
        
        try {
            const games = JSON.parse(saved);
            return games.length;
        } catch(e) {
            return 0;
        }
    }
    
    // ========== جلب إجمالي الإجابات الصحيحة اليوم ==========
    function getTodayCorrectAnswers() {
        const exams = getTodayExams();
        return exams.reduce((sum, exam) => sum + (exam.correctAnswers || 0), 0);
    }
    
    // ========== جلب عدد الامتحانات المكتملة اليوم ==========
    function getTodayExamsCount() {
        return getTodayExams().length;
    }
    
    // ========== جلب بيانات الأمس للمقارنة ==========
    function getYesterdayStats() {
        const today = getTodayDate();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0,10);
        
        // ملاحظة: لا يمكن استرجاع بيانات الأمس بسهولة لأننا لا نخزنها
        // لهذا نستخدم localStorage منفصل لبيانات الأمس
        const savedYesterday = localStorage.getItem('zertiva_yesterday_stats');
        if (savedYesterday) {
            try {
                return JSON.parse(savedYesterday);
            } catch(e) {
                return null;
            }
        }
        
        // إذا لم تكن هناك بيانات للأمس، نرجع null
        return null;
    }
    
    // ========== حفظ بيانات اليوم كأمس (يُستدعى في نهاية اليوم أو عند بداية يوم جديد) ==========
    function saveTodayAsYesterday() {
        const exams = getTodayExams();
        const gamesCount = getTodayGamesCount();
        const correctAnswers = getTodayCorrectAnswers();
        
        const yesterdayStats = {
            date: getTodayDate(),
            examsCount: exams.length,
            gamesCount: gamesCount,
            correctAnswers: correctAnswers,
            examResults: exams
        };
        
        localStorage.setItem('zertiva_yesterday_stats', JSON.stringify(yesterdayStats));
        console.log(`📊 [DailyTracker] تم حفظ بيانات اليوم كأمس للمقارنة`);
    }
    
    // ========== ربط الدوال بالنطاق العام ==========
    window.DailyTracker = {
        registerExam: registerDailyExam,
        registerGame: registerDailyGame,
        getTodayExams: getTodayExams,
        getTodayExamsCount: getTodayExamsCount,
        getTodayGamesCount: getTodayGamesCount,
        getTodayCorrectAnswers: getTodayCorrectAnswers,
        getYesterdayStats: getYesterdayStats,
        saveTodayAsYesterday: saveTodayAsYesterday,
        checkAndReset: checkAndResetIfNewDay
    };
    
    // ========== التهيئة ==========
    checkAndResetIfNewDay();
    console.log("📊 [DailyTracker] نظام تتبع الأداء اليومي جاهز");
    console.log("💡 استخدم DailyTracker.registerExam() لتسجيل امتحان");
    console.log("💡 استخدم DailyTracker.registerGame() لتسجيل لعبة");
    
})();