// ============================================
// MEMORY TRAINER V4 - يدعم Hören و Lesen 1 (UI محسّن لـ Lesen 1)
// ============================================

class MemoryTrainer {
    constructor() {
        // البيانات الأساسية
        this.questions = [];           // الجمل الصحيحة فقط (للتدريب) - أو كل الجمل في حالة lesen1
        this.allQuestions = [];        // جميع الجمل (صحيحة وخاطئة) - لتوليد الخيارات (Hören)
        this.sharedOptions = [];       // العناوين المشتركة (Lesen 1)
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;
        this.examType = 'hoeren';      // 'hoeren' أو 'matching' (Lesen 1)

        // السؤال الحالي
        this.currentCorrectText = '';
        this.currentCorrectIndex = -1; // للـ Lesen 1 (فهرس في sharedOptions)
        this.currentOptions = [];
        this.currentQuestionIndex = 0;
        this.currentExamId = 1;
        this.currentQuestionObj = null;

        // الإحصائيات
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;

        // العناصر
        this.overlay = null;
        this.card = null;
        this.timer = null;
        this.isAnswered = false;
        this.isCardReady = false;

        // الإعدادات
        this.TOTAL_OPTIONS = 3;
        this.WRONG_OPTIONS = 2;
        this.LEVELS_KEY = 'memory_levels';
        this.MAX_LEVEL = 5;
        this.currentSkill = 'hoeren1';
        this.currentExamId = 1;
    }

    // ============================================
    // START - نقطة الدخول
    // ============================================

    start(mode = 'single') {
        console.log(`🧠 بدء Memory Trainer V4 (المهارة: ${this.currentSkill}, الوضع: ${mode})...`);

        let examData = null;
        this.isFromList = false;
        this.sharedOptions = [];

        // ✅ وضع قائمة المراحل (من زر القائمة)
        if (mode === 'list') {
            const combinedKey = `_${this.currentSkill}_combinedData`;
            if (window[combinedKey]) {
                examData = window[combinedKey];
                this.isFromList = true;
                console.log(`📚 تدريب من قائمة ${this.currentSkill} (المرحلة ${examData.currentStage || 1})`);
                
                if (examData.sharedOptions) {
                    this.sharedOptions = examData.sharedOptions;
                }
                this.examType = examData.examType || 'hoeren';
                if (this.currentSkill === 'lesen1') {
                    this.examType = 'matching';
                }
            } else {
                if (typeof window.loadStageExams === 'function') {
                    window.loadStageExams(this.currentSkill).then(() => {
                        if (window[combinedKey]) {
                            this.start(mode);
                        } else {
                            this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد`);
                        }
                    });
                    return;
                } else {
                    this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد`);
                    return;
                }
            }
        } 
        // ✅ وضع الامتحان الفردي (من زر 🧠 داخل الامتحان)
        else {
            examData = window.currentExamData || window._currentExamData;
            if (examData) {
                this.currentSkill = window.currentSkill || 'hoeren1';
                this.currentExamId = window.currentExamId || 1;
                console.log(`📖 تدريب من امتحان فردي: ${this.currentSkill} exam${this.currentExamId}`);
                if (examData.sharedOptions) {
                    this.sharedOptions = examData.sharedOptions;
                }
                this.examType = examData.type || 'hoeren';
                if (this.currentSkill === 'lesen1') {
                    this.examType = 'matching';
                }
            } else {
                this.showNotAvailable("لا توجد بيانات امتحان");
                return;
            }
        }

        if (!examData) {
            this.showNotAvailable("لا توجد بيانات امتحان");
            return;
        }

        // ✅ استخراج جميع الجمل
        let rawQuestions = [];
        if (this.isFromList) {
            rawQuestions = examData.allQuestions || [];
            if (this.currentSkill === 'lesen1') {
                this.questions = rawQuestions;
            } else {
                this.questions = rawQuestions.filter(q => q.correct === true);
            }
        } else {
            const examQuestions = examData.questions || [];
            rawQuestions = examQuestions.map((q, idx) => ({
                text: q.text,
                correct: q.correct,
                examId: this.currentExamId,
                questionIndex: idx,
                originalQuestion: q
            }));
            if (this.currentSkill === 'lesen1') {
                this.questions = rawQuestions;
            } else {
                this.questions = rawQuestions.filter(q => q.correct === true);
            }
        }

        this.allQuestions = rawQuestions;

        if (this.currentSkill === 'lesen1' && this.sharedOptions.length === 0 && rawQuestions.length > 0) {
            console.warn('⚠️ لم يتم العثور على sharedOptions لـ lesen1، قد لا تعمل الخيارات بشكل صحيح.');
        }

        if (this.questions.length === 0) {
            this.showNotAvailable("لا توجد إجابات صحيحة في هذا الامتحان");
            return;
        }

        this.buildTrainingQueue();

        if (this.trainingQueue.length === 0) {
            this.showNotAvailable("لا توجد جمل للتدريب");
            return;
        }

        this.isActive = true;
        this.isReviewMode = false;
        this.currentIndex = 0;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.wrongQuestions = [];
        this.totalQuestions = this.trainingQueue.length;
        this.isCardReady = false;

        this.createOverlay();
        this.createCardStructure();

        if (this.isFromList) {
            this.showIntroCardList();
        } else {
            this.showIntroCardSingle();
        }
    }

    // ============================================
    // بناء Overlay و Card
    // ============================================

    createOverlay() {
        if (this.overlay) this.overlay.remove();
        this.overlay = document.createElement('div');
        this.overlay.className = 'memory-trainer-overlay';
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                if (this.currentIndex >= this.trainingQueue.length && this.isActive) {
                    this.wrongQuestions.length > 0 ? this.showPhaseComplete() : this.showResults();
                    return;
                }
                this.close();
            }
        });
        document.body.appendChild(this.overlay);
    }

    createCardStructure() {
        const oldCard = this.overlay.querySelector('.memory-trainer-card-container');
        if (oldCard) oldCard.remove();
        this.card = document.createElement('div');
        this.card.className = 'memory-trainer-card-container';
        this.card.style.cssText = `
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: memorySlideUp 0.15s ease;
        `;
        this.overlay.appendChild(this.card);
        this.isCardReady = true;
    }

    updateCard(html) {
        if (!this.isCardReady || !this.card) this.createCardStructure();
        this.card.innerHTML = html;
    }

    // ============================================
    // بناء قائمة التدريب (مع تكرار نصف الجمل)
    // ============================================

    buildTrainingQueue() {
        const baseQueue = this.questions.map(q => q);
        const repeatCount = Math.ceil(baseQueue.length / 2);
        const shuffled = this.shuffleArray([...baseQueue]);
        const repeatItems = [];
        for (let i = 0; i < Math.min(repeatCount, shuffled.length); i++) {
            repeatItems.push(shuffled[i]);
        }
        this.trainingQueue = this.shuffleArray([...baseQueue, ...repeatItems]);
        console.log(`📊 قائمة التدريب: ${this.trainingQueue.length} جملة (${this.isFromList ? 'مرحلة' : 'امتحان فردي'})`);
    }

    // ============================================
    // نظام المستويات (باستخدام المعرفات الثابتة)
    // ============================================

    buildSentenceId(skill, examId, questionIndex) {
        if (window.buildSentenceId) {
            return window.buildSentenceId(skill, examId, questionIndex);
        }
        return `${skill}_exam${examId}_${questionIndex}`;
    }

    getSentenceLevel(sentenceId) {
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        return data[sentenceId] !== undefined ? data[sentenceId] : 0;
    }

    setSentenceLevel(sentenceId, level) {
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let newLevel = Math.max(0, Math.min(this.MAX_LEVEL, level));
        data[sentenceId] = newLevel;
        localStorage.setItem(this.LEVELS_KEY, JSON.stringify(data));
    }

    increaseLevel(sentenceId) {
        const oldLevel = this.getSentenceLevel(sentenceId);
        if (oldLevel < this.MAX_LEVEL) {
            const newLevel = oldLevel + 1;
            this.setSentenceLevel(sentenceId, newLevel);
            console.log(`⬆️ زيادة مستوى ${sentenceId} -> ${newLevel}`);
        }
    }

    decreaseLevel(sentenceId) {
        const oldLevel = this.getSentenceLevel(sentenceId);
        if (oldLevel > 0) {
            const newLevel = oldLevel - 1;
            this.setSentenceLevel(sentenceId, newLevel);
            console.log(`⬇️ إنقاص مستوى ${sentenceId} -> ${newLevel}`);
        }
    }

    // ============================================
    // دوال حساب النسب
    // ============================================

    getExamProgress(skill, examId) {
        if (window.getExamProgress) return window.getExamProgress(skill, examId);
        const prefix = `${skill}_exam${examId}_`;
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let totalLevels = 0, count = 0;
        for (const key in data) {
            if (key.startsWith(prefix)) { totalLevels += data[key]; count++; }
        }
        if (count === 0) return 0;
        return Math.min(100, Math.round((totalLevels / (count * this.MAX_LEVEL)) * 100));
    }

    getOverallProgressForSkill(skill) {
        if (window.getOverallProgress) {
            if (window.getOverallProgress.length === 1) {
                return window.getOverallProgress(skill);
            } else {
                return window.getOverallProgress();
            }
        }
        return 0;
    }

    getStageProgressForSkill(skill) {
        if (window.getStageProgress) {
            return window.getStageProgress(skill);
        }
        return 0;
    }

    // ============================================
    // توليد الخيارات (تدعم Hören و Lesen 1)
    // ============================================

    generateOptions(correctText, currentQuestionObj) {
        const options = [correctText];
        let added = 0;

        if (this.examType === 'matching' && this.sharedOptions && this.sharedOptions.length > 0) {
            const correctIndex = currentQuestionObj.correct;
            const correctOption = this.sharedOptions[correctIndex];
            const allOptions = this.sharedOptions.filter((_, idx) => idx !== correctIndex);
            const shuffled = this.shuffleArray([...allOptions]);
            const wrongOptions = shuffled.slice(0, 2);
            const finalOptions = [correctOption, ...wrongOptions];
            while (finalOptions.length < 3) {
                const extra = this.sharedOptions[Math.floor(Math.random() * this.sharedOptions.length)];
                if (!finalOptions.includes(extra)) finalOptions.push(extra);
            }
            return this.shuffleArray(finalOptions);
        }

        const wrongTexts = this.allQuestions
            .filter(q => q.text !== correctText)
            .map(q => q.text);

        let shuffledWrong = this.shuffleArray([...wrongTexts]);
        for (let i = 0; i < shuffledWrong.length && added < this.WRONG_OPTIONS; i++) {
            const candidate = shuffledWrong[i];
            if (!options.includes(candidate) && candidate.trim() !== '') {
                options.push(candidate);
                added++;
            }
        }

        while (options.length < this.TOTAL_OPTIONS) {
            console.warn('⚠️ لم يتم العثور على جمل خاطئة كافية، نضيف جملة وهمية مؤقتة');
            options.push(`جملة ${options.length + 1}`);
        }

        return this.shuffleArray(options);
    }

    // ============================================
    // شاشات البداية
    // ============================================

    showIntroCardSingle() {
        const examPercent = this.getExamProgress(this.currentSkill, this.currentExamId);
        const examLabel = this.examType === 'matching' ? `امتحان ${this.currentExamId} (Lesen 1)` : `امتحان ${this.currentExamId}`;
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء ذكي</h2>
                <p style="font-size:14px;color:#334155;margin:6px 0 2px 0;">تدريب ${examLabel}.</p>
                <p style="font-size:13px;color:#64748B;margin:2px 0 14px 0;">سترى النص مرة واحدة، ثم سنطلب منك اختيار العنوان الصحيح.</p>
                <div style="margin:4px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:4px 10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${examPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:12px;font-weight:600;color:#1565C0;">${examPercent}%</span>
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ</button>
            </div>
        `);
    }

    showIntroCardList() {
        const percent = this.getOverallProgressForSkill(this.currentSkill);
        const total = this.trainingQueue.length;
        let currentStage = 1, totalStages = 1;
        if (window.getCurrentStage && window.getTotalStages) {
            currentStage = window.getCurrentStage(this.currentSkill);
            totalStages = window.getTotalStages(this.currentSkill);
        }
        const skillLabel = this.examType === 'matching' ? `Lesen 1` : this.currentSkill;
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء متقدم</h2>
                <p style="font-size:14px;color:#334155;margin:4px 0 2px 0;">تدريب المرحلة ${currentStage} من ${skillLabel}.</p>
                <p style="font-size:13px;color:#64748B;margin:2px 0 12px 0;">كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار النصوص المناسبة لك.</p>
                <div style="margin:10px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;text-align:left;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${percent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${percent}%</span>
                    </div>
                </div>
                <p style="font-size:12px;color:#94A3B8;margin:4px 0 4px 0;">${total} نص للتدريب</p>
                <p style="font-size:11px;color:#94A3B8;margin:0 0 12px 0;">المرحلة ${currentStage} / ${totalStages}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ التدريب</button>
            </div>
        `);
    }

    // ============================================
    // عرض البطاقات (تدعم Hören و Lesen 1) - UI محسّن لـ Lesen 1
    // ============================================

    showMemoryCard() {
        this.clearTimer();
        this.isAnswered = false;

        if (this.currentIndex >= this.trainingQueue.length) {
            this.showPhaseComplete();
            return;
        }

        const item = this.trainingQueue[this.currentIndex];
        const textToShow = item.text;
        this.currentCorrectText = textToShow;
        this.currentExamId = item.examId;
        this.currentQuestionIndex = item.questionIndex;
        this.currentQuestionObj = item;
        this.currentCorrectIndex = item.correct;

        // ✅ عرض النص حسب النوع
        let displayContent = '';

        if (this.examType === 'matching') {
            // ✅ Lesen 1: عرض النص في صندوق أفقي مع تمرير (بدون بطاقة خضراء)
            // استخراج الحرف الأول من العنوان الصحيح
            const correctIndex = this.currentQuestionObj.correct;
            const correctTitle = this.sharedOptions[correctIndex] || '';
            const titlePrefix = correctTitle.match(/^[a-z]\.\s*/) ? correctTitle.match(/^[a-z]\.\s*/)[0] : '';
            const titleWithoutPrefix = correctTitle.replace(/^[a-z]\.\s*/, '');

            displayContent = `
                <div style="
                    font-size: 15px;
                    line-height: 1.9;
                    text-align: right;
                    max-height: 160px;
                    overflow-y: auto;
                    padding: 12px 16px;
                    background: #f8fafc;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                    width: 100%;
                    box-sizing: border-box;
                    direction: rtl;
                    color: #1a202c;
                ">
                    ${textToShow}
                </div>
                <div style="
                    margin-top: 10px;
                    font-size: 15px;
                    font-weight: 500;
                    color: #1a5a1a;
                    direction: rtl;
                    padding: 2px 4px;
                ">
                    ✅ ${titlePrefix}${titleWithoutPrefix}
                </div>
            `;
        } else {
            // ✅ Hören: عرض الجملة فقط (بدون تغيير)
            displayContent = `<span>${textToShow}</span>`;
        }

        this.updateCard(`
            <div class="memory-trainer-card">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.trainingQueue.length}</span>
                    <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-hint">🌿 ${this.examType === 'matching' ? 'اقرأ النص جيداً، سأطلب منك اختيار العنوان المناسب.' : 'سأطلب منك هذه الجملة بعد قليل.'}</p>
                    <div class="memory-trainer-answer">
                        ${displayContent}
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">أنا جاهز</button>
            </div>
        `);
    }

    readyToRecall() {
        this.clearTimer();
        if (this.examType === 'matching') {
            const correctIndex = this.currentQuestionObj.correct;
            const allOptions = this.sharedOptions.filter((_, idx) => idx !== correctIndex);
            const shuffled = this.shuffleArray([...allOptions]);
            const wrongOptions = shuffled.slice(0, 2);
            const correctOption = this.sharedOptions[correctIndex];
            let finalOptions = [correctOption, ...wrongOptions];
            while (finalOptions.length < 3) {
                const extra = this.sharedOptions[Math.floor(Math.random() * this.sharedOptions.length)];
                if (!finalOptions.includes(extra)) finalOptions.push(extra);
            }
            this.currentOptions = this.shuffleArray(finalOptions);
        } else {
            this.currentOptions = this.generateOptions(this.currentCorrectText, this.currentQuestionObj);
        }

        this.updateCard(`
            <div class="memory-trainer-recall">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.trainingQueue.length}</span>
                    <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question">${this.examType === 'matching' ? 'اختر العنوان المناسب للنص الذي قرأته:' : 'ما هي الجملة التي رأيتها قبل قليل؟'}</p>
                    <div class="memory-trainer-options">
                        ${this.currentOptions.map((opt, idx) => `
                            <button class="memory-trainer-option" data-index="${idx}" onclick="window.memoryTrainer.checkAnswer(${idx})">
                                ${String.fromCharCode(65 + idx)}. ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div id="memory-trainer-feedback"></div>
            </div>
        `);
    }

    // ============================================
    // التصحيح (مع تحديث المستوى) - عرض الإجابة الصحيحة كنص عادي
    // ============================================

    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.attempts++;

        const selectedText = this.currentOptions[selectedIndex];
        let isCorrect = false;

        if (this.examType === 'matching') {
            const correctIndex = this.currentQuestionObj.correct;
            const correctOption = this.sharedOptions[correctIndex];
            isCorrect = (selectedText === correctOption);
        } else {
            isCorrect = (selectedText === this.currentCorrectText);
        }

        const skill = this.currentSkill;
        const examId = this.currentExamId;
        const qIndex = this.currentQuestionIndex;
        const sentenceId = this.buildSentenceId(skill, examId, qIndex);

        const allOptions = document.querySelectorAll('.memory-trainer-option');
        const feedback = document.getElementById('memory-trainer-feedback');

        allOptions.forEach(btn => { btn.disabled = true; btn.style.opacity = '0.7'; btn.style.cursor = 'default'; });

        let correctText = '';
        if (this.examType === 'matching') {
            const correctIndex = this.currentQuestionObj.correct;
            correctText = this.sharedOptions[correctIndex];
        } else {
            correctText = this.currentCorrectText;
        }

        // استخراج الحرف الأول إن وجد
        const titlePrefix = correctText.match(/^[a-z]\.\s*/) ? correctText.match(/^[a-z]\.\s*/)[0] : '';
        const titleWithoutPrefix = correctText.replace(/^[a-z]\.\s*/, '');

        if (isCorrect) {
            this.correctAttempts++;
            this.increaseLevel(sentenceId);
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
            feedback.innerHTML = `
                <div style="margin-top:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                    <span style="font-size:15px; font-weight:500; color:#1a5a1a;">
                        ✅ ${titlePrefix}${titleWithoutPrefix}
                    </span>
                    <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="padding:6px 16px; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:#28a745; color:white;">التالي →</button>
                </div>
            `;
        } else {
            this.decreaseLevel(sentenceId);
            if (!this.wrongQuestions.includes(this.currentQuestionObj)) {
                this.wrongQuestions.push(this.currentQuestionObj);
            }
            allOptions[selectedIndex].style.borderColor = '#e67e22';
            allOptions[selectedIndex].style.backgroundColor = '#fef0e0';
            allOptions.forEach((btn, idx) => {
                if (this.currentOptions[idx] === correctText) {
                    btn.style.borderColor = '#28a745';
                    btn.style.backgroundColor = '#d4edda';
                }
            });
            feedback.innerHTML = `
                <div style="margin-top:12px; display:flex; flex-direction:column; gap:10px;">
                    <span style="font-size:15px; font-weight:500; color:#b85a00;">
                        ✅ الإجابة الصحيحة: <strong style="color:#1a5a1a;">${titlePrefix}${titleWithoutPrefix}</strong>
                    </span>
                    <div style="display:flex; gap:10px; flex-wrap:wrap;">
                        <button class="memory-trainer-btn secondary small" onclick="window.memoryTrainer.retryQuestion()" style="padding:6px 16px; border:2px solid #e67e22; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:white; color:#e67e22;">🔄 إعادة المحاولة</button>
                        <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="padding:6px 16px; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white;">التالي →</button>
                    </div>
                </div>
            `;
        }

        if (this.isFromList) {
            this.updateProgressBar();
        }
    }

    // ============================================
    // تحديث شريط التقدم
    // ============================================

    updateProgressBar() {
        const percent = this.getOverallProgressForSkill(this.currentSkill);
        const progressElements = this.card?.querySelectorAll('.memory-progress-fill, .memory-trainer-progress-bar');
        if (progressElements) {
            progressElements.forEach(el => {
                if (el.classList.contains('memory-progress-fill')) {
                    el.style.width = percent + '%';
                }
            });
        }
        const percentText = this.card?.querySelector('.memory-progress-percent');
        if (percentText) percentText.textContent = percent + '%';
    }

    retryQuestion() {
        this.isAnswered = false;
        this.currentIndex--;
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.trainingQueue.length) {
            this.showMemoryCard();
        } else {
            this.showPhaseComplete();
        }
    }

    // ============================================
    // نهاية المرحلة الأولى (مراجعة الأخطاء)
    // ============================================

    showPhaseComplete() {
        this.clearTimer();
        const wrongCount = this.wrongQuestions.length;
        const overallPercent = this.isFromList ? this.getOverallProgressForSkill(this.currentSkill) : 0;

        if (wrongCount === 0) {
            this.showResults();
            return;
        }

        this.updateCard(`
            <div class="memory-trainer-results phase-complete">
                <div class="memory-trainer-icon">🧠</div>
                <h2>المرحلة الأولى انتهت</h2>
                <div style="margin:8px 0 12px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:12px;font-weight:600;color:#1565C0;min-width:35px;text-align:right;">${overallPercent}%</span>
                    </div>
                </div>
                <div class="memory-trainer-stats" style="margin:6px 0 10px 0;padding:4px 0;">
                    <div class="stat-item"><span class="stat-label">المحاولات</span><span class="stat-value" style="font-size:16px;">${this.attempts}</span></div>
                    <div class="stat-item"><span class="stat-label">الإجابات الصحيحة</span><span class="stat-value" style="font-size:16px;">${this.correctAttempts}</span></div>
                </div>
                <p class="memory-trainer-hint" style="font-size:13px;">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.startReview()">مراجعة ${wrongCount} سؤال →</button>
            </div>
        `);
    }

    startReview() {
        this.isReviewMode = true;
        this.trainingQueue = [...this.wrongQuestions];
        this.currentIndex = 0;
        this.totalQuestions = this.trainingQueue.length;
        this.wrongQuestions = [];
        this.showMemoryCard();
    }

    // ============================================
    // النهاية النهائية
    // ============================================

    showResults() {
        const isFromList = this.isFromList;
        const skill = this.currentSkill;
        const examId = this.currentExamId || 1;
        const examPercent = this.getExamProgress(skill, examId);
        const overallPercent = this.getOverallProgressForSkill(skill);
        const stagePercent = this.getStageProgressForSkill(skill);

        let html = '';

        if (isFromList) {
            let currentStage = 1, totalStages = 1, isLastStage = false;
            if (window.getCurrentStage && window.getTotalStages) {
                currentStage = window.getCurrentStage(skill);
                totalStages = window.getTotalStages(skill);
                isLastStage = (currentStage >= totalStages);
            } else {
                const combinedKey = `_${skill}_combinedData`;
                if (window[combinedKey]) {
                    const data = window[combinedKey];
                    currentStage = data.currentStage || 1;
                    totalStages = data.totalStages || 1;
                    isLastStage = data.isLastStage || (currentStage >= totalStages);
                }
            }

            let totalQuestionsInStage = this.totalQuestions || 0;
            const combinedKey = `_${skill}_combinedData`;
            if (window[combinedKey]) {
                totalQuestionsInStage = window[combinedKey].totalQuestions || totalQuestionsInStage;
            }

            if (isLastStage) {
                html = `
                    <div class="memory-trainer-results final">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🏆</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">لقد أكملت ${skill} بالكامل</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تهانينا! لقد أنهيت جميع المراحل بنجاح.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${overallPercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للقائمة</button>
                    </div>
                `;
            } else {
                html = `
                    <div class="memory-trainer-results final">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🎉</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">أحسنت، لقد أنهيت المرحلة ${currentStage}</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تم تثبيت ${totalQuestionsInStage} نص.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${stagePercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${stagePercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close(); if (typeof window.goToNextStage === 'function') window.goToNextStage('${skill}');" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">➡ متابعة المرحلة ${currentStage + 1}</button>
                    </div>
                `;
            }
        } else {
            const examLabel = this.examType === 'matching' ? `امتحان ${this.currentExamId} (Lesen 1)` : `امتحان ${this.currentExamId}`;
            html = `
                <div class="memory-trainer-results final">
                    <div style="font-size:28px;text-align:center;margin-bottom:4px;">🧩</div>
                    <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">اكتمل الاستدعاء</h2>
                    <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">لقد أنهيت تدريب ${examLabel}.</p>
                    <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${examPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${examPercent}%</span>
                        </div>
                    </div>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للامتحان</button>
                </div>
            `;
        }

        this.updateCard(html);
    }

    // ============================================
    // دوال مساعدة وإغلاق
    // ============================================

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    showNotAvailable(message = "هذه الميزة غير متوفرة لهذا الامتحان.") {
        this.updateCard(`
            <div class="memory-trainer-intro">
                <h2>ℹ️ غير متوفرة</h2>
                <p>${message}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">فهمت</button>
            </div>
        `);
    }

    close() {
        this.clearTimer();
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        this.card = null;
        this.isCardReady = false;
        this.questions = [];
        this.allQuestions = [];
        this.sharedOptions = [];
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;
        this.currentExamId = 1;
        this.examType = 'hoeren';
    }
}

// ============================================
// تهيئة المتغير العام
// ============================================

window.memoryTrainer = new MemoryTrainer();

// ✅ دالة بدء التدريب من امتحان فردي (تُستدعى من زر 🧠 داخل الامتحان)
window.startMemoryTrainerForExam = (skill) => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill || window.currentSkill || 'hoeren1';
        window.memoryTrainer.currentExamId = window.currentExamId || 1;
        window.memoryTrainer.start('single');
    }
};

// ✅ دالة بدء التدريب من القائمة (تُستدعى من زر 🧠 في قائمة الامتحانات)
window.startMemoryTrainerFromList = (skill = 'hoeren1') => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill;
        window.memoryTrainer.start('list');
    }
};

// ✅ للتوافق مع الإصدارات القديمة
window.startMemoryTrainer = window.startMemoryTrainerForExam;

console.log('🧠 Memory Trainer V4 (يدعم Hören و Lesen 1 - UI محسّن) تم تحميله');
