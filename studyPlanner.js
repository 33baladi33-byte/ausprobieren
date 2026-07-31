// ============================================
// studyPlanner.js - المدرب الذكي (Smart Study Planner)
// الإصدار 1.0 - خفيف وسريع، يعتمد على بيانات localStorage
// ============================================

(function() {
    "use strict";

    // ============================================
    // 1. إعدادات النظام الأساسية
    // ============================================

    const PLANNER_KEY = 'studyPlannerData';
    const CONFIG = {
        // عدد الأيام التي يجب فيها إعادة الامتحان حسب مستواه
        reviewIntervals: {
            high: 7,    // نتيجة ≥ 80%
            medium: 4,  // نتيجة ≥ 60%
            low: 2,     // نتيجة ≥ 40%
            veryLow: 1  // نتيجة < 40%
        },
        // وزن كل جزء في حساب الأولوية
        sectionWeights: {
            hoeren1: 10,
            hoeren2: 10,
            hoeren3: 10,
            lesen1: 10,
            lesen2: 10,
            lesen3: 7,
            sprach1: 5,
            sprach2: 3
        },
        // الأجزاء التي سيتم تضمينها في الخطة (يمكن تعديلها)
        activeSkills: ['hoeren1', 'hoeren2', 'hoeren3', 'lesen1', 'lesen2', 'lesen3', 'sprach1', 'sprach2']
    };

    // ============================================
    // 2. دوال تخزين البيانات (Cache)
    // ============================================

    function getPlannerData() {
        try {
            const raw = localStorage.getItem(PLANNER_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                // التحقق من صلاحية الكاش (نفس اليوم)
                const today = new Date().toISOString().slice(0, 10);
                if (data.date === today) {
                    return data;
                }
            }
        } catch (e) {
            console.warn('⚠️ فشل قراءة بيانات المدرب:', e);
        }
        return null;
    }

    function savePlannerData(data) {
        try {
            data.date = new Date().toISOString().slice(0, 10);
            localStorage.setItem(PLANNER_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('⚠️ فشل حفظ بيانات المدرب:', e);
        }
    }

    // ============================================
    // 3. تحليل بيانات المستخدم (المصدر الوحيد)
    // ============================================

    function analyzeUserProgress() {
        const result = {
            examDate: null,          // تاريخ الامتحان (إن وجد)
            daysRemaining: null,
            sections: {},
            totalExamsCompleted: 0,
            averageScore: 0,
            totalRetries: 0,
            overallProgress: 0,
            // ملخص للواجهة
            summary: {}
        };

        // ----- 3.1 قراءة تاريخ الامتحان -----
        const storedDate = localStorage.getItem('examDate');
        if (storedDate) {
            result.examDate = storedDate;
            const today = new Date();
            const exam = new Date(storedDate);
            const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
            result.daysRemaining = diff > 0 ? diff : 0;
        }

        // ----- 3.2 تحليل كل مهارة -----
        const skills = CONFIG.activeSkills;
        let totalScoreSum = 0;
        let totalScoreCount = 0;
        let totalRetriesSum = 0;

        skills.forEach(skill => {
            const sectionData = {
                exams: [],
                average: 0,
                lastReviewDays: null,
                retryCount: 0,
                progress: 0,
                priority: 0,
                completedExams: 0,
                totalExams: 0
            };

            // الحصول على قائمة الامتحانات لهذه المهارة
            const examList = window.examsDatabase && window.examsDatabase[skill] ? window.examsDatabase[skill] : [];
            sectionData.totalExams = examList.length;

            // قراءة بيانات كل امتحان
            let examScores = [];
            let totalRetries = 0;
            let lastReviewTimestamp = null;

            examList.forEach(exam => {
                const examId = exam.id;
                const result = window.getExamResult ? window.getExamResult(skill, examId) : null;
                const retries = window.getRetryCount ? window.getRetryCount(skill, examId) : 0;
                const progress = window.getExamProgress ? window.getExamProgress(skill, examId) : 0;

                if (result !== null) {
                    examScores.push(result);
                    sectionData.completedExams++;
                    totalScoreSum += result;
                    totalScoreCount++;
                }
                if (retries > 0) {
                    totalRetries += retries;
                    totalRetriesSum += retries;
                }

                // حساب تاريخ آخر مراجعة (من localStorage أو من بيانات الامتحان)
                const lastReview = window.getLastReviewDate ? window.getLastReviewDate(skill, examId) : null;
                if (lastReview) {
                    const days = Math.floor((Date.now() - new Date(lastReview)) / (1000 * 60 * 60 * 24));
                    if (lastReviewTimestamp === null || days < lastReviewTimestamp) {
                        lastReviewTimestamp = days;
                    }
                }
            });

            // متوسط الدرجات
            if (examScores.length > 0) {
                sectionData.average = examScores.reduce((a, b) => a + b, 0) / examScores.length;
            }

            // آخر مراجعة (بأيام)
            if (lastReviewTimestamp !== null) {
                sectionData.lastReviewDays = lastReviewTimestamp;
            }

            sectionData.retryCount = totalRetries;
            sectionData.progress = sectionData.totalExams > 0 ? (sectionData.completedExams / sectionData.totalExams) * 100 : 0;

            // حفظ البيانات
            result.sections[skill] = sectionData;
        });

        // ----- 3.3 إحصائيات عامة -----
        result.totalExamsCompleted = totalScoreCount;
        result.averageScore = totalScoreCount > 0 ? totalScoreSum / totalScoreCount : 0;
        result.totalRetries = totalRetriesSum;

        // حساب التقدم الكلي (نسبة مئوية)
        let totalProgress = 0;
        let count = 0;
        skills.forEach(skill => {
            if (result.sections[skill]) {
                totalProgress += result.sections[skill].progress;
                count++;
            }
        });
        result.overallProgress = count > 0 ? totalProgress / count : 0;

        // ----- 3.4 حساب الأولويات -----
        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (!sec) return;

            // 1. متوسط الدرجات (40%)
            let scoreFactor = 0;
            if (sec.average > 0) {
                // كلما كان المتوسط منخفضاً، زادت الأولوية
                scoreFactor = Math.max(0, (100 - sec.average) / 100) * 40;
            } else {
                // إذا لم يكن هناك نتائج، نعطي أولوية عالية (افتراض ضعف)
                scoreFactor = 40;
            }

            // 2. آخر مراجعة (25%)
            let reviewFactor = 0;
            if (sec.lastReviewDays !== null) {
                // كلما كانت المراجعة قديمة، زادت الأولوية (بحد أقصى 25)
                reviewFactor = Math.min(25, sec.lastReviewDays * 2);
            } else {
                // إذا لم يسبق مراجعة، أولوية عالية
                reviewFactor = 25;
            }

            // 3. عدد الإعادات (15%)
            let retryFactor = 0;
            if (sec.retryCount > 0) {
                // الإعادات الكثيرة تعني صعوبة، نعطي أولوية أعلى (بحد أقصى 15)
                retryFactor = Math.min(15, sec.retryCount * 3);
            } else {
                retryFactor = 0;
            }

            // 4. التقدم (10%) - كلما كان التقدم منخفضاً، زادت الأولوية
            let progressFactor = 0;
            if (sec.progress > 0) {
                progressFactor = Math.max(0, (100 - sec.progress) / 100) * 10;
            } else {
                progressFactor = 10;
            }

            // 5. وزن القسم (10%)
            const weight = CONFIG.sectionWeights[skill] || 5;
            const weightFactor = (weight / 10) * 10; // نطاق 0-10

            // المجموع النهائي (0-100)
            sec.priority = Math.min(100, Math.round(scoreFactor + reviewFactor + retryFactor + progressFactor + weightFactor));

            // تخزين بعض القيم للعرض
            result.summary[skill] = {
                average: sec.average,
                progress: sec.progress,
                priority: sec.priority,
                lastReview: sec.lastReviewDays !== null ? sec.lastReviewDays : 'لم يراجع'
            };
        });

        return result;
    }

    // ============================================
    // 4. توليد خطة اليوم
    // ============================================

    function generateDailyPlan(analysis) {
        if (!analysis) return null;

        const plan = {
            date: new Date().toISOString().slice(0, 10),
            daysRemaining: analysis.daysRemaining,
            overallProgress: analysis.overallProgress,
            sections: [],
            totalExams: 0,
            estimatedTime: 0,
            message: '',
            warnings: []
        };

        // إذا لم يحدد تاريخ امتحان، نعطي رسالة توجيه
        if (!analysis.daysRemaining || analysis.daysRemaining <= 0) {
            plan.message = '📅 يرجى تحديد تاريخ الامتحان في الإعدادات للحصول على خطة يومية دقيقة.';
            return plan;
        }

        // ----- 4.1 حساب عدد الامتحانات المطلوبة يومياً -----
        const totalRemainingExams = analysis.sections[Object.keys(analysis.sections)[0]]?.totalExams || 0; // تقريبي
        let dailyCapacity = 4; // افتراضي
        if (analysis.daysRemaining < 10) {
            dailyCapacity = 6;
        } else if (analysis.daysRemaining < 20) {
            dailyCapacity = 5;
        } else if (analysis.daysRemaining < 40) {
            dailyCapacity = 4;
        } else {
            dailyCapacity = 3;
        }

        // ----- 4.2 اختيار الأجزاء حسب الأولوية -----
        const skills = CONFIG.activeSkills;
        // ترتيب الأجزاء تنازلياً حسب الأولوية
        const sortedSkills = skills.slice().sort((a, b) => {
            return (analysis.sections[b]?.priority || 0) - (analysis.sections[a]?.priority || 0);
        });

        // ----- 4.3 اختيار الامتحانات من كل جزء -----
        let totalSelected = 0;
        const selectedExams = {};

        // نمر على الأجزاء بترتيب الأولوية
        for (const skill of sortedSkills) {
            if (totalSelected >= dailyCapacity) break;
            const sec = analysis.sections[skill];
            if (!sec) continue;

            // عدد الامتحانات التي سنأخذها من هذا الجزء (على الأقل 1 إذا كانت الأولوية عالية)
            let count = 1;
            if (sec.priority > 80) count = 2;
            if (sec.priority > 90) count = 3;
            // إذا كان عدد الأيام المتبقية قليلاً، نزيد العدد
            if (analysis.daysRemaining < 15) count = Math.min(count + 1, 3);

            // لا نأخذ أكثر من العدد المتبقي
            const availableExams = window.examsDatabase && window.examsDatabase[skill] ? window.examsDatabase[skill] : [];
            const completedExams = sec.completedExams || 0;
            const totalExams = sec.totalExams || availableExams.length;
            const remaining = totalExams - completedExams;

            // نختار الامتحانات ذات الأولوية الأعلى (آخر مراجعة قديمة، نتيجة منخفضة)
            const examIds = availableExams.map(e => e.id);
            // نرتب الامتحانات حسب: آخر مراجعة (الأقدم أولاً)، ثم النتيجة (الأضعف أولاً)
            const sortedExams = examIds.slice().sort((a, b) => {
                const aResult = window.getExamResult ? window.getExamResult(skill, a) : null;
                const bResult = window.getExamResult ? window.getExamResult(skill, b) : null;
                const aRetry = window.getRetryCount ? window.getRetryCount(skill, a) : 0;
                const bRetry = window.getRetryCount ? window.getRetryCount(skill, b) : 0;
                // إذا لم تكن النتيجة موجودة، نفضل الامتحان (أولوية عالية)
                if (aResult === null && bResult !== null) return -1;
                if (bResult === null && aResult !== null) return 1;
                // إذا كانت النتيجة موجودة، نفضل الأقل
                if (aResult !== null && bResult !== null) return aResult - bResult;
                // إذا كانت النتيجة متساوية، نفضل الأكثر إعادة
                return bRetry - aRetry;
            });

            // نأخذ أول `count` امتحانات (مع تجنب التكرار)
            let selected = 0;
            for (const id of sortedExams) {
                if (selected >= count) break;
                // نتأكد أن الامتحان لم يسبق اختياره في خطة اليوم
                if (!selectedExams[skill]) selectedExams[skill] = [];
                if (!selectedExams[skill].includes(id)) {
                    selectedExams[skill].push(id);
                    selected++;
                    totalSelected++;
                }
            }
        }

        // ----- 4.4 بناء الخطة النهائية -----
        for (const skill in selectedExams) {
            const exams = selectedExams[skill];
            if (exams && exams.length > 0) {
                plan.sections.push({
                    skill: skill,
                    exams: exams,
                    count: exams.length
                });
                plan.totalExams += exams.length;
            }
        }

        // الوقت المتوقع (متوسط 15 دقيقة لكل امتحان)
        plan.estimatedTime = plan.totalExams * 15;

        // ----- 4.5 رسائل تحفيزية وتحذيرات -----
        if (plan.totalExams === 0) {
            plan.message = '🎉 مبروك! يبدو أنك أنهيت جميع الامتحانات. ركز على المراجعة الخفيفة.';
        } else {
            plan.message = `📋 خطة اليوم: ${plan.totalExams} امتحان${plan.totalExams > 1 ? 'ات' : ''} (حوالي ${Math.ceil(plan.estimatedTime / 60)} ساعة و ${plan.estimatedTime % 60} دقيقة).`;
        }

        // تحذير إذا كان هناك جزء لم يراجع منذ زمن طويل
        for (const skill of skills) {
            const sec = analysis.sections[skill];
            if (sec && sec.lastReviewDays !== null && sec.lastReviewDays > 14) {
                plan.warnings.push(`⚠️ ${skill} لم تراجع منذ ${sec.lastReviewDays} يوماً، أنصح بمراجعته قريباً.`);
            }
        }

        return plan;
    }

    // ============================================
    // 5. عرض الخطة في واجهة المستخدم
    // ============================================

    function renderPlan(plan) {
        // إنشاء نافذة منبثقة أنيقة
        const overlay = document.createElement('div');
        overlay.id = 'studyPlannerOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            backdrop-filter: blur(4px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease;
        `;

        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 500px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            direction: rtl;
        `;

        // محتوى البطاقة
        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">🎯 خطة اليوم</h2>
                <button id="closePlannerBtn" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">✕</button>
            </div>
        `;

        // تاريخ الامتحان والأيام المتبقية
        if (plan.daysRemaining !== null && plan.daysRemaining > 0) {
            html += `
                <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 16px;">
                    <span style="font-size: 0.9rem; color: #94a3b8;">📅 تبقى حتى الامتحان:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; color: #38bdf8; margin-right: 8px;">${plan.daysRemaining} يوم</span>
                </div>
            `;
        }

        // التقدم الكلي
        html += `
            <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.9rem; color: #94a3b8;">📊 جاهزيتك الحالية:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; color: #4ade80;">${Math.round(plan.overallProgress)}%</span>
                </div>
                <div style="width: 100%; height: 6px; background: #2a3042; border-radius: 6px; margin-top: 6px;">
                    <div style="width: ${plan.overallProgress}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 6px;"></div>
                </div>
            </div>
        `;

        // قائمة الامتحانات
        if (plan.sections.length > 0) {
            html += `<div style="margin: 16px 0 12px 0; font-size: 0.95rem; font-weight: 600; color: #f1f5f9;">📋 خطة اليوم:</div>`;
            plan.sections.forEach(section => {
                const skillName = section.skill;
                const examNumbers = section.exams.join('، ');
                html += `
                    <div style="background: #0f1421; border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; border-right: 3px solid #38bdf8;">
                        <div style="font-weight: 500; color: #f1f5f9;">${skillName}</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">امتحانات: ${examNumbers}</div>
                    </div>
                `;
            });
            html += `
                <div style="margin-top: 12px; font-size: 0.8rem; color: #94a3b8;">
                    ⏱️ المدة المتوقعة: ${Math.ceil(plan.estimatedTime / 60)} ساعة و ${plan.estimatedTime % 60} دقيقة
                </div>
            `;
        } else {
            html += `
                <div style="text-align: center; padding: 20px 0; color: #94a3b8;">
                    ${plan.message || '🎉 لا توجد امتحانات للتدريب اليوم، مبروك!'}
                </div>
            `;
        }

        // الرسائل والتحذيرات
        if (plan.warnings && plan.warnings.length > 0) {
            html += `<div style="margin-top: 16px; padding: 12px; background: rgba(251, 191, 36, 0.1); border-radius: 12px; border: 1px solid #fbbf24;">`;
            plan.warnings.forEach(w => {
                html += `<div style="font-size: 0.8rem; color: #fbbf24; margin-bottom: 4px;">${w}</div>`;
            });
            html += `</div>`;
        }

        // رسالة الترحيب (إذا كانت موجودة)
        if (plan.message && plan.sections.length === 0) {
            html += `<div style="margin-top: 12px; text-align: center; font-size: 0.9rem; color: #4ade80;">${plan.message}</div>`;
        }

        // زر إغلاق
        html += `
            <button id="closePlannerBtn2" style="
                width: 100%;
                margin-top: 20px;
                padding: 10px;
                background: #38bdf8;
                border: none;
                border-radius: 12px;
                color: #0a0e1a;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            " onmouseover="this.style.background='#0ea5e9'" onmouseout="this.style.background='#38bdf8'">
                حسناً
            </button>
        `;

        card.innerHTML = html;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // إضافة أنيميشن
        if (!document.getElementById('plannerStyles')) {
            const style = document.createElement('style');
            style.id = 'plannerStyles';
            style.textContent = `
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `;
            document.head.appendChild(style);
        }

        // ربط أزرار الإغلاق
        const closeBtn1 = card.querySelector('#closePlannerBtn');
        const closeBtn2 = card.querySelector('#closePlannerBtn2');
        const closeFunc = () => overlay.remove();
        if (closeBtn1) closeBtn1.addEventListener('click', closeFunc);
        if (closeBtn2) closeBtn2.addEventListener('click', closeFunc);

        // إغلاق عند الضغط خارج البطاقة
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        // إغلاق عند الضغط على Esc
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // ============================================
    // 6. الدالة الرئيسية (تُستدعى من الزر)
    // ============================================

    window.showDailyPlan = function() {
        // 1. قراءة الكاش
        let cached = getPlannerData();
        let analysis = null;
        let plan = null;

        if (cached && cached.analysis && cached.plan) {
            // استخدم الكاش
            analysis = cached.analysis;
            plan = cached.plan;
            console.log('📦 استخدام الخطة المخزنة مؤقتاً');
        } else {
            // 2. تحليل جديد
            console.log('🔄 جارٍ تحليل التقدم...');
            analysis = analyzeUserProgress();
            if (!analysis) {
                // عرض رسالة خطأ
                showSimpleMessage('⚠️ لم نتمكن من تحليل بياناتك، تأكد من وجود امتحانات.', 'error');
                return;
            }
            // 3. توليد الخطة
            plan = generateDailyPlan(analysis);
            // 4. حفظ الكاش
            savePlannerData({ analysis, plan });
            console.log('✅ تم حفظ الخطة في الكاش');
        }

        // 5. عرض الخطة
        if (plan) {
            renderPlan(plan);
        } else {
            showSimpleMessage('⚠️ تعذر إنشاء الخطة، حاول مرة أخرى.', 'error');
        }
    };

    // ============================================
    // 7. دوال مساعدة (رسائل بسيطة)
    // ============================================

    function showSimpleMessage(msg, type = 'info') {
        const overlay = document.createElement('div');
        overlay.id = 'plannerSimpleMsg';
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? '#ef4444' : '#38bdf8'};
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            z-index: 99999;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
            text-align: center;
            max-width: 80%;
        `;
        overlay.textContent = msg;
        document.body.appendChild(overlay);

        if (!document.getElementById('plannerSimpleStyles')) {
            const style = document.createElement('style');
            style.id = 'plannerSimpleStyles';
            style.textContent = `
                @keyframes slideDown { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s';
            setTimeout(() => overlay.remove(), 300);
        }, 3000);
    }

    // ============================================
    // 8. تهيئة الزر في الصفحة (يضاف بواسطة index.html)
    // ============================================

    // إذا كان الزر موجوداً بالفعل، نربطه
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.addEventListener('click', window.showDailyPlan);
            console.log('✅ زر المدرب الذكي مربوط.');
        } else {
            console.log('ℹ️ زر المدرب الذكي لم يوجد بعد، سيتم ربطه لاحقاً.');
        }
    });

    // دالة لربط الزر يدوياً (في حال إضافته ديناميكياً)
    window.initStudyPlanner = function(buttonId = 'studyPlannerBtn') {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('click', window.showDailyPlan);
            console.log('✅ زر المدرب الذكي مربوط يدوياً.');
        } else {
            console.warn(`⚠️ الزر بالمعرف "${buttonId}" غير موجود.`);
        }
    };

    // تصدير دوال للاستخدام الخارجي (اختياري)
    window.analyzeUserProgress = analyzeUserProgress;
    window.generateDailyPlan = generateDailyPlan;
    window.renderPlan = renderPlan;

    console.log('🧠 studyPlanner.js جاهز (المدرب الذكي)');
})();
