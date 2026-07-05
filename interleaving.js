// interleaving.js - إدارة خلط الأسئلة

class InterleavingManager {
    constructor() {
        this.isActive = false;
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
        }
        this.shuffledQuestions = this.shuffleArray([...questions]);
        this.isActive = true;
        return this.shuffledQuestions;
    }

    unshuffleQuestions() {
        this.isActive = false;
        this.shuffledQuestions = [];
        return this.originalQuestions;
    }

    reset() {
        this.isActive = false;
        this.originalQuestions = [];
        this.shuffledQuestions = [];
    }
}

// ✅ التصدير الصحيح - يجب أن يكون بهذه الطريقة
export default InterleavingManager;

// ✅ أيضاً للاستخدام العالمي
if (typeof window !== 'undefined') {
    window.InterleavingManager = InterleavingManager;
}
