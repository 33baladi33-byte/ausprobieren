// ============================================
// studyPlanner.js - المحرك الإحصائي للخطة اليومية
// الإصدار النهائي - Stateless بالكامل
// ============================================

(function() {
    "use strict";
// ============================================
// 1. دوال التحقق من المدخلات
// ============================================

/**
 * التحقق من صحة المدخلات ورفع خطأ واضح إذا كانت غير صالحة
 * تم إزالة أي تاريخ افتراضي - إذا لم يصل التاريخ، يرفع خطأ مباشر
 */
function validateInputs(skill, examDate) {
    // التحقق من المهارة
    if (!skill || typeof skill !== 'string' || skill.trim() === '') {
        throw new Error('[StudyPlanner] ❌ المهارة (skill) مطلوبة. تأكد من تمريرها من الواجهة.');
    }

    // التحقق من التاريخ - بدون أي قيمة افتراضية
    if (!examDate) {
        throw new Error('[StudyPlanner] ❌ تاريخ الامتحان (examDate) مطلوب. يرجى تحديد تاريخ الامتحان أولاً.');
    }

    if (!(examDate instanceof Date)) {
        throw new Error('[StudyPlanner] ❌ تاريخ الامتحان (examDate) يجب أن يكون كائن Date صالح.');
    }

    if (isNaN(examDate.getTime())) {
        throw new Error('[StudyPlanner] ❌ تاريخ الامتحان (examDate) غير صالح (Invalid Date).');
    }

    // التأكد من أن التاريخ ليس في الماضي
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDay = new Date(examDate);
    examDay.setHours(0, 0, 0, 0);

    // إذا كان التاريخ في الماضي، نسمح به مع تحذير (قد يكون الامتحان اليوم أو غداً)
    // لكننا لا نرفع خطأ، بل نترك الحساب يحدث
    if (examDay < today) {
        console.warn('[StudyPlanner] ⚠️ تاريخ الامتحان في الماضي. قد تكون النتائج غير دقيقة.');
    }

    return true;
}
    // ============================================
    // 2. جلب قائمة الامتحانات من قاعدة البيانات
    // ============================================

    function fetchExamIds(skill) {
        if (!window.examsDatabase) {
            throw new Error('[StudyPlanner] ❌ window.examsDatabase غير موجودة. تأكد من تحميل exams.js أولاً.');
        }

        const exams = window.examsDatabase[skill];
        if (!exams || !Array.isArray(exams) || exams.length === 0) {
            throw new Error(`[StudyPlanner] ❌ لا توجد امتحانات للمهارة "${skill}" في قاعدة البيانات.`);
        }

        // استخراج المعرفات فقط
        const ids = exams.map(exam => exam.id).filter(id => id !== undefined && id !== null);
        if (ids.length === 0) {
            throw new Error(`[StudyPlanner] ❌ لم يتم العثور على معرفات صالحة للمهارة "${skill}".`);
        }

        return ids;
    }

    // ============================================
    // 3. جمع بيانات الامتحانات من localStorage
    // ============================================

    function collectExamData(skill, examIds) {
        const exams = [];

        for (const id of examIds) {
            // قراءة البيانات عبر الدوال العمومية (موجودة في exams.js)
            const score = window.getExamResult ? window.getExamResult(skill, id) : null;
            const retries = window.getRetryCount ? window.getRetryCount(skill, id) : 0;
            const lastReviewDays = window.getLastReviewDays ? window.getLastReviewDays(skill, id) : null;

            exams.push({
                id: id,
                score: score, // null = لم يحل أبداً
                retries: retries,
                lastReviewDays: lastReviewDays, // null = لم يراجع أبداً
                isNew: (score === null)
            });
        }

        return exams;
    }

    // ============================================
    // 4. حساب أيام العمل المتبقية
    // ============================================

    function calculateWorkingDays(examDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const examDay = new Date(examDate);
        examDay.setHours(0, 0, 0, 0);

        const remainingDays = Math.ceil((examDay - today) / (1000 * 3600 * 24));

        // آخر يومين محجوزان للمراجعة النهائية
        let workingDays = remainingDays - 2;

        // إذا لم يتبق أيام عمل، نعتبر أننا في فترة المراجعة النهائية
        if (workingDays <= 0) {
            workingDays = 0;
        }

        return {
            remainingDays: Math.max(remainingDays, 0),
            workingDays: Math.max(workingDays, 0)
        };
    }

    // ============================================
    // 5. حساب العدد اليومي للامتحانات
    // ============================================

    function calculateDailyCount(remainingExams, workingDays, dailyHours) {
        // إذا كان عدد الامتحانات المتبقية 0
        if (remainingExams === 0) return 0;

        // إذا لم تبق أيام عمل، نرجع 0 (فترة مراجعة نهائية)
        if (workingDays === 0) return 0;

        // حساب العدد الأساسي (Ceil)
        let dailyCount = Math.ceil(remainingExams / workingDays);

        // الحد الأدنى (3) مع إمكانية تعديله حسب ساعات الدراسة اليومية
        let minDaily = 3;
        if (dailyHours && typeof dailyHours === 'number' && dailyHours > 0) {
            // إذا كان عدد الساعات عالياً، نزيد الحد الأدنى قليلاً
            if (dailyHours >= 4) minDaily = 4;
            if (dailyHours >= 6) minDaily = 5;
        }

        if (dailyCount < minDaily) {
            dailyCount = minDaily;
        }

        // لا يمكن أن يتجاوز العدد الامتحانات المتبقية
        if (dailyCount > remainingExams) {
            dailyCount = remainingExams;
        }

        return dailyCount;
    }

    // ============================================
    // 6. حساب الأولوية (Priority) لكل امتحان
    // ============================================

    function calculatePriority(exam) {
        // الأولوية تعتمد على ثلاثة عوامل، كلما كان الرقم أصغر = الأولوية أعلى

        // 1. النتيجة (0 = الأسوأ، أو جديد)
        //    null = لم يحل أبداً → نعتبره 0 (أسوأ درجة)
        const scoreWeight = (exam.score !== null) ? exam.score : 0;

        // 2. عدد الإعادات (الأقل = الأسوأ = الأولوية الأعلى)
        const retryWeight = exam.retries;

        // 3. آخر مراجعة (الأقدم = الأسوأ = الأولوية الأعلى)
        //    null = لم يراجع أبداً → نعتبره 0 (أقدم من أي تاريخ)
        const reviewWeight = (exam.lastReviewDays !== null) ? exam.lastReviewDays : 0;

        // معادلة الأولوية: 
        // - النتيجة لها الوزن الأكبر (×10000) لأنها العامل الأهم
        // - ثم الإعادات (×100)
        // - ثم آخر مراجعة (×1)
        const priority = (scoreWeight * 10000) + (retryWeight * 100) + reviewWeight;

        return priority;
    }

    // ============================================
    // 7. ترتيب الامتحانات حسب الأولوية
    // ============================================

    function sortExamsByPriority(exams) {
        // نسخة عميقة لتجنب تعديل الأصل
        const sorted = exams.slice();

        sorted.sort((a, b) => {
            const priorityA = calculatePriority(a);
            const priorityB = calculatePriority(b);

            // الأولوية الأقل = الأعلى أولوية
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            // في حالة التساوي التام، نرتب حسب المعرف (ثبات الترتيب)
            return a.id - b.id;
        });

        return sorted;
    }

    // ============================================
    // 8. اختيار امتحانات اليوم
    // ============================================

    function selectTodayExams(sortedExams, dailyCount) {
        // استبعاد المكتملين (retries >= 6) أولاً
        const notCompleted = sortedExams.filter(exam => exam.retries < 6);

        // اختيار أول dailyCount
        const selected = notCompleted.slice(0, dailyCount);

        return selected;
    }

    // ============================================
    // 9. طباعة تقرير Debug مفصل
    // ============================================

    function printDebugReport(exams, sortedExams, selectedExams, dailyCount, workingDays, remainingDays) {
        console.log('╔═══════════════════════════════════════════╗');
        console.log('║   📊 تقرير Study Planner (Debug)        ║');
        console.log('╚═══════════════════════════════════════════╝');

        console.log(`📅 الأيام المتبقية: ${remainingDays}`);
        console.log(`⚙️ أيام العمل: ${workingDays}`);
        console.log(`🎯 عدد الامتحانات اليومية: ${dailyCount}`);
        console.log(`📦 إجمالي الامتحانات: ${exams.length}`);
        console.log(`✅ المكتملون (retry >= 6): ${exams.filter(e => e.retries >= 6).length}`);
        console.log(`⏳ المتبقون (retry < 6): ${exams.filter(e => e.retries < 6).length}`);

        console.log('\n─────────────────────────────────────────────');
        console.log('📋 ترتيب الأولويات (جميع الامتحانات):');
        console.log('─────────────────────────────────────────────');

        sortedExams.forEach((exam, index) => {
            const priority = calculatePriority(exam);
            const scoreDisplay = (exam.score !== null) ? exam.score : 'جديد';
            const reviewDisplay = (exam.lastReviewDays !== null) ? `${exam.lastReviewDays} يوم` : 'لم يُراجع';
            const completed = exam.retries >= 6 ? '✅ مكتمل' : '';

            console.log(
                `  ${String(index + 1).padStart(2)}. امتحان ${String(exam.id).padStart(2)} | ` +
                `النتيجة: ${String(scoreDisplay).padStart(4)} | ` +
                `الإعادات: ${exam.retries} | ` +
                `آخر مراجعة: ${reviewDisplay.padStart(10)} | ` +
                `الأولوية: ${String(priority).padStart(6)} ${completed}`
            );
        });

        console.log('\n─────────────────────────────────────────────');
        console.log(`🎯 الامتحانات المختارة لليوم (${selectedExams.length} امتحان):`);
        console.log('─────────────────────────────────────────────');

        selectedExams.forEach((exam, index) => {
            const priority = calculatePriority(exam);
            const scoreDisplay = (exam.score !== null) ? exam.score : 'جديد';
            const reviewDisplay = (exam.lastReviewDays !== null) ? `${exam.lastReviewDays} يوم` : 'لم يُراجع';

            console.log(
                `  ${index + 1}. امتحان ${exam.id} | ` +
                `النتيجة: ${scoreDisplay} | ` +
                `الإعادات: ${exam.retries} | ` +
                `آخر مراجعة: ${reviewDisplay} | ` +
                `الأولوية: ${priority}`
            );
        });

        console.log('\n═══════════════════════════════════════════\n');
    }

    // ============================================
    // 10. الدالة الرئيسية (تُصدر للاستخدام العام)
    // ============================================

    /**
     * توليد خطة الدراسة اليومية من الصفر (Stateless)
     * 
     * @param {string} skill - اسم المهارة (مثل 'hoeren1', 'lesen2', ...)
     * @param {Date} examDate - تاريخ الامتحان الفعلي
     * @param {number} dailyHours - عدد ساعات الدراسة اليومية (يستخدم لتعديل الحد الأدنى)
     * @returns {object} {
     *   dailyCount: عدد الامتحانات اليومي,
     *   selectedExams: [{ id, score, retries, lastReviewDays, isNew, priority }],
     *   totalRemaining: إجمالي الامتحانات المتبقية (retry < 6),
     *   workingDays: أيام العمل الفعلية,
     *   remainingDays: الأيام المتبقية حتى الامتحان,
     *   isFinalReview: هل نحن في فترة المراجعة النهائية؟
     * }
     */
    window.generateStudyPlan = function(skill, examDate, dailyHours) {
        console.log('\n🚀 [StudyPlanner] بدء توليد الخطة...');

        // ----- الخطوة 1: التحقق من المدخلات -----
        validateInputs(skill, examDate);

        // ----- الخطوة 2: جلب معرفات الامتحانات -----
        const examIds = fetchExamIds(skill);
        console.log(`✅ تم جلب ${examIds.length} امتحان للمهارة "${skill}"`);

        // ----- الخطوة 3: جمع البيانات من localStorage -----
        const allExams = collectExamData(skill, examIds);
        console.log(`✅ تم جمع بيانات ${allExams.length} امتحان`);

        // ----- الخطوة 4: حساب أيام العمل -----
        const { remainingDays, workingDays } = calculateWorkingDays(examDate);
        console.log(`📅 الأيام المتبقية: ${remainingDays}، أيام العمل: ${workingDays}`);

        // ----- الخطوة 5: التحقق من فترة المراجعة النهائية -----
        if (workingDays === 0) {
            console.log('⏰ فترة المراجعة النهائية (آخر يومين) - لا يتم توليد خطة جديدة.');
            
            // نرجع خطة فارغة مع إشارة خاصة
            return {
                dailyCount: 0,
                selectedExams: [],
                totalRemaining: allExams.filter(e => e.retries < 6).length,
                workingDays: 0,
                remainingDays: remainingDays,
                isFinalReview: true,
                message: '⏰ أنت في فترة المراجعة النهائية (آخر يومين). راجع الامتحانات التي تشعر أنك بحاجة إليها.'
            };
        }

        // ----- الخطوة 6: حساب عدد الامتحانات المتبقية (retry < 6) -----
        const remainingExams = allExams.filter(e => e.retries < 6);
        const remainingCount = remainingExams.length;
        console.log(`⏳ الامتحانات المتبقية (retry < 6): ${remainingCount}`);

        if (remainingCount === 0) {
            console.log('🎉 جميع الامتحانات حققت 6 مراجعات!');
            return {
                dailyCount: 0,
                selectedExams: [],
                totalRemaining: 0,
                workingDays: workingDays,
                remainingDays: remainingDays,
                isFinalReview: false,
                message: '🎉 جميع الامتحانات حققت 6 مراجعات! أنت جاهز تماماً.'
            };
        }

        // ----- الخطوة 7: حساب العدد اليومي -----
        const dailyCount = calculateDailyCount(remainingCount, workingDays, dailyHours);
        console.log(`🎯 العدد اليومي للامتحانات: ${dailyCount}`);

        // ----- الخطوة 8: ترتيب الامتحانات حسب الأولوية -----
        const sortedExams = sortExamsByPriority(allExams);
        console.log(`✅ تم ترتيب ${sortedExams.length} امتحان حسب الأولوية`);

        // ----- الخطوة 9: اختيار امتحانات اليوم -----
        const selectedExams = selectTodayExams(sortedExams, dailyCount);

        // إضافة الأولوية المحسوبة لكل امتحان مختار (للعرض)
        selectedExams.forEach(exam => {
            exam.priority = calculatePriority(exam);
        });

        console.log(`✅ تم اختيار ${selectedExams.length} امتحان لليوم`);

        // ----- الخطوة 10: طباعة تقرير Debug -----
        printDebugReport(allExams, sortedExams, selectedExams, dailyCount, workingDays, remainingDays);

        // ----- الخطوة 11: إرجاع النتيجة -----
        return {
            dailyCount: dailyCount,
            selectedExams: selectedExams,
            totalRemaining: remainingCount,
            workingDays: workingDays,
            remainingDays: remainingDays,
            isFinalReview: false,
            message: `📚 خطة اليوم: ${dailyCount} امتحان${dailyCount > 1 ? 'ات' : ''}`
        };
    };

    // ============================================
    // 11. دالة مساعدة لفحص الدوال العمومية
    // ============================================

    window.checkStudyPlannerDependencies = function() {
        console.log('🔍 فحص التبعيات لـ Study Planner:');
        const deps = ['getExamResult', 'getRetryCount', 'getLastReviewDays', 'examsDatabase'];
        let allOk = true;
        deps.forEach(dep => {
            if (window[dep]) {
                console.log(`  ✅ ${dep} متوفرة`);
            } else {
                console.log(`  ❌ ${dep} غير متوفرة`);
                allOk = false;
            }
        });

        if (allOk) {
            console.log('✅ جميع التبعيات متوفرة. Study Planner جاهز للعمل.');
        } else {
            console.log('⚠️ بعض التبعيات غير متوفرة. تأكد من تحميل exams.js أولاً.');
        }
        return allOk;
    };

    console.log('✅ studyPlanner.js (النسخة النهائية) تم تحميله بنجاح');
    console.log('💡 استخدم window.generateStudyPlan(skill, examDate, dailyHours) لتوليد الخطة');
    console.log('💡 استخدم window.checkStudyPlannerDependencies() لفحص التبعيات');

})();
