/**
 * studyPlanner.js - المدرب الذكي TELC B2 (الإصدار 8.0 - التصحيح النهائي لجميع المشاكل المنطقية)
 * 
 * التغييرات الرئيسية:
 * 1. إصلاح حساب الأولوية للامتحانات الجديدة (لا تعطى 200 نقطة)
 * 2. selectedCount يعتمد على الأيام (ينخفض تلقائياً بعد 30 يوماً)
 * 3. Spaced Repetition لا يطبق على الامتحانات الجديدة
 * 4. remainingReps يبقى >0 إذا كانت آخر نتيجة < 80% (حتى مع 6 محاولات)
 * 5. تحسين حساب forgettingRate باستخدام الانحدار الخطي لآخر 3 نتائج
 * 6. منع الامتحانات الجديدة فقط في آخر 5 أيام (بدلاً من 10)
 * 7. Memory Trainer يصبح ضرباً في 0.9 بدلاً من طرح 15
 * 8. إضافة توازن بين الأقسام (حد أقصى 3 امتحانات لكل قسم في الخطة اليومية)
 * 9. استخدام sectionWeight فعلياً في الأولوية
 * 10. الامتحانات المتقنة تُستثنى تماماً (تُضاف فقط عند الحاجة)
 * 11. إضافة تحذير إذا كان الوقت غير كافٍ لتحقيق الهدف
 * 12. تحسين دقة forgettingRate باستخدام ميل آخر 3 نتائج
 */

(function() {
    "use strict";

    // ================================================================
    // 1. محرك القرار الذكي (Decision Engine)
    // ================================================================

    class StudyPlannerEngine {
        constructor() {
            // مفاتيح التخزين
            this.storageKeyDate = 'user_exam_date';
            this.storageKeyResults = 'user_exam_results_v1';
            this.storageKeyMemory = 'memory_trainer_progress';
            this.storageKeyPlans = 'study_planner_history_v3';

            // هيكل أقسام TELC (8 أقسام، 20 امتحان لكل قسم)
            this.sections = [
                { id: 'hoeren1', name: 'Hören 1', weight: 1.6, priority: 1, totalTests: 20 },
                { id: 'hoeren2', name: 'Hören 2', weight: 1.6, priority: 2, totalTests: 20 },
                { id: 'hoeren3', name: 'Hören 3', weight: 1.5, priority: 3, totalTests: 20 },
                { id: 'lesen1',  name: 'Lesen 1',  weight: 1.3, priority: 4, totalTests: 20 },
                { id: 'lesen2',  name: 'Lesen 2',  weight: 1.3, priority: 5, totalTests: 20 },
                { id: 'lesen3',  name: 'Lesen 3',  weight: 1.1, priority: 6, totalTests: 20 },
                { id: 'sprach1', name: 'Sprach 1', weight: 0.9, priority: 7, totalTests: 20 },
                { id: 'sprach2', name: 'Sprach 2', weight: 0.8, priority: 8, totalTests: 20 }
            ];

            this.targetRepetitions = 6;
            this.minDailyExams = 4;
            this.maxExamsPerSection = 3; // حد أقصى لكل قسم في الخطة اليومية

            // مراحل الدراسة
            this.phases = [
                { name: 'بناء', days: 60, focus: ['hoeren1','hoeren2','hoeren3'], weightBoost: 1.3 },
                { name: 'تثبيت', days: 30, focus: ['lesen1','lesen2','lesen3'], weightBoost: 1.3 },
                { name: 'مراجعة نهائية', days: 10, focus: ['sprach1','sprach2','hoeren1','lesen1'], weightBoost: 1.4 }
            ];
        }

        // ------------------- قراءة البيانات -------------------
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
                return {};
            }
        }

        getMemoryData() {
            try {
                const raw = localStorage.getItem(this.storageKeyMemory);
                return raw ? JSON.parse(raw) : {};
            } catch (e) {
                return {};
            }
        }

        getPlanHistory() {
            try {
                const raw = localStorage.getItem(this.storageKeyPlans);
                return raw ? JSON.parse(raw) : {};
            } catch (e) {
                return {};
            }
        }

        savePlanHistory(history) {
            try {
                localStorage.setItem(this.storageKeyPlans, JSON.stringify(history));
            } catch (e) {}
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
            const effective = days - 2;
            return effective > 0 ? effective : 1;
        }

        // ------------------- تحليل متقدم لكل امتحان -------------------
        analyzeExam(sectionId, testId, rawData, memoryData) {
            const secData = rawData[sectionId] || [];
            const secMemory = memoryData[sectionId] || {};
            const found = secData.find(t => (t.id || t.title) == testId) || {};

            const allScores = found.scores || (found.averageScore ? [found.averageScore] : []);
            const attempts = found.attemptsCount || found.attempts || 0;
            const lastDate = found.lastAttemptDate || null;
            const memoryCompleted = secMemory[testId] || false;
            const errors = found.errors || 0;
            const speed = found.averageSpeed || 0;

            const avg = allScores.length > 0 ? allScores.reduce((a,b) => a+b, 0) / allScores.length : 0;
            const maxScore = allScores.length > 0 ? Math.max(...allScores) : 0;
            const minScore = allScores.length > 0 ? Math.min(...allScores) : 0;
            const lastScore = allScores.length > 0 ? allScores[allScores.length - 1] : 0;

            let daysSince = 999;
            if (lastDate) {
                daysSince = Math.floor((Date.now() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
            }

            // remainingReps: إذا كانت آخر نتيجة < 80، نضيف مراجعات إضافية
            let remainingReps = Math.max(0, this.targetRepetitions - attempts);
            if (lastScore < 80 && attempts >= this.targetRepetitions) {
                remainingReps = Math.max(2, remainingReps);
            }

            // الإتقان الحقيقي: 6 محاولات + متوسط >= 85 + آخر نتيجة >= 80
            const isMastered = attempts >= this.targetRepetitions && avg >= 85 && lastScore >= 80;

            // حساب forgettingRate باستخدام الانحدار الخطي لآخر 3 نتائج
            let forgettingRate = 0;
            const recent3 = allScores.slice(-3);
            if (recent3.length >= 3) {
                const n = recent3.length;
                const indices = recent3.map((_, i) => i);
                const sumX = indices.reduce((a,b) => a+b, 0);
                const sumY = recent3.reduce((a,b) => a+b, 0);
                const sumXY = indices.reduce((a,b,i) => a + b * recent3[i], 0);
                const sumX2 = indices.reduce((a,b) => a + b * b, 0);
                const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
                forgettingRate = Math.max(0, -slope); // الميل السالب = نسيان
            }

            const recentScores = allScores.slice(-3);
            const isStable = recentScores.length >= 3 && 
                            Math.max(...recentScores) - Math.min(...recentScores) < 10;

            return {
                id: testId,
                sectionId: sectionId,
                average: avg,
                lastScore: lastScore,
                maxScore: maxScore,
                minScore: minScore,
                attempts: attempts,
                remainingReps: remainingReps,
                daysSince: daysSince,
                memoryCompleted: memoryCompleted,
                errors: errors,
                speed: speed,
                isStable: isStable,
                isMastered: isMastered,
                allScores: allScores,
                lastDate: lastDate,
                forgettingRate: forgettingRate,
                isFresh: attempts === 0,
                isWeak: avg > 0 && avg < 50,
                isForgotten: daysSince > 20,
                isRecentlyReviewed: daysSince < 3
            };
        }

        // ------------------- حساب الأولوية الديناميكية (المعدل) -------------------
        calculatePriority(exam, phase, daysRemaining, selectedCount, daysSinceLastSelect) {
            let priority = 0;

            // 1. عامل النتيجة: الامتحانات الجديدة تحصل على قيمة معقولة (40)
            let scoreFactor;
            if (exam.isFresh) {
                scoreFactor = 40;
            } else {
                scoreFactor = Math.max(0, (100 - exam.average) * 2);
            }
            priority += scoreFactor;

            // 2. عامل الإعادات المتبقية
            const repFactor = exam.remainingReps * 25;
            priority += repFactor;

            // 3. عامل النسيان
            const forgetFactor = Math.min(exam.daysSince * 3, 50);
            priority += forgetFactor;

            // 4. Memory Trainer: ضرب في 0.9 بدلاً من طرح ثابت
            if (!exam.memoryCompleted) {
                priority += 20;
            } else {
                priority = priority * 0.9;
            }

            // 5. الأخطاء المتكررة
            if (exam.errors > 3) priority += 15;

            // 6. التذبذب
            if (!exam.isStable && exam.attempts >= 3) priority += 10;

            // 7. الامتحانات الجديدة: تمنع فقط في آخر 5 أيام
            if (exam.isFresh) {
                if (daysRemaining > 5) {
                    priority += 30;
                } else {
                    priority -= 50;
                }
            }

            // 8. الضعف
            if (exam.isWeak) priority += 25;

            // 9. النسيان الشديد
            if (exam.isForgotten) priority += 40;

            // 10. سرعة النسيان (المحسنة)
            if (exam.forgettingRate > 0.5) {
                priority += exam.forgettingRate * 20;
            }

            // 11. وقت الحل
            if (exam.speed > 0 && exam.speed > 60) priority += 10;

            // 12. مرحلة الدراسة
            if (phase && phase.focus.includes(exam.sectionId)) {
                priority *= phase.weightBoost;
            }

            // 13. الأيام المتبقية
            if (daysRemaining < 10) priority *= 1.2;
            if (daysRemaining < 5) priority *= 1.4;

            // 14. معاقبة التكرار (مع مراعاة الزمن)
            let effectiveCount = selectedCount;
            if (daysSinceLastSelect > 30) {
                effectiveCount = 0;
            } else if (daysSinceLastSelect > 14) {
                effectiveCount = Math.max(0, selectedCount - 2);
            }
            if (effectiveCount > 2) {
                priority *= Math.max(0.3, 1 - (effectiveCount * 0.08));
            }

            // 15. وزن القسم
            priority *= exam.sectionWeight;

            // 16. الامتحانات المتقنة: نخفضها جداً
            if (exam.isMastered) {
                priority *= 0.05;
            }

            return Math.round(Math.max(0, priority));
        }

        // ------------------- نظام Spaced Repetition (لا يطبق على الجديدة) -------------------
        getNextReviewDays(score, attempts) {
            if (attempts === 0) return 1;
            if (score >= 95) return 14;
            if (score >= 85) return 7;
            if (score >= 70) return 4;
            if (score >= 55) return 2;
            if (score >= 40) return 1;
            return 0;
        }

        // ------------------- حساب الحد الأقصى الديناميكي -------------------
        getDynamicMaxExams(daysRemaining, totalRemainingReps) {
            if (daysRemaining === null || daysRemaining <= 0) return 25;
            const effectiveDays = this.getEffectiveStudyDays();
            const required = Math.ceil(totalRemainingReps / effectiveDays);
            let max = Math.max(8, Math.min(30, required * 2));
            if (daysRemaining < 5) max = Math.min(35, max + 5);
            if (daysRemaining < 3) max = 40;
            return Math.round(max);
        }

        // ------------------- توزيع الامتحانات الذكي مع توازن الأقسام -------------------
        buildScheduledPlan(targetSectionId = null) {
            const rawData = this.getRawResults();
            const memoryData = this.getMemoryData();
            const daysRemaining = this.getDaysRemaining();
            const effectiveDays = this.getEffectiveStudyDays();
            const history = this.getPlanHistory();
            const today = new Date().toISOString().slice(0, 10);

            // تحديد المرحلة
            let phase = null;
            for (const p of this.phases) {
                if (daysRemaining !== null && daysRemaining <= p.days) {
                    phase = p;
                    break;
                }
            }
            if (!phase && daysRemaining !== null) phase = this.phases[0];

            const targetSections = targetSectionId 
                ? this.sections.filter(s => s.id === targetSectionId)
                : this.sections;

            // ===== بناء قاعدة بيانات الامتحانات =====
            const examDatabase = {};
            let totalRemainingReps = 0;

            targetSections.forEach(sec => {
                for (let testId = 1; testId <= sec.totalTests; testId++) {
                    const exam = this.analyzeExam(sec.id, testId, rawData, memoryData);
                    const key = `${sec.id}_${testId}`;
                    
                    const historyEntry = history[key] || {};
                    const selectedCount = historyEntry.count || 0;
                    const lastSelected = historyEntry.lastDate || null;
                    
                    let daysSinceLastSelect = 999;
                    if (lastSelected) {
                        daysSinceLastSelect = Math.floor((Date.now() - new Date(lastSelected).getTime()) / (1000 * 3600 * 24));
                    }

                    const priority = this.calculatePriority(
                        exam, phase, daysRemaining, selectedCount, daysSinceLastSelect
                    );

                    const nextReviewIn = exam.isFresh ? 1 : this.getNextReviewDays(exam.lastScore, exam.attempts);

                    examDatabase[key] = {
                        ...exam,
                        sectionName: sec.name,
                        sectionWeight: sec.weight,
                        sectionPriority: sec.priority,
                        priority: priority,
                        nextReviewIn: nextReviewIn,
                        selectedCount: selectedCount,
                        daysSinceLastSelect: daysSinceLastSelect,
                        key: key
                    };

                    if (exam.remainingReps > 0 && !exam.isMastered) {
                        totalRemainingReps += exam.remainingReps;
                    }
                }
            });

            // التحذير: الوقت غير كافٍ
            const requiredDaily = Math.ceil(totalRemainingReps / effectiveDays);
            if (requiredDaily > 12 && daysRemaining < 10) {
                console.warn('⚠️ تحذير: الوقت المتبقي غير كافٍ لتحقيق 6 مراجعات لكل امتحان.');
            }

            // ===== حساب العدد اليومي =====
            let dailyCount = Math.ceil(totalRemainingReps / effectiveDays);
            dailyCount = Math.max(this.minDailyExams, dailyCount);
            const maxDaily = this.getDynamicMaxExams(daysRemaining, totalRemainingReps);
            dailyCount = Math.min(dailyCount, maxDaily);

            // ===== تصفية Spaced Repetition =====
            const eligibleExams = [];
            const masteredExams = [];

            for (const key in examDatabase) {
                const exam = examDatabase[key];

                if (exam.isMastered) {
                    masteredExams.push(exam);
                    continue;
                }

                // Spaced Repetition: لا يطبق على الامتحانات الجديدة
                if (!exam.isFresh && exam.daysSince < exam.nextReviewIn) {
                    continue;
                }

                // منع الامتحانات الجديدة في آخر 5 أيام
                if (exam.isFresh && daysRemaining !== null && daysRemaining <= 5) {
                    continue;
                }

                // منع الامتحانات التي اختيرت مؤخراً
                if (exam.daysSinceLastSelect < 3 && exam.selectedCount > 0) {
                    continue;
                }

                eligibleExams.push(exam);
            }

            // ===== تقسيم الفئات =====
            const fresh = [], forgotten = [], weak = [], normal = [];
            for (const exam of eligibleExams) {
                if (exam.isFresh) fresh.push(exam);
                else if (exam.isForgotten) forgotten.push(exam);
                else if (exam.isWeak) weak.push(exam);
                else normal.push(exam);
            }

            const sortByPriority = (arr) => arr.sort((a, b) => b.priority - a.priority);
            sortByPriority(fresh);
            sortByPriority(forgotten);
            sortByPriority(weak);
            sortByPriority(normal);
            sortByPriority(masteredExams);

            // ===== توزيع مع توازن الأقسام =====
            const selected = [];
            const selectedKeys = new Set();
            const sectionCounts = {};

            // دالة مساعدة لإضافة امتحان مع مراعاة حد القسم
            const tryAddExam = (exam) => {
                const key = exam.key;
                if (selectedKeys.has(key)) return false;
                
                const secName = exam.sectionName;
                if (!sectionCounts[secName]) sectionCounts[secName] = 0;
                if (sectionCounts[secName] >= this.maxExamsPerSection) return false;
                
                selectedKeys.add(key);
                selected.push(exam);
                sectionCounts[secName]++;
                return true;
            };

            const total = dailyCount;
            const pool = [...fresh, ...forgotten, ...weak, ...normal];

            // مرحلة 1: نمر على جميع الفئات بالتناوب للحصول على توزيع متوازن
            let added = 0;
            let round = 0;
            const maxRounds = Math.ceil(total / pool.length) + 1;
            
            while (added < total && round < maxRounds) {
                let anyAdded = false;
                for (const exam of pool) {
                    if (added >= total) break;
                    // نضيف كل امتحان مرة واحدة في كل دورة
                    if (selectedKeys.has(exam.key)) continue;
                    if (tryAddExam(exam)) {
                        anyAdded = true;
                        added++;
                    }
                }
                if (!anyAdded) break;
                round++;
            }

            // مرحلة 2: إذا لم نكمل العدد، نضيف من المتقنين
            if (added < total) {
                for (const exam of masteredExams) {
                    if (added >= total) break;
                    if (tryAddExam(exam)) added++;
                }
            }

            // مرحلة 3: إذا ما زال العدد ناقصاً، نضيف من الباقي بدون قيود
            if (added < total) {
                for (const exam of pool) {
                    if (added >= total) break;
                    if (!selectedKeys.has(exam.key)) {
                        selectedKeys.add(exam.key);
                        selected.push(exam);
                        added++;
                    }
                }
            }

            // ===== تحديث التاريخ =====
            const newHistory = { ...history };
            selected.forEach(exam => {
                const key = exam.key;
                if (!newHistory[key]) {
                    newHistory[key] = { count: 0, lastDate: null };
                }
                newHistory[key].count = (newHistory[key].count || 0) + 1;
                newHistory[key].lastDate = today;
            });
            this.savePlanHistory(newHistory);

            // ===== تجميع النتائج =====
            const grouped = {};
            selected.forEach(exam => {
                if (!grouped[exam.sectionName]) {
                    grouped[exam.sectionName] = [];
                }
                grouped[exam.sectionName].push(exam.id);
            });

            // ===== حالة الراحة =====
            if (daysRemaining !== null && daysRemaining <= 2) {
                return {
                    isRestPeriod: true,
                    message: 'باقي يومان أو أقل على الامتحان – راحة ومراجعة خفيفة.'
                };
            }

            return {
                isRestPeriod: false,
                grouped: grouped,
                totalTests: selected.length,
                daysRemaining: daysRemaining,
                effectiveDays: effectiveDays,
                phase: phase ? phase.name : 'غير محدد',
                totalRemainingReps: totalRemainingReps,
                dailyCount: dailyCount,
                isTimeInsufficient: requiredDaily > 12 && daysRemaining < 10
            };
        }
    }

    // ================================================================
    // 2. واجهة المستخدم (نفسها تماماً)
    // ================================================================

    const engine = new StudyPlannerEngine();

    function createOverlay() {
        const old = document.querySelector('.planner-overlay');
        if (old) old.remove();

        const overlay = document.createElement('div');
        overlay.className = 'planner-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
            z-index: 99999; display: flex; align-items: center; justify-content: center;
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

    function showDatePicker() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 400px; width: 90%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4); color: #e2e8f0;
            animation: slideUp 0.25s ease; direction: rtl; text-align: center;
        `;

        const today = new Date().toISOString().slice(0, 10);
        const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        card.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 8px;">📅</div>
            <h2 style="margin: 0 0 4px 0; color: #38bdf8;">تاريخ الامتحان</h2>
            <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 0.9rem;">حدد تاريخ امتحانك لتبدأ الخطة اليومية</p>
            <input type="date" id="plannerDateInput" value="${today}" min="${today}" max="${maxDate}" style="
                width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #334155;
                background: #0f1421; color: #e2e8f0; font-size: 1rem; box-sizing: border-box;
            ">
            <button id="plannerDateSaveBtn" style="
                width: 100%; margin-top: 16px; padding: 12px; background: #38bdf8;
                border: none; border-radius: 12px; color: #0a0e1a; font-size: 1rem;
                font-weight: 600; cursor: pointer;
            ">حفظ</button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('plannerDateSaveBtn').onclick = () => {
            const val = document.getElementById('plannerDateInput').value;
            if (val) {
                engine.setExamDate(val);
                overlay.remove();
                showMainMenu();
            }
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    function showMainMenu() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 440px; width: 90%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4); color: #e2e8f0;
            animation: slideUp 0.25s ease; direction: rtl;
        `;

        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 2.5rem; margin-bottom: 4px;">🎯</div>
                <h2 style="margin: 0; color: #38bdf8;">المدرب الذكي</h2>
                <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 0.85rem;">اختر طريقة التخطيط</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <button id="btnChooseSection" style="
                    padding: 16px 20px; background: rgba(56, 189, 248, 0.12);
                    border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 14px;
                    color: #e2e8f0; font-size: 1rem; font-weight: 600; cursor: pointer;
                    text-align: center; transition: 0.2s;
                " onmouseover="this.style.background='rgba(56, 189, 248, 0.2)'" onmouseout="this.style.background='rgba(56, 189, 248, 0.12)'">
                    🎧 أريد مراجعة قسم معين
                </button>
                <button id="btnFullPlan" style="
                    padding: 16px 20px; background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                    border: none; border-radius: 14px; color: #0a0e1a; font-size: 1rem;
                    font-weight: 700; cursor: pointer; text-align: center; transition: 0.2s;
                " onmouseover="this.style.background='linear-gradient(135deg, #0ea5e9, #0284c7)'" onmouseout="this.style.background='linear-gradient(135deg, #38bdf8, #0ea5e9)'">
                    🤖 اختر لي خطة اليوم
                </button>
            </div>
            <button id="btnChangeDate" style="
                width: 100%; margin-top: 16px; padding: 8px;
                background: transparent; border: 1px solid #334155; border-radius: 12px;
                color: #94a3b8; font-size: 0.8rem; cursor: pointer;
            " onmouseover="this.style.borderColor='#475569'; this.style.color='#cbd5e1'" onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
                📅 تغيير تاريخ الامتحان
            </button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('btnChooseSection').onclick = () => {
            overlay.remove();
            showSectionPicker();
        };

        document.getElementById('btnFullPlan').onclick = () => {
            overlay.remove();
            runAnalysis(null);
        };

        document.getElementById('btnChangeDate').onclick = () => {
            overlay.remove();
            showDatePicker();
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    function showSectionPicker() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 440px; width: 90%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4); color: #e2e8f0;
            animation: slideUp 0.25s ease; direction: rtl;
        `;

        let gridHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0; color: #38bdf8;">📚 اختر القسم</h3>
                <button id="secBackBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        `;

        engine.sections.forEach(sec => {
            gridHtml += `
                <button class="sec-btn" data-id="${sec.id}" style="
                    padding: 12px; background: #0f1421; border: 1px solid #2a3042;
                    border-radius: 12px; color: #e2e8f0; font-size: 0.9rem;
                    font-weight: 500; cursor: pointer; transition: 0.2s; text-align: center;
                " onmouseover="this.style.background='#1a2340'" onmouseout="this.style.background='#0f1421'">
                    ${sec.name}
                </button>
            `;
        });

        gridHtml += `</div>`;

        card.innerHTML = gridHtml;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        let selectedId = null;

        card.querySelectorAll('.sec-btn').forEach(btn => {
            btn.onclick = () => {
                card.querySelectorAll('.sec-btn').forEach(b => {
                    b.style.background = '#0f1421';
                    b.style.borderColor = '#2a3042';
                });
                btn.style.background = '#1e293b';
                btn.style.borderColor = '#38bdf8';
                selectedId = btn.dataset.id;
            };
        });

        document.getElementById('secBackBtn').onclick = () => {
            overlay.remove();
            showMainMenu();
        };

        const startBtn = document.createElement('button');
        startBtn.textContent = 'ابدأ التحليل';
        startBtn.id = 'startSecAnalysisBtn';
        startBtn.style.cssText = `
            width: 100%; margin-top: 16px; padding: 12px;
            background: #2a3042; border: none; border-radius: 12px;
            color: #64748b; font-size: 1rem; font-weight: 600;
            cursor: not-allowed; transition: 0.2s;
        `;

        card.appendChild(startBtn);

        const updateStartBtn = () => {
            if (selectedId) {
                startBtn.style.background = '#38bdf8';
                startBtn.style.color = '#0a0e1a';
                startBtn.style.cursor = 'pointer';
                startBtn.disabled = false;
            } else {
                startBtn.style.background = '#2a3042';
                startBtn.style.color = '#64748b';
                startBtn.style.cursor = 'not-allowed';
                startBtn.disabled = true;
            }
        };

        card.querySelectorAll('.sec-btn').forEach(btn => {
            const origClick = btn.onclick;
            btn.onclick = (e) => {
                if (origClick) origClick(e);
                updateStartBtn();
            };
        });

        startBtn.onclick = () => {
            if (selectedId) {
                overlay.remove();
                runAnalysis(selectedId);
            }
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { overlay.remove(); showMainMenu(); }
        });
    }

    function runAnalysis(sectionId) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 30px;
            max-width: 400px; width: 90%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4); color: #e2e8f0;
            text-align: center; animation: slideUp 0.25s ease;
        `;

        card.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 12px;">🧠</div>
            <div id="loadingStep" style="font-size: 1rem; font-weight: 500; color: #e2e8f0; min-height: 48px; display: flex; align-items: center; justify-content: center;">
                🔍 جاري تحليل مستواك...
            </div>
            <div style="width: 100%; background: #0f1421; height: 8px; border-radius: 4px; overflow: hidden; margin-top: 16px;">
                <div id="loadingProgress" style="width: 10%; height: 100%; background: #38bdf8; transition: width 2s ease;"></div>
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
        const timer = setInterval(() => {
            stepIdx++;
            if (stepIdx < steps.length) {
                document.getElementById('loadingStep').textContent = steps[stepIdx].text;
                document.getElementById('loadingProgress').style.width = steps[stepIdx].progress;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    overlay.remove();
                    const plan = engine.buildScheduledPlan(sectionId);
                    showPurePlan(plan);
                }, 600);
            }
        }, 2000);
    }

    function showPurePlan(plan) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 460px; width: 90%; max-height: 85vh; overflow-y: auto;
            border: 1px solid #2a3042; box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            color: #e2e8f0; animation: slideUp 0.25s ease; direction: rtl;
        `;

        let html = '';

        if (plan.isRestPeriod) {
            html = `
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🧘</div>
                    <p style="font-size: 1.1rem; color: #f1f5f9;">${plan.message}</p>
                </div>
            `;
        } else {
            html = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="margin: 0; color: #38bdf8;">📅 خطة اليوم</h3>
                    <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
                </div>
                <div style="margin-bottom: 12px; color: #94a3b8; font-size: 0.95rem;">اليوم عليك مراجعة:</div>
            `;

            for (const [secName, tests] of Object.entries(plan.grouped)) {
                html += `
                    <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 10px; border-right: 4px solid #38bdf8;">
                        <div style="font-weight: bold; color: #f1f5f9; margin-bottom: 4px;">${secName}</div>
                        <div style="color: #e2e8f0; font-size: 0.95rem;">
                            امتحان: <span style="color: #4ade80; font-weight: bold;">${tests.join(' ، ')}</span>
                        </div>
                    </div>
                `;
            }
        }

        html += `
            <button id="startReviewBtn" style="
                width: 100%; margin-top: 16px; padding: 14px;
                background: #38bdf8; border: none; border-radius: 12px;
                color: #0a0e1a; font-size: 1rem; font-weight: 700; cursor: pointer;
            ">ابدأ المراجعة</button>
            <button id="backToMenuBtn" style="
                width: 100%; margin-top: 8px; padding: 8px;
                background: transparent; border: 1px solid #334155; border-radius: 12px;
                color: #94a3b8; font-size: 0.8rem; cursor: pointer;
            " onmouseover="this.style.borderColor='#475569'; this.style.color='#cbd5e1'" onmouseout="this.style.borderColor='#334155'; this.style.color='#94a3b8'">
                ⬅ العودة للقائمة
            </button>
        `;

        card.innerHTML = html;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('closePlanBtn').onclick = () => overlay.remove();
        document.getElementById('startReviewBtn').onclick = () => overlay.remove();
        document.getElementById('backToMenuBtn').onclick = () => {
            overlay.remove();
            showMainMenu();
        };

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

    // ================================================================
    // 3. ربط الزر والدوال العامة
    // ================================================================

    window.openStudyPlanner = function() {
        if (!engine.getExamDate()) {
            showDatePicker();
        } else {
            showMainMenu();
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.removeEventListener('click', window.openStudyPlanner);
            btn.addEventListener('click', window.openStudyPlanner);
            console.log('✅ المدرب الذكي TELC B2 جاهز (الإصدار 8.0 - التصحيح النهائي)');
        } else {
            console.warn('⚠️ الزر studyPlannerBtn غير موجود.');
        }
    });

    window.StudyPlannerEngine = StudyPlannerEngine;

})();
