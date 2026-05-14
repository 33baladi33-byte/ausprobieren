// ============================================
// rapidGame.js - لعبة التحدي السريع
// يدعم: Hören Teil 1,2,3 | Lesen Teil 1,2,3 | Sprachbausteine Teil 1,2
// نظام الألوان: أخضر فاتح ✅ | برتقالي فاتح ❌
// المسار: data/games/المهارة/examX.json
// ============================================

(function() {
    "use strict";
    
    // إعدادات اللعبة الأساسية
    const BASE_SETTINGS = {
        transitionDelay: 250,
        firstWordsLength: 8,
        titleLength: 7,
        roundLength: 16,
        minWrongRepeatDelay: 2,
        maxWrongRepeatDelay: 5
    };
    
    // أوضاع السرعة
    const SPEED_MODES = {
        reflex: { name: "Reflex", timePerQuestion: 2.2, icon: "⚡⚡⚡", display: "⚡⚡⚡ Reflex" },
        focus: { name: "Focus", timePerQuestion: 5.0, icon: "⚡", display: "⚡ Focus" }
    };
    
    let currentSpeedMode = "reflex";
    let SETTINGS = { ...BASE_SETTINGS, timePerQuestion: SPEED_MODES.reflex.timePerQuestion };
    
    // متغيرات اللعبة
    let gameActive = false;
    let gamePaused = false;
    let gameStarted = false;
    let gameOverlay = null;
    let currentGameData = null;
    let originalQuestions = [];
    let currentRound = [];
    let currentIndex = 0;
    let userAnswers = [];
    let combo = 0;
    let bestCombo = 0;
    let timerInterval = null;
    let transitionTimeout = null;
    let remainingTime = SETTINGS.timePerQuestion;
    let currentOptionsDiv = null;
    let currentStartTime = 0;
    
    let questionStats = {};
    
    let currentSkill = null;
    let currentExamId = null;

    // متغير خاص بـ Hören و Lesen 2 لحفظ الجمل الأصلية
    let reflexSentences = [];
    
    // دالة استخراج أول 7-9 كلمات من النص
    function extractFirstWords(text, maxWords) {
        if (!text) return "";
        let cleanText = text.replace(/^Text \d+:\s*/, '');
        const words = cleanText.split(' ');
        const wordCount = Math.min(maxWords, words.length);
        let result = words.slice(0, wordCount).join(' ');
        if (words.length > wordCount) result += '...';
        return result;
    }
    
    // عرض شاشة اختيار الوضع
    function showModeSelectionScreen() {
        if (gameOverlay) gameOverlay.remove();
        
        gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:450px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);position:relative';
        
        const title = document.createElement('div');
        title.textContent = '🎮 اختر الوضع المناسب لك';
        title.style.cssText = 'font-size:18px;font-weight:600;color:#2c3e66;margin-bottom:20px';
        container.appendChild(title);
        
        const modesContainer = document.createElement('div');
        modesContainer.style.cssText = 'display:flex;justify-content:center;gap:15px;margin-bottom:20px';
        
        const reflexBtn = document.createElement('button');
        reflexBtn.id = 'modeSelectReflex';
        reflexBtn.textContent = '⚡⚡⚡ Reflex';
        reflexBtn.style.cssText = 'padding:10px 20px;border-radius:30px;font-size:14px;font-weight:500;cursor:pointer;border:1px solid #ccc;background:#e8e8e8;color:#333;transition:all 0.1s ease';
        reflexBtn.onclick = () => {
            setSpeedMode('reflex');
            updateModeSelectionUI(reflexBtn, focusBtn);
        };
        
        const focusBtn = document.createElement('button');
        focusBtn.id = 'modeSelectFocus';
        focusBtn.textContent = '⚡ Focus';
        focusBtn.style.cssText = 'padding:10px 20px;border-radius:30px;font-size:14px;font-weight:500;cursor:pointer;border:1px solid #ccc;background:#e8e8e8;color:#333;transition:all 0.1s ease';
        focusBtn.onclick = () => {
            setSpeedMode('focus');
            updateModeSelectionUI(reflexBtn, focusBtn);
        };
        
        modesContainer.appendChild(reflexBtn);
        modesContainer.appendChild(focusBtn);
        container.appendChild(modesContainer);
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = 'display:flex;justify-content:center;gap:12px;margin-top:15px';
        
        const startBtn = document.createElement('button');
        startBtn.textContent = '▶ ابدأ التحدي';
        startBtn.style.cssText = 'background:#2c3e66;color:white;border:none;border-radius:40px;padding:12px 28px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.15s';
        startBtn.onmouseenter = () => { startBtn.style.background = '#1a2a4a'; };
        startBtn.onmouseleave = () => { startBtn.style.background = '#2c3e66'; };
        startBtn.onclick = () => {
            gameOverlay.remove();
            startGameAfterModeSelection();
        };
        buttonsContainer.appendChild(startBtn);
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'ليس الان';
        cancelBtn.style.cssText = 'background:#f0f0f0;color:#888;border:none;border-radius:40px;padding:12px 20px;font-size:13px;font-weight:400;cursor:pointer;transition:all 0.15s';
        cancelBtn.onmouseenter = () => { cancelBtn.style.background = '#e0e0e0'; cancelBtn.style.color = '#666'; };
        cancelBtn.onmouseleave = () => { cancelBtn.style.background = '#f0f0f0'; cancelBtn.style.color = '#888'; };
        cancelBtn.onclick = () => {
            gameOverlay.remove();
            gameStarted = false;
        };
        buttonsContainer.appendChild(cancelBtn);
        
        container.appendChild(buttonsContainer);
        gameOverlay.appendChild(container);
        document.body.appendChild(gameOverlay);
        
        function updateModeSelectionUI(reflex, focus) {
            if (currentSpeedMode === 'reflex') {
                reflex.style.background = '#d4e8ff';
                reflex.style.border = '1px solid #4a90e2';
                reflex.style.color = '#2c3e66';
                focus.style.background = '#e8e8e8';
                focus.style.border = '1px solid #ccc';
                focus.style.color = '#333';
            } else {
                focus.style.background = '#d4e8ff';
                focus.style.border = '1px solid #4a90e2';
                focus.style.color = '#2c3e66';
                reflex.style.background = '#e8e8e8';
                reflex.style.border = '1px solid #ccc';
                reflex.style.color = '#333';
            }
        }
        updateModeSelectionUI(reflexBtn, focusBtn);
    }
    
    function startGameAfterModeSelection() {
        if (gameStarted) return;
        gameStarted = true;
        gamePaused = false;
        
        loadGameData(currentSkill, currentExamId).then(loaded => {
            if (!loaded) { showNotAvailableMessage(); return; }
            if (originalQuestions.length === 0) {
                showNotAvailableMessage();
                return;
            }
            currentRound = generateSmartRound(originalQuestions, questionStats);
            currentIndex = 0;
            userAnswers = [];
            combo = 0;
            bestCombo = 0;
            showCountdown();
        });
    }
    
    function restartGameOnModeChange() {
        if (!gameStarted) return;
        
        currentRound = generateSmartRound(originalQuestions, questionStats);
        currentIndex = 0;
        userAnswers = [];
        combo = 0;
        bestCombo = 0;
        gameActive = false;
        gameStarted = false;
        gamePaused = true;
        
        if (timerInterval) clearInterval(timerInterval);
        if (transitionTimeout) clearTimeout(transitionTimeout);
        
        if (gameOverlay) {
            const container = gameOverlay.querySelector('.game-container-inner');
            if (container) {
                const progressDiv = container.querySelector('.game-progress');
                if (progressDiv) progressDiv.textContent = `1 / ${currentRound.length}`;
                
                const existingMsg = container.querySelector('.mode-change-message');
                if (!existingMsg) {
                    const bottomBar = container.querySelector('.bottom-bar');
                    if (bottomBar) {
                        const msg = document.createElement('div');
                        msg.className = 'mode-change-message';
                        msg.style.cssText = 'display:flex;align-items:center;gap:6px;background:#4a90e2;color:white;padding:6px 12px;border-radius:30px;font-size:12px;margin-right:10px';
                        msg.innerHTML = '← تم تغيير الوضع';
                        bottomBar.insertBefore(msg, bottomBar.querySelector('.control-btns'));
                    }
                }
                
                const pauseBtn = container.querySelector('#gamePauseBtn');
                if (pauseBtn) pauseBtn.textContent = '▶ Resume';
            }
        }
        
        console.log('🔄 تم إعادة تعيين اللعبة بسبب تغيير الوضع');
    }
    
    function setSpeedMode(mode) {
        if (!SPEED_MODES[mode]) return;
        const oldMode = currentSpeedMode;
        currentSpeedMode = mode;
        SETTINGS.timePerQuestion = SPEED_MODES[mode].timePerQuestion;
        
        const reflexBtn = document.getElementById('modeReflexBtn');
        const focusBtn = document.getElementById('modeFocusBtn');
        if (reflexBtn && focusBtn) {
            if (mode === 'reflex') {
                reflexBtn.style.background = '#3a3a3a';
                reflexBtn.style.color = '#fff';
                reflexBtn.style.border = '1px solid #555';
                reflexBtn.style.boxShadow = '0 0 4px rgba(100,100,100,0.3)';
                focusBtn.style.background = '#2a2a2a';
                focusBtn.style.color = '#888';
                focusBtn.style.border = '1px solid #3a3a3a';
                focusBtn.style.boxShadow = 'none';
            } else {
                focusBtn.style.background = '#3a3a3a';
                focusBtn.style.color = '#fff';
                focusBtn.style.border = '1px solid #555';
                focusBtn.style.boxShadow = '0 0 4px rgba(100,100,100,0.3)';
                reflexBtn.style.background = '#2a2a2a';
                reflexBtn.style.color = '#888';
                reflexBtn.style.border = '1px solid #3a3a3a';
                reflexBtn.style.boxShadow = 'none';
            }
        }
        
        if (gameStarted && oldMode !== mode) {
            restartGameOnModeChange();
        }
        
        console.log(`🎮 تم التبديل إلى وضع ${SPEED_MODES[mode].name} - الوقت: ${SETTINGS.timePerQuestion} ثانية`);
    }
    
    function createSpeedModeSelector() {
        const container = document.createElement('div');
        container.style.cssText = 'display:flex;justify-content:center;gap:8px;margin:15px 0 10px 0';
        
        const reflexBtn = document.createElement('button');
        reflexBtn.id = 'modeReflexBtn';
        reflexBtn.textContent = '⚡⚡⚡ Reflex';
        reflexBtn.style.cssText = 'padding:5px 14px;border-radius:25px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.1s ease;border:1px solid #3a3a3a;background:#2a2a2a;color:#888;box-shadow:none';
        reflexBtn.onclick = () => { setSpeedMode('reflex'); };
        
        const focusBtn = document.createElement('button');
        focusBtn.id = 'modeFocusBtn';
        focusBtn.textContent = '⚡ Focus';
        focusBtn.style.cssText = 'padding:5px 14px;border-radius:25px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.1s ease;border:1px solid #3a3a3a;background:#2a2a2a;color:#888;box-shadow:none';
        focusBtn.onclick = () => { setSpeedMode('focus'); };
        
        container.appendChild(reflexBtn);
        container.appendChild(focusBtn);
        
        return container;
    }
    
    function createCircularTimer(percent) {
        const radius = 18;
        const circumference = 2 * Math.PI * radius;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "40");
        svg.setAttribute("height", "40");
        svg.setAttribute("viewBox", "0 0 45 45");
        svg.style.cssText = "transform:rotate(-90deg);display:block";
        
        const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        bgCircle.setAttribute("cx", "22.5");
        bgCircle.setAttribute("cy", "22.5");
        bgCircle.setAttribute("r", radius);
        bgCircle.setAttribute("fill", "none");
        bgCircle.setAttribute("stroke", "#d4d4d4");
        bgCircle.setAttribute("stroke-width", "3");
        svg.appendChild(bgCircle);
        
        const fillCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        fillCircle.setAttribute("cx", "22.5");
        fillCircle.setAttribute("cy", "22.5");
        fillCircle.setAttribute("r", radius);
        fillCircle.setAttribute("fill", "none");
        fillCircle.setAttribute("stroke", "#4a90e2");
        fillCircle.setAttribute("stroke-width", "3");
        fillCircle.setAttribute("stroke-linecap", "round");
        fillCircle.setAttribute("stroke-dasharray", circumference);
        fillCircle.setAttribute("stroke-dashoffset", circumference * (1 - percent / 100));
        svg.appendChild(fillCircle);
        
        return { svg, fillCircle };
    }
    
    function generateSmartRound(questions, stats) {
        const round = [];
        const usageCount = {};
        const pendingRepeat = [];
        
        questions.forEach((_, idx) => { usageCount[idx] = 0; });
        
        for (let idx in stats) {
            const stat = stats[idx];
            if (stat.timesWrong > 0 && stat.timesWrong < 3 && stat.lastWrongAt > -5) {
                const delay = SETTINGS.minWrongRepeatDelay + Math.floor(Math.random() * (SETTINGS.maxWrongRepeatDelay - SETTINGS.minWrongRepeatDelay + 1));
                pendingRepeat.push({
                    questionId: parseInt(idx),
                    scheduledAt: round.length + delay,
                    priority: stat.timesWrong
                });
            }
        }
        
        let currentPos = 0;
        let maxAttempts = 0;
        
        while (round.length < SETTINGS.roundLength && maxAttempts < 100) {
            maxAttempts++;
            
            let addedRepeat = false;
            for (let i = 0; i < pendingRepeat.length; i++) {
                if (pendingRepeat[i].scheduledAt === currentPos) {
                    const qIdx = pendingRepeat[i].questionId;
                    if (usageCount[qIdx] < 3) {
                        round.push({ ...questions[qIdx], originalIndex: qIdx, isRepeat: true });
                        usageCount[qIdx]++;
                        pendingRepeat.splice(i, 1);
                        addedRepeat = true;
                        break;
                    } else {
                        pendingRepeat.splice(i, 1);
                        i--;
                    }
                }
            }
            
            if (addedRepeat) {
                currentPos++;
                continue;
            }
            
            let availableQuestions = [];
            questions.forEach((_, idx) => {
                const maxAllowed = getMaxAppearances(stats[idx]);
                if (usageCount[idx] < maxAllowed) {
                    availableQuestions.push(idx);
                }
            });
            
            if (availableQuestions.length === 0) {
                for (let idx in usageCount) { usageCount[idx] = 0; }
                availableQuestions = questions.map((_, idx) => idx);
            }
            
            let selectedIdx;
            const wrongQuestions = availableQuestions.filter(idx => stats[idx] && stats[idx].timesWrong > 0);
            if (wrongQuestions.length > 0 && Math.random() < 0.6) {
                selectedIdx = wrongQuestions[Math.floor(Math.random() * wrongQuestions.length)];
            } else {
                selectedIdx = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            }
            
            round.push({ ...questions[selectedIdx], originalIndex: selectedIdx, isRepeat: false });
            usageCount[selectedIdx]++;
            currentPos++;
        }
        
        for (let i = round.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [round[i], round[j]] = [round[j], round[i]];
        }
        
        return round;
    }
    
    function getMaxAppearances(stat) {
        if (!stat) return 1;
        if (stat.timesWrong >= 2) return 3;
        if (stat.timesWrong === 1) return 2;
        if (stat.wasSlow) return 2;
        return 1;
    }
    
    function showNotAvailableMessage() {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;justify-content:center;align-items:center';
        const card = document.createElement('div');
        card.style.cssText = 'background:white;border-radius:24px;padding:40px;max-width:400px;text-align:center;border:1px solid #e0e0e0;box-shadow:0 10px 30px rgba(0,0,0,0.1)';
        card.innerHTML = `
            <div style="font-size:48px;margin-bottom:16px">🎮</div>
            <h3 style="color:#2c3e66;margin-bottom:12px">هذا الوضع سيتوفر قريباً</h3>
            <p style="color:#666;margin-bottom:20px;font-size:14px">المتوفر حالياً:</p>
            <div style="background:#e8f0fe;padding:12px;border-radius:12px;margin-bottom:20px">
                <span style="color:#1a73e8;font-weight:bold">📖 Lesen Teil 1 – Exam 1</span>
            </div>
            <button id="closeNotAvailableBtn" style="background:#e0e0e0;border:none;padding:10px 24px;border-radius:40px;cursor:pointer;font-size:14px;color:#333">إغلاق</button>
        `;
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        document.getElementById('closeNotAvailableBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    }
    
    // ==================== دالة تحميل البيانات ====================
    function loadGameData(skill, examId) {
        currentSkill = skill;
        currentExamId = examId;
        
        let filePath = `data/games/${skill}/exam${examId}.json`;
        
        console.log(`📂 جاري تحميل: ${filePath}`);
        
        return fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    console.error(`❌ الملف غير موجود: ${filePath}`);
                    throw new Error('الملف غير موجود');
                }
                return response.json();
            })
            .then(data => {
                return processGameData(data, skill, filePath);
            })
            .catch(error => {
                console.error(`❌ خطأ في تحميل الملف:`, error);
                return false;
            });
    }
    
    function processGameData(data, skill, filePath) {
        console.log(`✅ تم تحميل الملف بنجاح: ${filePath}`, data);
        currentGameData = data;
        
        // ==================== نظام Reflex Modus (Hören 1,2,3 و Lesen 2) ====================
        if (skill === 'hoeren1' || skill === 'hoeren2' || skill === 'hoeren3' || skill === 'lesen2') {
            reflexSentences = data.sentences || [];
            console.log(`📝 تم تحميل ${reflexSentences.length} جملة لـ ${skill.toUpperCase()} (Exam ${currentExamId})`);
            
            const totalRounds = SETTINGS.roundLength;
            originalQuestions = [];
            for (let i = 0; i < totalRounds; i++) {
                originalQuestions.push({
                    type: "reflex_mode",
                    id: i,
                    questionText: "اختر الإجابة الصحيحة",
                    examId: currentExamId
                });
            }
        }
        // ==================== نظام Lesen Teil 1,3 (Matching) ====================
        else if (skill === 'lesen1' || skill === 'lesen3') {
            if (data.sharedOptions) {
                const sharedOptions = data.sharedOptions;
                originalQuestions = data.questions.map((q, idx) => {
                    const correctTitle = sharedOptions[q.correct];
                    const cleanCorrectTitle = correctTitle.replace(/^[a-z]\.\s*/, '');
                    const wrongTitles = sharedOptions
                        .filter((_, index) => index !== q.correct)
                        .map(title => title.replace(/^[a-z]\.\s*/, ''));
                    const shuffledWrongs = [...wrongTitles];
                    for (let i = shuffledWrongs.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledWrongs[i], shuffledWrongs[j]] = [shuffledWrongs[j], shuffledWrongs[i]];
                    }
                    const selectedWrongTitles = shuffledWrongs.slice(0, 2);
                    const firstWords = q.firstWords || extractFirstWords(q.text, SETTINGS.firstWordsLength);
                    
                    return {
                        type: "lesen_matching",
                        id: idx,
                        firstWords: firstWords,
                        shortCorrectTitle: cleanCorrectTitle,
                        shortWrongTitles: selectedWrongTitles,
                        correctTitle: cleanCorrectTitle
                    };
                });
            } else {
                originalQuestions = data.questions.map((q, idx) => {
                    const firstWords = q.firstWords || extractFirstWords(q.text, SETTINGS.firstWordsLength);
                    const wrongTitlesList = q.wrongTitles || [];
                    const selectedWrongTitles = wrongTitlesList.slice(0, 2);
                    
                    return {
                        type: "lesen_matching",
                        id: idx,
                        firstWords: firstWords,
                        shortCorrectTitle: q.correctTitle || "",
                        shortWrongTitles: selectedWrongTitles,
                        correctTitle: q.correctTitle || ""
                    };
                });
            }
            console.log(`📝 تم تحميل ${originalQuestions.length} سؤال لـ ${skill.toUpperCase()}`);
        }
        // ==================== نظام Sprachbausteine Teil 1 و 2 ====================
        else if (skill === 'sprach1' || skill === 'sprach2') {
            let allQuestions = data.questions;
            originalQuestions = allQuestions.map(q => {
                return {
                    type: "sprach",
                    id: q.id,
                    before: q.before || "",
                    after: q.after || "",
                    options: q.options,
                    correct: q.correct,
                    displayText: `${q.before} _____ (${q.id}) _____ ${q.after}`
                };
            });
            console.log(`📝 تم تحميل ${originalQuestions.length} سؤال لـ ${skill.toUpperCase()}`);
        }
        // ==================== نظام Hören القديم (للتوافق) ====================
        else if (data.questions) {
            let allQuestions = data.questions;
            originalQuestions = allQuestions.map(q => {
                if (q.correctAnswerIndex !== undefined) {
                    return {
                        type: "hoeren_old",
                        firstWords: q.firstWords || extractFirstWords(q.fullText, SETTINGS.firstWordsLength),
                        fullText: q.fullText,
                        options: q.options,
                        correctAnswerIndex: q.correctAnswerIndex
                    };
                } 
                else {
                    return {
                        type: "lesen_matching",
                        firstWords: q.firstWords || extractFirstWords(q.text, SETTINGS.firstWordsLength),
                        shortCorrectTitle: q.correctTitle || "",
                        shortWrongTitles: q.wrongTitles || [],
                        correctTitle: q.correctTitle || ""
                    };
                }
            });
        }
        
        questionStats = {};
        originalQuestions.forEach((_, idx) => {
            questionStats[idx] = { timesWrong: 0, wasSlow: false, lastWrongAt: -999 };
        });
        return true;
    }
    
    function startGame(skill, examId) {
        if (gameStarted) return;
        currentSkill = skill;
        currentExamId = examId;
        setSpeedMode('reflex');
        showModeSelectionScreen();
    }
    
    function pauseGame() {
        if (!gameActive || gamePaused) return;
        gamePaused = true;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const pauseBtn = document.getElementById('gamePauseBtn');
        if (pauseBtn) pauseBtn.textContent = '▶ Resume';
    }
    
    function resumeGame() {
        if (!gamePaused) return;
        gamePaused = false;
        gameActive = true;
        
        const pauseBtn = document.getElementById('gamePauseBtn');
        if (pauseBtn) pauseBtn.textContent = '⏸ Pause';
        
        const msg = document.querySelector('.mode-change-message');
        if (msg) msg.remove();
        
        currentStartTime = Date.now() - (SETTINGS.timePerQuestion - remainingTime) * 1000;
        startTimer();
    }
    
    function exitGame() {
        gameActive = false;
        gamePaused = false;
        gameStarted = false;
        if (timerInterval) clearInterval(timerInterval);
        if (transitionTimeout) clearTimeout(transitionTimeout);
        if (gameOverlay) gameOverlay.remove();
    }
    
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        
        const timerCircle = document.querySelector('.circular-timer-fill');
        if (!timerCircle) return;
        
        const radius = 18;
        const circumference = 2 * Math.PI * radius;
        timerCircle.setAttribute("stroke-dasharray", circumference);
        
        timerInterval = setInterval(() => {
            if (!gameActive || gamePaused) return;
            
            const elapsed = (Date.now() - currentStartTime) / 1000;
            remainingTime = Math.max(0, SETTINGS.timePerQuestion - elapsed);
            const percent = (remainingTime / SETTINGS.timePerQuestion) * 100;
            
            const offset = circumference * (1 - percent / 100);
            timerCircle.setAttribute("stroke-dashoffset", offset);
            
            if (percent <= 30) timerCircle.setAttribute("stroke", "#7cb3f0");
            if (percent <= 15) timerCircle.setAttribute("stroke", "#a8c8f5");
            if (percent > 30) timerCircle.setAttribute("stroke", "#4a90e2");
            
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                if (gameActive && !gamePaused) {
                    gameActive = false;
                    const q = currentRound[currentIndex];
                    questionStats[q.originalIndex].timesWrong++;
                    questionStats[q.originalIndex].wasSlow = true;
                    questionStats[q.originalIndex].lastWrongAt = currentIndex;
                    userAnswers.push({ isCorrect: false, originalIndex: q.originalIndex });
                    combo = 0;
                    
                    const btns = document.querySelectorAll('.game-option-btn');
                    btns.forEach(btn => {
                        if (btn.getAttribute('data-correct') === 'true') {
                            btn.style.background = '#e6f4ea';
                            btn.style.borderColor = '#8bc34a';
                            btn.style.color = '#2e7d32';
                        }
                    });
                    
                    transitionTimeout = setTimeout(() => {
                        currentIndex++;
                        showQuestion();
                    }, SETTINGS.transitionDelay);
                }
            }
        }, 20);
    }
    
    function showCountdown() {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;justify-content:center;align-items:center';
        const countdown = document.createElement('div');
        countdown.style.cssText = 'font-size:100px;font-weight:bold;color:white;text-shadow:0 0 20px rgba(0,0,0,0.5);transition:all 0.1s';
        countdown.textContent = '3';
        overlay.appendChild(countdown);
        document.body.appendChild(overlay);
        let count = 3;
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdown.textContent = count;
                countdown.style.transform = 'scale(1.1)';
                setTimeout(() => { countdown.style.transform = 'scale(1)'; }, 100);
            } else if (count === 0) {
                countdown.textContent = 'GO!';
                countdown.style.fontSize = '70px';
            } else {
                clearInterval(interval);
                overlay.remove();
                showQuestion();
            }
        }, 1000);
    }
    
    function showQuestion() {
        if (currentIndex >= currentRound.length) {
            showResults();
            return;
        }
        
        const q = currentRound[currentIndex];
        remainingTime = SETTINGS.timePerQuestion;
        
        if (gameOverlay) gameOverlay.remove();
        gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.className = 'game-container-inner';
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:700px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);position:relative';
        
        const timerContainer = document.createElement('div');
        timerContainer.className = 'circular-timer-container';
        timerContainer.style.cssText = 'position:absolute;top:8px;left:8px;width:40px;height:40px';
        const timerSvg = createCircularTimer(100);
        timerContainer.appendChild(timerSvg.svg);
        container.appendChild(timerContainer);
        
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'font-size:20px;font-weight:500;padding:20px 30px;background:#f5f7fc;border-radius:20px;margin-bottom:25px;color:#1a1a2e;line-height:1.5';
        
        // عرض النص حسب نوع السؤال
        if (q.type === "sprach") {
            questionDiv.textContent = q.displayText;
        } else if (q.type === "reflex_mode") {
            questionDiv.textContent = "اختر الإجابة الصحيحة";
        } else if (q.type === "hoeren_old") {
            questionDiv.textContent = "اختر الإجابة الصحيحة";
        } else {
            // Lesen Matching: عرض أول 7-9 كلمات
            questionDiv.textContent = q.firstWords;
        }
        container.appendChild(questionDiv);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'game-options-div';
        optionsDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:20px';
        
        // ==================== Reflex Modus (Hören و Lesen 2) ====================
        if (q.type === "reflex_mode") {
            const correctSentences = reflexSentences.filter(s => s.correct === true);
            const incorrectSentences = reflexSentences.filter(s => s.correct === false);
            
            const selectedCorrect = correctSentences.length > 0 
                ? correctSentences[Math.floor(Math.random() * correctSentences.length)]
                : null;
            
            let selectedIncorrects = [];
            if (incorrectSentences.length >= 2) {
                const shuffledIncorrects = [...incorrectSentences];
                for (let i = shuffledIncorrects.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledIncorrects[i], shuffledIncorrects[j]] = [shuffledIncorrects[j], shuffledIncorrects[i]];
                }
                selectedIncorrects = shuffledIncorrects.slice(0, 2);
            } else {
                selectedIncorrects = [...incorrectSentences];
                while(selectedIncorrects.length < 2) {
                    selectedIncorrects.push({ text: "خيار إضافي", correct: false, id: -1 });
                }
            }
            
            const allOptions = [
                { text: selectedCorrect.text, isCorrect: true },
                { text: selectedIncorrects[0].text, isCorrect: false },
                { text: selectedIncorrects[1].text, isCorrect: false }
            ];
            
            for (let i = allOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
            }
            
            q.currentOptions = allOptions;
            
            allOptions.forEach((opt, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'game-option-btn';
                optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt.text}`;
                optBtn.setAttribute('data-correct', opt.isCorrect);
                optBtn.setAttribute('data-value', opt.text);
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onclick = () => checkAnswer(opt.isCorrect, opt.text, null, q);
                optionsDiv.appendChild(optBtn);
            });
        }
        // ==================== Sprachbausteine ====================
        else if (q.type === "sprach") {
            q.options.forEach((opt, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'game-option-btn';
                optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt}`;
                optBtn.setAttribute('data-correct', opt === q.correct);
                optBtn.setAttribute('data-value', opt);
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onclick = () => checkAnswer(opt === q.correct, opt, null, q);
                optionsDiv.appendChild(optBtn);
            });
        } 
        // ==================== Hören القديم ====================
        else if (q.type === "hoeren_old") {
            q.options.forEach((opt, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'game-option-btn';
                optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt}`;
                optBtn.setAttribute('data-correct', idx === q.correctAnswerIndex);
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onclick = () => checkAnswer(idx === q.correctAnswerIndex, null, idx, q);
                optionsDiv.appendChild(optBtn);
            });
        } 
        // ==================== Lesen Matching (Teil 1 و 3) ====================
        else {
            const options = [
                { text: q.shortCorrectTitle, isCorrect: true }
            ];
            
            if (q.shortWrongTitles && q.shortWrongTitles.length >= 2) {
                options.push({ text: q.shortWrongTitles[0], isCorrect: false });
                options.push({ text: q.shortWrongTitles[1], isCorrect: false });
            } else {
                options.push({ text: "عنوان تجريبي 1", isCorrect: false });
                options.push({ text: "عنوان تجريبي 2", isCorrect: false });
            }
            
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            
            options.forEach((opt, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'game-option-btn';
                optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt.text}`;
                optBtn.setAttribute('data-correct', opt.isCorrect);
                optBtn.setAttribute('data-value', opt.text);
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onclick = () => checkAnswer(opt.isCorrect, opt.text, null, q);
                optionsDiv.appendChild(optBtn);
            });
        }
        
        container.appendChild(optionsDiv);
        
        // أزرار التحكم
        const bottomBar = document.createElement('div');
        bottomBar.className = 'bottom-bar';
        bottomBar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-top:10px;flex-wrap:wrap;gap:10px';
        
        const progressDiv = document.createElement('div');
        progressDiv.className = 'game-progress';
        progressDiv.style.cssText = 'font-size:13px;color:#999';
        progressDiv.textContent = `${currentIndex + 1} / ${currentRound.length}`;
        bottomBar.appendChild(progressDiv);
        
        const speedSelector = createSpeedModeSelector();
        bottomBar.appendChild(speedSelector);
        
        const controlBtns = document.createElement('div');
        controlBtns.className = 'control-btns';
        controlBtns.style.cssText = 'display:flex;gap:12px';
        
        const pauseBtn = document.createElement('button');
        pauseBtn.id = 'gamePauseBtn';
        pauseBtn.textContent = gameStarted ? '⏸ Pause' : '▶ Start';
        pauseBtn.style.cssText = 'background:#e8e8e8;color:#333;border:none;border-radius:30px;padding:6px 16px;font-size:12px;cursor:pointer;transition:all 0.15s';
        pauseBtn.onclick = () => {
            if (gameStarted) {
                if (gamePaused) resumeGame();
                else pauseGame();
            } else {
                startGameAfterModeSelection();
            }
        };
        controlBtns.appendChild(pauseBtn);
        
        const exitBtn = document.createElement('button');
        exitBtn.textContent = '✖ Exit';
        exitBtn.style.cssText = 'background:#e8e8e8;color:#333;border:none;border-radius:30px;padding:6px 16px;font-size:12px;cursor:pointer;transition:all 0.15s';
        exitBtn.onclick = () => exitGame();
        controlBtns.appendChild(exitBtn);
        
        bottomBar.appendChild(controlBtns);
        container.appendChild(bottomBar);
        
        gameOverlay.appendChild(container);
        document.body.appendChild(gameOverlay);
        
        if (gameStarted) {
            gameActive = true;
            gamePaused = false;
            currentStartTime = Date.now();
            currentOptionsDiv = optionsDiv;
            
            const timerCircleSvg = timerContainer.querySelector('circle:last-of-type');
            if (timerCircleSvg) {
                timerCircleSvg.classList.add('circular-timer-fill');
            }
            
            startTimer();
        } else {
            gameActive = false;
            gamePaused = true;
        }
    }
    
    // دالة تطبيق الألوان والإجابة
    function checkAnswer(isCorrect, selectedValue, selectedIndex, q) {
        if (!gameActive || gamePaused) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const question = currentRound[currentIndex];
        const elapsed = (Date.now() - currentStartTime) / 1000;
        const isFast = elapsed < 1.5;
        
        if (isCorrect) {
            if (!isFast) questionStats[question.originalIndex].wasSlow = true;
            combo++;
            if (combo > bestCombo) bestCombo = combo;
        } else {
            questionStats[question.originalIndex].timesWrong++;
            questionStats[question.originalIndex].wasSlow = true;
            questionStats[question.originalIndex].lastWrongAt = currentIndex;
            combo = 0;
        }
        
        // تطبيق الألوان
        const btns = currentOptionsDiv.querySelectorAll('.game-option-btn');
        btns.forEach((btn, idx) => {
            let isCorrectBtn = false;
            
            if (q.type === "sprach") {
                isCorrectBtn = btn.getAttribute('data-correct') === 'true';
            } else if (q.type === "hoeren_old") {
                isCorrectBtn = idx === q.correctAnswerIndex;
            } else if (q.type === "reflex_mode" && q.currentOptions) {
                isCorrectBtn = q.currentOptions[idx]?.isCorrect === true;
            } else {
                isCorrectBtn = btn.getAttribute('data-correct') === 'true';
            }
            
            // الإجابة الصحيحة دائماً باللون الأخضر الفاتح
            if (isCorrectBtn) {
                btn.style.background = '#e6f4ea';
                btn.style.borderColor = '#8bc34a';
                btn.style.color = '#2e7d32';
            }
            
            // إذا كانت الإجابة خاطئة، نلون اختيار المستخدم بالبرتقالي الفاتح
            if (!isCorrect) {
                if ((q.type === "sprach" || q.type === "reflex_mode" || q.type === "lesen_matching") && btn.getAttribute('data-value') === selectedValue) {
                    btn.style.background = '#fef5e7';
                    btn.style.borderColor = '#f5b042';
                    btn.style.color = '#b45f06';
                } else if (q.type === "hoeren_old" && idx === selectedIndex) {
                    btn.style.background = '#fef5e7';
                    btn.style.borderColor = '#f5b042';
                    btn.style.color = '#b45f06';
                }
            } else {
                // إذا كانت الإجابة صحيحة، نلون اختيار المستخدم باللون الأخضر
                if ((q.type === "sprach" || q.type === "reflex_mode" || q.type === "lesen_matching") && btn.getAttribute('data-value') === selectedValue) {
                    btn.style.background = '#e6f4ea';
                    btn.style.borderColor = '#8bc34a';
                    btn.style.color = '#2e7d32';
                } else if (q.type === "hoeren_old" && idx === selectedIndex) {
                    btn.style.background = '#e6f4ea';
                    btn.style.borderColor = '#8bc34a';
                    btn.style.color = '#2e7d32';
                }
            }
        });
        
        userAnswers.push({ isCorrect: isCorrect, originalIndex: question.originalIndex });
        
        if (transitionTimeout) clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(() => {
            currentIndex++;
            showQuestion();
        }, SETTINGS.transitionDelay);
    }
    
    function showResults() {
        if (gameOverlay) gameOverlay.remove();
        gameActive = false;
        gameStarted = false;
        
        const correct = userAnswers.filter(a => a.isCorrect).length;
        const total = userAnswers.length;
        const accuracy = total > 0 ? ((correct / total) * 100).toFixed(0) : 0;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:16px;padding:16px 20px;width:90%;max-width:320px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.05)';
        
        let gradeIcon = '';
        let gradeColor = '';
        if (accuracy >= 80) { gradeIcon = '🧠'; gradeColor = '#2e7d32'; }
        else if (accuracy >= 60) { gradeIcon = '👍'; gradeColor = '#b45f06'; }
        else { gradeIcon = '💪'; gradeColor = '#b45f06'; }
        
        container.innerHTML = `
            <div style="font-size:24px;margin-bottom:4px">${gradeIcon}</div>
            <div style="font-size:28px;font-weight:600;color:#2c3e66;margin:4px 0">${correct}/${total}</div>
            <div style="font-size:13px;color:${gradeColor};margin-bottom:12px">${accuracy}%</div>
            <div style="display:flex;justify-content:center;gap:24px;margin-bottom:16px">
                <div><div style="font-size:20px;font-weight:600;color:#f5b042">${bestCombo}</div><div style="font-size:10px;color:#999">combo</div></div>
            </div>
            <div style="display:flex;gap:10px;justify-content:center">
                <button id="restartGameBtn" style="background:#2c3e66;color:white;border:none;border-radius:24px;padding:8px 16px;font-size:12px;cursor:pointer">↺ تحدٍّ جديد</button>
                <button id="closeGameBtn" style="background:#f0f0f0;color:#666;border:none;border-radius:24px;padding:8px 16px;font-size:12px;cursor:pointer">✖ إغلاق</button>
            </div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        document.getElementById('restartGameBtn').onclick = () => {
            overlay.remove();
            startGame(currentSkill, currentExamId);
        };
        document.getElementById('closeGameBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    }
    
    function addGameButton() {
        const nav = document.getElementById('examNavButtons');
        if (!nav) { setTimeout(addGameButton, 500); return; }
        if (document.getElementById('rapidGameBtn')) return;
        
        const btn = document.createElement('button');
        btn.id = 'rapidGameBtn';
        btn.innerHTML = '⚡ التحدي السريع';
        btn.style.cssText = 'background:#2c3e66;color:white;border:none;border-radius:30px;padding:8px 20px;font-size:14px;font-weight:500;cursor:pointer;margin-left:10px';
        btn.onclick = () => {
            const currentSkill = typeof getCurrentSkill === 'function' ? getCurrentSkill() : 'lesen1';
            const currentExamId = typeof getCurrentExamId === 'function' ? getCurrentExamId() : 1;
            startGame(currentSkill, currentExamId);
        };
        nav.appendChild(btn);
        console.log('🎮 زر التحدي السريع جاهز');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { setTimeout(addGameButton, 500); });
    } else {
        setTimeout(addGameButton, 500);
    }
})();
