// ============================================
// reviews-simple.js - نظام تقييمات بسيط بدون Firebase
// ============================================

(function() {
    "use strict";
    
    // ========== البيانات الافتراضية ==========
    let reviewStats = {
        average: 4.5,
        total: 59
    };
    
    let userHasRated = false;
    
    // ========== تحميل البيانات من LocalStorage ==========
    function loadStats() {
        const savedStats = localStorage.getItem('zertiva_reviews_stats');
        if (savedStats) {
            const parsed = JSON.parse(savedStats);
            reviewStats.average = parsed.average;
            reviewStats.total = parsed.total;
        }
        
        // التحقق إذا كان المستخدم الحالي قد قيم من قبل
        const currentUser = localStorage.getItem('zertiva_email');
        if (currentUser) {
            const ratedUsers = JSON.parse(localStorage.getItem('zertiva_rated_users') || '{}');
            userHasRated = !!ratedUsers[currentUser];
        }
    }
    
    // ========== حفظ البيانات ==========
    function saveStats() {
        localStorage.setItem('zertiva_reviews_stats', JSON.stringify({
            average: reviewStats.average,
            total: reviewStats.total
        }));
    }
    
    // ========== إضافة تقييم جديد ==========
    function addRating(rating) {
        const currentUser = localStorage.getItem('zertiva_email');
        
        // التحقق من تسجيل الدخول
        if (!currentUser) {
            return { success: false, message: "الرجاء تسجيل الدخول أولاً لتقييم الموقع" };
        }
        
        // التحقق من أن المستخدم لم يقيم من قبل
        const ratedUsers = JSON.parse(localStorage.getItem('zertiva_rated_users') || '{}');
        if (ratedUsers[currentUser]) {
            return { success: false, message: "لقد قمت بتقييم الموقع مسبقاً! شكراً لك ❤️" };
        }
        
        // حساب المتوسط الجديد
        const oldTotal = reviewStats.total;
        const oldSum = reviewStats.average * oldTotal;
        const newSum = oldSum + rating;
        const newTotal = oldTotal + 1;
        const newAverage = newSum / newTotal;
        
        // تحديث الإحصائيات
        reviewStats.average = parseFloat(newAverage.toFixed(1));
        reviewStats.total = newTotal;
        
        // حفظ المستخدم كمن قام بالتقييم
        ratedUsers[currentUser] = {
            rating: rating,
            date: new Date().toISOString()
        };
        localStorage.setItem('zertiva_rated_users', JSON.stringify(ratedUsers));
        
        // حفظ الإحصائيات
        saveStats();
        
        // رسالة تشجيعية
        const encouragementMessage = "🎉 شكراً جزيلاً! تقييمك يساعدنا على تحسين المنصة وتقديم الأفضل لك";
        
        return { 
            success: true, 
            message: `✅ ${encouragementMessage}\n\n⭐ الآن ${reviewStats.total} تقييماً بمتوسط ${reviewStats.average} / 5\n\n🔹 تقييمك يساعد الآلاف من المستخدمين الجدد لاختيار المنصة بثقة`,
            stats: reviewStats
        };
    }
    
    // ========== عرض النجوم ==========
    function renderStars(rating, isInput = false, selectedRating = 0) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (isInput) {
                stars += `<span class="star" data-value="${i}">${i <= selectedRating ? '★' : '☆'}</span>`;
            } else {
                stars += i <= Math.round(rating) ? '★' : '☆';
            }
        }
        return stars;
    }
    
    // ========== إنشاء نافذة التقييمات ==========
    function createReviewsModal() {
        if (document.getElementById('reviewsStatsModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'reviewsStatsModal';
        modal.className = 'reviews-modal-overlay';
        modal.innerHTML = `
            <div class="reviews-modal-container">
                <div class="reviews-modal-header">
                    <h3>⭐ التقييمات</h3>
                    <button class="close-reviews-stats">✕</button>
                </div>
                <div class="reviews-modal-body">
                    <div class="stats-card" id="statsCard">
                        <div class="average-rating">${reviewStats.average} / 5</div>
                        <div class="stars-display">${renderStars(reviewStats.average)}</div>
                        <div class="total-reviews">📊 ${reviewStats.total} تقييم${reviewStats.total !== 1 ? 'ات' : ''}</div>
                    </div>
                    
                    <div class="add-review-section" id="addReviewSection">
                        <h4>✍️ أضف تقييمك</h4>
                        <div class="star-rating-input" id="starRatingInput">☆☆☆☆☆</div>
                        <button class="submit-review-btn" id="submitReviewBtn">إرسال التقييم</button>
                        <div id="submitMessage"></div>
                    </div>
                    
                    <!-- زر معلومات إضافية -->
                    <div class="extra-info-section">
                        <button id="extraInfoBtn" class="extra-info-btn">📝 معلومات إضافية</button>
                        <div id="extraInfoContent" class="extra-info-content" style="display: none;">
                            <div class="info-card">
                                ⭐ ${reviewStats.total} مستخدم سبق وقيموا المنصة<br>
                                متوسط التقييم: ${reviewStats.average} / 5
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reviews-modal-footer">
                    🌟 أكثر من ${reviewStats.total} مستخدم وثقوا في Zertiva B2
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // إضافة الأحداث
        const closeBtn = modal.querySelector('.close-reviews-stats');
        closeBtn.addEventListener('click', () => closeReviewsModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeReviewsModal();
        });
        
        // إعداد نجوم الإدخال
        setupStarInput();
        
        // إضافة حدث زر الإرسال
        const submitBtn = document.getElementById('submitReviewBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => handleSubmitReview());
        }
        
        // إضافة حدث زر معلومات إضافية
        const extraBtn = document.getElementById('extraInfoBtn');
        const extraContent = document.getElementById('extraInfoContent');
        if (extraBtn && extraContent) {
            extraBtn.addEventListener('click', () => {
                const isVisible = extraContent.style.display === 'block';
                extraContent.style.display = isVisible ? 'none' : 'block';
                extraBtn.innerHTML = isVisible ? '📝 معلومات إضافية' : '📖 إخفاء المعلومات';
            });
        }
        
        return modal;
    }
    
    // ========== إعداد نجوم الإدخال ==========
    let currentSelectedRating = 0;
    
    function setupStarInput() {
        const starContainer = document.getElementById('starRatingInput');
        if (!starContainer) return;
        
        function updateStarsUI() {
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<span class="star" data-value="${i}">${i <= currentSelectedRating ? '★' : '☆'}</span>`;
            }
            starContainer.innerHTML = starsHtml;
            
            // إعادة إضافة الأحداث
            starContainer.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', () => {
                    currentSelectedRating = parseInt(star.dataset.value);
                    updateStarsUI();
                });
                star.addEventListener('mouseenter', () => {
                    const val = parseInt(star.dataset.value);
                    starContainer.querySelectorAll('.star').forEach((s, idx) => {
                        s.style.color = idx + 1 <= val ? '#f5a623' : '#4a4a5a';
                    });
                });
                star.addEventListener('mouseleave', () => {
                    starContainer.querySelectorAll('.star').forEach((s, idx) => {
                        s.style.color = idx + 1 <= currentSelectedRating ? '#f5a623' : '#4a4a5a';
                    });
                });
            });
        }
        
        updateStarsUI();
    }
    
    // ========== تحديث واجهة الإحصائيات ==========
    function updateStatsUI() {
        const statsCard = document.getElementById('statsCard');
        if (statsCard) {
            const avgDiv = statsCard.querySelector('.average-rating');
            const starsDiv = statsCard.querySelector('.stars-display');
            const totalDiv = statsCard.querySelector('.total-reviews');
            
            if (avgDiv) avgDiv.textContent = `${reviewStats.average} / 5`;
            if (starsDiv) starsDiv.textContent = renderStars(reviewStats.average);
            if (totalDiv) totalDiv.textContent = `📊 ${reviewStats.total} تقييم${reviewStats.total !== 1 ? 'ات' : ''}`;
        }
        
        // تحديث تذييل النافذة
        const footer = document.querySelector('.reviews-modal-footer');
        if (footer) {
            footer.innerHTML = `🌟 أكثر من ${reviewStats.total} مستخدم وثقوا في Zertiva B2`;
        }
        
        // تحديث محتوى المعلومات الإضافية إذا كان موجوداً
        const infoCard = document.querySelector('.info-card');
        if (infoCard) {
            infoCard.innerHTML = `
                ⭐ ${reviewStats.total} مستخدم سبق وقيموا المنصة<br>
                متوسط التقييم: ${reviewStats.average} / 5
            `;
        }
    }
    
    // ========== معالجة إرسال التقييم ==========
    async function handleSubmitReview() {
        const submitBtn = document.getElementById('submitReviewBtn');
        const messageDiv = document.getElementById('submitMessage');
        
        if (currentSelectedRating === 0) {
            messageDiv.innerHTML = '<div class="error-message">⭐ الرجاء اختيار عدد النجوم أولاً</div>';
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
        
        const result = addRating(currentSelectedRating);
        
        if (result.success) {
            messageDiv.innerHTML = `<div class="success-message" style="white-space: pre-line;">${result.message}</div>`;
            currentSelectedRating = 0;
            setupStarInput();
            updateStatsUI();
            
            // إعادة تمكين الزر بعد 3 ثواني وإخفاء الرسالة بعد 8 ثواني
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 8000);
        } else {
            messageDiv.innerHTML = `<div class="error-message">${result.message}</div>`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        }
        
        submitBtn.disabled = false;
        submitBtn.textContent = '⭐ إرسال التقييم';
    }
    
    // ========== فتح وإغلاق النافذة ==========
    function openReviewsModal() {
        let modal = document.getElementById('reviewsStatsModal');
        if (!modal) {
            modal = createReviewsModal();
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateStatsUI();
    }
    
    function closeReviewsModal() {
        const modal = document.getElementById('reviewsStatsModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // ========== إضافة زر التقييمات في الشريط العلوي ==========
    function addReviewsButton() {
        const rightSide = document.querySelector('.top-bar .right-side');
        if (!rightSide) {
            setTimeout(addReviewsButton, 500);
            return;
        }
        
        if (document.getElementById('reviewsStatsBtn')) return;
        
        const notificationContainer = rightSide.querySelector('.notification-container');
        const tipsBtn = document.getElementById('tipsTriggerBtn');
        
        const reviewsBtn = document.createElement('button');
        reviewsBtn.id = 'reviewsStatsBtn';
        reviewsBtn.className = 'reviews-stats-btn';
        reviewsBtn.innerHTML = '⭐ التقييمات';
        reviewsBtn.setAttribute('title', 'شاهد تقييمات المستخدمين');
        
        // إضافة الزر بجانب زر كفاش
        if (tipsBtn && tipsBtn.style.display !== 'none') {
            rightSide.insertBefore(reviewsBtn, tipsBtn.nextSibling);
        } else if (notificationContainer) {
            rightSide.insertBefore(reviewsBtn, notificationContainer);
        } else {
            rightSide.insertBefore(reviewsBtn, rightSide.firstChild);
        }
        
        reviewsBtn.addEventListener('click', openReviewsModal);
        console.log('⭐ زر التقييمات تمت إضافته بنجاح');
    }
    
    // ========== مراقبة الصفحة الرئيسية ==========
    function observeHomePage() {
        const homePage = document.getElementById('home');
        const reviewsBtn = document.getElementById('reviewsStatsBtn');
        
        if (!homePage || !reviewsBtn) return;
        
        const observer = new MutationObserver(() => {
            if (homePage.classList.contains('active')) {
                reviewsBtn.style.display = 'flex';
            } else {
                reviewsBtn.style.display = 'none';
            }
        });
        
        observer.observe(homePage, { attributes: true, attributeFilter: ['class'] });
        
        if (homePage.classList.contains('active')) {
            reviewsBtn.style.display = 'flex';
        } else {
            reviewsBtn.style.display = 'none';
        }
    }
    
    // ========== التهيئة ==========
    function init() {
        loadStats();
        addReviewsButton();
        setTimeout(observeHomePage, 100);
    }
    
    // بدء التشغيل
    init();
    
})();
