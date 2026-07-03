// ============================================
// 🎨 بيانات التلوين - مركزية وجاهزة
// ============================================

const HIGHLIGHT_DATA = {

    // ========== Hören Teil 1 ==========
    "hoeren1_exam1": {
        q1: {
            text: "Die Deutsche Lufthansa",
            color: 1
        },
        q2: {
            text: "Ein Bonner Sportverein zeigt der Öffentlichkeit sein Angebot.",
            color: 2
        },
        q3: {
            text: "Die Rahmenbedingungen in deutschen Pflegeheimen",
            color: 3
        },
        q4: {
            text: "Heizkosten",
            color: 4
        },
        q5: {
            text: "Dopingsperre",
            color: 5
        }
    },

    "hoeren1_exam2": {
        q1: {
            text: "Beispieltext für امتحان 2",
            color: 1
        }
        // أضف المزيد حسب الحاجة
    },

    // ========== Hören Teil 2 ==========
    "hoeren2_exam1": {
        q1: {
            text: "Text für Hören Teil 2 Exam 1",
            color: 1
        }
        // أضف المزيد
    },

    // ========== Hören Teil 3 ==========
    "hoeren3_exam1": {
        q1: {
            text: "Text für Hören Teil 3 Exam 1",
            color: 1
        }
        // أضف المزيد
    },

    // ========== Lesen Teil 1 ==========
    "lesen1_exam1": {
        q1: {
            paragraph: "Kyrill, Friederike, Lothar oder Xaver",
            title: "Eine ungewöhnliche Geschenkidee",
            color: 3
        },
        q2: {
            paragraph: "Ein Bonner Sportverein zeigt der Öffentlichkeit sein Angebot.",
            title: "Sportverein",
            color: 2
        }
        // أضف المزيد
    },

    "lesen1_exam49": {
        q1: {
            paragraph: "Kyrill, Friederike, Lothar oder Xaver",
            title: "Eine ungewöhnliche Geschenkidee",
            color: 3
        }
    },

    // ========== Lesen Teil 2 ==========
    "lesen2_exam1": {
        q1: {
            text: "Text für Lesen Teil 2 Exam 1",
            color: 1
        }
        // أضف المزيد
    },

    // ========== Lesen Teil 3 ==========
    "lesen3_exam1": {
        q1: {
            paragraph: "Paragraph Text",
            title: "Title Text",
            color: 2
        }
        // أضف المزيد
    },

    // ========== Sprachbausteine Teil 1 ==========
    "sprach1_exam1": {
        q1: {
            before: "Text vor der Lücke",
            answer: "das richtige Wort",
            after: "Text nach der Lücke",
            color: 4
        }
        // أضف المزيد
    },

    // ========== Sprachbausteine Teil 2 ==========
    "sprach2_exam1": {
        q1: {
            before: "Text vor",
            answer: "das Wort",
            after: "Text nach",
            color: 5
        }
        // أضف المزيد
    }

};

// ============================================
// 📊 إحصائيات للتحقق
// ============================================

console.log('✅ highlightData.js تم تحميله بنجاح');
console.log(`📊 إجمالي بيانات التلوين: ${Object.keys(HIGHLIGHT_DATA).length}`);

// جعل البيانات متاحة عالمياً
window.HIGHLIGHT_DATA = HIGHLIGHT_DATA;
