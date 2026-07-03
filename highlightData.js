// ============================================
// highlight.js - تلوين بسيط من HELP_DATA
// ============================================

// ألوان مريحة
const COLORS = [
    { color: '#2F6FE4', bg: 'rgba(79,142,247,0.14)' },
    { color: '#2F8C5C', bg: 'rgba(59,170,114,0.14)' },
    { color: '#6A4B9A', bg: 'rgba(138,99,210,0.14)' },
    { color: '#C77A2A', bg: 'rgba(230,154,59,0.14)' },
    { color: '#2A8F9E', bg: 'rgba(57,175,192,0.14)' },
    { color: '#B84A7A', bg: 'rgba(217,108,154,0.14)' },
    { color: '#9A7A3A', bg: 'rgba(184,135,70,0.14)' },
    { color: '#4A5A6A', bg: 'rgba(95,114,133,0.14)' }
];

// تلوين النص
function highlightText(element, text, colorIndex) {
    if (!element || !text) return;
    const c = COLORS[colorIndex % COLORS.length];
    const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    element.innerHTML = element.innerHTML.replace(regex, 
        `<span style="color:${c.color};background:${c.bg};border-radius:4px;padding:1px 3px;font-weight:600;">$&</span>`
    );
}

// تطبيق التلوين على الامتحان
function applyHighlights() {
    const skill = document.querySelector('[id^="hoeren"], [id^="lesen"], [id^="sprach"]')?.id || '';
    if (!skill) return;
    
    const examId = window.currentExamId || 1;
    const key = `${skill}_exam${examId}`;
    
    // جلب الأسئلة الصحيحة من HELP_DATA
    const questions = [];
    for (let key in HELP_DATA) {
        if (key.startsWith(`${skill}_exam${examId}_q`)) {
            const num = parseInt(key.split('_q')[1]);
            questions.push({ num, data: HELP_DATA[key] });
        }
    }
    
    // تلوين كل سؤال
    questions.forEach((q, i) => {
        const container = document.getElementById(skill);
        if (!container) return;
        
        const cards = container.querySelectorAll('.question-card');
        cards.forEach(card => {
            const textEl = card.querySelector('.question-text');
            if (textEl && q.data.text) {
                highlightText(textEl, q.data.text, i);
            }
        });
    });
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(applyHighlights, 500);
});

// تشغيل عند فتح امتحان جديد
const origOpen = window.openExam;
if (origOpen) {
    window.openExam = async function(id, title, skill) {
        await origOpen(id, title, skill);
        setTimeout(applyHighlights, 300);
    };
}

console.log('✅ highlight.js جاهز');
