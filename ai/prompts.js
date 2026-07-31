// ============================================================
// 📝 بناء الرسائل والسياق
// ============================================================

const SITE_KNOWLEDGE = `
منصة Zertiva B2: امتحانات Goethe B2 (Lesen, Hören, Sprachbausteine, Schreiben, Mündlich).
مميزات: تصحيح تلقائي، تلوين ذكي، لعبة سريعة، Memory Trainer.
`;

/**
 * بناء رسالة النظام (System Prompt) بناءً على السؤال
 */
export function buildSystemPrompt(question) {
  let base = 'أنت مساعد Zertiva B2. أجب باختصار شديد (جملة إلى جملتين).';
  const siteKeywords = ['موقع', 'منصة', 'المميزات', 'امتحانات', 'المهارات', 'Goethe', 'B2'];
  const isSiteQuestion = siteKeywords.some(keyword => question.includes(keyword));
  if (isSiteQuestion) {
    base += ` معرفتك بالموقع: ${SITE_KNOWLEDGE}`;
  }
  return base;
}

/**
 * بناء نص الطلب النهائي (prompt) المرسل إلى API
 */
export function buildPrompt(question, context) {
  const contextText = context || 'لا يوجد سياق';
  return `السياق (الفقرة الحالية): "${contextText}"\nسؤال الطالب: "${question}"\nتعليمات: أجب باختصار شديد (جملة إلى جملتين).`;
}