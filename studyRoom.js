// ============================================
// studyRoom.js - نظام المراجعة مع صديق
// مع Presence, Live Events والمزامنة المباشرة
// النسخة النهائية - 2025
// ============================================

(function() {
    "use strict";
    
    // ========== متغيرات الحالة ==========
    let currentRoomId = null;
    let currentUserName = null;
    let currentUserEmail = null;
    let isInRoom = false;
    let roomListener = null;
    let activityInterval = null;
    let roomReady = false;
    let otherUserReady = false;
    
    // ========== عناصر واجهة المستخدم ==========
    let roomModal = null;
    
    // ========== دالة لتشفير البريد الإلكتروني ==========
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
        const self = participants[currentUserEmail];
        const other = Object.values(participants).find(p => p.email !== currentUserEmail);
        
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
        
        const readyStatus = document.getElementById('roomReadyStatus');
        if (readyStatus) {
            if (roomReady && otherUserReady) {
                readyStatus.innerHTML = '✅ جاهزين! ابدؤوا المراجعة';
                readyStatus.style.color = '#4caf50';
            } else if (roomReady) {
                readyStatus.innerHTML = '⏳ في انتظار تجهيز الصديق...';
                readyStatus.style.color = '#ff9800';
            } else {
                readyStatus.innerHTML = '🎮 اضغط "جاهز" لبدء المراجعة';
                readyStatus.style.color = '#2196f3';
            }
        }
        
        const startBtn = document.getElementById('startReviewBtn');
        if (startBtn) {
            startBtn.style.display = (roomReady && otherUserReady) ? 'block' : 'none';
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
                        <div id="createdRoomCode" class="room-code-display" style="display:none;">
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
                        <input type="text" id="roomCodeInput" class="room-input" placeholder="مثال: AB-CD1234" maxlength="10">
                        <button id="joinRoomBtn" class="room-btn-primary">🔗 انضم إلى الغرفة</button>
                        <div id="joinError" class="room-error" style="display:none;"></div>
                    </div>
                    <div id="roomStatus" class="room-status" style="display:none;">
                        <div class="room-status-header">
                            <span class="room-status-icon">🟢</span>
                            <span class="room-status-text">متصل</span>
                        </div>
                        <div class="room-participants">
                            <div class="participant-item">
                                <span class="participant-icon">👤</span>
                                <span class="participant-name" id="selfName">أنت</span>
                                <span class="participant-answers" id="selfAnswers">0</span>
                            </div>
                            <div class="participant-item">
                                <span class="participant-icon">👤</span>
                                <span class="participant-name" id="otherName">في انتظار صديق...</span>
                                <span class="participant-answers" id="otherAnswers">0</span>
                            </div>
                        </div>
                        <button id="roomReadyBtn" class="room-ready-btn">✅ أنا جاهز</button>
                        <button id="leaveRoomBtn" class="room-leave-btn">🚪 مغادرة الغرفة</button>
                    </div>
                </div>
                <div class="room-modal-footer">💡 سيتم حذف الغرفة تلقائياً بعد مغادرة الطرفين</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-room-modal').onclick = () => closeRoomModal();
        modal.onclick = (e) => { if(e.target === modal) closeRoomModal(); };
        
        document.querySelectorAll('.room-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.room-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.room-tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(`${tab.dataset.tab}RoomTab`).classList.add('active');
            };
        });
        
        document.getElementById('createRoomBtn').onclick = () => createNewRoom();
        document.getElementById('joinRoomBtn').onclick = () => joinRoom();
        document.getElementById('copyRoomCodeBtn').onclick = () => copyRoomCode();
        document.getElementById('leaveRoomBtn').onclick = () => leaveRoom();
        document.getElementById('roomReadyBtn').onclick = () => setUserReady();
        
        return modal;
    }
    
    function closeRoomModal() {
        const modal = document.getElementById('roomModal');
        if(modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
    }
    
    function openRoomModal() {
        let modal = document.getElementById('roomModal');
        if(!modal) modal = createRoomModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.getElementById('roomCodeInput').value = '';
        document.getElementById('joinError').style.display = 'none';
        document.getElementById('createdRoomCode').style.display = 'none';
        document.getElementById('createRoomBtn').style.display = 'block';
        document.querySelector('.room-tabs').style.display = 'flex';
        document.querySelectorAll('.room-tab-content').forEach(c => c.style.display = 'block');
        document.getElementById('roomStatus').style.display = 'none';
        roomReady = false;
        otherUserReady = false;
    }
    
    async function setUserReady() {
        if(!currentRoomId || !currentUserEmail) return;
        roomReady = true;
        const btn = document.getElementById('roomReadyBtn');
        if(btn) { btn.textContent = '✅ جاهز!'; btn.disabled = true; btn.style.opacity = '0.6'; }
        await window.db.ref(`studyRooms/${currentRoomId}/participants/${currentUserEmail}/ready`).set(true);
    }
    
    async function createNewRoom() {
        if(!window.firebaseInitialized || !window.db) { alert("⚠️ Firebase غير جاهز"); return; }
        
        const roomCode = generateRoomCode();
        const userName = getUserName();
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        
        currentUserName = userName;
        currentUserEmail = userEmail;
        currentRoomId = roomCode;
        roomReady = false;
        
        const roomData = {
            code: roomCode, createdAt: Date.now(), lastActivity: Date.now(),
            participants: { [userEmail]: { name: userName, email: userEmail, joinedAt: Date.now(), answers: {}, answersCount: 0, ready: false, currentQuestion: null } },
            isActive: true
        };
        
        try {
            await window.db.ref(`studyRooms/${roomCode}`).set(roomData);
            document.getElementById('createdRoomCode').style.display = 'block';
            document.getElementById('roomCodeValue').textContent = roomCode;
            document.getElementById('createRoomBtn').style.display = 'none';
            document.querySelector('.room-tabs').style.display = 'none';
            document.querySelectorAll('.room-tab-content').forEach(c => c.style.display = 'none');
            document.getElementById('roomStatus').style.display = 'block';
            document.getElementById('selfName').textContent = userName;
            startRoomMonitor();
        } catch(e) { console.error(e); alert("حدث خطأ: " + e.message); }
    }
    
    async function joinRoom() {
        const roomCode = document.getElementById('roomCodeInput').value.trim().toUpperCase();
        const errorDiv = document.getElementById('joinError');
        if(!roomCode) { errorDiv.textContent = "الرجاء إدخال رمز الغرفة"; errorDiv.style.display = 'block'; return; }
        if(!window.firebaseInitialized || !window.db) { errorDiv.textContent = "⚠️ Firebase غير جاهز"; errorDiv.style.display = 'block'; return; }
        
        try {
            const snapshot = await window.db.ref(`studyRooms/${roomCode}`).once('value');
            const room = snapshot.val();
            if(!room) { errorDiv.textContent = "❌ الغرفة غير موجودة"; errorDiv.style.display = 'block'; return; }
            if(Object.keys(room.participants || {}).length >= 2) { errorDiv.textContent = "❌ الغرفة ممتلئة"; errorDiv.style.display = 'block'; return; }
            
            const userName = getUserName();
            let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
            userEmail = encodeEmail(userEmail);
            
            currentUserName = userName;
            currentUserEmail = userEmail;
            currentRoomId = roomCode;
            
            await window.db.ref(`studyRooms/${roomCode}/participants/${userEmail}`).set({ name: userName, email: userEmail, joinedAt: Date.now(), answers: {}, answersCount: 0, ready: false, currentQuestion: null });
            await window.db.ref(`studyRooms/${roomCode}/lastActivity`).set(Date.now());
            
            document.querySelector('.room-tabs').style.display = 'none';
            document.querySelectorAll('.room-tab-content').forEach(c => c.style.display = 'none');
            document.getElementById('roomStatus').style.display = 'block';
            document.getElementById('selfName').textContent = userName;
            startRoomMonitor();
        } catch(e) { errorDiv.textContent = "حدث خطأ"; errorDiv.style.display = 'block'; }
    }
    
    function startRoomMonitor() {
        if(!currentRoomId) return;
        if(activityInterval) clearInterval(activityInterval);
        activityInterval = setInterval(() => {
            if(currentRoomId && isInRoom) window.db.ref(`studyRooms/${currentRoomId}/lastActivity`).set(Date.now());
        }, 30000);
        
        if(roomListener) roomListener.off();
        roomListener = window.db.ref(`studyRooms/${currentRoomId}`).on('value', (snapshot) => {
            const room = snapshot.val();
            if(!room) { handleRoomDeleted(); return; }
            isInRoom = true;
            
            const participants = room.participants || {};
            otherUserReady = false;
            for(const email in participants) {
                if(email !== currentUserEmail && participants[email].ready === true) otherUserReady = true;
            }
            
            updateRoomUI(room);
            updateRoomStatusBar(room);
            if(typeof window.updateRoomScore === 'function') setTimeout(window.updateRoomScore, 50);
        });
    }
    
    function updateRoomUI(room) {
        const participants = room.participants || {};
        const self = participants[currentUserEmail];
        const other = Object.values(participants).find(p => p.email !== currentUserEmail);
        
        document.getElementById('selfName') && (document.getElementById('selfName').textContent = self?.name || 'أنت');
        document.getElementById('selfAnswers') && (document.getElementById('selfAnswers').textContent = self?.answersCount || 0);
        document.getElementById('otherName') && (document.getElementById('otherName').textContent = other?.name || 'في انتظار صديق...');
        document.getElementById('otherAnswers') && (document.getElementById('otherAnswers').textContent = other?.answersCount || 0);
    }
    
    function handleRoomDeleted() {
        isInRoom = false;
        if(activityInterval) clearInterval(activityInterval);
        if(roomListener) roomListener.off();
        hideRoomStatusBar();
        alert("🔚 تم حذف الغرفة لأن الطرف الآخر غادر.");
        resetRoomState();
        closeRoomModal();
    }
    
    async function leaveRoom() {
        if(!currentRoomId) return;
        try {
            await window.db.ref(`studyRooms/${currentRoomId}/participants/${currentUserEmail}`).remove();
            const snapshot = await window.db.ref(`studyRooms/${currentRoomId}/participants`).once('value');
            if(snapshot.numChildren() === 0) await window.db.ref(`studyRooms/${currentRoomId}`).remove();
        } catch(e) { console.error(e); }
        resetRoomState();
        closeRoomModal();
        hideRoomStatusBar();
    }
    
    function resetRoomState() {
        if(activityInterval) clearInterval(activityInterval);
        if(roomListener) roomListener?.off();
        currentRoomId = null; isInRoom = false; roomReady = false; otherUserReady = false;
        currentUserEmail = null; currentUserName = null;
        hideRoomStatusBar();
    }
    
    function copyRoomCode() {
        const code = document.getElementById('roomCodeValue').textContent;
        navigator.clipboard.writeText(code);
        const btn = document.getElementById('copyRoomCodeBtn');
        const original = btn.innerHTML;
        btn.innerHTML = '✅ تم النسخ!';
        setTimeout(() => btn.innerHTML = original, 2000);
    }
    
    // ========== نظام المزامنة والـ Presence ==========
    
    async function syncAnswer(questionIndex, selectedAnswer, isCorrect) {
        if(!currentRoomId || !isInRoom) return;
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/answers/${questionIndex}`).set({ answer: selectedAnswer, isCorrect: isCorrect, timestamp: Date.now() });
        const snapshot = await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/answers`).once('value');
        await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/answersCount`).set(snapshot.numChildren());
        if(typeof window.updateRoomScore === 'function') setTimeout(window.updateRoomScore, 100);
    }
    
    function getOtherAnswer(questionIndex, callback) {
        if(!currentRoomId || !isInRoom) return () => {};
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        const listener = window.db.ref(`studyRooms/${currentRoomId}/participants`).on('value', (snapshot) => {
            const participants = snapshot.val() || {};
            for(const email in participants) {
                if(email !== userEmail) {
                    const answers = participants[email].answers || {};
                    if(answers[questionIndex]) callback(answers[questionIndex].answer);
                    break;
                }
            }
        });
        return () => window.db.ref(`studyRooms/${currentRoomId}/participants`).off('value', listener);
    }
    
    async function updateCurrentQuestion(questionIndex) {
        if (!currentRoomId || !isInRoom) return;
        let userEmail = localStorage.getItem('zertiva_email') || 'guest_' + Date.now();
        userEmail = encodeEmail(userEmail);
        await window.db.ref(`studyRooms/${currentRoomId}/participants/${userEmail}/currentQuestion`).set({
            index: questionIndex,
            timestamp: Date.now()
        });
        console.log(`📍 [Presence] أنا الآن في السؤال ${questionIndex + 1}`);
    }
    
    async function sendAnswerEvent(questionIndex, answerText, isCorrect) {
        if (!currentRoomId || !isInRoom) return;
        const eventData = {
            userId: currentUserEmail,
            userName: currentUserName,
            type: "answer",
            questionIndex: questionIndex,
            answer: answerText,
            isCorrect: isCorrect,
            timestamp: Date.now()
        };
        const eventRef = window.db.ref(`studyRooms/${currentRoomId}/liveEvents/${Date.now()}`);
        await eventRef.set(eventData);
        setTimeout(async () => { await eventRef.remove(); }, 3000);
        console.log(`⚡ [Event] ${currentUserName} أجاب على السؤال ${questionIndex + 1}`);
    }
    
    function listenToFriendLiveEvents(callback) {
        if (!currentRoomId || !isInRoom) return () => {};
        const eventsRef = window.db.ref(`studyRooms/${currentRoomId}/liveEvents`);
        const listener = eventsRef.on('child_added', (snapshot) => {
            const event = snapshot.val();
            if (event && event.userId !== currentUserEmail) callback(event);
        });
        return () => eventsRef.off('child_added', listener);
    }
    
    function listenToFriendCurrentQuestion(callback) {
        if (!currentRoomId || !isInRoom) return () => {};
        const participantsRef = window.db.ref(`studyRooms/${currentRoomId}/participants`);
        const listener = participantsRef.on('value', (snapshot) => {
            const participants = snapshot.val() || {};
            for (const email in participants) {
                if (email !== currentUserEmail) {
                    const currentQ = participants[email].currentQuestion;
                    if (currentQ) {
                        callback({
                            userName: participants[email].name,
                            questionIndex: currentQ.index
                        });
                    }
                    break;
                }
            }
        });
        return () => participantsRef.off('value', listener);
    }
    
    function startReview() {
        if(roomReady && otherUserReady) {
            closeRoomModal();
            alert("🎉 بدء المراجعة! الآن يمكنكما البدء في حل الامتحانات معاً.");
        } else {
            alert("⚠️ الرجاء الانتظار حتى يصبح الطرفان جاهزين.");
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
    
    // ========== ربط زر المغادرة في الشريط ==========
    function bindLeaveBarButton() {
        const leaveBtn = document.getElementById('leaveRoomBarBtn');
        if (leaveBtn) {
            leaveBtn.onclick = () => leaveRoom();
        }
    }
    
    window.updateRoomScore = async function() {
        if(!currentRoomId || !isInRoom) return;
        try {
            const myScore = (await window.db.ref(`studyRooms/${currentRoomId}/participants/${currentUserEmail}/answersCount`).once('value')).val() || 0;
            const participants = (await window.db.ref(`studyRooms/${currentRoomId}/participants`).once('value')).val() || {};
            let otherScore = 0;
            for(const email in participants) if(email !== currentUserEmail) otherScore = participants[email].answersCount || 0;
            document.getElementById('player1Score') && (document.getElementById('player1Score').textContent = myScore);
            document.getElementById('player2Score') && (document.getElementById('player2Score').textContent = otherScore);
        } catch(e) { console.error(e); }
    };
    
    window.StudyRoom = {
        syncAnswer: syncAnswer,
        getOtherAnswer: getOtherAnswer,
        isInRoom: () => isInRoom,
        getRoomId: () => currentRoomId,
        updateCurrentQuestion: updateCurrentQuestion,
        sendAnswerEvent: sendAnswerEvent,
        listenToFriendLiveEvents: listenToFriendLiveEvents,
        listenToFriendCurrentQuestion: listenToFriendCurrentQuestion,
        startReview: startReview
    };
    
    document.addEventListener('click', (e) => { if(e.target && e.target.id === 'startReviewBtn') startReview(); });
    
    // ========== التهيئة ==========
    function init() {
        if (typeof firebase === 'undefined') {
            setTimeout(init, 500);
            return;
        }
        addRoomButtons();
        bindLeaveBarButton();
        console.log("👥 نظام المراجعة مع صديق جاهز مع Presence و Events");
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }
    
})();
