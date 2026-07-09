// ============================================
// MEMORY TRAINER V3 - النسخة النهائية مع نظام Level (0-5)
// باستخدام معرفات ثابتة للجمل (skill_examId_index)
// ============================================

class MemoryTrainer {
    constructor() {
        // البيانات الأساسية
        this.questions = [];
        this.memoryHighlights = [];
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;
        
        // السؤال الحالي
        this.currentCorrectText = '';
        this.currentOptions = [];
        this.currentColor = 0;
        this.hasHighlight = false;
        this.currentQuestionIndex = 0;
        this.currentQuestionObj = null;
        
        // الإحصائيات
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;
        
        // العناصر - سيتم إنشاؤها مرة واحدة فقط
        this.overlay = null;
        this.card = null;
        this.timer = null;
        this.isAnswered = false;
        this.isCardReady = false;
        this._documentClickHandler = null; // ✅ مستمع حدث المستند
        
        // الإعدادات
        this.TOTAL_OPTIONS = 3;
        this.WRONG_OPTIONS = 2;
        
        // مفتاح تخزين المستويات
        this.LEVELS_KEY = 'memory_levels';
        this.TOTAL_HOEREN1_SENTENCES = 108;
        this.MAX_LEVEL = 5;
        this.LEVEL_STEP = 20;
        
        // المتغيرات الخاصة بالامتحان الحالي
        this.currentSkill = 'hoeren1';
        this.currentExamId = 1;
    }

    // ============================================
    // START - نقطة الدخول الرئيسية
    // ============================================

    start(mode = 'single') {
        console.log("🧠 بدء Memory Trainer V3 (سريع)...");
        
        let examData = null;
        this.isFromList = false;
        
        if (mode === 'list' && window._hoeren1CombinedData) {
            examData = window._hoeren1CombinedData;
            this.isFromList = true;
            this.currentSkill = 'hoeren1';
            this.currentExamId = null;
            console.log('📚 تدريب من قائمة Hören 1 (بيانات مدمجة)');
        } else {
            examData = window.currentExamData || window._currentExamData;
            this.currentSkill = window.currentSkill || 'hoeren1';
            this.currentExamId = window.currentExamId || 1;
            console.log('📖 تدريب من امتحان واحد');
        }
        
        if (!examData) {
            this.showNotAvailable("لا توجد بيانات امتحان");
            return;
        }

        this.questions = examData.questions || [];
        this.memoryHighlights = examData.memoryHighlights || [];

        if (this.questions.length === 0) {
            this.showNotAvailable("لا توجد أسئلة في هذا الامتحان");
            return;
        }

        // تصفية الجمل الصحيحة فقط
        const correctQuestions = this.questions
            .map((q, idx) => ({ ...q, index: idx }))
            .filter(q => q.correct === true);

        if (correctQuestions.length === 0) {
            this.showNotAvailable("لا توجد إجابات صحيحة في هذا الامتحان");
            return;
        }

        this.buildTrainingQueue(correctQuestions);

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
    // بناء Overlay و Card (مرة واحدة)
    // ============================================

    createOverlay() {
        if (this.overlay) {
            this.overlay.remove();
        }
        this.overlay = document.createElement('div');
        this.overlay.className = 'memory-trainer-overlay';
        document.body.appendChild(this.overlay);

        // ✅ مستمع الحدث على المستند كله
        this._documentClickHandler = (e) => {
            if (!this.overlay) return;
            
            // الحصول على حاوية البطاقة
            const cardContainer = this.overlay.querySelector('.memory-trainer-card-container');
            // إذا لم توجد بطاقة، أو كان النقر خارجها
            if (!cardContainer || !cardContainer.contains(e.target)) {
                // النقر خارج البطاقة
                if (this.currentIndex >= this.trainingQueue.length && this.isActive) {
                    const hasWrong = this.wrongQuestions.length > 0;
                    if (hasWrong) {
                        this.showPhaseComplete();
                    } else {
                        this.showResults();
                    }
                    return;
                }
                this.close();
            }
        };
        document.addEventListener('click', this._documentClickHandler);
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
        if (!this.isCardReady || !this.card) {
            this.createCardStructure();
        }
        this.card.innerHTML = html;
    }

    // ============================================
    // بناء قائمة التدريب
    // ============================================

    buildTrainingQueue(correctQuestions) {
        const baseQueue = correctQuestions.map(q => q.index);
        const repeatCount = Math.ceil(correctQuestions.length / 2);
        const shuffled = this.shuffleArray([...correctQuestions]);
        const repeatIndices = [];
        for (let i = 0; i < Math.min(repeatCount, shuffled.length); i++) {
            repeatIndices.push(shuffled[i].index);
        }
        this.trainingQueue = this.shuffleArray([...baseQueue, ...repeatIndices]);
        console.log(`📊 قائمة التدريب: ${this.trainingQueue.length} جملة`);
    }

    // ============================================
    // نظام المستويات (Levels) - باستخدام معرفات ثابتة
    // ============================================

    // بناء معرف الجملة الثابت
    buildSentenceId(skill, examId, questionIndex) {
        if (window.buildSentenceId) {
            return window.buildSentenceId(skill, examId, questionIndex);
        }
        return `${skill}_exam${examId}_${questionIndex}`;
    }

    // جلب المستوى الحالي لجملة
    getSentenceLevel(sentenceId) {
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        return data[sentenceId] !== undefined ? data[sentenceId] : 0;
    }

    // حفظ مستوى جملة
    setSentenceLevel(sentenceId, level) {
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let newLevel = Math.max(0, Math.min(this.MAX_LEVEL, level));
        data[sentenceId] = newLevel;
        localStorage.setItem(this.LEVELS_KEY, JSON.stringify(data));
    }

    // زيادة المستوى
    increaseLevel(sentenceId) {
        const current = this.getSentenceLevel(sentenceId);
        if (current < this.MAX_LEVEL) {
            this.setSentenceLevel(sentenceId, current + 1);
        }
    }

    // إنقاص المستوى
    decreaseLevel(sentenceId) {
        const current = this.getSentenceLevel(sentenceId);
        if (current > 0) {
            this.setSentenceLevel(sentenceId, current - 1);
        }
    }

    // ============================================
    // دوال حساب النسب (تستخدم الدوال العامة من exams.js إن وجدت)
    // ============================================

    // نسبة الامتحان الحالي
    getExamProgress(skill, examId) {
        if (window.getExamProgress) {
            return window.getExamProgress(skill, examId);
        }
        // Fallback - حساب يدوي باستخدام المفاتيح
        const prefix = `${skill}_exam${examId}_`;
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let totalLevels = 0;
        let count = 0;
        for (const key in data) {
            if (key.startsWith(prefix)) {
                totalLevels += data[key];
                count++;
            }
        }
        if (count === 0) return 0;
        const maxTotal = count * this.MAX_LEVEL;
        const percent = maxTotal > 0 ? (totalLevels / maxTotal) * 100 : 0;
        return Math.min(100, Math.round(percent));
    }

    // نسبة Hören 1 العامة
    getOverallProgress() {
        if (window.getOverallProgress) {
            return window.getOverallProgress();
        }
        // Fallback
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let totalLevels = 0;
        let count = 0;
        for (const key in data) {
            if (key.startsWith('hoeren1_exam')) {
                totalLevels += data[key];
                count++;
            }
        }
        const maxTotal = this.TOTAL_HOEREN1_SENTENCES * this.MAX_LEVEL;
        const percent = maxTotal > 0 ? (totalLevels / maxTotal) * 100 : 0;
        return Math.min(100, Math.round(percent));
    }

    // ============================================
    // توليد الخيارات (باستخدام الجمل الخاطئة من نفس الامتحان أولاً)
    // ============================================

    generateOptions(correctText, currentIndex) {
        const options = [correctText];
        let added = 0;
        const WRONG_NEEDED = this.WRONG_OPTIONS;

        // ✅ 1. محاولة من نفس الامتحان (جمل خاطئة)
        const wrongFromSameExam = this.questions
            .filter(q => q.correct === false)
            .map(q => q.text);
        
        let shuffledSame = this.shuffleArray([...wrongFromSameExam]);
        for (let i = 0; i < shuffledSame.length && added < WRONG_NEEDED; i++) {
            const candidate = shuffledSame[i];
            if (!options.includes(candidate) && candidate !== correctText) {
                options.push(candidate);
                added++;
            }
        }

        // ✅ 2. إذا لم نكمل، نأخذ من بيانات Hören 1 العامة (wrongQuestions)
        if (added < WRONG_NEEDED && window._hoeren1CombinedData) {
            const allWrong = window._hoeren1CombinedData.wrongQuestions || [];
            const shuffledAll = this.shuffleArray([...allWrong]);
            for (let i = 0; i < shuffledAll.length && added < WRONG_NEEDED; i++) {
                const candidate = shuffledAll[i];
                if (!options.includes(candidate) && candidate !== correctText) {
                    options.push(candidate);
                    added++;
                }
            }
        }

        // ✅ 3. إذا لم نكمل بعد، نأخذ من allQuestions (كحل أخير)
        if (added < WRONG_NEEDED && window._hoeren1CombinedData) {
            const allQuestions = window._hoeren1CombinedData.allQuestions || [];
            const allTexts = allQuestions
                .filter(q => q.correct === false)
                .map(q => q.text);
            const shuffledAll = this.shuffleArray([...allTexts]);
            for (let i = 0; i < shuffledAll.length && added < WRONG_NEEDED; i++) {
                const candidate = shuffledAll[i];
                if (!options.includes(candidate) && candidate !== correctText) {
                    options.push(candidate);
                    added++;
                }
            }
        }

        // ✅ 4. في حال نضب المصادر (نادر جداً)
        while (options.length < this.TOTAL_OPTIONS) {
            console.warn('⚠️ لم يتم العثور على جمل خاطئة كافية، نضيف جملة وهمية');
            options.push(`جملة ${options.length + 1}`);
        }

        return this.shuffleArray(options);
    }

    // ============================================
    // استخراج الألوان (باستخدام المعرف الثابت)
    // ============================================

    // الحصول على لون الجملة من المعرف الثابت
    getColorBySentenceId(sentenceId) {
        if (window.getColorBySentenceId) {
            return window.getColorBySentenceId(sentenceId);
        }
        // Fallback: البحث في memoryHighlights
        // (هذا لن يعمل مع المعرف الثابت، لذا الأفضل استخدام window.getColorBySentenceId)
        return 0;
    }

    // استخراج الألوان بالطريقة القديمة (للتوافق مع بيانات الامتحانات الفردية)
    findHighlightForText(text) {
        if (!this.memoryHighlights || this.memoryHighlights.length === 0) return null;
        const trimmed = text.trim();
        for (const h of this.memoryHighlights) {
            if (h.parts && h.parts.length > 0) {
                const part = h.parts.join(' ').trim();
                if (part === trimmed) return h;
            }
        }
        return null;
    }

    getColorForText(text) {
        // أولاً نحاول من المعرف الثابت إذا كان متاحاً
        // ولكننا لا نملك هنا sentenceId، لذلك نستخدم الطريقة القديمة
        const highlight = this.findHighlightForText(text);
        if (highlight && highlight.color !== undefined) {
            return { color: highlight.color, hasHighlight: true };
        }
        return { color: 0, hasHighlight: false };
    }

    // ============================================
    // شاشات البداية
    // ============================================

    showIntroCardSingle() {
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء ذكي</h2>
                <p style="font-size: 14px; color: #334155; margin: 6px 0 2px 0;">
                    سنعيد الآن تثبيت المعلومات بطريقة يستخدمها أبطال الذاكرة.
                </p>
                <p style="font-size: 13px; color: #64748B; margin: 2px 0 14px 0;">
                    سترى الإجابة مرة واحدة فقط، ثم سنطلب منك استرجاعها بنفسك.
                </p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ
                </button>
            </div>
        `);
    }

    showIntroCardList() {
        const percent = this.getOverallProgress();
        const total = this.trainingQueue.length;
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء متقدم</h2>
                <p style="font-size: 14px; color: #334155; margin: 4px 0 2px 0;">
                    تدريب استدعاء متقدم لجميع امتحانات Hören 1.
                </p>
                <p style="font-size: 13px; color: #64748B; margin: 2px 0;">
                    سيختار النظام الجمل التي تحتاج إلى مراجعة بناءً على أدائك السابق.
                </p>
                <p style="font-size: 13px; color: #64748B; margin: 2px 0 12px 0;">
                    كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار الجمل المناسبة لك.
                </p>
                
                <div style="margin: 10px 0 14px 0; background: #FFFFFF; border: 1px solid #E8EEF5; border-radius: 6px; padding: 6px 10px; text-align: left;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1; height: 5px; background: #e9eef5; border-radius: 6px; overflow: hidden;">
                            <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, #1565C0, #38bdf8); border-radius: 6px; transition: width 0.3s ease;"></div>
                        </div>
                        <span style="font-size: 13px; font-weight: 600; color: #1565C0; min-width: 40px; text-align: right;">${percent}%</span>
                    </div>
                </div>
                
                <p style="font-size: 12px; color: #94A3B8; margin: 4px 0 12px 0;">${total} جملة للتدريب</p>
                
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ التدريب
                </button>
            </div>
        `);
    }

    // ============================================
    // عرض البطاقات (تحديث المحتوى فقط)
    // ============================================

    showMemoryCard() {
        this.clearTimer();
        this.isAnswered = false;
        
        if (this.currentIndex >= this.trainingQueue.length) {
            this.showPhaseComplete();
            return;
        }

        const qIndex = this.trainingQueue[this.currentIndex];
        const question = this.questions[qIndex];
        const textToShow = question.text;
        const colorInfo = this.getColorForText(textToShow);
        
        this.currentCorrectText = textToShow;
        this.currentColor = colorInfo.color;
        this.hasHighlight = colorInfo.hasHighlight;
        this.currentQuestionIndex = qIndex;
        this.currentQuestionObj = question;
        
        this.updateCard(`
            <div class="memory-trainer-card">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.trainingQueue.length}</span>
                    <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-hint">🌿 سأطلب منك هذه الجملة بعد قليل.</p>
                    <div class="memory-trainer-answer">
                        ${this.hasHighlight ? 
                            `<span class="memory-highlight color${this.currentColor}">${textToShow}</span>` :
                            `<span>${textToShow}</span>`
                        }
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">
                    أنا جاهز
                </button>
            </div>
        `);
    }

    readyToRecall() {
        this.clearTimer();
        this.currentOptions = this.generateOptions(
            this.currentCorrectText,
            this.currentQuestionIndex
        );
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
    // التصحيح (مع نظام Level والمعرف الثابت)
    // ============================================

    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.attempts++;
        
        const selectedText = this.currentOptions[selectedIndex];
        const isCorrect = (selectedText === this.currentCorrectText);
        
        // بناء المعرف الثابت للجملة
        const skill = this.currentSkill || 'hoeren1';
        const examId = this.currentExamId || 1;
        const questionIndex = this.currentQuestionIndex;
        const sentenceId = this.buildSentenceId(skill, examId, questionIndex);
        
        const allOptions = document.querySelectorAll('.memory-trainer-option');
        const feedback = document.getElementById('memory-trainer-feedback');
        
        allOptions.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'default';
        });
        
        if (isCorrect) {
            this.correctAttempts++;
            this.increaseLevel(sentenceId);
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
            
            feedback.innerHTML = `
                <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">
                    التالي →
                </button>
            `;
        } else {
            this.decreaseLevel(sentenceId);
            if (!this.wrongQuestions.includes(this.currentQuestionIndex)) {
                this.wrongQuestions.push(this.currentQuestionIndex);
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
                <div style="display: flex; gap: 10px; justify-content: center; margin-top: 8px;">
                    <button class="memory-trainer-btn secondary small" onclick="window.memoryTrainer.retryQuestion()">
                        🔄 إعادة المحاولة
                    </button>
                    <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">
                        التالي →
                    </button>
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
        const percent = this.getOverallProgress();
        const progressElements = this.card?.querySelectorAll('.memory-progress-fill, .memory-trainer-progress-bar');
        if (progressElements) {
            progressElements.forEach(el => {
                if (el.classList.contains('memory-progress-fill')) {
                    el.style.width = percent + '%';
                }
            });
        }
        const percentText = this.card?.querySelector('.memory-progress-percent');
        if (percentText) {
            percentText.textContent = percent + '%';
        }
    }

    retryQuestion() {
        this.isAnswered = false;
        this.currentIndex--;
        this.nextQuestion();
    }

    // ============================================
    // الانتقال (سريع)
    // ============================================

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.trainingQueue.length) {
            this.showMemoryCard();
        } else {
            this.showPhaseComplete();
        }
    }

    // ============================================
    // نهاية المرحلة الأولى
    // ============================================

    showPhaseComplete() {
        this.clearTimer();
        
        const total = this.totalQuestions;
        const correct = this.correctAttempts;
        const overallPercent = this.isFromList ? this.getOverallProgress() : 0;
        const wrongCount = this.wrongQuestions.length;
        
        if (wrongCount === 0) {
            this.showResults();
            return;
        }
        
        this.updateCard(`
            <div class="memory-trainer-results phase-complete">
                <div class="memory-trainer-icon">🧠</div>
                <h2>المرحلة الأولى انتهت</h2>
                
                <div style="margin: 8px 0 12px 0; background: #FFFFFF; border: 1px solid #E8EEF5; border-radius: 6px; padding: 6px 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1; height: 5px; background: #e9eef5; border-radius: 6px; overflow: hidden;">
                            <div style="width: ${overallPercent}%; height: 100%; background: linear-gradient(90deg, #1565C0, #38bdf8); border-radius: 6px; transition: width 0.3s ease;"></div>
                        </div>
                        <span style="font-size: 12px; font-weight: 600; color: #1565C0; min-width: 35px; text-align: right;">${overallPercent}%</span>
                    </div>
                </div>
                
                <div class="memory-trainer-stats" style="margin: 6px 0 10px 0; padding: 4px 0;">
                    <div class="stat-item">
                        <span class="stat-label">المحاولات</span>
                        <span class="stat-value" style="font-size: 16px;">${this.attempts}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">الإجابات الصحيحة</span>
                        <span class="stat-value" style="font-size: 16px;">${this.correctAttempts}</span>
                    </div>
                </div>
                
                <p class="memory-trainer-hint" style="font-size: 13px;">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.startReview()">
                    مراجعة ${wrongCount} سؤال →
                </button>
            </div>
        `);
    }

    // ============================================
    // مراجعة الأخطاء
    // ============================================

    startReview() {
        this.isReviewMode = true;
        this.trainingQueue = [...this.wrongQuestions];
        this.currentIndex = 0;
        this.totalQuestions = this.trainingQueue.length;
        this.wrongQuestions = [];
        this.showMemoryCard();
    }

    // ============================================
    // النهاية النهائية - التصميم الجديد
    // ============================================

    showResults() {
        let examPercent = 0;
        let overallPercent = 0;
        
        if (this.isFromList) {
            // من القائمة: نعرض النسبة الكلية لـ Hören 1
            overallPercent = this.getOverallProgress();
            examPercent = overallPercent;
        } else {
            // من امتحان واحد: نعرض نسبة هذا الامتحان
            const skill = this.currentSkill || 'hoeren1';
            const examId = this.currentExamId || 1;
            examPercent = this.getExamProgress(skill, examId);
            overallPercent = this.getOverallProgress();
        }
        
        this.updateCard(`
            <div class="memory-trainer-results final">
                <div class="memory-trainer-icon" style="font-size: 28px; display: block; margin-bottom: 4px;">🧩</div>
                <h2 style="color: #1565C0; font-size: 18px; font-weight: 600; margin-bottom: 4px;">اكتمل الاستدعاء</h2>
                <p style="font-size: 14px; color: #64748B; margin-bottom: 14px; font-weight: 400;">
                    أنت تبني ذاكرة قوية يومًا بعد يوم.
                </p>
                
                <div style="margin: 0 0 14px 0; background: #FFFFFF; border: 1px solid #E8EEF5; border-radius: 6px; padding: 6px 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1; height: 5px; background: #e9eef5; border-radius: 6px; overflow: hidden;">
                            <div style="width: ${examPercent}%; height: 100%; background: linear-gradient(90deg, #1565C0, #38bdf8); border-radius: 6px; transition: width 0.3s ease;"></div>
                        </div>
                        <span style="font-size: 13px; font-weight: 600; color: #1565C0; min-width: 40px; text-align: right;">${examPercent}%</span>
                    </div>
                </div>
                
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()" style="
                    padding: 8px 20px;
                    border: none;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-top: 6px;
                    background: #1565C0;
                    color: white;
                    box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                ">
                    ➡️ العودة للامتحان
                </button>
            </div>
        `);
    }

    // ============================================
    // دوال مساعدة
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
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                    فهمت
                </button>
            </div>
        `);
    }

    close() {
        this.clearTimer();
        
        // ✅ إزالة مستمع الحدث
        if (this._documentClickHandler) {
            document.removeEventListener('click', this._documentClickHandler);
            this._documentClickHandler = null;
        }
        
        // ✅ إذا كانت آخر جملة ولم يتم عرض النتائج بعد
        const isLastQuestion = this.currentIndex >= this.trainingQueue.length;
        const hasWrongQuestions = this.wrongQuestions.length > 0;
        
        if (this.isActive && isLastQuestion && !this.isReviewMode) {
            if (hasWrongQuestions) {
                this.showPhaseComplete();
                return;
            } else {
                this.showResults();
                return;
            }
        }
        
        // ✅ الإغلاق الطبيعي
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        this.card = null;
        this.isCardReady = false;
        this.questions = [];
        this.memoryHighlights = [];
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;
        this.currentSkill = 'hoeren1';
        this.currentExamId = 1;
    }
}

// ============================================
// تهيئة المتغير العام
// ============================================

window.memoryTrainer = new MemoryTrainer();

window.startMemoryTrainer = () => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start('single');
    }
};

window.startMemoryTrainerFromList = () => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start('list');
    }
};

console.log('🧠 Memory Trainer V3 (النسخة النهائية مع معرفات ثابتة) تم تحميله');
