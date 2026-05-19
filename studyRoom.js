// ============================================
// studyRoom.js - نظام المراجعة مع صديق
// مزامنة مباشرة وخفيفة للإجابات مع شريط علوي ثابت
// ============================================

(function() {
    "use strict";
    
    // ========== متغيرات الحالة ==========
    let currentRoomId = null;
    let currentUserName = null;
    let currentUserEmail = null;
    let isInRoom = false;
    let roomListener = null;
    let answerListener = null;
    let lastActivityTime = Date.now();
    let activityInterval = null;
    
    // ========== عناصر واجهة المستخدم ==========
    let roomModal = null;
    
    // ========== دالة لتشفير البريد الإلكتروني (إزالة الرموز غير المسموحة في Firebase) ==========
    function encodeEmail(email) {
        if (!email) return 'guest_' + Date.now();
        return email.replace(/\./g, '_DOT_').replace(/@/g, '_AT_').replace(/#/g, '_HASH_').replace(/\$/g, '_DLR_').replace(/\//g, '_SLH_').replace(/\[/g, '_LBR_').replace(/\]/g, '_RBR_');
    }
    
    // ========== توليد رمز غرفة عشوائي ==========
    function generateRoomCode() {
        const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const numbers = '0123456789';
        const part1 = letters.charAt(Math.floor(Math.random() * letters.length));
        const part2 = letters.charAt(Math.floor(Math.random() * letters.length));
        const part3 = letters.charAt(Math.floor(Math.random() * letters.length));
        const part4 = numbers.charAt(Math.floor(Math.random() * numbers.length));
        const part5 = numbers.charAt(Math.floor(Math.random() * numbers.length));
        const part6 = numbers.charAt(Math.floor(Math.random() * numbers.length));
        return `${part1}${part2}-${part3}${part4}${part5}${part6}`;
    }
    
    // ========== الحصول على اسم المستخدم ==========
    function getUserName() {
        let email = localStorage.getItem('zertiva_email');
        if (email) {
            return email.split('@')[0];
        }
        return 'زائر';
    }
    
    // ========== إخفاء شريط الغرفة ==========
    function hideRoomStatusBar() {
        const bar = document.getElementById('roomStatusBar');
        if (bar) bar.style.display = 'none';
    }
    
    // ========== تحديث شريط الغرفة العلوي ==========
    function updateRoomStatusBar(room) {
        const bar = document.getElementById('roomStatusBar');
        if (!bar) return;
        
        const participants = room.participants || {};
        const participantsList = Object.values(participants);
        const self = participants[currentUserEmail];
        const other = participantsList.find(p => p.email !== currentUserEmail);
        
        bar.style.display = 'block';
        
        const codeSpan = document.getElementById('roomStatusCode');
        if (codeSpan) codeSpan.textContent = currentRoomId;
        
        const player1Name = document.getElementById('player1Name');
        const player1Score = document.getElementById('player1Score');
        if (player1Name) player1Name.textContent = self?.name || 'أنت';
        if (player1Score) player1Score.textContent = self?.answersCount || 0;
        
        const player2Name = document.getElementById('player2Name');
        const player2Score = document.getElementById('player2Score');
        if (other) {
            player2Name.textContent = other.name;
            player2Score.textContent = other.answersCount || 0;
        } else {
            player2Name.textContent = 'في انتظار صديق...';
            player2Score.textContent = '0';
        }
    }
    
    // ========== إنشاء نافذة الغرفة ==========
    function createRoomModal() {
        if (document.getElementById('roomModal')) return;
        
        const modal = document.createElement('div');
        modal.id = 'roomModal';
        modal.className = 'room-modal-overlay';
        modal.innerHTML = `
            <div class="room-modal-container">
                <div class="room-modal-header">
                    <h3>👥 المراجعة مع صديق</h3>
                    <button class="close-room-modal">✕</button>
                </div>
                <div class="room-modal-body">
                    <div class="room-tabs">
                        <button class="room-tab active" data-tab="create">🌟 إنشاء غرفة</button>
                        <button class="room-tab" data-tab="join">🔗 انضم إلى غرفة</button>
                    </div>
                    
                    <div class="room-tab-content active" id="createRoomTab">
                        <div class="room-info">
                            <div class="room-icon">🏠</div>
                            <div class="room-text">أنشئ غرفة جديدة وادعُ صديقك للمراجعة معاً</div>
                        </div>
                        <button id="createRoomBtn" class="room-btn-primary">🌟 إنشاء غرفة جديدة</button>
                        <div id="createdRoomCode" class="room-code-display" style="display: none;">
                            <div class="room-code-label">رمز الغرفة:</div>
                            <div class="room-code-value" id="roomCodeValue"></div>
                            <button id="copyRoomCodeBtn" class="room-copy-btn">📋 نسخ الرمز</button>
                        </div>
                    </div>
                    
                    <div class="room-tab-content" id="joinRoomTab">
                        <div class="room-info">
                            <div class="room-icon">🤝</div>
                            <div class="room-text">أدخل رمز الغرفة للانضمام إلى صديقك</div>
                        </div>
                        <input type="text" id="roomCodeInput" class="room-input" placeholder="مثال: B2-4721" maxlength="10">
                        <button id="joinRoomBtn" class="room-btn-primary">🔗 انضم إلى الغرفة</button>
                        <div id="joinError" class="room-error" style="display: none;"></div>
                    </div>
                    
                    <div id="roomStatus" class="room-status" style="display: none;">
                        <div class="room-status-header">
                            <span class="room-status-icon">🟢</span>
                            <span class="room-status-text">متصل</span>
                        </div>
                        <div class="room-participants">
                            <div class="participant-item" id="participantSelf">
                                <span class="participant-icon">👤</span>
                                <span class="participant-name" id="selfName">أنت</span>
                                <span class="participant-answers" id="selfAnswers">0</span>
                            </div>
                            <div class="participant-item" id="participantOther">
                                <span class="participant-icon">👤</span>
                                <span class="participant-name" id="otherName">في انتظار صديق...</span>
                                <span class="participant-answers" id="otherAnswers">0</span>
                            </div>
                        </div>
                        <div class="room-actions">
                            <button id="leaveRoomBtn" class="room-leave-btn">🚪 مغادرة الغرفة</button>
                        </div>
                    </div>
                </div>
                <div class="room-modal-footer">
                    💡 سيتم حذف الغرفة تلقائياً بعد مغادرة الطرفين
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.close-room-modal');
        closeBtn.addEventListener('click', () => closeRoomModal());
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeRoomModal();
        });
        
        const tabs = modal.querySelectorAll('.room-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.room-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(`${tabId}RoomTab`).classList.add('active');
            });
        });
        
        const createBtn = document.getElementById('createRoomBtn');
        const joinBtn = document.getElementById('joinRoomBtn');
        const copyBtn = document.getElementById('copyRoomCodeBtn');
        const leaveBtn = document.getElementById('leaveRoomBtn');
        
        if (createBtn) createBtn.addEventListener('click', () => createNewRoom());
        if (joinBtn) joinBtn.addEventListener('click', () => joinRoom());
        if (copyBtn) copyBtn.addEventListener('click', () => copyRoomCode());
        if (leaveBtn) leaveBtn.addEventListener('click', () => leaveRoom());
        
        return modal;
    }
    
    function closeRoomModal() {
        const modal = document.getElementById('roomModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function openRoomModal() {
        let modal = document.getElementById('roomModal');
        if (!modal) {
            modal = createRoomModal();
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        document.getElementById('roomCodeInput').value = '';
        document.getElementById('joinError').style.display = 'none';
        document.getElementById('createdRoomCode').style.display = 'none';
        document.getElementById('createRoomBtn').style.display = 'block';
        
        document.querySelector('.room-tabs').style.display = 'flex';
        document.querySelectorAll('.room-tab-content').forEach(content => {
            content.style.display = 'block';
        });
        document.getElementById('roomStatus').style.display = 'none';
        
        const createTab = document.querySelector('.room-tab[data-tab="create"]');
        const joinTab = document.querySelector('.room-tab[data-tab="join"]');
        if (createTab && joinTab) {
            createTab.classList.add('active');
            joinTab.classList.remove('active');
            document.getElementById('createRoomTab').classList.add('active');
            document.getElementById('joinRoomTab').classList.remove('active');
        }
    }
    
    // ========== إنشاء غرفة جديدة ==========
    async function createNewRoom() {
        if (!window.firebaseInitialized || !window.db) {
            alert("⚠️ Firebase غير جاهز. الرجاء المحاولة لاحقاً.");
            return;
        }
        
        const roomCode = generateRoomCode();
        const userName = getUserName();
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        
        currentUserName = userName;
        currentUserEmail = userEmail;
        currentRoomId = roomCode;
        
        const roomData = {
            code: roomCode,
            createdAt: Date.now(),
            lastActivity: Date.now(),
            participants: {
                [userEmail]: {
                    name: userName,
                    email: userEmail,
                    joinedAt: Date.now(),
                    answers: {},
                    answersCount: 0
                }
            },
            currentExam: null,
            currentQuestionIndex: 0,
            isActive: true
        };
        
        try {
            await window.db.ref(`studyRooms/${roomCode}`).set(roomData);
            console.log(`✅ غرفة ${roomCode} تم إنشاؤها بنجاح`);
            
            alert(`✅ تم إنشاء الغرفة بنجاح!\n\n🔑 رمز الغرفة: ${roomCode}\n\n📋 أرسل هذا الرمز لصديقك للانضمام إليك.`);
            
            document.getElementById('createdRoomCode').style.display = 'block';
            document.getElementById('roomCodeValue').textContent = roomCode;
            document.getElementById('createRoomBtn').style.display = 'none';
            
            document.querySelector('.room-tabs').style.display = 'none';
            document.querySelectorAll('.room-tab-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById('roomStatus').style.display = 'block';
            
            const selfNameSpan = document.getElementById('selfName');
            if (selfNameSpan) selfNameSpan.textContent = userName;
            
            startRoomMonitor();
            
        } catch(e) {
            console.error("❌ خطأ في إنشاء الغرفة:", e);
            alert("حدث خطأ في إنشاء الغرفة: " + e.message);
        }
    }
    
    // ========== الانضمام إلى غرفة ==========
    async function joinRoom() {
        const roomCode = document.getElementById('roomCodeInput').value.trim().toUpperCase();
        const errorDiv = document.getElementById('joinError');
        
        if (!roomCode) {
            errorDiv.textContent = "الرجاء إدخال رمز الغرفة";
            errorDiv.style.display = 'block';
            return;
        }
        
        if (!window.firebaseInitialized || !window.db) {
            errorDiv.textContent = "⚠️ Firebase غير جاهز";
            errorDiv.style.display = 'block';
            return;
        }
        
        try {
            const snapshot = await window.db.ref(`studyRooms/${roomCode}`).once('value');
            const room = snapshot.val();
            
            if (!room) {
                errorDiv.textContent = "❌ الغرفة غير موجودة. تأكد من الرمز";
                errorDiv.style.display = 'block';
                return;
            }
            
            const participantsCount = Object.keys(room.participants || {}).length;
            
            if (participantsCount >= 2) {
                errorDiv.textContent = "❌ الغرفة ممتلئة (2/2)";
                errorDiv.style.display = 'block';
                return;
            }
            
            const userName = getUserName();
            let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
            userEmail = encodeEmail(userEmail);
            
            currentUserName = userName;
            currentUserEmail = userEmail;
            currentRoomId = roomCode;
            
            const participantData = {
                name: userName,
                email: userEmail,
                joinedAt: Date.now(),
                answers: {},
                answersCount: 0
            };
            
            await window.db.ref(`studyRooms/${roomCode}/participants/${userEmail}`).set(participantData);
            await window.db.ref(`studyRooms/${roomCode}/lastActivity`).set(Date.now());
            
            console.log(`✅ انضممت إلى الغرفة ${roomCode}`);
            
            alert(`✅ انضممت إلى الغرفة بنجاح!\n\n🔑 رمز الغرفة: ${roomCode}\n\n👥 الآن يمكنكما بدء المراجعة معاً.`);
            
            document.querySelector('.room-tabs').style.display = 'none';
            document.querySelectorAll('.room-tab-content').forEach(content => {
                content.style.display = 'none';
            });
            document.getElementById('roomStatus').style.display = 'block';
            
            const selfNameSpan = document.getElementById('selfName');
            if (selfNameSpan) selfNameSpan.textContent = userName;
            
            startRoomMonitor();
            
        } catch(e) {
            console.error("❌ خطأ في الانضمام:", e);
            errorDiv.textContent = "حدث خطأ، حاول مرة أخرى";
            errorDiv.style.display = 'block';
        }
    }
    
    // ========== بدء مراقبة الغرفة ==========
    function startRoomMonitor() {
        if (!currentRoomId) return;
        
        if (activityInterval) clearInterval(activityInterval);
        activityInterval = setInterval(() => {
            if (currentRoomId && isInRoom) {
                window.db.ref(`studyRooms/${currentRoomId}/lastActivity`).set(Date.now());
            }
        }, 30000);
        
       if (roomListener) roomListener.off();
roomListener = window.db.ref(`studyRooms/${currentRoomId}`).on('value', (snapshot) => {
    const room = snapshot.val();
    if (!room) {
        handleRoomDeleted();
        return;
    }
    
    isInRoom = true;
    updateRoomUI(room);
    updateRoomStatusBar(room);
    
    // تحديث النتيجة في الشريط فوراً
    if (typeof window.updateRoomScore === 'function') {
        setTimeout(window.updateRoomScore, 50);
    }
});
    
    // ========== تحديث واجهة الغرفة ==========
    function updateRoomUI(room) {
        const participants = room.participants || {};
        const participantsList = Object.values(participants);
        const self = participants[currentUserEmail];
        const other = participantsList.find(p => p.email !== currentUserEmail);
        
        const selfNameSpan = document.getElementById('selfName');
        const selfAnswersSpan = document.getElementById('selfAnswers');
        if (selfNameSpan) selfNameSpan.textContent = self?.name || currentUserName || 'أنت';
        if (selfAnswersSpan) selfAnswersSpan.textContent = self?.answersCount || 0;
        
        const otherNameSpan = document.getElementById('otherName');
        const otherAnswersSpan = document.getElementById('otherAnswers');
        if (other) {
            otherNameSpan.textContent = other.name;
            otherAnswersSpan.textContent = other.answersCount || 0;
            document.querySelector('.room-status-icon').textContent = '🟢';
            document.querySelector('.room-status-text').textContent = 'متصل - صديقك معك';
        } else {
            otherNameSpan.textContent = 'في انتظار صديق...';
            otherAnswersSpan.textContent = '0';
            document.querySelector('.room-status-icon').textContent = '🟡';
            document.querySelector('.room-status-text').textContent = 'في انتظار اتصال الصديق';
        }
    }
    
    // ========== معالجة حذف الغرفة ==========
    function handleRoomDeleted() {
        isInRoom = false;
        if (activityInterval) clearInterval(activityInterval);
        if (roomListener) roomListener.off();
        hideRoomStatusBar();
        alert("🔚 تم حذف الغرفة لأن الطرف الآخر غادر.");
        resetRoomState();
        closeRoomModal();
    }
    
    // ========== مغادرة الغرفة ==========
    async function leaveRoom() {
        if (!currentRoomId) return;
        
        try {
            await window.db.ref(`studyRooms/${currentRoomId}/participants/${currentUserEmail}`).remove();
            
            const snapshot = await window.db.ref(`studyRooms/${currentRoomId}/participants`).once('value');
            const remaining = snapshot.numChildren();
            
            if (remaining === 0) {
                await window.db.ref(`studyRooms/${currentRoomId}`).remove();
                console.log(`🗑️ تم حذف الغرفة ${currentRoomId}`);
            }
            
        } catch(e) {
            console.error("خطأ في المغادرة:", e);
        }
        
        resetRoomState();
        closeRoomModal();
        hideRoomStatusBar();
    }
    
    // ========== إعادة تعيين حالة الغرفة ==========
    function resetRoomState() {
        if (activityInterval) clearInterval(activityInterval);
        if (roomListener) roomListener?.off();
        currentRoomId = null;
        isInRoom = false;
        currentUserEmail = null;
        currentUserName = null;
        hideRoomStatusBar();
    }
    
    // ========== نسخ رمز الغرفة ==========
    function copyRoomCode() {
        const code = document.getElementById('roomCodeValue').textContent;
        navigator.clipboard.writeText(code);
        const copyBtn = document.getElementById('copyRoomCodeBtn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✅ تم النسخ!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }
    
    // ========== مزامنة الإجابة (تُستدعى من exams.js) ==========
    async function syncAnswer(questionIndex, selectedAnswer, isCorrect) {
        if (!currentRoomId || !isInRoom) return;
        
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        
        const answerData = {
            answer: selectedAnswer,
            isCorrect: isCorrect,
            timestamp: Date.now(),
            questionIndex: questionIndex
        };
        
        await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/answers/${questionIndex}`).set(answerData);
        
        const snapshot = await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/answers`).once('value');
        const answersCount = snapshot.numChildren();
        await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/answersCount`).set(answersCount);
        
        console.log(`📤 تم مزامنة الإجابة: سؤال ${questionIndex + 1} -> ${selectedAnswer}`);
    }
    
    // ========== الحصول على إجابة الصديق (تُستدعى من exams.js) ==========
    function getOtherAnswer(questionIndex, callback) {
        if (!currentRoomId || !isInRoom) return () => {};
        
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        
        const listener = window.db.ref(`studyRooms/${currentRoomId}/participants`).on('value', (snapshot) => {
            const participants = snapshot.val() || {};
            let otherAnswer = null;
            
            for (const email in participants) {
                if (email !== userEmail) {
                    const answers = participants[email].answers || {};
                    if (answers[questionIndex]) {
                        otherAnswer = answers[questionIndex].answer;
                    }
                    break;
                }
            }
            
            if (callback) callback(otherAnswer);
        });
        
        return () => {
            window.db.ref(`studyRooms/${currentRoomId}/participants`).off('value', listener);
        };
    }
    
    // ========== ربط زر المغادرة في الشريط ==========
    function bindLeaveBarButton() {
        const leaveBtn = document.getElementById('leaveRoomBarBtn');
        if (leaveBtn) {
            leaveBtn.onclick = () => leaveRoom();
        }
    }
    
    // ========== إضافة أزرار الغرفة في صفحة الامتحان ==========
    function addRoomButtons() {
        const nav = document.getElementById('examNavButtons');
        if (!nav) {
            setTimeout(addRoomButtons, 500);
            return;
        }
        
        if (document.getElementById('roomBtn')) return;
        
        const roomBtn = document.createElement('button');
        roomBtn.id = 'roomBtn';
        roomBtn.innerHTML = '👥 مراجعة مع صديق';
        roomBtn.style.cssText = 'background:#2c3e66;color:white;border:none;border-radius:30px;padding:8px 20px;font-size:14px;font-weight:500;cursor:pointer;margin-left:10px';
        roomBtn.onclick = () => openRoomModal();
        nav.appendChild(roomBtn);
        console.log('👥 زر المراجعة مع صديق جاهز');
    }
    
    function init() {
    if (typeof firebase === 'undefined') {
        console.log("⏳ انتظار تحميل Firebase...");
        setTimeout(init, 500);
        return;
    }
    
    addRoomButtons();
    bindLeaveBarButton();
    console.log("👥 نظام المراجعة مع صديق جاهز");
}

// دالة لتحديث النتيجة في الشريط (تُستدعى من exams.js)
window.updateRoomScore = async function() {
    if (!currentRoomId || !isInRoom) return;
    
    try {
        const snapshot = await window.db.ref(`studyRooms/${currentRoomId}/participants/${currentUserEmail}/answersCount`).once('value');
        const myScore = snapshot.val() || 0;
        
        const participantsSnapshot = await window.db.ref(`studyRooms/${currentRoomId}/participants`).once('value');
        const participants = participantsSnapshot.val() || {};
        let otherScore = 0;
        
        for (const email in participants) {
            if (email !== currentUserEmail) {
                otherScore = participants[email].answersCount || 0;
                break;
            }
        }
        
        const myScoreSpan = document.getElementById('player1Score');
        const otherScoreSpan = document.getElementById('player2Score');
        if (myScoreSpan) myScoreSpan.textContent = myScore;
        if (otherScoreSpan) otherScoreSpan.textContent = otherScore;
        
    } catch(e) {
        console.error("خطأ في تحديث النتيجة:", e);
    }
};

// تصدير الدوال
window.StudyRoom = {
    syncAnswer: syncAnswer,
    getOtherAnswer: getOtherAnswer,
    isInRoom: () => isInRoom,
    getRoomId: () => currentRoomId
};

// بدء التشغيل
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    setTimeout(init, 500);
}

)();  // إغلاق الـ IIFE
