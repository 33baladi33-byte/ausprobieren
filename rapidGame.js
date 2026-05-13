// ============================================
// rapidGame.js - لعبة التحدي السريع (النسخة الكاملة)
// يدعم: Lesen Teil 1, Lesen Teil 3, Hören Teil 1/3, Sprachbausteine Teil 1/2
// مع نظام ألوان متطور: أخضر للإجابة الصحيحة، برتقالي للاختيار الخاطئ
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
    
    function shortenText(text, maxWords) {
        if (!text) return "";
        const words = text.split(' ');
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(' ') + '...';
    }
    
    // عرض شاشة اختيار الوضع
    function showModeSelectionScreen() {
        if (gameOverlay) gameOverlay.remove();
        
        gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:450px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);position:relative';
        
        container.innerHTML = `
            <div style="font-size:18px;font-weight:600;color:#2c3e66;margin-bottom:20px">🎮 اختر الوضع المناسب لك</div>
            <div style="display:flex;justify-content:center;gap:15px;margin-bottom:20px">
                <button id="modeSelectReflex" style="padding:10px 20px;border-radius:30px;font-size:14px;font-weight:500;cursor:pointer;border:1px solid #4a90e2;background:#d4e8ff;color:#2c3e66">⚡⚡⚡ Reflex</button>
                <button id="modeSelectFocus" style="padding:10px 20px;border-radius:30px;font-size:14px;font-weight:500;cursor:pointer;border:1px solid #ccc;background:#e8e8e8;color:#333">⚡ Focus</button>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;margin-top:15px">
                <button id="startAfterModeBtn" style="background:#2c3e66;color:white;border:none;border-radius:40px;padding:12px 28px;font-size:14px;font-weight:500;cursor:pointer">▶ ابدأ التحدي</button>
                <button id="cancelModeBtn" style="background:#f0f0f0;color:#888;border:none;border-radius:40px;padding:12px 20px;font-size:13px;cursor:pointer">ليس الان</button>
            </div>
        `;
        
        gameOverlay.appendChild(container);
        document.body.appendChild(gameOverlay);
        
        document.getElementById('modeSelectReflex').onclick = () => setSpeedMode('reflex');
        document.getElementById('modeSelectFocus').onclick = () => setSpeedMode('focus');
        document.getElementById('startAfterModeBtn').onclick = () => {
            gameOverlay.remove();
            startGameAfterModeSelection();
        };
        document.getElementById('cancelModeBtn').onclick = () => {
            gameOverlay.remove();
            gameStarted = false;
        };
    }
    
    function setSpeedMode(mode) {
        if (!SPEED_MODES[mode]) return;
        currentSpeedMode = mode;
        SETTINGS.timePerQuestion = SPEED_MODES[mode].timePerQuestion;
        
        const reflexBtn = document.getElementById('modeSelectReflex');
        const focusBtn = document.getElementById('modeSelectFocus');
        if (reflexBtn && focusBtn) {
            if (mode === 'reflex') {
                reflexBtn.style.background = '#d4e8ff';
                reflexBtn.style.border = '1px solid #4a90e2';
                reflexBtn.style.color = '#2c3e66';
                focusBtn.style.background = '#e8e8e8';
                focusBtn.style.border = '1px solid #ccc';
                focusBtn.style.color = '#333';
            } else {
                focusBtn.style.background = '#d4e8ff';
                focusBtn.style.border = '1px solid #4a90e2';
                focusBtn.style.color = '#2c3e66';
                reflexBtn.style.background = '#e8e8e8';
                reflexBtn.style.border = '1px solid #ccc';
                reflexBtn.style.color = '#333';
            }
        }
    }
    
    function createSpeedModeSelector() {
        const container = document.createElement('div');
        container.style.cssText = 'display:flex;justify-content:center;gap:8px;margin:15px 0 10px 0';
        
        const reflexBtn = document.createElement('button');
        reflexBtn.id = 'modeReflexBtn';
        reflexBtn.textContent = '⚡⚡⚡ Reflex';
        reflexBtn.style.cssText = 'padding:5px 14px;border-radius:25px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid #3a3a3a;background:#2a2a2a;color:#888';
        reflexBtn.onclick = () => setSpeedMode('reflex');
        
        const focusBtn = document.createElement('button');
        focusBtn.id = 'modeFocusBtn';
        focusBtn.textContent = '⚡ Focus';
        focusBtn.style.cssText = 'padding:5px 14px;border-radius:25px;font-size:12px;font-weight:500;cursor:pointer;border:1px solid #3a3a3a;background:#2a2a2a;color:#888';
        focusBtn.onclick = () => setSpeedMode('focus');
        
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
    
    function startGameAfterModeSelection() {
        if (gameStarted) return;
        gameStarted = true;
        
        loadGameData(currentSkill, currentExamId).then(loaded => {
            if (!loaded || originalQuestions.length === 0) {
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
    
    function loadGameData(skill, examId) {
        currentSkill = skill;
        currentExamId = examId;
        return fetch(`data/games/${skill}_exam${examId}.json`)
            .then(response => {
                if (!response.ok) throw new Error('الملف غير موجود');
                return response.json();
            })
            .then(data => {
                currentGameData = data;
                let allQuestions = data.questions || [];
                
                originalQuestions = allQuestions.map((q, idx) => {
                    // تحديد نوع السؤال
                    let type = "lesen"; // افتراضي
                    if (q.correctAnswerIndex !== undefined) type = "hoeren";
                    if (q.options && q.before !== undefined) type = "sprach";
                    if (skill === 'lesen3' || skill === 'lesen1') type = "lesen";
                    if (skill.startsWith('hoeren')) type = "hoeren";
                    if (skill.startsWith('sprach')) type = "sprach";
                    
                    if (type === "sprach") {
                        return {
                            type: "sprach",
                            id: q.id || idx,
                            before: q.before || "",
                            after: q.after || "",
                            options: q.options,
                            correct: q.correct,
                            displayText: `${q.before || ''} _____ ${q.after || ''}`
                        };
                    } else if (type === "hoeren") {
                        return {
                            type: "hoeren",
                            firstWords: q.firstWords || shortenText(q.fullText, SETTINGS.firstWordsLength),
                            fullText: q.fullText,
                            options: q.options,
                            correctAnswerIndex: q.correctAnswerIndex
                        };
                    } else {
                        return {
                            type: "lesen",
                            firstWords: shortenText(q.firstWords || q.fullText, SETTINGS.firstWordsLength),
                            fullText: q.fullText,
                            shortCorrectTitle: q.shortCorrectTitle || (q.correctTitle ? shortenText(q.correctTitle, SETTINGS.titleLength) : null),
                            shortWrongTitles: q.shortWrongTitles || (q.wrongTitles ? q.wrongTitles.map(t => shortenText(t, SETTINGS.titleLength)) : []),
                            correctTitle: q.correctTitle
                        };
                    }
                });
                
                questionStats = {};
                originalQuestions.forEach((_, idx) => {
                    questionStats[idx] = { timesWrong: 0, wasSlow: false, lastWrongAt: -999 };
                });
                return true;
            })
            .catch(() => false);
    }
    
    function generateSmartRound(questions, stats) {
        const round = [];
        const usageCount = {};
        questions.forEach((_, idx) => { usageCount[idx] = 0; });
        
        for (let i = 0; i < SETTINGS.roundLength && round.length < SETTINGS.roundLength; i++) {
            let availableQuestions = [];
            questions.forEach((_, idx) => {
                if (usageCount[idx] < 3) availableQuestions.push(idx);
            });
            if (availableQuestions.length === 0) {
                for (let idx in usageCount) usageCount[idx] = 0;
                availableQuestions = questions.map((_, idx) => idx);
            }
            const selectedIdx = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
            round.push({ ...questions[selectedIdx], originalIndex: selectedIdx });
            usageCount[selectedIdx]++;
        }
        
        // خلط الأسئلة
        for (let i = round.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [round[i], round[j]] = [round[j], round[i]];
        }
        return round;
    }
    
    function showNotAvailableMessage() {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;justify-content:center;align-items:center';
        overlay.innerHTML = `
            <div style="background:white;border-radius:24px;padding:40px;max-width:400px;text-align:center">
                <div style="font-size:48px;margin-bottom:16px">🎮</div>
                <h3 style="color:#2c3e66;margin-bottom:12px">هذا الوضع سيتوفر قريباً</h3>
                <button id="closeNotAvailableBtn" style="background:#e0e0e0;border:none;padding:10px 24px;border-radius:40px;cursor:pointer">إغلاق</button>
            </div>
        `;
        document.body.appendChild(overlay);
        document.getElementById('closeNotAvailableBtn').onclick = () => overlay.remove();
    }
    
    function showCountdown() {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;justify-content:center;align-items:center';
        const countdown = document.createElement('div');
        countdown.style.cssText = 'font-size:100px;font-weight:bold;color:white';
        countdown.textContent = '3';
        overlay.appendChild(countdown);
        document.body.appendChild(overlay);
        
        let count = 3;
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdown.textContent = count;
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
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:700px;text-align:center;position:relative';
        
        // المؤقت
        const timerContainer = document.createElement('div');
        timerContainer.style.cssText = 'position:absolute;top:8px;left:8px;width:40px;height:40px';
        const timerSvg = createCircularTimer(100);
        timerContainer.appendChild(timerSvg.svg);
        container.appendChild(timerContainer);
        
        // السؤال
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'font-size:20px;font-weight:500;padding:20px 30px;background:#f5f7fc;border-radius:20px;margin-bottom:25px;color:#1a1a2e;line-height:1.5';
        
        if (q.type === "sprach") {
            questionDiv.textContent = q.displayText || `${q.before} _____ ${q.after}`;
        } else if (q.type === "hoeren") {
            questionDiv.textContent = `❝ ${q.firstWords} ❞`;
        } else {
            questionDiv.textContent = `❝ ${q.firstWords} ❞`;
        }
        container.appendChild(questionDiv);
        
        // الخيارات
        const optionsDiv = document.createElement('div');
        optionsDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:20px';
        
        if (q.type === "sprach") {
            q.options.forEach((opt, idx) => {
                const btn = createOptionButton(String.fromCharCode(65+idx), opt, opt === q.correct);
                btn.onclick = () => checkAnswer(true, opt === q.correct, opt, idx, q);
                optionsDiv.appendChild(btn);
            });
        } else if (q.type === "hoeren") {
            q.options.forEach((opt, idx) => {
                const btn = createOptionButton(String.fromCharCode(65+idx), opt, idx === q.correctAnswerIndex);
                btn.onclick = () => checkAnswer(true, idx === q.correctAnswerIndex, opt, idx, q);
                optionsDiv.appendChild(btn);
            });
        } else {
            const options = [{ text: q.shortCorrectTitle, isCorrect: true }];
            if (q.shortWrongTitles && q.shortWrongTitles.length) {
                options.push({ text: q.shortWrongTitles[0], isCorrect: false });
                if (q.shortWrongTitles[1]) options.push({ text: q.shortWrongTitles[1], isCorrect: false });
            }
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            options.forEach((opt, idx) => {
                const btn = createOptionButton(String.fromCharCode(65+idx), opt.text, opt.isCorrect);
                btn.onclick = () => checkAnswer(false, opt.isCorrect, opt.text, idx, q);
                optionsDiv.appendChild(btn);
            });
        }
        
        container.appendChild(optionsDiv);
        
        // كومبو
        if (combo >= 3) {
            const comboDiv = document.createElement('div');
            comboDiv.style.cssText = 'font-size:18px;font-weight:500;margin-bottom:15px;color:#2c3e66';
            comboDiv.textContent = `${combo >= 10 ? '⚡' : (combo >= 6 ? '🔥' : '✓')} COMBO x${combo}`;
            container.appendChild(comboDiv);
        }
        
        // شريط التحكم السفلي
        const bottomBar = document.createElement('div');
        bottomBar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-top:10px;flex-wrap:wrap;gap:10px';
        
        const progressDiv = document.createElement('div');
        progressDiv.style.cssText = 'font-size:13px;color:#999';
        progressDiv.textContent = `${currentIndex + 1} / ${currentRound.length}`;
        bottomBar.appendChild(progressDiv);
        
        bottomBar.appendChild(createSpeedModeSelector());
        
        const controlBtns = document.createElement('div');
        controlBtns.style.cssText = 'display:flex;gap:12px';
        
        const pauseBtn = document.createElement('button');
        pauseBtn.textContent = '⏸ Pause';
        pauseBtn.style.cssText = 'background:#e8e8e8;color:#333;border:none;border-radius:30px;padding:6px 16px;font-size:12px;cursor:pointer';
        pauseBtn.onclick = () => { if (gameActive) pauseGame(); };
        
        const exitBtn = document.createElement('button');
        exitBtn.textContent = '✖ Exit';
        exitBtn.style.cssText = 'background:#e8e8e8;color:#333;border:none;border-radius:30px;padding:6px 16px;font-size:12px;cursor:pointer';
        exitBtn.onclick = () => exitGame();
        
        controlBtns.appendChild(pauseBtn);
        controlBtns.appendChild(exitBtn);
        bottomBar.appendChild(controlBtns);
        
        container.appendChild(bottomBar);
        gameOverlay.appendChild(container);
        document.body.appendChild(gameOverlay);
        
        currentOptionsDiv = optionsDiv;
        gameActive = true;
        gamePaused = false;
        currentStartTime = Date.now();
        
        const timerCircle = timerContainer.querySelector('circle:last-of-type');
        if (timerCircle) timerCircle.classList.add('circular-timer-fill');
        
        startTimer();
    }
    
    function createOptionButton(letter, text, isCorrect) {
        const btn = document.createElement('button');
        btn.textContent = `${letter}. ${text}`;
        btn.setAttribute('data-correct', isCorrect);
        btn.setAttribute('data-value', text);
        btn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%';
        btn.onmouseenter = () => { btn.style.background = '#f0f2f5'; btn.style.transform = 'translateY(-0.5px)'; };
        btn.onmouseleave = () => { btn.style.background = '#ffffff'; btn.style.transform = 'translateY(0)'; };
        return btn;
    }
    
    function checkAnswer(isLesen, isCorrect, selectedValue, selectedIndex, q) {
        if (!gameActive || gamePaused) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const elapsed = (Date.now() - currentStartTime) / 1000;
        const isFast = elapsed < 1.5;
        
        if (isCorrect) {
            if (!isFast) questionStats[q.originalIndex].wasSlow = true;
            combo++;
            if (combo > bestCombo) bestCombo = combo;
        } else {
            questionStats[q.originalIndex].timesWrong++;
            questionStats[q.originalIndex].wasSlow = true;
            questionStats[q.originalIndex].lastWrongAt = currentIndex;
            combo = 0;
        }
        
        // تطبيق الألوان
        const btns = currentOptionsDiv.querySelectorAll('.game-option-btn');
        btns.forEach((btn, idx) => {
            let isCorrectBtn = btn.getAttribute('data-correct') === 'true';
            
            // الإجابة الصحيحة دائماً باللون الأخضر
            if (isCorrectBtn) {
                btn.style.background = '#e6f4ea';
                btn.style.borderColor = '#8bc34a';
                btn.style.color = '#2e7d32';
            }
            
            // اختيار المستخدم
            if (isCorrect) {
                if (btn.getAttribute('data-value') === selectedValue) {
                    btn.style.background = '#e6f4ea';
                    btn.style.borderColor = '#8bc34a';
                    btn.style.color = '#2e7d32';
                }
            } else {
                if (btn.getAttribute('data-value') === selectedValue) {
                    btn.style.background = '#fef5e7';
                    btn.style.borderColor = '#f5b042';
                    btn.style.color = '#b45f06';
                }
            }
        });
        
        userAnswers.push({ isCorrect: isCorrect, originalIndex: q.originalIndex });
        
        transitionTimeout = setTimeout(() => {
            currentIndex++;
            showQuestion();
        }, SETTINGS.transitionDelay);
    }
    
    function pauseGame() {
        if (!gameActive || gamePaused) return;
        gamePaused = true;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
    }
    
    function exitGame() {
        gameActive = false;
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
                if (gameActive && !gamePaused) {
                    gameActive = false;
                    const q = currentRound[currentIndex];
                    questionStats[q.originalIndex].timesWrong++;
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
    
    function showResults() {
        if (gameOverlay) gameOverlay.remove();
        gameActive = false;
        gameStarted = false;
        
        const correct = userAnswers.filter(a => a.isCorrect).length;
        const total = userAnswers.length;
        const accuracy = total > 0 ? ((correct / total) * 100).toFixed(0) : 0;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(2px)';
        
        let gradeIcon = accuracy >= 80 ? '🧠' : (accuracy >= 60 ? '👍' : '💪');
        let gradeColor = accuracy >= 80 ? '#2e7d32' : (accuracy >= 60 ? '#b45f06' : '#b45f06');
        
        overlay.innerHTML = `
            <div style="background:white;border-radius:16px;padding:16px 20px;width:90%;max-width:320px;text-align:center">
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
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.getElementById('restartGameBtn').onclick = () => { overlay.remove(); startGame(currentSkill, currentExamId); };
        document.getElementById('closeGameBtn').onclick = () => overlay.remove();
    }
    
    function startGame(skill, examId) {
        if (gameStarted) return;
        currentSkill = skill;
        currentExamId = examId;
        setSpeedMode('reflex');
        showModeSelectionScreen();
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
        document.addEventListener('DOMContentLoaded', () => setTimeout(addGameButton, 500));
    } else {
        setTimeout(addGameButton, 500);
    }
})();
