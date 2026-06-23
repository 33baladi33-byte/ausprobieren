// ============================================
// Google Sheets API - نسخة سريعة
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbyEsS2HpHjdJ9JU5XVXeNcL7cV9zQt0LBhnTpBYzRIu_8Wo2aZMJ65n8PEiQVMIb103GQ/exec';

// ============================================
// دالة JSONP - محسنة
// ============================================

function callJSONP(action, email) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const script = document.createElement('script');
        
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        url += `&_=${Date.now()}`;
        
        console.log(`📡 [${action}] Calling API:`, url);
        
        let isResolved = false;
        
        // ✅ مهلة 8 ثوانٍ فقط
        const timeout = setTimeout(() => {
            if (!isResolved) {
                isResolved = true;
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
                reject(new Error('NETWORK_TIMEOUT'));
            }
        }, 8000);
        
        window[callbackName] = function(data) {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            
            console.log(`📥 [${action}] Response:`, data);
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
// دوال API - سريعة
// ============================================

async function loginWithGoogleSheets(email) {
    try {
        const startTime = Date.now();
        const data = await callJSONP('login', email);
        const endTime = Date.now();
        console.log(`⏱️ Login took ${endTime - startTime}ms`);
        
        if (!data) {
            return {
                success: false,
                message: 'لم يتم استلام رد من الخادم',
                status: 'no_response'
            };
        }
        
        return data;
        
    } catch (error) {
        console.error('❌ Login error:', error.message);
        
        let message = '⚠️ خطأ في الاتصال. حاول مرة أخرى.';
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
