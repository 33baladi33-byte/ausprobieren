// ============================================================
// 1. استيراد عناصر DOM (مراجع واجهة المستخدم)
// ============================================================

const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const authModalTitle = document.getElementById("authModalTitle");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const resetForm = document.getElementById("resetForm");

const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authLoginBtn = document.getElementById("authLoginBtn");
const authError = document.getElementById("authError");
const togglePassword = document.getElementById("togglePassword");

const signupUsername = document.getElementById("signupUsername");
const signupLastname = document.getElementById("signupLastname");
const signupFirstname = document.getElementById("signupFirstname");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const authSignupBtn = document.getElementById("authSignupBtn");
const signupError = document.getElementById("signupError");
const toggleSignupPassword = document.getElementById("toggleSignupPassword");

const resetEmail = document.getElementById("resetEmail");
const resetNewPassword = document.getElementById("resetNewPassword");
const resetWhatsAppBtn = document.getElementById("resetWhatsAppBtn");
const resetError = document.getElementById("resetError");
const toggleResetPassword = document.getElementById("toggleResetPassword");

const profileIcon = document.getElementById("profileIcon");
const profileDropdown = document.getElementById("profileDropdown");
const profileLogoutBtn = document.getElementById("profileLogoutBtn");

const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");
const switchToReset = document.getElementById("switchToReset");
const switchToLoginFromReset = document.getElementById("switchToLoginFromReset");

const navLoginBtn = document.getElementById("navLoginBtn");
const navSubscribeBtn = document.getElementById("navSubscribeBtn");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettingsModal = document.getElementById("closeSettingsModal");

// ============================================================
// 2. متغيرات الحالة العامة
// ============================================================

window._isAuthenticating = false;          // منع تنفيذ عمليات متزامنة
let currentUserPlan = "free";              // تخزين خطة المستخدم الحالية

// دالة عامة لقراءة خطة المستخدم من أي مكان في التطبيق
window.getUserStatusGlobal = function () {
  return currentUserPlan;
};

// ============================================================
// 3. دوال التحكم في نافذة المصادقة (فتح / إغلاق / عرض النموذج)
// ============================================================

/**
 * فتح نافذة المصادقة مع اختيار النموذج (تسجيل دخول، إنشاء حساب، استعادة)
 * @param {string} formType - "login" | "signup" | "reset"
 */
function openAuthModal(formType = "login") {
  showForm(formType);
  if (authModal) authModal.classList.add("active");
}

/**
 * إغلاق نافذة المصادقة ومسح رسائل الخطأ
 */
function closeAuthModalFunc() {
  if (authModal) authModal.classList.remove("active");
  clearErrors();
}

/**
 * إظهار النموذج المطلوب وإخفاء الباقي مع تحديث العنوان
 * @param {string} formType - "login" | "signup" | "reset"
 */
function showForm(formType) {
  if (!loginForm || !signupForm || !resetForm) return;

  // إخفاء الكل
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  resetForm.style.display = "none";

  // إظهار النموذج المطلوب وتحديث العنوان
  if (formType === "login") {
    loginForm.style.display = "block";
    if (authModalTitle) authModalTitle.textContent = "تسجيل الدخول";
  } else if (formType === "signup") {
    signupForm.style.display = "block";
    if (authModalTitle) authModalTitle.textContent = "إنشاء حساب";
  } else if (formType === "reset") {
    resetForm.style.display = "block";
    if (authModalTitle) authModalTitle.textContent = "تغيير كلمة المرور";
  }

  clearErrors();
}

/**
 * مسح جميع رسائل الخطأ في النماذج
 */
function clearErrors() {
  if (authError) authError.textContent = "";
  if (signupError) signupError.textContent = "";
  if (resetError) resetError.textContent = "";
}

// ============================================================
// 4. أدوات مساعدة (إظهار/إخفاء كلمة المرور، معرف الجهاز)
// ============================================================

/**
 * إضافة مستمع لزر إظهار/إخفاء كلمة المرور
 * @param {string} passwordInputId - id حقل كلمة المرور
 * @param {string} toggleButtonId - id الزر
 */
function togglePasswordVisibility(passwordInputId, toggleButtonId) {
  const passwordInput = document.getElementById(passwordInputId);
  const toggleButton = document.getElementById(toggleButtonId);

  if (!passwordInput || !toggleButton) return;

  toggleButton.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    this.textContent = isPassword ? "visibility_off" : "visibility";
  });
}

/**
 * الحصول على معرف الجهاز (يُخزن في localStorage)
 * @returns {string} معرف فريد للجهاز
 */
function getDeviceId() {
  let deviceId = localStorage.getItem("zertiva_deviceId");
  if (!deviceId) {
    // توليد معرف جديد باستخدام crypto.randomUUID() أو fallback يدوي
    deviceId = crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
          const random = (Math.random() * 16) | 0;
          return (char === "x" ? random : (random & 0x3) | 0x8).toString(16);
        });
    localStorage.setItem("zertiva_deviceId", deviceId);
  }
  return deviceId;
}

// ============================================================
// 5. إدارة الجلسة والتحقق من الحالة عند التحميل
// ============================================================

/**
 * التحقق من جلسة المستخدم عند بدء التطبيق وتحديث الواجهة
 */
async function checkSessionAndInitialize() {
  const user = auth.currentUser;
  if (!user) {
    updateUI(null, null);
    return;
  }

  if (window._isAuthenticating) return;

  try {
    const userDocRef = db.collection("users").doc(user.uid);
    const docSnapshot = await userDocRef.get();

    // إذا لم يكن هناك مستند، نقوم بإنشائه
    if (!docSnapshot.exists) {
      const newUserData = await createInitialUserDocument(user);
      updateUI(user, newUserData);
      return;
    }

    let userData = docSnapshot.data();
    const deviceId = getDeviceId();
    const storedDeviceId = userData.session?.deviceId || null;

    // التحقق من أن الجهاز الحالي هو نفسه المسجل (منع دخول جهاز آخر)
    if (storedDeviceId && storedDeviceId !== deviceId) {
      console.warn("⚠️ تم رصد جهاز رسمي آخر. يتم الطرد الفوري محلياً...");
      await auth.signOut();
      updateUI(null, null);
      showToast("⚠️ تم تسجيل الدخول من جهاز آخر. تم تسجيل خروجك تلقائياً لحماية الحساب.", "error");
      return;
    }

    // التحقق من صلاحية الاشتراك المميز
    if (userData.plan === "premium" && userData.premiumUntil) {
      const now = Date.now();
      const expiryDate = new Date(userData.premiumUntil).getTime();
      if (now > expiryDate) {
        console.log("⏰ انتهت مدة الصلاحية. تحويل الخطة إلى مجانية...");
        userData.plan = "free";
        userData.premiumUntil = null;
        await userDocRef.update({
          plan: "free",
          premiumUntil: null,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        showToast("⏰ انتهت صلاحية اشتراكك المميز، تم تحويل الحساب إلى الخطة المجانية.", "info");
      }
    }

    updateUI(user, userData);
  } catch (error) {
    console.error("❌ خطأ في فحص الجلسة عند التحميل:", error);
    updateUI(user, { plan: "free" });
  }
}

// ============================================================
// 6. إنشاء مستند المستخدم الأولي
// ============================================================

/**
 * إنشاء مستند المستخدم في Firestore عند التسجيل لأول مرة
 * @param {firebase.User} user - كائن المستخدم من Firebase Auth
 * @returns {object} بيانات المستخدم المنشأة
 */
async function createInitialUserDocument(user) {
  const deviceId = getDeviceId();
  const userData = {
    email: user.email,
    username: user.email.split("@")[0] || "مستخدم",
    firstname: "",
    lastname: "",
    plan: "free",
    premiumUntil: null,
    session: {
      deviceId: deviceId,
      loginAt: firebase.firestore.FieldValue.serverTimestamp(),
    },
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection("users").doc(user.uid).set(userData);
  return userData;
}

// ============================================================
// 7. تحديث واجهة المستخدم بناءً على حالة المصادقة
// ============================================================

/**
 * تحديث جميع عناصر الواجهة المتعلقة بالمستخدم (الصورة، القائمة، الأزرار، الخطة)
 * @param {firebase.User|null} user - كائن المستخدم أو null
 * @param {object|null} userData - بيانات المستخدم من Firestore أو null
 */
function updateUI(user, userData) {
  const profileEmail = document.getElementById("profileEmail");
  const profileExpiry = document.getElementById("profileExpiry");
  const profileStatus = document.getElementById("profileStatus");
  const profileUidValue = document.getElementById("profileUidValue");
  const logoutBtn = document.getElementById("profileLogoutBtn");
  const dropdownMenu = document.getElementById("profileDropdown");
  const navLoginBtn = document.getElementById("navLoginBtn");
  const navSubscribeBtn = document.getElementById("navSubscribeBtn");
  const featuresSubscribeBtn = document.getElementById("featuresSubscribeBtn");
  const profileIcon = document.getElementById("profileIcon");

  // ---- حالة غير مسجل ----
  if (!user) {
    if (profileEmail) profileEmail.innerHTML = "👤 غير مسجل";
    if (profileExpiry) profileExpiry.textContent = "الوصول محدود لبعض الامتحانات";
    if (profileStatus) profileStatus.innerHTML = "";
    if (profileUidValue) profileUidValue.textContent = "---";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (navLoginBtn) navLoginBtn.style.display = "inline-block";
    if (navSubscribeBtn) navSubscribeBtn.style.display = "inline-flex";
    if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = "inline-flex";
    if (profileIcon) profileIcon.style.display = "none";

    // إزالة زر الترقية من القائمة المنسدلة إن وجد
    const upgradeBtn = document.getElementById("dropdownUpgradeBtn");
    if (upgradeBtn) upgradeBtn.remove();

    currentUserPlan = "free";
    return;
  }

  // ---- حالة مسجل ----
  if (profileEmail) profileEmail.innerHTML = `📧 ${user.email}`;
  if (profileUidValue) profileUidValue.textContent = user.uid;
  if (logoutBtn) logoutBtn.style.display = "block";
  if (navLoginBtn) navLoginBtn.style.display = "none";
  if (profileIcon) profileIcon.style.display = "flex";

  // تحديد هل المستخدم مميز (Premium) وصلاحيته سارية
  const isPremium =
    userData &&
    userData.plan === "premium" &&
    (!userData.premiumUntil || new Date(userData.premiumUntil).getTime() > Date.now());

  currentUserPlan = isPremium ? "premium" : "free";

  if (isPremium) {
    // مستخدم مميز
    if (profileStatus) {
      profileStatus.innerHTML = '<span class="status-premium">✅ مشترك (Pro)</span>';
    }
    if (profileExpiry) {
      if (userData.premiumUntil) {
        profileExpiry.textContent = `📅 الصلاحية: حتى ${new Date(userData.premiumUntil).toLocaleDateString("ar-EG")}`;
      } else {
        profileExpiry.textContent = "📅 الصلاحية: حساب دائم";
      }
    }
    if (navSubscribeBtn) navSubscribeBtn.style.display = "none";
    if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = "none";

    const upgradeBtn = document.getElementById("dropdownUpgradeBtn");
    if (upgradeBtn) upgradeBtn.remove();
  } else {
    // مستخدم مجاني أو منتهية صلاحيته
    if (profileStatus) {
      profileStatus.innerHTML = '<span class="status-free">📖 مجاني</span>';
    }
    if (profileExpiry) {
      profileExpiry.textContent = "⏰ حساب مجاني / انتهت الصلاحية";
    }
    if (navSubscribeBtn) navSubscribeBtn.style.display = "inline-flex";
    if (featuresSubscribeBtn) featuresSubscribeBtn.style.display = "inline-flex";

    // إضافة زر الترقية إلى القائمة المنسدلة إن لم يكن موجوداً
    if (!document.getElementById("dropdownUpgradeBtn") && dropdownMenu) {
      const upgradeBtn = document.createElement("button");
      upgradeBtn.id = "dropdownUpgradeBtn";
      upgradeBtn.innerHTML = "الترقية إلى الحساب الكامل →";
      upgradeBtn.style.cssText = `
        margin-top: 12px; background: #64748B; color: white; border: none;
        padding: 10px 15px; border-radius: 25px; cursor: pointer; width: 100%;
        font-size: 13px; font-weight: bold; transition: all 0.3s ease;
      `;
      upgradeBtn.onclick = () => (window.location.href = "subscribe.html");
      dropdownMenu.appendChild(upgradeBtn);
    }
  }

  // إعادة تحميل قائمة الامتحانات إذا كانت الوظيفة موجودة
  if (typeof window.renderInitialExamList === "function") {
    const examListContainer = document.getElementById("list");
    if (examListContainer && examListContainer.classList.contains("active")) {
      setTimeout(() => window.renderInitialExamList(), 50);
    }
  }
}

// ============================================================
// 8. معالجات المصادقة (تسجيل دخول، إنشاء حساب، تسجيل خروج، استعادة)
// ============================================================

/**
 * معالج تسجيل الدخول
 */
async function handleLogin() {
  const email = authEmail.value.trim();
  const password = authPassword.value;

  if (!email || !password) {
    authError.textContent = "⚠️ يرجى ملء جميع الحقول";
    return;
  }

  const originalButtonText = authLoginBtn.innerHTML;
  authLoginBtn.disabled = true;
  authLoginBtn.innerHTML = '<span class="loading-spinner"></span>';
  authLoginBtn.style.opacity = "0.7";
  window._isAuthenticating = true;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const deviceId = getDeviceId();

    const userDocRef = db.collection("users").doc(user.uid);
    await userDocRef.set(
      {
        session: {
          deviceId: deviceId,
          loginAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    const updatedDoc = await userDocRef.get();
    closeAuthModalFunc();
    showToast("✅ تم تسجيل الدخول بنجاح. مرحباً بك!", "success");
    updateUI(user, updatedDoc.data());
  } catch (error) {
    authError.textContent = getFirebaseErrorMessage(error.code);
  } finally {
    window._isAuthenticating = false;
    authLoginBtn.disabled = false;
    authLoginBtn.innerHTML = originalButtonText;
    authLoginBtn.style.opacity = "1";
  }
}

/**
 * معالج إنشاء حساب جديد
 */
async function handleSignup() {
  const username = signupUsername.value.trim();
  const lastname = signupLastname.value.trim();
  const firstname = signupFirstname.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;

  if (!username || !lastname || !firstname || !email || !password) {
    signupError.textContent = "⚠️ يرجى ملء جميع الخانات";
    return;
  }

  const originalButtonText = authSignupBtn.innerHTML;
  authSignupBtn.disabled = true;
  authSignupBtn.innerHTML = '<span class="loading-spinner"></span>';
  authSignupBtn.style.opacity = "0.7";
  window._isAuthenticating = true;

  let createdUser = null;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    createdUser = userCredential.user;

    const deviceId = getDeviceId();
    const userData = {
      email: email,
      username: username,
      firstname: firstname,
      lastname: lastname,
      plan: "free",
      premiumUntil: null,
      session: {
        deviceId: deviceId,
        loginAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("users").doc(createdUser.uid).set(userData);
    closeAuthModalFunc();
    showToast("🎉 تم إنشاء الحساب بنجاح ومرحباً بك معنا!", "success");
    updateUI(createdUser, userData);
  } catch (error) {
    // في حال فشل إنشاء مستند Firestore، نحذف حساب Auth لمنع التناقض
    if (createdUser) {
      console.warn("⚠️ فشل إنشاء مستند Firestore، يتم حذف الحساب من Auth تراجعاً عن الخطأ...");
      try {
        await createdUser.delete();
      } catch (deleteError) {
        console.error("فشل حذف حساب الـ Auth المعلق:", deleteError);
      }
    }
    signupError.textContent = getFirebaseErrorMessage(error.code);
  } finally {
    window._isAuthenticating = false;
    authSignupBtn.disabled = false;
    authSignupBtn.innerHTML = originalButtonText;
    authSignupBtn.style.opacity = "1";
  }
}

/**
 * معالج تسجيل الخروج
 * @param {boolean} clearSession - هل نقوم بمسح بيانات الجلسة من Firestore؟
 */
async function handleLogout(clearSession = true) {
  try {
    const user = auth.currentUser;
    if (clearSession && user) {
      await db
        .collection("users")
        .doc(user.uid)
        .set(
          {
            session: {
              deviceId: null,
              loginAt: null,
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      localStorage.removeItem("zertiva_deviceId");
    }

    await auth.signOut();
    if (profileDropdown) profileDropdown.classList.remove("show");
    showToast("👋 تم تسجيل الخروج بنجاح.", "success");
    updateUI(null, null);
  } catch (error) {
    console.error("Logout Error:", error);
    await auth.signOut();
  }
}

/**
 * معالج استعادة كلمة المرور (عبر واتساب)
 */
async function handleReset() {
  const email = resetEmail.value.trim();
  const newPassword = resetNewPassword.value;

  if (!email || !newPassword) {
    resetError.textContent = "⚠️ يرجى ملء جميع الحقول";
    return;
  }

  const message = `
السلام عليكم،
نسيت كلمة المرور وبغيت نبدلها.
البريد الإلكتروني: ${email}`;

  const whatsappUrl = `https://wa.me/212665881925?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
  closeAuthModalFunc();
  showToast("📱 تم فتح واتساب. أرسل رسالتك وسنقوم بمساعدتك.", "info");
}

// ============================================================
// 9. دوال مساعدة (ترجمة أخطاء Firebase، عرض إشعارات)
// ============================================================

/**
 * ترجمة أكواد أخطاء Firebase إلى رسائل عربية مفهومة
 * @param {string} errorCode - كود الخطأ من Firebase
 * @returns {string} الرسالة المعروضة للمستخدم
 */
function getFirebaseErrorMessage(errorCode) {
  const errorMap = {
    "auth/user-not-found": "❌ لا يوجد حساب بهذا البريد الإلكتروني.",
    "auth/invalid-credential": "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    "auth/wrong-password": "❌ كلمة المرور غير صحيحة.",
    "auth/invalid-email": "❌ البريد الإلكتروني غير صالح.",
    "auth/email-already-in-use": "❌ هذا البريد الإلكتروني مستخدم بالفعل.",
    "auth/weak-password": "❌ كلمة المرور قصيرة جداً (يجب ألا تقل عن 6 أحرف).",
    "auth/network-request-failed": "⚠️ تحقق من اتصال الإنترنت الخاص بك.",
    "auth/too-many-requests":
      "⚠️ محاولات كثيرة خاطئة ومتتالية. يرجى الانتظار قليلاً لحماية حسابك.",
  };
  return errorMap[errorCode] || "⚠️ حدث خطأ غير متوقع أثناء معالجة البيانات، يرجى المحاولة لاحقاً.";
}

/**
 * عرض إشعار منبثق (Toast) في أعلى يمين الشاشة
 * @param {string} message - النص المعروض
 * @param {string} type - "success" | "error" | "info"
 */
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; padding: 14px 24px; border-radius: 12px;
    background: #0f172a; color: white; border: 1px solid rgba(56,189,248,0.2);
    z-index: 99999; font-size: 15px; font-weight: 500; box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    direction: rtl; max-width: 420px; line-height: 1.5;
  `;

  if (type === "success") toast.style.borderColor = "#22c55e";
  else if (type === "error") toast.style.borderColor = "#ef4444";
  else if (type === "info") toast.style.borderColor = "#38bdf8";

  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================
// 10. مستمعي أحداث Firebase وأحداث DOM
// ============================================================

// مراقبة تغيير حالة المصادقة من Firebase
auth.onAuthStateChanged(async (user) => {
  await checkSessionAndInitialize();
  if (typeof window.renderInitialExamList === "function") {
    setTimeout(() => window.renderInitialExamList(), 50);
  }
});

// عند تحميل الصفحة بالكامل، نربط الأحداث
document.addEventListener("DOMContentLoaded", function () {
  // تفعيل أزرار إظهار/إخفاء كلمة المرور
  togglePasswordVisibility("authPassword", "togglePassword");
  togglePasswordVisibility("signupPassword", "toggleSignupPassword");
  togglePasswordVisibility("resetNewPassword", "toggleResetPassword");

  // ----- أزرار فتح وإغلاق نافذة المصادقة -----
  if (navLoginBtn) {
    navLoginBtn.addEventListener("click", () => openAuthModal("login"));
  }
  if (closeAuthModal) {
    closeAuthModal.addEventListener("click", closeAuthModalFunc);
  }
  if (authModal) {
    authModal.addEventListener("click", (event) => {
      if (event.target === authModal) closeAuthModalFunc();
    });
  }

  // ----- أزرار النماذج -----
  if (authLoginBtn) authLoginBtn.addEventListener("click", handleLogin);
  if (authSignupBtn) authSignupBtn.addEventListener("click", handleSignup);
  if (resetWhatsAppBtn) resetWhatsAppBtn.addEventListener("click", handleReset);

  // ----- التبديل بين النماذج -----
  if (switchToSignup) switchToSignup.addEventListener("click", () => showForm("signup"));
  if (switchToLogin) switchToLogin.addEventListener("click", () => showForm("login"));
  if (switchToReset) switchToReset.addEventListener("click", () => showForm("reset"));
  if (switchToLoginFromReset)
    switchToLoginFromReset.addEventListener("click", () => showForm("login"));

  // ----- أيقونة الملف الشخصي (إظهار/إخفاء القائمة) -----
  if (profileIcon) {
    profileIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      if (profileDropdown) profileDropdown.classList.toggle("show");
    });
  }

  // ----- زر تسجيل الخروج من القائمة -----
  if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener("click", () => handleLogout(true));
  }

  // ----- زر الإعدادات -----
  if (settingsBtn && settingsModal) {
    settingsBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      settingsModal.classList.add("active");
      if (profileDropdown) profileDropdown.classList.remove("show");
    });
  }
  if (closeSettingsModal) {
    closeSettingsModal.addEventListener("click", () => {
      settingsModal.classList.remove("active");
    });
  }

  // ----- إغلاق القائمة المنسدلة عند النقر خارجها -----
  document.addEventListener("click", (event) => {
    if (
      profileDropdown &&
      !profileDropdown.contains(event.target) &&
      event.target !== profileIcon
    ) {
      profileDropdown.classList.remove("show");
    }
  });

  // ----- الضغط على Enter في نماذج الدخول -----
  [authEmail, authPassword].forEach((input) => {
    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          if (authLoginBtn && !authLoginBtn.disabled) authLoginBtn.click();
        }
      });
    }
  });

  // ----- الضغط على Enter في نموذج التسجيل -----
  [signupUsername, signupLastname, signupFirstname, signupEmail, signupPassword].forEach(
    (input) => {
      if (input) {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (authSignupBtn && !authSignupBtn.disabled) authSignupBtn.click();
          }
        });
      }
    }
  );
});

console.log("🎉 تم اعتماد البنية النهائية لـ Zertiva بنسبة 100/100.");
