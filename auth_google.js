// ============================================
// Google Sheets API Configuration - JSONP Version
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbyGZtCchqpeOoCGjS38EZkej1kOnRFDagEeQlRVT5Le5MGLJvMsGtGzT-Y30tPZHUwCnw/exec';

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

function callJSONP(action, email, deviceId, sessionToken) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const script = document.createElement('script');
        
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        if (deviceId) url += `&deviceId=${encodeURIComponent(deviceId)}`;
        if (sessionToken) url += `&sessionToken=${encodeURIComponent(sessionToken)}`;
        
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

// 1. تسجيل الدخول
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    
    try {
        const data = await callJSONP('login', email, deviceId);
        
        // ✅ التحقق من البيانات المستلمة
        if (!data) {
            return {
                success: false,
                message: 'لم يتم استلام بيانات من الخادم',
                status: 'connection_error'
            };
        }
        
        // ✅ إذا كان هناك خطأ من الخادم
        if (data.error) {
            return {
                success: false,
                message: data.error,
                status: data.status || 'error'
            };
        }
        
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message,
            status: 'connection_error'
        };
    }
}

// 2. التحقق من الجلسة - فقط عند فتح الموقع
async function checkSession(email, sessionToken) {
    try {
        const data = await callJSONP('checkSession', email, null, sessionToken);
        return data;
    } catch (error) {
        return {
            valid: false,
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

// 4. التحقق من المستخدم (للحالة فقط)
async function checkUser(email) {
    try {
        const data = await callJSONP('check', email);
        return data;
    } catch (error) {
        return { success: false, exists: false };
    }
}
