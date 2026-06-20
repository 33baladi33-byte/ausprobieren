// ============================================
// Google Sheets API Configuration
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbzA0x_aLc_mmvvOKAFHm5fraB8TxIWrk6UBRwVu9ckinBMO5OaIEz8xerzTMogExpIWaQ/exec';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

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
// دوال API مع Proxy
// ============================================

// 1. تسجيل الدخول
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    const fullUrl = `${API_URL}?action=login&email=${encodeURIComponent(email)}&deviceId=${deviceId}`;
    
    try {
        // ✅ استخدام Proxy لتجاوز CORS
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(fullUrl)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message
        };
    }
}

// 2. نقل الحساب
async function transferAccount(email) {
    const deviceId = getDeviceId();
    const fullUrl = `${API_URL}?action=transfer&email=${encodeURIComponent(email)}&deviceId=${deviceId}`;
    
    try {
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(fullUrl)}`);
        const data = await response.json();
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
        const fullUrl = `${API_URL}?action=logout&email=${encodeURIComponent(email)}`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(fullUrl)}`);
        return await response.json();
    } catch (error) {
        return { success: false };
    }
}

// 4. التحقق من المستخدم
async function checkUser(email) {
    try {
        const fullUrl = `${API_URL}?action=check&email=${encodeURIComponent(email)}`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(fullUrl)}`);
        return await response.json();
    } catch (error) {
        return { success: false };
    }
}

// 5. جلب جميع المستخدمين
async function getAllUsersFromSheets() {
    try {
        const fullUrl = `${API_URL}?action=getAllUsers`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(fullUrl)}`);
        const data = await response.json();
        if (data.success) {
            return data.users || {};
        }
        return {};
    } catch (error) {
        return {};
    }
}
