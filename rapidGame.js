// ============================================
// rapidGame.js - لعبة التحدي السريع
// يدعم: Lesen Teil 1, Lesen Teil 3, Hören Teil 1/2/3, Sprachbausteine Teil 1/2
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
        let shortened = words.slice(0, maxWords).join(' ');
        shortened += '...';
        return shortened;
    }
    
    // عرض شاشة اختيار الوضع
    function showModeSelectionScreen() {
        if (gameOverlay) gameOverlay.remove();
        
        gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:450px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);position:relative';
        
        // العنوان
        const title = document.createElement('div');
        title.textContent = '🎮 اختر الوضع المناسب لك';
        title.style.cssText = 'font-size:18px;font-weight:600;color:#2c3e66;margin-bottom:20px';
        container.appendChild(title);
        
        // أزرار الأوضاع
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
        
        // أزرار التحكم في الأسفل
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = 'display:flex;justify-content:center;gap:12px;margin-top:15px';
        
        // زر البدء
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
        
        // زر ليس الان
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
        
        // تحديث واجهة اختيار الوضع
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
    
    // بدء اللعبة بعد اختيار الوضع
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
    
    // إعادة تشغيل اللعبة بالكامل عند تغيير الوضع
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
    
    // تبديل وضع السرعة
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
    
    function updateCircularTimer(fillCircle, percent) {
        const radius = 18;
        const circumference = 2 * Math.PI * radius;
        fillCircle.setAttribute("stroke-dashoffset", circumference * (1 - percent / 100));
        
        if (percent <= 30) fillCircle.setAttribute("stroke", "#7cb3f0");
        if (percent <= 15) fillCircle.setAttribute("stroke", "#a8c8f5");
        if (percent > 30) fillCircle.setAttribute("stroke", "#4a90e2");
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
                let allQuestions = data.questions;
                
                if (skill === 'lesen3') {
                    allQuestions = allQuestions.filter(q => q.correctTitle !== null && q.correctTitle !== undefined);
                }
                
                originalQuestions = allQuestions.map(q => {
                    if (q.before !== undefined || q.options) {
                        return {
                            type: "sprach",
                            id: q.id,
                            before: q.before || "",
                            after: q.after || "",
                            options: q.options,
                            correct: q.correct,
                            displayText: `${q.before} _____ (${q.id}) _____ ${q.after}`
                        };
                    }
                    else if (q.correctAnswerIndex !== undefined) {
                        return {
                            type: "hoeren",
                            firstWords: q.firstWords || shortenText(q.fullText, SETTINGS.firstWordsLength),
                            fullText: q.fullText,
                            options: q.options,
                            correctAnswerIndex: q.correctAnswerIndex
                        };
                    } 
                    else {
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
        
        if (!timerCircle) {
            return;
        }
        
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
        
        // المؤقت الدائري
        const timerContainer = document.createElement('div');
        timerContainer.className = 'circular-timer-container';
        timerContainer.style.cssText = 'position:absolute;top:8px;left:8px;width:40px;height:40px';
        const timerSvg = createCircularTimer(100);
        timerContainer.appendChild(timerSvg.svg);
        container.appendChild(timerContainer);
        
        // السؤال
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'font-size:20px;font-weight:500;padding:20px 30px;background:#f5f7fc;border-radius:20px;margin-bottom:25px;color:#1a1a2e;line-height:1.5';
        
        if (q.type === "sprach") {
            questionDiv.textContent = q.displayText;
        } else if (q.type === "hoeren") {
            questionDiv.textContent = `من هي الإجابة الصحيحة؟`;
        } else {
            questionDiv.textContent = `❝ ${q.firstWords} ❞`;
        }
        container.appendChild(questionDiv);
        
        // الخيارات
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'game-options-div';
        optionsDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:20px';
        
        if (q.type === "sprach") {
            q.options.forEach((opt, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'game-option-btn';
                optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt}`;
                optBtn.setAttribute('data-correct', opt === q.correct);
                optBtn.setAttribute('data-value', opt);
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onmouseenter = () => { 
                    optBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
                    optBtn.style.transform = 'translateY(-0.5px)';
                };
                optBtn.onmouseleave = () => { 
                    optBtn.style.boxShadow = 'none';
                    optBtn.style.transform = 'translateY(0)';
                };
                optBtn.onclick = () => checkSprachAnswer(opt === q.correct, opt);
                optionsDiv.appendChild(optBtn);
            });
        } else if (q.type === "hoeren") {
            q.options.forEach((opt, idx) => {
                const optBtn = document.createElement('button');
                optBtn.className = 'game-option-btn';
                optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt}`;
                optBtn.setAttribute('data-correct', idx === q.correctAnswerIndex);
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onmouseenter = () => { 
                    optBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
                    optBtn.style.transform = 'translateY(-0.5px)';
                };
                optBtn.onmouseleave = () => { 
                    optBtn.style.boxShadow = 'none';
                    optBtn.style.transform = 'translateY(0)';
                };
                optBtn.onclick = () => checkHörenAnswer(idx === q.correctAnswerIndex, idx);
                optionsDiv.appendChild(optBtn);
            });
        } else {
            const options = [];
            
            if (q.correctTitle) {
                options.push({ text: q.shortCorrectTitle, isCorrect: true });
            } else {
                options.push({ text: "⚠️ هذه الفقرة لا يوجد لها عنوان", isCorrect: true });
            }
            
            const wrongs = [...q.shortWrongTitles];
            if (wrongs.length > 0) {
                for (let i = wrongs.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]];
                }
                options.push({ text: wrongs[0], isCorrect: false });
                if (wrongs[1]) options.push({ text: wrongs[1], isCorrect: false });
            } else if (q.correctTitle) {
                options.push({ text: "عنوان تجريبي", isCorrect: false });
                options.push({ text: "عنوان آخر", isCorrect: false });
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
                optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #e0e0e0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s ease;color:#333;width:100%;box-shadow:none';
                optBtn.onmouseenter = () => { 
                    optBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
                    optBtn.style.transform = 'translateY(-0.5px)';
                };
                optBtn.onmouseleave = () => { 
                    optBtn.style.boxShadow = 'none';
                    optBtn.style.transform = 'translateY(0)';
                };
                optBtn.onclick = () => checkLesenAnswer(opt.isCorrect, opt.text);
                optionsDiv.appendChild(optBtn);
            });
        }
        
        container.appendChild(optionsDiv);
        
        // أزرار التحكم + أزرار السرعة
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
    
    function applyAnswerColors(isCorrect, selectedValue, selectedIndex, q) {
        const btns = currentOptionsDiv.querySelectorAll('.game-option-btn');
        
        btns.forEach((btn, idx) => {
            let isCorrectBtn = false;
            
            if (q.type === "sprach") {
                isCorrectBtn = btn.getAttribute('data-correct') === 'true';
            } else if (q.type === "hoeren") {
                isCorrectBtn = idx === q.correctAnswerIndex;
            } else {
                isCorrectBtn = btn.getAttribute('data-correct') === 'true';
            }
            
            // الإجابة الصحيحة دائمًا باللون الأخضر
            if (isCorrectBtn) {
                btn.style.background = '#e6f4ea';
                btn.style.borderColor = '#8bc34a';
                btn.style.color = '#2e7d32';
            }
            
            // إذا كانت الإجابة خاطئة، نلون اختيار المستخدم بالبرتقالي
            if (!isCorrect) {
                if (q.type === "sprach" && btn.getAttribute('data-value') === selectedValue) {
                    btn.style.background = '#fef5e7';
                    btn.style.borderColor = '#f5b042';
                    btn.style.color = '#b45f06';
                } else if (q.type === "hoeren" && idx === selectedIndex) {
                    btn.style.background = '#fef5e7';
                    btn.style.borderColor = '#f5b042';
                    btn.style.color = '#b45f06';
                } else if (q.type === "lesen" && btn.textContent.includes(selectedValue)) {
                    btn.style.background = '#fef5e7';
                    btn.style.borderColor = '#f5b042';
                    btn.style.color = '#b45f06';
                }
            } else {
                // إذا كانت الإجابة صحيحة، نلون اختيار المستخدم باللون الأخضر
                if (q.type === "sprach" && btn.getAttribute('data-value') === selectedValue) {
                    btn.style.background = '#e6f4ea';
                    btn.style.borderColor = '#8bc34a';
                    btn.style.color = '#2e7d32';
                } else if (q.type === "hoeren" && idx === selectedIndex) {
                    btn.style.background = '#e6f4ea';
                    btn.style.borderColor = '#8bc34a';
                    btn.style.color = '#2e7d32';
                } else if (q.type === "lesen" && btn.textContent.includes(selectedValue)) {
                    btn.style.background = '#e6f4ea';
                    btn.style.borderColor = '#8bc34a';
                    btn.style.color = '#2e7d32';
                }
            }
        });
    }
    
    function checkSprachAnswer(isCorrect, selectedValue) {
        if (!gameActive || gamePaused) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const q = currentRound[currentIndex];
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
        
        applyAnswerColors(isCorrect, selectedValue, null, { type: "sprach", correctAnswerIndex: null });
        
        userAnswers.push({ isCorrect: isCorrect, originalIndex: q.originalIndex });
        
        if (transitionTimeout) clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(() => {
            currentIndex++;
            showQuestion();
        }, SETTINGS.transitionDelay);
    }
    
    function checkHörenAnswer(isCorrect, selectedIndex) {
        if (!gameActive || gamePaused) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const q = currentRound[currentIndex];
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
        
        applyAnswerColors(isCorrect, null, selectedIndex, { type: "hoeren", correctAnswerIndex: q.correctAnswerIndex });
        
        userAnswers.push({ isCorrect: isCorrect, originalIndex: q.originalIndex });
        
        if (transitionTimeout) clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(() => {
            currentIndex++;
            showQuestion();
        }, SETTINGS.transitionDelay);
    }
    
    function checkLesenAnswer(isCorrect, selectedTitle) {
        if (!gameActive || gamePaused) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const q = currentRound[currentIndex];
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
        
        applyAnswerColors(isCorrect, selectedTitle, null, { type: "lesen", correctAnswerIndex: null });
        
        userAnswers.push({ isCorrect: isCorrect, originalIndex: q.originalIndex });
        
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
        const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
        
        const questionResults = {};
        originalQuestions.forEach((q, idx) => {
            const userAttempts = userAnswers.filter(a => a.originalIndex === idx);
            const correctAttempts = userAttempts.filter(a => a.isCorrect).length;
            let title = "";
            if (q.type === "sprach") {
                title = (q.before || "").substring(0, 25) + " ... " + (q.after || "").substring(0, 25);
            } else {
                title = q.firstWords || "فقرة";
            }
            questionResults[idx] = {
                title: title.substring(0, 45),
                attempts: userAttempts.length,
                correct: correctAttempts,
                wrong: userAttempts.length - correctAttempts
            };
        });
        
        let gradeText = '', gradeColor = '', gradeTextColor = '';
        if (accuracy >= 80) { gradeText = '🧠 ممتاز! أنت جاهز للامتحان'; gradeColor = '#e6f4ea'; gradeTextColor = '#2e7d32'; }
        else if (accuracy >= 60) { gradeText = '👍 جيد جداً، واصل التدريب'; gradeColor = '#fef5e7'; gradeTextColor = '#b45f06'; }
        else { gradeText = '💪 لا تستسلم! أعد المحاولة'; gradeColor = '#fef5e7'; gradeTextColor = '#b45f06'; }
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:35px;width:90%;max-width:500px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);max-height:80vh;overflow-y:auto';
        
        let statsHtml = '';
        for (let idx in questionResults) {
            const stat = questionResults[idx];
            if (stat.attempts > 0) {
                const icon = stat.wrong === 0 ? '✅' : (stat.correct > stat.wrong ? '⚠️' : '❌');
                statsHtml += `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #eee"><span style="font-size:12px;text-align:left;flex:2">${stat.title}</span><span style="font-size:12px;color:${stat.wrong === 0 ? '#2e7d32' : (stat.correct > stat.wrong ? '#b45f06' : '#b45f06')}">${icon} ${stat.correct}/${stat.attempts}</span></div>`;
            }
        }
        
        container.innerHTML = `
            <div style="font-size:48px;margin-bottom:10px">🏆</div>
            <h2 style="margin-bottom:20px;color:#2c3e66">نهاية التحدي</h2>
            <div style="font-size:52px;font-weight:600;color:#2c3e66;margin-bottom:8px">${correct}/${total}</div>
            <div style="font-size:15px;color:#666;margin-bottom:25px">الدقة: ${accuracy}%</div>
            <div style="display:flex;justify-content:center;gap:40px;margin-bottom:25px">
                <div><div style="font-size:28px;font-weight:600;color:#f5b042">${bestCombo}</div><div style="font-size:12px;color:#999">أفضل كومبو</div></div>
                <div><div style="font-size:28px;font-weight:600;color:#2c3e66">${total}</div><div style="font-size:12px;color:#999">إجمالي</div></div>
            </div>
            ${statsHtml ? `<div style="background:#f8f9fa;border-radius:16px;padding:15px;margin-bottom:25px;max-height:200px;overflow-y:auto"><div style="font-size:13px;font-weight:bold;margin-bottom:10px">📊 تفاصيل كل فقرة:</div>${statsHtml}</div>` : ''}
            <div style="background:${gradeColor};padding:14px;border-radius:16px;margin-bottom:25px;color:${gradeTextColor};font-weight:500">${gradeText}</div>
            <div style="display:flex;gap:15px;justify-content:center">
                <button id="restartGameBtn" style="background:#2c3e66;color:white;border:none;border-radius:40px;padding:12px 28px;font-size:14px;cursor:pointer">🔄 تحدٍّ جديد</button>
                <button id="closeGameBtn" style="background:#e8e8e8;color:#333;border:none;border-radius:40px;padding:12px 28px;font-size:14px;cursor:pointer">✖ إغلاق</button>
            </div>
        `;
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        document.getElementById('restartGameBtn').onclick = () => {
            overlay.remove();
            startGame(currentGameData.skill, currentGameData.examId);
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
