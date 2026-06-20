// ============================================
// Google Sheets API Configuration - JSONP Version
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbzGBr8144V8ZQ3yHmJ8s8_yaif-L0fVu8K0SVmyZNIUrIenX76C7qxbIGjcYHHFlKed/exec';

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
        
        // بناء الـ URL
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        if (deviceId) url += `&deviceId=${encodeURIComponent(deviceId)}`;
        
        // تعريف الدالة التي سيتم استدعاؤها
        window[callbackName] = function(data) {
            delete window[callbackName];
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            resolve(data);
        };
        
        script.src = url;
        script.onerror = function() {
            delete window[callbackName];
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            reject(new Error('فشل الاتصال بالخادم'));
        };
        
        // مهلة في حالة عدم الاستجابة (10 ثوان)
        const timeout = setTimeout(() => {
            if (window[callbackName]) {
                delete window[callbackName];
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                reject(new Error('انتهت مهلة الاتصال'));
            }
        }, 10000);
        
        // ربط المهلة بالدالة
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

// 4. التحقق من المستخدم
async function checkUser(email) {
    try {
        const data = await callJSONP('check', email);
        return data;
    } catch (error) {
        return { success: false };
    }
}

// 5. جلب جميع المستخدمين
async function getAllUsersFromSheets() {
    try {
        const data = await callJSONP('getAllUsers');
        if (data && data.success) {
            return data.users || {};
        }
        return {};
    } catch (error) {
        console.error('Error fetching users:', error);
        return {};
    }
}
