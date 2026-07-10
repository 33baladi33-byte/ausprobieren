// ============================================
// ربط SentenceReorder مع نظام التصحيح
// ============================================

// تخزين الأيقونات المضافة
let sentenceIcons = [];

// تعديل دالة التصحيح لإضافة أيقونات 🔀 بعد التصحيح
const originalCheckTrueFalse = checkTrueFalseExam;
checkTrueFalseExam = function(container, questions, answers, correctNumbersContainer) {
    // استدعاء الدالة الأصلية
    originalCheckTrueFalse(container, questions, answers, correctNumbersContainer);

    // بعد التصحيح، أضف أيقونات 🔀 للجمل الصحيحة
    setTimeout(() => {
        addSentencePuzzleIcons(container, questions);
    }, 150);
};

function addSentencePuzzleIcons(container, questions) {
    if (!container || !questions) return;

    // البحث عن جميع بطاقات الأسئلة
    const cards = container.querySelectorAll('.question-card');

    cards.forEach((card, index) => {
        // البحث عن نص السؤال
        const textSpan = card.querySelector('span');
        if (!textSpan) return;

        // استخراج رقم السؤال
        const match = textSpan.textContent.match(/^(\d+)/);
        if (!match) return;
        const questionId = parseInt(match[1]);

        // البحث عن السؤال في البيانات
        let question = null;
        for (let q of questions) {
            if (q.displayNumber === questionId) {
                question = q;
                break;
            }
        }

        if (!question) return;

        // إذا كان السؤال صحيحاً (correct: true)
        if (question.correct === true) {
            // البحث عن أيقونة موجودة مسبقاً
            let icon = card.querySelector('.sentence-puzzle-icon');

            if (!icon) {
                // إنشاء أيقونة جديدة
                icon = document.createElement('span');
                icon.className = 'sentence-puzzle-icon';
                icon.textContent = '🔀';
                icon.style.cssText = `
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-right: 10px;
                    display: inline-block;
                    color: #64748b;
                    opacity: 0.6;
                `;

                // إضافة الأيقونة قبل النص
                card.insertBefore(icon, textSpan);
            }

            // إضافة مستمع النقر
            icon.onclick = function(e) {
                e.stopPropagation();

                // فتح نافذة الترتيب
                if (window.SentenceReorder) {
                    // الحصول على النص النظيف
                    const cleanText = textSpan.textContent.replace(/^\d+\s*/, '');
                    const tempElement = document.createElement('span');
                    tempElement.textContent = cleanText;

                    SentenceReorder.open(container, tempElement, questionId, this);
                }
            };

            // تأثير hover
            icon.addEventListener('mouseenter', function() {
                this.style.color = '#2c3e66';
                this.style.opacity = '1';
                this.style.transform = 'scale(1.1)';
            });
            icon.addEventListener('mouseleave', function() {
                this.style.color = '#64748b';
                this.style.opacity = '0.6';
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// ============================================
// زر 🔀 في شريط التنقل
// ============================================

// إضافة زر 🔀 بجانب أزرار التنقل
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.getElementById('examNavButtons');
    if (!navButtons) return;

    // التحقق من وجود الزر بالفعل
    if (document.getElementById('sentencePuzzleNavBtn')) return;

    const puzzleBtn = document.createElement('button');
    puzzleBtn.id = 'sentencePuzzleNavBtn';
    puzzleBtn.className = 'nav-exam-btn';
    puzzleBtn.textContent = '🔀';
    puzzleBtn.title = 'ترتيب الجمل الصحيحة';
    puzzleBtn.style.cssText = `
        padding: 10px 18px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        background: #2c3e66;
        color: white;
        display: none;
    `;

    puzzleBtn.addEventListener('mouseenter', function() {
        this.style.background = '#1a2a4a';
    });
    puzzleBtn.addEventListener('mouseleave', function() {
        this.style.background = '#2c3e66';
    });

    puzzleBtn.addEventListener('click', function() {
        // تنفيذ التصحيح أولاً
        const checkBtn = document.querySelector('.check-btn');
        if (checkBtn) {
            checkBtn.click();

            // بعد التصحيح، البحث عن أول جملة صحيحة وفتحها
            setTimeout(() => {
                const firstIcon = document.querySelector('.sentence-puzzle-icon');
                if (firstIcon) {
                    firstIcon.click();
                }
            }, 300);
        }
    });

    navButtons.appendChild(puzzleBtn);

    // مراقبة ظهور أيقونات 🔀 لإظهار الزر
    const observer = new MutationObserver(function() {
        const icons = document.querySelectorAll('.sentence-puzzle-icon');
        if (icons.length > 0) {
            puzzleBtn.style.display = 'inline-block';
        } else {
            puzzleBtn.style.display = 'none';
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
});

console.log('✅ تم ربط SentenceReorder مع engine.js');
