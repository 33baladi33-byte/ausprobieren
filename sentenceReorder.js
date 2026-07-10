// ============================================
// sentenceReorder.js - ميزة ترتيب الجمل (Sentence Puzzle)
// للمهارات المسموعة (Hören Teil 1, 2, 3)
// ============================================

console.log("✅ sentenceReorder.js تم تحميله");

class SentenceReorder {
    // ==========================================
    // الخصائص الثابتة
    // ==========================================
    static overlay = null;
    static puzzleContainer = null;
    static parts = [];
    static shuffledParts = [];
    static slots = [];
    static currentQuestionId = null;
    static currentContainer = null;
    static currentSentenceElement = null;
    static isOpen = false;
    static isCorrect = false;
    static iconElement = null;

    // ==========================================
    // الدوال الرئيسية
    // ==========================================

    /**
     * فتح نافذة ترتيب الجملة
     * @param {HTMLElement} container - حاوية الامتحان
     * @param {HTMLElement} sentenceElement - عنصر الجملة
     * @param {number} questionId - رقم السؤال
     */
    static open(container, sentenceElement, questionId) {
        // منع فتح أكثر من نافذة
        if (this.isOpen) return;
        
        // الحصول على نص الجملة
        const text = this.getSentenceText(sentenceElement);
        if (!text || text.trim().length === 0) {
            console.warn('⚠️ لا يوجد نص للجملة');
            return;
        }

        // حفظ البيانات
        this.currentContainer = container;
        this.currentSentenceElement = sentenceElement;
        this.currentQuestionId = questionId;
        this.isOpen = true;

        // تقسيم الجملة إلى 3 أجزاء
        this.parts = this.splitSentence(text);
        
        // خلط الأجزاء
        this.shuffledParts = this.shuffleArray([...this.parts]);

        // إنشاء النافذة
        this.createOverlay();
        this.renderPuzzle();

        // إضافة مستمعين للأحداث
        this.addEventListeners();
    }

    /**
     * الحصول على نص الجملة من العنصر
     */
    static getSentenceText(sentenceElement) {
        // محاولة الحصول على النص من العنصر مباشرة
        if (sentenceElement.textContent) {
            // إزالة رقم السؤال إذا وجد (مثل "1. ")
            let text = sentenceElement.textContent.trim();
            text = text.replace(/^\d+\.\s*/, '');
            return text;
        }
        return '';
    }

    /**
     * تقسيم الجملة إلى 3 أجزاء متقاربة في الطول
     */
    static splitSentence(text) {
        // تنظيف النص
        let cleanText = text.trim();
        
        // إذا كان النص قصيراً جداً
        if (cleanText.length < 15) {
            return [cleanText, '', ''];
        }

        // تقسيم إلى كلمات
        const words = cleanText.split(/\s+/);
        const totalWords = words.length;
        
        // إذا كان عدد الكلمات أقل من 3
        if (totalWords <= 3) {
            return words;
        }

        // تقسيم إلى 3 أجزاء متساوية تقريباً
        const partSize = Math.ceil(totalWords / 3);
        const parts = [];
        
        for (let i = 0; i < 3; i++) {
            const start = i * partSize;
            const end = Math.min(start + partSize, totalWords);
            if (start < totalWords) {
                parts.push(words.slice(start, end).join(' '));
            } else {
                parts.push('');
            }
        }

        // إزالة الأجزاء الفارغة
        return parts.filter(p => p.length > 0);
    }

    /**
     * خلط المصفوفة (Fisher-Yates)
     */
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // ==========================================
    // إنشاء النافذة
    // ==========================================

    static createOverlay() {
        // إزالة أي نافذة قديمة
        this.close();

        // إنشاء الخلفية
        this.overlay = document.createElement('div');
        this.overlay.className = 'sentence-puzzle-overlay';
        this.overlay.id = 'sentencePuzzleOverlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            animation: sentenceFadeIn 0.2s ease;
            opacity: 0;
        `;

        // إنشاء البطاقة
        this.puzzleContainer = document.createElement('div');
        this.puzzleContainer.className = 'sentence-puzzle-card';
        this.puzzleContainer.style.cssText = `
            background: #ffffff;
            border-radius: 18px;
            padding: 24px 28px;
            max-width: 520px;
            width: 92%;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            animation: sentenceScaleIn 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            transform: scale(0.95);
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
        `;

        // إضافة العناصر إلى الصفحة
        this.overlay.appendChild(this.puzzleContainer);
        document.body.appendChild(this.overlay);

        // تأخير صغير لتطبيق الأنيميشن
        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            this.puzzleContainer.style.transform = 'scale(1)';
        });
    }

    // ==========================================
    // عرض اللغز
    // ==========================================

    static renderPuzzle() {
        if (!this.puzzleContainer) return;
        
        // تنظيف المحتوى
        this.puzzleContainer.innerHTML = '';

        // العنوان
        const title = document.createElement('h3');
        title.style.cssText = `
            margin: 0 0 16px 0;
            color: #2c3e66;
            font-size: 1.1rem;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `;
        title.innerHTML = '🧩 رتب الجملة';
        this.puzzleContainer.appendChild(title);

        // ---- الخانات (Slots) ----
        const slotsContainer = document.createElement('div');
        slotsContainer.className = 'sentence-slots-container';
        slotsContainer.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
        `;

        this.slots = [];
        for (let i = 0; i < this.parts.length; i++) {
            const slot = document.createElement('div');
            slot.className = `sentence-slot slot-${i}`;
            slot.dataset.slotIndex = i;
            slot.style.cssText = `
                flex: 1;
                min-width: 80px;
                min-height: 50px;
                padding: 10px 14px;
                border: 2px dashed #d0d7e6;
                border-radius: 12px;
                background: #f8fafc;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 0.9rem;
                color: #94a3b8;
                transition: all 0.2s ease;
                cursor: pointer;
                position: relative;
                min-height: 60px;
            `;
            slot.textContent = `[ ${i + 1} ]`;
            
            // إضافة مستمع للسحب والإفلات
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                slot.style.borderColor = '#38bdf8';
                slot.style.background = '#f0f8ff';
            });
            
            slot.addEventListener('dragleave', () => {
                if (!slot.dataset.hasPart) {
                    slot.style.borderColor = '#d0d7e6';
                    slot.style.background = '#f8fafc';
                }
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                this.handleDrop(draggedIndex, i);
            });

            // للنقر على الخانة (بديل للسحب في الهواتف)
            slot.addEventListener('click', () => {
                if (slot.dataset.hasPart) {
                    // إعادة البطاقة إلى الأسفل
                    const partText = slot.textContent;
                    const partIndex = this.parts.indexOf(partText);
                    if (partIndex !== -1) {
                        this.clearSlot(i);
                        this.addPartToPool(partText, partIndex);
                    }
                }
            });

            this.slots.push(slot);
            slotsContainer.appendChild(slot);
        }
        this.puzzleContainer.appendChild(slotsContainer);

        // ---- البطاقات (Cards) ----
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'sentence-cards-container';
        cardsContainer.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
            min-height: 60px;
        `;

        // إنشاء بطاقة لكل جزء مخلوط
        this.shuffledParts.forEach((part, index) => {
            const card = document.createElement('div');
            card.className = `sentence-card card-${index}`;
            card.dataset.partIndex = index;
            card.dataset.partText = part;
            card.draggable = true;
            card.style.cssText = `
                padding: 10px 18px;
                background: #ffffff;
                border: 2px solid #d0d7e6;
                border-radius: 12px;
                cursor: grab;
                font-size: 0.9rem;
                color: #2c3e66;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                user-select: none;
                font-weight: 500;
                flex: 0 1 auto;
                max-width: 200px;
                text-align: center;
                word-break: break-word;
            `;
            card.textContent = part;

            // مستمعات السحب
            card.addEventListener('dragstart', (e) => {
                if (this.isCorrect) {
                    e.preventDefault();
                    return;
                }
                e.dataTransfer.setData('text/plain', index.toString());
                card.style.opacity = '0.5';
            });

            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
            });

            // للنقر على البطاقة (بديل للسحب في الهواتف)
            card.addEventListener('click', () => {
                if (this.isCorrect) return;
                // البحث عن أول خانة فارغة
                const emptySlotIndex = this.slots.findIndex(s => !s.dataset.hasPart);
                if (emptySlotIndex !== -1) {
                    this.handleDrop(index, emptySlotIndex);
                }
            });

            // تأثير hover
            card.addEventListener('mouseenter', () => {
                if (!this.isCorrect) {
                    card.style.borderColor = '#38bdf8';
                    card.style.background = '#f0f8ff';
                    card.style.transform = 'translateY(-2px)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!this.isCorrect) {
                    card.style.borderColor = '#d0d7e6';
                    card.style.background = '#ffffff';
                    card.style.transform = 'translateY(0)';
                }
            });

            cardsContainer.appendChild(card);
        });

        this.puzzleContainer.appendChild(cardsContainer);

        // ---- زر التحقق ----
        const checkBtn = document.createElement('button');
        checkBtn.className = 'sentence-check-btn';
        checkBtn.style.cssText = `
            background: #2c3e66;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 12px 28px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `;
        checkBtn.innerHTML = '✅ تحقق';
        checkBtn.addEventListener('click', () => this.checkOrder());

        // تأثير hover
        checkBtn.addEventListener('mouseenter', () => {
            checkBtn.style.background = '#1a2a4a';
            checkBtn.style.transform = 'translateY(-2px)';
        });
        checkBtn.addEventListener('mouseleave', () => {
            checkBtn.style.background = '#2c3e66';
            checkBtn.style.transform = 'translateY(0)';
        });

        this.puzzleContainer.appendChild(checkBtn);

        // ---- زر الإغلاق ----
        const closeBtn = document.createElement('button');
        closeBtn.className = 'sentence-close-btn';
        closeBtn.style.cssText = `
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 24px;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.2s ease;
            padding: 4px 8px;
            line-height: 1;
        `;
        closeBtn.textContent = '✕';
        closeBtn.addEventListener('click', () => this.close());
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#2c3e66';
            closeBtn.style.transform = 'scale(1.1)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#94a3b8';
            closeBtn.style.transform = 'scale(1)';
        });

        this.puzzleContainer.appendChild(closeBtn);
    }

    // ==========================================
    // معالجة السحب والإفلات
    // ==========================================

    static handleDrop(draggedIndex, slotIndex) {
        if (this.isCorrect) return;

        // الحصول على البطاقة المسحوبة
        const card = document.querySelector(`.sentence-card[data-part-index="${draggedIndex}"]`);
        if (!card) return;

        // الحصول على الخانة المستهدفة
        const slot = this.slots[slotIndex];
        if (!slot) return;

        // إذا كانت الخانة تحتوي بالفعل على جزء
        if (slot.dataset.hasPart) {
            // تبديل الأجزاء
            const existingPart = slot.textContent;
            const existingIndex = this.parts.indexOf(existingPart);
            
            // تنظيف الخانة
            this.clearSlot(slotIndex);
            
            // وضع الجزء الجديد في الخانة
            this.placePartInSlot(draggedIndex, slotIndex);
            
            // إعادة الجزء القديم إلى المجموعة
            if (existingIndex !== -1) {
                this.addPartToPool(existingPart, existingIndex);
            }
        } else {
            // وضع الجزء في الخانة الفارغة
            this.placePartInSlot(draggedIndex, slotIndex);
        }

        // إعادة تعيين ألوان التصحيح
        this.clearCorrectionColors();
    }

    static placePartInSlot(partIndex, slotIndex) {
        const card = document.querySelector(`.sentence-card[data-part-index="${partIndex}"]`);
        const slot = this.slots[slotIndex];
        
        if (!card || !slot) return;

        const partText = card.dataset.partText;
        
        // إخفاء البطاقة
        card.style.display = 'none';
        
        // وضع النص في الخانة
        slot.textContent = partText;
        slot.dataset.hasPart = 'true';
        slot.dataset.partIndex = partIndex;
        slot.style.borderColor = '#28a745';
        slot.style.background = '#f0fdf4';
        slot.style.color = '#2c3e66';
    }

    static clearSlot(slotIndex) {
        const slot = this.slots[slotIndex];
        if (!slot) return;

        slot.textContent = `[ ${slotIndex + 1} ]`;
        delete slot.dataset.hasPart;
        delete slot.dataset.partIndex;
        slot.style.borderColor = '#d0d7e6';
        slot.style.background = '#f8fafc';
        slot.style.color = '#94a3b8';
    }

    static addPartToPool(partText, partIndex) {
        const card = document.querySelector(`.sentence-card[data-part-index="${partIndex}"]`);
        if (card) {
            card.style.display = 'block';
        }
    }

    // ==========================================
    // التحقق من الترتيب
    // ==========================================

    static checkOrder() {
        if (this.isCorrect) return;

        // التحقق من أن جميع الخانات مملوءة
        const filledSlots = this.slots.filter(s => s.dataset.hasPart);
        if (filledSlots.length < this.parts.length) {
            // إظهار رسالة
            this.showToast('⚠️ الرجاء ملء جميع الخانات أولاً', 'warning');
            return;
        }

        let isAllCorrect = true;

        // التحقق من كل خانة
        this.slots.forEach((slot, index) => {
            const partText = slot.textContent;
            const correctPart = this.parts[index];
            
            // إزالة الألوان القديمة
            slot.style.borderColor = '#d0d7e6';
            slot.style.background = '#f8fafc';

            if (partText === correctPart) {
                // صحيح
                slot.style.borderColor = '#28a745';
                slot.style.background = '#d4edda';
                slot.style.color = '#155724';
            } else {
                // خاطئ
                isAllCorrect = false;
                slot.style.borderColor = '#e67e22';
                slot.style.background = '#fef0e0';
                slot.style.color = '#856404';
            }
        });

        if (isAllCorrect) {
            this.onSuccess();
        } else {
            this.showToast('❌ الترتيب غير صحيح، حاول مرة أخرى', 'error');
        }
    }

    // ==========================================
    // عند النجاح
    // ==========================================

    static onSuccess() {
        this.isCorrect = true;
        
        // تغيير لون الخانات إلى الأخضر
        this.slots.forEach(slot => {
            slot.style.borderColor = '#28a745';
            slot.style.background = '#d4edda';
            slot.style.color = '#155724';
        });

        // إظهار رسالة نجاح
        this.showToast('🎉 أحسنت! الترتيب صحيح ✅', 'success');

        // تغيير أيقونة الجملة إلى ✅
        this.updateIcon(true);

        // إغلاق النافذة بعد 800ms
        setTimeout(() => {
            this.close();
        }, 800);
    }

    // ==========================================
    // تحديث أيقونة الجملة
    // ==========================================

    static updateIcon(success) {
        if (!this.currentSentenceElement) return;

        // البحث عن أيقونة 🔀 بجانب الجملة
        const icon = this.currentSentenceElement.parentElement?.querySelector('.sentence-puzzle-icon');
        if (icon) {
            icon.textContent = success ? '✅' : '🔀';
            if (success) {
                icon.style.color = '#28a745';
                icon.style.cursor = 'default';
                icon.style.opacity = '0.8';
            }
        }
    }

    // ==========================================
    // إغلاق النافذة
    // ==========================================

    static close() {
        if (this.overlay) {
            this.overlay.style.opacity = '0';
            this.puzzleContainer.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.remove();
                }
                this.overlay = null;
                this.puzzleContainer = null;
                this.isOpen = false;
            }, 200);
        }

        // إعادة تعيين المتغيرات
        this.parts = [];
        this.shuffledParts = [];
        this.slots = [];
        this.currentQuestionId = null;
        this.currentContainer = null;
        this.currentSentenceElement = null;
        this.isCorrect = false;
    }

    // ==========================================
    // إعادة تعيين ألوان التصحيح
    // ==========================================

    static clearCorrectionColors() {
        this.slots.forEach(slot => {
            if (slot.dataset.hasPart) {
                slot.style.borderColor = '#28a745';
                slot.style.background = '#f0fdf4';
                slot.style.color = '#2c3e66';
            } else {
                slot.style.borderColor = '#d0d7e6';
                slot.style.background = '#f8fafc';
                slot.style.color = '#94a3b8';
            }
        });
    }

    // ==========================================
    // Toast Notification
    // ==========================================

    static showToast(message, type = 'info') {
        // إزالة أي توست قديم
        const oldToast = document.querySelector('.sentence-toast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'sentence-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 24px;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 100000;
            animation: sentenceToastIn 0.3s ease;
            max-width: 90%;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            text-align: center;
        `;

        // ألوان حسب النوع
        if (type === 'success') {
            toast.style.background = '#d4edda';
            toast.style.color = '#155724';
            toast.style.border = '1px solid #28a745';
        } else if (type === 'error') {
            toast.style.background = '#fef0e0';
            toast.style.color = '#856404';
            toast.style.border = '1px solid #e67e22';
        } else if (type === 'warning') {
            toast.style.background = '#fff3cd';
            toast.style.color = '#856404';
            toast.style.border = '1px solid #ffc107';
        } else {
            toast.style.background = '#f0f8ff';
            toast.style.color = '#2c3e66';
            toast.style.border = '1px solid #38bdf8';
        }

        toast.textContent = message;
        document.body.appendChild(toast);

        // إزالة التوست بعد 2.5 ثانية
        setTimeout(() => {
            toast.style.animation = 'sentenceToastOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 2500);
    }

    // ==========================================
    // إضافة مستمعي الأحداث العامة
    // ==========================================

    static addEventListeners() {
        // إغلاق النافذة عند الضغط على الخلفية
        if (this.overlay) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }

        // إغلاق النافذة عند الضغط على ESC
        document.addEventListener('keydown', this.handleEsc);
    }

    static handleEsc(e) {
        if (e.key === 'Escape' && SentenceReorder.isOpen) {
            SentenceReorder.close();
            document.removeEventListener('keydown', SentenceReorder.handleEsc);
        }
    }

    // ==========================================
    // تهيئة النظام
    // ==========================================

    static init() {
        console.log('🧩 SentenceReorder: جاهز للعمل');
        
        // إضافة الأنماط الديناميكية إذا لم تكن موجودة
        this.addStyles();
    }

    static addStyles() {
        // التحقق من وجود الأنماط
        if (document.getElementById('sentenceReorderStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'sentenceReorderStyles';
        styles.textContent = `
            @keyframes sentenceFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes sentenceScaleIn {
                from { opacity: 0; transform: scale(0.9) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            
            @keyframes sentenceToastIn {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            
            @keyframes sentenceToastOut {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }

            /* أيقونة الجملة */
            .sentence-puzzle-icon {
                font-size: 18px;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-right: 8px;
                display: inline-block;
                color: #2c3e66;
                opacity: 0.7;
            }
            
            .sentence-puzzle-icon:hover {
                opacity: 1;
                transform: scale(1.1);
                color: #38bdf8;
            }
            
            .sentence-puzzle-icon.success {
                color: #28a745;
                cursor: default;
                opacity: 0.8;
            }

            /* تحسينات للهواتف */
            @media (max-width: 768px) {
                .sentence-puzzle-card {
                    padding: 16px !important;
                    max-width: 95% !important;
                    border-radius: 14px !important;
                }
                
                .sentence-slot {
                    min-width: 50px !important;
                    min-height: 40px !important;
                    padding: 6px 10px !important;
                    font-size: 0.75rem !important;
                }
                
                .sentence-card {
                    padding: 6px 12px !important;
                    font-size: 0.75rem !important;
                    max-width: 140px !important;
                }
                
                .sentence-slots-container {
                    gap: 6px !important;
                }
                
                .sentence-cards-container {
                    gap: 6px !important;
                }
                
                .sentence-check-btn {
                    padding: 8px 16px !important;
                    font-size: 0.85rem !important;
                }
            }

            @media (max-width: 480px) {
                .sentence-slot {
                    min-width: 40px !important;
                    min-height: 32px !important;
                    padding: 4px 6px !important;
                    font-size: 0.65rem !important;
                }
                
                .sentence-card {
                    padding: 4px 8px !important;
                    font-size: 0.65rem !important;
                    max-width: 100px !important;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// ============================================
// تصدير للاستخدام العالمي
// ============================================
window.SentenceReorder = SentenceReorder;

// ============================================
// التهيئة التلقائية
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    SentenceReorder.init();
    console.log('🧩 SentenceReorder: تم التهيئة بنجاح');
});

console.log('✅ sentenceReorder.js جاهز');
