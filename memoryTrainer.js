// ============================================
// MEMORY TRAINER - Hören Teil 1
// ============================================

class MemoryTrainer {
    constructor() {
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.wrongQuestions = [];
        this.colorIndex = 0;
        
        // رسائل النجاح
        this.successMessages = [
            "🧠 أحسنت... استرجعتها بنفسك.",
            "🎯 هذا بالضبط ما أردناه.",
            "🔥 ممتاز، انتقلت من القراءة إلى التذكر.",
            "👏 ذاكرة قوية!",
            "✨ جميل، لم تعتمد على النظر.",
            "⭐ ذاكرتك التقطتها بسرعة."
        ];
        
        // رسائل التشجيع عند الخطأ
        this.retryMessages = [
            "🧠 كانت قريبة... حاول مرة أخرى.",
            "💭 خذ ثانية وفكر.",
            "🔄 ليس بعد... دع ذاكرتك تعمل مرة أخرى.",
            "📝 تذكر أين رأيتها قبل قليل.",
            "🎯 اقتربت. جرب مرة أخرى دون استعجال.",
            "⏳ أعطِ ذاكرتك فرصة."
        ];
    }

    start() {
        // التحقق من وجود memoryHighlights
        if (!this.hasMemoryHighlights()) {
            this.showNotAvailable();
            return;
        }

        // جمع الأسئلة التي تحتوي على memoryHighlights
        this.collectQuestions();
        this.showIntroCard();
    }

    hasMemoryHighlights() {
        // التحقق من وجود memoryHighlights في الامتحان الحالي
        return window.examData && 
               window.examData.memoryHighlights && 
               window.examData.memoryHighlights.length > 0;
    }

    collectQuestions() {
        // استخراج الأسئلة مع memoryHighlights
        this.currentQuestions = window.examData.questions.filter(
            q => q.memoryHighlights && q.memoryHighlights.length > 0
        );
    }

    showIntroCard() {
        // المرحلة 1: بطاقة الترحيب
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧠</div>
                <h2>تدريب الذاكرة</h2>
                <p>سنعيد الآن تثبيت المعلومات بطريقة يستخدمها أبطال الذاكرة.</p>
                <p class="memory-trainer-hint">سترى الإجابة مرة واحدة فقط، ثم سنطلب منك استرجاعها بنفسك.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    showMemoryCard() {
        // المرحلة 2: عرض المعلومة
        this.removeOverlay();
        const question = this.currentQuestions[this.currentIndex];
        const highlight = question.memoryHighlights[0];
        const colorIndex = highlight.color || 0;
        
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-card">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">
                        ${this.currentIndex + 1} / ${this.currentQuestions.length}
                    </span>
                    <span class="memory-trainer-focus">🧠 ركز جيدًا</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-instruction">هذه هي الإجابة الصحيحة لهذا السؤال.</p>
                    <div class="memory-trainer-answer">
                        <span class="memory-highlight color${colorIndex}">
                            ${highlight.parts.join(' ')}
                        </span>
                    </div>
                    <p class="memory-trainer-hint">اقرأها مرة واحدة فقط وحاول أن ترسمها في ذهنك.</p>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">
                    أنا جاهز
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    readyToRecall() {
        // المرحلة 3: اختبار الاسترجاع
        this.removeOverlay();
        const question = this.currentQuestions[this.currentIndex];
        const options = this.generateOptions(question);
        
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-recall">
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">
                        ${this.currentIndex + 1} / ${this.currentQuestions.length}
                    </span>
                    <span class="memory-trainer-focus">🧠 هل ما زالت في ذاكرتك؟</span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question">أي جملة رأيتها قبل قليل؟</p>
                    <div class="memory-trainer-options">
                        ${options.map((opt, idx) => `
                            <button class="memory-trainer-option" onclick="window.memoryTrainer.checkAnswer(${idx})">
                                ${String.fromCharCode(65 + idx)}. ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div id="memory-trainer-feedback"></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    generateOptions(question) {
        // توليد 3 اختيارات من بيانات الامتحان
        const options = [question.memoryHighlights[0].parts.join(' ')];
        
        // أخذ اختيارات عشوائية من أسئلة أخرى
        const otherQuestions = this.currentQuestions.filter(
            q => q.id !== question.id
        );
        
        for (let i = 0; i < 2; i++) {
            const randomQ = otherQuestions[Math.floor(Math.random() * otherQuestions.length)];
            if (randomQ && randomQ.memoryHighlights && randomQ.memoryHighlights.length > 0) {
                options.push(randomQ.memoryHighlights[0].parts.join(' '));
            }
        }
        
        // ترتيب عشوائي
        return this.shuffleArray(options);
    }

    checkAnswer(selectedIndex) {
        const question = this.currentQuestions[this.currentIndex];
        const correctAnswer = question.memoryHighlights[0].parts.join(' ');
        const selectedOption = document.querySelectorAll('.memory-trainer-option')[selectedIndex];
        const selectedText = selectedOption.textContent.substring(3); // إزالة "A. " أو "B. "
        
        const feedback = document.getElementById('memory-trainer-feedback');
        this.attempts++;
        
        if (selectedText === correctAnswer) {
            this.correctAttempts++;
            const message = this.successMessages[Math.floor(Math.random() * this.successMessages.length)];
            feedback.innerHTML = `
                <div class="memory-trainer-success">
                    <span class="memory-trainer-icon">✅</span>
                    <p>${message}</p>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.nextQuestion()">
                    التالي →
                </button>
            `;
        } else {
            if (this.wrongQuestions.includes(question.id)) {
                // المحاولة الثانية - عرض الحل
                this.showSolution(question);
            } else {
                this.wrongQuestions.push(question.id);
                const message = this.retryMessages[Math.floor(Math.random() * this.retryMessages.length)];
                feedback.innerHTML = `
                    <div class="memory-trainer-retry">
                        <span class="memory-trainer-icon">🔄</span>
                        <p>${message}</p>
                    </div>
                    <button class="memory-trainer-btn secondary" onclick="window.memoryTrainer.readyToRecall()">
                        أريد رؤيتها مرة أخرى
                    </button>
                `;
            }
        }
    }

    showSolution(question) {
        const highlight = question.memoryHighlights[0];
        const colorIndex = highlight.color || 0;
        
        const feedback = document.getElementById('memory-trainer-feedback');
        feedback.innerHTML = `
            <div class="memory-trainer-solution">
                <span class="memory-trainer-icon">🧠</span>
                <p>تذكير سريع</p>
                <span class="memory-highlight color${colorIndex}">
                    ${highlight.parts.join(' ')}
                </span>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">
                    أعد المحاولة
                </button>
            </div>
        `;
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.currentQuestions.length) {
            this.showMemoryCard();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.removeOverlay();
        const wrongCount = this.wrongQuestions.length;
        const totalQuestions = this.currentQuestions.length;
        const successRate = Math.round((this.correctAttempts / this.attempts) * 100);
        
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-results">
                <div class="memory-trainer-icon">🎉</div>
                <h2>${wrongCount === 0 ? 'تم تثبيت جميع الإجابات!' : 'المرحلة الأولى انتهت.'}</h2>
                <div class="memory-trainer-stats">
                    <div class="memory-trainer-stat">
                        <span class="stat-label">المحاولات</span>
                        <span class="stat-value">${this.attempts}</span>
                    </div>
                    <div class="memory-trainer-stat">
                        <span class="stat-label">الإجابات الصحيحة</span>
                        <span class="stat-value">${this.correctAttempts}</span>
                    </div>
                    <div class="memory-trainer-stat">
                        <span class="stat-label">نسبة النجاح</span>
                        <span class="stat-value">${successRate}%</span>
                    </div>
                </div>
                ${wrongCount > 0 ? `
                    <p class="memory-trainer-hint">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.reviewWrongQuestions()">
                        مراجعة ${wrongCount} سؤال
                    </button>
                ` : `
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                        🎯 ممتاز!
                    </button>
                `}
            </div>
        `;
        document.body.appendChild(overlay);
    }

    reviewWrongQuestions() {
        // إعادة الأسئلة الخاطئة فقط
        this.currentQuestions = this.currentQuestions.filter(
            q => this.wrongQuestions.includes(q.id)
        );
        this.currentIndex = 0;
        this.wrongQuestions = [];
        this.showMemoryCard();
    }

    // دوال مساعدة
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'memory-trainer-overlay';
        return overlay;
    }

    removeOverlay() {
        const overlay = document.querySelector('.memory-trainer-overlay');
        if (overlay) overlay.remove();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    showNotAvailable() {
        // عرض رسالة الميزة غير متوفرة
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">ℹ️</div>
                <h2>الميزة غير متوفرة</h2>
                <p>هذه الميزة غير متوفرة لهذا الامتحان.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                    فهمت
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    close() {
        this.removeOverlay();
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.wrongQuestions = [];
    }
}

// تهيئة المتغير العام
window.memoryTrainer = new MemoryTrainer();
window.startMemoryTrainer = () => window.memoryTrainer.start();
