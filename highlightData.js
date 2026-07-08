// ============================================
// MEMORY TRAINER V2 - Silent Retrieval
// ============================================

class MemoryTrainer {
    constructor() {
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.originalQuestions = [];
        this.currentCorrectText = '';
        this.currentOptions = [];
        this.currentHighlight = null;
        this.overlay = null;
    }

    start() {
        console.log("🧠 بدء Memory Trainer V2...");
        
        const examData = window.currentExamData || window._currentExamData;
        if (!examData) {
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
        
        this.currentQuestions = [...this.originalQuestions];
        console.log(`✅ تم جمع ${this.currentQuestions.length} سؤال للتدريب`);
    }

    getHighlightForQuestion(index) {
        const examData = window.currentExamData || window._currentExamData;
        if (!examData || !examData.memoryHighlights) return null;
        
        for (const h of examData.memoryHighlights) {
            if (h.question === index) {
                return h;
            }
        }
        
        if (examData.memoryHighlights[index]) {
            return examData.memoryHighlights[index];
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
        
        const otherQuestions = this.currentQuestions.filter(
            (q, idx) => idx !== this.currentIndex
        );
        
        const shuffledOthers = this.shuffleArray([...otherQuestions]);
        
        let added = 0;
        for (let i = 0; i < shuffledOthers.length && added < 3; i++) {
            const q = shuffledOthers[i];
            const originalIndex = q.originalIndex !== undefined ? q.originalIndex : this.currentQuestions.indexOf(q);
            const displayInfo = this.getDisplayText(q, originalIndex);
            const text = displayInfo.text;
            if (!options.includes(text) && text !== correctText) {
                options.push(text);
                added++;
            }
        }
        
        while (options.length < 4) {
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
                <p>سترى الجملة مرة واحدة</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">
                    ابدأ
                </button>
            </div>
        `;
        document.body.appendChild(this.overlay);
    }

    showMemoryCard() {
        this.removeOverlay();
        
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
        this.currentHighlight = displayInfo;
        
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-card">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.currentQuestions.length}</span>
                    <span class="memory-trainer-focus">🧠 ركز</span>
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
        document.body.appendChild(this.overlay);
    }

    readyToRecall() {
        this.removeOverlay();
        
        this.currentOptions = this.generateOptions(
            this.currentQuestion, 
            this.currentCorrectText,
            this.currentIndex
        );
        
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-recall">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <div class="memory-trainer-header">
                    <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.currentQuestions.length}</span>
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
        
        // زر التالي فقط (بدون أي رسالة)
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
        if (this.currentIndex < this.currentQuestions.length) {
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
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-results">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <div class="memory-trainer-icon">🧠</div>
                <h2>انتهى التدريب</h2>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                    العودة للامتحان
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

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    showNotAvailable() {
        this.createOverlay();
        this.overlay.innerHTML = `
            <div class="memory-trainer-intro">
                <button class="memory-trainer-close" onclick="window.memoryTrainer.close()">✕</button>
                <h2>ℹ️ غير متوفرة</h2>
                <p>لا توجد جمل للتذكير في هذا الامتحان</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()">
                    فهمت
                </button>
            </div>
        `;
        document.body.appendChild(this.overlay);
    }

    close() {
        this.removeOverlay();
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
    }
}

window.memoryTrainer = new MemoryTrainer();
window.startMemoryTrainer = () => {
    if (window.memoryTrainer) {
        window.memoryTrainer.start();
    }
};

console.log('🧠 Memory Trainer V2 تم تحميله');
