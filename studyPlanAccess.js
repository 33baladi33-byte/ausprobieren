// ============================================
// studyPlanAccess.js - نظام الخطة اليومية المستقلة
// (طبقة منفصلة لا تؤثر على أي نظام آخر)
// ============================================

(function() {
    "use strict";

    // رقم واتساب للاشتراك في الخطة اليومية
    const WHATSAPP_NUMBER = '0665881925';

    // دالة فتح واتساب للاشتراك
    function openWhatsAppSubscribe() {
        const message = 'السلام عليكم، أريد الاشتراك في الخطة اليومية (Study Plan)';
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    }

    // دالة للتحقق مما إذا كان المستخدم لديه حق الوصول إلى الخطة
    // يعتمد على window.userStudyPlan الذي يتم تحديثه في auth.js بنفس منطق Premium
    function hasStudyPlanAccess() {
        return window.userStudyPlan === true;
    }

    // إضافة CSS للقفل (يتم إضافته مرة واحدة فقط)
    function addLockStyles() {
        if (document.getElementById('studyPlanLockStyles')) return;
        const style = document.createElement('style');
        style.id = 'studyPlanLockStyles';
        style.textContent = `
            .study-plan-locked {
                opacity: 0.75 !important;
                position: relative !important;
                cursor: pointer !important;
            }
            .study-plan-locked::after {
                content: "🔒";
                margin-inline-start: 6px;
                font-size: 0.9em;
                display: inline-block;
            }
            /* منع تغيير أي شيء آخر */
            .study-plan-locked:hover {
                opacity: 0.85 !important;
            }
        `;
        document.head.appendChild(style);
    }
    // دالة قفل الأزرار التنفيذية داخل الخطة فقط
    function lockStudyPlanButtons() {
        // إذا كان لديه حق الوصول، لا نفعل شيئاً
        if (hasStudyPlanAccess()) return;

        // نعمل فقط داخل حاوية الخطة
        const container = document.getElementById('studyPlannerContainer');
        if (!container) return;

        // ===== 1. قفل أزرار الأقسام (planner-section-btn) - مع استثناء أدوات التحكم =====
        container.querySelectorAll('.planner-section-btn').forEach(btn => {
            // 🟢 استثناء: إذا كان الزر داخل أدوات التحكم، لا نغلقه
            const isInCustomize = btn.closest('#customWeightsContainer') || btn.closest('.planner-card')?.querySelector('#customWeightsContainer');
            if (isInCustomize) return;
            
            if (btn.dataset.studyPlanLocked) return;
            btn.dataset.studyPlanLocked = 'true';
            btn.classList.add('study-plan-locked');

            const originalClick = btn.onclick;
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsAppSubscribe();
                return false;
            };
        });

        // ===== 2. قفل زر "فحص" داخل الخطة (باستثناء أدوات التحكم) =====
        container.querySelectorAll('.planner-check-btn, #plannerSetupBtn, .planner-check-btn, .planner-section-btn[data-skill]').forEach(btn => {
            // 🟢 استثناء: إذا كان الزر داخل أدوات التحكم، لا نغلقه (سنقفل فقط customCheckBtn لاحقاً)
            const isInCustomize = btn.closest('#customWeightsContainer') || btn.closest('.planner-card')?.querySelector('#customWeightsContainer');
            if (isInCustomize) return;
            
            if (btn.dataset.studyPlanLocked) return;
            btn.dataset.studyPlanLocked = 'true';
            btn.classList.add('study-plan-locked');

            const originalClick = btn.onclick;
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsAppSubscribe();
                return false;
            };
        });

        // ===== 3. قفل زر "فحص" داخل أدوات التحكم (customCheckBtn) فقط =====
        const customCheckBtn = container.querySelector('#customCheckBtn');
        if (customCheckBtn && !customCheckBtn.dataset.studyPlanLocked) {
            customCheckBtn.dataset.studyPlanLocked = 'true';
            customCheckBtn.classList.add('study-plan-locked');
            const originalClick = customCheckBtn.onclick;
            customCheckBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsAppSubscribe();
                return false;
            };
        }

        // ===== 4. قفل بطاقات الامتحانات داخل الخطة (exam-card) =====
        container.querySelectorAll('.exam-card').forEach(card => {
            if (card.dataset.studyPlanLocked) return;
            card.dataset.studyPlanLocked = 'true';
            card.classList.add('study-plan-locked');

            const originalClick = card.onclick;
            card.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsAppSubscribe();
                return false;
            };
        });

        // ===== 5. قفل أي زر تنفيذي داخل الخطة (باستثناء أزرار الإعدادات والمعلومات) =====
        container.querySelectorAll('.planner-card button, .planner-card .exam-card').forEach(el => {
            if (el.dataset.studyPlanLocked) return;
            const isNonExec = el.id === 'plannerSettingsBtn' || el.id === 'plannerInfoBtn';
            if (isNonExec) return;
            
            // 🟢 استثناء: إذا كان العنصر داخل أدوات التحكم، نتركه يعمل
            const isInCustomize = el.closest('#customWeightsContainer') || el.closest('.planner-card')?.querySelector('#customWeightsContainer');
            if (isInCustomize) return;
            
            el.dataset.studyPlanLocked = 'true';
            el.classList.add('study-plan-locked');
            el.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsAppSubscribe();
                return false;
            });
        });

        // ===== 6. حماية إضافية: منع أي click على العناصر المقفلة من تنفيذ أي كود آخر =====
        container.querySelectorAll('.study-plan-locked').forEach(el => {
            if (el.dataset.studyPlanLockedCapture) return;
            el.dataset.studyPlanLockedCapture = 'true';
            el.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openWhatsAppSubscribe();
                return false;
            }, true);
        });
    }
     function applyStudyPlanLock() {
        // تحديث المتغيرات العامة للتأكد من صلاحية التاريخ
        if (window.userStudyPlanUntil) {
            const now = new Date();
            const expiry = new Date(window.userStudyPlanUntil);
            // إذا انتهى التاريخ، نضبط window.userStudyPlan إلى false مؤقتاً (للقفل)
            if (expiry < now) {
                window.userStudyPlan = false;
            }
        }
        setTimeout(lockStudyPlanButtons, 50);
    }
    // مراقبة التغييرات في DOM لإعادة تطبيق القفل (داخل الحاوية فقط)
    function setupObserver() {
        const container = document.getElementById('studyPlannerContainer');
        if (!container) return;
        const observer = new MutationObserver(function() {
            applyStudyPlanLock();
        });
        observer.observe(container, { childList: true, subtree: true });
        // حفظ مرجع لإزالة المراقبة لاحقاً إذا لزم الأمر
        window._studyPlanObserver = observer;
    }

    // تصدير الدوال للاستخدام العالمي
    window.openWhatsAppSubscribe = openWhatsAppSubscribe;
    window.hasStudyPlanAccess = hasStudyPlanAccess;
    window.applyStudyPlanLock = applyStudyPlanLock;
    window.lockStudyPlanButtons = lockStudyPlanButtons;

    // بدء التشغيل بعد تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        addLockStyles(); // إضافة CSS للقفل
        setupObserver();
        setTimeout(applyStudyPlanLock, 200);
    });

    // عند فتح الخطة، نطبق القفل
    const plannerBtn = document.getElementById('studyPlannerBtn');
    if (plannerBtn) {
        plannerBtn.addEventListener('click', function() {
            setTimeout(applyStudyPlanLock, 150);
        });
    }

    console.log('✅ studyPlanAccess.js تم تحميله بنجاح (طبقة مستقلة)');
})();
