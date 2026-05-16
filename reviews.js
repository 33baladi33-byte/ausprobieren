// ============================================
// reviews.js - نظام إدارة التقييمات
// ============================================

(function() {
    "use strict";
    
    // ========== إعدادات Firebase (استبدلها ببيانات مشروعك) ==========
    const firebaseConfig = {
        apiKey: "AIzaSyDummyKeyPleaseReplaceWithYourOwn",
        authDomain: "zertivab2.firebaseapp.com",
        projectId: "zertivab2",
        storageBucket: "zertivab2.firebasestorage.app",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:abcdef1234567890"
    };
    
    // متغيرات عامة
    let db = null;
    let currentUserRating = null;
    let currentUserEmail = null;
    
    // ========== تهيئة Firebase ==========
    function initFirebase() {
        if (typeof firebase !== 'undefined' && !db) {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.firestore();
            console.log("✅ Firebase initialized for reviews");
            return true;
        }
        return false;
    }
    
    // ========== جلب جميع التقييمات ==========
    async function fetchAllReviews() {
        if (!db) return [];
        try {
            const snapshot = await db.collection('reviews')
                .orderBy('createdAt', 'desc')
                .limit(20)
                .get();
            
            const reviews = [];
            snapshot.forEach(doc => {
                reviews.push({ id: doc.id, ...doc.data() });
            });
            return reviews;
        } catch(e) {
            console.error("❌ Error fetching reviews:", e);
            return [];
        }
    }
    
    // ========== جلب إحصائيات التقييمات ==========
    async function fetchReviewStats() {
        if (!db) return { average: 0, total: 0 };
        try {
            const snapshot = await db.collection('reviews').get();
            const total = snapshot.size;
            if (total === 0) return { average: 0, total: 0 };
            
            let sum = 0;
            snapshot.forEach(doc => {
                sum += doc.data().rating || 0;
            });
            const average = (sum / total).toFixed(1);
            return { average: parseFloat(average), total };
        } catch(e) {
            console.error("❌ Error fetching stats:", e);
            return { average: 0, total: 0 };
        }
    }
    
    // ========== جلب تقييم المستخدم الحالي ==========
    async function fetchUserRating(email) {
        if (!db || !email) return null;
        try {
            const snapshot = await db.collection('reviews')
                .where('email', '==', email)
                .limit(1)
                .get();
            
            if (!snapshot.empty) {
                return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
            }
            return null;
        } catch(e) {
            console.error("❌ Error fetching user rating:", e);
            return null;
        }
    }
    
    // ========== إضافة تقييم جديد ==========
    async function addReview(email, rating, comment) {
        if (!db) return { success: false, message: "Firebase not initialized" };
        if (!email) return { success: false, message: "الرجاء تسجيل الدخول أولاً" };
        
        // التحقق من عدم وجود تقييم سابق للمستخدم
        const existing = await fetchUserRating(email);
        if (existing) {
            return { success: false, message: "لقد قمت بتقييم الموقع مسبقاً! شكراً لك ❤️" };
        }
        
        if (rating < 1 || rating > 5) {
            return { success: false, message: "الرجاء اختيار تقييم بين 1 و 5 نجوم" };
        }
        
        try {
            await db.collection('reviews').add({
                email: email,
                rating: rating,
                comment: comment || "",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, message: "شكراً لتقييمك! 🌟" };
        } catch(e) {
            console.error("❌ Error adding review:", e);
            return { success: false, message: "حدث خطأ، الرجاء المحاولة لاحقاً" };
        }
    }
    
    // ========== عرض النجوم ==========
    function renderStars(rating, isInput = false, selectedRating = 0) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (isInput) {
                stars += `<span class="star" data-value="${i}">${i <= selectedRating ? '★' : '☆'}</span>`;
            } else {
                stars += i <= rating ? '★' : '☆';
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
                        <div class="average-rating">--</div>
                        <div class="stars-display">-----</div>
                        <div class="total-reviews">جاري التحميل...</div>
                    </div>
                    
                    <div class="add-review-section" id="addReviewSection">
                        <h4>✍️ أضف تقييمك</h4>
                        <div class="star-rating-input" id="starRatingInput">☆☆☆☆☆</div>
                        <textarea class="review-text-input" id="reviewCommentInput" placeholder="شاركنا تجربتك مع المنصة (اختياري)" rows="3"></textarea>
                        <button class="submit-review-btn" id="submitReviewBtn">إرسال التقييم</button>
                        <div id="submitMessage"></div>
                    </div>
                    
                    <div class="reviews-list" id="reviewsList">
                        <h4>📝 أحدث التقييمات</h4>
                        <div class="loading-reviews">جاري التحميل...</div>
                    </div>
                </div>
                <div class="reviews-modal-footer">
                    🌟 أكثر من 500 مستخدم وثقوا في Zertiva B2
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
        
        // إضافة أحداث النجوم للإدخال
        setupStarInput();
        
        // إضافة حدث زر الإرسال
        const submitBtn = document.getElementById('submitReviewBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => handleSubmitReview());
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
                        if (idx + 1 <= val) {
                            s.style.color = '#f5a623';
                        } else {
                            s.style.color = '#4a4a5a';
                        }
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
    
    // ========== معالجة إرسال التقييم ==========
    async function handleSubmitReview() {
        const email = localStorage.getItem('zertiva_email');
        const submitBtn = document.getElementById('submitReviewBtn');
        const messageDiv = document.getElementById('submitMessage');
        
        if (!email) {
            messageDiv.innerHTML = '<div class="error-message">الرجاء تسجيل الدخول أولاً لتقييم الموقع</div>';
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
            return;
        }
        
        if (currentSelectedRating === 0) {
            messageDiv.innerHTML = '<div class="error-message">الرجاء اختيار عدد النجوم</div>';
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';
        
        const comment = document.getElementById('reviewCommentInput').value;
        const result = await addReview(email, currentSelectedRating, comment);
        
        if (result.success) {
            messageDiv.innerHTML = `<div class="success-message">${result.message}</div>`;
            currentSelectedRating = 0;
            document.getElementById('reviewCommentInput').value = '';
            setupStarInput();
            
            // تحديث البيانات
            await loadReviewsData();
            
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        } else {
            messageDiv.innerHTML = `<div class="error-message">${result.message}</div>`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 3000);
        }
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'إرسال التقييم';
    }
    
    // ========== تحميل وعرض البيانات ==========
    async function loadReviewsData() {
        if (!db) {
            if (!initFirebase()) {
                console.warn("⚠️ Firebase not loaded yet, retrying...");
                setTimeout(loadReviewsData, 500);
                return;
            }
        }
        
        // تحميل الإحصائيات
        const stats = await fetchReviewStats();
        const statsCard = document.getElementById('statsCard');
        if (statsCard) {
            const avgDiv = statsCard.querySelector('.average-rating');
            const starsDiv = statsCard.querySelector('.stars-display');
            const totalDiv = statsCard.querySelector('.total-reviews');
            
            if (avgDiv) avgDiv.textContent = `${stats.average} / 5`;
            if (starsDiv) starsDiv.textContent = renderStars(Math.round(stats.average));
            if (totalDiv) totalDiv.textContent = `📊 ${stats.total} تقييم${stats.total !== 1 ? 'ات' : ''}`;
        }
        
        // تحميل التقييمات
        const reviews = await fetchAllReviews();
        const reviewsList = document.getElementById('reviewsList');
        if (reviewsList) {
            const listContainer = reviewsList;
            const header = listContainer.querySelector('h4');
            listContainer.innerHTML = '';
            if (header) listContainer.appendChild(header);
            
            if (reviews.length === 0) {
                listContainer.innerHTML += '<div class="no-reviews">✨ لا توجد تقييمات بعد. كن أول من يقيّم!</div>';
            } else {
                reviews.forEach(review => {
                    const date = review.createdAt ? new Date(review.createdAt.toDate()).toLocaleDateString('ar') : 'تاريخ غير معروف';
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'review-item';
                    reviewDiv.innerHTML = `
                        <div class="review-header">
                            <div class="review-stars">${renderStars(review.rating)}</div>
                            <div class="review-date">${date}</div>
                        </div>
                        ${review.comment ? `<p class="review-text">${escapeHtml(review.comment)}</p>` : ''}
                    `;
                    listContainer.appendChild(reviewDiv);
                });
            }
        }
    }
    
    // ========== دالة مساعدة لتجنب XSS ==========
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ========== فتح وإغلاق النافذة ==========
    function openReviewsModal() {
        let modal = document.getElementById('reviewsStatsModal');
        if (!modal) {
            modal = createReviewsModal();
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadReviewsData();
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
        
        // إضافة الزر بجانب زر كفاش أو الإشعارات
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
        setTimeout(() => {
            initFirebase();
            addReviewsButton();
            setTimeout(observeHomePage, 100);
        }, 500);
    }
    
    // تحميل Firebase SDK أولاً
    if (typeof firebase === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
        script.onload = () => {
            const scriptFirestore = document.createElement('script');
            scriptFirestore.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
            scriptFirestore.onload = init;
            document.head.appendChild(scriptFirestore);
        };
        document.head.appendChild(script);
    } else {
        init();
    }
    
})();