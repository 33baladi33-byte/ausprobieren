// ============================================
// studyPlanner.js - المدرب الذكي (Smart Study Planner)
// الإصدار 2.0 - مع واجهة اختيار التاريخ
// ============================================

(function() {
    "use strict";

    // ============================================
    // 1. إعدادات النظام الأساسية
    // ============================================

    const PLANNER_KEY = 'studyPlannerData';
    const EXAM_DATE_KEY = 'examDate';
    const CONFIG = {
        reviewIntervals: { high: 7, medium: 4, low: 2, veryLow: 1 },
        sectionWeights: {
            hoeren1: 10, hoeren2: 10, hoeren3: 10,
            lesen1: 10, lesen2: 10, lesen3: 7,
            sprach1: 5, sprach2: 3
        },
        activeSkills: ['hoeren1', 'hoeren2', 'hoeren3', 'lesen1', 'lesen2', 'lesen3', 'sprach1', 'sprach2']
    };

    // ============================================
    // 2. دوال تخزين البيانات (Cache & Exam Date)
    // ============================================

    function getPlannerData() {
        try {
            const raw = localStorage.getItem(PLANNER_KEY);
            if (raw) {
                const data = JSON.parse(raw);
                const today = new Date().toISOString().slice(0, 10);
                if (data.date === today) return data;
            }
        } catch (e) { /* ignore */ }
        return null;
    }

    function savePlannerData(data) {
        try {
            data.date = new Date().toISOString().slice(0, 10);
            localStorage.setItem(PLANNER_KEY, JSON.stringify(data));
        } catch (e) { /* ignore */ }
    }

    function getExamDate() {
        return localStorage.getItem(EXAM_DATE_KEY);
    }

    function setExamDate(date) {
        localStorage.setItem(EXAM_DATE_KEY, date);
    }

    // ============================================
    // 3. تحليل بيانات المستخدم (بدون تغيير)
    // ============================================

    function analyzeUserProgress() {
        // ... (نفس الكود السابق، لم يتغير)
        // تم حذفه للاختصار، لكن سيتم إدراجه في النسخة النهائية
        // يمكنك إعادة استخدام الكود القديم كما هو
        const result = {
            examDate: getExamDate(),
            daysRemaining: null,
            sections: {},
            totalExamsCompleted: 0,
            averageScore: 0,
            totalRetries: 0,
            overallProgress: 0,
            summary: {}
        };

        if (result.examDate) {
            const today = new Date();
            const exam = new Date(result.examDate);
            const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
            result.daysRemaining = diff > 0 ? diff : 0;
        }

        const skills = CONFIG.activeSkills;
        let totalScoreSum = 0, totalScoreCount = 0, totalRetriesSum = 0;

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

            const examList = window.examsDatabase && window.examsDatabase[skill] ? window.examsDatabase[skill] : [];
            sectionData.totalExams = examList.length;

            let examScores = [], totalRetries = 0, lastReviewTimestamp = null;
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
                // آخر مراجعة (تقريبية)
                const lastReview = window.getLastReviewDate ? window.getLastReviewDate(skill, examId) : null;
                if (lastReview) {
                    const days = Math.floor((Date.now() - new Date(lastReview)) / (1000 * 60 * 60 * 24));
                    if (lastReviewTimestamp === null || days < lastReviewTimestamp) {
                        lastReviewTimestamp = days;
                    }
                }
            });

            if (examScores.length > 0) {
                sectionData.average = examScores.reduce((a, b) => a + b, 0) / examScores.length;
            }
            if (lastReviewTimestamp !== null) {
                sectionData.lastReviewDays = lastReviewTimestamp;
            }
            sectionData.retryCount = totalRetries;
            sectionData.progress = sectionData.totalExams > 0 ? (sectionData.completedExams / sectionData.totalExams) * 100 : 0;
            result.sections[skill] = sectionData;
        });

        result.totalExamsCompleted = totalScoreCount;
        result.averageScore = totalScoreCount > 0 ? totalScoreSum / totalScoreCount : 0;
        result.totalRetries = totalRetriesSum;

        let totalProgress = 0, count = 0;
        skills.forEach(skill => {
            if (result.sections[skill]) {
                totalProgress += result.sections[skill].progress;
                count++;
            }
        });
        result.overallProgress = count > 0 ? totalProgress / count : 0;

        // حساب الأولويات
        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (!sec) return;
            let scoreFactor = sec.average > 0 ? Math.max(0, (100 - sec.average) / 100) * 40 : 40;
            let reviewFactor = sec.lastReviewDays !== null ? Math.min(25, sec.lastReviewDays * 2) : 25;
            let retryFactor = sec.retryCount > 0 ? Math.min(15, sec.retryCount * 3) : 0;
            let progressFactor = sec.progress > 0 ? Math.max(0, (100 - sec.progress) / 100) * 10 : 10;
            const weight = CONFIG.sectionWeights[skill] || 5;
            const weightFactor = (weight / 10) * 10;
            sec.priority = Math.min(100, Math.round(scoreFactor + reviewFactor + retryFactor + progressFactor + weightFactor));
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
    // 4. توليد خطة اليوم (بدون تغيير)
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

        if (!analysis.daysRemaining || analysis.daysRemaining <= 0) {
            plan.message = '📅 يرجى تحديد تاريخ الامتحان في الإعدادات للحصول على خطة يومية دقيقة.';
            return plan;
        }

        const totalRemainingExams = analysis.sections[Object.keys(analysis.sections)[0]]?.totalExams || 0;
        let dailyCapacity = analysis.daysRemaining < 10 ? 6 : (analysis.daysRemaining < 20 ? 5 : (analysis.daysRemaining < 40 ? 4 : 3));

        const skills = CONFIG.activeSkills;
        const sortedSkills = skills.slice().sort((a, b) => (analysis.sections[b]?.priority || 0) - (analysis.sections[a]?.priority || 0));

        let totalSelected = 0;
        const selectedExams = {};
        for (const skill of sortedSkills) {
            if (totalSelected >= dailyCapacity) break;
            const sec = analysis.sections[skill];
            if (!sec) continue;
            let count = 1;
            if (sec.priority > 80) count = 2;
            if (sec.priority > 90) count = 3;
            if (analysis.daysRemaining < 15) count = Math.min(count + 1, 3);

            const availableExams = window.examsDatabase && window.examsDatabase[skill] ? window.examsDatabase[skill] : [];
            const remaining = sec.totalExams - (sec.completedExams || 0);
            const examIds = availableExams.map(e => e.id);
            const sortedExams = examIds.slice().sort((a, b) => {
                const aResult = window.getExamResult ? window.getExamResult(skill, a) : null;
                const bResult = window.getExamResult ? window.getExamResult(skill, b) : null;
                const aRetry = window.getRetryCount ? window.getRetryCount(skill, a) : 0;
                const bRetry = window.getRetryCount ? window.getRetryCount(skill, b) : 0;
                if (aResult === null && bResult !== null) return -1;
                if (bResult === null && aResult !== null) return 1;
                if (aResult !== null && bResult !== null) return aResult - bResult;
                return bRetry - aRetry;
            });

            let selected = 0;
            for (const id of sortedExams) {
                if (selected >= count) break;
                if (!selectedExams[skill]) selectedExams[skill] = [];
                if (!selectedExams[skill].includes(id)) {
                    selectedExams[skill].push(id);
                    selected++;
                    totalSelected++;
                }
            }
        }

        for (const skill in selectedExams) {
            const exams = selectedExams[skill];
            if (exams && exams.length > 0) {
                plan.sections.push({ skill: skill, exams: exams, count: exams.length });
                plan.totalExams += exams.length;
            }
        }
        plan.estimatedTime = plan.totalExams * 15;

        if (plan.totalExams === 0) {
            plan.message = '🎉 مبروك! يبدو أنك أنهيت جميع الامتحانات. ركز على المراجعة الخفيفة.';
        } else {
            plan.message = `📋 خطة اليوم: ${plan.totalExams} امتحان${plan.totalExams > 1 ? 'ات' : ''} (حوالي ${Math.ceil(plan.estimatedTime / 60)} ساعة و ${plan.estimatedTime % 60} دقيقة).`;
        }

        for (const skill of skills) {
            const sec = analysis.sections[skill];
            if (sec && sec.lastReviewDays !== null && sec.lastReviewDays > 14) {
                plan.warnings.push(`⚠️ ${skill} لم تراجع منذ ${sec.lastReviewDays} يوماً، أنصح بمراجعته قريباً.`);
            }
        }

        return plan;
    }

    // ============================================
    // 5. دوال عرض واجهة المستخدم (المعدلة)
    // ============================================

    // 5.1 عرض شاشة اختيار التاريخ
    function renderDatePicker() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 420px;
            width: 90%;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            direction: rtl;
        `;

        const today = new Date().toISOString().slice(0, 10);
        const minDate = today;
        const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">📅</div>
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">تاريخ الامتحان</h2>
                <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 0.9rem;">اختر تاريخ امتحانك لتلقي خطة يومية مخصصة</p>
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; font-size: 0.9rem; color: #cbd5e1; margin-bottom: 6px;">📆 تاريخ الامتحان</label>
                <input type="date" id="plannerExamDate" value="${today}" min="${minDate}" max="${maxDate}" style="
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 1px solid #334155;
                    background: #0f1421;
                    color: #e2e8f0;
                    font-size: 1rem;
                    outline: none;
                    transition: border 0.2s;
                    box-sizing: border-box;
                    font-family: inherit;
                ">
            </div>
            <button id="plannerSaveDateBtn" style="
                width: 100%;
                padding: 12px;
                background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                border: none;
                border-radius: 12px;
                color: #0a0e1a;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.2s;
            " onmouseover="this.style.background='linear-gradient(135deg, #0ea5e9, #0284c7)'" onmouseout="this.style.background='linear-gradient(135deg, #38bdf8, #0ea5e9)'">
                حفظ والبدء
            </button>
            <button id="plannerCancelDateBtn" style="
                width: 100%;
                margin-top: 8px;
                padding: 10px;
                background: transparent;
                border: 1px solid #334155;
                border-radius: 12px;
                color: #94a3b8;
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#475569'; this.style.color='#cbd5e1'" onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
                إلغاء
            </button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // ربط الأحداث
        const saveBtn = document.getElementById('plannerSaveDateBtn');
        const cancelBtn = document.getElementById('plannerCancelDateBtn');
        const dateInput = document.getElementById('plannerExamDate');

        saveBtn.addEventListener('click', () => {
            const selectedDate = dateInput.value;
            if (selectedDate) {
                setExamDate(selectedDate);
                // إغلاق النافذة الحالية
                overlay.remove();
                // بدء التحليل وعرض الخطة
                showLoadingAndPlan();
            } else {
                showSimpleMessage('⚠️ يرجى اختيار تاريخ صحيح.', 'error');
            }
        });

        cancelBtn.addEventListener('click', () => overlay.remove());

        // إغلاق عند الضغط خارج البطاقة
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // 5.2 عرض شاشة التحميل ثم الخطة
    function showLoadingAndPlan() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 420px;
            width: 90%;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            text-align: center;
            direction: rtl;
        `;

        card.innerHTML = `
            <div style="padding: 20px 0;">
                <div style="font-size: 2.5rem; margin-bottom: 16px;">⏳</div>
                <h3 style="color: #f1f5f9; margin: 0 0 8px 0;">جارٍ تحليل تقدمك...</h3>
                <div style="
                    width: 40px;
                    height: 40px;
                    margin: 20px auto;
                    border: 4px solid #2a3042;
                    border-top-color: #38bdf8;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                "></div>
                <p style="color: #94a3b8; font-size: 0.9rem;">نحسب أفضل خطة لك...</p>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // بعد 0.5 ثانية، نعرض الخطة
        setTimeout(() => {
            overlay.remove();
            // جلب أو تحليل البيانات
            let cached = getPlannerData();
            let analysis = null, plan = null;
            if (cached && cached.analysis && cached.plan) {
                analysis = cached.analysis;
                plan = cached.plan;
            } else {
                analysis = analyzeUserProgress();
                if (analysis) {
                    plan = generateDailyPlan(analysis);
                    savePlannerData({ analysis, plan });
                }
            }
            if (plan) {
                renderPlan(plan, true); // مع إمكانية تغيير التاريخ
            } else {
                showSimpleMessage('⚠️ تعذر إنشاء الخطة، حاول مرة أخرى.', 'error');
            }
        }, 500);
    }

    // 5.3 عرض الخطة (مع زر تغيير التاريخ)
    function renderPlan(plan, showChangeDate = false) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 520px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            direction: rtl;
        `;

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">🎯 خطة اليوم</h2>
                <button id="closePlannerBtn" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">✕</button>
            </div>
        `;

        // الأيام المتبقية
        if (plan.daysRemaining !== null && plan.daysRemaining > 0) {
            html += `
                <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.9rem; color: #94a3b8;">📅 تبقى حتى الامتحان:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; color: #38bdf8;">${plan.daysRemaining} يوم</span>
                </div>
            `;
        }

        // التقدم الكلي
        html += `
            <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 14px;">
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
        if (plan.sections && plan.sections.length > 0) {
            html += `<div style="margin: 14px 0 10px 0; font-size: 0.95rem; font-weight: 600; color: #f1f5f9;">📋 خطة اليوم:</div>`;
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
                <div style="margin-top: 10px; font-size: 0.8rem; color: #94a3b8;">
                    ⏱️ المدة المتوقعة: ${Math.ceil(plan.estimatedTime / 60)} ساعة و ${plan.estimatedTime % 60} دقيقة
                </div>
            `;
        } else {
            html += `
                <div style="text-align: center; padding: 16px 0; color: #94a3b8;">
                    ${plan.message || '🎉 لا توجد امتحانات للتدريب اليوم، مبروك!'}
                </div>
            `;
        }

        // التحذيرات
        if (plan.warnings && plan.warnings.length > 0) {
            html += `<div style="margin-top: 16px; padding: 12px; background: rgba(251, 191, 36, 0.1); border-radius: 12px; border: 1px solid #fbbf24;">`;
            plan.warnings.forEach(w => {
                html += `<div style="font-size: 0.8rem; color: #fbbf24; margin-bottom: 4px;">${w}</div>`;
            });
            html += `</div>`;
        }

        // زر تغيير التاريخ (إذا كان مطلوباً)
        if (showChangeDate) {
            html += `
                <button id="changeDateBtn" style="
                    width: 100%;
                    margin-top: 16px;
                    padding: 10px;
                    background: rgba(56, 189, 248, 0.12);
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    border-radius: 12px;
                    color: #38bdf8;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.background='rgba(56, 189, 248, 0.2)'" onmouseout="this.style.background='rgba(56, 189, 248, 0.12)'">
                    📅 تغيير تاريخ الامتحان
                </button>
            `;
        }

        // زر إغلاق
        html += `
            <button id="closePlannerBtn2" style="
                width: 100%;
                margin-top: 12px;
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

        // ربط الأحداث
        const closeBtn1 = card.querySelector('#closePlannerBtn');
        const closeBtn2 = card.querySelector('#closePlannerBtn2');
        const changeDateBtn = card.querySelector('#changeDateBtn');
        const closeFunc = () => overlay.remove();

        if (closeBtn1) closeBtn1.addEventListener('click', closeFunc);
        if (closeBtn2) closeBtn2.addEventListener('click', closeFunc);

        if (changeDateBtn) {
            changeDateBtn.addEventListener('click', () => {
                overlay.remove();
                renderDatePicker();
            });
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // ============================================
    // 6. دوال مساعدة
    // ============================================

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'planner-overlay';
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
        // إضافة الأنيميشن إذا لم تكن موجودة
        if (!document.getElementById('plannerStyles')) {
            const style = document.createElement('style');
            style.id = 'plannerStyles';
            style.textContent = `
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes spin { to { transform: rotate(360deg); } }
            `;
            document.head.appendChild(style);
        }
        return overlay;
    }

    function showSimpleMessage(msg, type = 'info') {
        const overlay = document.createElement('div');
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
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s';
            setTimeout(() => overlay.remove(), 300);
        }, 3000);
    }

    // ============================================
    // 7. الدالة الرئيسية (تُستدعى من الزر)
    // ============================================

    window.showDailyPlan = function() {
        // 1. التحقق من وجود تاريخ الامتحان
        const examDate = getExamDate();
        if (!examDate) {
            // لا يوجد تاريخ → عرض Date Picker
            renderDatePicker();
            return;
        }

        // 2. يوجد تاريخ → تحقق من الكاش أو حلل من جديد
        let cached = getPlannerData();
        let analysis = null, plan = null;

        if (cached && cached.analysis && cached.plan) {
            analysis = cached.analysis;
            plan = cached.plan;
            console.log('📦 استخدام الخطة المخزنة مؤقتاً');
        } else {
            console.log('🔄 جارٍ تحليل التقدم...');
            analysis = analyzeUserProgress();
            if (!analysis) {
                showSimpleMessage('⚠️ لم نتمكن من تحليل بياناتك، تأكد من وجود امتحانات.', 'error');
                return;
            }
            plan = generateDailyPlan(analysis);
            savePlannerData({ analysis, plan });
            console.log('✅ تم حفظ الخطة في الكاش');
        }

        // 3. عرض الخطة مع زر تغيير التاريخ
        if (plan) {
            renderPlan(plan, true);
        } else {
            showSimpleMessage('⚠️ تعذر إنشاء الخطة، حاول مرة أخرى.', 'error');
        }
    };

    // ربط الزر عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.addEventListener('click', window.showDailyPlan);
            console.log('✅ زر المدرب الذكي مربوط.');
        } else {
            console.log('ℹ️ زر المدرب الذكي لم يوجد بعد.');
        }
    });

    // دالة لربط الزر يدوياً
    window.initStudyPlanner = function(buttonId = 'studyPlannerBtn') {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('click', window.showDailyPlan);
            console.log('✅ زر المدرب الذكي مربوط يدوياً.');
        }
    };

    // تصدير دوال للاختبار
    window.analyzeUserProgress = analyzeUserProgress;
    window.generateDailyPlan = generateDailyPlan;
    window.renderPlan = renderPlan;

    console.log('🧠 studyPlanner.js جاهز (المدرب الذكي - الإصدار 2.0)');
})();
