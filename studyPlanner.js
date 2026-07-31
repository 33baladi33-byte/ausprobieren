/**
 * studyPlanner.js - Mathematical Dynamic Review Router (No ESM / Plain Script Compatible)
 * 
 * Philosophy: Output ONLY the actionable test list required for today based on exact mathematical coverage.
 * Formula: Required Daily Tests = Math.ceil(Total Remaining Repetitions / Effective Days)
 * Target: Complete at least 6 repetitions per test 2 days before the exam date.
 */

class DeepStudyPlannerCoach {
    constructor(options = {}) {
        this.storageKeyDate = options.storageKeyDate || 'user_exam_date';
        this.storageKeyData = options.storageKeyData || 'user_exam_results_v1';
        this.storageKeyMemory = options.storageKeyMemory || 'memory_trainer_progress';

        // TELC Blueprint
        this.sections = [
            { id: 'hoeren_1', name: 'Hören 1', weight: 1.6, totalTests: 20 },
            { id: 'hoeren_2', name: 'Hören 2', weight: 1.6, totalTests: 20 },
            { id: 'hoeren_3', name: 'Hören 3', weight: 1.5, totalTests: 20 },
            { id: 'lesen_1',  name: 'Lesen 1',  weight: 1.3, totalTests: 20 },
            { id: 'lesen_2',  name: 'Lesen 2',  weight: 1.3, totalTests: 20 },
            { id: 'lesen_3',  name: 'Lesen 3',  weight: 1.1, totalTests: 20 },
            { id: 'sprach_1', name: 'Sprach 1', weight: 0.9, totalTests: 20 },
            { id: 'sprach_2', name: 'Sprach 2', weight: 0.8, totalTests: 20 }
        ];

        this.targetRepetitions = 6; // Target: 6 repetitions per test
    }

    // --------------------------------------------------
    // STORAGE & DATE UTILS
    // --------------------------------------------------
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
            return {};
        }
    }

    getMemoryTrainerData() {
        try {
            const raw = localStorage.getItem(this.storageKeyMemory);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
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
        if (days === null) return 30;
        const effective = days - 2; // Deduct 2 days before exam for rest
        return effective > 0 ? effective : 1;
    }

    // --------------------------------------------------
    // DYNAMIC COVERAGE ENGINE (NO FIXED SLICE / NO HARD-CODED MAX)
    // --------------------------------------------------
    calculateUrgency(testObj, secWeight) {
        const now = Date.now();
        const score = testObj.score || 0;
        const attempts = testObj.attempts || 0;
        const memoryCompleted = testObj.memoryCompleted ? 1 : 0;
        const daysSinceLast = testObj.lastAttemptDate 
            ? (now - new Date(testObj.lastAttemptDate).getTime()) / (1000 * 3600 * 24)
            : 999;

        const remainingReps = Math.max(0, this.targetRepetitions - attempts);

        // Priority calculation
        let scoreWeight = (100 - score) * 1.5;
        let repWeight = remainingReps * 25;
        let timeDecay = Math.min(daysSinceLast * 4, 60);
        let memoryPenalty = memoryCompleted ? 0 : 20;

        const urgency = (scoreWeight + repWeight + timeDecay + memoryPenalty) * secWeight;
        return { urgency, remainingReps };
    }

    generatePureRouterPlan(targetSectionId = null) {
        const rawData = this.getRawExamData();
        const memoryData = this.getMemoryTrainerData();
        const effectiveDays = this.getEffectiveStudyDays();
        const daysRemaining = this.getDaysRemaining();

        if (daysRemaining !== null && daysRemaining <= 2) {
            return {
                isRestPeriod: true,
                message: "باقي يومان أو أقل على الامتحان! أنت الآن في فترة الراحة والمراجعة الخفيفة."
            };
        }

        const filteredSections = targetSectionId 
            ? this.sections.filter(s => s.id === targetSectionId)
            : this.sections;

        let totalRemainingReps = 0;
        const candidatePool = [];

        filteredSections.forEach(sec => {
            const secData = rawData[sec.id] || [];
            const secMemory = memoryData[sec.id] || {};

            for (let testId = 1; testId <= sec.totalTests; testId++) {
                const foundTest = secData.find(t => (t.id || t.title) == testId) || {};
                const attempts = Math.min(this.targetRepetitions, foundTest.attemptsCount || foundTest.attempts || 0);
                const remainingReps = Math.max(0, this.targetRepetitions - attempts);

                totalRemainingReps += remainingReps;

                if (remainingReps > 0) {
                    const testObj = {
                        score: foundTest.averageScore ?? foundTest.score ?? 0,
                        attempts,
                        lastAttemptDate: foundTest.lastAttemptDate || null,
                        memoryCompleted: secMemory[testId] || false
                    };

                    const { urgency } = this.calculateUrgency(testObj, sec.weight);

                    candidatePool.push({
                        sectionId: sec.id,
                        sectionName: sec.name,
                        testId,
                        urgency
                    });
                }
            }
        });

        // Exact Mathematical Load Calculation
        let dailyRequiredCount = Math.ceil(totalRemainingReps / effectiveDays);

        // Minimum boundary of 4 tests per day (No upper boundary max limit)
        let actualLoad = Math.max(4, dailyRequiredCount);

        // Sort candidates strictly by urgency
        candidatePool.sort((a, b) => b.urgency - a.urgency);

        // Dynamically pick exact required count
        const selected = candidatePool.slice(0, actualLoad);

        // Group purely by section name
        const grouped = {};
        selected.forEach(item => {
            if (!grouped[item.sectionName]) {
                grouped[item.sectionName] = [];
            }
            grouped[item.sectionName].push(item.testId);
        });

        return {
            isRestPeriod: false,
            grouped
        };
    }
}

// Global Exposure
window.DeepStudyPlannerCoach = DeepStudyPlannerCoach;
window.studyPlanner = new DeepStudyPlannerCoach();

// ==================================================
// UI CONTROLLER (PURE DIRECT ROUTER INTERFACE)
// ==================================================

function checkOrPromptExamDate(callback) {
    const planner = window.studyPlanner;
    if (!planner.getExamDate()) {
        renderDatePickerModal((selectedDate) => {
            planner.setExamDate(selectedDate);
            if (typeof callback === 'function') callback();
        });
    } else {
        if (typeof callback === 'function') callback();
    }
}

function renderDatePickerModal(onSave) {
    const old = document.getElementById('plannerDateModal');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'plannerDateModal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 99999;
        display: flex; align-items: center; justify-content: center; direction: rtl;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: #1a1f2e; border-radius: 20px; padding: 24px; max-width: 360px; width: 90%;
        border: 1px solid #2a3042; color: #f1f5f9; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    const dateStr = defaultDate.toISOString().slice(0, 10);

    card.innerHTML = `
        <h3 style="margin-top:0; color:#38bdf8;">📅 حدد تاريخ الامتحان</h3>
        <p style="font-size:0.9rem; color:#94a3b8;">يرجى تحديد موعد الامتحان لضبط المعادلة اليومية.</p>
        <input type="date" id="plannerExamDateInput" value="${dateStr}" style="
            width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #3b82f6;
            background: #0f1421; color: #fff; font-size: 1rem; margin: 15px 0; text-align: center; box-sizing: border-box;
        ">
        <button id="savePlannerDateBtn" style="
            width: 100%; padding: 12px; background: #38bdf8; border: none; border-radius: 10px;
            color: #0a0e1a; font-weight: bold; cursor: pointer; font-size: 0.95rem;
        ">حفظ</button>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById('savePlannerDateBtn').onclick = () => {
        const val = document.getElementById('plannerExamDateInput').value;
        if (val) {
            overlay.remove();
            onSave(val);
        }
    };
}

function showMainMenuModal() {
    const old = document.getElementById('plannerMainModal');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'plannerMainModal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 99999;
        display: flex; align-items: center; justify-content: center; direction: rtl;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: #1a1f2e; border-radius: 20px; padding: 24px; max-width: 420px; width: 90%;
        border: 1px solid #2a3042; color: #f1f5f9; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <h3 style="margin:0; color:#38bdf8;">🎯 Smart Study Planner</h3>
            <button id="closePlannerMainBtn" style="background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">✕</button>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:12px; margin-top:15px;">
            <button id="btnOptionSection" style="
                padding: 16px; background: #0f1421; border: 1px solid #2a3042; border-radius: 14px;
                color: #f1f5f9; text-align: right; cursor: pointer; font-weight: bold; font-size: 0.95rem;
            ">🎧 أريد مراجعة قسم معين</button>

            <button id="btnOptionAuto" style="
                padding: 16px; background: #0f1421; border: 1px solid #2a3042; border-radius: 14px;
                color: #4ade80; text-align: right; cursor: pointer; font-weight: bold; font-size: 0.95rem;
            ">🤖 اختر لي خطة اليوم</button>
        </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById('closePlannerMainBtn').onclick = () => overlay.remove();

    document.getElementById('btnOptionSection').onclick = () => {
        overlay.remove();
        showSectionPickerModal();
    };

    document.getElementById('btnOptionAuto').onclick = () => {
        overlay.remove();
        executePlannerFlow(null);
    };
}

function showSectionPickerModal() {
    const overlay = document.createElement('div');
    overlay.id = 'plannerSectionModal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 99999;
        display: flex; align-items: center; justify-content: center; direction: rtl;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: #1a1f2e; border-radius: 20px; padding: 24px; max-width: 420px; width: 90%;
        border: 1px solid #2a3042; color: #f1f5f9;
    `;

    const sections = window.studyPlanner.sections;

    let gridHtml = `<div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin:20px 0;">`;
    sections.forEach(sec => {
        gridHtml += `
            <button class="sec-choice-btn" data-id="${sec.id}" style="
                padding:12px; background:#0f1421; border:1px solid #2a3042; border-radius:10px;
                color:#e2e8f0; cursor:pointer; font-weight:bold;
            ">${sec.name}</button>
        `;
    });
    gridHtml += `</div>`;

    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; color:#38bdf8;">اختر القسم</h3>
            <button id="closeSecModalBtn" style="background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">✕</button>
        </div>
        ${gridHtml}
        <button id="startSecAnalysisBtn" disabled style="
            width:100%; padding:12px; background:#2a3042; border:none; border-radius:10px;
            color:#64748b; font-weight:bold; cursor:not-allowed;
        ">ابدأ التحليل</button>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    let selectedSecId = null;

    card.querySelectorAll('.sec-choice-btn').forEach(btn => {
        btn.onclick = () => {
            card.querySelectorAll('.sec-choice-btn').forEach(b => {
                b.style.background = '#0f1421';
                b.style.borderColor = '#2a3042';
            });
            btn.style.background = '#1e293b';
            btn.style.borderColor = '#38bdf8';
            selectedSecId = btn.getAttribute('data-id');

            const startBtn = document.getElementById('startSecAnalysisBtn');
            startBtn.disabled = false;
            startBtn.style.background = '#38bdf8';
            startBtn.style.color = '#0a0e1a';
            startBtn.style.cursor = 'pointer';
        };
    });

    document.getElementById('closeSecModalBtn').onclick = () => overlay.remove();

    document.getElementById('startSecAnalysisBtn').onclick = () => {
        if (selectedSecId) {
            overlay.remove();
            executePlannerFlow(selectedSecId);
        }
    };
}

// Loading Phase (7 - 10 Seconds Simulation)
function executePlannerFlow(sectionId) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.65); backdrop-filter: blur(6px); z-index: 99999;
        display: flex; align-items: center; justify-content: center; direction: rtl;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: #1a1f2e; border-radius: 24px; padding: 30px; max-width: 400px; width: 90%;
        border: 1px solid #2a3042; color: #f1f5f9; text-align: center;
    `;

    card.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🧠</div>
        <div id="plannerStepText" style="font-size:1rem; font-weight:500; color:#e2e8f0; min-height:48px; display:flex; align-items:center; justify-content:center;">
            🔍 جاري تحليل مستواك...
        </div>
        <div style="width:100%; background:#0f1421; height:8px; border-radius:4px; overflow:hidden; margin-top:20px;">
            <div id="plannerProgressBar" style="width:10%; height:100%; background:#38bdf8; transition: width 2s ease;"></div>
        </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    const steps = [
        { text: "🔍 جاري تحليل مستواك...", progress: "25%" },
        { text: "📊 جارٍ مقارنة نتائجك السابقة والإعادات...", progress: "50%" },
        { text: "🧠 حساب المتبقي وحساب أولوية الامتحانات...", progress: "75%" },
        { text: "✅ تم إنشاء خطة اليوم.", progress: "100%" }
    ];

    let stepIdx = 0;
    const intervalTime = 2000; // Total 8 Seconds Simulation

    const timer = setInterval(() => {
        stepIdx++;
        if (stepIdx < steps.length) {
            document.getElementById('plannerStepText').innerText = steps[stepIdx].text;
            document.getElementById('plannerProgressBar').style.width = steps[stepIdx].progress;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                overlay.remove();
                const plan = window.studyPlanner.generatePureRouterPlan(sectionId);
                renderPureOutputModal(plan);
            }, 600);
        }
    }, intervalTime);
}

// Pure Output Modal (ONLY List and Action Button)
function renderPureOutputModal(plan) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 99999;
        display: flex; align-items: center; justify-content: center; direction: rtl;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
        background: #1a1f2e; border-radius: 24px; padding: 28px; max-width: 450px; width: 90%;
        border: 1px solid #2a3042; color: #f1f5f9; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    `;

    let html = '';

    if (plan.isRestPeriod) {
        html = `
            <div style="text-align:center; padding: 20px 0;">
                <div style="font-size:3rem; margin-bottom:10px;">🧘</div>
                <p style="font-size:1.1rem; color:#f1f5f9;">${plan.message}</p>
            </div>
        `;
    } else {
        html += `<h3 style="margin-top:0; margin-bottom:16px; color:#38bdf8;">📅 خطة اليوم</h3>`;
        html += `<div style="margin-bottom: 12px; color:#94a3b8; font-size: 0.95rem;">اليوم عليك مراجعة:</div>`;

        for (const [secName, tests] of Object.entries(plan.grouped)) {
            html += `
                <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 10px; border-right: 4px solid #38bdf8;">
                    <div style="font-weight: bold; color: #f1f5f9; margin-bottom: 4px;">${secName}</div>
                    <div style="color: #e2e8f0; font-size: 0.95rem;">
                        امتحان: <span style="color:#4ade80; font-weight:bold;">${tests.join(' ، ')}</span>
                    </div>
                </div>
            `;
        }
    }

    html += `
        <button id="startReviewBtn" style="
            width: 100%; margin-top: 15px; padding: 14px; background: #38bdf8; border: none;
            border-radius: 12px; color: #0a0e1a; font-size: 1rem; font-weight: bold; cursor: pointer;
        ">ابدأ المراجعة</button>
    `;

    card.innerHTML = html;
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById('startReviewBtn').onclick = () => overlay.remove();
}

// Launcher Function
window.showDailyPlan = function() {
    checkOrPromptExamDate(() => {
        showMainMenuModal();
    });
};

// DOM Event Listener
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('studyPlannerBtn');
    if (btn) {
        btn.removeEventListener('click', window.showDailyPlan);
        btn.addEventListener('click', window.showDailyPlan);
        console.log('✅ Study Planner Router Active.');
    }
});
