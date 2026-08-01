// ============================================
// studyPlanner.js - المحرك الإحصائي للخطة اليومية
// Stateless: لا يخزن أي شيء، يعيد الحساب في كل مرة
// ============================================

(function() {
    "use strict";

    /**
     * الدالة الرئيسية: توليد خطة اليوم بناءً على المعطيات
     * @param {string} skill - المهارة المختارة (مثلاً 'hoeren1')
     * @param {Date} examDate - تاريخ الامتحان الفعلي
     * @param {number} dailyHours - عدد ساعات الدراسة اليومية (غير مستخدم حالياً، لكن يحتفظ به للتوسع)
     * @returns {object} {
     *   dailyCount: عدد الامتحانات اليومي,
     *   selectedExams: [{ id, score, retries, lastReviewDays, isNew }],
     *   totalRemaining: إجمالي الامتحانات المتبقية (retry < 6),
     *   workingDays: أيام العمل الفعلية,
     *   remainingDays: الأيام المتبقية حتى الامتحان
     * }
     */
    window.generateStudyPlan = function(skill, examDate, dailyHours) {
        // ----- 1. التحقق من المعطيات -----
        if (!skill) {
            console.warn('[StudyPlanner] المهارة غير محددة، استخدم hoeren1 كافتراضي');
            skill = 'hoeren1';
        }
        if (!examDate || !(examDate instanceof Date) || isNaN(examDate)) {
            console.warn('[StudyPlanner] تاريخ الامتحان غير صحيح، استخدم تاريخ افتراضي');
            examDate = new Date('2026-08-01');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const examDay = new Date(examDate);
        examDay.setHours(0, 0, 0, 0);

        // ----- 2. جمع بيانات الامتحانات -----
        // نقرأ جميع الامتحانات المتوفرة لهذه المهارة من قاعدة البيانات العامة
        let totalExams = 0;
        const examsList = [];

        // نستخدم examsDatabase من exams.js إن وجدت
        if (window.examsDatabase && window.examsDatabase[skill]) {
            const exams = window.examsDatabase[skill] || [];
            totalExams = exams.length;
            // نستخدم معرف الامتحان كما هو موجود في قاعدة البيانات
            exams.forEach(exam => {
                const id = exam.id;
                if (id !== undefined && id !== null) {
                    examsList.push(id);
                }
            });
        } else {
            // إذا لم تكن قاعدة البيانات متوفرة، نستخدم نطاق افتراضي (مثلاً 1-45 لـ Hören1)
            // لكن الأفضل أن نعتمد على دالة خارجية للحصول على عدد الامتحانات
            console.warn('[StudyPlanner] examsDatabase غير متوفرة، استخدم نطاق 1-45 كافتراضي');
            for (let i = 1; i <= 45; i++) {
                examsList.push(i);
            }
            totalExams = examsList.length;
        }

        // ----- 3. حساب عدد الامتحانات المتبقية (retry < 6) -----
        const allExams = [];
        let remainingExams = 0;
        for (let id of examsList) {
            const score = window.getExamResult ? window.getExamResult(skill, id) : null;
            const retries = window.getRetryCount ? window.getRetryCount(skill, id) : 0;
            const lastReviewDays = window.getLastReviewDays ? window.getLastReviewDays(skill, id) : null;

            const isNew = (score === null);
            const effectiveScore = isNew ? null : score; // نحتفظ بـ null للجديد

            allExams.push({
                id: id,
                score: effectiveScore,
                retries: retries,
                lastReviewDays: lastReviewDays,
                isNew: isNew
            });

            if (retries < 6) {
                remainingExams++;
            }
        }

        // إذا لم يبق أي امتحان (كلها 6+)، نرجع خطة فارغة
        if (remainingExams === 0) {
            return {
                dailyCount: 0,
                selectedExams: [],
                totalRemaining: 0,
                workingDays: 0,
                remainingDays: 0
            };
        }

        // ----- 4. حساب أيام العمل (المتبقية - 2) -----
        let remainingDays = Math.ceil((examDay - today) / (1000 * 3600 * 24));
        if (remainingDays < 1) remainingDays = 1;

        let workingDays = remainingDays - 2;
        if (workingDays < 1) workingDays = 1;

        // ----- 5. حساب العدد اليومي (Ceil) مع حد أدنى 3 -----
        let dailyCount = Math.ceil(remainingExams / workingDays);
        if (dailyCount < 3) dailyCount = 3;
        if (dailyCount > remainingExams) dailyCount = remainingExams;

        // ----- 6. ترتيب الامتحانات حسب الأولوية -----
        // الأولوية الأولى: النتيجة (الأقل أفضل، null = أدنى قيمة)
        // الثاني: عدد الإعادات (الأقل أفضل)
        // الثالث: آخر مراجعة (الأقدم أفضل، null = الأقدم)
        const sorted = allExams.slice(); // نسخة للفرز

        sorted.sort((a, b) => {
            // 1. النتيجة (null = أقل قيمة ممكنة)
            if (a.score !== b.score) {
                if (a.score === null) return -1;
                if (b.score === null) return 1;
                return a.score - b.score;
            }

            // 2. عدد الإعادات (الأقل أولاً)
            if (a.retries !== b.retries) {
                return a.retries - b.retries;
            }

            // 3. آخر مراجعة (الأقدم أولاً)
            // null = لم يُراجع أبدًا، نعتبره الأقدم (أي -1)
            const aDays = (a.lastReviewDays !== null) ? a.lastReviewDays : -1;
            const bDays = (b.lastReviewDays !== null) ? b.lastReviewDays : -1;
            return aDays - bDays;
        });

        // ----- 7. اختيار أول dailyCount امتحان (مع استبعاد المكتملين) -----
        const selected = sorted.filter(exam => exam.retries < 6).slice(0, dailyCount);

        // ----- 8. إعادة النتيجة -----
        return {
            dailyCount: dailyCount,
            selectedExams: selected,
            totalRemaining: remainingExams,
            workingDays: workingDays,
            remainingDays: remainingDays
        };
    };

    console.log('✅ studyPlanner.js (Stateless Engine) تم تحميله');
})();
