// ============================================
// rapidGame.js - لعبة التحدي السريع (نسخة ذكية)
// ============================================

(function() {
    "use strict";
    
    // إعدادات اللعبة
    const SETTINGS = {
        timePerQuestion: 2.2,      // 2.2 ثانية للسؤال
        transitionDelay: 250,       // 0.25 ثانية للانتقال
        firstWordsLength: 8,        // أول 8 كلمات للفقرة
        titleLength: 8,              // أول 8 كلمات للعنوان
        roundLength: 16,             // 16 سؤال في الجولة
        minWrongRepeatDelay: 2,      // أقل تأخير لإعادة السؤال الخاطئ
        maxWrongRepeatDelay: 5       // أقصى تأخير لإعادة السؤال الخاطئ
    };
    
    // متغيرات اللعبة
    let gameActive = false;
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
    
    // إحصائيات الأسئلة للتكرار الذكي
    let questionStats = {};
    
    function shortenText(text, maxWords) {
        if (!text) return "";
        const words = text.split(' ');
        let shortened = words.slice(0, maxWords).join(' ');
        if (words.length > maxWords) shortened += '...';
        return shortened;
    }
    
    // دالة توليد جولة ذكية
    function generateSmartRound(questions, stats) {
        const round = [];
        const usageCount = {};
        const pendingRepeat = []; // أسئلة تنتظر الإعادة
        
        // تهيئة عدد مرات ظهور كل سؤال
        questions.forEach((q, idx) => {
            usageCount[idx] = 0;
        });
        
        // إضافة الأسئلة الخاطئة من الإحصائيات إلى قائمة الانتظار
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
            
            // التحقق من الأسئلة المنتظرة للإعادة
            let addedRepeat = false;
            for (let i = 0; i < pendingRepeat.length; i++) {
                if (pendingRepeat[i].scheduledAt === currentPos) {
                    const qIdx = pendingRepeat[i].questionId;
                    if (usageCount[qIdx] < 3) { // الحد الأقصى 3 مرات
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
            
            // اختيار سؤال جديد (الأقل ظهوراً)
            let availableQuestions = [];
            questions.forEach((q, idx) => {
                const maxAllowed = getMaxAppearances(stats[idx]);
                if (usageCount[idx] < maxAllowed) {
                    availableQuestions.push(idx);
                }
            });
            
            if (availableQuestions.length === 0) {
                // إذا ظهرت جميع الأسئلة بالحد الأقصى، نعيد ضبط العداد
                for (let idx in usageCount) {
                    usageCount[idx] = 0;
                }
                availableQuestions = questions.map((_, idx) => idx);
            }
            
            // اختيار عشوائي مع مراعاة الأسئلة التي أخطأ فيها
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
        
        // خلط الترتيب النهائي قليلاً
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
        return fetch(`data/games/${skill}_exam${examId}.json`)
            .then(response => {
                if (!response.ok) throw new Error('الملف غير موجود');
                return response.json();
            })
            .then(data => {
                currentGameData = data;
                originalQuestions = data.questions;
                
                // تقصير النصوص
                originalQuestions = originalQuestions.map(q => ({
                    ...q,
                    shortFirstWords: shortenText(q.firstWords || q.fullText, SETTINGS.firstWordsLength),
                    shortCorrectTitle: shortenText(q.correctTitle, SETTINGS.titleLength),
                    shortWrongTitles: q.wrongTitles.map(t => shortenText(t, SETTINGS.titleLength))
                }));
                
                // تهيئة الإحصائيات
                questionStats = {};
                originalQuestions.forEach((_, idx) => {
                    questionStats[idx] = {
                        timesWrong: 0,
                        wasSlow: false,
                        lastWrongAt: -999
                    };
                });
                
                return true;
            })
            .catch(() => false);
    }
    
    function startGame(skill, examId) {
        if (gameActive) return;
        
        loadGameData(skill, examId).then(loaded => {
            if (!loaded) {
                showNotAvailableMessage();
                return;
            }
            
            // توليد جولة ذكية
            currentRound = generateSmartRound(originalQuestions, questionStats);
            currentIndex = 0;
            userAnswers = [];
            combo = 0;
            bestCombo = 0;
            
            showCountdown();
        });
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
        const stats = questionStats[q.originalIndex];
        
        const options = [
            { text: q.shortCorrectTitle, fullText: q.correctTitle, isCorrect: true }
        ];
        const wrongs = [...q.shortWrongTitles];
        for (let i = wrongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]];
        }
        options.push({ text: wrongs[0], fullText: q.wrongTitles[0], isCorrect: false });
        if (wrongs[1]) options.push({ text: wrongs[1], fullText: q.wrongTitles[1], isCorrect: false });
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        if (gameOverlay) gameOverlay.remove();
        gameOverlay = document.createElement('div');
        gameOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:30px;width:90%;max-width:650px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2)';
        
        const timerBar = document.createElement('div');
        timerBar.style.cssText = 'width:100%;height:4px;background:#e8e8e8;border-radius:2px;margin-bottom:30px;overflow:hidden';
        const timerFill = document.createElement('div');
        timerFill.style.cssText = 'width:100%;height:100%;background:#2c3e66;border-radius:2px;transition:width 0.02s linear';
        timerBar.appendChild(timerFill);
        container.appendChild(timerBar);
        
        const questionDiv = document.createElement('div');
        questionDiv.style.cssText = 'font-size:28px;font-weight:500;padding:30px 20px;background:#f5f7fc;border-radius:20px;margin-bottom:30px;color:#1a1a2e;line-height:1.4';
        questionDiv.textContent = `❝ ${q.shortFirstWords} ❞`;
        container.appendChild(questionDiv);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.style.cssText = 'display:flex;flex-direction:column;gap:12px;margin-bottom:30px';
        
        options.forEach((opt, idx) => {
            const optBtn = document.createElement('button');
            optBtn.textContent = `${String.fromCharCode(65+idx)}. ${opt.text}`;
            optBtn.setAttribute('data-correct', opt.isCorrect);
            optBtn.style.cssText = 'padding:14px 20px;background:#ffffff;border:1px solid #d0d0d0;border-radius:60px;font-size:15px;text-align:left;cursor:pointer;transition:all 0.05s linear;color:#333';
            optBtn.onmouseenter = () => { optBtn.style.background = '#f0f2f5'; optBtn.style.borderColor = '#b0b0b0'; };
            optBtn.onmouseleave = () => { optBtn.style.background = '#ffffff'; optBtn.style.borderColor = '#d0d0d0'; };
            optBtn.onclick = () => checkAnswer(opt.isCorrect, opt.text);
            optionsDiv.appendChild(optBtn);
        });
        container.appendChild(optionsDiv);
        
        if (combo >= 3) {
            const comboDiv = document.createElement('div');
            comboDiv.style.cssText = 'font-size:18px;font-weight:500;margin-bottom:15px;color:#2c3e66';
            comboDiv.textContent = `${combo >= 10 ? '⚡' : (combo >= 6 ? '🔥' : '✓')} COMBO x${combo}`;
            container.appendChild(comboDiv);
        }
        
        const progressDiv = document.createElement('div');
        progressDiv.style.cssText = 'font-size:13px;color:#999';
        progressDiv.textContent = `${currentIndex + 1} / ${currentRound.length}`;
        container.appendChild(progressDiv);
        
        gameOverlay.appendChild(container);
        document.body.appendChild(gameOverlay);
        
        gameActive = true;
        let startTime = Date.now();
        let isFast = true;
        
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (!gameActive) return;
            const elapsed = (Date.now() - startTime) / 1000;
            const remaining = Math.max(0, SETTINGS.timePerQuestion - elapsed);
            const percent = (remaining / SETTINGS.timePerQuestion) * 100;
            timerFill.style.width = `${percent}%`;
            
            if (remaining <= 0.3) timerFill.style.background = '#dc3545';
            else if (remaining <= 0.8) timerFill.style.background = '#fd7e14';
            else timerFill.style.background = '#2c3e66';
            
            if (remaining <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                if (gameActive) {
                    gameActive = false;
                    
                    // تسجيل الإجابة كخاطئة مع الوقت البطيء
                    const currentStats = questionStats[q.originalIndex];
                    currentStats.timesWrong++;
                    currentStats.wasSlow = true;
                    currentStats.lastWrongAt = currentIndex;
                    
                    const btns = optionsDiv.querySelectorAll('button');
                    btns.forEach(btn => {
                        if (btn.getAttribute('data-correct') === 'true') {
                            btn.style.background = '#d4edda';
                            btn.style.borderColor = '#28a745';
                            btn.style.color = '#155724';
                        } else {
                            btn.style.background = '#fff3e0';
                            btn.style.borderColor = '#fd7e14';
                        }
                    });
                    userAnswers.push({ isCorrect: false, originalIndex: q.originalIndex });
                    combo = 0;
                    
                    if (transitionTimeout) clearTimeout(transitionTimeout);
                    transitionTimeout = setTimeout(() => {
                        currentIndex++;
                        showQuestion();
                    }, SETTINGS.transitionDelay);
                }
            }
        }, 20);
        
        window._currentOptionsDiv = optionsDiv;
        window._currentStartTime = startTime;
        window._currentQuestion = q;
    }
    
    function checkAnswer(isCorrect, selectedShortTitle) {
        if (!gameActive) return;
        gameActive = false;
        if (timerInterval) clearInterval(timerInterval);
        
        const q = currentRound[currentIndex];
        const elapsed = (Date.now() - window._currentStartTime) / 1000;
        const isFast = elapsed < 1.5;
        const optionsDiv = window._currentOptionsDiv;
        
        const currentStats = questionStats[q.originalIndex];
        
        if (isCorrect) {
            if (!isFast) {
                currentStats.wasSlow = true;
            }
            combo++;
            if (combo > bestCombo) bestCombo = combo;
        } else {
            currentStats.timesWrong++;
            currentStats.wasSlow = true;
            currentStats.lastWrongAt = currentIndex;
            combo = 0;
        }
        
        const btns = optionsDiv.querySelectorAll('button');
        btns.forEach(btn => {
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
        
        const correct = userAnswers.filter(a => a.isCorrect).length;
        const total = userAnswers.length;
        const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
        
        // إحصائيات لكل سؤال
        const questionResults = {};
        originalQuestions.forEach((q, idx) => {
            const userAttempts = userAnswers.filter(a => a.originalIndex === idx);
            const correctAttempts = userAttempts.filter(a => a.isCorrect).length;
            questionResults[idx] = {
                title: q.shortCorrectTitle,
                attempts: userAttempts.length,
                correct: correctAttempts,
                wrong: userAttempts.length - correctAttempts
            };
        });
        
        let gradeText = '', gradeColor = '', gradeTextColor = '';
        if (accuracy >= 80) { gradeText = '🧠 ممتاز! أنت جاهز للامتحان'; gradeColor = '#d4edda'; gradeTextColor = '#155724'; }
        else if (accuracy >= 60) { gradeText = '👍 جيد جداً، واصل التدريب'; gradeColor = '#fff3cd'; gradeTextColor = '#856404'; }
        else { gradeText = '💪 لا تستسلم! أعد المحاولة'; gradeColor = '#f8d7da'; gradeTextColor = '#721c24'; }
        
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:10000;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(4px)';
        
        const container = document.createElement('div');
        container.style.cssText = 'background:white;border-radius:28px;padding:35px;width:90%;max-width:500px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);max-height:80vh;overflow-y:auto';
        
        let statsHtml = '';
        for (let idx in questionResults) {
            const stat = questionResults[idx];
            if (stat.attempts > 0) {
                const icon = stat.wrong === 0 ? '✅' : (stat.correct > stat.wrong ? '⚠️' : '❌');
                statsHtml += `
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #eee">
                        <span style="font-size:13px;text-align:left;flex:2">${stat.title}</span>
                        <span style="font-size:13px;color:${stat.wrong === 0 ? '#28a745' : (stat.correct > stat.wrong ? '#fd7e14' : '#dc3545')}">${icon} ${stat.correct}/${stat.attempts}</span>
                    </div>
                `;
            }
        }
        
        container.innerHTML = `
            <div style="font-size:48px;margin-bottom:10px">🏆</div>
            <h2 style="margin-bottom:20px;color:#2c3e66">نهاية التحدي</h2>
            <div style="font-size:52px;font-weight:600;color:#2c3e66;margin-bottom:8px">${correct}/${total}</div>
            <div style="font-size:15px;color:#666;margin-bottom:25px">الدقة: ${accuracy}%</div>
            <div style="display:flex;justify-content:center;gap:40px;margin-bottom:25px">
                <div><div style="font-size:28px;font-weight:600;color:#fd7e14">${bestCombo}</div><div style="font-size:12px;color:#999">أفضل كومبو</div></div>
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
        
        document.getElementById('restartGameBtn').onclick = () => { overlay.remove(); startGame(currentGameData.skill, currentGameData.examId); };
        document.getElementById('closeGameBtn').onclick = () => overlay.remove();
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    }
    
    function addGameButton() {
        const nav = document.getElementById('examNavButtons');
        if (!nav) {
            setTimeout(addGameButton, 500);
            return;
        }
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
