// ============================================
// studyPlanner.js - المدرب الذكي (Smart Study Planner)
// الإصدار 3.0 - النظام الديناميكي الكامل
// ============================================

(function() {
    "use strict";

    // ============================================
    // 1. الإعدادات الأساسية
    // ============================================

    const PLANNER_KEY = 'studyPlannerData';
    const EXAM_DATE_KEY = 'examDate';
    const DYNAMIC_WEIGHTS_KEY = 'dynamic_weights';
    const COMPLETED_TODAY_KEY = 'completed_today';
    const DAILY_GOAL_KEY = 'daily_goal';

    const CONFIG = {
        // فترات المراجعة حسب النتيجة (Spaced Repetition)
        reviewIntervals: {
            mastered: 14,    // ≥ 90%
            good: 7,         // ≥ 75%
            medium: 4,       // ≥ 60%
            low: 2,          // ≥ 40%
            veryLow: 1       // < 40%
        },
        // الحد الأقصى للامتحانات اليومية
        maxDailyExams: 10,
        // الأوزان الثابتة للأجزاء (تستخدم كقاعدة)
        defaultWeights: {
            hoeren1: 10, hoeren2: 10, hoeren3: 10,
            lesen1: 10, lesen2: 10, lesen3: 7,
            sprach1: 5, sprach2: 3
        },
        // الأجزاء النشطة
        activeSkills: ['hoeren1', 'hoeren2', 'hoeren3', 'lesen1', 'lesen2', 'lesen3', 'sprach1', 'sprach2']
    };

    // ============================================
    // 2. دوال التخزين (Storage)
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

    function getDynamicWeights() {
        try {
            const raw = localStorage.getItem(DYNAMIC_WEIGHTS_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }

    function saveDynamicWeights(weights) {
        try {
            localStorage.setItem(DYNAMIC_WEIGHTS_KEY, JSON.stringify(weights));
        } catch (e) { /* ignore */ }
    }

    function getTodayCompleted() {
        const today = new Date().toISOString().slice(0, 10);
        try {
            const raw = localStorage.getItem(COMPLETED_TODAY_KEY);
            const data = raw ? JSON.parse(raw) : {};
            return data[today] || 0;
        } catch (e) { return 0; }
    }

    function incrementTodayCompleted() {
        const today = new Date().toISOString().slice(0, 10);
        try {
            const raw = localStorage.getItem(COMPLETED_TODAY_KEY);
            const data = raw ? JSON.parse(raw) : {};
            data[today] = (data[today] || 0) + 1;
            localStorage.setItem(COMPLETED_TODAY_KEY, JSON.stringify(data));
        } catch (e) { /* ignore */ }
    }

    function resetTodayCompleted() {
        const today = new Date().toISOString().slice(0, 10);
        try {
            const raw = localStorage.getItem(COMPLETED_TODAY_KEY);
            const data = raw ? JSON.parse(raw) : {};
            delete data[today];
            localStorage.setItem(COMPLETED_TODAY_KEY, JSON.stringify(data));
        } catch (e) { /* ignore */ }
    }

    function getDailyGoal() {
        try {
            const raw = localStorage.getItem(DAILY_GOAL_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function saveDailyGoal(goal) {
        try {
            localStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(goal));
        } catch (e) { /* ignore */ }
    }

    // ============================================
    // 3. تحليل متقدم للمستخدم
    // ============================================

    function analyzeUserProgress() {
        const examDate = getExamDate();
        const result = {
            examDate: examDate,
            daysRemaining: null,
            sections: {},
            totalExamsCompleted: 0,
            averageScore: 0,
            totalRetries: 0,
            overallProgress: 0,
            stability: 0,       // الانحراف المعياري (كلما قل، كان أفضل)
            volatility: 0,      // الفرق بين أعلى وأدنى درجة
            trend: 0,           // ميل المنحنى (موجب = تحسن)
            masteredSections: [],
            weakSections: [],
            summary: {}
        };

        // حساب الأيام المتبقية
        if (examDate) {
            const today = new Date();
            const exam = new Date(examDate);
            const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
            result.daysRemaining = diff > 0 ? diff : 0;
        }

        const skills = CONFIG.activeSkills;
        let totalScoreSum = 0, totalScoreCount = 0, totalRetriesSum = 0;
        let allScores = [];

        // تحليل كل جزء
        skills.forEach(skill => {
            const sectionData = {
                exams: [],
                scores: [],
                average: 0,
                lastReviewDays: null,
                retryCount: 0,
                progress: 0,
                priority: 0,
                completedExams: 0,
                totalExams: 0,
                stability: 0,
                volatility: 0,
                trend: 0,
                isMastered: false,
                needsReview: false,
                recentScores: []
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
                    allScores.push(result);
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

            // المتوسط
            if (examScores.length > 0) {
                sectionData.average = examScores.reduce((a, b) => a + b, 0) / examScores.length;
                sectionData.scores = examScores.slice();
                // آخر 10 نتائج للتحليل
                sectionData.recentScores = examScores.slice(-10);
                // حساب الاستقرار (الانحراف المعياري)
                sectionData.stability = calculateStability(examScores);
                // حساب التذبذب (الفرق بين الأعلى والأدنى)
                sectionData.volatility = Math.max(...examScores) - Math.min(...examScores);
                // حساب المنحنى (الاتجاه)
                sectionData.trend = calculateTrend(examScores);
            }

            if (lastReviewTimestamp !== null) {
                sectionData.lastReviewDays = lastReviewTimestamp;
            }
            sectionData.retryCount = totalRetries;
            sectionData.progress = sectionData.totalExams > 0 ? (sectionData.completedExams / sectionData.totalExams) * 100 : 0;

            // تحديد إذا كان الجزء متقناً (آخر 15 امتحان > 90%)
            const recent15 = examScores.slice(-15);
            sectionData.isMastered = recent15.length >= 15 && recent15.every(s => s >= 90);

            // يحتاج مراجعة إذا كان المتوسط < 60 أو آخر مراجعة > 10 أيام
            sectionData.needsReview = sectionData.average < 60 || (sectionData.lastReviewDays !== null && sectionData.lastReviewDays > 10);

            result.sections[skill] = sectionData;
        });

        // الإحصائيات العامة
        result.totalExamsCompleted = totalScoreCount;
        result.averageScore = totalScoreCount > 0 ? totalScoreSum / totalScoreCount : 0;
        result.totalRetries = totalRetriesSum;

        // التقدم الكلي
        let totalProgress = 0, count = 0;
        skills.forEach(skill => {
            if (result.sections[skill]) {
                totalProgress += result.sections[skill].progress;
                count++;
            }
        });
        result.overallProgress = count > 0 ? totalProgress / count : 0;

        // الاستقرار الكلي (متوسط استقرار الأجزاء)
        let totalStability = 0, stabilityCount = 0;
        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (sec && sec.stability > 0) {
                totalStability += sec.stability;
                stabilityCount++;
            }
        });
        result.stability = stabilityCount > 0 ? totalStability / stabilityCount : 0;

        // التذبذب الكلي
        let totalVolatility = 0, volCount = 0;
        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (sec && sec.volatility > 0) {
                totalVolatility += sec.volatility;
                volCount++;
            }
        });
        result.volatility = volCount > 0 ? totalVolatility / volCount : 0;

        // المنحنى الكلي (متوسط الاتجاه)
        let totalTrend = 0, trendCount = 0;
        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (sec && sec.trend !== 0) {
                totalTrend += sec.trend;
                trendCount++;
            }
        });
        result.trend = trendCount > 0 ? totalTrend / trendCount : 0;

        // الأجزاء المتقنة والضعيفة
        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (sec) {
                if (sec.isMastered) result.masteredSections.push(skill);
                if (sec.needsReview) result.weakSections.push(skill);
            }
        });

        // ===== حساب الأولويات المتقدمة =====
        const dynamicWeights = getDynamicWeights();

        skills.forEach(skill => {
            const sec = result.sections[skill];
            if (!sec) return;

            // 1. عامل الدرجات (40%) - مع الأخذ بالاعتبار التذبذب
            let scoreFactor = 0;
            if (sec.average > 0) {
                // نضيف عامل التذبذب: إذا كان التذبذب عالياً، نزيد الأولوية
                const volatilityPenalty = Math.min(10, sec.volatility / 2);
                scoreFactor = Math.max(0, (100 - sec.average) / 100 * 40) + volatilityPenalty;
            } else {
                scoreFactor = 40;
            }
            scoreFactor = Math.min(40, scoreFactor);

            // 2. عامل المراجعة (20%) - مع الأخذ بالاعتبار Spaced Repetition
            let reviewFactor = 0;
            if (sec.lastReviewDays !== null) {
                // كلما كانت المراجعة أقدم، زادت الأولوية (بحد أقصى 20)
                reviewFactor = Math.min(20, sec.lastReviewDays * 1.5);
            } else {
                reviewFactor = 20;
            }

            // 3. عامل الإعادات (15%)
            let retryFactor = 0;
            if (sec.retryCount > 0) {
                retryFactor = Math.min(15, sec.retryCount * 2.5);
            }

            // 4. عامل التقدم (10%)
            let progressFactor = 0;
            if (sec.progress > 0) {
                progressFactor = Math.max(0, (100 - sec.progress) / 100 * 10);
            } else {
                progressFactor = 10;
            }

            // 5. عامل المنحنى (5%) - إذا كان يتراجع، نزيد الأولوية
            let trendFactor = 0;
            if (sec.trend < -0.5) {
                trendFactor = 5;
            } else if (sec.trend > 0.5) {
                trendFactor = 0;
            } else {
                trendFactor = 2.5;
            }

            // 6. عامل الوزن الديناميكي (10%) - يتكيف مع أداء المستخدم
            const baseWeight = CONFIG.defaultWeights[skill] || 5;
            const dynamicWeight = dynamicWeights[skill] || baseWeight;
            const weightFactor = (Math.min(15, dynamicWeight) / 10) * 10;

            // المجموع النهائي (0-100)
            let priority = Math.round(scoreFactor + reviewFactor + retryFactor + progressFactor + trendFactor + weightFactor);
            sec.priority = Math.min(100, Math.max(0, priority));

            // تخزين المعلومات للعرض
            result.summary[skill] = {
                average: sec.average,
                progress: sec.progress,
                priority: sec.priority,
                lastReview: sec.lastReviewDays !== null ? sec.lastReviewDays : 'لم يراجع',
                stability: sec.stability,
                volatility: sec.volatility,
                trend: sec.trend,
                isMastered: sec.isMastered,
                needsReview: sec.needsReview,
                // أسباب الأولوية
                reasons: {
                    score: Math.round(scoreFactor),
                    review: Math.round(reviewFactor),
                    retry: Math.round(retryFactor),
                    progress: Math.round(progressFactor),
                    trend: Math.round(trendFactor),
                    weight: Math.round(weightFactor)
                }
            };
        });

        return result;
    }

    // ===== دوال إحصائية مساعدة =====

    function calculateStability(scores) {
        if (scores.length < 2) return 0;
        const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
        const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
        return Math.sqrt(variance);
    }

    function calculateTrend(scores) {
        if (scores.length < 3) return 0;
        // الانحدار الخطي البسيط
        const n = scores.length;
        const indices = scores.map((_, i) => i);
        const sumX = indices.reduce((a, b) => a + b, 0);
        const sumY = scores.reduce((a, b) => a + b, 0);
        const sumXY = indices.reduce((a, b, i) => a + b * scores[i], 0);
        const sumX2 = indices.reduce((a, b) => a + b * b, 0);
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        return slope;
    }

    // ============================================
    // 4. توليد الخطة الذكية
    // ============================================

    function generateDailyPlan(analysis) {
        if (!analysis) return null;

        const plan = {
            date: new Date().toISOString().slice(0, 10),
            daysRemaining: analysis.daysRemaining,
            overallProgress: analysis.overallProgress,
            stability: analysis.stability,
            volatility: analysis.volatility,
            trend: analysis.trend,
            masteredSections: analysis.masteredSections || [],
            weakSections: analysis.weakSections || [],
            sections: [],
            totalExams: 0,
            estimatedTime: 0,
            message: '',
            warnings: [],
            dailyGoal: null,
            tips: []
        };

        // التحقق من وجود تاريخ
        if (!analysis.daysRemaining || analysis.daysRemaining <= 0) {
            plan.message = '📅 يرجى تحديد تاريخ الامتحان في الإعدادات للحصول على خطة يومية دقيقة.';
            return plan;
        }

        // ===== حساب السعة اليومية =====
        let dailyCapacity = getDailyCapacity(analysis);

        // التحقق من الإرهاق
        const todayCompleted = getTodayCompleted();
        if (todayCompleted >= CONFIG.maxDailyExams) {
            plan.message = `😊 أحسنت! لقد أنهيت ${todayCompleted} امتحاناً اليوم. خذ راحة الآن، راجع فقط المفردات.`;
            plan.tips.push('🛑 توقف عن حل الامتحانات اليوم، ركز على المراجعة الخفيفة.');
            return plan;
        }

        // تعديل السعة إذا كان اليوم متعباً
        if (todayCompleted > 5) {
            dailyCapacity = Math.min(dailyCapacity, CONFIG.maxDailyExams - todayCompleted);
            plan.tips.push(`⏳ أنجزت ${todayCompleted} امتحاناً اليوم، خذ استراحة بين كل امتحان.`);
        }

        // ===== تحديد الأجزاء المستهدفة =====
        const skills = CONFIG.activeSkills;
        const sortedSkills = skills.slice().sort((a, b) => {
            const pA = analysis.sections[a]?.priority || 0;
            const pB = analysis.sections[b]?.priority || 0;
            return pB - pA;
        });

        // ===== توزيع الامتحانات بين الأجزاء =====
        const selectedExams = {};
        let totalSelected = 0;

        // 1. أولوية للأجزاء الضعيفة (priority > 70)
        const weakSkills = sortedSkills.filter(s => (analysis.sections[s]?.priority || 0) > 70);
        const mediumSkills = sortedSkills.filter(s => {
            const p = analysis.sections[s]?.priority || 0;
            return p > 40 && p <= 70;
        });
        const strongSkills = sortedSkills.filter(s => (analysis.sections[s]?.priority || 0) <= 40);

        // توزيع: 50% للأجزاء الضعيفة، 30% للمتوسطة، 20% للقوية
        const weakCount = Math.min(weakSkills.length, Math.ceil(dailyCapacity * 0.5));
        const mediumCount = Math.min(mediumSkills.length, Math.ceil(dailyCapacity * 0.3));
        const strongCount = Math.min(strongSkills.length, Math.ceil(dailyCapacity * 0.2));

        const distribution = [
            ...weakSkills.slice(0, weakCount).map(s => ({ skill: s, priority: 'high' })),
            ...mediumSkills.slice(0, mediumCount).map(s => ({ skill: s, priority: 'medium' })),
            ...strongSkills.slice(0, strongCount).map(s => ({ skill: s, priority: 'low' }))
        ];

        // خلط الترتيب قليلاً لضمان التنوع
        distribution.sort((a, b) => {
            if (a.priority === b.priority) return Math.random() - 0.5;
            return a.priority === 'high' ? -1 : (a.priority === 'medium' ? -1 : 1);
        });

        for (const entry of distribution) {
            if (totalSelected >= dailyCapacity) break;
            const skill = entry.skill;
            const sec = analysis.sections[skill];
            if (!sec) continue;

            // تحديد عدد الامتحانات من هذا الجزء
            let count = 1;
            if (entry.priority === 'high') count = 2;
            if (entry.priority === 'high' && sec.priority > 85) count = 3;
            if (analysis.daysRemaining < 10) count = Math.min(count + 1, 3);

            // إذا كان الجزء متقناً، نعطي امتحان مراجعة واحد فقط
            if (sec.isMastered) {
                count = 1;
            }

            // اختيار الامتحانات المناسبة
            const availableExams = window.examsDatabase && window.examsDatabase[skill] ? window.examsDatabase[skill] : [];
            const examIds = availableExams.map(e => e.id);

            // ترتيب الامتحانات حسب الأولوية: الأضعف أولاً، ثم الأقدم
            const sortedExams = examIds.slice().sort((a, b) => {
                const aResult = window.getExamResult ? window.getExamResult(skill, a) : null;
                const bResult = window.getExamResult ? window.getExamResult(skill, b) : null;
                const aRetry = window.getRetryCount ? window.getRetryCount(skill, a) : 0;
                const bRetry = window.getRetryCount ? window.getRetryCount(skill, b) : 0;
                // إذا لم تكن هناك نتيجة، أولوية عالية
                if (aResult === null && bResult !== null) return -1;
                if (bResult === null && aResult !== null) return 1;
                // إذا كانت النتيجة موجودة، الأقل أولاً
                if (aResult !== null && bResult !== null) return aResult - bResult;
                // إذا كانت النتيجة متساوية، الأكثر إعادة أولاً
                return bRetry - aRetry;
            });

            // اختيار الامتحانات مع تجنب التكرار
            let selected = 0;
            const skillExams = [];
            for (const id of sortedExams) {
                if (selected >= count) break;
                // تجنب الامتحانات التي تم اختيارها مسبقاً في هذا الجزء
                if (!selectedExams[skill]) selectedExams[skill] = [];
                if (!selectedExams[skill].includes(id)) {
                    // التحقق من Spaced Repetition: إذا كان الامتحان متقناً (نتيجة > 90%) ولا يحتاج مراجعة
                    const score = window.getExamResult ? window.getExamResult(skill, id) : null;
                    const lastReview = window.getLastReviewDate ? window.getLastReviewDate(skill, id) : null;
                    if (score !== null && score >= 90) {
                        // التحقق من أن المراجعة ليست قريبة جداً
                        let daysSince = 999;
                        if (lastReview) {
                            daysSince = Math.floor((Date.now() - new Date(lastReview)) / (1000 * 60 * 60 * 24));
                        }
                        // إذا كانت المراجعة قريبة (أقل من 7 أيام) والجزء متقن، نتجاوز
                        if (daysSince < 7 && sec.isMastered) continue;
                    }
                    selectedExams[skill].push(id);
                    selected++;
                    totalSelected++;
                    // تخزين سبب اختيار هذا الامتحان
                    skillExams.push({
                        id: id,
                        reason: getExamReason(skill, id, analysis)
                    });
                }
            }

            // تخزين الامتحانات المختارة مع الأسباب
            if (skillExams.length > 0) {
                plan.sections.push({
                    skill: skill,
                    exams: skillExams,
                    count: skillExams.length,
                    priority: sec.priority,
                    isMastered: sec.isMastered
                });
            }
        }

        // ===== إذا لم يتم اختيار أي امتحان =====
        if (plan.sections.length === 0) {
            plan.message = '🎉 مبروك! يبدو أنك أنهيت جميع الامتحانات أو أن مستواك ممتاز. ركز على المراجعة الخفيفة.';
            return plan;
        }

        // ===== حساب الوقت المتوقع =====
        plan.totalExams = plan.sections.reduce((sum, s) => sum + s.exams.length, 0);
        plan.estimatedTime = plan.totalExams * 15;

        // ===== تحديد هدف اليوم =====
        const dailyGoal = calculateDailyGoal(analysis);
        if (dailyGoal) {
            plan.dailyGoal = dailyGoal;
            plan.message = `🎯 هدف اليوم: رفع ${dailyGoal.section} من ${Math.round(dailyGoal.from)}% إلى ${Math.round(dailyGoal.to)}%`;
        } else {
            plan.message = `📋 خطة اليوم: ${plan.totalExams} امتحان${plan.totalExams > 1 ? 'ات' : ''} (حوالي ${Math.ceil(plan.estimatedTime / 60)} ساعة و ${plan.estimatedTime % 60} دقيقة).`;
        }

        // ===== إضافة تحذيرات =====
        for (const skill of CONFIG.activeSkills) {
            const sec = analysis.sections[skill];
            if (sec && sec.lastReviewDays !== null && sec.lastReviewDays > 14) {
                plan.warnings.push(`⚠️ ${skill} لم تراجع منذ ${sec.lastReviewDays} يوماً، أنصح بمراجعته قريباً.`);
            }
            if (sec && sec.isMastered) {
                plan.tips.push(`✅ ${skill} متقن (${Math.round(sec.average)}%)، يكفي مراجعة أسبوعية.`);
            }
            if (sec && sec.trend < -1) {
                plan.warnings.push(`📉 ${skill} يتراجع! آخر امتحانات: ${sec.recentScores.slice(-3).join(' → ')}. ركز عليه اليوم.`);
            }
        }

        // ===== نصائح إضافية =====
        if (analysis.daysRemaining < 10) {
            plan.tips.push('⏰ تبقى أقل من 10 أيام! ركز على المراجعة المكثفة.');
        }
        if (analysis.overallProgress > 80) {
            plan.tips.push('🌟 مستواك ممتاز! استمر بنفس الوتيرة.');
        } else if (analysis.overallProgress < 40) {
            plan.tips.push('💪 تحتاج إلى المزيد من الجهد! اتبع الخطة بدقة.');
        }

        return plan;
    }

    // ===== دالة حساب السعة اليومية =====

    function getDailyCapacity(analysis) {
        const days = analysis.daysRemaining || 30;
        const progress = analysis.overallProgress || 0;
        const weakCount = analysis.weakSections ? analysis.weakSections.length : 0;

        let base = 4;
        // تعديل حسب الأيام المتبقية
        if (days < 5) base = 6;
        else if (days < 10) base = 5;
        else if (days < 20) base = 4;
        else if (days < 40) base = 3;
        else base = 2;

        // تعديل حسب التقدم
        if (progress > 80) base = Math.max(2, base - 1);
        else if (progress < 40) base = Math.min(8, base + 2);

        // تعديل حسب الأجزاء الضعيفة
        if (weakCount > 3) base = Math.min(8, base + 1);

        // الحد الأقصى
        return Math.min(CONFIG.maxDailyExams, Math.max(1, base));
    }

    // ===== دالة حساب الهدف اليومي =====

    function calculateDailyGoal(analysis) {
        const weakSections = analysis.weakSections || [];
        if (weakSections.length === 0) return null;

        // أضعف جزء
        const weakest = weakSections[0];
        const sec = analysis.sections[weakest];
        if (!sec || sec.average === 0) return null;

        const current = sec.average;
        const target = Math.min(100, current + 5);

        return {
            section: weakest,
            from: current,
            to: target
        };
    }

    // ===== دالة إعطاء سبب اختيار الامتحان =====

    function getExamReason(skill, examId, analysis) {
        const reasons = [];
        const result = window.getExamResult ? window.getExamResult(skill, examId) : null;
        const retries = window.getRetryCount ? window.getRetryCount(skill, examId) : 0;
        const progress = window.getExamProgress ? window.getExamProgress(skill, examId) : 0;
        const lastReview = window.getLastReviewDate ? window.getLastReviewDate(skill, examId) : null;

        if (result !== null) {
            if (result < 50) reasons.push(`نتيجتك منخفضة (${Math.round(result)}%)`);
            else if (result < 70) reasons.push(`نتيجتك متوسطة (${Math.round(result)}%)، تحتاج تحسيناً`);
            else if (result < 90) reasons.push(`نتيجتك جيدة (${Math.round(result)}%)، لكن يمكن تحسينها`);
            else reasons.push(`نتيجتك ممتازة (${Math.round(result)}%)، مراجعة خفيفة`);
        } else {
            reasons.push('لم تحل هذا الامتحان بعد');
        }

        if (lastReview) {
            const days = Math.floor((Date.now() - new Date(lastReview)) / (1000 * 60 * 60 * 24));
            if (days > 14) reasons.push(`لم تراجعه منذ ${days} يوماً`);
            else if (days > 7) reasons.push(`مراجعة منذ ${days} يوماً`);
        }

        if (retries > 2) reasons.push(`أعدته ${retries} مرات، يحتاج تركيزاً`);

        if (progress > 0 && progress < 50) reasons.push(`تقدمك في هذا الجزء منخفض (${Math.round(progress)}%)`);

        return reasons.join(' ⬅ ');
    }

    // ============================================
    // 5. تحديث الأوزان الديناميكية
    // ============================================

    function updateDynamicWeights(analysis) {
        const weights = getDynamicWeights();
        const skills = CONFIG.activeSkills;

        skills.forEach(skill => {
            const sec = analysis.sections[skill];
            if (!sec) return;

            const baseWeight = CONFIG.defaultWeights[skill] || 5;
            let currentWeight = weights[skill] || baseWeight;

            // إذا كان الجزء ضعيفاً (متوسط < 50 أو تذبذب عالٍ)، نزيد الوزن
            if (sec.average < 50 || sec.volatility > 30) {
                currentWeight = Math.min(15, currentWeight + 1);
            }
            // إذا كان الجزء متقناً (متوسط > 85 ومستقر)، نخفض الوزن
            else if (sec.average > 85 && sec.stability < 10) {
                currentWeight = Math.max(1, currentWeight - 1);
            }
            // إذا كان المستخدم يتحسن بسرعة، نخفض الوزن قليلاً
            else if (sec.trend > 1) {
                currentWeight = Math.max(1, currentWeight - 0.5);
            }
            // إذا كان يتراجع، نزيد الوزن
            else if (sec.trend < -1) {
                currentWeight = Math.min(15, currentWeight + 0.5);
            }

            weights[skill] = Math.round(currentWeight);
        });

        saveDynamicWeights(weights);
    }

    // ============================================
    // 6. دوال عرض واجهة المستخدم
    // ============================================

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

        const saveBtn = document.getElementById('plannerSaveDateBtn');
        const cancelBtn = document.getElementById('plannerCancelDateBtn');
        const dateInput = document.getElementById('plannerExamDate');

        saveBtn.addEventListener('click', () => {
            const selectedDate = dateInput.value;
            if (selectedDate) {
                setExamDate(selectedDate);
                overlay.remove();
                showLoadingAndPlan();
            } else {
                showSimpleMessage('⚠️ يرجى اختيار تاريخ صحيح.', 'error');
            }
        });

        cancelBtn.addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

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

        setTimeout(() => {
            overlay.remove();
            let cached = getPlannerData();
            let analysis = null, plan = null;

            if (cached && cached.analysis && cached.plan) {
                analysis = cached.analysis;
                plan = cached.plan;
            } else {
                analysis = analyzeUserProgress();
                if (analysis) {
                    // تحديث الأوزان الديناميكية
                    updateDynamicWeights(analysis);
                    plan = generateDailyPlan(analysis);
                    savePlannerData({ analysis, plan });
                }
            }

            if (plan) {
                renderPlan(plan, true);
            } else {
                showSimpleMessage('⚠️ تعذر إنشاء الخطة، حاول مرة أخرى.', 'error');
            }
        }, 500);
    }

    function renderPlan(plan, showChangeDate = false) {
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
                <h2 style="margin: 0; font-size: 1.4rem; color: #38bdf8;">🎯 المدرب الذكي</h2>
                <button id="closePlannerBtn" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">✕</button>
            </div>
        `;

        // الأيام المتبقية
        if (plan.daysRemaining !== null && plan.daysRemaining > 0) {
            html += `
                <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.9rem; color: #94a3b8;">📅 تبقى حتى الامتحان:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; color: #38bdf8;">${plan.daysRemaining} يوم</span>
                </div>
            `;
        }

        // التقدم الكلي + الاستقرار
        const stabilityLabel = plan.stability < 10 ? 'مستقر ✅' : (plan.stability < 20 ? 'متوسط التذبذب' : 'غير مستقر ⚠️');
        const trendLabel = plan.trend > 1 ? 'يتحسن بسرعة 📈' : (plan.trend > 0.5 ? 'يتحسن تدريجياً' : (plan.trend > -0.5 ? 'ثابت' : 'يتراجع 📉'));

        html += `
            <div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.9rem; color: #94a3b8;">📊 جاهزيتك الحالية:</span>
                    <span style="font-size: 1.2rem; font-weight: 700; color: #4ade80;">${Math.round(plan.overallProgress)}%</span>
                </div>
                <div style="width: 100%; height: 6px; background: #2a3042; border-radius: 6px; margin-top: 6px;">
                    <div style="width: ${plan.overallProgress}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 6px;"></div>
                </div>
                <div style="display: flex; gap: 16px; margin-top: 8px; font-size: 0.7rem; color: #94a3b8;">
                    <span>🔄 ${stabilityLabel}</span>
                    <span>📈 ${trendLabel}</span>
                    ${plan.masteredSections && plan.masteredSections.length > 0 ? `<span>⭐ متقن: ${plan.masteredSections.length}</span>` : ''}
                </div>
            </div>
        `;

        // الأجزاء الضعيفة
        if (plan.weakSections && plan.weakSections.length > 0) {
            html += `
                <div style="background: rgba(251, 191, 36, 0.1); border-radius: 12px; padding: 8px 14px; margin-bottom: 12px; border: 1px solid #fbbf24;">
                    <span style="font-size: 0.8rem; color: #fbbf24;">⚠️ يحتاج تركيزاً: ${plan.weakSections.join('، ')}</span>
                </div>
            `;
        }

        // هدف اليوم
        if (plan.dailyGoal) {
            const goal = plan.dailyGoal;
            html += `
                <div style="background: rgba(56, 189, 248, 0.08); border-radius: 12px; padding: 10px 14px; margin-bottom: 14px; border: 1px solid rgba(56, 189, 248, 0.2);">
                    <div style="font-size: 0.9rem; color: #38bdf8; font-weight: 600;">🎯 هدف اليوم:</div>
                    <div style="font-size: 1rem; color: #f1f5f9; margin-top: 4px;">رفع ${goal.section} من <strong>${Math.round(goal.from)}%</strong> إلى <strong>${Math.round(goal.to)}%</strong></div>
                </div>
            `;
        } else if (plan.message) {
            html += `
                <div style="background: rgba(56, 189, 248, 0.06); border-radius: 12px; padding: 8px 14px; margin-bottom: 12px; color: #cbd5e1; font-size: 0.9rem; text-align: center;">
                    ${plan.message}
                </div>
            `;
        }

        // قائمة الامتحانات مع الأسباب
        if (plan.sections && plan.sections.length > 0) {
            html += `<div style="margin: 12px 0 8px 0; font-size: 0.95rem; font-weight: 600; color: #f1f5f9;">📋 خطة اليوم (${plan.totalExams} امتحان):</div>`;

            plan.sections.forEach(section => {
                const skillName = section.skill;
                const examsHtml = section.exams.map(exam => {
                    const reasonText = exam.reason || 'تحتاج إلى مراجعة';
                    return `<div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px; padding-right: 12px;">• امتحان ${exam.id} ⬅ ${reasonText}</div>`;
                }).join('');

                const masteredBadge = section.isMastered ? '<span style="font-size: 0.6rem; color: #4ade80; background: rgba(74, 222, 128, 0.15); padding: 2px 8px; border-radius: 12px;">متقن</span>' : '';

                html += `
                    <div style="background: #0f1421; border-radius: 12px; padding: 10px 14px; margin-bottom: 8px; border-right: 3px solid ${section.isMastered ? '#4ade80' : '#38bdf8'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 500; color: #f1f5f9;">
                            <span>${skillName} ${masteredBadge}</span>
                            <span style="font-size: 0.7rem; color: #94a3b8;">أولوية: ${section.priority}%</span>
                        </div>
                        <div style="margin-top: 6px;">
                            ${examsHtml}
                        </div>
                    </div>
                `;
            });

            html += `
                <div style="margin-top: 10px; font-size: 0.8rem; color: #94a3b8; display: flex; gap: 16px; flex-wrap: wrap;">
                    <span>⏱️ المدة المتوقعة: ${Math.ceil(plan.estimatedTime / 60)} ساعة و ${plan.estimatedTime % 60} دقيقة</span>
                    <span>📝 ${plan.totalExams} امتحان${plan.totalExams > 1 ? 'ات' : ''}</span>
                </div>
            `;
        }

        // النصائح
        if (plan.tips && plan.tips.length > 0) {
            html += `<div style="margin-top: 14px; padding: 10px 14px; background: rgba(56, 189, 248, 0.06); border-radius: 12px;">`;
            plan.tips.forEach(tip => {
                html += `<div style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 4px;">💡 ${tip}</div>`;
            });
            html += `</div>`;
        }

        // التحذيرات
        if (plan.warnings && plan.warnings.length > 0) {
            html += `<div style="margin-top: 12px; padding: 10px 14px; background: rgba(251, 191, 36, 0.1); border-radius: 12px; border: 1px solid #fbbf24;">`;
            plan.warnings.forEach(w => {
                html += `<div style="font-size: 0.8rem; color: #fbbf24; margin-bottom: 4px;">${w}</div>`;
            });
            html += `</div>`;
        }

        // أزرار
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
    // 7. دوال مساعدة
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
    // 8. الدوال العامة
    // ============================================

    // الدالة الرئيسية التي تُستدعى من الزر
    window.showDailyPlan = function() {
        const examDate = getExamDate();
        if (!examDate) {
            renderDatePicker();
            return;
        }

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
            updateDynamicWeights(analysis);
            plan = generateDailyPlan(analysis);
            savePlannerData({ analysis, plan });
            console.log('✅ تم حفظ الخطة في الكاش');
        }

        if (plan) {
            renderPlan(plan, true);
        } else {
            showSimpleMessage('⚠️ تعذر إنشاء الخطة، حاول مرة أخرى.', 'error');
        }
    };

    // دالة لإعادة الحساب بعد كل امتحان (تُستدعى من engine.js)
    window.refreshDailyPlan = function() {
        // حذف الكاش لإعادة الحساب
        localStorage.removeItem(PLANNER_KEY);
        // زيادة عداد الامتحانات المنجزة اليوم
        incrementTodayCompleted();
        // إعادة العرض
        window.showDailyPlan();
    };

    // دالة لإعادة تعيين الإرهاق اليومي (تُستدعى في منتصف الليل أو عند بدء يوم جديد)
    window.resetDailyFatigue = function() {
        resetTodayCompleted();
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

        // إعادة تعيين الإرهاق يومياً (عند منتصف الليل)
        const now = new Date();
        const night = new Date(now);
        night.setHours(24, 0, 0, 0);
        const timeToMidnight = night - now;
        setTimeout(() => {
            window.resetDailyFatigue();
            setInterval(window.resetDailyFatigue, 24 * 60 * 60 * 1000);
        }, timeToMidnight + 1000);
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
    window.getDailyCapacity = getDailyCapacity;
    window.calculateDailyGoal = calculateDailyGoal;
    window.updateDynamicWeights = updateDynamicWeights;
    window.getExamReason = getExamReason;

    console.log('🧠 studyPlanner.js جاهز (المدرب الذكي - الإصدار 3.0)');
})();
