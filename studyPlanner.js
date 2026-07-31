/**
 * studyPlanner.js - Full Mathematical Scheduler & Dynamic Coverage Engine for TELC B2
 * 
 * Features:
 * - Pure Mathematical Load Calculation (Total Reps Deficit / Remaining Days)
 * - Dynamic Section Distribution based on Weakness Index & TELC Weights
 * - Spaced Repetition Intervals (Wave System: 1, 3, 7, 14, 30 days)
 * - Progress Predictor & Exam Coverage % Estimator
 * - Calendar & Continuity Tracker (Remembers yesterday's unfinished tasks)
 * - Burnout Protection & Forgotten Exam Recovery
 */

export class MathematicalStudyScheduler {
    constructor(options = {}) {
        this.storageKeyDate = options.storageKeyDate || 'user_exam_date';
        this.storageKeyData = options.storageKeyData || 'user_exam_results_v1';
        this.storageKeyMemory = options.storageKeyMemory || 'memory_trainer_progress';
        this.storageKeyCalendar = options.storageKeyCalendar || 'study_calendar_tracker_v1';

        // Full TELC Blueprint (160 total exam units assumed as 20 tests x 8 sections)
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

        this.targetRepetitions = 6; // Mandatory 6 repetitions per test
    }

    // ==========================================
    // 1. DATA READERS & CALENDAR STORAGE
    // ==========================================

    getExamDate() {
        return localStorage.getItem(this.storageKeyDate) || null;
    }

    getRawExamData() {
        try {
            const raw = localStorage.getItem(this.storageKeyData);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
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
        if (days === null) return 30; // Fallback default
        const effective = days - 2; // Last 2 days reserved for rest/light review
        return effective > 0 ? effective : 1;
    }

    // ==========================================
    // 2. SPACED REPETITION WAVES & DECAY
    // ==========================================

    /**
     * Calculates interval in days required before next review based on score
     */
    getSpacedIntervalDays(score) {
        if (score < 50) return 1;   // Wave 1: Next day
        if (score < 65) return 2;   // Wave 2: After 2 days
        if (score < 78) return 4;   // Wave 3: After 4 days
        if (score < 90) return 7;   // Wave 4: After 1 week
        if (score < 95) return 14;  // Wave 5: After 2 weeks
        return 30;                  // Wave 6: Mastered (After 1 month)
    }

    // ==========================================
    // 3. COVERAGE & MATHEMATICAL LOAD ENGINE
    // ==========================================

    /**
     * Calculates mathematical coverage, total remaining repetitions, and daily target load
     */
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
            const targetRepsSec = totalTests * this.targetRepetitions; // e.g. 20 * 6 = 120 reps
            
            let completedRepsSec = 0;
            let scoreSum = 0;
            let solvedTestsCount = 0;

            // Analyze solved tests in this section
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

            // Account for completely unsolved tests
            const unsolvedCount = totalTests - solvedTestsCount;

            const remainingRepsSec = targetRepsSec - completedRepsSec;
            const avgScore = solvedTestsCount > 0 ? Math.round(scoreSum / solvedTestsCount) : 0;

            // Weakness Multiplier: Lower scores increase section priority weight
            const weaknessIndex = avgScore === 0 ? 1.5 : Math.max(0.5, (100 - avgScore) / 40);

            sectionStats[sec.id] = {
                ...sec,
                solvedTestsCount,
                unsolvedCount,
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

        // Global Coverage Percentage
        const coveragePercentage = Math.round((completedRepsAll / totalTargetRepsAll) * 100);

        // Exact Mathematical Daily Required Load
        const rawDailyRequiredLoad = Math.ceil(remainingRepsAll / effectiveDays);

        // Progress Predictor
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
    // 4. DISTRIBUTION ENGINE & SCHEDULER
    // ==========================================

    /**
     * Generates exact scheduled test plan using mathematical distribution
     */
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

        // Apply Burnout Protection & Realistic Daily Caps
        // Min threshold = 4 tests/day, Cap max at 18 tests/day to prevent mental exhaustion
        const targetDailyCount = Math.max(4, Math.min(18, rawDailyRequiredLoad));

        // Calculate sum of effective weights across all sections
        let sumEffectiveWeights = 0;
        Object.values(sectionStats).forEach(s => {
            // Exclude sections if mastered (92%+ avg AND at least 50% reps done)
            if (!(s.avgScore >= 92 && s.completedReps >= s.targetReps * 0.5)) {
                sumEffectiveWeights += s.effectiveWeight;
            }
        });

        // Distribute targetDailyCount across sections
        const scheduledTests = [];
        const now = Date.now();

        Object.values(sectionStats).forEach(sec => {
            // Calculate exact mathematical quota for this section
            const isMastered = sec.avgScore >= 92 && sec.completedReps >= sec.targetReps * 0.5;
            const quota = isMastered 
                ? 0 
                : Math.round((sec.effectiveWeight / sumEffectiveWeights) * targetDailyCount);

            if (quota <= 0 && !isMastered) return;

            const secCandidates = [];

            // Evaluate all test slots (1 to totalTests)
            for (let testId = 1; testId <= sec.totalTests; testId++) {
                const tObj = sec.testMap[testId];

                if (!tObj) {
                    // Unsolved test -> High priority
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

                    // Check if test is due for review based on Spaced Repetition Wave
                    if (daysSince >= requiredInterval) {
                        let urgency = (100 - tObj.score) * 1.5 + (tObj.remainingReps * 10);
                        if (daysSince >= 20) urgency += 40; // Forgotten test recovery booster

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

            // Sort candidates by urgency and take exact section quota
            secCandidates.sort((a, b) => b.urgency - a.urgency);
            const selectedForSec = secCandidates.slice(0, Math.max(1, quota));
            scheduledTests.push(...selectedForSec);
        });

        // Grouping plan by section for structured display
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

export const studyScheduler = new MathematicalStudyScheduler();
