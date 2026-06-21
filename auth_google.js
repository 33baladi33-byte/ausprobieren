// ============================================
// Google Sheets API Configuration - JSONP Version
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycby4sS6jnLMwxbbzQrGSd1xdxPq1_D-himQXp7mj9v3FLhDBgY3kMlS8q3UnpMF9g9PVeg/exec';

// ============================================
// إنشاء معرف فريد للجهاز
// ============================================

function getDeviceId() {
    let deviceId = localStorage.getItem('zertiva_device_id');
    if (!deviceId) {
        deviceId = 'dev-' + Date.now() + '-' + Math.random().toString(36).substr(2, 10);
        localStorage.setItem('zertiva_device_id', deviceId);
    }
    return deviceId;
}

// ============================================
// دالة JSONP للاتصال بالـ API
// ============================================

function callJSONP(action, email, deviceId) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const script = document.createElement('script');
        
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        if (deviceId) url += `&deviceId=${encodeURIComponent(deviceId)}`;
        
        window[callbackName] = function(data) {
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            resolve(data);
        };
        
        script.src = url;
        script.onerror = function() {
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            reject(new Error('فشل الاتصال بالخادم'));
        };
        
        const timeout = setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
                reject(new Error('انتهت مهلة الاتصال'));
            }
        }, 10000);
        
        const originalCallback = window[callbackName];
        window[callbackName] = function(data) {
            clearTimeout(timeout);
            originalCallback(data);
        };
        
        document.body.appendChild(script);
    });
}

// ============================================
// دوال API
// ============================================

// 1. تسجيل الدخول - يتم استخدامها مرة واحدة فقط
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    
    try {
        const data = await callJSONP('login', email, deviceId);
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message,
            status: 'connection_error'
        };
    }
}

// 2. نقل الحساب
async function transferAccount(email) {
    const deviceId = getDeviceId();
    
    try {
        const data = await callJSONP('transfer', email, deviceId);
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message
        };
    }
}

// 3. تسجيل الخروج
async function logoutWithGoogleSheets(email) {
    try {
        const data = await callJSONP('logout', email);
        return data;
    } catch (error) {
        return { success: false };
    }
}

// 4. التحقق من المستخدم - فقط هذا يستخدم للتحقق
async function checkUser(email) {
    try {
        const data = await callJSONP('check', email);
        return data;
    } catch (error) {
        return { success: false, exists: false };
    }
}
