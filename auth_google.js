// ============================================
// Google Sheets API - نسخة سريعة
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbzX21B3mii0KemUgNMcPdOk8h2qodT4iUKvfFwP34vuSIyicygddD44FvgzGJx005NN4A/exec';

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
        
        let isResolved = false;
        
        // ✅ زيادة المهلة إلى 20 ثانية
        const timeout = setTimeout(() => {
            if (!isResolved) {
                isResolved = true;
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
                reject(new Error('⏰ انتهت مهلة الاتصال بالخادم'));
            }
        }, 20000); // ✅ 20 ثانية بدلاً من 10
        
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
        
        // ✅ معالجة أخطاء الشبكة
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
// دوال API
// ============================================

// 1. تسجيل الدخول
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    
    try {
        console.log('🔑 محاولة تسجيل الدخول:', email);
        const data = await callJSONP('login', email, deviceId);
        
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
        return {
            success: false,
            message: error.message || 'حدث خطأ في الاتصال',
            status: 'connection_error'
        };
    }
}

// 2. التحقق من الجلسة
async function checkSession(email, sessionToken) {
    try {
        console.log('🔍 التحقق من الجلسة:', email);
        const data = await callJSONP('checkSession', email, null, sessionToken);
        
        if (!data) {
            return {
                valid: false,
                message: 'لم يتم استلام رد من الخادم',
                status: 'no_response'
            };
        }
        
        console.log('✅ نتيجة التحقق:', data);
        return data;
        
    } catch (error) {
        console.error('❌ خطأ في التحقق:', error.message);
        return {
            valid: false,
            message: error.message || 'حدث خطأ في الاتصال',
            status: 'connection_error'
        };
    }
}

// 3. تسجيل الخروج
async function logoutWithGoogleSheets(email) {
    try {
        console.log('🚪 تسجيل الخروج:', email);
        const data = await callJSONP('logout', email);
        console.log('✅ نتيجة تسجيل الخروج:', data);
        return data || { success: true };
        
    } catch (error) {
        console.error('❌ خطأ في تسجيل الخروج:', error.message);
        return { 
            success: false, 
            message: error.message || 'حدث خطأ في الاتصال' 
        };
    }
}

// 4. التحقق من المستخدم
async function checkUser(email) {
    try {
        console.log('👤 التحقق من المستخدم:', email);
        const data = await callJSONP('check', email);
        
        if (!data) {
            return { 
                success: false, 
                exists: false,
                message: 'لم يتم استلام رد من الخادم'
            };
        }
        
        console.log('✅ نتيجة التحقق من المستخدم:', data);
        return data;
        
    } catch (error) {
        console.error('❌ خطأ في التحقق من المستخدم:', error.message);
        return { 
            success: false, 
            exists: false,
            message: error.message || 'حدث خطأ في الاتصال'
        };
    }
}
