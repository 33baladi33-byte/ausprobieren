// ============================================
// rapidMatch.js - منطق لعبة التحدي السريع
// ============================================

console.log("✅ rapidMatch.js تم تحميله");

// متغيرات اللعبة العامة
let currentGameData = null;
let currentRound = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let wrongAnswersHistory = [];
let combo = 0;
let bestCombo = 0;
let roundActive = false;
let timerInterval = null;
let timeLeft = 0;

// إعدادات اللعبة
const SETTINGS = {
    timePerQuestion: 2.2,      // 2.2 ثانية للسؤال
    roundLength: 15,           // 15 سؤال في الجولة
    wrongRepeatDelay: 3,       // يعيد السؤال الخاطئ بعد 3 أسئلة
    wrongRepeatMax: 5          // أقصى تأخير 5 أسئلة
};

// ============================================
// استخراج بيانات اللعبة من ملف الامتحان
// ============================================
function extractGameData(examData) {
    console.log("🟢 استخراج بيانات اللعبة من:", examData.title);
    
    const items = examData.items || [];
    const allTitles = examData.sharedOptions || [];
    
    const questions = [];
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const fullText = item.text;
        const correctTitle = allTitles[item.correct];
        
        // استخراج أول 4-6 كلمات
        const words = fullText.split(' ');
        let firstWords = words.slice(0, Math.min(5, words.length)).join(' ');
        if (firstWords.length < 20 && words.length > 5) {
            firstWords = words.slice(0, 6).join(' ');
        }
        
        // عناوين خاطئة (جميع العناوين ما عدا الصحيح)
        const wrongTitles = allTitles.filter((_, idx) => idx !== item.correct);
        
        questions.push({
            id: i,
            firstWords: firstWords,
            fullText: fullText,
            correctTitle: correctTitle,
            correctIndex: item.correct,
            wrongTitles: wrongTitles,
            timesWrong: 0,
            lastWrongAt: -999
        });
    }
    
    return {
        examId: examData.id || 1,
        examTitle: examData.title,
        questions: questions,
        allTitles: allTitles
    };
}

// ============================================
// توليد جولة جديدة (15 سؤال ذكية)
// ============================================
function generateRound(gameData, wrongHistory = []) {
    const questions = [...gameData.questions];
    const round = [];
    const usedQuestions = {};
    const wrongQueue = []; // الأسئلة التي ستُعاد
    
    // إضافة الأسئلة الخاطئة من الجولات السابقة
    for (let i = 0; i < wrongHistory.length; i++) {
        const wrongQ = wrongHistory[i];
        const delay = SETTINGS.wrongRepeatDelay + Math.floor(Math.random() * 3);
        wrongQueue.push({
            questionId: wrongQ,
            scheduledAt: round.length + delay
        });
    }
    
    let currentPos = 0;
    let maxAttempts = 0;
    
    while (round.length < SETTINGS.roundLength && maxAttempts < 100) {
        maxAttempts++;
        
        // التحقق إذا كان هناك سؤال خاطئ يجب إعادته الآن
        let addedWrong = false;
        for (let i = 0; i < wrongQueue.length; i++) {
            if (wrongQueue[i].scheduledAt === currentPos) {
                const wrongQ = questions[wrongQueue[i].questionId];
                if (wrongQ) {
                    round.push({ ...wrongQ, isRepeat: true });
                    wrongQueue.splice(i, 1);
                    addedWrong = true;
                    break;
                }
            }
        }
        
        if (addedWrong) {
            currentPos++;
            continue;
        }
        
        // اختيار سؤال عشوائي لم يظهر كثيراً
        let available = questions.filter((_, idx) => {
            const count = usedQuestions[idx] || 0;
            return count < 2; // كل سؤال يظهر مرتين كحد أقصى
        });
        
        if (available.length === 0) {
            // إذا خلصت الأسئلة، نعيد تعيين الاستخدام
            for (let key in usedQuestions) {
                usedQuestions[key] = 0;
            }
            available = [...questions];
        }
        
        const randomIndex = Math.floor(Math.random() * available.length);
        const selectedQuestion = available[randomIndex];
        const originalIndex = questions.findIndex(q => q.id === selectedQuestion.id);
        
        usedQuestions[originalIndex] = (usedQuestions[originalIndex] || 0) + 1;
        
        round.push({ ...selectedQuestion, isRepeat: false });
        currentPos++;
    }
    
    // خلط ترتيب الجولة
    for (let i = round.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [round[i], round[j]] = [round[j], round[i]];
    }
    
    return round;
}

// ============================================
// توليد خيارات للسؤال (2 أو 3 خيارات)
// ============================================
function generateOptions(question, difficulty = 'easy') {
    const options = [];
    
    // الخيار الصحيح دائماً
    options.push({
        text: question.correctTitle,
        isCorrect: true,
        index: question.correctIndex
    });
    
    // خيارات خاطئة
    const wrongOptions = [...question.wrongTitles];
    
    // خلط الخيارات الخاطئة
    for (let i = wrongOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wrongOptions[i], wrongOptions[j]] = [wrongOptions[j], wrongOptions[i]];
    }
    
    const numberOfWrong = difficulty === 'hard' ? 2 : 1;
    
    for (let i = 0; i < numberOfWrong && i < wrongOptions.length; i++) {
        options.push({
            text: wrongOptions[i],
            isCorrect: false,
            index: -1
        });
    }
    
    // خلط الخيارات النهائية
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    return options;
}

// ============================================
// تسجيل إجابة
// ============================================
function recordAnswer(questionIndex, selectedOption, timeTaken, isCorrect) {
    const question = currentRound[questionIndex];
    
    userAnswers.push({
        questionId: question.id,
        firstWords: question.firstWords,
        correctTitle: question.correctTitle,
        selectedTitle: selectedOption.text,
        isCorrect: isCorrect,
        timeTaken: timeTaken
    });
    
    if (isCorrect) {
        combo++;
        if (combo > bestCombo) bestCombo = combo;
    } else {
        combo = 0;
        // تسجيل السؤال الخاطئ للإعادة
        wrongAnswersHistory.push(question.id);
        question.timesWrong++;
        question.lastWrongAt = userAnswers.length;
    }
}

// ============================================
// حساب النتائج النهائية
// ============================================
function calculateFinalResults() {
    const total = userAnswers.length;
    const correct = userAnswers.filter(a => a.isCorrect).length;
    const accuracy = total > 0 ? (correct / total * 100).toFixed(1) : 0;
    
    // حساب متوسط السرعة
    let totalTime = 0;
    let timeCount = 0;
    userAnswers.forEach(a => {
        if (a.timeTaken) {
            totalTime += a.timeTaken;
            timeCount++;
        }
    });
    const avgSpeed = timeCount > 0 ? (totalTime / timeCount).toFixed(2) : 0;
    
    // أكثر فقرة أخطأ فيها
    const wrongCount = {};
    userAnswers.forEach(a => {
        if (!a.isCorrect) {
            const key = a.firstWords;
            wrongCount[key] = (wrongCount[key] || 0) + 1;
        }
    });
    
    let worstQuestion = null;
    let maxWrong = 0;
    for (let key in wrongCount) {
        if (wrongCount[key] > maxWrong) {
            maxWrong = wrongCount[key];
            worstQuestion = key;
        }
    }
    
    // تقييم عام
    let grade = "";
    if (accuracy >= 90 && avgSpeed < 1.5) grade = "🔥 خارق! أنت جاهز للامتحان";
    else if (accuracy >= 80) grade = "🧠 ممتاز! سرعتك ممتازة";
    else if (accuracy >= 70) grade = "👍 جيد جداً، واصل التدريب";
    else if (accuracy >= 60) grade = "📖 تحتاج مراجعة بعض الفقرات";
    else grade = "💪 لا تستسلم! أعد المحاولة";
    
    return {
        total: total,
        correct: correct,
        accuracy: accuracy,
        avgSpeed: avgSpeed,
        bestCombo: bestCombo,
        worstQuestion: worstQuestion,
        grade: grade
    };
}

// ============================================
// تصدير الوظائف للنطاق العام
// ============================================
window.RapidMatch = {
    extractGameData,
    generateRound,
    generateOptions,
    recordAnswer,
    calculateFinalResults,
    SETTINGS
};

console.log("✅ rapidMatch.js جاهز للاستخدام");