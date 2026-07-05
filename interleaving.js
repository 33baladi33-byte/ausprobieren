// interleaving.js - إدارة خلط الأسئلة

class InterleavingManager {
    constructor() {
        this.isActive = false;
        this.shuffledIndices = [];
        this.originalIndices = [];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    shuffleQuestions(questions) {
        if (!questions || questions.length === 0) return null;
        
        if (!this.isActive) {
            this.originalIndices = questions.map((_, i) => i);
        }
        
        this.shuffledIndices = this.shuffleArray(questions.map((_, i) => i));
        this.isActive = true;
        
        return this.shuffledIndices.map(i => questions[i]);
    }

    unshuffleQuestions(questions) {
        if (!this.originalIndices.length) return questions;
        
        const originalQuestions = this.originalIndices.map(i => questions[i]);
        this.isActive = false;
        this.shuffledIndices = [];
        
        return originalQuestions;
    }

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
