// ============================================
// exams.js - نظام الامتحانات المتكامل مع دعم المراجعة مع صديق
// مع نظام Live Events, Presence والمزامنة المباشرة
// النسخة النهائية - 2025
// ============================================

// ========== قوائم الامتحانات ==========
const teile = [
  { id: 1, name: "Hören Teil 1", container: "hoeren1", skill: "hoeren1" },
  { id: 2, name: "Hören Teil 2", container: "hoeren2", skill: "hoeren2" },
  { id: 3, name: "Hören Teil 3", container: "hoeren3", skill: "hoeren3" },
  { id: 4, name: "Lesen Teil 1", container: "teil1", skill: "lesen1" },
  { id: 5, name: "Lesen Teil 2", container: "teil2", skill: "lesen2" },
  { id: 6, name: "Lesen Teil 3", container: "teil3", skill: "lesen3" },
  { id: 7, name: "Sprachbausteine Teil 1", container: "sprach1", skill: "sprach1" },
  { id: 8, name: "Sprachbausteine Teil 2", container: "sprach2", skill: "sprach2" },
  { id: 9, name: "Schreiben", container: "schreiben", skill: "schreiben" },
  { id: 10, name: "Mündlich", container: "mündlich", skill: "mündlich" },
  { id: 11, name: "Tips", container: "tips", skill: "tips" }
];

// ========== متغيرات المراجعة مع صديق ==========
let currentQuestionsCount = 0;
let currentActiveQuestion = 0;
let liveEventsUnsubscribe = null;
let liveQuestionUnsubscribe = null;

// ============================================
// دوال المزامنة مع الغرفة
// ============================================

// إرسال الإجابة إلى الغرفة
async function syncAnswerToRoom(questionIndex, selectedAnswer, isCorrect) {
    if (typeof window.StudyRoom !== 'undefined' && window.StudyRoom.isInRoom && window.StudyRoom.isInRoom()) {
        await window.StudyRoom.syncAnswer(questionIndex, selectedAnswer, isCorrect);
        console.log(`📡 تم إرسال الإجابة إلى الغرفة: سؤال ${questionIndex + 1}`);
    }
}

// تلوين إجابة الصديق
function highlightOtherAnswer(questionIndex, answerIndex) {
    const questionCard = document.getElementById(`q_${questionIndex}`);
    if (!questionCard) return;
    
    const optionsContainer = questionCard.querySelector('.options-container');
    if (!optionsContainer) return;
    
    const buttons = optionsContainer.querySelectorAll('.option-label');
    if (buttons[answerIndex]) {
        buttons[answerIndex].style.background = '#bbdef5';
        buttons[answerIndex].style.border = '2px solid #1976d2';
        buttons[answerIndex].style.color = '#0d47a1';
        
        if (!buttons[answerIndex].querySelector('.friend-icon')) {
            const icon = document.createElement('span');
            icon.className = 'friend-icon';
            icon.innerHTML = ' 👥';
            icon.style.fontSize = '11px';
            buttons[answerIndex].appendChild(icon);
        }
    }
}

// مراقبة إجابات الصديق
function watchOtherAnswers() {
    if (typeof window.StudyRoom === 'undefined' || !window.StudyRoom.isInRoom || !window.StudyRoom.isInRoom()) {
        return;
    }
    
    if (window._otherAnswerListeners) {
        window._otherAnswerListeners.forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') unsubscribe();
        });
    }
    window._otherAnswerListeners = [];
    
    for (let i = 0; i < currentQuestionsCount; i++) {
        const unsubscribe = window.StudyRoom.getOtherAnswer(i, (otherAnswer) => {
            if (otherAnswer !== null && otherAnswer !== undefined) {
                console.log(`📩 إجابة الصديق للسؤال ${i + 1}: ${otherAnswer}`);
                highlightOtherAnswer(i, otherAnswer);
            }
        });
        if (unsubscribe) {
            window._otherAnswerListeners.push(unsubscribe);
        }
    }
}

// ============================================
// دوال الأحداث المباشرة (Live Events)
// ============================================

// إرسال السؤال الحالي
async function sendLiveCurrentQuestion(questionIndex) {
    if (typeof window.StudyRoom !== 'undefined' && window.StudyRoom.isInRoom && window.StudyRoom.isInRoom()) {
        await window.StudyRoom.updateCurrentQuestion(questionIndex);
        console.log(`📍 [Live] أنا الآن في السؤال ${questionIndex + 1}`);
    }
}

// إرسال حدث اختيار إجابة
async function sendLiveAnswerEvent(questionIndex, answerText, isCorrect) {
    if (typeof window.StudyRoom !== 'undefined' && window.StudyRoom.isInRoom && window.StudyRoom.isInRoom()) {
        await window.StudyRoom.sendAnswerEvent(questionIndex, answerText, isCorrect);
        console.log(`⚡ [Live] أرسلت: ${answerText} على السؤال ${questionIndex + 1}`);
    }
}

// تحديث النتيجة في الشريط
async function updateRoomScore() {
    if (typeof window.updateRoomScore === 'function') {
        await window.updateRoomScore();
        console.log("📊 تم تحديث النتيجة في الشريط");
    }
}

// توهج سؤال الصديق
function glowFriendQuestion(questionIndex) {
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('friend-live-focus');
        card.style.border = '';
        card.style.boxShadow = '';
    });
    
    const friendCard = document.getElementById(`q_${questionIndex}`);
    if (friendCard) {
        friendCard.classList.add('friend-live-focus');
        friendCard.style.border = '2px solid #ff9800';
        friendCard.style.boxShadow = '0 0 15px rgba(255, 152, 0, 0.3)';
    }
}

// إظهار إشعار بتفاعل الصديق
function showLiveFriendToast(event) {
    const toast = document.createElement('div');
    toast.className = 'live-friend-toast';
    toast.innerHTML = `
        <div style="background:#ff9800;color:white;padding:6px 14px;border-radius:30px;font-size:12px;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.2);">
            <span>👤</span>
            <span><strong>${event.userName}</strong> أجاب: ${event.answer}</span>
        </div>
    `;
    toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:10000;animation:liveFadeOut 2s forwards;pointer-events:none';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// بدء مراقبة أحداث الصديق
function startLiveFriendWatching() {
    if (typeof window.StudyRoom === 'undefined' || !window.StudyRoom.isInRoom || !window.StudyRoom.isInRoom()) {
        console.log("👥 لست في غرفة، لن يتم تفعيل المراقبة المباشرة");
        return;
    }
    
    console.log("🔥 [Live] بدء مراقبة أحداث الصديق المباشرة");
    
    // مراقبة السؤال الحالي للصديق
    if (liveQuestionUnsubscribe) {
        if (typeof liveQuestionUnsubscribe === 'function') liveQuestionUnsubscribe();
        liveQuestionUnsubscribe = null;
    }
    liveQuestionUnsubscribe = window.StudyRoom.listenToFriendCurrentQuestion((data) => {
        console.log(`📍 [Live] الصديق ${data.userName} يراجع السؤال ${data.questionIndex + 1}`);
        glowFriendQuestion(data.questionIndex);
    });
    
    // مراقبة أحداث الإجابات
    if (liveEventsUnsubscribe) {
        if (typeof liveEventsUnsubscribe === 'function') liveEventsUnsubscribe();
        liveEventsUnsubscribe = null;
    }
    liveEventsUnsubscribe = window.StudyRoom.listenToFriendLiveEvents((event) => {
        console.log(`⚡ [Live] الصديق ${event.userName} أجاب: ${event.answer} على السؤال ${event.questionIndex + 1}`);
        showLiveFriendToast(event);
    });
}

// ========== دوال حفظ واسترجاع النتائج ==========
function saveExamResult(skill, examId, score) {
  try {
    const key = `exam_result_${skill}_${examId}`;
    localStorage.setItem(key, score.toString());
    console.log(`✅ تم حفظ النتيجة ${score} لـ ${skill} ${examId}`);
  } catch(e) { console.error("❌ خطأ في حفظ النتيجة:", e); }
}

function getExamResult(skill, examId) {
  try {
    const key = `exam_result_${skill}_${examId}`;
    const result = localStorage.getItem(key);
    return result ? parseFloat(result) : null;
  } catch(e) { return null; }
}

function getResultColor(score) {
  if (score === 25) return "#17a2b8";
  if (score >= 15) return "#28a745";
  return "#adb5bd";
}

function createResultBadge(score) {
  if (score === null) return null;
  const badge = document.createElement("span");
  badge.className = "exam-result-badge";
  badge.textContent = `${score} / 25`;
  badge.style.cssText = `font-size:11px;font-weight:bold;padding:3px 8px;border-radius:20px;color:white;background-color:${getResultColor(score)};margin-left:10px;display:inline-block;min-width:55px;text-align:center;`;
  return badge;
}

function showLockedMessage(examTitle) {
    let cleanTitle = examTitle.replace(/\s*\(\d+\)\s*$/, '').trim();
    let modal = document.createElement('div');
    modal.id = 'lockedModal';
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:100000;display:flex;justify-content:center;align-items:center;direction:rtl;`;
    modal.innerHTML = `<div style="background:#f8fafc;border-radius:32px;padding:32px;max-width:360px;width:85%;text-align:center;box-shadow:0 25px 45px -12px rgba(0,0,0,0.25);direction:rtl;border:1px solid #e2e8f0;"><div style="margin-bottom:20px;"><div style="font-size:48px;margin-bottom:8px;">⭐</div></div><h2 style="color:#1e293b;margin-bottom:8px;font-size:22px;font-weight:600;">هذا المحتوى مخصص للمشتركين</h2><div style="background:#f1f5f9;padding:12px;border-radius:20px;margin:16px 0;color:#334155;font-weight:500;font-size:15px;">📚 ${cleanTitle}</div><p style="color:#475569;margin-bottom:8px;font-size:14px;">يتطلب باقة: <strong style="color:#3b82f6;">Premium</strong></p><p style="color:#64748b;margin-bottom:28px;font-size:13px;">للوصول إلى هذا الامتحان، قم بترقية حسابك</p><div style="display:flex;flex-direction:column;gap:12px;justify-content:center;align-items:center;margin-top:0;"><button id="upgradeNowBtnModal" style="background:#3b82f6;color:white;border:none;padding:12px 24px;border-radius:50px;cursor:pointer;font-weight:600;font-size:14px;width:100%;">🚀 ترقية الحساب</button><button id="closeModalBtn" style="background:#f1f5f9;border:1px solid #e2e8f0;padding:12px 24px;border-radius:50px;cursor:pointer;font-weight:500;font-size:14px;color:#64748b;width:100%;">ليس الآن</button></div></div>`;
    document.body.appendChild(modal);
    const upgradeBtn = document.getElementById('upgradeNowBtnModal');
    const closeBtn = document.getElementById('closeModalBtn');
    if(upgradeBtn) upgradeBtn.onclick = () => window.location.href = 'subscribe.html';
    if(closeBtn) closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
}

let currentExamData = null;
let currentSkill = "lesen1";
let currentExamId = null;
let currentExamsList = [];
let currentMündlichPart = 2;
let userStatusCache = null;
let lastStatusCheck = 0;

async function getUserStatusForExam() {
    let email = localStorage.getItem('zertiva_email');
    if (!email) return 'guest';
    let now = Date.now();
    if (userStatusCache && (now - lastStatusCheck) < 5000) return userStatusCache;
    try {
        const response = await fetch('premium.json?_=' + now);
        const premium = await response.json();
        if (premium[email]) {
            let expiry = premium[email];
            let today = new Date().toISOString().slice(0,10);
            if (today <= expiry) {
                userStatusCache = 'premium';
                lastStatusCheck = now;
                return 'premium';
            }
        }
        userStatusCache = 'free';
        lastStatusCheck = now;
        return 'free';
    } catch(e) { return 'free'; }
}

// ========== قوائم الامتحانات ==========
const tipsExams = [{ id: 1, title: "كيفاش تنجح بدكاء", enabled: true, hasFile: true }];

const lesenExams = [
  { id: 1, title: "Jugend Forscher", enabled: true, hasFile: true },
  { id: 2, title: "sport ist gesund", enabled: true, hasFile: true },
  { id: 3, title: "sport ist gesund (التعديل 1)", enabled: true, hasFile: true },
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
  { id: 47, title: "Bäder", enabled: true, hasFile: true }
];

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
  { id: 35, title: "In Offenbach zu Hause", enabled: true, hasFile: true }
];

const mündlich1Exams = [{ id: 1, title: "قدم نفسك وتكلم عن موضوع اخترته", enabled: true, hasFile: true, skillPath: "mündlich1" }];
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
const mündlich3Exams = [{ id: 1, title: "Problemlösung", enabled: true, hasFile: true, skillPath: "mündlich3" }];

const actualFileNames = {};
for(let i=1; i<=86; i++) actualFileNames[i] = `exam${i}.json`;

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
    { id: 36, title: "Möbel für die neue Wohnung", enabled: true, hasFile: true }
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
    { id: 40, title: "Liebe Sandra", enabled: true, hasFile: true }
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
    { id: 46, title: "Die Rückkehr des Nachtzugs", enabled: true, hasFile: true }
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
    { id: 49, title: "Die Ausbildung (مواضيع تركيا)", enabled: true, hasFile: true }
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
    { id: 47, title: "Beim Klassik-Radio (مواضيع تركيا)", enabled: true, hasFile: true }
  ],
  schreiben: schreibenExams,
  mündlich: mündlich2Exams,
  mündlich1: mündlich1Exams,
  mündlich2: mündlich2Exams,
  mündlich3: mündlich3Exams,
  tips: tipsExams
};

// ========== دالة عرض نتيجة محفوظة ==========
function displaySavedResult(skill, examId, titleSpan) {
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

// ========== بناء امتحانات Teil 1 مع دعم المراجعة مع صديق ==========
function buildTeil1(questions) {
    const container = document.getElementById("teil1");
    if (!container) return;
    container.innerHTML = "";
    
    currentQuestionsCount = questions.length;
    let userAnswers = {};
    
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const card = document.createElement("div");
        card.className = "question-card";
        card.id = "q_" + i;
        
        const questionText = document.createElement("div");
        questionText.className = "question-text";
        questionText.innerHTML = "<strong>" + (i + 1) + ". " + q.text + "</strong>";
        card.appendChild(questionText);
        
        const optionsDiv = document.createElement("div");
        optionsDiv.className = "options-container";
        
        for (let j = 0; j < q.options.length; j++) {
            const label = document.createElement("label");
            label.className = "option-label";
            const radioId = "q" + i + "_" + j;
            label.innerHTML = '<input type="radio" name="q' + i + '" value="' + j + '" class="option-input" id="' + radioId + '"> <span>' + q.options[j] + '</span>';
            
            // ✅ إرسال الإجابة إلى الغرفة
            label.onclick = (function(qIdx, ansIdx) {
                return async function() {
                    userAnswers[qIdx] = ansIdx;
                    const isCorrect = (ansIdx === q.correct);
                    const answerText = q.options[ansIdx];
                    
                    console.log(`📝 السؤال ${qIdx + 1}: ${answerText} (${isCorrect ? 'صحيح' : 'خطأ'})`);
                    
                    // ✅ إرسال إلى StudyRoom إذا كان موجوداً
                    if (typeof window.StudyRoom !== 'undefined' && window.StudyRoom.isInRoom && window.StudyRoom.isInRoom()) {
                        await window.StudyRoom.syncAnswer(qIdx, ansIdx, isCorrect);
                        console.log(`📡 تم إرسال الإجابة إلى الغرفة: سؤال ${qIdx + 1}`);
                    }
                    
                    // تغيير لون الإجابة محلياً
                    const allOptions = document.querySelectorAll(`#q_${qIdx} .option-label`);
                    allOptions.forEach(btn => {
                        btn.style.background = '';
                        btn.style.border = '';
                        btn.style.color = '';
                    });
                    label.style.background = isCorrect ? '#c8e6c9' : '#ffcdd2';
                    label.style.border = `2px solid ${isCorrect ? '#4caf50' : '#f44336'}`;
                    label.style.color = '#333';
                };
            })(i, j);
            
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
    
    // بدء مراقبة إجابات الصديق
    setTimeout(() => {
        if (typeof watchOtherAnswers === 'function') {
            watchOtherAnswers();
        }
    }, 500);
    
    console.log(`✅ تم بناء ${questions.length} سؤال مع دعم المراجعة مع صديق`);
}

// ========== دالة تصحيح Teil 1 ==========
function checkTeil1(questions, answers) {
    let score = 0;
    const total = questions.length;
    const pointsPerQuestion = 25 / total;
    
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const card = document.getElementById("q_" + i);
        const userAnswer = answers[i];
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

// ========== دوال مساعدة ==========
function getTeilNameBySkill(skill) {
  if (skill === "mündlich1") return "Mündlich - Teil 1 📖";
  if (skill === "mündlich2") return "Mündlich - Teil 2 🗣️";
  if (skill === "mündlich3") return "Mündlich - Teil 3 🎯";
  const teil = teile.find(t => t.skill === skill);
  return teil ? teil.name : skill;
}

function getActualFileName(examId) {
  return actualFileNames[examId] || `exam${examId}.json`;
}

function shouldHideHelpButton(skill) {
  const hiddenSkills = ["schreiben", "tips", "mündlich1", "mündlich3"];
  return hiddenSkills.includes(skill);
}

// ========== دوال التنقل وعرض الامتحانات ==========
function renderTeileList() {
  const container = document.getElementById("teileList");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < teile.length; i++) {
    const teil = teile[i];
    const div = document.createElement("div");
    div.className = "item teil-item";
    div.textContent = teil.name;
    div.onclick = (function(skill, teilName) {
      return function() { renderExamListForSkill(skill, teilName); };
    })(teil.skill, teil.name);
    container.appendChild(div);
  }
}

function renderMündlichPartTabs() {
  const container = document.getElementById("examsList");
  if (!container) return;
  const oldTabs = container.querySelector('.mündlich-tabs');
  if (oldTabs) oldTabs.remove();
  const tabsDiv = document.createElement("div");
  tabsDiv.className = "mündlich-tabs";
  tabsDiv.style.cssText = `display:flex;gap:12px;margin-bottom:20px;justify-content:center;flex-wrap:wrap;padding:10px 0;`;
  const parts = [
    { id: 1, name: "Teil 1 📖", skill: "mündlich1" },
    { id: 2, name: "Teil 2 🗣️", skill: "mündlich2" },
    { id: 3, name: "Teil 3 🎯", skill: "mündlich3" }
  ];
  parts.forEach(part => {
    const btn = document.createElement("button");
    btn.textContent = part.name;
    btn.style.cssText = `background:${currentMündlichPart === part.id ? "#4a6fa5" : "#eef2f7"};color:${currentMündlichPart === part.id ? "white" : "#2c3e66"};border:none;padding:8px 20px;border-radius:30px;cursor:pointer;font-size:14px;font-weight:500;`;
    btn.onclick = () => {
      currentMündlichPart = part.id;
      renderExamListForSkill(part.skill, `Mündlich - ${part.name}`);
    };
    tabsDiv.appendChild(btn);
  });
  container.insertBefore(tabsDiv, container.firstChild);
}

async function renderExamListForSkill(skill, teilName) {
  currentSkill = skill;
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
  
  let targetSkill = skill;
  let targetExams = examsDatabase[skill] || [];
  
  if (skill === "mündlich") {
    if (currentMündlichPart === 1) { targetSkill = "mündlich1"; targetExams = examsDatabase.mündlich1 || []; }
    else if (currentMündlichPart === 2) { targetSkill = "mündlich2"; targetExams = examsDatabase.mündlich2 || []; }
    else if (currentMündlichPart === 3) { targetSkill = "mündlich3"; targetExams = examsDatabase.mündlich3 || []; }
  }
  
  currentExamsList = targetExams;
  if (targetExams.length === 0) {
    container.innerHTML += '<div class="item" style="text-align:center;color:#999;">⚠️ لا توجد امتحانات متاحة حالياً</div>';
    return;
  }
  
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
    titleSpan.textContent = skill === "tips" ? exam.title : `${exam.id}: ${exam.title}`;
    div.appendChild(titleSpan);
    displaySavedResult(targetSkill, exam.id, titleSpan);
    
    if (!isPremium && !isFreeExam && targetSkill !== "mündlich1" && targetSkill !== "mündlich3") {
      div.style.backgroundColor = "rgba(255,255,255,0.75)";
      div.style.border = "1px solid #e2e8f0";
      div.style.cursor = "pointer";
      const premiumSpan = document.createElement("span");
      premiumSpan.className = "premium-badge";
      premiumSpan.innerHTML = "Premium";
      premiumSpan.style.cssText = "font-size:10px;background:#3b82f6;color:white;padding:2px 8px;border-radius:20px;margin-left:10px";
      div.appendChild(premiumSpan);
      div.onclick = (function(title, id) {
        return function() { showLockedMessage(title + " (" + id + ")"); };
      })(exam.title, exam.id);
    } else if (exam.hasFile) {
      div.onclick = (function(id, title, skillPath) {
        return function() { openExam(id, title, skillPath || targetSkill); };
      })(exam.id, exam.title, exam.skillPath || targetSkill);
    } else {
      div.style.opacity = "0.6";
      div.onclick = () => alert(`⚠️ الامتحان رقم ${exam.id} سيتم إضافته قريباً.`);
    }
    container.appendChild(div);
  }
  setTimeout(setupLockedNextButton, 100);
}

function setupLockedNextButton() {
  const nextBtn = document.getElementById('nextExamBtn');
  if (!nextBtn) return;
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
          lockIcon.style.cssText = 'position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;color:#ef4444;';
          nextBtn.appendChild(lockIcon);
        }
        nextBtn.style.backgroundColor = "#b0bec5";
        nextBtn.style.opacity = "0.8";
        nextBtn.onclick = function(e) { e.preventDefault(); showLockedMessage(nextExam.title + " (" + nextExamId + ")"); return false; };
      } else if (isPremium || nextExamId <= 6) {
        const lockIcon = nextBtn.querySelector('.next-lock-icon');
        if (lockIcon) lockIcon.remove();
        nextBtn.style.backgroundColor = "";
        nextBtn.style.opacity = "1";
        nextBtn.style.paddingLeft = "";
        nextBtn.onclick = () => openExam(nextExam.id, nextExam.title, nextExam.skillPath || currentSkill);
      }
    }
  });
}

async function openExam(examId, examTitle, skill) {
  const userStatus = await getUserStatusForExam();
  const isPremium = (userStatus === 'premium');
  const maxFreeExamId = 6;
  
  if (!isPremium && examId > maxFreeExamId && skill !== "mündlich1" && skill !== "mündlich3") {
    showLockedMessage(examTitle + " (" + examId + ")");
    return;
  }
  
  console.log("🔍 openExam parameters:", { examId, examTitle, skill });
  
  currentExamId = examId;
  currentSkill = skill;
  
  if (shouldHideHelpButton(skill)) {
    const helpBtn = document.getElementById('globalHelpButton');
    if (helpBtn) helpBtn.style.display = "none";
  } else {
    const helpBtn = document.getElementById('globalHelpButton');
    if (helpBtn) helpBtn.style.display = "block";
  }
  
  const fileName = getActualFileName(examId);
  const filePath = `data/${skill}/${fileName}`;
  
  console.log("🟢 فتح الامتحان:", examId, examTitle, skill);
  console.log("📁 اسم الملف:", fileName);
  console.log("📂 المسار الكامل:", filePath);
  
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`❌ فشل تحميل الملف: ${filePath} - Status: ${response.status}`);
      alert(`⚠️ الامتحان "${examTitle}" غير متوفر حالياً.\nالملف المطلوب: ${filePath}`);
      return;
    }
    
    currentExamData = await response.json();
    
    if (!currentExamData) {
      throw new Error("البيانات فارغة");
    }
    
    console.log("✅ تم تحميل البيانات بنجاح:", currentExamData);
    
    window.currentExamId = examId;
    document.getElementById("home").classList.remove("active");
    document.getElementById("list").classList.remove("active");
    document.getElementById("exam").classList.add("active");
    document.getElementById("examTitle").innerHTML = currentExamData.title || examTitle;
    
    updateExamNavButtons();
    
    if (!currentExamData.questions || currentExamData.questions.length === 0) {
      console.warn("⚠️ لا توجد أسئلة في هذا الامتحان");
      const container = document.getElementById("teil1");
      if (container) {
        container.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">⚠️ لا توجد أسئلة في هذا الامتحان</div>';
      }
      showTeil(4);
      return;
    }
    
    // التحقق من صحة كل سؤال
    for (let i = 0; i < currentExamData.questions.length; i++) {
      const q = currentExamData.questions[i];
      if (!q.options || !Array.isArray(q.options)) {
        console.error(`❌ السؤال ${i + 1} لا يحتوي على خيارات صحيحة:`, q);
        q.options = ["الخيار 1", "الخيار 2", "الخيار 3"];
        q.correct = 0;
      }
    }
    
    // عرض الامتحان حسب النوع
    if (currentExamData.type === "matching" || currentExamData.type === "truefalse" || 
        currentExamData.type === "teil2" || currentExamData.type === "teil3" || 
        currentExamData.type === "sprach1" || currentExamData.type === "sprach2" || 
        currentExamData.type === "schreiben") {
      buildTeil1(currentExamData.questions || []);
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
    showTeil(teilIndex !== -1 ? teilIndex + 1 : 10);
    
  } catch(e) {
    console.error("❌ خطأ في تحميل الامتحان:", e);
    alert("خطأ في تحميل الامتحان: " + e.message + "\n\nتأكد من وجود ملفات JSON في مجلد data/" + skill + "/");
  }
}

function updateExamNavButtons() {
  const prevBtn = document.getElementById("prevExamBtn");
  const nextBtn = document.getElementById("nextExamBtn");
  if (!prevBtn || !nextBtn) return;
  const currentIndex = currentExamsList.findIndex(e => e.id === currentExamId);
  if (currentIndex > 0) {
    prevBtn.style.display = "inline-block";
    prevBtn.onclick = () => openExam(currentExamsList[currentIndex - 1].id, currentExamsList[currentIndex - 1].title, currentExamsList[currentIndex - 1].skillPath || currentSkill);
  } else { prevBtn.style.display = "none"; }
  if (currentIndex < currentExamsList.length - 1) {
    nextBtn.style.display = "inline-block";
    nextBtn.onclick = () => openExam(currentExamsList[currentIndex + 1].id, currentExamsList[currentIndex + 1].title, currentExamsList[currentIndex + 1].skillPath || currentSkill);
  } else { nextBtn.style.display = "none"; }
  setupLockedNextButton();
}

function showTeil(teilNumber) {
  teile.forEach((teil, idx) => {
    const container = document.getElementById(teil.container);
    if (container) container.style.display = (idx + 1 === teilNumber) ? "block" : "none";
  });
}

function goBackToExamsList() {
  if (currentSkill) {
    if (currentSkill.startsWith('mündlich')) {
      renderExamListForSkill('mündlich', getTeilNameBySkill('mündlich'));
    } else {
      const teil = teile.find(t => t.skill === currentSkill);
      if (teil) renderExamListForSkill(teil.skill, teil.name);
      else goList();
    }
  } else { goList(); }
  document.getElementById("home").classList.remove("active");
  document.getElementById("exam").classList.remove("active");
  document.getElementById("list").classList.add("active");
}

function renderInfoExam(examData) {
  const container = document.getElementById(currentSkill === "mündlich1" || currentSkill === "mündlich3" ? "mündlich" : currentSkill);
  if (!container) return;
  container.innerHTML = "<div style='padding:20px;text-align:center'>⚠️ محتوى المعلومات غير متوفر حالياً</div>";
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
    card.style.cssText = `background:#f8f9fa;border-radius:16px;padding:20px;margin-bottom:20px;border-right:4px solid #28a745;box-shadow:0 2px 8px rgba(0,0,0,0.05);font-size:16px;line-height:1.7;color:#333;white-space:pre-wrap;`;
    let formattedText = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^(.*?):/gm, '<strong>$1:</strong>');
    card.innerHTML = formattedText;
    container.appendChild(card);
  }
}

function renderMündlichExam(examData) {
  const container = document.getElementById("mündlich");
  if (!container) return;
  container.innerHTML = "";
  const parts = examData.parts || {};
  const allgemeinCard = createMündlichCard("📖 الفكرة العامة", parts.allgemein || "لا يوجد نص");
  const meinungCard = createMündlichCard("💭 الرأي", parts.meinung || "لا يوجد نص");
  const erfahrungCard = createMündlichCard("✨ التجربة", parts.erfahrung || "لا يوجد نص");
  container.appendChild(allgemeinCard);
  container.appendChild(meinungCard);
  container.appendChild(erfahrungCard);
}

function createMündlichCard(title, text) {
  const card = document.createElement("div");
  card.style.cssText = `background:#f8f9fa;border-radius:16px;padding:20px;margin-bottom:20px;border:1px solid #e0e0e0;`;
  const titleDiv = document.createElement("div");
  titleDiv.style.cssText = `font-size:18px;font-weight:bold;color:#2c3e66;border-right:4px solid #007bff;padding-right:12px;margin-bottom:15px;`;
  titleDiv.innerHTML = title;
  card.appendChild(titleDiv);
  const textDiv = document.createElement("div");
  textDiv.style.cssText = `font-size:15px;line-height:1.6;color:#333;white-space:pre-wrap;`;
  textDiv.innerHTML = text;
  card.appendChild(textDiv);
  return card;
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
  const examsContainer = document.getElementById("examsList");
  if (examsContainer) examsContainer.innerHTML = '<div class="welcome-message">👈 اختر القسم (Teil) من الأعلى لعرض الامتحانات</div>';
}

// ========== تهيئة الصفحة ==========
document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("startBtn");
  const backHomeBtn = document.getElementById("backHomeBtn");
  const backToListBtn = document.getElementById("backToListBtn");
  const backArrowFromExam = document.getElementById("backArrowFromExam");
  
  if (startBtn) {
    startBtn.onclick = function() { 
      console.log("🟢 تم الضغط على زر اكتشف الامتحانات");
      goList();
    };
  } else {
    console.log("⚠️ startBtn غير موجود في الصفحة");
  }
  
  if (backHomeBtn) backHomeBtn.onclick = function() { goHome(); };
  if (backToListBtn) backToListBtn.onclick = function() { goList(); };
  if (backArrowFromExam) backArrowFromExam.onclick = function() { goBackToExamsList(); };
  
  const examsContainer = document.getElementById("examsList");
  if (examsContainer) {
    examsContainer.innerHTML = '<div class="welcome-message">👈 اختر القسم (Teil) من الأعلى لعرض الامتحانات</div>';
  }
});

renderTeileList();

console.log("✅ exams.js تم تحميله بنجاح مع دعم المراجعة مع صديق");
