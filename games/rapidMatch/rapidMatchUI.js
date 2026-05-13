// ============================================
// rapidMatchUI.js - واجهة لعبة التحدي السريع
// ============================================

console.log("✅ rapidMatchUI.js تم تحميله");

let currentUIState = {
    active: false,
    questionStartTime: null,
    currentOptions: null
};

// ============================================
// بدء اللعبة
// ============================================
async function startRapidMatch(examId) {
    try {
        // تحميل بيانات الامتحان
        const examData = await window.loadExamFromFile("lesen1", examId);
        if (!examData) {
            alert("❌ فشل تحميل بيانات الامتحان");
            return;
        }
        
        // استخراج بيانات اللعبة
        const gameData = RapidMatch.extractGameData(examData);
        currentGameData = gameData;
        
        // توليد الجولة الأولى
        currentRound = RapidMatch.generateRound(gameData, []);
        currentQuestionIndex = 0;
        userAnswers = [];
        wrongAnswersHistory = [];
        combo = 0;
        bestCombo = 0;
        
        // عرض العد التنازلي ثم بدء اللعب
        showCountdown(() => {
            startRound();
        });
        
    } catch (error) {
        console.error("❌ خطأ في بدء اللعبة:", error);
        alert("حدث خطأ في بدء اللعبة");
    }
}

// ============================================
// العد التنازلي
// ============================================
function showCountdown(callback) {
    let count = 3;
    const countdownDiv = document.createElement("div");
    countdownDiv.className = "rapidmatch-countdown";
    document.body.appendChild(countdownDiv);
    
    function updateCountdown() {
        if (count > 0) {
            countdownDiv.textContent = count;
            count--;
            setTimeout(updateCountdown, 1000);
        } else {
            countdownDiv.textContent = "GO! 🚀";
            setTimeout(() => {
                countdownDiv.remove();
                callback();
            }, 300);
        }
    }
    
    updateCountdown();
}

// ============================================
// بدء الجولة
// ============================================
function startRound() {
    if (currentQuestionIndex >= currentRound.length) {
        endRound();
        return;
    }
    
    renderQuestion(currentRound[currentQuestionIndex]);
}

// ============================================
// عرض السؤال
// ============================================
function renderQuestion(question) {
    // إنشاء الـ overlay إذا لم يكن موجوداً
    let overlay = document.querySelector(".rapidmatch-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "rapidmatch-overlay";
        document.body.appendChild(overlay);
    }
    
    // إنشاء المحتوى
    const difficulty = bestCombo > 8 ? "hard" : "easy";
    const options = RapidMatch.generateOptions(question, difficulty);
    currentUIState.currentOptions = options;
    
    const container = document.createElement("div");
    container.className = "rapidmatch-container";
    container.id = "rapidmatch-container";
    
    // مؤقت
    const timerHtml = `
        <div class="rapidmatch-timer">
            <div class="rapidmatch-timer-bar" id="rapidmatch-timer-bar" style="width: 100%"></div>
        </div>
    `;
    
    // كومبو
    let comboText = "";
    if (combo >= 3) {
        let comboEmoji = combo >= 10 ? "🚀" : (combo >= 6 ? "⚡" : "🔥");
        comboText = `<div class="rapidmatch-combo ${combo >= 3 ? 'fire' : ''}">${comboEmoji} COMBO x${combo}</div>`;
    }
    
    // السؤال
    const questionHtml = `
        <div class="rapidmatch-question">
            “${question.firstWords}...”
        </div>
        <div class="rapidmatch-options" id="rapidmatch-options">
            ${options.map((opt, idx) => `
                <div class="rapidmatch-option" data-opt-index="${idx}" data-correct="${opt.isCorrect}" data-title="${opt.text.replace(/"/g, '&quot;')}">
                    ${String.fromCharCode(65 + idx)}. ${opt.text}
                </div>
            `).join('')}
        </div>
        ${comboText}
        <div class="rapidmatch-progress">
            ${currentQuestionIndex + 1} / ${currentRound.length}
        </div>
    `;
    
    container.innerHTML = timerHtml + questionHtml;
    overlay.innerHTML = "";
    overlay.appendChild(container);
    
    // بدء المؤقت
    startTimer(RapidMatch.SETTINGS.timePerQuestion);
    
    // إضافة مستمعي الأحداث للخيارات
    const optionDivs = container.querySelectorAll(".rapidmatch-option");
    optionDivs.forEach(opt => {
        opt.addEventListener("click", (e) => {
            if (!roundActive) return;
            stopTimer();
            const isCorrect = opt.getAttribute("data-correct") === "true";
            const selectedTitle = opt.getAttribute("data-title");
            const timeTaken = RapidMatch.SETTINGS.timePerQuestion - timeLeft;
            
            // تأثير مرئي
            if (isCorrect) {
                opt.classList.add("correct-answer");
            } else {
                opt.classList.add("wrong-answer");
                // إظهار الإجابة الصحيحة
                optionDivs.forEach(o => {
                    if (o.getAttribute("data-correct") === "true") {
                        o.classList.add("correct-answer");
                    }
                });
            }
            
            // تسجيل الإجابة
            RapidMatch.recordAnswer(currentQuestionIndex, { text: selectedTitle, isCorrect: isCorrect }, timeTaken, isCorrect);
            
            // تأخير قصير قبل الانتقال للسؤال التالي
            setTimeout(() => {
                currentQuestionIndex++;
                startRound();
            }, 300);
        });
    });
    
    roundActive = true;
    currentUIState.questionStartTime = Date.now();
}

// ============================================
// بدء المؤقت
// ============================================
function startTimer(seconds) {
    timeLeft = seconds;
    const timerBar = document.getElementById("rapidmatch-timer-bar");
    if (!timerBar) return;
    
    timerBar.style.width = "100%";
    timerBar.classList.remove("urgent", "critical");
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        if (!roundActive) return;
        
        timeLeft -= 0.02;
        const percent = Math.max(0, (timeLeft / seconds) * 100);
        timerBar.style.width = `${percent}%`;
        
        if (percent < 30) timerBar.classList.add("urgent");
        if (percent < 15) timerBar.classList.add("critical");
        
        if (timeLeft <= 0) {
            // انتهى الوقت
            clearInterval(timerInterval);
            timerInterval = null;
            
            if (roundActive) {
                roundActive = false;
                
                // إظهار جميع الخيارات مع الإشارة للصحيح
                const options = document.querySelectorAll(".rapidmatch-option");
                options.forEach(opt => {
                    if (opt.getAttribute("data-correct") === "true") {
                        opt.classList.add("correct-answer");
                    } else {
                        opt.classList.add("wrong-answer");
                    }
                });
                
                // تسجيل إجابة خاطئة
                const correctOption = Array.from(options).find(o => o.getAttribute("data-correct") === "true");
                const correctTitle = correctOption ? correctOption.getAttribute("data-title") : "";
                
                RapidMatch.recordAnswer(currentQuestionIndex, { text: "", isCorrect: false }, seconds, false);
                
                setTimeout(() => {
                    currentQuestionIndex++;
                    startRound();
                }, 400);
            }
        }
    }, 20);
}

// ============================================
// إيقاف المؤقت
// ============================================
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    roundActive = false;
}

// ============================================
// إنهاء الجولة وعرض النتائج
// ============================================
function endRound() {
    stopTimer();
    
    const results = RapidMatch.calculateFinalResults();
    
    const overlay = document.querySelector(".rapidmatch-overlay");
    if (!overlay) return;
    
    const resultsHtml = `
        <div class="rapidmatch-container rapidmatch-results">
            <h2>🏆 نهاية التحدي</h2>
            <div class="rapidmatch-results-stats">
                <div class="rapidmatch-stat">
                    <div class="rapidmatch-stat-value">${results.correct}/${results.total}</div>
                    <div class="rapidmatch-stat-label">إجابات صحيحة</div>
                </div>
                <div class="rapidmatch-stat">
                    <div class="rapidmatch-stat-value">${results.accuracy}%</div>
                    <div class="rapidmatch-stat-label">الدقة</div>
                </div>
                <div class="rapidmatch-stat">
                    <div class="rapidmatch-stat-value">⚡ ${results.avgSpeed}s</div>
                    <div class="rapidmatch-stat-label">متوسط السرعة</div>
                </div>
                <div class="rapidmatch-stat">
                    <div class="rapidmatch-stat-value">🔥 ${results.bestCombo}</div>
                    <div class="rapidmatch-stat-label">أفضل كومبو</div>
                </div>
            </div>
            ${results.worstQuestion ? `
                <div class="rapidmatch-stat" style="grid-column: span 2; background: #fff3cd;">
                    <div class="rapidmatch-stat-label">⚠️ أكثر فقرة أخطأت فيها</div>
                    <div style="font-size: 14px; margin-top: 5px;">“${results.worstQuestion}...”</div>
                </div>
            ` : ''}
            <div class="rapidmatch-grade">
                📊 ${results.grade}
            </div>
            <div class="rapidmatch-buttons">
                <button class="rapidmatch-btn rapidmatch-btn-primary" id="rapidmatch-retry">🔄 تحدٍّ جديد</button>
                <button class="rapidmatch-btn rapidmatch-btn-secondary" id="rapidmatch-close">✖ إغلاق</button>
            </div>
        </div>
    `;
    
    overlay.innerHTML = resultsHtml;
    
    document.getElementById("rapidmatch-retry")?.addEventListener("click", () => {
        startRapidMatch(currentGameData.examId);
    });
    
    document.getElementById("rapidmatch-close")?.addEventListener("click", () => {
        overlay.remove();
    });
}

// ============================================
// تصدير الدوال للنطاق العام
// ============================================
window.startRapidMatch = startRapidMatch;

console.log("✅ rapidMatchUI.js جاهز للاستخدام");