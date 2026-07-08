// ============================================
// MEMORY TRAINER V3 - تحسينات السرعة
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
        
        // السؤال الحالي
        this.currentCorrectText = '';
        this.currentOptions = [];
        this.currentColor = 0;
        this.hasHighlight = false;
        this.currentQuestionIndex = 0;
        
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
        
        // الإعدادات
        this.TOTAL_OPTIONS = 3;
        this.WRONG_OPTIONS = 2;
    }

    // ============================================
    // START - نقطة الدخول الرئيسية (سريع)
    // ============================================

    start() {
        console.log("🧠 بدء Memory Trainer V3 (سريع)...");
        
        const examData = window.currentExamData || window._currentExamData;
        if (!examData) {
            this.showNotAvailable("لا توجد بيانات امتحان");
            return;
        }

        if (!examData.memoryTrainer || examData.memoryTrainer.enabled !== true) {
            this.showNotAvailable("هذه الميزة غير مفعلة لهذا الامتحان");
            return;
        }

        this.questions = examData.questions || [];
        this.memoryHighlights = examData.memoryHighlights || [];

        if (this.questions.length === 0) {
            this.showNotAvailable("لا توجد أسئلة في هذا الامتحان");
            return;
        }

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
        
        // إنشاء الـ Overlay والـ Card مرة واحدة فقط
        this.createOverlay();
        this.createCardStructure();
        
        this.showIntroCard();
    }

    // ============================================
    // بناء الـ Overlay والـ Card (مرة واحدة)
    // ============================================

    createOverlay() {
        if (this.overlay) {
            this.overlay.remove();
        }
        
        this.overlay = document.createElement('div');
        this.overlay.className = 'memory-trainer-overlay';
        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        document.body.appendChild(this.overlay);
    }

    createCardStructure() {
        // حذف البطاقة القديمة إذا وجدت
        const oldCard = this.overlay.querySelector('.memory-trainer-card-container');
        if (oldCard) oldCard.remove();
        
        // إنشاء حاوية البطاقة
        this.card = document.createElement('div');
        this.card.className = 'memory-trainer-card-container';
        this.card.style.cssText = `
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: memorySlideUp 0.2s ease;
        `;
        
        this.overlay.appendChild(this.card);
        this.isCardReady = true;
    }

    updateCard(html) {
        if (!this.isCardReady) {
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
    // استخراج الألوان
    // ============================================

    findHighlightForText(text) {
        if (!this.memoryHighlights || this.memoryHighlights.length === 0) {
            return null;
        }
        const trimmed = text.trim();
        for (const h of this.memoryHighlights) {
            if (h.parts && h.parts.length > 0) {
                const part = h.parts.join(' ').trim();
                if (part === trimmed) {
                    return h;
                }
            }
        }
        return null;
    }

    getColorForText(text) {
        const highlight = this.findHighlightForText(text);
        if (highlight && highlight.color !== undefined) {
            return { color: highlight.color, hasHighlight: true };
        }
        return { color: 0, hasHighlight: false };
    }

    // ============================================
    // توليد الخيارات
    // ============================================

    generateOptions(correctText, currentIndex) {
        const options = [correctText];
        const allTexts = this.questions.map(q => q.text);
        const otherTexts = allTexts.filter(t => t !== correctText);
        const shuffled = this.shuffleArray([...otherTexts]);
        
        let added = 0;
        for (let i = 0; i < shuffled.length && added < this.WRONG_OPTIONS; i++) {
            if (!options.includes(shuffled[i])) {
                options.push(shuffled[i]);
                added++;
            }
        }
        
        while (options.length < this.TOTAL_OPTIONS) {
            options.push(`جملة ${options.length + 1}`);
        }
        
        return this.shuffleArray(options);
    }

    // ============================================
    // عرض البطاقات (تحديث المحتوى فقط)
    // ============================================

    showIntroCard() {
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧠</div>
                <h2>تدريب الذاكرة</h2>
                <p>${this.trainingQueue.length} جملة للتدريب</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ
                </button>
            </div>
        `);
    }

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
    // التصحيح الصامت
    // ============================================

    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.attempts++;
        
        const selectedText = this.currentOptions[selectedIndex];
        const isCorrect = (selectedText === this.currentCorrectText);
        
        const allOptions = document.querySelectorAll('.memory-trainer-option');
        const feedback = document.getElementById('memory-trainer-feedback');
        
        allOptions.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'default';
        });
        
        if (isCorrect) {
            this.correctAttempts++;
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
            
            feedback.innerHTML = `
                <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">
                    التالي →
                </button>
            `;
        } else {
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
        const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
        const wrongCount = this.wrongQuestions.length;
        
        if (wrongCount === 0) {
            this.showResults();
            return;
        }
        
        this.updateCard(`
            <div class="memory-trainer-results phase-complete">
                <div class="memory-trainer-icon">🧠</div>
                <h2>المرحلة الأولى انتهت</h2>
                <div class="memory-trainer-stats">
                    <div class="stat-item">
                        <span class="stat-label">المحاولات</span>
                        <span class="stat-value">${this.attempts}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">الإجابات الصحيحة</span>
                        <span class="stat-value">${this.correctAttempts}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">نسبة النجاح</span>
                        <span class="stat-value">${rate}%</span>
                    </div>
                </div>
                <p class="memory-trainer-hint">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
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
    // النهاية النهائية
    // ============================================

    showResults() {
        this.updateCard(`
            <div class="memory-trainer-results final">
                <div class="memory-trainer-icon">🧠</div>
                <h2>تم تثبيت جميع الجمل</h2>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
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
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;
    }
}

// ============================================
// تهيئة المتغير العام
// ============================================

window.memoryTrainer = new MemoryTrainer();
window.startMemoryTrainer = () => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start();
    }
};

console.log('🧠 Memory Trainer V3 (سريع) تم تحميله');
