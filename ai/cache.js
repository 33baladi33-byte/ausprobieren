// ============================================================
// 💾 نظام تخزين مؤقت (Cache) في الذاكرة
// ============================================================

const cache = new Map();
const CACHE_TTL = 3600000; // ساعة واحدة

// تنظيف تلقائي كل ساعة
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      cache.delete(key);
    }
  }
}, 3600000);

/**
 * الحصول على رد من الكاش
 */
export function getCachedResponse(question, context) {
  const key = question + (context || '');
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.reply;
  }
  return null;
}

/**
 * تخزين رد في الكاش
 */
export function setCachedResponse(question, context, reply, provider) {
  const key = question + (context || '');
  cache.set(key, {
    reply,
    provider,
    timestamp: Date.now()
  });
}

// دالة لمسح الكاش يدوياً
export function clearCache() {
  cache.clear();
}