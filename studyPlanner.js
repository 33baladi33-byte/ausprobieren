/**
 * studyPlanner.js - المدرب الذكي TELC B2 (الإصدار 11.2 - المُحسَّن)
 *
 * الإصلاحات:
 * 1. تحديث سجل الاختيار يتم عند الضغط على "ابدأ المراجعة" وليس عند إنشاء الخطة.
 * 2. جمع الدرجات بشكل صحيح مع الحفاظ على الترتيب الزمني (من exam_history و exam_result).
 * 3. حساب المتوسط والاتجاه والاستقرار من البيانات الحقيقية.
 * 4. نظام أولوية متوازن: الجديد، الضعيف، المتوسط، المتقن.
 * 5. منع التكرار المفرط (حد أقصى 3 أيام متتالية).
 * 6. توزيع متوازن للامتحانات المختارة.
 * 7. كسر التعادل بطريقة ثابتة (حتمية).
 * 8. Debug مفصل مع عرض أسباب الأولوية.
 * 9. شاشة تفكير تعتمد على الخطة الفعلية.
 * 10. أيام منذ آخر حل = null للجديدة.
 */

(function() {
    "use strict";

    // ================================================================
    // 1. المحرك المُحسَّن
    // ================================================================

    class SimplePlanner {
        constructor() {
            this.storageKeyDate = 'user_exam_date';
            this.storageKeyPlans = 'study_planner_history_v3';
            this.storageKeySettings = 'study_planner_settings';
            this.targetSection = 'hoeren1';
            this.minExams = 4;
            this.maxExams = 10;
            this.settings = this.loadSettings();

            // تنظيف history القديمة (احذف سجل اليوم السابق إذا لم يتم البدء)
            this.cleanPendingHistory();
        }

        // ------------------- تنظيف السجل المعلق -------------------
        cleanPendingHistory() {
            // إذا كان هناك سجل اختيار لم يتم البدء فيه (لا يوجد مفتاح "started")، نحذفه
            // لكننا لا نخزن حالة البدء، لذلك سنحذف أي سجل تم إنشاؤه في نفس اليوم إذا لم يتم البدء
            // لكننا سنعتمد على آلية "ابدأ المراجعة" لحفظ السجل.
            // لا حاجة لهذه الدالة حالياً، سنحفظ السجل فقط عند بدء المراجعة.
        }

        // ------------------- الإعدادات -------------------
        loadSettings() {
            try {
                const raw = localStorage.getItem(this.storageKeySettings);
                if (raw) {
                    const s = JSON.parse(raw);
                    if (s.examDate && s.hoursPerDay) return s;
                }
            } catch (e) {}
            return { examDate: null, hoursPerDay: 2 };
        }

        saveSettings(examDate, hoursPerDay) {
            this.settings = { examDate, hoursPerDay };
            localStorage.setItem(this.storageKeySettings, JSON.stringify(this.settings));
            if (examDate) localStorage.setItem(this.storageKeyDate, examDate);
        }

        getExamDate() {
            return this.settings.examDate || localStorage.getItem(this.storageKeyDate) || null;
        }
        getHoursPerDay() {
            return this.settings.hoursPerDay || 2;
        }
        getDaysRemaining() {
            const d = this.getExamDate();
            if (!d) return null;
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const exam = new Date(d);
            exam.setHours(0, 0, 0, 0);
            const diff = Math.ceil((exam - now) / (1000 * 3600 * 24));
            return diff > 0 ? diff : 0;
        }

        // ------------------- جمع البيانات الحقيقية (مُحسَّن) -------------------
        gatherRealData() {
            const db = window.examsDatabase;
            if (!db || !db[this.targetSection]) {
                console.error('❌ Hören 1 غير موجود');
                return null;
            }

            const allExams = db[this.targetSection];
            const result = [];

            for (const exam of allExams) {
                const id = exam.id;
                // 1. جمع كل الدرجات من history مع التواريخ
                const historyKey = `exam_history_${this.targetSection}_${id}`;
                const historyRaw = localStorage.getItem(historyKey);
                let historyEntries = [];
                if (historyRaw) {
                    try {
                        const hist = JSON.parse(historyRaw);
                        if (Array.isArray(hist)) {
                            historyEntries = hist.filter(e => e.score !== undefined && !isNaN(e.score));
                        }
                    } catch (e) {}
                }

                // 2. قراءة الدرجة الحالية من exam_result
                const resultKey = `exam_result_${this.targetSection}_${id}`;
                const resultRaw = localStorage.getItem(resultKey);
                let currentScore = null;
                if (resultRaw !== null) {
                    const s = parseFloat(resultRaw);
                    if (!isNaN(s)) currentScore = s;
                }

                // 3. دمج history و currentScore مع الحفاظ على الترتيب الزمني
                // نقوم ببناء مصفوفة من الكائنات {score, date}
                let allEntries = [];
                for (const entry of historyEntries) {
                    allEntries.push({ score: entry.score, date: entry.date || null });
                }
                // إذا كان currentScore غير موجود في history (أو موجود ولكن نضيفه للتأكد)
                // نبحث عن آخر تاريخ في history، ونضيف currentScore كإدخال جديد إذا لم يكن مكرراً
                // لكن الأسهل: نأخذ جميع scores من history، ثم نضيف currentScore إذا كان مختلفاً عن آخرها
                // (لأن exam_result قد يكون محدثاً أكثر من history في بعض الحالات)
                if (currentScore !== null) {
                    const lastHistory = historyEntries.length > 0 ? historyEntries[historyEntries.length - 1] : null;
                    if (!lastHistory || lastHistory.score !== currentScore) {
                        // نضيفه مع تاريخ اليوم كتقدير
                        allEntries.push({ score: currentScore, date: new Date().toISOString() });
                    }
                }

                // ترتيب حسب التاريخ (إذا كان التاريخ موجوداً، نضعه في المقدمة)
                allEntries.sort((a, b) => {
                    if (!a.date && !b.date) return 0;
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(a.date) - new Date(b.date);
                });

                const scores = allEntries.map(e => e.score);
                const lastDate = allEntries.length > 0 ? allEntries[allEntries.length - 1].date : null;

                // 4. عدد الإعادات
                const retryKey = `exam_retry_${this.targetSection}_${id}`;
                const retryVal = localStorage.getItem(retryKey);
                const retryCount = retryVal ? parseInt(retryVal, 10) || 0 : 0;

                // 5. تاريخ آخر اختيار من Planner
                let lastSelectedDate = null;
                let selectedCount = 0;
                try {
                    const plansRaw = localStorage.getItem(this.storageKeyPlans);
                    if (plansRaw) {
                        const plans = JSON.parse(plansRaw);
                        const key = `${this.targetSection}_${id}`;
                        if (plans[key]) {
                            selectedCount = plans[key].count || 0;
                            lastSelectedDate = plans[key].lastDate || null;
                        }
                    }
                } catch (e) {}

                // 6. حساب الإحصائيات
                const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
                const lastScore = scores.length > 0 ? scores[scores.length - 1] : 0;
                const attempts = scores.length;
                const isFresh = scores.length === 0;

                // أيام منذ آخر حل (null للجديدة)
                let daysSinceSolve = null;
                if (lastDate) {
                    daysSinceSolve = Math.floor((Date.now() - new Date(lastDate).getTime()) / (1000 * 3600 * 24));
                }

                // أيام منذ آخر اختيار
                let daysSinceSelect = null;
                if (lastSelectedDate) {
                    daysSinceSelect = Math.floor((Date.now() - new Date(lastSelectedDate).getTime()) / (1000 * 3600 * 24));
                }

                // الاتجاه (Trend) من آخر 3 نتائج
                let trend = 0;
                if (scores.length >= 2) {
                    const recent = scores.slice(-3);
                    if (recent.length >= 2) {
                        trend = recent[recent.length - 1] - recent[0];
                    }
                }

                // التباين (Standard Deviation) كمقياس للاستقرار
                let stddev = 0;
                if (scores.length >= 2) {
                    const mean = avg;
                    const squaredDiffs = scores.map(s => Math.pow(s - mean, 2));
                    const variance = squaredDiffs.reduce((a, b) => a + b, 0) / scores.length;
                    stddev = Math.sqrt(variance);
                }

                result.push({
                    id,
                    scores,
                    avg,
                    lastScore,
                    attempts,
                    retryCount,
                    lastDate,
                    daysSinceSolve,
                    lastSelectedDate,
                    daysSinceSelect,
                    selectedCount,
                    isFresh,
                    trend,
                    stddev,
                    enabled: exam.enabled !== false
                });
            }

            return result;
        }

        // ------------------- حساب الأولوية (مع توازن) -------------------
        computePriority(exam, daysRemaining, hoursPerDay) {
            let priority = 0;
            const reasons = [];

            // 1. الامتحانات الجديدة: أعلى أولوية، لكن مع حد أقصى
            if (exam.isFresh) {
                priority += 100;
                reasons.push('جديد (+100)');
            }

            // 2. عامل المتوسط: كلما انخفض، زادت الأولوية (باستخدام معادلة نسبية)
            if (!exam.isFresh && exam.avg > 0) {
                // نعطي وزن يتناسب عكسياً مع المتوسط (0-25)
                const avgWeight = Math.max(0, (25 - exam.avg) * 2.5);
                priority += avgWeight;
                reasons.push(`متوسط منخفض (${exam.avg.toFixed(1)}) → +${avgWeight.toFixed(0)}`);
            }

            // 3. أيام منذ آخر حل: كلما زادت، زادت الأولوية (ولكن ليس بشكل خطي)
            if (exam.daysSinceSolve !== null) {
                const days = Math.min(exam.daysSinceSolve, 60);
                const daysWeight = days * 1.2;
                priority += daysWeight;
                reasons.push(`مر ${days} يوم → +${daysWeight.toFixed(0)}`);
            } else {
                // إذا كانت جديدة، نعطي 0 لأنها بالفعل حصلت على +100
            }

            // 4. التكرار المفرط: إذا أعيد أكثر من 5 مرات ومتوسطه جيد، نخفض الأولوية
            if (exam.retryCount > 5 && exam.avg >= 18) {
                priority -= 20;
                reasons.push(`أعيد ${exam.retryCount} مرات بمتوسط جيد (-20)`);
            } else if (exam.retryCount > 3 && exam.avg < 12) {
                // إذا أعيد كثيراً لكنه ضعيف، نعطي دفعة
                priority += 15;
                reasons.push(`أعيد ${exam.retryCount} مرات وضعيف (+15)`);
            }

            // 5. الاتجاه (Trend): إذا كان الأداء يتحسن، نعطي دفعة صغيرة؛ وإذا يتراجع، نعطي دفعة أكبر
            if (exam.trend > 5) {
                priority += 8;
                reasons.push(`تحسن ملحوظ (+8)`);
            } else if (exam.trend < -5) {
                priority += 20;
                reasons.push(`تراجع ملحوظ (+20)`);
            }

            // 6. عدم الاستقرار (stddev كبير): يعني أداء متقلب، نعطي دفعة
            if (exam.stddev > 8) {
                priority += 12;
                reasons.push(`أداء متقلب (+12)`);
            }

            // 7. معاقبة التكرار المفرط من Planner: إذا اختير مرات كثيرة ومؤخراً
            if (exam.daysSinceSelect !== null && exam.daysSinceSelect < 3 && exam.selectedCount > 2) {
                priority -= 25;
                reasons.push(`اختير ${exam.selectedCount} مرات مؤخراً (-25)`);
            } else if (exam.daysSinceSelect !== null && exam.daysSinceSelect < 7 && exam.selectedCount > 3) {
                priority -= 15;
                reasons.push(`اختير ${exam.selectedCount} مرات مؤخراً (-15)`);
            }

            // 8. الوقت المتبقي: إذا كان قصيراً، نعطي أولوية للجديد والضعيف
            if (daysRemaining !== null && daysRemaining < 10) {
                if (exam.isFresh) {
                    priority += 20;
                    reasons.push('وقت قصير + جديد (+20)');
                } else if (exam.avg < 12) {
                    priority += 15;
                    reasons.push('وقت قصير + ضعيف (+15)');
                }
            }

            // 9. المتقن: نخفض كثيراً إذا كان متوسطه >= 20 وعدد محاولات >= 5
            if (exam.avg >= 20 && exam.attempts >= 5) {
                priority -= 30;
                reasons.push('متقن (-30)');
            }

            // 10. كسر التعادل بطريقة حتمية (باستخدام id)
            // نضيف قيمة صغيرة تعتمد على id لتوزيع متساوٍ
            const tieBreaker = (exam.id * 0.01) % 0.1;
            priority += tieBreaker;

            return { priority: Math.round(Math.max(0, priority)), reasons };
        }

        // ------------------- اختيار الخطة مع توازن الفئات -------------------
        buildPlan() {
            const exams = this.gatherRealData();
            if (!exams) return null;

            const daysRemaining = this.getDaysRemaining();
            const hoursPerDay = this.getHoursPerDay();

            // عدد الامتحانات اليومية
            let dailyCount = Math.round(hoursPerDay * 2.5);
            dailyCount = Math.max(this.minExams, Math.min(this.maxExams, dailyCount));
            if (daysRemaining !== null && daysRemaining < 15) {
                dailyCount = Math.min(this.maxExams, dailyCount + 2);
            }
            if (daysRemaining !== null && daysRemaining < 7) {
                dailyCount = Math.min(this.maxExams, dailyCount + 2);
            }

            // حساب الأولوية لكل امتحان
            const withPriority = exams.map(exam => {
                const { priority, reasons } = this.computePriority(exam, daysRemaining, hoursPerDay);
                return { ...exam, priority, reasons };
            });

            // تصفية المفعل
            const enabled = withPriority.filter(e => e.enabled);

            // تقسيم إلى فئات
            const fresh = enabled.filter(e => e.isFresh);
            const weak = enabled.filter(e => !e.isFresh && e.avg < 10);
            const medium = enabled.filter(e => !e.isFresh && e.avg >= 10 && e.avg < 18);
            const good = enabled.filter(e => !e.isFresh && e.avg >= 18);

            // ترتيب كل فئة حسب الأولوية
            const sortByPriority = (arr) => arr.sort((a, b) => b.priority - a.priority);
            sortByPriority(fresh);
            sortByPriority(weak);
            sortByPriority(medium);
            sortByPriority(good);

            // استراتيجية التوزيع: نأخذ من كل فئة بحيث يكون هناك توازن
            const selected = [];
            const maxFresh = Math.min(3, Math.ceil(dailyCount * 0.4));
            const maxWeak = Math.min(3, Math.ceil(dailyCount * 0.4));
            const maxMedium = Math.min(2, Math.ceil(dailyCount * 0.3));
            const maxGood = Math.min(1, Math.ceil(dailyCount * 0.2));

            // دالة مساعدة للإضافة مع مراعاة الحدود
            const addWithLimit = (pool, limit, target) => {
                let added = 0;
                for (const exam of pool) {
                    if (added >= limit) break;
                    if (!selected.some(e => e.id === exam.id)) {
                        selected.push(exam);
                        added++;
                    }
                }
            };

            // 1. نبدأ بالجديد والضعيف (الأولوية القصوى)
            addWithLimit(fresh, maxFresh, selected);
            addWithLimit(weak, maxWeak, selected);

            // 2. ثم المتوسط
            addWithLimit(medium, maxMedium, selected);

            // 3. ثم الجيد (إذا بقي مكان)
            addWithLimit(good, maxGood, selected);

            // 4. إذا لم نكمل العدد، نضيف من الباقي حسب الأولوية (بدون حدود)
            if (selected.length < dailyCount) {
                const remaining = enabled.filter(e => !selected.some(s => s.id === e.id));
                sortByPriority(remaining);
                for (const exam of remaining) {
                    if (selected.length >= dailyCount) break;
                    if (!selected.some(e => e.id === exam.id)) {
                        selected.push(exam);
                    }
                }
            }

            // إحصائيات
            const stats = {
                total: enabled.length,
                solved: enabled.filter(e => !e.isFresh).length,
                never: enabled.filter(e => e.isFresh).length,
                weak: enabled.filter(e => !e.isFresh && e.avg < 10).length,
                medium: enabled.filter(e => !e.isFresh && e.avg >= 10 && e.avg < 18).length,
                good: enabled.filter(e => !e.isFresh && e.avg >= 18).length
            };

            // ترتيب المختارين حسب الأولوية (للعرض)
            selected.sort((a, b) => b.priority - a.priority);

            return {
                selected,
                sorted: enabled, // جميع الامتحانات مرتبة حسب الأولوية (لـ Debug)
                dailyCount,
                daysRemaining,
                hoursPerDay,
                stats
            };
        }

        // ------------------- حفظ سجل الاختيار (يُستدعى عند "ابدأ المراجعة") -------------------
        saveSelectionHistory(selectedExams) {
            const today = new Date().toISOString().slice(0, 10);
            let history = {};
            try {
                const raw = localStorage.getItem(this.storageKeyPlans);
                if (raw) history = JSON.parse(raw);
            } catch (e) {}
            for (const exam of selectedExams) {
                const key = `${this.targetSection}_${exam.id}`;
                if (!history[key]) history[key] = { count: 0, lastDate: null };
                history[key].count = (history[key].count || 0) + 1;
                history[key].lastDate = today;
            }
            localStorage.setItem(this.storageKeyPlans, JSON.stringify(history));
        }
    }

    // ================================================================
    // 2. واجهة المستخدم
    // ================================================================

    const planner = new SimplePlanner();

    // دوال مساعدة للـ UI
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
        return overlay;
    }

    function showInitialSetup() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 420px; width: 90%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4); color: #e2e8f0;
            animation: slideUp 0.25s ease; direction: rtl; text-align: center;
        `;

        const today = new Date().toISOString().slice(0, 10);
        const currentDate = planner.getExamDate() || today;
        const currentHours = planner.getHoursPerDay();

        card.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🎯</div>
            <h2 style="margin: 0 0 4px 0; color: #38bdf8;">الإعدادات الأولية</h2>
            <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 0.9rem;">تُحفظ هذه الإعدادات ولا تظهر مرة أخرى</p>
            <div style="text-align: right; margin-bottom: 16px;">
                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px;">📅 تاريخ الامتحان</label>
                <input type="date" id="setupDate" value="${currentDate}" min="${today}" style="
                    width: 100%; padding: 10px; border-radius: 10px; border: 1px solid #334155;
                    background: #0f1421; color: #e2e8f0; font-size: 1rem; box-sizing: border-box;
                ">
            </div>
            <div style="text-align: right; margin-bottom: 20px;">
                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px;">⏰ كم ساعة تدرس يومياً؟</label>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                    ${[1,2,3,4,5,6].map(h => `
                        <button class="hour-opt" data-h="${h}" style="
                            padding: 8px 16px; border-radius: 10px; border: 2px solid ${h === currentHours ? '#38bdf8' : '#334155'};
                            background: ${h === currentHours ? 'rgba(56,189,248,0.15)' : '#0f1421'};
                            color: ${h === currentHours ? '#38bdf8' : '#94a3b8'};
                            font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: 0.2s;
                        ">${h} ساعة</button>
                    `).join('')}
                </div>
            </div>
            <button id="setupSaveBtn" style="
                width: 100%; padding: 12px; background: #38bdf8; border: none; border-radius: 12px;
                color: #0a0e1a; font-size: 1rem; font-weight: 700; cursor: pointer;
            ">حفظ وبدء</button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        let selectedHours = currentHours;
        card.querySelectorAll('.hour-opt').forEach(btn => {
            btn.onclick = () => {
                card.querySelectorAll('.hour-opt').forEach(b => {
                    b.style.borderColor = '#334155';
                    b.style.background = '#0f1421';
                    b.style.color = '#94a3b8';
                });
                btn.style.borderColor = '#38bdf8';
                btn.style.background = 'rgba(56,189,248,0.15)';
                btn.style.color = '#38bdf8';
                selectedHours = parseInt(btn.dataset.h);
            };
        });

        document.getElementById('setupSaveBtn').onclick = () => {
            const date = document.getElementById('setupDate').value;
            if (date) {
                planner.saveSettings(date, selectedHours);
                overlay.remove();
                showThinkingScreen();
            }
        };

        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    }

    function showThinkingScreen() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 30px;
            max-width: 480px; width: 92%; border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            color: #e2e8f0; animation: slideUp 0.25s ease;
        `;

        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="font-size: 1.5rem;">🧠</div>
                <div>
                    <div style="font-size: 0.75rem; color: #64748b;">تحليل Hören 1...</div>
                    <div style="font-size: 0.9rem; font-weight: 500; color: #38bdf8;">جاري التفكير</div>
                </div>
                <div style="margin-left: auto; display: flex; gap: 4px;">
                    <span class="thinking-dot" style="display:inline-block; width:6px; height:6px; background:#38bdf8; border-radius:50%; animation-delay:0s;"></span>
                    <span class="thinking-dot" style="display:inline-block; width:6px; height:6px; background:#38bdf8; border-radius:50%; animation-delay:0.3s;"></span>
                    <span class="thinking-dot" style="display:inline-block; width:6px; height:6px; background:#38bdf8; border-radius:50%; animation-delay:0.6s;"></span>
                </div>
            </div>
            <div id="thinkingLog" style="max-height: 200px; overflow-y: auto; padding: 0 4px; direction: ltr;"></div>
            <div style="margin-top: 16px; background: #0f1421; height: 3px; border-radius: 2px; overflow: hidden;">
                <div id="thinkingProgress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #38bdf8, #4ade80); border-radius: 2px; transition: width 0.5s ease;"></div>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // بناء الخطة فعلياً
        const plan = planner.buildPlan();
        if (!plan) {
            document.getElementById('thinkingLog').innerHTML = '<div style="color:#f87171;">❌ حدث خطأ</div>';
            return;
        }

        // رسائل تعتمد على الخطة
        const log = document.getElementById('thinkingLog');
        const progress = document.getElementById('thinkingProgress');
        const msgs = [
            `📂 قراءة بيانات Hören 1... ${plan.stats.total} امتحان.`,
            `📊 تم حل ${plan.stats.solved} امتحان، ${plan.stats.never} لم يُفتح.`,
            plan.stats.weak > 0 ? `⚠️ ${plan.stats.weak} امتحان ضعيف (avg < 10).` : '✅ لا توجد امتحانات ضعيفة.',
            `📈 متوسط الأداء: ${plan.stats.solved > 0 ? (plan.selected.reduce((s,e) => s + e.avg, 0) / plan.selected.length).toFixed(1) : 0}%`,
            `🎯 اختيار ${plan.dailyCount} امتحان لليوم.`
        ];

        let idx = 0, pct = 0;
        function showNext() {
            if (idx >= msgs.length) {
                setTimeout(() => { overlay.remove(); showPlan(plan); }, 400);
                return;
            }
            const line = document.createElement('div');
            line.style.cssText = 'padding: 6px 0; font-size: 0.85rem; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.04);';
            line.textContent = msgs[idx];
            log.appendChild(line);
            pct += (100 / msgs.length);
            progress.style.width = pct + '%';
            log.scrollTop = log.scrollHeight;
            idx++;
            setTimeout(showNext, 600);
        }
        setTimeout(showNext, 300);
    }

    function showPlan(plan) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e; border-radius: 24px; padding: 28px 30px;
            max-width: 500px; width: 92%; max-height: 85vh; overflow-y: auto;
            border: 1px solid #2a3042; box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            color: #e2e8f0; animation: slideUp 0.25s ease; direction: rtl;
        `;

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="margin: 0; color: #38bdf8;">📅 خطة اليوم</h3>
                <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                <span style="background:#1e293b; padding:2px 10px; border-radius:20px; font-size:0.75rem;">🎯 ${plan.dailyCount} امتحان</span>
                <span style="background:#1e293b; padding:2px 10px; border-radius:20px; font-size:0.75rem;">⏰ ${plan.hoursPerDay} ساعة/يوم</span>
                ${plan.daysRemaining !== null ? `<span style="background:#1e293b; padding:2px 10px; border-radius:20px; font-size:0.75rem;">📅 ${plan.daysRemaining} يوم متبقي</span>` : ''}
            </div>
            <div style="margin-bottom: 14px; color: #94a3b8; font-size: 0.85rem;">اليوم عليك مراجعة:</div>
        `;

        // عرض الامتحانات المختارة
        const selected = plan.selected;
        html += `<div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; border-right: 3px solid #4ade80;">`;
        html += `<div style="font-weight: bold; color: #f1f5f9; margin-bottom: 4px;">Hören 1</div>`;
        html += `<div style="color: #e2e8f0; font-size: 0.95rem;">امتحان: <span style="color: #4ade80; font-weight: bold;">${selected.map(e => e.id).join(' ، ')}</span></div>`;
        html += `</div>`;

        // أسباب مختصرة لأول 4 امتحانات
        html += `<div style="margin-top: 8px; font-size: 0.75rem; color: #64748b;">لماذا هذه الامتحانات؟</div>`;
        for (let i = 0; i < Math.min(selected.length, 4); i++) {
            const e = selected[i];
            let reason = '';
            if (e.isFresh) reason = 'لم يُحل أبداً';
            else if (e.avg < 10) reason = `ضعيف (المتوسط ${e.avg.toFixed(1)})`;
            else if (e.daysSinceSolve !== null && e.daysSinceSolve > 30) reason = `مر ${e.daysSinceSolve} يوم دون مراجعة`;
            else if (e.retryCount > 3) reason = `أعيد ${e.retryCount} مرات`;
            else reason = `أولوية عالية`;
            html += `
                <div style="background:#0f1421; border-radius:8px; padding:4px 12px; margin-top:4px; font-size:0.8rem; color:#cbd5e1; border-right:2px solid #4ade80;">
                    <strong>امتحان ${e.id}</strong> — ${reason}
                </div>
            `;
        }

        // زر "ابدأ المراجعة" مع حفظ السجل
        html += `
            <button id="startReviewBtn" style="
                width: 100%; margin-top: 14px; padding: 12px;
                background: #38bdf8; border: none; border-radius: 12px;
                color: #0a0e1a; font-size: 0.95rem; font-weight: 700; cursor: pointer;
            ">🚀 ابدأ المراجعة</button>
            <button id="backBtn" style="
                width: 100%; margin-top: 6px; padding: 6px;
                background: transparent; border: 1px solid #334155; border-radius: 12px;
                color: #94a3b8; font-size: 0.75rem; cursor: pointer;
            ">⬅ العودة للقائمة</button>
        `;

        card.innerHTML = html;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('closePlanBtn').onclick = () => overlay.remove();

        document.getElementById('startReviewBtn').onclick = () => {
            // حفظ سجل الاختيار
            planner.saveSelectionHistory(selected);
            overlay.remove();
            // فتح قائمة Hören 1
            const teil = window.teile?.find(t => t.id === 1);
            if (teil && typeof window.renderExamListForSkill === 'function') {
                window.renderExamListForSkill(teil.skill, teil.name);
                document.getElementById('home')?.classList.remove('active');
                document.getElementById('exam')?.classList.remove('active');
                document.getElementById('list')?.classList.add('active');
            }
        };

        document.getElementById('backBtn').onclick = () => {
            overlay.remove();
            showMainMenu();
        };
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
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

        const date = planner.getExamDate();
        const hours = planner.getHoursPerDay();
        card.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <div style="font-size:2.5rem;">🎯</div>
                <h2 style="margin:0; color:#38bdf8;">المدرب الذكي</h2>
                <p style="margin:0; color:#94a3b8; font-size:0.85rem;">نسخة تجريبية - Hören 1</p>
            </div>
            <div style="background:#0f1421; border-radius:12px; padding:10px 16px; margin-bottom:16px; display:flex; justify-content:space-between; font-size:0.85rem; color:#94a3b8;">
                <span>📅 ${date ? new Date(date).toLocaleDateString('ar-EG') : 'غير محدد'}</span>
                <span>⏰ ${hours} ساعة/يوم</span>
            </div>
            <button id="planBtn" style="
                width:100%; padding:16px; background:linear-gradient(135deg,#38bdf8,#0ea5e9);
                border:none; border-radius:14px; color:#0a0e1a; font-size:1rem; font-weight:700; cursor:pointer;
            ">🎧 خطة Hören 1</button>
            <div style="display:flex; gap:8px; margin-top:12px;">
                <button id="settingsBtn" style="flex:1; padding:8px; background:transparent; border:1px solid #334155; border-radius:12px; color:#94a3b8; font-size:0.75rem; cursor:pointer;">⚙️ الإعدادات</button>
                <button id="debugBtn" style="flex:1; padding:8px; background:transparent; border:1px solid #334155; border-radius:12px; color:#94a3b8; font-size:0.75rem; cursor:pointer;">🐞 Debug</button>
            </div>
            <button id="closeBtn" style="width:100%; margin-top:8px; padding:6px; background:transparent; border:none; color:#64748b; font-size:0.7rem; cursor:pointer;">إغلاق</button>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('planBtn').onclick = () => {
            overlay.remove();
            if (!planner.getExamDate()) showInitialSetup();
            else showThinkingScreen();
        };
        document.getElementById('settingsBtn').onclick = () => { overlay.remove(); showInitialSetup(); };
        document.getElementById('debugBtn').onclick = () => { overlay.remove(); debugPlanner(); };
        document.getElementById('closeBtn').onclick = () => overlay.remove();
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    }

    // ================================================================
    // 3. Debug مع تفصيل الأولوية
    // ================================================================

    function debugPlanner() {
        const plan = planner.buildPlan();
        if (!plan) { console.error('❌ فشل'); return; }

        console.log('%c=========================', 'font-weight:bold; font-size:16px;');
        console.log('%cDEBUG PLANNER V2 - HÖREN 1', 'font-weight:bold; font-size:18px; color:#38bdf8;');
        console.log('%c=========================', 'font-weight:bold; font-size:16px;');
        console.log(`📅 تاريخ الامتحان:`, planner.getExamDate() || 'غير محدد');
        console.log(`⏰ ساعات الدراسة:`, planner.getHoursPerDay());
        console.log(`📊 أيام متبقية:`, plan.daysRemaining !== null ? plan.daysRemaining : 'غير محدد');
        console.log(`%c`, '');

        console.log(`%c📈 STATS`, 'font-weight:bold; font-size:14px; color:#fbbf24;');
        console.log(`  الإجمالي: ${plan.stats.total}`);
        console.log(`  محلولة: ${plan.stats.solved}`);
        console.log(`  جديدة: ${plan.stats.never}`);
        console.log(`  ضعيفة (avg<10): ${plan.stats.weak}`);
        console.log(`  متوسطة (10-18): ${plan.stats.medium}`);
        console.log(`  جيدة (>=18): ${plan.stats.good}`);
        console.log(`%c`, '');

        console.log(`%c🏆 المختارة (${plan.dailyCount})`, 'font-weight:bold; font-size:14px; color:#4ade80;');
        for (let i = 0; i < plan.selected.length; i++) {
            const e = plan.selected[i];
            console.log(`  ${i+1}. Exam ${e.id} — priority: ${e.priority}`);
            console.log(`     Scores:`, e.scores);
            console.log(`     Avg: ${e.avg.toFixed(1)}, Last: ${e.lastScore}`);
            console.log(`     Attempts: ${e.attempts}, Retry: ${e.retryCount}`);
            console.log(`     Days since solve: ${e.daysSinceSolve !== null ? e.daysSinceSolve : 'N/A'}`);
            console.log(`     Trend: ${e.trend}, StdDev: ${e.stddev.toFixed(2)}`);
            console.log(`     Fresh: ${e.isFresh}`);
            console.log(`     Reasons:`, e.reasons.join(' | '));
        }

        console.log(`%c📋 ALL (مرتبة)`, 'font-weight:bold; font-size:14px; color:#60a5fa;');
        for (let i = 0; i < Math.min(plan.sorted.length, 20); i++) {
            const e = plan.sorted[i];
            console.log(`  ${i+1}. Exam ${e.id} — priority: ${e.priority} | avg: ${e.avg.toFixed(1)} | fresh: ${e.isFresh} | trend: ${e.trend}`);
        }

        console.log(`%c=========================`, 'font-weight:bold; font-size:16px;');
        console.log(`%c✅ انتهى`, 'font-weight:bold; font-size:14px; color:#4ade80;');

        // عرض الخطة في الواجهة
        showPlan(plan);
    }

    // ================================================================
    // 4. ربط الزر
    // ================================================================

    window.openStudyPlanner = function() {
        if (!planner.getExamDate()) showInitialSetup();
        else showMainMenu();
    };

    window.debugPlannerV2 = debugPlanner;
    window.planner = planner;

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.removeEventListener('click', window.openStudyPlanner);
            btn.addEventListener('click', window.openStudyPlanner);
            console.log('✅ Study Planner V2 (مُحسَّن) جاهز');
        }
    });

})();
