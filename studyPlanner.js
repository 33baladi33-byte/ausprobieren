// ============================================
// studyPlanner.js - المحرك الإحصائي للخطة اليومية
// الإصدار النهائي - Stateless بالكامل
// ============================================

(function() {
    "use strict";

    // ============================================
    // تعريف الحالات (States)
    // ============================================
    const STATE = {
        SETUP: 'setup',
        SECTIONS: 'sections',
        PLAN: 'plan',
        CUSTOMIZE: 'customize'   // ✅ الحالة الجديدة
    };

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
        if (remainingExams === 0) return 0;
        if (workingDays === 0) return 0;

        let dailyCount = Math.ceil(remainingExams / workingDays);

        // الحد الأدنى حسب ساعات الدراسة
        let minDaily = 4;
        if (dailyHours >= 2 && dailyHours <= 3) {
            minDaily = 8;
        }
        if (dailyHours >= 4) {
            minDaily = 12;
        }

        dailyCount = Math.max(dailyCount, minDaily);
        dailyCount = Math.min(dailyCount, remainingExams);

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

    // ============================================
    // 12. نظام النسب المخصصة (تطوير النظام الخاص بي)
    // ============================================

    // قائمة الأقسام الثمانية
    const CUSTOM_SECTIONS = [
        { id: 'hoeren1', label: 'Hören 1' },
        { id: 'hoeren2', label: 'Hören 2' },
        { id: 'hoeren3', label: 'Hören 3' },
        { id: 'lesen1', label: 'Lesen 1' },
        { id: 'lesen2', label: 'Lesen 2' },
        { id: 'lesen3', label: 'Lesen 3' },
        { id: 'sprach1', label: 'Sprach 1' },
        { id: 'sprach2', label: 'Sprach 2' }
    ];

    // تخزين النسب
    function getSavedWeights() {
        try {
            const data = localStorage.getItem('planner_weights');
            return data ? JSON.parse(data) : null;
        } catch { return null; }
    }

    function saveWeights(weights) {
        localStorage.setItem('planner_weights', JSON.stringify(weights));
    }

    // حساب الخيارات المتاحة لكل قسم بناءً على المجموع الحالي
    function getAvailableOptions(currentTotal) {
        const remaining = 100 - currentTotal;
        const options = [];
        for (let i = 0; i <= remaining; i += 10) {
            options.push(i);
        }
        return options;
    }

    // ============================================
    // دالة عرض واجهة النسب (Customize)
    // ============================================
    function renderCustomize() {
        const container = document.getElementById('studyPlannerContainer');
        if (!container) return;

        const formattedDate = savedDate ? savedDate.split('-').reverse().join(' / ') : 'لم يُحدد';

        // تحميل النسب المحفوظة أو إنشاء افتراضي (جميعها 0)
        let savedWeights = getSavedWeights();
        if (!savedWeights) {
            savedWeights = {};
            CUSTOM_SECTIONS.forEach(s => { savedWeights[s.id] = 0; });
        }

        // حساب المجموع الحالي
        let currentTotal = Object.values(savedWeights).reduce((a, b) => a + b, 0);

        // بناء HTML
        let sectionsHTML = CUSTOM_SECTIONS.map(section => {
            const currentValue = savedWeights[section.id] || 0;
            const remainingAfterCurrent = 100 - (currentTotal - currentValue);
            const available = [];
            for (let i = 0; i <= remainingAfterCurrent; i += 10) {
                available.push(i);
            }

            return `
                <div class="custom-section-row" style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid #eef2f6;">
                    <span style="font-size:0.85rem; font-weight:500; color:#1e293b;">${section.label}</span>
                    <select class="custom-weight-select" data-section="${section.id}" style="padding:4px 8px; border-radius:8px; border:1px solid #e2e8f0; font-size:0.8rem; background:#ffffff; color:#1e293b; min-width:80px; text-align:center; font-family:inherit;">
                        ${available.map(v => `<option value="${v}" ${v === currentValue ? 'selected' : ''}>${v}%</option>`).join('')}
                    </select>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="planner-card">
                <div class="planner-top-bar">
                    <div class="left-icons">
                        <button id="plannerSettingsBtn" title="الإعدادات">
                            <span class="material-symbols-outlined">settings</span>
                        </button>
                        <button id="plannerInfoBtn" title="معلومات">
                            <span class="material-symbols-outlined">info</span>
                        </button>
                    </div>
                    <div class="right-date">
                        <span class="material-symbols-outlined">calendar_month</span>
                        ${formattedDate}
                    </div>
                </div>

                <div style="text-align:center; font-size:0.9rem; font-weight:500; color:#1e293b; margin-bottom:14px;">
                    املأ نسب الأهمية لكل قسم
                </div>

                <div id="customWeightsContainer">
                    ${sectionsHTML}
                </div>

                <div style="text-align:center; margin-top:12px; font-size:0.75rem; color:#94a3b8;">
                    المجموع: <span id="customTotalDisplay">${currentTotal}</span>%
                    ${currentTotal === 100 ? ' ✅ مكتمل' : ''}
                </div>

                <button id="customCheckBtn" class="planner-section-btn" style="width:100%; margin-top:14px; padding:10px 0; font-size:0.85rem; font-weight:600; text-align:center; border:1px solid #D5E0EC; border-radius:14px; background:linear-gradient(90deg, #161922 0%, #2D3138 50%, #161922 100%); color:#B0B8C9; box-shadow:0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04); cursor:pointer; transition:all 0.25s cubic-bezier(0.2,0.9,0.4,1.1); font-family:inherit;">
                    فحص
                </button>
            </div>
        `;

        // ===== ربط الأحداث =====

        // 1. ربط زر الإعدادات
        document.getElementById('plannerSettingsBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            const currentDate = savedDate || new Date().toISOString().slice(0, 10);
            const currentHours = savedHours;

            const overlay = document.createElement('div');
            overlay.className = 'planner-popup-overlay';
            overlay.innerHTML = `
                <div class="planner-popup-card" style="max-width:300px; width:90%; padding:16px 18px 18px; border-radius:16px; box-shadow:0 6px 24px rgba(0,0,0,0.04); background:#ffffff; border:1px solid #edf1f7;">
                    <div class="planner-popup-title" style="font-size:0.9rem; font-weight:600; color:#1e293b; text-align:center; margin-bottom:14px;">تعديل المعلومات الخاصة بي</div>
                    <div style="margin-bottom:10px;">
                        <label style="display:block; font-size:0.7rem; font-weight:600; color:#1e293b; margin-bottom:3px; text-align:right;">تاريخ الامتحان</label>
                        <input type="date" id="popupExamDate" value="${currentDate}" style="width:100%; padding:7px 10px; border:1px solid #e2e8f0; border-radius:8px; font-size:0.8rem; color:#1e293b; background:#ffffff; font-family:inherit; box-sizing:border-box; direction:rtl;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block; font-size:0.7rem; font-weight:600; color:#1e293b; margin-bottom:3px; text-align:right;">كم ساعة تراجع يومياً</label>
                        <input type="number" id="popupDailyHours" value="${currentHours}" min="1" max="12" step="1" style="width:100%; padding:7px 10px; border:1px solid #e2e8f0; border-radius:8px; font-size:0.8rem; color:#1e293b; background:#ffffff; font-family:inherit; box-sizing:border-box; direction:rtl;">
                    </div>
                    <button id="popupSaveBtn" class="planner-section-btn" style="width:100%; padding:9px 0; font-size:0.85rem; font-weight:600; text-align:center; border:1px solid #D5E0EC; border-radius:14px; background:linear-gradient(90deg, #161922 0%, #2D3138 50%, #161922 100%); color:#B0B8C9; box-shadow:0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04); cursor:pointer; transition:all 0.25s cubic-bezier(0.2,0.9,0.4,1.1); font-family:inherit;">فحص</button>
                </div>
            `;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('active'), 10);

            overlay.querySelector('#popupSaveBtn').addEventListener('click', function() {
                const date = document.getElementById('popupExamDate').value;
                const hours = parseInt(document.getElementById('popupDailyHours').value) || 4;
                if (!date) { alert('يرجى اختيار تاريخ.'); return; }
                if (hours < 1 || hours > 12) { alert('عدد الساعات بين 1 و 12.'); return; }
                showLoader(() => {
                    saveUserData(date, hours);
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                    renderCurrentState();
                });
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    setTimeout(() => overlay.remove(), 300);
                }
            });
        });

        // 2. ربط زر المعلومات
        document.getElementById('plannerInfoBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            showPopup(
                'كيف يعمل المدرب الذكي؟',
                `
                <p style="margin:0 0 10px 0; color:#475569; line-height:1.7; font-size:0.75rem; text-align:right;">يعتمد النظام على خوارزمية دقيقة لتصميم خطتك اليومية بناءً على موعد امتحانك. يحسب النظام أولاً عدد الامتحانات المطلوب إنجازها اليوم لضمان وصولك إلى <strong style="color:#2c3e66; font-weight:500;">6 مراجعات</strong> على الأقل لكل امتحان قبل يومين من الامتحان.</p>
                <p style="margin:0 0 8px 0; color:#1e293b; font-weight:500; font-size:0.75rem; text-align:right;">بعد تحديد العدد، يختار النظام تلقائياً الامتحانات الأكثر أولوية بناءً على 3 قواعد أساسية:</p>
                <div style="margin:0 0 12px 0; font-size:0.75rem; line-height:1.8; color:#475569; text-align:right;">
                    <p style="margin:0 0 2px 0;"><strong style="font-weight:500; color:#2c3e66;">النتيجة:</strong> <span style="color:#64748b;">التركيز على الامتحانات ذات الدرجات المنخفضة.</span></p>
                    <p style="margin:0 0 2px 0;"><strong style="font-weight:500; color:#2c3e66;">عدد المراجعات:</strong> <span style="color:#64748b;">إعطاء الأولوية للامتحانات التي لم تُراجع كثيراً.</span></p>
                    <p style="margin:0 0 2px 0;"><strong style="font-weight:500; color:#2c3e66;">آخر مراجعة:</strong> <span style="color:#64748b;">ضمان عدم إهمال أي امتحان لفترة طويلة.</span></p>
                </div>
                <p style="margin:12px 0 0 0; color:#1e293b; font-weight:400; text-align:center; font-size:0.75rem; line-height:1.5;">اختر القسم الآن، ودع النظام يحدد لك المسار الأسرع والأضمن للنجاح.</p>
                `
            );
        });

        // 3. ربط تغيير النسب
        const selects = container.querySelectorAll('.custom-weight-select');
        selects.forEach(select => {
            select.addEventListener('change', function() {
                const sectionId = this.dataset.section;
                const newValue = parseInt(this.value);
                savedWeights[sectionId] = newValue;
                currentTotal = Object.values(savedWeights).reduce((a, b) => a + b, 0);
                updateCustomOptions(savedWeights);
                document.getElementById('customTotalDisplay').textContent = currentTotal;
                saveWeights(savedWeights);
            });
        });

        // 4. ربط زر "فحص"
        document.getElementById('customCheckBtn').addEventListener('click', function() {
            if (currentTotal !== 100) {
                alert('⚠️ مجموع النسب يجب أن يكون 100% بالضبط.');
                return;
            }
            showLoader(() => {
                currentState = STATE.CUSTOMIZE;
                renderCustomPlan(savedWeights);
            });
        });

        // دالة مساعدة لتحديث خيارات كل قسم
        function updateCustomOptions(weights) {
            const total = Object.values(weights).reduce((a, b) => a + b, 0);
            const selects = document.querySelectorAll('.custom-weight-select');
            selects.forEach(sel => {
                const sectionId = sel.dataset.section;
                const currentVal = weights[sectionId] || 0;
                const remaining = 100 - (total - currentVal);
                const options = [];
                for (let i = 0; i <= remaining; i += 10) {
                    options.push(i);
                }
                const selectedValue = parseInt(sel.value);
                sel.innerHTML = '';
                options.forEach(v => {
                    const opt = document.createElement('option');
                    opt.value = v;
                    opt.textContent = v + '%';
                    if (v === selectedValue && v <= remaining) {
                        opt.selected = true;
                    }
                    sel.appendChild(opt);
                });
                if (!sel.value) {
                    sel.value = Math.min(currentVal, remaining);
                    weights[sectionId] = parseInt(sel.value);
                }
            });
            const newTotal = Object.values(weights).reduce((a, b) => a + b, 0);
            document.getElementById('customTotalDisplay').textContent = newTotal;
            saveWeights(weights);
        }
    }

    // ============================================
    // دالة توليد الخطة الموزونة (Custom Plan)
    // ============================================
    function renderCustomPlan(weights) {
        const container = document.getElementById('studyPlannerContainer');
        if (!container) return;

        // الحصول على جميع الامتحانات من جميع المهارات
        const allExams = [];
        const skillKeys = Object.keys(window.examsDatabase);

        skillKeys.forEach(skill => {
            const examIds = window.examsDatabase[skill].map(e => e.id).filter(id => id !== undefined);
            examIds.forEach(id => {
                const score = window.getExamResult ? window.getExamResult(skill, id) : null;
                const retries = window.getRetryCount ? window.getRetryCount(skill, id) : 0;
                const lastReviewDays = window.getLastReviewDays ? window.getLastReviewDays(skill, id) : null;
                allExams.push({
                    id: id,
                    skill: skill,
                    score: score,
                    retries: retries,
                    lastReviewDays: lastReviewDays,
                    isNew: (score === null)
                });
            });
        });

        // حساب الامتحانات المتبقية
        const remainingExams = allExams.filter(e => e.retries < 6);
        const remainingCount = remainingExams.length;
        if (remainingCount === 0) {
            container.innerHTML = `<div class="planner-card" style="text-align:center;padding:30px;color:#22c55e;font-size:0.9rem;">✅ جميع الامتحانات حققت 6 مراجعات! أنت جاهز تماماً.</div>`;
            return;
        }

        const { workingDays } = calculateWorkingDays(new Date(savedDate));
        if (workingDays === 0) {
            container.innerHTML = `<div class="planner-card" style="text-align:center;padding:30px;color:#f59e0b;font-size:0.9rem;">⏰ أنت في فترة المراجعة النهائية (آخر يومين). راجع الامتحانات التي تشعر أنك بحاجة إليها.</div>`;
            return;
        }

        // حساب dailyCount بنفس طريقة الخوارزمية الأساسية
        let dailyCount = Math.ceil(remainingCount / workingDays);
        let minDaily = 4;
        if (savedHours >= 2 && savedHours <= 3) minDaily = 8;
        if (savedHours >= 4) minDaily = 12;
        dailyCount = Math.max(dailyCount, minDaily);
        dailyCount = Math.min(dailyCount, remainingCount);

        // ترتيب الامتحانات حسب الأولوية
        function calculatePriority(exam) {
            const scoreWeight = (exam.score !== null) ? exam.score : 0;
            const retryWeight = exam.retries;
            const reviewWeight = (exam.lastReviewDays !== null) ? exam.lastReviewDays : 0;
            return (scoreWeight * 10000) + (retryWeight * 100) + reviewWeight;
        }

        const sortedExams = remainingExams.slice().sort((a, b) => {
            const pa = calculatePriority(a);
            const pb = calculatePriority(b);
            if (pa !== pb) return pa - pb;
            return a.id - b.id;
        });

        // توزيع الامتحانات حسب النسب
        const sectionKeys = Object.keys(weights);
        let totalWeight = 0;
        sectionKeys.forEach(key => { totalWeight += weights[key]; });

        if (totalWeight !== 100) {
            alert('⚠️ مجموع النسب يجب أن يكون 100%.');
            return;
        }

        const examGroups = {};
        const selectedExams = [];

        sectionKeys.forEach(skill => {
            const weight = weights[skill];
            if (weight === 0) return;
            const count = Math.round((weight / 100) * dailyCount);
            if (count === 0) return;
            const examsForSkill = sortedExams.filter(e => e.skill === skill);
            const taken = examsForSkill.slice(0, count);
            if (taken.length > 0) {
                examGroups[skill] = taken;
                selectedExams.push(...taken);
            }
        });

        // إذا لم يتم اختيار امتحانات كافية، نملأ الباقي
        if (selectedExams.length < dailyCount) {
            const remaining = dailyCount - selectedExams.length;
            const extra = sortedExams.filter(e => !selectedExams.includes(e)).slice(0, remaining);
            if (extra.length > 0) {
                const firstSkill = sectionKeys.find(k => weights[k] > 0);
                if (firstSkill) {
                    if (!examGroups[firstSkill]) examGroups[firstSkill] = [];
                    examGroups[firstSkill].push(...extra);
                    selectedExams.push(...extra);
                }
            }
        }

        // عرض النتيجة
        const formattedDate = savedDate ? savedDate.split('-').reverse().join(' / ') : '';

        let groupsHTML = '';
        const sortedSkills = sectionKeys.filter(s => weights[s] > 0);
        sortedSkills.forEach(skill => {
            const exams = examGroups[skill] || [];
            if (exams.length === 0) return;
            const skillLabel = CUSTOM_SECTIONS.find(s => s.id === skill)?.label || skill;
            groupsHTML += `
                <div style="margin-top:12px; margin-bottom:4px;">
                    <div style="font-size:0.85rem; font-weight:600; color:#2c3e66; padding:4px 0; border-bottom:1px solid #eef2f6;">${skillLabel}</div>
                    ${exams.map(exam => `
                        <div class="exam-card" data-exam-id="${exam.id}" data-skill="${exam.skill}" style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:#ffffff; border-radius:8px; border:1px solid #eef2f6; cursor:pointer; transition:all 0.15s ease; box-shadow:0 1px 3px rgba(0,0,0,0.02); margin-top:4px;">
                            <span style="font-size:0.8rem; font-weight:500; color:#1e293b;">امتحان ${exam.id}</span>
                            <div style="display:flex; align-items:center; gap:8px; font-size:0.65rem; color:#64748b;">
                                <span>${exam.isNew ? 'جديد' : exam.score + '/25'}</span>
                                <span>🔄 ${exam.retries}</span>
                                <span>${exam.lastReviewDays !== null ? (exam.lastReviewDays === 0 ? 'اليوم' : `منذ ${exam.lastReviewDays} يوم`) : 'لم يُراجع'}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        });

        const remainingDays = Math.ceil((new Date(savedDate) - new Date()) / (1000 * 3600 * 24));

        container.innerHTML = `
            <div class="planner-card">
                <div class="planner-header" style="display:flex; justify-content:space-between; align-items:center; padding-bottom:14px; border-bottom:1px solid #eef2f6;">
                    <div class="planner-date" style="display:flex; align-items:center; gap:6px; font-size:0.8rem; font-weight:500; color:#1e293b;">
                        <span class="material-symbols-outlined" style="font-size:18px; color:#94a3b8;">calendar_month</span>
                        ${formattedDate || '—'}
                    </div>
                    <div class="planner-remaining" style="display:flex; align-items:center; gap:6px; font-size:0.8rem; font-weight:500; color:#1e293b;">
                        <span class="material-symbols-outlined" style="font-size:18px; color:#94a3b8;">schedule</span>
                        لديك <span style="color:#2c3e66; font-weight:600;">${Math.max(remainingDays, 0)}</span> يوم
                    </div>
                </div>
                <div style="font-size:1.1rem; font-weight:500; text-align:center; margin:12px 0 16px 0; color:#1e293b;">
                    خطتنا لهذا اليوم <strong>${dailyCount}</strong> امتحان${dailyCount > 1 ? 'ات' : ''}
                </div>
                <div class="exam-list" style="display:flex; flex-direction:column; gap:4px;">
                    ${groupsHTML}
                </div>
            </div>
        `;

        // ربط النقر على الامتحانات
        document.querySelectorAll('.exam-card').forEach(card => {
            card.addEventListener('click', function() {
                const examId = parseInt(this.dataset.examId);
                const skill = this.dataset.skill;
                if (typeof window.openExam === 'function') {
                    const modal = document.getElementById('studyPlannerModal');
                    if (modal) modal.style.display = 'none';
                    window.openExam(examId, `امتحان ${examId}`, skill);
                } else {
                    alert('⚠️ دالة openExam غير متوفرة');
                }
            });
        });
    }

    // ============================================
    // 13. تعديل دالة renderSections لإضافة الزر الجديد
    // ============================================
    const originalRenderSections = renderSections;

    renderSections = function() {
        // استدعاء النسخة الأصلية
        originalRenderSections();

        // بعد عرض الأزرار، نضيف الزر الجديد
        const container = document.getElementById('studyPlannerContainer');
        if (!container) return;

        const card = container.querySelector('.planner-card');
        if (!card) return;

        const grids = card.querySelectorAll('.planner-sections-grid');
        if (grids.length === 0) return;

        const lastGrid = grids[grids.length - 1];
        const newBtn = document.createElement('button');
        newBtn.className = 'planner-section-btn';
        newBtn.style.cssText = 'width:100%; margin-top:12px; padding:10px 0; font-size:0.85rem; font-weight:600; text-align:center; border:1px solid #D5E0EC; border-radius:14px; background:linear-gradient(90deg, #161922 0%, #2D3138 50%, #161922 100%); color:#B0B8C9; box-shadow:0 2px 6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04); cursor:pointer; transition:all 0.25s cubic-bezier(0.2,0.9,0.4,1.1); font-family:inherit;';
        newBtn.textContent = 'تطوير النظام الخاص بي';
        newBtn.addEventListener('click', function() {
            currentState = STATE.CUSTOMIZE;
            renderCurrentState();
        });

        // إدراج الزر بعد آخر شبكة
        lastGrid.parentNode.insertBefore(newBtn, lastGrid.nextSibling);
    };

    // ============================================
    // 14. تعديل دالة renderCurrentState لإدارة الحالة الجديدة
    // ============================================
    const originalRenderCurrentState = renderCurrentState;

    renderCurrentState = function() {
        if (currentState === STATE.CUSTOMIZE) {
            renderCustomize();
        } else {
            originalRenderCurrentState();
        }
    };

    // ============================================
    // 15. تصدير STATE للاستخدام العالمي
    // ============================================
    window.STATE = STATE;

    console.log('✅ studyPlanner.js (النسخة النهائية مع نظام النسب المخصصة) تم تحميله بنجاح');
    console.log('💡 استخدم window.generateStudyPlan(skill, examDate, dailyHours) لتوليد الخطة');
    console.log('💡 استخدم window.checkStudyPlannerDependencies() لفحص التبعيات');
    console.log('💡 ميزة "تطوير النظام الخاص بي" متاحة الآن!');

})();
