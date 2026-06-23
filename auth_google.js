// ============================================
// Google Sheets API - نسخة مبسطة
// ============================================

// ✅ استخدم الرابط الجديد بعد النشر
const API_URL = 'https://script.google.com/macros/s/AKfycbxl6vk9_43SQyGCKOs8aWXCnWhkgRVFxfQs7bxXDQpcXo69zJDW71Wh4nHqCJXIdAjH0g/exec';

// ============================================
// دالة JSONP - مبسطة
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
        
        // ✅ مهلة 10 ثوانٍ
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
// دوال API - مبسطة
// ============================================

async function loginWithGoogleSheets(email) {
    try {
        console.log('🔑 محاولة تسجيل الدخول:', email);
        const data = await callJSONP('login', email);
        
        if (!data) {
            return {
                success: false,
                message: 'لم يتم استلام رد من الخادم',
                status: 'no_response'
            };
        }
        
        console.log('✅ رد تسجيل الدخول:', data);
        return data;
        
    } catch (error) {
        console.error('❌ خطأ في تسجيل الدخول:', error.message);
        
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
