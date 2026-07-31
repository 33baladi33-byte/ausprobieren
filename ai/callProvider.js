// ============================================================
// 📡 استدعاء مزود معين بمفتاح محدد
// ============================================================

import { isRequestFailed, extractErrorMessage } from './fallback.js';

export async function callProvider(provider, key, prompt, systemMsg, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // بناء الطلب حسب المزود
    let requestBody = provider.buildRequest(prompt, systemMsg);

    // إذا كان المزود OpenRouter وله خاصية models، نختار نموذجاً عشوائياً
    if (provider.id === 'openrouter' && provider.models && provider.models.length > 0) {
      // استخدم نموذجاً محدداً (نأخذ الأول، أو يمكن تخزين آخر نجاح لكل مفتاح)
      const model = provider.models[0]; // يمكن تحسينها لاحقاً
      requestBody = provider.buildRequest(prompt, systemMsg, model);
    }

    const endpoint = provider.getEndpoint(key);
    const headers = provider.getHeaders(key);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorText = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        const extracted = extractErrorMessage(errorData);
        if (extracted) errorText = extracted;
      } catch (_) {}
      throw new Error(errorText);
    }

    const data = await response.json();
    const result = provider.parseResponse(data);
    if (!result) {
      throw new Error('Empty response from provider');
    }
    return result;

  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Timeout');
    }
    throw error;
  }
}