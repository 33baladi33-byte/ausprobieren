/**
 * studyPlanner.js - المدرب الذكي TELC B2 (الإصدار 10.0)
 * 
 * فلسفة التصميم الجديدة:
 * - لا يحفظ خطة ثابتة (Queue)، بل يعيد الحساب في كل مرة من الصفر.
 * - يعتمد فقط على البيانات الحقيقية من localStorage.
 * - الإنجاز الحقيقي = فتح الامتحان + التصحيح (ظهور نتيجة جديدة).
 * - يعيد ترتيب الأولويات بعد كل إنجاز.
 * - يعرض عملية التفكير للمستخدم (مثل DeepSeek) مع رسائل حقيقية مبنية على البيانات.
 * - كل ضغطة على الزر = تحليل جديد + خطة جديدة.
 */

(function() {
    "use strict";

    // ================================================================
    // 1. محرك القرار الذكي (Decision Engine) - إصدار 10.0
    // ================================================================

    class StudyPlannerEngine {
        constructor() {
            this.storageKeyDate = 'user_exam_date';
            this.storageKeyPlans = 'study_planner_history_v3';

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
        }

        // ------------------- دوال أساسية -------------------

        getExamDate() {
            return localStorage.getItem(this.storageKeyDate) || null;
        }

        setExamDate(dateStr) {
            localStorage.setItem(this.storageKeyDate, dateStr);
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

        // ------------------- جمع البيانات (قراءة كاملة من localStorage) -------------------

        gatherAllData() {
            const allKeys = Object.keys(localStorage);
            const results = {};

            // 1. نتائج الامتحانات
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

            // 2. عدد الإعادات
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

            // 3. تاريخ آخر مراجعة (من سجل النتائج الكامل)
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

            // 4. مستويات Memory (نسبة الإكمال)
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

            // 5. تاريخ الخطط السابقة (كم مرة اختير كل امتحان)
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

        // ------------------- حساب درجة توفر البيانات -------------------

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

            let score = 0;
            if (totalExams > 0) {
                const resultRatio = examsWithData / totalExams;
                const memoryRatio = examsWithMemory / totalExams;
                const historyKeys = Object.keys(history).length;
                const historyRatio = Math.min(1, historyKeys / totalExams);
                score = (resultRatio * 50) + (memoryRatio * 30) + (historyRatio * 20);
            }

            return Math.min(100, Math.round(score));
        }

        // ------------------- تحليل كل امتحان (يعتمد فقط على البيانات) -------------------

        analyzeExam(sectionId, testId, data) {
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

            // عدد المراجعات المتبقية (مع مرونة)
            let remainingReps = Math.max(0, this.targetRepetitions - attempts);
            if (avg > 0 && avg < 60) {
                remainingReps = Math.max(remainingReps, 4);
            } else if (avg < 80 && attempts >= this.targetRepetitions) {
                remainingReps = Math.max(remainingReps, 2);
            }

            // الإتقان: 6 محاولات + متوسط >= 85 + آخر نتيجة >= 80 + Memory >= 90%
            const isMastered = attempts >= this.targetRepetitions && avg >= 85 && lastScore >= 80 && memoryPercent >= 90;

            // معدل النسيان (انحدار آخر 3 نتائج)
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

            // الاتجاه (آخر 3 نتائج)
            let trend = 0;
            const last3 = scores.slice(-3);
            if (last3.length >= 2) {
                trend = last3[last3.length - 1] - last3[0];
            }

            // تاريخ الاختيار في الخطط السابقة
            const key = `${sectionId}_${testId}`;
            const historyEntry = history[key] || {};
            const selectedCount = historyEntry.count || 0;
            const lastSelected = historyEntry.lastDate || null;
            let daysSinceLastSelect = 999;
            if (lastSelected) {
                daysSinceLastSelect = Math.floor((Date.now() - new Date(lastSelected).getTime()) / (1000 * 3600 * 24));
            }

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
                key: key
            };
        }

        // ------------------- حساب الأولوية (مع Adaptive Weights) -------------------

        calculatePriority(exam, phase, daysRemaining, dataScore, momentum) {
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

            // 3. النسيان (أيام منذ آخر مراجعة)
            if (!exam.isFresh) {
                priority += Math.min(exam.daysSince * 3, 50) * weights.forgetting;
            }

            // 4. Memory (كلما قلت النسبة زادت الأولوية)
            priority += (100 - exam.memoryPercent) * 1.5 * weights.memory;

            // 5. التذبذب
            if (!exam.isStable && exam.attempts >= 3) priority += 15 * weights.stability;

            // 6. الاتجاه السلبي (انخفاض الأداء)
            if (exam.trend < -5) priority += 20 * weights.trend;
            else if (exam.trend > 10) priority -= 10 * weights.trend;

            // 7. الامتحانات الجديدة
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

            // 11. مرحلة الدراسة
            if (phase && phase.focus.includes(exam.sectionId)) {
                priority += 30 * weights.phase;
            }

            // 12. الأيام المتبقية (تضخيم)
            if (daysRemaining < 10) priority *= 1.2;
            if (daysRemaining < 5) priority *= 1.4;

            // 13. معاقبة التكرار المفرط
            let effectiveCount = exam.selectedCount;
            if (exam.daysSinceLastSelect > 30) effectiveCount = 0;
            else if (exam.daysSinceLastSelect > 14) effectiveCount = Math.max(0, exam.selectedCount - 2);
            if (daysRemaining < 10) effectiveCount = Math.max(0, effectiveCount - 1);

            if (effectiveCount > 2) {
                priority *= Math.max(0.3, 1 - (effectiveCount * 0.08));
            }

            // 14. وزن القسم
            priority *= this.sections.find(s => s.id === exam.sectionId)?.weight || 1;

            // 15. المتقن: نخفضها جداً
            if (exam.isMastered) {
                priority *= 0.05;
            }

            // 16. Momentum (تعديل الصعوبة)
            if (momentum === 'improving') {
                priority *= 0.9;
            } else if (momentum === 'declining') {
                priority *= 1.1;
            }

            // 17. عامل عشوائي صغير لكسر التعادل
            priority += Math.random() * 0.1;

            return Math.round(Math.max(0, priority));
        }

        // ------------------- الأوزان المتكيفة حسب توفر البيانات -------------------

        getAdaptiveWeights(dataScore) {
            let weights = {
                result: 1.0, retries: 1.0, forgetting: 1.0, memory: 1.0,
                stability: 1.0, trend: 1.0, fresh: 1.0, weak: 1.0,
                forgotten: 1.0, forgettingRate: 1.0, coverage: 1.0,
                recovery: 1.0, phase: 1.0
            };

            if (dataScore < 20) {
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
                weights.coverage = 2.0;
                weights.recovery = 1.5;
                weights.phase = 0.5;
            } else if (dataScore < 50) {
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
            let base = dataScore * 0.5;
            let planFactor = Math.min(1, planCount / 10) * 30;
            return Math.min(100, Math.round(base + planFactor));
        }

        // ------------------- بناء الخطة التأسيسية (بدون بيانات) -------------------

        buildFoundationPlan(targetSectionId = null, count = null) {
            const targetSections = targetSectionId 
                ? this.sections.filter(s => s.id === targetSectionId)
                : this.sections;

            const selected = [];
            const totalNeeded = count || this.minDailyExams;
            const perSection = Math.ceil(totalNeeded / targetSections.length);

            for (const sec of targetSections) {
                let added = 0;
                for (let i = 1; i <= sec.totalTests && added < perSection; i++) {
                    selected.push({
                        sectionName: sec.name,
                        id: i,
                        key: `${sec.id}_${i}`,
                        priority: i
                    });
                    added++;
                }
            }

            selected.sort((a, b) => a.priority - b.priority);
            if (selected.length > totalNeeded) selected.length = totalNeeded;

            return selected;
        }

        // ------------------- تحليل تفصيلي للأقسام (للمستخدم في شاشة التفكير) -------------------

        analyzeSections(data) {
            const { results } = data;
            const sectionAnalysis = {};

            for (const sec of this.sections) {
                const secResults = results[sec.id] || [];
                const totalExams = sec.totalTests;
                const completedExams = secResults.length;
                const avgScore = secResults.length > 0 
                    ? secResults.reduce((sum, e) => {
                        const avg = e.scores.length > 0 
                            ? e.scores.reduce((a,b) => a+b, 0) / e.scores.length 
                            : 0;
                        return sum + avg;
                    }, 0) / secResults.length 
                    : 0;

                // عدد الامتحانات الضعيفة (متوسط < 50)
                const weakExams = secResults.filter(e => {
                    const avg = e.scores.length > 0 
                        ? e.scores.reduce((a,b) => a+b, 0) / e.scores.length 
                        : 0;
                    return avg > 0 && avg < 50;
                }).length;

                // عدد الامتحانات المنسية (آخر مراجعة > 20 يوم)
                const forgottenExams = secResults.filter(e => {
                    if (!e.lastDate) return false;
                    const days = Math.floor((Date.now() - new Date(e.lastDate).getTime()) / (1000 * 3600 * 24));
                    return days > 20;
                }).length;

                sectionAnalysis[sec.id] = {
                    name: sec.name,
                    completed: completedExams,
                    total: totalExams,
                    avgScore: Math.round(avgScore),
                    weakExams: weakExams,
                    forgottenExams: forgottenExams,
                    completionPercent: Math.round((completedExams / totalExams) * 100)
                };
            }

            return sectionAnalysis;
        }

        // ------------------- بناء الخطة الرئيسية (يعيد الحساب من الصفر دائماً) -------------------

        buildScheduledPlan(targetSectionId = null) {
            // 1. جمع البيانات من localStorage
            const allData = this.gatherAllData();
            const daysRemaining = this.getDaysRemaining();
            const effectiveDays = this.getEffectiveStudyDays();

            // 2. حساب درجة توفر البيانات
            const dataScore = this.calculateDataScore(allData);

            // 3. حساب Momentum
            const momentum = this.calculateMomentum(allData);

            // 4. تحليل الأقسام (للاستخدام في شاشة التفكير)
            const sectionAnalysis = this.analyzeSections(allData);

            // 5. تحديد المرحلة
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

            // 6. تحليل جميع الامتحانات
            const examMap = {};
            let totalRemainingReps = 0;
            let totalExamsWithData = 0;

            for (const sec of targetSections) {
                for (let i = 1; i <= sec.totalTests; i++) {
                    const exam = this.analyzeExam(sec.id, i, allData);
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

            // 7. إذا كانت البيانات قليلة جداً → خطة تأسيسية
            if (dataScore < 20 || totalExamsWithData === 0) {
                const foundationPlan = this.buildFoundationPlan(targetSectionId);
                const grouped = {};
                foundationPlan.forEach(item => {
                    if (!grouped[item.sectionName]) grouped[item.sectionName] = [];
                    grouped[item.sectionName].push(item.id);
                });

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
                    sectionAnalysis: sectionAnalysis
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

                // منع الجديدة في آخر 5 أيام
                if (exam.isFresh && daysRemaining !== null && daysRemaining <= 5) {
                    continue;
                }

                // منع التكرار المبكر
                let minDays = 3;
                if (daysRemaining !== null && daysRemaining < 10) minDays = 1;
                else if (daysRemaining !== null && daysRemaining < 20) minDays = 2;
                if (exam.daysSinceLastSelect < minDays && exam.selectedCount > 0) continue;

                eligible.push(exam);
            }

            // تقسيم الفئات
            const fresh = [], forgotten = [], weak = [], normal = [];
            for (const exam of eligible) {
                if (exam.isFresh) fresh.push(exam);
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

            let pool = [...fresh, ...forgotten, ...weak, ...normal];
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

            // تجميع النتائج
            const grouped = {};
            selected.forEach(exam => {
                const secName = exam.sectionName;
                if (!grouped[secName]) grouped[secName] = [];
                grouped[secName].push(exam.id);
            });

            // Confidence Score
            const confidence = this.calculateConfidence(dataScore, selected.length);

            // تحديث تاريخ الخطة (لتتبع عدد مرات الاختيار)
            const today = new Date().toISOString().slice(0, 10);
            const newHistory = { ...allData.history };
            selected.forEach(exam => {
                const key = exam.key;
                if (!newHistory[key]) newHistory[key] = { count: 0, lastDate: null };
                newHistory[key].count = (newHistory[key].count || 0) + 1;
                newHistory[key].lastDate = today;
            });
            localStorage.setItem(this.storageKeyPlans, JSON.stringify(newHistory));

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
                sectionAnalysis: sectionAnalysis
            };
        }
    }

    // ================================================================
    // 2. واجهة المستخدم (مع شاشة التفكير مثل DeepSeek)
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
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
                .thinking-dot { animation: pulse 1s ease-in-out infinite; }
                .thinking-line { opacity: 0; animation: fadeIn 0.3s ease forwards; }
                .confidence-bar { height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden; margin-top: 4px; }
                .confidence-fill { height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 2px; transition: width 0.5s ease; }
                .thinking-log { max-height: 200px; overflow-y: auto; direction: ltr; }
                .thinking-log::-webkit-scrollbar { width: 3px; }
                .thinking-log::-webkit-scrollbar-track { background: #0f1421; border-radius: 3px; }
                .thinking-log::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
            `;
            document.head.appendChild(style);
        }
        return overlay;
    }

    // ============================================
    // شاشة التفكير (Thinking Screen) - مثل DeepSeek
    // ============================================

    function showThinkingScreen(sectionId) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 30px;
            max-width: 480px; width: 92%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            color: #e2e8f0; animation: slideUp 0.25s ease;
            max-height: 90vh; overflow-y: auto;
        `;

        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="font-size: 1.5rem;">🧠</div>
                <div>
                    <div style="font-size: 0.75rem; color: #64748b;">المدرب الذكي يحلل بياناتك...</div>
                    <div style="font-size: 0.9rem; font-weight: 500; color: #38bdf8;">جاري التفكير</div>
                </div>
                <div style="margin-left: auto; display: flex; gap: 4px;">
                    <span class="thinking-dot" style="display:inline-block; width:6px; height:6px; background:#38bdf8; border-radius:50%; animation-delay:0s;"></span>
                    <span class="thinking-dot" style="display:inline-block; width:6px; height:6px; background:#38bdf8; border-radius:50%; animation-delay:0.3s;"></span>
                    <span class="thinking-dot" style="display:inline-block; width:6px; height:6px; background:#38bdf8; border-radius:50%; animation-delay:0.6s;"></span>
                </div>
            </div>
            <div id="thinkingLog" class="thinking-log" style="padding: 0 4px;"></div>
            <div style="margin-top: 16px; background: #0f1421; height: 3px; border-radius: 2px; overflow: hidden;">
                <div id="thinkingProgress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 2px; transition: width 0.5s ease;"></div>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // بدء عملية التفكير
        startThinkingProcess(sectionId, overlay, card);
    }

    // ============================================
    // عملية التفكير خطوة بخطوة (مبنية على بيانات حقيقية)
    // ============================================

    function startThinkingProcess(sectionId, overlay, card) {
        const log = document.getElementById('thinkingLog');
        const progress = document.getElementById('thinkingProgress');

        // جمع البيانات أولاً
        const allData = engine.gatherAllData();
        const sectionAnalysis = engine.analyzeSections(allData);
        const dataScore = engine.calculateDataScore(allData);
        const daysRemaining = engine.getDaysRemaining();
        const momentum = engine.calculateMomentum(allData);

        // بناء الرسائل بناءً على البيانات الفعلية
        const messages = [];

        // 1. رسالة الترحيب وقراءة البيانات
        const totalResults = Object.values(allData.results).reduce((sum, arr) => sum + arr.length, 0);
        messages.push({
            icon: '📂',
            text: `قراءة البيانات... تم العثور على ${totalResults} نتيجة امتحان.`
        });

        // 2. تحليل الأقسام
        let strongestSection = null;
        let weakestSection = null;
        let maxAvg = 0;
        let minAvg = 100;

        for (const secId in sectionAnalysis) {
            const sec = sectionAnalysis[secId];
            if (sec.completed > 0) {
                if (sec.avgScore > maxAvg) { maxAvg = sec.avgScore; strongestSection = sec; }
                if (sec.avgScore < minAvg && sec.avgScore > 0) { minAvg = sec.avgScore; weakestSection = sec; }
            }
        }

        if (weakestSection && weakestSection.avgScore > 0) {
            messages.push({
                icon: '📊',
                text: `تحليل الأقسام... <strong>${weakestSection.name}</strong> هو الأضعف بمتوسط ${weakestSection.avgScore}% (${weakestSection.completed}/${weakestSection.total} امتحان).`
            });
        } else if (totalResults > 0) {
            messages.push({
                icon: '📊',
                text: `تم تحليل ${Object.keys(sectionAnalysis).length} أقسام.`
            });
        } else {
            messages.push({
                icon: '📊',
                text: `لا توجد نتائج سابقة. سيتم بناء خطة تأسيسية.`
            });
        }

        // 3. الامتحانات الضعيفة
        let totalWeak = 0;
        let totalForgotten = 0;
        for (const secId in sectionAnalysis) {
            totalWeak += sectionAnalysis[secId].weakExams || 0;
            totalForgotten += sectionAnalysis[secId].forgottenExams || 0;
        }

        if (totalWeak > 0) {
            messages.push({
                icon: '⚠️',
                text: `تم العثور على ${totalWeak} امتحان(ات) ضعيفة (متوسط < 50%) تحتاج إلى مراجعة عاجلة.`
            });
        }

        if (totalForgotten > 0) {
            messages.push({
                icon: '⏰',
                text: `${totalForgotten} امتحان(ات) مضى عليها أكثر من 20 يوم دون مراجعة.`
            });
        }

        // 4. Memory Trainer
        const memoryData = allData.memory;
        let totalMemoryExams = 0;
        let totalMemoryPercent = 0;
        for (const secId in memoryData) {
            const exams = memoryData[secId];
            for (const examId in exams) {
                totalMemoryExams++;
                totalMemoryPercent += exams[examId];
            }
        }
        if (totalMemoryExams > 0) {
            const avgMemory = Math.round(totalMemoryPercent / totalMemoryExams);
            if (avgMemory >= 80) {
                messages.push({
                    icon: '🧠',
                    text: `مستوى الذاكرة ممتاز (${avgMemory}%) في ${totalMemoryExams} امتحان.`
                });
            } else if (avgMemory >= 50) {
                messages.push({
                    icon: '🧠',
                    text: `مستوى الذاكرة متوسط (${avgMemory}%) في ${totalMemoryExams} امتحان.`
                });
            } else {
                messages.push({
                    icon: '🧠',
                    text: `مستوى الذاكرة منخفض (${avgMemory}%) في ${totalMemoryExams} امتحان.`
                });
            }
        }

        // 5. Momentum
        if (momentum === 'improving') {
            messages.push({
                icon: '📈',
                text: 'أداؤك في تحسن مستمر! استمر بنفس الوتيرة.'
            });
        } else if (momentum === 'declining') {
            messages.push({
                icon: '📉',
                text: 'نلاحظ انخفاضاً في الأداء مؤخراً. نوصي بمراجعة الأساسيات.'
            });
        }

        // 6. الوقت المتبقي
        if (daysRemaining !== null) {
            if (daysRemaining < 10) {
                messages.push({
                    icon: '⏳',
                    text: `باقي ${daysRemaining} يوم فقط على الامتحان! نوصي بتكثيف المراجعة.`
                });
            } else if (daysRemaining < 30) {
                messages.push({
                    icon: '📅',
                    text: `باقي ${daysRemaining} يوم على الامتحان. الخطة مناسبة للفترة المتبقية.`
                });
            } else {
                messages.push({
                    icon: '📅',
                    text: `باقي ${daysRemaining} يوم على الامتحان. وقت كافٍ لمراجعة منهجية.`
                });
            }
        }

        // 7. درجة البيانات وثقة الخطة
        const confidence = engine.calculateConfidence(dataScore, 0);
        messages.push({
            icon: '🎯',
            text: `درجة توفر البيانات: ${dataScore}% · ثقة الخطة: ${confidence}%`
        });

        // عرض الرسائل تدريجياً
        let index = 0;
        let progressValue = 0;

        function showNextMessage() {
            if (index >= messages.length) {
                // انتهى التفكير
                setTimeout(() => {
                    // بناء الخطة وعرضها
                    const plan = engine.buildScheduledPlan(sectionId);
                    overlay.remove();
                    showPurePlan(plan);
                }, 400);
                return;
            }

            const msg = messages[index];
            const line = document.createElement('div');
            line.className = 'thinking-line';
            line.style.cssText = 'padding: 6px 0; font-size: 0.85rem; line-height: 1.5; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.04);';
            line.innerHTML = `<span style="margin-right: 8px;">${msg.icon}</span> ${msg.text}`;
            log.appendChild(line);

            progressValue += (100 / messages.length);
            progress.style.width = Math.min(100, progressValue) + '%';

            // التمرير إلى الأسفل
            log.scrollTop = log.scrollHeight;

            index++;

            // انتظار بين الرسائل
            const delay = Math.min(600 + (msg.text.length / 2), 1200);
            setTimeout(showNextMessage, delay);
        }

        // بدء العرض بعد تأخير بسيط
        setTimeout(showNextMessage, 400);
    }

    // ============================================
    // عرض الخطة النهائية (بعد التفكير)
    // ============================================

    function showPurePlan(plan) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 500px; width: 92%; max-height: 85vh; overflow-y: auto;
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
            const statusLabel = plan.isFoundation ? '🟢 خطة تأسيسية' : '🔵 خطة ذكية';
            const confidenceColor = plan.confidence > 80 ? '#4ade80' : plan.confidence > 50 ? '#fbbf24' : '#f87171';

            html = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h3 style="margin: 0; color: #38bdf8;">📅 خطة اليوم</h3>
                    <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                    <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">${statusLabel}</span>
                    <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">📌 ${plan.phase}</span>
                    <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">📊 ${plan.totalTests} امتحان</span>
                    ${plan.momentum === 'improving' ? '<span style="background: #065f46; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; color: #6ee7b7;">📈 تحسن</span>' : ''}
                    ${plan.momentum === 'declining' ? '<span style="background: #7f1d1d; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem; color: #fca5a5;">📉 تراجع</span>' : ''}
                </div>
                <div style="margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8;">
                        <span>ثقة الخطة: <span style="color: ${confidenceColor};">${plan.confidence || 0}%</span></span>
                        <span>درجة البيانات: ${plan.dataScore || 0}%</span>
                    </div>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${plan.confidence || 0}%;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 12px; color: #94a3b8; font-size: 0.85rem;">اليوم عليك مراجعة:</div>
            `;

            for (const [secName, tests] of Object.entries(plan.grouped)) {
                html += `
                    <div style="background: #0f1421; border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; border-right: 3px solid #38bdf8;">
                        <div style="font-weight: bold; color: #f1f5f9; margin-bottom: 2px; font-size: 0.85rem;">${secName}</div>
                        <div style="color: #e2e8f0; font-size: 0.9rem;">
                            امتحان: <span style="color: #4ade80; font-weight: bold;">${tests.join(' ، ')}</span>
                        </div>
                    </div>
                `;
            }

            if (plan.isTimeInsufficient) {
                html += `
                    <div style="background: #7f1d1d; border-radius: 12px; padding: 10px; margin-top: 10px; color: #fca5a5; font-size: 0.8rem; text-align: center;">
                        ⚠️ الوقت المتبقي غير كافٍ لتحقيق 6 مراجعات لكل امتحان.
                    </div>
                `;
            }
        }

        html += `
            <button id="startReviewBtn" style="
                width: 100%; margin-top: 14px; padding: 12px;
                background: #38bdf8; border: none; border-radius: 12px;
                color: #0a0e1a; font-size: 0.95rem; font-weight: 700; cursor: pointer;
            ">ابدأ المراجعة</button>
            <button id="backToMenuBtn" style="
                width: 100%; margin-top: 6px; padding: 6px;
                background: transparent; border: 1px solid #334155; border-radius: 12px;
                color: #94a3b8; font-size: 0.75rem; cursor: pointer;
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
                const firstSection = Object.keys(plan.grouped)[0];
                if (firstSection) {
                    const teil = window.teile?.find(t => t.name === firstSection);
                    if (teil && typeof window.renderExamListForSkill === 'function') {
                        window.renderExamListForSkill(teil.skill, teil.name);
                        document.getElementById('home')?.classList.remove('active');
                        document.getElementById('exam')?.classList.remove('active');
                        document.getElementById('list')?.classList.add('active');
                    } else {
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

    // ============================================
    // القوائم (DatePicker, MainMenu, SectionPicker)
    // ============================================

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
            showThinkingScreen(null);
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
                showThinkingScreen(selectedId);
            }
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) { overlay.remove(); showMainMenu(); }
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
            console.log('✅ المدرب الذكي TELC B2 جاهز (الإصدار 10.0 - إعادة الحساب الكامل + شاشة التفكير)');
        } else {
            console.warn('⚠️ الزر studyPlannerBtn غير موجود.');
        }
    });

    window.StudyPlannerEngine = StudyPlannerEngine;

})();
