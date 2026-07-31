// ============================================================
// ❌ معايير تحديد فشل الطلب
// ============================================================

/**
 * تحديد ما إذا كان الطلب قد فشل بناءً على:
 * - كود HTTP (401, 403, 429, 502, 503)
 * - رسالة الخطأ (Quota, Rate limit, Expired, Network, Timeout)
 */
export function isRequestFailed(error, response) {
  if (!response) return true; // فشل الشبكة أو مهلة

  const status = response.status;
  if ([401, 403, 429, 502, 503].includes(status)) {
    return true;
  }

  if (error) {
    const msg = error.message || error.toString();
    const lower = msg.toLowerCase();
    const failureKeywords = [
      'quota', 'rate limit', 'credits exceeded', 'insufficient_quota',
      'expired', 'network', 'timeout', 'failed to fetch', 'model unavailable',
      'overloaded', 'no endpoints'
    ];
    return failureKeywords.some(keyword => lower.includes(keyword));
  }

  return false;
}

/**
 * تحليل بيانات الاستجابة لاستخراج رسالة الخطأ إن وجدت
 */
export function extractErrorMessage(data) {
  if (data?.error?.message) return data.error.message;
  if (data?.message) return data.message;
  return null;
}