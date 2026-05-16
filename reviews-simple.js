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
