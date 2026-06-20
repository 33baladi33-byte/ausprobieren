// ============================================
// نظام Google Sheets + Apps Script
// ============================================

const API_URL = 'https://script.google.com/macros/s/AKfycbzA0x_aLc_mmvvOKAFHm5fraB8TxIWrk6UBRwVu9ckinBMO5OaIEz8xerzTMogExpIWaQ/exec';

// إنشاء معرف فريد للجهاز
function getDeviceId() {
    let deviceId = localStorage.getItem('zertiva_device_id');
    if (!deviceId) {
        deviceId = 'DEV_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('zertiva_device_id', deviceId);
    }
    return deviceId;
}

// تسجيل الدخول عبر Google Sheets
async function loginWithGoogleSheets(email) {
    const deviceId = getDeviceId();
    
    try {
        const response = await fetch(`${API_URL}?action=login&email=${encodeURIComponent(email)}&deviceId=${deviceId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message
        };
    }
}

// نقل الحساب إلى جهاز جديد
async function transferAccount(email) {
    const deviceId = getDeviceId();
    
    try {
        const response = await fetch(`${API_URL}?action=transfer&email=${encodeURIComponent(email)}&deviceId=${deviceId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            success: false,
            message: 'خطأ في الاتصال: ' + error.message
        };
    }
}

// تسجيل الخروج
async function logoutWithGoogleSheets(email) {
    try {
        const response = await fetch(`${API_URL}?action=logout&email=${encodeURIComponent(email)}`);
        return await response.json();
    } catch (error) {
        return { success: false };
    }
}

// التحقق من المستخدم
async function checkUser(email) {
    try {
        const response = await fetch(`${API_URL}?action=check&email=${encodeURIComponent(email)}`);
        return await response.json();
    } catch (error) {
        return { success: false };
    }
}
