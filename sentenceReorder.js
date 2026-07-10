// ============================================
// sentenceReorder.js - ميزة ترتيب الجمل (Sentence Puzzle)
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

    // ==========================================
    // الفتح الرئيسي
    // ==========================================
    static open(container, sentenceElement, questionId) {
        console.log('🧩 فتح SentenceReorder للجملة:', sentenceElement.textContent);
        
        if (this.isOpen) {
            console.log('⚠️ نافذة مفتوحة بالفعل');
            return;
        }

        // الحصول على النص
        const text = sentenceElement.textContent || sentenceElement.innerText || '';
        this.currentText = text.trim();
        
        if (!this.currentText) {
            console.warn('⚠️ لا يوجد نص للجملة');
            return;
        }

        console.log('📝 نص الجملة:', this.currentText);

        // حفظ البيانات
        this.currentContainer = container;
        this.currentSentenceElement = sentenceElement;
        this.currentQuestionId = questionId;
        this.isOpen = true;
        this.isCorrect = false;

        // تقسيم الجملة
        this.parts = this.splitSentence(this.currentText);
        console.log('📦 الأجزاء:', this.parts);

        // خلط الأجزاء
        this.shuffledParts = this.shuffleArray([...this.parts]);
        console.log('🔀 الأجزاء المخلوطة:', this.shuffledParts);

        // إنشاء النافذة
        this.createOverlay();
        this.renderPuzzle();

        console.log('✅ SentenceReorder تم فتحه بنجاح');
    }

    // ==========================================
    // تقسيم الجملة إلى 3 أجزاء
    // ==========================================
    static splitSentence(text) {
        let cleanText = text.trim();
        
        // إذا كان النص قصيراً
        if (cleanText.length < 20) {
            return [cleanText];
        }

        // تقسيم إلى كلمات
        const words = cleanText.split(/\s+/);
        const totalWords = words.length;
        
        // إذا كان عدد الكلمات قليلاً
        if (totalWords <= 4) {
            return [words.join(' ')];
        }

        // تقسيم إلى 3 أجزاء متساوية تقريباً
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

        // التأكد من وجود 3 أجزاء
        while (parts.length < 3) {
            parts.push('');
        }

        console.log('✂️ التقسيم:', parts);
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
        // إزالة أي نافذة قديمة
        this.close();

        // الخلفية
        this.overlay = document.createElement('div');
        this.overlay.id = 'sentencePuzzleOverlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;

        // البطاقة
        this.puzzleContainer = document.createElement('div');
        this.puzzleContainer.id = 'sentencePuzzleCard';
        this.puzzleContainer.style.cssText = `
            background: #ffffff;
            border-radius: 20px;
            padding: 24px 28px;
            max-width: 580px;
            width: 92%;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
            transform: scale(0.95);
            transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
        `;

        this.overlay.appendChild(this.puzzleContainer);
        document.body.appendChild(this.overlay);

        // ظهور مع أنيميشن
        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            this.puzzleContainer.style.transform = 'scale(1)';
        });

        // إغلاق عند الضغط على الخلفية
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // إغلاق عند الضغط على ESC
        document.addEventListener('keydown', this.handleEsc);
    }

    // ==========================================
    // عرض اللغز (البطاقات والخانات)
    // ==========================================
    static renderPuzzle() {
        if (!this.puzzleContainer) {
            console.error('❌ puzzleContainer غير موجود');
            return;
        }

        console.log('🎨 بدء renderPuzzle()');
        console.log('📦 الأجزاء:', this.parts);
        console.log('🔀 الأجزاء المخلوطة:', this.shuffledParts);

        // تنظيف المحتوى
        this.puzzleContainer.innerHTML = '';

        // ---- العنوان ----
        const title = document.createElement('h3');
        title.textContent = '🧩 رتب الجملة';
        title.style.cssText = `
            margin: 0 0 20px 0;
            color: #2c3e66;
            font-size: 1.2rem;
            text-align: center;
            font-weight: 600;
        `;
        this.puzzleContainer.appendChild(title);

        // ---- الخانات (Slots) ----
        const slotsContainer = document.createElement('div');
        slotsContainer.id = 'sentenceSlotsContainer';
        slotsContainer.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
            min-height: 70px;
            padding: 8px;
            background: #f8fafc;
            border-radius: 12px;
            border: 2px dashed #e2e8f0;
        `;

        this.slots = [];
        const numSlots = this.parts.length;

        for (let i = 0; i < numSlots; i++) {
            const slot = document.createElement('div');
            slot.className = `sentence-slot`;
            slot.dataset.slotIndex = i;
            slot.style.cssText = `
                flex: 1;
                min-width: 80px;
                min-height: 56px;
                padding: 10px 14px;
                border: 2px dashed #cbd5e1;
                border-radius: 12px;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 0.85rem;
                color: #94a3b8;
                transition: all 0.2s ease;
                cursor: pointer;
                font-weight: 500;
            `;
            slot.textContent = `📥 ${i + 1}`;

            // مستمعات السحب والإفلات
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!slot.dataset.hasPart) {
                    slot.style.borderColor = '#38bdf8';
                    slot.style.background = '#f0f8ff';
                }
            });

            slot.addEventListener('dragleave', () => {
                if (!slot.dataset.hasPart) {
                    slot.style.borderColor = '#cbd5e1';
                    slot.style.background = '#ffffff';
                }
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                console.log(`📥 إفلات البطاقة ${draggedIndex} في الخانة ${i}`);
                this.handleDrop(draggedIndex, i);
            });

            slot.addEventListener('click', () => {
                if (this.isCorrect) return;
                if (slot.dataset.hasPart) {
                    // إعادة البطاقة إلى الأسفل
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
        console.log('✅ تم إنشاء', this.slots.length, 'خانات');

        // ---- البطاقات (Cards) ----
        const cardsContainer = document.createElement('div');
        cardsContainer.id = 'sentenceCardsContainer';
        cardsContainer.style.cssText = `
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 24px;
            min-height: 60px;
            padding: 12px;
            background: #f1f5f9;
            border-radius: 12px;
        `;

        console.log('🔀 إنشاء بطاقات للأجزاء:', this.shuffledParts);

        this.shuffledParts.forEach((part, index) => {
            if (!part || part.trim() === '') {
                console.warn(`⚠️ الجزء ${index} فارغ، تخطي`);
                return;
            }

            const card = document.createElement('div');
            card.className = 'sentence-card';
            card.dataset.partIndex = index;
            card.dataset.partText = part;
            card.draggable = true;
            card.style.cssText = `
                padding: 12px 20px;
                background: #ffffff;
                border: 2px solid #d0d7e6;
                border-radius: 12px;
                cursor: grab;
                font-size: 0.9rem;
                color: #1e293b;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                user-select: none;
                font-weight: 500;
                flex: 0 1 auto;
                max-width: 220px;
                text-align: center;
                word-break: break-word;
                line-height: 1.4;
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
                card.style.transform = 'scale(0.95)';
            });

            card.addEventListener('dragend', () => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });

            // النقر كبديل للسحب (للهواتف)
            card.addEventListener('click', () => {
                if (this.isCorrect) return;
                // البحث عن أول خانة فارغة
                const emptySlotIndex = this.slots.findIndex(s => !s.dataset.hasPart);
                if (emptySlotIndex !== -1) {
                    console.log(`👆 نقر على البطاقة ${index}، وضعها في الخانة ${emptySlotIndex}`);
                    this.handleDrop(index, emptySlotIndex);
                } else {
                    this.showToast('⚠️ جميع الخانات ممتلئة', 'warning');
                }
            });

            // تأثيرات Hover
            card.addEventListener('mouseenter', () => {
                if (!this.isCorrect && !card.dataset.placed) {
                    card.style.borderColor = '#38bdf8';
                    card.style.background = '#f0f8ff';
                    card.style.transform = 'translateY(-3px)';
                    card.style.boxShadow = '0 8px 20px rgba(56, 189, 248, 0.15)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!this.isCorrect && !card.dataset.placed) {
                    card.style.borderColor = '#d0d7e6';
                    card.style.background = '#ffffff';
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                }
            });

            cardsContainer.appendChild(card);
            console.log(`✅ بطاقة ${index}:`, part.substring(0, 30) + '...');
        });

        this.puzzleContainer.appendChild(cardsContainer);
        console.log('✅ تم إنشاء', this.shuffledParts.length, 'بطاقات');

        // ---- زر التحقق ----
        const checkBtn = document.createElement('button');
        checkBtn.id = 'sentenceCheckBtn';
        checkBtn.textContent = '✅ تحقق';
        checkBtn.style.cssText = `
            background: #2c3e66;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 14px 28px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-family: inherit;
        `;

        checkBtn.addEventListener('mouseenter', () => {
            checkBtn.style.background = '#1a2a4a';
            checkBtn.style.transform = 'translateY(-2px)';
        });
        checkBtn.addEventListener('mouseleave', () => {
            checkBtn.style.background = '#2c3e66';
            checkBtn.style.transform = 'translateY(0)';
        });

        checkBtn.addEventListener('click', () => {
            console.log('🔍 التحقق من الترتيب');
            this.checkOrder();
        });

        this.puzzleContainer.appendChild(checkBtn);

        // ---- زر الإغلاق ----
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
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
            font-family: inherit;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#2c3e66';
            closeBtn.style.transform = 'scale(1.1)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#94a3b8';
            closeBtn.style.transform = 'scale(1)';
        });

        closeBtn.addEventListener('click', () => {
            console.log('❌ إغلاق النافذة');
            this.close();
        });

        this.puzzleContainer.appendChild(closeBtn);

        console.log('✅ renderPuzzle() اكتمل');
        console.log('📄 محتوى puzzleContainer:', this.puzzleContainer.innerHTML.substring(0, 200) + '...');
    }

    // ==========================================
    // معالجة السحب والإفلات
    // ==========================================
    static handleDrop(draggedIndex, slotIndex) {
        if (this.isCorrect) {
            console.log('⛔ اللغز تم حله بالفعل');
            return;
        }

        console.log(`🔄 معالجة الإفلات: بطاقة ${draggedIndex} → خانة ${slotIndex}`);

        // التحقق من صحة المؤشرات
        if (draggedIndex < 0 || draggedIndex >= this.shuffledParts.length) {
            console.error('❌ مؤشر البطاقة غير صحيح:', draggedIndex);
            return;
        }

        if (slotIndex < 0 || slotIndex >= this.slots.length) {
            console.error('❌ مؤشر الخانة غير صحيح:', slotIndex);
            return;
        }

        const slot = this.slots[slotIndex];
        if (!slot) {
            console.error('❌ الخانة غير موجودة');
            return;
        }

        // إذا كانت الخانة تحتوي بالفعل على جزء
        if (slot.dataset.hasPart) {
            console.log('🔄 الخانة مشغولة، تبادل الأجزاء');
            const existingPart = slot.textContent;
            const existingIndex = this.shuffledParts.indexOf(existingPart);
            
            // تنظيف الخانة
            this.clearSlot(slotIndex);
            
            // وضع الجزء الجديد
            this.placePartInSlot(draggedIndex, slotIndex);
            
            // إعادة الجزء القديم
            if (existingIndex !== -1) {
                this.showCard(existingIndex);
            }
        } else {
            // خانة فارغة
            console.log(`📥 وضع البطاقة ${draggedIndex} في الخانة ${slotIndex}`);
            this.placePartInSlot(draggedIndex, slotIndex);
        }

        // إعادة تعيين ألوان التصحيح
        this.clearCorrectionColors();
    }

    static placePartInSlot(partIndex, slotIndex) {
        const card = document.querySelector(`.sentence-card[data-part-index="${partIndex}"]`);
        const slot = this.slots[slotIndex];
        
        if (!card) {
            console.error(`❌ البطاقة ${partIndex} غير موجودة`);
            return;
        }
        
        if (!slot) {
            console.error(`❌ الخانة ${slotIndex} غير موجودة`);
            return;
        }

        const partText = card.dataset.partText;
        console.log(`📥 وضع "${partText}" في الخانة ${slotIndex}`);

        // إخفاء البطاقة
        card.style.display = 'none';
        card.dataset.placed = 'true';
        
        // وضع النص في الخانة
        slot.textContent = partText;
        slot.dataset.hasPart = 'true';
        slot.dataset.partIndex = partIndex;
        slot.style.borderColor = '#28a745';
        slot.style.background = '#f0fdf4';
        slot.style.color = '#1e293b';
        slot.style.fontWeight = '600';
    }

    static clearSlot(slotIndex) {
        const slot = this.slots[slotIndex];
        if (!slot) return;

        console.log(`🗑️ تنظيف الخانة ${slotIndex}`);
        slot.textContent = `📥 ${slotIndex + 1}`;
        delete slot.dataset.hasPart;
        delete slot.dataset.partIndex;
        slot.style.borderColor = '#cbd5e1';
        slot.style.background = '#ffffff';
        slot.style.color = '#94a3b8';
        slot.style.fontWeight = '500';
    }

    static showCard(partIndex) {
        const card = document.querySelector(`.sentence-card[data-part-index="${partIndex}"]`);
        if (card) {
            console.log(`🔄 إظهار البطاقة ${partIndex}`);
            card.style.display = 'block';
            delete card.dataset.placed;
        }
    }

    // ==========================================
    // التحقق من الترتيب
    // ==========================================
    static checkOrder() {
        if (this.isCorrect) {
            console.log('⛔ اللغز تم حله بالفعل');
            return;
        }

        // التحقق من أن جميع الخانات مملوءة
        const filledSlots = this.slots.filter(s => s.dataset.hasPart);
        console.log(`📊 خانات ممتلئة: ${filledSlots.length}/${this.parts.length}`);

        if (filledSlots.length < this.parts.length) {
            this.showToast('⚠️ الرجاء ملء جميع الخانات أولاً', 'warning');
            return;
        }

        let isAllCorrect = true;

        // التحقق من كل خانة
        this.slots.forEach((slot, index) => {
            const partText = slot.textContent;
            const correctPart = this.parts[index];
            
            console.log(`🔍 الخانة ${index}: "${partText}" vs "${correctPart}"`);

            // إزالة الألوان القديمة
            slot.style.borderColor = '#cbd5e1';
            slot.style.background = '#ffffff';

            if (partText === correctPart) {
                // صحيح
                slot.style.borderColor = '#28a745';
                slot.style.background = '#d4edda';
                slot.style.color = '#155724';
                console.log(`✅ الخانة ${index} صحيحة`);
            } else {
                // خاطئ
                isAllCorrect = false;
                slot.style.borderColor = '#e67e22';
                slot.style.background = '#fef0e0';
                slot.style.color = '#856404';
                console.log(`❌ الخانة ${index} خاطئة`);
            }
        });

        if (isAllCorrect) {
            console.log('🎉 جميع الخانات صحيحة!');
            this.onSuccess();
        } else {
            console.log('❌ بعض الخانات خاطئة');
            this.showToast('❌ الترتيب غير صحيح، حاول مرة أخرى', 'error');
        }
    }

    // ==========================================
    // عند النجاح
    // ==========================================
    static onSuccess() {
        this.isCorrect = true;
        console.log('🎉 النجاح!');
        
        // تغيير لون الخانات إلى الأخضر
        this.slots.forEach(slot => {
            slot.style.borderColor = '#28a745';
            slot.style.background = '#d4edda';
            slot.style.color = '#155724';
        });

        this.showToast('🎉 أحسنت! الترتيب صحيح ✅', 'success');

        // تحديث الأيقونة
        this.updateIcon(true);

        // إغلاق النافذة بعد 800ms
        setTimeout(() => {
            this.close();
        }, 800);
    }

    // ==========================================
    // تحديث الأيقونة
    // ==========================================
    static updateIcon(success) {
        if (this.iconElement) {
            this.iconElement.textContent = success ? '✅' : '🔀';
            if (success) {
                this.iconElement.style.color = '#28a745';
                this.iconElement.style.cursor = 'default';
                this.iconElement.style.opacity = '0.8';
                this.iconElement.classList.add('success');
            }
        }
    }

    // ==========================================
    // إعادة تعيين ألوان التصحيح
    // ==========================================
    static clearCorrectionColors() {
        this.slots.forEach(slot => {
            if (slot.dataset.hasPart) {
                slot.style.borderColor = '#28a745';
                slot.style.background = '#f0fdf4';
                slot.style.color = '#1e293b';
            } else {
                slot.style.borderColor = '#cbd5e1';
                slot.style.background = '#ffffff';
                slot.style.color = '#94a3b8';
            }
        });
    }

    // ==========================================
    // إغلاق النافذة
    // ==========================================
    static close() {
        console.log('❌ إغلاق SentenceReorder');
        
        if (this.overlay) {
            this.overlay.style.opacity = '0';
            if (this.puzzleContainer) {
                this.puzzleContainer.style.transform = 'scale(0.95)';
            }
            
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.remove();
                }
                this.overlay = null;
                this.puzzleContainer = null;
                this.isOpen = false;
                this.isCorrect = false;
                console.log('✅ SentenceReorder تم إغلاقه');
            }, 200);
        }

        // إزالة مستمع ESC
        document.removeEventListener('keydown', this.handleEsc);
    }

    static handleEsc(e) {
        if (e.key === 'Escape' && SentenceReorder.isOpen) {
            SentenceReorder.close();
        }
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
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 28px;
            border-radius: 14px;
            font-size: 0.95rem;
            font-weight: 500;
            z-index: 100000;
            animation: sentenceToastIn 0.3s ease;
            max-width: 90%;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            text-align: center;
            font-family: inherit;
            border: 1px solid transparent;
        `;

        // ألوان حسب النوع
        const styles = {
            success: {
                background: '#d4edda',
                color: '#155724',
                border: '1px solid #28a745'
            },
            error: {
                background: '#fef0e0',
                color: '#856404',
                border: '1px solid #e67e22'
            },
            warning: {
                background: '#fff3cd',
                color: '#856404',
                border: '1px solid #ffc107'
            },
            info: {
                background: '#f0f8ff',
                color: '#2c3e66',
                border: '1px solid #38bdf8'
            }
        };

        const style = styles[type] || styles.info;
        toast.style.background = style.background;
        toast.style.color = style.color;
        toast.style.border = style.border;

        toast.textContent = message;
        document.body.appendChild(toast);

        // إزالة بعد 2.5 ثانية
        setTimeout(() => {
            toast.style.animation = 'sentenceToastOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 2500);
    }

    // ==========================================
    // التهيئة
    // ==========================================
    static init() {
        console.log('🧩 SentenceReorder: جاهز للعمل');
        this.addStyles();
    }

    static addStyles() {
        if (document.getElementById('sentenceReorderStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'sentenceReorderStyles';
        styles.textContent = `
            @keyframes sentenceToastIn {
                from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
            }
            
            @keyframes sentenceToastOut {
                from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                to { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.95); }
            }

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

            /* للهواتف */
            @media (max-width: 768px) {
                #sentencePuzzleCard {
                    padding: 16px 18px !important;
                    max-width: 96% !important;
                    border-radius: 16px !important;
                }
                
                .sentence-slot {
                    min-width: 50px !important;
                    min-height: 44px !important;
                    padding: 6px 10px !important;
                    font-size: 0.7rem !important;
                }
                
                .sentence-card {
                    padding: 8px 14px !important;
                    font-size: 0.75rem !important;
                    max-width: 160px !important;
                }
                
                #sentenceSlotsContainer {
                    gap: 6px !important;
                    padding: 6px !important;
                }
                
                #sentenceCardsContainer {
                    gap: 6px !important;
                    padding: 8px !important;
                }
                
                #sentenceCheckBtn {
                    padding: 10px 20px !important;
                    font-size: 0.85rem !important;
                }
            }

            @media (max-width: 480px) {
                .sentence-slot {
                    min-width: 40px !important;
                    min-height: 36px !important;
                    padding: 4px 6px !important;
                    font-size: 0.6rem !important;
                }
                
                .sentence-card {
                    padding: 6px 10px !important;
                    font-size: 0.65rem !important;
                    max-width: 120px !important;
                }
            }
        `;
        document.head.appendChild(styles);
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
        console.log('🧩 SentenceReorder: تم التهيئة');
    });
} else {
    SentenceReorder.init();
    console.log('🧩 SentenceReorder: تم التهيئة (مباشر)');
}

console.log('✅ sentenceReorder.js تم تحميله بالكامل');
