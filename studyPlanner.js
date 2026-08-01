/**
 * studyPlanner.js - المدرب الذكي (الإصدار 1.0)
 * 
 * الفلسفة:
 * - لا يخزن أي تحليل أو أولوية أو خطة.
 * - Stateless: يُعيد الحساب في كل مرة من الصفر.
 * - يعتمد فقط على البيانات الحقيقية المخزنة مسبقاً:
 *   1. النتيجة (exam_result_hoeren1_*)
 *   2. عدد الإعادات (exam_retry_hoeren1_*)
 *   3. عدد الأيام منذ آخر مراجعة (exam_last_review_hoeren1_*)
 * - يعمل حالياً على Hören 1 فقط.
 * - لا يضيف أي مفاتيح جديدة في localStorage، بل يستخدم المفاتيح الموجودة.
 * 
 * الخوارزمية:
 *   1. حساب عدد الامتحانات المطلوبة اليوم (Daily Count).
 *   2. اختيار الامتحانات وفقاً لثلاثة معايير مرتبة حسب الأهمية:
 *      - أقل نتيجة أولاً.
 *      - عند التساوي: أقل عدد إعادات أولاً.
 *      - عند التساوي: أقدم تاريخ مراجعة أولاً.
 *   3. عرض الخطة.
 */

(function() {
    "use strict";

    // ================================================================
    // 1. الإعدادات والتخزين
    // ================================================================

    const STORAGE_KEY_SETTINGS = 'study_planner_settings'; // يستخدم لتخزين تاريخ الامتحان وساعات الدراسة
    const SECTION_ID = 'hoeren1'; // المرحلة الأولى: Hören 1 فقط

    // القيم الافتراضية
    const DEFAULT_HOURS_PER_DAY = 2;
    const TARGET_RETRIES = 6;
    const MIN_DAILY_EXAMS = 3;

    // ================================================================
    // 2. دوال الإعدادات
    // ================================================================

    function loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
            if (raw) {
                const settings = JSON.parse(raw);
                if (settings.examDate && settings.hoursPerDay) {
                    return settings;
                }
            }
        } catch (e) {}
        return { examDate: null, hoursPerDay: DEFAULT_HOURS_PER_DAY };
    }

    function saveSettings(examDate, hoursPerDay) {
        const settings = { examDate, hoursPerDay };
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
        // أيضاً نحفظ تاريخ الامتحان في المفتاح القديم للتوافق
        if (examDate) {
            localStorage.setItem('user_exam_date', examDate);
        }
    }

    function getExamDate() {
        return loadSettings().examDate;
    }

    function getHoursPerDay() {
        return loadSettings().hoursPerDay;
    }

    function setExamDate(date) {
        const settings = loadSettings();
        saveSettings(date, settings.hoursPerDay);
    }

    function setHoursPerDay(hours) {
        const settings = loadSettings();
        saveSettings(settings.examDate, hours);
    }

    // ================================================================
    // 3. حساب الأيام المتبقية وأيام العمل
    // ================================================================

    function getDaysRemaining() {
        const dateStr = getExamDate();
        if (!dateStr) return null;
        const now = new Date();
        const exam = new Date(dateStr);
        now.setHours(0, 0, 0, 0);
        exam.setHours(0, 0, 0, 0);
        const diff = Math.ceil((exam - now) / (1000 * 3600 * 24));
        return diff > 0 ? diff : 0;
    }

    function getWorkingDays() {
        const days = getDaysRemaining();
        if (days === null) return 30; // إذا لم يكن التاريخ محدداً، نستخدم قيمة افتراضية
        const working = days - 2; // آخر يومين محجوزان للمراجعة النهائية
        return working > 0 ? working : 1;
    }

    // ================================================================
    // 4. جمع بيانات الامتحانات (Hören 1 فقط)
    // ================================================================

    function getExamList() {
        // نستفيد من examsDatabase الموجودة في window
        const db = window.examsDatabase;
        if (!db || !db.hoeren1) {
            console.warn('⚠️ examsDatabase.hoeren1 غير موجودة');
            return [];
        }
        return db.hoeren1; // مصفوفة من { id, title, ... }
    }

    function getExamScore(examId) {
        const key = `exam_result_${SECTION_ID}_${examId}`;
        const val = localStorage.getItem(key);
        return val !== null ? parseFloat(val) : null; // null تعني لم يُحل بعد
    }

    function getExamRetry(examId) {
        const key = `exam_retry_${SECTION_ID}_${examId}`;
        const val = localStorage.getItem(key);
        return val !== null ? parseInt(val, 10) || 0 : 0;
    }

    function getExamLastReviewDays(examId) {
        // نستخدم الدالة الموجودة في window (المضافة في exams.js)
        if (typeof window.getLastReviewDays === 'function') {
            const days = window.getLastReviewDays(SECTION_ID, examId);
            return days !== null ? days : 999; // إذا لم يُراجع أبداً، نعطي قيمة كبيرة
        }
        // بديل: نحاول قراءة المفتاح مباشرة
        const key = `exam_last_review_${SECTION_ID}_${examId}`;
        const dateStr = localStorage.getItem(key);
        if (!dateStr) return 999;
        const now = new Date();
        const last = new Date(dateStr);
        now.setHours(0,0,0,0);
        last.setHours(0,0,0,0);
        const diff = Math.floor((now - last) / (1000*3600*24));
        return diff >= 0 ? diff : 999;
    }

    // ================================================================
    // 5. حساب عدد الامتحانات اليومية
    // ================================================================

    function computeDailyCount() {
        const workingDays = getWorkingDays();
        // عدد الامتحانات التي لم تصل إلى 6 إعادات
        const allExams = getExamList();
        let remainingExams = 0;
        for (const exam of allExams) {
            const retry = getExamRetry(exam.id);
            if (retry < TARGET_RETRIES) {
                remainingExams++;
            }
        }
        // إذا لم يبقَ شيء، نرجع 0 (أو الحد الأدنى)
        if (remainingExams === 0) return 0;
        let daily = Math.ceil(remainingExams / workingDays);
        // الحد الأدنى
        if (daily < MIN_DAILY_EXAMS) daily = MIN_DAILY_EXAMS;
        // لا نتجاوز عدد الامتحانات المتبقية
        if (daily > remainingExams) daily = remainingExams;
        return daily;
    }

    // ================================================================
    // 6. اختيار الامتحانات (ترتيب حسب النتيجة، الإعادات، آخر مراجعة)
    // ================================================================

    function selectExams(dailyCount) {
        const allExams = getExamList();
        if (allExams.length === 0) return [];

        // بناء مصفوفة تحتوي على بيانات كل امتحان
        const examData = allExams.map(exam => {
            const id = exam.id;
            const score = getExamScore(id);
            const retry = getExamRetry(id);
            const lastReview = getExamLastReviewDays(id);
            // النتيجة: إذا كانت null نعتبرها 0 (ضعيفة جداً)
            const effectiveScore = (score !== null) ? score : 0;
            return {
                id: id,
                title: exam.title,
                score: effectiveScore,
                retry: retry,
                lastReview: lastReview,
                // نحتفظ بالبيانات الأصلية لاستخدامها في العرض
            };
        });

        // ترتيب حسب الأولوية: النتيجة تصاعدياً، ثم الإعادات تصاعدياً، ثم آخر مراجعة تصاعدياً
        examData.sort((a, b) => {
            if (a.score !== b.score) return a.score - b.score;
            if (a.retry !== b.retry) return a.retry - b.retry;
            return a.lastReview - b.lastReview;
        });

        // اختيار أول dailyCount امتحان
        const selected = examData.slice(0, dailyCount);
        return selected;
    }

    // ================================================================
    // 7. عرض الخطة (UI)
    // ================================================================

    function showPlan(selectedExams, dailyCount) {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 460px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            color: #e2e8f0;
            animation: slideUp 0.25s ease;
            direction: rtl;
        `;

        const remainingDays = getDaysRemaining();
        const workingDays = getWorkingDays();

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0; color: #38bdf8;">📅 خطة اليوم</h3>
                <button id="closePlanBtn" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">🎯 ${dailyCount} امتحان</span>
                <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">⏰ ${getHoursPerDay()} ساعة/يوم</span>
                ${remainingDays !== null ? `<span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">📅 ${remainingDays} يوم متبقي</span>` : ''}
                <span style="background: #1e293b; padding: 2px 10px; border-radius: 20px; font-size: 0.75rem;">⚙️ أيام العمل: ${workingDays}</span>
            </div>
            <div style="margin-bottom: 14px; color: #94a3b8; font-size: 0.85rem;">اليوم عليك مراجعة:</div>
        `;

        if (selectedExams.length === 0) {
            html += `
                <div style="background: #0f1421; border-radius: 12px; padding: 16px; text-align: center; color: #4ade80;">
                    ✅ جميع الامتحانات حققت 6 مراجعات! لا حاجة للمراجعة اليوم.
                </div>
            `;
        } else {
            html += `<div style="background: #0f1421; border-radius: 12px; padding: 12px 16px; border-right: 3px solid #4ade80;">`;
            html += `<div style="font-weight: bold; color: #f1f5f9; margin-bottom: 4px;">Hören 1</div>`;
            const examIds = selectedExams.map(e => e.id);
            html += `<div style="color: #e2e8f0; font-size: 0.95rem;">امتحان: <span style="color: #4ade80; font-weight: bold;">${examIds.join(' ، ')}</span></div>`;
            html += `</div>`;

            // عرض أسباب بسيطة (اختياري)
            html += `<div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">ملاحظات:</div>`;
            for (const exam of selectedExams) {
                let reason = '';
                if (exam.score === 0) reason = 'لم يُحل أبداً';
                else if (exam.score < 10) reason = `نتيجة منخفضة (${exam.score})`;
                else if (exam.retry < 3) reason = `إعادات قليلة (${exam.retry})`;
                else if (exam.lastReview > 20) reason = `مراجعة قديمة (منذ ${exam.lastReview} يوم)`;
                else reason = `أولوية`;
                html += `
                    <div style="background: #0f1421; border-radius: 8px; padding: 4px 12px; margin-top: 4px; font-size: 0.8rem; color: #cbd5e1; border-right: 2px solid #4ade80;">
                        <strong>امتحان ${exam.id}</strong> — ${reason}
                    </div>
                `;
            }
        }

        html += `
            <button id="startReviewBtn" style="
                width: 100%; margin-top: 16px; padding: 12px;
                background: #38bdf8; border: none; border-radius: 12px;
                color: #0a0e1a; font-size: 0.95rem; font-weight: 700; cursor: pointer;
            ">ابدأ المراجعة</button>
            <button id="backBtn" style="
                width: 100%; margin-top: 6px; padding: 6px;
                background: transparent; border: 1px solid #334155; border-radius: 12px;
                color: #94a3b8; font-size: 0.75rem; cursor: pointer;
            ">⬅ العودة</button>
        `;

        card.innerHTML = html;
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('closePlanBtn').onclick = () => overlay.remove();
        document.getElementById('startReviewBtn').onclick = () => {
            overlay.remove();
            // التوجيه إلى قائمة Hören 1
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

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // ================================================================
    // 8. شاشة الإعدادات الأولية
    // ================================================================

    function showSettingsScreen() {
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
            color: #e2e8f0;
            animation: slideUp 0.25s ease;
            direction: rtl;
            text-align: center;
        `;

        const currentDate = getExamDate() || new Date().toISOString().slice(0, 10);
        const currentHours = getHoursPerDay();

        card.innerHTML = `
            <div style="font-size: 2.5rem; margin-bottom: 8px;">⚙️</div>
            <h2 style="margin: 0 0 4px 0; color: #38bdf8;">الإعدادات الأولية</h2>
            <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 0.9rem;">تُحفظ هذه الإعدادات ولا تظهر مرة أخرى</p>
            <div style="text-align: right; margin-bottom: 16px;">
                <label style="display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 4px;">📅 تاريخ الامتحان</label>
                <input type="date" id="settingsExamDate" value="${currentDate}" min="${new Date().toISOString().slice(0,10)}" style="
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
            <button id="settingsSaveBtn" style="
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

        document.getElementById('settingsSaveBtn').onclick = () => {
            const date = document.getElementById('settingsExamDate').value;
            if (date) {
                saveSettings(date, selectedHours);
                overlay.remove();
                runPlanner();
            }
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // ================================================================
    // 9. تشغيل المدرب
    // ================================================================

    function runPlanner() {
        // 1. التحقق من وجود الإعدادات
        if (!getExamDate()) {
            showSettingsScreen();
            return;
        }

        // 2. حساب عدد الامتحانات اليومية
        const dailyCount = computeDailyCount();

        // 3. اختيار الامتحانات
        const selected = selectExams(dailyCount);

        // 4. عرض الخطة
        showPlan(selected, dailyCount);
    }

    // ================================================================
    // 10. القائمة الرئيسية والـ UI
    // ================================================================

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
            `;
            document.head.appendChild(style);
        }
        return overlay;
    }

    function showMainMenu() {
        const overlay = createOverlay();
        const card = document.createElement('div');
        card.style.cssText = `
            background: #1a1f2e;
            border-radius: 24px;
            padding: 28px 30px;
            max-width: 440px;
            width: 90%;
            border: 1px solid #2a3042;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            color: #e2e8f0;
            animation: slideUp 0.25s ease;
            direction: rtl;
        `;

        const date = getExamDate();
        const hours = getHoursPerDay();

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
                <button id="closeBtn" style="flex:1; padding:8px; background:transparent; border:1px solid #334155; border-radius:12px; color:#94a3b8; font-size:0.75rem; cursor:pointer;">إغلاق</button>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        document.getElementById('planBtn').onclick = () => {
            overlay.remove();
            runPlanner();
        };
        document.getElementById('settingsBtn').onclick = () => {
            overlay.remove();
            showSettingsScreen();
        };
        document.getElementById('closeBtn').onclick = () => overlay.remove();
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    }

    // ================================================================
    // 11. ربط الزر العام
    // ================================================================

    window.openStudyPlanner = function() {
        if (!getExamDate()) {
            showSettingsScreen();
        } else {
            showMainMenu();
        }
    };

    // عند تحميل الصفحة، ربط الزر (إن وجد)
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('studyPlannerBtn');
        if (btn) {
            btn.removeEventListener('click', window.openStudyPlanner);
            btn.addEventListener('click', window.openStudyPlanner);
            console.log('✅ Study Planner v1.0 (تجريبي Hören 1) جاهز');
        } else {
            console.warn('⚠️ الزر studyPlannerBtn غير موجود.');
        }
    });

})();
