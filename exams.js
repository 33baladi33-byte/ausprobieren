// ========== تسجيل الامتحان في نظام التتبع اليومي ==========
const examTitle = currentExamData?.title || `Exam ${examId}`;
const totalQuestions = currentExamData?.questions?.length || 25;

// حساب عدد الإجابات الصحيحة
let correctAnswers = 0;
if (currentExamData?.questions && currentExamData.questions.length > 0) {
  const pointsPerQuestion = 25 / totalQuestions;
  correctAnswers = Math.round(score / pointsPerQuestion);
} else {
  correctAnswers = Math.round((score / 100) * totalQuestions);
}

if (typeof DailyTracker !== 'undefined' && DailyTracker.registerExam) {
  DailyTracker.registerExam(skill, examId, examTitle, score, correctAnswers, totalQuestions);
  console.log(`📊 [DailyTracker] تم تسجيل امتحان: ${skill} - Exam ${examId} (${correctAnswers}/${totalQuestions} إجابة صحيحة، ${score}%)`);
} else {
  console.warn("⚠️ DailyTracker غير متوفر");
}
// ===========================================================
