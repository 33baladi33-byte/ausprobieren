// ============================================
// MEMORY TRAINER - تدريب الذاكرة (Hören Teil 1)
// ============================================

class MemoryTrainer {
    constructor() {
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.wrongQuestions = [];
        this.isActive = false;
        this.originalQuestions = [];
        
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
        console.log("🧠 بدء Memory Trainer...");
        
        // التحقق من وجود memoryHighlights في الامتحان الحالي
        if (!this.hasMemoryHighlights()) {
            this.showNotAvailable();
            return;
        }

        // جمع الأسئلة التي تحتوي على memoryHighlights
        this.collectQuestions();
        this.isActive = true;
        this.showIntroCard();
    }

    hasMemoryHighlights() {
        const examData = window.currentExamData || window._currentExamData;
        if (!examData) return false;
        return examData.memoryHighlights && examData.memoryHighlights.length > 0;
    }

    collectQuestions() {
        const examData = window.currentExamData || window._currentExamData;
        if (!examData) return;
        
        // حفظ الأسئلة الأصلية
        this.originalQuestions = [...examData.questions];
        
        // استخراج الأسئلة مع memoryHighlights
        this.currentQuestions = examData.questions.filter(
            q => q.memoryHighlights && q.memoryHighlights.length > 0
        );
        
        console.log(`✅ تم جمع ${this.currentQuestions.length} سؤال للتدريب`);
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
        
        if (this.currentIndex >= this.currentQuestions.length) {
            this.showResults();
            return;
        }
        
        const question = this.currentQuestions[this.currentIndex];
        const highlight = question.memoryHighlights[0];
        const colorIndex = highlight.color || 0;
        const textToShow = highlight.parts.join(' ');
        
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
                            ${textToShow}
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
        const correctText = question.memoryHighlights[0].parts.join(' ');
        const options = this.generateOptions(question, correctText);
        
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
                            <button class="memory-trainer-option" data-index="${idx}" onclick="window.memoryTrainer.checkAnswer(${idx})">
                                ${String.fromCharCode(65 + idx)}. ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div id="memory-trainer-feedback"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // حفظ الإجابة الصحيحة للاستخدام في checkAnswer
        this._currentCorrectAnswer = correctText;
        this._currentOptions = options;
    }

    generateOptions(question, correctText) {
        // توليد 3 اختيارات من بيانات الامتحان
        const options = [correctText];
        
        // أخذ اختيارات عشوائية من أسئلة أخرى
        const otherQuestions = this.currentQuestions.filter(
            q => q.id !== question.id
        );
        
        // خلط الأسئلة الأخرى للحصول على اختيارات مختلفة
        const shuffledOthers = this.shuffleArray([...otherQuestions]);
        
        for (let i = 0; i < Math.min(2, shuffledOthers.length); i++) {
            const q = shuffledOthers[i];
            if (q && q.memoryHighlights && q.memoryHighlights.length > 0) {
                const text = q.memoryHighlights[0].parts.join(' ');
                if (!options.includes(text)) {
                    options.push(text);
                }
            }
        }
        
        // إذا لم نحصل على 3 اختيارات، نملأ باختيارات إضافية
        while (options.length < 3) {
            const randomText = `نص إضافي ${options.length + 1}`;
            if (!options.includes(randomText)) {
                options.push(randomText);
            }
        }
        
        // ترتيب عشوائي
        return this.shuffleArray(options);
    }

    checkAnswer(selectedIndex) {
        const selectedText = this._currentOptions[selectedIndex];
        const correctText = this._currentCorrectAnswer;
        const isCorrect = (selectedText === correctText);
        
        const feedback = document.getElementById('memory-trainer-feedback');
        this.attempts++;
        
        // تعطيل الأزرار لمنع الضغط المتكرر
        document.querySelectorAll('.memory-trainer-option').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
            btn.style.cursor = 'default';
        });
        
        if (isCorrect) {
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
            
            // تمييز الإجابة الصحيحة
            document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.borderColor = '#28a745';
            document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.backgroundColor = '#d4edda';
            
        } else {
            // التحقق من وجود السؤال في قائمة الأخطاء
            const questionId = this.currentQuestions[this.currentIndex].id;
            const isFirstAttempt = !this.wrongQuestions.includes(questionId);
            
            if (isFirstAttempt) {
                // المحاولة الأولى - تشجيع على إعادة المحاولة
                this.wrongQuestions.push(questionId);
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
                
                // تمييز الإجابة الخاطئة
                document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.borderColor = '#e67e22';
                document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.backgroundColor = '#fef0e0';
                
            } else {
                // المحاولة الثانية - عرض الحل
                this.showSolution();
            }
        }
    }

    showSolution() {
        const question = this.currentQuestions[this.currentIndex];
        const highlight = question.memoryHighlights[0];
        const colorIndex = highlight.color || 0;
        const correctText = highlight.parts.join(' ');
        
        const feedback = document.getElementById('memory-trainer-feedback');
        feedback.innerHTML = `
            <div class="memory-trainer-solution">
                <span class="memory-trainer-icon">🧠</span>
                <p>تذكير سريع</p>
                <div class="memory-trainer-answer" style="margin: 12px 0; padding: 16px;">
                    <span class="memory-highlight color${colorIndex}">
                        ${correctText}
                    </span>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.nextQuestion()">
                    متابعة →
                </button>
            </div>
        `;
        
        // تمييز الإجابة الصحيحة في الخيارات
        document.querySelectorAll('.memory-trainer-option').forEach((btn, idx) => {
            if (this._currentOptions[idx] === correctText) {
                btn.style.borderColor = '#28a745';
                btn.style.backgroundColor = '#d4edda';
            }
        });
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
        const successRate = totalQuestions > 0 ? Math.round(((totalQuestions - wrongCount) / totalQuestions) * 100) : 0;
        
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-results">
                <div class="memory-trainer-icon">${wrongCount === 0 ? '🎉' : '🧠'}</div>
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
        const wrongIds = this.wrongQuestions;
        this.currentQuestions = this.originalQuestions.filter(
            q => wrongIds.includes(q.id)
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
        this.isActive = false;
    }
}

// تهيئة المتغير العام
window.memoryTrainer = new MemoryTrainer();
window.startMemoryTrainer = () => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start();
    }
};

console.log('🧠 Memory Trainer تم تحميله بنجاح');
