// interleaving.js - إدارة خلط الأسئلة

class InterleavingManager {
    constructor() {
        this.isActive = false;
        this.shuffledIndices = [];
        this.originalIndices = [];
        this.originalQuestions = [];
        this.shuffledQuestions = [];
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
            this.originalQuestions = [...questions];
            this.originalIndices = questions.map((_, i) => i);
        }
        
        this.shuffledIndices = this.shuffleArray(questions.map((_, i) => i));
        this.shuffledQuestions = this.shuffledIndices.map(i => questions[i]);
        this.isActive = true;
        
        return this.shuffledQuestions;
    }

    unshuffleQuestions() {
        if (!this.isActive) {
            return this.originalQuestions;
        }
        
        this.isActive = false;
        this.shuffledIndices = [];
        this.shuffledQuestions = [];
        
        return this.originalQuestions;
    }

    isShuffleActive() {
        return this.isActive;
    }

    reset() {
        this.isActive = false;
        this.shuffledIndices = [];
        this.originalIndices = [];
        this.originalQuestions = [];
        this.shuffledQuestions = [];
    }
}

// ✅ تصدير افتراضي صحيح
export default InterleavingManager;

// ✅ أيضاً تصدير كـ window للاستخدام العالمي
if (typeof window !== 'undefined') {
    window.InterleavingManager = InterleavingManager;
}
