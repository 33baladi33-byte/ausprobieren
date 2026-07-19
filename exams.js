// ============================================
// exams.js - نظام الامتحانات المتكامل مع نظام القفل وحفظ النتائج
// تم تعديل التوزيع المجاني وفقًا للخطة الجديدة
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
// متغير لمنع تكرار عرض القائمة الأولية
let _initialListRendered = false;

// دالة عرض القائمة الأولية (محاكاة الضغط على Hören 1) مع إعادة المحاولة
window.renderInitialExamList = function() {
    if (_initialListRendered) return;
    
    // نتحقق من وجود دالة حالة المستخدم
    if (typeof window.getUserStatusGlobal !== 'function') {
        // إذا لم تكن متوفرة، نعرض مباشرة (حالة طوارئ)
        _initialListRendered = true;
        const hoeren1Teil = teile.find(t => t.skill === "hoeren1");
        if (hoeren1Teil) {
            renderExamListForSkill(hoeren1Teil.skill, hoeren1Teil.name);
        }
        return;
    }

    let attempts = 0;
    const maxAttempts = 10;  // 10 محاولات كل 200 مللي = 2 ثانية كحد أقصى
    const delay = 200;

    const tryRender = () => {
        attempts++;
        const status = window.getUserStatusGlobal();

        // إذا كان المستخدم مسجلاً (auth.currentUser موجود) وما زالت الحالة 'free'، نعيد المحاولة
        if (window.auth && window.auth.currentUser && status === 'free' && attempts < maxAttempts) {
            setTimeout(tryRender, delay);
            return;
        }

        // إذا وصلنا هنا، إما أن المستخدم غير مسجل، أو الحالة أصبحت صحيحة، أو انتهت المحاولات
        _initialListRendered = true;
        const hoeren1Teil = teile.find(t => t.skill === "hoeren1");
        if (hoeren1Teil) {
            console.log('[EXAMS] renderInitialExamList: عرض القائمة (محاولة ' + attempts + ')');
            renderExamListForSkill(hoeren1Teil.skill, hoeren1Teil.name);
        }
    };

    // نبدأ المحاولة بعد تأخير 100 مللي (لإعطاء فرصة لـ auth.js)
    setTimeout(tryRender, 100);
};
// ============================================
// ✅ قواعد الامتحانات المجانية الجديدة (بعد التعديل)
// ============================================

function isExamFree(skill, examNumber) {
  // 🟢 Mündlich - معالجة خاصة
  if (skill === "mündlich1" || skill === "mündlich3") {
    // 🔒 جميع امتحانات Teil 1 و Teil 3 مدفوعة بالكامل
    return false;
  }
  if (skill === "mündlich2" || skill === "mündlich") {
    // Teil 2: أول 2 امتحانات مجانية
    return examNumber <= 2;
  }

  // 🟢 Schreiben: أول 2 مجانية
  if (skill === "schreiben") {
    return examNumber <= 2;
  }

  // 🟢 بقية المهارات حسب التوزيع
  switch (skill) {
    case "hoeren1":
      return examNumber <= 4;
    case "hoeren2":
      return false; // القسم كامل مدفوع
    case "hoeren3":
      return examNumber <= 3;
    case "lesen1":
      return false; // القسم كامل مدفوع
    case "lesen2":
      return examNumber <= 3;
    case "lesen3":
      return examNumber <= 2;
    case "sprach1":
      return examNumber <= 4;
    case "sprach2":
      return examNumber <= 3;
    default:
      return false;
  }
}

// ========== دالة حفظ آخر نتيجة ==========
function saveExamResult(skill, examId, score) {
  try {
    const key = `exam_result_${skill}_${examId}`;
    localStorage.setItem(key, score.toString());
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

// ========== دالة عرض النتيجة بجانب عنوان الامتحان ==========
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
// ========== دوال عداد إعادة الامتحان ==========
function saveRetryCount(skill, examId, count) {
    try {
        const key = `exam_retry_${skill}_${examId}`;
        localStorage.setItem(key, count.toString());
    } catch(e) {
        console.error("❌ خطأ في حفظ عدد الإعادات:", e);
    }
}

function getRetryCount(skill, examId) {
    try {
        const key = `exam_retry_${skill}_${examId}`;
        const value = localStorage.getItem(key);
        return value ? parseInt(value, 10) : 0;
    } catch(e) {
        console.error("❌ خطأ في استرجاع عدد الإعادات:", e);
        return 0;
    }
}

function incrementRetryCount(skill, examId) {
    const current = getRetryCount(skill, examId);
    const newCount = current + 1;
    saveRetryCount(skill, examId, newCount);
    return newCount;
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

// ========== دوال التحقق من حالة المستخدم ==========
async function getUserStatusForExam() {
    try {
        if (typeof window.getUserStatusGlobal === 'function') {
            const status = await window.getUserStatusGlobal();
            return status;
        }
    } catch (error) {
        console.warn('⚠️ فشل جلب حالة المستخدم:', error);
    }
    return 'free';
}

// ========== قائمة Tips ==========
const tipsExams = [
  { id: 1, title: "كيفاش تنجح بدكاء", enabled: true, hasFile: true }
];

// ============================================================
// ✅ قوائم الامتحانات (نفسها دون تغيير)
// ============================================================

// ---------- Lesen 1 ----------
const lesenExams = [
  {
    id: 1,
    title: "kellner (Jugend Forscher)",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 1, file: "exam1.json", title: "kellner (Jugend Forscher)" },
      { id: 101, file: "exam1b.json", title: "kellner (Jugend Forscher) (التعديل 1)" }
    ]
  },
  {
    id: 2,
    title: "sport ist gesund",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 2, file: "exam2.json", title: "sport ist gesund" },
      { id: 3, file: "exam3.json", title: "sport ist gesund (التعديل 1)" },
      { id: 103, file: "exam3b.json", title: "sport ist gesund (التعديل 2)" }
    ]
  },
  {
    id: 4,
    title: "Tanzkurs",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 4, file: "exam4.json", title: "Tanzkurs" },
      { id: 5, file: "exam5.json", title: "Tanzkurs (التعديل 1)" },
      { id: 102, file: "exam5b.json", title: "Tanzkurs (التعديل 2)" },
      { id: 106, file: "exam5c.json", title: "Tanzkurs (التعديل 3)" }
    ]
  },
  { id: 6, title: "Impfung", enabled: true, hasFile: true, versions: [{ id: 6, file: "exam6.json", title: "Impfung" }] },
  { id: 7, title: "Insel", enabled: true, hasFile: true, versions: [{ id: 7, file: "exam7.json", title: "Insel" }] },
  {
    id: 8,
    title: "Bilder",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 8, file: "exam8.json", title: "Bilder" },
      { id: 104, file: "exam8b.json", title: "Bilder (التعديل 1)" }
    ]
  },
  {
    id: 9,
    title: "Grundschule",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 9, file: "exam9.json", title: "Grundschule" },
      { id: 105, file: "exam9b.json", title: "Grundschule (التعديل 1)" }
    ]
  },
  {
    id: 10,
    title: "Österreich - Naschmarkt",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 10, file: "exam10.json", title: "Österreich - Naschmarkt" },
      { id: 107, file: "exam10b.json", title: "Österreich - Naschmarkt (التعديل 1)" }
    ]
  },
  {
    id: 11,
    title: "Insekten",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 11, file: "exam11.json", title: "Insekten" },
      { id: 12, file: "exam12.json", title: "Insekten (التعديل 1)" }
    ]
  },
  { id: 13, title: "das Benzin", enabled: true, hasFile: true, versions: [{ id: 13, file: "exam13.json", title: "das Benzin" }] },
  { id: 14, title: "Kaffee", enabled: true, hasFile: true, versions: [{ id: 14, file: "exam14.json", title: "Kaffee" }] },
  {
    id: 15,
    title: "Programmierer",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 15, file: "exam15.json", title: "Programmierer" },
      { id: 16, file: "exam16.json", title: "Programmierer (التعديل 1)" },
      { id: 17, file: "exam17.json", title: "Programmierer (التعديل 2)" }
    ]
  },
  { id: 18, title: "Trampolin", enabled: true, hasFile: true, versions: [{ id: 18, file: "exam18.json", title: "Trampolin" }] },
  { id: 19, title: "Bonbons", enabled: true, hasFile: true, versions: [{ id: 19, file: "exam19.json", title: "Bonbons" }] },
  { id: 20, title: "Umwelt", enabled: true, hasFile: true, versions: [{ id: 20, file: "exam20.json", title: "Umwelt" }] },
  {
    id: 21,
    title: "Licht",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 21, file: "exam21.json", title: "Licht" },
      { id: 22, file: "exam22.json", title: "Licht (التعديل 1)" }
    ]
  },
  {
    id: 23,
    title: "Kartoffel",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 23, file: "exam23.json", title: "Kartoffel" },
      { id: 24, file: "exam24.json", title: "Kartoffel (التعديل 1)" }
    ]
  },
  { id: 25, title: "Bienen", enabled: true, hasFile: true, versions: [{ id: 25, file: "exam25.json", title: "Bienen" }] },
  { id: 26, title: "Spiele", enabled: true, hasFile: true, versions: [{ id: 26, file: "exam26.json", title: "Spiele" }] },
  { id: 27, title: "Geld", enabled: true, hasFile: true, versions: [{ id: 27, file: "exam27.json", title: "Geld" }] },
  { id: 28, title: "Kinder und Schulen", enabled: true, hasFile: true, versions: [{ id: 28, file: "exam28.json", title: "Kinder und Schulen" }] },
  { id: 29, title: "Kindertelefon", enabled: true, hasFile: true, versions: [{ id: 29, file: "exam29.json", title: "Kindertelefon" }] },
  {
    id: 30,
    title: "Alpen",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 30, file: "exam30.json", title: "Alpen" },
      { id: 31, file: "exam31.json", title: "Alpen (التعديل 1)" },
      { id: 32, file: "exam32.json", title: "Alpen (التعديل 2)" }
    ]
  },
  { id: 33, title: "Suchtmittel - Nase", enabled: true, hasFile: true, versions: [{ id: 33, file: "exam33.json", title: "Suchtmittel - Nase" }] },
  { id: 34, title: "الانتخابات والمرأة الروسية", enabled: true, hasFile: true, versions: [{ id: 34, file: "exam34.json", title: "الانتخابات والمرأة الروسية" }] },
  {
    id: 35,
    title: "kein Zeit",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 35, file: "exam35.json", title: "kein Zeit" },
      { id: 36, file: "exam36.json", title: "kein Zeit (التعديل 1)" }
    ]
  },
  {
    id: 37,
    title: "Limonade",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 37, file: "exam37.json", title: "Limonade" },
      { id: 38, file: "exam38.json", title: "Limonade (التعديل 1)" },
      { id: 39, file: "exam39.json", title: "Limonade (التعديل 2)" }
    ]
  },
  { id: 40, title: "Auf dem Weg", enabled: true, hasFile: true, versions: [{ id: 40, file: "exam40.json", title: "Auf dem Weg" }] },
  {
    id: 41,
    title: "Schlafzug",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 41, file: "exam41.json", title: "Schlafzug" },
      { id: 42, file: "exam42.json", title: "Schlafzug (التعديل 1)" }
    ]
  },
  { id: 43, title: "Löwen", enabled: true, hasFile: true, versions: [{ id: 43, file: "exam43.json", title: "Löwen" }] },
  { id: 44, title: "Fisch", enabled: true, hasFile: true, versions: [{ id: 44, file: "exam44.json", title: "Fisch" }] },
  { id: 45, title: "Frauen im Arbeitsmarkt", enabled: true, hasFile: true, versions: [{ id: 45, file: "exam45.json", title: "Frauen im Arbeitsmarkt" }] },
  { id: 46, title: "Baby TV", enabled: true, hasFile: true, versions: [{ id: 46, file: "exam46.json", title: "Baby TV" }] },
  { id: 47, title: "Bäder", enabled: true, hasFile: true, versions: [{ id: 47, file: "exam47.json", title: "Bäder" }] },
  { id: 48, title: "Farben", enabled: true, hasFile: true, versions: [{ id: 48, file: "exam48.json", title: "Farben" }] },
  { id: 49, title: "Wetter", enabled: true, hasFile: true, versions: [{ id: 49, file: "exam49.json", title: "Wetter" }] },
  { id: 50, title: "Computer", enabled: true, hasFile: true, versions: [{ id: 50, file: "exam50.json", title: "Computer" }] },
  { id: 51, title: "Nordsee", enabled: true, hasFile: true, versions: [{ id: 51, file: "exam51.json", title: "Nordsee" }] },
  { id: 52, title: "Autos", enabled: true, hasFile: true, versions: [{ id: 52, file: "exam52.json", title: "Autos" }] },
  { id: 53, title: "Evolution", enabled: true, hasFile: true, versions: [{ id: 53, file: "exam53.json", title: "Evolution" }] },
  { id: 54, title: "Gedächtnis", enabled: true, hasFile: true, versions: [{ id: 54, file: "exam54.json", title: "Gedächtnis" }] },
  { id: 55, title: "Wohnen", enabled: true, hasFile: true, versions: [{ id: 55, file: "exam55.json", title: "Wohnen" }] },
  { id: 56, title: " Lebensmodelle", enabled: true, hasFile: true, versions: [{ id: 56, file: "exam56.json", title: " Lebensmodelle" }] }
];

// ---------- Lesen 2 ----------
const lesen2Exams = [
  {
    id: 1,
    title: "Krista",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 1, file: "exam1.json", title: "Krista" },
      { id: 2, file: "exam2.json", title: "Krista (معدل)" }
    ]
  },
  {
    id: 3,
    title: "Der Ein-Personen-Karneval",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 3, file: "exam3.json", title: "Der Ein-Personen-Karneval" },
      { id: 4, file: "exam4.json", title: "Der Ein-Personen-Karneval (معدل)" }
    ]
  },
  {
    id: 5,
    title: "ein leben für den Kaffee",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 5, file: "exam5.json", title: "ein leben für den Kaffee" },
      { id: 6, file: "exam6.json", title: "ein leben für den Kaffee (معدل 1)" },
      { id: 7, file: "exam7.json", title: "ein leben für den Kaffee (معدل 2)" }
    ]
  },
  { id: 8, title: "Kreditkarte", enabled: true, hasFile: true, versions: [{ id: 8, file: "exam8.json", title: "Kreditkarte" }] },
  {
    id: 9,
    title: "Gedächtnis",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 9, file: "exam9.json", title: "Gedächtnis" },
      { id: 10, file: "exam10.json", title: "Gedächtnis (معدل)" }
    ]
  },
  { id: 11, title: "Kaufentscheidungen", enabled: true, hasFile: true, versions: [{ id: 11, file: "exam11.json", title: "Kaufentscheidungen" }] },
  { id: 12, title: "Kellnern - Nebenjob", enabled: true, hasFile: true, versions: [{ id: 12, file: "exam12.json", title: "Kellnern - Nebenjob" }] },
  { id: 13, title: "die Ernährung", enabled: true, hasFile: true, versions: [{ id: 13, file: "exam13.json", title: "die Ernährung" }] },
  { id: 14, title: "Geschichte des Hauspersonals", enabled: true, hasFile: true, versions: [{ id: 14, file: "exam14.json", title: "Geschichte des Hauspersonals" }] },
  { id: 15, title: "Österreich, das Land der Poolbesitzer", enabled: true, hasFile: true, versions: [{ id: 15, file: "exam15.json", title: "Österreich, das Land der Poolbesitzer" }] },
  {
    id: 16,
    title: "Großraumbüros",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 16, file: "exam16.json", title: "Großraumbüros" },
      { id: 108, file: "exam16b.json", title: "Großraumbüros (معدل)" }
    ]
  },
  { id: 17, title: "Korbjagd zu Pferde", enabled: true, hasFile: true, versions: [{ id: 17, file: "exam17.json", title: "Korbjagd zu Pferde" }] },
  {
    id: 18,
    title: "Mehrsprachige Erziehung",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 18, file: "exam18.json", title: "Mehrsprachige Erziehung" },
      { id: 19, file: "exam19.json", title: "Mehrsprachige Erziehung (معدل)" }
    ]
  },
  { id: 20, title: "Verpackungen im Supermarkt", enabled: true, hasFile: true, versions: [{ id: 20, file: "exam20.json", title: "Verpackungen im Supermarkt" }] },
  {
    id: 21,
    title: "Der Puppenmacher",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 21, file: "exam21.json", title: "Der Puppenmacher" },
      { id: 22, file: "exam22.json", title: "Der Puppenmacher (معدل)" }
    ]
  },
  { id: 23, title: "Lehrkräftepreis", enabled: true, hasFile: true, versions: [{ id: 23, file: "exam23.json", title: "Lehrkräftepreis" }] },
  {
    id: 24,
    title: "Wer parkt, muss zahlen",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 24, file: "exam24.json", title: "Wer parkt, muss zahlen" },
      { id: 25, file: "exam25.json", title: "Wer parkt, muss zahlen (معدل)" }
    ]
  },
  { id: 26, title: "Familienglück oder Generationskonflikte", enabled: true, hasFile: true, versions: [{ id: 26, file: "exam26.json", title: "Familienglück oder Generationskonflikte" }] },
  {
    id: 27,
    title: "Traumfrau und Traummann gesucht",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 27, file: "exam27.json", title: "Traumfrau und Traummann gesucht" },
      { id: 28, file: "exam28.json", title: "Traumfrau und Traummann gesucht (معدل)" }
    ]
  },
  { id: 29, title: "Wie Babys lernen", enabled: true, hasFile: true, versions: [{ id: 29, file: "exam29.json", title: "Wie Babys lernen" }] },
  {
    id: 30,
    title: "Volkskrankheit Rückenschmerz",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 30, file: "exam30.json", title: "Volkskrankheit Rückenschmerz" },
      { id: 31, file: "exam31.json", title: "Volkskrankheit Rückenschmerz (معدل)" }
    ]
  },
  { id: 32, title: "Die ganze Welt auf dem eigenen PC", enabled: true, hasFile: true, versions: [{ id: 32, file: "exam32.json", title: "Die ganze Welt auf dem eigenen PC" }] },
  { id: 33, title: "Die deutschen und ihre Ernährung", enabled: true, hasFile: true, versions: [{ id: 33, file: "exam33.json", title: "Die deutschen und ihre Ernährung" }] },
  { id: 34, title: "Weniger Euro-Blüten in Deutschland", enabled: true, hasFile: true, versions: [{ id: 34, file: "exam34.json", title: "Weniger Euro-Blüten in Deutschland" }] },
  {
    id: 35,
    title: "Nachtzug",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 35, file: "exam35.json", title: "Nachtzug" },
      { id: 36, file: "exam36.json", title: "Nachtzug (معدل)" }
    ]
  },
  { id: 37, title: "Wie zwei US-Teenager Millionäre wurden", enabled: true, hasFile: true, versions: [{ id: 37, file: "exam37.json", title: "Wie zwei US-Teenager Millionäre wurden" }] }
];

// ---------- Lesen 3 ----------
const lesen3Exams = [
  {
    id: 1,
    title: "Filme - Fernsehprogramme",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 1, file: "exam1.json", title: "Filme - Fernsehprogramme" },
      { id: 2, file: "exam2.json", title: "Filme - Fernsehprogramme (معدل)" }
    ]
  },
  {
    id: 3,
    title: "Im Katalog eines Buchversands",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 3, file: "exam3.json", title: "Im Katalog eines Buchversands" },
      { id: 109, file: "exam3b.json", title: "Im Katalog eines Buchversands (معدل)" }
    ]
  },
  {
    id: 4,
    title: "kein Zeit",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 4, file: "exam4.json", title: "kein Zeit" },
      { id: 5, file: "exam5.json", title: "kein Zeit (معدل)" }
    ]
  },
  {
    id: 6,
    title: "Musik - spielt Gitarre",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 6, file: "exam6.json", title: "Musik - spielt Gitarre" },
      { id: 110, file: "exam6b.json", title: "Musik - spielt Gitarre (معدل)" }
    ]
  },
  {
    id: 7,
    title: "Die schwangere Frau",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 7, file: "exam7.json", title: "Die schwangere Frau" },
      { id: 8, file: "exam8.json", title: "Die schwangere Frau (معدل)" }
    ]
  },
  { id: 9, title: "Unterstützung in Mathematik", enabled: true, hasFile: true, versions: [{ id: 9, file: "exam9.json", title: "Unterstützung in Mathematik" }] },
  {
    id: 10,
    title: "Ganztagesausflug",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 10, file: "exam10.json", title: "Ganztagesausflug" },
      { id: 111, file: "exam10b.json", title: "Ganztagesausflug (معدل)" }
    ]
  },
  { id: 11, title: "Ihren Eltern zur Silberhochzeit", enabled: true, hasFile: true, versions: [{ id: 11, file: "exam11.json", title: "Ihren Eltern zur Silberhochzeit" }] },
  {
    id: 12,
    title: "Rechtsanwalt",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 12, file: "exam12.json", title: "Rechtsanwalt" },
      { id: 13, file: "exam13.json", title: "Rechtsanwalt (معدل)" }
    ]
  },
  { id: 14, title: "Au-pair Mädchen", enabled: true, hasFile: true, versions: [{ id: 14, file: "exam14.json", title: "Au-pair Mädchen" }] },
  { id: 15, title: "Hautprobleme", enabled: true, hasFile: true, versions: [{ id: 15, file: "exam15.json", title: "Hautprobleme" }] },
  { id: 16, title: "Eine Bekannte ist schwanger", enabled: true, hasFile: true, versions: [{ id: 16, file: "exam16.json", title: "Eine Bekannte ist schwanger" }] },
  { id: 17, title: "Die Tochter einer Bekannten wird vier Jahre alt", enabled: true, hasFile: true, versions: [{ id: 17, file: "exam17.json", title: "Die Tochter einer Bekannten wird vier Jahre alt" }] },
  { id: 18, title: "Tierdokumentationen", enabled: true, hasFile: true, versions: [{ id: 18, file: "exam18.json", title: "Tierdokumentationen" }] },
  { id: 19, title: "Aufräumen", enabled: true, hasFile: true, versions: [{ id: 19, file: "exam19.json", title: "Aufräumen" }] },
  { id: 20, title: "Erholung und Reisen", enabled: true, hasFile: true, versions: [{ id: 20, file: "exam20.json", title: "Erholung und Reisen" }] },
  {
    id: 21,
    title: "Sport",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 21, file: "exam21.json", title: "Sport" },
      { id: 22, file: "exam22.json", title: "Sport (معدل)" }
    ]
  },
  { id: 23, title: "Wein und Insekten", enabled: true, hasFile: true, versions: [{ id: 23, file: "exam23.json", title: "Wein und Insekten" }] },
  {
    id: 24,
    title: "Reiseführer",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 24, file: "exam24.json", title: "Reiseführer" },
      { id: 112, file: "exam24b.json", title: "Reiseführer (معدل)" }
    ]
  },
  { id: 25, title: "Gartenbau", enabled: true, hasFile: true, versions: [{ id: 25, file: "exam25.json", title: "Gartenbau" }] },
  { id: 26, title: "Haushaltshilfe", enabled: true, hasFile: true, versions: [{ id: 26, file: "exam26.json", title: "Haushaltshilfe" }] },
  { id: 27, title: "Einwanderung", enabled: true, hasFile: true, versions: [{ id: 27, file: "exam27.json", title: "Einwanderung" }] },
  {
    id: 28,
    title: "Musikinstrumente",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 28, file: "exam28.json", title: "Musikinstrumente" },
      { id: 29, file: "exam29.json", title: "Musikinstrumente (معدل)" }
    ]
  },
  { id: 30, title: "Arbeitsorganisation", enabled: true, hasFile: true, versions: [{ id: 30, file: "exam30.json", title: "Arbeitsorganisation" }] },
  { id: 31, title: "Hunde", enabled: true, hasFile: true, versions: [{ id: 31, file: "exam31.json", title: "Hunde" }] },
  { id: 32, title: "schnelle Wasserfahrzeuge", enabled: true, hasFile: true, versions: [{ id: 32, file: "exam32.json", title: "schnelle Wasserfahrzeuge" }] },
  {
    id: 33,
    title: "ein paar Tage in Berlin",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 33, file: "exam33.json", title: "ein paar Tage in Berlin" },
      { id: 34, file: "exam34.json", title: "ein paar Tage in Berlin (معدل)" }
    ]
  },
  { id: 35, title: "Autos", enabled: true, hasFile: true, versions: [{ id: 35, file: "exam35.json", title: "Autos" }] },
  { id: 36, title: "Möbel für die neue Wohnung", enabled: true, hasFile: true, versions: [{ id: 36, file: "exam36.json", title: "Möbel für die neue Wohnung" }] },
  { id: 37, title: "Geschäftsreisen - رحلات العمل", enabled: true, hasFile: true, versions: [{ id: 37, file: "exam37.json", title: "Geschäftsreisen - رحلات العمل" }] }
];

// ---------- Sprach 1 ----------
const sprach1Exams = [
  {
    id: 1,
    title: "Hallo Ferdinand",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 1, file: "exam1.json", title: "Hallo Ferdinand" },
      { id: 2, file: "exam2.json", title: "Hallo Ferdinand (معدل)" }
    ]
  },
  { id: 3, title: "Liebe Vanessa", enabled: true, hasFile: true, versions: [{ id: 3, file: "exam3.json", title: "Liebe Vanessa" }] },
  { id: 4, title: "Hallo Judith / Lina", enabled: true, hasFile: true, versions: [{ id: 4, file: "exam4.json", title: "Hallo Judith / Lina" }] },
  {
    id: 5,
    title: "Liebe Karin",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 5, file: "exam5.json", title: "Liebe Karin" },
      { id: 6, file: "exam6.json", title: "Liebe Karin (معدل)" },
      { id: 113, file: "exam6b.json", title: "Liebe Karin (معدل 2)" }
    ]
  },
  { id: 7, title: "Hallo Leon", enabled: true, hasFile: true, versions: [{ id: 7, file: "exam7.json", title: "Hallo Leon" }] },
  {
    id: 8,
    title: "Sehr geehrter Herr Martini",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 8, file: "exam8.json", title: "Sehr geehrter Herr Martini" },
      { id: 9, file: "exam9.json", title: "Sehr geehrter Herr Martini (معدل)" }
    ]
  },
  { id: 10, title: "Liebe Maria, lieber Timur", enabled: true, hasFile: true, versions: [{ id: 10, file: "exam10.json", title: "Liebe Maria, lieber Timur" }] },
  {
    id: 11,
    title: "Lieber Justus",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 11, file: "exam11.json", title: "Lieber Justus" },
      { id: 12, file: "exam12.json", title: "Lieber Justus (معدل)" }
    ]
  },
  { id: 13, title: "Lieber Thomas", enabled: true, hasFile: true, versions: [{ id: 13, file: "exam13.json", title: "Lieber Thomas" }] },
  { id: 14, title: "Sehr geehrte Frau Goronska", enabled: true, hasFile: true, versions: [{ id: 14, file: "exam14.json", title: "Sehr geehrte Frau Goronska" }] },
  { id: 15, title: "Liebe Agnieszka", enabled: true, hasFile: true, versions: [{ id: 15, file: "exam15.json", title: "Liebe Agnieszka" }] },
  { id: 16, title: "Liebe Anna", enabled: true, hasFile: true, versions: [{ id: 16, file: "exam16.json", title: "Liebe Anna" }] },
  {
    id: 17,
    title: "Sehr geehrter Herr Dr. Moosberger (معدل)",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 17, file: "exam17.json", title: "Sehr geehrter Herr Dr. Moosberger (معدل)" },
      { id: 18, file: "exam18.json", title: "Sehr geehrter Herr Dr. Dobromil" }
    ]
  },
  { id: 19, title: "Liebe Lina, lieber Florian", enabled: true, hasFile: true, versions: [{ id: 19, file: "exam19.json", title: "Liebe Lina, lieber Florian" }] },
  {
    id: 20,
    title: "Liebes Julian",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 20, file: "exam20.json", title: "Liebes Julian" },
      { id: 114, file: "exam20b.json", title: "Liebes Julian (معدل)" }
    ]
  },
  { id: 21, title: "Liebe Meike", enabled: true, hasFile: true, versions: [{ id: 21, file: "exam21.json", title: "Liebe Meike" }] },
  {
    id: 22,
    title: "Liebe Corinna (معدل)",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 22, file: "exam22.json", title: "Liebe Corinna (معدل)" },
      { id: 23, file: "exam23.json", title: "Liebe Corinna" }
    ]
  },
  { id: 24, title: "Liebe Ida", enabled: true, hasFile: true, versions: [{ id: 24, file: "exam24.json", title: "Liebe Ida" }] },
  { id: 25, title: "Liebe Paola", enabled: true, hasFile: true, versions: [{ id: 25, file: "exam25.json", title: "Liebe Paola" }] },
  { id: 26, title: "Liebe Jutta", enabled: true, hasFile: true, versions: [{ id: 26, file: "exam26.json", title: "Liebe Jutta" }] },
  { id: 27, title: "Liebe Familie Geissler", enabled: true, hasFile: true, versions: [{ id: 27, file: "exam27.json", title: "Liebe Familie Geissler" }] },
  {
    id: 28,
    title: "Liebe Andrea",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 28, file: "exam28.json", title: "Liebe Andrea" },
      { id: 29, file: "exam29.json", title: "Liebe Andrea (معدل)" },
      { id: 115, file: "exam29b.json", title: "Liebe Andrea (معدل 2)" }
    ]
  },
  { id: 30, title: "Hallo Maria", enabled: true, hasFile: true, versions: [{ id: 30, file: "exam30.json", title: "Hallo Maria" }] },
  {
    id: 31,
    title: "Sehr geehrte Frau Szabo",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 31, file: "exam31.json", title: "Sehr geehrte Frau Szabo" },
      { id: 32, file: "exam32.json", title: "Sehr geehrte Frau Szabo (معدل)" }
    ]
  },
  { id: 33, title: "Lieber Igor", enabled: true, hasFile: true, versions: [{ id: 33, file: "exam33.json", title: "Lieber Igor" }] },
  { id: 34, title: "Liebe Lara", enabled: true, hasFile: true, versions: [{ id: 34, file: "exam34.json", title: "Liebe Lara" }] },
  { id: 35, title: "Lieber David", enabled: true, hasFile: true, versions: [{ id: 35, file: "exam35.json", title: "Lieber David" }] },
  { id: 36, title: "Sehr geehrter Herr Wenzel", enabled: true, hasFile: true, versions: [{ id: 36, file: "exam36.json", title: "Sehr geehrter Herr Wenzel" }] },
  { id: 37, title: "Liebe Autorinnen und Autoren", enabled: true, hasFile: true, versions: [{ id: 37, file: "exam37.json", title: "Liebe Autorinnen und Autoren" }] },
  { id: 38, title: "Liebe Clara", enabled: true, hasFile: true, versions: [{ id: 38, file: "exam38.json", title: "Liebe Clara" }] },
  { id: 39, title: "Sehr geehrte Frau Melchior", enabled: true, hasFile: true, versions: [{ id: 39, file: "exam39.json", title: "Sehr geehrte Frau Melchior" }] },
  {
    id: 40,
    title: "Liebe Sandra",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 40, file: "exam40.json", title: "Liebe Sandra" },
      { id: 116, file: "exam40b.json", title: "Liebe Sandra (معدل)" }
    ]
  },
  { id: 41, title: "Liebe Anna(الجديد)", enabled: true, hasFile: true, versions: [{ id: 41, file: "exam41.json", title: "Liebe Anna(الجديد)" }] },
{ id: 42, title: "Hi Jens", enabled: true, hasFile: true, versions: [{ id: 42, file: "exam42.json", title: "Hi Jens" }] }
];

// ---------- Sprach 2 ----------
const sprach2Exams = [
  {
    id: 1,
    title: "Das Fahrrad",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 1, file: "exam1.json", title: "Das Fahrrad" },
      { id: 2, file: "exam2.json", title: "Das Fahrrad (معدل)" }
    ]
  },
  {
    id: 3,
    title: "Man(n) kocht selbst",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 3, file: "exam3.json", title: "Man(n) kocht selbst" },
      { id: 117, file: "exam3b.json", title: "Man(n) kocht selbst (معدل)" }
    ]
  },
  {
    id: 4,
    title: "Jugend diskutiert - mach mit!",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 4, file: "exam4.json", title: "Jugend diskutiert - mach mit!" },
      { id: 118, file: "exam4b.json", title: "Jugend diskutiert - mach mit! (معدل 1)" },
      { id: 119, file: "exam4c.json", title: "Jugend diskutiert - mach mit! (معدل 2)" }
    ]
  },
  { id: 5, title: "Theater für Kinder und Jugendliche", enabled: true, hasFile: true, versions: [{ id: 5, file: "exam5.json", title: "Theater für Kinder und Jugendliche" }] },
  { id: 6, title: "Umgang mit Haustieren", enabled: true, hasFile: true, versions: [{ id: 6, file: "exam6.json", title: "Umgang mit Haustieren" }] },
  {
    id: 7,
    title: "Liebesgrüße aus der Kühltruhe",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 7, file: "exam7.json", title: "Liebesgrüße aus der Kühltruhe" },
      { id: 8, file: "exam8.json", title: "Liebesgrüße aus der Kühltruhe (معدل)" }
    ]
  },
  { id: 9, title: "Online-Sprachkurse", enabled: true, hasFile: true, versions: [{ id: 9, file: "exam9.json", title: "Online-Sprachkurse" }] },
  {
    id: 10,
    title: "Deutschland – ein Paradies für Kinder?",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 10, file: "exam10.json", title: "Deutschland – ein Paradies für Kinder?" },
      { id: 11, file: "exam11.json", title: "Deutschland – ein Paradies für Kinder? (معدل 1)" },
      { id: 12, file: "exam12.json", title: "Deutschland – ein Paradies für Kinder? (معدل 2)" }
    ]
  },
  {
    id: 13,
    title: "Das Schicksal des Braunbären",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 13, file: "exam13.json", title: "Das Schicksal des Braunbären" },
      { id: 14, file: "exam14.json", title: "Das Schicksal des Braunbären (معدل)" }
    ]
  },
  {
    id: 15,
    title: "Was steckt hinter Bio?",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 15, file: "exam15.json", title: "Was steckt hinter Bio?" },
      { id: 16, file: "exam16.json", title: "Was genau sind eigentlich Bio-Lebensmittel (معدل)" }
    ]
  },
  { id: 17, title: "Sicherer Schulweg", enabled: true, hasFile: true, versions: [{ id: 17, file: "exam17.json", title: "Sicherer Schulweg" }] },
  { id: 18, title: "Der Hund als intelligentes Wesen", enabled: true, hasFile: true, versions: [{ id: 18, file: "exam18.json", title: "Der Hund als intelligentes Wesen" }] },
  { id: 19, title: "Die wichtigsten Regeln auf der Skipiste", enabled: true, hasFile: true, versions: [{ id: 19, file: "exam19.json", title: "Die wichtigsten Regeln auf der Skipiste" }] },
  { id: 20, title: "Kaffee und Kuchen – ein Stück Tradition", enabled: true, hasFile: true, versions: [{ id: 20, file: "exam20.json", title: "Kaffee und Kuchen – ein Stück Tradition" }] },
  { id: 21, title: "Fische sind schlauer, als wir denken", enabled: true, hasFile: true, versions: [{ id: 21, file: "exam21.json", title: "Fische sind schlauer, als wir denken" }] },
  {
    id: 22,
    title: "Schwarzarbeit kann teuer werden",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 22, file: "exam22.json", title: "Schwarzarbeit kann teuer werden" },
      { id: 23, file: "exam23.json", title: "Schwarzarbeit kann teuer werden (معدل 1)" }
    ]
  },
  { id: 24, title: "Schwarzarbeit kann teuer werden (معدل 2)", enabled: true, hasFile: true, versions: [{ id: 24, file: "exam24.json", title: "Schwarzarbeit kann teuer werden (معدل 2)" }] },
  { id: 25, title: "Teamarbeit als Schlüssel zum Erfolg", enabled: true, hasFile: true, versions: [{ id: 25, file: "exam25.json", title: "Teamarbeit als Schlüssel zum Erfolg" }] },
  { id: 26, title: "Teamarbeit als Schlüssel zum Erfolg (معدل)", enabled: true, hasFile: true, versions: [{ id: 26, file: "exam26.json", title: "Teamarbeit als Schlüssel zum Erfolg (معدل)" }] },
  {
    id: 27,
    title: "Wie Handschrift wieder cool wird (معدل)",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 27, file: "exam27.json", title: "Wie Handschrift wieder cool wird (معدل)" },
      { id: 28, file: "exam28.json", title: "Wie Handschrift wieder cool wird" }
    ]
  },
  { id: 29, title: "Ausbildung mit über 30", enabled: true, hasFile: true, versions: [{ id: 29, file: "exam29.json", title: "Ausbildung mit über 30" }] },
  { id: 30, title: "Verlernen die Deutschen die Höflichkeit?", enabled: true, hasFile: true, versions: [{ id: 30, file: "exam30.json", title: "Verlernen die Deutschen die Höflichkeit?" }] },
  { id: 31, title: "Joggen: Mehr als nur Laufen", enabled: true, hasFile: true, versions: [{ id: 31, file: "exam31.json", title: "Joggen: Mehr als nur Laufen" }] },
  {
    id: 32,
    title: "Der klügste Freund des Menschen",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 32, file: "exam32.json", title: "Der klügste Freund des Menschen" },
      { id: 33, file: "exam33.json", title: "Der klügste Freund des Menschen (معدل)" }
    ]
  },
  { id: 34, title: "Manipulierte Bilder", enabled: true, hasFile: true, versions: [{ id: 34, file: "exam34.json", title: "Manipulierte Bilder" }] },
  {
    id: 35,
    title: "Maßgeschneidert nach Bodyscanning",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 35, file: "exam35.json", title: "Maßgeschneidert nach Bodyscanning" },
      { id: 36, file: "exam36.json", title: "Maßgeschneidert nach Bodyscanning (معدل)" }
    ]
  },
  {
    id: 37,
    title: "Im Restaurant",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 37, file: "exam37.json", title: "Im Restaurant" },
      { id: 38, file: "exam38.json", title: "Im Restaurant (معدل)" }
    ]
  },
  {
    id: 39,
    title: "Lernen ist kein Privileg der Jugend",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 39, file: "exam39.json", title: "Lernen ist kein Privileg der Jugend" },
      { id: 40, file: "exam40.json", title: "Lernen ist kein Privileg der Jugend (معدل)" }
    ]
  },
  { id: 41, title: "Wie TV-Bilder die Fantasie von Kindern prägen", enabled: true, hasFile: true, versions: [{ id: 41, file: "exam41.json", title: "Wie TV-Bilder die Fantasie von Kindern prägen" }] },
  { id: 42, title: "Städte vor dem Infarkt", enabled: true, hasFile: true, versions: [{ id: 42, file: "exam42.json", title: "Städte vor dem Infarkt" }] },
  { id: 43, title: "Es ist erst 6 Uhr morgens", enabled: true, hasFile: true, versions: [{ id: 43, file: "exam43.json", title: "Es ist erst 6 Uhr morgens" }] },
  { id: 44, title: "Die Katzen", enabled: true, hasFile: true, versions: [{ id: 44, file: "exam44.json", title: "Die Katzen" }] },
  {
    id: 45,
    title: "Teleshopping – nicht immer gut und günstig",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 45, file: "exam45.json", title: "Teleshopping – nicht immer gut und günstig" },
      { id: 46, file: "exam46.json", title: "Die Rückkehr des Nachtzugs" },
      { id: 47, file: "exam47.json", title: "Die Reise im Schlafwagen" }
    ]
  },
  {
    id: 48,
    title: "Theaterprojekt für Kinder (المعدل 1)",
    enabled: true,
    hasFile: true,
    versions: [
      { id: 48, file: "exam48.json", title: "Theaterprojekt für Kinder (المعدل 1)" },
      { id: 49, file: "exam49.json", title: "Theater für Kinder und Jugendliche (المعدل 2)" }
    ]
  }
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
  { id: 36, title: "Nachbarschaft.net", enabled: true, hasFile: true },
  { id: 37, title: "Zeitschrift - Abonnentenservice", enabled: true, hasFile: true },
  { id: 38, title: "Fotografieren für Fortgeschrittene", enabled: true, hasFile: true },
  { id: 39, title: "Umzugsunternehmen Bühler", enabled: true, hasFile: true },
  { id: 40, title: "Schlüsseldienst", enabled: true, hasFile: true },
  { id: 41, title: "T & W Elektronikversicherung", enabled: true, hasFile: true },
  { id: 42, title: "Waldschwimmbad Langen", enabled: true, hasFile: true }
];

// ========== قائمة امتحانات Mündlich Teil 1 ==========
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

// ============================================
// ✅ قاعدة بيانات الامتحانات (بنفسها)
// ============================================
const examsDatabase = {
  lesen1: lesenExams,
  lesen2: lesen2Exams,
  lesen3: lesen3Exams,
  sprach1: sprach1Exams,
  sprach2: sprach2Exams,
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

// ============================================
// ✅ دالة getFlattenedExamList - قائمة مسطحة للتنقل بين الإصدارات
// ============================================
function getFlattenedExamList(exams) {
    const flattened = [];
    exams.forEach(exam => {
        if (exam.versions && exam.versions.length > 1) {
            exam.versions.forEach(v => {
                flattened.push({
                    id: v.id,
                    title: v.title,
                    file: v.file,
                    skill: currentSkill,
                    isVersion: true,
                    parentId: exam.id
                });
            });
        } else {
            flattened.push({
                id: exam.id,
                title: exam.title,
                file: exam.hasFile ? getActualFileName(exam.id) : null,
                skill: currentSkill,
                isVersion: false,
                parentId: exam.id
            });
        }
    });
    return flattened;
}

// ✅ بعد التعديل الصحيح
async function renderExamListForSkill(skill, teilName) {
  currentSkill = skill;
  window.currentSkill = skill; // 🌟 السطر المضاف لتهيئة المهارة عالمياً للكود الخارجي
  
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
  
  // معالجة Mündlich
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
  
  const userStatus = await getUserStatusForExam();
  const isPremium = (userStatus === 'premium');
  
  // إنشاء مجموعة من معرفات الإصدارات الفرعية لاستبعادها من العرض الرئيسي
  const versionIds = new Set();
  targetExams.forEach(exam => {
    if (exam.versions && exam.versions.length > 1) {
      exam.versions.forEach(v => {
        if (v.id !== exam.id) {
          versionIds.add(v.id);
        }
      });
    }
  });
  
  // تصفية الامتحانات: نعرض فقط الامتحانات الأساسية (التي ليس معرفها ضمن versionIds)
  const mainExams = targetExams.filter(exam => !versionIds.has(exam.id));
  
  for (let i = 0; i < mainExams.length; i++) {
    const exam = mainExams[i];
    const examNumber = exam.id;
    // ✅ استخدم دالة isExamFree بدلاً من الشرط القديم
    const isFreeExam = isExamFree(skill, examNumber);
    
    const div = document.createElement("div");
    div.className = "item";
    
    const titleSpan = document.createElement("span");
    titleSpan.className = "exam-title";

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
    // ✅ عرض عدد الإعادات بجانب عنوان الامتحان
    const retryCount = getRetryCount(targetSkill, exam.id);
    if (retryCount > 0) {
        const retrySpan = document.createElement('span');
        retrySpan.style.cssText = 'font-size:10px; color:#94a3b8; margin-right:6px;';
        retrySpan.textContent = `🔄 ${retryCount}`;
        titleSpan.appendChild(retrySpan);
    }
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
    
// التحقق من وجود تعديلات
const hasVersions = exam.versions && exam.versions.length > 1;

if (hasVersions) {
  // ✅ حساب ما إذا كانت جميع النسخ مقفلة
  let allVersionsLocked = true;
  if (exam.versions && exam.versions.length > 1) {
    for (let v of exam.versions) {
      const isFree = isExamFree(skill, v.id);
      if (isFree) {
        allVersionsLocked = false;
        break;
      }
    }
    // إذا كان المستخدم Premium، فلا شيء مقفل
    if (isPremium) {
      allVersionsLocked = false;
    }
  }

  if (allVersionsLocked) {
    // 🔒 تصميم البطاقة المقفلة (نفس تصميم الامتحانات المقفلة)
    div.style.backgroundColor = "rgba(255,255,255,0.75)";
    div.style.border = "1px solid #e2e8f0";
    div.style.opacity = "1";
    div.style.transition = "all 0.25s ease";
    div.style.cursor = "pointer";

    // إضافة شارة Premium
    const rightSide = document.createElement("span");
    rightSide.className = "exam-right-icons";
    const premiumSpan = document.createElement("span");
    premiumSpan.className = "premium-badge";
    premiumSpan.innerHTML = "Premium";
    rightSide.appendChild(premiumSpan);
    div.appendChild(rightSide);

    // تغيير لون العنوان
    titleSpan.style.color = "#6b7280";
    titleSpan.style.transition = "color 0.25s ease";

    // تأثيرات hover (مطابقة للبطاقات المقفلة)
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

    // ✅ عند النقر، نفتح نافذة الإصدارات (وليس الاشتراك مباشرة)
    div.onclick = function(e) {
      e.stopPropagation();
      showVersionsPopup(exam, targetSkill);
    };
  } else {
    // 🟢 إذا كان هناك إصدار مجاني واحد على الأقل، تظهر البطاقة عادية
    div.style.cursor = 'pointer';
    div.onclick = function(e) {
      e.stopPropagation();
      showVersionsPopup(exam, targetSkill);
    };
  }
} else if (!isPremium && !isFreeExam) {

      // قفل Premium
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
      
    } else if (exam.hasFile || (exam.versions && exam.versions.length > 0)) {
      // فتح الامتحان
      div.onclick = (function(id, title, skillPath) {
        return function() { 
          const actualSkill = skillPath || targetSkill;
          // نبحث عن ملف الإصدار الأساسي
          let file = null;
          const examObj = targetExams.find(e => e.id === id);
          if (examObj && examObj.versions && examObj.versions.length > 0) {
            // نأخذ الإصدار الذي يحمل نفس id
            const version = examObj.versions.find(v => v.id === id);
            if (version) file = version.file;
            else file = examObj.versions[0].file;
          }
          openExam(id, title, actualSkill, file);
        };
      })(exam.id, exam.title, exam.skillPath || targetSkill);
      
    } else {
      div.style.opacity = "0.6";
      div.style.backgroundColor = "#f8f9fa";
      div.onclick = () => alert(`⚠️ الامتحان رقم ${exam.id} سيتم إضافته قريباً.`);
    }
    container.appendChild(div);
  }
  
  createViewModeToggles();
  
  // ✅ الترتيب الطبيعي دائماً (بدون حفظ حالة)
  restoreOriginalOrder();
  
  // ✅ تطبيق وضع العرض (list/grid) - قد يبقى محفوظاً في localStorage إذا أردت
  const mode2 = getViewModeIndex2();
  if (mode2 === 1) {
    applyExamListView("grid");
  } else {
    applyExamListView("list");
  }
  
  // ✅ إضافة البادج بعد كل إعادة رسم
  addVersionBadgesFixed();
  
  // ✅ حفظ الترتيب الأصلي بعد إضافة البادج (لضمان استقرار leaderboard/123)
  saveOriginalOrder();
  
  setupLockedNextButton();
}
function showVersionsPopup(exam, skill) {
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
  
  // الحصول على حالة المستخدم للتحقق من Premium
  getUserStatusForExam().then(userStatus => {
    const isPremium = (userStatus === 'premium');
    
    let versionsHtml = exam.versions.map((v, i) => {
      const savedScore = getExamResult(skill, v.id);
      let scoreHtml = '';
      if (savedScore !== null) {
        const color = getResultColor(savedScore);
        scoreHtml = `<span style="font-size:11px; color:${color}; font-weight:bold; margin-left:8px;">${savedScore} / 25</span>`;
      }
      
      // ✅ تحديد إذا كانت النسخة مجانية أم لا
      const isFree = isExamFree(skill, v.id);
      const isLocked = !isPremium && !isFree;
      
      // ✅ تصميم البطاقة حسب حالة القفل (مطابق للقائمة الرئيسية)
      let cardStyle = `
        background: #0f1421;
        border-radius: 10px;
        padding: 10px 14px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-left: 3px solid #4a6fa5;
        cursor: pointer;
        transition: 0.2s;
      `;
      
      let titleStyle = `font-size:13px; font-weight:500; text-align:left; flex:1;`;
      let premiumBadge = '';
      let onclickHandler = '';
      
      if (isLocked) {
        // 🔒 تصميم البطاقة المقفلة (مطابق للقائمة الرئيسية)
        cardStyle = `
          background: rgba(255,255,255,0.75);
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.25s ease;
          opacity: 1;
        `;
        titleStyle = `font-size:13px; font-weight:500; text-align:left; flex:1; color: #6b7280;`;
        
        // شارة Premium (نفس تصميم القائمة الرئيسية)
        premiumBadge = `
          <span class="premium-badge" style="
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            font-size: 9px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
          ">Premium</span>
        `;
        
        // عند النقر، نفتح الاشتراك (نفس سلوك القائمة الرئيسية)
        onclickHandler = `window.showPremiumModal ? window.showPremiumModal('${v.title}') : window.location.href='subscribe.html';`;
      } else {
        // 🟢 بطاقة مفتوحة (مجانية)
        onclickHandler = `window.openExam(${v.id}, '${v.title}', '${skill}', '${v.file}'); document.getElementById('versionsPopupAuto').remove();`;
      }
      
      return `
        <div style="${cardStyle}"
             onclick="${onclickHandler}"
             onmouseenter="this.style.background='${isLocked ? 'rgba(255,255,255,0.95)' : '#1a2340'}'"
             onmouseleave="this.style.background='${isLocked ? 'rgba(255,255,255,0.75)' : '#0f1421'}'">
          <span style="display:inline-flex; align-items:center; justify-content:center; background:#2a3042; color:#a8b5d9; border-radius:999px; width:24px; height:24px; font-size:12px; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.2);">${i+1}</span>
          <span style="${titleStyle}">${v.title}</span>
          ${scoreHtml}
          ${premiumBadge}
        </div>
      `;
    }).join('');
    
    modal.innerHTML = `
      <h4 style="margin:0 0 16px 0; font-size:16px; font-weight:600; color:#a8b5d9;">📋 هذا الامتحان له ${exam.versions.length} تعديلات</h4>
      <div style="border-top:1px solid #2a3042; margin-bottom:14px;"></div>
      ${versionsHtml}
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.remove(); }, { once: true });
    
    if (!document.getElementById('modal-style-auto')) {
      const style = document.createElement('style');
      style.id = 'modal-style-auto';
      style.textContent = `
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { transform:scale(0.9); opacity:0; } to { transform:scale(1); opacity:1; } }
      `;
      document.head.appendChild(style);
    }
  });
}

// ============================================
// ✅ دالة setupLockedNextButton المعدلة - تدعم الإصدارات والقواعد الجديدة
// ============================================
function setupLockedNextButton() {
  const nextBtn = document.getElementById('nextExamBtn');
  if (!nextBtn) return;
  
  getUserStatusForExam().then(status => {
    const isPremium = (status === 'premium');
    
    const flatList = getFlattenedExamList(currentExamsList);
    const currentIndex = flatList.findIndex(e => e.id === currentExamId);
    const nextExam = flatList[currentIndex + 1];
    
    if (nextExam) {
      const nextExamId = nextExam.id;
      // ✅ تحقق من القواعد الجديدة
      const isNextFree = isExamFree(currentSkill, nextExamId);
      
      if (!isPremium && !isNextFree && nextBtn.style.display !== 'none') {
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
      else if (isPremium || isNextFree) {
        const lockIcon = nextBtn.querySelector('.next-lock-icon');
        if (lockIcon) lockIcon.remove();
        nextBtn.style.backgroundColor = "";
        nextBtn.style.opacity = "1";
        nextBtn.style.paddingLeft = "";
        
        nextBtn.onclick = () => {
          if (nextExam.isVersion) {
            openExam(nextExam.id, nextExam.title, nextExam.skill, nextExam.file);
          } else {
            openExam(nextExam.id, nextExam.title, nextExam.skill);
          }
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
  // نبحث في جميع المهارات عن الامتحان الذي يحمل هذا id
  const allSkills = ['lesen1','lesen2','lesen3','sprach1','sprach2','hoeren1','hoeren2','hoeren3','schreiben','mündlich','mündlich1','mündlich2','mündlich3','tips'];
  for (const skill of allSkills) {
    const exams = examsDatabase[skill] || [];
    for (const exam of exams) {
      if (exam.id === examId && exam.versions && exam.versions.length > 0) {
        const version = exam.versions.find(v => v.id === examId);
        if (version) return version.file;
        return exam.versions[0].file;
      }
    }
  }
  return `exam${examId}.json`;
}

function shouldHideHelpButton(skill) {
  const hiddenSkills = ["schreiben", "tips", "mündlich1", "mündlich3"];
  return hiddenSkills.includes(skill);
}

// ============================================
// ✅ دالة openExam المعدلة (مع القواعد الجديدة)
// ============================================
async function openExam(examId, examTitle, skill, fileName = null) {
  const userStatus = await getUserStatusForExam();
  const isPremium = (userStatus === 'premium');
  
  // ✅ استخدم الدالة الجديدة للتحقق
  const isFree = isExamFree(skill, examId);
  
if (!isPremium && !isFree) {
    if (typeof window.showPremiumModal === 'function') {
      window.showPremiumModal(examTitle + " (" + examId + ")");
    } else {
      window.location.href = 'subscribe.html';
    }
    return;
  }
  
  currentExamId = examId;
  currentSkill = skill;
  
  window.currentSkill = skill;
  window.currentExamId = examId;
 
// إخفاء/إظهار الأزرار حسب نوع الصفحة
const interleavingRow = document.getElementById('interleavingRow');
if (interleavingRow) {
    // ❌ إخفاء الأزرار في Schreiben و Mündlich (جميع الأجزاء)
    const forbiddenSkills = ['schreiben', 'mündlich', 'mündlich1', 'mündlich2', 'mündlich3'];
    const isForbidden = forbiddenSkills.includes(skill);
    
    if (isForbidden) {
        interleavingRow.style.display = 'none';
    } else {
        interleavingRow.style.display = 'flex';
        
        const swapBtn = document.getElementById('interleavingBtn');
        const gameBtn = document.getElementById('rapidGameBtn');
        const memoryToggleBtn = document.getElementById('memoryToggleBtn');
        
        if (skill === 'sprach1' || skill === 'sprach2') {
            if (swapBtn) swapBtn.style.display = 'none';
            if (gameBtn) gameBtn.style.display = '';
            if (memoryToggleBtn) memoryToggleBtn.style.display = '';
        } else {
            if (swapBtn) swapBtn.style.display = '';
            if (gameBtn) gameBtn.style.display = '';
            if (memoryToggleBtn) memoryToggleBtn.style.display = '';
        }
    }
}
  // إخفاء/إظهار زر اختصارات لوحة المفاتيح
const shortcutsBtn = document.getElementById('shortcutsToggleBtn');
if (shortcutsBtn) {
    const forbiddenSkills = ['schreiben', 'mündlich', 'mündlich1', 'mündlich2', 'mündlich3'];
    if (forbiddenSkills.includes(skill)) {
        shortcutsBtn.style.display = 'none';
    } else {
        shortcutsBtn.style.display = 'flex';
    }
}
  if (shouldHideHelpButton(skill)) {
    const helpBtn = document.getElementById('globalHelpButton');
    if (helpBtn) helpBtn.style.display = "none";
  } else {
    const helpBtn = document.getElementById('globalHelpButton');
    if (helpBtn) helpBtn.style.display = "block";
  }
  
  const finalFileName = fileName || getActualFileName(examId);
  
  try {
    const response = await fetch(`data/${skill}/${finalFileName}`);
    if (!response.ok) {
      alert(`⚠️ الامتحان "${examTitle}" سيتم إضافته قريباً.\nالملف المطلوب: data/${skill}/${finalFileName}`);
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
        // ✅ إضافة عداد الإعادات
 // ✅ إضافة عداد الإعادات فقط في المهارات المسموحة
const forbiddenSkills = ['schreiben', 'mündlich', 'mündlich1', 'mündlich2', 'mündlich3'];
if (!forbiddenSkills.includes(skill) && typeof addRetryCounterToExam === 'function') {
    addRetryCounterToExam();
}
    updateExamNavButtons();
    
    // تحميل الامتحان حسب نوعه
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
    
    // Interleaving
    const containerEl = document.getElementById(skill);
    if (containerEl) {
      containerEl.style.display = 'block';
    }

    if (typeof window.resetInterleaving === 'function') {
      window.resetInterleaving();
    }

    if (typeof window.initInterleaving === 'function') {
      window.initInterleaving();
    }

    if (skill.startsWith('hoeren') && typeof window.rebuildTrueFalseCards === 'function') {
      window.rebuildTrueFalseCards();
    } else if (skill === 'lesen1' && typeof window.rebuildLesen1 === 'function') {
      window.rebuildLesen1();
    } else if (skill === 'lesen2' && typeof window.rebuildLesen2 === 'function') {
      window.rebuildLesen2();
    } else if (skill === 'lesen3' && typeof window.rebuildLesen3 === 'function') {
      window.rebuildLesen3();
    }
    
  } catch(e) {
    console.error("❌ خطأ:", e);
    alert("خطأ في تحميل الامتحان: " + e.message);
  }
}

// ============================================
// ✅ دالة updateExamNavButtons المعدلة - تدعم التنقل بين الإصدارات
// ============================================
function updateExamNavButtons() {
    const prevBtn = document.getElementById("prevExamBtn");
    const nextBtn = document.getElementById("nextExamBtn");
    const memoryBtn = document.getElementById("memoryTrainerBtn");
    
    if (!prevBtn || !nextBtn) return;
    
    const flatList = getFlattenedExamList(currentExamsList);
    const currentIndex = flatList.findIndex(e => e.id === currentExamId);
    
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < flatList.length - 1;
    
    if (hasPrev) {
        prevBtn.style.display = "inline-block";
        prevBtn.onclick = () => {
            const prevExam = flatList[currentIndex - 1];
            if (prevExam.isVersion) {
                openExam(prevExam.id, prevExam.title, prevExam.skill, prevExam.file);
            } else {
                openExam(prevExam.id, prevExam.title, prevExam.skill);
            }
        };
    } else {
        prevBtn.style.display = "none";
    }
    
    if (hasNext) {
        nextBtn.style.display = "inline-block";
        nextBtn.onclick = () => {
            const nextExam = flatList[currentIndex + 1];
            if (nextExam.isVersion) {
                openExam(nextExam.id, nextExam.title, nextExam.skill, nextExam.file);
            } else {
                openExam(nextExam.id, nextExam.title, nextExam.skill);
            }
        };
    } else {
        nextBtn.style.display = "none";
    }
    
    if (memoryBtn) {
        if (currentSkill && SKILL_CONFIG[currentSkill]) {
            memoryBtn.style.display = 'inline-flex';
            memoryBtn.onclick = function() {
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

// ============================================
// ✅ دالة createViewModeToggles المعدلة - بدون حفظ حالة
// ============================================
function createViewModeToggles() {
    const header = document.querySelector('.teil-header');
    if (!header) {
        setTimeout(createViewModeToggles, 500);
        return;
    }

    const showTogglesSkills = ['hoeren1', 'hoeren2', 'hoeren3', 'lesen1', 'lesen2', 'lesen3', 'sprach1', 'sprach2'];
    if (!showTogglesSkills.includes(currentSkill)) {
        const oldBtn1 = document.getElementById('viewModeToggleBtn1');
        const oldBtn2 = document.getElementById('viewModeToggleBtn2');
        if (oldBtn1) oldBtn1.style.display = 'none';
        if (oldBtn2) oldBtn2.style.display = 'none';
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

    // ===== الزر الأول (leaderboard ↔ 123) - بدون حفظ حالة =====
    // 0 = طبيعي (123), 1 = Leaderboard
    let currentIndex1 = 0;

    const btn1 = document.createElement('button');
    btn1.id = 'viewModeToggleBtn1';
    btn1.className = 'view-mode-toggle-btn-1';
    btn1.title = 'تبديل ترتيب القائمة';

    // الأيقونة المعروضة: إذا كان الحالي 0 نعرض '123' (لأن الضغط سينقل إلى Leaderboard)
  const iconName1 = currentIndex1 === 0 ? 'leaderboard' : '123';
    btn1.innerHTML = `<span class="material-symbols-outlined">${iconName1}</span>`;

    btn1.onclick = function(e) {
        e.stopPropagation();
        // تبديل الحالة
        currentIndex1 = currentIndex1 === 0 ? 1 : 0;
        // تحديث الأيقونة
        const span = this.querySelector('.material-symbols-outlined');
        if (span) {
        span.textContent = currentIndex1 === 0 ? 'leaderboard' : '123';
        }
        // تطبيق الترتيب
        if (currentIndex1 === 0) {
            restoreOriginalOrder();
        } else {
            applyLeaderboardOrder();
        }
    };

    header.appendChild(btn1);

    // ===== الزر الثاني (view_day ↔ grid_view) =====
    // يمكن تركه مع localStorage أو تعديله لنفس المبدأ
    const btn2 = document.createElement('button');
    btn2.id = 'viewModeToggleBtn2';
    btn2.className = 'view-mode-toggle-btn-2';
    btn2.title = 'تبديل شكل العرض';

    let currentIndex2 = getViewModeIndex2(); // تبقى باستخدام localStorage
    const displayIndex2 = currentIndex2 === 0 ? 1 : 0;
    const iconName2 = VIEW_ICONS_2[displayIndex2];
    btn2.innerHTML = `<span class="material-symbols-outlined">${iconName2}</span>`;

    btn2.onclick = function(e) {
        e.stopPropagation();
        currentIndex2 = (currentIndex2 + 1) % VIEW_ICONS_2.length;
        setViewModeIndex2(currentIndex2);
        const newDisplayIndex = currentIndex2 === 0 ? 1 : 0;
        const span = this.querySelector('.material-symbols-outlined');
        if (span) {
            span.textContent = VIEW_ICONS_2[newDisplayIndex];
        }
        if (currentIndex2 === 1) {
            setExamListMode("grid");
            applyExamListView("grid");
        } else {
            setExamListMode("list");
            applyExamListView("list");
        }
    };

    header.appendChild(btn2);
    applyExamListView(getExamListMode());
}

// ============================================
// ✅ دالة applyExamListView المعدلة - توحيد ارتفاع البطاقات
// ============================================
function applyExamListView(mode) {
    const list = document.getElementById("examsList");
    if (!list) return;

    const oldGrid = document.getElementById("examGridContainer");
    if (oldGrid) {
        while (oldGrid.firstChild) {
            list.appendChild(oldGrid.firstChild);
        }
        oldGrid.remove();
    }

    [...list.querySelectorAll(".item")].forEach(el => {
        el.style.cssText = "";
    });

    if (mode === "list") {
        console.log("📄 List View");
        return;
    }

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

    let maxHeight = 0;
    exams.forEach(item => {
        const clone = item.cloneNode(true);
        clone.style.cssText = `
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
            visibility: hidden;
            position: absolute;
            pointer-events: none;
        `;
        document.body.appendChild(clone);
        const height = clone.offsetHeight;
        document.body.removeChild(clone);
        if (height > maxHeight) maxHeight = height;
    });

    const fixedHeight = Math.min(Math.max(maxHeight, 50), 60);

    exams.forEach(item => {
        grid.appendChild(item);

        item.style.cssText = `
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: ${fixedHeight}px;
            padding: 4px 4px;
            background: #fafbfc;
            border: 1px solid #e8ecef;
            border-radius: 6px;
            margin: 0;
            box-shadow: none;
            text-align: center;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.25s ease;
            overflow: hidden;
        `;

        // تأثيرات Hover
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
// ✅ دالة addVersionBadgesFixed - إضافة البادج للتعديلات
// ============================================
function addVersionBadgesFixed() {
    const container = document.getElementById('examsList');
    if (!container) return;
    
    const skill = currentSkill || 'lesen1';
    if (!['lesen1','lesen2','lesen3','sprach1','sprach2'].includes(skill)) return;
    
    const items = container.querySelectorAll('.item:not(.teil-header):not(.memory-progress-bar-container)');
    if (!items.length) return;
    
    items.forEach(el => {
        const title = el.querySelector('.exam-title');
        if (!title) return;
        
        const match = title.textContent.match(/^(\d+):/);
        if (!match) return;
        const examId = parseInt(match[1]);
        
        const exam = currentExamsList.find(e => e.id === examId);
        if (!exam || !exam.versions || exam.versions.length <= 1) return;
        
        // ✅ التحقق من وجود البادج
        let badge = el.querySelector('.custom-badge');
        if (badge) {
            const countSpan = badge.querySelector('span:last-child');
            if (countSpan && countSpan.textContent === String(exam.versions.length)) {
                return; // البادج موجود وصحيح
            }
            badge.remove(); // البادج قديم
        }
        
        // إنشاء البادج الجديد
        badge = document.createElement('span');
        badge.className = 'custom-badge';
        badge.innerHTML = `
            <span class="material-symbols-outlined" style="font-size:12px; line-height:1;">layers</span>
            <span style="font-size:9px; font-weight:600;">${exam.versions.length}</span>
        `;
        badge.style.cssText = `
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 2px !important;
            background: linear-gradient(135deg, #334155, #1e293b) !important;
            color: #f1f5f9 !important;
            border-radius: 999px !important;
            padding: 0 8px 0 4px !important;
            height: 22px !important;
            flex-shrink: 0 !important;
            pointer-events: none !important;
            user-select: none !important;
            line-height: 1 !important;
            border: 1px solid #475569 !important;
        `;
        badge.title = `${exam.versions.length} تعديلات`;
        
        let rightSide = el.querySelector('.exam-right-icons');
        
        if (rightSide) {
            rightSide.appendChild(badge);
        } else {
            rightSide = document.createElement('span');
            rightSide.className = 'exam-right-icons';
            rightSide.style.cssText = `
                display: flex !important;
                align-items: center !important;
                gap: 6px !important;
                flex-shrink: 0 !important;
                margin-right: 4px !important;
            `;
            rightSide.appendChild(badge);
            el.appendChild(rightSide);
        }
    });
}

// ============================================
// باقي الدوال (goBackToExamsList, renderInfoExam, renderTipsExam, renderMündlichExam, ...)
// ============================================

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
  
  // ✅ استخدم الدالة الجديدة بدلاً من setTimeout القديم
  window.renderInitialExamList();
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
  
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.warn('⚠️ buildTeil1: لا توجد أسئلة لعرضها');
    container.innerHTML = '<div style="text-align:center; padding:20px; color:#999;">⚠️ لا توجد أسئلة في هذا الامتحان</div>';
    return;
  }
  
  container.innerHTML = "";
  
  let userAnswers = {};
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
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
    
    // ✅ زيادة العداد وتحديث الواجهة
    const retryCount = incrementRetryCount(currentSkill, currentExamId);
    
    // ✅ تحديث العداد في أعلى الصفحة (فوراً)
    if (typeof window.updateRetryCounter === 'function') {
        window.updateRetryCounter();
    }
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
  
  // عرض القائمة الأولية بعد تحميل الصفحة
  window.renderInitialExamList();
});

renderTeileList();

// ============================================
// نظام المراحل المتوازن (لجميع المهارات)
// ============================================

const SKILL_CONFIG = {
    hoeren1: { totalExams: 45, examsPerStage: 15, totalSentences: 108 },
    hoeren2: { totalExams: 55, examsPerStage: 15, totalSentences: 273 },
    hoeren3: { totalExams: 48, examsPerStage: 15, totalSentences: 105 },
    lesen1: { totalExams: 55, examsPerStage: 15, totalSentences: 275 },
    lesen2: { totalExams: 37, examsPerStage: 15, totalSentences: 185 },
    lesen3: { totalExams: 37, examsPerStage: 15, totalSentences: 120 },
    sprach1: { totalExams: 41, examsPerStage: 15, totalSentences: 205 },
    sprach2: { totalExams: 49, examsPerStage: 15, totalSentences: 245 }
};

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

function getOverallProgress(skill) {
    const totalStages = getTotalStages(skill);
    if (totalStages <= 0) return 0;
    const currentStage = getCurrentStage(skill);
    const stageProgress = getStageProgress(skill);
    
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
                    if (data.options && Array.isArray(data.options)) {
                        questions = data.options;
                    } else if (data.questions && Array.isArray(data.questions)) {
                        questions = data.questions;
                    } else {
                        questions = [];
                    }
                    questions = questions.filter(q => q.memoryHighlight);
                } else {
                    questions = data.questions || [];
                }

                questions.forEach((q, idx) => {
                    let entry;
                    if (skill === 'sprach1' || skill === 'sprach2') {
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
                            color: 0
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
                    if (skill === 'lesen1' && data.sharedOptions) {
                        sharedOptions = data.sharedOptions;
                        console.log(`✅ تم استخراج sharedOptions لـ ${skill} (${sharedOptions.length} عنوان)`);
                    }
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
        <button class="memory-progress-btn reset" title="إعادة تعيين التقدم" onclick="window.resetSkillProgress('${skill}');">
    ↺
</button>
    `;
    container.insertBefore(bar, container.firstChild);
}

// ============================================
// إعادة تعيين جميع المستويات (للمهارات كافة)
// ============================================
// ============================================
// ✅ دالة resetAllLevels (للتوافق مع الكود القديم)
// لكن نعيد توجيهها لتستخدم resetSkillProgress مع currentSkill
// ============================================
function resetAllLevels() {
    const skill = window.currentSkill || window.memoryTrainer?.currentSkill;
    if (skill) {
        resetSkillProgress(skill);
    } else {
        console.warn('⚠️ resetAllLevels: لم يتم تحديد المهارة الحالية، استخدام hoeren1 كافتراضي');
        resetSkillProgress('hoeren1');
    }
}

// ============================================
// تشغيل Memory Trainer من القائمة (يدعم جميع المهارات)
// ============================================

window.startMemoryTrainerFromList = function(skill = 'hoeren1') {
    const combinedKey = `_${skill}_combinedData`;
    if (!window[combinedKey]) {
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
window.renderInitialExamList = renderInitialExamList;

console.log('🧠 نظام التقدم المتوازن (المراحل لكل مهارة) تم تحميله بنجاح');
console.log('📊 عدد المراحل:', Object.keys(SKILL_CONFIG).map(s => `${s}: ${getTotalStages(s)}`).join(', '));

// ============================================
// أزرار تبديل الأيقونة (زرين جنب بعض) - بدون حفظ حالة للزر الأول
// ============================================

const VIEW_ICONS_1 = ['leaderboard', '123']; // لكننا لا نستخدم localStorage له

let originalOrderNumbers = [];

function saveOriginalOrder() {
    const list = document.getElementById("examsList");
    if (!list) return;
    
    // البحث في الحاوية الصحيحة (سواء list أو grid)
    const gridContainer = document.getElementById("examGridContainer");
    const targetContainer = gridContainer || list;
    
    const exams = [...targetContainer.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );
    
    if (exams.length === 0) {
        console.warn("⚠️ saveOriginalOrder: لا توجد عناصر للحفظ");
        return;
    }
    
    originalOrderNumbers = exams.map(el => {
        const title = el.querySelector(".exam-title");
        if (!title) return null;
        const text = title.textContent || '';
        const match = text.match(/^(\d+):/);
        return match ? parseInt(match[1], 10) : null;
    }).filter(num => num !== null);
    
    if (originalOrderNumbers.length === 0) {
        console.warn("⚠️ saveOriginalOrder: لم يتم العثور على أرقام، استخدام الفهرس");
        originalOrderNumbers = exams.map((_, index) => index + 1);
    }
    
    console.log("📋 تم حفظ الترتيب الأصلي:", originalOrderNumbers);
}

function restoreOriginalOrder() {
    const list = document.getElementById("examsList");
    if (!list) return;
    
    if (originalOrderNumbers.length === 0) {
        console.warn("⚠️ restoreOriginalOrder: لا توجد أرقام محفوظة، محاولة الحفظ مجدداً");
        saveOriginalOrder();
        return;
    }
    
    const gridContainer = document.getElementById("examGridContainer");
    const targetContainer = gridContainer || list;

    const exams = [...targetContainer.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );
    
    if (exams.length === 0) {
        console.warn("⚠️ restoreOriginalOrder: لا توجد عناصر لترتيبها");
        return;
    }
    
    // إنشاء خريطة للعناصر حسب الرقم
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
    
    // إذا لم نجد أرقاماً، استخدم الفهرس
    if (Object.keys(examMap).length === 0) {
        console.warn("⚠️ restoreOriginalOrder: لم يتم العثور على أرقام، استخدام الفهرس");
        exams.forEach((el, index) => {
            el.dataset.originalIndex = index;
        });
        originalOrderNumbers = exams.map((_, index) => index + 1);
        // إعادة تعيين الخريطة
        exams.forEach(el => {
            const idx = parseInt(el.dataset.originalIndex);
            examMap[idx + 1] = el;
        });
    }
    
    const fragment = document.createDocumentFragment();
    let foundCount = 0;
    
    originalOrderNumbers.forEach(num => {
        if (examMap[num]) {
            fragment.appendChild(examMap[num]);
            delete examMap[num];
            foundCount++;
        }
    });
    
    // إضافة العناصر المتبقية (إذا وجدت)
    Object.keys(examMap).map(Number).sort((a, b) => a - b).forEach(num => {
        fragment.appendChild(examMap[num]);
        foundCount++;
    });
    
    if (foundCount > 0) {
        targetContainer.appendChild(fragment);
        console.log(`📋 تم استعادة الترتيب الأصلي (${foundCount} عنصر)`);
    } else {
        console.warn("⚠️ restoreOriginalOrder: لم يتم العثور على أي عنصر للمطابقة");
        // التراجع: ترتيب بسيط
        exams.forEach(el => targetContainer.appendChild(el));
    }
}

function applyLeaderboardOrder() {
    const list = document.getElementById("examsList");
    if (!list) return;

    const gridContainer = document.getElementById("examGridContainer");
    const targetContainer = gridContainer || list;

    const exams = [...targetContainer.querySelectorAll(".item")].filter(el =>
        !el.classList.contains("teil-header") &&
        !el.classList.contains("memory-progress-bar-container")
    );

    if (exams.length === 0) {
        console.warn("⚠️ applyLeaderboardOrder: لا توجد عناصر");
        return;
    }

    const data = exams.map((el, index) => {
        const badge = el.querySelector(".exam-result-badge");
        let score = Infinity;
        let hasResult = false;
        if (badge) {
            const txt = badge.textContent.trim();
            const m = txt.match(/^(\d+)\s*\/\s*\d+/);
            if (m) {
                score = parseInt(m[1], 10);
                hasResult = true;
            }
        }
        return { el, score, hasResult, originalIndex: index };
    });

    // العناصر بدون نتيجة تذهب إلى النهاية
    data.sort((a, b) => {
        if (!a.hasResult && !b.hasResult) return a.originalIndex - b.originalIndex;
        if (!a.hasResult) return 1;
        if (!b.hasResult) return -1;
        if (a.score === b.score) return a.originalIndex - b.originalIndex;
        return a.score - b.score;
    });

    // إفراغ الحاوية وإعادة الإدراج
    data.forEach(item => targetContainer.appendChild(item.el));
    console.log("✅ تم ترتيب الامتحانات من الأضعف إلى الأقوى");
}


// ===== دوال الزر الثاني (عرض قائمة/شبكة) – قد تبقى مع localStorage =====
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

const EXAM_LIST_MODE_KEY = "examListViewMode";

function getExamListMode() {
    return localStorage.getItem(EXAM_LIST_MODE_KEY) || "list";
}

function setExamListMode(mode) {
    localStorage.setItem(EXAM_LIST_MODE_KEY, mode);
}

// ============================================
// تصدير openExam للاستخدام العالمي
// ============================================
window.openExam = openExam;

// ============================================
// ✅ نظام Badge التعديلات - النسخة النهائية
// ============================================

// ✅ تصدير الدوال للاستخدام العام
window.addVersionBadgesFixed = addVersionBadgesFixed;
// ✅ تصدير دوال العداد للاستخدام من ملفات أخرى (مثل engine.js)
window.saveRetryCount = saveRetryCount;
window.getRetryCount = getRetryCount;
window.incrementRetryCount = incrementRetryCount;
window.resetSkillProgress = resetSkillProgress;
// ============================================
// ✅ إعادة تعيين تقدم جزء معين فقط (Local Reset)
// ============================================

function resetSkillProgress(skill) {
    if (!skill) {
        console.warn('⚠️ resetSkillProgress: لم يتم تحديد المهارة');
        return;
    }

    const skillName = getSkillDisplayName(skill);
    showResetModal(skill, skillName);
}

function getSkillDisplayName(skill) {
    const names = {
        'hoeren1': 'Hören 1',
        'hoeren2': 'Hören 2',
        'hoeren3': 'Hören 3',
        'lesen1': 'Lesen 1',
        'lesen2': 'Lesen 2',
        'lesen3': 'Lesen 3',
        'sprach1': 'Sprachbausteine 1',
        'sprach2': 'Sprachbausteine 2'
    };
    return names[skill] || skill;
}

function showResetModal(skill, skillName) {
    // إزالة أي مودال قديم
    const oldModal = document.getElementById('resetConfirmModal');
    if (oldModal) oldModal.remove();

    // إنشاء المودال
    const overlay = document.createElement('div');
    overlay.id = 'resetConfirmModal';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        animation: fadeIn 0.2s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #1a1f2e;
        border-radius: 20px;
        padding: 28px 30px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        border: 1px solid #2a3042;
        animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        color: #e2e8f0;
        text-align: center;
    `;

    modal.innerHTML = `
        <div style="font-size: 32px; margin-bottom: 10px;">🔄</div>
        <h3 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 600; color: #f1f5f9;">إعادة تعيين مستوى التدريب</h3>
        <p style="margin: 6px 0 16px 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
            هل أنت متأكد أنك تريد إعادة تعيين تقدمك في<br>
            <strong style="color: #38bdf8;">${skillName}</strong>؟
        </p>
        <p style="margin: 0 0 20px 0; font-size: 12px; color: #64748b;">
            لن يتم حذف أي تقدم في باقي الأجزاء.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="reset-modal-cancel" style="
                padding: 10px 24px;
                border: 1px solid #334155;
                border-radius: 10px;
                background: transparent;
                color: #94a3b8;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1;
            "
            onmouseover="this.style.background='#1e293b'; this.style.borderColor='#475569';"
            onmouseout="this.style.background='transparent'; this.style.borderColor='#334155';"
            >
                إلغاء
            </button>
            <button class="reset-modal-confirm" style="
                padding: 10px 24px;
                border: none;
                border-radius: 10px;
                background: #dc2626;
                color: white;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1;
            "
            onmouseover="this.style.background='#b91c1c';"
            onmouseout="this.style.background='#dc2626';"
            >
                إعادة التعيين
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // إغلاق عند النقر خارج المودال
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // إغلاق عند الضغط على Esc
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });

    // زر الإلغاء
    modal.querySelector('.reset-modal-cancel').addEventListener('click', () => {
        overlay.remove();
    });

    // زر التأكيد
    modal.querySelector('.reset-modal-confirm').addEventListener('click', () => {
        // حذف بيانات المهارة فقط
        const LEVELS_KEY = 'memory_levels';
        try {
            const data = JSON.parse(localStorage.getItem(LEVELS_KEY) || '{}');
            const prefix = `${skill}_exam`;
            const newData = {};
            for (const key in data) {
                if (!key.startsWith(prefix)) {
                    newData[key] = data[key];
                }
            }
            localStorage.setItem(LEVELS_KEY, JSON.stringify(newData));
            console.log(`✅ تم إعادة تعيين تقدم ${skillName}`);
            overlay.remove();
            // إعادة تحميل الصفحة لتحديث الواجهة
            location.reload();
        } catch (e) {
            console.error('❌ خطأ في إعادة التعيين:', e);
            overlay.remove();
        }
    });
}
console.log('✅ نظام Badge التعديلات (النسخة النهائية) تم تحميله');
// ✅ تصدير متغيرات Lesen1 للاستخدام من engine.js
window.matchingSelectedAnswers = matchingSelectedAnswers;
window.matchingAvailableOptions = matchingAvailableOptions;
window.currentMatchingExamData = currentMatchingExamData;
window.renderMatchingQuestions = renderMatchingQuestions;
