// ============================================
// 🎨 بيانات التلوين - مركزية وجاهزة
// ============================================

const HIGHLIGHT_DATA = {
    "hoeren1_exam1": {
        q1: { text: "Lufthansa", color: 1 },
        q2: { text: "Sportverein", color: 2 },
        q3: { text: "Pflegeheimen", color: 3 },
        q4: { text: "Heizkosten", color: 4 },
        q5: { text: "Dopingsperre", color: 5 }
    },
    "hoeren1_exam2": {
        q1: { text: "Piloten", color: 1 }
    },
    "hoeren2_exam1": {
        q1: { text: "Herr Gasser", color: 1 },
        q2: { text: "Frau Janke", color: 2 }
    },
    "lesen1_exam1": {
        q1: { text: "Jugend Forscher", color: 1 }
    },
    "lesen2_exam1": {
        q1: { text: "Krista", color: 1 }
    },
    "lesen3_exam1": {
        q1: { text: "Filme", color: 1 }
    },
    "sprach1_exam1": {
        q1: { text: "Hallo Ferdinand", color: 1 }
    },
    "sprach2_exam1": {
        q1: { text: "Das Fahrrad", color: 1 }
    }
};

// ============================================
// 📊 إحصائيات للتحقق
// ============================================

console.log('✅ highlightData.js تم تحميله بنجاح');
console.log(`📊 إجمالي بيانات التلوين: ${Object.keys(HIGHLIGHT_DATA).length}`);

// جعل البيانات متاحة عالمياً
window.HIGHLIGHT_DATA = HIGHLIGHT_DATA;
