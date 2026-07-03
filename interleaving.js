// interleaving.js - إدارة خلط الأسئلة في واجهة العرض فقط

class InterleavingManager {
    constructor() {
        this.isActive = false;
        this.shuffledIndices = [];
        this.originalIndices = [];
    }

    // خلط مصفوفة باستخدام خوارزمية Fisher-Yates
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // تطبيق الخلط على الأسئلة
    shuffleQuestions(questions) {
        if (!questions || questions.length === 0) return null;
        
        // حفظ الترتيب الأصلي
        if (!this.isActive) {
            this.originalIndices = questions.map((_, i) => i);
        }
        
        // إنشاء ترتيب عشوائي جديد
        this.shuffledIndices = this.shuffleArray(questions.map((_, i) => i));
        this.isActive = true;
        
        // إرجاع الأسئلة بالترتيب الجديد
        return this.shuffledIndices.map(i => questions[i]);
    }

    // إلغاء الخلط والعودة للترتيب الأصلي
    unshuffleQuestions(questions) {
        if (!this.originalIndices.length) return questions;
        
        const originalQuestions = this.originalIndices.map(i => questions[i]);
        this.isActive = false;
        this.shuffledIndices = [];
        
        return originalQuestions;
    }

    // الحصول على الترتيب الحالي
    getCurrentOrder() {
        return this.isActive ? this.shuffledIndices : this.originalIndices;
    }

    // إعادة تعيين
    reset() {
        this.isActive = false;
        this.shuffledIndices = [];
        this.originalIndices = [];
    }
}

// تصدير للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InterleavingManager;
}
