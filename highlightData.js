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
        this.currentCorrectText = '';
        this.currentOptions = [];
        this.wrongAttempts = 0;
        
        // رسائل النجاح
        this.successMessages = [
            "🧠 أحسنت",
            "🎯 ممتاز",
            "🔥 رائع",
            "👏 ذاكرة قوية",
            "✨ جميل",
            "⭐ استرجعتها بنفسك"
        ];
        
        // رسائل التشجيع عند الخطأ
        this.retryMessages = [
            "🧠 حاول مرة أخرى",
            "💭 فكر ثانية",
            "🔄 ركز",
            "🎯 اقتربت",
            "⏳ لا تستعجل"
        ];
    }

    start() {
        console.log("🧠 بدء Memory Trainer...");
        
        const examData = window.currentExamData || window._currentExamData;
        if (!examData) {
            this.showNotAvailable();
            return;
        }

        if (!examData.memoryHighlights || examData.memoryHighlights.length === 0) {
            this.showNotAvailable();
            return;
        }

        this.collectQuestions(examData);
        
        if (this.currentQuestions.length === 0) {
            this.showNotAvailable();
            return;
        }
        
        this.isActive = true;
        this.showIntroCard();
    }

    collectQuestions(examData) {
        this.originalQuestions = examData.questions.map((q, index) => ({
            ...q,
            originalIndex: index
        }));
        
        // جمع الأسئلة التي لها Highlights
        this.currentQuestions = this.originalQuestions.filter((q, index) => {
            if (examData.memoryHighlights && examData.memoryHighlights[index]) {
                return true;
            }
            if (q.memoryHighlights && q.memoryHighlights.length > 0) {
                return true;
            }
            return false;
        });
        
        if (this.currentQuestions.length === 0) {
            this.currentQuestions = [...this.originalQuestions];
        }
        
        console.log(`✅ تم جمع ${this.currentQuestions.length} سؤال`);
    }

    getHighlightForQuestion(index) {
        const examData = window.currentExamData || window._currentExamData;
        if (!examData || !examData.memoryHighlights) return null;
        
        if (examData.memoryHighlights[index]) {
            return examData.memoryHighlights[index];
        }
        
        if (this.currentQuestions[index] && this.currentQuestions[index].memoryHighlights) {
            return this.currentQuestions[index].memoryHighlights[0];
        }
        
        return null;
    }

    getDisplayText(question, index) {
        const highlight = this.getHighlightForQuestion(index);
        if (highlight && highlight.parts && highlight.parts.length > 0) {
            return {
                text: highlight.parts.join(' '),
                color: highlight.color || 0,
                hasHighlight: true
            };
        }
        return {
            text: question.text,
            color: 0,
            hasHighlight: false
        };
    }

    generateOptions(question, correctText, index) {
        const options = [correctText];
        
        // جمع جميع الجمل من الأسئلة الأخرى
        const otherQuestions = this.currentQuestions.filter(
            (q, idx) => idx !== this.currentIndex
        );
        
        const shuffledOthers = this.shuffleArray([...otherQuestions]);
        
        // أخذ 3 جمل مختلفة كخيارات خاطئة
        for (let i = 0; i < Math.min(3, shuffledOthers.length); i++) {
            const q = shuffledOthers[i];
            const originalIndex = q.originalIndex !== undefined ? q.originalIndex : this.currentQuestions.indexOf(q);
            const displayInfo = this.getDisplayText(q, originalIndex);
            const text = displayInfo.text;
            if (!options.includes(text) && text !== correctText) {
                options.push(text);
            }
        }
        
        // التأكد من وجود 4 خيارات
        while (options.length < 4) {
            const randomText = `جملة ${options.length + 1}`;
            if (!options.includes(randomText)) {
                options.push(randomText);
            }
        }
        
        return this.shuffleArray(options);
    }

    showIntroCard() {
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧠</div>
                <h2>تدريب الذاكرة</h2>
                <p>سترى الجملة مرة واحدة ثم تسترجعها</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    showMemoryCard() {
        this.removeOverlay();
        this.wrongAttempts = 0;
        
        if (this.currentIndex >= this.currentQuestions.length) {
            this.showResults();
            return;
        }
        
        const question = this.currentQuestions[this.currentIndex];
        const originalIndex = question.originalIndex !== undefined ? question.originalIndex : this.currentIndex;
        const displayInfo = this.getDisplayText(question, originalIndex);
        const colorIndex = displayInfo.color;
        const textToShow = displayInfo.text;
        
        this.currentQuestion = question;
        this.currentCorrectText = textToShow;
        
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-card">
                <div class="memory-trainer-header">
                    <span>${this.currentIndex + 1}/${this.currentQuestions.length}</span>
                    <span>🧠 ركز</span>
                </div>
                <div class="memory-trainer-content">
                    <div class="memory-trainer-answer">
                        ${displayInfo.hasHighlight ? 
                            `<span class="memory-highlight color${colorIndex}">${textToShow}</span>` :
                            `<span>${textToShow}</span>`
                        }
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">
                    أنا جاهز
                </button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    readyToRecall() {
        this.removeOverlay();
        
        this.currentOptions = this.generateOptions(
            this.currentQuestion, 
            this.currentCorrectText,
            this.currentIndex
        );
        
        const overlay = this.createOverlay();
        overlay.innerHTML = `
            <div class="memory-trainer-recall">
                <div class="memory-trainer-header">
                    <span>${this.currentIndex + 1}/${this.currentQuestions.length}</span>
                    <span>🧠 استرجع</span>
                </div>
                <div class="memory-trainer-content">
                    <p>اختر الجملة الصحيحة</p>
                    <div class="memory-trainer-options">
                        ${this.currentOptions.map((opt, idx) => `
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

    checkAnswer(selectedIndex) {
        const selectedText = this.currentOptions[selectedIndex];
        const isCorrect = (selectedText === this.currentCorrectText);
        
        const feedback = document.getElementById('memory-trainer-feedback');
        this.attempts++;
        
        document.querySelectorAll('.memory-trainer-option').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        });
        
        if (isCorrect) {
            this.correctAttempts++;
            const message = this.successMessages[Math.floor(Math.random() * this.successMessages.length)];
            feedback.innerHTML = `
                <div class="memory-trainer-success">
                    ✅ ${message}
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.nextQuestion()">
                    التالي →
                </button>
            `;
            
            document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.borderColor = '#28a745';
            document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.backgroundColor = '#d4edda';
            
        } else {
            this.wrongAttempts++;
            
            if (this.wrongAttempts >= 2) {
                this.showSolution();
            } else {
                const questionId = this.currentQuestion.originalIndex !== undefined 
                    ? this.currentQuestion.originalIndex 
                    : this.currentIndex;
                if (!this.wrongQuestions.includes(questionId)) {
                    this.wrongQuestions.push(questionId);
                }
                
                const message = this.retryMessages[Math.floor(Math.random() * this.retryMessages.length)];
                feedback.innerHTML = `
                    <div class="memory-trainer-retry">
                        🔄 ${message}
                    </div>
                    <button class="memory-trainer-btn secondary" onclick="window.memoryTrainer.readyToRecall()">
                        حاول مرة أخرى
                    </button>
                `;
                
                document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.borderColor = '#e67e22';
                document.querySelectorAll('.memory-trainer-option')[selectedIndex].style.backgroundColor = '#fef0e0';
            }
        }
    }

    showSolution() {
        const displayInfo = this.getDisplayText(
            this.currentQuestion, 
            this.currentQuestion.originalIndex !== undefined ? this.currentQuestion.originalIndex : this.currentIndex
        );
        const colorIndex = displayInfo.color;
        const correctText = this.currentCorrectText;
        
        const feedback = document.getElementById('memory-trainer-feedback');
        feedback.innerHTML = `
            <div class="memory-trainer-solution">
                <div class="memory-trainer-answer" style="margin: 8px 0; padding: 12px;">
                    ${displayInfo.hasHighlight ? 
                        `<span class="memory-highlight color${colorIndex}">${correctText}</span>` :
                        `<span>${correctText}</span>`
                    }
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.nextQuestion()">
                    متابعة →
                </button>
            </div>
        `;
        
        document.querySelectorAll('.memory-trainer-option').forEach((btn, idx) => {
            if (this.currentOptions[idx] === correctText) {
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
                <h3>${wrongCount === 0 ? 'تم التثبيت' : 'المرحلة الأولى انتهت'}</h3>
                <div class="memory-trainer-stats">
                    <div>
                        <span>المحاولات</span>
                        <strong>${this.attempts}</strong>
                    </div>
                    <div>
                        <span>الصحيحة</span>
                        <strong>${this.correctAttempts}</strong>
                    </div>
                    <div>
                        <span>النجاح</span>
                        <strong>${successRate}%</strong>
                    </div>
                </div>
                ${wrongCount > 0 ? `
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.reviewWrongQuestions()">
                        مراجعة ${wrongCount} سؤال
                    </button>
                ` : `
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                        🎯 ممتاز
                    </button>
                `}
            </div>
        `;
        document.body.appendChild(overlay);
    }

    reviewWrongQuestions() {
        const wrongIds = this.wrongQuestions;
        this.currentQuestions = this.originalQuestions.filter(q => {
            const id = q.originalIndex !== undefined ? q.originalIndex : this.originalQuestions.indexOf(q);
            return wrongIds.includes(id);
        });
        this.currentIndex = 0;
        this.wrongQuestions = [];
        this.showMemoryCard();
    }

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
                <h2>ℹ️ غير متوفرة</h2>
                <p>لا توجد جمل للتذكير في هذا الامتحان</p>
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

window.memoryTrainer = new MemoryTrainer();
window.startMemoryTrainer = () => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start();
    }
};

console.log('🧠 Memory Trainer تم تحميله');
