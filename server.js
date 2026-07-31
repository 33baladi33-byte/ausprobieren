const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ============================================================
// 🔑 قراءة جميع المفاتيح من .env
// ============================================================
function getKeysFromEnv(prefix, count) {
  const keys = [];
  for (let i = 1; i <= count; i++) {
    const key = process.env[`${prefix}_${i}`];
    if (key && key.trim() !== '') keys.push(key);
  }
  return keys;
}

// ============================================================
// 🚀 تحميل نظام AI Router (مع حقن المفاتيح)
// ============================================================
let aiRouter = null;

async function loadAIRouter() {
  try {
    const module = await import('./ai/router.js');
    const keysModule = await import('./ai/keys.js');

    // تعيين مفاتيح OpenRouter (6 مفاتيح)
    const openRouterKeys = getKeysFromEnv('OPENROUTER_API_KEY', 6);
    if (openRouterKeys.length > 0) {
      keysModule.setOpenRouterKeys(openRouterKeys);
    }

    // تعيين مفاتيح Groq (6 مفاتيح)
    const groqKeys = getKeysFromEnv('GROQ_API_KEY', 6);
    if (groqKeys.length > 0) {
      keysModule.setGroqKeys(groqKeys);
    }

    // تعيين مفاتيح Cerebras (6 مفاتيح)
    const cerebrasKeys = getKeysFromEnv('CEREBRAS_API_KEY', 6);
    if (cerebrasKeys.length > 0) {
      keysModule.setCerebrasKeys(cerebrasKeys);
    }

    // تعيين مفاتيح SambaNova (3 مفاتيح)
    const sambaNovaKeys = getKeysFromEnv('SAMBANOVA_API_KEY', 3);
    if (sambaNovaKeys.length > 0) {
      keysModule.setSambaNovaKeys(sambaNovaKeys);
    }

    // تعيين مفاتيح Together AI (2 مفاتيح)
    const togetherKeys = getKeysFromEnv('TOGETHER_API_KEY', 2);
    if (togetherKeys.length > 0) {
      keysModule.setTogetherKeys(togetherKeys);
    }

    aiRouter = module;
    console.log('✅ تم تحميل نظام AI Router الجديد بنجاح');
    console.log(`📊 المفاتيح المحملة:`);
    console.log(`   - Gemini: ${process.env.GEMINI_API_KEY ? '✅' : '❌'}`);
    console.log(`   - Groq: ${groqKeys.length} مفاتيح`);
    console.log(`   - OpenRouter: ${openRouterKeys.length} مفاتيح`);
    console.log(`   - Cerebras: ${cerebrasKeys.length} مفاتيح`);
    console.log(`   - SambaNova: ${sambaNovaKeys.length} مفاتيح`);
    console.log(`   - Together: ${togetherKeys.length} مفاتيح`);
  } catch (error) {
    console.error('❌ فشل تحميل AI Router:', error.message);
  }
}

// تحميل النظام عند بدء الخادم
loadAIRouter();

// ============================================================
// 🌐 نقطة النهاية /ask
// ============================================================
app.post('/ask', async (req, res) => {
  const { question, context } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'السؤال مطلوب' });
  }

  if (!aiRouter) {
    return res.status(503).json({
      reply: 'نظام الذكاء الاصطناعي قيد التحميل. حاول مرة أخرى بعد لحظة.',
      provider: 'none'
    });
  }

  try {
    const reply = await aiRouter.sendPrompt(question, context);
    res.json({ reply, provider: 'ai-router' });
  } catch (error) {
    console.error('❌ خطأ في AI Router:', error.message);
    res.status(503).json({
      reply: 'تعذر الحصول على الرد حالياً. يرجى المحاولة مرة أخرى بعد قليل.',
      provider: 'none'
    });
  }
});

// ============================================================
// 🏥 نقطة نهاية للصحة
// ============================================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    aiRouterLoaded: aiRouter !== null,
    gemini: process.env.GEMINI_API_KEY ? '✅' : '❌',
    groq: process.env.GROQ_API_KEY_1 ? '✅' : '❌',
    openrouter: process.env.OPENROUTER_API_KEY_1 ? '✅' : '❌',
    cerebras: process.env.CEREBRAS_API_KEY_1 ? '✅' : '❌',
    sambanova: process.env.SAMBANOVA_API_KEY_1 ? '✅' : '❌',
    together: process.env.TOGETHER_API_KEY_1 ? '✅' : '❌',
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`🚀 الخادم شغال على http://localhost:${PORT}`);
});
