// ============================================
// Google Sheets API Configuration - JSONP Version
// مع نظام Caching لتقليل الطلبات المتكررة
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbwp14kvkAzTvmYEyUzD92AVb4SrzD0os7pl85Ka8ZD_OTLVREl0JGAKrfUX7ANyE3hBOA/exec';

// ============================================
// نظام Caching للطلبات
// ============================================

const CACHE_CONFIG = {
    check: { duration: 10 * 60 * 1000, key: 'zertiva_cache_check' },      // 10 دقائق
    checkSession: { duration: 5 * 60 * 1000, key: 'zertiva_cache_session' }, // 5 دقائق
    login: { duration: 0, key: null }, // لا يتم تخزين login
    logout: { duration: 0, key: null } // لا يتم تخزين logout
};

// ============================================
// دالة للحصول على البيانات من Cache
// ============================================

function getCachedData(cacheKey) {
    try {
        const cached = localStorage.getItem(cacheKey);
        if (!cached) return null;
        
        const data = JSON.parse(cached);
        const now = Date.now();
        
        // التحقق من صلاحية الكاش
        if (data.timestamp && (now - data.timestamp) < data.duration) {
            return data.value;
        }
        
        // انتهت صلاحية الكاش
        localStorage.removeItem(cacheKey);
        return null;
    } catch (e) {
        return null;
    }
}

// ============================================
// دالة لحفظ البيانات في Cache
// ============================================

function setCachedData(cacheKey, value, duration) {
    try {
        const data = {
            value: value,
            timestamp: Date.now(),
            duration: duration
        };
        localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {
        // تجاهل أخطاء التخزين
    }
}

// ============================================
// دالة لمسح Cache
// ============================================

function clearApiCache() {
    const keys = ['zertiva_cache_check', 'zertiva_cache_session'];
    keys.forEach(key => localStorage.removeItem(key));
}

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
// دالة JSONP للاتصال بالـ API مع Retry
// ============================================

function callJSONP(action, email, deviceId, sessionToken, retryCount = 0) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        const script = document.createElement('script');
        let isResolved = false;
        
        let url = `${API_URL}?action=${action}&callback=${callbackName}`;
        if (email) url += `&email=${encodeURIComponent(email)}`;
        if (deviceId) url += `&deviceId=${encodeURIComponent(deviceId)}`;
        if (sessionToken) url += `&sessionToken=${encodeURIComponent(sessionToken)}`;
        
        // دالة التنظيف
        function cleanup() {
            if (window[callbackName]) {
                delete window[callbackName];
            }
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }
        
        window[callbackName] = function(data) {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            cleanup();
            resolve(data);
        };
        
        script.src = url;
        
        script.onerror = function() {
            if (isResolved) return;
            isResolved = true;
            clearTimeout(timeout);
            cleanup();
            
            // ✅ محاولة إعادة الاتصال مرة واحدة
            if (retryCount < 1) {
                console.log(`⚠️ محاولة إعادة الاتصال (${retryCount + 1}/1) لـ ${action}`);
                setTimeout(() => {
                    callJSONP(action, email, deviceId, sessionToken, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, 500);
            } else {
                reject(new Error('فشل الاتصال بالخادم بعد المحاولات'));
            }
        };
        
        const timeout = setTimeout(() => {
            if (isResolved) return;
            isResolved = true;
            cleanup();
            
            if (retryCount < 1) {
                console.log(`⚠️ انتهت مهلة الاتصال، محاولة إعادة (${retryCount + 1}/1) لـ ${action}`);
                setTimeout(() => {
                    callJSONP(action, email, deviceId, sessionToken, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, 500);
            } else {
                reject(new Error('انتهت مهلة الاتصال'));
            }
        }, 8000); // 8 ثواني مهلة
        
        document.body.appendChild(script);
    });
}

// ============================================
// دوال API مع Caching
// ============================================

// 1. تسجيل الدخول - بدون Cache (يتم دائماً)
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    
    try {
        const data = await callJSONP('login', email, deviceId);
        
        // ✅ عند نجاح تسجيل الدخول، مسح الكاش القديم
        if (data && data.success) {
            clearApiCache();
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

// 2. التحقق من الجلسة - مع Cache (5 دقائق)
async function checkSession(email, sessionToken, forceRefresh = false) {
    const cacheKey = CACHE_CONFIG.checkSession.key;
    const cacheDuration = CACHE_CONFIG.checkSession.duration;
    
    // ✅ استخدام الكاش إذا كان موجوداً وليس هناك طلب قسري
    if (!forceRefresh) {
        const cached = getCachedData(cacheKey);
        if (cached && cached.valid !== undefined) {
            console.log('📦 استخدام Cache لـ checkSession');
            return cached;
        }
    }
    
    try {
        const data = await callJSONP('checkSession', email, null, sessionToken);
        
        // ✅ حفظ النتيجة في الكاش إذا كانت صالحة
        if (data && data.valid !== undefined) {
            setCachedData(cacheKey, data, cacheDuration);
        }
        
        return data;
    } catch (error) {
        // ✅ في حالة الخطأ، إرجاع بيانات من الكاش إذا وجدت
        const cached = getCachedData(cacheKey);
        if (cached) {
            console.log('📦 استخدام Cache (fallback) لـ checkSession');
            return cached;
        }
        
        return {
            valid: false,
            message: 'خطأ في الاتصال: ' + error.message
        };
    }
}

// 3. تسجيل الخروج - مسح الكاش
async function logoutWithGoogleSheets(email) {
    try {
        const data = await callJSONP('logout', email);
        
        // ✅ مسح الكاش عند تسجيل الخروج
        if (data && data.success) {
            clearApiCache();
        }
        
        return data;
    } catch (error) {
        // حتى في حالة الخطأ، نمسح الكاش محلياً
        clearApiCache();
        return { success: false };
    }
}

// 4. التحقق من المستخدم - مع Cache (10 دقائق)
async function checkUser(email, forceRefresh = false) {
    const cacheKey = CACHE_CONFIG.check.key;
    const cacheDuration = CACHE_CONFIG.check.duration;
    
    // ✅ استخدام الكاش إذا كان موجوداً وليس هناك طلب قسري
    if (!forceRefresh) {
        const cached = getCachedData(cacheKey);
        if (cached && cached.exists !== undefined) {
            console.log('📦 استخدام Cache لـ checkUser');
            return cached;
        }
    }
    
    try {
        const data = await callJSONP('check', email);
        
        // ✅ حفظ النتيجة في الكاش إذا كانت ناجحة
        if (data && data.success) {
            setCachedData(cacheKey, data, cacheDuration);
        }
        
        return data;
    } catch (error) {
        // ✅ في حالة الخطأ، إرجاع بيانات من الكاش إذا وجدت
        const cached = getCachedData(cacheKey);
        if (cached) {
            console.log('📦 استخدام Cache (fallback) لـ checkUser');
            return cached;
        }
        
        return { 
            success: false, 
            exists: false,
            message: 'خطأ في الاتصال: ' + error.message
        };
    }
}

// ============================================
// دالة مساعدة للحصول على حالة المستخدم مع Cache
// ============================================

async function getUserStatusCached(email, forceRefresh = false) {
    const result = await checkUser(email, forceRefresh);
    
    if (result && result.exists && result.expiry) {
        const today = new Date().toISOString().slice(0, 10);
        return {
            isPremium: today <= result.expiry,
            expiry: result.expiry,
            exists: true
        };
    }
    
    return {
        isPremium: false,
        expiry: null,
        exists: false
    };
}

// ============================================
// دالة لمسح الكاش يدوياً (للاستخدام الخارجي)
// ============================================

function clearAllApiCache() {
    clearApiCache();
    console.log('🗑️ تم مسح جميع Cache');
}

// ============================================
// تصدير الدوال للاستخدام الخارجي
// ============================================

window.loginWithGoogleSheets = loginWithGoogleSheets;
window.checkSession = checkSession;
window.logoutWithGoogleSheets = logoutWithGoogleSheets;
window.checkUser = checkUser;
window.getUserStatusCached = getUserStatusCached;
window.clearAllApiCache = clearAllApiCache;
window.getDeviceId = getDeviceId;

console.log('✅ auth_google.js تم تحميله مع نظام Caching');
