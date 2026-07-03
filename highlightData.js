// ============================================
// 🎨 بيانات التلوين - مركزية وجاهزة
// ============================================

// بيانات التلوين الأساسية (يدوية)
const HIGHLIGHT_DATA_BASE = {
    "hoeren1_exam1": {
        q1: { text: "Lufthansa", color: 1 },
        q2: { text: "Sportverein", color: 2 },
        q3: { text: "Pflegeheimen", color: 3 },
        q4: { text: "Heizkosten", color: 4 },
        q5: { text: "Dopingsperre", color: 5 }
    }
};

// دمج مع البيانات الأساسية
if (typeof window.HIGHLIGHT_DATA === 'undefined') {
    window.HIGHLIGHT_DATA = {};
}

// نسخ البيانات الأساسية
for (let key in HIGHLIGHT_DATA_BASE) {
    if (!window.HIGHLIGHT_DATA[key]) {
        window.HIGHLIGHT_DATA[key] = HIGHLIGHT_DATA_BASE[key];
    }
}

console.log('✅ highlightData.js تم تحميله بنجاح');
console.log(`📊 إجمالي بيانات التلوين الأساسية: ${Object.keys(HIGHLIGHT_DATA_BASE).length}`);

// ============================================
// 🚀 استيراد بيانات التلوين من HELP_DATA تلقائياً
// ============================================

(function autoGenerateHighlightData() {
    let attempts = 0;
    const maxAttempts = 20;
    
    function tryGenerate() {
        attempts++;
        if (typeof HELP_DATA === 'undefined' || Object.keys(HELP_DATA).length === 0) {
            if (attempts < maxAttempts) {
                setTimeout(tryGenerate, 500);
                return;
            }
            console.warn('⚠️ HELP_DATA غير موجود بعد 10 ثوانٍ');
            console.log(`📊 إجمالي بيانات التلوين: ${Object.keys(window.HIGHLIGHT_DATA).length}`);
            return;
        }
        
        console.log('🔄 جاري إنشاء بيانات التلوين من HELP_DATA...');
        
        const colors = [1, 2, 3, 4, 5, 6, 7, 8];
        let addedCount = 0;
        
        for (let key in HELP_DATA) {
            const data = HELP_DATA[key];
            if (data && data.text) {
                const parts = key.split('_');
                if (parts.length < 3) continue;
                
                let skill, examId, qNum;
                
                // تحديد المهارة ورقم الامتحان
                if (key.startsWith('hoeren1_')) { skill = 'hoeren1'; }
                else if (key.startsWith('hoeren2_')) { skill = 'hoeren2'; }
                else if (key.startsWith('hoeren3_')) { skill = 'hoeren3'; }
                else if (key.startsWith('lesen1_')) { skill = 'lesen1'; }
                else if (key.startsWith('lesen2_')) { skill = 'lesen2'; }
                else if (key.startsWith('lesen3_')) { skill = 'lesen3'; }
                else if (key.startsWith('sprach1_')) { skill = 'sprach1'; }
                else if (key.startsWith('sprach2_')) { skill = 'sprach2'; }
                else if (key.startsWith('mündlich_')) { skill = 'mündlich'; }
                else continue;
                
                // استخراج رقم الامتحان
                const examMatch = key.match(/exam(\d+)/);
                if (!examMatch) continue;
                examId = parseInt(examMatch[1]);
                
                // استخراج رقم السؤال
                const qMatch = key.match(/q(\d+)/);
                if (qMatch) {
                    qNum = parseInt(qMatch[1]);
                } else {
                    qNum = 1;
                }
                
                const mainKey = `${skill}_exam${examId}`;
                
                if (!window.HIGHLIGHT_DATA[mainKey]) {
                    window.HIGHLIGHT_DATA[mainKey] = {};
                }
                
                const colorIndex = (qNum - 1) % colors.length;
                
                if (!window.HIGHLIGHT_DATA[mainKey][`q${qNum}`]) {
                    window.HIGHLIGHT_DATA[mainKey][`q${qNum}`] = {
                        text: data.text,
                        color: colors[colorIndex]
                    };
                    addedCount++;
                }
            }
        }
        
        console.log(`✅ تم إنشاء ${Object.keys(window.HIGHLIGHT_DATA).length} امتحان للتلوين`);
        console.log(`📊 إجمالي عناصر التلوين: ${Object.values(window.HIGHLIGHT_DATA).reduce((sum, exam) => sum + Object.keys(exam).length, 0)}`);
        console.log(`➕ تم إضافة ${addedCount} عنصر تلوين جديد من HELP_DATA`);
    }
    
    setTimeout(tryGenerate, 100);
})();

// جعل البيانات متاحة عالمياً
window.HIGHLIGHT_DATA = window.HIGHLIGHT_DATA || {};
