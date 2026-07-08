// ============================================
// MEMORY TRAINER V2 - التصميم النهائي
// ============================================

class MemoryTrainer {
    constructor() {
        // البيانات
        this.questions = [];
        this.memoryHighlights = [];
        this.correctAnswers = [];
        this.trainingQueue = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.currentCorrectText = '';
        this.currentOptions = [];
        this.currentColor = 0;
        this.hasHighlight = false;
        this.overlay = null;
        this.timer = null;
        this.isAnswered = false;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.wrongQuestions = [];
        this.totalQuestions = 0;
        this.onCloseCallback = null;
        
        // الإعدادات
        this.TOTAL_OPTIONS = 3;
        this.WRONG_OPTIONS = 2;
        this.AUTO_ADVANCE_DELAY = 800;
    }

    // ============================================
    // START
    // ============================================

    start(examData) {
        console.log("🧠 بدء Memory Trainer V2...");
        
        const data = examData || window.currentExamData || window._currentExamData;
        if (!data) {
            this.showNotAvailable("لا توجد بيانات امتحان");
            return;
        }

        if (!data.memoryTrainer || data.memoryTrainer.enabled !== true) {
            this.showNotAvailable("هذه الميزة غير مفعلة لهذا الامتحان");
            return;
        }

        this.questions = data.questions || [];
        this.memoryHighlights = data.memoryHighlights || [];

        if (this.questions.length === 0) {
            this.showNotAvailable("لا توجد أسئلة في هذا الامتحان");
            return;
        }

        // استخراج الإجابات الصحيحة
        this.correctAnswers = this.questions
            .map((q, idx) => ({ ...q, index: idx }))
            .filter(q => q.correct === true);

        if (this.correctAnswers.length === 0) {
            this.showNotAvailable("لا توجد إجابات صحيحة في هذا الامتحان");
            return;
        }

        // بناء قائمة التدريب (الإجابات الصحيحة + نصفها إعادة)
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
        
        this.showIntroCard();
    }

    // ============================================
    // بناء قائمة التدريب
    // ============================================

    buildTrainingQueue() {
        // 1. جميع الإجابات الصحيحة
        const baseQueue = this.correctAnswers.map(q => q.index);
        
        // 2. إعادة نصف عدد الإجابات الصحيحة (تقريب لأعلى)
        const repeatCount = Math.ceil(this.correctAnswers.length / 2);
        const shuffled = this.shuffleArray([...this.correctAnswers]);
        
        // اختيار عشوائي للإعادة
        const repeatIndices = [];
        for (let i = 0; i < Math.min(repeatCount, shuffled.length); i++) {
            repeatIndices.push(shuffled[i].index);
        }
        
        // خلط القائمة النهائية
        this.trainingQueue = this.shuffleArray([...baseQueue, ...repeatIndices]);
        
        console.log(`📊 قائمة التدريب: ${this.trainingQueue.length} جملة (${baseQueue.length} أساسية + ${repeatIndices.length} إعادة)`);
    }

    // ============================================
    // استخراج الألوان
    // ============================================

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
        const highlight = this.findHighlightForText(text);
        if (highlight && highlight.color !== undefined) {
            return { color: highlight.color, hasHighlight: true };
        }
        return { color: 0, hasHighlight: false };
    }

    // ============================================
    // توليد الخيارات (1 صحيح + 2 خاطئ)
    // ============================================

    generateOptions(correctText, currentIndex) {
        const options = [correctText];
        const allTexts = this.questions.map(q => q.text);
        const otherTexts = allTexts.filter(t => t !== correctText);
        const shuffled = this.shuffleArray([...otherTexts]);
        
        let added = 0;
        for (let i = 0; i < shuffled.length && added < 2; i++) {
            if (!options.includes(shuffled[i])) {
                options.push(shuffled[i]);
                added++;
            }
        }
        
        while (options.length < 3) {
            options.push(`جملة ${options.length + 1}`);
        }
        
        return this.shuffleArray(options);
    }

    // ============================================
    // عرض البطاقات
    // ============================================

    showIntroCard() {
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧠</div>
                <h2>تدريب الذاكرة</h2>
                <p>${this.trainingQueue.length} جملة للتدريب</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ
                </button>
            </div>
        `;
        document.body.appendChild(this.overlay);
    }

    showMemoryCard() {
        this.removeOverlay();
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
        
        this.createOverlay();
        this.overlay.innerHTML = `
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
        `;
        document.body.appendChild(this.overlay);
    }

    readyToRecall() {
        this.removeOverlay();
        this.clearTimer();
        
        this.currentOptions = this.generateOptions(
            this.currentCorrectText,
            this.currentQuestionIndex
        );
        
        this.createOverlay();
        this.overlay.innerHTML = `
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
        `;
        document.body.appendChild(this.overlay);
    }

    // ============================================
    // التصحيح
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
            
            // لا رسائل، فقط زر التالي
            feedback.innerHTML = `
                <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">
                    التالي →
                </button>
            `;
        } else {
            // تسجيل الخطأ
            if (!this.wrongQuestions.includes(this.currentQuestionIndex)) {
                this.wrongQuestions.push(this.currentQuestionIndex);
            }
            
            // المختار -> برتقالي
            allOptions[selectedIndex].style.borderColor = '#e67e22';
            allOptions[selectedIndex].style.backgroundColor = '#fef0e0';
            
            // الصحيح -> أخضر
            allOptions.forEach((btn, idx) => {
                if (this.currentOptions[idx] === this.currentCorrectText) {
                    btn.style.borderColor = '#28a745';
                    btn.style.backgroundColor = '#d4edda';
                }
            });
            
            // زرين: إعادة المحاولة + التالي
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
        // إعادة نفس السؤال
        this.isAnswered = false;
        this.currentIndex--; // ننقص لأن next سيزيد
        this.nextQuestion();
    }

    // ============================================
    // الانتقال
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
        this.removeOverlay();
        this.clearTimer();
        
        const total = this.totalQuestions;
        const correct = this.correctAttempts;
        const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
        const wrongCount = this.wrongQuestions.length;
        
        if (wrongCount === 0) {
            // لا أخطاء -> انتهاء التدريب
            this.showResults();
            return;
        }
        
        // مراجعة الأخطاء
        this.createOverlay();
        this.overlay.innerHTML = `
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
        `;
        document.body.appendChild(this.overlay);
    }

    // ============================================
    // مراجعة الأخطاء
    // ============================================

    startReview() {
        this.removeOverlay();
        this.isReviewMode = true;
        
        // بناء قائمة جديدة من الأسئلة الخاطئة فقط
        this.trainingQueue = [...this.wrongQuestions];
        this.currentIndex = 0;
        this.totalQuestions = this.trainingQueue.length;
        this.wrongQuestions = [];
        
        // لا نعيد تعيين المحاولات والإجابات الصحيحة، نستمر في العد
        this.showMemoryCard();
    }

    // ============================================
    // النهاية النهائية
    // ============================================

    showResults() {
        this.removeOverlay();
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-results final">
                <div class="memory-trainer-icon">🧠</div>
                <h2>تم تثبيت جميع الجمل</h2>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                    ➡️ العودة للامتحان
                </button>
            </div>
        `;
        document.body.appendChild(this.overlay);
    }

    // ============================================
    // دوال مساعدة
    // ============================================

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'memory-trainer-overlay';
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        return this.overlay;
    }

    removeOverlay() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.remove();
        }
        this.overlay = null;
    }

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

    showNotAvailable(message) {
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <h2>ℹ️ غير متوفرة</h2>
                <p>${message}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                    فهمت
                </button>
            </div>
        `;
        document.body.appendChild(this.overlay);
    }

    close() {
        this.clearTimer();
        this.removeOverlay();
        this.questions = [];
        this.memoryHighlights = [];
        this.trainingQueue = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.wrongQuestions = [];
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;
        if (this.onCloseCallback) {
            this.onCloseCallback();
            this.onCloseCallback = null;
        }
    }

    // ============================================
    // API للمستقبل (تدريب Teil كامل)
    // ============================================

    loadFromExams(exams) {
        let allQuestions = [];
        let allHighlights = [];
        let allCorrect = [];
        
        exams.forEach(exam => {
            if (exam.questions) {
                allQuestions = allQuestions.concat(exam.questions);
            }
            if (exam.memoryHighlights) {
                allHighlights = allHighlights.concat(exam.memoryHighlights);
            }
        });
        
        // محاكاة بيانات مؤقتة
        this.questions = allQuestions;
        this.memoryHighlights = allHighlights;
        // ... بناء القائمة حسب الحاجة
    }
}

// ============================================
// تهيئة المتغير العام
// ============================================

window.memoryTrainer = new MemoryTrainer();
window.startMemoryTrainer = (examData) => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start(examData);
    }
};

console.log('🧠 Memory Trainer V2 تم تحميله');
