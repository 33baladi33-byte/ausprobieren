// ============================================
// exams.js - نظام الامتحانات المتكامل مع نظام القفل وحفظ النتائج
// ============================================

// ✅ تعريف حالة Interleaving (يتم التحكم بها من engine.js)
window.isInterleavingActive = false;

const teile = [
  { id: 1, name: "Hören 1", container: "hoeren1", skill: "hoeren1" },
  { id: 2, name: "Hören 2", container: "hoeren2", skill: "hoeren2" },
  { id: 3, name: "Hören 3", container: "hoeren3", skill: "hoeren3" },
  { id: 4, name: "Lesen 1", container: "teil1", skill: "lesen1" },
  { id: 5, name: "Lesen 2", container: "teil2", skill: "lesen2" },
  { id: 6, name: "Lesen 3", container: "teil3", skill: "lesen3" },
  { id: 7, name: "Sprach 1", container: "sprach1", skill: "sprach1" },
  { id: 8, name: "Sprach 2", container: "sprach2", skill: "sprach2" },
  { id: 9, name: "Schreiben", container: "schreiben", skill: "schreiben" },
  { id: 10, name: "Mündlich", container: "mündlich", skill: "mündlich" }
];

// ========== دالة حفظ آخر نتيجة ==========
function saveExamResult(skill, examId, score) {
  try {
    const key = `exam_result_${skill}_${examId}`;
    localStorage.setItem(key, score.toString());
    console.log(`✅ تم حفظ النتيجة ${score} لـ ${skill} ${examId}`);
  } catch(e) {
    console.error("❌ خطأ في حفظ النتيجة:", e);
  }
}

// ========== دالة استرجاع آخر نتيجة ==========
function getExamResult(skill, examId) {
  try {
    const key = `exam_result_${skill}_${examId}`;
    const result = localStorage.getItem(key);
    return result ? parseFloat(result) : null;
  } catch(e) {
    console.error("❌ خطأ في استرجاع النتيجة:", e);
    return null;
  }
}

// ========== دالة الحصول على لون النتيجة ==========
function getResultColor(score) {
  if (score === 25) return "#17a2b8";
  if (score >= 15) return "#28a745";
  return "#adb5bd";
}

// ========== دالة عرض النتيجة بجانب عنوان الامتحان (معدلة للهواتف) ==========
function createResultBadge(score) {
  if (score === null) return null;
  
  const badge = document.createElement("span");
  badge.className = "exam-result-badge";
  badge.textContent = `${score} / 25`;
  
  const isMobile = window.innerWidth <= 768;
  badge.style.cssText = `
    font-size: ${isMobile ? '8px' : '11px'};
    font-weight: bold;
    padding: ${isMobile ? '2px 5px' : '3px 8px'};
    border-radius: 20px;
    color: white;
    background-color: ${getResultColor(score)};
    margin-left: 8px;
    display: inline-block;
    min-width: ${isMobile ? '40px' : '55px'};
    text-align: center;
  `;
  return badge;
}

// ========== عرض بطاقة Premium Access ==========
function showLockedMessage(examTitle) {
    if (typeof window.showPremiumModal === 'function') {
        window.showPremiumModal(examTitle);
    } else {
        window.location.href = 'subscribe.html';
    }
}

let currentExamData = null;
let currentSkill = "lesen1";
let currentExamId = null;
let currentExamsList = [];
let currentMündlichPart = 2;
let examUserStatusCache = null;
let examLastStatusCheck = 0;

// ========== دوال التحقق من حالة المستخدم (قراءة فقط) ==========
async function getUserStatusForExam() {
    try {
        // ✅ استخدام الدالة العامة للقراءة فقط
        if (typeof window.getUserStatusGlobal === 'function') {
            const status = await window.getUserStatusGlobal();
            return status; // يعيد 'premium' أو 'free' أو 'guest'
        }
    } catch (error) {
        console.warn('⚠️ فشل جلب حالة المستخدم:', error);
    }
    
    // ✅ إذا فشل، نعتبر المستخدم Free
    return 'free';
}

// ========== قائمة Tips (نصائح) ==========
const tipsExams = [
  { id: 1, title: "كيفاش تنجح بدكاء", enabled: true, hasFile: true }
];

// ========== قائمة امتحانات Lesen Teil 1 ==========
const lesenExams = [
  { 
    id: 1, 
    title: "Jugend Forscher", 
    enabled: true, 
    hasFile: true,
    versions: [
      { id: 1, file: "exam1.json", title: "Jugend Forscher" }
    ]
  },
  { 
    id: 2, 
    title: "sport ist gesund", 
    enabled: true, 
    hasFile: true,
    versions: [
      { id: 2, file: "exam2.json", title: "sport ist gesund" },
      { id: 3, file: "exam3.json", title: "sport ist gesund (التعديل 1)" }
    ]
  },
  { id: 4, title: "Tanzkurs", enabled: true, hasFile: true },
  { id: 5, title: "Tanzkurs (التعديل 1)", enabled: true, hasFile: true },
  { id: 6, title: "Impfung", enabled: true, hasFile: true },
  { id: 7, title: "Insel", enabled: true, hasFile: true },
  { id: 8, title: "Bilder", enabled: true, hasFile: true },
  { id: 9, title: "Grundschule", enabled: true, hasFile: true },
  { id: 10, title: "Österreich - Naschmarkt", enabled: true, hasFile: true },
  { id: 11, title: "Insekten", enabled: true, hasFile: true },
  { id: 12, title: "Insekten (التعديل 1)", enabled: true, hasFile: true },
  { id: 13, title: "das Benzin", enabled: true, hasFile: true },
  { id: 14, title: "Kaffee", enabled: true, hasFile: true },
  { id: 15, title: "Programmierer", enabled: true, hasFile: true },
  { id: 16, title: "Programmierer (التعديل 1)", enabled: true, hasFile: true },
  { id: 17, title: "Programmierer (التعديل 2)", enabled: true, hasFile: true },
  { id: 18, title: "Trampolin", enabled: true, hasFile: true },
  { id: 19, title: "Bonbons", enabled: true, hasFile: true },
  { id: 20, title: "Umwelt", enabled: true, hasFile: true },
  { id: 21, title: "Licht", enabled: true, hasFile: true },
  { id: 22, title: "Licht (التعديل 1)", enabled: true, hasFile: true },
  { id: 23, title: "Kartoffel", enabled: true, hasFile: true },
  { id: 24, title: "Kartoffel (التعديل 1)", enabled: true, hasFile: true },
  { id: 25, title: "Bienen", enabled: true, hasFile: true },
  { id: 26, title: "Spiele", enabled: true, hasFile: true },
  { id: 27, title: "Geld", enabled: true, hasFile: true },
  { id: 28, title: "Kinder und Schulen", enabled: true, hasFile: true },
  { id: 29, title: "Kindertelefon", enabled: true, hasFile: true },
  { id: 30, title: "Alpen", enabled: true, hasFile: true },
  { id: 31, title: "Alpen (التعديل 1)", enabled: true, hasFile: true },
  { id: 32, title: "Alpen (التعديل 2)", enabled: true, hasFile: true },
  { id: 33, title: "Suchtmittel - Nase", enabled: true, hasFile: true },
  { id: 34, title: "الانتخابات والمرأة الروسية", enabled: true, hasFile: true },
  { id: 35, title: "kein Zeit", enabled: true, hasFile: true },
  { id: 36, title: "kein Zeit (التعديل 1)", enabled: true, hasFile: true },
  { id: 37, title: "Limonade", enabled: true, hasFile: true },
  { id: 38, title: "Limonade (التعديل 1)", enabled: true, hasFile: true },
  { id: 39, title: "Limonade (التعديل 2)", enabled: true, hasFile: true },
  { id: 40, title: "Auf dem Weg", enabled: true, hasFile: true },
  { id: 41, title: "Schlafzug", enabled: true, hasFile: true },
  { id: 42, title: "Schlafzug (التعديل 1)", enabled: true, hasFile: true },
  { id: 43, title: "Löwen", enabled: true, hasFile: true },
  { id: 44, title: "Fisch", enabled: true, hasFile: true },
  { id: 45, title: "Frauen im Arbeitsmarkt", enabled: true, hasFile: true },
  { id: 46, title: "Baby TV", enabled: true, hasFile: true },
  { id: 47, title: "Bäder", enabled: true, hasFile: true },
  { id: 48, title: "Farben", enabled: true, hasFile: true },
  { id: 49, title: "Wetter", enabled: true, hasFile: true },
  { id: 50, title: "Computer", enabled: true, hasFile: true },
  { id: 51, title: "Nordsee", enabled: true, hasFile: true },
  { id: 52, title: "Autos", enabled: true, hasFile: true },
  { id: 53, title: "Evolution", enabled: true, hasFile: true },
  { id: 54, title: "Gedächtnis", enabled: true, hasFile: true },
  { id: 55, title: "Wohnen", enabled: true, hasFile: true }
];

// ========== قائمة امتحانات Schreiben ==========
const schreibenExams = [
  { id: 1, title: "Fotobuch", enabled: true, hasFile: true },
  { id: 2, title: "Abenteuer TIKKI TAKKA", enabled: true, hasFile: true },
  { id: 3, title: "Informatik-Shop", enabled: true, hasFile: true },
  { id: 4, title: "Kosmetik-Shop", enabled: true, hasFile: true },
  { id: 5, title: "Partyservice", enabled: true, hasFile: true },
  { id: 6, title: "ESS Firma", enabled: true, hasFile: true },
  { id: 7, title: "Kursbeschreibung (Wohndesign)", enabled: true, hasFile: true },
  { id: 8, title: "Renovierungskurs", enabled: true, hasFile: true },
  { id: 9, title: "Engagement für Jugendliche", enabled: true, hasFile: true },
  { id: 10, title: "Wohnen auf Zeit in Oranienburg", enabled: true, hasFile: true },
  { id: 11, title: "Autovermietung Neustadt", enabled: true, hasFile: true },
  { id: 12, title: "Freizeitverein", enabled: true, hasFile: true },
  { id: 13, title: "Naturmuseum", enabled: true, hasFile: true },
  { id: 14, title: "Backstage-Musical-Tour", enabled: true, hasFile: true },
  { id: 15, title: "KULTUR UND KULINARIK", enabled: true, hasFile: true },
  { id: 16, title: "Mehr bewegen - aber wie? (Fahrradtour)", enabled: true, hasFile: true },
  { id: 17, title: "Super Clean-Staubsaugroboter", enabled: true, hasFile: true },
  { id: 18, title: "Apartment-Haus", enabled: true, hasFile: true },
  { id: 19, title: "Kostenlose Apps für dein Handy!", enabled: true, hasFile: true },
  { id: 20, title: "Nie mehr schlaflos in Deutschland - Komfort-Matratze", enabled: true, hasFile: true },
  { id: 21, title: "Schmelzkäse Alpengeschmack", enabled: true, hasFile: true },
  { id: 22, title: "Meine Kiste: Obst und Gemüse", enabled: true, hasFile: true },
  { id: 23, title: "Hotel mit Thermen", enabled: true, hasFile: true },
  { id: 24, title: "Kopfhörer", enabled: true, hasFile: true },
  { id: 25, title: "Badezimmer renovieren", enabled: true, hasFile: true },
  { id: 26, title: "FREIZEITBAD MEERESRAUSCHEN", enabled: true, hasFile: true },
  { id: 27, title: "Reisebüro Sonnenschein", enabled: true, hasFile: true },
  { id: 28, title: "Kursbeschreibung (sich vorstellen)", enabled: true, hasFile: true },
  { id: 29, title: "FITWATCH Smartwatch", enabled: true, hasFile: true },
  { id: 30, title: "Securvia Reisegepäckversicherung", enabled: true, hasFile: true },
  { id: 31, title: "DIGIBIKE - Das smarte Hightech-Fahrrad", enabled: true, hasFile: true },
  { id: 32, title: "SPORTHEINPARKPLATZ FÜR KINDER", enabled: true, hasFile: true },
  { id: 33, title: "Online-Training für guten Schlaf", enabled: true, hasFile: true },
  { id: 34, title: "Hollandblumen-Onlineshop", enabled: true, hasFile: true },
  { id: 35, title: "In Offenbach zu Hause", enabled: true, hasFile: true },
  { id: 36, title: "Nachbarschaft.net", enabled: true, hasFile: true }
];

// ========== قائمة امتحانات Mündlich Teil 1 (دليل تعريفي) ==========
const mündlich1Exams = [
  { id: 1, title: " تقديم وتكلم عن موضوع  ", enabled: true, hasFile: true, skillPath: "mündlich1" }
];

// ========== قائمة امتحانات Mündlich Teil 2 ==========
const mündlich2Exams = [
  { id: 1, title: "Antibiotika – Gibt es Alternativen?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 2, title: "Selbst gekocht", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 3, title: "Arbeiten bis 75", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 4, title: "Praktische Lerntipps", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 5, title: "Schuluniform – Pro und Kontra", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 6, title: "Ist 'bequemes Essen' gut für uns?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 7, title: "Alternative Lebensform im Alter", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 8, title: "Glücklich ohne Geld und Karriere", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 9, title: "Schönheitsoperationen bei Minderjährigen", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 10, title: "Kinderuniversitäten", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 11, title: "Fast Food", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 12, title: "Zweisprachigkeit bei Kindern", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 13, title: "Blutspende", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 14, title: "Lachen und Gesundheit", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 15, title: "Gefundene Sachen – behalten oder abgeben?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 16, title: "Tiere als Geschenk", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 17, title: "Hausaufgaben – notwendig oder nicht?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 18, title: "Wie lange dürfen Jugendliche abends ausgehen?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 19, title: "Rauchen", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 20, title: "Hochbegabte Kinder – Spezialschulen oder Integration", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 21, title: "Hochzeit nur zu zweit", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 22, title: "Stadtwohnung oder Haus im Grünen", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 23, title: "Leistungssport und Doping", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 24, title: "Fernsehen bildet", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 25, title: "Kinderkonten", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 26, title: "Haustausch im Urlaub", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 27, title: "Solarium im Winter – gut oder schlecht", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 28, title: "Ist Schulqualität messbar?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 29, title: "Hausfrau auf Lebenszeit", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 30, title: "Fernsehen macht Kinder dumm", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 31, title: "Kinder unterschätzen Gefahren von Handy und Internet", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 32, title: "Sind Klassenfahrten sinnvoll?", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 33, title: "Wo wohnt man am besten im Alter", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 34, title: "Ganztagsschule – Pro und Contra", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 35, title: "Verbot von Gewaltspielen – Pro und Kontra", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 36, title: "Eine Woche ohne Internet", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 37, title: "Digitales Unterrichtsmaterial in Schulen", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 38, title: "Tierversuche – Pro und Contra", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 39, title: "Englisch als weltweite Unternehmenssprache", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 40, title: "Trinkgeld geben", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 41, title: "Teilzeitarbeit für Männer", enabled: true, hasFile: true, skillPath: "mündlich2" },
  { id: 42, title: "Nahrungsergänzungsmittel", enabled: true, hasFile: true, skillPath: "mündlich2" }
];

// ========== قائمة امتحانات Mündlich Teil 3 ==========
const mündlich3Exams = [
  { id: 1, title: " التخطيط وحل مشكل ", enabled: true, hasFile: true, skillPath: "mündlich3" }
];

// أسماء الملفات الحقيقية
const actualFileNames = {
  1: "exam1.json", 2: "exam2.json", 3: "exam3.json",
  4: "exam4.json", 5: "exam5.json", 6: "exam6.json",
  7: "exam7.json", 8: "exam8.json", 9: "exam9.json",
  10: "exam10.json", 11: "exam11.json", 12: "exam12.json",
  13: "exam13.json", 14: "exam14.json", 15: "exam15.json",
  16: "exam16.json", 17: "exam17.json", 18: "exam18.json",
  19: "exam19.json", 20: "exam20.json", 21: "exam21.json",
  22: "exam22.json", 23: "exam23.json", 24: "exam24.json",
  25: "exam25.json", 26: "exam26.json", 27: "exam27.json",
  28: "exam28.json", 29: "exam29.json", 30: "exam30.json",
  31: "exam31.json", 32: "exam32.json", 33: "exam33.json",
  34: "exam34.json", 35: "exam35.json", 36: "exam36.json",
  37: "exam37.json", 38: "exam38.json", 39: "exam39.json",
  40: "exam40.json", 41: "exam41.json", 42: "exam42.json",
  43: "exam43.json", 44: "exam44.json", 45: "exam45.json",
  46: "exam46.json", 47: "exam47.json", 48: "exam48.json",
  49: "exam49.json", 50: "exam50.json", 51: "exam51.json",
  52: "exam52.json", 53: "exam53.json", 54: "exam54.json",
  55: "exam55.json", 56: "exam56.json", 57: "exam57.json",
  58: "exam58.json", 59: "exam59.json", 60: "exam60.json",
  61: "exam61.json", 62: "exam62.json", 63: "exam63.json",
  64: "exam64.json", 65: "exam65.json", 66: "exam66.json",
  67: "exam67.json", 68: "exam68.json", 69: "exam69.json",
  70: "exam70.json", 71: "exam71.json", 72: "exam72.json",
  73: "exam73.json", 74: "exam74.json", 75: "exam75.json",
  76: "exam76.json", 77: "exam77.json", 78: "exam78.json",
  79: "exam79.json", 80: "exam80.json", 81: "exam81.json",
  82: "exam82.json", 83: "exam83.json", 84: "exam84.json",
  85: "exam85.json", 86: "exam86.json"
};

// ========== قاعدة بيانات الامتحانات ==========
const examsDatabase = {
  lesen1: lesenExams,
  lesen2: [
    { id: 1, title: "Krista", enabled: true, hasFile: true },
    { id: 2, title: "Krista (معدل)", enabled: true, hasFile: true },
    { id: 3, title: "Der Ein-Personen-Karneval", enabled: true, hasFile: true },
    { id: 4, title: "Der Ein-Personen-Karneval (معدل)", enabled: true, hasFile: true },
    { id: 5, title: "ein leben für den Kaffee", enabled: true, hasFile: true },
    { id: 6, title: "ein leben für den Kaffee (معدل 1)", enabled: true, hasFile: true },
    { id: 7, title: "ein leben für den Kaffee (معدل 2)", enabled: true, hasFile: true },
    { id: 8, title: "Kreditkarte", enabled: true, hasFile: true },
    { id: 9, title: "Gedächtnis", enabled: true, hasFile: true },
    { id: 10, title: "Gedächtnis (معدل)", enabled: true, hasFile: true },
    { id: 11, title: "Kaufentscheidungen", enabled: true, hasFile: true },
    { id: 12, title: "Kellnern - Nebenjob", enabled: true, hasFile: true },
    { id: 13, title: "die Ernährung", enabled: true, hasFile: true },
    { id: 14, title: "Geschichte des Hauspersonals", enabled: true, hasFile: true },
    { id: 15, title: "Österreich, das Land der Poolbesitzer", enabled: true, hasFile: true },
    { id: 16, title: "Großraumbüros", enabled: true, hasFile: true },
    { id: 17, title: "Korbjagd zu Pferde", enabled: true, hasFile: true },
    { id: 18, title: "Mehrsprachige Erziehung", enabled: true, hasFile: true },
    { id: 19, title: "Mehrsprachige Erziehung (معدل)", enabled: true, hasFile: true },
    { id: 20, title: "Verpackungen im Supermarkt", enabled: true, hasFile: true },
    { id: 21, title: "Der Puppenmacher", enabled: true, hasFile: true },
    { id: 22, title: "Der Puppenmacher (معدل)", enabled: true, hasFile: true },
    { id: 23, title: "Lehrkräftepreis", enabled: true, hasFile: true },
    { id: 24, title: "Wer parkt, muss zahlen", enabled: true, hasFile: true },
    { id: 25, title: "Wer parkt, muss zahlen (معدل)", enabled: true, hasFile: true },
    { id: 26, title: "Familienglück oder Generationskonflikte", enabled: true, hasFile: true },
    { id: 27, title: "Traumfrau und Traummann gesucht", enabled: true, hasFile: true },
    { id: 28, title: "Traumfrau und Traummann gesucht (معدل)", enabled: true, hasFile: true },
    { id: 29, title: "Wie Babys lernen", enabled: true, hasFile: true },
    { id: 30, title: "Volkskrankheit Rückenschmerz", enabled: true, hasFile: true },
    { id: 31, title: "Volkskrankheit Rückenschmerz (معدل)", enabled: true, hasFile: true },
    { id: 32, title: "Die ganze Welt auf dem eigenen PC", enabled: true, hasFile: true },
    { id: 33, title: "Die deutschen und ihre Ernährung", enabled: true, hasFile: true },
    { id: 34, title: "Weniger Euro-Blüten in Deutschland", enabled: true, hasFile: true },
    { id: 35, title: "Nachtzug", enabled: true, hasFile: true },
    { id: 36, title: "Nachtzug (معدل)", enabled: true, hasFile: true },
    { id: 37, title: "Wie zwei US-Teenager Millionäre wurden", enabled: true, hasFile: true }
  ],
  lesen3: [
    { id: 1, title: "Filme - Fernsehprogramme", enabled: true, hasFile: true },
    { id: 2, title: "Filme - Fernsehprogramme (معدل)", enabled: true, hasFile: true },
    { id: 3, title: "Im Katalog eines Buchversands", enabled: true, hasFile: true },
    { id: 4, title: "kein Zeit", enabled: true, hasFile: true },
    { id: 5, title: "kein Zeit (معدل)", enabled: true, hasFile: true },
    { id: 6, title: "Musik - spielt Gitarre", enabled: true, hasFile: true },
    { id: 7, title: "Die schwangere Frau", enabled: true, hasFile: true },
    { id: 8, title: "Die schwangere Frau (معدل)", enabled: true, hasFile: true },
    { id: 9, title: "Unterstützung in Mathematik", enabled: true, hasFile: true },
    { id: 10, title: "Ganztagesausflug", enabled: true, hasFile: true },
    { id: 11, title: "Ihren Eltern zur Silberhochzeit", enabled: true, hasFile: true },
    { id: 12, title: "Rechtsanwalt", enabled: true, hasFile: true },
    { id: 13, title: "Rechtsanwalt (معدل)", enabled: true, hasFile: true },
    { id: 14, title: "Au-pair Mädchen", enabled: true, hasFile: true },
    { id: 15, title: "Hautprobleme", enabled: true, hasFile: true },
    { id: 16, title: "Eine Bekannte ist schwanger", enabled: true, hasFile: true },
    { id: 17, title: "Die Tochter einer Bekannten wird vier Jahre alt", enabled: true, hasFile: true },
    { id: 18, title: "Tierdokumentationen", enabled: true, hasFile: true },
    { id: 19, title: "Aufräumen", enabled: true, hasFile: true },
    { id: 20, title: "Erholung und Reisen", enabled: true, hasFile: true },
    { id: 21, title: "Sport", enabled: true, hasFile: true },
    { id: 22, title: "Sport (معدل)", enabled: true, hasFile: true },
    { id: 23, title: "Wein und Insekten", enabled: true, hasFile: true },
    { id: 24, title: "Reiseführer", enabled: true, hasFile: true },
    { id: 25, title: "Gartenbau", enabled: true, hasFile: true },
    { id: 26, title: "Haushaltshilfe", enabled: true, hasFile: true },
    { id: 27, title: "Einwanderung", enabled: true, hasFile: true },
    { id: 28, title: "Musikinstrumente", enabled: true, hasFile: true },
    { id: 29, title: "Musikinstrumente (معدل)", enabled: true, hasFile: true },
    { id: 30, title: "Arbeitsorganisation", enabled: true, hasFile: true },
    { id: 31, title: "Hunde", enabled: true, hasFile: true },
    { id: 32, title: "schnelle Wasserfahrzeuge", enabled: true, hasFile: true },
    { id: 33, title: "ein paar Tage in Berlin", enabled: true, hasFile: true },
    { id: 34, title: "ein paar Tage in Berlin (معدل)", enabled: true, hasFile: true },
    { id: 35, title: "Autos", enabled: true, hasFile: true },
    { id: 36, title: "Möbel für die neue Wohnung", enabled: true, hasFile: true },
    { id: 37, title: "Geschäftsreisen - رحلات العمل", enabled: true, hasFile: true }
  ],
  sprach1: [
    { id: 1, title: "Hallo Ferdinand", enabled: true, hasFile: true },
    { id: 2, title: "Hallo Ferdinand (معدل)", enabled: true, hasFile: true },
    { id: 3, title: "Liebe Vanessa", enabled: true, hasFile: true },
    { id: 4, title: "Hallo Judith / Lina", enabled: true, hasFile: true },
    { id: 5, title: "Liebe Karin", enabled: true, hasFile: true },
    { id: 6, title: "Liebe Karin (معدل)", enabled: true, hasFile: true },
    { id: 7, title: "Hallo Leon", enabled: true, hasFile: true },
    { id: 8, title: "Sehr geehrter Herr Martini", enabled: true, hasFile: true },
    { id: 9, title: "Sehr geehrter Herr Martini (معدل)", enabled: true, hasFile: true },
    { id: 10, title: "Liebe Maria, lieber Timur", enabled: true, hasFile: true },
    { id: 11, title: "Lieber Justus", enabled: true, hasFile: true },
    { id: 12, title: "Lieber Justus (معدل)", enabled: true, hasFile: true },
    { id: 13, title: "Lieber Thomas", enabled: true, hasFile: true },
    { id: 14, title: "Sehr geehrte Frau Goronska", enabled: true, hasFile: true },
    { id: 15, title: "Liebe Agnieszka", enabled: true, hasFile: true },
    { id: 16, title: "Liebe Anna", enabled: true, hasFile: true },
    { id: 17, title: "Sehr geehrter Herr Dr. Moosberger (معدل)", enabled: true, hasFile: true },
    { id: 18, title: "Sehr geehrter Herr Dr. Dobromil", enabled: true, hasFile: true },
    { id: 19, title: "Liebe Lina, lieber Florian", enabled: true, hasFile: true },
    { id: 20, title: "Liebes Julian", enabled: true, hasFile: true },
    { id: 21, title: "Liebe Meike", enabled: true, hasFile: true },
    { id: 22, title: "Liebe Corinna (معدل)", enabled: true, hasFile: true },
    { id: 23, title: "Liebe Corinna", enabled: true, hasFile: true },
    { id: 24, title: "Liebe Ida", enabled: true, hasFile: true },
    { id: 25, title: "Liebe Paola", enabled: true, hasFile: true },
    { id: 26, title: "Liebe Jutta", enabled: true, hasFile: true },
    { id: 27, title: "Liebe Familie Geissler", enabled: true, hasFile: true },
    { id: 28, title: "Liebe Andrea", enabled: true, hasFile: true },
    { id: 29, title: "Liebe Andrea (معدل)", enabled: true, hasFile: true },
    { id: 30, title: "Hallo Maria", enabled: true, hasFile: true },
    { id: 31, title: "Sehr geehrte Frau Szabo", enabled: true, hasFile: true },
    { id: 32, title: "Sehr geehrte Frau Szabo (معدل)", enabled: true, hasFile: true },
    { id: 33, title: "Lieber Igor", enabled: true, hasFile: true },
    { id: 34, title: "Liebe Lara", enabled: true, hasFile: true },
    { id: 35, title: "Lieber David", enabled: true, hasFile: true },
    { id: 36, title: "Sehr geehrter Herr Wenzel", enabled: true, hasFile: true },
    { id: 37, title: "Liebe Autorinnen und Autoren", enabled: true, hasFile: true },
    { id: 38, title: "Liebe Clara", enabled: true, hasFile: true },
    { id: 39, title: "Sehr geehrte Frau Melchior", enabled: true, hasFile: true },
    { id: 40, title: "Liebe Sandra", enabled: true, hasFile: true },
    { id: 41, title: "Liebe Anna(الجديد)", enabled: true, hasFile: true }
  ],
  sprach2: [
    { id: 1, title: "Das Fahrrad", enabled: true, hasFile: true },
    { id: 2, title: "Das Fahrrad (معدل)", enabled: true, hasFile: true },
    { id: 3, title: "Man(n) kocht selbst", enabled: true, hasFile: true },
    { id: 4, title: "Jugend diskutiert - mach mit!", enabled: true, hasFile: true },
    { id: 5, title: "Theater für Kinder und Jugendliche", enabled: true, hasFile: true },
    { id: 6, title: "Umgang mit Haustieren", enabled: true, hasFile: true },
    { id: 7, title: "Liebesgrüße aus der Kühltruhe", enabled: true, hasFile: true },
    { id: 8, title: "Liebesgrüße aus der Kühltruhe (معدل)", enabled: true, hasFile: true },
    { id: 9, title: "Online-Sprachkurse", enabled: true, hasFile: true },
    { id: 10, title: "Deutschland – ein Paradies für Kinder?", enabled: true, hasFile: true },
    { id: 11, title: "Deutschland – ein Paradies für Kinder? (معدل 1)", enabled: true, hasFile: true },
    { id: 12, title: "Deutschland – ein Paradies für Kinder? (معدل 2)", enabled: true, hasFile: true },
    { id: 13, title: "Das Schicksal des Braunbären", enabled: true, hasFile: true },
    { id: 14, title: "Das Schicksal des Braunbären (معدل)", enabled: true, hasFile: true },
    { id: 15, title: "Was steckt hinter Bio?", enabled: true, hasFile: true },
    { id: 16, title: "Was genau sind eigentlich Bio-Lebensmittel (معدل)", enabled: true, hasFile: true },
    { id: 17, title: "Sicherer Schulweg", enabled: true, hasFile: true },
    { id: 18, title: "Der Hund als intelligentes Wesen", enabled: true, hasFile: true },
    { id: 19, title: "Die wichtigsten Regeln auf der Skipiste", enabled: true, hasFile: true },
    { id: 20, title: "Kaffee und Kuchen – ein Stück Tradition", enabled: true, hasFile: true },
    { id: 21, title: "Fische sind schlauer, als wir denken", enabled: true, hasFile: true },
    { id: 22, title: "Schwarzarbeit kann teuer werden", enabled: true, hasFile: true },
    { id: 23, title: "Schwarzarbeit kann teuer werden (معدل 1)", enabled: true, hasFile: true },
    { id: 24, title: "Schwarzarbeit kann teuer werden (معدل 2)", enabled: true, hasFile: true },
    { id: 25, title: "Teamarbeit als Schlüssel zum Erfolg", enabled: true, hasFile: true },
    { id: 26, title: "Teamarbeit als Schlüssel zum Erfolg (معدل)", enabled: true, hasFile: true },
    { id: 27, title: "Wie Handschrift wieder cool wird (معدل)", enabled: true, hasFile: true },
    { id: 28, title: "Wie Handschrift wieder cool wird", enabled: true, hasFile: true },
    { id: 29, title: "Ausbildung mit über 30", enabled: true, hasFile: true },
    { id: 30, title: "Verlernen die Deutschen die Höflichkeit?", enabled: true, hasFile: true },
    { id: 31, title: "Joggen: Mehr als nur Laufen", enabled: true, hasFile: true },
    { id: 32, title: "Der klügste Freund des Menschen", enabled: true, hasFile: true },
    { id: 33, title: "Der klügste Freund des Menschen (معدل)", enabled: true, hasFile: true },
    { id: 34, title: "Manipulierte Bilder", enabled: true, hasFile: true },
    { id: 35, title: "Maßgeschneidert nach Bodyscanning", enabled: true, hasFile: true },
    { id: 36, title: "Maßgeschneidert nach Bodyscanning (معدل)", enabled: true, hasFile: true },
    { id: 37, title: "Im Restaurant", enabled: true, hasFile: true },
    { id: 38, title: "Im Restaurant (معدل)", enabled: true, hasFile: true },
    { id: 39, title: "Lernen ist kein Privileg der Jugend", enabled: true, hasFile: true },
    { id: 40, title: "Lernen ist kein Privileg der Jugend (معدل)", enabled: true, hasFile: true },
    { id: 41, title: "Wie TV-Bilder die Fantasie von Kindern prägen", enabled: true, hasFile: true },
    { id: 42, title: "Städte vor dem Infarkt", enabled: true, hasFile: true },
    { id: 43, title: "Es ist erst 6 Uhr morgens", enabled: true, hasFile: true },
    { id: 44, title: "Die Katzen", enabled: true, hasFile: true },
    { id: 45, title: "Teleshopping – nicht immer gut und günstig", enabled: true, hasFile: true },
    { id: 46, title: "Die Rückkehr des Nachtzugs", enabled: true, hasFile: true },
    { id: 47, title: "Die Reise im Schlafwagen", enabled: true, hasFile: true },
    { id: 48, title: "Theaterprojekt für Kinder (المعدل 1)", enabled: true, hasFile: true },
    { id: 49, title: "Theater für Kinder und Jugendliche (المعدل 2)", enabled: true, hasFile: true }
  ],
  hoeren1: [
    { id: 1, title: "Die Deutsche Lufthansa", enabled: true, hasFile: true },
    { id: 2, title: "Die Piloten der Lufthansa", enabled: true, hasFile: true },
    { id: 3, title: "Die Stadt Friedrichsberg", enabled: true, hasFile: true },
    { id: 4, title: "Erdbeben", enabled: true, hasFile: true },
    { id: 5, title: "Bierkonsum", enabled: true, hasFile: true },
    { id: 6, title: "Bierkonsum (Mittel)", enabled: true, hasFile: true },
    { id: 7, title: "Deutsches Schiff", enabled: true, hasFile: true },
    { id: 8, title: "Weniger Vögel - Viele Kunden", enabled: true, hasFile: true },
    { id: 9, title: "Europäische Union", enabled: true, hasFile: true },
    { id: 10, title: "Unwetterschäden", enabled: true, hasFile: true },
    { id: 11, title: "Nicht sicher", enabled: true, hasFile: true },
    { id: 12, title: "Nicht sicher 2", enabled: true, hasFile: true },
    { id: 13, title: "Frau Jürgens", enabled: true, hasFile: true },
    { id: 14, title: "Die Wahlbeteiligung", enabled: true, hasFile: true },
    { id: 15, title: "Die Wetterlage in den Alpen", enabled: true, hasFile: true },
    { id: 16, title: "Wetter in den Alpen (Mittel)", enabled: true, hasFile: true },
    { id: 17, title: "Insel Bali", enabled: true, hasFile: true },
    { id: 18, title: "Die Fluggesellschaft", enabled: true, hasFile: true },
    { id: 19, title: "Der Fluggesellschaft (Mittel)", enabled: true, hasFile: true },
    { id: 20, title: "Der Bau", enabled: true, hasFile: true },
    { id: 21, title: "50-Euro", enabled: true, hasFile: true },
    { id: 22, title: "Das Schladminger", enabled: true, hasFile: true },
    { id: 23, title: "Bei den Europawahlen (Linksparteien)", enabled: true, hasFile: true },
    { id: 24, title: "Bei den Europawahlen (CDU/CSU)", enabled: true, hasFile: true },
    { id: 25, title: "Die Bundesländer", enabled: true, hasFile: true },
    { id: 26, title: "Bio-Siegels", enabled: true, hasFile: true },
    { id: 27, title: "Berufen (bonbon)", enabled: true, hasFile: true },
    { id: 28, title: "Die Zahl der Arbeitslosen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 29, title: "BILD AM SONNTAG (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 30, title: "Studentenparty in Frankreich (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 31, title: "Deutsche Filmmuseum (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 32, title: "Ein Treffen bei der Integrationsbeauftragten (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 33, title: "die Konjunkturentwicklung negativ (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 34, title: "internationalen Konferenz (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 35, title: "Um Tickets zu gewinnen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 36, title: "Die tschechische Stadt Pilsen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 37, title: "Laut Statistischem Bundesamt (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 38, title: "In Frankfurt haben Manager (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 39, title: "Für die Polizei in Berlin (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 40, title: "Die Sprecherin ist verheiratet (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 41, title: "Bei der Sportveranstaltung (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 42, title: "Das Bundesfamilienministerium (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 43, title: "Meeresküsten (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 44, title: "Bauern warnen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 45, title: "Nach Ansicht mancher (مواضيع تركيا)", enabled: true, hasFile: true }
  ],
  hoeren2: [
    { id: 1, title: "Herr Gasser und Frau Janke", enabled: true, hasFile: true },
    { id: 2, title: "Suza Hotop", enabled: true, hasFile: true },
    { id: 3, title: "Suza Hotop (Mittel)", enabled: true, hasFile: true },
    { id: 4, title: "Professor Steiner", enabled: true, hasFile: true },
    { id: 5, title: "Professor Steiner (Mittel)", enabled: true, hasFile: true },
    { id: 6, title: "Mallorca", enabled: true, hasFile: true },
    { id: 7, title: "Mallorca (Mittel)", enabled: true, hasFile: true },
    { id: 8, title: "In dem Restaurant", enabled: true, hasFile: true },
    { id: 9, title: "Julia", enabled: true, hasFile: true },
    { id: 10, title: "Carina", enabled: true, hasFile: true },
    { id: 11, title: "Carina (Mittel)", enabled: true, hasFile: true },
    { id: 12, title: "Frau Schenk", enabled: true, hasFile: true },
    { id: 13, title: "Frau Schenk (Mittel)", enabled: true, hasFile: true },
    { id: 14, title: "Herr Karimov", enabled: true, hasFile: true },
    { id: 15, title: "Nadine", enabled: true, hasFile: true },
    { id: 16, title: "Markus", enabled: true, hasFile: true },
    { id: 17, title: "Markus (Mittel)", enabled: true, hasFile: true },
    { id: 18, title: "Roland (Spielen)", enabled: true, hasFile: true },
    { id: 19, title: "Roland (aufsteigen)", enabled: true, hasFile: true },
    { id: 20, title: "Roland (einer höheren Lige)", enabled: true, hasFile: true },
    { id: 21, title: "Die Deutschen machen", enabled: true, hasFile: true },
    { id: 22, title: "Herr Scherer", enabled: true, hasFile: true },
    { id: 23, title: "Beim Wettkampf", enabled: true, hasFile: true },
    { id: 24, title: "Vanessa", enabled: true, hasFile: true },
    { id: 25, title: "Zu Beginn", enabled: true, hasFile: true },
    { id: 26, title: "Die TU Dresden", enabled: true, hasFile: true },
    { id: 27, title: "Lisa Eisenberg", enabled: true, hasFile: true },
    { id: 28, title: "Franz Schumacher", enabled: true, hasFile: true },
    { id: 29, title: "Meron Makeba", enabled: true, hasFile: true },
    { id: 30, title: "Frau Kedar Malta", enabled: true, hasFile: true },
    { id: 31, title: "Frau Keder aus Malta", enabled: true, hasFile: true },
    { id: 32, title: "Nadine Wagner (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 33, title: "Mirjam Pressier (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 34, title: "Mirjam Pressier - ليدعت (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 35, title: "Frau Pesina (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 36, title: "Herr Werner (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 37, title: "Wohnmobil (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 38, title: "Straßenkinder - Die Kinder (Kids) (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 39, title: "Familie - Eltern (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 40, title: "Revolution Day (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 41, title: "Bicycle (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 42, title: "Die Radiosendung (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 43, title: "psychische (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 44, title: "Herr Kemper (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 45, title: "Frau Hahn (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 46, title: "Wohnmobilen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 47, title: "Bibliothek (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 48, title: "Eisschwimmen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 49, title: "Die Ausbildung (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 50, title: "Thomas", enabled: true, hasFile: true },
    { id: 51, title: "Frau Kiddar 3", enabled: true, hasFile: true },
    { id: 52, title: "Bio-Essen: Obst, Gemüse und Lieferung", enabled: true, hasFile: true },
    { id: 53, title: "Influencerin - Maria im Interview", enabled: true, hasFile: true },
    { id: 54, title: "Vom Marktstand zum eigenen Geschäft", enabled: true, hasFile: true },
    { id: 55, title: "Interview mit Bauingenieur - Herr Böhm", enabled: true, hasFile: true }
  ],
  hoeren3: [
    { id: 1, title: "Telefon", enabled: true, hasFile: true },
    { id: 2, title: "Musikfestivals", enabled: true, hasFile: true },
    { id: 3, title: "Musikfestivals (Mittel)", enabled: true, hasFile: true },
    { id: 4, title: "Fahrschule", enabled: true, hasFile: true },
    { id: 5, title: "Im Süden Deutschlands (regnen)", enabled: true, hasFile: true },
    { id: 6, title: "Im Süden Deutschlands (Schnee)", enabled: true, hasFile: true },
    { id: 7, title: "Internet prüfen", enabled: true, hasFile: true },
    { id: 8, title: "Ehrenamts", enabled: true, hasFile: true },
    { id: 9, title: "Ehrenamts (Mittel)", enabled: true, hasFile: true },
    { id: 10, title: "Demonstration", enabled: true, hasFile: true },
    { id: 11, title: "Wochenanfang", enabled: true, hasFile: true },
    { id: 12, title: "Im August", enabled: true, hasFile: true },
    { id: 13, title: "Fundbüro", enabled: true, hasFile: true },
    { id: 14, title: "Ausgang 26", enabled: true, hasFile: true },
    { id: 15, title: "Ausgang 26 (Mittel)", enabled: true, hasFile: true },
    { id: 16, title: "Blutspenden", enabled: true, hasFile: true },
    { id: 17, title: "Reitturnier", enabled: true, hasFile: true },
    { id: 18, title: "Delikatessen", enabled: true, hasFile: true },
    { id: 19, title: "Für ein Konzert (Bus gratis)", enabled: true, hasFile: true },
    { id: 20, title: "Für ein Konzert (in der ganzen Stadt)", enabled: true, hasFile: true },
    { id: 21, title: "In Raum C23", enabled: true, hasFile: true },
    { id: 22, title: "Trainingsausfahrten", enabled: true, hasFile: true },
    { id: 23, title: "Das Geschäft", enabled: true, hasFile: true },
    { id: 24, title: "Nach einer Großdemonstration", enabled: true, hasFile: true },
    { id: 25, title: "Das Fest (ohne Frankfurt)", enabled: true, hasFile: true },
    { id: 26, title: "Das Fest (mit Frankfurt)", enabled: true, hasFile: true },
    { id: 27, title: "Radio Konzert", enabled: true, hasFile: true },
    { id: 28, title: "Wanderung (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 29, title: "Bayern Radio (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 30, title: "Die Gruppe Die Prinzen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 31, title: "spätestens in Hannover (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 32, title: "Für das Konzert mit Romano (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 33, title: "Gartenausstellung KöGa (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 34, title: "den Opel-Zoo (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 35, title: "Der Christkindlesmarkt in Nürnberg (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 36, title: "Das Geschäft für österreichische Spezialitäten (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 37, title: "Alle Flüge der Fluglinie AirMer (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 38, title: "Auto gewinnen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 39, title: "Die Fahrradtouren von Berlin (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 40, title: "Die Literaturmesse für Kleinverleger (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 41, title: "Fußballspiels im Ostpark (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 42, title: "Das Treffen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 43, title: "im Frankfurter Zoo (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 44, title: "Ein Teil der kostenlosen Veranstaltungen (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 45, title: "Auf der Viktoriabrücke (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 46, title: "Die Buchpräsentation (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 47, title: "Beim Klassik-Radio (مواضيع تركيا)", enabled: true, hasFile: true },
    { id: 48, title: "Sie Hören Den Anrufbeantworter-Buchhandlung", enabled: true, hasFile: true }
  ],
  schreiben: schreibenExams,
  mündlich: mündlich2Exams,
  mündlich1: mündlich1Exams,
  mündlich2: mündlich2Exams,
  mündlich3: mündlich3Exams,
  tips: tipsExams
};

// ========== دالة عرض نتيجة محفوظة ==========
function displaySavedResult(skill, examId, titleSpan, containerDiv) {
  const savedScore = getExamResult(skill, examId);
  if (savedScore !== null) {
    const badge = createResultBadge(savedScore);
    if (badge) {
      const existingBadge = titleSpan.querySelector('.exam-result-badge');
      if (existingBadge) existingBadge.remove();
      titleSpan.appendChild(badge);
    }
  }
}

let activeTeilId = null;

function renderTeileList() {
  const container = document.getElementById("teileList");
  if (!container) return;
  container.innerHTML = "";
  
  container.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
  `;
  
  for (let i = 0; i < teile.length; i++) {
    const teil = teile[i];
    const isActive = (activeTeilId === i);
    
    const btn = document.createElement("button");
    btn.textContent = teil.name;
    btn.style.cssText = `
      height: 42px;
      padding: 0 18px;
      background: ${isActive ? '#FFFFFF' : '#161922'};
      border: ${isActive ? '1px solid #E2E8F0' : 'none'};
      border-radius: 14px;
      font-size: 15px;
      font-weight: 600;
      font-family: inherit;
      color: ${isActive ? '#161922' : '#BFC6D4'};
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      white-space: nowrap;
    `;
    
    btn.onmouseenter = () => {
      if (!isActive) {
        btn.style.background = '#202534';
        btn.style.color = '#FFFFFF';
      }
    };
    
    btn.onmouseleave = () => {
      if (!isActive) {
        btn.style.background = '#161922';
        btn.style.color = '#BFC6D4';
      }
    };
    
    btn.onclick = (function(skill, teilName, index) {
      return function() {
        activeTeilId = index;
        renderTeileList();
        renderExamListForSkill(skill, teilName);
      };
    })(teil.skill, teil.name, i);
    
    container.appendChild(btn);
  }
}

// وظيفة عرض أزرار التنقل بين أجزاء Mündlich
function renderMündlichPartTabs() {
  const container = document.getElementById("examsList");
  if (!container) return;
  
  const oldTabs = container.querySelector('.mündlich-tabs');
  if (oldTabs) oldTabs.remove();
  
  const tabsDiv = document.createElement("div");
  tabsDiv.className = "mündlich-tabs";
  tabsDiv.style.cssText = `
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px 0;
  `;
  
  const parts = [
    { id: 1, name: "Teil 1 ", skill: "mündlich1" },
    { id: 2, name: "Teil 2 ", skill: "mündlich2" },
    { id: 3, name: "Teil 3 ", skill: "mündlich3" }
  ];
  
  parts.forEach(part => {
    const btn = document.createElement("button");
    btn.textContent = part.name;
    btn.style.cssText = `
      background: ${currentMündlichPart === part.id ? "#4a6fa5" : "#eef2f7"};
      color: ${currentMündlichPart === part.id ? "white" : "#2c3e66"};
      border: none;
      padding: 8px 20px;
      border-radius: 30px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    `;
    btn.onmouseenter = () => {
      if (currentMündlichPart !== part.id) {
        btn.style.background = "#dee2e8";
      }
    };
    btn.onmouseleave = () => {
      if (currentMündlichPart !== part.id) {
        btn.style.background = "#eef2f7";
      }
    };
    btn.onclick = () => {
      currentMündlichPart = part.id;
      const skillToRender = part.skill;
      const displayName = `Mündlich - ${part.name}`;
      renderExamListForSkill(skillToRender, displayName);
    };
    tabsDiv.appendChild(btn);
  });
  
  container.insertBefore(tabsDiv, container.firstChild);
}
async function renderExamListForSkill(skill, teilName) {
  currentSkill = skill;
// ===== معالجة الامتحانات ذات التعديلات =====
// إنشاء مجموعة من الامتحانات الأساسية فقط (تلك التي ليس لها parent)
function getMainExams(exams) {
    const mainExams = [];
    const versionIds = new Set();
    
    // أولاً: جمع كل الـ IDs التي تظهر كتعديلات
    exams.forEach(exam => {
        if (exam.versions && exam.versions.length > 1) {
            exam.versions.forEach((v, idx) => {
                if (idx > 0) versionIds.add(v.id);
            });
        }
    });
    
    // ثانياً: إضافة الامتحانات الأساسية فقط
    exams.forEach(exam => {
        // إذا كان هذا الامتحان ليس تعديلاً (أي ليس في versionIds)
        if (!versionIds.has(exam.id)) {
            mainExams.push(exam);
        }
    });
    
    return mainExams;
}
  const container = document.getElementById("examsList");
  if (!container) return;
  container.innerHTML = "";
  
  if (skill === "mündlich1" || skill === "mündlich2" || skill === "mündlich3" || skill === "mündlich") {
    renderMündlichPartTabs();
  }
  
  const headerDiv = document.createElement("div");
  headerDiv.className = "teil-header";
  headerDiv.innerHTML = `<strong>📚 ${teilName || getTeilNameBySkill(skill)}</strong>`;
  container.appendChild(headerDiv);

  if (SKILL_CONFIG[skill]) {
      renderMemoryProgressBar(skill, container);
  }
  
  let targetSkill = skill;
  let targetExams = examsDatabase[skill] || [];
  // إذا كانت المهارة هي lesen1، نطبق نظام التعديلات
if (skill === 'lesen1') {
    targetExams = getMainExams(targetExams);
}
  if (skill === "mündlich") {
    if (currentMündlichPart === 1) {
      targetSkill = "mündlich1";
      targetExams = examsDatabase.mündlich1 || [];
    } else if (currentMündlichPart === 2) {
      targetSkill = "mündlich2";
      targetExams = examsDatabase.mündlich2 || [];
    } else if (currentMündlichPart === 3) {
      targetSkill = "mündlich3";
      targetExams = examsDatabase.mündlich3 || [];
    }
  }
  
  currentExamsList = targetExams;
  
  if (targetExams.length === 0) {
    container.innerHTML += '<div class="item" style="text-align:center; color:#999;">⚠️ لا توجد امتحانات متاحة حالياً في هذا الجزء</div>';
    return;
  }
  
  // ✅ قراءة حالة المستخدم (قراءة فقط من auth.js)
  const userStatus = await getUserStatusForExam();
  const isPremium = (userStatus === 'premium');
  
  for (let i = 0; i < targetExams.length; i++) {
    const exam = targetExams[i];
    const examNumber = exam.id;
    const isFreeExam = (examNumber <= 6);
    
    const div = document.createElement("div");
    div.className = "item";
    
    const titleSpan = document.createElement("span");
    titleSpan.className = "exam-title";
    // ✅ التحقق من وجود تعديلات للامتحان
const fullExam = examsDatabase[skill]?.find(e => e.id === exam.id);
const hasVersions = fullExam && fullExam.versions && fullExam.versions.length > 1;

if (hasVersions) {
    // إضافة Badge يدل على عدد التعديلات
    const versionBadge = document.createElement("span");
    versionBadge.className = "version-badge";
    versionBadge.textContent = fullExam.versions.length;
    versionBadge.style.cssText = `
        display: inline-flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #334155, #1e293b);
        color: #f1f5f9; border-radius: 999px;
        padding: 0 8px; height: 20px; font-size: 9px; font-weight: 600;
        margin-left: 6px; cursor: pointer; flex-shrink: 0;
        border: 1px solid #475569; transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
    versionBadge.onmouseenter = () => {
        versionBadge.style.transform = 'scale(1.08)';
        versionBadge.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    };
    versionBadge.onmouseleave = () => {
        versionBadge.style.transform = 'scale(1)';
        versionBadge.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    };
    versionBadge.title = `${fullExam.versions.length} تعديلات`;
    
    // عند الضغط على الـ Badge تظهر النافذة
    versionBadge.onclick = (e) => {
        e.stopPropagation();
        showVersionsPopup(fullExam.versions, fullExam.title);
    };
    
    titleSpan.appendChild(versionBadge);
}
    if (skill === "tips") {
      titleSpan.textContent = `${exam.title}`;
      titleSpan.style.textAlign = "center";
      titleSpan.style.display = "block";
      titleSpan.style.width = "100%";
    } else {
      titleSpan.textContent = `${exam.id}: ${exam.title}`;
    }
    
    div.appendChild(titleSpan);
    
    displaySavedResult(targetSkill, exam.id, titleSpan, div);

    const progress = getExamProgress(targetSkill, exam.id);
    if (progress > 0) {
      const progressSpan = document.createElement('span');
      progressSpan.className = 'exam-progress-mini';
      progressSpan.style.cssText = `
        font-size: 10px;
        color: #1565C0;
        margin-left: 8px;
        font-weight: 500;
        background: #f0f7ff;
        padding: 2px 6px;
        border-radius: 10px;
      `;
      progressSpan.textContent = `${progress}%`;
      titleSpan.appendChild(progressSpan);
    }
    
    if (!isPremium && !isFreeExam && targetSkill !== "mündlich1" && targetSkill !== "mündlich3") {
      div.style.backgroundColor = "rgba(255,255,255,0.75)";
      div.style.border = "1px solid #e2e8f0";
      div.style.opacity = "1";
      div.style.transition = "all 0.25s ease";
      div.style.cursor = "pointer";
      
      const rightSide = document.createElement("span");
      rightSide.className = "exam-right-icons";

      const premiumSpan = document.createElement("span");
      premiumSpan.className = "premium-badge";
      premiumSpan.innerHTML = "Premium";
      rightSide.appendChild(premiumSpan);
      
      div.appendChild(rightSide);
      titleSpan.style.color = "#6b7280";
      titleSpan.style.transition = "color 0.25s ease";
      
      div.onmouseenter = function() {
        this.style.backgroundColor = "rgba(255,255,255,0.95)";
        this.style.transform = "translateX(5px)";
        this.style.borderColor = "#60a5fa";
        titleSpan.style.color = "#4b5563";
        if (premiumSpan) premiumSpan.style.transform = "scale(1.02)";
      };

      div.onmouseleave = function() {
        this.style.backgroundColor = "rgba(255,255,255,0.75)";
        this.style.transform = "translateX(0)";
        this.style.borderColor = "#e2e8f0";
        titleSpan.style.color = "#6b7280";
        if (premiumSpan) premiumSpan.style.transform = "scale(1)";
      };
      
      div.onclick = (function(title, id) {
        return function() {
          if (typeof window.showPremiumModal === 'function') {
            window.showPremiumModal(title + " (" + id + ")");
          } else {
            window.location.href = 'subscribe.html';
          }
        };
      })(exam.title, exam.id);
      
    } else if (exam.hasFile) {
      div.onclick = (function(id, title, skillPath) {
        return function() { 
          const actualSkill = skillPath || targetSkill;
          openExam(id, title, actualSkill); 
        };
      })(exam.id, exam.title, exam.skillPath || targetSkill);
      
    } else {
      div.style.opacity = "0.6";
      div.style.backgroundColor = "#f8f9fa";
      div.onclick = () => alert(`⚠️ الامتحان رقم ${exam.id} سيتم إضافته قريباً.`);
    }
    container.appendChild(div);
  }
  
  setTimeout(setupLockedNextButton, 100);
}

function setupLockedNextButton() {
  const nextBtn = document.getElementById('nextExamBtn');
  if (!nextBtn) return;
  
  // ✅ استخدام القراءة فقط من getUserStatusForExam
  getUserStatusForExam().then(status => {
    const isPremium = (status === 'premium');
    
    const currentIndex = currentExamsList.findIndex(e => e.id === currentExamId);
    const nextExam = currentExamsList[currentIndex + 1];
    
    if (nextExam) {
      const nextExamId = nextExam.id;
      
      if (!isPremium && nextExamId > 6 && nextBtn.style.display !== 'none') {
        nextBtn.style.position = "relative";
        nextBtn.style.paddingLeft = "35px";
        
        let lockIcon = nextBtn.querySelector('.next-lock-icon');
        if (!lockIcon) {
          lockIcon = document.createElement('span');
          lockIcon.className = 'next-lock-icon';
          lockIcon.innerHTML = '🔒';
          lockIcon.style.cssText = 'position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #ef4444;';
          nextBtn.appendChild(lockIcon);
        }
        nextBtn.style.backgroundColor = "#b0bec5";
        nextBtn.style.opacity = "0.8";
        
        nextBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof window.showPremiumModal === 'function') {
            window.showPremiumModal(nextExam.title + " (" + nextExamId + ")");
          } else {
            window.location.href = 'subscribe.html';
          }
          return false;
        };
      } 
      else if (isPremium || nextExamId <= 6) {
        const lockIcon = nextBtn.querySelector('.next-lock-icon');
        if (lockIcon) lockIcon.remove();
        nextBtn.style.backgroundColor = "";
        nextBtn.style.opacity = "1";
        nextBtn.style.paddingLeft = "";
        
        nextBtn.onclick = () => {
          openExam(nextExam.id, nextExam.title, nextExam.skillPath || currentSkill);
        };
      }
    }
  });
}

function getTeilNameBySkill(skill) {
  if (skill === "mündlich1") return "Mündlich - Teil 1 📖";
  if (skill === "mündlich2") return "Mündlich - Teil 2 🗣️";
  if (skill === "mündlich3") return "Mündlich - Teil 3 🎯";
  const teil = teile.find(t => t.skill === skill);
  return teil ? teil.name : skill;
}

function getActualFileName(examId) {
  if (actualFileNames[examId]) {
    return actualFileNames[examId];
  }
  return `exam${examId}.json`;
}

function shouldHideHelpButton(skill) {
  const hiddenSkills = ["schreiben", "tips", "mündlich1", "mündlich3"];
  return hiddenSkills.includes(skill);
}


async function openExam(examId, examTitle, skill) {
  const userStatus = await getUserStatusForExam();
  const isPremium = (userStatus === 'premium');
  const maxFreeExamId = 6;
  
  if (!isPremium && examId > maxFreeExamId && skill !== "mündlich1" && skill !== "mündlich3") {
    if (typeof window.showPremiumModal === 'function') {
        window.showPremiumModal(examTitle + " (" + examId + ")");
    } else {
        window.location.href = 'subscribe.html';
    }
    return;
}
  
  console.log("🔍 openExam parameters:", { examId, examTitle, skill });
  
  currentExamId = examId;
  currentSkill = skill;
  
  // ✅ تعيين القيم للاستخدام العام (مطلوب لـ Interleaving و Memory Engine)
  window.currentSkill = skill;
  window.currentExamId = examId;
  // ============================================================
  // ✅ ✅ ✅ إخفاء الأزرار حسب نوع الصفحة ✅ ✅ ✅
  // ============================================================
  const interleavingRow = document.getElementById('interleavingRow');
  if (interleavingRow) {
    // إخفاء الكل افتراضياً
    interleavingRow.style.display = 'none';
    
    // المهارات التي تظهر فيها الأزرار (جميع المهارات المدعومة)
    const allowedSkills = [
      'hoeren1', 'hoeren2', 'hoeren3',
      'lesen1', 'lesen2', 'lesen3',
      'sprach1', 'sprach2'
    ];
    
    // ✅ الشرط الصحيح: يدخل لكل المهارات المدعومة
    if (allowedSkills.includes(skill)) {
      // إظهار الصف بالكامل
      interleavingRow.style.display = 'flex';
      
      // الأزرار
      const swapBtn = document.getElementById('interleavingBtn');
      const gameBtn = document.getElementById('rapidGameBtn');
      const memoryToggleBtn = document.getElementById('memoryToggleBtn');
      
      // ✅ Sprachbausteine 1 أو 2: إخفاء swap_vert فقط
      if (skill === 'sprach1' || skill === 'sprach2') {
        if (swapBtn) swapBtn.style.display = 'none';
        if (gameBtn) gameBtn.style.display = '';      // إظهار (إرجاع للقيمة الافتراضية)
        if (memoryToggleBtn) memoryToggleBtn.style.display = ''; // إظهار
      } 
      // ✅ باقي المهارات: إظهار الكل
      else {
        if (swapBtn) swapBtn.style.display = '';
        if (gameBtn) gameBtn.style.display = '';
        if (memoryToggleBtn) memoryToggleBtn.style.display = '';
      }
    } else {
      // المهارات غير المسموحة (schreiben, mündlich, tips, etc.)
      interleavingRow.style.display = 'none';
    }
  }
  // ============================================================
  // ✅ ✅ ✅ نهاية إخفاء الأزرار ✅ ✅ ✅
  // ============================================================
  
  if (shouldHideHelpButton(skill)) {
    const helpBtn = document.getElementById('globalHelpButton');
    if (helpBtn) helpBtn.style.display = "none";
  } else {
    const helpBtn = document.getElementById('globalHelpButton');
    if (helpBtn) helpBtn.style.display = "block";
  }
  
  const fileName = getActualFileName(examId);
  
  console.log("🟢 فتح الامتحان:", examId, examTitle, skill);
  console.log("📁 اسم الملف:", fileName);
  console.log("📂 المسار الكامل:", `data/${skill}/${fileName}`);
  
  try {
    const response = await fetch(`data/${skill}/${fileName}`);
    if (!response.ok) {
      alert(`⚠️ الامتحان "${examTitle}" سيتم إضافته قريباً.\nالملف المطلوب: data/${skill}/${fileName}`);
      return;
    }
    currentExamData = await response.json();
    window.currentExamData = currentExamData;
    window.currentExamId = examId;
    if (window.memoryEngine) {
        window.memoryEngine.setExamData(currentExamData);
    }
    document.getElementById("home").classList.remove("active");
    document.getElementById("list").classList.remove("active");
    document.getElementById("exam").classList.add("active");
    document.getElementById("examTitle").innerHTML = currentExamData.title;
    
    updateExamNavButtons();
    
    if (currentExamData.type === "matching") {
      if (typeof window.loadMatchingExam === "function") {
        window.loadMatchingExam(currentExamData);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "truefalse") {
      const container = document.getElementById(currentSkill);
      if (container && typeof window.buildTrueFalseExam === "function") {
        window.buildTrueFalseExam(container, currentExamData.questions, currentExamData.note);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "teil2") {
      if (typeof window.loadTeil2Exam === "function") {
        window.loadTeil2Exam(currentExamData);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "teil3") {
      if (typeof window.loadTeil3Exam === "function") {
        window.loadTeil3Exam(currentExamData);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "sprach1") {
      if (typeof window.loadSprach1Exam === "function") {
        window.loadSprach1Exam(currentExamData);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "sprach2") {
      if (typeof window.loadSprach2Exam === "function") {
        window.loadSprach2Exam(currentExamData);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "schreiben") {
      if (typeof window.loadSchreibenExam === "function") {
        window.loadSchreibenExam(currentExamData);
      } else {
        buildTeil1(currentExamData.questions || []);
      }
    } else if (currentExamData.type === "mündlich") {
      renderMündlichExam(currentExamData);
    } else if (currentExamData.type === "info") {
      renderInfoExam(currentExamData);
    } else if (currentExamData.type === "tips") {
      renderTipsExam(currentExamData);
    } else {
      buildTeil1(currentExamData.questions || []);
    }
    
    const teilIndex = teile.findIndex(t => t.skill === skill);
    if (teilIndex !== -1) {
      showTeil(teilIndex + 1);
    } else {
      showTeil(10);
    }
  
    
    // ============================================================
    // ✅ ✅ ✅ التعديل النهائي لـ Interleaving ✅ ✅ ✅
    // ============================================================
    
    // ============================================================
    // ✅ ✅ ✅ التعديل النهائي لـ Interleaving ✅ ✅ ✅
    // ============================================================
    
    // 1. التأكد من إظهار الحاوية الخاصة بالجزء الحالي
    const containerEl = document.getElementById(skill);
    if (containerEl) {
        containerEl.style.display = 'block';
    }

    // 2. إعادة تعيين Interleaving (فقط إعادة تعيين الحالة، لا تعيد بناء البطاقات)
    if (typeof window.resetInterleaving === 'function') {
        window.resetInterleaving();
    }

    // 3. تهيئة زر Interleaving (ربط الأحداث) - سيتم تنفيذها مرة واحدة فقط
    if (typeof window.initInterleaving === 'function') {
        console.log('🔄 تهيئة Interleaving بعد تحميل الامتحان...');
        window.initInterleaving();
    }

// 4. ✅ إعادة بناء البطاقات للمهارات المدعومة
// 4. ✅ إعادة بناء البطاقات للمهارات المدعومة
if (skill.startsWith('hoeren') && typeof window.rebuildTrueFalseCards === 'function') {
    console.log('🔄 إعادة بناء بطاقات Hören بعد تحميل الامتحان');
    window.rebuildTrueFalseCards();
} else if (skill === 'lesen1' && typeof window.rebuildLesen1 === 'function') {
    console.log('🔄 إعادة بناء بطاقات Lesen 1 بعد تحميل الامتحان');
    window.rebuildLesen1();
} else if (skill === 'lesen2' && typeof window.rebuildLesen2 === 'function') {
    console.log('🔄 إعادة بناء بطاقات Lesen 2 بعد تحميل الامتحان');
    window.rebuildLesen2();
} else if (skill === 'lesen3' && typeof window.rebuildLesen3 === 'function') {
    console.log('🔄 إعادة بناء بطاقات Lesen 3 بعد تحميل الامتحان');
    window.rebuildLesen3();
}
    
  } catch(e) {
    console.error("❌ خطأ:", e);
    alert("خطأ في تحميل الامتحان: " + e.message);
  }
}  // ✅ هذا القوس يغلق دالة openExam
// دالة العودة إلى قائمة الامتحانات حسب القسم الحالي
function goBackToExamsList() {
  if (currentSkill) {
    if (currentSkill === "mündlich1") {
      document.getElementById("home").classList.remove("active");
      document.getElementById("exam").classList.remove("active");
      document.getElementById("list").classList.add("active");
      renderExamListForSkill("mündlich1", "Mündlich - Teil 1 📖");
    } 
    else if (currentSkill === "mündlich2") {
      document.getElementById("home").classList.remove("active");
      document.getElementById("exam").classList.remove("active");
      document.getElementById("list").classList.add("active");
      renderExamListForSkill("mündlich2", "Mündlich - Teil 2 🗣️");
    }
    else if (currentSkill === "mündlich3") {
      document.getElementById("home").classList.remove("active");
      document.getElementById("exam").classList.remove("active");
      document.getElementById("list").classList.add("active");
      renderExamListForSkill("mündlich3", "Mündlich - Teil 3 🎯");
    }
    else if (currentSkill.startsWith('mündlich')) {
      renderExamListForSkill('mündlich', getTeilNameBySkill('mündlich'));
    }
    else {
      const teil = teile.find(t => t.skill === currentSkill);
      if (teil) {
        document.getElementById("home").classList.remove("active");
        document.getElementById("exam").classList.remove("active");
        document.getElementById("list").classList.add("active");
        renderExamListForSkill(teil.skill, teil.name);
      } else {
        goList();
      }
    }
  } else {
    goList();
  }
}

// وظيفة عرض الامتحانات من نوع info (Teil 1 و Teil 3)
function renderInfoExam(examData) {
  let containerId = currentSkill;
  if (currentSkill === "mündlich1" || currentSkill === "mündlich3") {
    containerId = "mündlich";
  }
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("❌ الحاوية غير موجودة:", containerId);
    return;
  }
  
  container.innerHTML = "";
  
  const content = examData.content;
  if (!content) {
    container.innerHTML = "<div class='error'>⚠️ لا يوجد محتوى للعرض</div>";
    return;
  }
  
  let html = `
    <div style="max-width: 1300px; margin: 0 auto; padding: 20px;">
      <div style="background: #ffffff; padding: 14px 20px; border-radius: 12px; border: 1px solid #e0e4e8; color: #5a6874; font-size: 0.85rem; margin-bottom: 20px;">
        💡 هذه الأمثلة فقط لكي تفهموا طريقة سير الامتحان، وليس مطلوبًا منكم حفظ نفس الاقتراحات أو استعمالها حرفيًا.
      </div>
  `;
  
  if (content.phase1) {
    html += `<div style="margin-bottom: 35px;"><div style="font-size: 1.3rem; font-weight: 600; color: #2c3e66; border-right: 3px solid #4a6fa5; padding-right: 12px; margin-bottom: 20px;">📖 ${content.phase1.title}</div>`;
    html += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px;">`;
    content.phase1.questions.forEach(q => {
      html += `
        <div style="background: #ffffff; border-radius: 16px; padding: 18px; border: 1px solid #e8ecef;">
          <div style="font-weight: 600; color: #2c3e66; margin-bottom: 8px;">${q.german}</div>
          <div style="color: #6c7a89; font-size: 0.85rem; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #e8ecef;">${q.arabic}</div>
          <div style="background: #f8fafc; padding: 12px; border-radius: 12px; font-size: 0.8rem; color: #2c3e66; line-height: 1.5;">
            <div style="font-weight: 600; color: #4a6fa5; margin-bottom: 6px; font-size: 0.75rem;">📋 مثال:</div>
            <div>${q.example.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
  }
  
  if (content.phase2) {
    html += `<div style="margin-bottom: 35px;"><div style="font-size: 1.3rem; font-weight: 600; color: #2c3e66; border-right: 3px solid #4a6fa5; padding-right: 12px; margin-bottom: 20px;">🎯 ${content.phase2.title}</div>`;
    if (content.phase2.note) {
      html += `<div style="background: #ffffff; padding: 12px 18px; border-radius: 12px; border: 1px solid #e0e4e8; margin-bottom: 20px; font-size: 0.85rem; color: #4a6fa5; text-align: center;">📝 ${content.phase2.note}</div>`;
    }
    html += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">`;
    content.phase2.topics.forEach(topic => {
      html += `
        <div style="background: #f8f9fb; border-radius: 16px; padding: 18px; border: 1px solid #e8ecef;">
          <div style="font-size: 1.1rem; font-weight: 600; color: #2c3e66;">📚 ${topic.title}</div>
          <ul style="list-style: none; padding: 0; margin: 16px 0;">
            ${topic.points.map(p => `<li style="font-size: 0.8rem; color: #5a6874; margin-bottom: 6px; padding-right: 12px; position: relative;">• ${p}</li>`).join('')}
          </ul>
          <div style="background: #ffffff; padding: 12px; border-radius: 12px; margin-top: 12px; border-right: 2px solid #4a6fa5;">
            <div style="font-size: 0.7rem; font-weight: 600; color: #4a6fa5; margin-bottom: 6px;">💬 أسئلة قد يطرحها الشريك عليك:</div>
            ${topic.partnerQuestions.map(q => `<div style="font-size: 0.75rem; color: #2c3e66; margin-bottom: 6px;">📌 ${q.german}<br><small style="color: #8a9aa8;">${q.arabic}</small></div>`).join('')}
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
  }
  
  if (content.groups) {
    html += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 24px; margin-bottom: 40px;">`;
    content.groups.forEach(group => {
      html += `
        <div style="background: #f8f9fb; border-radius: 16px; padding: 20px; border: 1px solid #e8ecef; display: flex; flex-direction: column;">
          <div style="font-size: 1.2rem; font-weight: 600; color: #2c3e66; margin-bottom: 12px;">${group.title}</div>
          <div style="font-size: 0.85rem; color: #6c7a89; margin-bottom: 20px;">${group.topics}</div>
          <button class="toggle-suggestions-btn" style="background: transparent; border: 1px solid #4a6fa5; padding: 8px 18px; border-radius: 30px; cursor: pointer; color: #4a6fa5; width: fit-content; margin-top: auto;" data-group="${group.id}">أمثلة →</button>
          <div class="suggestions-content" data-group="${group.id}" style="display: none; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e8ecef;">
            <ul style="list-style: none; padding: 0;">
              ${group.suggestions.map((s, idx) => `<li style="background: #ffffff; padding: 10px 14px; margin-bottom: 8px; border-radius: 12px; border-right: 2px solid #cbd5e1;"><span style="font-weight: 600; color: #4a6fa5;">${idx+1}.</span> ${s}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    
    if (content.methodology) {
      html += `
        <div style="background: #f8f9fb; border-radius: 16px; padding: 20px; border: 1px solid #e8ecef;">
          <div style="font-size: 1.2rem; font-weight: 600; color: #2c3e66;">📌 ${content.methodology.title}</div>
          <div style="font-size: 0.85rem; color: #6c7a89; margin: 12px 0;">${content.methodology.description}</div>
          <button id="toggleDialogBtn" style="background: transparent; border: 1px solid #4a6fa5; padding: 8px 18px; border-radius: 30px; cursor: pointer; color: #4a6fa5;">مثال →</button>
          <div id="dialogContent" style="display: none; margin-top: 16px; background: #ffffff; padding: 16px; border-radius: 16px; border: 1px solid #e8ecef;">
            ${content.methodology.dialog.map(line => `<div style="margin-bottom: 12px;"><span style="font-weight: 700; color: #4a6fa5;">${line.speaker}:</span> ${line.text}</div>`).join('')}
          </div>
        </div>
      `;
    }
  }
  
  if (content.footerMessage) {
    html += `<div style="text-align: center; padding: 20px; margin-top: 20px; border-top: 1px solid #e0e4e8;"><div style="font-size: 0.9rem; color: #5a6874; background: #ffffff; display: inline-block; padding: 10px 25px; border-radius: 40px; border: 1px solid #e0e4e8;">${content.footerMessage}</div></div>`;
  }
  
  html += `</div>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.toggle-suggestions-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const groupId = btn.getAttribute('data-group');
      const contentDiv = document.querySelector(`.suggestions-content[data-group="${groupId}"]`);
      if (contentDiv) {
        const isOpen = contentDiv.style.display === 'block';
        contentDiv.style.display = isOpen ? 'none' : 'block';
        btn.textContent = isOpen ? 'أمثلة →' : 'إخفاء ←';
      }
    });
  });
  
  const dialogBtn = document.getElementById('toggleDialogBtn');
  if (dialogBtn) {
    dialogBtn.addEventListener('click', () => {
      const dialogDiv = document.getElementById('dialogContent');
      if (dialogDiv) {
        const isOpen = dialogDiv.style.display === 'block';
        dialogDiv.style.display = isOpen ? 'none' : 'block';
        dialogBtn.textContent = isOpen ? 'مثال →' : 'إخفاء ←';
      }
    });
  }
}

function renderTipsExam(examData) {
  const container = document.getElementById("tips");
  if (!container) return;
  container.innerHTML = "";
  
  const content = examData.content || "";
  const paragraphs = content.split('\n\n');
  
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (p.trim() === "") continue;
    
    const card = document.createElement("div");
    card.style.cssText = `
      background: #f8f9fa;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 20px;
      border-right: 4px solid #28a745;
      border-left: 1px solid #e0e0e0;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      font-size: 16px;
      line-height: 1.7;
      color: #333;
      white-space: pre-wrap;
    `;
    
    let formattedText = p;
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/^(.*?):/gm, '<strong>$1:</strong>');
    
    card.innerHTML = formattedText;
    container.appendChild(card);
  }
}

function renderMündlichExam(examData) {
  const container = document.getElementById("mündlich");
  if (!container) return;
  container.innerHTML = "";
  
  const parts = examData.parts || {};
  
  const allgemeinCard = createMündlichCard("📖 الفكرة العامة (Allgemeine Idee)", parts.allgemein || "لا يوجد نص");
  container.appendChild(allgemeinCard);
  
  const meinungCard = createMündlichCard("💭 الرأي (Meinung)", parts.meinung || "لا يوجد نص");
  container.appendChild(meinungCard);
  
  const erfahrungCard = createMündlichCard("✨ التجربة (Erfahrung)", parts.erfahrung || "لا يوجد نص");
  container.appendChild(erfahrungCard);
}

function createMündlichCard(title, text) {
  const card = document.createElement("div");
  card.style.cssText = `
    background: #f8f9fa;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  `;
  
  const titleDiv = document.createElement("div");
  titleDiv.style.cssText = `
    font-size: 18px;
    font-weight: bold;
    color: #2c3e66;
    border-right: 4px solid #007bff;
    padding-right: 12px;
    margin-bottom: 15px;
  `;
  titleDiv.innerHTML = title;
  card.appendChild(titleDiv);
  
  const textDiv = document.createElement("div");
  textDiv.style.cssText = `
    font-size: 15px;
    line-height: 1.6;
    color: #333;
    white-space: pre-wrap;
  `;
  textDiv.innerHTML = text;
  card.appendChild(textDiv);
  
  return card;
}
function updateExamNavButtons() {
    const prevBtn = document.getElementById("prevExamBtn");
    const nextBtn = document.getElementById("nextExamBtn");
    const memoryBtn = document.getElementById("memoryTrainerBtn");
    
    if (!prevBtn || !nextBtn) return;
    
    const currentIndex = currentExamsList.findIndex(e => e.id === currentExamId);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < currentExamsList.length - 1;
    
    if (hasPrev) {
        prevBtn.style.display = "inline-block";
        prevBtn.onclick = () => {
            const prevExam = currentExamsList[currentIndex - 1];
            openExam(prevExam.id, prevExam.title, prevExam.skillPath || currentSkill);
        };
    } else {
        prevBtn.style.display = "none";
    }
    
    if (hasNext) {
        nextBtn.style.display = "inline-block";
        nextBtn.onclick = () => {
            const nextExam = currentExamsList[currentIndex + 1];
            openExam(nextExam.id, nextExam.title, nextExam.skillPath || currentSkill);
        };
    } else {
        nextBtn.style.display = "none";
    }
    
// ============================================
// ✅ إظهار زر Memory Trainer داخل الامتحان
// ============================================
if (memoryBtn) {
    // ✅ دعم جميع المهارات التي لها إعدادات مراحل
    if (currentSkill && SKILL_CONFIG[currentSkill]) {
        memoryBtn.style.display = 'inline-flex';
        memoryBtn.onclick = function() {
            // ✅ استدعاء دالة الامتحان الفردي (وليس القائمة) مع تمرير المهارة الحالية
            if (window.startMemoryTrainerForExam) {
                window.startMemoryTrainerForExam(currentSkill);
            } else {
                alert('⚠️ ميزة تدريب الذاكرة غير متوفرة حالياً.');
            }
        };
    } else {
        memoryBtn.style.display = 'none';
    }
}
    
    setupLockedNextButton();
}

function showTeil(teilNumber) {
  teile.forEach((teil, idx) => {
    const container = document.getElementById(teil.container);
    if (container) container.style.display = (idx + 1 === teilNumber) ? "block" : "none";
  });
}

function goHome() {
  document.getElementById("home").classList.add("active");
  document.getElementById("list").classList.remove("active");
  document.getElementById("exam").classList.remove("active");
}

function goList() {
  document.getElementById("home").classList.remove("active");
  document.getElementById("list").classList.add("active");
  document.getElementById("exam").classList.remove("active");
  
  renderTeileList();
  
  setTimeout(() => {
    const examsContainer = document.getElementById("examsList");
    if (examsContainer) {
      const hoeren1Teil = teile.find(t => t.skill === "hoeren1");
      if (hoeren1Teil) {
        renderExamListForSkill(hoeren1Teil.skill, hoeren1Teil.name);
      } else {
        examsContainer.innerHTML = '<div class="welcome-message">👈 اختر القسم (Teil) من الأعلى لعرض الامتحانات</div>';
      }
    }
  }, 50);
}

// ============================================
// ✅ دالة buildTeil1 المُعدّلة - تعتمد على ID ثابت
// ============================================
function buildTeil1(questions) {
  const container = document.getElementById("teil1");
  if (!container) {
    console.warn('⚠️ buildTeil1: الحاوية teil1 غير موجودة');
    return;
  }
  
  // ✅ التحقق من وجود الأسئلة
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.warn('⚠️ buildTeil1: لا توجد أسئلة لعرضها');
    container.innerHTML = '<div style="text-align:center; padding:20px; color:#999;">⚠️ لا توجد أسئلة في هذا الامتحان</div>';
    return;
  }
  
  container.innerHTML = "";
  
  let userAnswers = {};
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    // ✅ استخدام ID ثابت من البيانات
    const questionId = q.id !== undefined ? q.id : i;
    
    const card = document.createElement("div");
    card.className = "question-card";
    card.dataset.questionId = questionId;
    card.id = `q_${questionId}`;
    
    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.innerHTML = `<strong>${i + 1}. ${q.text}</strong>`;
    card.appendChild(questionText);
    
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options-container";
    for (let j = 0; j < q.options.length; j++) {
      const label = document.createElement("label");
      label.className = "option-label";
      const radioId = `q_${questionId}_${j}`;
      label.innerHTML = `<input type="radio" name="q_${questionId}" value="${j}" class="option-input" id="${radioId}"> <span>${q.options[j]}</span>`;
      label.onclick = (function(qId, ansIdx) {
        return function() {
          userAnswers[qId] = ansIdx;
        };
      })(questionId, j);
      optionsDiv.appendChild(label);
    }
    card.appendChild(optionsDiv);
    container.appendChild(card);
  }
  
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✅ تصحيح";
  checkBtn.className = "check-btn";
  checkBtn.onclick = function() {
    checkTeil1(questions, userAnswers);
  };
  container.appendChild(checkBtn);
  
  const resultDiv = document.createElement("div");
  resultDiv.id = "teil1Result";
  resultDiv.className = "result-box";
  resultDiv.style.display = "none";
  container.appendChild(resultDiv);
}
// ============================================
// ✅ دالة checkTeil1 المُعدّلة - تعتمد على ID ثابت
// ============================================
function checkTeil1(questions, answers) {
  let score = 0;
  const total = questions.length;
  const pointsPerQuestion = 25 / total;
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const questionId = q.id !== undefined ? q.id : i;
    const card = document.getElementById(`q_${questionId}`);
    const userAnswer = answers[questionId];
    const isCorrect = (userAnswer === q.correct);
    
    if (isCorrect) {
      score++;
      if (card) {
        card.classList.add("correct-answer-card");
        card.classList.remove("wrong-answer-card");
        const oldMsg = card.querySelector(".correct-message");
        if (oldMsg) oldMsg.remove();
      }
    } else {
      if (card) {
        card.classList.add("wrong-answer-card");
        card.classList.remove("correct-answer-card");
        
        let correctMsg = card.querySelector(".correct-message");
        if (!correctMsg) {
          correctMsg = document.createElement("div");
          correctMsg.className = "correct-message";
          card.appendChild(correctMsg);
        }
        correctMsg.innerHTML = "✅ الإجابة الصحيحة: " + q.options[q.correct];
      }
    }
  }
  
  const finalScore = (score * pointsPerQuestion).toFixed(2);
  const resultDiv = document.getElementById("teil1Result");
  if (resultDiv) {
    resultDiv.innerHTML = "النتيجة: " + finalScore + " / 25";
    resultDiv.style.display = "block";
  }
  
  saveExamResult(currentSkill, currentExamId, parseFloat(finalScore));
  
  if (document.getElementById("list").classList.contains("active")) {
    renderExamListForSkill(currentSkill, getTeilNameBySkill(currentSkill));
  }
}

window.saveExamResultGlobal = function(skill, examId, score) {
  saveExamResult(skill, examId, score);
  if (document.getElementById("list").classList.contains("active") && currentSkill === skill) {
    renderExamListForSkill(currentSkill, getTeilNameBySkill(currentSkill));
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("startBtn");
  const backHomeBtn = document.getElementById("backHomeBtn");
  const backToListBtn = document.getElementById("backToListBtn");
  const backArrowFromExam = document.getElementById("backArrowFromExam");
  
  if (startBtn) startBtn.onclick = function() { 
    goList();
  };
  
  if (backHomeBtn) backHomeBtn.onclick = function() { goHome(); };
  if (backToListBtn) backToListBtn.onclick = function() { goList(); };
  
  if (backArrowFromExam) {
    backArrowFromExam.onclick = function() { 
      goBackToExamsList();
    };
  }
  
  const examsContainer = document.getElementById("examsList");
  if (examsContainer) {
    examsContainer.innerHTML = '<div class="welcome-message">👈 اختر القسم (Teil) من الأعلى لعرض الامتحانات</div>';
  }
});

renderTeileList();



// ============================================
// نظام المراحل المتوازن (لجميع المهارات)
// ============================================

// ✅ إعدادات المراحل حسب الأرقام الحقيقية
const SKILL_CONFIG = {
    hoeren1: { totalExams: 45, examsPerStage: 15, totalSentences: 108 },
    hoeren2: { totalExams: 55, examsPerStage: 15, totalSentences: 273 },
    hoeren3: { totalExams: 48, examsPerStage: 15, totalSentences: 105 },
    lesen1: { totalExams: 55, examsPerStage: 15, totalSentences: 275 }, // ✅ تمت الإضافة
    lesen2: { totalExams: 37, examsPerStage: 15, totalSentences: 185 },
    lesen3: { totalExams: 37, examsPerStage: 15, totalSentences: 120 },
    sprach1: { totalExams: 41, examsPerStage: 15, totalSentences: 205 },
    sprach2: { totalExams: 49, examsPerStage: 15, totalSentences: 245 }
};

// ✅ دوال المراحل العامة (تعمل مع أي مهارة)
function getStageKey(skill) {
    return `${skill}_stage`;
}

function getCurrentStage(skill) {
    const key = getStageKey(skill);
    try {
        const stage = parseInt(localStorage.getItem(key)) || 1;
        const config = SKILL_CONFIG[skill];
        const totalStages = config ? Math.ceil(config.totalExams / config.examsPerStage) : 1;
        return Math.max(1, Math.min(stage, totalStages));
    } catch { return 1; }
}

function setCurrentStage(skill, stage) {
    try {
        localStorage.setItem(getStageKey(skill), String(stage));
    } catch(e) { console.warn('⚠️ لا يمكن حفظ المرحلة:', e); }
}

function getTotalStages(skill) {
    const config = SKILL_CONFIG[skill];
    if (!config) return 1;
    return Math.ceil(config.totalExams / config.examsPerStage);
}

function getExamsForStage(skill, stage) {
    const config = SKILL_CONFIG[skill];
    if (!config) return [];
    const start = (stage - 1) * config.examsPerStage;
    const end = Math.min(start + config.examsPerStage, config.totalExams);
    const exams = [];
    for (let i = start + 1; i <= end; i++) exams.push(i);
    return exams;
}

// ============================================
// نظام المستويات (معرفات ثابتة)
// ============================================

const LEVELS_KEY = 'memory_levels';
const MAX_LEVEL = 5;

function buildSentenceId(skill, examId, questionIndex) {
    return `${skill}_exam${examId}_${questionIndex}`;
}

function getSentenceLevel(skill, examId, questionIndex) {
    const key = buildSentenceId(skill, examId, questionIndex);
    try {
        const data = JSON.parse(localStorage.getItem(LEVELS_KEY) || '{}');
        return data[key] !== undefined ? data[key] : 0;
    } catch { return 0; }
}

function setSentenceLevel(skill, examId, questionIndex, level) {
    const key = buildSentenceId(skill, examId, questionIndex);
    try {
        const data = JSON.parse(localStorage.getItem(LEVELS_KEY) || '{}');
        let newLevel = Math.max(0, Math.min(MAX_LEVEL, level));
        data[key] = newLevel;
        localStorage.setItem(LEVELS_KEY, JSON.stringify(data));
    } catch (e) { console.error('❌ خطأ في حفظ المستوى:', e); }
}

function increaseLevel(skill, examId, questionIndex) {
    const current = getSentenceLevel(skill, examId, questionIndex);
    if (current < MAX_LEVEL) setSentenceLevel(skill, examId, questionIndex, current + 1);
}

function decreaseLevel(skill, examId, questionIndex) {
    const current = getSentenceLevel(skill, examId, questionIndex);
    if (current > 0) setSentenceLevel(skill, examId, questionIndex, current - 1);
}

// ============================================
// دوال حساب النسب (المتوازنة)
// ============================================

// نسبة امتحان واحد (تعتمد على جمل ذلك الامتحان فقط)
function getExamProgress(skill, examId) {
    const prefix = `${skill}_exam${examId}_`;
    try {
        const data = JSON.parse(localStorage.getItem(LEVELS_KEY) || '{}');
        let totalLevels = 0, count = 0;
        for (const key in data) {
            if (key.startsWith(prefix)) { totalLevels += data[key]; count++; }
        }
        if (count === 0) return 0;
        return Math.min(100, Math.round((totalLevels / (count * MAX_LEVEL)) * 100));
    } catch { return 0; }
}

// نسبة المرحلة الحالية (مجموع مستويات جمل المرحلة / عدد جمل المرحلة × 5)
function getStageProgress(skill) {
    const config = SKILL_CONFIG[skill];
    if (!config) return 0;
    const currentStage = getCurrentStage(skill);
    const examIds = getExamsForStage(skill, currentStage);
    if (examIds.length === 0) return 0;

    const data = JSON.parse(localStorage.getItem(LEVELS_KEY) || '{}');
    let totalLevels = 0, count = 0;
    for (const examId of examIds) {
        const prefix = `${skill}_exam${examId}_`;
        for (const key in data) {
            if (key.startsWith(prefix)) { totalLevels += data[key]; count++; }
        }
    }
    if (count === 0) return 0;
    return Math.min(100, Math.round((totalLevels / (count * MAX_LEVEL)) * 100));
}

// النسبة العامة للجزء بالكامل (تعتمد على المراحل، وليس العدد الكلي للجمل)
function getOverallProgress(skill) {
    const totalStages = getTotalStages(skill);
    if (totalStages <= 0) return 0;
    const currentStage = getCurrentStage(skill);
    const stageProgress = getStageProgress(skill);
    
    // معادلة متوازنة: (المرحلة الحالية - 1 + نسبة المرحلة) / إجمالي المراحل × 100
    const overall = ((currentStage - 1) + (stageProgress / 100)) / totalStages * 100;
    return Math.min(100, Math.round(overall));
}

// ============================================
// تحميل بيانات المرحلة الحالية (لأي مهارة)
// ============================================

window.loadStageExams = async function(skill) {
    const config = SKILL_CONFIG[skill];
    if (!config) {
        console.warn(`⚠️ لا توجد إعدادات للمهارة: ${skill}`);
        return;
    }

    const exams = examsDatabase[skill] || [];
    const totalExams = config.totalExams;
    const currentStage = getCurrentStage(skill);
    const examIds = getExamsForStage(skill, currentStage);
    
    console.log(`📚 تحميل المرحلة ${currentStage} من ${getTotalStages(skill)} لـ ${skill}`);
    console.log(`📋 الامتحانات: ${examIds.join(', ')}`);

    const allCorrect = [], allWrong = [], allQuestions = [];
for (const examId of examIds) {
    const exam = exams.find(e => e.id === examId);
    if (!exam || !exam.hasFile) continue;
    const fileName = getActualFileName(exam.id);
    try {
        const response = await fetch(`data/${skill}/${fileName}`);
        if (response.ok) {
            const data = await response.json();
            let questions = [];
            if (skill === 'lesen3') {
                questions = data.items || [];
            } else if (skill === 'sprach1' || skill === 'sprach2') {
                // ✅ لـ sprach1 و sprach2: نأخذ من options أو questions
                if (data.options && Array.isArray(data.options)) {
                    questions = data.options;
                } else if (data.questions && Array.isArray(data.questions)) {
                    questions = data.questions;
                } else {
                    questions = [];
                }
                // نأخذ فقط الأسئلة التي تحتوي على memoryHighlight
                questions = questions.filter(q => q.memoryHighlight);
            } else {
                questions = data.questions || [];
            }

            questions.forEach((q, idx) => {
                let entry;
                if (skill === 'sprach1' || skill === 'sprach2') {
                    // ✅ بناء entry خاص لـ sprach1 و sprach2 باستخدام memoryHighlight
                    const highlight = q.memoryHighlight || {};
                    entry = {
                        text: q.text || '',
                        correct: q.correct,
                        options: q.options || [],
                        examId: examId,
                        questionIndex: idx,
                        originalQuestion: q,
                        memoryHighlight: highlight,
                        id: q.id,
                        before: highlight.before || '',
                        connector: highlight.connector || '',
                        after: highlight.after || '',
                        color: 0  // ✅ لا نستخدم اللون لـ sprach1 و sprach2
                    };
                } else {
                    entry = {
                        text: q.text,
                        correct: q.correct,
                        options: q.options || [],
                        examId: examId,
                        questionIndex: idx,
                        originalQuestion: q
                    };
                }
                allQuestions.push(entry);

                // ✅ إذا كانت المهارة sprach1 أو sprach2 أو lesen1/2/3، كل الأسئلة صالحة للتدريب
                if (skill === 'lesen1' || skill === 'lesen2' || skill === 'lesen3' || skill === 'sprach1' || skill === 'sprach2') {
                    allCorrect.push(entry);
                } else {
                    if (q.correct === true) allCorrect.push(entry);
                    else allWrong.push(entry);
                }
            });
            console.log(`✅ تم تحميل ${skill} exam${examId}`);
        }
    } catch (e) {
        console.warn(`⚠️ لا يمكن تحميل ${skill} exam${examId}`);
    }
}
// ✅ إضافة sharedOptions (لـ Lesen 1 و Lesen 3)
let sharedOptions = [];
if ((skill === 'lesen1' || skill === 'lesen3') && examIds.length > 0) {
    const firstExamId = examIds[0];
    const firstExam = exams.find(e => e.id === firstExamId);
    if (firstExam && firstExam.hasFile) {
        try {
            const fileName = getActualFileName(firstExamId);
            const response = await fetch(`data/${skill}/${fileName}`);
            if (response.ok) {
                const data = await response.json();
                // لـ Lesen 1: نأخذ sharedOptions
                if (skill === 'lesen1' && data.sharedOptions) {
                    sharedOptions = data.sharedOptions;
                    console.log(`✅ تم استخراج sharedOptions لـ ${skill} (${sharedOptions.length} عنوان)`);
                }
                // لـ Lesen 3: نأخذ situations كـ sharedOptions
                else if (skill === 'lesen3' && data.situations) {
                    sharedOptions = data.situations;
                    console.log(`✅ تم استخراج situations لـ ${skill} كـ sharedOptions (${sharedOptions.length} حالة)`);
                }
            }
        } catch (e) {
            console.warn(`⚠️ لا يمكن تحميل sharedOptions لـ ${skill}`);
        }
    }
}

    // تخزين البيانات المدمجة تحت مفتاح المهارة
    window[`_${skill}_combinedData`] = {
        questions: allCorrect,
        wrongQuestions: allWrong,
        allQuestions: allQuestions,
        sharedOptions: sharedOptions,
        totalExams: examIds.length,
        totalCorrect: allCorrect.length,
        totalWrong: allWrong.length,
        totalQuestions: allCorrect.length + allWrong.length,
        currentStage: currentStage,
        totalStages: getTotalStages(skill),
        examIds: examIds,
        isLastStage: currentStage >= getTotalStages(skill)
    };

    console.log(`✅ تم تحميل ${examIds.length} امتحان، ${allCorrect.length} جملة صحيحة، ${allWrong.length} جملة خاطئة`);
};

// ============================================
// الانتقال إلى المرحلة التالية (لأي مهارة)
// ============================================

window.goToNextStage = function(skill) {
    const totalStages = getTotalStages(skill);
    let currentStage = getCurrentStage(skill);
    if (currentStage < totalStages) {
        currentStage++;
        setCurrentStage(skill, currentStage);
        console.log(`➡️ الانتقال إلى المرحلة ${currentStage} لـ ${skill}`);
        window.loadStageExams(skill).then(() => {
            if (window.memoryTrainer && window.memoryTrainer.currentSkill === skill) {
                window.memoryTrainer.start('list');
            }
        });
        return true;
    } else {
        console.log(`🏆 تم إكمال جميع مراحل ${skill}!`);
        return false;
    }
};

window.resetStages = function(skill) {
    setCurrentStage(skill, 1);
    console.log(`🔄 إعادة تعيين مراحل ${skill} إلى 1`);
    window.loadStageExams(skill);
};

// ============================================
// عرض شريط التقدم في القائمة
// ============================================

function renderMemoryProgressBar(skill, container) {
    const percent = getOverallProgress(skill);
    const currentStage = getCurrentStage(skill);
    const totalStages = getTotalStages(skill);
    
    const bar = document.createElement('div');
    bar.className = 'memory-progress-bar-container';
    bar.innerHTML = `
        <span class="memory-progress-label">🧠 الذاكرة</span>
        <div style="display:flex; align-items:center; gap:8px; flex:1;">
            <div class="memory-progress-track" style="flex:1;">
                <div class="memory-progress-fill" style="width: ${percent}%;"></div>
            </div>
            <span class="memory-progress-percent">${percent}%</span>
        </div>
        <span style="font-size:11px; color:#64748B; min-width:60px; text-align:left;">
            المرحلة ${currentStage}/${totalStages}
        </span>
        <button class="memory-progress-btn" title="متابعة التدريب" onclick="window.startMemoryTrainerFromList('${skill}')">
            ▶
        </button>
        <button class="memory-progress-btn reset" title="إعادة تعيين التقدم" onclick="window.resetAllLevels();">
            ↺
        </button>
    `;
    container.insertBefore(bar, container.firstChild);
}

// ============================================
// إعادة تعيين جميع المستويات (للمهارات كافة)
// ============================================

function resetAllLevels() {
    if (confirm('⚠️ هل أنت متأكد من إعادة تعيين جميع مستويات الذاكرة؟')) {
        localStorage.removeItem(LEVELS_KEY);
        location.reload();
    }
}

// ============================================
// تشغيل Memory Trainer من القائمة (يدعم جميع المهارات)
// ============================================

window.startMemoryTrainerFromList = function(skill = 'hoeren1') {
    // التأكد من تحميل بيانات المهارة
    const combinedKey = `_${skill}_combinedData`;
    if (!window[combinedKey]) {
        // إذا لم تكن محملة، نحملها ثم نبدأ
        window.loadStageExams(skill).then(() => {
            if (window.memoryTrainer) {
                window.memoryTrainer.currentSkill = skill;
                window.memoryTrainer.start('list');
            }
        });
        return;
    }
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill;
        window.memoryTrainer.start('list');
    } else {
        alert('⚠️ ميزة تدريب الذاكرة غير متوفرة حالياً.');
    }
};

// ============================================
// دالة تشغيل Memory Trainer لامتحان فردي (تُستدعى من زر 🧠 داخل الامتحان)
// ============================================

window.startMemoryTrainerForExam = function(skill) {
    if (window.memoryTrainer) {
        window.memoryTrainer.currentSkill = skill || window.currentSkill || 'hoeren1';
        window.memoryTrainer.currentExamId = window.currentExamId || 1;
        window.memoryTrainer.start('single');
    } else {
        alert('⚠️ ميزة تدريب الذاكرة غير متوفرة حالياً.');
    }
};

// ============================================
// تحميل جميع المهارات المدعومة عند بدء التشغيل
// ============================================

setTimeout(() => {
    for (const skill in SKILL_CONFIG) {
        window.loadStageExams(skill);
    }
}, 500);

// ============================================
// تصدير الدوال للاستخدام العالمي
// ============================================

window.buildSentenceId = buildSentenceId;
window.getSentenceLevel = getSentenceLevel;
window.setSentenceLevel = setSentenceLevel;
window.increaseLevel = increaseLevel;
window.decreaseLevel = decreaseLevel;
window.getExamProgress = getExamProgress;
window.getStageProgress = getStageProgress;
window.getOverallProgress = getOverallProgress;
window.getCurrentStage = getCurrentStage;
window.setCurrentStage = setCurrentStage;
window.getTotalStages = getTotalStages;
window.getExamsForStage = getExamsForStage;
window.SKILL_CONFIG = SKILL_CONFIG;
window.resetAllLevels = resetAllLevels;
window.loadStageExams = loadStageExams;
window.goToNextStage = goToNextStage;
window.resetStages = resetStages;
window.startMemoryTrainerFromList = startMemoryTrainerFromList;
window.startMemoryTrainerForExam = startMemoryTrainerForExam;

console.log('🧠 نظام التقدم المتوازن (المراحل لكل مهارة) تم تحميله بنجاح');
console.log('📊 عدد المراحل:', Object.keys(SKILL_CONFIG).map(s => `${s}: ${getTotalStages(s)}`).join(', '));

// ============================================
// أزرار تبديل الأيقونة (زرين جنب بعض)
// ============================================

// ===== الزر الأول: leaderboard ↔ 123 =====
const VIEW_ICONS_1 = ['leaderboard', '123'];
const VIEW_MODE_KEY_1 = 'viewModeIconIndex1';

// تخزين الترتيب الأصلي كأرقام امتحانات (وليس عناصر DOM)
let originalOrderNumbers = [];

// حفظ الترتيب الأصلي عند تحميل القائمة
function saveOriginalOrder() {
    const list = document.getElementById("examsList");
    if (!list) return;
    
    const exams = [...list.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );
    
    // حفظ أرقام الامتحانات بالترتيب الأصلي
    originalOrderNumbers = exams.map(el => {
        const title = el.querySelector(".exam-title");
        if (!title) return null;
        const text = title.textContent || '';
        const match = text.match(/^(\d+):/);
        return match ? parseInt(match[1], 10) : null;
    }).filter(num => num !== null);
    
    console.log("📋 تم حفظ الترتيب الأصلي:", originalOrderNumbers);
}

// استعادة الترتيب الأصلي حسب أرقام الامتحانات
function restoreOriginalOrder() {
    const list = document.getElementById("examsList");
    if (!list || originalOrderNumbers.length === 0) return;
    
    // الحصول على جميع عناصر الامتحانات الحالية
    const exams = [...list.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );
    
    if (!exams.length) return;
    
    // إنشاء خريطة للعناصر حسب رقم الامتحان
    const examMap = {};
    exams.forEach(el => {
        const title = el.querySelector(".exam-title");
        if (!title) return;
        const text = title.textContent || '';
        const match = text.match(/^(\d+):/);
        if (match) {
            const num = parseInt(match[1], 10);
            examMap[num] = el;
        }
    });
    
    // إعادة ترتيب العناصر حسب الأرقام المحفوظة
    const fragment = document.createDocumentFragment();
    originalOrderNumbers.forEach(num => {
        if (examMap[num]) {
            fragment.appendChild(examMap[num]);
            delete examMap[num];
        }
    });
    
    // إضافة أي عناصر متبقية (جديدة) في نهاية القائمة
    Object.keys(examMap).map(Number).sort((a, b) => a - b).forEach(num => {
        fragment.appendChild(examMap[num]);
    });
    
    list.appendChild(fragment);
    console.log("📋 تم استعادة الترتيب الأصلي حسب الأرقام");
}

// ✅ تطبيق ترتيب leaderboard - يعمل مع List و Grid معاً
function applyLeaderboardOrder() {
    const list = document.getElementById("examsList");
    if (!list) return console.log("❌ examsList غير موجود");

    // التحقق من وجود Grid Container
    const gridContainer = document.getElementById("examGridContainer");
    const targetContainer = gridContainer || list;

    // جميع الامتحانات فقط - نأخذها من الـ container المناسب
    const exams = [...targetContainer.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );

    if (!exams.length) return console.log("❌ لا توجد امتحانات");

    // استخراج النقطة
    const data = exams.map((el, index) => {
        const badge = el.querySelector(".exam-result-badge");

        let score = Infinity;

        if (badge) {
            const txt = badge.textContent.trim();
            const m = txt.match(/^(\d+)\s*\/\s*\d+/);

            if (m) score = parseInt(m[1], 10);
        }

        return {
            el,
            score,
            originalIndex: index
        };
    });

    // ترتيب Stable
    data.sort((a, b) => {
        if (a.score === b.score)
            return a.originalIndex - b.originalIndex;

        return a.score - b.score;
    });

    // إعادة ترتيب داخل نفس الـ container
    data.forEach(item => targetContainer.appendChild(item.el));

    console.log("✅ تم ترتيب الامتحانات من الأضعف إلى الأقوى");
}

function getViewModeIndex1() {
    try {
        const saved = localStorage.getItem(VIEW_MODE_KEY_1);
        if (saved !== null) return parseInt(saved);
    } catch {}
    return 0;
}

function setViewModeIndex1(index) {
    try {
        localStorage.setItem(VIEW_MODE_KEY_1, String(index));
    } catch {}
}

// ===== الزر الثاني: view_day ↔ grid_view =====
const VIEW_ICONS_2 = ['view_day', 'grid_view'];
const VIEW_MODE_KEY_2 = 'viewModeIconIndex2';

function getViewModeIndex2() {
    try {
        const saved = localStorage.getItem(VIEW_MODE_KEY_2);
        if (saved !== null) return parseInt(saved);
    } catch {}
    return 0;
}

function setViewModeIndex2(index) {
    try {
        localStorage.setItem(VIEW_MODE_KEY_2, String(index));
    } catch {}
}

// ============================================
// Exam List View Mode - نظام تبديل شكل القائمة
// ============================================

const EXAM_LIST_MODE_KEY = "examListViewMode";

// الوضع الحالي
function getExamListMode() {
    return localStorage.getItem(EXAM_LIST_MODE_KEY) || "list";
}

function setExamListMode(mode) {
    localStorage.setItem(EXAM_LIST_MODE_KEY, mode);
}

// تطبيق الشكل
function applyExamListView(mode) {
    const list = document.getElementById("examsList");
    if (!list) return;

    // إزالة أي Grid قديم
    const oldGrid = document.getElementById("examGridContainer");
    if (oldGrid) {
        while (oldGrid.firstChild) {
            list.appendChild(oldGrid.firstChild);
        }
        oldGrid.remove();
    }

    // إعادة جميع التنسيقات إلى الوضع الطبيعي
    [...list.querySelectorAll(".item")].forEach(el => {
        el.style.cssText = "";
    });

    // الوضع العادي (List)
    if (mode === "list") {
        console.log("📄 List View");
        return;
    }

    // ===== Grid View =====
    const exams = [...list.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );

    if (!exams.length) return;

    const grid = document.createElement("div");
    grid.id = "examGridContainer";

    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 6px;
        margin-top: 8px;
    `;

    const firstExam = exams[0];
    list.insertBefore(grid, firstExam);

    exams.forEach(item => {
        grid.appendChild(item);

        item.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 42px;
            padding: 8px 4px;
            background: #fafbfc;
            border: 1px solid #e8ecef;
            border-radius: 6px;
            margin: 0;
            box-shadow: none;
            text-align: center;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.25s ease;
        `;

        // تأثير Hover
        item.addEventListener('mouseenter', function() {
            const isPremium = this.querySelector('.premium-badge') !== null;
            if (isPremium) {
                this.style.backgroundColor = "rgba(255,255,255,0.95)";
                this.style.transform = "translateY(-3px)";
                this.style.borderColor = "#60a5fa";
                this.style.boxShadow = "0 4px 12px rgba(47, 128, 237, 0.15)";
            } else {
                this.style.backgroundColor = "#f1f5f9";
                this.style.transform = "translateY(-3px)";
                this.style.borderColor = "#2F80ED";
                this.style.boxShadow = "0 4px 12px rgba(47, 128, 237, 0.15)";
            }
            const title = this.querySelector('.exam-title');
            if (title) {
                const isPremium = this.querySelector('.premium-badge') !== null;
                title.style.color = isPremium ? "#4b5563" : "#1e293b";
            }
            const premiumSpan = this.querySelector('.premium-badge');
            if (premiumSpan) premiumSpan.style.transform = "scale(1.02)";
        });

        item.addEventListener('mouseleave', function() {
            const isPremium = this.querySelector('.premium-badge') !== null;
            if (isPremium) {
                this.style.backgroundColor = "rgba(255,255,255,0.75)";
                this.style.transform = "translateY(0)";
                this.style.borderColor = "#e2e8f0";
                this.style.boxShadow = "none";
            } else {
                this.style.backgroundColor = "#fafbfc";
                this.style.transform = "translateY(0)";
                this.style.borderColor = "#e8ecef";
                this.style.boxShadow = "none";
            }
            const title = this.querySelector('.exam-title');
            if (title) {
                const isPremium = this.querySelector('.premium-badge') !== null;
                title.style.color = isPremium ? "#6b7280" : "#1a202c";
            }
            const premiumSpan = this.querySelector('.premium-badge');
            if (premiumSpan) premiumSpan.style.transform = "scale(1)";
        });

        // تأثير Active
        item.addEventListener('mousedown', function() {
            this.style.transform = "scale(0.98)";
            this.style.backgroundColor = "#e2e8f0";
            this.style.transition = "all 0.05s ease";
        });

        item.addEventListener('mouseup', function() {
            const isPremium = this.querySelector('.premium-badge') !== null;
            this.style.transform = "scale(1)";
            this.style.backgroundColor = isPremium ? "rgba(255,255,255,0.95)" : "#f1f5f9";
            this.style.transition = "all 0.25s ease";
        });

        const title = item.querySelector(".exam-title");
        if (title) {
            title.style.fontSize = "11px";
            title.style.transition = "color 0.25s ease";
        }

        const badge = item.querySelector(".exam-result-badge");
        if (badge) badge.style.fontSize = "8px";
    });

    console.log("🟦 Grid View");
}

// ============================================
// إنشاء الأزرار
// ============================================

function createViewModeToggles() {
    const header = document.querySelector('.teil-header');
    if (!header) {
        setTimeout(createViewModeToggles, 500);
        return;
    }

    if (header.style.position !== 'relative') {
        header.style.position = 'relative';
    }

    // إزالة الأزرار القديمة
    const oldBtn1 = document.getElementById('viewModeToggleBtn1');
    if (oldBtn1) oldBtn1.remove();
    const oldBtn2 = document.getElementById('viewModeToggleBtn2');
    if (oldBtn2) oldBtn2.remove();

    // ===== الزر الأول (leaderboard ↔ 123) =====
    const btn1 = document.createElement('button');
    btn1.id = 'viewModeToggleBtn1';
    btn1.className = 'view-mode-toggle-btn-1';
    btn1.title = 'تبديل ترتيب القائمة';

    // ✅ الأيقونة الظاهرة = المعاكسة للوضع الحالي
    let currentIndex1 = getViewModeIndex1();
    // إذا كان الوضع الحالي 0 (leaderboard) → نعرض 123
    // إذا كان الوضع الحالي 1 (123) → نعرض leaderboard
    const displayIndex1 = currentIndex1 === 0 ? 1 : 0;
    const iconName1 = VIEW_ICONS_1[displayIndex1];
    btn1.innerHTML = `<span class="material-symbols-outlined">${iconName1}</span>`;
    
    btn1.onclick = function(e) {
        e.stopPropagation();
        
        // التبديل إلى الأيقونة التالية (0→1→0→1...)
        currentIndex1 = (currentIndex1 + 1) % VIEW_ICONS_1.length;
        setViewModeIndex1(currentIndex1);
        
        // تحديث الأيقونة إلى المعاكس للوضع الجديد
        const newDisplayIndex = currentIndex1 === 0 ? 1 : 0;
        const span = this.querySelector('.material-symbols-outlined');
        if (span) {
            span.textContent = VIEW_ICONS_1[newDisplayIndex];
        }
        
        // تنفيذ الإجراء المناسب
        if (currentIndex1 === 0) {
            // الوضع أصبح leaderboard → نطبق الترتيب
            applyLeaderboardOrder();
        } else {
            // الوضع أصبح 123 → نستعيد الترتيب الأصلي
            restoreOriginalOrder();
        }
        
        console.log(`🔄 الزر1 تم التبديل إلى الوضع: ${VIEW_ICONS_1[currentIndex1]}`);
    };

    header.appendChild(btn1);

    // ===== الزر الثاني (view_day ↔ grid_view) =====
    const btn2 = document.createElement('button');
    btn2.id = 'viewModeToggleBtn2';
    btn2.className = 'view-mode-toggle-btn-2';
    btn2.title = 'تبديل شكل العرض';

    // ✅ الأيقونة الظاهرة = المعاكسة للوضع الحالي
    let currentIndex2 = getViewModeIndex2();
    // إذا كان الوضع الحالي 0 (view_day/List) → نعرض grid_view
    // إذا كان الوضع الحالي 1 (grid_view/Grid) → نعرض view_day
    const displayIndex2 = currentIndex2 === 0 ? 1 : 0;
    const iconName2 = VIEW_ICONS_2[displayIndex2];
    btn2.innerHTML = `<span class="material-symbols-outlined">${iconName2}</span>`;

    btn2.onclick = function(e) {
        e.stopPropagation();
        
        // التبديل إلى الوضع التالي
        currentIndex2 = (currentIndex2 + 1) % VIEW_ICONS_2.length;
        setViewModeIndex2(currentIndex2);
        
        // تحديث الأيقونة إلى المعاكس للوضع الجديد
        const newDisplayIndex = currentIndex2 === 0 ? 1 : 0;
        const span = this.querySelector('.material-symbols-outlined');
        if (span) {
            span.textContent = VIEW_ICONS_2[newDisplayIndex];
        }
        
        // تطبيق الشكل المناسب
        if (currentIndex2 === 1) {
            setExamListMode("grid");
            applyExamListView("grid");
        } else {
            setExamListMode("list");
            applyExamListView("list");
        }
        
        console.log(`🔄 الزر2 تم التبديل إلى: ${VIEW_ICONS_2[currentIndex2]}`);
    };

    header.appendChild(btn2);

    setTimeout(saveOriginalOrder, 200);
    applyExamListView(getExamListMode());

    console.log('✅ زرين للتبديل تم إضافتهما في أقصى يمين .teil-header');
}

// ============================================
// تشغيل الأزرار عند تحميل الصفحة وعند تغيير الأقسام
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createViewModeToggles();
    }, 300);
});

// عند تغيير القسم (Teil)
const originalRenderExamList = window.renderExamListForSkill;
if (originalRenderExamList) {
    window.renderExamListForSkill = function(skill, teilName) {
        originalRenderExamList(skill, teilName);
        setTimeout(() => {
            createViewModeToggles();
            saveOriginalOrder();
            applyExamListView(getExamListMode());
        }, 200);
    };
}

// تصدير الدوال للاستخدام العام
window.createViewModeToggles = createViewModeToggles;
window.applyExamListView = applyExamListView;
window.getExamListMode = getExamListMode;
window.setExamListMode = setExamListMode;
window.saveOriginalOrder = saveOriginalOrder;
window.restoreOriginalOrder = restoreOriginalOrder;
window.applyLeaderboardOrder = applyLeaderboardOrder;

console.log('🔄 زرين للتبديل (leaderboard↔123) و (view_day↔grid_view) مع وظائف الترتيب تم تحميلهما');


// ============================================
// تصدير openExam للاستخدام العالمي
// ============================================
window.openExam = openExam;

// ============================================
// دالة عرض نافذة التعديلات
// ============================================

function showVersionsPopup(versions, mainTitle) {
    // إزالة أي نافذة قديمة
    const oldPopup = document.getElementById('versionsPopup');
    if (oldPopup) oldPopup.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'versionsPopup';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3); backdrop-filter: blur(3px);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999; animation: fadeIn 0.2s ease;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #1a1f2e; border-radius: 20px; padding: 28px 24px;
        max-width: 340px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        border: 1px solid #2a3042; animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        color: #e2e8f0; text-align: center;
    `;
    
    modal.innerHTML = `
        <h4 style="margin:0 0 16px 0; font-size:16px; font-weight:600; color:#a8b5d9;">هذا الامتحان له ${versions.length} تعديلات</h4>
        <div style="border-top:1px solid #2a3042; margin-bottom:14px;"></div>
        ${versions.map((v, i) => `
            <div style="background:#0f1421; border-radius:10px; padding:10px 14px; margin-bottom:6px; display:flex; align-items:center; gap:10px; border-left:3px solid #4a6fa5; cursor:pointer; transition:0.2s;"
                 onclick="window.openExam(${v.id}, '${v.title}', 'lesen1')"
                 onmouseenter="this.style.background='#1a2340'"
                 onmouseleave="this.style.background='#0f1421'">
                <span style="display:inline-flex; align-items:center; justify-content:center; background:#2a3042; color:#a8b5d9; border-radius:999px; width:24px; height:24px; font-size:12px; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.2);">${i+1}</span>
                <span style="font-size:13px; font-weight:500; text-align:left;">${v.title}</span>
            </div>
        `).join('')}
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // دوال الإغلاق
    const close = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => overlay.remove(), 200);
    };
    
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
    
    // إضافة أنيميشن
    if (!document.getElementById('modal-style')) {
        const style = document.createElement('style');
        style.id = 'modal-style';
        style.textContent = `
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes scaleIn { from { transform:scale(0.9); opacity:0; } to { transform:scale(1); opacity:1; } }
        `;
        document.head.appendChild(style);
    }
}
// ============================================
// نظام Badge التعديلات التلقائي - يعمل في جميع الأقسام
// ============================================

// تعريف الامتحانات التي لها تعديلات
const EXAM_VERSIONS = {
    'hoeren1_2': { versions: ['الإصدار الأساسي', 'التعديل الأول', 'التعديل الثاني'] },
    'hoeren1_5': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
    'lesen1_2': { versions: ['الإصدار الأساسي', 'التعديل الأول', 'التعديل الثاني'] },
    'lesen1_5': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
    'hoeren2_3': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
    'lesen2_1': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
};

// دالة إضافة Badge
function addVersionBadges() {
    const container = document.getElementById('examsList');
    if (!container) {
        console.log('⚠️ examsList غير موجود');
        return;
    }
    
    const items = container.querySelectorAll('.item:not(.teil-header):not(.memory-progress-bar-container)');
    if (!items.length) {
        console.log('⚠️ لا توجد امتحانات');
        return;
    }
    
    const skill = window.currentSkill || 'lesen1';
    console.log(`🔍 إضافة Badge لـ ${skill}، عدد الامتحانات: ${items.length}`);
    let addedCount = 0;
    
    items.forEach(el => {
        const title = el.querySelector('.exam-title');
        if (!title) return;
        
        const match = title.textContent.match(/^(\d+):/);
        if (!match) return;
        const examId = parseInt(match[1]);
        
        const key = `${skill}_${examId}`;
        const versionData = EXAM_VERSIONS[key];
        if (!versionData) return;
        
        // إزالة Badge قديم
        const oldBadge = el.querySelector('.version-badge-auto');
        if (oldBadge) oldBadge.remove();
        
        // إنشاء Badge
        const badge = document.createElement('span');
        badge.className = 'version-badge-auto';
        badge.textContent = versionData.versions.length;
        badge.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #334155, #1e293b);
            color: #f1f5f9;
            border-radius: 999px;
            padding: 0 8px;
            height: 20px;
            font-size: 9px;
            font-weight: 600;
            margin-left: 6px;
            cursor: pointer;
            flex-shrink: 0;
            border: 1px solid #475569;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        badge.title = `${versionData.versions.length} تعديلات`;
        
        badge.onmouseenter = () => {
            badge.style.transform = 'scale(1.08)';
            badge.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        };
        badge.onmouseleave = () => {
            badge.style.transform = 'scale(1)';
            badge.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        };
        
        badge.onclick = (e) => {
            e.stopPropagation();
            showVersionsPopupAuto(versionData.versions, title.textContent);
        };
        
        title.appendChild(badge);
        addedCount++;
    });
    
    console.log(`✅ تم إضافة ${addedCount} Badge`);
}

// دالة عرض النافذة
function showVersionsPopupAuto(versions, mainTitle) {
    const oldPopup = document.getElementById('versionsPopupAuto');
    if (oldPopup) oldPopup.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'versionsPopupAuto';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        animation: fadeIn 0.2s ease;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #1a1f2e;
        border-radius: 20px;
        padding: 28px 24px;
        max-width: 340px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        border: 1px solid #2a3042;
        animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        color: #e2e8f0;
        text-align: center;
    `;
    
    modal.innerHTML = `
        <h4 style="margin:0 0 16px 0; font-size:16px; font-weight:600; color:#a8b5d9;">هذا الامتحان له ${versions.length} تعديلات</h4>
        <div style="border-top:1px solid #2a3042; margin-bottom:14px;"></div>
        ${versions.map((v, i) => `
            <div style="background:#0f1421; border-radius:10px; padding:10px 14px; margin-bottom:6px; display:flex; align-items:center; gap:10px; border-left:3px solid #4a6fa5; cursor:pointer; transition:0.2s;">
                <span style="display:inline-flex; align-items:center; justify-content:center; background:#2a3042; color:#a8b5d9; border-radius:999px; width:24px; height:24px; font-size:12px; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.2);">${i+1}</span>
                <span style="font-size:13px; font-weight:500; text-align:left;">${v}</span>
            </div>
        `).join('')}
        <button style="margin-top:16px; width:100%; padding:10px; background:#334155; border:1px solid #475569; border-radius:40px; color:#e2e8f0; font-weight:600; cursor:pointer; transition:0.2s;" onclick="this.closest('#versionsPopupAuto').remove()">إغلاق</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => overlay.remove(), 200);
        }
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const popup = document.getElementById('versionsPopupAuto');
            if (popup) popup.remove();
        }
    }, { once: true });
    
    if (!document.getElementById('modal-style-auto')) {
        const style = document.createElement('style');
        style.id = 'modal-style-auto';
        style.textContent = `
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes scaleIn { from { transform:scale(0.9); opacity:0; } to { transform:scale(1); opacity:1; } }
        `;
        document.head.appendChild(style);
    }
}

// ✅ استدعاء عند تغيير القسم
const originalRenderExamListForBadge = window.renderExamListForSkill;
if (originalRenderExamListForBadge) {
    window.renderExamListForSkill = function(skill, teilName) {
        originalRenderExamListForBadge(skill, teilName);
        setTimeout(addVersionBadges, 300);
    };
}

// ✅ استدعاء فوراً عند تحميل الصفحة
setTimeout(addVersionBadges, 800);

// ✅ استدعاء عند تغيير القائمة
const observerBadge = new MutationObserver(() => {
    if (document.getElementById('list')?.classList.contains('active')) {
        setTimeout(addVersionBadges, 400);
    }
});
observerBadge.observe(document.body, { attributes: true, attributeFilter: ['class'] });

console.log('✅ نظام Badge التعديلات التلقائي تم تحميله');
// ============================================
// ✅ حل مشكلة اختفاء Badge التعديلات بعد أي تغيير في القائمة
// ============================================

// تعريف الامتحانات التي لها تعديلات (يمكنك توسيعها لاحقاً)
const EXAM_VERSIONS_FIX = {
    'hoeren1_2': { versions: ['الإصدار الأساسي', 'التعديل الأول', 'التعديل الثاني'] },
    'hoeren1_5': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
    'lesen1_2': { versions: ['الإصدار الأساسي', 'التعديل الأول', 'التعديل الثاني'] },
    'lesen1_5': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
    'hoeren2_3': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
    'lesen2_1': { versions: ['الإصدار الأساسي', 'التعديل الأول'] },
};

// الدالة الرئيسية لإضافة البادج
function addVersionBadgesFixed() {
    const container = document.getElementById('examsList');
    if (!container) return;
    
    const items = container.querySelectorAll('.item:not(.teil-header):not(.memory-progress-bar-container)');
    if (!items.length) return;
    
    const skill = window.currentSkill || 'lesen1';
    let addedCount = 0;
    
    items.forEach(el => {
        const title = el.querySelector('.exam-title');
        if (!title) return;
        
        const match = title.textContent.match(/^(\d+):/);
        if (!match) return;
        const examId = parseInt(match[1]);
        
        const key = `${skill}_${examId}`;
        const versionData = EXAM_VERSIONS_FIX[key];
        if (!versionData) return;
        
        // إزالة أي بادج قديم
        const oldBadge = el.querySelector('.version-badge-auto');
        if (oldBadge) oldBadge.remove();
        
        // إنشاء البادج الجديد
        const badge = document.createElement('span');
        badge.className = 'version-badge-auto';
        badge.textContent = versionData.versions.length;
        badge.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #334155, #1e293b);
            color: #f1f5f9;
            border-radius: 999px;
            padding: 0 8px;
            height: 20px;
            font-size: 9px;
            font-weight: 600;
            margin-left: 6px;
            cursor: pointer;
            flex-shrink: 0;
            border: 1px solid #475569;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        badge.title = `${versionData.versions.length} تعديلات`;
        
        badge.onmouseenter = () => {
            badge.style.transform = 'scale(1.08)';
            badge.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        };
        badge.onmouseleave = () => {
            badge.style.transform = 'scale(1)';
            badge.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        };
        
        badge.onclick = (e) => {
            e.stopPropagation();
            showVersionsPopupAuto(versionData.versions, title.textContent);
        };
        
        title.appendChild(badge);
        addedCount++;
    });
    
    if (addedCount > 0) console.log(`✅ تم إضافة ${addedCount} Badge (تلقائي)`);
}

// دالة عرض النافذة (نفسها ولكن نضعها هنا لتكون مستقلة)
function showVersionsPopupAuto(versions, mainTitle) {
    const oldPopup = document.getElementById('versionsPopupAuto');
    if (oldPopup) oldPopup.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'versionsPopupAuto';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        animation: fadeIn 0.2s ease;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #1a1f2e;
        border-radius: 20px;
        padding: 28px 24px;
        max-width: 340px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        border: 1px solid #2a3042;
        animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        color: #e2e8f0;
        text-align: center;
    `;
    
    modal.innerHTML = `
        <h4 style="margin:0 0 16px 0; font-size:16px; font-weight:600; color:#a8b5d9;">📋 هذا الامتحان له ${versions.length} تعديلات</h4>
        <div style="border-top:1px solid #2a3042; margin-bottom:14px;"></div>
        ${versions.map((v, i) => `
            <div style="background:#0f1421; border-radius:10px; padding:10px 14px; margin-bottom:6px; display:flex; align-items:center; gap:10px; border-left:3px solid #4a6fa5; cursor:pointer; transition:0.2s;">
                <span style="display:inline-flex; align-items:center; justify-content:center; background:#2a3042; color:#a8b5d9; border-radius:999px; width:24px; height:24px; font-size:12px; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.2);">${i+1}</span>
                <span style="font-size:13px; font-weight:500; text-align:left;">${v}</span>
            </div>
        `).join('')}
        <button style="margin-top:16px; width:100%; padding:10px; background:#334155; border:1px solid #475569; border-radius:40px; color:#e2e8f0; font-weight:600; cursor:pointer; transition:0.2s;" onclick="this.closest('#versionsPopupAuto').remove()">إغلاق</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => overlay.remove(), 200);
        }
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const popup = document.getElementById('versionsPopupAuto');
            if (popup) popup.remove();
        }
    }, { once: true });
    
    if (!document.getElementById('modal-style-auto')) {
        const style = document.createElement('style');
        style.id = 'modal-style-auto';
        style.textContent = `
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes scaleIn { from { transform:scale(0.9); opacity:0; } to { transform:scale(1); opacity:1; } }
        `;
        document.head.appendChild(style);
    }
}

// ✅ ربط الدالة مع كل تغيير في القائمة (باستخدام MutationObserver)
let badgeObserver = null;

function setupBadgeObserver() {
    // إزالة المراقب القديم إن وجد
    if (badgeObserver) {
        badgeObserver.disconnect();
    }
    
    // مراقبة التغييرات في #examsList
    const list = document.getElementById('examsList');
    if (!list) return;
    
    badgeObserver = new MutationObserver(function(mutations) {
        // ننتظر قليلاً حتى تستقر التغييرات
        clearTimeout(window._badgeTimeout);
        window._badgeTimeout = setTimeout(() => {
            addVersionBadgesFixed();
        }, 150);
    });
    
    // مراقبة إضافة/إزالة العناصر وتغيير النص
    badgeObserver.observe(list, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// ✅ استدعاء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addVersionBadgesFixed();
        setupBadgeObserver();
    }, 500);
});

// ✅ ربط مع دالة renderExamListForSkill الأصلية
const originalRenderExamListForBadge = window.renderExamListForSkill;
if (originalRenderExamListForBadge) {
    window.renderExamListForSkill = function(skill, teilName) {
        // استدعاء الدالة الأصلية
        originalRenderExamListForBadge(skill, teilName);
        // بعد اكتمالها، نضيف البادج
        setTimeout(addVersionBadgesFixed, 200);
    };
}

// ✅ ربط مع أزرار leaderboard و 123 و grid_view و view_day
// نضيف مستمعات للأزرار المعروفة
document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    // أزرار الترتيب والعرض
    const isRelevant = target.id === 'viewModeToggleBtn1' ||
                       target.id === 'viewModeToggleBtn2' ||
                       target.closest('#viewModeToggleBtn1') ||
                       target.closest('#viewModeToggleBtn2') ||
                       target.textContent.includes('leaderboard') ||
                       target.textContent.includes('123') ||
                       target.textContent.includes('grid_view') ||
                       target.textContent.includes('view_day');
    
    if (isRelevant) {
        // ننتظر حتى يتم التطبيق
        setTimeout(addVersionBadgesFixed, 400);
    }
});

// ✅ تصدير الدوال للاستخدام العام
window.addVersionBadgesFixed = addVersionBadgesFixed;
window.showVersionsPopupAuto = showVersionsPopupAuto;

console.log('✅ نظام Badge التعديلات (النسخة النهائية) تم تحميله - لن يختفي بعد الآن!');
