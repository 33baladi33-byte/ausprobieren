// teamSession.js - نظام الجلسات الجماعية باستخدام Firebase

let currentRoom = null;
let isLeader = false;
let teamMembers = [];
let currentSessionRef = null;
let userId = null;

let sessionState = {
    currentExam: null,
    currentQuestion: 0,
    selectedAnswers: {},
    showCorrection: false,
    finalScore: null,
    leaderId: null
};

function getUserId() {
    if(userId) return userId;
    
    let email = localStorage.getItem('zertiva_email');
    if(email) {
        userId = email.replace(/[^a-zA-Z0-9]/g, '_');
    } else {
        userId = 'guest_' + Date.now();
    }
    return userId;
}

function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let code = 'ZB2-';
    for(let i = 0; i < 4; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

async function createTeamRoom() {
    const roomCode = generateRoomCode();
    currentRoom = roomCode;
    isLeader = true;
    
    const userId = getUserId();
    const userName = localStorage.getItem('zertiva_email')?.split('@')[0] || 'زائر';
    
    currentSessionRef = window.firebaseDB.ref(`teamSessions/${roomCode}`);
    
    await currentSessionRef.set({
        leaderId: userId,
        createdAt: Date.now(),
        members: {
            [userId]: {
                name: userName,
                online: true,
                joinedAt: Date.now()
            }
        },
        state: {
            currentExam: null,
            currentQuestion: 0,
            selectedAnswers: {},
            showCorrection: false,
            finalScore: null
        }
    });
    
    listenToRoomChanges();
    showTeamInterface();
    return roomCode;
}

async function joinTeamRoom(roomCode) {
    currentRoom = roomCode;
    isLeader = false;
    
    const userId = getUserId();
    const userName = localStorage.getItem('zertiva_email')?.split('@')[0] || 'زائر';
    
    currentSessionRef = window.firebaseDB.ref(`teamSessions/${roomCode}`);
    
    await currentSessionRef.child(`members/${userId}`).set({
        name: userName,
        online: true,
        joinedAt: Date.now()
    });
    
    listenToRoomChanges();
    showTeamInterface();
}

function listenToRoomChanges() {
    if(!currentSessionRef) return;
    
    currentSessionRef.child('members').on('value', (snapshot) => {
        const members = snapshot.val() || {};
        teamMembers = Object.keys(members).map(key => ({
            id: key,
            name: members[key].name,
            online: members[key].online,
            isLeader: key === members[Object.keys(members)[0]]?.id
        }));
        updateTeamBar();
    });
    
    currentSessionRef.child('state').on('value', (snapshot) => {
        const newState = snapshot.val();
        if(newState) {
            const oldState = { ...sessionState };
            sessionState = { ...sessionState, ...newState };
            
            if(JSON.stringify(oldState) !== JSON.stringify(sessionState)) {
                applyStateToCurrentExam();
            }
        }
    });
    
    const userId = getUserId();
    currentSessionRef.child(`members/${userId}/online`).onDisconnect().set(false);
}

async function updateTeamState(newState) {
    if(!currentSessionRef) return;
    await currentSessionRef.child('state').update(newState);
    sessionState = { ...sessionState, ...newState };
}

function applyStateToCurrentExam() {
    if(!sessionState.currentExam) return;
    
    if(window.currentExamId !== sessionState.currentExam) {
        if(typeof window.loadExam === 'function') {
            window.loadExam(sessionState.currentExam);
        }
    }
    
    if(window.currentQuestionIndex !== sessionState.currentQuestion) {
        if(typeof window.goToQuestion === 'function') {
            window.goToQuestion(sessionState.currentQuestion);
        }
    }
    
    if(window.restoreAnswers) {
        window.restoreAnswers(sessionState.selectedAnswers);
    }
    
    if(sessionState.showCorrection && window.showCorrection) {
        window.showCorrection();
    }
}

function showTeamInterface() {
    let teamBar = document.getElementById('teamBar');
    if(!teamBar) {
        teamBar = document.createElement('div');
        teamBar.id = 'teamBar';
        teamBar.className = 'team-bar';
        document.body.insertBefore(teamBar, document.body.firstChild);
        document.body.classList.add('has-team-session');
    }
    updateTeamBar();
}

function updateTeamBar() {
    const teamBar = document.getElementById('teamBar');
    if(!teamBar) return;
    
    const myId = getUserId();
    const isUserLeader = sessionState.leaderId === myId;
    
    teamBar.innerHTML = `
        <div class="team-container">
            <div class="team-info">
                <span class="team-icon">👥</span>
                <span class="team-title">مراجعة مع صديق</span>
                <span class="team-code">الغرفة: ${currentRoom}</span>
            </div>
            <div class="team-members">
                ${teamMembers.map(m => `
                    <div class="team-member ${m.online !== false ? 'online' : 'offline'}">
                        <span class="member-name">${m.name}</span>
                        ${m.id === myId ? '<span class="member-badge">(أنت)</span>' : ''}
                        ${m.isLeader ? '<span class="leader-badge">👑</span>' : ''}
                    </div>
                `).join('')}
            </div>
            <button id="leaveTeamSessionBtn" class="leave-session-btn">🚪 مغادرة الجلسة</button>
        </div>
    `;
    
    document.getElementById('leaveTeamSessionBtn')?.addEventListener('click', leaveTeamSession);
}

async function leaveTeamSession() {
    const userId = getUserId();
    
    if(currentSessionRef) {
        await currentSessionRef.child(`members/${userId}`).remove();
        
        const members = await currentSessionRef.child('members').once('value');
        if(!members.val() || Object.keys(members.val()).length === 0) {
            await currentSessionRef.remove();
        }
    }
    
    closeConnection();
    window.location.reload();
}

function closeConnection() {
    if(currentSessionRef) {
        currentSessionRef.off();
        currentSessionRef = null;
    }
    currentRoom = null;
    isLeader = false;
    teamMembers = [];
}

function isInTeamSession() {
    return currentRoom !== null;
}

function getSessionState() {
    return sessionState;
}

window.TeamSession = {
    createTeamRoom,
    joinTeamRoom,
    updateTeamState,
    isInSession: isInTeamSession,
    getSessionState,
    leaveSession: leaveTeamSession
};

console.log("✅ teamSession.js loaded");