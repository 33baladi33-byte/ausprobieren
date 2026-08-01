/**
 * studyPlanner.js - المدرب الذكي TELC B2 (الإصدار 9.4)
 * 
 * الإضافات الجديدة:
 * - نظام إدارة حالة الخطة (PlanState): Pending → Started → Completed.
 * - قاعدة Coverage: ضمان مراجعة كل امتحان مرة واحدة على الأقل.
 * - قاعدة Recovery: رفع أولوية الأقسام المهملة.
 * - محرك الاستدلال (Inference Engine): يعمل حسب كمية البيانات المتوفرة.
 * - Confidence Score: درجة ثقة في الخطة.
 * - Adaptive Weights: أوزان ديناميكية حسب توفر البيانات.
 * - Momentum: تعديل الصعوبة بناءً على اتجاه الأداء.
 */

(function() {
    "use strict";

    class StudyPlannerEngine {
        constructor() {
            this.storageKeyDate = 'user_exam_date';
            this.storageKeyPlans = 'study_planner_history_v3';
            this.storageKeyState = 'study_planner_state'; // جديد: حالة الخطة الحالية

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
            this.maxExamsPerSection = 3;

            this.phases = [
                { name: 'بناء', days: 60, focus: ['hoeren1','hoeren2','hoeren3'], weightBoost: 1.3 },
                { name: 'تثبيت', days: 30, focus: ['lesen1','lesen2','lesen3'], weightBoost: 1.3 },
                { name: 'مراجعة نهائية', days: 10, focus: ['sprach1','sprach2','hoeren1','lesen1'], weightBoost: 1.4 }
            ];

            // ===== حالة الخطة الحالية =====
            this.planState = this.loadPlanState();
        }

        // ------------------- إدارة حالة الخطة -------------------

        loadPlanState() {
            try {
                const raw = localStorage.getItem(this.storageKeyState);
                if (raw) {
                    const state = JSON.parse(raw);
                    // التأكد من صحة البيانات
                    if (state && typeof state === 'object' && state.items) {
                        return state;
                    }
                }
            } catch (e) {}
            return { items: {}, planDate: null, pendingCount: 0 };
        }

        savePlanState(state) {
            try {
                localStorage.setItem(this.storageKeyState, JSON.stringify(state));
                this.planState = state;
            } catch (e) {}
        }

        // إضافة امتحان إلى الخطة الحالية (بحالة pending)
        addToPlan(sectionName, examId, priority = 0) {
            const key = `${sectionName}_${examId}`;
            if (!this.planState.items[key]) {
                this.planState.items[key] = {
                    sectionName: sectionName,
                    examId: examId,
                    status: 'pending', // pending | started | completed
                    priority: priority,
                    addedDate: new Date().toISOString().slice(0, 10)
                };
                this.planState.pendingCount++;
            }
        }

        // تحديث حالة امتحان في الخطة
        updatePlanItemStatus(key, status) {
            if (this.planState.items[key]) {
                const oldStatus = this.planState.items[key].status;
                this.planState.items[key].status = status;
                if (oldStatus === 'pending' && status !== 'pending') {
                    this.planState.pendingCount = Math.max(0, this.planState.pendingCount - 1);
                }
                if (status === 'pending' && oldStatus !== 'pending') {
                    this.planState.pendingCount++;
                }
                this.savePlanState(this.planState);
            }
        }

        // إكمال امتحان (يُستدعى بعد التصحيح)
        completeExam(sectionName, examId) {
            const key = `${sectionName}_${examId}`;
            this.updatePlanItemStatus(key, 'completed');
            // أيضاً تحديث coverage
            this.markCovered(sectionName, examId);
        }

        // بدء امتحان (يُستدعى عند فتح الامتحان)
        startExam(sectionName, examId) {
            const key = `${sectionName}_${examId}`;
            if (this.planState.items[key] && this.planState.items[key].status === 'pending') {
                this.updatePlanItemStatus(key, 'started');
            }
        }

        // ------------------- Coverage -------------------

        getCoverageKey(sectionName, examId) {
            return `coverage_${sectionName}_${examId}`;
        }

        isCovered(sectionName, examId) {
            return localStorage.getItem(this.getCoverageKey(sectionName, examId)) === 'true';
        }

        markCovered(sectionName, examId) {
            localStorage.setItem(this.getCoverageKey(sectionName, examId), 'true');
        }

        // ------------------- جمع البيانات (محسن) -------------------

        gatherAllData() {
            const allKeys = Object.keys(localStorage);
            const results = {};
            const memoryRaw = {};

            // نتائج الامتحانات
            const resultKeys = allKeys.filter(k => k.startsWith('exam_result_'));
            for (const key of resultKeys) {
                const parts = key.split('_');
                if (parts.length >= 4) {
                    const skill = parts.slice(2, parts.length - 1).join('_');
                    const examId = parseInt(parts[parts.length - 1], 10);
                    const score = parseFloat(localStorage.getItem(key));
                    if (!isNaN(score)) {
                        if (!results[skill]) results[skill] = [];
                        let existing = results[skill].find(e => e.id === examId);
                        if (!existing) {
                            existing = { id: examId, scores: [score], attemptsCount: 0, lastDate: null };
                            results[skill].push(existing);
                        } else {
                            existing.scores.push(score);
                        }
                    }
                }
            }

            // الإعادات
            const retryKeys = allKeys.filter(k => k.startsWith('exam_retry_'));
            for (const key of retryKeys) {
                const parts = key.split('_');
                if (parts.length >= 4) {
                    const skill = parts.slice(2, parts.length - 1).join('_');
                    const examId = parseInt(parts[parts.length - 1], 10);
                    const retries = parseInt(localStorage.getItem(key), 10);
                    if (!isNaN(retries) && retries > 0) {
                        if (results[skill]) {
                            const exam = results[skill].find(e => e.id === examId);
                            if (exam) exam.attemptsCount = retries;
                            else {
                                if (!results[skill]) results[skill] = [];
                                results[skill].push({ id: examId, scores: [], attemptsCount: retries, lastDate: null });
                            }
                        } else {
                            results[skill] = [{ id: examId, scores: [], attemptsCount: retries, lastDate: null }];
                        }
                    }
                }
            }

            // تاريخ آخر مراجعة
            const historyKeys = allKeys.filter(k => k.startsWith('exam_history_'));
            for (const key of historyKeys) {
                const parts = key.split('_');
                if (parts.length >= 4) {
                    const skill = parts.slice(2, parts.length - 1).join('_');
                    const examId = parseInt(parts[parts.length - 1], 10);
                    const raw = localStorage.getItem(key);
                    if (raw) {
                        try {
                            const hist = JSON.parse(raw);
                            if (Array.isArray(hist) && hist.length > 0) {
                                const lastEntry = hist[hist.length - 1];
                                if (lastEntry && lastEntry.date) {
                                    if (results[skill]) {
                                        const exam = results[skill].find(e => e.id === examId);
                                        if (exam) exam.lastDate = lastEntry.date;
                                    }
                                }
                            }
                        } catch (e) {}
                    }
                }
            }

            // Memory Completion (محسوبة من المستويات الفعلية)
            const memoryLevels = localStorage.getItem('memory_levels');
            const memoryCompletion = {};
            if (memoryLevels) {
                try {
                    const data = JSON.parse(memoryLevels);
                    const examMap = {};
                    for (const key in data) {
                        const parts = key.split('_');
                        if (parts.length >= 3) {
                            const skill = parts[0];
                            const examPart = parts[1];
                            const examId = parseInt(examPart.replace('exam', ''), 10);
                            const level = parseInt(parts[2], 10);
                            if (!isNaN(examId) && !isNaN(level)) {
                                const examKey = `${skill}_${examId}`;
                                if (!examMap[examKey]) examMap[examKey] = [];
                                examMap[examKey].push(level);
                            }
                        }
                    }
                    for (const examKey in examMap) {
                        const levels = examMap[examKey];
                        const total = levels.length;
                        const completed = levels.filter(l => l >= 5).length;
                        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                        const [skill, examId] = examKey.split('_');
                        if (!memoryCompletion[skill]) memoryCompletion[skill] = {};
                        memoryCompletion[skill][parseInt(examId, 10)] = percent;
                    }
                } catch (e) {}
            }

            // تاريخ الخطط السابقة
            let history = {};
            try {
                const raw = localStorage.getItem(this.storageKeyPlans);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (typeof parsed === 'object' && !Array.isArray(parsed)) {
                        history = parsed;
                    }
                }
            } catch (e) {}

            return { results, memory: memoryCompletion, history };
        }

        // ------------------- حساب درجة توفر البيانات (dataScore) -------------------

        calculateDataScore(data) {
            const { results, memory, history } = data;
            let totalExams = 0;
            let examsWithData = 0;
            let examsWithMemory = 0;

            for (const sec of this.sections) {
                const secResults = results[sec.id] || [];
                totalExams += sec.totalTests;
                examsWithData += secResults.length;
                if (memory[sec.id]) {
                    examsWithMemory += Object.keys(memory[sec.id]).length;
                }
            }

            // حساب النسبة المئوية
            let score = 0;
            if (totalExams > 0) {
                // 50% من الوزن للنتائج
                const resultRatio = examsWithData / totalExams;
                // 30% من الوزن للـ Memory
                const memoryRatio = examsWithMemory / totalExams;
                // 20% من الوزن لتاريخ الخطط (عدد الامتحانات المختارة)
                const historyKeys = Object.keys(history).length;
                const historyRatio = Math.min(1, historyKeys / totalExams);

                score = (resultRatio * 50) + (memoryRatio * 30) + (historyRatio * 20);
            }

            return Math.min(100, Math.round(score));
        }

        // ------------------- تحليل الامتحان (مع Coverage و Recovery) -------------------

        analyzeExam(sectionId, testId, data, dataScore) {
            const { results, memory, history } = data;
            const secResults = results[sectionId] || [];
            const found = secResults.find(e => e.id === testId) || {};
            const scores = found.scores || [];
            const attempts = found.attemptsCount || 0;
            const lastDate = found.lastDate || null;
            const memoryPercent = (memory[sectionId] && memory[sectionId][testId]) || 0;

            const avg = scores.length > 0 ? scores.reduce((a,b) => a+b, 0) / scores.length : 0;
            const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
            const minScore = scores.length > 0 ? Math.min(...scores) : 0;
            const lastScore = scores.length > 0 ? scores[scores.length - 1] : 0;

            let daysSince = 0;
            if (lastDate) {
                daysSince = Math.floor((Date.now() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
            }

            // remainingReps مع مرونة
            let remainingReps = Math.max(0, this.targetRepetitions - attempts);
            if (avg > 0 && avg < 60) {
                remainingReps = Math.max(remainingReps, 4);
            } else if (avg < 80 && attempts >= this.targetRepetitions) {
                remainingReps = Math.max(remainingReps, 2);
            }

            // الإتقان مع Memory
            const isMastered = attempts >= this.targetRepetitions && avg >= 85 && lastScore >= 80 && memoryPercent >= 90;

            // معدل النسيان
            let forgettingRate = 0;
            const recent = scores.slice(-3);
            if (recent.length >= 3) {
                const n = recent.length;
                const indices = recent.map((_, i) => i);
                const sumX = indices.reduce((a,b) => a+b, 0);
                const sumY = recent.reduce((a,b) => a+b, 0);
                const sumXY = indices.reduce((a,b,i) => a + b * recent[i], 0);
                const sumX2 = indices.reduce((a,b) => a + b * b, 0);
                const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
                forgettingRate = Math.max(0, -slope);
            }

            // الاستقرار (انحراف معياري)
            let isStable = false;
            if (scores.length >= 3) {
                const std = Math.sqrt(scores.reduce((s, v) => s + (v - avg) ** 2, 0) / scores.length);
                isStable = std < 12;
            }

            // الاتجاه
            let trend = 0;
            const last3 = scores.slice(-3);
            if (last3.length >= 2) {
                trend = last3[last3.length - 1] - last3[0];
            }

            const key = `${sectionId}_${testId}`;
            const historyEntry = history[key] || {};
            const selectedCount = historyEntry.count || 0;
            const lastSelected = historyEntry.lastDate || null;
            let daysSinceLastSelect = 999;
            if (lastSelected) {
                daysSinceLastSelect = Math.floor((Date.now() - new Date(lastSelected).getTime()) / (1000 * 3600 * 24));
            }

            // Coverage: هل تمت مراجعة هذا الامتحان من قبل؟
            const covered = this.isCovered(sectionId, testId);

            // Recovery: هل هذا القسم مهمل؟
            const sectionResults = results[sectionId] || [];
            const sectionCoverage = sectionResults.length / this.sections.find(s => s.id === sectionId)?.totalTests || 0;
            const isSectionNeglected = sectionCoverage < 0.3;

            return {
                id: testId,
                sectionId: sectionId,
                scores: scores,
                avg: avg,
                lastScore: lastScore,
                maxScore: maxScore,
                minScore: minScore,
                attempts: attempts,
                remainingReps: remainingReps,
                daysSince: daysSince,
                memoryPercent: memoryPercent,
                isMastered: isMastered,
                forgettingRate: forgettingRate,
                isStable: isStable,
                trend: trend,
                isFresh: scores.length === 0 && attempts === 0,
                isWeak: avg > 0 && avg < 50,
                isForgotten: daysSince > 20,
                selectedCount: selectedCount,
                daysSinceLastSelect: daysSinceLastSelect,
                key: key,
                covered: covered,
                isSectionNeglected: isSectionNeglected,
                sectionCoverage: sectionCoverage
            };
        }

        // ------------------- حساب الأولوية (مع Adaptive Weights و Momentum) -------------------

        calculatePriority(exam, phase, daysRemaining, dataScore, momentum) {
            // تحديد الأوزان حسب درجة توفر البيانات
            let weights = this.getAdaptiveWeights(dataScore);

            let priority = 0;

            // 1. عامل النتيجة
            if (exam.isFresh) {
                priority += 40 + Math.random() * 5;
            } else {
                priority += Math.max(0, (100 - exam.avg) * weights.result);
            }

            // 2. الإعادات المتبقية
            priority += exam.remainingReps * 25 * weights.retries;

            // 3. النسيان
            if (!exam.isFresh) {
                priority += Math.min(exam.daysSince * 3, 50) * weights.forgetting;
            }

            // 4. Memory
            priority += (100 - exam.memoryPercent) * 1.5 * weights.memory;

            // 5. التذبذب
            if (!exam.isStable && exam.attempts >= 3) priority += 15 * weights.stability;

            // 6. الاتجاه السلبي
            if (exam.trend < -5) priority += 20 * weights.trend;
            else if (exam.trend > 10) priority -= 10 * weights.trend;

            // 7. الجديد: نعطيه فرصة
            if (exam.isFresh) {
                if (daysRemaining > 5) priority += 30 * weights.fresh;
                else priority -= 50 * weights.fresh;
            }

            // 8. الضعف
            if (exam.isWeak) priority += 25 * weights.weak;

            // 9. النسيان الشديد
            if (exam.isForgotten) priority += 40 * weights.forgotten;

            // 10. سرعة النسيان
            if (exam.forgettingRate > 0.5) {
                priority += exam.forgettingRate * 20 * weights.forgettingRate;
            }

            // 11. Coverage: إذا لم يمر عليه من قبل، نعطيه أولوية عالية
            if (!exam.covered) {
                priority += 50 * weights.coverage;
            }

            // 12. Recovery: إذا كان القسم مهملاً، نرفع الأولوية
            if (exam.isSectionNeglected) {
                priority += 30 * weights.recovery;
            }

            // 13. مرحلة الدراسة
            if (phase && phase.focus.includes(exam.sectionId)) {
                priority += 30 * weights.phase;
            }

            // 14. الأيام المتبقية
            if (daysRemaining < 10) priority *= 1.2;
            if (daysRemaining < 5) priority *= 1.4;

            // 15. معاقبة التكرار
            let effectiveCount = exam.selectedCount;
            if (exam.daysSinceLastSelect > 30) effectiveCount = 0;
            else if (exam.daysSinceLastSelect > 14) effectiveCount = Math.max(0, exam.selectedCount - 2);
            if (daysRemaining < 10) effectiveCount = Math.max(0, effectiveCount - 1);

            if (effectiveCount > 2) {
                priority *= Math.max(0.3, 1 - (effectiveCount * 0.08));
            }

            // 16. وزن القسم
            priority *= this.sections.find(s => s.id === exam.sectionId)?.weight || 1;

            // 17. المتقن: نخفضها جداً
            if (exam.isMastered) {
                priority *= 0.05;
            }

            // 18. Momentum: تعديل الصعوبة
            if (momentum === 'improving') {
                priority *= 0.9; // خفف قليلاً لأن المستوى جيد
            } else if (momentum === 'declining') {
                priority *= 1.1; // زد قليلاً لأن المستوى منخفض
            }

            // 19. عامل عشوائي صغير لكسر التعادل
            priority += Math.random() * 0.1;

            return Math.round(Math.max(0, priority));
        }

        // ------------------- الأوزان المتكيفة حسب توفر البيانات -------------------

        getAdaptiveWeights(dataScore) {
            // الأوزان الافتراضية (عندما تكون البيانات كاملة)
            let weights = {
                result: 1.0,
                retries: 1.0,
                forgetting: 1.0,
                memory: 1.0,
                stability: 1.0,
                trend: 1.0,
                fresh: 1.0,
                weak: 1.0,
                forgotten: 1.0,
                forgettingRate: 1.0,
                coverage: 1.0,
                recovery: 1.0,
                phase: 1.0
            };

            if (dataScore < 20) {
                // لا توجد بيانات → خطة تأسيسية
                weights.result = 0.2;
                weights.retries = 0.1;
                weights.forgetting = 0.1;
                weights.memory = 0.05;
                weights.stability = 0.1;
                weights.trend = 0.1;
                weights.fresh = 1.5;
                weights.weak = 0.2;
                weights.forgotten = 0.1;
                weights.forgettingRate = 0.05;
                weights.coverage = 2.0; // الأهمية القصوى لتغطية كل الامتحانات
                weights.recovery = 1.5;
                weights.phase = 0.5;
            } else if (dataScore < 50) {
                // بيانات قليلة → اكتشاف المناطق الضعيفة
                weights.result = 0.7;
                weights.retries = 0.5;
                weights.forgetting = 0.3;
                weights.memory = 0.2;
                weights.stability = 0.4;
                weights.trend = 0.3;
                weights.fresh = 1.2;
                weights.weak = 0.8;
                weights.forgotten = 0.5;
                weights.forgettingRate = 0.3;
                weights.coverage = 1.5;
                weights.recovery = 1.2;
                weights.phase = 0.7;
            } else if (dataScore < 80) {
                // بيانات متوسطة → استخدام النتائج والإعادات
                weights.result = 0.9;
                weights.retries = 0.9;
                weights.forgetting = 0.7;
                weights.memory = 0.6;
                weights.stability = 0.8;
                weights.trend = 0.7;
                weights.fresh = 1.0;
                weights.weak = 1.0;
                weights.forgotten = 0.9;
                weights.forgettingRate = 0.7;
                weights.coverage = 1.2;
                weights.recovery = 1.0;
                weights.phase = 0.9;
            } else {
                // بيانات كاملة → استخدام جميع العوامل
                // الأوزان الافتراضية تبقى كما هي
            }

            return weights;
        }

        // ------------------- حساب Momentum -------------------

        calculateMomentum(data) {
            const { results } = data;
            let recentScores = [];
            for (const sec of this.sections) {
                const secResults = results[sec.id] || [];
                for (const exam of secResults) {
                    if (exam.scores && exam.scores.length > 0) {
                        const last = exam.scores[exam.scores.length - 1];
                        recentScores.push(last);
                    }
                }
            }
            // نأخذ آخر 5 نتائج
            recentScores = recentScores.slice(-5);
            if (recentScores.length < 3) return 'neutral';

            const avg = recentScores.reduce((a,b) => a+b, 0) / recentScores.length;
            const trend = recentScores[recentScores.length - 1] - recentScores[0];

            if (avg >= 85 && trend > 0) return 'improving';
            if (avg < 60 && trend < -5) return 'declining';
            return 'neutral';
        }

        // ------------------- حساب Confidence Score -------------------

        calculateConfidence(dataScore, planCount) {
            // 50% من الثقة من كمية البيانات، 30% من عدد الامتحانات في الخطة، 20% من التغطية
            let base = dataScore * 0.5;
            let planFactor = Math.min(1, planCount / 10) * 30;
            let coverageFactor = 0;
            // يمكن إضافة عامل التغطية هنا

            return Math.min(100, Math.round(base + planFactor + coverageFactor));
        }

        // ------------------- بناء الخطة التأسيسية (معدلة) -------------------

        buildFoundationPlan(data, targetSectionId = null, count = null) {
            const targetSections = targetSectionId 
                ? this.sections.filter(s => s.id === targetSectionId)
                : this.sections;

            const selected = [];
            const totalNeeded = count || this.minDailyExams;
            const perSection = Math.ceil(totalNeeded / targetSections.length);

            for (const sec of targetSections) {
                let added = 0;
                for (let i = 1; i <= sec.totalTests && added < perSection; i++) {
                    const key = `${sec.id}_${i}`;
                    // نتجنب التكرار في الخطة الحالية
                    if (this.planState.items[key] && this.planState.items[key].status !== 'pending') continue;
                    selected.push({
                        sectionName: sec.name,
                        id: i,
                        key: key,
                        priority: i // ترتيب تصاعدي
                    });
                    added++;
                }
            }

            selected.sort((a, b) => a.priority - b.priority);
            if (selected.length > totalNeeded) selected.length = totalNeeded;

            return selected;
        }

        // ------------------- بناء الخطة (الرئيسية) -------------------

        buildScheduledPlan(targetSectionId = null) {
            // 1. جمع البيانات
            const allData = this.gatherAllData();
            const daysRemaining = this.getDaysRemaining();
            const effectiveDays = this.getEffectiveStudyDays();

            // 2. حساب درجة توفر البيانات
            const dataScore = this.calculateDataScore(allData);

            // 3. حساب Momentum
            const momentum = this.calculateMomentum(allData);

            // 4. تحديد المرحلة
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

            // 5. التحقق من وجود خطة غير مكتملة
            const pendingItems = Object.keys(this.planState.items).filter(k => 
                this.planState.items[k].status === 'pending' || this.planState.items[k].status === 'started'
            );

            if (pendingItems.length > 0 && dataScore > 20) {
                // نعطي المستخدم خيار متابعة الخطة السابقة
                // لكننا نعيد بناء الخطة من العناصر المتبقية مع إضافة امتحانات جديدة حسب الحاجة
                return this.buildFromPendingPlan(allData, targetSectionId, daysRemaining, effectiveDays, phase, dataScore, momentum);
            }

            // 6. تحليل جميع الامتحانات
            const examMap = {};
            let totalRemainingReps = 0;
            let totalExamsWithData = 0;

            for (const sec of targetSections) {
                for (let i = 1; i <= sec.totalTests; i++) {
                    const exam = this.analyzeExam(sec.id, i, allData, dataScore);
                    const key = exam.key;
                    examMap[key] = { ...exam, sectionName: sec.name, sectionWeight: sec.weight };
                    if (!exam.isFresh && (exam.attempts > 0 || exam.scores.length > 0)) {
                        totalExamsWithData++;
                    }
                    if (exam.remainingReps > 0 && !exam.isMastered) {
                        totalRemainingReps += exam.remainingReps;
                    }
                }
            }

            // 7. إذا كانت البيانات قليلة جداً (foundation)
            if (dataScore < 20 || totalExamsWithData === 0) {
                const foundationPlan = this.buildFoundationPlan(allData, targetSectionId);
                const grouped = {};
                foundationPlan.forEach(item => {
                    if (!grouped[item.sectionName]) grouped[item.sectionName] = [];
                    grouped[item.sectionName].push(item.id);
                    // إضافة إلى الخطة الحالية
                    this.addToPlan(item.sectionName, item.id, item.priority);
                });
                this.savePlanState(this.planState);

                const confidence = this.calculateConfidence(dataScore, foundationPlan.length);
                return {
                    isRestPeriod: false,
                    grouped: grouped,
                    totalTests: foundationPlan.length,
                    daysRemaining: daysRemaining,
                    effectiveDays: effectiveDays,
                    phase: 'تأسيسي',
                    totalRemainingReps: 0,
                    dailyCount: foundationPlan.length,
                    isTimeInsufficient: false,
                    isFoundation: true,
                    dataScore: dataScore,
                    confidence: confidence,
                    momentum: momentum,
                    pendingCount: this.planState.pendingCount
                };
            }

            // 8. البيانات كافية → استخدام الأولويات
            let dailyCount = Math.ceil(totalRemainingReps / effectiveDays);
            dailyCount = Math.max(this.minDailyExams, dailyCount);
            const maxDaily = this.getDynamicMaxExams(daysRemaining, totalRemainingReps);
            dailyCount = Math.min(dailyCount, maxDaily);

            // تصفية الامتحانات المؤهلة
            const eligible = [];
            const mastered = [];

            for (const key in examMap) {
                const exam = examMap[key];

                if (exam.isMastered) {
                    mastered.push(exam);
                    continue;
                }

                // Spaced Repetition
                if (!exam.isFresh) {
                    const nextReview = this.getNextReviewDays(exam.lastScore, exam.attempts);
                    if (exam.daysSince < nextReview) continue;
                }

                // منع الجديدة في آخر 5 أيام (إلا إذا لم تُغطى)
                if (exam.isFresh && daysRemaining !== null && daysRemaining <= 5) {
                    if (!exam.covered) {
                        // نسمح بواحد جديد غير مغطى
                        const uncovered = eligible.filter(e => !e.covered).length;
                        if (uncovered >= 1) continue;
                    } else {
                        continue;
                    }
                }

                // منع التكرار المبكر
                let minDays = 3;
                if (daysRemaining !== null && daysRemaining < 10) minDays = 1;
                else if (daysRemaining !== null && daysRemaining < 20) minDays = 2;
                if (exam.daysSinceLastSelect < minDays && exam.selectedCount > 0) continue;

                eligible.push(exam);
            }

            // تقسيم الفئات
            const fresh = [], forgotten = [], weak = [], normal = [], uncovered = [];
            for (const exam of eligible) {
                if (!exam.covered) uncovered.push(exam);
                else if (exam.isFresh) fresh.push(exam);
                else if (exam.isForgotten) forgotten.push(exam);
                else if (exam.isWeak) weak.push(exam);
                else normal.push(exam);
            }

            // ترتيب حسب الأولوية
            const sortPriority = (arr) => arr.sort((a, b) => {
                const pa = this.calculatePriority(a, phase, daysRemaining, dataScore, momentum);
                const pb = this.calculatePriority(b, phase, daysRemaining, dataScore, momentum);
                return pb - pa;
            });
            sortPriority(fresh);
            sortPriority(forgotten);
            sortPriority(weak);
            sortPriority(normal);
            sortPriority(uncovered);
            sortPriority(mastered);

            // التوزيع مع التوازن
            const selected = [];
            const selectedKeys = new Set();
            const sectionCounts = {};

            const uniqueSections = new Set(eligible.map(e => e.sectionName));
            const localMax = uniqueSections.size === 1 ? 6 : this.maxExamsPerSection;

            const tryAdd = (exam) => {
                const key = exam.key;
                if (selectedKeys.has(key)) return false;
                const secName = exam.sectionName;
                if (!sectionCounts[secName]) sectionCounts[secName] = 0;
                if (sectionCounts[secName] >= localMax) return false;
                selectedKeys.add(key);
                selected.push(exam);
                sectionCounts[secName]++;
                return true;
            };

            // نبدأ بالامتحانات غير المغطاة (الأولوية القصوى)
            let pool = [...uncovered, ...fresh, ...forgotten, ...weak, ...normal];
            let added = 0;
            let round = 0;
            const maxRounds = Math.ceil(dailyCount / pool.length) + 1;

            while (added < dailyCount && round < maxRounds) {
                let anyAdded = false;
                for (const exam of pool) {
                    if (added >= dailyCount) break;
                    if (selectedKeys.has(exam.key)) continue;
                    if (tryAdd(exam)) { anyAdded = true; added++; }
                }
                if (!anyAdded) break;
                round++;
            }

            // إذا لم نكمل، نضيف من المتقنين
            if (added < dailyCount) {
                for (const exam of mastered) {
                    if (added >= dailyCount) break;
                    if (tryAdd(exam)) added++;
                }
            }

            // أخيراً، أي امتحان متبقي
            if (added < dailyCount) {
                for (const exam of pool) {
                    if (added >= dailyCount) break;
                    if (!selectedKeys.has(exam.key)) {
                        selectedKeys.add(exam.key);
                        selected.push(exam);
                        added++;
                    }
                }
            }

            // تحديث الخطة الحالية
            // نضيف الامتحانات المختارة إلى الخطة بحالة pending
            for (const exam of selected) {
                this.addToPlan(exam.sectionName, exam.id, exam.priority);
            }
            this.savePlanState(this.planState);

            // تجميع النتائج
            const grouped = {};
            selected.forEach(exam => {
                const secName = exam.sectionName;
                if (!grouped[secName]) grouped[secName] = [];
                grouped[secName].push(exam.id);
            });

            // Confidence Score
            const confidence = this.calculateConfidence(dataScore, selected.length);

            // حالة الراحة
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
                phase: phase ? phase.name : 'متقدم',
                totalRemainingReps: totalRemainingReps,
                dailyCount: dailyCount,
                isTimeInsufficient: (totalRemainingReps / effectiveDays) > 12 && daysRemaining < 10,
                isFoundation: false,
                dataScore: dataScore,
                confidence: confidence,
                momentum: momentum,
                pendingCount: this.planState.pendingCount
            };
        }

        // ------------------- بناء خطة من العناصر المتبقية -------------------

        buildFromPendingPlan(allData, targetSectionId, daysRemaining, effectiveDays, phase, dataScore, momentum) {
            // نأخذ العناصر المتبقية من الخطة السابقة
            const pendingItems = Object.keys(this.planState.items).filter(k => 
                this.planState.items[k].status === 'pending' || this.planState.items[k].status === 'started'
            );

            const selected = [];
            const selectedKeys = new Set();

            for (const key of pendingItems) {
                const item = this.planState.items[key];
                // نتأكد من أن القسم في النطاق المطلوب
                if (targetSectionId && item.sectionName !== targetSectionId) continue;
                selectedKeys.add(key);
                selected.push({
                    sectionName: item.sectionName,
                    id: item.examId,
                    key: key,
                    priority: item.priority || 0,
                    status: item.status
                });
            }

            // إذا كان العدد المتبقي أقل من الحد الأدنى، نضيف امتحانات جديدة
            const needed = Math.max(this.minDailyExams, selected.length);
            if (selected.length < needed) {
                // نضيف امتحانات جديدة من الأقسام المستهدفة
                const targetSections = targetSectionId 
                    ? this.sections.filter(s => s.id === targetSectionId)
                    : this.sections;

                for (const sec of targetSections) {
                    if (selected.length >= needed) break;
                    for (let i = 1; i <= sec.totalTests; i++) {
                        const key = `${sec.id}_${i}`;
                        if (!selectedKeys.has(key) && !this.planState.items[key]) {
                            // تحليل الامتحان لتحديد الأولوية
                            const exam = this.analyzeExam(sec.id, i, allData, dataScore);
                            const priority = this.calculatePriority(exam, phase, daysRemaining, dataScore, momentum);
                            selected.push({
                                sectionName: sec.name,
                                id: i,
                                key: key,
                                priority: priority,
                                status: 'pending'
                            });
                            selectedKeys.add(key);
                            this.addToPlan(sec.name, i, priority);
                            if (selected.length >= needed) break;
                        }
                    }
                }
            }

            // ترتيب حسب الأولوية
            selected.sort((a, b) => b.priority - a.priority);

            // تجميع النتائج
            const grouped = {};
            selected.forEach(item => {
                if (!grouped[item.sectionName]) grouped[item.sectionName] = [];
                grouped[item.sectionName].push(item.id);
            });

            const confidence = this.calculateConfidence(dataScore, selected.length);

            return {
                isRestPeriod: false,
                grouped: grouped,
                totalTests: selected.length,
                daysRemaining: daysRemaining,
                effectiveDays: effectiveDays,
                phase: phase ? phase.name : 'متابعة الخطة السابقة',
                totalRemainingReps: 0,
                dailyCount: selected.length,
                isTimeInsufficient: false,
                isFoundation: false,
                dataScore: dataScore,
                confidence: confidence,
                momentum: momentum,
                pendingCount: this.planState.pendingCount,
                isContinuation: true
            };
        }

        // ------------------- دوال مساعدة -------------------

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

        getDynamicMaxExams(daysRemaining, totalRemainingReps) {
            if (daysRemaining === null || daysRemaining <= 0) return 25;
            const effectiveDays = this.getEffectiveStudyDays();
            const required = Math.ceil(totalRemainingReps / effectiveDays);
            let max = Math.max(8, Math.min(30, required * 2));
            if (daysRemaining < 5) max = Math.min(35, max + 5);
            if (daysRemaining < 3) max = 40;
            return Math.round(max);
        }

        getNextReviewDays(score, attempts) {
            if (attempts === 0) return 1;
            if (score >= 95) return 14;
            if (score >= 85) return 7;
            if (score >= 70) return 4;
            if (score >= 55) return 2;
            if (score >= 40) return 1;
            return 0;
        }
    }

    // ================================================================
    // 2. واجهة المستخدم (معدلة لعرض بيانات جديدة)
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
                .confidence-bar { height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden; margin-top: 4px; }
                .confidence-fill { height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 2px; transition: width 0.5s ease; }
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

        // التحقق من وجود خطة غير مكتملة
        const pendingCount = engine.planState.pendingCount;

        let pendingMsg = '';
        if (pendingCount > 0) {
            pendingMsg = `
                <div style="background: #1e293b; border-radius: 12px; padding: 10px 16px; margin-bottom: 16px; border-right: 3px solid #f59e0b;">
                    <span style="color: #fbbf24; font-size: 0.9rem;">⏳ لديك ${pendingCount} امتحان(ات) غير مكتملة من الخطة السابقة</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 2.5rem; margin-bottom: 4px;">🎯</div>
                <h2 style="margin: 0; color: #38bdf8;">المدرب الذكي</h2>
                <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 0.85rem;">اختر طريقة التخطيط</p>
            </div>
            ${pendingMsg}
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
            ${pendingCount > 0 ? `
            <button id="btnContinuePlan" style="
                width: 100%; margin-top: 12px; padding: 12px;
                background: #f59e0b; border: none; border-radius: 12px;
                color: #0a0e1a; font-size: 0.95rem; font-weight: 600; cursor: pointer;
            " onmouseover="this.style.background='#d97706'" onmouseout="this.style.background='#f59e0b'">
                📋 متابعة الخطة السابقة (${pendingCount} متبقية)
            </button>
            ` : ''}
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

        const continueBtn = document.getElementById('btnContinuePlan');
        if (continueBtn) {
            continueBtn.onclick = () => {
                overlay.remove();
                // بناء الخطة من العناصر المتبقية مباشرة
                const allData = engine.gatherAllData();
                const daysRemaining = engine.getDaysRemaining();
                const effectiveDays = engine.getEffectiveStudyDays();
                const dataScore = engine.calculateDataScore(allData);
                const momentum = engine.calculateMomentum(allData);
                let phase = null;
                for (const p of engine.phases) {
                    if (daysRemaining !== null && daysRemaining <= p.days) {
                        phase = p;
                        break;
                    }
                }
                if (!phase && daysRemaining !== null) phase = engine.phases[0];
                const plan = engine.buildFromPendingPlan(allData, null, daysRemaining, effectiveDays, phase, dataScore, momentum);
                showPurePlan(plan);
            };
        }

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
            { text: "🔍 جاري تحليل بياناتك...", progress: "25%" },
            { text: "📊 حساب مستواك في كل قسم...", progress: "50%" },
            { text: "🧠 بناء الخطة الذكية...", progress: "75%" },
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
            max-width: 500px; width: 90%; max-height: 85vh; overflow-y: auto;
            border: 1px solid #2a3042; box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            color: #e2e8f0; animation: slideUp 0.25s ease; direction: rtl;
        `;

        let html = '';

        if (plan.isRestPeriod) {
            html = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="margin: 0; color: #38bdf8;">📅 خطة اليوم</h3>
                    <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
                </div>
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🧘</div>
                    <p style="font-size: 1.1rem; color: #f1f5f9;">${plan.message}</p>
                </div>
            `;
        } else {
            // عرض الإحصائيات الذكية
            const statusLabel = plan.isFoundation ? '🟢 خطة تأسيسية' : plan.isContinuation ? '🟡 متابعة الخطة السابقة' : '🔵 خطة متقدمة';
            const confidenceColor = plan.confidence > 80 ? '#4ade80' : plan.confidence > 50 ? '#fbbf24' : '#f87171';

            html = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="margin: 0; color: #38bdf8;">📅 خطة اليوم</h3>
                    <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                    <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem;">${statusLabel}</span>
                    <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem;">📌 ${plan.phase}</span>
                    <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem;">📊 ${plan.totalTests} امتحان</span>
                    ${plan.momentum === 'improving' ? '<span style="background: #065f46; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; color: #6ee7b7;">📈 تحسن</span>' : ''}
                    ${plan.momentum === 'declining' ? '<span style="background: #7f1d1d; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; color: #fca5a5;">📉 تراجع</span>' : ''}
                </div>
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #94a3b8;">
                        <span>درجة البيانات: ${plan.dataScore || 0}%</span>
                        <span>الثقة: <span style="color: ${confidenceColor};">${plan.confidence || 0}%</span></span>
                        ${plan.pendingCount !== undefined ? `<span>⏳ متبقية: ${plan.pendingCount}</span>` : ''}
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${plan.confidence || 0}%;"></div>
                    </div>
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

            if (plan.isTimeInsufficient) {
                html += `
                    <div style="background: #7f1d1d; border-radius: 12px; padding: 10px; margin-top: 12px; color: #fca5a5; font-size: 0.85rem; text-align: center;">
                        ⚠️ الوقت المتبقي غير كافٍ لتحقيق 6 مراجعات لكل امتحان. حاول زيادة عدد الامتحانات اليومية.
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

        const closeBtn = document.getElementById('closePlanBtn');
        if (closeBtn) closeBtn.onclick = () => overlay.remove();

        const startBtn = document.getElementById('startReviewBtn');
        if (startBtn) {
            startBtn.onclick = () => {
                overlay.remove();
                // هنا يمكننا توجيه المستخدم إلى الامتحانات، مثلاً فتح القائمة مع تحديد الأقسام
                const firstSection = Object.keys(plan.grouped)[0];
                if (firstSection) {
                    // العثور على القسم في teile
                    const teil = window.teile?.find(t => t.name === firstSection);
                    if (teil && typeof window.renderExamListForSkill === 'function') {
                        window.renderExamListForSkill(teil.skill, teil.name);
                        // تبديل الصفحات
                        document.getElementById('home')?.classList.remove('active');
                        document.getElementById('exam')?.classList.remove('active');
                        document.getElementById('list')?.classList.add('active');
                    } else {
                        // العودة إلى القائمة
                        if (typeof window.goList === 'function') window.goList();
                    }
                } else {
                    if (typeof window.goList === 'function') window.goList();
                }
            };
        }

        const backBtn = document.getElementById('backToMenuBtn');
        if (backBtn) {
            backBtn.onclick = () => {
                overlay.remove();
                showMainMenu();
            };
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

    // دالة لإكمال امتحان (يُستدعى من engine.js بعد التصحيح)
    window.completeExamInPlan = function(sectionName, examId) {
        engine.completeExam(sectionName, examId);
    };

    // دالة لبدء امتحان (يُستدعى من engine.js عند فتح الامتحان)
    window.startExamInPlan = function(sectionName, examId) {
        engine.startExam(sectionName, examId);
    };

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.removeEventListener('click', window.openStudyPlanner);
            btn.addEventListener('click', window.openStudyPlanner);
            console.log('✅ المدرب الذكي TELC B2 جاهز (الإصدار 9.4 - مع إدارة الخطة والذكاء المتكيف)');
        } else {
            console.warn('⚠️ الزر studyPlannerBtn غير موجود.');
        }
    });

    window.StudyPlannerEngine = StudyPlannerEngine;

})();
