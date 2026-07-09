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
        // ✅ جعل البطاقة أعرض وأكثر استطالة
        this.card.style.cssText = `
            width: 100%;
            max-width: 700px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: memorySlideUp 0.15s ease;
            margin: 0 auto;
            padding: 0 16px;
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
                <p style="font-size:13px;color:#64748B;margin:2px 0 14px 0;">سترى النص مرة واحدة، ثم سنطلب منك اختيار العنوان الصحيح (Lesen 1).</p>
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
    // عرض البطاقات (تدعم Hören و Lesen 1) - محسّن لـ Lesen 1
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

        let displayContent = '';
        if (this.examType === 'matching') {
            // ✅ تحسين عرض النص لـ Lesen 1
            displayContent = `
                <div style="
                    font-size: 16px;
                    line-height: 1.9;
                    font-weight: 500;
                    text-align: right;
                    max-height: 350px;
                    overflow-y: auto;
                    padding: 16px 20px;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid #e8ecf0;
                    color: #1a202c;
                    direction: rtl;
                ">
                    ${textToShow}
                </div>
            `;
        } else {
            displayContent = `<span>${textToShow}</span>`;
        }

        // ✅ هيكل البطاقة المحسّن لـ Lesen 1
        this.updateCard(`
            <div class="memory-trainer-card" style="
                max-width: 700px;
                width: 100%;
                background: white;
                border-radius: 20px;
                padding: 24px 28px 28px 28px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                position: relative;
            ">
                <div class="memory-trainer-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                ">
                    <span class="memory-trainer-progress" style="
                        font-size: 14px;
                        font-weight: 600;
                        color: #1565C0;
                        background: #eef6ff;
                        padding: 4px 14px;
                        border-radius: 20px;
                    ">
                        ${this.currentIndex + 1}/${this.trainingQueue.length}
                    </span>
                    <span class="memory-trainer-focus" style="
                        font-size: 13px;
                        color: #64748B;
                    ">
                        🍃 خذ وقتك
                    </span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-hint" style="
                        font-size: 15px;
                        color: #334155;
                        margin: 0 0 16px 0;
                        font-weight: 500;
                        text-align: center;
                    ">
                        ${this.examType === 'matching' 
                            ? '📖 اقرأ النص جيداً، ثم اختر العنوان المناسب له.' 
                            : '🌿 سأطلب منك هذه الجملة بعد قليل.'}
                    </p>
                    <div class="memory-trainer-answer" style="margin-bottom: 20px;">
                        ${displayContent}
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                    display: block;
                    width: 100%;
                    padding: 14px 20px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #1565C0;
                    color: white;
                    box-shadow: 0 2px 8px rgba(21,101,192,0.25);
                    margin-top: 4px;
                ">
                    أنا جاهز
                </button>
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

        // ✅ عرض الخيارات بشكل محسّن
        this.updateCard(`
            <div class="memory-trainer-recall" style="
                max-width: 700px;
                width: 100%;
                background: white;
                border-radius: 20px;
                padding: 24px 28px 28px 28px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.12);
            ">
                <div class="memory-trainer-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                ">
                    <span class="memory-trainer-progress" style="
                        font-size: 14px;
                        font-weight: 600;
                        color: #1565C0;
                        background: #eef6ff;
                        padding: 4px 14px;
                        border-radius: 20px;
                    ">
                        ${this.currentIndex + 1}/${this.trainingQueue.length}
                    </span>
                    <span class="memory-trainer-focus" style="
                        font-size: 13px;
                        color: #64748B;
                    ">
                        🍃 خذ وقتك
                    </span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question" style="
                        font-size: 16px;
                        font-weight: 600;
                        color: #1a202c;
                        text-align: center;
                        margin: 0 0 20px 0;
                    ">
                        ${this.examType === 'matching' 
                            ? 'اختر العنوان المناسب للنص الذي قرأته:' 
                            : 'ما هي الجملة التي رأيتها قبل قليل؟'}
                    </p>
                    <div class="memory-trainer-options" style="
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        margin-bottom: 16px;
                    ">
                        ${this.currentOptions.map((opt, idx) => `
                            <button class="memory-trainer-option" data-index="${idx}" onclick="window.memoryTrainer.checkAnswer(${idx})" style="
                                display: flex;
                                align-items: center;
                                padding: 14px 18px;
                                background: #f8fafc;
                                border: 2px solid #e2e8f0;
                                border-radius: 12px;
                                font-size: 15px;
                                font-weight: 500;
                                line-height: 1.5;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                text-align: right;
                                color: #1a202c;
                                width: 100%;
                                font-family: inherit;
                            "
                            onmouseover="this.style.borderColor='#90caf9'; this.style.background='#f0f7ff'"
                            onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='#f8fafc'"
                            >
                                <span style="
                                    display: inline-block;
                                    min-width: 28px;
                                    font-weight: 700;
                                    color: #1565C0;
                                    margin-left: 10px;
                                ">
                                    ${String.fromCharCode(65 + idx)}.
                                </span>
                                <span style="flex:1; text-align:right;">${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div id="memory-trainer-feedback"></div>
            </div>
        `);
    }

    // ============================================
    // التصحيح (مع تحديث المستوى) - محسّن لعرض الإجابة الصحيحة
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

        allOptions.forEach(btn => { 
            btn.disabled = true; 
            btn.style.opacity = '0.7'; 
            btn.style.cursor = 'default';
            btn.onmouseover = null;
            btn.onmouseout = null;
        });

        // ✅ عرض الإجابة الصحيحة بشكل أنيق
        let correctText = '';
        if (this.examType === 'matching') {
            const correctIndex = this.currentQuestionObj.correct;
            correctText = this.sharedOptions[correctIndex];
        } else {
            correctText = this.currentCorrectText;
        }

        let feedbackHtml = '';
        if (isCorrect) {
            this.correctAttempts++;
            this.increaseLevel(sentenceId);
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
            feedbackHtml = `
                <div style="
                    margin-top: 16px;
                    padding: 14px 18px;
                    background: #e6f7e6;
                    border-radius: 12px;
                    border-right: 4px solid #28a745;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 8px;
                ">
                    <span style="color: #1a5a1a; font-weight: 500; font-size: 15px;">
                        ✅ <span style="font-weight: 600;">${correctText}</span>
                    </span>
                    <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="
                        padding: 8px 18px;
                        border: none;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        background: #28a745;
                        color: white;
                        transition: all 0.2s ease;
                    ">
                        التالي →
                    </button>
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
            feedbackHtml = `
                <div style="
                    margin-top: 16px;
                    padding: 14px 18px;
                    background: #fff5f0;
                    border-radius: 12px;
                    border-right: 4px solid #e67e22;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                ">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="color: #b85a00; font-weight: 500; font-size: 15px;">
                            ✅ الإجابة الصحيحة: <span style="font-weight: 600; color: #1a5a1a;">${correctText}</span>
                        </span>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-start; flex-wrap: wrap;">
                        <button class="memory-trainer-btn secondary small" onclick="window.memoryTrainer.retryQuestion()" style="
                            padding: 8px 18px;
                            border: 2px solid #e67e22;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            background: white;
                            color: #e67e22;
                            transition: all 0.2s ease;
                        ">
                            🔄 إعادة المحاولة
                        </button>
                        <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="
                            padding: 8px 18px;
                            border: none;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            background: #1565C0;
                            color: white;
                            transition: all 0.2s ease;
                        ">
                            التالي →
                        </button>
                    </div>
                </div>
            `;
        }

        // ✅ تحديث الـ feedback مع الاحتفاظ بالخيارات
        const recallContainer = document.querySelector('.memory-trainer-recall');
        if (recallContainer) {
            const existingFeedback = recallContainer.querySelector('#memory-trainer-feedback');
            if (existingFeedback) {
                existingFeedback.innerHTML = feedbackHtml;
            }
        } else {
            // Fallback: إذا لم نجد الحاوية، نضيف الـ feedback في نهاية الصفحة
            const feedbackContainer = document.getElementById('memory-trainer-feedback');
            if (feedbackContainer) {
                feedbackContainer.innerHTML = feedbackHtml;
            }
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
            <div class="memory-trainer-results phase-complete" style="
                max-width: 700px;
                width: 100%;
                background: white;
                border-radius: 20px;
                padding: 28px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                text-align: center;
            ">
                <div class="memory-trainer-icon" style="font-size:48px; margin-bottom:8px;">🧠</div>
                <h2 style="color:#1565C0; font-size:20px; font-weight:600; margin-bottom:12px;">المرحلة الأولى انتهت</h2>
                <div style="margin:12px 0 16px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:8px;padding:8px 12px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:6px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${overallPercent}%</span>
                    </div>
                </div>
                <div class="memory-trainer-stats" style="display:flex;justify-content:center;gap:30px;margin:8px 0 12px 0;">
                    <div><span style="color:#64748B;">المحاولات</span><br><span style="font-size:20px;font-weight:700;color:#1a202c;">${this.attempts}</span></div>
                    <div><span style="color:#64748B;">الإجابات الصحيحة</span><br><span style="font-size:20px;font-weight:700;color:#28a745;">${this.correctAttempts}</span></div>
                </div>
                <p style="font-size:14px;color:#64748B;margin:8px 0 16px 0;">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.startReview()" style="
                    padding:12px 24px;
                    border:none;
                    border-radius:12px;
                    font-size:16px;
                    font-weight:600;
                    cursor:pointer;
                    background:#1565C0;
                    color:white;
                    box-shadow:0 2px 8px rgba(21,101,192,0.25);
                ">
                    مراجعة ${wrongCount} سؤال →
                </button>
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
                    <div class="memory-trainer-results final" style="
                        max-width: 700px;
                        width: 100%;
                        background: white;
                        border-radius: 20px;
                        padding: 28px;
                        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                        text-align: center;
                    ">
                        <div style="font-size:48px;margin-bottom:4px;">🏆</div>
                        <h2 style="color:#1565C0;font-size:20px;font-weight:600;margin-bottom:4px;">لقد أكملت ${skill} بالكامل</h2>
                        <p style="font-size:14px;color:#64748B;margin-bottom:14px;">تهانينا! لقد أنهيت جميع المراحل بنجاح.</p>
                        <div style="margin:0 0 16px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:8px;padding:8px 12px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:6px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;">${overallPercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="
                            padding:12px 24px;
                            border:none;
                            border-radius:12px;
                            font-size:16px;
                            font-weight:600;
                            cursor:pointer;
                            background:#1565C0;
                            color:white;
                            box-shadow:0 2px 8px rgba(21,101,192,0.25);
                            display:inline-block;
                        ">
                            ⬅ العودة للقائمة
                        </button>
                    </div>
                `;
            } else {
                html = `
                    <div class="memory-trainer-results final" style="
                        max-width: 700px;
                        width: 100%;
                        background: white;
                        border-radius: 20px;
                        padding: 28px;
                        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                        text-align: center;
                    ">
                        <div style="font-size:48px;margin-bottom:4px;">🎉</div>
                        <h2 style="color:#1565C0;font-size:20px;font-weight:600;margin-bottom:4px;">أحسنت، لقد أنهيت المرحلة ${currentStage}</h2>
                        <p style="font-size:14px;color:#64748B;margin-bottom:14px;">تم تثبيت ${totalQuestionsInStage} نص.</p>
                        <div style="margin:0 0 16px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:8px;padding:8px 12px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:6px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${stagePercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;">${stagePercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close(); if (typeof window.goToNextStage === 'function') window.goToNextStage('${skill}');" style="
                            padding:12px 24px;
                            border:none;
                            border-radius:12px;
                            font-size:16px;
                            font-weight:600;
                            cursor:pointer;
                            background:#1565C0;
                            color:white;
                            box-shadow:0 2px 8px rgba(21,101,192,0.25);
                            display:inline-block;
                        ">
                            ➡ متابعة المرحلة ${currentStage + 1}
                        </button>
                    </div>
                `;
            }
        } else {
            const examLabel = this.examType === 'matching' ? `امتحان ${this.currentExamId} (Lesen 1)` : `امتحان ${this.currentExamId}`;
            html = `
                <div class="memory-trainer-results final" style="
                    max-width: 700px;
                    width: 100%;
                    background: white;
                    border-radius: 20px;
                    padding: 28px;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                    text-align: center;
                ">
                    <div style="font-size:48px;margin-bottom:4px;">🧩</div>
                    <h2 style="color:#1565C0;font-size:20px;font-weight:600;margin-bottom:4px;">اكتمل الاستدعاء</h2>
                    <p style="font-size:14px;color:#64748B;margin-bottom:14px;">لقد أنهيت تدريب ${examLabel}.</p>
                    <div style="margin:0 0 16px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:8px;padding:8px 12px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:6px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${examPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;">${examPercent}%</span>
                        </div>
                    </div>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="
                        padding:12px 24px;
                        border:none;
                        border-radius:12px;
                        font-size:16px;
                        font-weight:600;
                        cursor:pointer;
                        background:#1565C0;
                        color:white;
                        box-shadow:0 2px 8px rgba(21,101,192,0.25);
                        display:inline-block;
                    ">
                        ⬅ العودة للامتحان
                    </button>
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
            <div class="memory-trainer-intro" style="
                max-width: 700px;
                width: 100%;
                background: white;
                border-radius: 20px;
                padding: 28px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.12);
                text-align: center;
            ">
                <h2 style="color:#1565C0;font-size:20px;">ℹ️ غير متوفرة</h2>
                <p style="color:#64748B;margin:12px 0;">${message}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()" style="
                    padding:12px 24px;
                    border:none;
                    border-radius:12px;
                    font-size:16px;
                    font-weight:600;
                    cursor:pointer;
                    background:#1565C0;
                    color:white;
                    box-shadow:0 2px 8px rgba(21,101,192,0.25);
                ">
                    فهمت
                </button>
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

// ✅ دالة بدء التدريب من امتحان فردي
window.startMemoryTrainerForExam = (skill) => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill || window.currentSkill || 'hoeren1';
        window.memoryTrainer.currentExamId = window.currentExamId || 1;
        window.memoryTrainer.start('single');
    }
};

// ✅ دالة بدء التدريب من القائمة
window.startMemoryTrainerFromList = (skill = 'hoeren1') => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill;
        window.memoryTrainer.start('list');
    }
};

// ✅ للتوافق مع الإصدارات القديمة
window.startMemoryTrainer = window.startMemoryTrainerForExam;

console.log('🧠 Memory Trainer V4 (يدعم Hören و Lesen 1 - UI محسّن) تم تحميله');
