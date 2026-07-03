// ============================================
// engine.js - محرك الامتحانات المتكامل مع نظام التلوين
// يدعم: Matching + True/False + Teil 2 + Teil 3 + Sprachbausteine Teil 1 + Sprachbausteine Teil 2 + Schreiben + تلوين ذكي
// ============================================

console.log("✅ engine.js تم تحميله (نسخة التلوين الذكي)");

// ============================================
// 🎨 لوحة الألوان الثابتة (8 ألوان مريحة)
// ============================================
const HIGHLIGHT_COLORS = [
    { color: '#2F6FE4', bg: 'rgba(79,142,247,0.14)' },  // أزرق هادئ
    { color: '#2F8C5C', bg: 'rgba(59,170,114,0.14)' },  // أخضر زمردي
    { color: '#6A4B9A', bg: 'rgba(138,99,210,0.14)' },  // بنفسجي
    { color: '#C77A2A', bg: 'rgba(230,154,59,0.14)' },  // برتقالي ناعم
    { color: '#2A8F9E', bg: 'rgba(57,175,192,0.14)' },  // فيروزي
    { color: '#B84A7A', bg: 'rgba(217,108,154,0.14)' }, // وردي معتدل
    { color: '#9A7A3A', bg: 'rgba(184,135,70,0.14)' },  // بني ذهبي
    { color: '#4A5A6A', bg: 'rgba(95,114,133,0.14)' }   // رمادي مزرق
];

// ============================================
// 🎯 نظام التلوين - الحالة
// ============================================
let highlightEnabled = true;
let highlightInitialized = false;

// تحميل الحالة من localStorage
try {
    const saved = localStorage.getItem('highlight_enabled');
    if (saved !== null) {
        highlightEnabled = saved === 'true';
    }
} catch(e) {}

// ============================================
// 🔍 دوال البحث عن البيانات في HELP_DATA
// ============================================
function findHighlightData(skill, examId, questionNumber) {
    if (typeof HELP_DATA === 'undefined') {
        return null;
    }
    
    const patterns = [
        `${skill}_exam${examId}_q${questionNumber}`,
        `${skill}_exam${examId}_${questionNumber}`,
        `${skill}_exam${examId}_${String.fromCharCode(96 + questionNumber)}`
    ];
    
    for (let pattern of patterns) {
        if (HELP_DATA[pattern]) {
            return HELP_DATA[pattern];
        }
    }
    
    // بحث مرن
    for (let key in HELP_DATA) {
        if (key.includes(`exam${examId}`)) {
            if (key.includes(`q${questionNumber}`)) return HELP_DATA[key];
            if (key.includes(`_${questionNumber}`)) return HELP_DATA[key];
            const letter = String.fromCharCode(96 + questionNumber);
            if (key.endsWith(`_${letter}`)) return HELP_DATA[key];
        }
    }
    
    return null;
}

// ============================================
// 🎨 دالة تلوين النص
// ============================================
function applyHighlightToText(element, textToHighlight, colorIndex) {
    if (!element || !textToHighlight || !highlightEnabled) return;
    
    const color = HIGHLIGHT_COLORS[colorIndex % HIGHLIGHT_COLORS.length];
    if (!color) return;
    
    // تجنب التلوين المزدوج
    if (element.querySelector(`[data-highlight="${textToHighlight}"]`)) return;
    
    const html = element.innerHTML;
    const escapedText = textToHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedText})`, 'g');
    
    element.innerHTML = html.replace(regex, (match) => {
        return `<span data-highlight="${match}" style="color:${color.color};background:${color.bg};border-radius:4px;padding:1px 3px;font-weight:600;">${match}</span>`;
    });
}

// ============================================
// 🎯 دالة تلوين الامتحان بالكامل
// ============================================
function applyHighlightsToExam() {
    if (!highlightEnabled) {
        removeAllHighlights();
        return;
    }
    
    const skill = getCurrentSkill();
    const examId = getCurrentExamId();
    
    if (!skill || !examId) return;
    
    // تحديد نوع الامتحان وطريقة التلوين
    const examType = getExamType(skill);
    
    // جمع الأسئلة الصحيحة
    const correctQuestions = getCorrectQuestions(skill, examId);
    if (!correctQuestions || correctQuestions.length === 0) return;
    
    // تلوين كل سؤال حسب نوعه
    for (let i = 0; i < correctQuestions.length; i++) {
        const qNum = correctQuestions[i];
        const data = findHighlightData(skill, examId, qNum);
        if (!data) continue;
        
        const colorIndex = i % HIGHLIGHT_COLORS.length;
        
        // تلوين حسب نوع الامتحان
        switch(examType) {
            case 'lesen1':
            case 'lesen3':
                applyLesen13Highlight(qNum, data, colorIndex);
                break;
            case 'lesen2':
                applyLesen2Highlight(qNum, data, colorIndex);
                break;
            case 'hoeren1':
            case 'hoeren2':
            case 'hoeren3':
                applyHoerenHighlight(qNum, data, colorIndex);
                break;
            case 'sprach1':
            case 'sprach2':
                applySprachHighlight(qNum, data, colorIndex);
                break;
            default:
                break;
        }
    }
}

// ============================================
// 📖 تلوين Lesen Teil 1 و Teil 3
// ============================================
function applyLesen13Highlight(qNum, data, colorIndex) {
    // البحث عن عناصر النص في الصفحة
    const container = document.getElementById(getCurrentSkill());
    if (!container) return;
    
    // البحث عن الفقرة والعنوان في البطاقة
    const cards = container.querySelectorAll('.question-card');
    for (let card of cards) {
        const text = card.querySelector('.question-text');
        if (!text) continue;
        
        // استخراج النص من البيانات
        if (data.text) {
            // Lesen 1: text يحتوي على "الفقرة - العنوان"
            const parts = data.text.split(' - ');
            if (parts.length === 2) {
                applyHighlightToText(text, parts[0].trim(), colorIndex);
                applyHighlightToText(text, parts[1].trim(), colorIndex);
            } else {
                applyHighlightToText(text, data.text, colorIndex);
            }
        }
    }
}

// ============================================
// 📖 تلوين Lesen Teil 2
// ============================================
function applyLesen2Highlight(qNum, data, colorIndex) {
    const container = document.getElementById('teil2');
    if (!container) return;
    
    if (data.text) {
        // البحث عن النص في السؤال
        const cards = container.querySelectorAll('.question-card');
        for (let card of cards) {
            const text = card.querySelector('.question-text');
            if (text) {
                applyHighlightToText(text, data.text, colorIndex);
            }
        }
        
        // البحث في النص الرئيسي
        const textContent = container.querySelector('div[style*="line-height"]');
        if (textContent) {
            applyHighlightToText(textContent, data.text, colorIndex);
        }
    }
}

// ============================================
// 🎧 تلوين Hören 1,2,3
// ============================================
function applyHoerenHighlight(qNum, data, colorIndex) {
    const container = document.getElementById(getCurrentSkill());
    if (!container) return;
    
    if (data.text) {
        // البحث عن النص في الأسئلة
        const cards = container.querySelectorAll('.question-card');
        for (let card of cards) {
            const text = card.querySelector('.question-text');
            if (text) {
                applyHighlightToText(text, data.text, colorIndex);
            }
        }
    }
}

// ============================================
// ✍️ تلوين Sprachbausteine 1,2
// ============================================
function applySprachHighlight(qNum, data, colorIndex) {
    const container = document.getElementById(getCurrentSkill());
    if (!container) return;
    
    if (data.text) {
        // البحث عن النص في المحتوى
        const textElements = container.querySelectorAll('div[style*="line-height"], div[style*="text-align"]');
        for (let el of textElements) {
            applyHighlightToText(el, data.text, colorIndex);
        }
    }
}

// ============================================
// 🧹 إزالة جميع التلوينات
// ============================================
function removeAllHighlights() {
    document.querySelectorAll('[data-highlight]').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            const text = document.createTextNode(el.textContent);
            parent.replaceChild(text, el);
            parent.normalize();
        }
    });
}

// ============================================
// 🔄 تبديل حالة التلوين
// ============================================
function toggleHighlights() {
    highlightEnabled = !highlightEnabled;
    try {
        localStorage.setItem('highlight_enabled', highlightEnabled.toString());
    } catch(e) {}
    
    if (highlightEnabled) {
        applyHighlightsToExam();
    } else {
        removeAllHighlights();
    }
    
    // تحديث نص الزر
    updateHighlightButton();
}

// ============================================
// 🎯 تحديث زر التلوين
// ============================================
function updateHighlightButton() {
    const btn = document.getElementById('highlightToggleBtn');
    if (!btn) return;
    
    if (highlightEnabled) {
        btn.textContent = '🎨 إخفاء الألوان';
        btn.style.background = 'rgba(56, 189, 248, 0.2)';
        btn.style.borderColor = '#38bdf8';
    } else {
        btn.textContent = '👁️ إظهار الألوان';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
    }
}

// ============================================
// 📌 إضافة زر التلوين
// ============================================
function addHighlightButton() {
    if (document.getElementById('highlightToggleBtn')) return;
    
    const nav = document.getElementById('examNavButtons');
    if (!nav) return;
    
    const btn = document.createElement('button');
    btn.id = 'highlightToggleBtn';
    btn.style.cssText = `
        background: ${highlightEnabled ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)'};
        border: 1px solid ${highlightEnabled ? '#38bdf8' : 'rgba(255,255,255,0.1)'};
        border-radius: 30px;
        padding: 6px 14px;
        font-size: 12px;
        font-weight: 500;
        color: ${highlightEnabled ? '#38bdf8' : '#94a3b8'};
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: inherit;
        margin-left: 10px;
    `;
    btn.textContent = highlightEnabled ? '🎨 إخفاء الألوان' : '👁️ إظهار الألوان';
    
    btn.onclick = (e) => {
        e.stopPropagation();
        toggleHighlights();
    };
    
    // إضافة الزر قبل أزرار التنقل
    nav.insertBefore(btn, nav.firstChild);
}

// ============================================
// 🔍 دوال مساعدة
// ============================================
function getCurrentSkill() {
    if (document.getElementById('teil1')?.style.display === 'block') return 'lesen1';
    if (document.getElementById('teil2')?.style.display === 'block') return 'lesen2';
    if (document.getElementById('teil3')?.style.display === 'block') return 'lesen3';
    if (document.getElementById('sprach1')?.style.display === 'block') return 'sprach1';
    if (document.getElementById('sprach2')?.style.display === 'block') return 'sprach2';
    if (document.getElementById('hoeren1')?.style.display === 'block') return 'hoeren1';
    if (document.getElementById('hoeren2')?.style.display === 'block') return 'hoeren2';
    if (document.getElementById('hoeren3')?.style.display === 'block') return 'hoeren3';
    return null;
}

function getCurrentExamId() {
    return window.currentExamId || 1;
}

function getExamType(skill) {
    if (skill.startsWith('lesen')) return skill;
    if (skill.startsWith('hoeren')) return skill;
    if (skill.startsWith('sprach')) return skill;
    return skill;
}

// ============================================
// 📋 قائمة الأسئلة الصحيحة
// ============================================
function getCorrectQuestions(skill, examId) {
    const correctMap = {
        // Hören Teil 1
        'hoeren1_exam1': [2,3], 'hoeren1_exam2': [3,5], 'hoeren1_exam3': [2,3,5],
        'hoeren1_exam4': [1,5], 'hoeren1_exam5': [2,4], 'hoeren1_exam6': [2,4],
        'hoeren1_exam7': [1,2,5], 'hoeren1_exam8': [3,4,5], 'hoeren1_exam9': [1,2],
        'hoeren1_exam10': [1,4], 'hoeren1_exam11': [1,4], 'hoeren1_exam12': [1,4],
        'hoeren1_exam13': [3,4,5], 'hoeren1_exam14': [1,3], 'hoeren1_exam15': [2,3],
        'hoeren1_exam16': [2,3,5], 'hoeren1_exam17': [4,5], 'hoeren1_exam18': [1,3,5],
        'hoeren1_exam19': [1,3,5], 'hoeren1_exam20': [1,3,4], 'hoeren1_exam21': [3],
        'hoeren1_exam22': [1,2,5], 'hoeren1_exam23': [3,5], 'hoeren1_exam24': [1,3,5],
        'hoeren1_exam25': [1,2,5], 'hoeren1_exam26': [1,5], 'hoeren1_exam27': [1,2],
        'hoeren1_exam28': [1,2,4], 'hoeren1_exam29': [1,2,3], 'hoeren1_exam30': [3,5],
        'hoeren1_exam31': [2,4], 'hoeren1_exam32': [1,3,5], 'hoeren1_exam33': [1,4],
        'hoeren1_exam34': [1,3], 'hoeren1_exam35': [3,4], 'hoeren1_exam36': [1,2],
        'hoeren1_exam37': [1,4,5], 'hoeren1_exam38': [1,2,3], 'hoeren1_exam39': [1,2,4,5],
        'hoeren1_exam40': [1,3,4], 'hoeren1_exam41': [2,5], 'hoeren1_exam42': [2,4],
        'hoeren1_exam43': [2,5], 'hoeren1_exam44': [2,4], 'hoeren1_exam45': [2,4],
        
        // Hören Teil 2
        'hoeren2_exam1': [3,4,8,9,10], 'hoeren2_exam2': [1,3,4,8],
        'hoeren2_exam3': [1,3,4,7,8], 'hoeren2_exam4': [2,6,8,9,10],
        'hoeren2_exam5': [2,9,10], 'hoeren2_exam6': [3,4,7], 'hoeren2_exam7': [3,4,7],
        'hoeren2_exam8': [1,3,4,7,8,9], 'hoeren2_exam9': [1,3,4,5,8],
        'hoeren2_exam10': [1,3,4,8,9,10], 'hoeren2_exam11': [1,3,4,8,9,10],
        'hoeren2_exam12': [1,4,6,7,8], 'hoeren2_exam13': [1,4,6,7,8],
        'hoeren2_exam14': [2,5,8,9,10], 'hoeren2_exam15': [2,3,5,6,8,10],
        'hoeren2_exam16': [2,4,5,8,10], 'hoeren2_exam17': [2,4,5,8,10],
        'hoeren2_exam18': [2,3,4,7,9,10], 'hoeren2_exam19': [3,4,7,9],
        'hoeren2_exam20': [2,3,5,8,9], 'hoeren2_exam21': [3,5,9],
        'hoeren2_exam22': [3,4,10], 'hoeren2_exam23': [1,2,4,6],
        'hoeren2_exam24': [2,3,4,6,8,10], 'hoeren2_exam25': [1,2,3,4,6,8,9],
        'hoeren2_exam26': [3,5,7,8,10], 'hoeren2_exam27': [2,3,4,6,8],
        'hoeren2_exam28': [1,2,4,6,8,10], 'hoeren2_exam29': [4,5,9,10],
        'hoeren2_exam30': [2,3,6,7,10], 'hoeren2_exam31': [2,4,5,8,9],
        'hoeren2_exam32': [2,3,5,6,8,10], 'hoeren2_exam33': [1,2,5,7,10],
        'hoeren2_exam34': [1,2,3,5,7,10], 'hoeren2_exam35': [1,2,3,7,10],
        'hoeren2_exam36': [1,4,5,7,9,10], 'hoeren2_exam37': [1,6,7,8],
        'hoeren2_exam38': [1,2,3,5,6,7,9], 'hoeren2_exam39': [1,2,3,6,7,8,9,10],
        'hoeren2_exam40': [1,2,5,6,8], 'hoeren2_exam41': [3,6,9],
        'hoeren2_exam42': [2,4,5,8,9], 'hoeren2_exam43': [3,4,5,7,8],
        'hoeren2_exam44': [1,3,6,7,9,10], 'hoeren2_exam45': [2,4,6,8,10],
        'hoeren2_exam46': [3,6,8], 'hoeren2_exam47': [2,3,5,9],
        'hoeren2_exam48': [3,5,6,9,10], 'hoeren2_exam49': [1,2,4,6,8,10],
        
        // Hören Teil 3
        'hoeren3_exam1': [1], 'hoeren3_exam2': [1,3], 'hoeren3_exam3': [1,3],
        'hoeren3_exam4': [1,4], 'hoeren3_exam5': [1,4], 'hoeren3_exam6': [1,5],
        'hoeren3_exam7': [1,5], 'hoeren3_exam8': [1,5], 'hoeren3_exam9': [1,5],
        'hoeren3_exam10': [2,5], 'hoeren3_exam11': [1,2,3], 'hoeren3_exam12': [3,4],
        'hoeren3_exam13': [1,2,5], 'hoeren3_exam14': [1,4,5], 'hoeren3_exam15': [1,2,5],
        'hoeren3_exam16': [1,3,4,5], 'hoeren3_exam17': [1,3], 'hoeren3_exam18': [2,3,4],
        'hoeren3_exam19': [2,4], 'hoeren3_exam20': [1,3], 'hoeren3_exam21': [2],
        'hoeren3_exam22': [2,4], 'hoeren3_exam23': [1,5], 'hoeren3_exam24': [2],
        'hoeren3_exam25': [1,3], 'hoeren3_exam26': [1,3,5], 'hoeren3_exam27': [1,3],
        'hoeren3_exam28': [2], 'hoeren3_exam29': [1,4,5], 'hoeren3_exam30': [1,4],
        'hoeren3_exam31': [1,2,3], 'hoeren3_exam32': [3,5], 'hoeren3_exam33': [2,3,4],
        'hoeren3_exam34': [1,3], 'hoeren3_exam35': [1,2,4,5], 'hoeren3_exam36': [1,5],
        'hoeren3_exam37': [2], 'hoeren3_exam38': [2,5], 'hoeren3_exam39': [1,5],
        'hoeren3_exam40': [5], 'hoeren3_exam41': [1,2], 'hoeren3_exam42': [1,2,5],
        'hoeren3_exam43': [1,5], 'hoeren3_exam44': [2,3], 'hoeren3_exam45': [3,4],
        'hoeren3_exam46': [1,4,5], 'hoeren3_exam47': [1,3],
        
        // Lesen Teil 1 (جميع الأسئلة صحيحة)
        'lesen1_exam1': [1,2,3,4,5], 'lesen1_exam2': [1,2,3,4,5], 'lesen1_exam3': [1,2,3,4,5],
        'lesen1_exam4': [1,2,3,4,5], 'lesen1_exam5': [1,2,3,4,5], 'lesen1_exam6': [1,2,3,4,5],
        'lesen1_exam7': [1,2,3,4,5], 'lesen1_exam8': [1,2,3,4,5], 'lesen1_exam9': [1,2,3,4,5],
        'lesen1_exam10': [1,2,3,4,5], 'lesen1_exam11': [1,2,3,4,5], 'lesen1_exam12': [1,2,3,4,5],
        'lesen1_exam13': [1,2,3,4,5], 'lesen1_exam14': [1,2,3,4,5], 'lesen1_exam15': [1,2,3,4,5],
        'lesen1_exam16': [1,2,3,4,5], 'lesen1_exam17': [1,2,3,4,5], 'lesen1_exam18': [1,2,3,4,5],
        'lesen1_exam19': [1,2,3,4,5], 'lesen1_exam20': [1,2,3,4,5], 'lesen1_exam21': [1,2,3,4,5],
        'lesen1_exam22': [1,2,3,4,5], 'lesen1_exam23': [1,2,3,4,5], 'lesen1_exam24': [1,2,3,4,5],
        'lesen1_exam25': [1,2,3,4,5], 'lesen1_exam26': [1,2,3,4,5], 'lesen1_exam27': [1,2,3,4,5],
        'lesen1_exam28': [1,2,3,4,5], 'lesen1_exam29': [1,2,3,4,5], 'lesen1_exam30': [1,2,3,4,5],
        'lesen1_exam31': [1,2,3,4,5], 'lesen1_exam32': [1,2,3,4,5], 'lesen1_exam33': [1,2,3,4,5],
        'lesen1_exam34': [1,2,3,4,5], 'lesen1_exam35': [1,2,3,4,5], 'lesen1_exam36': [1,2,3,4,5],
        'lesen1_exam37': [1,2,3,4,5], 'lesen1_exam38': [1,2,3,4,5], 'lesen1_exam39': [1,2,3,4,5],
        'lesen1_exam40': [1,2,3,4,5], 'lesen1_exam41': [1,2,3,4,5], 'lesen1_exam42': [1,2,3,4,5],
        'lesen1_exam43': [1,2,3,4,5], 'lesen1_exam44': [1,2,3,4,5], 'lesen1_exam45': [1,2,3,4,5],
        'lesen1_exam46': [1,2,3,4,5], 'lesen1_exam47': [1,2,3,4,5], 'lesen1_exam48': [1,2,3,4,5],
        'lesen1_exam49': [1,2,3,4,5], 'lesen1_exam50': [1,2,3,4,5], 'lesen1_exam51': [1,2,3,4,5],
        'lesen1_exam52': [1,2,3,4,5], 'lesen1_exam53': [1,2,3,4,5], 'lesen1_exam54': [1,2,3,4,5],
        'lesen1_exam55': [1,2,3,4,5],
        
        // Lesen Teil 2 (جميع الأسئلة صحيحة)
        'lesen2_exam1': [1,2,3,4,5], 'lesen2_exam2': [1,2,3,4,5], 'lesen2_exam3': [1,2,3,4,5],
        'lesen2_exam4': [1,2,3,4,5], 'lesen2_exam5': [1,2,3,4,5], 'lesen2_exam6': [1,2,3,4,5],
        'lesen2_exam7': [1,2,3,4,5], 'lesen2_exam8': [1,2,3,4,5], 'lesen2_exam9': [1,2,3,4,5],
        'lesen2_exam10': [1,2,3,4,5], 'lesen2_exam11': [1,2,3,4,5], 'lesen2_exam12': [1,2,3,4,5],
        'lesen2_exam13': [1,2,3,4,5], 'lesen2_exam14': [1,2,3,4,5], 'lesen2_exam15': [1,2,3,4,5],
        'lesen2_exam16': [1,2,3,4,5], 'lesen2_exam17': [1,2,3,4,5], 'lesen2_exam18': [1,2,3,4,5],
        'lesen2_exam19': [1,2,3,4,5], 'lesen2_exam20': [1,2,3,4,5], 'lesen2_exam21': [1,2,3,4,5],
        'lesen2_exam22': [1,2,3,4,5], 'lesen2_exam23': [1,2,3,4,5], 'lesen2_exam24': [1,2,3,4,5],
        'lesen2_exam25': [1,2,3,4,5], 'lesen2_exam26': [1,2,3,4,5], 'lesen2_exam27': [1,2,3,4,5],
        'lesen2_exam28': [1,2,3,4,5], 'lesen2_exam29': [1,2,3,4,5], 'lesen2_exam30': [1,2,3,4,5],
        'lesen2_exam31': [1,2,3,4,5], 'lesen2_exam32': [1,2,3,4,5], 'lesen2_exam33': [1,2,3,4,5],
        'lesen2_exam34': [1,2,3,4,5], 'lesen2_exam35': [1,2,3,4,5], 'lesen2_exam36': [1,2,3,4,5],
        'lesen2_exam37': [1,2,3,4,5],
        
        // Lesen Teil 3 (جميع الأسئلة صحيحة)
        'lesen3_exam1': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam2': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam3': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam4': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam5': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam6': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam7': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam8': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam9': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam10': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam11': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam12': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam13': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam14': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam15': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam16': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam17': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam18': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam19': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam20': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam21': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam22': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam23': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam24': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam25': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam26': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam27': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam28': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam29': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam30': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam31': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam32': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam33': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam34': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam35': [1,2,3,4,5,6,7,8,9,10],
        
        // Sprach 1 (جميع الأسئلة صحيحة)
        'sprach1_exam1': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam2': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam3': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam4': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam5': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam6': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam7': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam8': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam9': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam10': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam11': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam12': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam13': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam14': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam15': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam16': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam17': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam18': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam19': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam20': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam21': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam22': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam23': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam24': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam25': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam26': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam27': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam28': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam29': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam30': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam31': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam32': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam33': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam34': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam35': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam36': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam37': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam38': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam39': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam40': [1,2,3,4,5,6,7,8,9,10],
        
        // Sprach 2 (جميع الأسئلة صحيحة)
        'sprach2_exam1': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam2': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam3': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam4': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam5': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam6': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam7': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam8': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam9': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam10': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam11': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam12': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam13': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam14': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam15': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam16': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam17': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam18': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam19': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam20': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam21': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam22': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam23': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam24': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam25': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam26': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam27': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam28': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam29': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam30': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam31': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam32': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam33': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam34': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam35': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam36': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam37': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam38': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam39': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam40': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam41': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam42': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam43': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam44': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam45': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam46': [1,2,3,4,5,6,7,8,9,10]
    };
    
    const key = `${skill}_exam${examId}`;
    return correctMap[key] || [];
}

// ============================================
// 🔄 مراقبة تغيير الامتحان
// ============================================
function setupHighlightObserver() {
    let lastExamId = getCurrentExamId();
    let lastSkill = getCurrentSkill();
    
    setInterval(() => {
        const currentId = getCurrentExamId();
        const currentSkill = getCurrentSkill();
        
        if (currentId !== lastExamId || currentSkill !== lastSkill) {
            lastExamId = currentId;
            lastSkill = currentSkill;
            
            // إعادة تطبيق التلوين بعد تغيير الامتحان
            setTimeout(() => {
                addHighlightButton();
                if (highlightEnabled) {
                    applyHighlightsToExam();
                }
            }, 300);
        }
    }, 500);
}

// ============================================
// 🚀 تهيئة النظام
// ============================================
function initHighlightSystem() {
    if (highlightInitialized) return;
    highlightInitialized = true;
    
    // إضافة الزر
    setTimeout(addHighlightButton, 100);
    
    // تطبيق التلوين عند تحميل الصفحة
    setTimeout(() => {
        if (highlightEnabled) {
            applyHighlightsToExam();
        }
    }, 200);
    
    // مراقبة تغيير الامتحانات
    setupHighlightObserver();
    
    console.log("✅ نظام التلوين الذكي جاهز!");
    console.log(`🎨 حالة التلوين: ${highlightEnabled ? 'مفعل' : 'معطل'}`);
}

// ============================================
// ⏰ تشغيل النظام بعد تحميل الصفحة
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighlightSystem);
} else {
    initHighlightSystem();
}

// جعل الدوال متاحة عالمياً
window.toggleHighlights = toggleHighlights;
window.applyHighlightsToExam = applyHighlightsToExam;
window.removeAllHighlights = removeAllHighlights;
window.HIGHLIGHT_COLORS = HIGHLIGHT_COLORS;

// تصدير الدوال للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleHighlights,
        applyHighlightsToExam,
        removeAllHighlights,
        HIGHLIGHT_COLORS
    };
}

console.log("✅ engine.js (نسخة التلوين الذكي) تم تحميله بالكامل");
