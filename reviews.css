/* ========================================
   reviews.css - نظام التقييمات
   ======================================== */

/* زر التقييمات */
.reviews-stats-btn {
    background: linear-gradient(135deg, #2c3e66, #1a2a4a);
    border: 1px solid rgba(100, 150, 200, 0.3);
    border-radius: 30px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
    font-family: inherit;
    margin-left: 10px;
}

.reviews-stats-btn:hover {
    background: linear-gradient(135deg, #3a5a8a, #2a3a5a);
    border-color: rgba(100, 150, 200, 0.6);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* نافذة التقييمات */
.reviews-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    z-index: 10050;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.reviews-modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.reviews-modal-container {
    background: linear-gradient(145deg, #1a1a2e, #0f0f1a);
    border-radius: 28px;
    max-width: 480px;
    width: 90%;
    max-height: 85vh;
    margin: 20px;
    border: 1px solid rgba(100, 150, 200, 0.25);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transform: scale(0.95);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.reviews-modal-overlay.active .reviews-modal-container {
    transform: scale(1);
}

/* رأس النافذة */
.reviews-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.reviews-modal-header h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 8px;
}

.close-reviews-stats {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 1.3rem;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.close-reviews-stats:hover {
    background: rgba(255, 100, 100, 0.3);
    transform: rotate(90deg);
}

/* محتوى النافذة */
.reviews-modal-body {
    padding: 20px 24px;
    overflow-y: auto;
    flex: 1;
}

.reviews-modal-body::-webkit-scrollbar {
    width: 5px;
}

.reviews-modal-body::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

.reviews-modal-body::-webkit-scrollbar-thumb {
    background: #5dade2;
    border-radius: 10px;
}

/* بطاقة الإحصائيات */
.stats-card {
    background: linear-gradient(135deg, rgba(44, 62, 102, 0.3), rgba(30, 40, 60, 0.2));
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    margin-bottom: 24px;
    border: 1px solid rgba(100, 150, 200, 0.2);
}

.average-rating {
    font-size: 3rem;
    font-weight: 800;
    color: #f5a623;
    margin-bottom: 8px;
}

.stars-display {
    font-size: 1.2rem;
    letter-spacing: 4px;
    color: #f5a623;
    margin-bottom: 12px;
}

.total-reviews {
    color: #a0a0a0;
    font-size: 0.9rem;
}

/* قسم إضافة تقييم */
.add-review-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 24px;
    border: 1px solid rgba(100, 150, 200, 0.15);
}

.add-review-section h4 {
    color: #ffffff;
    margin: 0 0 15px 0;
    font-size: 1rem;
}

.star-rating-input {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 15px;
    direction: ltr;
}

.star-rating-input .star {
    font-size: 2rem;
    cursor: pointer;
    color: #4a4a5a;
    transition: all 0.2s ease;
}

.star-rating-input .star:hover,
.star-rating-input .star.active {
    color: #f5a623;
}

.review-text-input {
    width: 100%;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(100, 150, 200, 0.3);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    font-family: inherit;
    font-size: 0.85rem;
    resize: vertical;
    margin-bottom: 15px;
    box-sizing: border-box;
}

.review-text-input:focus {
    outline: none;
    border-color: #5dade2;
}

.submit-review-btn {
    width: 100%;
    background: linear-gradient(135deg, #2c3e66, #1a2a4a);
    border: 1px solid rgba(100, 150, 200, 0.3);
    border-radius: 40px;
    padding: 12px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-review-btn:hover {
    background: linear-gradient(135deg, #3a5a8a, #2a3a5a);
    border-color: #5dade2;
    transform: translateY(-1px);
}

.submit-review-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* رسالة النجاح */
.success-message {
    background: rgba(40, 167, 69, 0.2);
    border: 1px solid #28a745;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    color: #28a745;
    font-size: 0.85rem;
    margin-top: 10px;
}

.error-message {
    background: rgba(220, 53, 69, 0.2);
    border: 1px solid #dc3545;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 10px;
}

/* قائمة التقييمات */
.reviews-list {
    margin-top: 20px;
}

.reviews-list h4 {
    color: #ffffff;
    margin: 0 0 15px 0;
    font-size: 1rem;
}

.review-item {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 15px;
    margin-bottom: 12px;
    border: 1px solid rgba(100, 150, 200, 0.1);
}

.review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.review-stars {
    color: #f5a623;
    font-size: 0.85rem;
    letter-spacing: 2px;
}

.review-date {
    color: #888;
    font-size: 0.7rem;
}

.review-text {
    color: #c0c0c0;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
}

.no-reviews {
    text-align: center;
    color: #888;
    padding: 20px;
}

/* تذييل النافذة */
.reviews-modal-footer {
    background: rgba(44, 62, 102, 0.2);
    padding: 12px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
    font-size: 0.75rem;
    color: #888;
}

/* إخفاء الزر في الصفحات غير الرئيسية */
body:has(#list.active) .reviews-stats-btn,
body:has(#exam.active) .reviews-stats-btn {
    display: none !important;
}

body:has(#home.active) .reviews-stats-btn {
    display: flex !important;
}

/* الوضع الليلي للبطاقة */
body.dark-mode .reviews-modal-container {
    background: linear-gradient(145deg, #0a0a12, #050508);
}

body.dark-mode .review-item {
    background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 550px) {
    .reviews-modal-container {
        width: 95%;
    }
    .star-rating-input .star {
        font-size: 1.5rem;
    }
    .reviews-modal-body {
        padding: 15px 18px;
    }
}
/* تنسيق زر معلومات إضافية */
.extra-info-section {
    margin-top: 20px;
    text-align: center;
}

.extra-info-btn {
    background: rgba(100, 150, 200, 0.15);
    border: 1px solid rgba(100, 150, 200, 0.3);
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #5dade2;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}

.extra-info-btn:hover {
    background: rgba(100, 150, 200, 0.25);
    transform: translateY(-1px);
}

.extra-info-content {
    margin-top: 15px;
    animation: fadeIn 0.3s ease;
}

.info-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 15px;
    text-align: center;
    color: #c0c0c0;
    font-size: 0.9rem;
    line-height: 1.8;
    border: 1px solid rgba(100, 150, 200, 0.15);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
