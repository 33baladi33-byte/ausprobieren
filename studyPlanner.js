/**
 * studyPlanner.js - المدرب الذكي Smart Study Planner
 * الإصدار 5.0 - واجهة بسيطة، منطق رياضي متقدم
 * 
 * يعتمد على بيانات localStorage الموجودة:
 *   - user_exam_date: تاريخ الامتحان
 *   - user_exam_results_v1: نتائج الامتحانات (مصفوفة لكل قسم)
 *   - memory_trainer_progress: تقدم Memory Trainer
 *   - study_calendar_tracker_v1: سجل التقويم (اختياري)
 */

(function() {
    "use strict";

    // ================================================================
    // 1. الفئة الأساسية: محرك التحليل والجدولة
    // ================================================================

    class StudyPlannerEngine {
        constructor() {
            this.storageKeyDate = 'user_exam_date';
            this.storageKeyResults = 'user_exam_results_v1';
            this.storageKeyMemory = 'memory_trainer_progress';
            this.storageKeyCalendar = 'study_calendar_tracker_v1';

            // هيكل أقسام TELC B2 (8 أقسام، 20 امتحان لكل قسم)
            this.sections = [
                { id: 'hoeren1', name: 'Hören 1', priority: 1, weight: 1.6, totalTests: 20, estMin: 10 },
                { id: 'hoeren2', name: 'Hören 2', priority: 2, weight: 1.6, totalTests: 20, estMin: 12 },
                { id: 'hoeren3', name: 'Hören 3', priority: 3, weight: 1.5, totalTests: 20, estMin: 10 },
                { id: 'lesen1',  name: 'Lesen 1',  priority: 4, weight: 1.3, totalTests: 20, estMin: 15 },
                { id: 'lesen2',  name: 'Lesen 2',  priority: 5, weight: 1.3, totalTests: 20, estMin: 15 },
                { id: 'lesen3',  name: 'Lesen 3',  priority: 6, weight: 1.1, totalTests: 20, estMin: 12 },
                { id: 'sprach1', name: 'Sprach 1', priority: 7, weight: 0.9, totalTests: 20, estMin: 10 },
                { id: 'sprach2', name: 'Sprach 2', priority: 8, weight: 0.8, totalTests: 20, estMin: 10 }
            ];

            this.targetRepetitions = 6; // كل امتحان يجب أن يكرر 6 مرات على الأقل
        }

        // ------------------- دوال القراءة -------------------
        getExamDate() {
            return localStorage.getItem(this.storageKeyDate) || null;
        }

        setExamDate(dateStr) {
            localStorage.setItem(this.storageKeyDate, dateStr);
        }

        getRawResults() {
            try {
                const raw = localStorage.getItem(this.storageKeyResults);
                return raw ? JSON.parse(raw) : {};
            } catch (e) {
                console.warn('فشل قراءة نتائج الامتحانات:', e);
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

        getDaysRemaining() {
            const dateStr = this.getExamDate();
            if (!dateStr) return null;
            const now = new Date();
            const exam = new Date(dateStr);
            now.setHours(0, 0, 0, 0);
            exam.setHours(0, 0, 0, 0);
            const diff = Math.ceil((exam - now) / (1000 * 3600 * 24));
            return diff > 0 ? diff : 0;
        }

        getEffectiveStudyDays() {
            const days = this.getDaysRemaining();
            if (days === null) return 30;
            const effective = days - 2; // آخر يومين للراحة
            return effective > 0 ? effective : 1;
        }

        // ------------------- دوال المساعدة الإحصائية -------------------
        getSpacedInterval(score) {
            if (score < 50) return 1;
            if (score < 65) return 2;
            if (score < 78) return 4;
            if (score < 90) return 7;
            if (score < 95) return 14;
            return 30;
        }

        // ------------------- المحرك الرئيسي -------------------
        generatePlan(targetSectionId = null) {
            const rawResults = this.getRawResults();
            const effectiveDays = this.getEffectiveStudyDays();
            const daysRemaining = this.getDaysRemaining();

            // إذا بقي يومان أو أقل، نرجع حالة راحة
            if (daysRemaining !== null && daysRemaining <= 2) {
                return {
                    isRestPeriod: true,
                    daysRemaining: daysRemaining,
                    message: 'باقي يومان أو أقل على الامتحان – راحة ومراجعة خفيفة.',
                    sections: []
                };
            }

            // حساب الإحصائيات لكل قسم
            const sectionStats = {};
            let totalTargetReps = 0;
            let totalCompletedReps = 0;

            this.sections.forEach(sec => {
                const secData = rawResults[sec.id] || [];
                const targetReps = sec.totalTests * this.targetRepetitions;
                let completedReps = 0;
                let scoreSum = 0;
                let solvedCount = 0;
                const testMap = {};

                secData.forEach(item => {
                    const id = item.id || item.title;
                    const attempts = Math.min(this.targetRepetitions, item.attemptsCount || 1);
                    const score = item.averageScore ?? item.score ?? 0;

                    completedReps += attempts;
                    scoreSum += score;
                    solvedCount++;

                    testMap[id] = {
                        id,
                        score,
                        attempts,
                        remainingReps: Math.max(0, this.targetRepetitions - attempts),
                        lastAttemptDate: item.lastAttemptDate ? new Date(item.lastAttemptDate) : null
                    };
                });

                const avgScore = solvedCount > 0 ? Math.round(scoreSum / solvedCount) : 0;
                const unsolvedCount = sec.totalTests - solvedCount;
                const remainingReps = targetReps - completedReps;
                const weakness = avgScore === 0 ? 1.5 : Math.max(0.5, (100 - avgScore) / 40);

                sectionStats[sec.id] = {
                    ...sec,
                    solvedCount,
                    unsolvedCount,
                    avgScore,
                    completedReps,
                    targetReps,
                    remainingReps,
                    weakness,
                    effectiveWeight: sec.weight * weakness,
                    testMap
                };

                totalTargetReps += targetReps;
                totalCompletedReps += completedReps;
            });

            // حساب الحمولة اليومية المطلوبة
            const remainingRepsAll = totalTargetReps - totalCompletedReps;
            const rawDailyLoad = Math.ceil(remainingRepsAll / effectiveDays);
            const dailyLoad = Math.max(4, Math.min(18, rawDailyLoad)); // بين 4 و 18

            // ترتيب الأقسام حسب الأولوية الفعلية
            const sortedSections = this.sections.slice().sort((a, b) => a.priority - b.priority);

            // اختيار الامتحانات
            const plan = {
                isRestPeriod: false,
                daysRemaining: daysRemaining,
                effectiveDays: effectiveDays,
                sections: [],
                totalTests: 0,
                estimatedMinutes: 0
            };

            let remainingQuota = dailyLoad;

            for (const sec of sortedSections) {
                if (remainingQuota <= 0) break;

                const stats = sectionStats[sec.id];
                if (!stats) continue;

                // إذا كان القسم متقناً (نتيجة > 92% وأنجز أكثر من نصف المراجعات) نعطيه امتحاناً واحداً فقط للحفاظ على النشاط
                const isMastered = stats.avgScore >= 92 && stats.completedReps >= stats.targetReps * 0.5;
                let quota = 0;

                if (isMastered) {
                    quota = Math.min(1, remainingQuota);
                } else {
                    // توزيع الحصص حسب الوزن الفعال
                    const totalEffectiveWeight = Object.values(sectionStats).reduce((sum, s) => 
                        sum + (s.avgScore >= 92 && s.completedReps >= s.targetReps * 0.5 ? 0 : s.effectiveWeight), 0);
                    quota = Math.round((stats.effectiveWeight / totalEffectiveWeight) * dailyLoad);
                    quota = Math.max(1, Math.min(quota, remainingQuota));
                }

                if (quota === 0) continue;

                // بناء قائمة المرشحين من هذا القسم
                const candidates = [];
                const now = Date.now();

                for (let testId = 1; testId <= sec.totalTests; testId++) {
                    const t = stats.testMap[testId];
                    if (!t) {
                        // امتحان لم يبدأ بعد
                        candidates.push({
                            testId,
                            score: 0,
                            attempts: 0,
                            remainingReps: this.targetRepetitions,
                            urgency: 100 * stats.effectiveWeight,
                            reason: 'لم يحل بعد'
                        });
                    } else if (t.remainingReps > 0) {
                        const daysSince = t.lastAttemptDate 
                            ? (now - t.lastAttemptDate.getTime()) / (1000 * 3600 * 24) 
                            : 999;
                        const requiredInterval = this.getSpacedInterval(t.score);
                        if (daysSince >= requiredInterval) {
                            let urgency = (100 - t.score) * 1.5 + (t.remainingReps * 10);
                            if (daysSince >= 20) urgency += 40;
                            candidates.push({
                                testId,
                                score: t.score,
                                attempts: t.attempts,
                                remainingReps: t.remainingReps,
                                urgency: urgency,
                                reason: `نتيجة ${t.score}%، متبقي ${t.remainingReps} مراجعة`
                            });
                        }
                    }
                }

                // ترتيب المرشحين حسب الأولوية (الأعلى أولاً)
                candidates.sort((a, b) => b.urgency - a.urgency);

                // اختيار العدد المطلوب
                const selected = candidates.slice(0, quota);
                if (selected.length > 0) {
                    const testIds = selected.map(c => c.testId);
                    plan.sections.push({
                        sectionId: sec.id,
                        sectionName: sec.name,
                        testIds: testIds,
                        count: testIds.length,
                        estimatedMinutes: testIds.length * sec.estMin
                    });
                    plan.totalTests += testIds.length;
                    plan.estimatedMinutes += testIds.length * sec.estMin;
                    remainingQuota -= testIds.length;
                }
            }

            // إذا لم نجد أي امتحان (جميع الأقسام متقنة)، نضيف امتحاناً واحداً من Hören 1 للمراجعة
            if (plan.totalTests === 0) {
                const firstSec = this.sections[0];
                plan.sections.push({
                    sectionId: firstSec.id,
                    sectionName: firstSec.name,
                    testIds: [1],
                    count: 1,
                    estimatedMinutes: firstSec.estMin
                });
                plan.totalTests = 1;
                plan.estimatedMinutes = firstSec.estMin;
            }

            return plan;
        }
    }

    // ================================================================
    // 2. واجهة المستخدم (UI Layer)
    // ================================================================

    const engine = new StudyPlannerEngine();

    // ---------- أدوات مساعدة للـ UI ----------
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'planner-overlay';
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

    function removeOverlay() {
        const old = document.querySelector('.planner-overlay');
        if (old) old.remove();
    }

    function showMessage(msg, type = 'info', duration = 3000) {
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
            z-index: 100000;
            font-size: 0.9rem;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 80%;
            animation: slideDown 0.3s ease;
        `;
        overlay.textContent = msg;
        document.body.appendChild(overlay);
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s';
            setTimeout(() => overlay.remove(), 300);
        }, duration);
    }

    // ---------- نافذة اختيار تاريخ الامتحان ----------
    function showDatePicker() {
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
        const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">📅</div>
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">تاريخ الامتحان</h2>
                <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 0.9rem;">أدخل تاريخ امتحانك لتحصل على خطة مخصصة</p>
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; font-size: 0.9rem; color: #cbd5e1; margin-bottom: 6px;">📆 تاريخ الامتحان</label>
                <input type="date" id="plannerExamDateInput" value="${today}" min="${today}" max="${maxDate}" style="
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 12px;
                    border: 1px solid #334155;
                    background: #0f1421;
                    color: #e2e8f0;
                    font-size: 1rem;
                    outline: none;
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
                حفظ
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

        document.getElementById('plannerSaveDateBtn').addEventListener('click', () => {
            const date = document.getElementById('plannerExamDateInput').value;
            if (date) {
                engine.setExamDate(date);
                overlay.remove();
                showMainMenu();
            } else {
                showMessage('⚠️ يرجى اختيار تاريخ صحيح.', 'error');
            }
        });

        document.getElementById('plannerCancelDateBtn').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }

    // ---------- القائمة الرئيسية (خياران) ----------
    function showMainMenu() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 480px;
            width: 90%;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            direction: rtl;
        `;

        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 2.5rem; margin-bottom: 8px;">🎯</div>
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">المدرب الذكي</h2>
                <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 0.85rem;">اختر طريقة التخطيط</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button id="plannerChooseSkillBtn" style="
                    padding: 14px 20px;
                    background: rgba(56, 189, 248, 0.12);
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    border-radius: 14px;
                    color: #e2e8f0;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: center;
                " onmouseover="this.style.background='rgba(56, 189, 248, 0.2)'" onmouseout="this.style.background='rgba(56, 189, 248, 0.12)'">
                    🎧 أريد مراجعة قسم معين
                    <div style="font-size: 0.75rem; font-weight: 400; color: #94a3b8; margin-top: 4px;">اختر جزءاً واحداً لتحليل مخصص</div>
                </button>
                <button id="plannerFullPlanBtn" style="
                    padding: 14px 20px;
                    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                    border: none;
                    border-radius: 14px;
                    color: #0a0e1a;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: center;
                " onmouseover="this.style.background='linear-gradient(135deg, #0ea5e9, #0284c7)'" onmouseout="this.style.background='linear-gradient(135deg, #38bdf8, #0ea5e9)'">
                    🤖 اختر لي خطة اليوم
                    <div style="font-size: 0.75rem; font-weight: 400; color: #1a2a4a; margin-top: 4px;">يحلل جميع الأقسام ويعطيك خطة متوازنة</div>
                </button>
            </div>
            <button id="plannerChangeDateBtn" style="
                width: 100%;
                margin-top: 16px;
                padding: 8px;
                background: transparent;
                border: 1px solid #334155;
                border-radius: 12px;
                color: #94a3b8;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#475569'; this.style.color='#cbd5e1'" onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
                📅 تغيير تاريخ الامتحان
            </button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('plannerChooseSkillBtn').addEventListener('click', () => {
            overlay.remove();
            showSkillSelection();
        });

        document.getElementById('plannerFullPlanBtn').addEventListener('click', () => {
            overlay.remove();
            runAnalysis(null);
        });

        document.getElementById('plannerChangeDateBtn').addEventListener('click', () => {
            overlay.remove();
            showDatePicker();
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }

    // ---------- اختيار جزء ----------
    function showSkillSelection() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 480px;
            width: 90%;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            direction: rtl;
        `;

        const sections = engine.sections;
        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.2rem; color: #38bdf8;">📚 اختر القسم</h2>
                <button id="skillBackBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        `;

        sections.forEach(sec => {
            html += `
                <button class="skill-option-btn" data-section="${sec.id}" style="
                    padding: 12px 10px;
                    background: rgba(56, 189, 248, 0.08);
                    border: 1px solid rgba(56, 189, 248, 0.15);
                    border-radius: 12px;
                    color: #e2e8f0;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: center;
                " onmouseover="this.style.background='rgba(56, 189, 248, 0.15)'" onmouseout="this.style.background='rgba(56, 189, 248, 0.08)'">
                    ${sec.name}
                </button>
            `;
        });

        html += `</div>`;
        card.innerHTML = html;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('skillBackBtn').addEventListener('click', () => {
            overlay.remove();
            showMainMenu();
        });

        card.querySelectorAll('.skill-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sectionId = btn.dataset.section;
                overlay.remove();
                runAnalysis(sectionId);
            });
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.remove(); showMainMenu(); } });
    }

    // ---------- تشغيل التحليل وعرض النتيجة ----------
    function runAnalysis(targetSectionId) {
        // عرض شاشة تحميل
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 420px;
            width: 90%;
            text-align: center;
            color: #e2e8f0;
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        `;

        const messages = [
            '🔍 جاري تحليل مستواك...',
            '📊 جارٍ مقارنة نتائجك السابقة...',
            '🧠 اختيار الامتحانات المناسبة...',
            '✅ تم إنشاء الخطة!'
        ];

        let msgIndex = 0;
        card.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 16px;">⏳</div>
            <h3 style="color: #f1f5f9; margin: 0 0 8px 0;" id="loadingMsg">${messages[0]}</h3>
            <div style="width: 40px; height: 40px; margin: 20px auto; border: 4px solid #2a3042; border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // تغيير الرسائل كل 2 ثانية (مجموع 6-8 ثواني)
        let interval = setInterval(() => {
            msgIndex++;
            if (msgIndex < messages.length) {
                document.getElementById('loadingMsg').textContent = messages[msgIndex];
            } else {
                clearInterval(interval);
            }
        }, 2000);

        // المحاكاة: بعد 7 ثوانٍ نعرض النتيجة
        setTimeout(() => {
            clearInterval(interval);
            overlay.remove();

            // توليد الخطة
            const plan = engine.generatePlan(targetSectionId);
            showPlanResult(plan, targetSectionId);
        }, 7000);
    }

    // ---------- عرض نتيجة الخطة ----------
    function showPlanResult(plan, targetSectionId) {
        const overlay = createOverlay();
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
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideUp 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1);
            color: #e2e8f0;
            direction: rtl;
        `;

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">📅 خطة اليوم</h2>
                <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">✕</button>
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
            // عرض الأيام المتبقية (اختياري)
            if (plan.daysRemaining !== null) {
                html += `
                    <div style="background: #0f1421; border-radius: 12px; padding: 8px 16px; margin-bottom: 16px; display: flex; justify-content: space-between;">
                        <span style="color: #94a3b8;">📅 الأيام المتبقية:</span>
                        <span style="font-weight: 700; color: #38bdf8;">${plan.daysRemaining} يوم</span>
                    </div>
                `;
            }

            // عرض الأقسام والامتحانات
            if (plan.sections && plan.sections.length > 0) {
                html += `<div style="margin: 12px 0 8px 0; font-weight: 600; color: #f1f5f9;">اليوم عليك مراجعة:</div>`;
                plan.sections.forEach(section => {
                    const testList = section.testIds.join('، ');
                    html += `
                        <div style="background: #0f1421; border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; border-right: 3px solid #38bdf8;">
                            <div style="font-weight: 500; color: #f1f5f9;">${section.sectionName}</div>
                            <div style="font-size: 0.9rem; color: #94a3b8; margin-top: 4px;">امتحان: ${testList}</div>
                        </div>
                    `;
                });

                // الوقت المتوقع
                if (plan.estimatedMinutes) {
                    const hours = Math.floor(plan.estimatedMinutes / 60);
                    const mins = plan.estimatedMinutes % 60;
                    html += `
                        <div style="margin-top: 12px; font-size: 0.85rem; color: #94a3b8;">
                            ⏱️ المدة المتوقعة: ${hours} ساعة و ${mins} دقيقة
                        </div>
                    `;
                }
            } else {
                html += `<div style="text-align: center; padding: 20px 0; color: #94a3b8;">لا توجد امتحانات للتدريب اليوم.</div>`;
            }
        }

        html += `
            <button id="closePlanBtn2" style="
                width: 100%;
                margin-top: 16px;
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
                ابدأ المراجعة
            </button>
            <button id="planBackMenuBtn" style="
                width: 100%;
                margin-top: 8px;
                padding: 8px;
                background: transparent;
                border: 1px solid #334155;
                border-radius: 12px;
                color: #94a3b8;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.borderColor='#475569'; this.style.color='#cbd5e1'" onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
                ⬅ العودة للقائمة
            </button>
        `;

        card.innerHTML = html;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // ربط الأحداث
        const closeFn = () => overlay.remove();
        document.getElementById('closePlanBtn').addEventListener('click', closeFn);
        document.getElementById('closePlanBtn2').addEventListener('click', closeFn);
        document.getElementById('planBackMenuBtn').addEventListener('click', () => {
            overlay.remove();
            showMainMenu();
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // ================================================================
    // 3. ربط الزر بالواجهة
    // ================================================================

    window.openStudyPlanner = function() {
        const date = engine.getExamDate();
        if (!date) {
            showDatePicker();
        } else {
            showMainMenu();
        }
    };

    // ربط الزر عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.removeEventListener('click', window.openStudyPlanner);
            btn.addEventListener('click', window.openStudyPlanner);
            console.log('✅ زر المدرب الذكي مربوط (الإصدار 5.0).');
        } else {
            console.warn('⚠️ الزر studyPlannerBtn غير موجود في الصفحة.');
        }
    });

    // تصدير الكلاس للاستخدام الخارجي (اختياري)
    window.StudyPlannerEngine = StudyPlannerEngine;

})();
