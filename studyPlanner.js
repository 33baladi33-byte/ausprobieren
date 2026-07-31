// ============================================
// studyPlanner.js - المدرب الذكي اليومي (Study Planner)
// ============================================

// ===== التهيئة =====
(function() {
    'use strict';

    // ✅ الكائن الرئيسي للنظام
    const StudyPlanner = {
        // إعدادات أساسية
        settings: {
            examDate: null,          // تاريخ الامتحان (يُطلب من المستخدم)
            dailyStudyHours: 2,       // ساعات الدراسة اليومية (افتراضي)
            useWeights: true,         // هل نستخدم أوزان الأجزاء؟
        },

        // البيانات المحفوظة (Cache)
        cache: {
            lastPlan: null,           // آخر خطة تم إنشاؤها
            lastAnalysis: null,       // آخر تحليل
            lastUpdate: null,         // وقت آخر تحديث
        },

        // بيانات المستخدم (سيتم جلبها من الملفات الأخرى)
        userData: {
            exams: [],                // قائمة الامتحانات مع نتائجها
            memoryLevels: {},         // بيانات Memory Trainer
            studySessions: [],        // جلسات المراجعة
        },

        // ============================================
        // دوال جلب البيانات من الملفات الأخرى
        // ============================================

        // جلب بيانات الامتحانات من exams.js
        fetchExamsData() {
            try {
                // نستخدم المتغيرات العامة من exams.js
                const allExams = [];
                const skills = ['hoeren1', 'hoeren2', 'hoeren3', 'lesen1', 'lesen2', 'lesen3', 'sprach1', 'sprach2'];
                for (const skill of skills) {
                    const exams = window.examsDatabase?.[skill] || [];
                    for (const exam of exams) {
                        // نبحث عن النتيجة المحفوظة
                        const result = window.getExamResult?.(skill, exam.id) || null;
                        const retries = window.getRetryCount?.(skill, exam.id) || 0;
                        const progress = window.getExamProgress?.(skill, exam.id) || 0;

                        allExams.push({
                            skill,
                            examId: exam.id,
                            title: exam.title,
                            result: result,
                            retries: retries,
                            progress: progress,
                            lastReview: null, // سنحاول استخراجها من localStorage
                            hasFile: exam.hasFile,
                            versions: exam.versions || [],
                            enabled: exam.enabled !== false,
                        });
                    }
                }
                this.userData.exams = allExams;
                return allExams;
            } catch (e) {
                console.warn('⚠️ فشل جلب بيانات الامتحانات:', e);
                return [];
            }
        },

        // جلب بيانات Memory Trainer
        fetchMemoryData() {
            try {
                const levelsKey = 'memory_levels';
                const data = JSON.parse(localStorage.getItem(levelsKey) || '{}');
                this.userData.memoryLevels = data;
                return data;
            } catch (e) {
                console.warn('⚠️ فشل جلب بيانات Memory Trainer:', e);
                return {};
            }
        },

        // جلب بيانات جلسات المراجعة (من studySession.js)
        fetchStudySessions() {
            try {
                const totalMinutes = parseInt(localStorage.getItem('total_study_minutes')) || 0;
                const todayKey = `session_total_${new Date().toISOString().split('T')[0]}`;
                const todayMinutes = parseInt(localStorage.getItem(todayKey)) || 0;
                this.userData.studySessions = { totalMinutes, todayMinutes };
                return this.userData.studySessions;
            } catch (e) {
                console.warn('⚠️ فشل جلب بيانات جلسات المراجعة:', e);
                return { totalMinutes: 0, todayMinutes: 0 };
            }
        },

        // ============================================
        // التحليل الأساسي
        // ============================================

        // حساب الأولوية لكل امتحان
        calculatePriority(exam) {
            // إذا كان الامتحان غير مفعل أو ليس له ملف، نعطيه أولوية منخفضة جدًا
            if (!exam.enabled || !exam.hasFile) return 0;

            let score = 0;
            const now = new Date();

            // 1. النتيجة (كلما كانت أقل، كلما كانت الأولوية أعلى)
            if (exam.result !== null) {
                const resultScore = 100 - exam.result; // مثلاً 40% -> 60 نقطة
                score += resultScore * 0.4; // 40% من الوزن
            } else {
                // إذا لم يُحل بعد، نعطيه أولوية متوسطة
                score += 50 * 0.4;
            }

            // 2. عدد الإعادات (كلما كانت أقل، الأولوية أعلى)
            const retriesScore = Math.max(0, 10 - exam.retries) * 2;
            score += retriesScore * 0.15; // 15% من الوزن

            // 3. تقدم Memory Trainer (كلما كان أقل، الأولوية أعلى)
            const memoryScore = 100 - (exam.progress || 0);
            score += memoryScore * 0.2; // 20% من الوزن

            // 4. آخر مراجعة (كلما كانت أقدم، الأولوية أعلى)
            if (exam.lastReview) {
                const daysSince = Math.floor((now - new Date(exam.lastReview)) / (1000 * 60 * 60 * 24));
                const reviewScore = Math.min(daysSince * 5, 100);
                score += reviewScore * 0.15; // 15% من الوزن
            } else {
                // إذا لم يُراجع أبدًا، نعطيه أولوية عالية
                score += 80 * 0.15;
            }

            // 5. وزن الجزء (من الأهمية)
            const weights = {
                hoeren1: 10,
                hoeren2: 10,
                hoeren3: 10,
                lesen1: 10,
                lesen2: 10,
                lesen3: 7,
                sprach1: 5,
                sprach2: 3,
            };
            const weight = weights[exam.skill] || 5;
            score += weight * 0.1; // 10% من الوزن

            return Math.round(score);
        },

        // تحليل جميع الامتحانات وحساب الأولويات
        analyzeExams() {
            const exams = this.fetchExamsData();
            this.fetchMemoryData();
            this.fetchStudySessions();

            const analyzed = exams.map(exam => {
                const priority = this.calculatePriority(exam);
                return { ...exam, priority };
            });

            // ترتيب تنازلي حسب الأولوية
            analyzed.sort((a, b) => b.priority - a.priority);

            // حفظ التحليل في الكاش
            this.cache.lastAnalysis = {
                timestamp: Date.now(),
                exams: analyzed,
            };
            this.cache.lastUpdate = Date.now();

            return analyzed;
        },

        // ============================================
        // حساب عدد الامتحانات اليومية
        // ============================================

        calculateDailyExamsCount() {
            const allExams = this.userData.exams.filter(e => e.enabled && e.hasFile);
            const totalExams = allExams.length;

            // الأيام المتبقية
            const examDate = new Date(this.settings.examDate);
            const now = new Date();
            const daysRemaining = Math.max(1, Math.ceil((examDate - now) / (1000 * 60 * 60 * 24)));

            // عدد المرات التي يجب مراجعة كل امتحان فيها (متوسط)
            // نفترض أن كل امتحان يحتاج 3 مراجعات على الأقل
            const reviewsPerExam = 3;
            const totalReviews = totalExams * reviewsPerExam;

            // عدد الامتحانات اليومية (بما أن آخر يومين للراحة)
            const effectiveDays = Math.max(1, daysRemaining - 2);
            const dailyExams = Math.ceil(totalReviews / effectiveDays);

            // لا نسمح بأقل من 2 ولا أكثر من 15 في اليوم
            return Math.min(15, Math.max(2, dailyExams));
        },

        // ============================================
        // توليد خطة اليوم
        // ============================================

        generateDailyPlan() {
            // 1. تحليل الامتحانات
            const analyzed = this.analyzeExams();

            // 2. حساب عدد الامتحانات اليومية
            const dailyCount = this.calculateDailyExamsCount();

            // 3. اختيار أفضل الامتحانات حسب الأولوية
            const selected = [];
            const usedSkills = {};

            for (const exam of analyzed) {
                if (selected.length >= dailyCount) break;

                // لا نختار أكثر من 5 من نفس المهارة في اليوم
                const skillCount = usedSkills[exam.skill] || 0;
                if (skillCount >= 5) continue;

                // نفضل التنويع، لذلك نحدد حد أقصى 3 من كل جزء
                if (skillCount >= 3) continue;

                selected.push(exam);
                usedSkills[exam.skill] = (usedSkills[exam.skill] || 0) + 1;
            }

            // 4. تنظيم الخطة حسب المهارة
            const plan = {};
            for (const exam of selected) {
                if (!plan[exam.skill]) plan[exam.skill] = [];
                plan[exam.skill].push(exam.examId);
            }

            // 5. حفظ الخطة في الكاش
            this.cache.lastPlan = {
                date: new Date().toISOString().slice(0, 10),
                plan: plan,
                totalExams: selected.length,
                generatedAt: Date.now(),
            };

            return this.cache.lastPlan;
        },

        // ============================================
        // حساب جاهزية المستخدم
        // ============================================

        calculateReadiness() {
            const exams = this.userData.exams.filter(e => e.enabled && e.hasFile && e.result !== null);
            if (exams.length === 0) return 0;

            let totalScore = 0;
            let totalWeight = 0;

            const weights = {
                hoeren1: 10,
                hoeren2: 10,
                hoeren3: 10,
                lesen1: 10,
                lesen2: 10,
                lesen3: 7,
                sprach1: 5,
                sprach2: 3,
            };

            for (const exam of exams) {
                const weight = weights[exam.skill] || 5;
                totalScore += (exam.result || 0) * weight;
                totalWeight += weight;
            }

            return Math.round(totalScore / totalWeight);
        },

        // ============================================
        // عرض الواجهة
        // ============================================

        showPlannerUI() {
            // التحقق من وجود تاريخ الامتحان
            if (!this.settings.examDate) {
                this.showExamDatePrompt();
                return;
            }

            // عرض نافذة التحميل أولاً
            this.showLoadingModal();

            // بعد تحميل البيانات، نعرض الخطة
            setTimeout(() => {
                const plan = this.generateDailyPlan();
                const readiness = this.calculateReadiness();
                const examDate = new Date(this.settings.examDate);
                const now = new Date();
                const daysRemaining = Math.max(0, Math.ceil((examDate - now) / (1000 * 60 * 60 * 24)));

                // إغلاق نافذة التحميل
                this.closeLoadingModal();

                // عرض الخطة
                this.displayPlan(plan, readiness, daysRemaining);
            }, 500); // محاكاة تحميل سريع
        },

        showLoadingModal() {
            // إزالة أي مودال قديم
            const oldModal = document.getElementById('studyPlannerModal');
            if (oldModal) oldModal.remove();

            const overlay = document.createElement('div');
            overlay.id = 'studyPlannerModal';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.4);
                backdrop-filter: blur(4px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.2s ease;
            `;

            const modal = document.createElement('div');
            modal.style.cssText = `
                background: #1a1f2e;
                border-radius: 24px;
                padding: 30px;
                max-width: 420px;
                width: 90%;
                border: 1px solid rgba(56, 189, 248, 0.2);
                box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                text-align: center;
                animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
            `;

            modal.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 12px;">📊</div>
                <h3 style="color: #f1f5f9; margin: 0 0 8px 0; font-size: 18px;">جارٍ تحليل تقدمك...</h3>
                <div class="planner-loader" style="
                    width: 100%;
                    height: 4px;
                    background: #2a3042;
                    border-radius: 4px;
                    margin: 20px 0;
                    overflow: hidden;
                ">
                    <div class="loader-bar" style="
                        width: 0%;
                        height: 100%;
                        background: linear-gradient(90deg, #38bdf8, #0ea5e9);
                        border-radius: 4px;
                        animation: loadProgress 1s ease forwards;
                    "></div>
                </div>
                <p style="color: #94a3b8; font-size: 13px; margin: 0;">جاري قراءة بياناتك وتحديد الأولويات...</p>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // إضافة الأنيميشنات إذا لم تكن موجودة
            if (!document.getElementById('plannerStyles')) {
                const style = document.createElement('style');
                style.id = 'plannerStyles';
                style.textContent = `
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                    @keyframes loadProgress {
                        0% { width: 0%; }
                        100% { width: 100%; }
                    }
                `;
                document.head.appendChild(style);
            }
        },

        closeLoadingModal() {
            const modal = document.getElementById('studyPlannerModal');
            if (modal) modal.remove();
        },

        displayPlan(plan, readiness, daysRemaining) {
            // إزالة أي مودال قديم
            const oldModal = document.getElementById('studyPlannerModal');
            if (oldModal) oldModal.remove();

            const overlay = document.createElement('div');
            overlay.id = 'studyPlannerModal';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(6px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.2s ease;
                padding: 20px;
                box-sizing: border-box;
                overflow-y: auto;
            `;

            const modal = document.createElement('div');
            modal.style.cssText = `
                background: #1a1f2e;
                border-radius: 24px;
                padding: 28px 24px;
                max-width: 520px;
                width: 100%;
                border: 1px solid rgba(56, 189, 248, 0.15);
                box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                max-height: 90vh;
                overflow-y: auto;
                direction: rtl;
            `;

            // بناء محتوى الخطة
            let planHtml = '';
            const skillNames = {
                hoeren1: '🎧 Hören 1',
                hoeren2: '🎧 Hören 2',
                hoeren3: '🎧 Hören 3',
                lesen1: '📖 Lesen 1',
                lesen2: '📖 Lesen 2',
                lesen3: '📖 Lesen 3',
                sprach1: '📝 Sprachbausteine 1',
                sprach2: '📝 Sprachbausteine 2',
            };

            const totalExams = plan.plan ? Object.values(plan.plan).reduce((sum, arr) => sum + arr.length, 0) : 0;

            for (const [skill, exams] of Object.entries(plan.plan || {})) {
                const name = skillNames[skill] || skill;
                planHtml += `
                    <div style="
                        background: rgba(255,255,255,0.04);
                        border-radius: 12px;
                        padding: 12px 16px;
                        margin-bottom: 10px;
                        border-right: 3px solid #38bdf8;
                    ">
                        <div style="font-weight: 600; color: #e2e8f0; font-size: 14px; margin-bottom: 6px;">${name}</div>
                        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                            ${exams.map(id => `
                                <span style="
                                    background: #2a3042;
                                    padding: 4px 12px;
                                    border-radius: 20px;
                                    font-size: 13px;
                                    color: #cbd5e1;
                                    font-weight: 500;
                                ">امتحان ${id}</span>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // حساب الوقت المتوقع (تقريبي: 10 دقائق لكل امتحان)
            const estimatedMinutes = totalExams * 10;
            const hours = Math.floor(estimatedMinutes / 60);
            const minutes = estimatedMinutes % 60;
            const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} دقيقة`;

            modal.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                    <h3 style="color: #f1f5f9; margin: 0; font-size: 18px; font-weight: 700;">📋 خطة اليوم</h3>
                    <button id="closePlannerBtn" style="
                        background: none;
                        border: none;
                        color: #94a3b8;
                        font-size: 20px;
                        cursor: pointer;
                        padding: 4px 8px;
                    ">✕</button>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 12px;">
                    <div>
                        <div style="font-size: 11px; color: #94a3b8;">📅 الأيام المتبقية</div>
                        <div style="font-size: 20px; font-weight: 700; color: #38bdf8;">${daysRemaining}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: #94a3b8;">🎯 جاهزيتك</div>
                        <div style="font-size: 20px; font-weight: 700; color: ${readiness >= 70 ? '#22c55e' : readiness >= 50 ? '#fbbf24' : '#ef4444'};">${readiness}%</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: #94a3b8;">📝 عدد الامتحانات</div>
                        <div style="font-size: 20px; font-weight: 700; color: #e2e8f0;">${totalExams}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: #94a3b8;">⏱️ الوقت المتوقع</div>
                        <div style="font-size: 20px; font-weight: 700; color: #e2e8f0;">${timeStr}</div>
                    </div>
                </div>

                ${planHtml}

                <div style="
                    background: rgba(56, 189, 248, 0.08);
                    border-radius: 12px;
                    padding: 12px 16px;
                    margin-top: 16px;
                    text-align: center;
                    border: 1px solid rgba(56, 189, 248, 0.15);
                ">
                    <span style="font-size: 13px; color: #cbd5e1;">
                        💡 ابدأ بهذه الامتحانات اليوم، وركز على الأجزاء التي تحتاج تحسينًا.
                    </span>
                </div>

                <button id="startTodayPlanBtn" style="
                    width: 100%;
                    margin-top: 16px;
                    padding: 12px;
                    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #0a0e1a;
                    cursor: pointer;
                    transition: all 0.2s ease;
                "
                onmouseover="this.style.transform='scale(1.02)'"
                onmouseout="this.style.transform='scale(1)'"
                >
                    🚀 ابدأ المراجعة الآن
                </button>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // الأحداث
            document.getElementById('closePlannerBtn').addEventListener('click', () => {
                overlay.remove();
            });

            document.getElementById('startTodayPlanBtn').addEventListener('click', () => {
                overlay.remove();
                // هنا يمكن توجيه المستخدم إلى أول امتحان في الخطة
                const firstSkill = Object.keys(plan.plan || {})[0];
                if (firstSkill) {
                    const firstExamId = plan.plan[firstSkill][0];
                    if (window.openExam) {
                        window.openExam(firstExamId, `امتحان ${firstExamId}`, firstSkill);
                    }
                }
            });

            // إغلاق عند الضغط خارج المودال
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.remove();
            });
        },

        // ============================================
        // طلب تاريخ الامتحان
        // ============================================

        showExamDatePrompt() {
            const overlay = document.createElement('div');
            overlay.id = 'studyPlannerModal';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(6px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.2s ease;
            `;

            const modal = document.createElement('div');
            modal.style.cssText = `
                background: #1a1f2e;
                border-radius: 24px;
                padding: 30px;
                max-width: 400px;
                width: 90%;
                border: 1px solid rgba(56, 189, 248, 0.2);
                box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                text-align: center;
                direction: rtl;
            `;

            modal.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 12px;">📅</div>
                <h3 style="color: #f1f5f9; margin: 0 0 8px 0; font-size: 18px;">حدد تاريخ الامتحان</h3>
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 20px 0;">لكي نتمكن من بناء خطة يومية مناسبة لك</p>
                <input type="date" id="examDateInput" style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #2a3042;
                    border-radius: 12px;
                    background: #0f1421;
                    color: #e2e8f0;
                    font-size: 16px;
                    margin-bottom: 16px;
                    box-sizing: border-box;
                ">
                <button id="saveExamDateBtn" style="
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #0a0e1a;
                    cursor: pointer;
                    transition: all 0.2s ease;
                "
                onmouseover="this.style.transform='scale(1.02)'"
                onmouseout="this.style.transform='scale(1)'"
                >
                    حفظ التاريخ
                </button>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            document.getElementById('saveExamDateBtn').addEventListener('click', () => {
                const dateInput = document.getElementById('examDateInput');
                if (dateInput.value) {
                    this.settings.examDate = dateInput.value;
                    localStorage.setItem('planner_exam_date', dateInput.value);
                    overlay.remove();
                    this.showPlannerUI(); // إعادة فتح المخطط
                } else {
                    alert('يرجى تحديد تاريخ الامتحان.');
                }
            });

            // إغلاق عند الضغط خارج المودال
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.remove();
            });

            // تعيين الحد الأدنى للتاريخ
            const today = new Date().toISOString().slice(0, 10);
            document.getElementById('examDateInput').min = today;
        },

        // ============================================
        // تهيئة النظام
        // ============================================

        init() {
            console.log('🧠 Study Planner جاهز للاستخدام');

            // استعادة تاريخ الامتحان من localStorage
            const savedDate = localStorage.getItem('planner_exam_date');
            if (savedDate) {
                this.settings.examDate = savedDate;
            }

            // إضافة زر "خطة اليوم" في الواجهة
            this.addPlannerButton();

            // تحميل البيانات مسبقًا (بدون تحليل)
            this.fetchExamsData();
            this.fetchMemoryData();
            this.fetchStudySessions();

            console.log('✅ Study Planner تم تهيئته بنجاح');
        },

        addPlannerButton() {
            // نبحث عن مكان مناسب في الشريط العلوي
            const rightSide = document.querySelector('.right-side');
            if (!rightSide) {
                setTimeout(() => this.addPlannerButton(), 500);
                return;
            }

            // تجنب إضافة الزر مرتين
            if (document.getElementById('studyPlannerBtn')) return;

            const btn = document.createElement('button');
            btn.id = 'studyPlannerBtn';
            btn.textContent = '📅 خطة اليوم';
            btn.style.cssText = `
                padding: 8px 16px;
                background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                border: none;
                border-radius: 30px;
                font-size: 13px;
                font-weight: 600;
                color: #0a0e1a;
                cursor: pointer;
                transition: all 0.2s ease;
                margin-right: 10px;
                font-family: inherit;
            `;
            btn.onmouseover = () => { btn.style.transform = 'scale(1.05)'; };
            btn.onmouseout = () => { btn.style.transform = 'scale(1)'; };

            btn.addEventListener('click', () => {
                this.showPlannerUI();
            });

            // إضافة الزر قبل أيقونة الإشعارات
            const notificationContainer = document.querySelector('.notification-container');
            if (notificationContainer) {
                rightSide.insertBefore(btn, notificationContainer);
            } else {
                rightSide.appendChild(btn);
            }

            console.log('✅ زر "خطة اليوم" تمت إضافته');
        },

        // ============================================
        // دوال مساعدة
        // ============================================

        // إعادة التحليل عند تغير البيانات
        refresh() {
            this.cache.lastAnalysis = null;
            this.cache.lastPlan = null;
            this.cache.lastUpdate = null;
            this.fetchExamsData();
            this.fetchMemoryData();
            this.fetchStudySessions();
            console.log('🔄 تم تحديث بيانات Study Planner');
        },
    };

    // ============================================
    // التصدير للاستخدام العام
    // ============================================

    window.StudyPlanner = StudyPlanner;

    // تهيئة النظام بعد تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
        StudyPlanner.init();
    });

    // جعل دالة التحديث متاحة للاستخدام من الخارج
    window.refreshStudyPlanner = () => StudyPlanner.refresh();

    console.log('✅ studyPlanner.js تم تحميله بنجاح');

})();
