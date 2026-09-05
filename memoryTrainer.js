// ============================================
// MEMORY TRAINER V4 - يدعم Hören, Lesen 1, Lesen 2, Lesen 3, Sprachbausteine 1 و Sprachbausteine 2
// ============================================

class MemoryTrainer {
    constructor() {
        // البيانات الأساسية
        this.questions = [];
        this.allQuestions = [];
        this.sharedOptions = [];
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;
        this.examType = 'hoeren';

        // السؤال الحالي
        this.currentCorrectText = '';
        this.currentCorrectIndex = -1;
        this.currentOptions = [];
        this.currentQuestionIndex = 0;
        this.currentExamId = 1;
        this.currentQuestionObj = null;

        // الإحصائيات
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;

        // العناصر
        this.overlay = null;
        this.card = null;
        this.timer = null;
        this.isAnswered = false;
        this.isCardReady = false;

        // الإعدادات
        this.TOTAL_OPTIONS = 3;
        this.WRONG_OPTIONS = 2;
        this.LEVELS_KEY = 'memory_levels';
        this.MAX_LEVEL = 5;
        this.currentSkill = 'hoeren1';
        this.currentExamId = 1;

        // ✅ خريطة لتخزين sharedOptions لكل امتحان (خاص بـ Lesen 1 و 3 فقط)
        this.examSharedOptionsMap = {};
    }

    // ============================================
    // ✅ دالة الحصول على حالة المستخدم (مصدر واحد)
    // ============================================
    async getUserStatus() {
        try {
            if (typeof window.getUserStatusGlobal === 'function') {
                return await window.getUserStatusGlobal();
            }
            if (typeof window.getUserStatusForExam === 'function') {
                return await window.getUserStatusForExam();
            }
            return 'free';
        } catch (e) {
            console.warn('⚠️ فشل جلب حالة المستخدم:', e);
            return 'free';
        }
    }

    // ============================================
    // START - نقطة الدخول
    // ============================================

    async start(mode = 'single') {
        console.log(`🧠 بدء Memory Trainer V4 (المهارة: ${this.currentSkill}, الوضع: ${mode})...`);

        let examData = null;
        this.isFromList = false;
        this.sharedOptions = [];
        this.examSharedOptionsMap = {}; // إعادة تعيين الخريطة

        // ✅ وضع قائمة المراحل (من زر القائمة)
        if (mode === 'list') {
            const combinedKey = `_${this.currentSkill}_combinedData`;
            if (window[combinedKey]) {
                examData = window[combinedKey];
                this.isFromList = true;
                console.log(`📚 تدريب من قائمة ${this.currentSkill} (المرحلة ${examData.currentStage || 1})`);

                // تحديد نوع الامتحان
                this.examType = examData.examType || 'hoeren';
                if (this.currentSkill === 'lesen1' || this.currentSkill === 'lesen3') {
                    this.examType = 'matching';
                } else if (this.currentSkill === 'lesen2') {
                    this.examType = 'multiple';
                } else if (this.currentSkill === 'sprach1') {
                    this.examType = 'sprach1';
                } else if (this.currentSkill === 'sprach2') {
                    this.examType = 'sprach2';
                }

                // ============================================
                // ✅ ✅ ✅ منطق خاص بـ Lesen 1 و Lesen 3 فقط ✅ ✅ ✅
                // ============================================
                if (this.currentSkill === 'lesen1' || this.currentSkill === 'lesen3') {
                    // استخراج قائمة أرقام الامتحانات في هذه المرحلة
                    const examIds = examData.examIds || [];
                    if (examIds.length === 0) {
                        this.showNotAvailable('لا توجد امتحانات في هذه المرحلة');
                        return;
                    }

                    let allQuestions = [];
                    for (const examId of examIds) {
                        try {
                            const response = await fetch(`data/${this.currentSkill}/exam${examId}.json`);
                            if (!response.ok) {
                                console.warn(`⚠️ لا يمكن تحميل الامتحان ${examId}`);
                                continue;
                            }
                            const examJson = await response.json();

                            // استخراج sharedOptions الخاصة بهذا الامتحان
                            let sharedOpts = [];
                            if (this.currentSkill === 'lesen1' && examJson.sharedOptions) {
                                sharedOpts = examJson.sharedOptions;
                            } else if (this.currentSkill === 'lesen3' && examJson.situations) {
                                sharedOpts = examJson.situations;
                            }
                            if (sharedOpts.length === 0) {
                                console.warn(`⚠️ الامتحان ${examId} ليس لديه sharedOptions، سيتم تخطيه`);
                                continue;
                            }
                            this.examSharedOptionsMap[examId] = sharedOpts;

                            // استخراج الأسئلة حسب نوع المهارة
                            let examQuestions = [];
                            if (this.currentSkill === 'lesen1') {
                                examQuestions = examJson.questions || [];
                            } else if (this.currentSkill === 'lesen3') {
                                examQuestions = examJson.items || [];
                                // ✅ تصفية الفقرات التي ليس لها عنوان (correct === null) في Lesen 3
                                examQuestions = examQuestions.filter(item => {
                                    return item.correct !== null && item.correct !== undefined &&
                                        typeof item.correct === 'number' &&
                                        item.correct >= 0 && item.correct < sharedOpts.length;
                                });
                            }

                            // إضافة كل سؤال مع إرفاق examId و _sharedOptions
                            for (const q of examQuestions) {
                                const newQ = { ...q, examId: examId, _sharedOptions: sharedOpts };
                                allQuestions.push(newQ);
                            }

                            console.log(`✅ تم تحميل الامتحان ${examId} (${examQuestions.length} سؤال)`);
                        } catch (e) {
                            console.warn(`⚠️ فشل تحميل الامتحان ${examId}:`, e);
                        }
                    }

                    if (allQuestions.length === 0) {
                        this.showNotAvailable('لا توجد أسئلة صالحة للتدريب في هذه المرحلة');
                        return;
                    }

                                      // خلط الأسئلة ثم اختيار 5 امتحانات عشوائيا (إذا كان عدد الامتحانات > 5)
                    let selectedQuestions = [];
                    if (examIds.length > 5) {
                        // اختيار 5 امتحانات عشوائيا من قائمة examIds
                        const shuffledExamIds = this.shuffleArray([...examIds]);
                        const selectedExamIds = shuffledExamIds.slice(0, 5);
                        // فلترة allQuestions بحيث تحتوي فقط على أسئلة من الامتحانات المختارة
                        selectedQuestions = allQuestions.filter(q => selectedExamIds.includes(q.examId));
                        // إذا لم تكن هناك أسئلة كافية (قد يحدث)، نأخذ كل الأسئلة
                        if (selectedQuestions.length === 0) {
                            selectedQuestions = allQuestions;
                        }
                    } else {
                        selectedQuestions = allQuestions;
                    }
                    this.questions = this.shuffleArray(selectedQuestions);
                    this.allQuestions = this.questions.slice();
                    console.log(`📊 تم جمع ${this.questions.length} سؤال من ${examIds.length} امتحان (تم اختيار ${Math.min(examIds.length, 5)} امتحان عشوائيا)`);
                    // وضع sharedOptions العامة (للتوافق مع باقي الكود)
                    if (this.sharedOptions.length === 0 && examIds.length > 0) {
                        const firstId = examIds[0];
                        if (this.examSharedOptionsMap[firstId]) {
                            this.sharedOptions = this.examSharedOptionsMap[firstId];
                        }
                    }
                } 
                // ============================================
                // ✅ ✅ ✅ باقي المهارات (Hören, Lesen 2, Sprachbausteine) ✅ ✅ ✅
                // تبقى كما كانت في النسخة الأصلية
                // ============================================
                else {
                    let rawQuestions = examData.allQuestions || [];
                    if (this.currentSkill === 'lesen1' || this.currentSkill === 'lesen2' || this.currentSkill === 'lesen3' || this.currentSkill === 'sprach1' || this.currentSkill === 'sprach2') {
                        this.questions = rawQuestions;
                    } else {
                        this.questions = rawQuestions.filter(q => q.correct === true);
                    }
                    this.allQuestions = rawQuestions;

                    if (examData.sharedOptions) {
                        this.sharedOptions = examData.sharedOptions;
                    }
                }

                // التحقق من وجود أسئلة
                if (this.questions.length === 0) {
                    this.showNotAvailable("لا توجد إجابات صحيحة في هذا الامتحان");
                    return;
                }

            } else {
                if (typeof window.loadStageExams === 'function') {
                    await window.loadStageExams(this.currentSkill);
                    if (window[combinedKey]) {
                        this.start(mode);
                    } else {
                        this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد`);
                    }
                    return;
                } else {
                    this.showNotAvailable(`لم يتم تحميل بيانات ${this.currentSkill} بعد`);
                    return;
                }
            }
        } 
        // ✅ وضع الامتحان الفردي (من زر 🧠 داخل الامتحان)
        else {
            examData = window.currentExamData || window._currentExamData;
            if (examData) {
                this.currentSkill = window.currentSkill || 'hoeren1';
                this.currentExamId = window.currentExamId || 1;
                console.log(`📖 تدريب من امتحان فردي: ${this.currentSkill} exam${this.currentExamId}`);
                // تحميل sharedOptions من بيانات الامتحان الحالي
                if (this.currentSkill === 'lesen3' && examData.situations && !this.sharedOptions.length) {
                    this.sharedOptions = examData.situations;
                } else if (examData.sharedOptions) {
                    this.sharedOptions = examData.sharedOptions;
                }
                this.examType = examData.type || 'hoeren';
                if (this.currentSkill === 'lesen1' || this.currentSkill === 'lesen3') {
                    this.examType = 'matching';
                } else if (this.currentSkill === 'lesen2') {
                    this.examType = 'multiple';
                } else if (this.currentSkill === 'sprach1') {
                    this.examType = 'sprach1';
                } else if (this.currentSkill === 'sprach2') {
                    this.examType = 'sprach2';
                }

                // استخراج الأسئلة (كما هو موجود حالياً)
                let rawQuestions = [];
                if (this.currentSkill === 'sprach1' || this.currentSkill === 'sprach2') {
                    const examQuestions = (examData.options && Array.isArray(examData.options)) ? examData.options : (examData.questions || []);
                    rawQuestions = examQuestions.filter(q => q.memoryHighlight).map((q, idx) => {
                        const highlight = q.memoryHighlight || {};
                        return {
                            text: q.text || '',
                            correct: q.correct,
                            options: q.options || [],
                            examId: this.currentExamId,
                            questionIndex: idx,
                            originalQuestion: q,
                            memoryHighlight: q.memoryHighlight || null,
                            id: q.id,
                            before: highlight.before || '',
                            connector: highlight.connector || '',
                            after: highlight.after || '',
                            color: 0,
                            _sharedOptions: this.sharedOptions // للتوحيد
                        };
                    });
                } else if (this.currentSkill === 'lesen3' && examData.items) {
                    const items = examData.items || [];
                    rawQuestions = items.map((q, idx) => {
                        return {
                            ...q,
                            examId: this.currentExamId,
                            questionIndex: idx,
                            _sharedOptions: this.sharedOptions
                        };
                    });
                    // تصفية correct === null في Lesen 3 للوضع الفردي أيضاً
                    if (this.sharedOptions.length > 0) {
                        rawQuestions = rawQuestions.filter(item => {
                            return item.correct !== null && item.correct !== undefined &&
                                typeof item.correct === 'number' &&
                                item.correct >= 0 && item.correct < this.sharedOptions.length;
                        });
                    }
                } else {
                    const examQuestions = examData.questions || [];
                    rawQuestions = examQuestions.map((q, idx) => {
                        return {
                            ...q,
                            examId: this.currentExamId,
                            questionIndex: idx,
                            _sharedOptions: this.sharedOptions
                        };
                    });
                }
                this.questions = rawQuestions;
                this.allQuestions = rawQuestions.slice();

                if (this.questions.length === 0) {
                    this.showNotAvailable('لا توجد أسئلة صالحة في هذا الامتحان');
                    return;
                }
            } else {
                this.showNotAvailable("لا توجد بيانات امتحان");
                return;
            }
        }

        // ✅ تصفية Lesen 3 (ضمان إضافي)
        if (this.currentSkill === 'lesen3' && this.sharedOptions.length > 0) {
            const before = this.questions.length;
            this.questions = this.questions.filter(item => {
                const isValid = item.correct !== null &&
                    item.correct !== undefined &&
                    typeof item.correct === 'number' &&
                    item.correct >= 0 &&
                    item.correct < this.sharedOptions.length;
                return isValid;
            });
            const after = this.questions.length;
            if (after < before) {
                console.log(`🔍 Lesen 3: تم استبعاد ${before - after} فقرة غير صالحة (correct == null أو خارج النطاق)، بقي ${after} فقرة للتدريب`);
            }
        }

        if (this.questions.length === 0) {
            this.showNotAvailable("لا توجد إجابات صحيحة في هذا الامتحان");
            return;
        }

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
        this.isCardReady = false;

        this.createOverlay();
        this.createCardStructure();

        if (this.isFromList) {
            this.showIntroCardList();
        } else {
            this.showIntroCardSingle();
        }
    }

    // ============================================
    // بناء Overlay و Card
    // ============================================

    createOverlay() {
        if (this.overlay) this.overlay.remove();
        this.overlay = document.createElement('div');
        this.overlay.className = 'memory-trainer-overlay';
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                if (this.currentIndex >= this.trainingQueue.length && this.isActive) {
                    this.wrongQuestions.length > 0 ? this.showPhaseComplete() : this.showResults();
                    return;
                }
                this.close();
            }
        });
        document.body.appendChild(this.overlay);
    }

    createCardStructure() {
        if (!this.overlay) {
            console.warn('⚠️ createCardStructure: overlay غير موجود، يتم إنشاؤه تلقائياً');
            this.createOverlay();
        }
        const oldCard = this.overlay.querySelector('.memory-trainer-card-container');
        if (oldCard) oldCard.remove();
        this.card = document.createElement('div');
        this.card.className = 'memory-trainer-card-container';
        this.card.style.cssText = `
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: memorySlideUp 0.15s ease;
        `;
        this.overlay.appendChild(this.card);
        this.isCardReady = true;
    }

    updateCard(html) {
        if (!this.isCardReady || !this.card) this.createCardStructure();
        this.card.innerHTML = html;
    }

    // ============================================
    // بناء قائمة التدريب (مع تكرار نصف الجمل)
    // ============================================

    buildTrainingQueue() {
        const baseQueue = this.questions.map(q => q);
        const repeatCount = Math.ceil(baseQueue.length / 2);
        const shuffled = this.shuffleArray([...baseQueue]);
        const repeatItems = [];
        for (let i = 0; i < Math.min(repeatCount, shuffled.length); i++) {
            repeatItems.push(shuffled[i]);
        }
        this.trainingQueue = this.shuffleArray([...baseQueue, ...repeatItems]);
        console.log(`📊 قائمة التدريب: ${this.trainingQueue.length} جملة (${this.isFromList ? 'مرحلة' : 'امتحان فردي'})`);
    }

    // ============================================
    // نظام المستويات (باستخدام المعرفات الثابتة)
    // ============================================

    buildSentenceId(skill, examId, questionIndex) {
        if (window.buildSentenceId) {
            return window.buildSentenceId(skill, examId, questionIndex);
        }
        return `${skill}_exam${examId}_${questionIndex}`;
    }

    getSentenceLevel(sentenceId) {
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        return data[sentenceId] !== undefined ? data[sentenceId] : 0;
    }

    setSentenceLevel(sentenceId, level) {
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let newLevel = Math.max(0, Math.min(this.MAX_LEVEL, level));
        data[sentenceId] = newLevel;
        localStorage.setItem(this.LEVELS_KEY, JSON.stringify(data));
    }

    increaseLevel(sentenceId) {
        const oldLevel = this.getSentenceLevel(sentenceId);
        if (oldLevel < this.MAX_LEVEL) {
            const newLevel = oldLevel + 1;
            this.setSentenceLevel(sentenceId, newLevel);
            console.log(`⬆️ زيادة مستوى ${sentenceId} -> ${newLevel}`);
        }
    }

    decreaseLevel(sentenceId) {
        const oldLevel = this.getSentenceLevel(sentenceId);
        if (oldLevel > 0) {
            const newLevel = oldLevel - 1;
            this.setSentenceLevel(sentenceId, newLevel);
            console.log(`⬇️ إنقاص مستوى ${sentenceId} -> ${newLevel}`);
        }
    }

    // ============================================
    // دوال حساب النسب
    // ============================================

    getExamProgress(skill, examId) {
        if (window.getExamProgress) return window.getExamProgress(skill, examId);
        const prefix = `${skill}_exam${examId}_`;
        const data = JSON.parse(localStorage.getItem(this.LEVELS_KEY) || '{}');
        let totalLevels = 0, count = 0;
        for (const key in data) {
            if (key.startsWith(prefix)) { totalLevels += data[key]; count++; }
        }
        if (count === 0) return 0;
        return Math.min(100, Math.round((totalLevels / (count * this.MAX_LEVEL)) * 100));
    }

    getOverallProgressForSkill(skill) {
        if (window.getOverallProgress) {
            if (window.getOverallProgress.length === 1) {
                return window.getOverallProgress(skill);
            } else {
                return window.getOverallProgress();
            }
        }
        return 0;
    }

    getStageProgressForSkill(skill) {
        if (window.getStageProgress) {
            return window.getStageProgress(skill);
        }
        return 0;
    }

    // ============================================
    // توليد الخيارات (تدعم Hören و Lesen 1 و Lesen 3)
    // ============================================

    generateOptions(correctText, currentQuestionObj) {
        const options = [correctText];
        let added = 0;

        if (this.examType === 'matching') {
            // ✅ الحصول على sharedOptions المناسبة للسؤال الحالي
            let sharedOpts = this.sharedOptions;
            if (currentQuestionObj && currentQuestionObj._sharedOptions && currentQuestionObj._sharedOptions.length > 0) {
                sharedOpts = currentQuestionObj._sharedOptions;
            } else if (currentQuestionObj && currentQuestionObj.examId && this.examSharedOptionsMap[currentQuestionObj.examId]) {
                sharedOpts = this.examSharedOptionsMap[currentQuestionObj.examId];
            }

            if (sharedOpts && sharedOpts.length > 0) {
                const correctIndex = currentQuestionObj.correct;
                const correctOption = sharedOpts[correctIndex];
                const allOptions = sharedOpts.filter((_, idx) => idx !== correctIndex);
                const shuffled = this.shuffleArray([...allOptions]);
                const wrongOptions = shuffled.slice(0, 2);
                const finalOptions = [correctOption, ...wrongOptions];
                while (finalOptions.length < 3) {
                    const extra = sharedOpts[Math.floor(Math.random() * sharedOpts.length)];
                    if (!finalOptions.includes(extra)) finalOptions.push(extra);
                }
                return this.shuffleArray(finalOptions);
            }
        }

        // الحالة العامة (إذا لم نجد sharedOptions)
        const wrongTexts = this.allQuestions
            .filter(q => q.text !== correctText)
            .map(q => q.text);

        let shuffledWrong = this.shuffleArray([...wrongTexts]);
        for (let i = 0; i < shuffledWrong.length && added < this.WRONG_OPTIONS; i++) {
            const candidate = shuffledWrong[i];
            if (!options.includes(candidate) && candidate.trim() !== '') {
                options.push(candidate);
                added++;
            }
        }

        while (options.length < this.TOTAL_OPTIONS) {
            console.warn('⚠️ لم يتم العثور على جمل خاطئة كافية، نضيف جملة وهمية مؤقتة');
            options.push(`جملة ${options.length + 1}`);
        }

        return this.shuffleArray(options);
    }

    // ============================================
    // شاشات البداية
    // ============================================

    showIntroCardSingle() {
        const examPercent = this.getExamProgress(this.currentSkill, this.currentExamId);
        let examLabel = `امتحان ${this.currentExamId}`;
        if (this.examType === 'matching') {
            if (this.currentSkill === 'lesen3') {
                examLabel = `امتحان ${this.currentExamId} (Lesen 3)`;
            } else {
                examLabel = `امتحان ${this.currentExamId} (Lesen 1)`;
            }
        } else if (this.examType === 'multiple') {
            examLabel = `امتحان ${this.currentExamId} (Lesen 2)`;
        } else if (this.examType === 'sprach1') {
            examLabel = `امتحان ${this.currentExamId} (Sprachbausteine 1)`;
        } else if (this.examType === 'sprach2') {
            examLabel = `امتحان ${this.currentExamId} (Sprachbausteine 2)`;
        }
        this.updateCard(`
            <div class="memory-trainer-intro">
                <div class="memory-trainer-icon">🧩</div>
                <h2>استدعاء ذكي</h2>
                <p style="font-size:14px;color:#334155;margin:6px 0 2px 0;">تدريب ${examLabel}.</p>
                <p style="font-size:13px;color:#64748B;margin:2px 0 14px 0;">${this.examType === 'multiple' ? 'سترى السؤال مرة واحدة، ثم سنطلب منك اختيار الجواب الصحيح.' : this.examType === 'sprach1' || this.examType === 'sprach2' ? 'سترى الجملة مع الفراغ، ثم سنطلب منك اختيار الكلمة المناسبة.' : 'سترى النص مرة واحدة، ثم سنطلب منك اختيار العنوان المناسب.'}</p>
                <div style="margin:4px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:4px 10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${examPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:12px;font-weight:600;color:#1565C0;">${examPercent}%</span>
                    </div>
                </div>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ</button>
            </div>
        `);
    }

    // ============================================
    // ✅ شاشة البداية من القائمة (مع زر مقفل للمجاني)
    // ============================================
    showIntroCardList() {
        this.getUserStatus().then(status => {
            const isPremium = (status === 'premium');
            const percent = this.getOverallProgressForSkill(this.currentSkill);
            const total = this.trainingQueue.length;
            let currentStage = 1, totalStages = 1;
            if (window.getCurrentStage && window.getTotalStages) {
                currentStage = window.getCurrentStage(this.currentSkill);
                totalStages = window.getTotalStages(this.currentSkill);
            }
            let skillLabel = this.currentSkill;
            if (this.examType === 'matching') {
                if (this.currentSkill === 'lesen3') {
                    skillLabel = 'Lesen 3';
                } else {
                    skillLabel = 'Lesen 1';
                }
            } else if (this.examType === 'multiple') {
                skillLabel = 'Lesen 2';
            } else if (this.examType === 'sprach1') {
                skillLabel = 'Sprachbausteine 1';
            } else if (this.examType === 'sprach2') {
                skillLabel = 'Sprachbausteine 2';
            }

            let buttonHtml = '';
            // داخل showIntroCardList()
if (isPremium) {
    buttonHtml = `<button class="memory-trainer-btn primary" onclick="window.memoryTrainer.showMemoryCard()">ابدأ التدريب</button>`;
} else {
    buttonHtml = `
        <button class="memory-trainer-btn locked" onclick="window.location.href='subscribe.html'" style="
            padding: 8px 20px;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
            margin-top: 12px;
            background: #334155;
            color: #94a3b8;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: inline-block;
            width: auto;
            opacity: 0.85;
        "
        onmouseover="this.style.opacity='1'; this.style.background='#475569'; this.style.color='#e2e8f0';"
        onmouseout="this.style.opacity='0.85'; this.style.background='#334155'; this.style.color='#94a3b8';"
        >
            🔒 اشترك للوصول
        </button>
    `;
}
                    this.updateCard(`
                <div class="memory-trainer-intro">
                    <h2>استدعاء متقدم 🧩</h2>
                    <p style="font-size:14px;color:#334155;margin:4px 0 2px 0;">هاد الميزة غدي تخليك تراجع 5 امتحانات في كل مرة من المرحلة ${currentStage} في ${skillLabel}.</p>
                    <p style="font-size:13px;color:#64748B;margin:2px 0 12px 0;">كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار الأسئلة.</p>
                    <div style="margin:10px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;text-align:left;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${percent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${percent}%</span>
                        </div>
                    </div>
                    <p style="font-size:12px;color:#94A3B8;margin:4px 0 4px 0;">${total} نص للتدريب</p>
                    <p style="font-size:11px;color:#94A3B8;margin:0 0 12px 0;">المرحلة ${currentStage} / ${totalStages}</p>
                    <p style="font-size:11px;color:#94A3B8;margin:0 0 6px 0;">في كل مرة: 5 امتحانات فقط</p>
                    ${buttonHtml}
                </div>
            `);
        }).catch(() => {
                      this.updateCard(`
                <div class="memory-trainer-intro">
                    <h2>استدعاء متقدم 🧩</h2>
                    <p style="font-size:14px;color:#334155;margin:4px 0 2px 0;">هاد الميزة غدي تخليك تراجع 5 امتحانات في كل مرة من المرحلة الحالية.</p>
                    <p style="font-size:13px;color:#64748B;margin:2px 0 12px 0;">كلما تدربت أكثر، أصبح النظام أكثر ذكاءً في اختيار الأسئلة.</p>
                    <div style="margin:10px 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;text-align:left;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:0%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">0%</span>
                        </div>
                    </div>
                    <p style="font-size:12px;color:#94A3B8;margin:4px 0 4px 0;">جاري التحميل...</p>
                    <p style="font-size:11px;color:#94A3B8;margin:0 0 6px 0;">في كل مرة: 5 امتحانات فقط</p>
                    <button class="memory-trainer-btn locked" onclick="window.location.href='subscribe.html'" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;margin-top:12px;background:#64748B;color:#cbd5e1;opacity:0.7;">🔒 متاح للحساب الكامل</button>
                </div>
            `);
        });
    }

    // ============================================
    // عرض البطاقات - تخطيط خاص لكل نوع
    // ============================================

    showMemoryCard() {
        this.clearTimer();
        this.isAnswered = false;

        if (this.currentIndex >= this.trainingQueue.length) {
            this.showPhaseComplete();
            return;
        }

        const item = this.trainingQueue[this.currentIndex];
        const textToShow = item.text;
        this.currentCorrectText = textToShow;
        this.currentExamId = item.examId || this.currentExamId;
        this.currentQuestionIndex = item.questionIndex || 0;
        this.currentQuestionObj = item;
        this.currentCorrectIndex = item.correct;

        // ✅ الحصول على sharedOptions المناسبة لهذا السؤال
        let sharedOpts = this.sharedOptions;
        if (item._sharedOptions && item._sharedOptions.length > 0) {
            sharedOpts = item._sharedOptions;
        } else if (item.examId && this.examSharedOptionsMap[item.examId]) {
            sharedOpts = this.examSharedOptionsMap[item.examId];
        }

        let cardContent = '';

        if (this.examType === 'matching') {
            // ============================================
            // تخطيط خاص لـ Lesen 1 و Lesen 3
            // ============================================
            const correctIndex = this.currentCorrectIndex;
            const correctTitle = (sharedOpts && sharedOpts[correctIndex]) || '';
            const titlePrefix = correctTitle.match(/^[a-zA-Z][\.\)]\s*/) ? correctTitle.match(/^[a-zA-Z][\.\)]\s*/)[0] : '';
            const titleWithoutPrefix = correctTitle.replace(/^[a-zA-Z][\.\)]\s*/, '');

            cardContent = `
                <div class="memory-trainer-card" style="
                    background: #FFFFFF;
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid #F1F5F9;
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex + 1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 8px;
                            text-align: center;
                        ">
                           🌿 اقرأ الفقرة جيداً، سأطلب منك اختيار الحالة المناسبة.
                        </p>

                        <!-- صندوق القراءة الخاص بـ Lesen 1 و Lesen 3 -->
                        <div class="memory-reading-box" style="
                            width: 100%;
                            height: 160px;
                            overflow-y: auto;
                            padding: 12px 16px;
                            background: #F8FAFC;
                            border: 1px solid #EDF2F7;
                            border-radius: 10px;
                            text-align: left;
                            direction: rtl;
                            font-size: 15px;
                            line-height: 1.8;
                            font-weight: 400;
                            color: #1a202c;
                            box-sizing: border-box;
                            margin: 8px 0 12px 0;
                        ">
                            ${textToShow}
                        </div>

                        <!-- العنوان كسطر عادي -->
                        <div style="
                            text-align: right;
                            font-size: 15px;
                            font-weight: 500;
                            color: #1a5a1a;
                            padding: 2px 4px;
                            direction: rtl;
                            margin-top: 0;
                        ">
                            ✅ ${titlePrefix}${titleWithoutPrefix}
                        </div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 10px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `;
        } else if (this.examType === 'multiple') {
            // ============================================
            // تخطيط خاص لـ Lesen 2
            // ============================================
            const realQuestionNumber = this.currentQuestionIndex !== undefined ? this.currentQuestionIndex + 1 : this.currentIndex + 1;
            const correctOptionText = item.options && item.options.length > 0 ? item.options[item.correct] : '';
            let optionText = correctOptionText;
            if (/^[a-zA-Z][\.\)]\s*/.test(optionText)) {
                optionText = optionText.replace(/^[a-zA-Z][\.\)]\s*/, '');
            }

            cardContent = `
                <div class="memory-trainer-card" style="
                    background: #FFFFFF;
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid #F1F5F9;
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex + 1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 8px;
                            text-align: center;
                        ">
                            🌿 اقرأ السؤال جيداً، سأطلب منك اختيار الجواب الصحيح.
                        </p>

                       <div style="
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #1a5a1a;
    padding: 6px 12px;
    padding-left: 30px;
    margin-top: 0;
    background: transparent;
    border-radius: 6px;
">
    ✅ ${optionText}
</div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 10px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `;
        } else if (this.examType === 'sprach1') {
            const item = this.currentQuestionObj;
            const highlight = item.memoryHighlight || {};
            const id = item.id || (this.currentQuestionIndex + 1);
            const before = highlight.before || '';
            const connector = highlight.connector || '';
            const after = highlight.after || '';
            const bgColor = '#FFFFFF';
            
            cardContent = `
                <div class="memory-trainer-card" style="
                    background: ${bgColor};
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                    transition: background 0.3s ease;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid rgba(0,0,0,0.06);
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex + 1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 12px;
                            text-align: center;
                        ">
                            🌿 اختر الكلمة المناسبة للفراغ.
                        </p>

                      <!-- صندوق القراءة الخاص بـ Sprachbausteine 1 -->
<div class="memory-reading-box" style="
    width: 100%;
    height: 80px;
    overflow-y: auto;
    padding: 12px 16px;
    background: #F8FAFC;
    border: 1px solid #EDF2F7;
    border-radius: 10px;
    text-align: left;
    direction: rtl;
    font-size: 17px;
    line-height: 1.8;
    font-weight: 400;
    color: #1a202c;
    box-sizing: border-box;
    margin: 8px 0 12px 0;
">
    ${before} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${id}]</span> ${after}
</div>

                        <!-- الإجابة الصحيحة -->
<div style="
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: #1a5a1a;
    padding: 6px 12px;
    padding-left: 20px;
    margin-top: 0;
    background: transparent;
    border-radius: 6px;
">
    ✅ ${connector}
</div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 12px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `;
        } else if (this.examType === 'sprach2') {
            const item = this.currentQuestionObj;
            const highlight = item.memoryHighlight || {};
            const id = item.id || (this.currentQuestionIndex + 1);
            const before = highlight.before || '';
            const connector = highlight.connector || '';
            const after = highlight.after || '';
            const bgColor = '#FFFFFF';
            
            cardContent = `
                <div class="memory-trainer-card" style="
                    background: ${bgColor};
                    border: 1px solid #E8EEF5;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    position: relative;
                    transition: background 0.3s ease;
                ">
                    <div class="memory-trainer-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid rgba(0,0,0,0.06);
                    ">
                        <span class="memory-trainer-progress" style="
                            font-size: 12px;
                            color: #94A3B8;
                            font-weight: 500;
                        ">
                            ${this.currentIndex + 1}/${this.trainingQueue.length}
                        </span>
                        <span class="memory-trainer-focus" style="
                            font-size: 13px;
                            font-weight: 600;
                            color: #2D6A4F;
                        ">
                            🍃 خذ وقتك
                        </span>
                    </div>

                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint" style="
                            font-size: 14px;
                            color: #4A7C59;
                            margin-bottom: 12px;
                            text-align: center;
                        ">
                            🌿 اختر الكلمة المناسبة للفراغ.
                        </p>

                        <!-- صندوق القراءة الخاص بـ Sprachbausteine 2 -->
                        <div class="memory-reading-box" style="
                            width: 100%;
                            height: 80px;
                            overflow-y: auto;
                            padding: 12px 16px;
                            background: #F8FAFC;
                            border: 1px solid #EDF2F7;
                            border-radius: 10px;
                            text-align: left;
                            direction: rtl;
                            font-size: 17px;
                            line-height: 1.8;
                            font-weight: 400;
                            color: #1a202c;
                            box-sizing: border-box;
                            margin: 8px 0 12px 0;
                        ">
                            ${before} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${id}]</span> ${after}
                        </div>

                        <!-- الإجابة الصحيحة -->
                        <div style="
                            text-align: left;
                            font-size: 16px;
                            font-weight: 500;
                            color: #1a5a1a;
                            padding: 6px 12px;
                            padding-left: 20px;
                            margin-top: 0;
                            background: transparent;
                            border-radius: 6px;
                        ">
                            ✅ ${connector}
                        </div>
                    </div>

                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()" style="
                        padding: 8px 20px;
                        border: none;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        margin-top: 12px;
                        background: #1565C0;
                        color: white;
                        box-shadow: 0 2px 6px rgba(21, 101, 192, 0.15);
                        display: inline-block;
                        width: auto;
                    ">
                        أنا جاهز
                    </button>
                </div>
            `;
        } else {
            // ============================================
            // Hören: التصميم الأصلي (بدون تغيير)
            // ============================================
            cardContent = `
                <div class="memory-trainer-card">
                    <div class="memory-trainer-header">
                        <span class="memory-trainer-progress">${this.currentIndex + 1}/${this.trainingQueue.length}</span>
                        <span class="memory-trainer-focus">🍃 خذ وقتك</span>
                    </div>
                    <div class="memory-trainer-content">
                        <p class="memory-trainer-hint">🌿 سأطلب منك هذه الجملة بعد قليل.</p>
                        <div class="memory-trainer-answer">
                            <span>${textToShow}</span>
                        </div>
                    </div>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.readyToRecall()">أنا جاهز</button>
                </div>
            `;
        }

        this.updateCard(cardContent);
    }

    readyToRecall() {
        this.clearTimer();
        const currentItem = this.currentQuestionObj;

        // ✅ الحصول على sharedOptions المناسبة لهذا السؤال
        let sharedOpts = this.sharedOptions;
        if (currentItem._sharedOptions && currentItem._sharedOptions.length > 0) {
            sharedOpts = currentItem._sharedOptions;
        } else if (currentItem.examId && this.examSharedOptionsMap[currentItem.examId]) {
            sharedOpts = this.examSharedOptionsMap[currentItem.examId];
        }

        // توليد الخيارات
        if (this.examType === 'matching') {
            const correctIndex = this.currentCorrectIndex;
            const correctOption = sharedOpts[correctIndex];
            const wrongOptions = sharedOpts
                .filter((_, idx) => idx !== correctIndex)
                .sort(() => Math.random() - 0.5)
                .slice(0, 2);
            while (wrongOptions.length < 2) {
                const extra = sharedOpts[Math.floor(Math.random() * sharedOpts.length)];
                if (!wrongOptions.includes(extra) && extra !== correctOption) {
                    wrongOptions.push(extra);
                }
            }
            this.currentOptions = this.shuffleArray([correctOption, ...wrongOptions]);
        } else if (this.examType === 'multiple') {
            this.currentOptions = currentItem.options || [];
            if (this.currentOptions.length === 0) {
                console.warn('⚠️ لا توجد خيارات في السؤال، نستخدم generateOptions كحل احتياطي');
                this.currentOptions = this.generateOptions(this.currentCorrectText, currentItem);
            }
        } else if (this.examType === 'sprach1') {
            this.currentOptions = currentItem.options || [];
            if (this.currentOptions.length === 0) {
                console.warn('⚠️ لا توجد خيارات في السؤال، نستخدم generateOptions كحل احتياطي');
                this.currentOptions = this.generateOptions(this.currentCorrectText, currentItem);
            }
        } else if (this.examType === 'sprach2') {
            const allOptions = currentItem.options || [];
            const correctText = currentItem.connector || currentItem.correct;
            const wrongOptions = allOptions
                .filter(opt => opt !== correctText)
                .sort(() => Math.random() - 0.5)
                .slice(0, 2);
            this.currentOptions = this.shuffleArray([correctText, ...wrongOptions]);
        } else {
            this.currentOptions = this.generateOptions(this.currentCorrectText, currentItem);
        }

        // بناء سؤال التذكر
        let questionText = '';
        let displayQuestion = '';

        if (this.examType === 'matching') {
            questionText = this.currentSkill === 'lesen3' ? 'اختر الحالة المناسبة للفقرة التي قرأتها:' : 'اختر العنوان المناسب للنص الذي قرأته:';
        } else if (this.examType === 'multiple') {
            questionText = 'ما الاختيار الصحيح؟';
            const realQuestionNumber = this.currentQuestionIndex !== undefined ? this.currentQuestionIndex + 1 : this.currentIndex + 1;
            displayQuestion = `
                <div style="font-size:17px; font-weight:500; text-align:left; padding:12px 0; color:#1a202c; margin-bottom:16px;">
                    ${realQuestionNumber}. ${this.currentCorrectText}:
                </div>
            `;
        } else if (this.examType === 'sprach1') {
            questionText = 'اختر الكلمة الصحيحة:';
            const highlight = currentItem.memoryHighlight || {};
            const id = currentItem.id || (this.currentQuestionIndex + 1);
            const before = highlight.before || '';
            const after = highlight.after || '';
            displayQuestion = `
                <div style="
                    font-size: 18px;
                    font-weight: 500;
                    text-align: left;
                    padding: 16px 12px;
                    color: #1a202c;
                    margin: 4px 0 16px 0;
                    line-height: 1.8;
                    background: rgba(255,255,255,0.5);
                    border-radius: 8px;
                ">
                    ${before} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${id}]</span> ${after}
                </div>
            `;
        } else if (this.examType === 'sprach2') {
            questionText = 'اختر الكلمة الصحيحة:';
            const highlight = currentItem.memoryHighlight || {};
            const id = currentItem.id || (this.currentQuestionIndex + 1);
            const before = highlight.before || '';
            const after = highlight.after || '';
            displayQuestion = `
                <div style="
                    font-size: 18px;
                    font-weight: 500;
                    text-align: left;
                    padding: 16px 12px;
                    color: #1a202c;
                    margin: 4px 0 16px 0;
                    line-height: 1.8;
                    background: rgba(255,255,255,0.5);
                    border-radius: 8px;
                ">
                    ${before} <span style="font-weight:700;color:#1565C0;background:#E3F2FD;padding:0 6px;border-radius:4px;">[${id}]</span> ${after}
                </div>
            `;
        } else {
            questionText = 'ما هي الجملة التي رأيتها قبل قليل؟';
        }

        // ✅ إبقاء الفقرة ظاهرة لـ matching (Lesen 1 و 3)
        let paragraphDisplay = '';
        if (this.examType === 'matching') {
            paragraphDisplay = `
                <div class="memory-reading-box" style="
                    width: 100%;
                    max-height: 140px;
                    overflow-y: auto;
                    padding: 12px 16px;
                    background: #F8FAFC;
                    border: 1px solid #EDF2F7;
                    border-radius: 10px;
                    text-align: right;
                    direction: rtl;
                    font-size: 15px;
                    line-height: 1.8;
                    font-weight: 400;
                    color: #1a202c;
                    box-sizing: border-box;
                    margin: 8px 0 12px 0;
                ">
                    ${this.currentCorrectText}
                </div>
            `;
        }

        this.updateCard(`
            <div class="memory-trainer-recall" style="
                background: #FFFFFF;
                border: 1px solid #E8EEF5;
                border-radius: 12px;
                padding: 20px 24px;
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                position: relative;
            ">
                <div class="memory-trainer-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #F1F5F9;
                ">
                    <span class="memory-trainer-progress" style="
                        font-size: 12px;
                        color: #94A3B8;
                        font-weight: 500;
                    ">
                        ${this.currentIndex + 1}/${this.trainingQueue.length}
                    </span>
                    <span class="memory-trainer-focus" style="
                        font-size: 13px;
                        font-weight: 600;
                        color: #2D6A4F;
                    ">
                        🍃 خذ وقتك
                    </span>
                </div>
                <div class="memory-trainer-content">
                    <p class="memory-trainer-question" style="
                        font-size: 15px;
                        font-weight: 500;
                        color: #334155;
                        margin-bottom: 10px;
                    ">
                        ${questionText}
                    </p>
                    ${displayQuestion}
                    ${paragraphDisplay}
                    <div class="memory-trainer-options" style="
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                        margin: 8px 0;
                    ">
                       ${this.currentOptions.map((opt, idx) => `
    <button class="memory-trainer-option" data-index="${idx}" onclick="window.memoryTrainer.checkAnswer(${idx})" style="
        background: #FFFFFF;
        border: 1.5px solid #E8EEF5;
        border-radius: 10px;
        padding: 9px 14px;
        font-size: 14px;
        font-weight: 500;
        color: #334155;
        cursor: pointer;
        text-align: left;
        transition: background-color 0.08s ease, border-color 0.08s ease, box-shadow 0.08s ease, transform 0.08s ease;
        transform: translateY(0);
        box-shadow: none;
    "
    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.08)'; this.style.borderColor='#2c3e66';"
    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='#E8EEF5';"
    >
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
    // التصحيح (مع تحديث المستوى)
    // ============================================

    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;
        this.isAnswered = true;
        this.attempts++;

        const selectedText = this.currentOptions[selectedIndex];
        let isCorrect = false;
        let correctText = '';

        if (this.examType === 'matching') {
            // ✅ الحصول على sharedOptions المناسبة لهذا السؤال
            let sharedOpts = this.sharedOptions;
            if (this.currentQuestionObj && this.currentQuestionObj._sharedOptions && this.currentQuestionObj._sharedOptions.length > 0) {
                sharedOpts = this.currentQuestionObj._sharedOptions;
            } else if (this.currentQuestionObj && this.currentQuestionObj.examId && this.examSharedOptionsMap[this.currentQuestionObj.examId]) {
                sharedOpts = this.examSharedOptionsMap[this.currentQuestionObj.examId];
            }
            const correctIndex = this.currentCorrectIndex;
            const correctOption = sharedOpts[correctIndex];
            isCorrect = (selectedText === correctOption);
            correctText = correctOption;
        } else if (this.examType === 'multiple') {
            const correctIndex = this.currentQuestionObj.correct;
            const correctOption = this.currentOptions[correctIndex];
            isCorrect = (selectedText === correctOption);
            correctText = correctOption;
        } else if (this.examType === 'sprach1') {
            const correctOption = this.currentQuestionObj.connector || this.currentQuestionObj.correct;
            isCorrect = (selectedText === correctOption);
            correctText = correctOption;
        } else if (this.examType === 'sprach2') {
            const correctOption = this.currentQuestionObj.connector || this.currentQuestionObj.correct;
            isCorrect = (selectedText === correctOption);
            correctText = correctOption;
        } else {
            isCorrect = (selectedText === this.currentCorrectText);
            correctText = this.currentCorrectText;
        }

        const skill = this.currentSkill;
        const examId = this.currentExamId;
        const qIndex = this.currentQuestionIndex;
        const sentenceId = this.buildSentenceId(skill, examId, qIndex);

        const allOptions = document.querySelectorAll('.memory-trainer-option');
        const feedback = document.getElementById('memory-trainer-feedback');

        allOptions.forEach(btn => { btn.disabled = true; btn.style.opacity = '0.7'; btn.style.cursor = 'default'; });

        if (isCorrect) {
            this.correctAttempts++;
            this.increaseLevel(sentenceId);
            allOptions[selectedIndex].style.borderColor = '#28a745';
            allOptions[selectedIndex].style.backgroundColor = '#d4edda';
            feedback.innerHTML = `<button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="padding:6px 16px; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:#28a745; color:white;">التالي →</button>`;
        } else {
            this.decreaseLevel(sentenceId);
            if (!this.wrongQuestions.includes(this.currentQuestionObj)) {
                this.wrongQuestions.push(this.currentQuestionObj);
            }
            allOptions[selectedIndex].style.borderColor = '#e67e22';
            allOptions[selectedIndex].style.backgroundColor = '#fef0e0';
            allOptions.forEach((btn, idx) => {
                if (this.currentOptions[idx] === correctText) {
                    btn.style.borderColor = '#28a745';
                    btn.style.backgroundColor = '#d4edda';
                }
            });
            feedback.innerHTML = `
                <div style="display:flex;gap:10px;justify-content:center;margin-top:8px;">
                    <button class="memory-trainer-btn secondary small" onclick="window.memoryTrainer.retryQuestion()" style="padding:6px 16px; border:2px solid #e67e22; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:white; color:#e67e22;">🔄 إعادة المحاولة</button>
                    <button class="memory-trainer-btn primary small" onclick="window.memoryTrainer.nextQuestion()" style="padding:6px 16px; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white;">التالي →</button>
                </div>
            `;
        }

        if (this.isFromList) {
            this.updateProgressBar();
        }
    }

    // ============================================
    // تحديث شريط التقدم
    // ============================================

    updateProgressBar() {
        const percent = this.getOverallProgressForSkill(this.currentSkill);
        const progressElements = this.card?.querySelectorAll('.memory-progress-fill, .memory-trainer-progress-bar');
        if (progressElements) {
            progressElements.forEach(el => {
                if (el.classList.contains('memory-progress-fill')) {
                    el.style.width = percent + '%';
                }
            });
        }
        const percentText = this.card?.querySelector('.memory-progress-percent');
        if (percentText) percentText.textContent = percent + '%';
    }

    retryQuestion() {
        this.isAnswered = false;
        this.currentIndex--;
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.trainingQueue.length) {
            this.showMemoryCard();
        } else {
            this.showPhaseComplete();
        }
    }

    // ============================================
    // نهاية المرحلة الأولى (مراجعة الأخطاء)
    // ============================================

    showPhaseComplete() {
        this.clearTimer();
        const wrongCount = this.wrongQuestions.length;
        const overallPercent = this.isFromList ? this.getOverallProgressForSkill(this.currentSkill) : 0;

        if (wrongCount === 0) {
            this.showResults();
            return;
        }

        this.updateCard(`
            <div class="memory-trainer-results phase-complete" style="
                background: #FFFDF5;
                border: 1px solid #FDE68A;
                border-radius: 12px;
                padding: 20px 24px;
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            ">
                <div class="memory-trainer-icon" style="font-size:26px; display:block; margin-bottom:4px;">🧠</div>
                <h2 style="color:#1565C0; font-size:17px; font-weight:600; margin-bottom:4px;">المرحلة الأولى انتهت</h2>
                <div style="margin:8px 0 12px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                            <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                        </div>
                        <span style="font-size:12px;font-weight:600;color:#1565C0;min-width:35px;text-align:right;">${overallPercent}%</span>
                    </div>
                </div>
                <div class="memory-trainer-stats" style="margin:6px 0 10px 0;padding:4px 0;display:flex;justify-content:space-around;border-top:1px solid #F1F5F9;border-bottom:1px solid #F1F5F9;">
                    <div class="stat-item" style="text-align:center;">
                        <span class="stat-label" style="display:block; font-size:10px; color:#94A3B8; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">المحاولات</span>
                        <span class="stat-value" style="display:block; font-size:18px; font-weight:700; color:#1565C0; margin-top:2px;">${this.attempts}</span>
                    </div>
                    <div class="stat-item" style="text-align:center;">
                        <span class="stat-label" style="display:block; font-size:10px; color:#94A3B8; font-weight:500; text-transform:uppercase; letter-spacing:0.5px;">الإجابات الصحيحة</span>
                        <span class="stat-value" style="display:block; font-size:18px; font-weight:700; color:#1565C0; margin-top:2px;">${this.correctAttempts}</span>
                    </div>
                </div>
                <p class="memory-trainer-hint" style="font-size:13px; color:#64748B; margin:8px 0 16px 0;">الآن سنعيد فقط الأسئلة التي لم تثبت بعد.</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.startReview()" style="padding:8px 20px; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white; box-shadow:0 2px 6px rgba(21,101,192,0.15);">مراجعة ${wrongCount} سؤال →</button>
            </div>
        `);
    }

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
        const isFromList = this.isFromList;
        const skill = this.currentSkill;
        const examId = this.currentExamId || 1;
        const examPercent = this.getExamProgress(skill, examId);
        const overallPercent = this.getOverallProgressForSkill(skill);
        const stagePercent = this.getStageProgressForSkill(skill);

        let html = '';

        if (isFromList) {
            let currentStage = 1, totalStages = 1, isLastStage = false;
            if (window.getCurrentStage && window.getTotalStages) {
                currentStage = window.getCurrentStage(skill);
                totalStages = window.getTotalStages(skill);
                isLastStage = (currentStage >= totalStages);
            } else {
                const combinedKey = `_${skill}_combinedData`;
                if (window[combinedKey]) {
                    const data = window[combinedKey];
                    currentStage = data.currentStage || 1;
                    totalStages = data.totalStages || 1;
                    isLastStage = data.isLastStage || (currentStage >= totalStages);
                }
            }

            let totalQuestionsInStage = this.totalQuestions || 0;
            const combinedKey = `_${skill}_combinedData`;
            if (window[combinedKey]) {
                totalQuestionsInStage = window[combinedKey].totalQuestions || totalQuestionsInStage;
            }

            if (isLastStage) {
                html = `
                    <div class="memory-trainer-results final" style="
                        background: #F0FDF4;
                        border: 1px solid #86EFAC;
                        border-radius: 12px;
                        padding: 20px 24px;
                        max-width: 440px;
                        width: 90%;
                        text-align: center;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    ">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🏆</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">لقد أكملت ${skill} بالكامل</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تهانينا! لقد أنهيت جميع المراحل بنجاح.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${overallPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${overallPercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للقائمة</button>
                    </div>
                `;
            } else {
                html = `
                    <div class="memory-trainer-results final" style="
                        background: #F8FFFB;
                        border: 1px solid #B8E6B8;
                        border-radius: 12px;
                        padding: 20px 24px;
                        max-width: 440px;
                        width: 90%;
                        text-align: center;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                    ">
                        <div style="font-size:28px;text-align:center;margin-bottom:4px;">🎉</div>
                        <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">أحسنت، لقد أنهيت المرحلة ${currentStage}</h2>
                        <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">تم تثبيت ${totalQuestionsInStage} نص.</p>
                        <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                    <div style="width:${stagePercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                                </div>
                                <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${stagePercent}%</span>
                            </div>
                        </div>
                        <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close(); if (typeof window.goToNextStage === 'function') window.goToNextStage('${skill}');" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">➡ متابعة المرحلة ${currentStage + 1}</button>
                    </div>
                `;
            }
        } else {
            let examLabel = `امتحان ${this.currentExamId}`;
            if (this.examType === 'matching') {
                if (this.currentSkill === 'lesen3') {
                    examLabel = `امتحان ${this.currentExamId} (Lesen 3)`;
                } else {
                    examLabel = `امتحان ${this.currentExamId} (Lesen 1)`;
                }
            } else if (this.examType === 'multiple') {
                examLabel = `امتحان ${this.currentExamId} (Lesen 2)`;
            } else if (this.examType === 'sprach1') {
                examLabel = `امتحان ${this.currentExamId} (Sprachbausteine 1)`;
            } else if (this.examType === 'sprach2') {
                examLabel = `امتحان ${this.currentExamId} (Sprachbausteine 2)`;
            }
            html = `
                <div class="memory-trainer-results final" style="
                    background: #F8FFFB;
                    border: 1px solid #B8E6B8;
                    border-radius: 12px;
                    padding: 20px 24px;
                    max-width: 440px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                ">
                    <div style="font-size:28px;text-align:center;margin-bottom:4px;">🧩</div>
                    <h2 style="color:#1565C0;font-size:18px;font-weight:600;text-align:center;margin-bottom:4px;">اكتمل الاستدعاء</h2>
                    <p style="font-size:14px;color:#64748B;text-align:center;margin-bottom:14px;font-weight:400;">لقد أنهيت تدريب ${examLabel}.</p>
                    <div style="margin:0 0 14px 0;background:#FFFFFF;border:1px solid #E8EEF5;border-radius:6px;padding:6px 10px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="flex:1;height:5px;background:#e9eef5;border-radius:6px;overflow:hidden;">
                                <div style="width:${examPercent}%;height:100%;background:linear-gradient(90deg,#1565C0,#38bdf8);border-radius:6px;"></div>
                            </div>
                            <span style="font-size:13px;font-weight:600;color:#1565C0;min-width:40px;text-align:right;">${examPercent}%</span>
                        </div>
                    </div>
                    <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close();" style="padding:8px 20px;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s ease;margin-top:6px;background:#1565C0;color:white;box-shadow:0 2px 6px rgba(21,101,192,0.15);display:block;width:100%;">⬅ العودة للامتحان</button>
                </div>
            `;
        }

        this.updateCard(html);
    }

    // ============================================
    // دوال مساعدة وإغلاق
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
            <div class="memory-trainer-intro" style="
                background: #FFFFFF;
                border: 1px solid #E8EEF5;
                border-radius: 12px;
                padding: 20px 24px;
                max-width: 440px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
            ">
                <h2 style="color:#1565C0; font-size:17px; font-weight:600;">ℹ️ غير متوفرة</h2>
                <p style="color:#64748B; margin:12px 0;">${message}</p>
                <button class="memory-trainer-btn primary" onclick="window.memoryTrainer.close()" style="padding:8px 20px; border:none; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; background:#1565C0; color:white; box-shadow:0 2px 6px rgba(21,101,192,0.15);">فهمت</button>
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
        this.allQuestions = [];
        this.sharedOptions = [];
        this.trainingQueue = [];
        this.wrongQuestions = [];
        this.currentIndex = 0;
        this.isActive = false;
        this.isReviewMode = false;
        this.isFromList = false;
        this.attempts = 0;
        this.correctAttempts = 0;
        this.totalQuestions = 0;
        this.currentExamId = 1;
        this.examType = 'hoeren';
    }
}

// ============================================
// تهيئة المتغير العام
// ============================================

window.memoryTrainer = new MemoryTrainer();

// ✅ دالة بدء التدريب من امتحان فردي
window.startMemoryTrainerForExam = (skill) => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill || window.currentSkill || 'hoeren1';
        window.memoryTrainer.currentExamId = window.currentExamId || 1;
        window.memoryTrainer.start('single');
    }
};

// ✅ دالة بدء التدريب من القائمة
window.startMemoryTrainerFromList = (skill = 'hoeren1') => {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill;
        window.memoryTrainer.start('list');
    }
};

// ✅ للتوافق مع الإصدارات القديمة
window.startMemoryTrainer = window.startMemoryTrainerForExam;
console.log('🧠 Memory Trainer V4 (يدعم Hören, Lesen 1, Lesen 2, Lesen 3, Sprachbausteine 1 و Sprachbausteine 2) تم تحميله');

export {};