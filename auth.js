// ========== دوال التحقق من حالة المستخدم ==========
async function getUserStatusForExam() {
    let email = localStorage.getItem('zertiva_email');
    if (!email) return 'guest';
    
    let now = Date.now();
    if (userStatusCache && (now - lastStatusCheck) < 5000) {
        return userStatusCache;
    }
    
    try {
        const result = await checkUser(email);
        if (result && result.exists && result.expiry) {
            let today = new Date().toISOString().slice(0,10);
            if (today <= result.expiry) {
                userStatusCache = 'premium';
                lastStatusCheck = now;
                return 'premium';
            }
        }
        userStatusCache = 'free';
        lastStatusCheck = now;
        return 'free';
    } catch(e) {
        userStatusCache = 'free';
        lastStatusCheck = now;
        return 'free';
    }
}
