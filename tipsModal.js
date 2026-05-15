// tipsModal.js - نافذة نصائح الدراسة

(function() {
    "use strict";
    
    // محتوى النصائح
    const tipsContent = {
        welcome: {
            icon: "🎯",
            title: "طريقة المراجعة الذكية",
            subtitle: "اتبع هذه الخطوات البسيطة لتحصل على أفضل نتيجة"
        },
        steps: [
            {
                number: "1",
                icon: "🍅",
                title: "راجع بتركيز",
                description: "راجع الامتحانات اللي بغيتي باستخدام نظام <span class='step-highlight'>بومودورو</span>، وبعد كل ساعة ونصف سير كول شي حاجة كتعجبك 😋 ولا شرب شي كاس ديال اتاي ☕"
            },
            {
                number: "2",
                icon: "🌿",
                title: "خذ راحة فعّالة",
                description: "من بعد ما تراجع دكشي اللي قديتي عليه، سير بدل الجو شوية، دير اللي بغيتي المهم نسى وطلق عقلك يستراح (ما بين <span class='step-highlight'>1 ساعة و 3 ساعات</span>)"
            },
            {
                number: "3",
                icon: "🔄",
                title: "التكرار المذهل",
                description: "من بعد عاود دخل للامتحانات اللي راجعتي ولعب فيهم لكل امتحان لعب وعاود مبين <span class='step-highlight'>3 لـ 5 مرات</span>"
            },
            {
                number: "4",
                icon: "📅",
                title: "المراجعة اليومية",
                description: "غدا تاني نفس الحاجة ولاكن حاول تلعب فشي امتحانات درتيهم لبارح، هاد الشي مهيخدش منك الوقت <span class='step-highlight'>⚡</span>"
            }
        ],
        motto: "🫡 راك ناجح"
    };
    
    // إنشاء عناصر الـ Modal
    function createTipsModal() {
        // التحقق إذا كان الـ Modal موجود مسبقاً
        if (document.getElementById('tipsModalOverlay')) return;
        
        // إنشاء الـ Overlay
        const overlay = document.createElement('div');
        overlay.id = 'tipsModalOverlay';
        overlay.className = 'tips-modal-overlay';
        
        // إنشاء المحتوى
        overlay.innerHTML = `
            <div class="tips-modal-container">
                <div class="tips-modal-header">
                    <h3>
                        <span>💡</span>
                        كفاش؟ طريقة المراجعة
                    </h3>
                    <button class="close-tips-modal" id="closeTipsModalBtn">✕</button>
                </div>
                
                <div class="tips-modal-body">
                    <div class="tips-welcome-card">
                        <div class="welcome-icon">${tipsContent.welcome.icon}</div>
                        <h4>${tipsContent.welcome.title}</h4>
                        <p>${tipsContent.welcome.subtitle}</p>
                    </div>
                    
                    <div class="tips-steps-list">
                        ${tipsContent.steps.map(step => `
                            <div class="tips-step">
                                <div class="step-number">${step.number}</div>
                                <div class="step-content">
                                    <h4>${step.icon} ${step.title}</h4>
                                    <p>${step.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="tips-modal-footer">
                    <div class="motto">
                        <span>🫡</span>
                        ${tipsContent.motto}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // إضافة مستمعي الأحداث
        const closeBtn = document.getElementById('closeTipsModalBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeTipsModal);
        }
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeTipsModal();
            }
        });
        
        // إغلاق بالـ Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeTipsModal();
            }
        });
    }
    
    function openTipsModal() {
        let overlay = document.getElementById('tipsModalOverlay');
        if (!overlay) {
            createTipsModal();
            overlay = document.getElementById('tipsModalOverlay');
        }
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeTipsModal() {
        const overlay = document.getElementById('tipsModalOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // إضافة زر "💡 كفاش؟" في الشريط العلوي
    function addTipsButton() {
        const rightSide = document.querySelector('.top-bar .right-side');
        if (!rightSide) {
            setTimeout(addTipsButton, 500);
            return;
        }
        
        // التحقق إذا كان الزر موجود مسبقاً
        if (document.getElementById('tipsTriggerBtn')) return;
        
        // البحث عن مكان زر الإشعارات
        const notificationContainer = rightSide.querySelector('.notification-container');
        
        // إنشاء الزر الجديد
        const tipsBtn = document.createElement('button');
        tipsBtn.id = 'tipsTriggerBtn';
        tipsBtn.className = 'tips-trigger-btn';
        tipsBtn.innerHTML = '💡 كفاش؟';
        tipsBtn.setAttribute('title', 'نصائح للمراجعة الذكية');
        
        // إضافة الزر بجانب الإشعارات
        if (notificationContainer) {
            rightSide.insertBefore(tipsBtn, notificationContainer);
        } else {
            rightSide.insertBefore(tipsBtn, rightSide.firstChild);
        }
        
        // إضافة حدث الضغط
        tipsBtn.addEventListener('click', openTipsModal);
        
        console.log('💡 زر "كفاش؟" تمت إضافته بنجاح');
    }
    
    // تهيئة كل شيء عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createTipsModal();
            setTimeout(addTipsButton, 300);
        });
    } else {
        createTipsModal();
        setTimeout(addTipsButton, 300);
    }
})();