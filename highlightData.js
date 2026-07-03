const HIGHLIGHT_DATA = {
    "hoeren1_exam1": {
        q1: { text: "Lufthansa", color: 1 },
        q2: { text: "Sportverein", color: 2 },
        q3: { text: "Pflegeheimen", color: 3 },
        q4: { text: "Heizkosten", color: 4 },
        q5: { text: "Dopingsperre", color: 5 }
    }
};

console.log('✅ highlightData.js تم تحميله بنجاح');
console.log(`📊 إجمالي بيانات التلوين: ${Object.keys(HIGHLIGHT_DATA).length}`);
window.HIGHLIGHT_DATA = HIGHLIGHT_DATA;
