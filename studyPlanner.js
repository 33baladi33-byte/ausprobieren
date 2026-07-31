/**
 * studyPlanner.js - Full Mathematical Scheduler & Dynamic Coverage Engine for TELC B2
 * 
 * Compatibility: Global Browser Script (No ES Modules)
 * Exposes: window.DeepStudyPlannerCoach, window.studyPlanner & window.showDailyPlan
 */

class DeepStudyPlannerCoach {
    constructor(options = {}) {
        this.storageKeyDate = options.storageKeyDate || 'user_exam_date';
        this.storageKeyData = options.storageKeyData || 'user_exam_results_v1';
        this.storageKeyMemory = options.storageKeyMemory || 'memory_trainer_progress';
        this.storageKeyCalendar = options.storageKeyCalendar || 'study_calendar_tracker_v1';

        // Full TELC Blueprint (160 total exam units: 20 tests x 8 sections)
        this.sectionHierarchy = [
            { id: 'hoeren_1', name: 'Hören 1', priority: 1, weight: 1.6, totalTests: 20, estMin: 10 },
            { id: 'hoeren_2', name: 'Hören 2', priority: 2, weight: 1.6, totalTests: 20, estMin: 12 },
            { id: 'hoeren_3', name: 'Hören 3', priority: 3, weight: 1.5, totalTests: 20, estMin: 10 },
            { id: 'lesen_1',  name: 'Lesen 1',  priority: 4, weight: 1.3, totalTests: 20, estMin: 15 },
            { id: 'lesen_2',  name: 'Lesen 2',  priority: 5, weight: 1.3, totalTests: 20, estMin: 15 },
            { id: 'lesen_3',  name: 'Lesen 3',  priority: 6, weight: 1.1, totalTests: 20, estMin: 12 },
            { id: 'sprach_1', name: 'Sprach 1', priority: 7, weight: 0.9, totalTests: 20, estMin: 10 },
            { id: 'sprach_2', name: 'Sprach 2', priority: 8, weight: 0.8, totalTests: 20, estMin: 10 }
        ];

        this.targetRepetitions = 6; // Mandatory 6 repetitions per test before exam
    }

    // ==========================================
    // 1. DATA READERS & CALENDAR STORAGE
    // ==========================================

    getExamDate() {
        return localStorage.getItem(this.storageKeyDate) || null;
    }

    setExamDate(dateStr) {
        localStorage.setItem(this.storageKeyDate, dateStr);
    }

    getRawExamData() {
        try {
            const raw = localStorage.getItem(this.storageKeyData);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.error("Error reading exam data:", e);
            return {};
        }
    }

    getCalendarHistory() {
        try {
            const raw = localStorage.getItem(this.storageKeyCalendar);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    saveCalendarDay(dateStr, data) {
        const history = this.getCalendarHistory();
        history[dateStr] = data;
        localStorage.setItem(this.storageKeyCalendar, JSON.stringify(history));
    }

    getDaysRemaining() {
        const dateStr = this.getExamDate();
        if (!dateStr) return null;

        const now = new Date();
        const exam = new Date(dateStr);
        now.setHours(0, 0, 0, 0);
        exam.setHours(0, 0, 0, 0);

        const diffTime = exam.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }

    getEffectiveStudyDays() {
        const days = this.getDaysRemaining();
        if (days === null) return 30; // Default fallback
        const effective = days - 2; // Reserve last 2 days for light review/rest
        return effective > 0 ? effective : 1;
    }

    // ==========================================
    // 2. SPACED REPETITION WAVES & DECAY
    // ==========================================

    getSpacedIntervalDays(score) {
        if (score < 50) return 1;   // Wave 1: Next day
        if (score < 65) return 2;   // Wave 2: After 2 days
        if (score < 78) return 4;   // Wave 3: After 4 days
        if (score < 90) return 7;   // Wave 4: After 1 week
        if (score < 95) return 14;  // Wave 5: After 2 weeks
        return 30;                  // Wave 6: Mastered (After 1 month)
    }

    // ==========================================
    // 3. MATHEMATICAL LOAD & COVERAGE ENGINE
    // ==========================================

    calculateCoverageAndLoad() {
        const rawData = this.getRawExamData();
        const effectiveDays = this.getEffectiveStudyDays();

        let totalTargetRepsAll = 0;
        let completedRepsAll = 0;
        let remainingRepsAll = 0;

        const sectionStats = {};

        this.sectionHierarchy.forEach(sec => {
            const secData = rawData[sec.id] || [];
            const totalTests = sec.totalTests;
            const targetRepsSec = totalTests * this.targetRepetitions;
            
            let completedRepsSec = 0;
            let scoreSum = 0;
            let solvedTestsCount = 0;

            const testMap = {};
            secData.forEach(t => {
                const id = t.id || t.title;
                const attempts = Math.min(this.targetRepetitions, t.attemptsCount || 1);
                const score = t.averageScore ?? t.score ?? 0;
                
                completedRepsSec += attempts;
                scoreSum += score;
                solvedTestsCount++;

                testMap[id] = {
                    id,
                    score,
                    attempts,
                    remainingReps: Math.max(0, this.targetRepetitions - attempts),
                    lastAttemptDate: t.lastAttemptDate ? new Date(t.lastAttemptDate) : null
                };
            });

            const remainingRepsSec = targetRepsSec - completedRepsSec;
            const avgScore = solvedTestsCount > 0 ? Math.round(scoreSum / solvedTestsCount) : 0;

            // Weakness index modifier
            const weaknessIndex = avgScore === 0 ? 1.5 : Math.max(0.5, (100 - avgScore) / 40);

            sectionStats[sec.id] = {
                ...sec,
                solvedTestsCount,
                unsolvedCount: totalTests - solvedTestsCount,
                completedReps: completedRepsSec,
                targetReps: targetRepsSec,
                remainingReps: remainingRepsSec,
                avgScore,
                weaknessIndex,
                effectiveWeight: sec.weight * weaknessIndex,
                testMap
            };

            totalTargetRepsAll += targetRepsSec;
            completedRepsAll += completedRepsSec;
            remainingRepsAll += remainingRepsSec;
        });

        const coveragePercentage = Math.round((completedRepsAll / totalTargetRepsAll) * 100);
        const rawDailyRequiredLoad = Math.ceil(remainingRepsAll / effectiveDays);
        const totalPossibleReps = rawDailyRequiredLoad * effectiveDays;
        const predictedCoverage = Math.min(100, Math.round(((completedRepsAll + totalPossibleReps) / totalTargetRepsAll) * 100));

        return {
            effectiveDays,
            totalTargetRepsAll,
            completedRepsAll,
            remainingRepsAll,
            coveragePercentage,
            predictedCoverage,
            rawDailyRequiredLoad,
            sectionStats
        };
    }

    // ==========================================
    // 4. GENERATE SCHEDULED DAILY PLAN
    // ==========================================

    generateScheduledPlan() {
        const coverage = this.calculateCoverageAndLoad();
        const { effectiveDays, rawDailyRequiredLoad, sectionStats, coveragePercentage } = coverage;

        const daysRemaining = this.getDaysRemaining();
        if (daysRemaining !== null && daysRemaining <= 2) {
            return {
                isRestPeriod: true,
                daysRemaining,
                message: "باقي يومان أو أقل على الامتحان! النظام في وضع المراجعة الخفيفة والراحة."
            };
        }

        // Cap load to protect against burnout (min 4, max 18 tests daily)
        const targetDailyCount = Math.max(4, Math.min(18, rawDailyRequiredLoad));

        let sumEffectiveWeights = 0;
        Object.values(sectionStats).forEach(s => {
            if (!(s.avgScore >= 92 && s.completedReps >= s.targetReps * 0.5)) {
                sumEffectiveWeights += s.effectiveWeight;
            }
        });

        const scheduledTests = [];
        const now = Date.now();

        Object.values(sectionStats).forEach(sec => {
            const isMastered = sec.avgScore >= 92 && sec.completedReps >= sec.targetReps * 0.5;
            const quota = isMastered 
                ? 0 
                : Math.round((sec.effectiveWeight / sumEffectiveWeights) * targetDailyCount);

            if (quota <= 0 && !isMastered) return;

            const secCandidates = [];

            for (let testId = 1; testId <= sec.totalTests; testId++) {
                const tObj = sec.testMap[testId];

                if (!tObj) {
                    secCandidates.push({
                        testId,
                        sectionId: sec.id,
                        sectionName: sec.name,
                        score: 0,
                        attempts: 0,
                        remainingReps: this.targetRepetitions,
                        urgency: 100 * sec.effectiveWeight,
                        reason: `امتحان جديد ولم يُحل بعد (${this.targetRepetitions} إعادات متبقية).`,
                        estMin: sec.estMin
                    });
                } else if (tObj.remainingReps > 0) {
                    const daysSince = tObj.lastAttemptDate 
                        ? (now - tObj.lastAttemptDate.getTime()) / (1000 * 3600 * 24) 
                        : 999;
                    
                    const requiredInterval = this.getSpacedIntervalDays(tObj.score);

                    if (daysSince >= requiredInterval) {
                        let urgency = (100 - tObj.score) * 1.5 + (tObj.remainingReps * 10);
                        if (daysSince >= 20) urgency += 40;

                        secCandidates.push({
                            testId,
                            sectionId: sec.id,
                            sectionName: sec.name,
                            score: tObj.score,
                            attempts: tObj.attempts,
                            remainingReps: tObj.remainingReps,
                            urgency,
                            reason: daysSince >= 20 
                                ? `مر ${Math.round(daysSince)} يومًا (اختبار منسي محتمل).`
                                : `حان موعد المراجعة (نتيجة ${tObj.score}%، متبقي ${tObj.remainingReps} إعادات).`,
                            estMin: sec.estMin
                        });
                    }
                }
            }

            secCandidates.sort((a, b) => b.urgency - a.urgency);
            const selectedForSec = secCandidates.slice(0, Math.max(1, quota));
            scheduledTests.push(...selectedForSec);
        });

        const groupedBySection = {};
        let totalEstMinutes = 0;

        scheduledTests.forEach(item => {
            totalEstMinutes += item.estMin;
            if (!groupedBySection[item.sectionName]) {
                groupedBySection[item.sectionName] = [];
            }
            groupedBySection[item.sectionName].push(item.testId);
        });

        return {
            isRestPeriod: false,
            daysRemaining,
            effectiveDays,
            coveragePercentage,
            predictedCoverage: coverage.predictedCoverage,
            dailyRequiredLoad: rawDailyRequiredLoad,
            actualScheduledCount: scheduledTests.length,
            estimatedTotalMinutes: totalEstMinutes,
            groupedBySection,
            scheduledList: scheduledTests
        };
    }
}

// Global Objects Exposure
window.DeepStudyPlannerCoach = DeepStudyPlannerCoach;
window.studyPlanner = new DeepStudyPlannerCoach();

// ==========================================
// 5. UI LAYER & EVENT BINDING
// ==========================================

function renderSimplePlan(plan) {
    const oldOverlay = document.getElementById('plannerSimpleOverlay');
    if (oldOverlay) oldOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'plannerSimpleOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(5px);
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
        max-width: 560px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        border: 1px solid #2a3042;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        color: #e2e8f0;
        direction: rtl;
        font-family: inherit;
        animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    `;

    let html = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">🎯 المدرب الذكي (خطة اليوم)</h2>
            <button id="closeSimplePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">✕</button>
        </div>
    `;

    if (plan.isRestPeriod) {
        html += `
            <div style="text-align: center; padding: 20px 0;">
                <div style="font-size: 2.5rem; margin-bottom: 12px;">🧘</div>
                <p style="font-size: 1.1rem; color: #f1f5f9;">${plan.message}</p>
            </div>
        `;
    } else {
        html += `
            <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; display: flex; justify-content: space-between;">
                <span style="color: #94a3b8;">📅 تبقى (أيام دراسة):</span>
                <span style="font-weight: 700; color: #38bdf8;">${plan.effectiveDays} يوم</span>
            </div>
            
            <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="color: #94a3b8;">📊 التغطية الحالية:</span>
                    <span style="font-weight: 700; color: #4ade80;">${plan.coveragePercentage}%</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #94a3b8;">📈 المتوقعة بعد الخطة:</span>
                    <span style="font-weight: 700; color: #38bdf8;">${plan.predictedCoverage}%</span>
                </div>
                <div style="width: 100%; height: 6px; background: #2a3042; border-radius: 6px; margin-top: 6px;">
                    <div style="width: ${plan.coveragePercentage}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 6px;"></div>
                </div>
            </div>

            <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; display: flex; justify-content: space-between;">
                <span style="color: #94a3b8;">📝 عدد الامتحانات اليوم:</span>
                <span style="font-weight: 700; color: #f1f5f9;">${plan.actualScheduledCount} امتحان</span>
            </div>
        `;

        if (plan.groupedBySection && Object.keys(plan.groupedBySection).length > 0) {
            html += `<div style="margin: 12px 0 8px 0; font-weight: 600; color: #f1f5f9;">📋 الخطة اليومية:</div>`;
            for (const [sectionName, tests] of Object.entries(plan.groupedBySection)) {                html += `
                    <div style="background: #0f1421; border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; border-right: 3px solid #38bdf8;">
                        <div style="font-weight: 500; color: #f1f5f9;">${sectionName}</div>
                        <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">امتحانات: ${tests.join('، ')}</div>
                    </div>
                `;
            }
        }

        if (plan.estimatedTotalMinutes) {
            const hours = Math.floor(plan.estimatedTotalMinutes / 60);
            const mins = plan.estimatedTotalMinutes % 60;
            html += `
                <div style="margin-top: 12px; font-size: 0.85rem; color: #94a3b8;">
                    ⏱️ المدة المتوقعة: ${hours > 0 ? hours + ' ساعة و ' : ''}${mins} دقيقة
                </div>
            `;
        }
    }

    html += `
        <button id="closeSimplePlanBtn2" style="
            width: 100%;
            margin-top: 16px;
            padding: 12px;
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

    const close1 = document.getElementById('closeSimplePlanBtn');
    const close2 = document.getElementById('closeSimplePlanBtn2');
    const closeFn = () => overlay.remove();
    
    if (close1) close1.addEventListener('click', closeFn);
    if (close2) close2.addEventListener('click', closeFn);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });

    if (!document.getElementById('plannerSimpleStyles')) {
        const style = document.createElement('style');
        style.id = 'plannerSimpleStyles';
        style.textContent = `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes spin { to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }
}

// Global Main Execution Function Called By The Button
window.showDailyPlan = function() {
    const planner = window.studyPlanner;
    if (!planner) {
        alert('⚠️ المدرب الذكي غير جاهز بعد، حاول مرة أخرى.');
        return;
    }

    if (!planner.getExamDate()) {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 30);
        const dateStr = prompt('📅 يرجى إدخال تاريخ الامتحان (YYYY-MM-DD):', defaultDate.toISOString().slice(0, 10));
        if (dateStr) {
            planner.setExamDate(dateStr);
        } else {
            return;
        }
    }

    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'plannerLoadingOverlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(5px);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const loadingCard = document.createElement('div');
    loadingCard.style.cssText = `
        background: #1a1f2e;
        border-radius: 24px;
        padding: 28px 30px;
        max-width: 420px;
        width: 90%;
        text-align: center;
        color: #e2e8f0;
        direction: rtl;
    `;

    loadingCard.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 16px;">⏳</div>
        <h3 style="color: #f1f5f9; margin: 0 0 10px 0;">جارٍ تحليل تقدمك...</h3>
        <div style="width: 40px; height: 40px; margin: 20px auto; border: 4px solid #2a3042; border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">نحسب أفضل خطة يومية لحجم الضغط ونسبة التغطية...</p>
    `;

    loadingOverlay.appendChild(loadingCard);
    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
        loadingOverlay.remove();
        const plan = planner.generateScheduledPlan();
        renderSimplePlan(plan);
    }, 600);
};

// Auto Event Binding on DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('studyPlannerBtn');
    if (btn) {
        btn.removeEventListener('click', window.showDailyPlan);
        btn.addEventListener('click', window.showDailyPlan);
        console.log('✅ زر المدرب الذكي مربوط بنجاح.');
    } else {
        console.warn('⚠️ ملاحظة: الزر studyPlannerBtn غير موجود في هذه الصفحة حالياً.');
    }
});
