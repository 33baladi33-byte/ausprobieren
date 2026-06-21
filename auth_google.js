// ============================================
// Google Sheets API Configuration - JSONP Version
// ============================================

// ✅ تم تحديث رابط API
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
// دالة JSONP للاتصال بالـ API - محسنة
// ============================================

function callJSONP(action, email, deviceId, sessionToken) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const script = document.createElement('script');
        
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        if (deviceId) url += `&deviceId=${encodeURIComponent(deviceId)}`;
        if (sessionToken) url += `&sessionToken=${encodeURIComponent(sessionToken)}`;
        
        // ✅ إضافة طابع زمني لمنع التخزين المؤقت
        url += `&_=${Date.now()}`;
        
        console.log(`📡 [${action}] Calling API:`, url);
        
        // ✅ تحديد مهلة زمنية
        let isResolved = false;
        const timeout = setTimeout(() => {
            if (!isResolved) {
                isResolved = true;
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
                reject(new Error('⏰ انتهت مهلة الاتصال بالخادم'));
            }
        }, 15000); // 15 ثانية
        
        // ✅ دالة الاستجابة
        window[callbackName] = function(data) {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            
            console.log(`📥 [${action}] Response:`, data);
            resolve(data);
        };
        
        // ✅ معالجة الأخطاء
        script.onerror = function() {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            reject(new Error('🌐 فشل الاتصال بالخادم'));
        };
        
        document.body.appendChild(script);
    });
}

// ============================================
// دوال API - مع تحسينات
// ============================================

// 1. تسجيل الدخول ✅ محسنة
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    
    try {
        console.log('🔑 Attempting login for:', email);
        const data = await callJSONP('login', email, deviceId);
        
        // ✅ التحقق من البيانات المستلمة
        if (!data) {
            console.error('❌ No data received from server');
            return {
                success: false,
                message: 'لم يتم استلام بيانات من الخادم',
                status: 'connection_error'
            };
        }
        
        console.log('✅ Login response:', data);
        
        // ✅ إذا كان هناك خطأ من الخادم
        if (data.error) {
            console.error('❌ Server error:', data.error);
            return {
                success: false,
                message: data.error,
                status: data.status || 'error'
            };
        }
        
        return data;
    } catch (error) {
        console.error('❌ Login error:', error.message);
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message,
            status: 'connection_error'
        };
    }
}

// 2. التحقق من الجلسة ✅ محسنة
async function checkSession(email, sessionToken) {
    try {
        console.log('🔍 Checking session for:', email);
        const data = await callJSONP('checkSession', email, null, sessionToken);
        
        if (!data) {
            return {
                valid: false,
                message: 'لم يتم استلام بيانات',
                status: 'no_data'
            };
        }
        
        console.log('✅ Session check result:', data);
        return data;
    } catch (error) {
        console.error('❌ Session check error:', error.message);
        return {
            valid: false,
            message: 'خطأ في الاتصال: ' + error.message,
            status: 'connection_error'
        };
    }
}

// 3. تسجيل الخروج ✅ محسنة
async function logoutWithGoogleSheets(email) {
    try {
        console.log('🚪 Logging out:', email);
        const data = await callJSONP('logout', email);
        console.log('✅ Logout result:', data);
        return data || { success: true };
    } catch (error) {
        console.error('❌ Logout error:', error.message);
        return { success: false, message: error.message };
    }
}

// 4. التحقق من المستخدم ✅ محسنة
async function checkUser(email) {
    try {
        console.log('👤 Checking user:', email);
        const data = await callJSONP('check', email);
        
        if (!data) {
            return { success: false, exists: false };
        }
        
        console.log('✅ User check result:', data);
        return data;
    } catch (error) {
        console.error('❌ User check error:', error.message);
        return { success: false, exists: false };
    }
}
