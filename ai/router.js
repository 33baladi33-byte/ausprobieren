// ============================================================
// 🧠 نظام التوجيه الذكي (Router) مع Automatic Failover + Key Rotation
// ============================================================

import { getActiveProviders } from './providers.js';
import { isRequestFailed, extractErrorMessage } from './fallback.js';
import { getCachedResponse, setCachedResponse } from './cache.js';
import { buildSystemPrompt, buildPrompt } from './prompts.js';
import { callProvider } from './callProvider.js'; // سننشئ هذه الدالة

const STORAGE_KEY = 'zertiva_ai_last_success';

// ============================================================
// 🔄 إدارة آخر نجاح (Last Success) في localStorage
// ============================================================

function getLastSuccessPointer() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.providerIndex !== undefined && parsed.keyIndex !== undefined) {
        return parsed;
      }
    }
  } catch (_) {}
  return null;
}

function setLastSuccessPointer(providerIndex, keyIndex) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ providerIndex, keyIndex }));
  } catch (_) {}
}

// ============================================================
// 🚀 الدالة الرئيسية: sendPrompt
// ============================================================

export async function sendPrompt(question, context = null) {
  if (!question || typeof question !== 'string' || question.trim() === '') {
    throw new Error('الرجاء إدخال نص سؤال صحيح.');
  }

  // 1. التحقق من الكاش
  const cached = getCachedResponse(question, context);
  if (cached) {
    console.log('📦 رد من الـ Cache');
    return cached;
  }

  const activeProviders = getActiveProviders();
  if (activeProviders.length === 0) {
    throw new Error('⚠️ لا يوجد مزودون متاحون (جميع المفاتيح فارغة).');
  }

  // 2. قراءة آخر مؤشر ناجح
  const lastSuccess = getLastSuccessPointer();
  let startProviderIdx = 0;
  let startKeyIdx = 0;

  if (lastSuccess) {
    if (lastSuccess.providerIndex < activeProviders.length) {
      const provider = activeProviders[lastSuccess.providerIndex];
      if (lastSuccess.keyIndex < provider.keys.length) {
        startProviderIdx = lastSuccess.providerIndex;
        startKeyIdx = lastSuccess.keyIndex;
      }
    }
  }

  // 3. بناء النظام والرسالة مرة واحدة
  const systemMsg = buildSystemPrompt(question);
  const prompt = buildPrompt(question, context);

  // 4. التجربة عبر المزودات والمفاتيح
  for (let pIdx = 0; pIdx < activeProviders.length; pIdx++) {
    const providerIdx = (startProviderIdx + pIdx) % activeProviders.length;
    const provider = activeProviders[providerIdx];
    const keys = provider.keys;
    const totalKeys = keys.length;

    const startKey = (pIdx === 0) ? startKeyIdx : 0;

    for (let kIdx = 0; kIdx < totalKeys; kIdx++) {
      const keyIndex = (startKey + kIdx) % totalKeys;
      const key = keys[keyIndex];

      try {
        console.log(`🔄 محاولة: ${provider.name} Key ${keyIndex + 1} ...`);

        const result = await callProvider(provider, key, prompt, systemMsg);

        // ✅ نجاح
        console.log(`✅ ${provider.name} Key ${keyIndex + 1} ✓`);
        setLastSuccessPointer(providerIdx, keyIndex);
        setCachedResponse(question, context, result, provider.name);
        return result;

      } catch (error) {
        // ❌ فشل هذا المفتاح
        console.warn(`❌ ${provider.name} Key ${keyIndex + 1} انتهى -> الانتقال إلى ${provider.name} Key ${(keyIndex + 1) % totalKeys + 1}`);
        continue;
      }
    }

    // بعد نفاد جميع مفاتيح هذا المزود
    console.warn(`⚠️ جميع مفاتيح ${provider.name} انتهت -> الانتقال إلى المزود التالي`);
  }

  // 5. جميع المزودين فشلوا
  throw new Error('⚠️ جميع المزودين غير متاحين حالياً. يرجى المحاولة لاحقاً.');
}