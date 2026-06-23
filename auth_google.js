// ============================================
// Google Sheets API - نسخة مبسطة
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbz7MYOR4XG_6lFQSEWMC6nfPv8JYGNtouNV-GXK5QPiu0-FzJ6vtieDMEFVWOakJmOs3w/exec';

// ============================================
// دالة JSONP للاتصال بالـ API
// ============================================

function callJSONP(action, email) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const script = document.createElement('script');
        
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        url += `&_=${Date.now()}`;
        
        let isResolved = false;
        
        const timeout = setTimeout(() => {
            if (!isResolved) {
                isResolved = true;
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
                reject(new Error('NETWORK_TIMEOUT'));
            }
        }, 10000);
        
        window[callbackName] = function(data) {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            resolve(data);
        };
        
        script.onerror = function() {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            reject(new Error('NETWORK_ERROR'));
        };
        
        document.body.appendChild(script);
    });
}

// ============================================
// دوال API - مبسطة جداً
// ============================================

// 1. تسجيل الدخول
async function loginWithGoogleSheets(email) {
    try {
        const data = await callJSONP('login', email);
        
        if (!data) {
            return {
                success: false,
                message: 'لم يتم استلام رد من الخادم',
                status: 'no_response'
            };
        }
        
        return data;
        
    } catch (error) {
        // ✅ رسالة خطأ واضحة
        let message = '⚠️ خطأ في الاتصال. تأكد من اتصالك بالإنترنت.';
        if (error.message === 'NETWORK_TIMEOUT') {
            message = '⏰ انتهت مهلة الاتصال. حاول مرة أخرى.';
        } else if (error.message === 'NETWORK_ERROR') {
            message = '🌐 لا يمكن الاتصال بالخادم. تأكد من اتصالك بالإنترنت.';
        }
        
        return {
            success: false,
            message: message,
            status: 'connection_error'
        };
    }
}

// 2. التحقق من المستخدم
async function checkUser(email) {
    try {
        const data = await callJSONP('check', email);
        
        if (!data) {
            return { 
                success: false, 
                exists: false
            };
        }
        
        return data;
        
    } catch (error) {
        return { 
            success: false, 
            exists: false
        };
    }
}
