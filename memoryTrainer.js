// ============================================
// MEMORY TRAINER - التصميم النهائي
// ============================================

/**
 * Memory Trainer Engine
 * 
 * يعمل مع أي امتحان يحتوي على:
 * - questions (مصدر الجمل)
 * - memoryHighlights (مصدر الألوان - اختياري)
 * - memoryTrainer.enabled: true (لتفعيل الميزة)
 * 
 * قابل للتوسع ليعمل مع مجموعة امتحانات كاملة.
 */

class MemoryTrainer {
    constructor() {
        // الحالة
        this.questions = [];
        this.memoryHighlights = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.currentCorrectText = '';
        this.currentOptions = [];
        this.currentColor = 0;
        this.hasHighlight = false;
        this.overlay = null;
        this.timer = null;
        
        // الإعدادات
        this.TOTAL_OPTIONS = 4;
        this.WRONG_OPTIONS = 3;
        this.AUTO_ADVANCE_DELAY = 800; // 0.8 ثانية
    }

    // ============================================
    // START - نقطة الدخول الرئيسية
    // ============================================

    start() {
        console.log("🧠 بدء Memory Trainer...");
        
        const examData = window.currentExamData || window._currentExamData;
        if (!examData) {
            this.showNotAvailable("لا توجد بيانات امتحان");
            return;
        }

        // التحقق من تفعيل الميزة
        if (!examData.memoryTrainer || examData.memoryTrainer.enabled !== true) {
            this.showNotAvailable("هذه الميزة غير مفعلة لهذا الامتحان");
            return;
        }

        // استخراج البيانات
        this.questions = examData.questions || [];
        this.memoryHighlights = examData.memoryHighlights || [];

        if (this.questions.length === 0) {
            this.showNotAvailable("لا توجد أسئلة في هذا الامتحان");
            return;
        }

        // تحقق من وجود 4 أسئلة على الأقل
        if (this.questions.length < 4) {
            this.showNotAvailable("يجب أن يكون هناك 4 أسئلة على الأقل للتدريب");
            return;
        }

        this.isActive = true;
        this.currentIndex = 0;
        this.showIntroCard();
    }

    // ============================================
    // استخراج البيانات
    // ============================================

    /**
     * البحث عن Highlight للجملة المحددة
     */
    findHighlightForText(text) {
        if (!this.memoryHighlights || this.memoryHighlights.length === 0) {
            return null;
        }

        const trimmedText = text.trim();
        for (const highlight of this.memoryHighlights) {
            if (highlight.parts && highlight.parts.length > 0) {
                const partText = highlight.parts.join(' ').trim();
                if (partText === trimmedText) {
                    return highlight;
                }
            }
        }
        return null;
    }

    /**
     * الحصول على لون الجملة
     */
    getColorForText(text) {
        const highlight = this.findHighlightForText(text);
        if (highlight && highlight.color !== undefined) {
            return {
                color: highlight.color,
                hasHighlight: true
            };
        }
        return {
            color: 0,
            hasHighlight: false
        };
    }

    /**
     * توليد الخيارات (1 صحيح + 3 خاطئة)
     */
    generateOptions(correctText, currentIndex) {
        const options = [correctText];
        
        // جمع جميع النصوص الأخرى
        const otherTexts = this.questions
            .filter((_, idx) => idx !== currentIndex)
            .map(q => q.text);
        
        // خلط النصوص الأخرى
        const shuffled = this.shuffleArray([...otherTexts]);
        
        // أخذ 3 خيارات مختلفة
        let added = 0;
        for (let i = 0; i < shuffled.length && added < this.WRONG_OPTIONS; i++) {
            const text = shuffled[i];
            if (!options.includes(text)) {
                options.push(text);
                added++;
            }
        }
        
        // في حال عدم وجود جمل كافية (نادراً ما يحدث)
        while (options.length < this.TOTAL_OPTIONS) {
            const randomText = `جملة ${options.length + 1}`;
            if (!options.includes(randomText)) {
                options.push(randomText);
            }
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
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <div class="memory-trainer-icon">🧠</div>
                <h2>تدريب الذاكرة</h2>
                <p>${this.questions.length} جملة للتدريب</p>
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
        
        if (this.currentIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentIndex];
        const textToShow = question.text;
        const colorInfo = this.getColorForText(textToShow);
        
        this.currentCorrectText = textToShow;
        this.currentColor = colorInfo.color;
        this.hasHighlight = colorInfo.hasHighlight;
        
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-card">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.questions.length}</span>
                    <span class="memory-trainer-focus">🧠 ركز</span>
                </div>
                <div class="memory-trainer-content">
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
        
        // توليد الخيارات
        this.currentOptions = this.generateOptions(
            this.currentCorrectText,
            this.currentIndex
        );
        
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-recall">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.questions.length}</span>
                    <span class="memory-trainer-focus">🧠 استرجع</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question">اختر الجملة الصحيحة</p>
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
    // التصحيح الصامت (Silent Retrieval)
    // ============================================

    checkAnswer(selectedIndex) {
        const selectedText = this.currentOptions[selectedIndex];
        const isCorrect = (selectedText === this.currentCorrectText);
        
        const allOptions = document.querySelectorAll('.memory-trainer-option');
        const feedback = document.getElementById('memory-trainer-feedback');
        
        // تعطيل الأزرار
        allOptions.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.7';
            btn.style.cursor = 'default';
        });
        
        // تلوين صامت
        if (isCorrect) {
            // الصحيح -> أخضر
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
        } else {
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
        }
        
        // زر التالي فقط (يظهر فوراً)
        feedback.innerHTML = `
            <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()">
                التالي →
            </button>
        `;
    }

    // ============================================
    // الانتقال
    // ============================================

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            this.showMemoryCard();
        } else {
            this.showResults();
        }
    }

    // ============================================
    // النهاية
    // ============================================

    showResults() {
        this.removeOverlay();
        this.clearTimer();
        
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-results">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
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
        
        // إغلاق عند الضغط على الخلفية
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

    showNotAvailable(message = "هذه الميزة غير متوفرة لهذا الامتحان.") {
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
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
        this.currentIndex = 0;
        this.isActive = false;
    }

    // ============================================
    // API للاستخدام المستقبلي (Memory Mode للجزء الكامل)
    // ============================================

    /**
     * تحميل بيانات من مصدر خارجي (مجموعة امتحانات)
     */
    loadQuestions(questions, memoryHighlights = []) {
        this.questions = questions;
        this.memoryHighlights = memoryHighlights;
        this.currentIndex = 0;
        
        if (this.questions.length >= 4) {
            this.isActive = true;
            this.showIntroCard();
        } else {
            this.showNotAvailable("يجب أن يكون هناك 4 أسئلة على الأقل للتدريب");
        }
    }

    /**
     * تحميل من مجموعة امتحانات (للاستخدام المستقبلي)
     */
    loadFromExams(exams) {
        let allQuestions = [];
        let allHighlights = [];
        
        exams.forEach(exam => {
            if (exam.questions) {
                allQuestions = allQuestions.concat(exam.questions);
            }
            if (exam.memoryHighlights) {
                allHighlights = allHighlights.concat(exam.memoryHighlights);
            }
        });
        
        this.loadQuestions(allQuestions, allHighlights);
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

console.log('🧠 Memory Trainer تم تحميله');
