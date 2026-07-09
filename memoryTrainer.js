// ============================================
// MEMORY TRAINER V4 - الإصدار النهائي المتوافق مع نظام المراحل المتعددة
// يدعم Hören 1,2,3 (ويمكن إضافة المزيد) مع معرفات ثابتة
// ============================================

class MemoryTrainer {
    constructor() {
        // البيانات الأساسية
        this.questions = [];
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;

        // السؤال الحالي
        this.currentCorrectText = '';
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
        this.currentSkill = 'hoeren1'; // المهارة الحالية (يتم تعيينها عند البدء)
    }

    // ============================================
    // START - نقطة الدخول
    // ============================================

    start(mode = 'single') {
        console.log(`🧠 بدء Memory Trainer V4 (المهارة: ${this.currentSkill})...`);

        let examData = null;
        this.isFromList = false;

        if (mode === 'list') {
            // ✅ استخدام البيانات المخزنة حسب المهارة الحالية
            const combinedKey = `_${this.currentSkill}_combinedData`;
            if (window[combinedKey]) {
                examData = window[combinedKey];
                this.isFromList = true;
                console.log(`📚 تدريب من قائمة ${this.currentSkill} (بيانات مدمجة)`);
            } else {
                // محاولة تحميل البيانات أولاً
                if (typeof window.loadStageExams === 'function') {
                    window.loadStageExams(this.currentSkill).then(() => {
                        if (window[combinedKey]) {
                            this.start(mode);
                        } else {
                            this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد، حاول مرة أخرى.`);
                        }
                    });
                    return;
                } else {
                    this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد، حاول مرة أخرى.`);
                    return;
                }
            }
        } else {
            // وضع امتحان فردي
            examData = window.currentExamData || window._currentExamData;
            this.currentSkill = window.currentSkill || 'hoeren1';
            console.log('📖 تدريب من امتحان واحد');
        }

        if (!examData) {
            this.showNotAvailable("لا توجد بيانات امتحان");
            return;
        }

        // تحويل البيانات إلى بنية موحدة (كائنات تحتوي على examId و questionIndex)
        let rawQuestions = examData.questions || [];
        if (!this.isFromList) {
            // وضع امتحان فردي: نضيف examId و questionIndex
            rawQuestions = rawQuestions.map((q, idx) => ({
                text: q.text,
                correct: q.correct,
                examId: window.currentExamId || 1,
                questionIndex: idx,
                originalQuestion: q
            }));
        }
        // في وضع القائمة، البيانات جاهزة بالفعل (من exams.js)

        // استخراج الجمل الصحيحة فقط للتدريب
        this.questions = rawQuestions.filter(q => q.correct === true);

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
        console.log(`📊 قائمة التدريب: ${this.trainingQueue.length} جملة`);
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
    // دوال حساب النسب (تستخدم دوال exams.js إن وجدت)
    // ============================================

    // نسبة امتحان واحد
    getExamProgress(skill, examId) {
        if (window.getExamProgress) return window.getExamProgress(skill, examId);
        // Fallback محلي
        const prefix = `${skill}_exam${examId}_`;
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let totalLevels = 0, count = 0;
        for (const key in data) {
            if (key.startsWith(prefix)) { totalLevels += data[key]; count++; }
        }
        if (count === 0) return 0;
        return Math.min(100, Math.round((totalLevels / (count * this.MAX_LEVEL)) * 100));
    }

    // النسبة العامة للجزء (تعتمد على المراحل)
    getOverallProgressForSkill(skill) {
        if (window.getOverallProgress) {
            // الدالة الجديدة تأخذ skill كوسيط
            if (window.getOverallProgress.length === 1) {
                return window.getOverallProgress(skill);
            } else {
                // للتوافق مع الإصدارات القديمة (بدون وسيط)
                return window.getOverallProgress();
            }
        }
        // Fallback محلي (يعمل فقط لـ hoeren1)
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let totalLevels = 0, count = 0;
        for (const key in data) {
            if (key.startsWith(`${skill}_exam`)) {
                totalLevels += data[key];
                count++;
            }
        }
        // نستخدم إجمالي الجمل المحفوظة، ولكننا لا نعرف العدد الإجمالي هنا، لذا نرجع 0
        return 0;
    }

    // نسبة المرحلة الحالية
    getStageProgressForSkill(skill) {
        if (window.getStageProgress) {
            return window.getStageProgress(skill);
        }
        // Fallback: نحاول الحصول على examIds من البيانات المحملة
        const combinedKey = `_${skill}_combinedData`;
        if (window[combinedKey]) {
            const data = window[combinedKey];
            const examIds = data.examIds || [];
            if (examIds.length === 0) return 0;
            let totalLevels = 0, count = 0;
            const storage = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
            for (const examId of examIds) {
                const prefix = `${skill}_exam${examId}_`;
                for (const key in storage) {
                    if (key.startsWith(prefix)) { totalLevels += storage[key]; count++; }
                }
            }
            if (count === 0) return 0;
            return Math.min(100, Math.round((totalLevels / (count * this.MAX_LEVEL)) * 100));
        }
        return 0;
    }

    // ============================================
    // توليد الخيارات (من الجمل الخاطئة)
    // ============================================

    generateOptions(correctText, currentQuestionObj) {
        const options = [correctText];
        let added = 0;
        const WRONG_NEEDED = this.WRONG_OPTIONS;

        // 1. من نفس الامتحان (جمل خاطئة)
        const wrongFromSameExam = this.questions
            .filter(q => q.correct === false || q.correct === undefined)
            .map(q => q.text);
        let shuffledSame = this.shuffleArray([...wrongFromSameExam]);
        for (let i = 0; i < shuffledSame.length && added < WRONG_NEEDED; i++) {
            const candidate = shuffledSame[i];
            if (!options.includes(candidate) && candidate !== correctText) {
                options.push(candidate);
                added++;
            }
        }

        // 2. من البيانات العامة (إذا كانت متوفرة)
        const combinedKey = `_${this.currentSkill}_combinedData`;
        if (added < WRONG_NEEDED && window[combinedKey]) {
            const allWrong = window[combinedKey].wrongQuestions || [];
            const shuffledAll = this.shuffleArray([...allWrong]);
            for (let i = 0; i < shuffledAll.length && added < WRONG_NEEDED; i++) {
                const candidate = shuffledAll[i].text || shuffledAll[i];
                if (!options.includes(candidate) && candidate !== correctText) {
                    options.push(candidate);
                    added++;
                }
            }
        }

        // 3. ملء فراغات (نادراً ما يحدث)
        while (options.length < this.TOTAL_OPTIONS) {
            options.push(`جملة ${options.length + 1}`);
        }
        return this.shuffleArray(options);
    }

    // ============================================
    // شاشات البداية
    // ============================================

    showIntroCardSingle() {
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء ذكي</h2>
                <p style="font-size:14px;color:#334155;margin:6px 0 2px 0;">سنعيد الآن تثبيت المعلومات بطريقة يستخدمها أبطال الذاكرة.</p>
                <p style="font-size:13px;color:#64748B;margin:2px 0 14px 0;">سترى الإجابة مرة واحدة فقط، ثم سنطلب منك استرجاعها بنفسك.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ</button>
            </div>
        `);
    }

    showIntroCardList() {
        // استخدام الدالة العامة للحصول على النسبة
        const percent = this.getOverallProgressForSkill(this.currentSkill);
        const total = this.trainingQueue.length;
        // الحصول على معلومات المرحلة
        let currentStage = 1, totalStages = 1;
        if (window.getCurrentStage && window.getTotalStages) {
            currentStage = window.getCurrentStage(this.currentSkill);
            totalStages = window.getTotalStages(this.currentSkill);
        }
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء متقدم</h2>
                <p style="font-size:14px;color:#334155;margin:4px 0 2px 0;">تدريب استدعاء متقدم لجميع امتحانات ${this.currentSkill}.</p>
                <p style="font-size:13px;color:#64748B;margin:2px 0 12px 0;">كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار الجمل المناسبة لك.</p>
                <div style="margin:10px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;text-align:left;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${percent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;transition:width 0.3s ease;"></div>
                        </div>
                        <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${percent}%</span>
                    </div>
                </div>
                <p style="font-size:12px;color:#94A3B8;margin:4px 0 4px 0;">${total} جملة للتدريب</p>
                <p style="font-size:11px;color:#94A3B8;margin:0 0 12px 0;">المرحلة ${currentStage} / ${totalStages}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ التدريب</button>
            </div>
        `);
    }

    // ============================================
    // عرض البطاقات
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

        this.updateCard(`
            <div class="memory-trainer-card">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.trainingQueue.length}</span>
                    <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-hint">🌿 سأطلب منك هذه الجملة بعد قليل.</p>
                    <div class="memory-trainer-answer">
                        <span>${textToShow}</span>
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">أنا جاهز</button>
            </div>
        `);
    }

    readyToRecall() {
        this.clearTimer();
        this.currentOptions = this.generateOptions(this.currentCorrectText, this.currentQuestionObj);
        this.updateCard(`
            <div class="memory-trainer-recall">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.trainingQueue.length}</span>
                    <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question">ما هي الجملة التي رأيتها قبل قليل؟</p>
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
    // التصحيح (مع تحديث المستوى)
    // ============================================

    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.attempts++;

        const selectedText = this.currentOptions[selectedIndex];
        const isCorrect = (selectedText === this.currentCorrectText);

        const skill = this.currentSkill;
        const examId = this.currentExamId;
        const qIndex = this.currentQuestionIndex;
        const sentenceId = this.buildSentenceId(skill, examId, qIndex);

        const allOptions = document.querySelectorAll('.memory-trainer-option');
        const feedback = document.getElementById('memory-trainer-feedback');

        allOptions.forEach(btn => { btn.disabled = true; btn.style.opacity = '0.7'; btn.style.cursor = 'default'; });

        if (isCorrect) {
            this.correctAttempts++;
            this.increaseLevel(sentenceId);
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
            feedback.innerHTML = `<button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">التالي →</button>`;
        } else {
            this.decreaseLevel(sentenceId);
            if (!this.wrongQuestions.includes(this.currentQuestionObj)) {
                this.wrongQuestions.push(this.currentQuestionObj);
            }
            allOptions[selectedIndex].style.borderColor = '#e67e22';
            allOptions[selectedIndex].style.backgroundColor = '#fef0e0';
            allOptions.forEach((btn, idx) => {
                if (this.currentOptions[idx] === this.currentCorrectText) {
                    btn.style.borderColor = '#28a745';
                    btn.style.backgroundColor = '#d4edda';
                }
            });
            feedback.innerHTML = `
                <div style="display:flex;gap:10px;justify-content:center;margin-top:8px;">
                    <button class="memory-trainer-btn secondary small" onclick="window.memoryTrainer.retryQuestion()">🔄 إعادة المحاولة</button>
                    <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">التالي →</button>
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
                            <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;transition:width 0.3s ease;"></div>
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
    // النهاية النهائية (مع دعم المراحل والامتحان الفردي)
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
            // وضع المراحل (القائمة)
            // الحصول على معلومات المرحلة من الدوال العامة
            let currentStage = 1, totalStages = 1, isLastStage = false;
            if (window.getCurrentStage && window.getTotalStages) {
                currentStage = window.getCurrentStage(skill);
                totalStages = window.getTotalStages(skill);
                isLastStage = (currentStage >= totalStages);
            } else {
                // Fallback: محاولة من البيانات المحملة
                const combinedKey = `_${skill}_combinedData`;
                if (window[combinedKey]) {
                    const data = window[combinedKey];
                    currentStage = data.currentStage || 1;
                    totalStages = data.totalStages || 1;
                    isLastStage = data.isLastStage || (currentStage >= totalStages);
                }
            }

            // عدد الجمل في هذه المرحلة (من البيانات المحملة)
            let totalQuestionsInStage = this.totalQuestions || 0;
            const combinedKey = `_${skill}_combinedData`;
            if (window[combinedKey]) {
                totalQuestionsInStage = window[combinedKey].totalQuestions || totalQuestionsInStage;
            }

            if (isLastStage) {
                // 🏆 نهاية الجزء بالكامل
                html = `
                    <div class="memory-trainer-results final">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🏆</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">لقد أكملت ${skill} بالكامل</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تهانينا! لقد أنهيت جميع المراحل بنجاح.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;transition:width 0.3s ease;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${overallPercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للقائمة</button>
                    </div>
                `;
            } else {
                // 🎉 نهاية مرحلة (غير الأخيرة)
                html = `
                    <div class="memory-trainer-results final">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🎉</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">أحسنت، لقد أنهيت المرحلة ${currentStage}</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تم تثبيت ${totalQuestionsInStage} جملة.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${stagePercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;transition:width 0.3s ease;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${stagePercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close(); if (typeof window.goToNextStage === 'function') window.goToNextStage('${skill}');" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">➡ متابعة المرحلة ${currentStage + 1}</button>
                    </div>
                `;
            }
        } else {
            // وضع امتحان واحد (نسبة الامتحان فقط)
            html = `
                <div class="memory-trainer-results final">
                    <div style="font-size:28px;text-align:center;margin-bottom:4px;">🧩</div>
                    <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">اكتمل الاستدعاء</h2>
                    <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">لقد أنهيت تدريب هذه الجمل.</p>
                    <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${examPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;transition:width 0.3s ease;"></div>
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
        // لا نقوم بإعادة تعيين currentSkill، قد نستخدمها لاحقاً
    }
}

// ============================================
// تهيئة المتغير العام
// ============================================

window.memoryTrainer = new MemoryTrainer();

// دالة بدء التدريب من امتحان فردي
window.startMemoryTrainer = () => {
    if (window.memoryTrainer) window.memoryTrainer.start('single');
};

// دالة بدء التدريب من القائمة (تستقبل المهارة)
window.startMemoryTrainerFromList = (skill = 'hoeren1') => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill;
        window.memoryTrainer.start('list');
    }
};

console.log('🧠 Memory Trainer V4 (متوافق مع نظام المراحل المتعددة) تم تحميله');
