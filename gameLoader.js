// ============================================
// gameLoader.js - لعبة التحدي السريع (تستدعي البيانات من data)
// ============================================

(function() {
    "use strict";
    
    const SETTINGS = {
        timePerQuestion: 2.2,
        transitionDelay: 250,
        firstWordsLength: 7,
        titleLength: 7
    };
    
    let gameActive = false;
    let gameOverlay = null;
    let currentGameData = null;
    let currentQuestions = [];
    let currentIndex = 0;
    let userAnswers = [];
    let combo = 0;
    let bestCombo = 0;
    let timerInterval = null;
    let transitionTimeout = null;
    
    function shortenText(text, maxWords) {
        if (!text) return "";
        var words = text.split(' ');
        var shortened = words.slice(0, maxWords).join(' ');
        if (words.length > maxWords) shortened += '...';
        return shortened;
    }
    
    function showNotAvailableMessage() {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:10000;display:flex;justify-content:center;align-items:center';
        var card = document.createElement('div');
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
        document.getElementById('closeNotAvailableBtn').onclick = function() { overlay.remove(); };
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    }
    
    function loadGameData(skill, examId) {
        return fetch(`data/games/${skill}_exam${examId}.json`)
            .then(function(response) {
                if (!response.ok) throw new Error('الملف غير موجود');
                return response.json();
            })
            .then(function(data) {
                currentGameData = data;
                return true;
            })
            .catch(function() {
                return false;
            });
    }
    
    function prepareQuestions() {
        currentQuestions = currentGameData.questions.map(function(q) {
            return {
                ...q,
                shortFirstWords: shortenText(q.firstWords || q.fullText, SETTINGS.firstWordsLength),
                shortCorrectTitle: shortenText(q.correctTitle, SETTINGS.titleLength),
                shortWrongTitles: q.wrongTitles.map(function(t) { return shortenText(t, SETTINGS.titleLength); })
            };
        });
        for (var i = currentQuestions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = currentQuestions[i];
            currentQuestions[i] = currentQuestions[j];
            currentQuestions[j] = temp;
        }
    }
    
    function startGame(skill, examId) {
        if (gameActive) return;
        
        loadGameData(skill, examId).then(function(loaded) {
            if (!loaded) {
                showNotAvailableMessage();
                return;
            }
            prepareQuestions();
            currentIndex = 0;
            userAnswers = [];
            combo = 0;
            bestCombo = 0;
            showCountdown();
        });
    }
    
    function showCountdown() {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;justify-content:center;align-items:center';
        var countdown = document.createElement('div');
        countdown.style.cssText = 'font-size:100px;font-weight:bold;color:white;text-shadow:0 0 20px rgba(0,0,0,0.5);transition:all 0.1s';
        countdown.textContent = '3';
        overlay.appendChild(countdown);
        document.body.appendChild(overlay);
        var count = 3;
        var interval = setInterval(function() {
            count--;
            if (count > 0) {
                countdown.textContent = count;
                countdown.style.transform = 'scale(1.1)';
                setTimeout(function() { countdown.style.transform = 'scale(1)'; }, 100);
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
        if (currentIndex >= currentQuestions.length) {
            showResults();
            return;
        }
        
        var q = currentQuestions[currentIndex];
        var options = [
            { text: q.shortCorrectTitle, fullText: q.correctTitle, isCorrect: true }
        ];
        var wrongs = [...q.shortWrongTitles];
        for (var i = wrongs.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = wrongs[i];
            wrongs[i] = wrongs[j];
            wrongs[j] = temp;
        }
        options.push({ text: wrongs[0], fullText: q.wrongTitles[0], isCorrect: false });
        if (wrongs[1]) options.push({ text: wrongs[1], fullText: q.wrongTitles[1], isCorrect: false });
        for (var k = options.length - 1; k > 0; k--) {
            var l = Math.floor(Math.random() * (k + 1));
            var tempOpt = options[k];
            options[k] = options[l];
            options[l] = tempOpt;
        }
        
        if (gameOverlay) gameOverlay.remove();
        gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        var container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:650px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2)';
        
        var timerBar = document.createElement('div');
        timerBar.style.cssText = 'width:100%;height:4px;background:#e8e8e8;border-radius:2px;margin-bottom:30px;overflow:hidden';
        var timerFill = document.createElement('div');
        timerFill.style.cssText = 'width:100%;height:100%;background:#2c3e66;border-radius:2px;transition:width 0.02s linear';
        timerBar.appendChild(timerFill);
        container.appendChild(timerBar);
        
        var questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'font-size:28px;font-weight:500;padding:30px 20px;background:#f5f7fc;border-radius:20px;margin-bottom:30px;color:#1a1a2e';
        questionDiv.textContent = '❝ ' + q.shortFirstWords + ' ❞';
        container.appendChild(questionDiv);
        
        var optionsDiv = document.createElement('div');
        optionsDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:30px';
        
        options.forEach(function(opt, idx) {
            var optBtn = document.createElement('button');
            optBtn.textContent = String.fromCharCode(65+idx) + '. ' + opt.text;
            optBtn.setAttribute('data-correct', opt.isCorrect);
            optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #d0d0d0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s linear;color:#333';
            optBtn.onmouseenter = function() { this.style.background = '#f0f2f5'; this.style.borderColor = '#b0b0b0'; };
            optBtn.onmouseleave = function() { this.style.background = '#ffffff'; this.style.borderColor = '#d0d0d0'; };
            optBtn.onclick = function() { checkAnswer(opt.isCorrect, opt.text); };
            optionsDiv.appendChild(optBtn);
        });
        container.appendChild(optionsDiv);
        
        if (combo >= 3) {
            var comboDiv = document.createElement('div');
            comboDiv.style.cssText = 'font-size:18px;font-weight:500;margin-bottom:15px;color:#2c3e66';
            comboDiv.textContent = (combo >= 10 ? '⚡' : (combo >= 6 ? '🔥' : '✓')) + ' COMBO x' + combo;
            container.appendChild(comboDiv);
        }
        
        var progressDiv = document.createElement('div');
        progressDiv.style.cssText = 'font-size:13px;color:#999';
        progressDiv.textContent = (currentIndex + 1) + ' / ' + currentQuestions.length;
        container.appendChild(progressDiv);
        
        gameOverlay.appendChild(container);
        document.body.appendChild(gameOverlay);
        
        gameActive = true;
        var startTime = Date.now();
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(function() {
            if (!gameActive) return;
            var elapsed = (Date.now() - startTime) / 1000;
            var remaining = Math.max(0, SETTINGS.timePerQuestion - elapsed);
            var percent = (remaining / SETTINGS.timePerQuestion) * 100;
            timerFill.style.width = percent + '%';
            if (remaining <= 0.3) timerFill.style.background = '#dc3545';
            else if (remaining <= 0.8) timerFill.style.background = '#fd7e14';
            else timerFill.style.background = '#2c3e66';
            if (remaining <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                if (gameActive) {
                    gameActive = false;
                    var btns = optionsDiv.querySelectorAll('button');
                    btns.forEach(function(btn) {
                        if (btn.getAttribute('data-correct') === 'true') {
                            btn.style.background = '#d4edda';
                            btn.style.borderColor = '#28a745';
                        } else {
                            btn.style.background = '#fff3e0';
                            btn.style.borderColor = '#fd7e14';
                        }
                    });
                    userAnswers.push({ isCorrect: false });
                    combo = 0;
                    if (transitionTimeout) clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(function() {
                        currentIndex++;
                        showQuestion();
                    }, SETTINGS.transitionDelay);
                }
            }
        }, 20);
        
        window._currentOptionsDiv = optionsDiv;
    }
    
    function checkAnswer(isCorrect, selectedShortTitle) {
        if (!gameActive) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        var optionsDiv = window._currentOptionsDiv;
        var btns = optionsDiv.querySelectorAll('button');
        btns.forEach(function(btn) {
            if (btn.getAttribute('data-correct') === 'true') {
                btn.style.background = '#d4edda';
                btn.style.borderColor = '#28a745';
                btn.style.color = '#155724';
            } else if (!isCorrect && btn.textContent.includes(selectedShortTitle)) {
                btn.style.background = '#fff3e0';
                btn.style.borderColor = '#fd7e14';
                btn.style.color = '#e67e22';
            }
        });
        
        if (isCorrect) {
            combo++;
            if (combo > bestCombo) bestCombo = combo;
        } else {
            combo = 0;
        }
        userAnswers.push({ isCorrect: isCorrect });
        
        if (transitionTimeout) clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(function() {
            currentIndex++;
            showQuestion();
        }, SETTINGS.transitionDelay);
    }
    
    function showResults() {
        if (gameOverlay) gameOverlay.remove();
        gameActive = false;
        var correct = userAnswers.filter(function(a) { return a.isCorrect; }).length;
        var total = userAnswers.length;
        var accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
        
        var gradeText = '', gradeColor = '', gradeTextColor = '';
        if (accuracy >= 80) { gradeText = '🧠 ممتاز! أنت جاهز للامتحان'; gradeColor = '#d4edda'; gradeTextColor = '#155724'; }
        else if (accuracy >= 60) { gradeText = '👍 جيد جداً، واصل التدريب'; gradeColor = '#fff3cd'; gradeTextColor = '#856404'; }
        else { gradeText = '💪 لا تستسلم! أعد المحاولة'; gradeColor = '#f8d7da'; gradeTextColor = '#721c24'; }
        
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        var container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:35px;width:90%;max-width:450px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2)';
        container.innerHTML = `
            <div style="font-size:48px;margin-bottom:10px">🏆</div>
            <h2 style="margin-bottom:20px;color:#2c3e66">نهاية التحدي</h2>
            <div style="font-size:52px;font-weight:600;color:#2c3e66;margin-bottom:8px">${correct}/${total}</div>
            <div style="font-size:15px;color:#666;margin-bottom:25px">الدقة: ${accuracy}%</div>
            <div style="display:flex;justify-content:center;gap:40px;margin-bottom:25px">
                <div><div style="font-size:28px;font-weight:600;color:#fd7e14">${bestCombo}</div><div style="font-size:12px;color:#999">أفضل كومبو</div></div>
                <div><div style="font-size:28px;font-weight:600;color:#2c3e66">${total}</div><div style="font-size:12px;color:#999">إجمالي</div></div>
            </div>
            <div style="background:${gradeColor};padding:14px;border-radius:16px;margin-bottom:25px;color:${gradeTextColor};font-weight:500">${gradeText}</div>
            <div style="display:flex;gap:15px;justify-content:center">
                <button id="restartGameBtn" style="background:#2c3e66;color:white;border:none;border-radius:40px;padding:12px 28px;font-size:14px;cursor:pointer">🔄 تحدٍّ جديد</button>
                <button id="closeGameBtn" style="background:#e8e8e8;color:#333;border:none;border-radius:40px;padding:12px 28px;font-size:14px;cursor:pointer">✖ إغلاق</button>
            </div>
        `;
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        document.getElementById('restartGameBtn').onclick = function() { overlay.remove(); startGame(currentGameData.skill, currentGameData.examId); };
        document.getElementById('closeGameBtn').onclick = function() { overlay.remove(); };
        overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    }
    
    function addGameButton() {
        var nav = document.getElementById('examNavButtons');
        if (!nav) {
            setTimeout(addGameButton, 500);
            return;
        }
        if (document.getElementById('rapidGameBtn')) return;
        
        var btn = document.createElement('button');
        btn.id = 'rapidGameBtn';
        btn.innerHTML = '⚡ التحدي السريع';
        btn.style.cssText = 'background:#2c3e66;color:white;border:none;border-radius:30px;padding:8px 20px;font-size:14px;font-weight:500;cursor:pointer;margin-left:10px';
        btn.onclick = function() {
            var currentSkill = typeof getCurrentSkill === 'function' ? getCurrentSkill() : 'lesen1';
            var currentExamId = typeof getCurrentExamId === 'function' ? getCurrentExamId() : 1;
            startGame(currentSkill, currentExamId);
        };
        nav.appendChild(btn);
        console.log('🎮 زر التحدي السريع جاهز');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(addGameButton, 500); });
    } else {
        setTimeout(addGameButton, 500);
    }
})();
