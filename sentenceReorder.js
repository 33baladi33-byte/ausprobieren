// ============================================
// sentenceReorder.js - أداة ترتيب الجمل (النسخة النهائية)
// ============================================

console.log("🧩 sentenceReorder.js يتم تحميله...");

class SentenceReorder {
    static overlay = null;
    static puzzleContainer = null;
    static parts = [];
    static shuffledParts = [];
    static slots = [];
    static currentQuestionId = null;
    static currentSentenceElement = null;
    static isOpen = false;
    static isCorrect = false;
    static iconElement = null;
    static currentText = '';
    static isFirstTime = true;
    static isAnimating = false;

    // ==========================================
    // الفتح الرئيسي
    // ==========================================
    static open(container, sentenceElement, questionId, iconElement) {
        console.log('🧩 فتح SentenceReorder');

        if (this.isOpen) {
            console.log('⚠️ نافذة مفتوحة بالفعل');
            return;
        }

        // حفظ الأيقونة
        this.iconElement = iconElement;

        // الحصول على النص
        const text = sentenceElement.textContent || sentenceElement.innerText || '';
        this.currentText = text.trim();

        if (!this.currentText) {
            console.warn('⚠️ لا يوجد نص للجملة');
            return;
        }

        // حفظ البيانات
        this.currentContainer = container;
        this.currentSentenceElement = sentenceElement;
        this.currentQuestionId = questionId;
        this.isOpen = true;
        this.isCorrect = false;

        // تقسيم الجملة
        this.parts = this.splitSentence(this.currentText);
        this.shuffledParts = this.shuffleArray([...this.parts]);

        // إنشاء النافذة
        this.createOverlay();

        // عرض البطاقة التعريفية أولاً
        this.showIntroCard();
    }

    // ==========================================
    // عرض البطاقة التعريفية
    // ==========================================
    static showIntroCard() {
        if (!this.puzzleContainer) return;

        this.puzzleContainer.innerHTML = '';

        // العنوان
        const title = document.createElement('h3');
        title.textContent = 'أعد تشكيل الجملة. ✨';
        title.style.cssText = `
            margin: 0 0 16px 0;
            color: #1e293b;
            font-size: 1.1rem;
            text-align: center;
            font-weight: 500;
        `;
        this.puzzleContainer.appendChild(title);

        // النص التعريفي
        const description = document.createElement('p');
        description.textContent = 'تساعدك هذه الميزة على تثبيت الجملة الصحيحة في الذاكرة. إذا وجدت جملة صعبة، فإن إعادة ترتيبها يجعل تذكّرها أسهل.';
        description.style.cssText = `
            margin: 0 0 20px 0;
            color: #64748b;
            font-size: 0.85rem;
            text-align: center;
            line-height: 1.6;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        `;
        this.puzzleContainer.appendChild(description);

        // زر "أنا جاهز"
        const readyBtn = document.createElement('button');
        readyBtn.textContent = 'أنا جاهز';
        readyBtn.style.cssText = `
            background: #2c3e66;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 28px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: block;
            margin: 0 auto;
            font-family: inherit;
        `;

        readyBtn.addEventListener('mouseenter', () => {
            readyBtn.style.background = '#1a2a4a';
        });
        readyBtn.addEventListener('mouseleave', () => {
            readyBtn.style.background = '#2c3e66';
        });

        readyBtn.addEventListener('click', () => {
            console.log('🚀 المستخدم جاهز، بدء التدريب');
            this.startTraining();
        });

        this.puzzleContainer.appendChild(readyBtn);

        // زر الإغلاق
        this.addCloseButton();
    }

    // ==========================================
    // بدء التدريب
    // ==========================================
    static startTraining() {
        this.isFirstTime = false;
        this.renderPuzzle();
    }

    // ==========================================
    // تقسيم الجملة إلى 3 أجزاء
    // ==========================================
    static splitSentence(text) {
        let cleanText = text.trim();

        if (cleanText.length < 20) {
            return [cleanText];
        }

        const words = cleanText.split(/\s+/);
        const totalWords = words.length;

        if (totalWords <= 4) {
            return [words.join(' ')];
        }

        const partSize = Math.ceil(totalWords / 3);
        const parts = [];

        for (let i = 0; i < 3; i++) {
            const start = i * partSize;
            const end = Math.min(start + partSize, totalWords);
            if (start < totalWords) {
                const part = words.slice(start, end).join(' ');
                parts.push(part);
            }
        }

        while (parts.length < 3) {
            parts.push('');
        }

        return parts;
    }

    // ==========================================
    // خلط المصفوفة
    // ==========================================
    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // ==========================================
    // إنشاء النافذة
    // ==========================================
    static createOverlay() {
        this.close();

        this.overlay = document.createElement('div');
        this.overlay.id = 'sentencePuzzleOverlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(3px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.25s ease;
        `;

        this.puzzleContainer = document.createElement('div');
        this.puzzleContainer.id = 'sentencePuzzleCard';
        this.puzzleContainer.style.cssText = `
            background: #ffffff;
            border-radius: 14px;
            padding: 24px 28px;
            max-width: 620px;
            width: 92%;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
            transform: scale(0.96) translateY(8px);
            transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
            border: 1px solid #e8edf4;
        `;

        this.overlay.appendChild(this.puzzleContainer);
        document.body.appendChild(this.overlay);

        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            this.puzzleContainer.style.transform = 'scale(1) translateY(0)';
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        document.addEventListener('keydown', this.handleEsc);
    }

    // ==========================================
    // عرض اللغز (البطاقات والخانات) - تخطيط أفقي
    // ==========================================
    static renderPuzzle() {
        if (!this.puzzleContainer) {
            console.error('❌ puzzleContainer غير موجود');
            return;
        }

        this.puzzleContainer.innerHTML = '';

        // ---- العنوان ----
        const title = document.createElement('h3');
        title.textContent = 'أعد تشكيل الجملة. ✨';
        title.style.cssText = `
            margin: 0 0 20px 0;
            color: #1e293b;
            font-size: 1.05rem;
            text-align: center;
            font-weight: 500;
        `;
        this.puzzleContainer.appendChild(title);

        // ---- الخانات (Slots) - أفقي ----
        const slotsContainer = document.createElement('div');
        slotsContainer.id = 'sentenceSlotsContainer';
        slotsContainer.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 20px;
        `;

        this.slots = [];
        const numSlots = this.parts.length;

        for (let i = 0; i < numSlots; i++) {
            const slot = document.createElement('div');
            slot.className = 'sentence-slot';
            slot.dataset.slotIndex = i;
            slot.style.cssText = `
                flex: 1;
                min-width: 100px;
                min-height: 50px;
                padding: 10px 16px;
                border: 2px dashed #dce2ec;
                border-radius: 8px;
                background: #f8fafc;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 0.85rem;
                color: transparent;
                transition: all 0.2s ease;
                cursor: pointer;
                font-weight: 400;
                box-sizing: border-box;
            `;
            slot.textContent = '';

            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!slot.dataset.hasPart) {
                    slot.style.borderColor = '#94a3b8';
                    slot.style.background = '#f1f5f9';
                }
            });

            slot.addEventListener('dragleave', () => {
                if (!slot.dataset.hasPart) {
                    slot.style.borderColor = '#dce2ec';
                    slot.style.background = '#f8fafc';
                }
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                this.handleDrop(draggedIndex, i);
            });

            slot.addEventListener('click', () => {
                if (this.isCorrect || this.isAnimating) return;
                if (slot.dataset.hasPart) {
                    const partText = slot.textContent;
                    const partIndex = this.shuffledParts.indexOf(partText);
                    if (partIndex !== -1) {
                        this.clearSlot(i);
                        this.showCard(partIndex);
                    }
                }
            });

            this.slots.push(slot);
            slotsContainer.appendChild(slot);
        }

        this.puzzleContainer.appendChild(slotsContainer);

        // ---- البطاقات (Cards) - أفقي ----
        const cardsContainer = document.createElement('div');
        cardsContainer.id = 'sentenceCardsContainer';
        cardsContainer.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 20px;
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e8edf4;
            min-height: 60px;
            flex-wrap: wrap;
        `;

        this.shuffledParts.forEach((part, index) => {
            if (!part || part.trim() === '') {
                return;
            }

            const card = document.createElement('div');
            card.className = 'sentence-card';
            card.dataset.partIndex = index;
            card.dataset.partText = part;
            card.draggable = true;
            card.style.cssText = `
                flex: 1;
                min-width: 120px;
                padding: 12px 18px;
                background: #ffffff;
                border: 1px solid #dce2ec;
                border-radius: 8px;
                cursor: grab;
                font-size: 0.85rem;
                color: #1e293b;
                transition: all 0.2s ease;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
                user-select: none;
                font-weight: 400;
                text-align: center;
                word-break: break-word;
                line-height: 1.5;
                box-sizing: border-box;
            `;
            card.textContent = part;

            card.addEventListener('dragstart', (e) => {
                if (this.isCorrect || this.isAnimating) {
                    e.preventDefault();
                    return;
                }
                e.dataTransfer.setData('text/plain', index.toString());
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.98)';
            });

            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });

            card.addEventListener('click', () => {
                if (this.isCorrect || this.isAnimating) return;
                const emptySlotIndex = this.slots.findIndex(s => !s.dataset.hasPart);
                if (emptySlotIndex !== -1) {
                    this.handleDrop(index, emptySlotIndex);
                }
            });

            card.addEventListener('mouseenter', () => {
                if (!this.isCorrect && !this.isAnimating && !card.dataset.placed) {
                    card.style.borderColor = '#94a3b8';
                    card.style.background = '#f1f5f9';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!this.isCorrect && !this.isAnimating && !card.dataset.placed) {
                    card.style.borderColor = '#dce2ec';
                    card.style.background = '#ffffff';
                }
            });

            cardsContainer.appendChild(card);
        });

        this.puzzleContainer.appendChild(cardsContainer);

        // ---- زر التحقق ----
        const checkBtn = document.createElement('button');
        checkBtn.id = 'sentenceCheckBtn';
        checkBtn.textContent = 'تحقق';
        checkBtn.style.cssText = `
            background: #2c3e66;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 28px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            font-family: inherit;
        `;

        checkBtn.addEventListener('mouseenter', () => {
            checkBtn.style.background = '#1a2a4a';
        });
        checkBtn.addEventListener('mouseleave', () => {
            checkBtn.style.background = '#2c3e66';
        });

        checkBtn.addEventListener('click', () => {
            this.checkOrder();
        });

        this.puzzleContainer.appendChild(checkBtn);

        // ---- زر الإغلاق ----
        this.addCloseButton();
    }

    // ==========================================
    // إضافة زر الإغلاق
    // ==========================================
    static addCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 18px;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 4px 8px;
            line-height: 1;
            font-family: inherit;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#475569';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#94a3b8';
        });

        closeBtn.addEventListener('click', () => {
            this.close();
        });

        this.puzzleContainer.appendChild(closeBtn);
    }

    // ==========================================
    // معالجة السحب والإفلات
    // ==========================================
    static handleDrop(draggedIndex, slotIndex) {
        if (this.isCorrect || this.isAnimating) return;

        if (draggedIndex < 0 || draggedIndex >= this.shuffledParts.length) return;
        if (slotIndex < 0 || slotIndex >= this.slots.length) return;

        const slot = this.slots[slotIndex];
        if (!slot) return;

        if (slot.dataset.hasPart) {
            const existingPart = slot.textContent;
            const existingIndex = this.shuffledParts.indexOf(existingPart);
            this.clearSlot(slotIndex);
            this.placePartInSlot(draggedIndex, slotIndex);
            if (existingIndex !== -1) {
                this.showCard(existingIndex);
            }
        } else {
            this.placePartInSlot(draggedIndex, slotIndex);
        }

        this.clearCorrectionColors();
    }

    static placePartInSlot(partIndex, slotIndex) {
        const card = document.querySelector(`.sentence-card[data-part-index="${partIndex}"]`);
        const slot = this.slots[slotIndex];

        if (!card || !slot) return;

        const partText = card.dataset.partText;

        card.style.display = 'none';
        card.dataset.placed = 'true';

        slot.textContent = partText;
        slot.dataset.hasPart = 'true';
        slot.dataset.partIndex = partIndex;
        slot.style.borderColor = '#dce2ec';
        slot.style.background = '#ffffff';
        slot.style.color = '#1e293b';
        slot.style.fontWeight = '400';
    }

    static clearSlot(slotIndex) {
        const slot = this.slots[slotIndex];
        if (!slot) return;

        slot.textContent = '';
        delete slot.dataset.hasPart;
        delete slot.dataset.partIndex;
        slot.style.borderColor = '#dce2ec';
        slot.style.background = '#f8fafc';
        slot.style.color = 'transparent';
        slot.style.fontWeight = '400';
    }

    static showCard(partIndex) {
        const card = document.querySelector(`.sentence-card[data-part-index="${partIndex}"]`);
        if (card) {
            card.style.display = 'block';
            delete card.dataset.placed;
        }
    }

    // ==========================================
    // التحقق من الترتيب
    // ==========================================
    static checkOrder() {
        if (this.isCorrect || this.isAnimating) return;

        const filledSlots = this.slots.filter(s => s.dataset.hasPart);

        if (filledSlots.length < this.parts.length) {
            return;
        }

        let isAllCorrect = true;

        this.slots.forEach((slot, index) => {
            const partText = slot.textContent;
            const correctPart = this.parts[index];

            slot.style.borderColor = '#dce2ec';
            slot.style.background = '#ffffff';

            if (partText === correctPart) {
                slot.style.borderColor = '#28a745';
                slot.style.background = '#d4edda';
                slot.style.color = '#155724';
            } else {
                isAllCorrect = false;
                slot.style.borderColor = '#e67e22';
                slot.style.background = '#fef0e0';
                slot.style.color = '#856404';
            }
        });

        if (isAllCorrect) {
            this.onSuccess();
        }
    }

    // ==========================================
    // عند النجاح
    // ==========================================
    static onSuccess() {
        this.isCorrect = true;
        this.isAnimating = true;

        // تغيير لون الخانات إلى الأخضر
        this.slots.forEach(slot => {
            slot.style.borderColor = '#28a745';
            slot.style.background = '#d4edda';
            slot.style.color = '#155724';
        });

        // إغلاق النافذة بعد 1000ms
        setTimeout(() => {
            this.close();
            this.isAnimating = false;
        }, 1000);
    }

    // ==========================================
    // إعادة تعيين ألوان التصحيح
    // ==========================================
    static clearCorrectionColors() {
        this.slots.forEach(slot => {
            if (slot.dataset.hasPart) {
                slot.style.borderColor = '#dce2ec';
                slot.style.background = '#ffffff';
                slot.style.color = '#1e293b';
            } else {
                slot.style.borderColor = '#dce2ec';
                slot.style.background = '#f8fafc';
                slot.style.color = 'transparent';
            }
        });
    }

    // ==========================================
    // إغلاق النافذة
    // ==========================================
    static close() {
        if (this.overlay) {
            this.overlay.style.opacity = '0';
            if (this.puzzleContainer) {
                this.puzzleContainer.style.transform = 'scale(0.96) translateY(8px)';
            }

            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.remove();
                }
                this.overlay = null;
                this.puzzleContainer = null;
                this.isOpen = false;
                this.isCorrect = false;
                this.isAnimating = false;
            }, 250);
        }

        document.removeEventListener('keydown', this.handleEsc);
    }

    static handleEsc(e) {
        if (e.key === 'Escape' && SentenceReorder.isOpen) {
            SentenceReorder.close();
        }
    }

    // ==========================================
    // التهيئة
    // ==========================================
    static init() {
        console.log('🧩 SentenceReorder: جاهز للعمل');
    }
}

// ============================================
// التصدير
// ============================================
window.SentenceReorder = SentenceReorder;

// ============================================
// التهيئة التلقائية
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        SentenceReorder.init();
    });
} else {
    SentenceReorder.init();
}

console.log('✅ sentenceReorder.js تم تحميله');
