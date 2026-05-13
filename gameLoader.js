// ============================================
// gameLoader.js - تحميل لعبة التحدي السريع
// ============================================

console.log("✅ gameLoader.js تم تحميله");

function addGameButtonToExam() {
    const nav = document.getElementById('examNavButtons');
    if (!nav) {
        setTimeout(addGameButtonToExam, 500);
        return;
    }
    
    if (document.getElementById('globalGameButton')) return;
    
    const gameBtn = document.createElement('button');
    gameBtn.id = 'globalGameButton';
    gameBtn.textContent = '⚡ التحدي السريع';
    gameBtn.style.cssText = 'background:linear-gradient(135deg,#ff9800,#e65100);color:white;border:none;border-radius:30px;padding:8px 20px;font-size:14px;font-weight:bold;cursor:pointer;margin-left:10px;box-shadow:0 2px 5px rgba(0,0,0,0.2);transition:all 0.3s';
    gameBtn.onmouseenter = () => { gameBtn.style.transform = 'scale(1.02)'; };
    gameBtn.onmouseleave = () => { gameBtn.style.transform = 'scale(1)'; };
    gameBtn.onclick = (e) => {
        e.stopPropagation();
        const examId = getCurrentExamId ? getCurrentExamId() : window.currentExamId;
        if (typeof window.startRapidMatch === 'function') {
            window.startRapidMatch(examId);
        } else {
            console.error('❌ لعبة التحدي السريع غير متاحة');
            alert('اللعبة غير جاهزة بعد... تأكد من وجود الملفات');
        }
    };
    nav.appendChild(gameBtn);
    console.log("🎮 زر التحدي السريع تمت إضافته");
}

// انتظر تحميل الصفحة ثم أضف الزر
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGameButtonToExam);
} else {
    addGameButtonToExam();
}