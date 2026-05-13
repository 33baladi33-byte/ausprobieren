
// ============================================
// جميع البيانات (HELP_DATA)
// ============================================
const HELP_DATA = {};

// ============================================
// Hören Teil 1
// ============================================

// ============================================
// Hören Teil 1 - Exams 1-45 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 1: Die Deutsche Lufthansa (صحيح: 2,3) ==========
HELP_DATA["hoeren1_exam1_q2"] = {
    text: "Ein Bonner Sportverein zeigt der Öffentlichkeit",
    meaning: "ناد رياضي في بون يعرض خدماته على الجمهور",
    keywords: ["Bonner = من بون", "Sportverein = ناد رياضي", "Öffentlichkeit = الجمهور"],
    simplified: "النادي الرياضي يعرض خدماته للناس",
    imagine: "لاعب كرة يصرخ 'تعالوا سجلوا عندنا'"
};

HELP_DATA["hoeren1_exam1_q3"] = {
    text: "Die Rahmenbedingungen in deutschen Pflegeheimen bedürfen",
    meaning: "الظروف في دور الرعاية الألمانية تحتاج تغييرا عاجلا",
    keywords: ["Rahmenbedingungen = الظروف", "Pflegeheimen = دور الرعاية", "Änderung = تغيير"],
    simplified: "دور المسنين في ألمانيا تحتاج تغييرا",
    imagine: "جدة عجوز ترفع لافتة 'نريد تغييرا الآن'"
};

// ========== Exam 2: Die Piloten der Lufthansa (صحيح: 3,5) ==========
HELP_DATA["hoeren1_exam2_q3"] = {
    text: "Immer mehr Menschen besuchen den Tag",
    meaning: "المزيد من الناس يزورون يوم الآثار المفتوحة",
    keywords: ["Tag des offenen Denkmals = يوم الآثار المفتوحة", "Menschen = ناس", "besuchen = يزورون"],
    simplified: "ناس كثيرون يزورون المعالم التاريخية",
    imagine: "طابور طويل أمام متحف قديم"
};

HELP_DATA["hoeren1_exam2_q5"] = {
    text: "Bei den Fußballspielen gab es keinen",
    meaning: "لم يكن هناك فائز في مباريات كرة القدم",
    keywords: ["Fußballspielen = مباريات كرة قدم", "Sieger = فائز", "keinen = لا يوجد"],
    simplified: "مباراة كرة القدم لم تخرج فائزا",
    imagine: "لاعبان يتصافحان بعد تعادل صفري"
};

// ========== Exam 3: Die Stadt Friedrichsberg (صحيح: 2,3,5) ==========
HELP_DATA["hoeren1_exam3_q2"] = {
    text: "Die Alte Brücke ist zum Jahresbeginn",
    meaning: "الجسر القديم أصبح سالكا مع بداية العام",
    keywords: ["Alte Brücke = جسر قديم", "Jahresbeginn = بداية العام", "befahrbar = سالك"],
    simplified: "الجسر القديم فتح مع رأس السنة",
    imagine: "جسر قديم مكتوب عليه 'الطريق مفتوح'"
};

HELP_DATA["hoeren1_exam3_q3"] = {
    text: "Der Wanderer wurde verarztet und in",
    meaning: "تم إسعاف المتنزه ونقله لمكان آمن",
    keywords: ["Wanderer = متنزه", "verarztet = تم إسعافه", "in Sicherheit gebracht = نقل لمكان آمن"],
    simplified: "المتنزه أسعف ونقل لمكان آمن",
    imagine: "سيارة إسعاف تنقل رجلا مصابا من الجبل"
};

HELP_DATA["hoeren1_exam3_q5"] = {
    text: "Man kann nach einer Registrierung an",
    meaning: "يمكن المشاركة في سباق جماعي بعد التسجيل",
    keywords: ["Registrierung = تسجيل", "Gruppenlauf = سباق جماعي", "teilnehmen = المشاركة"],
    simplified: "تستطيع المشاركة في سباق بعد التسجيل",
    imagine: "عداؤون يسجلون أسماءهم للسباق"
};

// ========== Exam 4: Erdbeben (صحيح: 1,5) ==========
HELP_DATA["hoeren1_exam4_q1"] = {
    text: "Nach dem Erdbeben meldeten viele Bürger",
    meaning: "بعد الزلزال أبلغ المواطنون عن أضرار للشرطة والإطفاء",
    keywords: ["Erdbeben = زلزال", "Schäden = أضرار", "Polizei = شرطة", "Feuerwehr = إطفاء"],
    simplified: "بعد الزلزال بلغ الناس البوليس والإطفاء",
    imagine: "منزل منهار وسيارات إطفاء تصل"
};

HELP_DATA["hoeren1_exam4_q5"] = {
    text: "Anfang nächster Woche ist mit einer",
    meaning: "من المتوقع ارتفاع الأوزون بداية الأسبوع القادم",
    keywords: ["Anfang nächster Woche = بداية الأسبوع القادم", "erhöhten Ozonbelastung = ارتفاع الأوزون", "rechnen = توقع"],
    simplified: "الأوزون سيرتفع مع بداية الأسبوع",
    imagine: "شمس حارقة وكبار سن يعطسون"
};

// ========== Exam 5: Bierkonsum (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam5_q2"] = {
    text: "Deutsche Einkommen liegen im europäischen",
    meaning: "الدخل الألماني في منتصف الترتيب الأوروبي",
    keywords: ["Einkommen = دخل", "europäischen Vergleich = مقارنة أوروبية", "Mittelfeld = منتصف الترتيب"],
    simplified: "رواتب الألمان في الوسط بأوروبا",
    imagine: "ميزان يقف في المنتصف بالضبط"
};

HELP_DATA["hoeren1_exam5_q4"] = {
    text: "Es wird Gewalt von Fußballfans auch",
    meaning: "يخشى من عنف مشجعي كرة القدم في ألمانيا أيضا",
    keywords: ["Gewalt = عنف", "Fußballfans = مشجعي كرة قدم", "befürchtet = يخشى"],
    simplified: "العنف الكروي موجود في ألمانيا أيضا",
    imagine: "مشجع غاضب يكسر كرسيا في الملعب"
};

// ========== Exam 6: Bierkonsum (Mittel) (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam6_q2"] = {
    text: "Deutsche Einkommen liegen im europäischen",
    meaning: "الدخل الألماني في منتصف الترتيب الأوروبي",
    keywords: ["Einkommen = دخل", "europäischen Vergleich = مقارنة أوروبية", "Mittelfeld = منتصف الترتيب"],
    simplified: "ألمانيا في الوسط في الرواتب",
    imagine: "ألماني وإنجليزي يتساويان في الراتب"
};

HELP_DATA["hoeren1_exam6_q4"] = {
    text: "Man befürchtet auch in Deutschland Gewalt",
    meaning: "يخشى من عنف مشجعي الكرة في ألمانيا أيضا",
    keywords: ["befürchtet = يخشى", "Gewalt = عنف", "Fußballfans = مشجعي كرة قدم"],
    simplified: "الخوف من عنف المشجعين في ألمانيا",
    imagine: "علم أحمر يرفع قبل المباراة"
};

// ========== Exam 7: Deutsches Schiff (صحيح: 1,2,5) ==========
HELP_DATA["hoeren1_exam7_q1"] = {
    text: "Ein deutsches Schiff ist am Südpol",
    meaning: "سفينة ألمانية تجمدت بالقطب الجنوبي والناس بخير",
    keywords: ["deutsches Schiff = سفينة ألمانية", "Südpol = قطب جنوبي", "eingefroren = مجمدة", "Menschen kamen nicht zu Schaden = الناس بخير"],
    simplified: "سفينة ألمانية تجمدت في القطب الجنوبي",
    imagine: "سفينة مغطاة بالثلج ومدخنة تخرج دخانا"
};

HELP_DATA["hoeren1_exam7_q2"] = {
    text: "Die Firma Brain International ist in",
    meaning: "شركة Brain International دخلت في صعوبات اقتصادية",
    keywords: ["Firma = شركة", "Brain International = Brain International", "wirtschaftliche Schwierigkeiten = صعوبات اقتصادية"],
    simplified: "شركة Brain International دخلت في المشاكل",
    imagine: "مدير يحزم أوراقه وصناديق فارغة"
};

HELP_DATA["hoeren1_exam7_q5"] = {
    text: "Nach den Bürgermeisterwahlen in Bensheim",
    meaning: "بعد انتخابات العمدة في بنسهايم يبقى الحزب المسيحي في الحكم",
    keywords: ["Bürgermeisterwahlen = انتخابات عمدة", "Bensheim = بنسهايم", "CDU = الحزب المسيحي", "weiterhin an der Regierung = باق في الحكم"],
    simplified: "الحزب المسيحي بقي في الحكم بعد الانتخابات",
    imagine: "عمدة يرفع يده منتصرا والناس تصفق"
};

// ========== Exam 8: Weniger Vögel, Viele Kunden (صحيح: 3,4,5) ==========
HELP_DATA["hoeren1_exam8_q3"] = {
    text: "Europaweit gibt es immer weniger",
    meaning: "عدد الطيور يقل في جميع أنحاء أوروبا",
    keywords: ["Europaweit = في كل أوروبا", "weniger Vögel = طيور أقل", "gibt es = هناك"],
    simplified: "الطيور تقل في كل أوروبا",
    imagine: "سماء خالية من العصافير تماما"
};

HELP_DATA["hoeren1_exam8_q4"] = {
    text: "Die Polizei hat auf der Autobahn",
    meaning: "الشرطة اكتشفت مركبة ممنوعة على الطريق السريع",
    keywords: ["Polizei = شرطة", "Autobahn = طريق سريع", "verbotenes Fahrzeug = مركبة ممنوعة", "entdeckt = اكتشفت"],
    simplified: "البوليس وجد سيارة ممنوعة على الأوتوبان",
    imagine: "سيارة غريبة الشكل وأضواء بوليس خلفها"
};

HELP_DATA["hoeren1_exam8_q5"] = {
    text: "Bei dem Festival konnte man Konzerte",
    meaning: "يمكن حضور الحفلات الموسيقية في أماكن مختلفة بالمهرجان",
    keywords: ["Festival = مهرجان", "Konzerte = حفلات موسيقية", "verschiedenen Orten = أماكن مختلفة"],
    simplified: "الحفلات كانت في أماكن مختلفة بالمهرجان",
    imagine: "ثلاث مسارح وكل واحد يعزف موسيقى مختلفة"
};

// ========== Exam 9: Europäische Union (صحيح: 1,2) ==========
HELP_DATA["hoeren1_exam9_q1"] = {
    text: "In der Europäischen Union verzeichnet man",
    meaning: "الاتحاد الأوروبي يسجل انخفاضا في بطالة الشباب",
    keywords: ["Europäische Union = الاتحاد الأوروبي", "weniger jugendliche Arbeitslose = بطالة شباب أقل", "verzeichnet = يسجل"],
    simplified: "الاتحاد الأوروبي سجل نقصا في عاطلين الشباب",
    imagine: "شاب يلقي قبعة التخرج في الهواء"
};

HELP_DATA["hoeren1_exam9_q2"] = {
    text: "Das Bundesarbeitsministerium bemüht sich",
    meaning: "وزارة العمل تسعى لجلب عمال أجانب من مهن محددة",
    keywords: ["Bundesarbeitsministerium = وزارة العمل", "ausländische Arbeitnehmer = عمال أجانب", "bestimmter Berufsgruppen = مهن محددة"],
    simplified: "وزارة العمل تريد جلب عمال أجانب لمهن معينة",
    imagine: "وزير يفتح الباب لعمال يحملون حقائب"
};

// ========== Exam 10: Unwetterschäden (صحيح: 1,4) ==========
HELP_DATA["hoeren1_exam10_q1"] = {
    text: "Wegen Unwetterschäden wurden Urlauber",
    meaning: "بسبب أضرار العواصف تم إيواء السياح في مأوى طوارئ",
    keywords: ["Unwetterschäden = أضرار العواصف", "Urlauber = سياح", "Notunterkunft = مأوى طوارئ"],
    simplified: "السياح سكنوا في خيام طوارئ بسبب العواصف",
    imagine: "خيمة كبيرة وسياح نائمون على الأرض"
};

HELP_DATA["hoeren1_exam10_q4"] = {
    text: "Am 21. Mai ist der Besuch der",
    meaning: "في 21 مايو زيارة المعرض الخاص مجانية",
    keywords: ["21. Mai = 21 مايو", "Sonderausstellung = معرض خاص", "kostenlos = مجاني"],
    simplified: "دخول المعرض الخاص مجاني في 21 مايو",
    imagine: "لافتة مكتوب عليها 'الدخول مجاني اليوم'"
};

// ========== Exam 11: Nicht sicher (صحيح: 1,4) ==========
HELP_DATA["hoeren1_exam11_q1"] = {
    text: "Es ist nicht sicher, ob es",
    meaning: "ليس من المؤكد ما إذا كانت هذه المشكلة يمكن أن تحدث مرة أخرى",
    keywords: ["nicht sicher = غير مؤكد", "Problem = مشكلة", "wieder auftreten = تحدث مرة أخرى"],
    simplified: "ليس من المؤكد عودة هذه المشكلة",
    imagine: "رجل يهز كتفيه بجهل"
};

HELP_DATA["hoeren1_exam11_q4"] = {
    text: "Die Produkte von TipTop sind in",
    meaning: "منتجات TipTop لم تعد مطلوبة في ألمانيا",
    keywords: ["Produkte = منتجات", "TipTop = TipTop", "nicht mehr so gefragt = لم تعد مطلوبة"],
    simplified: "منتجات TipTop لم تعد مطلوبة",
    imagine: "رف خال تماما بدون منتجات"
};

// ========== Exam 12: Nicht sicher 2 (صحيح: 1,4) ==========
HELP_DATA["hoeren1_exam12_q1"] = {
    text: "Es ist unklar, ob das Problem",
    meaning: "ليس من الواضح ما إذا كانت المشكلة يمكن أن تحدث مرة أخرى",
    keywords: ["unklar = غير واضح", "Problem = مشكلة", "wieder auftreten = تحدث مرة أخرى"],
    simplified: "نعود المشكلة مرة أخرى غير واضح",
    imagine: "علامة استفهام كبيرة في الهواء"
};

HELP_DATA["hoeren1_exam12_q4"] = {
    text: "Die Produkte von TipTop sind in",
    meaning: "منتجات TipTop لم تعد مطلوبة في ألمانيا",
    keywords: ["Produkte = منتجات", "TipTop = TipTop", "nicht mehr so gefragt = لم تعد مطلوبة"],
    simplified: "منتجات TipTop لا يطلبها أحد",
    imagine: "زبون يمر بجانب منتج دون النظر له"
};

// ========== Exam 13: Frau Jürgens (صحيح: 3,4,5) ==========
HELP_DATA["hoeren1_exam13_q3"] = {
    text: "Der öffentliche Nahverkehr funktioniert noch",
    meaning: "وسائل النقل العام لا تعمل بدون مشاكل بعد",
    keywords: ["öffentliche Nahverkehr = وسائل نقل عام", "funktioniert = تعمل", "störungsfrei = بدون مشاكل"],
    simplified: "النقل العام ما زال به مشاكل",
    imagine: "قطار متوقف وكثيرون ينتظرون"
};

HELP_DATA["hoeren1_exam13_q4"] = {
    text: "Wildes Camping ist im In- und",
    meaning: "التخييم البري مسموح به بشكل محدود داخل الوطن وخارجه",
    keywords: ["Wildes Camping = تخييم بري", "In- und Ausland = داخل وخارج الوطن", "bedingt zugelassen = مسموح بمحدودية"],
    simplified: "التخييم البري مسموح بقليل هنا وهناك",
    imagine: "خيمة نصها داخل الأرض ونصها خارج"
};

HELP_DATA["hoeren1_exam13_q5"] = {
    text: "Die Temperaturen steigen in den",
    meaning: "درجات الحرارة سترتفع في الأيام القادمة",
    keywords: ["Temperaturen = درجات حرارة", "steigen = ترتفع", "nächsten Tagen = الأيام القادمة"],
    simplified: "الحرارة سترتفع الأيام القادمة",
    imagine: "مقياس حرارة يزداد ارتفاعا"
};

// ========== Exam 14: Die Wahlbeteiligung (صحيح: 1,3) ==========
HELP_DATA["hoeren1_exam14_q1"] = {
    text: "Die Wahlbeteiligung in Deutschland nimmt",
    meaning: "نسبة المشاركة في الانتخابات في ألمانيا في ازدياد مرة أخرى",
    keywords: ["Wahlbeteiligung = نسبة مشاركة", "nimmt zu = في ازدياد", "wieder = مرة أخرى"],
    simplified: "المشاركة الانتخابية في ازدياد مرة أخرى",
    imagine: "صناديق اقتراع مملوءة عن آخرها"
};

HELP_DATA["hoeren1_exam14_q3"] = {
    text: "Bei der Sportveranstaltung wurden neue",
    meaning: "تم تسجيل أرقام قياسية جديدة في المنافسة الرياضية",
    keywords: ["Sportveranstaltung = منافسة رياضية", "neue Bestzeiten = أرقام قياسية جديدة", "aufgestellt = سجلت"],
    simplified: "تحطمت أرقام قياسية في المسابقة",
    imagine: "ساعة توقيت تشير لرقم خيالي"
};

// ========== Exam 15: Die Wetterlage in den Alpen (صحيح: 2,3) ==========
HELP_DATA["hoeren1_exam15_q2"] = {
    text: "Die Fans des FC Neustadt waren",
    meaning: "كان مشجعو FC Neustadt متفاجئين بفوز فريقهم",
    keywords: ["Fans = مشجعين", "FC Neustadt = FC Neustadt", "überrascht = متفاجئين", "Sieg = فوز"],
    simplified: "جماهير الفريق فوجئت بالفوز",
    imagine: "جمهور مذهول وأعين واسعة"
};

HELP_DATA["hoeren1_exam15_q3"] = {
    text: "Erzieherinnen verlangen eine bessere",
    meaning: "المربيات يطالبن بأجر أفضل",
    keywords: ["Erzieherinnen = مربيات", "verlangen = يطالبن", "bessere Bezahlung = أجر أفضل"],
    simplified: "المربيات يطالبن براتب أحسن",
    imagine: "معلمة ترفع لافتة 'راتبنا قليل'"
};

// ========== Exam 16: Wetter in den Alpen (Mittel) (صحيح: 2,3,5) ==========
HELP_DATA["hoeren1_exam16_q2"] = {
    text: "Die Fans, die das Spiel unterstützten,",
    meaning: "المشجعون الذين شجعوا الفريق كانوا متفاجئين",
    keywords: ["Fans = مشجعين", "Spiel = مباراة", "unterstützten = شجعوا", "überrascht = متفاجئين"],
    simplified: "الجماهير المشجعة فوجئت",
    imagine: "مشجع يسقط من الكرسي دهشة"
};

HELP_DATA["hoeren1_exam16_q3"] = {
    text: "Eine Familie von Pandas kommt",
    meaning: "عائلة من الباندا تصل إلى الحديقة",
    keywords: ["Familie = عائلة", "Pandas = باندا", "kommt an = تصل", "Park = حديقة"],
    simplified: "عائلة باندا وصلت للحديقة",
    imagine: "أم وأب وطفل من الباندا يأكلون الخيزران"
};

HELP_DATA["hoeren1_exam16_q5"] = {
    text: "Erzieherinnen verlangen bessere Bezahlung",
    meaning: "المربيات يطالبن بأجر أفضل",
    keywords: ["Erzieherinnen = مربيات", "verlangen = يطالبن", "bessere Bezahlung = أجر أفضل"],
    simplified: "المربيات يطلبن راتبا أحسن",
    imagine: "معلمات يتظاهرن والأطفال يلعبون"
};

// ========== Exam 17: Insel Bali (صحيح: 4,5) ==========
HELP_DATA["hoeren1_exam17_q4"] = {
    text: "Der Sekthersteller hat die Pläne",
    meaning: "غيرت شركة الشمبانيا خطط مشروع البناء الخاص بها",
    keywords: ["Sekthersteller = شركة شمبانيا", "Pläne = خطط", "Bauvorhaben = مشروع بناء", "geändert = غيرت"],
    simplified: "شركة الشمبانيا غيرت خطط البناء",
    imagine: "مخطط بناء ممزق وآخر جديد بدله"
};

HELP_DATA["hoeren1_exam17_q5"] = {
    text: "Die Löscharbeiten sind noch nicht",
    meaning: "عمليات إطفاء الحريق لم تنته بعد",
    keywords: ["Löscharbeiten = عمليات إطفاء", "nicht abgeschlossen = لم تنته", "noch = بعد"],
    simplified: "الإطفاء لم ينته بعد",
    imagine: "رجل إطفاء يرتدي خوذته ومستعد"
};

// ========== Exam 18: Die Fluggesellschaft (صحيح: 1,3,5) ==========
HELP_DATA["hoeren1_exam18_q1"] = {
    text: "Kunden der Fluggesellschaft DL äußern",
    meaning: "عملاء شركة الطيران DL يعبرون عن عدم رضاهم",
    keywords: ["Kunden = عملاء", "Fluggesellschaft DL = شركة طيران DL", "Unzufriedenheit = عدم رضا", "äußern = يعبرون"],
    simplified: "زبائن DL غير راضين عن الخدمة",
    imagine: "مسافر غاضب يشير بيديه في المطار"
};

HELP_DATA["hoeren1_exam18_q3"] = {
    text: "Die Sonnenstürme hatten keine negativen",
    meaning: "العواصف الشمسية لم يكن لها آثار سلبية",
    keywords: ["Sonnenstürme = عواصف شمسية", "keine negativen Auswirkungen = لا آثار سلبية", "hatten = كان"],
    simplified: "العواصف الشمسية لم تسبب ضررا",
    imagine: "شمس تضحك وكأن شيئا لم يحدث"
};

HELP_DATA["hoeren1_exam18_q5"] = {
    text: "Das Tiefdruckgebiet 'Helena' kann morgen",
    meaning: "منخفض 'هيلينا' قد يسبب مشاكل مرورية غدا بجنوب غرب ألمانيا",
    keywords: ["Tiefdruckgebiet = منخفض جوي", "Helena = هيلينا", "Verkehrsprobleme = مشاكل مرورية", "Südwesten Deutschlands = جنوب غرب ألمانيا"],
    simplified: "إعصار هيلينا سيسبب زحمة غدا في جنوب غرب ألمانيا",
    imagine: "إعصار صغير يقلب السيارات كاللعب"
};

// ========== Exam 19: Der Fluggesellschaft (Mittel) (صحيح: 1,3,5) ==========
HELP_DATA["hoeren1_exam19_q1"] = {
    text: "Die Fluggesellschaft DL fliegt z.",
    meaning: "شركة الطيران DL لم تعد تسير رحلات إلى روستوك",
    keywords: ["Fluggesellschaft DL = شركة طيران DL", "fliegt nicht mehr an = لم تعد تسير ل", "Rostock = روستوك"],
    simplified: "شركة DL قطعت رحلاتها إلى روستوك",
    imagine: "طائرة تطير في اتجاه معاكس للمدينة"
};

HELP_DATA["hoeren1_exam19_q3"] = {
    text: "Die Sonnenstürme hatten keine negativen",
    meaning: "العواصف الشمسية لم يكن لها آثار سلبية",
    keywords: ["Sonnenstürme = عواصف شمسية", "keine negativen Auswirkungen = لا آثار سلبية", "hatten = كان"],
    simplified: "عواصف الشمس أتت بلا ضرر",
    imagine: "نظارات شمسية بوجه مبتسم"
};

HELP_DATA["hoeren1_exam19_q5"] = {
    text: "Das Tiefdruckgebiet 'Helena' kann morgen",
    meaning: "منخفض 'هيلينا' قد يسبب مشاكل مرورية غدا بجنوب غرب ألمانيا",
    keywords: ["Tiefdruckgebiet = منخفض جوي", "Helena = هيلينا", "Verkehrsprobleme = مشاكل مرورية", "Südwesten Deutschlands = جنوب غرب ألمانيا"],
    simplified: "هيلينا ستسبب زحمة غدا في جنوب غرب ألمانيا",
    imagine: "علامة تحذير حمراء مع رمز إعصار"
};

// ========== Exam 20: Der Bau (صحيح: 1,3,4) ==========
HELP_DATA["hoeren1_exam20_q1"] = {
    text: "Der Bau des höchsten Gebäudes der",
    meaning: "بناء أطول مبنى بالعالم في دبي كلف مليار دولار",
    keywords: ["Bau = بناء", "höchsten Gebäudes = أطول مبنى", "Welt = عالم", "Dubai = دبي", "eine Milliarde Dollar = مليار دولار"],
    simplified: "أطول برج بالعالم بدبي كلف مليار دولار",
    imagine: "برج يخترق السحاب وكومة نقود تحته"
};

HELP_DATA["hoeren1_exam20_q3"] = {
    text: "Die niedersächsischen Grünen haben vor,",
    meaning: "خضر ساكسونيا السفلى يخططون لاستثمار الكثير في المناخ والتعليم",
    keywords: ["niedersächsischen Grünen = خضر ساكسونيا السفلى", "vor = يخططون", "Klimaschutz = حماية المناخ", "Bildung = تعليم"],
    simplified: "حزب الخضر في ساكسونيا سيستثمر في التعليم والمناخ",
    imagine: "شجرة وكتاب تحت أشعة الشمس"
};

HELP_DATA["hoeren1_exam20_q4"] = {
    text: "Der Freiburger FC hat das Finale",
    meaning: "فريق فرايبورغ خسر المباراة النهائية",
    keywords: ["Freiburger FC = فريق فرايبورغ", "Finale = نهائي", "verloren = خسر"],
    simplified: "فريق فرايبورغ خسر النهائي",
    imagine: "كأس خاسر مقلوب على الأرض"
};

// ========== Exam 21: 50-Euro (صحيح: 3) ==========
HELP_DATA["hoeren1_exam21_q3"] = {
    text: "Wissenschaftler der Universität Mainz sind am Projekt zur Erforschung des Planeten Mars beteiligt.",
    meaning: "علماء ماينتس يشاركون في مشروع استكشاف المريخ",
    keywords: ["Wissenschaftler = علماء", "Universität Mainz = جامعة ماينتس", "Mars = المريخ", "beteiligt = مشاركون"],
    simplified: "علماء ماينتس يشاركون في بحث المريخ",
    imagine: "تلسكوب كبير يتجه نحو كوكب أحمر"
};

// ========== Exam 22: Das Schladminger (صحيح: 1,2,5) ==========
HELP_DATA["hoeren1_exam22_q1"] = {
    text: "Das Schladminger Skirennen fällt wieder aus.",
    meaning: "سباق شلادمينغ للتزلج يلغى مرة أخرى",
    keywords: ["Schladminger = شلادمينغ", "Skirennen = سباق تزلج", "fällt aus = يلغى", "wieder = مرة أخرى"],
    simplified: "سباق التزلج بشلادمينغ ألغي مجددا",
    imagine: "لافتة مكتوب عليها 'ألغي' على ثلج"
};

HELP_DATA["hoeren1_exam22_q2"] = {
    text: "Mehr Mädchen als Buben leisten als pflegende Kinder und Jugendliche Betreuungsarbeit in den Familien.",
    meaning: "بنات أكثر من أولاد يقدمن رعاية كأطفال بالعائلات",
    keywords: ["Mädchen = بنات", "Buben = أولاد", "pflegende Kinder = أطفال راعين", "Betreuungsarbeit = عمل رعاية"],
    simplified: "البنات أكثر من الأولاد في رعاية العائلة",
    imagine: "بنت تطعم جدة وولد يلعب بجهازه"
};

HELP_DATA["hoeren1_exam22_q5"] = {
    text: "Insgesamt bleibt es mild.",
    meaning: "يبقى الجو معتدلا بشكل عام",
    keywords: ["Insgesamt = بشكل عام", "bleibt = يبقى", "mild = معتدل"],
    simplified: "الجو معتدل بصفة عامة",
    imagine: "شمس دافئة وسحابة بيضاء واحدة"
};

// ========== Exam 23: Europawahlen (Linksparteien) (صحيح: 3,5) ==========
HELP_DATA["hoeren1_exam23_q3"] = {
    text: "Der Benzinpreis hat sich aufgrund internationaler Einflussfaktoren erhöht.",
    meaning: "سعر البنزين ارتفع لعوامل دولية",
    keywords: ["Benzinpreis = سعر البنزين", "erhöht = ارتفع", "internationaler Einflussfaktoren = عوامل تأثير دولية"],
    simplified: "البنزين غلا بسبب عوامل عالمية",
    imagine: "مضخة بنزين والأسعار تتغير للأعلى"
};

HELP_DATA["hoeren1_exam23_q5"] = {
    text: "Bei einem S-Bahn-Unglück in München gab es zahlreiche Verletzte und einen hohen Sachschaden.",
    meaning: "حادثة قطار بميونيخ خلفت جرحى وأضرارا مادية كبيرة",
    keywords: ["S-Bahn-Unglück = حادثة قطار", "München = ميونيخ", "zahlreiche Verletzte = جرحى كثيرون", "hohen Sachschaden = أضرار مادية كبيرة"],
    simplified: "حادثة قطار بميونيخ خلفت جرحى وخسائر كبيرة",
    imagine: "قطار محطم وسيارات إسعاف كثيرة"
};

// ========== Exam 24: Europawahlen (CDU/CSU) (صحيح: 1,3,5) ==========
HELP_DATA["hoeren1_exam24_q1"] = {
    text: "Bei den Europawahlen haben die CDU und CSU fast die Hälfte aller Stimmen erhalten.",
    meaning: "CDU و CSU حصلا على نصف الأصوات تقريبا بانتخابات أوروبا",
    keywords: ["Europawahlen = انتخابات أوروبا", "CDU und CSU = CDU و CSU", "fast die Hälfte = النصف تقريبا", "Stimmen = أصوات"],
    simplified: "CDU و CSU أخذا نصف الأصوات بانتخابات أوروبا",
    imagine: "دائرة نصفها أزرق ونصفها أحمر"
};

HELP_DATA["hoeren1_exam24_q3"] = {
    text: "Der Benzinpreis hat sich aufgrund internationaler Einflussfaktoren erhöht.",
    meaning: "سعر البنزين ارتفع لعوامل دولية",
    keywords: ["Benzinpreis = سعر البنزين", "erhöht = ارتفع", "internationaler Einflussfaktoren = عوامل تأثير دولية"],
    simplified: "البنزين غلا بسبب عوامل عالمية",
    imagine: "محفظة فارغة ومضخة بنزين"
};

HELP_DATA["hoeren1_exam24_q5"] = {
    text: "Bei einem S-Bahn-Unglück in München gab es zahlreiche Verletzte und einen hohen Sachschaden.",
    meaning: "حادثة قطار بميونيخ خلفت جرحى وأضرارا مادية كبيرة",
    keywords: ["S-Bahn-Unglück = حادثة قطار", "München = ميونيخ", "Verletzte = جرحى", "Sachschaden = أضرار مادية"],
    simplified: "حادثة قطار بميونيخ خلفت جرحى وخسائر",
    imagine: "نقالة تحمل جريحا وقضبان ملتوية"
};

// ========== Exam 25: Die Bundesländer (صحيح: 1,2,5) ==========
HELP_DATA["hoeren1_exam25_q1"] = {
    text: "Die Bundesländer sollen in Zukunft Geld für alternative Energien bekommen.",
    meaning: "الولايات الألمانية ستحصل على أموال للطاقات البديلة مستقبلا",
    keywords: ["Bundesländer = ولايات", "Zukunft = مستقبل", "Geld = مال", "alternative Energien = طاقات بديلة"],
    simplified: "الولايات الألمانية ستحصل على أموال للطاقة النظيفة",
    imagine: "ألواح شمسية ونقود تخرج منها"
};

HELP_DATA["hoeren1_exam25_q2"] = {
    text: "Wenn man im Internet etwas kaufen möchte, sollte man seine Identität nachweisen müssen.",
    meaning: "من يرد الشراء بالإنترنت يجب عليه إثبات هويته",
    keywords: ["Internet = إنترنت", "kaufen = شراء", "Identität = هوية", "nachweisen = إثبات"],
    simplified: "الشراء من النت يحتاج إثبات هوية",
    imagine: "بطاقة هوية أمام شاشة حاسوب"
};

HELP_DATA["hoeren1_exam25_q5"] = {
    text: "Es ist noch nicht entschieden, wie lange der Streik dauern soll.",
    meaning: "لم يقرر بعد كم سيدوم الإضراب",
    keywords: ["noch nicht = ليس بعد", "entschieden = مقرر", "Streik = إضراب", "dauern = يدوم"],
    simplified: "مدة الإضراب لم تحدد بعد",
    imagine: "ساعة توقف مؤقت ويد فوقها"
};

// ========== Exam 26: Bio-Siegels (صحيح: 1,5) ==========
HELP_DATA["hoeren1_exam26_q1"] = {
    text: "Die Verwendung des Bio-Siegels ist streng geregelt.",
    meaning: "استخدام الختم العضوي منظم بشكل صارم",
    keywords: ["Verwendung = استخدام", "Bio-Siegels = ختم بيو", "streng geregelt = منظم بصرامة"],
    simplified: "ختم المنتجات العضوية منظم بقوة",
    imagine: "ختم كبير بقفل عليه"
};

HELP_DATA["hoeren1_exam26_q5"] = {
    text: "Die EU-Kommission kritisiert die Stickstoffdioxid-Werte in deutschen Städten.",
    meaning: "المفوضية الأوروبية تنتقد قيم ثاني أكسيد النيتروجين بالمدن الألمانية",
    keywords: ["EU-Kommission = مفوضية أوروبية", "kritisiert = تنتقد", "Stickstoffdioxid-Werte = قيم ثاني أكسيد النيتروجين", "deutschen Städten = مدن ألمانية"],
    simplified: "المفوضية الأوروبية تنتقد التلوث بمدن ألمانيا",
    imagine: "عبارة كئيبة ومدخنة تخرج غازاتا"
};

// ========== Exam 27: Berufen (bonbon) (صحيح: 1,2) ==========
HELP_DATA["hoeren1_exam27_q1"] = {
    text: "Viele Angestellte würden gern nur vier Tage pro Woche arbeiten.",
    meaning: "كثير من الموظفين يودون العمل أربعة أيام فقط بالأسبوع",
    keywords: ["Angestellte = موظفين", "vier Tage = أربعة أيام", "pro Woche = بالأسبوع", "arbeiten = يعملون"],
    simplified: "موظفون كثيرون يريدون العمل 4 أيام فقط",
    imagine: "تقويم بـ 4 أيام عمل و 3 أيام إجازة"
};

HELP_DATA["hoeren1_exam27_q2"] = {
    text: "In handwerklichen Berufen gibt es zurzeit viele freie Stellen.",
    meaning: "بالمهن الحرفية توجد حاليا وظائف شاغرة كثيرة",
    keywords: ["handwerklichen Berufen = مهن حرفية", "zurzeit = حاليا", "freie Stellen = وظائف شاغرة", "viele = كثيرة"],
    simplified: "بالحرف اليدوية وظائف كثيرة حاليا",
    imagine: "عدة نجارة وكرسي خال بجانبها"
};

// ========== Exam 28: Zahl der Arbeitslosen (صحيح: 1,2,4) ==========
HELP_DATA["hoeren1_exam28_q1"] = {
    text: "Die Zahl der Arbeitslosen in Deutschland hat sich im Mai verringert.",
    meaning: "عدد عاطلين ألمانيا انخفض بمايو",
    keywords: ["Zahl der Arbeitslosen = عدد العاطلين", "Deutschland = ألمانيا", "Mai = مايو", "verringert = انخفض"],
    simplified: "عدد العاطلين بألمانيا نقص بمايو",
    imagine: "مخطط بياني ينخفض نحو الأسفل"
};

HELP_DATA["hoeren1_exam28_q2"] = {
    text: "Mexiko und Russland wollen ihre Zusammenarbeit in den Bereichen Wirtschaft und Finanzen weiter vertiefen.",
    meaning: "المكسيك وروسيا تريدان تعميق تعاونهما بالاقتصاد والمالية",
    keywords: ["Mexiko = مكسيك", "Russland = روسيا", "Zusammenarbeit = تعاون", "Wirtschaft = اقتصاد", "Finanzen = مالية", "vertiefen = تعميق"],
    simplified: "المكسيك وروسيا تريدان تعاونا أعمق بالاقتصاد والمال",
    imagine: "علم المكسيك وعلم روسيا متشابكان"
};

HELP_DATA["hoeren1_exam28_q4"] = {
    text: "Der Präsident der Weltbank äußerte sich besorgt über Entwicklungshilfe für die so genannte 'Dritte Welt'.",
    meaning: "رئيس البنك الدولي أعرب قلقه حول مساعدات تنموية للعالم الثالث",
    keywords: ["Präsident der Weltbank = رئيس البنك الدولي", "besorgt = قلق", "Entwicklungshilfe = مساعدات تنموية", "Dritte Welt = عالم ثالث"],
    simplified: "رئيس البنك الدولي قلق على مساعدات العالم الثالث",
    imagine: "رجل يرتدي بدلة ويبكي على منضدة"
};

// ========== Exam 29: BILD AM SONNTAG (صحيح: 1,2,3) ==========
HELP_DATA["hoeren1_exam29_q1"] = {
    text: "Laut BILD AM SONNTAG können in Zukunft nur Mieter, aber nicht Vermieter bestimmte Mietverträge schneller kündigen.",
    meaning: "بيلد أم زونتاغ: فقط المستأجرين لا المالكين يمكنهم إنهاء عقود أسرع مستقبلا",
    keywords: ["BILD AM SONNTAG = بيلد أم زونتاغ", "Mieter = مستأجرين", "Vermieter = مالكين", "Mietverträge = عقود إيجار", "kündigen = إنهاء"],
    simplified: "المستأجر فقط سيمكنه إنهاء عقد الإيجار بسرعة مستقبلا",
    imagine: "مستأجر سعيد ومالك غاضب"
};

HELP_DATA["hoeren1_exam29_q2"] = {
    text: "In bestimmten Bundesländern sollen Wohnhäuser abgerissen werden, weil sie unbewohnt sind.",
    meaning: "ببعض الولايات ستهدم مباني سكنية لعدم سكنها",
    keywords: ["Bundesländern = ولايات", "Wohnhäuser = مباني سكنية", "abgerissen = هدم", "unbewohnt = غير مأهولة"],
    simplified: "ببعض الولايات ستهدم بيوت لخلوها من السكان",
    imagine: "منزل عليه علامة X حمراء"
};

HELP_DATA["hoeren1_exam29_q3"] = {
    text: "Sowohl die Waldbrände als auch die Hitzewelle in Griechenland sind zu Ende.",
    meaning: "حرائق الغابات وموجة الحر باليونان انتهيا كلاهما",
    keywords: ["Waldbrände = حرائق غابات", "Hitzewelle = موجة حر", "Griechenland = يونان", "zu Ende = انتهت"],
    simplified: "حرائق الغابات والحر باليونان انتهيا",
    imagine: "شجرة محترقة وثلج يذوب عليها"
};

// ========== Exam 30: Studentenparty in Frankreich (صحيح: 3,5) ==========
HELP_DATA["hoeren1_exam30_q3"] = {
    text: "Bei einer Studentenparty in Frankreich gibt es Tote und Verletzte.",
    meaning: "حفلة طلابية بفرنسا خلفت قتلى وجرحى",
    keywords: ["Studentenparty = حفلة طلابية", "Frankreich = فرنسا", "Tote = قتلى", "Verletzte = جرحى"],
    simplified: "حفلة طلابية بفرنسا خلفت موتى وجرحى",
    imagine: "كأس مكسور ودماء على الأرض"
};

HELP_DATA["hoeren1_exam30_q5"] = {
    text: "Die Regierung plant eine Änderung bei der Führerschein-Probezeit.",
    meaning: "الحكومة تخطط لتغيير فترة اختبار رخصة السياقة",
    keywords: ["Regierung = حكومة", "plant = تخطط", "Änderung = تغيير", "Führerschein-Probezeit = فترة اختبار رخصة السياقة"],
    simplified: "الحكومة تخطط لتغيير فترة تجربة رخصة السياقة",
    imagine: "رخصة سياقة عليها علامة إعادة نظر"
};

// ========== Exam 31: Deutsche Filmmuseum (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam31_q2"] = {
    text: "Berufspendler kritisieren unnötige Wartezeiten",
    meaning: "مسافرو العمل ينتقدون أوقات الانتظار غير الضرورية",
    keywords: ["Berufspendler = مسافرو العمل", "unnötige Wartezeiten = أوقات انتظار غير ضرورية", "Kosten = تكاليف"],
    simplified: "مسافرو العمل ينتقدون الانتظار الطويل",
    imagine: "ساعة تنتظر عند محطة قطار"
};

HELP_DATA["hoeren1_exam31_q4"] = {
    text: "Das Deutsche Filmmuseum möchte die",
    meaning: "متحف السينما الألماني يريد زيادة أعداد الزوار",
    keywords: ["Filmmuseum = متحف سينما", "Besucherzahlen = أعداد زوار", "erhöhen = زيادة"],
    simplified: "متحف السينما يريد زيادة زواره",
    imagine: "كاميرا ترحب بالناس عند الباب"
};

// ========== Exam 32: Ein Treffen bei der Integrationsbeauftragten (صحيح: 1,3,5) ==========
HELP_DATA["hoeren1_exam32_q1"] = {
    text: "Ein Treffen bei der Integrationsbeauftragten",
    meaning: "لقاء مع مسؤولة الاندماج لتحسين اندماج المهاجرين",
    keywords: ["Integrationsbeauftragten = مسؤولة الاندماج", "Integration = اندماج", "Migranten = مهاجرين"],
    simplified: "لقاء مع مسؤولة الاندماج لتحسين أوضاع المهاجرين",
    imagine: "طاولة مستديرة ومهاجرون حولها"
};

HELP_DATA["hoeren1_exam32_q3"] = {
    text: "Untersuchung zum Essverhalten der Deutschen",
    meaning: "دراسة سلوك أكل الألمان تظهر معانات كثيرين من الوزن",
    keywords: ["Untersuchung = دراسة", "Essverhalten = سلوك الأكل", "Gewichtsprobleme = مشاكل وزن"],
    simplified: "دراسة: كثير من الألمان يعانون السمنة",
    imagine: "ميزان يشير لرقم كبير جدا"
};

HELP_DATA["hoeren1_exam32_q5"] = {
    text: "Später Bestattungsritus für Mahatma",
    meaning: "طقوس دفن متأخرة للمهاتما غاندي",
    keywords: ["Bestattungsritus = طقوس دفن", "Mahatma Gandhi = المهاتما غاندي", "später = متأخرة"],
    simplified: "طقوس دفن المهاتما غاندي تأخرت",
    imagine: "نظارات دائرية على تابوت"
};

// ========== Exam 33: die Konjunkturentwicklung negativ (صحيح: 1,4) ==========
HELP_DATA["hoeren1_exam33_q1"] = {
    text: "Experten aus Bankenwelt und Wirtschaft",
    meaning: "خبراء البنوك والاقتصاد يرون تطور الاقتصاد سلبيا",
    keywords: ["Experten = خبراء", "Bankenwelt = عالم البنوك", "Konjunkturentwicklung = تطور اقتصاد", "negativ = سلبي"],
    simplified: "خبراء البنوك يرون الاقتصاد متجها للأسوأ",
    imagine: "مخطط أسهم ينهار للأسفل"
};

HELP_DATA["hoeren1_exam33_q4"] = {
    text: "Das Internationale Olympische Komitee trifft",
    meaning: "اللجنة الأولمبية تجتمع بلوزان للتشاور حول مكان أولمبياد 2012",
    keywords: ["Olympische Komitee = لجنة أولمبية", "Lausanne = لوزان", "Austragungsort = مكان استضافة"],
    simplified: "اللجنة الأولمبية تجتمع بلوزان لاختيار مكان أولمبياد 2012",
    imagine: "خريطة العالم وعلم أولمبي عليها"
};

// ========== Exam 34: internationalen Konferenz (صحيح: 1,3) ==========
HELP_DATA["hoeren1_exam34_q1"] = {
    text: "Auf einer internationalen Konferenz in",
    meaning: "مؤتمر دولي ببون قرر استخدام الطاقة النظيفة بالعالم",
    keywords: ["Konferenz = مؤتمر", "Bonn = بون", "umweltfreundliche Energien = طاقات صديقة للبيئة"],
    simplified: "مؤتمر ببون قرر استخدام الطاقة النظيفة عالميا",
    imagine: "لمبة خضراء تضيء وكل من حولها"
};

HELP_DATA["hoeren1_exam34_q3"] = {
    text: "In Ulm beginnt heute der Katholikentag",
    meaning: "بأولم يبدأ اليوم يوم الكاثوليك وهو لقاء مسيحي كبير بألمانيا",
    keywords: ["Ulm = أولم", "Katholikentag = يوم الكاثوليك", "christliches Laientreffen = لقاء مسيحي"],
    simplified: "بأولم يبدأ اليوم يوم الكاثوليك وهو تجمع مسيحي كبير",
    imagine: "كنيسة وأجراس تدق بشدة"
};

// ========== Exam 35: Um Tickets zu gewinnen (صحيح: 3,4) ==========
HELP_DATA["hoeren1_exam35_q3"] = {
    text: "In Kärnten kann es aufgrund von",
    meaning: "بكارينثيا قد تحدث تأخيرات بسبب حركة المرور القوية المعاكسة",
    keywords: ["Kärnten = كارينثيا", "Gegenverkehr = حركة مرور معاكسة", "Verzögerungen = تأخيرات"],
    simplified: "بكارينثيا المرور المعاكس القوي قد يسبب تأخيرات",
    imagine: "سيارة وسيارة في اتجاهين متعاكسين"
};

HELP_DATA["hoeren1_exam35_q4"] = {
    text: "Aufgrund einer Kaltfront sinkt die",
    meaning: "بسبب جبهة باردة ينخفض مستوى تساقط الثلوج بشمال الألب لأقل من 2000 متر",
    keywords: ["Kaltfront = جبهة باردة", "Schneefallgrenze = مستوى تساقط ثلوج", "Alpennordseite = شمال الألب"],
    simplified: "جبهة باردة تخفض الثلوج بشمال الألب لأقل من 2000 متر",
    imagine: "ثلوج تنزل من جبل عال"
};

// ========== Exam 36: Die tschechische Stadt Pilsen (صحيح: 1,2) ==========
HELP_DATA["hoeren1_exam36_q1"] = {
    text: "Die tschechische Stadt Pilsen ist",
    meaning: "مدينة بيلسن التشيكية عاصمة الثقافة الأوروبية 2015",
    keywords: ["Pilsen = بيلسن", "Kulturhauptstadt = عاصمة ثقافة", "2015 = 2015"],
    simplified: "بيلسن التشيكية كانت عاصمة الثقافة الأوروبية 2015",
    imagine: "كأس بيرة وعلم أوروبا فوقه"
};

HELP_DATA["hoeren1_exam36_q2"] = {
    text: "In der Nähe von St. Veit",
    meaning: "بالقرب من سانت فايت حادث سيارة مع قتيل",
    keywords: ["Autounfall = حادث سيارة", "Toten = قتيل", "St. Veit an der Glan = سانت فايت"],
    simplified: "بالقرب من سانت فايت حادث سيارة أودى بحياة شخص",
    imagine: "سيارة محطمة وغطاء أبيض على الأرض"
};

// ========== Exam 37: Laut Statistischem Bundesamt (صحيح: 1,4,5) ==========
HELP_DATA["hoeren1_exam37_q1"] = {
    text: "Laut Statistischem Bundesamt müssen junge",
    meaning: "مكتب الإحصاء: الشباب قليلي الخبرة يدخلون عقودا مؤقتة",
    keywords: ["Statistischem Bundesamt = مكتب إحصاء", "zeitlich begrenztes Arbeitsverhältnis = علاقة عمل محدودة", "junge Leute = شباب"],
    simplified: "مكتب الإحصاء: الشباب بلا خبرة يأخذون عقودا مؤقتة",
    imagine: "شاب يوقع عقدا ورقيب يضحك"
};

HELP_DATA["hoeren1_exam37_q4"] = {
    text: "Sowohl Asien als auch Europa",
    meaning: "آسيا وأوروبا تساهمان في تلويث البحار بالبلاستيك",
    keywords: ["Verschmutzung = تلوث", "Plastikmüll = نفايات بلاستيكية", "Asien = آسيا", "Europa = أوروبا"],
    simplified: "آسيا وأوروبا تتشاركان في تلويث البحر بالبلاستيك",
    imagine: "قارورة بلاستيكية تطفو بين قارتين"
};

HELP_DATA["hoeren1_exam37_q5"] = {
    text: "Das neuartige Ampelsystem zur Verbesserung",
    meaning: "نظام إشارات جديد لسلامة المشاة لا يزال بالاختبار",
    keywords: ["Ampelsystem = نظام إشارات", "Fußgängern = مشاة", "Testphase = مرحلة اختبار"],
    simplified: "نظام إشارات جديد للمشاة لا يزال بالاختبار",
    imagine: "إشارة مرور عليها نظارة طبية"
};

// ========== Exam 38: In Frankfurt haben Manager (صحيح: 1,2,3) ==========
HELP_DATA["hoeren1_exam38_q1"] = {
    text: "München wurde wieder zur Stadt",
    meaning: "ميونيخ اختيرت كأفضل مدينة للحياة بألمانيا مرة أخرى",
    keywords: ["München = ميونخ", "Lebensqualität = جودة حياة", "gewählt = اختيرت"],
    simplified: "ميونيخ أفضل مدينة للحياة بألمانيا مجددا",
    imagine: "تاج على مدينة ميونيخ"
};

HELP_DATA["hoeren1_exam38_q2"] = {
    text: "In Frankfurt haben Manager darüber",
    meaning: "بفرانكفورت ناقش المديرون ما يجب فعله لنجاح الشركات مستقبلا",
    keywords: ["Manager = مديرون", "diskutiert = ناقشوا", "erfolgreich = ناجحة"],
    simplified: "مديرو فرانكفورت ناقشوا مستقبل الشركات",
    imagine: "بدلات تتكلم مع بعضها على طاولة"
};

HELP_DATA["hoeren1_exam38_q3"] = {
    text: "Nach Worten des Ministers fördert",
    meaning: "الوزير يقول العمل عن بعد يعزز النمو والإنتاجية",
    keywords: ["mobiles Arbeiten = عمل عن بعد", "Wirtschaftswachstum = نمو اقتصادي", "Produktivität = إنتاجية"],
    simplified: "الوزير: العمل من المنزل يزيد النمو والإنتاجية",
    imagine: "موظف نائم وراتبه يزيد"
};

// ========== Exam 39: Für die Polizei in Berlin (صحيح: 1,2,4,5) ==========
HELP_DATA["hoeren1_exam39_q1"] = {
    text: "Innenstädte werden immer weniger",
    meaning: "مراكز المدن أصبحت أقل جاذبية",
    keywords: ["Innenstädte = مراكز مدن", "weniger interessant = أقل جاذبية"],
    simplified: "مراكز المدن أقل جاذبية",
    imagine: "شارع خال تماما من المارة"
};

HELP_DATA["hoeren1_exam39_q2"] = {
    text: "Für die Polizei in Berlin",
    meaning: "شرطة برلين واجهت قضية صعبة",
    keywords: ["Polizei = شرطة", "schwierigen Fall = قضية صعبة", "Berlin = برلين"],
    simplified: "شرطة برلين أمامها قضية معقدة",
    imagine: "شرطي يحك رأره أمام ملف سميك"
};

HELP_DATA["hoeren1_exam39_q4"] = {
    text: "Musiker gaben ein Konzert für",
    meaning: "موسيقيون قدموا حفلا لهدف نبيل",
    keywords: ["Musiker = موسيقيون", "Konzert = حفل", "guten Zweck = هدف نبيل"],
    simplified: "موسيقيون أقاموا حفلا خيريا",
    imagine: "طبلة وقلب أحمر عليها"
};

HELP_DATA["hoeren1_exam39_q5"] = {
    text: "Deutsche Wintersportler sind bei",
    meaning: "رياضيو الشتاء الألمان ناجحون بالأولمبياد",
    keywords: ["Wintersportler = رياضيو شتاء", "Olympischen Spielen = ألعاب أولمبية", "erfolgreich = ناجحون"],
    simplified: "رياضيو الشتاء الألمان ينجحون بالأولمبياد",
    imagine: "ميدالية ذهبية وثلج تحتها"
};

// ========== Exam 40: Die Sprecherin ist verheiratet (صحيح: 1,3,4) ==========
HELP_DATA["hoeren1_exam40_q1"] = {
    text: "Die Sprecherin möchte allein leben",
    meaning: "المتحدثة تريد العيش وحدها وتفعل ما تشاء",
    keywords: ["Sprecherin = متحدثة", "allein leben = تعيش وحدها", "machen können = تستطيع فعل"],
    simplified: "المتحدثة تريد العيش وحدها وتفعل ما تريد",
    imagine: "امرأة ترقص وحدها بغرفة واسعة"
};

HELP_DATA["hoeren1_exam40_q3"] = {
    text: "Die Sprecherin ist verheiratet und",
    meaning: "المتحدثة متزوجة ولديها طفلان",
    keywords: ["verheiratet = متزوجة", "zwei Kinder = طفلان"],
    simplified: "المتحدثة متزوجة وعندها طفلان",
    imagine: "يدان صغيرتان تخرجان من فستان زفاف"
};

HELP_DATA["hoeren1_exam40_q4"] = {
    text: "Der Sprecher ist geschieden und",
    meaning: "المتحدث مطلق ويعيش مع ابنته لدى أسرة أخرى",
    keywords: ["geschieden = مطلق", "Tochter = ابنته", "bei einer anderen Familie = لدى أسرة أخرى"],
    simplified: "المتحدث مطلق ويعيش مع ابنته لدى أسرة أخرى",
    imagine: "أب يمسك يد ابنته أمام منزل لا يخصه"
};

// ========== Exam 41: Bei der Sportveranstaltung (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam41_q2"] = {
    text: "Aufgrund eines Unfalls kam es",
    meaning: "حادث تسبب في حشد كبير من سيارات الطوارئ",
    keywords: ["Unfall = حادث", "Großaufgebot = حشد كبير", "Einsatzwägen = سيارات طوارئ"],
    simplified: "حادث جلب سيارات طوارئ كثيرة جدا",
    imagine: "خمس سيارات إسعاف وخمس سيارات بوليس"
};

HELP_DATA["hoeren1_exam41_q4"] = {
    text: "Bei der Sportveranstaltung 'Stilecht' sind",
    meaning: "بفعالية 'Stilecht' الرياضية توجد دراجات بكل الأنواع",
    keywords: ["Sportveranstaltung = فعالية رياضية", "Stilecht = Stilecht", "Fahrräder aller Arten = دراجات كل الأنواع", "vertreten = موجودة"],
    simplified: "بفعالية 'Stilecht' دراجات من كل الأنواع",
    imagine: "دراجة عادية وأخرى كهربائية وثالثة بثلاث عجلات"
};

// ========== Exam 42: Das Bundesfamilienministerium (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam42_q2"] = {
    text: "Eine weitere Verlängerung der Lebensarbeitszeit",
    meaning: "تمديد آخر لسن العمل لن يسبب مشاكل اجتماعية خطيرة",
    keywords: ["Verlängerung = تمديد", "Lebensarbeitszeit = سن العمل", "sozialen Probleme = مشاكل اجتماعية", "keine ernsthaften = لا خطيرة"],
    simplified: "زيادة سن التقاعد مرة أخرى لن تسبب مشاكل",
    imagine: "جد عجوز يرفع لافتة 'أنا لسه شاب'"
};

HELP_DATA["hoeren1_exam42_q4"] = {
    text: "Das Bundesfamilienministerium betrachtet den",
    meaning: "وزارة الأسرة ترى توسيع سياسة الأسرة قد اكتمل",
    keywords: ["Bundesfamilienministerium = وزارة الأسرة", "Ausbau = توسيع", "Familienpolitik = سياسة الأسرة", "abgeschlossen = مكتمل"],
    simplified: "وزارة الأسرة: توسيع سياسة الأسرة انتهى",
    imagine: "لافتة مكتوب عليها 'مهمة منجزة'"
};

// ========== Exam 43: Meeresküsten (صحيح: 2,5) ==========
HELP_DATA["hoeren1_exam43_q2"] = {
    text: "An den deutschen Meeresküsten soll in",
    meaning: "على سواحل ألمانيا سينتج المزيد من طاقة الرياح مستقبلا",
    keywords: ["Meeresküsten = سواحل بحر", "Windkraft = طاقة رياح", "produziert = إنتاج", "Zukunft = مستقبل"],
    simplified: "سواحل ألمانيا ستنتج طاقة رياح أكثر مستقبلا",
    imagine: "توربينات رياح تزرع على الشاطئ"
};

HELP_DATA["hoeren1_exam43_q5"] = {
    text: "Ein aufmerksamer Nachbar verhindert den",
    meaning: "جار يقظ يمنع عملية سطو مخطط لها على منزل",
    keywords: ["aufmerksamer Nachbar = جار يقظ", "verhindert = يمنع", "Einbruch = سطو", "Wohnhaus = منزل"],
    simplified: "جار منتبه يمنع سرقة منزل",
    imagine: "جار يمسك لصا من قميصه"
};

// ========== Exam 44: Bauern warnen (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam44_q2"] = {
    text: "Bauern warnen: Zu viel Umweltschutz",
    meaning: "مزارعون يحذرون: حماية البيئة المفرطة تهدد وجود مزارع كثيرة",
    keywords: ["Bauern = مزارعون", "warnen = يحذرون", "zu viel Umweltschutz = حماية مفرطة", "gefährdet = تهدد", "Bauernhöfe = مزارع"],
    simplified: "المزارعون: حماية البيئة الزائدة تدمر مزارعنا",
    imagine: "جرار زراعي متوقف وبجانبه لافتة 'أنقذونا'"
};

HELP_DATA["hoeren1_exam44_q4"] = {
    text: "Deutliche Unterschiede bei den Gehältern",
    meaning: "فروق واضحة بالرواتب بين الولايات الألمانية الشرقية والغربية",
    keywords: ["Unterschiede = فروق", "Gehältern = رواتب", "ost- und westdeutschen Bundesländern = ولايات شرقية وغربية"],
    simplified: "رواتب شرق ألمانيا أقل من غربها بشكل واضح",
    imagine: "كفة ميزان منخفضة لجهة وأخرى مرتفعة"
};

// ========== Exam 45: Nach Ansicht mancher (صحيح: 2,4) ==========
HELP_DATA["hoeren1_exam45_q2"] = {
    text: "Nach Ansicht mancher Politiker führt",
    meaning: "برأي بعض السياسيين تخفيض وقت العمل يؤدي حتما لخسارة الرفاهية",
    keywords: ["Reduzierung = تخفيض", "Arbeitszeit = وقت العمل", "Verlust an Wohlstand = خسارة رفاهية", "unweigerlich = حتما"],
    simplified: "السياسيون: تقليل ساعات العمل يعني الفقر",
    imagine: "ساعة عمل مكسورة وكنبة خاوية"
};

HELP_DATA["hoeren1_exam45_q4"] = {
    text: "In verschiedenen Berufszweigen sind noch",
    meaning: "بفروع مهنية مختلفة لا تزال أماكن تدريب شاغرة",
    keywords: ["Berufszweigen = فروع مهنية", "Lehrstellen = أماكن تدريب", "frei = شاغرة", "noch = لا تزال"],
    simplified: "بمجالات مهنية مختلفة أماكن تدريب لا تزال خالية",
    imagine: "كراسي فارغة في فصل تدريب مهني"
};
// ============================================
// Hören Teil 2
// ============================================

// ============================================
// Hören Teil 2 - Exams 1-10 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 1: Herr Gasser und Frau Janke (صحيح: 2,3,7,8,9) ==========
HELP_DATA["hoeren2_exam1_q3"] = {
    text: "Die Bergbauern können kaum vom Verkauf ihrer Produkte leben.",
    meaning: "فلاحو الجبال لا يستطيعون العيش تقريبا من بيع منتجاتهم",
    keywords: ["Bergbauern = فلاحو جبال", "kaum = بالكاد", "Verkauf = بيع", "Produkte = منتجات"],
    simplified: "فلاحو الجبال بالكاد يعيشون من بيع منتجاتهم",
    imagine: "فلاح يحمل جبنة ويبكي أمام السوق",
    correct: true
};

HELP_DATA["hoeren2_exam1_q4"] = {
    text: "Auch heute werden die steilen Hänge noch manuell bearbeitet.",
    meaning: "حتى اليوم لا تزال المنحدرات الحادة تزرع يدويا",
    keywords: ["steilen Hänge = منحدرات حادة", "manuell = يدويا", "bearbeitet = تزرع", "heute = اليوم"],
    simplified: "المنحدرات الحادة لا تزال تزرع باليد",
    imagine: "فلاح يصعد منحدرا حادا ومعوله بيده",
    correct: true
};

HELP_DATA["hoeren2_exam1_q8"] = {
    text: "Für Frau Janke ist der Erholungswert trotz der Anstrengung sehr hoch.",
    meaning: "قيمة الاسترخاء عالية جدا للسيدة يانكه رغم التعب",
    keywords: ["Erholungswert = قيمة استرخاء", "Anstrengung = تعب", "sehr hoch = عالية جدا", "trotz = رغم"],
    simplified: "الاسترخاء كبير للسيدة يانكه رغم التعب",
    imagine: "امرأة متعبة لكنها تبتسم على الجبل",
    correct: true
};

HELP_DATA["hoeren2_exam1_q9"] = {
    text: "Almhelferinnen und -helfer können vielseitige Aufgaben übernehmen.",
    meaning: "مساعدو المراعي الجبلية يمكنهم القيام بمهام متعددة",
    keywords: ["Almhelferinnen = مساعدات مراعي", "vielseitige = متعددة", "Aufgaben = مهام", "übernehmen = القيام"],
    simplified: "مساعدو المراعي يقومون بمهام كثيرة ومتنوعة",
    imagine: "رجل يحلب بقرة ويصلح سياجا معا",
    correct: true
};

HELP_DATA["hoeren2_exam1_q10"] = {
    text: "Über die Dauer des Aufenthalts kann man frei entscheiden.",
    meaning: "يمكن للمرء أن يقرر بحرية مدة الإقامة",
    keywords: ["Dauer = مدة", "Aufenthalts = إقامة", "frei = بحرية", "entscheiden = يقرر"],
    simplified: "تستطيع أن تختار مدة إقامتك بنفسك",
    imagine: "رجل يقلب تقويما ويختار تواريخ إقامته",
    correct: true
};

// ========== Exam 2: Suza Hotop (صحيح: 0,2,3,7) ==========
HELP_DATA["hoeren2_exam2_q1"] = {
    text: "Für die Autorin Suza Hotop ist Schreiben Freude und Anstrengung zugleich.",
    meaning: "الكتابة بالنسبة للكاتبة سوزا هوتوب هي متعة وجهد معا",
    keywords: ["Autorin = كاتبة", "Schreiben = كتابة", "Freude = متعة", "Anstrengung = جهد", "zugleich = معا"],
    simplified: "الكتابة عند سوزا متعة وتعب في نفس الوقت",
    imagine: "امرأة تبتسم وتعرق أمام الورقة",
    correct: true
};

HELP_DATA["hoeren2_exam2_q3"] = {
    text: "Am Anfang dachte Suza nicht daran, ihre Geschichte zu veröffentlichen.",
    meaning: "في البداية لم تفكر سوزا في نشر قصتها",
    keywords: ["Anfang = بداية", "dachte nicht = لم تفكر", "Geschichte = قصة", "veröffentlichen = نشر"],
    simplified: "سوزا لم تفكر بنشر قصتها بداية",
    imagine: "امرأة تخفي أوراقها في الدرج",
    correct: true
};

HELP_DATA["hoeren2_exam2_q4"] = {
    text: "Zuerst stellte Suza Auszüge ihrer Geschichte ins Internet.",
    meaning: "أولا وضعت سوزا مقتطفات من قصتها على الإنترنت",
    keywords: ["Zuerst = أولا", "Auszüge = مقتطفات", "Geschichte = قصة", "Internet = إنترنت"],
    simplified: "سوزا نشرت مقتطفات قصتها على النت",
    imagine: "امرأة ترفع أوراقها إلى شاشة الكمبيوتر",
    correct: true
};

HELP_DATA["hoeren2_exam2_q8"] = {
    text: "Suza folgt beim Schreiben keinen besonderen Vorbildern.",
    meaning: "سوزا لا تتبع قدوات معينة أثناء الكتابة",
    keywords: ["Schreiben = كتابة", "keinen = لا", "besonderen = معينة", "Vorbildern = قدوات"],
    simplified: "سوزا لا تقلد أحدا عندما تكتب",
    imagine: "امرأة تكتب وحدها دون النظر لأحد",
    correct: true
};

// ========== Exam 3: Suza Hotop (Mittel) (صحيح: 0,2,3,6,7) ==========
HELP_DATA["hoeren2_exam3_q1"] = {
    text: "Für die Autorin Suza Hotop ist Schreiben Freude und Anstrengung zugleich.",
    meaning: "الكتابة بالنسبة للكاتبة سوزا هوتوب هي متعة وجهد معا",
    keywords: ["Autorin = كاتبة", "Schreiben = كتابة", "Freude = متعة", "Anstrengung = جهد", "zugleich = معا"],
    simplified: "الكتابة عند سوزا فرح وتعب سوية",
    imagine: "قلم يبكي ويضحك في نفس الوقت",
    correct: true
};

HELP_DATA["hoeren2_exam3_q3"] = {
    text: "Am Anfang dachte Suza nicht daran, ihre Geschichte zu veröffentlichen.",
    meaning: "في البداية لم تفكر سوزا في نشر قصتها",
    keywords: ["Anfang = بداية", "dachte nicht = لم تفكر", "Geschichte = قصة", "veröffentlichen = نشر"],
    simplified: "بداية سوزا ما فكرتش تنشر قصتها",
    imagine: "كتاب مغلق بقفل عليه",
    correct: true
};

HELP_DATA["hoeren2_exam3_q4"] = {
    text: "Zuerst stellte Suza Auszüge ihrer Geschichte ins Internet.",
    meaning: "أولا وضعت سوزا مقتطفات من قصتها على الإنترنت",
    keywords: ["Zuerst = أولا", "Auszüge = مقتطفات", "Geschichte = قصة", "Internet = إنترنت"],
    simplified: "سوزا حطت أجزاء قصتها على النت",
    imagine: "يد تضع صفحات فوق شاشة كمبيوتر",
    correct: true
};

HELP_DATA["hoeren2_exam3_q7"] = {
    text: "Die Autorin plant nie ganz genau, was in der Geschichte passieren wird.",
    meaning: "الكاتبة لا تخطط أبدا بشكل دقيق لما سيحدث في القصة",
    keywords: ["plant = تخطط", "nie = أبدا", "ganz genau = بدقة", "Geschichte = قصة"],
    simplified: "الكاتبة لا تخطط لأحداث قصتها مسبقا",
    imagine: "قلم يمشي على الورق دون خريطة",
    correct: true
};

HELP_DATA["hoeren2_exam3_q8"] = {
    text: "Suza folgt beim Schreiben keinen besonderen Vorbildern.",
    meaning: "سوزا لا تتبع قدوات معينة أثناء الكتابة",
    keywords: ["Suza = سوزا", "Schreiben = كتابة", "keinen = لا", "Vorbildern = قدوات"],
    simplified: "سوزا لا تقلد أحدا في كتاباتها",
    imagine: "كاتبة تمحو اسم قدوتها من الدفتر",
    correct: true
};

// ========== Exam 4: Professor Steiner (صحيح: 1,5,7,8,9) ==========
HELP_DATA["hoeren2_exam4_q2"] = {
    text: "Steiner vermittelt den Studierenden nicht nur theoretisches Wissen, sondern fordert auch, dass es praktisch angewendet wird.",
    meaning: "شتاينر لا ينقل للطلاب معرفة نظرية فقط بل يطلب تطبيقها عمليا",
    keywords: ["vermittelt = ينقل", "theoretisches Wissen = معرفة نظرية", "praktisch angewendet = تطبيق عملي", "fordert = يطلب"],
    simplified: "شتاينر يطلب من طلابه تطبيق العلم وليس حفظه فقط",
    imagine: "أستاذ يدفع طالبا لتجربة جهاز عمليا",
    correct: true
};

HELP_DATA["hoeren2_exam4_q6"] = {
    text: "Journalisten sollten Lust haben, etwas zu entdecken.",
    meaning: "يجب أن يكون لدى الصحفيين رغبة في اكتشاف أشياء جديدة",
    keywords: ["Journalisten = صحفيون", "Lust = رغبة", "entdecken = اكتشاف", "sollten = يجب"],
    simplified: "الصحفيون يجب أن يحبوا الاكتشاف",
    imagine: "صحفي يفتح بابا سريا بحماس",
    correct: true
};

HELP_DATA["hoeren2_exam4_q8"] = {
    text: "Steiner hat während seines Journalistik-Studiums für das ZDF Fußballspiele moderiert.",
    meaning: "شتاينر قدم مباريات كرة قدم لقناة ZDF أثناء دراسة الصحافة",
    keywords: ["Journalistik-Studiums = دراسة صحافة", "ZDF = قناة ZDF", "Fußballspiele = مباريات كرة قدم", "moderiert = قدم"],
    simplified: "شتاينر قدم مباريات كرة في التلفاز أثناء الدراسة",
    imagine: "طالب يمسك ميكروفونا أمام شاشة خضراء",
    correct: true
};

HELP_DATA["hoeren2_exam4_q9"] = {
    text: "Steiner ist es wichtig, als Moderator den Sportlern gegenüber neutral zu bleiben.",
    meaning: "من المهم لشتاينر كمقدم أن يبقى محايدا تجاه الرياضيين",
    keywords: ["Moderator = مقدم", "neutral = محايد", "Sportlern = رياضيين", "wichtig = مهم"],
    simplified: "شتاينر يحرص على الحيادية مع الرياضيين",
    imagine: "مقدم وقوف بين لاعبين متعاركين بيدين مفتوحتين",
    correct: true
};

HELP_DATA["hoeren2_exam4_q10"] = {
    text: "Steiner rät Abiturienten dazu, verschiedene berufliche Möglichkeiten zu testen.",
    meaning: "شتاينر ينصح طلاب الثانوية بتجربة خيارات مهنية مختلفة",
    keywords: ["Abiturienten = طلاب ثانوية", "rät = ينصح", "berufliche Möglichkeiten = خيارات مهنية", "testen = تجربة"],
    simplified: "شتاينر ينصح الخريجين بتجربة عدة مهن",
    imagine: "شاب يجرب قبعة طبيب ثم قبعة مهندس",
    correct: true
};

// ========== Exam 5: Professor Steiner (Mittel) (صحيح: 1,8,9) ==========
HELP_DATA["hoeren2_exam5_q2"] = {
    text: "Steiner möchte, dass die Studierenden das Gelernte auch in der Praxis anwenden können.",
    meaning: "شتاينر يريد أن يتمكن الطلاب من تطبيق ما تعلموه عمليا",
    keywords: ["Studierenden = طلاب", "Gelernte = ما تعلموه", "Praxis = عمليا", "anwenden = تطبيق"],
    simplified: "شتاينر يريد طلابه يطبقون العلم عمليا",
    imagine: "طالب يطبق نظرية على آلة حقيقية",
    correct: true
};

HELP_DATA["hoeren2_exam5_q9"] = {
    text: "Steiner ist es wichtig, als Moderator den Sportlern gegenüber neutral zu bleiben.",
    meaning: "من المهم لشتاينر كمقدم أن يبقى محايدا تجاه الرياضيين",
    keywords: ["Moderator = مقدم", "neutral = محايد", "Sportlern = رياضيين", "wichtig = مهم"],
    simplified: "الحيادية مع الرياضيين أساسية عند شتاينر",
    imagine: "ميكروفون في المنتصف بين لاعبين متنافسين",
    correct: true
};

HELP_DATA["hoeren2_exam5_q10"] = {
    text: "Steiner rät Abiturienten dazu, verschiedene Tests zu machen.",
    meaning: "شتاينر ينصح طلاب الثانوية بإجراء اختبارات متنوعة",
    keywords: ["Abiturienten = طلاب ثانوية", "rät = ينصح", "verschiedene Tests = اختبارات متنوعة", "machen = إجراء"],
    simplified: "شتاينر ينصح الخريجين بعمل اختبارات متعددة",
    imagine: "طالب يحل عدة أوراق اختبار متنوعة",
    correct: true
};

// ========== Exam 6: Mallorca (صحيح: 2,3,6) ==========
HELP_DATA["hoeren2_exam6_q3"] = {
    text: "Einige Einheimische in Mallorca haben begonnen, sich gegen das Vordringen der deutschen Sprache zu wehren.",
    meaning: "بعض السكان الأصليين في مايوركا بدؤوا يقاومون زحف اللغة الألمانية",
    keywords: ["Einheimische = سكان أصليون", "begonnen = بدؤوا", "Vordringen = زحف", "deutschen Sprache = لغة ألمانية"],
    simplified: "سكان مايوركا يقاومون انتشار الألمانية",
    imagine: "أحد السكان يضع لافتة ممنوع الألمانية",
    correct: true
};

HELP_DATA["hoeren2_exam6_q4"] = {
    text: "In Mallorca wird der Staat wegen der Umweltbelastungen zur Kasse gebeten.",
    meaning: "في مايوركا يُطلب من الدولة دفع ثمن التلوث البيئي",
    keywords: ["Mallorca = مايوركا", "Staat = دولة", "Umweltbelastungen = تلوث بيئي", "zur Kasse gebeten = يُطلب دفع"],
    simplified: "الدولة تدفع ثمن التلوث في مايوركا",
    imagine: "رسم تلوث يضرب الدولة على رأسها",
    correct: true
};

HELP_DATA["hoeren2_exam6_q7"] = {
    text: "Bulgarien hat sich als Urlaubsland sehr positiv entwickelt.",
    meaning: "بلغاريا تطورت بشكل إيجابي جدا كدولة سياحية",
    keywords: ["Bulgarien = بلغاريا", "Urlaubsland = دولة سياحية", "positiv entwickelt = تطورت إيجابيا", "sehr = جدا"],
    simplified: "بلغاريا تحسنت كثيرا كوجهة سياحية",
    imagine: "علم بلغاريا يعلو فوق راية سياحية",
    correct: true
};

// ========== Exam 7: Mallorca (Mittel) (صحيح: 2,3,6) ==========
HELP_DATA["hoeren2_exam7_q3"] = {
    text: "Einige Einheimische in Mallorca haben begonnen, sich gegen das Vordringen der deutschen Sprache zu wehren.",
    meaning: "بعض السكان الأصليين في مايوركا بدؤوا يقاومون زحف اللغة الألمانية",
    keywords: ["Einheimische = سكان أصليون", "begonnen = بدؤوا", "Vordringen = زحف", "deutschen Sprache = لغة ألمانية"],
    simplified: "سكان مايوركا يقاومون الألمانية القادمة",
    imagine: "أحد السكان يشطب على كلمة ألمانية",
    correct: true
};

HELP_DATA["hoeren2_exam7_q4"] = {
    text: "Für den Einbruch des Tourismus auf Mallorca sind verschiedene Faktoren verantwortlich.",
    meaning: "عوامل مختلفة مسؤولة عن انهيار السياحة في مايوركا",
    keywords: ["Einbruch = انهيار", "Tourismus = سياحة", "Mallorca = مايوركا", "verschiedene Faktoren = عوامل مختلفة"],
    simplified: "عوامل كثيرة سببت انهيار السياحة بمايوركا",
    imagine: "أسباب متعددة تضرب حقيبة سفر",
    correct: true
};

HELP_DATA["hoeren2_exam7_q7"] = {
    text: "Bulgarien hat sich als Urlaubsland sehr positiv entwickelt.",
    meaning: "بلغاريا تطورت بشكل إيجابي جدا كدولة سياحية",
    keywords: ["Bulgarien = بلغاريا", "Urlaubsland = دولة سياحية", "positiv entwickelt = تطورت إيجابيا", "sehr = جدا"],
    simplified: "بلغاريا تطورت إيجابا بالسياحة",
    imagine: "شمس تشرق فوق خريطة بلغاريا",
    correct: true
};

// ========== Exam 8: In dem Restaurant (صحيح: 0,2,3,6,8) ==========
HELP_DATA["hoeren2_exam8_q1"] = {
    text: "In dem Restaurant gab es einen Wasserschaden.",
    meaning: "حدث ضرر مائي في المطعم",
    keywords: ["Restaurant = مطعم", "Wasserschaden = ضرر مائي", "gab es = حدث"],
    simplified: "المطعم أصابه ضرر من الماء",
    imagine: "ماء يتسرب من سقف المطعم",
    correct: true
};

HELP_DATA["hoeren2_exam8_q3"] = {
    text: "Im Haus der Großeltern lebten auch andere Kinder.",
    meaning: "في منزل الأجداد عاش أيضا أطفال آخرون",
    keywords: ["Haus = منزل", "Großeltern = أجداد", "andere Kinder = أطفال آخرون", "lebten = عاشوا"],
    simplified: "أطفال آخرون عاشوا مع الأجداد",
    imagine: "أطفال كثيرون يلعبون في فناء الجد",
    correct: true
};

HELP_DATA["hoeren2_exam8_q4"] = {
    text: "Der Stress störte den Studiogast während der Ausbildung nicht.",
    meaning: "الضغط لم يزعج ضيف الاستوديو أثناء التدريب",
    keywords: ["Stress = ضغط", "störte = أزعج", "Studiogast = ضيف استوديو", "Ausbildung = تدريب"],
    simplified: "الضغط لم يضايق المتدرب الضيف",
    imagine: "شاب يضحك وسط كومة من الكتب",
    correct: true
};

HELP_DATA["hoeren2_exam8_q7"] = {
    text: "In der Essschule können Kinder kochen lernen.",
    meaning: "في مدرسة الأكل يمكن للأطفال تعلم الطبخ",
    keywords: ["Essschule = مدرسة أكل", "Kinder = أطفال", "kochen lernen = تعلم طبخ", "können = يمكن"],
    simplified: "مدرسة تعلم الأطفال فن الطهي",
    imagine: "طفل يلبس مئزر الطبخ ويقلب القدر",
    correct: true
};

HELP_DATA["hoeren2_exam8_q9"] = {
    text: "Anton Laurito lehnt Fastfood nicht grundsätzlich ab.",
    meaning: "أنطون لايريتو لا يرفض الوجبات السريعة من حيث المبدأ",
    keywords: ["lehnt ab = يرفض", "Fastfood = وجبات سريعة", "nicht grundsätzlich = ليس من حيث المبدأ"],
    simplified: "أنطون لا يرفض الوجبات السريعة تماما",
    imagine: "طباخ يراقب برغر بعين فضولية",
    correct: true
};

HELP_DATA["hoeren2_exam8_q10"] = {
    text: "Der Koch hat eine gesunde Einstellung zum Thema Wettbewerb.",
    meaning: "الطباخ لديه نظرة صحية تجاه موضوع المنافسة",
    keywords: ["Koch = طباخ", "gesunde Einstellung = نظرة صحية", "Wettbewerb = منافسة", "Thema = موضوع"],
    simplified: "الطباخ ينظر للمنافسة بنظرة إيجابية",
    imagine: "طباخ يصافح طباخا آخر بمطبخ كبير",
    correct: true
};

// ========== Exam 9: Julia (صحيح: 0,2,3,4,7) ==========
HELP_DATA["hoeren2_exam9_q1"] = {
    text: "Julia hatte an einem Schüleraustausch kein Interesse.",
    meaning: "جوليا لم يكن لديها اهتمام بتبادل الطلاب",
    keywords: ["Julia = جوليا", "Schüleraustausch = تبادل طلاب", "kein Interesse = لا اهتمام", "hatte = كان"],
    simplified: "جوليا لم تهتم ببرنامج تبادل الطلاب",
    imagine: "فتاة تشيح بوجهها عن كتيب التبادل",
    correct: true
};

HELP_DATA["hoeren2_exam9_q3"] = {
    text: "Frankreich ist als Aufenthaltsland bei Au-pairs nicht sehr gefragt.",
    meaning: "فرنسا ليست مطلوبة جدا كدولة إقامة للمربيات",
    keywords: ["Frankreich = فرنسا", "Aufenthaltsland = دولة إقامة", "Au-pairs = مربيات", "nicht sehr gefragt = ليست مطلوبة جدا"],
    simplified: "فرنسا ليست وجهة مفضلة للمربيات",
    imagine: "خريطة فرنسا وعليها علامة استفهام",
    correct: true
};

HELP_DATA["hoeren2_exam9_q4"] = {
    text: "Julia hatte auch darüber nachgedacht, in die Schweiz zu fahren.",
    meaning: "جوليا فكرت أيضا في الذهاب إلى سويسرا",
    keywords: ["Julia = جوليا", "nachgedacht = فكرت", "Schweiz = سويسرا", "zu fahren = للذهاب"],
    simplified: "جوليا فكرت بالسفر إلى سويسرا أيضا",
    imagine: "فتاة تتأمل صورة جبال سويسرا",
    correct: true
};

HELP_DATA["hoeren2_exam9_q5"] = {
    text: "Julia empfiehlt, mit der Gastfamilie einen Vertrag zu schließen.",
    meaning: "جوليا توصي بإبرام عقد مع العائلة المضيفة",
    keywords: ["empfiehlt = توصي", "Gastfamilie = عائلة مضيفة", "Vertrag = عقد", "schließen = إبرام"],
    simplified: "جوليا تنصح بعقد اتفاق مع العائلة المضيفة",
    imagine: "فتاة توقع ورقة مع عائلة تبتسم",
    correct: true
};

HELP_DATA["hoeren2_exam9_q8"] = {
    text: "Julia verbrachte mit den Kindern auch Zeit in Paris.",
    meaning: "جوليا قضت مع الأطفال وقتا في باريس أيضا",
    keywords: ["Julia = جوليا", "Kindern = أطفال", "Zeit = وقتا", "Paris = باريس"],
    simplified: "جوليا ذهبت مع الأطفال إلى باريس",
    imagine: "برج إيفل وأطفال يلعبون أمامه",
    correct: true
};

// ========== Exam 10: Carina (صحيح: 0,2,3,7,8,9) ==========
HELP_DATA["hoeren2_exam10_q1"] = {
    text: "Der Berufseinstieg ist in anderen Ländern nicht leicht.",
    meaning: "بداية الحياة المهنية ليست سهلة في بلدان أخرى",
    keywords: ["Berufseinstieg = بداية مهنية", "anderen Ländern = بلدان أخرى", "nicht leicht = ليست سهلة"],
    simplified: "بداية العمل صعبة في بلدان كثيرة",
    imagine: "باب مكتوب عليه ممنوع الدخول",    
    correct: true
};

HELP_DATA["hoeren2_exam10_q3"] = {
    text: "Carina hat sich der Agentur mit einem Film präsentiert.",
    meaning: "كارينا قدمت نفسها للوكالة بفيلم",
    keywords: ["Carina = كارينا", "Agentur = وكالة", "Film = فيلم", "präsentiert = قدمت"],
    simplified: "كارينا عرضت فيلما للوكالة لتقبلها",
    imagine: "فتاة تمرر شريط فيلم لوكيل أعمال",
    correct: true
};

HELP_DATA["hoeren2_exam10_q4"] = {
    text: "Carina musste für einen Film ihr Gewicht stark verändern.",
    meaning: "كارينا اضطرت لتغيير وزنها بشكل كبير من أجل فيلم",
    keywords: ["Carina = كارينا", "Film = فيلم", "Gewicht = وزن", "stark verändern = تغيير كبير"],
    simplified: "كارينا غيرت وزنها كثيرا لدور فيلم",
    imagine: "فتاة تقف على ميزان تارة نحيفة تارة ممتلئة",
    correct: true
};

HELP_DATA["hoeren2_exam10_q8"] = {
    text: "Carina findet den Wechsel zwischen Schule und Drehterminen nicht leicht.",
    meaning: "كارينا لا تجد الانتقال بين المدرسة ومواعيد التصوير سهلا",
    keywords: ["Carina = كارينا", "Wechsel = انتقال", "Schule = مدرسة", "Drehterminen = مواعيد تصوير"],
    simplified: "كارينا تواجه صعوبة بالتوفيق بين الدراسة والتمثيل",
    imagine: "فتاة تجري بين باب مدرسة وكاميرا",
    correct: true
};

HELP_DATA["hoeren2_exam10_q9"] = {
    text: "Bei Dialogen darf man auch selbst etwas erfinden.",
    meaning: "في الحوارات يمكن للمرء أيضا أن يختلق شيئا بنفسه",
    keywords: ["Dialogen = حوارات", "darf = يمكن", "selbst = بنفسه", "erfinden = يختلق"],
    simplified: "يسمح للمثل بابتكار حوارات بنفسه",
    imagine: "ممثل يكتب كلمات على سيناريو فارغ",
    correct: true
};

HELP_DATA["hoeren2_exam10_q10"] = {
    text: "Carina empfiehlt, sich andere Schauspieler im Theater und in Filmen anzusehen.",
    meaning: "كارينا توصي بمشاهدة ممثلين آخرين في المسرح والأفلام",
    keywords: ["empfiehlt = توصي", "Schauspieler = ممثلين", "Theater = مسرح", "Filmen = أفلام"],
    simplified: "كارينا تنصح بمشاهدة ممثلين آخرين",
    imagine: "فتاة تجلس في صالة سينما وتقلد الممثلين",
    correct: true
};

// ============================================
// Hören Teil 2 - Exams 11-30 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 11: Carina (Mittel) (صحيح: 0,2,3,7,8,9) ==========
HELP_DATA["hoeren2_exam11_q1"] = {
    text: "Der Berufseinstieg ist in anderen Ländern nicht leicht.",
    meaning: "بداية الحياة المهنية ليست سهلة في بلدان أخرى",
    keywords: ["Berufseinstieg = بداية مهنية", "anderen Ländern = بلدان أخرى", "nicht leicht = ليست سهلة"],
    simplified: "بداية العمل صعبة في بلدان أخرى",
    imagine: "باب مكتوب عليه ممنوع الدخول",
    correct: true
};

HELP_DATA["hoeren2_exam11_q3"] = {
    text: "Carina hat bei der Agentur mit einem Videofilm Interesse geweckt.",
    meaning: "كارينا أثارت اهتمام الوكالة بفيديو",
    keywords: ["Carina = كارينا", "Agentur = وكالة", "Videofilm = فيديو", "Interesse geweckt = أثارت اهتمام"],
    simplified: "كارينا جذبت انتباه الوكالة بفيديو",
    imagine: "فتاة ترسل شريط فيديو لوكيل",
    correct: true
};

HELP_DATA["hoeren2_exam11_q4"] = {
    text: "Carina hat für einen Film eine Diät gemacht.",
    meaning: "كارينا اتبعت حمية غذائية من أجل فيلم",
    keywords: ["Carina = كارينا", "Film = فيلم", "Diät = حمية", "gemacht = اتبعت"],
    simplified: "كارينا عملت رجيما لدور في فيلم",
    imagine: "فتاة تزن نفسها على ميزان",
    correct: true
};

HELP_DATA["hoeren2_exam11_q8"] = {
    text: "Carina findet den Wechsel zwischen Schule und Drehterminen schwierig.",
    meaning: "كارينا تجد الانتقال بين المدرسة ومواعيد التصوير صعبا",
    keywords: ["Carina = كارينا", "Wechsel = انتقال", "Schule = مدرسة", "Drehterminen = مواعيد تصوير", "schwierig = صعب"],
    simplified: "كارينا تواجه صعوبة بالتوفيق بين الدراسة والتمثيل",
    imagine: "فتاة تجري بين باب مدرسة وكاميرا",
    correct: true
};

HELP_DATA["hoeren2_exam11_q9"] = {
    text: "Bei Dialogen darf man auch selbst etwas erfinden.",
    meaning: "في الحوارات يمكن للمرء أن يختلق شيئا بنفسه",
    keywords: ["Dialogen = حوارات", "darf = يمكن", "selbst = بنفسه", "erfinden = يختلق"],
    simplified: "يسمح للمثل بابتكار حواراته بنفسه",
    imagine: "ممثل يكتب كلمات على سيناريو فارغ",
    correct: true
};

HELP_DATA["hoeren2_exam11_q10"] = {
    text: "Carina empfiehlt, sich andere Schauspieler im Theater und in Filmen anzusehen.",
    meaning: "كارينا توصي بمشاهدة ممثلين آخرين في المسرح والأفلام",
    keywords: ["empfiehlt = توصي", "Schauspieler = ممثلين", "Theater = مسرح", "Filmen = أفلام"],
    simplified: "كارينا تنصح بمشاهدة ممثلين آخرين",
    imagine: "فتاة تجلس في سينما وتقلد الممثلين",
    correct: true
};

// ========== Exam 12: Frau Schenk (صحيح: 0,3,5,6,7) ==========
HELP_DATA["hoeren2_exam12_q1"] = {
    text: "Frau Schenk hat kurze blondierte Haare.",
    meaning: "السيدة شينك لديها شعر قصير مصبوغ باللون الأشقر",
    keywords: ["Frau Schenk = سيدة شينك", "kurze = قصير", "blondierte = مصبوغ أشقر", "Haare = شعر"],
    simplified: "شعر السيدة شينك قصير وأشقر",
    imagine: "امرأة بشعر قصير أشقر تبتسم",
    correct: true
};

HELP_DATA["hoeren2_exam12_q4"] = {
    text: "Der Interviewte hat keine guten Erinnerungen an seine Aufenthalte in Jugendherbergen.",
    meaning: "الشخص الذي تجري المقابلة معه ليس لديه ذكريات جيدة عن إقامته في بيوت الشباب",
    keywords: ["Interviewte = شخص مقابلة", "keine guten Erinnerungen = لا ذكريات جيدة", "Jugendherbergen = بيوت شباب"],
    simplified: "ذكريات الشخص عن بيوت الشباب سيئة",
    imagine: "رجل يهز رأسه بحزن أمام سرير خشبي",
    correct: true
};

HELP_DATA["hoeren2_exam12_q6"] = {
    text: "Nur bei Schulklassen achtet man auf Geschlechtertrennung in den Schlafräumen.",
    meaning: "فقط مع الفصول المدرسية يتم الاهتمام بالفصل بين الجنسين في غرف النوم",
    keywords: ["Schulklassen = فصول مدرسية", "Geschlechtertrennung = فصل بين جنسين", "Schlafräumen = غرف نوم"],
    simplified: "فصل الجنسين في غرف النوم فقط للمدارس",
    imagine: "لافتة بنات وأولاد على باب غرفة نوم",
    correct: true
};

HELP_DATA["hoeren2_exam12_q7"] = {
    text: "Das Angebot an Speisen wird auf die Wünsche der Gäste zugeschnitten.",
    meaning: "عرض الطعام يتم تصميمه حسب رغبات الضيوف",
    keywords: ["Angebot = عرض", "Speisen = طعام", "Wünsche = رغبات", "Gäste = ضيوف", "zugeschnitten = مصمم"],
    simplified: "الطعام يعد حسب رغبات الضيوف",
    imagine: "طباخ يسأل الضيوف ماذا يريدون أن يأكلوا",
    correct: true
};

HELP_DATA["hoeren2_exam12_q8"] = {
    text: "Schüler aus ländlichen Regionen sind meist unproblematische Gäste.",
    meaning: "طلاب المناطق الريفية هم عادة ضيوف لا يسببون مشاكل",
    keywords: ["ländlichen Regionen = مناطق ريفية", "unproblematische = لا يسبب مشاكل", "Gäste = ضيوف"],
    simplified: "طلاب الريف ضيوف هادئون عادة",
    imagine: "طلاب يجلسون بهدوء في غرفة الشباب",
    correct: true
};

// ========== Exam 13: Frau Schenk (Mittel) (صحيح: 0,3,5,6,7) ==========
HELP_DATA["hoeren2_exam13_q1"] = {
    text: "Frau Schenk hat kurze blondierte Haare.",
    meaning: "السيدة شينك لديها شعر قصير مصبوغ باللون الأشقر",
    keywords: ["Frau Schenk = سيدة شينك", "kurze = قصير", "blondierte = مصبوغ أشقر", "Haare = شعر"],
    simplified: "شعر السيدة شينك قصير ومصبوغ",
    imagine: "امرأة بشعر أشقر قصير تضحك",
    correct: true
};

HELP_DATA["hoeren2_exam13_q4"] = {
    text: "Der Interviewte hat keine guten Erinnerungen an seine Aufenthalte in Jugendherbergen.",
    meaning: "الشخص المقابل ليس لديه ذكريات جيدة عن بيوت الشباب",
    keywords: ["Interviewte = شخص مقابلة", "keine guten Erinnerungen = لا ذكريات جيدة", "Jugendherbergen = بيوت شباب"],
    simplified: "ذكريات الرجل عن بيوت الشباب سيئة",
    imagine: "رجل يتذكر سريراً صغيراً ويتألم",
    correct: true
};

HELP_DATA["hoeren2_exam13_q6"] = {
    text: "Mädchen und Jungen müssen in verschiedenen Schlafräumen schlafen.",
    meaning: "يجب أن ينام البنات والأولاد في غرف نوم منفصلة",
    keywords: ["Mädchen = بنات", "Jungen = أولاد", "verschiedenen = منفصلة", "Schlafräumen = غرف نوم"],
    simplified: "البنات والأولاد ينامون في غرف منفصلة",
    imagine: "باب مكتوب عليه بنات وباب مكتوب عليه أولاد",
    correct: true
};

HELP_DATA["hoeren2_exam13_q7"] = {
    text: "In der Jugendherberge wird das Essen den Wünschen der Gästegruppen angepasst.",
    meaning: "في بيت الشباب يتم تكييف الطعام حسب رغبات مجموعات الضيوف",
    keywords: ["Jugendherberge = بيت شباب", "Essen = طعام", "Wünschen = رغبات", "Gästegruppen = مجموعات ضيوف"],
    simplified: "الطعام في بيت الشباب حسب رغبة الضيوف",
    imagine: "قائمة طعام طويلة يختار منها الضيوف",
    correct: true
};

HELP_DATA["hoeren2_exam13_q8"] = {
    text: "Schüler aus ländlichen Regionen verhalten sich in der Regel anständig.",
    meaning: "طلاب المناطق الريفية يتصرفون بشكل لائق عادة",
    keywords: ["ländlichen Regionen = مناطق ريفية", "anständig = لائق", "Regel = عادة"],
    simplified: "طلاب الريف يكونون مهذبين غالبا",
    imagine: "طلاب يصفقون بهدوء بعد محاضرة",
    correct: true
};

// ========== Exam 14: Herr Karimov (صحيح: 1,4,7,8,9) ==========
HELP_DATA["hoeren2_exam14_q2"] = {
    text: "Die Mitglieder bekommen für ihre Hilfe ein Stunden-Guthaben.",
    meaning: "الأعضاء يحصلون على رصيد ساعات مقابل مساعدتهم",
    keywords: ["Mitglieder = أعضاء", "Hilfe = مساعدة", "Stunden-Guthaben = رصيد ساعات", "bekommen = يحصلون"],
    simplified: "المتطوعون يحصلون على ساعات مقابل المساعدة",
    imagine: "ساعة تملأ بالدقائق كلما ساعد شخص",
    correct: true
};

HELP_DATA["hoeren2_exam14_q5"] = {
    text: "Manchmal erwarten Mitglieder keine Gegenleistung für ihre Arbeit.",
    meaning: "أحيانا لا يتوقع الأعضاء مقابلًا لعملهم",
    keywords: ["Manchmal = أحيانا", "erwarten = يتوقعون", "keine Gegenleistung = لا مقابل", "ihre Arbeit = عملهم"],
    simplified: "بعض المتطوعين لا يطلبون أجراً مقابل مساعدتهم",
    imagine: "رجل يساعد جاره دون أن يمد يده",
    correct: true
};

HELP_DATA["hoeren2_exam14_q8"] = {
    text: "Herr Karimov erledigt nicht so gerne Büroarbeit.",
    meaning: "السيد كريموف لا يحب القيام بالأعمال المكتبية كثيرا",
    keywords: ["Herr Karimov = سيد كريموف", "erledigt = يقوم", "nicht so gerne = لا يحب كثيرا", "Büroarbeit = أعمال مكتبية"],
    simplified: "كريموف لا يحب العمل المكتبي كثيرا",
    imagine: "رجل ينام على مكتب مليء بالأوراق",
    correct: true
};

HELP_DATA["hoeren2_exam14_q9"] = {
    text: "Wer sich bei der Nachbarschaftshilfe einbringen möchte, muss sich persönlich vorstellen.",
    meaning: "من يريد المشاركة في مساعدة الجيران يجب أن يقدم نفسه شخصيا",
    keywords: ["Nachbarschaftshilfe = مساعدة جيران", "persönlich vorstellen = يقدم نفسه شخصيا", "einbringen = يشارك"],
    simplified: "تقديم شخصي مطلوب للمشاركة في مساعدة الجيران",
    imagine: "رجل يصافح جاره الجديد بحرارة",
    correct: true
};

HELP_DATA["hoeren2_exam14_q10"] = {
    text: "Herr Karimov brauchte vorübergehend einen Chauffeur.",
    meaning: "السيد كريموف احتاج سائقا بشكل مؤقت",
    keywords: ["brauchte = احتاج", "vorübergehend = مؤقتا", "Chauffeur = سائق"],
    simplified: "كريموف احتاج سائقا لفترة مؤقتة",
    imagine: "رجل يمسك مفتاح سيارة وينظر للسائق",
    correct: true
};

// ========== Exam 15: Nadine (صحيح: 1,2,4,5,7,9) ==========
HELP_DATA["hoeren2_exam15_q2"] = {
    text: "Sie hatte vor der Weltreise einige Zweifel und Bedenken.",
    meaning: "كان لديها بعض الشكوك والمخاوف قبل رحلة العالم",
    keywords: ["vorher = قبل", "Weltreise = رحلة عالم", "Zweifel = شكوك", "Bedenken = مخاوف"],
    simplified: "كانت لديها شكوك قبل رحلة العالم",
    imagine: "امرأة تفكر حزينة أمام حقيبة سفر",
    correct: true
};

HELP_DATA["hoeren2_exam15_q3"] = {
    text: "Die Journalistin ist während ihrer Reise auch geflogen.",
    meaning: "الصحفية سافرت بالطائرة أيضا خلال رحلتها",
    keywords: ["Journalistin = صحفية", "während = خلال", "Reise = رحلة", "geflogen = سافرت بالطائرة"],
    simplified: "الصحفية ركبت الطائرة في رحلتها",
    imagine: "امرأة تطل من نافذة طائرة بسعادة",
    correct: true
};

HELP_DATA["hoeren2_exam15_q5"] = {
    text: "Ihre Freunde waren unterschiedlicher Meinung über ihr Vorhaben.",
    meaning: "أصدقاؤها كانوا مختلفين في الرأي حول خطتها",
    keywords: ["Freunde = أصدقاء", "unterschiedlicher Meinung = مختلفي الرأي", "Vorhaben = خطة"],
    simplified: "أصدقاؤها اختلفوا في الرأي على خطتها",
    imagine: "أصدقاء يتناقشون حول خريطة العالم",
    correct: true
};

HELP_DATA["hoeren2_exam15_q6"] = {
    text: "In Tadschikistan hat sie eine Zeit lang andere Motorradfahrer begleitet.",
    meaning: "في طاجيكستان رافقت راكبي دراجات نارية آخرين لفترة",
    keywords: ["Tadschikistan = طاجيكستان", "Motorradfahrer = راكبي دراجات", "begleitet = رافقت"],
    simplified: "رافقت راكبي دراجات في طاجيكستان",
    imagine: "امرأة على دراجة بجانب دراجات أخرى في الجبل",
    correct: true
};

HELP_DATA["hoeren2_exam15_q8"] = {
    text: "Nadine Wagner hat auf der Reise gelegentlich gearbeitet.",
    meaning: "نادين فاغنر عملت أحيانا خلال الرحلة",
    keywords: ["Nadine Wagner = نادين فاغنر", "Reise = رحلة", "gelegentlich = أحيانا", "gearbeitet = عملت"],
    simplified: "نادين عملت أحيانا أثناء رحلتها",
    imagine: "امرأة تكتب على كمبيوتر محمول على الشاطئ",
    correct: true
};

HELP_DATA["hoeren2_exam15_q10"] = {
    text: "Nach ihrer Rückkehr musste sie nicht lange nach einer neuen Arbeit suchen.",
    meaning: "بعد عودتها لم تضطر للبحث طويلا عن عمل جديد",
    keywords: ["Rückkehr = عودة", "lange suchen = بحث طويل", "neuen Arbeit = عمل جديد"],
    simplified: "وجدت كارينا عملا بسرعة بعد عودتها",
    imagine: "امرأة تحصل على عقد عمل عند وصولها",
    correct: true
};

// ========== Exam 16: Markus (صحيح: 1,3,4,7,9) ==========
HELP_DATA["hoeren2_exam16_q2"] = {
    text: "Markus wollte in einem besonders erfolgreichen Team mitarbeiten.",
    meaning: "ماركوس أراد العمل في فريق ناجح بشكل خاص",
    keywords: ["Markus = ماركوس", "erfolgreichen Team = فريق ناجح", "mitarbeiten = العمل مع"],
    simplified: "ماركوس أراد العمل مع فريق ناجح جدا",
    imagine: "شاب يصفق لفريق فائز في الملعب",
    correct: true
};

HELP_DATA["hoeren2_exam16_q4"] = {
    text: "Markus befindet sich zwischen Ausbildung und Beruf.",
    meaning: "ماركوس موجود بين الدراسة والمهنة",
    keywords: ["Markus = ماركوس", "zwischen = بين", "Ausbildung = دراسة", "Beruf = مهنة"],
    simplified: "ماركوس بين نهاية الدراسة وبداية العمل",
    imagine: "شاب واقف على مفترق طرق بين كتاب وآلة",
    correct: true
};

HELP_DATA["hoeren2_exam16_q5"] = {
    text: "Das Studium in Bonn hat Markus sehr gut auf den Auslandsaufenthalt vorbereitet.",
    meaning: "الدراسة في بون حضرت ماركوس بشكل جيد للإقامة بالخارج",
    keywords: ["Studium = دراسة", "Bonn = بون", "Auslandsaufenthalt = إقامة خارجية", "vorbereitet = حضرت"],
    simplified: "دراسة بون جهزت ماركوس للسفر للخارج",
    imagine: "شاب يحمل شهادة ويصعد إلى طائرة",
    correct: true
};

HELP_DATA["hoeren2_exam16_q8"] = {
    text: "Markus ist mit den Arbeitsbedingungen zufrieden.",
    meaning: "ماركوس راض عن ظروف العمل",
    keywords: ["Markus = ماركوس", "Arbeitsbedingungen = ظروف عمل", "zufrieden = راض"],
    simplified: "ماركوس سعيد بظروف العمل",
    imagine: "شاب يجلس على كرسي مريح ويبتسم",
    correct: true
};

HELP_DATA["hoeren2_exam16_q10"] = {
    text: "Für Markus ist es ein Vorteil, dass er in Deutschland Referate und Vorträge halten musste.",
    meaning: "بالنسبة لماركوس من ميزة أنه كان عليه تقديم عروض ومحاضرات في ألمانيا",
    keywords: ["Vorteil = ميزة", "Referate = عروض", "Vorträge = محاضرات", "Deutschland = ألمانيا"],
    simplified: "تقديم العروض في ألمانيا أفاد ماركوس",
    imagine: "شاب يقف أمام جمهور ويتحدث بثقة",
    correct: true
};

// ========== Exam 17: Markus (Mittel) (صحيح: 1,3,4,7,9) ==========
HELP_DATA["hoeren2_exam17_q2"] = {
    text: "Markus wollte in einem besonders erfolgreichen Team mitarbeiten.",
    meaning: "ماركوس أراد العمل في فريق ناجح بشكل خاص",
    keywords: ["Markus = ماركوس", "erfolgreichen Team = فريق ناجح", "mitarbeiten = العمل مع"],
    simplified: "ماركوس أراد الانضمام لفريق ناجح جدا",
    imagine: "شاب يرفع كأس البطولة مع فريقه",
    correct: true
};

HELP_DATA["hoeren2_exam17_q4"] = {
    text: "Markus befindet sich zwischen Ausbildung und Beruf.",
    meaning: "ماركوس موجود بين الدراسة والمهنة",
    keywords: ["Markus = ماركوس", "zwischen = بين", "Ausbildung = دراسة", "Beruf = مهنة"],
    simplified: "ماركوس في المرحلة بين الدراسة والعمل",
    imagine: "شاب يحمل شهادة بيد وآلة باليد الأخرى",
    correct: true
};

HELP_DATA["hoeren2_exam17_q5"] = {
    text: "Markus profitiert in Amerika von Erfahrungen, die er während des Studiums gesammelt hat.",
    meaning: "ماركوس يستفيد في أمريكا من خبرات جمعها أثناء الدراسة",
    keywords: ["profitiert = يستفيد", "Amerika = أمريكا", "Erfahrungen = خبرات", "Studiums = دراسة"],
    simplified: "خبرات الدراسة تفيد ماركوس في أمريكا",
    imagine: "شاب يفتح كتابا قديما ويجد فيه خريطة",
    correct: true
};

HELP_DATA["hoeren2_exam17_q8"] = {
    text: "Markus ist mit den Arbeitsbedingungen zufrieden.",
    meaning: "ماركوس راض عن ظروف العمل",
    keywords: ["Markus = ماركوس", "Arbeitsbedingungen = ظروف عمل", "zufrieden = راض"],
    simplified: "ماركوس راضي جدا عن ظروف عمله",
    imagine: "شاب يرفع إبهامه لأعلى في مكتبه",
    correct: true
};

HELP_DATA["hoeren2_exam17_q10"] = {
    text: "Für Markus ist es ein Vorteil, dass er in Deutschland Referate und Vorträge halten musste.",
    meaning: "تقديم العروض في ألمانيا يعتبر ميزة لماركوس",
    keywords: ["Vorteil = ميزة", "Referate = عروض", "Vorträge = محاضرات", "Deutschland = ألمانيا"],
    simplified: "العروض الألمانية ساعدت ماركوس كثيرا",
    imagine: "شاب يتحدث بطلاقة أمام جمهور أمريكي",
    correct: true
};

// ========== Exam 18: Roland (Spielen) (صحيح: 1,2,3,6,8,9) ==========
HELP_DATA["hoeren2_exam18_q2"] = {
    text: "Viktoria Köln möchte nicht nur gegen Mannschaften aus der Verbandsliga spielen.",
    meaning: "فيكتوريا كولن لا تريد اللعب فقط ضد فرق دوري المقاطعات",
    keywords: ["Viktoria Köln = فيكتوريا كولن", "Mannschaften = فرق", "Verbandsliga = دوري مقاطعات", "spielen = تلعب"],
    simplified: "فريق فيكتوريا يريد منافسة أقوى من دوري المقاطعات",
    imagine: "فريق كرة قدم ينظر لجماهير كبيرة في الدرجة الأعلى",
    correct: true
};

HELP_DATA["hoeren2_exam18_q3"] = {
    text: "Zu Beginn dieser Saison hat ein Spieler Viktoria Köln verlassen.",
    meaning: "في بداية هذا الموسم غادر لاعب فيكتوريا كولن",
    keywords: ["Beginn = بداية", "Saison = موسم", "Spieler = لاعب", "verlassen = غادر"],
    simplified: "لاعب واحد رحل عن فيكتوريا هذا الموسم",
    imagine: "لاعب يحمل حقيبته ويودع فريقه",
    correct: true
};

HELP_DATA["hoeren2_exam18_q4"] = {
    text: "Neue Spieler kommen bei Viktoria Köln immer aus der eigenen Jugendmannschaft.",
    meaning: "اللاعبون الجدد في فيكتوريا كولن يأتون دائما من فريق الشباب الخاص",
    keywords: ["Neue Spieler = لاعبون جدد", "eigenen Jugendmannschaft = فريق شباب خاص", "kommen = يأتون"],
    simplified: "فيكتوريا كولن تصعد لاعبين من شبابها فقط",
    imagine: "شاب ينتقل من فريق الشباب للفريق الأول",
    correct: true
};

HELP_DATA["hoeren2_exam18_q7"] = {
    text: "Roland Wünschmann kann seinen Beruf und sein Ehrenamt als Fußballtrainer problemlos miteinander vereinbaren.",
    meaning: "رولاند فونشمان يمكنه التوفيق بين وظيفته وعمله التطوعي كمدرب كرة قدم بسهولة",
    keywords: ["Beruf = وظيفة", "Ehrenamt = عمل تطوعي", "Fußballtrainer = مدرب كرة قدم", "vereinbaren = يوفق"],
    simplified: "رولاند يوفق بين وظيفته وتدريب كرة القدم بسهولة",
    imagine: "رجل يرتدي بدلة رسمية وبيده صافرة حكم",
    correct: true
};

HELP_DATA["hoeren2_exam18_q9"] = {
    text: "Der Vereinsvorstand schätzt Herrn Wünschmanns Arbeit.",
    meaning: "إدارة النادي تقدر عمل السيد فونشمان",
    keywords: ["Vereinsvorstand = إدارة نادي", "schätzt = يقدر", "Arbeit = عمل"],
    simplified: "إدارة النادي راضية عن عمل رولاند",
    imagine: "رئيس ناد يصافح مدرب فريقه بحرارة",
    correct: true
};

HELP_DATA["hoeren2_exam18_q10"] = {
    text: "Roland Wünschmann ist mit der bisherigen Nachwuchsförderung des Vereins zufrieden.",
    meaning: "رولاند فونشمان راض عن رعاية المواهب الشابة في النادي حتى الآن",
    keywords: ["Nachwuchsförderung = رعاية مواهب شابة", "Vereins = نادي", "zufrieden = راض"],
    simplified: "رولاند سعيد برعاية الشباب في النادي",
    imagine: "مدرب يشاهد لاعبا شابا يلعب ببراعة",
    correct: true
};

// ========== Exam 19: Roland (aufsteigen) (صحيح: 2,3,6,8) ==========
HELP_DATA["hoeren2_exam19_q3"] = {
    text: "Zu Beginn dieser Saison hat ein Spieler Viktoria Köln verlassen.",
    meaning: "في بداية هذا الموسم غادر لاعب واحد فيكتوريا كولن",
    keywords: ["Beginn = بداية", "Saison = موسم", "Spieler = لاعب", "verlassen = غادر"],
    simplified: "لاعب واحد رحل عن فيكتوريا بداية الموسم",
    imagine: "لاعب يلوح بيده مودعا من على الباب",
    correct: true
};

HELP_DATA["hoeren2_exam19_q4"] = {
    text: "Neue Spieler kommen bei Viktoria Köln immer aus der eigenen Jugendmannschaft.",
    meaning: "اللاعبون الجدد في فيكتوريا كولن يأتون من فريق الشباب الخاص",
    keywords: ["Neue Spieler = لاعبون جدد", "Jugendmannschaft = فريق شباب", "kommen = يأتون"],
    simplified: "اللاعبون الجدد هم من شباب النادي",
    imagine: "شاب يرتدي قميص الفريق الأول لأول مرة",
    correct: true
};

HELP_DATA["hoeren2_exam19_q7"] = {
    text: "Roland Wünschmann kann seinen Beruf und sein Ehrenamt als Fußballtrainer miteinander vereinbaren.",
    meaning: "رولاند فونشمان يمكنه التوفيق بين وظيفته وعمله التطوعي كمدرب كرة قدم",
    keywords: ["Beruf = وظيفة", "Ehrenamt = عمل تطوعي", "Fußballtrainer = مدرب كرة قدم", "vereinbaren = يوفق بين"],
    simplified: "رولاند يوفق بين عمله وتدريب الكرة",
    imagine: "رجل يمسك حقيبة عمل في يد وصافرة في يد أخرى",
    correct: true
};

HELP_DATA["hoeren2_exam19_q9"] = {
    text: "Der Vereinsvorstand schätzt Herrn Wünschmanns Arbeit.",
    meaning: "إدارة النادي تقدر عمل السيد فونشمان",
    keywords: ["Vereinsvorstand = إدارة نادي", "schätzt = يقدر", "Arbeit = عمل"],
    simplified: "الإدارة راضية عن عمل المدرب رولاند",
    imagine: "رئيس ناد يصفق للمدرب بعد مباراة",
    correct: true
};

// ========== Exam 20: Roland (einer höheren Lige) (صحيح: 1,2,4,7,8) ==========
HELP_DATA["hoeren2_exam20_q2"] = {
    text: "Viktoria Köln spielt seit Beginn der Saison in einer höheren Lige.",
    meaning: "فيكتوريا كولن تلعب منذ بداية الموسم في دوري أعلى",
    keywords: ["Viktoria Köln = فيكتوريا كولن", "Beginn = بداية", "Saison = موسم", "höheren Lige = دوري أعلى"],
    simplified: "فيكتوريا كولن صعدت لدوري أعلى هذا الموسم",
    imagine: "فريق يصعد سلما من البطولات",
    correct: true
};

HELP_DATA["hoeren2_exam20_q3"] = {
    text: "Die meisten Spieler der Mannschaft haben schon in der letzten Saison bei Viktoria Köln gespielt.",
    meaning: "معظم لاعبي الفريق لعبوا الموسم الماضي مع فيكتوريا كولن",
    keywords: ["meisten Spieler = معظم اللاعبين", "letzten Saison = الموسم الماضي", "Viktoria Köln = فيكتوريا كولن"],
    simplified: "معظم اللاعبين بقوا من الموسم الماضي",
    imagine: "لاعبون يرفعون قميص فريقهم بفخر",
    correct: true
};

HELP_DATA["hoeren2_exam20_q5"] = {
    text: "Die Mannschaft von Viktoria Köln möchte in dieser Saison neue Spieltaktiken ausprobieren.",
    meaning: "فريق فيكتوريا كولن يريد تجربة تكتيكات لعب جديدة هذا الموسم",
    keywords: ["Mannschaft = فريق", "neue Spieltaktiken = تكتيكات لعب جديدة", "ausprobieren = تجربة"],
    simplified: "فيكتوريا يريد تجربة خطط لعب جديدة",
    imagine: "مدرب يرسم تشكيلة جديدة على السبورة",
    correct: true
};

HELP_DATA["hoeren2_exam20_q8"] = {
    text: "Roland Wünschmanns Frau engagiert sich für denselben Verein.",
    meaning: "زوجة رولاند فونشمان تطوعت في نفس النادي",
    keywords: ["Frau = زوجة", "engagiert sich = تطوعت", "denselben Verein = نفس النادي"],
    simplified: "زوجة رولاند تطوعت في النادي نفسه",
    imagine: "رجل وامرأة يلبسان قميصا واحدا للنادي",
    correct: true
};

HELP_DATA["hoeren2_exam20_q9"] = {
    text: "Herr Wünschmann und der Vereinsvorstand sind meistens einer Meinung.",
    meaning: "السيد فونشمان وإدارة النادي متفقون غالبا",
    keywords: ["Vereinsvorstand = إدارة نادي", "meistens = غالبا", "einer Meinung = متفقون"],
    simplified: "رولاند والإدارة متفقون في أغلب الأوقات",
    imagine: "رجل ومدير يصافحان وكلاهما يبتسم",
    correct: true
};

// ========== Exam 21: Die Deutschen machen (صحيح: 2,4,8) ==========
HELP_DATA["hoeren2_exam21_q3"] = {
    text: "Wellness-Angebote gibt es vor allem in Hotels der gehobenen Kategorie.",
    meaning: "عروض العافية موجودة خاصة في فنادق الفئة العالية",
    keywords: ["Wellness-Angebote = عروض عافية", "gehobenen Kategorie = فئة عالية", "Hotels = فنادق"],
    simplified: "فنادق الدرجة العالية تقدم عروض العافية",
    imagine: "فندق فخم وباب مكتوب عليه سبا",
    correct: true
};

HELP_DATA["hoeren2_exam21_q5"] = {
    text: "In den Hotels kann man auch schwimmen und in die Sauna gehen.",
    meaning: "في الفنادق يمكن السباحة والذهاب للساونا",
    keywords: ["Hotels = فنادق", "schwimmen = سباحة", "Sauna = ساونا"],
    simplified: "الفنادق توفر سباحة وساونا للنزلاء",
    imagine: "مسبح كبير وساونا بخارها يتصاعد",
    correct: true
};

HELP_DATA["hoeren2_exam21_q9"] = {
    text: "Die Hotels haben besondere Angebote für Männer.",
    meaning: "الفنادق لديها عروض خاصة للرجال",
    keywords: ["Hotels = فنادق", "besondere Angebote = عروض خاصة", "Männer = رجال"],
    simplified: "الفنادق تقدم برامج خاصة للرجال",
    imagine: "رجل يسترخي في كرسي مساج فاخر",
    correct: true
};

// ========== Exam 22: Herr Scherer (صحيح: 2,3,9) ==========
HELP_DATA["hoeren2_exam22_q3"] = {
    text: "Herr Scherer hat wechselnde Arbeitszeiten.",
    meaning: "السيد شيرر لديه أوقات عمل متغيرة",
    keywords: ["Herr Scherer = سيد شيرر", "wechselnde = متغيرة", "Arbeitszeiten = أوقات عمل"],
    simplified: "شيرر يعمل في أوقات مختلفة كل يوم",
    imagine: "ساعة يد تتغير عقاربها كل مرة",
    correct: true
};

HELP_DATA["hoeren2_exam22_q4"] = {
    text: "Verspätungen gehen häufig auf das Konto undisziplinierter Fahrgäste.",
    meaning: "التأخيرات غالبا بسبب ركاب غير منضبطين",
    keywords: ["Verspätungen = تأخيرات", "häufig = غالبا", "undisziplinierter Fahrgäste = ركاب غير منضبطين"],
    simplified: "الركاب غير المهذبين يسببون التأخير",
    imagine: "راكب يمسك الباب ويؤخر الحافلة",
    correct: true
};

HELP_DATA["hoeren2_exam22_q10"] = {
    text: "Herr Scherer hat bei der Post 15 Jahre in Nachtschicht gearbeitet.",
    meaning: "السيد شيرر عمل في البريد 15 سنة في الوردية الليلية",
    keywords: ["Post = بريد", "15 Jahre = 15 سنة", "Nachtschicht = وردية ليلية", "gearbeitet = عمل"],
    simplified: "شيرر اشتغل في البريد ليلا لمدة 15 عاما",
    imagine: "رجل ينام نهارا ويصحو مع القمر",
    correct: true
};

// ========== Exam 23: Beim Wettkampf (صحيح: 0,1,3,5) ==========
HELP_DATA["hoeren2_exam23_q1"] = {
    text: "Beim Wettkampf auf Sylt gibt es mehr Zuschauer als bei anderen Surf-Wettkämpfen.",
    meaning: "في مسابقة سيلت يوجد مشاهدون أكثر من مسابقات ركمجة الأمواج الأخرى",
    keywords: ["Wettkampf = مسابقة", "Sylt = سيلت", "mehr Zuschauer = مشاهدون أكثر", "Surf-Wettkämpfen = مسابقات ركمجة"],
    simplified: "جمهور سيلت أكبر من مسابقات الركمجة الأخرى",
    imagine: "شاطئ مزدحم بالجماهير يتابعون الأمواج",
    correct: true
};

HELP_DATA["hoeren2_exam23_q2"] = {
    text: "Die Wind-Bedingungen sind auf Sylt sehr unberechenbar.",
    meaning: "ظروف الرياح في سيلت غير متوقعة جدا",
    keywords: ["Wind-Bedingungen = ظروف رياح", "Sylt = سيلت", "unberechenbar = غير متوقعة"],
    simplified: "الرياح في سيلت لا يمكن توقعها",
    imagine: "رياح تغير اتجاهها فجأة كل دقيقة",
    correct: true
};

HELP_DATA["hoeren2_exam23_q4"] = {
    text: "Im Freestyle hat er schon starke Gegner, die viel jünger sind als er.",
    meaning: "في السباحة الحرة لديه خصوم أقوياء أصغر منه سنا",
    keywords: ["Freestyle = سباحة حرة", "starke Gegner = خصوم أقوياء", "viel jünger = أصغر بكثير"],
    simplified: "خصومه في السباحة الحرة أصغر وأقوى منه",
    imagine: "شاب كبير يقف أمام شباب أصغر منه بكثير",
    correct: true
};

HELP_DATA["hoeren2_exam23_q6"] = {
    text: "Sein Hobby ist, solche Strände zu suchen, wo sich im Windsurfen noch niemand ausprobiert hat.",
    meaning: "هوايته البحث عن شواطئ لم يجرب فيها أحد ركمجة الرياح بعد",
    keywords: ["Hobby = هواية", "Strände = شواطئ", "Windsurfen = ركمجة رياح", "niemand ausprobiert = لم يجرب أحد"],
    simplified: "يحب اكتشاف شواطئ جديدة لركوب الأمواج",
    imagine: "رجل يضع علما على شاطئ جديد",
    correct: true
};

// ========== Exam 24: Vanessa (صحيح: 1,2,3,5,7,9) ==========
HELP_DATA["hoeren2_exam24_q2"] = {
    text: "Mit den Arbeitsbedingungen in der Werbeagentur war Vanessa unzufrieden.",
    meaning: "فانيسا كانت غير راضية عن ظروف العمل في وكالة الإعلانات",
    keywords: ["Arbeitsbedingungen = ظروف عمل", "Werbeagentur = وكالة إعلانات", "unzufrieden = غير راضية"],
    simplified: "فانيسا لم تعجبها ظروف عمل وكالة الإعلانات",
    imagine: "امرأة تمزق عقد عمل أمام مكتب",
    correct: true
};

HELP_DATA["hoeren2_exam24_q3"] = {
    text: "Wenn Vanessa unter Menschen ist, schadet das manchmal ihrer Konzentration.",
    meaning: "عندما تكون فانيسا بين الناس فهذا يضر بتركيزها أحيانا",
    keywords: ["unter Menschen = بين الناس", "schadet = يضر", "Konzentration = تركيز"],
    simplified: "وجود الناس حول فانيسا يشتت تركيزها",
    imagine: "امرأة تغطي أذنيها في مكان مزدحم",
    correct: true
};

HELP_DATA["hoeren2_exam24_q4"] = {
    text: "Die Sicherheit, die eine feste Stelle bietet, bedeutet Vanessa nicht viel.",
    meaning: "الأمان الذي توفره وظيفة ثابتة لا يعني الكثير لفانيسا",
    keywords: ["Sicherheit = أمان", "feste Stelle = وظيفة ثابتة", "bedeutet nicht viel = لا يعني الكثير"],
    simplified: "فانيسا لا تهتم بالأمان الوظيفي كثيرا",
    imagine: "امرأة ترمي قلعة رملية بقدمها",
    correct: true
};

HELP_DATA["hoeren2_exam24_q6"] = {
    text: "Dass sie immer wieder neue Auftraggeber suchen muss, hat für Vanessa auch Vorteile.",
    meaning: "اضطرارها للبحث عن عملاء جدد له مميزات لفانيسا",
    keywords: ["neue Auftraggeber = عملاء جدد", "suchen = بحث", "Vorteile = مميزات"],
    simplified: "فانيسا ترى إيجابيات في البحث عن عملاء جدد",
    imagine: "امرأة تتصافح مع أشخاص جدد بسعادة",
    correct: true
};

HELP_DATA["hoeren2_exam24_q8"] = {
    text: "Es fiel Vanessa leicht, sich von persönlichen Gegenständen zu trennen.",
    meaning: "كان من السهل على فانيسا التخلي عن أغراضها الشخصية",
    keywords: ["fiel leicht = كان سهلا", "persönlichen Gegenständen = أغراض شخصية", "zu trennen = التخلي عن"],
    simplified: "فانيسا تخلت عن أشيائها الشخصية بسهولة",
    imagine: "امرأة ترمي أشياء في حقيبة خارجة",
    correct: true
};

HELP_DATA["hoeren2_exam24_q10"] = {
    text: "Auch wer ortsunabhängig arbeitet, sollte nicht zu oft den Ort wechseln.",
    meaning: "حتى من يعمل من أي مكان لا يجب أن يغير المكان كثيرًا",
    keywords: ["ortsunabhängig = من أي مكان", "nicht zu oft = ليس كثيرا", "Ort wechseln = تغيير مكان"],
    simplified: "لا تغير مكان إقامتك كثيرا حتى لو كنت حرا",
    imagine: "رجل يحمل حقيبة يقف أمام عدة مدن",
    correct: true
};

// ========== Exam 25: Zu Beginn (صحيح: 0,1,2,3,5,7,8) ==========
HELP_DATA["hoeren2_exam25_q1"] = {
    text: "Zu Beginn der Sendung hatte der Reporter ein exklusives Frühstücksrezept erwartet.",
    meaning: "في بداية البرنامج توقع المراسل وصفة فطور حصرية",
    keywords: ["Beginn = بداية", "Sendung = برنامج", "Reporter = مراسل", "exklusives Frühstücksrezept = وصفة فطور حصرية"],
    simplified: "المراسل توقع وصفة فطور مميزة في بداية البرنامج",
    imagine: "مراسل يمسك قلم وورقة وينتظر الطباخ",
    correct: true
};

HELP_DATA["hoeren2_exam25_q2"] = {
    text: "Ole hat sich vor 17 Jahren selbstständig gemacht.",
    meaning: "أوليه أصبح مستقلا منذ 17 سنة",
    keywords: ["Ole = أوليه", "vor 17 Jahren = منذ 17 سنة", "selbstständig gemacht = أصبح مستقلا"],
    simplified: "أوليه بدأ عمله الخاص منذ 17 عاما",
    imagine: "رجل يفتح باب متجر جديد عليه رقم 17",
    correct: true
};

HELP_DATA["hoeren2_exam25_q3"] = {
    text: "Davor hatte er eine Lehre als Koch absolviert.",
    meaning: "قبل ذلك كان قد أتم تدريبا كطباخ",
    keywords: ["Davor = قبل ذلك", "Lehre = تدريب", "Koch = طباخ", "absolviert = أتم"],
    simplified: "أوليه أتم تدريب طبخ قبل ذلك",
    imagine: "شاب يرتدي قبعة الطباخ ويتخرج",
    correct: true
};

HELP_DATA["hoeren2_exam25_q4"] = {
    text: "Er bevorzugt Gerichte ohne Fleisch.",
    meaning: "يفضل الأطباق بدون لحم",
    keywords: ["bevorzugt = يفضل", "Gerichte = أطباق", "ohne Fleisch = بدون لحم"],
    simplified: "أوليه يفضل الأكلات الخالية من اللحم",
    imagine: "طباخ يضع خضروات فقط في القدر",
    correct: true
};

HELP_DATA["hoeren2_exam25_q6"] = {
    text: "Er kocht für Musiker, die auf Tournee sind.",
    meaning: "هو يطبخ لموسيقيين في جولة",
    keywords: ["kocht = يطبخ", "Musiker = موسيقيين", "Tournee = جولة"],
    simplified: "أوليه يطبخ للفرق الموسيقية أثناء جولاتهم",
    imagine: "طباخ يقدم طبقا لموسيقي يحمل جيتارا",
    correct: true
};

HELP_DATA["hoeren2_exam25_q8"] = {
    text: "Ole nimmt eine komplette Kücheneinrichtung mit auf Tournee.",
    meaning: "أوليه يأخذ معدات مطبخ كاملة معه في الجولة",
    keywords: ["komplette Kücheneinrichtung = معدات مطبخ كاملة", "Tournee = جولة", "nimmt mit = يأخذ مع"],
    simplified: "أوليه يسافر معه بمطبخ متكامل",
    imagine: "شاحنة مليئة بأواني الطهي تتبع الحافلة",
    correct: true
};

HELP_DATA["hoeren2_exam25_q9"] = {
    text: "Er macht sich über den Sender lustig, weil der Reporter bei englischen Wörtern nachfragt.",
    meaning: "يسخر من المحطة لأن المراسل يسأل عن الكلمات الإنجليزية",
    keywords: ["macht sich lustig = يسخر", "Sender = محطة", "Reporter = مراسل", "englischen Wörtern = كلمات إنجليزية"],
    simplified: "أوليه يضحك على المراسل الذي لا يفهم الإنجليزية",
    imagine: "طباخ يضحك ومراسل يحمل قاموس إنجليزي",
    correct: true
};

// ========== Exam 26: Die TU Dresden (صحيح: 2,4,6,7,9) ==========
HELP_DATA["hoeren2_exam26_q3"] = {
    text: "Ältere Studierende kümmern sich um neue Studierende.",
    meaning: "الطلاب الأكبر سنا يهتمون بالطلاب الجدد",
    keywords: ["Ältere Studierende = طلاب أكبر سنا", "kümmern sich = يهتمون", "neue Studierende = طلاب جدد"],
    simplified: "الطلاب القدامى يساعدون الجدد في الجامعة",
    imagine: "طالب كبير يشرح لطالب جديد مكان القاعة",
    correct: true
};

HELP_DATA["hoeren2_exam26_q5"] = {
    text: "Jens ist nicht sicher, ob er nach dem Studium einen interessanten Job bekommt.",
    meaning: "ينس غير متأكد مما إذا كان سيحصل على وظيفة مثيرة بعد الدراسة",
    keywords: ["nicht sicher = غير متأكد", "nach dem Studium = بعد الدراسة", "interessanten Job = وظيفة مثيرة"],
    simplified: "ينس قلق من عدم حصوله على وظيفة جيدة بعد التخرج",
    imagine: "شاب يحمل شهادته وينظر لسماء غائمة",
    correct: true
};

HELP_DATA["hoeren2_exam26_q7"] = {
    text: "Mit dem Semesterticket dürfen Studierende öffentliche Verkehrsmittel in Dresden nutzen.",
    meaning: "بتذكرة الفصل الدراسي يمكن للطلاب استخدام وسائل النقل العام في دريسدن",
    keywords: ["Semesterticket = تذكرة فصل", "öffentliche Verkehrsmittel = وسائل نقل عام", "Dresden = دريسدن"],
    simplified: "تذكرة الفصل تخولك ركوب المواصلات في دريسدن",
    imagine: "طالب يمسك تذكرة ويركب الحافلة بكل ثقة",
    correct: true
};

HELP_DATA["hoeren2_exam26_q8"] = {
    text: "Für Studienanfänger gibt es die Möglichkeit, bestimmte Grundkenntnisse aufzufrischen.",
    meaning: "للطلاب الجدد هناك إمكانية لتحديث بعض المعارف الأساسية",
    keywords: ["Studienanfänger = طلاب جدد", "Grundkenntnisse = معارف أساسية", "aufzufrischen = تحديث"],
    simplified: "الطلاب الجدد يمكنهم مراجعة الأساسيات",
    imagine: "طالب يمسح الغبار عن كتب قديمة",
    correct: true
};

HELP_DATA["hoeren2_exam26_q10"] = {
    text: "An der TU Dresden kann man auch außergewöhnliche Sportarten treiben.",
    meaning: "في جامعة دريسدن التقنية يمكن ممارسة رياضات غير عادية",
    keywords: ["TU Dresden = جامعة دريسدن التقنية", "außergewöhnliche = غير عادية", "Sportarten = رياضات"],
    simplified: "الجامعة تقدم رياضات غير تقليدية لطلابها",
    imagine: "طالب يلعب تنس الطاولة على قدم واحدة",
    correct: true
};

// ========== Exam 27: Lisa Eisenberg (صحيح: 1,2,3,5,7) ==========
HELP_DATA["hoeren2_exam27_q2"] = {
    text: "Während einer Reise entschied sich Lisa Eisenberg für einen beruflichen Neuanfang.",
    meaning: "خلال رحلة قررت ليزا أيزنبرغ بداية مهنية جديدة",
    keywords: ["während = خلال", "Reise = رحلة", "beruflichen Neuanfang = بداية مهنية جديدة", "entschied sich = قررت"],
    simplified: "ليزا قررت تغيير مهنتها أثناء سفرها",
    imagine: "امرأة تنظر من نافذة طائرة وتخطط لمستقبلها",
    correct: true
};

HELP_DATA["hoeren2_exam27_q3"] = {
    text: "Lisa Eisenbergs Geschäftsidee stieß in ihrem Bekanntenkreis auf Skepsis.",
    meaning: "فكرة ليزا التجارية قوبلت بالتشكك في دائرة معارفها",
    keywords: ["Geschäftsidee = فكرة تجارية", "Bekanntenkreis = دائرة معارف", "Skepsis = تشكك"],
    simplified: "أصدقاء ليزا شككوا في فكرة مشروعها",
    imagine: "أصدقاء يهزون رؤوسهم حول امرأة تشرح فكرتها",
    correct: true
};

HELP_DATA["hoeren2_exam27_q4"] = {
    text: "Lisa Eisenberg hat sich auf regionale Speisen spezialisiert.",
    meaning: "ليزا أيزنبرغ تخصصت في الأطباق المحلية",
    keywords: ["regionale Speisen = أطباق محلية", "spezialisiert = تخصصت"],
    simplified: "ليزا متخصصة في الأكلات الشعبية للمنطقة",
    imagine: "امرأة ترتدي مئزر طبخ وترفع طبقا محليا",
    correct: true
};

HELP_DATA["hoeren2_exam27_q6"] = {
    text: "Lisa Eisenberg muss nicht mehr aktiv nach Kunden suchen.",
    meaning: "ليزا أيزنبرغ لم تعد بحاجة للبحث بنشاط عن زبائن",
    keywords: ["nicht mehr = لم تعد", "aktiv suchen = بحث نشط", "Kunden = زبائن"],
    simplified: "ليزا لم تعد تبحث عن زبائن بنفسها",
    imagine: "امرأة تجلس وترتاح بينما الزبائن يأتون إليها",
    correct: true
};

HELP_DATA["hoeren2_exam27_q8"] = {
    text: "Es war für Lisa Eisenberg leicht, ein geeignetes Fahrzeug zu finden.",
    meaning: "كان من السهل على ليزا أيزنبرغ إيجاد مركبة مناسبة",
    keywords: ["leicht = سهل", "geeignetes Fahrzeug = مركبة مناسبة", "zu finden = إيجاد"],
    simplified: "ليزا وجدت السيارة المناسبة بسهولة",
    imagine: "امرأة تشير بإعجاب إلى شاحنة طعام جميلة",
    correct: true
};

// ========== Exam 28: Franz Schumacher (صحيح: 0,1,3,5,7,9) ==========
HELP_DATA["hoeren2_exam28_q1"] = {
    text: "Franz Schumacher handelt nicht nur mit Produkten aus eigenem Anbau.",
    meaning: "فرانز شوماخر لا يتاجر فقط بمنتجات من زراعته الخاصة",
    keywords: ["handelt = يتاجر", "eigenem Anbau = زراعة خاصة", "nicht nur = ليس فقط"],
    simplified: "فرانز يبيع منتجات ليست من زراعته فقط",
    imagine: "رجل يبيع خضروات من عدة مزارع مختلفة",
    correct: true
};

HELP_DATA["hoeren2_exam28_q2"] = {
    text: "Herr Schumacher lässt sich auch von anderen Bauern Produkte liefern.",
    meaning: "السيد شوماخر يستورد منتجات من مزارعين آخرين",
    keywords: ["anderen Bauern = مزارعين آخرين", "Produkte liefern = توريد منتجات", "lässt sich = يستورد"],
    simplified: "فرانز يستورد منتجات من مزارعين غير نفسه",
    imagine: "فلاح يستلم صناديق خضروات من جاره",
    correct: true
};

HELP_DATA["hoeren2_exam28_q4"] = {
    text: "Die große Mehrheit der Kunden von Herrn Schumacher sind Stammkunden.",
    meaning: "الغالبية العظمى من زبائن السيد شوماخر هم زبائن دائمون",
    keywords: ["große Mehrheit = غالبية عظمى", "Kunden = زبائن", "Stammkunden = زبائن دائمون"],
    simplified: "معظم زبائن فرانز مشتركون دائمون",
    imagine: "زبائن يبتسمون ويتعرفون على البائع جيدا",
    correct: true
};

HELP_DATA["hoeren2_exam28_q6"] = {
    text: "Franz Schumacher hat keine hohe Meinung vom 'Fachhändlerverein vom Rathausplatz'.",
    meaning: "فرانز شوماخر ليس لديه رأي عالي في 'جمعية التجار المتخصصين في ساحة البلدية'",
    keywords: ["keine hohe Meinung = ليس رأي عالي", "Fachhändlerverein = جمعية تجار متخصصين", "Rathausplatz = ساحة بلدية"],
    simplified: "فرانز لا يحب جمعية تجار ساحة البلدية",
    imagine: "رجل يشطب على اسم جمعية بقلم أحمر",
    correct: true
};

HELP_DATA["hoeren2_exam28_q8"] = {
    text: "Herr Schumacher hat seit über 20 Jahren einen Stand auf dem Landauer Markt.",
    meaning: "السيد شوماخر لديه كشك في سوق لانداو منذ أكثر من 20 عاما",
    keywords: ["seit über 20 Jahren = منذ أكثر من 20 عاما", "Stand = كشك", "Landauer Markt = سوق لانداو"],
    simplified: "فرانز يبيع في سوق لانداو منذ 20 سنة",
    imagine: "رجل واقف أمام كشكه وعليه علامة 20 سنة",
    correct: true
};

HELP_DATA["hoeren2_exam28_q10"] = {
    text: "Herr Schumacher möchte in Zukunft einen Verkaufsstand in einer Markthalle eröffnen.",
    meaning: "السيد شوماخر يريد فتح كشك بيع في قاعة سوق مستقبلا",
    keywords: ["Zukunft = مستقبل", "Verkaufsstand = كشك بيع", "Markthalle = قاعة سوق"],
    simplified: "فرانز يخطط لفتح كشك داخل قاعة السوق",
    imagine: "رجل يضع لافتة جديدة في مبنى كبير للسوق",
    correct: true
};

// ========== Exam 29: Meron Makeba (صحيح: 3,4,8,9) ==========
HELP_DATA["hoeren2_exam29_q4"] = {
    text: "Das Publikum hat bei der WM die Sportler aller Nationen unterstützt.",
    meaning: "الجمهور في البطولة العالمية دعم رياضيين من كل الدول",
    keywords: ["Publikum = جمهور", "WM = بطولة عالمية", "Sportler aller Nationen = رياضيين كل الدول", "unterstützt = دعم"],
    simplified: "الجمهور شجع جميع الرياضيين بغض النظر عن دولهم",
    imagine: "علم كل دولة يرفرف والجمهور يصفق للجميع",
    correct: true
};

HELP_DATA["hoeren2_exam29_q5"] = {
    text: "Frau Makeba trifft selten andere Sportler aus Ghana.",
    meaning: "السيدة ماكيبا نادرا ما تقابل رياضيين آخرين من غانا",
    keywords: ["trifft = تقابل", "selten = نادرا", "andere Sportler = رياضيين آخرين", "Ghana = غانا"],
    simplified: "ميرون نادرا ما ترى رياضيين غانيين مثلها",
    imagine: "امرأة تبحث عن أحد ولا تجد أحدا يرفع علم غانا",
    correct: true
};

HELP_DATA["hoeren2_exam29_q9"] = {
    text: "Frau Makeba glaubt nicht, dass man aufgrund der Herkunft in bestimmten Sportarten bevorzugt wird.",
    meaning: "السيدة ماكيبا لا تعتقد أن الشخص يفضل في رياضات معينة بسبب أصله",
    keywords: ["glaubt nicht = لا تعتقد", "Herkunft = أصل", "bevorzugt = يفضل", "bestimmten Sportarten = رياضات معينة"],
    simplified: "ميرون ترفض فكرة تفضيل أحد بسبب أصله في الرياضة",
    imagine: "ميزان متساو بين رياضي من هنا وآخر من هناك",
    correct: true
};

HELP_DATA["hoeren2_exam29_q10"] = {
    text: "Frau Makebas Erfahrungen im privaten Bereich unterscheiden sich stark von denen im Sport.",
    meaning: "تجارب السيدة ماكيبا في المجال الخاص تختلف كثيرا عنها في الرياضة",
    keywords: ["Erfahrungen = تجارب", "privaten Bereich = مجال خاص", "unterscheiden sich stark = تختلف كثيرا", "Sport = رياضة"],
    simplified: "حياة ميرون الخاصة مختلفة جدا عن حياتها الرياضية",
    imagine: "امرأة تخلع قميص الرياضة وتلبس ملابس عادية",
    correct: true
};

// ========== Exam 30: Frau Kedar Malta (صحيح: 1,2,5,6,9) ==========
HELP_DATA["hoeren2_exam30_q2"] = {
    text: "Sie lebt jetzt in Malta.",
    meaning: "هي تعيش الآن في مالطا",
    keywords: ["lebt = تعيش", "jetzt = الآن", "Malta = مالطا"],
    simplified: "السيدة كيدار تعيش حاليا في مالطا",
    imagine: "امرأة تقف أمام شاطئ مالطي جميل",
    correct: true
};

HELP_DATA["hoeren2_exam30_q3"] = {
    text: "Sie ist effektiv und tätig in Malta.",
    meaning: "هي فعالة ونشطة في مالطا",
    keywords: ["effektiv = فعالة", "tätig = نشطة", "Malta = مالطا"],
    simplified: "السيدة كيدار ناشطة وفعالة في مالطا",
    imagine: "امرأة تبتسم وهي تساعد الناس في مالطا",
    correct: true
};

HELP_DATA["hoeren2_exam30_q6"] = {
    text: "Der Moderator kennt die Temperatur des Mittelmeers im Winter nicht.",
    meaning: "المقدم لا يعرف حرارة البحر المتوسط شتاءا",
    keywords: ["Moderator = مقدم", "Temperatur = حرارة", "Mittelmeers = بحر متوسط", "Winter = شتاء"],
    simplified: "مقدم البرنامج يجهل حرارة البحر المتوسط شتاء",
    imagine: "رجل يمسك ميكروفونا ويبحث في هاتفه عن درجة الحرارة",
    correct: true
};

HELP_DATA["hoeren2_exam30_q7"] = {
    text: "Der Moderator denkt, in Malta gibt es drei Amtssprachen.",
    meaning: "المقدم يعتقد أن في مالطا ثلاث لغات رسمية",
    keywords: ["Moderator = مقدم", "denkt = يعتقد", "Malta = مالطا", "drei Amtssprachen = ثلاث لغات رسمية"],
    simplified: "المقدم يعتقد أن مالطا تتحدث ثلاث لغات",
    imagine: "ثلاثة ألسنة تخرج من خريطة مالطا",
    correct: true
};

HELP_DATA["hoeren2_exam30_q10"] = {
    text: "Malteser kommen aus verschiedenen Religionen.",
    meaning: "المالطيون من ديانات مختلفة",
    keywords: ["Malteser = مالطيون", "verschiedenen = مختلفة", "Religionen = ديانات"],
    simplified: "المالطيون لهم ديانات متنوعة",
    imagine: "رموز دينية مختلفة على خريطة مالطا",
    correct: true
};

// ============================================
// Hören Teil 2 - Exams 31-40 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 31: Frau Keder aus Malta (صحيح: 1,3,4,5,8,9) ==========
HELP_DATA["hoeren2_exam31_q2"] = {
    text: "Sie lebt jetzt in Malta.",
    meaning: "هي تعيش الآن في مالطا",
    keywords: ["lebt = تعيش", "jetzt = الآن", "Malta = مالطا"],
    simplified: "السيدة كيدار تعيش حاليا في مالطا",
    imagine: "امرأة ترتدي قبعة شمسية على شاطئ مالطي",
    correct: true
};

HELP_DATA["hoeren2_exam31_q4"] = {
    text: "Sie genießt das ganze Jahr im Mittelmeer zu baden.",
    meaning: "هي تستمتع بالسباحة في البحر المتوسط طوال العام",
    keywords: ["genießt = تستمتع", "ganze Jahr = طوال العام", "Mittelmeer = بحر متوسط", "baden = سباحة"],
    simplified: "تسبح في البحر المتوسط طوال أيام السنة",
    imagine: "امرأة تسبح في البحر حتى في ديسمبر",
    correct: true
};

HELP_DATA["hoeren2_exam31_q5"] = {
    text: "Der Moderator kennt die Temperatur des Mittelmeers im Winter nicht.",
    meaning: "المقدم لا يعرف حرارة البحر المتوسط في الشتاء",
    keywords: ["Moderator = مقدم", "Temperatur = حرارة", "Mittelmeers = بحر متوسط", "Winter = شتاء"],
    simplified: "مقدم البرنامج يجهل حرارة البحر شتاء",
    imagine: "رجل يهز كتفيه أمام شاشة الطقس",
    correct: true
};

HELP_DATA["hoeren2_exam31_q8"] = {
    text: "Malteser kommen aus verschiedenen Religionen.",
    meaning: "المالطيون من ديانات مختلفة",
    keywords: ["Malteser = مالطيون", "verschiedenen = مختلفة", "Religionen = ديانات"],
    simplified: "المالطيون لهم ديانات متعددة",
    imagine: "كنيسة ومسجد بجانب بعضهم في مالطا",
    correct: true
};

HELP_DATA["hoeren2_exam31_q9"] = {
    text: "Sie plante, die maltesische Sprache zu lernen.",
    meaning: "خططت لتعلم اللغة المالطية",
    keywords: ["plante = خططت", "maltesische Sprache = لغة مالطية", "zu lernen = لتعلم"],
    simplified: "السيدة كيدار نوت تعلم لغة مالطا",
    imagine: "امرأة تفتح كتابا مكتوبا عليه مالطية",
    correct: true
};

// ========== Exam 32: Nadine Wagner (مواضيع تركيا) (صحيح: 1,2,4,5,7,9) ==========
HELP_DATA["hoeren2_exam32_q2"] = {
    text: "Sie hatte vor der Weltreise einige Zweifel und Bedenken.",
    meaning: "كان لديها بعض الشكوك والمخاوف قبل رحلة العالم",
    keywords: ["vorher = قبل", "Zweifel = شكوك", "Bedenken = مخاوف", "Weltreise = رحلة عالم"],
    simplified: "نادين كانت مترددة قبل رحلتها الكبيرة",
    imagine: "امرأة تفكر حزينة أمام حقيبة سفر فارغة",
    correct: true
};

HELP_DATA["hoeren2_exam32_q3"] = {
    text: "Die Journalistin ist während ihrer Reise auch geflogen.",
    meaning: "الصحفية سافرت بالطائرة أيضا خلال رحلتها",
    keywords: ["Journalistin = صحفية", "während = خلال", "Reise = رحلة", "geflogen = سافرت بالطائرة"],
    simplified: "ركبت الطائرة في رحلتها حول العالم",
    imagine: "امرأة تطل من نافذة طائرة على الجبال",
    correct: true
};

HELP_DATA["hoeren2_exam32_q5"] = {
    text: "Ihre Freunde waren unterschiedlicher Meinung über ihr Vorhaben.",
    meaning: "أصدقاؤها كانوا مختلفين في الرأي حول خطتها",
    keywords: ["Freunde = أصدقاء", "unterschiedlicher Meinung = مختلفي الرأي", "Vorhaben = خطة"],
    simplified: "أصدقاء نادين اختلفوا على فكرة سفرها",
    imagine: "أصدقاء يتناقشون بشدة حول خريطة العالم",
    correct: true
};

HELP_DATA["hoeren2_exam32_q6"] = {
    text: "In Tadschikistan hat sie eine Zeit lang andere Motorradfahrer begleitet.",
    meaning: "في طاجيكستان رافقت راكبي دراجات نارية آخرين لفترة",
    keywords: ["Tadschikistan = طاجيكستان", "Motorradfahrer = راكبي دراجات", "begleitet = رافقت"],
    simplified: "رافقت فريق دراجات نارية في طاجيكستان",
    imagine: "امرأة على دراجة بجانب دراجات أخرى في جبل ثلجي",
    correct: true
};

HELP_DATA["hoeren2_exam32_q8"] = {
    text: "Nadine Wagner hat auf der Reise gelegentlich gearbeitet.",
    meaning: "نادين فاغنر عملت أحيانا خلال الرحلة",
    keywords: ["Reise = رحلة", "gelegentlich = أحيانا", "gearbeitet = عملت"],
    simplified: "نادين عملت أحيانا أثناء سفرها",
    imagine: "امرأة تكتب مقالا على حاسوبها المحمول على الشاطئ",
    correct: true
};

HELP_DATA["hoeren2_exam32_q10"] = {
    text: "Nach ihrer Rückkehr musste sie nicht lange nach einer neuen Arbeit suchen.",
    meaning: "بعد عودتها لم تضطر للبحث طويلا عن عمل جديد",
    keywords: ["Rückkehr = عودة", "lange = طويلا", "neuen Arbeit = عمل جديد", "suchen = بحث"],
    simplified: "وجدت نادين وظيفة بسرعة بعد عودتها",
    imagine: "امرأة تحصل على عقد عمل فور وصولها إلى المطار",
    correct: true
};

// ========== Exam 33: Mirjam Pressier (مواضيع تركيا) (صحيح: 0,1,4,6,9) ==========
HELP_DATA["hoeren2_exam33_q1"] = {
    text: "Mirjam Pressier freut sich, in Kürze die Doktorwürde der Universität Groningen zu erhalten.",
    meaning: "ميريام بريسييه سعيدة بنيلها الدكتوراه الفخرية من جامعة خرونينغن قريبا",
    keywords: ["freut sich = سعيدة", "Doktorwürde = دكتوراه فخرية", "Universität Groningen = جامعة خرونينغن"],
    simplified: "ميريام تنتظر بفارغ الصبر الدكتوراه من خرونينغن",
    imagine: "امرأة ترفع قبعة التخرج في الهواء",
    correct: true
};

HELP_DATA["hoeren2_exam33_q2"] = {
    text: "Sie arbeitet auch als Übersetzerin.",
    meaning: "هي تعمل أيضا كمترجمة",
    keywords: ["arbeitet = تعمل", "auch = أيضا", "Übersetzerin = مترجمة"],
    simplified: "ميريام تترجم الكتب أيضا",
    imagine: "امرأة تمسك قلما في يد وقاموسا في اليد الأخرى",
    correct: true
};

HELP_DATA["hoeren2_exam33_q5"] = {
    text: "Wenn sie an ihre Kindheit denkt, denkt sie an den Krieg.",
    meaning: "عندما تفكر في طفولتها تتذكر الحرب",
    keywords: ["Kindheit = طفولة", "denkt = تفكر", "Krieg = حرب"],
    simplified: "طفولة ميريام مرتبطة بذكريات الحرب",
    imagine: "امرأة تنظر لصورة قديمة وألسنة نار خلفها",
    correct: true
};

HELP_DATA["hoeren2_exam33_q7"] = {
    text: "Ihre Werke haben oft biographische Züge.",
    meaning: "أعمالها غالبا ما تحمل سمات سيرتها الذاتية",
    keywords: ["Werke = أعمال", "oft = غالبا", "biographische Züge = سمات سيرة ذاتية"],
    simplified: "كتب ميريام تحكي قصتها الشخصية كثيرا",
    imagine: "امرأة تكتب في دفتر وقلمها يرسم وجهها",
    correct: true
};

HELP_DATA["hoeren2_exam33_q10"] = {
    text: "Ihre Pflegemutter wollte nicht, dass sie Tagebuch schreibt.",
    meaning: "والدتها بالتبني لم تكن تريدها أن تكتب مذكراتها",
    keywords: ["Pflegemutter = والدة بالتبني", "wollte nicht = لم تكن تريد", "Tagebuch schreibt = تكتب مذكرات"],
    simplified: "أم ميريام بالتبني منعتها من كتابة يومياتها",
    imagine: "امرأة تخفي دفتر مذكراتها تحت الوسادة",
    correct: true
};

// ========== Exam 34: Mirjam Pressier - ليدعت (صحيح: 0,1,2,4,6,9) ==========
HELP_DATA["hoeren2_exam34_q1"] = {
    text: "Mirjam Pressler freut sich, in Kürze die Doktorwürde der Universität Groningen zu erhalten.",
    meaning: "ميريام بريسلر سعيدة بنيلها الدكتوراه الفخرية من جامعة خرونينغن قريبا",
    keywords: ["freut sich = سعيدة", "Doktorwürde = دكتوراه فخرية", "Universität Groningen = جامعة خرونينغن"],
    simplified: "ميريام تفرح بالدكتوراه من خرونينغن",
    imagine: "امرأة تلبس قبعة وبيدها شهادة دكتوراه",
    correct: true
};

HELP_DATA["hoeren2_exam34_q2"] = {
    text: "Sie arbeitet auch als Übersetzerin.",
    meaning: "هي تعمل أيضا كمترجمة",
    keywords: ["arbeitet = تعمل", "Übersetzerin = مترجمة"],
    simplified: "ميريام تترجم الكتب أيضا",
    imagine: "كومة من الكتب المترجمة أمام امرأة تبتسم",
    correct: true
};

HELP_DATA["hoeren2_exam34_q3"] = {
    text: "Sie hat über Anne Frank gearbeitet.",
    meaning: "لقد عملت على آن فرانك",
    keywords: ["über Anne Frank = على آن فرانك", "gearbeitet = عملت"],
    simplified: "ميريام بحثت وكتبت عن حياة آن فرانك",
    imagine: "امرأة تقف أمام صورة آن فرانك على الحائط",
    correct: true
};

HELP_DATA["hoeren2_exam34_q5"] = {
    text: "Wenn sie an ihre Kindheit denkt, denkt sie an den Krieg.",
    meaning: "عندما تفكر في طفولتها تتذكر الحرب",
    keywords: ["Kindheit = طفولة", "Krieg = حرب"],
    simplified: "طفولة ميريام كانت أيام حرب",
    imagine: "طفلة تختبئ تحت السرير وأصوات طائرات فوقها",
    correct: true
};

HELP_DATA["hoeren2_exam34_q7"] = {
    text: "Ihre Werke haben oft biografische Züge.",
    meaning: "أعمالها غالبا ما تحمل سمات سيرتها الذاتية",
    keywords: ["Werke = أعمال", "biografische Züge = سمات سيرة ذاتية"],
    simplified: "ميريام تكتب عن حياتها الشخصية في كتبها",
    imagine: "كتاب مفتوح وصورة الكاتبة بجانبه",
    correct: true
};

HELP_DATA["hoeren2_exam34_q10"] = {
    text: "Ihre Pflegemutter wollte nicht, dass sie Tagebuch schreibt.",
    meaning: "والدتها بالتبني لم تكن تريدها أن تكتب مذكراتها",
    keywords: ["Pflegemutter = والدة بالتبني", "Tagebuch schreibt = تكتب مذكرات"],
    simplified: "أمها بالتبني منعتها من كتابة اليوميات",
    imagine: "يد تنتزع دفتر مذكرات من طفلة",
    correct: true
};

// ========== Exam 35: Frau Pesina (مواضيع تركيا) (صحيح: 0,1,2,6,9) ==========
HELP_DATA["hoeren2_exam35_q1"] = {
    text: "Frau Pesina ist die Chefin des Kosmos Kinos.",
    meaning: "السيدة بيسينا هي مديرة سينما كوزموس",
    keywords: ["Chefin = مديرة", "Kosmos Kinos = سينما كوزموس"],
    simplified: "السيدة بيسينا تدير سينما كوزموس",
    imagine: "امرأة تقف وبيدها كلابير بورد أمام سينما",
    correct: true
};

HELP_DATA["hoeren2_exam35_q2"] = {
    text: "Von Hanau nach Frankfurt braucht man weniger als eine halbe Stunde.",
    meaning: "من هاناو إلى فرانكفورت تحتاج أقل من نصف ساعة",
    keywords: ["Hanau = هاناو", "Frankfurt = فرانكفورت", "weniger als eine halbe Stunde = أقل من نصف ساعة"],
    simplified: "السفر من هاناو لفرانكفورت لا يطول نصف ساعة",
    imagine: "ساعة توقف عند 25 دقيقة فقط",
    correct: true
};

HELP_DATA["hoeren2_exam35_q3"] = {
    text: "Die Gründung des Kinos vor 100 Jahren war eher ein Zufall.",
    meaning: "تأسيس السينما قبل 100 سنة كان صدفة إلى حد ما",
    keywords: ["Gründung = تأسيس", "Kinos = سينما", "vor 100 Jahren = قبل 100 سنة", "Zufall = صدفة"],
    simplified: "سينما كوزموس تأسست بالصدفة قبل قرن",
    imagine: "آلة تصوير سينمائي تقع من السماء فجأة",
    correct: true
};

HELP_DATA["hoeren2_exam35_q7"] = {
    text: "In dem Kino gibt es heute außer der Schwägerin und den beiden Schwestern auch noch weitere Mitarbeiter.",
    meaning: "في السينما اليوم بالإضافة إلى زوجة الأخ والأختين يوجد موظفون آخرون",
    keywords: ["Schwägerin = زوجة الأخ", "Schwestern = أختين", "weitere Mitarbeiter = موظفون آخرون"],
    simplified: "سينما كوزموس يعمل بها العائلة وغيرهم",
    imagine: "عائلة كبيرة من الموظفين أمام مبنى السينما",
    correct: true
};

HELP_DATA["hoeren2_exam35_q10"] = {
    text: "Manchmal gibt es in dem Kino ein spezielles Programm für Frau.",
    meaning: "أحيانا يوجد في السينما برنامج خاص للنساء",
    keywords: ["Manchmal = أحيانا", "spezielles Programm = برنامج خاص", "für Frau = للنساء"],
    simplified: "السينما تقدم عروضا خاصة للنساء أحيانا",
    imagine: "لافتة مكتوب عليها عرض خاص للسيدات فقط",
    correct: true
};

// ========== Exam 36: Herr Werner (مواضيع تركيا) (صحيح: 0,3,4,6,8,9) ==========
HELP_DATA["hoeren2_exam36_q1"] = {
    text: "Auf dem Gipfel der Zugspitze liegt ungefähr ein Meter Schnee.",
    meaning: "على قمة تسوغشبيتزه يوجد حوالي متر من الثلج",
    keywords: ["Gipfel = قمة", "Zugspitze = تسوغشبيتزه", "ungefähr ein Meter = حوالي متر", "Schnee = ثلج"],
    simplified: "قمة الجبل مغطاة بمتر من الثلج",
    imagine: "مسطرة طولها متر مغروسة في الثلج",
    correct: true
};

HELP_DATA["hoeren2_exam36_q4"] = {
    text: "In der kommenden Woche erwartet man für die Zugspitzregion freundliches Wetter.",
    meaning: "في الأسبوع القادم يتوقع طقسا لطيفا لمنطقة تسوغشبيتزه",
    keywords: ["kommenden Woche = أسبوع قادم", "Zugspitzregion = منطقة تسوغشبيتزه", "freundliches Wetter = طقس لطيف"],
    simplified: "طقس جيد ينتظر منطقة الجبل الأسبوع القادم",
    imagine: "شمس تشرق فوق جبل مغطى بالثلج",
    correct: true
};

HELP_DATA["hoeren2_exam36_q5"] = {
    text: "Am Sonntag wird ein Gottesdienst auf einer Bergstation abgehalten.",
    meaning: "يوم الأحد تقام خدمة دينية في محطة جبلية",
    keywords: ["Sonntag = أحد", "Gottesdienst = خدمة دينية", "Bergstation = محطة جبلية"],
    simplified: "قداس في أعلى الجبل يوم الأحد",
    imagine: "كنيسة صغيرة فوق قمة جبل ثلجية",
    correct: true
};

HELP_DATA["hoeren2_exam36_q7"] = {
    text: "Die Urlauber in Garmisch-Partenkirchen haben bei jedem Wetter genügend Möglichkeiten zur Freizeitgestaltung.",
    meaning: "السياح في غارميش-بارتنكيرشن لديهم إمكانيات كافية لقضاء وقت الفراغ في أي طقس",
    keywords: ["Urlauber = سياح", "Garmisch-Partenkirchen = غارميش-بارتنكيرشن", "jeden Wetter = كل طقس", "Freizeitgestaltung = قضاء وقت فراغ"],
    simplified: "السياح يستمتعون بغارميش-بارتنكيرشن أياما كان الطقس",
    imagine: "سائح يتزلج في الشمس وآخر يتسوق تحت المطر",
    correct: true
};

HELP_DATA["hoeren2_exam36_q9"] = {
    text: "Auch in früheren Jahren hat es im Juni und August geschnelt.",
    meaning: "حتى في السنوات الماضية تساقط الثلج في يونيو وأغسطس",
    keywords: ["früheren Jahren = سنوات ماضية", "Juni = يونيو", "August = أغسطس", "geschnelt = تساقط ثلج"],
    simplified: "الثلج سقط في الصيف قبل سنوات أيضا",
    imagine: "شجرة كريسماس على شاطئ بحيرة في أغسطس",
    correct: true
};

HELP_DATA["hoeren2_exam36_q10"] = {
    text: "Herr Werner ist mit seinem Arbeitsplatz zufrieden.",
    meaning: "السيد فيرنر راض عن مكان عمله",
    keywords: ["zufrieden = راض", "Arbeitsplatz = مكان عمل"],
    simplified: "هير فيرنر سعيد بعمله",
    imagine: "رجل يجلس على كرسي في مكتبه ويبتسم",
    correct: true
};

// ========== Exam 37: Wohnmobil (مواضيع تركيا) (سيضاف عند توفره) ==========

// ========== Exam 37: Wohnmobil (مواضيع تركيا) (صحيح: 0,5,6,7) ==========
HELP_DATA["hoeren2_exam37_q1"] = {
    text: "Der Hauptpreis des Gewinnspiels ist ein rund vierwöchiger Urlaub in Spanien.",
    meaning: "الجائزة الرئيسية للمسابقة هي عطلة حوالي أربعة أسابيع في إسبانيا",
    keywords: ["Hauptpreis = جائزة رئيسية", "Gewinnspiels = مسابقة", "vierwöchiger Urlaub = عطلة أربعة أسابيع", "Spanien = إسبانيا"],
    simplified: "جائزة المسابقة هي رحلة لأربعة أسابيع في إسبانيا",
    imagine: "بطاقة سفر مكتوب عليها أربعة أسابيع إلى إسبانيا",
    correct: true
};

HELP_DATA["hoeren2_exam37_q6"] = {
    text: "Reisende mit Wohnmobilen schätzen ihre Unabhängigkeit.",
    meaning: "المسافرون بالسيارات المنزلية يقدرون استقلاليتهم",
    keywords: ["Reisende = مسافرون", "Wohnmobilen = سيارات منزلية", "schätzen = يقدرون", "Unabhängigkeit = استقلالية"],
    simplified: "المسافرون بالبيوت المتنقلة يحبون الحرية",
    imagine: "عجلة قيادة ويد تتحكم بها إلى أي اتجاه",
    correct: true
};

HELP_DATA["hoeren2_exam37_q7"] = {
    text: "Auf Luxus muss man im Wohnwagen auch heute nicht verzichten.",
    meaning: "لا يجب التخلي عن الرفاهية في المقطورة السكنية حتى اليوم",
    keywords: ["Luxus = رفاهية", "Wohnwagen = مقطورة سكنية", "heute = اليوم", "verzichten = التخلي عن"],
    simplified: "العربات السكنية فيها رفاهية كثيرة حاليا",
    imagine: "تلفزيون بشاشة كبيرة داخل سيارة منزلية صغيرة",
    correct: true
};

HELP_DATA["hoeren2_exam37_q8"] = {
    text: "Wer den Urlaub mit dem Wohnmobil erst einmal ausprobieren will, sollte ein gebrauchtes Fahrzeug kaufen.",
    meaning: "من يريد تجربة العطلة بالسيارة المنزلية لأول مرة عليه شراء سيارة مستعملة",
    keywords: ["ausprobieren = تجربة", "Wohnmobil = سيارة منزلية", "gebrauchtes Fahrzeug = سيارة مستعملة", "kaufen = شراء"],
    simplified: "جرب السيارة المنزلية المستعملة أولا قبل الجديدة",
    imagine: "يد تفتح باب سيارة منزلية قديمة لأول مرة",
    correct: true
};


// ========== Exam 38: Straßenkinder - Die Kinder (Kids) (صحيح: 0,1,2,4,5,6,8) ==========
HELP_DATA["hoeren2_exam38_q1"] = {
    text: "Frau Edler arbeitete früher für die Verkehrsbetriebe Leipzig.",
    meaning: "السيدة إدلر عملت سابقا في شركة مواصلات لايبزيغ",
    keywords: ["arbeitete früher = عملت سابقا", "Verkehrsbetriebe Leipzig = شركة مواصلات لايبزيغ"],
    simplified: "السيدة إدلر كانت موظفة في مواصلات لايبزيغ",
    imagine: "امرأة ترتدي زي موظفة حافلات قديمة",
    correct: true
};

HELP_DATA["hoeren2_exam38_q2"] = {
    text: "Zum ersten Mal wurde sie in Frankfurt mit dem Problem der Straßenkinder konfrontiert.",
    meaning: "لأول مرة واجهت مشكلة أطفال الشوارع في فرانكفورت",
    keywords: ["ersten Mal = أول مرة", "Frankfurt = فرانكفورت", "Problem der Straßenkinder = مشكلة أطفال الشوارع"],
    simplified: "فرانكفورت أول مدينة رأت فيها مشكلة أطفال الشوارع",
    imagine: "امرأة تنظر بحزن لطفل نائم على رصيف الشارع",
    correct: true
};

HELP_DATA["hoeren2_exam38_q3"] = {
    text: "Zu Anfang kümmerte sie sich um obdachlose Erwachsene.",
    meaning: "في البداية كانت تهتم بالمشردين البالغين",
    keywords: ["Zu Anfang = في البداية", "kümmerte sich = تهتم", "obdachlose Erwachsene = مشردين بالغين"],
    simplified: "كانت تساعد البالغين الذين لا مأوى لهم أولا",
    imagine: "امرأة تقدم طعاما ساخنا لرجل بلا مأوى",
    correct: true
};

HELP_DATA["hoeren2_exam38_q5"] = {
    text: "Die Kinder (Kids) wollten, nach Meinung von Frau Edler, Zigaretten kaufen.",
    meaning: "الأطفال بحسب رأي السيدة إدلر أرادوا شراء السجائر",
    keywords: ["wollten = أرادوا", "Zigaretten kaufen = شراء سجائر", "nach Meinung = بحسب رأي"],
    simplified: "السيدة إدلر اعتقدت أن الأطفال يريدون السجائر",
    imagine: "طفل يمسك نقودا أمام آلة بيع السجائر",
    correct: true
};

HELP_DATA["hoeren2_exam38_q6"] = {
    text: "Sie hat mit den Kindern in leer stehenden Häusern übernachtet.",
    meaning: "نامت مع الأطفال في منازل مهجورة",
    keywords: ["leer stehenden Häusern = منازل مهجورة", "übernachtet = نامت"],
    simplified: "باتت مع الأطفال في بيوت خالية",
    imagine: "امرأة تنام مع أطفال على أرضية منزل مهجور",
    correct: true
};

HELP_DATA["hoeren2_exam38_q7"] = {
    text: "Die Kolleginnen hatten anfangs kein Verständnis für ihr Engagement.",
    meaning: "زميلاتها لم يكن لديهن تفهم لالتزامها في البداية",
    keywords: ["Kolleginnen = زميلات", "anfangs = في البداية", "kein Verständnis = لا تفهم", "Engagement = التزام"],
    simplified: "زميلات العمل لم يفهمن حماسها في البداية",
    imagine: "امرأة تتحدث وزميلاتها يهززن رؤوسهن",
    correct: true
};

HELP_DATA["hoeren2_exam38_q9"] = {
    text: "Sie sammelt noch heute bei den früheren Kollegen Geld für die Straßenkinder.",
    meaning: "لا تزال تجمع المال من زملائها السابقين لأطفال الشوارع",
    keywords: ["sammelt = تجمع", "früheren Kollegen = زملاء سابقين", "Geld = مال", "Straßenkinder = أطفال شوارع"],
    simplified: "لا تزال تجمع تبرعات من زملائها القدامى",
    imagine: "امرأة تحمل علبة تبرعات أمام مكتب قديم",
    correct: true
};

// ========== Exam 39: Familie - Eltern (مواضيع تركيا) (صحيح: 0,1,2,5,6,7,8,9) ==========
HELP_DATA["hoeren2_exam39_q1"] = {
    text: "Fast 11500 Kinder leben nicht bei ihren leiblichen Eltern.",
    meaning: "ما يقارب 11500 طفل لا يعيشون مع آبائهم البيولوجيين",
    keywords: ["Fast = ما يقارب", "leben nicht = لا يعيشون", "leiblichen Eltern = آباء بيولوجيين"],
    simplified: "حوالي 11500 طفل ليسوا مع أهلهم الحقيقيين",
    imagine: "أطفال كثيرون يقفون أمام صورة عائلة",
    correct: true
};

HELP_DATA["hoeren2_exam39_q2"] = {
    text: "Früher wurden Fälle von Gewalt in der Familie oft nicht bekannt.",
    meaning: "سابقا حالات العنف الأسري لم تكن معروفة غالبا",
    keywords: ["Früher = سابقا", "Gewalt in der Familie = عنف أسري", "nicht bekannt = غير معروفة"],
    simplified: "العنف العائلي كان يخفي كثيرا قديما",
    imagine: "باب مغلق ويد مرسومة خلفه تطلب النجدة",
    correct: true
};

HELP_DATA["hoeren2_exam39_q3"] = {
    text: "Kinder werden nicht sofort von ihren Familien getrennt.",
    meaning: "الأطفال لا يفصلون عن عائلاتهم فورا",
    keywords: ["Kinder = أطفال", "nicht sofort = ليس فورا", "von Familien getrennt = مفصولين عن عائلات"],
    simplified: "لا يتم إبعاد الأطفال عن أهلهم بسرعة",
    imagine: "يد تمسك بيد طفل بتردد كبير",
    correct: true
};

HELP_DATA["hoeren2_exam39_q6"] = {
    text: "In Skandinavien gibt es eine bessere Familienvorsorge.",
    meaning: "في اسكندنافيا هناك رعاية أسرية أفضل",
    keywords: ["Skandinavien = اسكندنافيا", "bessere = أفضل", "Familienvorsorge = رعاية أسرية"],
    simplified: "دول الشمال تهتم بالعائلات أكثر",
    imagine: "خريطة اسكندنافيا وعليها قلوب كثيرة",
    correct: true
};

HELP_DATA["hoeren2_exam39_q7"] = {
    text: "Früher lernte man Erziehung an Modellsituationen in der Großfamilie.",
    meaning: "سابقا تعلم الناس التربية من مواقف نموذجية في العائلة الكبيرة",
    keywords: ["Früher = سابقا", "Erziehung = تربية", "Modellsituationen = مواقف نموذجية", "Großfamilie = عائلة كبيرة"],
    simplified: "التربية كانت تتعلم من العائلة الكبيرة قديما",
    imagine: "أطفال يجلسون حول جدهم ويسمعون نصائحه",
    correct: true
};

HELP_DATA["hoeren2_exam39_q8"] = {
    text: "Der Kontakt zwischen Kindern und leiblichen Eltern wird möglichst erhalten.",
    meaning: "الاتصال بين الأطفال وآبائهم البيولوجيين يتم الحفاظ عليه قدر الإمكان",
    keywords: ["Kontakt = اتصال", "leiblichen Eltern = آباء بيولوجيين", "möglichst erhalten = الحفاظ قدر الإمكان"],
    simplified: "يحاولون إبقاء صلة الطفل بأهله الحقيقيين",
    imagine: "طفل يتحدث مع أمه عبر شاشة الكمبيوتر",
    correct: true
};

HELP_DATA["hoeren2_exam39_q9"] = {
    text: "Es gibt spezielle WGs für Jugendliche, die nicht bei ihren Eltern leben.",
    meaning: "هناك بيوت مشتركة خاصة للمراهقين الذين لا يعيشون مع أهلهم",
    keywords: ["spezielle WGs = بيوت مشتركة خاصة", "Jugendliche = مراهقين", "nicht bei ihren Eltern = لا يعيشون مع أهلهم"],
    simplified: "بيوت جماعية خاصة للشباب بدون أهل",
    imagine: "شباب يطبخون معا في مطبخ بيت مشترك",
    correct: true
};

HELP_DATA["hoeren2_exam39_q10"] = {
    text: "Herr Blaschitz bittet die Hörer um Unterstützung.",
    meaning: "السيد بلاشيتس يطلب من المستمعين الدعم",
    keywords: ["bittet = يطلب", "Hörer = مستمعين", "Unterstützung = دعم"],
    simplified: "بلاشيتس يناشد المستمعين المساعدة",
    imagine: "رجل يمسك ميكروفونا وعلبة تبرعات بيده",
    correct: true
};

// ========== Exam 40: Revolution Day (مواضيع تركيا) (صحيح: 0,1,4,5,7) ==========
HELP_DATA["hoeren2_exam40_q1"] = {
    text: "Am 24. April ist der Fashion Revolution Day.",
    meaning: "في 24 أبريل هو يوم ثورة الأزياء",
    keywords: ["24. April = 24 أبريل", "Fashion Revolution Day = يوم ثورة الأزياء"],
    simplified: "24 أبريل يوم للاحتجاج على صناعة الموضة",
    imagine: "تقويم بدائرة حمراء على يوم 24 أبريل",
    correct: true
};

HELP_DATA["hoeren2_exam40_q2"] = {
    text: "Der Anlass für den Fashion Revolution Day ist der Einsturz des Fabrikgebäudes in Bangladesch.",
    meaning: "سبب يوم ثورة الأزياء هو انهيار مبنى المصنع في بنغلاديش",
    keywords: ["Anlass = سبب", "Einsturz = انهيار", "Fabrikgebäudes = مبنى مصنع", "Bangladesch = بنغلاديش"],
    simplified: "انهيار مصنع في بنغلاديش أطلق هذه الحركة",
    imagine: "مبنى منهار وملابس متناثرة حوله",
    correct: true
};

HELP_DATA["hoeren2_exam40_q5"] = {
    text: "Eine Näherin verdient dort ca. 20 Cent.",
    meaning: "خياطة تكسب هناك حوالي 20 سنتا",
    keywords: ["Näherin = خياطة", "verdient = تكسب", "ca. 20 Cent = حوالي 20 سنتا"],
    simplified: "الخياطة تأخذ 20 سنتا فقط مقابل عملها",
    imagine: "امرأة تحمل ماكينة خياطة وعملة صغيرة جدا بيدها",
    correct: true
};

HELP_DATA["hoeren2_exam40_q6"] = {
    text: "The Clean Clothes Kampagne fordert bereits seit Jahren einen existenzsichernden Lohn.",
    meaning: "حملة الملابس النظيفة تطالب منذ سنوات بأجر يكفي للعيش",
    keywords: ["Clean Clothes Kampagne = حملة ملابس نظيفة", "seit Jahren = منذ سنوات", "existenzsichernden Lohn = أجر يكفي للعيش"],
    simplified: "حملة تطالب بأجر عادل للعمال منذ سنوات",
    imagine: "عامل يرفع لافتة مكتوب عليها أجر يعيش به",
    correct: true
};

HELP_DATA["hoeren2_exam40_q8"] = {
    text: "Eine andere Attraktion ist das Filmscreening des Films 'Traceable'.",
    meaning: "جاذبية أخرى هي عرض فيلم 'تريسيبول'",
    keywords: ["Attraktion = جاذبية", "Filmscreening = عرض فيلم", "Traceable = تريسيبول"],
    simplified: "فيلم 'تريسيبول' يعرض ضمن الفعاليات",
    imagine: "شاشة سينما كبيرة وعليها اسم الفيلم",
    correct: true
};

// ============================================
// Hören Teil 2 - Exams 41-49 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 41: Bicycle (مواضيع تركيا) (صحيح: 2,5,8) ==========
HELP_DATA["hoeren2_exam41_q3"] = {
    text: "Bicycle bietet Arbeitsplätze für junge Leute, die schon länger arbeitslos sind.",
    meaning: "بايسيكل يوفر فرص عمل للشباب العاطلين عن العمل لفترة طويلة",
    keywords: ["Bicycle = بايسيكل", "Arbeitsplätze = فرص عمل", "junge Leute = شباب", "länger arbeitslos = عاطلون لفترة طويلة"],
    simplified: "مشروع بايسيكل يوظف الشباب العاطلين",
    imagine: "شاب يصلح دراجة وهو يبتسم في ورشة عمل",
    correct: true
};

HELP_DATA["hoeren2_exam41_q6"] = {
    text: "Gert Kronheimer findet, dass das Fahrrad für junge Leute interessant ist.",
    meaning: "غيرت كرونهايمر يجد أن الدراجة مثيرة للاهتمام للشباب",
    keywords: ["Gert Kronheimer = غيرت كرونهايمر", "Fahrrad = دراجة", "junge Leute = شباب", "interessant = مثيرة للاهتمام"],
    simplified: "كرونهايمر يرى أن الدراجة تهم الشباب",
    imagine: "شاب يركب دراجة في مدينة مزدحمة ويضحك",
    correct: true
};

HELP_DATA["hoeren2_exam41_q9"] = {
    text: "Bei Bicycle werden im Jahr ungefähr 10000 Fahrräder repariert.",
    meaning: "في بايسيكل يتم إصلاح حوالي 10000 دراجة سنويا",
    keywords: ["Bicycle = بايسيكل", "10000 Fahrräder = 10000 دراجة", "repariert = يتم إصلاحها", "im Jahr = سنويا"],
    simplified: "بيسيكل تصليح عشرة آلاف دراجة كل سنة",
    imagine: "عدد كبير يصل 10000 دراجة مصفوفة في صف واحد",
    correct: true
};

// ========== Exam 42: Die Radiosendung (مواضيع تركيا) (صحيح: 1,3,4,7,8) ==========
HELP_DATA["hoeren2_exam42_q2"] = {
    text: "Eva Küpper läuft im Training wenigstens einmal pro Woche auch über die Marathondistanz.",
    meaning: "إيفا كوبير تجري في التدريب على الأقل مرة أسبوعيا مسافة ماراثون",
    keywords: ["Eva Küpper = إيفا كوبير", "Training = تدريب", "einmal pro Woche = مرة أسبوعيا", "Marathondistanz = مسافة ماراثون"],
    simplified: "إيفا تجري ماراثونا كاملا أسبوعيا في التمرين",
    imagine: "امرأة تجري على طريق طويل وساعة التوقيت معها",
    correct: true
};

HELP_DATA["hoeren2_exam42_q4"] = {
    text: "Nach der Ausbildung hat Eva Küpper ihren Lebensstil radikal verändert.",
    meaning: "بعد التدريب غيرت إيفا كوبير أسلوب حياتها بشكل جذري",
    keywords: ["Nach der Ausbildung = بعد التدريب", "Lebensstil = أسلوب حياة", "radikal verändert = غيرت بشكل جذري"],
    simplified: "إيفا قلبتي حياتها رأسا على عقب بعد التخرج",
    imagine: "امرأة ترمي ملابس العمل وتلبس ملابس رياضية",
    correct: true
};

HELP_DATA["hoeren2_exam42_q5"] = {
    text: "Eva Küpper kommt ursprünglich aus München.",
    meaning: "إيفا كوبير أصلها من ميونخ",
    keywords: ["Eva Küpper = إيفا كوبير", "ursprünglich = أصلها", "München = ميونخ"],
    simplified: "إيفا من ميونخ في الأصل",
    imagine: "خريطة ألمانيا وصورتها فوق مدينة ميونخ",
    correct: true
};

HELP_DATA["hoeren2_exam42_q8"] = {
    text: "Die spezielle Uhr ist für Eva Küpper nicht nur im Training, sondern auch im Wettkampf wichtig.",
    meaning: "الساعة الخاصة مهمة لإيفا كوبير ليس فقط في التدريب بل أيضا في المسابقة",
    keywords: ["spezielle Uhr = ساعة خاصة", "Training = تدريب", "Wettkampf = مسابقة", "wichtig = مهمة"],
    simplified: "ساعة إيفا مهمة في التمرين وفي السباق معا",
    imagine: "امرأة تنظر إلى ساعتها وهي تجري في سباق",
    correct: true
};

HELP_DATA["hoeren2_exam42_q9"] = {
    text: "Solange der Körper gesund ist, will Eva Küpper weiterhin Ultramarathons laufen.",
    meaning: "طالما الجسد سليم تريد إيفا كوبير الاستمرار في الجري لمسافات فوق الماراثون",
    keywords: ["Körper gesund = جسد سليم", "Ultramarathons = مسافات فوق ماراثون", "weiterhin laufen = الاستمرار في الجري"],
    simplified: "إيفا ستظل تجري فوق الماراثون ما دامت بصحة جيدة",
    imagine: "امرأة تجري وقلب سليم يضخ بقوة في صدرها",
    correct: true
};

// ========== Exam 43: psychische (مواضيع تركيا) (صحيح: 2,3,4,6,7) ==========
HELP_DATA["hoeren2_exam43_q3"] = {
    text: "Auch Arbeitslosigkeit ist ein Risikofaktor für psychische Probleme.",
    meaning: "البطالة أيضا عامل خطر للمشاكل النفسية",
    keywords: ["Arbeitslosigkeit = بطالة", "Risikofaktor = عامل خطر", "psychische Probleme = مشاكل نفسية"],
    simplified: "البطالة تزيد خطر الأمراض النفسية",
    imagine: "رجل جالس على كنبته وحزين وينظر للسقف",
    correct: true
};

HELP_DATA["hoeren2_exam43_q4"] = {
    text: "Schlechte Stimmung am Arbeitsplatz ist die Hauptursache für psychische Erkrankungen.",
    meaning: "المزاج السيء في مكان العمل هو السبب الرئيسي للأمراض النفسية",
    keywords: ["schlechte Stimmung = مزاج سيء", "Arbeitsplatz = مكان عمل", "Hauptursache = سبب رئيسي", "psychische Erkrankungen = أمراض نفسية"],
    simplified: "الجو السيء في العمل يسبب أمراضا نفسية",
    imagine: "موظف يجلس ورأسه بين يديه على مكتبه",
    correct: true
};

HELP_DATA["hoeren2_exam43_q5"] = {
    text: "Menschen, die zu wenig zu tun haben, versuchen, das nicht zu zeigen.",
    meaning: "الناس الذين لديهم عمل قليل يحاولون إخفاء ذلك",
    keywords: ["zu wenig zu tun = عمل قليل", "versuchen = يحاولون", "nicht zu zeigen = لا يظهرون"],
    simplified: "الموظفون الذين لا يشتغلون يخفون ذلك",
    imagine: "موظف يقلب أوراقا بلا فائدة ومراقبه ينظر إليه",
    correct: true
};

HELP_DATA["hoeren2_exam43_q7"] = {
    text: "Internet und Smartphone können einen Einfluss auf die Psyche haben.",
    meaning: "الإنترنت والهواتف الذكية يمكن أن تؤثر على النفسية",
    keywords: ["Internet = إنترنت", "Smartphone = هاتف ذكي", "Einfluss = تأثير", "Psyche = نفسية"],
    simplified: "الإنترنت والجوال يؤثران على صحتك النفسية",
    imagine: "شاب يمسك هاتفه وعقله يتأرجح كالبندول",
    correct: true
};

HELP_DATA["hoeren2_exam43_q8"] = {
    text: "Wem seine Arbeit Spaß macht, der kann eher mehr leisten.",
    meaning: "من يستمتع بعمله يمكنه أن ينتج أكثر",
    keywords: ["Arbeit Spaß macht = عمل ممتع", "kann eher mehr leisten = يمكنه إنتاج أكثر"],
    simplified: "الموظف السعيد بعمله ينتج أكثر",
    imagine: "موظف يبتسم ويصنع أشياء كثيرة بسرعة",
    correct: true
};

// ========== Exam 44: Herr Kemper (مواضيع تركيا) (صحيح: 0,2,5,6,8,9) ==========
HELP_DATA["hoeren2_exam44_q1"] = {
    text: "Herr Kemper arbeitet aus Dankbarkeit für die Hilfe, die er früher bekommen hat, ehrenamtlich.",
    meaning: "السيد كيمبر يعمل تطوعا من باب الامتنان للمساعدة التي تلقاها سابقا",
    keywords: ["Dankbarkeit = امتنان", "Hilfe = مساعدة", "früher bekommen = تلقاها سابقا", "ehrenamtlich = تطوعا"],
    simplified: "كيمبر يتطوع شكرا لمن ساعدوه قديما",
    imagine: "رجل يقدم هدية لامرأة عجوز كرد جميل",
    correct: true
};

HELP_DATA["hoeren2_exam44_q3"] = {
    text: "Herr Kemper hat zuerst handwerkliche Arbeiten im Tierheim gemacht.",
    meaning: "السيد كيمبر قام أولا بأعمال يدوية في ملجأ الحيوانات",
    keywords: ["zuerst = أولا", "handwerkliche Arbeiten = أعمال يدوية", "Tierheim = ملجأ حيوانات"],
    simplified: "كيمبر بدأ تطوعه بإصلاح أشياء في ملجأ الحيوانات",
    imagine: "رجل يصلح سياجا خشبيا وكلب يلعق يده",
    correct: true
};

HELP_DATA["hoeren2_exam44_q6"] = {
    text: "Greta hat angefangen, ehrenamtlich zu arbeiten, weil sie zu Hause Langeweile hatte.",
    meaning: "غريتا بدأت العمل التطوعي لأنها كانت تشعر بالملل في المنزل",
    keywords: ["Greta = غريتا", "ehrenamtlich = تطوعي", "Langeweile = ملل", "zu Hause = في المنزل"],
    simplified: "الملل دفع غريتا للتطوع في ملجأ الحيوانات",
    imagine: "امرأة تتثاءب ثم تقفز فرحة للخروج من المنزل",
    correct: true
};

HELP_DATA["hoeren2_exam44_q7"] = {
    text: "Herr Kemper hat einer jungen Frau geholfen, ihren beruflichen Weg zu finden.",
    meaning: "السيد كيمبر ساعد شابة في إيجاد طريقها المهني",
    keywords: ["jungen Frau = شابة", "geholfen = ساعد", "beruflichen Weg = طريق مهني", "zu finden = لإيجاد"],
    simplified: "كيمبر ساعد فتاة في اختيار مهنتها",
    imagine: "رجل جالس مع فتاة وخريطة مهنية بينهما",
    correct: true
};

HELP_DATA["hoeren2_exam44_q9"] = {
    text: "Herr Kemper hat auch Verständnis für Menschen, die sich nicht ehrenamtlich engagieren.",
    meaning: "السيد كيمبر لديه تفهم أيضا للأشخاص الذين لا يتطوعون",
    keywords: ["Verständnis = تفهم", "Menschen = أشخاص", "nicht ehrenamtlich engagieren = لا يتطوعون"],
    simplified: "كيمبر يتفهم الناس الذين لا يريدون التطوع",
    imagine: "رجل يبتلع كبرياءه ويصافح شخصا غير متطوع",
    correct: true
};

HELP_DATA["hoeren2_exam44_q10"] = {
    text: "Herr Kemper wohnt in einem Haus, in dem Tierhaltung verboten ist.",
    meaning: "السيد كيمبر يسكن في منزل يُمنع فيه تربية الحيوانات",
    keywords: ["wohnt = يسكن", "Haus = منزل", "Tierhaltung = تربية حيوانات", "verboten = ممنوع"],
    simplified: "منزل كيمبر لا يسمح بتربية الحيوانات",
    imagine: "رجل يقرأ لافتة ممنوع الحيوانات أمام منزله بحسرة",
    correct: true
};

// ========== Exam 45: Frau Hahn (مواضيع تركيا) (صحيح: 1,3,5,7,9) ==========
HELP_DATA["hoeren2_exam45_q2"] = {
    text: "Frau Hahn hat ihren Beruf im Kaufhaus Brück gelernt.",
    meaning: "السيدة هان تعلمت مهنتها في متجر بروك التجاري",
    keywords: ["Frau Hahn = سيدة هان", "Beruf = مهنة", "Kaufhaus Brück = متجر بروك", "gelernt = تعلمت"],
    simplified: "هان تلقت تدريبها المهني في متجر بروك",
    imagine: "امرأة ترتدي مئزر تدريب وتقف أمام مدخل متجر كبير",
    correct: true
};

HELP_DATA["hoeren2_exam45_q4"] = {
    text: "Frau Hahn fand es wichtig, nette Kollegen zu haben.",
    meaning: "السيدة هان وجدت أنه من المهم وجود زملاء لطفاء",
    keywords: ["Frau Hahn = سيدة هان", "wichtig = مهم", "nette Kollegen = زملاء لطفاء", "zu haben = وجود"],
    simplified: "هان كانت تقدر وجود زملاء لطفاء في العمل",
    imagine: "امرأة تصافح زملائها وكلهم يبتسمون",
    correct: true
};

HELP_DATA["hoeren2_exam45_q6"] = {
    text: "Der Mann von Frau Hahn hat als Schuhverkäufer arbeitete.",
    meaning: "زوج السيدة هان عمل كبائع أحذية",
    keywords: ["Mann = زوج", "Frau Hahn = سيدة هان", "Schuhverkäufer = بائع أحذية", "arbeitete = عمل"],
    simplified: "زوج هان كان يبيع الأحذية",
    imagine: "رجل يحذاء حذاءا لزبونة وتنظر إليه بسرور",
    correct: true
};

HELP_DATA["hoeren2_exam45_q8"] = {
    text: "Frau Hahn findet es wichtig, in einem schönen Haus zu arbeiten.",
    meaning: "السيدة هان تجد أنه من المهم العمل في مبنى جميل",
    keywords: ["Frau Hahn = سيدة هان", "wichtig = مهم", "schönen Haus = مبنى جميل", "zu arbeiten = العمل في"],
    simplified: "هان تفضل العمل في مكان جميل",
    imagine: "امرأة تشير إلى مبنى أنيق وتقول جميل",
    correct: true
};

HELP_DATA["hoeren2_exam45_q10"] = {
    text: "Frau Hahn will nicht in einem anderen Kaufhaus arbeiten.",
    meaning: "السيدة هان لا تريد العمل في متجر آخر",
    keywords: ["Frau Hahn = سيدة هان", "nicht = لا", "anderen Kaufhaus = متجر آخر", "arbeiten = العمل"],
    simplified: "هان ترفض العمل في أي متجر غير متجرها القديم",
    imagine: "امرأة تشيح بوجهها أمام مبنى متجر جديد",
    correct: true
};

// ========== Exam 46: Wohnmobilen (مواضيع تركيا) (صحيح: 2,5,7) ==========
HELP_DATA["hoeren2_exam46_q3"] = {
    text: "Der Hauptpreis des Gewinnspiels ist ein vierwöchiger Urlaub in Spanien.",
    meaning: "الجائزة الرئيسية للمسابقة هي عطلة أربعة أسابيع في إسبانيا",
    keywords: ["Hauptpreis = جائزة رئيسية", "Gewinnspiels = مسابقة", "vierwöchiger Urlaub = عطلة أربعة أسابيع", "Spanien = إسبانيا"],
    simplified: "الجائزة الكبرى رحلة شهر كامل إلى إسبانيا",
    imagine: "بطاقة سفر مكتوب عليها أربعة أسابيع في إسبانيا",
    correct: true
};

HELP_DATA["hoeren2_exam46_q6"] = {
    text: "Reisende mit Wohnmobilen schätzen ihre Unabhängigkeit.",
    meaning: "المسافرون بالسيارات المنزلية يقدرون استقلاليتهم",
    keywords: ["Reisende = مسافرون", "Wohnmobilen = سيارات منزلية", "schätzen = يقدرون", "Unabhängigkeit = استقلالية"],
    simplified: "المسافرون بالبيوت المتنقلة يقدرون حريتهم",
    imagine: "سيارة منزلية تقف في مكان جميل بجانب البحر",
    correct: true
};

HELP_DATA["hoeren2_exam46_q8"] = {
    text: "Wer den Urlaub mit dem Wohnmobil erst einmal ausprobieren will, sollte ein gebrauchtes Fahrzeug kaufen.",
    meaning: "من يريد تجربة العطلة بالسيارة المنزلية لأول مرة عليه شراء سيارة مستعملة",
    keywords: ["ausprobieren = تجربة", "Wohnmobil = سيارة منزلية", "gebrauchtes Fahrzeug = سيارة مستعملة", "kaufen = شراء"],
    simplified: "جرب السيارة المنزلية المستعملة أولا قبل الجديدة",
    imagine: "يد تفتح باب سيارة منزلية قديمة لأول مرة",
    correct: true
};

// ========== Exam 47: Bibliothek (مواضيع تركيا) (صحيح: 1,2,4,8) ==========
HELP_DATA["hoeren2_exam47_q2"] = {
    text: "Die meisten Besucher/innen der Stadtbibliothek wollen Medien ausleihen.",
    meaning: "معظم زوار مكتبة المدينة يريدون استعارة وسائط",
    keywords: ["meisten Besucher = معظم الزوار", "Stadtbibliothek = مكتبة مدينة", "Medien ausleihen = استعارة وسائط", "wollen = يريدون"],
    simplified: "زوار المكتبة غالبا يستعيرون كتبا أو أقراصا",
    imagine: "طابور طويل أمام شبكة الاستعارة في المكتبة",
    correct: true
};

HELP_DATA["hoeren2_exam47_q3"] = {
    text: "Viele halten sich gern in den attraktiven Räumen der Bibliothek auf.",
    meaning: "كثيرون يحبون البقاء في غرف المكتبة الجذابة",
    keywords: ["Viele = كثيرون", "attraktiven Räumen = غرف جذابة", "Bibliothek = مكتبة", "halten sich auf = يحبون البقاء"],
    simplified: "الناس يحبون الجلوس في أقسام المكتبة الجميلة",
    imagine: "زوار يجلسون على كراسي مريحة ويقرأون في هدوء",
    correct: true
};

HELP_DATA["hoeren2_exam47_q5"] = {
    text: "Die vielfältigen Angebote der Bibliothek sind gratis nutzbar.",
    meaning: "عروض المكتبة المتنوعة يمكن استخدامها مجانا",
    keywords: ["vielfältigen Angebote = عروض متنوعة", "Bibliothek = مكتبة", "gratis nutzbar = يمكن استخدامها مجانا"],
    simplified: "خدمات المكتبة المجانية كثيرة ومتنوعة",
    imagine: "لافتة كبيرة مكتوب عليها الدخول مجاني",
    correct: true
};

HELP_DATA["hoeren2_exam47_q9"] = {
    text: "Es gibt einen Raum, in dem man mit anderen zusammen moderne technische Werkzeuge ausprobieren kann.",
    meaning: "يوجد غرفة يمكن للمرء فيها مع آخرين تجربة أدوات تقنية حديثة",
    keywords: ["Raum = غرفة", "moderne technische Werkzeuge = أدوات تقنية حديثة", "ausprobieren = تجربة", "mit anderen = مع آخرين"],
    simplified: "المكتبة توفر غرفة لتجربة الأجهزة التقنية الحديثة",
    imagine: "شباب يجربون طابعة ثلاثية الأبعاد في غرفة المكتبة",
    correct: true
};

// ========== Exam 48: Eisschwimmen (مواضيع تركيا) (صحيح: 2,4,5,8,9) ==========
HELP_DATA["hoeren2_exam48_q3"] = {
    text: "Die Ärzte sind sich einig, dass Eisschwimmen die Gesundheit fördert.",
    meaning: "الأطباء متفقون أن السباحة في الثلج تعزز الصحة",
    keywords: ["Ärzte = أطباء", "einig = متفقون", "Eisschwimmen = سباحة في ثلج", "Gesundheit fördert = تعزز الصحة"],
    simplified: "الأطباء متفقون على فوائد السباحة في الماء المثلج",
    imagine: "طبيب يبتسم لرجل يسبح في بحيرة مثلجة",
    correct: true
};

HELP_DATA["hoeren2_exam48_q5"] = {
    text: "Für den Einstieg in den Eisschwimmsport ist der Winterbeginn der beste Zeitpunkt.",
    meaning: "لبدء رياضة السباحة في الثلج فإن بداية الشتاء هو أفضل وقت",
    keywords: ["Einstieg = بدء", "Eisschwimmsport = رياضة سباحة في ثلج", "Winterbeginn = بداية شتاء", "beste Zeitpunkt = أفضل وقت"],
    simplified: "بداية الشتاء أنسب وقت لبدء السباحة في الثلج",
    imagine: "تقويم ودائرة حمراء على أول أيام الشتاء",
    correct: true
};

HELP_DATA["hoeren2_exam48_q6"] = {
    text: "Elias Wunderlich hält sich strikt an seine eigenen Empfehlungen.",
    meaning: "إلياس فوندرليش يلتزم بتوصياته الخاصة",
    keywords: ["Elias Wunderlich = إلياس فوندرليش", "hält sich strikt = يلتزم بدقة", "eigenen Empfehlungen = توصياته الخاصة"],
    simplified: "إلياس يطبق نصائحه التي يقدمها للآخرين",
    imagine: "رجل يسبح في ثلج ونفس الرجل يشرح القواعد",
    correct: true
};

HELP_DATA["hoeren2_exam48_q9"] = {
    text: "Elias Wunderlich nimmt an Wettbewerben teil, um zu siegen.",
    meaning: "إلياس فوندرليش يشارك في المسابقات ليفوز",
    keywords: ["Wettbewerben = مسابقات", "nimmt teil = يشارك", "zu siegen = ليفوز"],
    simplified: "إلياس يدخل المسابقات بهدف الفوز فقط",
    imagine: "رجل يرفع كأس البطولة والماء يتجمد حوله",
    correct: true
};

HELP_DATA["hoeren2_exam48_q10"] = {
    text: "Laut Elias Wunderlich kann Eisschwimmen zur Abhängigkeit führen.",
    meaning: "حسب إلياس فوندرليش السباحة في الثلج يمكن أن تؤدي إلى الإدمان",
    keywords: ["Eisschwimmen = سباحة في ثلج", "Abhängigkeit = إدمان", "führen = تؤدي"],
    simplified: "إلياس يحذر من إدمان السباحة في الثلج",
    imagine: "شخص يسبح في ثلج وهو يقول لا أستطيع التوقف",
    correct: true
};

// ========== Exam 49: Die Ausbildung (مواضيع تركيا) (صحيح: 0,1,3,5,7,9) ==========
HELP_DATA["hoeren2_exam49_q1"] = {
    text: "Viele befürchten, dass es durch das neue Gesetz zu weiteren Mittelkürzungen kommt.",
    meaning: "كثيرون يخشون أن يؤدي القانون الجديد لمزيد من تخفيضات الميزانية",
    keywords: ["neuen Gesetz = قانون جديد", "weiteren Mittelkürzungen = تخفيضات ميزانية إضافية", "befürchten = يخشون"],
    simplified: "الناس خائفة من تخفيضات جديدة بسبب القانون الجديد",
    imagine: "شخص ينظر إلى منشار يقطع ميزانية التعليم",
    correct: true
};

HELP_DATA["hoeren2_exam49_q2"] = {
    text: "In Zukunft werden weniger Erzieherinnen gebraucht als heute.",
    meaning: "في المستقبل سيحتاج مربيات أقل من اليوم",
    keywords: ["Zukunft = مستقبل", "weniger Erzieherinnen = مربيات أقل", "gebraucht = يحتاج", "heute = اليوم"],
    simplified: "سيقل الطلب على المربيات مستقبلا",
    imagine: "أطفال أقل في روضة وصورة مربية حزينة",
    correct: true
};

HELP_DATA["hoeren2_exam49_q4"] = {
    text: "Der Besuch von Kindergärten soll kostenlos werden.",
    meaning: "من المفترض أن يصبح دخول رياض الأطفال مجانيا",
    keywords: ["Besuch = دخول", "Kindergärten = رياض أطفال", "kostenlos = مجانيا", "soll werden = من المفترض أن يصبح"],
    simplified: "رياض الأطفال ستصبح مجانية",
    imagine: "لافتة كبيرة على باب روضة مكتوب دخول مجاني",
    correct: true
};

HELP_DATA["hoeren2_exam49_q6"] = {
    text: "Bei Bedarf setzt die Sprachförderung im vierten Lebensjahr ein.",
    meaning: "عند الحاجة يبدأ تعزيز اللغة في السنة الرابعة من العمر",
    keywords: ["Bedarf = حاجة", "Sprachförderung = تعزيز لغة", "vierten Lebensjahr = سنة رابعة من العمر", "setzt ein = يبدأ"],
    simplified: "تعليم اللغة يبدأ بالعام الرابع عند الحاجة",
    imagine: "طفل يبلغ الرابعة يمسك كتابا عليه علامة نجمه",
    correct: true
};

HELP_DATA["hoeren2_exam49_q8"] = {
    text: "Im Elternhaus wird die Sprachförderung der Kinder immer häufiger vernachlässigt.",
    meaning: "في بيت الوالدين يتم إهمال تعزيز اللغة لدى الأطفال بشكل متزايد",
    keywords: ["Elternhaus = بيت والدين", "Sprachförderung = تعزيز لغة", "vernachlässigt = مهملة", "immer häufiger = بشكل متزايد"],
    simplified: "الأهل يهملون تعليم أطفالهم اللغة أكثر من قبل",
    imagine: "طفل يجلس وحيدا وأبواه ينظران إلى هواتفهما",
    correct: true
};

HELP_DATA["hoeren2_exam49_q10"] = {
    text: "Die Ausbildung der Erzieherinnen soll künftig an Hochschulen angesiedelt sein.",
    meaning: "يجب أن يكون تدريب المربيات مستقبلا في الجامعات",
    keywords: ["Ausbildung = تدريب", "Erzieherinnen = مربيات", "künftig = مستقبلا", "Hochschulen = جامعات", "angesiedelt sein = يكون في"],
    simplified: "مستقبل تدريب المربيات سيكون في الجامعات",
    imagine: "امرأة ترتدي قبعة التخرج أمام مبنى الجامعة",
    correct: true
};


// ============================================
// Hören Teil 3
// ============================================

// ============================================
// Hören Teil 3 - Exams 1-10 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 1: Telefon (صحيح: 0) ==========
HELP_DATA["hoeren3_exam1_q1"] = {
    text: "Bei der Deutschen Telefon KG bekommen Sie nur Auskunft zu Telefonapparaten dieses Unternehmens.",
    meaning: "في شركة دويتشه تيليفون كي جي تحصلون فقط على معلومات حول أجهزة الهاتف لهذه الشركة",
    keywords: ["Deutschen Telefon KG = شركة دويتشه تيليفون", "nur Auskunft = معلومات فقط", "Telefonapparaten = أجهزة هاتف", "dieses Unternehmens = هذه الشركة"],
    simplified: "الشركة تقدم معلومات عن هواتفها فقط",
    imagine: "موظف يرد على الهاتف ويقول لا نعرف غير هواتفنا",
    correct: true
};

// ========== Exam 2: Musikfestivals (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam2_q1"] = {
    text: "Während des Musikfestivals 'Sound of Frankfurt' gibt es verbilligte Fahrkarten für alle öffentlichen Verkehrsmittel.",
    meaning: "خلال مهرجان 'صوت فرانكفورت' الموسيقي توجد تذاكر مخفضة لجميع وسائل النقل العام",
    keywords: ["Musikfestivals = مهرجان موسيقي", "Sound of Frankfurt = صوت فرانكفورت", "verbilligte Fahrkarten = تذاكر مخفضة", "öffentlichen Verkehrsmittel = وسائل نقل عام"],
    simplified: "تذاكر المواصلات تصير أرخص أيام المهرجان",
    imagine: "تذكرة حافلة مكتوب عليها خصم والموسيقى تعزف خلفها",
    correct: true
};

HELP_DATA["hoeren3_exam2_q3"] = {
    text: "Am Wochenende können Sie sich in Naumburg über die Bekämpfung von Krankheiten bei Apfelbäumen informieren.",
    meaning: "في نهاية الأسبوع يمكنكم في ناومبورغ الاستعلام عن مكافحة أمراض أشجار التفاح",
    keywords: ["Wochenende = نهاية أسبوع", "Naumburg = ناومبورغ", "Bekämpfung = مكافحة", "Krankheiten = أمراض", "Apfelbäumen = أشجار تفاح"],
    simplified: "تعلم كيف تحمي أشجار التفاح من الأمراض في ناومبورغ",
    imagine: "تفاحة عليها بقع ورجل يحمل بخاخة بجانب شجرة",
    correct: true
};

// ========== Exam 3: Musikfestivals (Mittel) (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam3_q1"] = {
    text: "Geschäftsreisende werden gebeten, Mietwagen unter der Nummer 3223 zu buchen.",
    meaning: "رجال الأعمال المسافرون يطلب منهم حجز سيارات مستأجرة على الرقم 3223",
    keywords: ["Geschäftsreisende = رجال أعمال مسافرون", "Mietwagen = سيارات مستأجرة", "Nummer 3223 = رقم 3223", "zu buchen = للحجز"],
    simplified: "احجز سيارتك المستأجرة على رقم 3223",
    imagine: "رجل يحمل حقيبة سفر ويتصل على رقم 3223",
    correct: true
};

HELP_DATA["hoeren3_exam3_q3"] = {
    text: "Am Wochenende können Sie sich in Naumburg über die Bekämpfung von Krankheiten bei Apfelbäumen informieren.",
    meaning: "في نهاية الأسبوع يمكنكم في ناومبورغ الاستعلام عن مكافحة أمراض أشجار التفاح",
    keywords: ["Wochenende = نهاية أسبوع", "Naumburg = ناومبورغ", "Bekämpfung = مكافحة", "Krankheiten = أمراض", "Apfelbäumen = أشجار تفاح"],
    simplified: "تعلم حماية التفاح من الأمراض في ناومبورغ",
    imagine: "تفاحة حمراء وورقة صفراء بجانبها ماتت",
    correct: true
};

// ========== Exam 4: Fahrschule (صحيح: 0,3) ==========
HELP_DATA["hoeren3_exam4_q1"] = {
    text: "Bei der Fahrschule kann man sich über das Internet anmelden.",
    meaning: "يمكن التسجيل في مدرسة تعليم السياقة عبر الإنترنت",
    keywords: ["Fahrschule = مدرسة سياقة", "über das Internet = عبر الإنترنت", "anmelden = التسجيل"],
    simplified: "سجل في مدرسة السياقة أونلاين",
    imagine: "شاب يضغط على زر التسجيل بجهازه ويدور عجلة القيادة",
    correct: true
};

HELP_DATA["hoeren3_exam4_q4"] = {
    text: "Bei dem Flug nach Mallorca ändert sich die Abflugzeit.",
    meaning: "في الرحلة إلى مايوركا يتغير وقت الإقلاع",
    keywords: ["Flug = رحلة", "Mallorca = مايوركا", "ändert sich = يتغير", "Abflugzeit = وقت إقلاع"],
    simplified: "موعد طائرة مايوركا تغير وليس كما كان",
    imagine: "شاشة عرض الرحلات وعليها خط أحمر على الوقت القديم",
    correct: true
};

// ========== Exam 5: Im Süden Deutschlands regnen (صحيح: 0,3) ==========
HELP_DATA["hoeren3_exam5_q1"] = {
    text: "Im Süden Deutschlands wird es nachmittags regnen.",
    meaning: "في جنوب ألمانيا ستمطر بعد الظهر",
    keywords: ["Süden Deutschlands = جنوب ألمانيا", "nachmittags = بعد الظهر", "regnen = تمطر"],
    simplified: "المطر غادي ينزل فجنوب ألمانيا عشية",
    imagine: "سحب سوداء فوق جبال الألب ومظلات تفتح",
    correct: true
};

HELP_DATA["hoeren3_exam5_q4"] = {
    text: "Wenn Sie über Ihre Autoversicherung sprechen wollen, müssen Sie die 1 wählen.",
    meaning: "إذا أردتم التحدث عن تأمين سيارتكم فعليكم الضغط على الرقم 1",
    keywords: ["Autoversicherung = تأمين سيارة", "sprechen = التحدث", "müssen Sie = عليكم", "die 1 wählen = الضغط على 1"],
    simplified: "اضغط رقم واحد للحديث عن تأمين السيارة",
    imagine: "هاتف وأصبع يضغط على زر رقم واحد عليه صورة سيارة",
    correct: true
};

// ========== Exam 6: Im Süden Deutschlands Schnee (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam6_q1"] = {
    text: "Morgen muss man im Süden Deutschlands mit Schnee rechnen.",
    meaning: "غدا يجب توقع تساقط الثلوج في جنوب ألمانيا",
    keywords: ["Morgen = غدا", "Süden Deutschlands = جنوب ألمانيا", "Schnee = ثلج", "rechnen = توقع"],
    simplified: "الثلج نازل غدا في جنوب ألمانيا",
    imagine: "رجل ينظر من نافذته إلى ثلوج تتساقط على سيارته",
    correct: true
};

HELP_DATA["hoeren3_exam6_q5"] = {
    text: "Die historische elektrische Eisenbahn wird im Dezember wie gewohnt fahren.",
    meaning: "السكة الحديدية الكهربائية التاريخية ستعمل كالمعتاد في ديسمبر",
    keywords: ["historische = تاريخية", "elektrische Eisenbahn = سكة حديد كهربائية", "Dezember = ديسمبر", "wie gewohnt = كالمعتاد", "fahren = تعمل"],
    simplified: "القطار الكهربائي القديم شغال في ديسمبر عادي",
    imagine: "قطار قديم يخرج دخانا وهو يسير على القضبان في الثلج",
    correct: true
};

// ========== Exam 7: Internet prüfen (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam7_q1"] = {
    text: "Sie können im Internet prüfen, ob Ihre aktuelle Bestellung schon unterwegs ist.",
    meaning: "يمكنكم تفقد ما إذا كان طلبكم الحالي قد شحن عبر الإنترنت",
    keywords: ["Internet = إنترنت", "prüfen = تفقد", "Bestellung = طلب", "unterwegs = شحن/في الطريق"],
    simplified: "افحص على الأنترنت واش الطلبية ديالك خرجات ولا لا",
    imagine: "شخص ينظر إلى حاسوب وخريطة تظهر شاحنة تتحرك نحو بيته",
    correct: true
};

HELP_DATA["hoeren3_exam7_q5"] = {
    text: "Wer ein wichtiges Anliegen hat, soll eine andere Nummer wählen.",
    meaning: "من لديه أمر مهم يجب عليه الاتصال برقم آخر",
    keywords: ["wichtiges Anliegen = أمر مهم", "andere Nummer = رقم آخر", "wählen = الاتصال"],
    simplified: "الأمور المهمة تتصل على رقم ثاني",
    imagine: "يد تمد يدها لتضغط على رقمين مختلفين على الهاتف",
    correct: true
};

// ========== Exam 8: Ehrenamts (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam8_q1"] = {
    text: "Man kann am 'Tag des Ehrenamts' probeweise mithelfen.",
    meaning: "يمكن للمرء المساعدة بشكل تجريبي في 'يوم التطوع'",
    keywords: ["Tag des Ehrenamts = يوم التطوع", "probeweise = بشكل تجريبي", "mithelfen = المساعدة"],
    simplified: "يوم التطوع تقدر تساعد وتجرب بلا التزام",
    imagine: "شخص يضع يديه في سلة تبرعات ويبتسم بتجربة",
    correct: true
};

HELP_DATA["hoeren3_exam8_q5"] = {
    text: "Wenn man das Training ausprobieren möchte, muss man vorher Bescheid sagen.",
    meaning: "إذا أراد المرء تجربة التمرين عليه إخبارهم مسبقًا",
    keywords: ["Training = تمرين", "ausprobieren = تجربة", "vorher = مسبقا", "Bescheid sagen = إخبار"],
    simplified: "إدا بغيت تجرب التمرين علمهم قبل",
    imagine: "رجل يتصل هاتفيا وهو يرتدي ملابس رياضية",
    correct: true
};

// ========== Exam 9: Ehrenamts (Mittel) (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam9_q1"] = {
    text: "Man kann am 'Tag des Ehrenamts' probeweise mithelfen.",
    meaning: "يمكن المساعدة بشكل تجريبي في 'يوم التطوع'",
    keywords: ["Tag des Ehrenamts = يوم التطوع", "probeweise = تجريبيا", "mithelfen = مساعدة"],
    simplified: "يوم التطوع فرصة لتجربة التطوع",
    imagine: "يد تطوع ترفع قلما لتوقع اسم المتطوع الجديد",
    correct: true
};

HELP_DATA["hoeren3_exam9_q5"] = {
    text: "Wenn man das Training ausprobieren möchte, sollte man vorher Bescheid sagen.",
    meaning: "إذا أراد المرء تجربة التمرين فعليه إخبارهم مسبقًا",
    keywords: ["Training = تمرين", "ausprobieren = تجربة", "vorher = مسبقا", "Bescheid sagen = إخبار"],
    simplified: "جرب التمرين بعد ما تخبرهم",
    imagine: "مدرب يكتب اسم المتدرب الجديد في قائمة الحضور",
    correct: true
};

// ========== Exam 10: Demonstration (صحيح: 1,4) ==========
HELP_DATA["hoeren3_exam10_q2"] = {
    text: "In der kommenden Saison wird eine Symphonie von Mahler aufgeführt.",
    meaning: "في الموسم القادم ستعزف سيمفونية لمالر",
    keywords: ["kommenden Saison = موسم قادم", "Symphonie = سيمفونية", "Mahler = مالر", "aufgeführt = تعزف"],
    simplified: "سيمفونية مالر غادي يتعزفها الموسم الجاي",
    imagine: "أوركسترا تعزف وشخص اسمه مالر على ملصق خلفهم",
    correct: true
};

HELP_DATA["hoeren3_exam10_q5"] = {
    text: "Für die Vermittlung einer Mitfahrgelegenheit per E-Mail erhebt 'fahre mit' keine Gebühren.",
    meaning: "خدمة 'فار مي' لا تفرض رسوما للتوسط في مشاركة الركوب عبر البريد الإلكتروني",
    keywords: ["Vermittlung = توسط", "Mitfahrgelegenheit = مشاركة ركوب", "per E-Mail = عبر بريد", "keine Gebühren = لا رسوم"],
    simplified: "موقع فاهر ميت ما ياخدش فلوس على التنسيق بالإيميل",
    imagine: "بريد إلكتروني مكتوب عليه لا للدفع وشخص يضحك",
    correct: true
};


// ============================================
// Hören Teil 3 - Exams 11-20 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 11: Wochenanfang (صحيح: 0,1,2) ==========
HELP_DATA["hoeren3_exam11_q1"] = {
    text: "Am Wochenanfang soll man einen Aufenthalt im Freien vermeiden.",
    meaning: "في بداية الأسبوع يجب تجنب البقاء في الهواء الطلق",
    keywords: ["Wochenanfang = بداية أسبوع", "Aufenthalt im Freien = بقاء في الهواء الطلق", "vermeiden = تجنب"],
    simplified: "لا تجلس برا في بداية الأسبوع",
    imagine: "شخص يجلس تحت مظلة والشمس تحترق",
    correct: true
};

HELP_DATA["hoeren3_exam11_q2"] = {
    text: "Abends ist das Risiko, einen Wildunfall zu haben, am größten.",
    meaning: "مساءً خطر حادث مع حيوانات برية يكون في أعلى مستوياته",
    keywords: ["Abends = مساءً", "Risiko = خطر", "Wildunfall = حادث مع حيوانات برية", "größten = أعلى"],
    simplified: "خطر صدام مع حيوان يزيد فالليل",
    imagine: "غزال يقفز أمام سيارة في الظلام",
    correct: true
};

HELP_DATA["hoeren3_exam11_q3"] = {
    text: "Man kann bei dem Fest an verschiedenen Orten Musik hören.",
    meaning: "يمكن الاستماع إلى الموسيقى في المهرجان في أماكن مختلفة",
    keywords: ["Fest = مهرجان", "verschiedenen Orten = أماكن مختلفة", "Musik hören = استماع للموسيقى"],
    simplified: "المهرجان فيه موسيقى فبلايص كثيرة",
    imagine: "ثلاث مسارح وكل واحد يعزف أغنية مختلفة",
    correct: true
};

// ========== Exam 12: Im August (صحيح: 2,3) ==========
HELP_DATA["hoeren3_exam12_q3"] = {
    text: "In weniger dringlichen Fällen soll man eine Nachricht hinterlassen.",
    meaning: "في الحالات الأقل إلحاحا يجب ترك رسالة",
    keywords: ["weniger dringlichen Fällen = حالات أقل إلحاحا", "Nachricht hinterlassen = ترك رسالة"],
    simplified: "الأمور غير المستعجلة اترك رسالة",
    imagine: "يد تترك ورقة صفراء على مكتب مغلق",
    correct: true
};

HELP_DATA["hoeren3_exam12_q4"] = {
    text: "Am Mittwoch und Donnerstag können Sie Sachspenden vorbeibringen.",
    meaning: "يوم الأربعاء والخميس يمكنكم إحضار تبرعات عينية",
    keywords: ["Mittwoch = أربعاء", "Donnerstag = خميس", "Sachspenden = تبرعات عينية", "vorbeibringen = إحضار"],
    simplified: "تبرعاتك المواد تجيبها يوم الأربعاء أو الخميس",
    imagine: "صندوق كبير مكتوب عليه تبرعات ويد تضع بداخلة كتابا",
    correct: true
};

// ========== Exam 13: Fundbüro (صحيح: 0,1,4) ==========
HELP_DATA["hoeren3_exam13_q1"] = {
    text: "Sie müssen nicht persönlich beim Fundbüro nachfragen.",
    meaning: "ليس عليكم السؤال شخصيا في مكتب المفقودات",
    keywords: ["nicht persönlich = ليس شخصيا", "Fundbüro = مكتب مفقودات", "nachfragen = السؤال"],
    simplified: "ما تحتاش تروح بنفسك لمكتب الضايعات",
    imagine: "شخص يتصل هاتفيا بدل الذهاب إلى مكتب الضايعات",
    correct: true
};

HELP_DATA["hoeren3_exam13_q2"] = {
    text: "Die Wettervorhersage können Sie nach den Mittagsnachrichten hören.",
    meaning: "توقعات الطقس يمكنكم سماعها بعد نشرة الظهيرة",
    keywords: ["Wettervorhersage = توقعات طقس", "Mittagsnachrichten = نشرة ظهيرة", "nach = بعد", "hören = سماع"],
    simplified: "حال الطقس يجي بعد أخبار الظهر",
    imagine: "راديو يقول أخبار ثم مذيع الطقس يظهر",
    correct: true
};

HELP_DATA["hoeren3_exam13_q5"] = {
    text: "Während der Sperrung kann man die üblichen Bushaltestellen benutzen.",
    meaning: "أثناء الإغلاق يمكن استخدام محطات الحافلات المعتادة",
    keywords: ["Sperrung = إغلاق", "üblichen Bushaltestellen = محطات حافلات معتادة", "benutzen = استخدام"],
    simplified: "محطات الباص العادية شغالة حتى في وقت القفل",
    imagine: "لافتة إغلاق ومحطة باص بجانبها لا تزال تعمل",
    correct: true
};

// ========== Exam 14: Ausgang 26 (صحيح: 0,3,4) ==========
HELP_DATA["hoeren3_exam14_q1"] = {
    text: "Sie sollen zum Ausgang 26 kommen.",
    meaning: "يجب عليكم القدوم إلى المخرج 26",
    keywords: ["Ausgang 26 = مخرج 26", "kommen = القدوم"],
    simplified: "تعال إلى المخرج ستة وعشرين",
    imagine: "لافتة كبيرة مكتوب عليها مخرج 26 وسهم يشير",
    correct: true
};

HELP_DATA["hoeren3_exam14_q4"] = {
    text: "Sie können sich am Sonntag um ein Uhr bewerben.",
    meaning: "يمكنكم التقديم يوم الأحد الساعة الواحدة",
    keywords: ["Sonntag = أحد", "um ein Uhr = الساعة الواحدة", "bewerben = التقديم"],
    simplified: "قدم طلبك يوم الأحد على الساعة واحد",
    imagine: "ساعة تشير إلى الواحدة ويوم أحد على التقويم",
    correct: true
};

HELP_DATA["hoeren3_exam14_q5"] = {
    text: "In der Bäckerstraße dürfen Sie nicht fahren.",
    meaning: "لا يسمح لكم بالقيادة في شارع باكر",
    keywords: ["Bäckerstraße = شارع باكر", "dürfen nicht = لا يسمح", "fahren = القيادة"],
    simplified: "شارع الخبازين ممنوع تدخل بالسيارة",
    imagine: "لافتة حمراء مكتوب عليها ممنوع الدخول عند مدخل الشارع",
    correct: true
};

// ========== Exam 15: Ausgang 26 (Mittel) (صحيح: 0,1,4) ==========
HELP_DATA["hoeren3_exam15_q1"] = {
    text: "In der Bäckerstraße dürfen Sie nicht fahren.",
    meaning: "لا يسمح لكم بالقيادة في شارع باكر",
    keywords: ["Bäckerstraße = شارع باكر", "dürfen nicht = لا يسمح", "fahren = القيادة"],
    simplified: "شارع الخبازين ممنوع المرور بالسيارة",
    imagine: "سيارة تقف أمام لافتة ممنوع وتتراجع للخلف",
    correct: true
};

HELP_DATA["hoeren3_exam15_q2"] = {
    text: "Sie können sich am Sonntag um ein Uhr bewerben.",
    meaning: "يمكنكم التقديم يوم الأحد الساعة الواحدة",
    keywords: ["Sonntag = أحد", "um ein Uhr = الساعة الواحدة", "bewerben = التقديم"],
    simplified: "التقديم يوم الأحد على الساعة واحد",
    imagine: "يد تضع ملف طلب على مكتب الساعة الواحدة ظهرا",
    correct: true
};

HELP_DATA["hoeren3_exam15_q5"] = {
    text: "Sie sollen zum Ausgang 26 kommen.",
    meaning: "يجب عليكم القدوم إلى المخرج 26",
    keywords: ["Ausgang 26 = مخرج 26", "kommen = القدوم"],
    simplified: "اجيني للمخرج ستة وعشرين",
    imagine: "رجل واقف تحت لافتة مخرج 26 وينتظر صديقه",
    correct: true
};

// ========== Exam 16: Blutspenden (صحيح: 0,2,3,4) ==========
HELP_DATA["hoeren3_exam16_q1"] = {
    text: "Ihre Tochter kann am Freitag verschiedene Sportarten testen.",
    meaning: "ابنتكم يمكنها يوم الجمعة تجربة رياضات مختلفة",
    keywords: ["Tochter = ابنة", "Freitag = جمعة", "verschiedene Sportarten = رياضات مختلفة", "testen = تجربة"],
    simplified: "بنتك تجرب رياضات متنوعة يوم الجمعة",
    imagine: "طفلة ترتدي حذاء كرة ثم تلبس نظارات سباحة",
    correct: true
};

HELP_DATA["hoeren3_exam16_q3"] = {
    text: "Heute müssen Sie auf den Bus ausweichen.",
    meaning: "اليوم يجب عليكم التحول إلى الحافلة",
    keywords: ["heute = اليوم", "Bus = حافلة", "ausweichen = التحول إلى"],
    simplified: "اليوم تستعمل الباص بدل القطار",
    imagine: "شخص يركب الحافلة وقطار يمر بجانبه دون توقف",
    correct: true
};

HELP_DATA["hoeren3_exam16_q4"] = {
    text: "Sie müssen das Bad früher verlassen.",
    meaning: "يجب عليكم مغادرة حمام السباحة مبكرا",
    keywords: ["Bad = حمام سباحة", "früher = مبكرا", "verlassen = مغادرة"],
    simplified: "اخرج من المسبح قبل الوقت المعتاد",
    imagine: "ساعة على الحائط وكل الناس تخرج من الماء",
    correct: true
};

HELP_DATA["hoeren3_exam16_q5"] = {
    text: "Für einen Termin müssen Sie anrufen.",
    meaning: "لتحديد موعد يجب عليكم الاتصال",
    keywords: ["Termin = موعد", "anrufen = الاتصال"],
    simplified: "حجز الموعد يكون بالمكالمة الهاتفية",
    imagine: "شخص يمسك هاتفه ويحجز موعدا",
    correct: true
};

// ========== Exam 17: Reitturnier (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam17_q1"] = {
    text: "Besucher des Reitturniers sollten möglichst Parkplätze außerhalb des Turniergeländes nutzen.",
    meaning: "زوار مسابقة الفروسية يستحسن استخدام مواقف السيارات خارج أرض المسابقة قدر الإمكان",
    keywords: ["Besucher = زوار", "Reitturniers = مسابقة فروسية", "Parkplätze = مواقف سيارات", "außerhalb = خارج", "Turniergeländes = أرض مسابقة"],
    simplified: "أوقف سيارتك برا المسابقة وامش شوية",
    imagine: "سيارة واقفة بعيدا وخيل يمر بجانبها",
    correct: true
};

HELP_DATA["hoeren3_exam17_q3"] = {
    text: "Bei der Berliner Museumsnacht können Sie mit einer Sonderbuslinie bequem erreichen.",
    meaning: "في ليلة متاحف برلين يمكنكم الوصول بسهولة عبر خط حافلة خاص",
    keywords: ["Berliner Museumsnacht = ليلة متاحف برلين", "Sonderbuslinie = خط حافلة خاص", "bequem erreichen = الوصول بسهولة"],
    simplified: "باص خاص يوصلنا ليلة المتاحف ببرلين",
    imagine: "حافلة مكتوب عليها متاحف وأضواء مضاءة حولها",
    correct: true
};

// ========== Exam 18: Delikatessen (صحيح: 1,2,3) ==========
HELP_DATA["hoeren3_exam18_q2"] = {
    text: "Bis zum Start können Sie mit Ihrem Handy telefonieren.",
    meaning: "يمكنكم التحدث بهاتفكم النقال حتى موعد البدء",
    keywords: ["Start = بدء", "Handy = هاتف نقال", "telefonieren = التحدث"],
    simplified: "اتصل بهاتفك لين تبدأ الفعالية",
    imagine: "شاب يتصل بصديقه وساعة تشير إلى موعد البدء",
    correct: true
};

HELP_DATA["hoeren3_exam18_q3"] = {
    text: "Vorführungen mit Tieren werden nicht geboten.",
    meaning: "عروض مع حيوانات لن تقدم",
    keywords: ["Vorführungen = عروض", "Tieren = حيوانات", "nicht geboten = لن تقدم"],
    simplified: "ما كاينش عروض مع الحيوانات هاد المرة",
    imagine: "قفص فارغ وحيوان نائم خلف الكواليس",
    correct: true
};

HELP_DATA["hoeren3_exam18_q4"] = {
    text: "Am Wochenende können Sie Musik im Schloss Mirabell hören.",
    meaning: "في نهاية الأسبوع يمكنكم سماع الموسيقى في قصر ميرابيل",
    keywords: ["Wochenende = نهاية أسبوع", "Musik = موسيقى", "Schloss Mirabell = قصر ميرابيل", "hören = سماع"],
    simplified: "موسيقى في قصر ميرابيل آخر الأسبوع",
    imagine: "قصر كبير وأوركسترا تعزف في حديقته",
    correct: true
};

// ========== Exam 19: Für ein Konzert (Bus gratis) (صحيح: 1,3) ==========
HELP_DATA["hoeren3_exam19_q2"] = {
    text: "Man kann mit dem Bus gratis zum Fest fahren.",
    meaning: "يمكن الذهاب إلى المهرجان بالحافلة مجانا",
    keywords: ["Bus = حافلة", "gratis = مجانا", "Fest = مهرجان", "fahren = الذهاب"],
    simplified: "الباص مجاني للمهرجان",
    imagine: "حافلة مكتوب عليها مجاني وكل الناس تركب بفرح",
    correct: true
};

HELP_DATA["hoeren3_exam19_q4"] = {
    text: "Das Busunternehmen Schneider kündigt neue Fernbusverbindungen an.",
    meaning: "شركة حافلات شنايدر تعلن عن خطوط حافلات بعيدة جديدة",
    keywords: ["Busunternehmen Schneider = شركة حافلات شنايدر", "kündigt an = تعلن", "neue Fernbusverbindungen = خطوط حافلات بعيدة جديدة"],
    simplified: "شركة شنايدر تفتح خطوط باص جديدة للمسافات الطويلة",
    imagine: "خريطة وخطوط جديدة مرسومة عليها بألوان زاهية",
    correct: true
};

// ========== Exam 20: Für ein Konzert (in der ganzen Stadt) (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam20_q1"] = {
    text: "Für ein Konzert morgen Abend kann man noch im Internet Karten kaufen.",
    meaning: "لحفل غدا مساء لا يزال بإمكانكم شراء تذاكر عبر الإنترنت",
    keywords: ["Konzert = حفل", "morgen Abend = غدا مساء", "Internet = إنترنت", "Karten kaufen = شراء تذاكر"],
    simplified: "تذاكر حفل الغد لسة موجودة على الأنترنت",
    imagine: "شخص يضغط زر شراء تذكرة وبتاع الحفلة يفرح",
    correct: true
};

HELP_DATA["hoeren3_exam20_q3"] = {
    text: "Bei dem Filmfestival werden internationale Kinderfilme gezeigt.",
    meaning: "في مهرجان الأفلام ستعرض أفلام دولية للأطفال",
    keywords: ["Filmfestival = مهرجان أفلام", "internationale Kinderfilme = أفلام أطفال دولية", "gezeigt = تعرض"],
    simplified: "أفلام أطفال من العالم كله في المهرجان",
    imagine: "أطفال يجلسون أمام شاشة وعلم كل بلد يظهر خلفها",
    correct: true
};


// ============================================
// Hören Teil 3 - Exams 21-27 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 21: In Raum C23 (صحيح: 1) ==========
HELP_DATA["hoeren3_exam21_q2"] = {
    text: "Wenn Ihre Software nicht funktioniert, erhalten Sie über das Internet Unterstützung.",
    meaning: "إذا لم يعمل برنامجكم تحصلون على دعم عبر الإنترنت",
    keywords: ["Software = برنامج", "nicht funktioniert = لا يعمل", "Internet = إنترنت", "Unterstützung = دعم"],
    simplified: "مشكلة البرنامج تحلها عبر النت",
    imagine: "شاشة زرقاء وشخص يكتب يطلب المساعدة أونلاين",
    correct: true
};

// ========== Exam 22: Trainingsausfahrten (صحيح: 1,3) ==========
HELP_DATA["hoeren3_exam22_q2"] = {
    text: "Auf dem Blumenmarkt in Groningen kann man auch Gartenzubehör kaufen.",
    meaning: "في سوق الزهور في خرونينغن يمكن شراء مستلزمات الحديقة أيضا",
    keywords: ["Blumenmarkt = سوق زهور", "Groningen = خرونينغن", "Gartenzubehör = مستلزمات حديقة", "kaufen = شراء"],
    simplified: "سوق الزهور يبيع أيضا أدوات البستنة",
    imagine: "بائع زهور وبجانبه مجرفة زرع صغيرة",
    correct: true
};

HELP_DATA["hoeren3_exam22_q4"] = {
    text: "Ein Markt wird Ende Juli für Kinder bis 16 Jahre in Stuttgart veranstaltet, wo sie ihre alten Bücher und Spielzeuge verkaufen können.",
    meaning: "سوق يقام نهاية يوليو للأطفال حتى 16 سنة في شتوتغارت حيث يمكنهم بيع كتبهم وألعابهم القديمة",
    keywords: ["Ende Juli = نهاية يوليو", "Kinder bis 16 Jahre = أطفال حتى 16 سنة", "Stuttgart = شتوتغارت", "alte Bücher und Spielzeuge = كتب وألعاب قديمة", "verkaufen = بيع"],
    simplified: "سوق بشتوتغارت للأطفال يبيعون أغراضهم القديمة",
    imagine: "طفل يبيع لعبة قديمة وآخر يشتريها منه مبتسما",
    correct: true
};

// ========== Exam 23: Das Geschäft (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam23_q1"] = {
    text: "Das Geschäft für österreichische Spezialitäten befindet sich in Check-in 2.",
    meaning: "متجر المنتجات النمساوية الخاصة يقع في منطقة تسجيل الوصول 2",
    keywords: ["österreichische Spezialitäten = منتجات نمساوية خاصة", "Check-in 2 = منطقة تسجيل وصول 2", "befindet sich = يقع"],
    simplified: "المتجر النمساوي في صالة الدخول رقم 2",
    imagine: "لافتة مكتوب عليها نمسا وصالة رقم اثنين",
    correct: true
};

HELP_DATA["hoeren3_exam23_q5"] = {
    text: "Der Bürgermeister eröffnet das Fest.",
    meaning: "رئيس البلدية يفتتح المهرجان",
    keywords: ["Bürgermeister = رئيس بلدية", "eröffnet = يفتتح", "Fest = مهرجان"],
    simplified: "رئيس المدينة يفتتح الاحتفال",
    imagine: "رجل يرتدي سلسلة ذهبية ويقطع شريطا أحمر",
    correct: true
};

// ========== Exam 24: Nach einer Großdemonstration (صحيح: 1) ==========
HELP_DATA["hoeren3_exam24_q2"] = {
    text: "Wer bei der Wanderung keinen Rucksack mitnehmen will, kann unterwegs etwas zu essen und zu trinken bekommen.",
    meaning: "من لا يريد حمل حقيبة ظهر في التنزه يمكنه الحصول على طعام وشراب في الطريق",
    keywords: ["Wanderung = تنزه", "keinen Rucksack = لا حقيبة ظهر", "essen und trinken = أكل وشرب", "unterwegs = في الطريق"],
    simplified: "المشي بدون حقيبة وأكل وشرب في الطريق",
    imagine: "رجل يمشي بيدين خاليتين ويأخذ ماء من كشك",
    correct: true
};

// ========== Exam 25: Das Fest (ohne Frankfurt) (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam25_q1"] = {
    text: "Heute kann man vormittags das Fest besuchen.",
    meaning: "يمكن زيارة المهرجان اليوم صباحا",
    keywords: ["heute = اليوم", "vormittags = صباحا", "Fest = مهرجان", "besuchen = زيارة"],
    simplified: "المهرجان مفتوح اليوم في الصباح",
    imagine: "شمس مشرقة وأعلام ترفرف في مدخل المهرجان",
    correct: true
};

HELP_DATA["hoeren3_exam25_q3"] = {
    text: "Jugendliche Eintrittskarten kosten 13,50 €.",
    meaning: "تذاكر دخول الشباب ثمنها 13.50 يورو",
    keywords: ["Jugendliche = شباب", "Eintrittskarten = تذاكر دخول", "kosten = ثمنها", "13,50 € = 13.50 يورو"],
    simplified: "تذكرة الشباب بثلاثة عشر ونصف يورو",
    imagine: "شاب يمسك تذكرة مكتوب عليها 13.50 ويبتسم",
    correct: true
};

// ========== Exam 26: Das Fest (mit Frankfurt) (صحيح: 0,2,4) ==========
HELP_DATA["hoeren3_exam26_q1"] = {
    text: "Heute kann man vormittags das Fest besuchen.",
    meaning: "يمكن زيارة المهرجان اليوم صباحا",
    keywords: ["heute = اليوم", "vormittags = صباحا", "Fest = مهرجان", "besuchen = زيارة"],
    simplified: "المهرجان يزور صباح اليوم",
    imagine: "عائلة تدخل بوابة المهرجان والشمس طالعة",
    correct: true
};

HELP_DATA["hoeren3_exam26_q3"] = {
    text: "Eintrittskarten für Jugendliche kosten 13,50 €.",
    meaning: "تذاكر الدخول للشباب ثمنها 13.50 يورو",
    keywords: ["Eintrittskarten = تذاكر دخول", "Jugendliche = شباب", "kosten = ثمنها", "13,50 € = 13.50 يورو"],
    simplified: "سعر تذكرة الشاب ثلاثة عشر يورو ونصف",
    imagine: "فاتورة عليها 13.50 وشاب يدفع بفرح",
    correct: true
};

HELP_DATA["hoeren3_exam26_q5"] = {
    text: "Am Sonntag können Kinder ein Theaterstück anschauen.",
    meaning: "يوم الأحد يمكن للأطفال مشاهدة مسرحية",
    keywords: ["Sonntag = أحد", "Kinder = أطفال", "Theaterstück = مسرحية", "anschauen = مشاهدة"],
    simplified: "الأحد مسرحية للأطفال في المهرجان",
    imagine: "أطفال يجلسون على الأرض ودمية تتحرك أمامهم",
    correct: true
};

// ========== Exam 27: Radio Konzert (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam27_q1"] = {
    text: "Beim Klassik-Radio kann man Karten für ein Konzert in Frankfurt gewinnen.",
    meaning: "في إذاعة الموسيقى الكلاسيكية يمكن ربح تذاكر لحفل في فرانكفورت",
    keywords: ["Klassik-Radio = إذاعة كلاسيكية", "Karten gewinnen = ربح تذاكر", "Konzert = حفل", "Frankfurt = فرانكفورت"],
    simplified: "راديو الكلاسيك يعطيك تذاكر حفل بفرانكفورت",
    imagine: "راديو قديم ويلاحظ تذكرة تخرج منه إلى فرانكفورت",
    correct: true
};

HELP_DATA["hoeren3_exam27_q3"] = {
    text: "Der Radiosender Bayern 1 informiert auf seiner Website über das Sommernachtsfest.",
    meaning: "محطة بايرن 1 الإذاعية تقدم معلومات عن مهرجان ليلة الصيف على موقعها",
    keywords: ["Radiosender Bayern 1 = محطة بايرن 1", "Website = موقع", "informiert = تقدم معلومات", "Sommernachtsfest = مهرجان ليلة صيف"],
    simplified: "موقع بايرن 1 يخبرك بمهرجان ليلة الصيف",
    imagine: "شاشة حاسوب وعليها صورة نجوم وألعاب نارية",
    correct: true
};



// ========== Exam 28: Wanderung (مواضيع تركيا) (صحيح: 1) ==========
HELP_DATA["hoeren3_exam28_q2"] = {
    text: "Wer bei der Wanderung keinen Rucksack mitnehmen will, kann unterwegs etwas zu essen und zu trinken bekommen.",
    meaning: "من لا يريد حمل حقيبة ظهر في التنزه يمكنه الحصول على طعام وشراب في الطريق",
    keywords: ["Wanderung = تنزه", "keinen Rucksack = لا حقيبة ظهر", "essen und trinken = أكل وشرب", "unterwegs = في الطريق"],
    simplified: "تمشى بدون حقيبة وأكل بالطريق",
    imagine: "رجل يمشي خفيف ويأكل سندويش من كشك",
    correct: true
};

// ========== Exam 29: Bayern Radio (مواضيع تركيا) (صحيح: 0,3,4) ==========
HELP_DATA["hoeren3_exam29_q1"] = {
    text: "Beim Informationsdienst der Telekom können Sie sich auch über Aktienkurse informieren.",
    meaning: "في خدمة معلومات تليكوم يمكنكم الاستعلام عن أسعار الأسهم أيضا",
    keywords: ["Informationsdienst = خدمة معلومات", "Telekom = تليكوم", "Aktienkurse = أسعار أسهم", "informieren = استعلام"],
    simplified: "خدمة تليكوم تعطيك أسعار الأسهم",
    imagine: "شاشة هاتف وعليها أرقام خضراء وحمراء",
    correct: true
};

HELP_DATA["hoeren3_exam29_q4"] = {
    text: "Am Freitag müssen Sie in den Mittelgebirgen mit vielen Pollen rechnen.",
    meaning: "يوم الجمعة يجب توقع حبوب لقاح كثيرة في الجبال الوسطى",
    keywords: ["Freitag = جمعة", "Mittelgebirgen = جبال وسطى", "vielen Pollen = حبوب لقاح كثيرة", "rechnen = توقع"],
    simplified: "الجمعة حبوب اللقاح كثيرة بالجبال",
    imagine: "زهرة تتطاير منها غبار أصفر في الهواء",
    correct: true
};

HELP_DATA["hoeren3_exam29_q5"] = {
    text: "Bayern Radio hat computergestützte Fahrschulprogramme getestet.",
    meaning: "راديو بايرن اختبر برامج محاكاة لتعليم السياقة بالكمبيوتر",
    keywords: ["Bayern Radio = راديو بايرن", "computergestützte = بالكمبيوتر", "Fahrschulprogramme = برامج تعليم سياقة", "getestet = اختبر"],
    simplified: "راديو بايرن جرب برامج سياقة على الكمبيوتر",
    imagine: "شخص يقود سيارة أمام شاشة كمبيوتر",
    correct: true
};

// ========== Exam 30: Die Gruppe Die Prinzen (مواضيع تركيا) (صحيح: 0,3) ==========
HELP_DATA["hoeren3_exam30_q1"] = {
    text: "Die Gruppe 'Die Prinzen' tritt am 23. Juni in Kiel auf.",
    meaning: "فرقة 'دي برينتسن' تقدم حفلا يوم 23 يونيو في كيل",
    keywords: ["Die Prinzen = دي برينتسن", "tritt auf = تقدم حفلا", "23. Juni = 23 يونيو", "Kiel = كيل"],
    simplified: "فرقة الأمراء تغني بكيل في 23 يونيو",
    imagine: "خمسة مغنين واقفين على مسرح وتقويم وراءهم",
    correct: true
};

HELP_DATA["hoeren3_exam30_q4"] = {
    text: "Auf der A3 Frankfurt Richtung Würzburg ist zwischen Offenbach und Seligenstadt ein Stau.",
    meaning: "على الطريق A3 من فرانكفورت باتجاه فورتسبورغ يوجد زحمة بين أوفنباخ وزيليغنشتات",
    keywords: ["A3 = طريق A3", "Frankfurt = فرانكفورت", "Würzburg = فورتسبورغ", "Stau = زحمة", "Offenbach = أوفنباخ", "Seligenstadt = زيليغنشتات"],
    simplified: "زحمة على الطريق بين أوفنباخ وزيليغنشتات",
    imagine: "سيارات واقفة في الطريق وكل واحد يضغط منبهه",
    correct: true
};

// ========== Exam 31: spätestens in Hannover (مواضيع تركيا) (صحيح: 0,1,2) ==========
HELP_DATA["hoeren3_exam31_q1"] = {
    text: "Sie müssen spätestens in Hannover in den hinteren Zugteil umsteigen.",
    meaning: "يجب عليكم في هانوفر على أبعد تقدير الانتقال إلى قسم القطار الخلفي",
    keywords: ["spätestens = على أبعد تقدير", "Hannover = هانوفر", "hinteren Zugteil = قسم قطار خلفي", "umsteigen = الانتقال"],
    simplified: "بدل لعربة الخلفية في هانوفر ضروري",
    imagine: "رجل يجري بين عربات القطار في محطة هانوفر",
    correct: true
};

HELP_DATA["hoeren3_exam31_q2"] = {
    text: "Wenn Sie für das Radio eine Geschichte über Ihren eigenen 18. Geburtstag schreiben, müssen Sie bei der Party keinen Eintritt bezahlen.",
    meaning: "إذا كتبتم للإذاعة قصة عن عيد ميلادكم الثامن عشر لن تدفعوا دخولا للحفلة",
    keywords: ["Geschichte = قصة", "18. Geburtstag = عيد ميلاد 18", "Radio = إذاعة", "keinen Eintritt bezahlen = لا تدفع دخولا"],
    simplified: "اكتب قصة ميلادك وادخل الحفلة مجانا",
    imagine: "شاب يكتب ورقة ويقفز من بوابة الحفلة مجانا",
    correct: true
};

HELP_DATA["hoeren3_exam31_q3"] = {
    text: "Ihrer Freundin geht es nicht gut.",
    meaning: "صديقتك ليست بخير",
    keywords: ["Freundin = صديقة", "geht es nicht gut = ليست بخير"],
    simplified: "صديقتك حالتها الصحية سيئة",
    imagine: "فتاة جالسة على سرير وتحمل منديلا بيدها",
    correct: true
};

// ========== Exam 32: Für das Konzert mit Romano (مواضيع تركيا) (صحيح: 2,4) ==========
HELP_DATA["hoeren3_exam32_q3"] = {
    text: "Über den neuen Tarif von T-Upline können Sie sich im Internet informieren.",
    meaning: "يمكنكم الاستعلام عن تعرفة T-Upline الجديدة على الإنترنت",
    keywords: ["neuen Tarif = تعرفة جديدة", "T-Upline = T-Upline", "Internet = إنترنت", "informieren = استعلام"],
    simplified: "تعرفة T-Upline الجديدة على النت",
    imagine: "شخص يقرأ عن تعرفة جديدة على حاسوبه",
    correct: true
};

HELP_DATA["hoeren3_exam32_q5"] = {
    text: "Bei dem Festival gibt es nicht nur folkloristische Unterhaltung, sondern auch kulinarische Spezialitäten aus dem In- und Ausland.",
    meaning: "في المهرجان ليس فقط ترفيه فولكلوري بل أيضا أطباق خاصة من الداخل والخارج",
    keywords: ["Festival = مهرجان", "folkloristische Unterhaltung = ترفيه فولكلوري", "kulinarische Spezialitäten = أطباق خاصة", "In- und Ausland = داخل وخارج"],
    simplified: "المهرجان أكلة فلكلورية من كل مكان",
    imagine: "طاولة طويلة عليها أطباق من دول مختلفة",
    correct: true
};

// ========== Exam 33: Gartenausstellung KöGa (مواضيع تركيا) (صحيح: 1,2,3) ==========
HELP_DATA["hoeren3_exam33_q2"] = {
    text: "Zum Skateboard-Treffen am 31. Oktober soll man verkleidet erscheinen.",
    meaning: "لقاء التزلج على الألواح يوم 31 أكتوبر يجب الحضور متنكرا",
    keywords: ["Skateboard-Treffen = لقاء تزلج", "31. Oktober = 31 أكتوبر", "verkleidet = متنكرا", "erscheinen = الحضور"],
    simplified: "تعال متنكرا لسباق التزلج في 31 أكتوبر",
    imagine: "شاب يلبس زي خفاش وهو على لوح التزلج",
    correct: true
};

HELP_DATA["hoeren3_exam33_q3"] = {
    text: "Bei der Gartenausstellung KöGa kann man Gartenzwerge kaufen.",
    meaning: "في معرض كوغا للحدائق يمكن شراء تماثيل أقزام الحدائق",
    keywords: ["Gartenausstellung KöGa = معرض كوغا", "Gartenzwerge = أقزام حدائق", "kaufen = شراء"],
    simplified: "معرض كوغا يبيع تماثيل الأقزام",
    imagine: "تمثال قزم أحمر يرتدي قبعة مدببة",
    correct: true
};

HELP_DATA["hoeren3_exam33_q4"] = {
    text: "Die Autobahn A2 Richtung Hannover ist zwischen Rheda-Wiedenbrück und Oelde gesperrt.",
    meaning: "الطريق A2 باتجاه هانوفر مغلق بين ريدا-فيدنبروك وأولده",
    keywords: ["Autobahn A2 = طريق A2", "Hannover = هانوفر", "gesperrt = مغلق", "Rheda-Wiedenbrück = ريدا-فيدنبروك", "Oelde = أولده"],
    simplified: "الطريق A2 مسدود بين ريدا وأولده",
    imagine: "لافتة حمراء وإشارات مغلقة على الطريق",
    correct: true
};

// ========== Exam 34: den Opel-Zoo (مواضيع تركيا) (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam34_q1"] = {
    text: "Am Donnerstag ist in der Uckermark mit Birkenpollen zu rechnen.",
    meaning: "يوم الخميس في أوكرمرك يجب توقع حبوب لقاح البتولا",
    keywords: ["Donnerstag = خميس", "Uckermark = أوكرمرك", "Birkenpollen = حبوب لقاح بتولا", "rechnen = توقع"],
    simplified: "الخميس حبوب لقاح البتولا بأوكرمرك",
    imagine: "شجرة بتولا يتطاير منها غبار أصفر في الهواء",
    correct: true
};

HELP_DATA["hoeren3_exam34_q3"] = {
    text: "Am 9. Juli kann man den Opel-Zoo nachts besuchen.",
    meaning: "يوم 9 يوليو يمكن زيارة حديقة أوبيل للحيوانات ليلا",
    keywords: ["9. Juli = 9 يوليو", "Opel-Zoo = حديقة أوبيل", "nachts = ليلا", "besuchen = زيارة"],
    simplified: "حديقة أوبيل مفتوحة ليلا في 9 يوليو",
    imagine: "قمر مضيء فوق مدخل حديقة الحيوانات",
    correct: true
};

// ========== Exam 35: Der Christkindlesmarkt in Nürnberg (مواضيع تركيا) (صحيح: 0,1,3,4) ==========
HELP_DATA["hoeren3_exam35_q1"] = {
    text: "Der Christkindlesmarkt in Nürnberg bietet einen speziellen Geschenk-Dienst für Kinder an.",
    meaning: "سوق Christkindlesmarkt في نورنبرغ يقدم خدمة هدايا خاصة للأطفال",
    keywords: ["Christkindlesmarkt = سوق كريستكيندل", "Nürnberg = نورنبرغ", "Geschenk-Dienst = خدمة هدايا", "für Kinder = للأطفال"],
    simplified: "سوق نورنبرغ يوصل هدايا للأطفال",
    imagine: "طفل يستلم هدية من باب منزله في الشتاء",
    correct: true
};

HELP_DATA["hoeren3_exam35_q2"] = {
    text: "Auf dem deutsch-französischen Bauernmarkt in Hochspeyer werden ökologische Projekte vorgestellt.",
    meaning: "في السوق الألماني-الفرنسي في هوخشباير يتم عرض مشاريع بيئية",
    keywords: ["deutsch-französischen = ألماني-فرنسي", "Bauernmarkt = سوق مزارعين", "Hochspeyer = هوخشباير", "ökologische Projekte = مشاريع بيئية"],
    simplified: "مشاريع صديقة للبيئة في سوق هوخشباير",
    imagine: "لافتة خضراء مكتوب عليها بيئة وعلى طاولة مجسمات",
    correct: true
};

HELP_DATA["hoeren3_exam35_q4"] = {
    text: "Auf der A5 gibt es hinter Karlsruhe mehrere Verkehrsbehinderungen.",
    meaning: "على الطريق A5 خلف كارلسروهه عدة عراقيل مرورية",
    keywords: ["A5 = طريق A5", "hinter Karlsruhe = خلف كارلسروهه", "mehrere = عدة", "Verkehrsbehinderungen = عراقيل مرورية"],
    simplified: "زحمة على الطريق A5 وراء كارلسروهه",
    imagine: "سيارات كثيرة واقفة تحت شمس حارقة",
    correct: true
};

HELP_DATA["hoeren3_exam35_q5"] = {
    text: "Wenn Ihr Computer nicht mehr hochfährt, können Sie die Nummer 70 17 17 wählen, um Hilfe von Computer World zu erhalten.",
    meaning: "إذا لم يعد كمبيوتركم يعمل يمكنكم الاتصال على رقم 701717 للحصول على مساعدة من كمبيوتر وورلد",
    keywords: ["Computer hochfährt = كمبيوتر يعمل", "Nummer 70 17 17 = رقم 701717", "Hilfe = مساعدة", "Computer World = كمبيوتر وورلد"],
    simplified: "كمبيوترك خرب اتصل 701717 تحصل على مساعدة",
    imagine: "شاشة سوداء وهاتف يقرع الرقم 701717",
    correct: true
};

// ========== Exam 36: Das Geschäft für österreichische Spezialitäten (مواضيع تركيا) (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam36_q1"] = {
    text: "Das Geschäft für österreichische Spezialitäten befindet sich in Check-in-2.",
    meaning: "متجر المنتجات النمساوية الخاصة يقع في تسجيل الوصول 2",
    keywords: ["österreichische Spezialitäten = منتجات نمساوية خاصة", "Check-in-2 = تسجيل وصول 2", "befindet sich = يقع"],
    simplified: "المتجر النمساوي في صالة رقم 2",
    imagine: "لافتة نمسا وصالة دخول رقم اثنين",
    correct: true
};

HELP_DATA["hoeren3_exam36_q5"] = {
    text: "Der Bürgermeister eröffnet das Fest.",
    meaning: "رئيس البلدية يفتتح المهرجان",
    keywords: ["Bürgermeister = رئيس بلدية", "eröffnet = يفتتح", "Fest = مهرجان"],
    simplified: "رئيس المدينة يفتتح الحفل",
    imagine: "رجل يقطع شريطا أحمر بمقص كبير",
    correct: true
};

// ========== Exam 37: Alle Flüge der Fluglinie AirMer (مواضيع تركيا) (صحيح: 1) ==========
HELP_DATA["hoeren3_exam37_q2"] = {
    text: "Alle Flüge der Fluglinie AirMer sind für heute und morgen gestrichen.",
    meaning: "جميع رحلات خط إيرمير الجوي ملغاة لليوم وغدا",
    keywords: ["Flüge = رحلات", "AirMer = إيرمير", "heute und morgen = اليوم وغدا", "gestrichen = ملغاة"],
    simplified: "رحلات إيرمير اليوم وغدا ملغاة",
    imagine: "شاشة المطار كلها مكتوب عليها ملغي باللون الأحمر",
    correct: true
};

// ========== Exam 38: Auto gewinnen (مواضيع تركيا) (صحيح: 1,4) ==========
HELP_DATA["hoeren3_exam38_q2"] = {
    text: "Man kann ein Auto gewinnen, wenn man alle 9 Gewinnzahlen sammelt.",
    meaning: "يمكن ربح سيارة إذا جمعت جميع الأرقام الفائزة التسعة",
    keywords: ["Auto gewinnen = ربح سيارة", "alle 9 Gewinnzahlen = كل الأرقام الفائزة التسعة", "sammelt = جمعت"],
    simplified: "اجمع تسعة أرقام وتربح سيارة",
    imagine: "شخص يلصق الرقم التاسع على بطاقة ويقفز فرحا",
    correct: true
};

HELP_DATA["hoeren3_exam38_q5"] = {
    text: "Der Eintritt ins Kunterbunt-Kindermuseum ist am Eröffnungstag gratis.",
    meaning: "الدخول إلى متحف الأطفال كونتربونت مجاني يوم الافتتاح",
    keywords: ["Kunterbunt-Kindermuseum = متحف أطفال كونتربونت", "Eröffnungstag = يوم افتتاح", "gratis = مجاني"],
    simplified: "متحف الأطفال مجاني يوم الافتتاح",
    imagine: "أطفال يدخلون متحفا ولافتة مكتوب عليها مجاني",
    correct: true
};

// ========== Exam 39: Die Fahrradtouren von Berlin (مواضيع تركيا) (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam39_q1"] = {
    text: "Die Fahrradtouren von 'Berlin auf zwei Rädern' können nicht nur privat, sondern auch im beruflichen Kontext gebucht werden.",
    meaning: "جولات برلين على عجلتين يمكن حجزها ليس فقط للخاص بل أيضا في سياق العمل",
    keywords: ["Fahrradtouren = جولات دراجات", "Berlin auf zwei Rädern = برلين على عجلتين", "privat = خاص", "beruflichen Kontext = سياق عمل"],
    simplified: "جولات الدراجة ببرلين للعمل والخاص",
    imagine: "شخص يرتدي بدلة وآخر يركب دراجة في برلين",
    correct: true
};

HELP_DATA["hoeren3_exam39_q5"] = {
    text: "Die lange Nacht der Architektur ist kostenlos, wenn man sich vorher online anmeldet.",
    meaning: "ليلة العمارة الطويلة مجانية إذا سجلت مسبقا عبر الإنترنت",
    keywords: ["lange Nacht der Architektur = ليلة عمارة طويلة", "kostenlos = مجانية", "vorher online anmeldet = تسجيل مسبق أونلاين"],
    simplified: "ليلة العمارة مجانية مع التسجيل المسبق",
    imagine: "شخص يسجل أونلاين ثم يدخل مبنى جميل مجانا",
    correct: true
};

// ========== Exam 40: Die Literaturmesse für Kleinverleger (مواضيع تركيا) (صحيح: 4) ==========
HELP_DATA["hoeren3_exam40_q5"] = {
    text: "Während des Unterhaltungsprogramms gibt es auch Kinderbetreuung.",
    meaning: "خلال البرنامج الترفيهي توجد أيضا رعاية للأطفال",
    keywords: ["Unterhaltungsprogramms = برنامج ترفيهي", "Kinderbetreuung = رعاية أطفال", "gibt es = توجد"],
    simplified: "البرنامج الترفيهي يوفر حضانة للأطفال",
    imagine: "أطفال يلعبون ومربية جالسة معهم بجانب المسرح",
    correct: true
};

// ========== Exam 41: Fußballspiels im Ostpark (مواضيع تركيا) (صحيح: 0,1) ==========
HELP_DATA["hoeren3_exam41_q1"] = {
    text: "Die Übertragung des Fußballspiels im Ostpark findet bei jedem Wetter statt.",
    meaning: "نقل مباراة كرة القدم في أوستبارك يقام في أي طقس",
    keywords: ["Übertragung = نقل", "Fußballspiels = مباراة كرة قدم", "Ostpark = أوستبارك", "bei jedem Wetter = في أي طقس"],
    simplified: "نقل المباراة في أوستبارك مهما كان الطقس",
    imagine: "شاشة كبيرة في الحديقة تمطر عليها وكلاء يشاهدون",
    correct: true
};

HELP_DATA["hoeren3_exam41_q2"] = {
    text: "Wer sich für den Newsletter registriert, kann jeden Monat etwas gewinnen.",
    meaning: "من يسجل في النشرة الإخبارية يمكنه ربح شيء كل شهر",
    keywords: ["Newsletter = نشرة إخبارية", "registriert = يسجل", "jeden Monat = كل شهر", "gewinnen = ربح"],
    simplified: "اشترك في النشرة الإخبارية واربح شهريا",
    imagine: "بريد إلكتروني ومعه جائزة صغيرة كل شهر",
    correct: true
};

// ========== Exam 42: Das Treffen (مواضيع تركيا) (صحيح: 0,1,4) ==========
HELP_DATA["hoeren3_exam42_q1"] = {
    text: "Das Treffen ist am Donnerstag.",
    meaning: "اللقاء يوم الخميس",
    keywords: ["Treffen = لقاء", "Donnerstag = خميس"],
    simplified: "الموعد يوم الخميس",
    imagine: "تقويم ودائرة على يوم الخميس",
    correct: true
};

HELP_DATA["hoeren3_exam42_q2"] = {
    text: "Das Wetter bleibt schlecht und regnerisch; am Sonntagnachmittag leichte Wetterbesserung.",
    meaning: "الطقس يبقى سيئا وممطرا؛ يوم الأحد بعد الظهر تحسن طفيف",
    keywords: ["Wetter = طقس", "schlecht und regnerisch = سيئ وممطر", "Sonntagnachmittag = أحد بعد ظهر", "leichte Wetterbesserung = تحسن طفيف"],
    simplified: "طقس سيء ومطر وتحسن طفيف الأحد",
    imagine: "مظلات كثيرة ثم شمس تطلع قليلا يوم الأحد",
    correct: true
};

HELP_DATA["hoeren3_exam42_q5"] = {
    text: "Sprachprogramme für Deutsch gibt es in derselben Abteilung wie Computerspiele.",
    meaning: "برامج تعلم اللغة الألمانية موجودة في نفس قسم ألعاب الكمبيوتر",
    keywords: ["Sprachprogramme = برامج لغة", "Deutsch = ألمانية", "derselben Abteilung = نفس القسم", "Computerspiele = ألعاب كمبيوتر"],
    simplified: "برامج الألمانية بجانب ألعاب الكمبيوتر",
    imagine: "رف في مكتبة وعليه ألعاب إلى جانب أقراص تعليم ألمانية",
    correct: true
};

// ========== Exam 43: im Frankfurter Zoo (مواضيع تركيا) (صحيح: 0,4) ==========
HELP_DATA["hoeren3_exam43_q1"] = {
    text: "im Frankfurter Zoo kann man Großkatzen in einer naturnahen Umgebung erleben.",
    meaning: "في حديقة حيوان فرانكفورت يمكن رؤية القطط الكبيرة في بيئة طبيعية",
    keywords: ["Frankfurter Zoo = حديقة حيوان فرانكفورت", "Großkatzen = قطط كبيرة", "naturnahen Umgebung = بيئة طبيعية", "erleben = رؤية"],
    simplified: "القطط الكبيرة في بيئة شبه طبيعية بحديقة فرانكفورت",
    imagine: "نمر يمشي بين الأشجار والناس تنظر إليه خلف الزجاج",
    correct: true
};

HELP_DATA["hoeren3_exam43_q5"] = {
    text: "Telefonische Beratungen werden an allen Werktagen auch nachmittags angeboten.",
    meaning: "الاستشارات الهاتفية تقدم في كل أيام العمل بعد الظهر أيضا",
    keywords: ["Telefonische Beratungen = استشارات هاتفية", "Werktagen = أيام عمل", "nachmittags = بعد الظهر", "angeboten = تقدم"],
    simplified: "استشارات هاتفية متاحة بعد الظهر كل أيام العمل",
    imagine: "ساعة تشير إلى الثالثة وسماعة هاتف ترن",
    correct: true
};

// ========== Exam 44: Ein Teil der kostenlosen Veranstaltungen (مواضيع تركيا) (صحيح: 1,2) ==========
HELP_DATA["hoeren3_exam44_q2"] = {
    text: "Ein Teil der kostenlosen Veranstaltungen beim Literaturfest findet an spannenden Orten in der Stadt statt.",
    meaning: "جزء من الفعاليات المجانية في مهرجان الأدب يقام في أماكن مثيرة في المدينة",
    keywords: ["kostenlosen Veranstaltungen = فعاليات مجانية", "Literaturfest = مهرجان أدب", "spannenden Orten = أماكن مثيرة", "Stadt = مدينة"],
    simplified: "فعاليات الأدب المجانية في أماكن ممتعة بالمدينة",
    imagine: "كتاب مفتوح وخريطة المدينة تظهر عليها نجوم",
    correct: true
};

HELP_DATA["hoeren3_exam44_q3"] = {
    text: "Die Firma Sanitärbedarf Frieder & Hansen ist sechs Tage die Woche für Anfragen erreichbar.",
    meaning: "شركة فريدير أند هانسن لمعدات الصحة متاحة للاستفسارات ستة أيام في الأسبوع",
    keywords: ["Sanitärbedarf = معدات صحية", "Frieder & Hansen = فريدير أند هانسن", "sechs Tage = ستة أيام", "Anfragen = استفسارات", "erreichbar = متاحة"],
    simplified: "شركة الصحة ترد على الاستفسارات ستة أيام بالأسبوع",
    imagine: "تقويم وستة أيام مرسوم عليها ساعات اتصال",
    correct: true
};

// ========== Exam 45: Auf der Viktoriabrücke (مواضيع تركيا) (صحيح: 2,3) ==========
HELP_DATA["hoeren3_exam45_q3"] = {
    text: "Auf der Viktoriabrücke kann wegen Bauarbeiten stadteinwärts nur eine Fahrbahn genutzt werden.",
    meaning: "على جسر فيكتوريا بسبب أشغال البناء نحو المدينة يمكن استخدام مسار واحد فقط",
    keywords: ["Viktoriabrücke = جسر فيكتوريا", "Bauarbeiten = أشغال بناء", "stadteinwärts = نحو المدينة", "eine Fahrbahn = مسار واحد"],
    simplified: "جسر فيكتوريا ممر واحد باتجاه المدينة بسبب البناء",
    imagine: "سيارة واحدة تمر ورافعة بناء بجانبها على الجسر",
    correct: true
};

HELP_DATA["hoeren3_exam45_q4"] = {
    text: "Wenn man den Eindruck hat, man hat zu viel für den Strom bezahlt, wählt man die 2.",
    meaning: "إذا شعرتم أنكم دفعتم كثيرا للكهرباء اضغطوا 2",
    keywords: ["Eindruck = شعور", "zu viel bezahlt = دفع كثيرا", "Strom = كهرباء", "wählt die 2 = تضغط 2"],
    simplified: "دفعت زيادة للكهرباء اضغط رقم اثنين",
    imagine: "فاتورة كهرباء مرتفعة ويد تضغط على زر رقم 2",
    correct: true
};

// ========== Exam 46: Die Buchpräsentation (مواضيع تركيا) (صحيح: 0,3,4) ==========
HELP_DATA["hoeren3_exam46_q1"] = {
    text: "Die Buchpräsentation beginnt laut Programm in 30 Minuten.",
    meaning: "عرض الكتاب يبدأ حسب البرنامج بعد 30 دقيقة",
    keywords: ["Buchpräsentation = عرض كتاب", "laut Programm = حسب البرنامج", "beginnt = يبدأ", "in 30 Minuten = بعد 30 دقيقة"],
    simplified: "عرض الكتاب يبدأ بعد نصف ساعة",
    imagine: "ساعة تشير إلى نصف ساعة وكتاب على المنصة",
    correct: true
};

HELP_DATA["hoeren3_exam46_q4"] = {
    text: "Die Führungen im Tierpark beginnen in der Kassazone.",
    meaning: "الجولات المصحوبة بمرشد في حديقة الحيوان تبدأ في منطقة التذاكر",
    keywords: ["Führungen = جولات مصحوبة", "Tierpark = حديقة حيوان", "beginnen = تبدأ", "Kassazone = منطقة تذاكر"],
    simplified: "جولات الحديقة تبدأ عند شباك التذاكر",
    imagine: "مجموعة سياحية واقفة عند شباك التذاكر مع مرشد",
    correct: true
};

HELP_DATA["hoeren3_exam46_q5"] = {
    text: "Die Besucher werden zum Mitmachen eingeladen.",
    meaning: "الزوار مدعوون للمشاركة",
    keywords: ["Besucher = زوار", "Mitmachen = مشاركة", "eingeladen = مدعوون"],
    simplified: "الزوار مرحب بهم للمشاركة",
    imagine: "يد ممدودة لشخص ليدخل في نشاط",
    correct: true
};

// ========== Exam 47: Beim Klassik-Radio (مواضيع تركيا) (صحيح: 0,2) ==========
HELP_DATA["hoeren3_exam47_q1"] = {
    text: "Beim Klassik-Radio kann man Karten für ein Konzert in Frankfurt gewinnen.",
    meaning: "في إذاعة الكلاسيك يمكن ربح تذاكر لحفل في فرانكفورت",
    keywords: ["Klassik-Radio = إذاعة كلاسيك", "Karten gewinnen = ربح تذاكر", "Konzert = حفل", "Frankfurt = فرانكفورت"],
    simplified: "راديو الكلاسيك يعطيك تذاكر حفل بفرانكفورت",
    imagine: "راديو قديم وتذكرة تخرج منه إلى فرانكفورت",
    correct: true
};

HELP_DATA["hoeren3_exam47_q3"] = {
    text: "Der Radiosender Bayern 1 informiert auf seiner Website über das Sommernachtsfest.",
    meaning: "محطة بايرن 1 الإذاعية تقدم معلومات على موقعها عن مهرجان ليلة الصيف",
    keywords: ["Radiosender Bayern 1 = محطة بايرن 1", "Website = موقع", "informiert = تقدم معلومات", "Sommernachtsfest = مهرجان ليلة صيف"],
    simplified: "موقع بايرن 1 يعرفك بمهرجان ليلة الصيف",
    imagine: "شاشة حاسوب وعليها ألعاب نارية ونجوم",
    correct: true
};

// ============================================
// lesen1.js - جميع شروحات Lesen Teil 1
// ============================================

// ========== Exam 1: Jugend Forscher (صحيح: 9,7,1,0,4) ==========
HELP_DATA["lesen1_exam1_q1"] = {
    text: "Die Zahlen wirken auf dem ersten Blick dramatisch - Wenn aus Erdbeeren Tomaten werden",
    meaning: "الأطفال لا يعرفون الطبخ ويخلطون بين الفراولة والطماطم",
    keywords: ["kochen = طبخ", "Erdbeeren = فراولة", "Tomaten = طماطم"],
    simplified: "أطفال يخلطون بين الفراولة والطماطم",
    imagine: "طفل يأكل فراولة ويقول هذه طماطم",
    correct: "j"
};

HELP_DATA["lesen1_exam1_q2"] = {
    text: "Immer mehr Mädchen leiden an schweren Essstörungen - Von der Diät zur Krankheit",
    meaning: "الفتيات يصبن بأمراض أكل خطيرة تبدأ بحمية",
    keywords: ["Mädchen = فتيات", "Diät = حمية", "Essstörungen = اضطرابات أكل"],
    simplified: "حمية صغيرة تؤدي لمرض خطير عند الفتيات",
    imagine: "فتاة ترمي الميزان بعد أن خسرت كثيرا",
    correct: "h"
};

HELP_DATA["lesen1_exam1_q3"] = {
    text: "Energiesparlampen, umweltfreundliche Elektrogeräte - Jugend engagiert sich für den Umweltschutz",
    meaning: "الشباب يشاركون في مسابقات علمية لحماية البيئة",
    keywords: ["Jugend forscht = شباب يبحثون", "Umweltschutz = حماية بيئة", "Wettbewerb = مسابقة"],
    simplified: "شباب يبحثون عن حلول بيئية في مسابقة",
    imagine: "طالب يشرح بحثه عن البيئة أمام لجنة",
    correct: "b"
};

HELP_DATA["lesen1_exam1_q4"] = {
    text: "13,5 Meter lang und leuchtend gelb - Jugend forscht - auch auf dem Meer",
    meaning: "تلاميذ يركبون سفينة لدراسة تلوث البحر",
    keywords: ["Meer = بحر", "Forschung = بحث", "Plastik = بلاستيك", "Nordsee = بحر الشمال"],
    simplified: "تلاميذ يبحثون عن البلاستيك في البحر",
    imagine: "طالبة تأخذ عينة ماء من البحر",
    correct: "a"
};

HELP_DATA["lesen1_exam1_q5"] = {
    text: "Mobbing ist kein neues Phänomen - Psychoterror an der Schule",
    meaning: "التنمر والإيذاء النفسي منتشر في المدارس",
    keywords: ["Mobbing = تنمر", "Schule = مدرسة", "Psychoterror = إرهاب نفسي"],
    simplified: "التنمر والإهانة في المدرسة تؤذي الطلاب",
    imagine: "طفل يجلس وحيدا وأطفال آخرون يسخرون منه",
    correct: "e"
};

// ========== Exam 2: sport ist gesund (صحيح: 7,5,2,0,3) ==========
HELP_DATA["lesen1_exam2_q1"] = {
    text: "An der Ostküste Attikas in Griechenland - Ein Leistungssport für jedes Alter",
    meaning: "الماراثون رياضة يمكن ممارستها حتى سن متقدم",
    keywords: ["Marathonlauf = ماراثون", "Leistungssport = رياضة تنافسية", "hohes Alter = سن متقدم"],
    simplified: "الماراثون رياضة لكل الأعمار حتى كبار السن",
    imagine: "رجل عجوز يركض ماراثونا ويبتسم",
    correct: "h"
};

HELP_DATA["lesen1_exam2_q2"] = {
    text: "Warum soll sich der Mensch nun auf Straßen und Wegen fortbewegen - Sportbegeisterte Eltern",
    meaning: "آباء محبو الرياضة يجرون وعربات أطفالهم معهم",
    keywords: ["Jogging-Stroller = عربة جري", "Kinderwagen = عربة أطفال", "Babys = أطفال رضع"],
    simplified: "أهل يمارسون الرياضة وأطفالهم معهم في العربة",
    imagine: "أب يركض ويدفع عربة طفله أمامه",
    correct: "f"
};

HELP_DATA["lesen1_exam2_q3"] = {
    text: "Schweizer Forscher haben herausgefunden - Fitness auch mit wenig Zeitaufwand erreichbar",
    meaning: "6 دقائق تمرين أسبوعيا تكفي للياقة البدنية",
    keywords: ["6 Minuten = 6 دقائق", "Hochleistungstraining = تدريب عالي الأداء", "fit = لائق"],
    simplified: "لياقة بدنية بست دقائق فقط في الأسبوع",
    imagine: "رجل يركض بسرعة لمدة دقيقة واحدة في اليوم",
    correct: "c"
};

HELP_DATA["lesen1_exam2_q4"] = {
    text: "Mehr Bewegung als Ausgleich für zu langes Sitzen - Sport ist gesund",
    meaning: "للرياضة قواعد يجب اتباعها لتجنب الضرر",
    keywords: ["Grundregeln = قواعد أساسية", "Einsteiger = مبتدئين", "Puls = نبض"],
    simplified: "اركب الرياضة ولكن اتبع القواعد الأساسية",
    imagine: "عداء يتوقف ويقيس نبضه بساعته",
    correct: "a"
};

HELP_DATA["lesen1_exam2_q5"] = {
    text: "Viele frischgebackene Eltern stehen einem riesigen Angebot - Geprüfte Qualität für Babys",
    meaning: "نصائح لاختيار عربة أطفال آمنة وعالية الجودة",
    keywords: ["Kinderwagen = عربة أطفال", "TÜV geprüfte = مختبرة", "Prüfzeichen = علامة فحص"],
    simplified: "عربات أطفال مختبرة وآمنة للرضع",
    imagine: "عربة أطفال عليها ختم دائري أخضري", 
    correct: "d"
};

// ========== Exam 3: sport ist gesund (التعديل 1) (صحيح: 7,5,2,0,3) ==========
HELP_DATA["lesen1_exam3_q1"] = {
    text: "An der Ostküste Attikas in Griechenland - Ein Leistungssport für jedes Alter",
    meaning: "الماراثون رياضة تنافسية تناسب جميع الأعمار",
    keywords: ["Marathonlauf = ماراثون", "Leistungssport = رياضة تنافسية", "hohes Alter = سن متقدم"],
    simplified: "الماراثون رياضة حتى لكبار السن",
    imagine: "جد يركض ماراثونا بجوار حفيده",
    correct: "h"
};

HELP_DATA["lesen1_exam3_q2"] = {
    text: "Warum soll sich der Mensch nun auf Straßen und Wegen - Sportbegeisterte Eltern",
    meaning: "آباء رياضيون يجرون وعربات أطفالهم",
    keywords: ["Jogging-Stroller = عربة جري", "Kinderwagen = عربة أطفال", "Babys = أطفال"],
    simplified: "أهل يجرون وأطفالهم في عربات",
    imagine: "أم تدفع عربة طفلها وهي تجري في الحديقة",
    correct: "f"
};

HELP_DATA["lesen1_exam3_q3"] = {
    text: "Schweizer Forscher haben herausgefunden - Fitness auch mit wenig Zeitaufwand",
    meaning: "6 دقائق تدريب أسبوعيا تكفي للياقة",
    keywords: ["6 Minuten = 6 دقائق", "Hochleistungstraining = تدريب عال", "fit = لائق"],
    simplified: "ست دقائق رياضة أسبوعيا تكفي",
    imagine: "رجل يعرق بعد دقيقة واحدة من الركض السريع",
    correct: "c"
};

HELP_DATA["lesen1_exam3_q4"] = {
    text: "Mehr Bewegung als Ausgleich für zu langes Sitzen - Sport ist gesund",
    meaning: "للرياضة قواعد مهمة لسلامة المبتدئين",
    keywords: ["Grundregeln = قواعد", "Einsteiger = مبتدئين", "Puls = نبض"],
    simplified: "اتبع قواعد الرياضة لتحمي صحتك",
    imagine: "شخص يقرأ كتيب إرشادات قبل الجري",
    correct: "a"
};

HELP_DATA["lesen1_exam3_q5"] = {
    text: "Viele frischgebackene Eltern stehen einem riesigen Angebot - Geprüfte Qualität für Babys",
    meaning: "نصائح مهمة لشراء عربة أطفال آمنة",
    keywords: ["Kinderwagen = عربة أطفال", "TÜV = جهاز فحص", "Prüfzeichen = علامة جودة"],
    simplified: "عربات أطفال مختبرة ومعتمدة للرضع",
    imagine: "يد تتحسس علامة الجودة على عربة أطفال",
    correct: "d"
};

// ========== Exam 4: Tanzkurs (صحيح: 4,3,5,0,6) ==========
HELP_DATA["lesen1_exam4_q1"] = {
    text: "Der Begriff Extremsport wird oft subjektiv verwendet - Suche nach dem Nervenkitzel",
    meaning: "الرياضات الخطيرة يبحث فيها عن الإثارة والمغامرة",
    keywords: ["Extremsport = رياضة خطيرة", "Risiko = خطر", "Adrenalinschub = دفعة أدرينالين"],
    simplified: "الرياضيون يبحثون عن الإثارة في الرياضات الخطيرة",
    imagine: "رجل يقفز بالحبال من فوق جسر عال",
    correct: "e"
};

HELP_DATA["lesen1_exam4_q2"] = {
    text: "Musik, Sport, ehrenamtliches Engagement - Verändertes Freizeitverhalten von Jugendlichen",
    meaning: "سلوك أوقات فراغ الشباب تغير نحو الأنشطة التعليمية",
    keywords: ["Jugendliche = شباب", "Freizeitaktivitäten = أنشطة فراغ", "bildungsorientiert = تعليمي"],
    simplified: "شباب يقضون وقت فراغهم في أنشطة مفيدة",
    imagine: "مراهق يعزف على البيانو وآخر يلعب كرة",
    correct: "d"
};

HELP_DATA["lesen1_exam4_q3"] = {
    text: "In Firmen gibt es sie schon - Hilfen für überforderte Schüler",
    meaning: "دورات استرخاء في المدارس لمساعدة الطلاب المتوترين",
    keywords: ["Entspannungskurse = دورات استرخاء", "Stress = توتر", "Schüler = طلاب"],
    simplified: "دورات استرخاء تساعد الطلاب على التركيز",
    imagine: "طالب جالس يتنفس بعمق ويغمض عينيه",
    correct: "f"
};

HELP_DATA["lesen1_exam4_q4"] = {
    text: "Tanja Kleist ist von modernem Tanz absolut begeistert - Freie Plätze im Tanzkurs",
    meaning: "أماكن شاغرة في دورة رقص الهيب هوب",
    keywords: ["Tanzgruppe = فرقة رقص", "Hip-Hop = هيب هوب", "Teilnehmer = مشاركين"],
    simplified: "دورة رقص الهيب هوب تبحث عن أعضاء جدد",
    imagine: "فتاة ترقص ويديها مفتوحتان",
    correct: "a"
};

HELP_DATA["lesen1_exam4_q5"] = {
    text: "Montags Tennis, dienstags Klavierunterricht - Keine Zeit für Langeweile",
    meaning: "الأطفال مشغولون بأنشطة كثيرة ولا وقت للملل",
    keywords: ["Freizeitstress = ضغط أوقات فراغ", "Eltern = أهل", "Kinder = أطفال"],
    simplified: "أطفال مشغولون طوال الأسبوع بلا وقت للملل",
    imagine: "طفل يجري من درس موسيقى إلى تدريب كرة",
    correct: "g"
};

// ========== Exam 5: Tanzkurs (التعديل 1) (صحيح: 3,9,2,1,4) ==========
HELP_DATA["lesen1_exam5_q1"] = {
    text: "Der Begriff Extremsport wird oft subjektiv verwendet - Suche nach dem Nervenkitzel",
    meaning: "الرياضات الخطيرة بحث عن الإثارة",
    keywords: ["Extremsport = رياضة خطيرة", "Risiko = خطر", "Adrenalin = أدرينالين"],
    simplified: "مغامرات خطيرة للبحث عن الإثارة",
    imagine: "شاب يتسلق جبلا دون حبال أمان",
    correct: "d"
};

HELP_DATA["lesen1_exam5_q2"] = {
    text: "Musik, Sport, ehrenamtliches Engagement - Wandel Freizeitverhalten von Jugendlichen",
    meaning: "تغير سلوك أوقات فراغ الشباب نحو الأنشطة الهادفة",
    keywords: ["Jugendliche = شباب", "Freizeitaktivitäten = أنشطة فراغ", "zugenommen = ازداد"],
    simplified: "شباب nowadays يفضلون الأنشطة المفيدة",
    imagine: "شاب يمارس رياضة وآخر يعزف موسيقى",
    correct: "j"
};

HELP_DATA["lesen1_exam5_q3"] = {
    text: "In Firmen gibt es sie schon - Hilfen für überforderte Schüler",
    meaning: "دورات استرخاء لطلاب يعانون من الضغط",
    keywords: ["Entspannungskurse = دورات استرخاء", "Stress = ضغط", "Schüler = طلاب"],
    simplified: "دورات استرخاء في المدارس للحد من التوتر",
    imagine: "طالب نائم بهدوء بعد تمرين استرخاء",
    correct: "c"
};

HELP_DATA["lesen1_exam5_q4"] = {
    text: "Tanja Kleist ist von modernem Tanz absolut begeistert - Freie Plätze im Tanzkurs",
    meaning: "أماكن شاغرة في دورة رقص الهيب هوب",
    keywords: ["Tanzgruppe = مجموعة رقص", "Teilnehmer = مشاركين", "Hip-Hop = هيب هوب"],
    simplified: "دورة رقص تبحث عن راقصين جدد",
    imagine: "لافتة مكتوب عليها مطلوب راقصين",
    correct: "b"
};

HELP_DATA["lesen1_exam5_q5"] = {
    text: "Montags Tennis, dienstags Klavierunterricht - Keine Zeit für Langeweile",
    meaning: "الأطفال مشغولون طوال الأسبوع",
    keywords: ["Freizeitstress = ضغط وقت فراغ", "Eltern = أهل", "Kinder = أطفال"],
    simplified: "أطفال بلا وقت للملل بسبب كثرة الأنشطة",
    imagine: "تقويم مملوء بأنشطة كل يوم",
    correct: "e"
};

// ========== Exam 6: Impfung (صحيح: 1,2,3,6,4) ==========
HELP_DATA["lesen1_exam6_q1"] = {
    text: "Immer wieder überspringen Krankheitserreger aus dem Tierreich - Neue Erkenntnisse über artübergreifende Krankheitserreger",
    meaning: "فيروسات تنتقل من الحيوانات إلى الإنسان",
    keywords: ["Krankheitserreger = مسببات مرض", "Tierreich = مملكة حيوانات", "Infektion = عدوى"],
    simplified: "أمراض تنتقل من الحيوانات للإنسان",
    imagine: "فيروس يقفز من قرد إلى إنسان",
    correct: "b"
};

HELP_DATA["lesen1_exam6_q2"] = {
    text: "Virologen ist es gelungen - Kontroverse um den Zugang zu Forschungsergebnissen",
    meaning: "جدل حول نشر نتائج أبحاث خطيرة",
    keywords: ["Forschungsergebnisse = نتائج أبحاث", "veröffentlichen = نشر", "Terroristen = إرهابيين"],
    simplified: "جدل عالمي حول نشر أبحاث فيروسات خطيرة",
    imagine: "باحث يخفي أوراقه خوفا من الوقوع في الأيدي الخطأ",
    correct: "c"
};

HELP_DATA["lesen1_exam6_q3"] = {
    text: "Ein neuer Impfstoff gegen Grippe - Hoffnung auf einen allumfassenden Grippeschutz",
    meaning: "أمل في لقاح شامل يحمي من جميع أنواع الإنفلونزا",
    keywords: ["Impfstoff = لقاح", "Grippe = إنفلونزا", "universelle = شامل"],
    simplified: "لقاح واحد يحمي من كل أنواع الإنفلونزا",
    imagine: "حقنة واحدة تحمي من فيروسات كثيرة",
    correct: "d"
};

HELP_DATA["lesen1_exam6_q4"] = {
    text: "Breitet sich die Grippe in einer Schule aus - Geschlechtsspezifische Übertragung von Grippeviren",
    meaning: "انتقال الإنفلونزا بين الأطفال يكون بين الذكور والإناث كل على حدة",
    keywords: ["Grippe = إنفلونزا", "Buben = أولاد", "Mädchen = بنات", "Infektion = عدوى"],
    simplified: "الإنفلونزا تنتقل بين البنات وبين الأولاد بشكل منفصل",
    imagine: "ولد ينقل الإنفلونزا لولد آخر وبنت تنقلها لبنت أخرى",
    correct: "g"
};

HELP_DATA["lesen1_exam6_q5"] = {
    text: "Da sich Influenzaviren immer wieder verändern - Hinweise auf eingeschränkten Erfolg von Influenza-Impfungen",
    meaning: "لقاحات الإنفلونزا فعاليتها محدودة",
    keywords: ["Impfstoffe = لقاحات", "Wirksamkeit = فعالية", "geringer = أقل"],
    simplified: "فعالية لقاح الإنفلونزا أقل مما كان يعتقد",
    imagine: "حقنة تحمي 59 شخصا فقط من كل 100",
    correct: "e"
};

// ========== Exam 7: Insel (صحيح: 4,1,8,2,9) ==========
HELP_DATA["lesen1_exam7_q1"] = {
    text: "Die Shengsi-Inseln liegen im Ostchinesischen Meer - Grüne Geisterinsel in Asien",
    meaning: "جزيرة أشباح خضراء في آسيا غطتها الطبيعة",
    keywords: ["Shengsi-Inseln = جزر شينغسي", "unbewohnt = غير مأهولة", "Natur = طبيعة"],
    simplified: "جزيرة مهجورة غطتها الطبيعة بالخضرة",
    imagine: "بيوت قديمة مغطاة بالعشب والنباتات المتسلقة",
    correct: "e"
};

HELP_DATA["lesen1_exam7_q2"] = {
    text: "Der Reiseveranstalter TOURIMARS hat kürzlich eine Befragung - Die beliebtesten Reiseziele unter den europäischen Inseln",
    meaning: "أكثر الجزر الأوروبية شعبية لدى السياح",
    keywords: ["Inseln = جزر", "populär = شعبي", "Europa = أوروبا", "Touristen = سياح"],
    simplified: "أشهر الجزر الأوروبية لقضاء العطلات",
    imagine: "خريطة أوروبا وعليها علامات نجوم على جزر محددة",
    correct: "b"
};

HELP_DATA["lesen1_exam7_q3"] = {
    text: "Das ostfriesische Memmert ist für seltene Vögel reserviert - Tierparadies auf einer Nordseeinsel",
    meaning: "جزيرة في بحر الشمال جنة للطيور النادرة",
    keywords: ["Memmert = ميمرت", "Vögel = طيور", "Nordsee = بحر الشمال", "Tierparadies = جنة حيوانات"],
    simplified: "جزيرة للطيور النادرة في بحر الشمال",
    imagine: "آلاف الطيور تحلق فوق جزيرة صغيرة",
    correct: "i"
};

HELP_DATA["lesen1_exam7_q4"] = {
    text: "Die südamerikanischen Galapagosinseln locken - Fernreisen in eine unberührte Tierwelt",
    meaning: "رحلات إلى جزر غالاباغوس لمشاهدة حيوانات لا تخاف البشر",
    keywords: ["Galapagosinseln = جزر غالاباغوس", "Tiere = حيوانات", "unberührt = غير متأثرة", "Paradies = جنة"],
    simplified: "رحلات إلى جزر غالاباغوس لمشاهدة الحيوانات عن قرب",
    imagine: "سائح يقف بجانب سلحفاة عملاقة لا تهرب منه",
    correct: "c"
};

HELP_DATA["lesen1_exam7_q5"] = {
    text: "Dass Elefanten in Thailand teurer sein können - Umstrittener Umgang mit Tieren als Touristenmagnet",
    meaning: "جدل حول استخدام الأفيال كوسيلة جذب سياحي",
    keywords: ["Elefanten = أفيال", "Tierschützer = حماة حيوانات", "Touristen = سياح", "Kritik = نقد"],
    simplified: "إثارة حول استخدام الأفيال في السياحة التايلندية",
    imagine: "سائح يمتطي فيلا وناشط يحمل لافتة احتجاج خلفه",
    correct: "j"
};

// ========== Exam 8: Bilder (صحيح: 1,8,0,6,2) ==========
HELP_DATA["lesen1_exam8_q1"] = {
    text: "Der Buchtitel erinnert an eine Horrorgeschichte 'Die Nacht' - Das Ende der Dunkelheit",
    meaning: "كتاب يتحدث عن اختفاء الظلام الطبيعي بسبب الإضاءة الصناعية",
    keywords: ["Nacht = ليل", "Dunkelheit = ظلام", "künstliches Licht = إضاءة صناعية"],
    simplified: "اختفاء الظلام الحقيقي بسبب الأضواء",
    imagine: "سماء مدينة مليئة بالأضواء ولا نجوم مرئية",
    correct: "b"
};

HELP_DATA["lesen1_exam8_q2"] = {
    text: "Fotos machen ist heute nicht schwer - Gelungene Einführung in die moderne Fotografie",
    meaning: "كتاب ممتاز لتعلم أساسيات التصوير الحديث",
    keywords: ["Fotografie = تصوير", "Ratgeber = دليل", "Basiswissen = معرفة أساسية"],
    simplified: "دليل ممتاز لتعلم التصوير من الصفر",
    imagine: "يد تمسك كاميرا وكتاب مفتوح بجانبها",
    correct: "i"
};

HELP_DATA["lesen1_exam8_q3"] = {
    text: "Bilder der Fotografin Annie Leibovitz sind - Bilder einer bedeutenden Künstlerin",
    meaning: "معرض لصور فنانة عالمية تصوير المشاهير وعائلتها",
    keywords: ["Annie Leibovitz = آني ليبوفيتز", "Ausstellung = معرض", "Portraits = صور شخصية"],
    simplified: "معرض صور لمشاهير وأسرة المصورة الشهيرة",
    imagine: "وجوه مشاهير كثيرة على جدران معرض فني",
    correct: "a"
};

HELP_DATA["lesen1_exam8_q4"] = {
    text: "Die Abkürzung TWAN klingt nach einem neuen Computerprogramm - Erde, Mond und Sterne",
    meaning: "صور مذهلة للنجوم والأرض لم يرها أحد من قبل",
    keywords: ["Sterne = نجوم", "Erde = أرض", "Mond = قمر", "Landschaften = مناظر طبيعية"],
    simplified: "صور رائعة للنجوم فوق مناظر الأرض",
    imagine: "سماء مليئة بالنجوم فوق جبل مغطى بالثلج",
    correct: "g"
};

HELP_DATA["lesen1_exam8_q5"] = {
    text: "Er gehörte zu den ganz Großen seines Fachs: Andreas Feininger - Die bemerkenswerte Karriere eines Fotografen",
    meaning: "قصة حياة مصور عالمي شهير بدأ كمهندس معماري",
    keywords: ["Andreas Feininger = أندرياس فاينينغر", "Fotograf = مصور", "Biografie = سيرة ذاتية"],
    simplified: "قصة نجاح مصور عالمي بدأ كمهندس",
    imagine: "مصور يحمل كاميرا وخلفه رسومات معمارية",
    correct: "c"
};

// ========== Exam 9: Grundschule (صحيح: 5,6,4,2,0) ==========
HELP_DATA["lesen1_exam9_q1"] = {
    text: "Berlin wird in 10 Jahren rund 5.000 Lehrkräfte weniger brauchen - Gewerkschaft erwartet Lehrermangel in Berlin",
    meaning: "نقابة المعلمين تتوقع نقصا حادا في المعلمين ببرلين",
    keywords: ["GEW = نقابة", "Lehrermangel = نقص معلمين", "Berlin = برلين", "Ruhestand = تقاعد"],
    simplified: "برلين تعاني نقصا كبيرا في المعلمين خلال 10 سنوات",
    imagine: "فصل دراسي مكتظ ومعلم واحد يقف أمامه",
    correct: "f"
};

HELP_DATA["lesen1_exam9_q2"] = {
    text: "Wer sich in Berlin um eine Stelle als Lehrer bewirbt - GEW befürchtet Abwanderung von gut ausgebildeten Lehrkräften",
    meaning: "نقابة المعلمين تخاف هجرة المعلمين الجيدين من برلين",
    keywords: ["Abwanderung = هجرة", "Lehrkräfte = معلمين", "Berlin = برلين", "Hamburg = هامبورغ"],
    simplified: "معلمون جيدون يغادرون برلين إلى مدن أخرى",
    imagine: "معلم يحمل حقيبته ويصعد قطارا خارجا من برلين",
    correct: "g"
};

HELP_DATA["lesen1_exam9_q3"] = {
    text: "Eltern klagen über Stundenausfall - Experten befürchten zunehmenden Lehrermangel in Deutschland",
    meaning: "خبراء يخافون من نقص كبير في المعلمين بألمانيا",
    keywords: ["Lehrermangel = نقص معلمين", "Deutschland = ألمانيا", "Pensionierung = تقاعد"],
    simplified: "نقص في المعلمين بألمانيا يصل 400 ألف خلال 15 سنة",
    imagine: "فصل دراسي بدون معلم والطلاب يلعبون",
    correct: "e"
};

HELP_DATA["lesen1_exam9_q4"] = {
    text: "Bildungspolitiker und Lehrervertreter wollen - Bildungsforscher: Lehrermangel wird in Deutschland nicht eintreten",
    meaning: "باحثون يقولون لن يكون هناك نقص في المعلمين",
    keywords: ["Bildungsforscher = باحثون تعليم", "ausgeglichene Bilanz = ميزان متوازن", "Lehrermangel = نقص معلمين"],
    simplified: "باحثون يتوقعون توازنا بين المعلمين والحاجة",
    imagine: "ميزان متساو بين معلمين وطلاب",
    correct: "c"
};

HELP_DATA["lesen1_exam9_q5"] = {
    text: "Mädchen haben tendenziell bessere Noten - An deutschen Grundschulen sind männliche Lehrkräfte selten",
    meaning: "المعلمون الرجال نادرون في المدارس الابتدائية الألمانية",
    keywords: ["Grundschulen = مدارس ابتدائية", "männliche Lehrkräfte = معلمين رجال", "Frauenanteil = نسبة نساء"],
    simplified: "قلة الرجال في تدريس المرحلة الابتدائية",
    imagine: "معلمة واحدة بين طلابها ولا يوجد معلم رجال بالمدرسة",
    correct: "a"
};

// ========== Exam 10: Österreich - Naschmarkt (صحيح: 3,5,9,4,0) ==========
HELP_DATA["lesen1_exam10_q1"] = {
    text: "Das Lesemagazin MENU hat eine Umfrage - Österreichs beliebteste Marktplätze",
    meaning: "أكثر أسواق النمسا شعبية حسب استطلاع",
    keywords: ["Märkte = أسواق", "Österreich = نمسا", "Umfrage = استطلاع", "populär = شعبي"],
    simplified: "أشهر أسواق النمسا بناء على تصويت القراء",
    imagine: "لافتات كبيرة لأسماء أسواق ونجوم بجانبها",
    correct: "d"
};

HELP_DATA["lesen1_exam10_q2"] = {
    text: "Sie sind der Meinung, dass Ihre Qualifikationen ausreichen - Schulung zum Erfolg im Beruf",
    meaning: "دورات لتطوير مهارات التسويق الذاتي للنجاح المهني",
    keywords: ["Selbstmarketing = تسويق ذاتي", "Karriere = مهنة", "Bewerbung = طلب وظيفة"],
    simplified: "دورات لتعلم كيف تسوق نفسك في العمل",
    imagine: "شخص يرفع لافتة عليها صورته وعبارة وظفوني",
    correct: "f"
};

HELP_DATA["lesen1_exam10_q3"] = {
    text: "Der Wiener Naschmarkt gehört zu Österreichs beliebtesten Märkten - Wissenswertes über Wiens größten innerstädtischen Markt",
    meaning: "معلومات مهمة عن أكبر سوق داخلي في فيينا",
    keywords: ["Naschmarkt = سوق ناش", "Wien = فيينا", "größter Markt = أكبر سوق", "Sehenswürdigkeit = معلم سياحي"],
    simplified: "كل ما تريد معرفته عن سوق ناش في فيينا",
    imagine: "سوق كبير مليء بأكشاك الفواكه والخضروات",
    correct: "j"
};

HELP_DATA["lesen1_exam10_q4"] = {
    text: "Wer bloggt, zeigt neben Fachkompetenz auch Kreativität - Schreiben im Internet für die Karriere",
    meaning: "كتابة المدونات على الإنترنت تساعد في الحصول على وظيفة",
    keywords: ["bloggt = يدون", "Kreativität = إبداع", "Bewerbung = تقديم وظيفة", "Karriere = مهنة"],
    simplified: "كتابة المدونات تعزز فرصك في العمل",
    imagine: "شاب يكتب على حاسوبه وحوله عروض عمل تطير",
    correct: "e"
};

HELP_DATA["lesen1_exam10_q5"] = {
    text: "Bis Herbst soll ein neues Marktkonzept für den altehrwürdigen Salzburger Grünmarkt - Erlebnisrundgang für einen alten Markt",
    meaning: "جولة ترفيهية في سوق سالزبورغ القديم بعد تجديده",
    keywords: ["Salzburger Grünmarkt = سوق سالزبورغ", "Marktkonzept = مفهوم سوق", "nachhaltig = مستدام"],
    simplified: "جولة سياحية في سوق سالزبورغ القديم المتجدد",
    imagine: "سائح يتجول في سوق ينظف ويضاحك الباعة",
    correct: "a"
};

// ============================================
// Lesen Teil 1 - Exams 11-20 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 11: Insekten (صحيح: 2,7,1,4,8) ==========
HELP_DATA["lesen1_exam11_q1"] = {
    text: "Die anhaltenden Temperaturen haben in Südfrankreich - Landwirte wollen Gift gegen schädliche Insekten",
    meaning: "مزارعون يريدون استخدام السموم لمكافحة الجراد الضار",
    keywords: ["Heuschrecken = جراد", "Landwirte = مزارعون", "Gift = سم", "Ernte = محصول"],
    simplified: "مزارعون يريدون رش السم لقتل الجراد",
    imagine: "مزارع يرش مبيدا وحشرات تموت حوله",
    correct: "c"
};

HELP_DATA["lesen1_exam11_q2"] = {
    text: "Für immer wird eine der größten Umweltkatastrophen - Rückblick: Fischsterben im Rhein",
    meaning: "كارثة بيئية كبرى عام 1986 تسببت بنفوق الأسماك في نهر الراين",
    keywords: ["Rhein = راين", "Fischsterben = نفوق أسماك", "Sandoz = ساندوز", "Pestizide = مبيدات"],
    simplified: "تلوث نهر الراين عام 1986 قتل الأسماك",
    imagine: "أسماك ميتة تطفو على سطح نهر كبير",
    correct: "h"
};

HELP_DATA["lesen1_exam11_q3"] = {
    text: "Der Klimawandel bringt es mit sich - Kleine Plagegeister können Krankheiten bringen",
    meaning: "حشرات صغيرة تحمل أمراضا جديدة إلى ألمانيا بسبب تغير المناخ",
    keywords: ["Stechmücken = بعوض", "Krankheiten = أمراض", "Klimawandel = تغير مناخ", "Infektionserreger = مسببات عدوى"],
    simplified: "البعوض الاستوائي ينقل أمراضا جديدة لألمانيا",
    imagine: "بعوضة تحمل علامة خطر على جناحيها",
    correct: "b"
};

HELP_DATA["lesen1_exam11_q4"] = {
    text: "Forscher haben bei Versuchen im Bronx Zoo - Neue Studie: Nicht nur Affen ودelfine erkennen sich selbst",
    meaning: "الفيلة تستطيع التعرف على نفسها في المرآة مثل القرود والدلافين",
    keywords: ["Elefanten = فيلة", "Spiegel = مرآة", "erkennen = يتعرف", "Selbst = نفس"],
    simplified: "الفيلة تتعرف على صورتها في المرآة",
    imagine: "فيل ينظر إلى مرآة ويلمس علامة على رأسه",
    correct: "e"
};

HELP_DATA["lesen1_exam11_q5"] = {
    text: "Heute und morgen tagt in Göteborg - Um die Zukunft der Nordsee ist es schlecht bestellt",
    meaning: "مستقبل بحر الشمال مهدد حسب منظمة WWF",
    keywords: ["Nordsee = بحر الشمال", "WWF = صندوق العالمي للطبيعة", "ökologische Belange = شؤون بيئية", "vernachlässigt = مهملة"],
    simplified: "منظمة البيئة تحذر من إهمال بحر الشمال",
    imagine: "سمكة تبكي وخلفها أبنية صناعية",
    correct: "i"
};

// ========== Exam 12: Insekten (التعديل 1) (صحيح: 8,7,1,4,2) ==========
HELP_DATA["lesen1_exam12_q1"] = {
    text: "Heute und morgen tagt in Göteborg - Um die Zukunft der Nordsee ist es schlecht bestellt",
    meaning: "منظمة WWF تخاف على مستقبل بحر الشمال",
    keywords: ["Nordsee = بحر الشمال", "WWF = صندوق الطبيعة", "ökologische Belange = قضايا بيئية", "vernachlässigt = مهملة"],
    simplified: "المنظمة البيئية قلقة على بحر الشمال",
    imagine: "خريطة بحر الشمال وعليها علامات حمراء",
    correct: "i"
};

HELP_DATA["lesen1_exam12_q2"] = {
    text: "Für immer wird eine der größten Umweltkatastrophen - Rückblick: Fischsterben im Rhein",
    meaning: "كارثة ساندوز عام 1986 قتلت أسماك الراين",
    keywords: ["Rhein = راين", "Fischsterben = نفوق أسماك", "Sandoz = ساندوز", "Gift = سم"],
    simplified: "تلوث الراين عام 1986 قتل كميات هائلة من الأسماك",
    imagine: "نهر مظلم وأسماك ميتة على ضفافه",
    correct: "h"
};

HELP_DATA["lesen1_exam12_q3"] = {
    text: "Der Klimawandel bringt es mit sich - Kleine Insekten können Krankheiten bringen",
    meaning: "حشرات صغيرة تحمل أمراضا خطيرة إلى ألمانيا",
    keywords: ["Stechmücken = بعوض", "Krankheiten = أمراض", "Klimawandel = تغير مناخ", "exotisch = استوائي"],
    simplified: "البعوض الاستوائي ينقل أمراضا جديدة",
    imagine: "يد تحاول طرد بعوضة صغيرة ولكنها تهرب",
    correct: "b"
};

HELP_DATA["lesen1_exam12_q4"] = {
    text: "Forscher haben bei Versuchen im Bronx Zoo - Neue Studie: Nicht nur Ameisen und Bienen erkennen sich selbst",
    meaning: "الفيلة تتعرف على نفسها في المرآة مثل القرود",
    keywords: ["Elefanten = فيلة", "Spiegel = مرآة", "erkennen = يتعرف", "Experte = خبير"],
    simplified: "الفيلة تكتشف صورتها في المرآة",
    imagine: "فيل صغير يلمس أنفه أمام مرآة كبيرة",
    correct: "e"
};

HELP_DATA["lesen1_exam12_q5"] = {
    text: "Die anhaltenden Temperaturen in Südfrankreich - Bauern sind gezwungen Gift gegen schädliche Insekten",
    meaning: "المزارعون مضطرون لاستخدام السموم ضد الجراد",
    keywords: ["Heuschrecken = جراد", "Landwirte = مزارعون", "Gift = سم", "Ernte = محصول"],
    simplified: "المزارعون يضطرون لاستخدام المبيدات بسبب الجراد",
    imagine: "جرار يرش السم وحشرات تموت سريعا",
    correct: "c"
};

// ========== Exam 13: das Benzin (صحيح: 8,1,2,3,4) ==========
HELP_DATA["lesen1_exam13_q1"] = {
    text: "Aussteigen, tanken, wegfahren - Steigende Spritpreise: die Tricks der Autofahrer",
    meaning: "السائقون يلجؤون لطرق ملتوية لتوفير البنزين",
    keywords: ["Benzinpreise = أسعار بنزين", "Tankstelle = محطة وقود", "Diebstahl = سرقة", "Sparen = توفير"],
    simplified: "أساليب السائقين في توفير البنزين الغالي",
    imagine: "سيارة تتوقف عند محطة وسائق يسرق الوقود",
    correct: "i"
};

HELP_DATA["lesen1_exam13_q2"] = {
    text: "Viele Autofahrer sind so aufgeregt - Die wichtigsten Erste-Hilfe-Ratschläge",
    meaning: "أهم نصائح الإسعافات الأولية بعد حادث سيارة",
    keywords: ["Unfall = حادث", "Erste-Hilfe = إسعافات أولية", "Ratschläge = نصائح", "Polizei = شرطة"],
    simplified: "إرشادات أساسية للإسعاف الأولي على الطريق",
    imagine: "رجل يضع مثلث التحذير خلف سيارته",
    correct: "b"
};

HELP_DATA["lesen1_exam13_q3"] = {
    text: "Hast du schon mal mit dem Gedanken gespielt - Einmal die Welt als Ganzes sehen",
    meaning: "طيارتان تتحدث عن حلمها برؤية العالم من الأعلى",
    keywords: ["Pilotin = طيارة", "Fliegerei = طيران", "Welt = عالم", "Perspektive = منظور"],
    simplified: "حلم رؤية العالم من منظور الطيور",
    imagine: "امرأة تقود طائرة وتنظر من النافذة إلى السحاب",
    correct: "c"
};

HELP_DATA["lesen1_exam13_q4"] = {
    text: "Der Schweizer Louis Palmer - Einmal um die Welt ohne einen Tropfen Benzin",
    meaning: "رحلة حول العالم بسيارة شمسية بدون قطرة بنزين",
    keywords: ["Solartaxi = سيارة أجرة شمسية", "Weltumrundung = حول العالم", "Benzin = بنزين", "Solarzellen = خلايا شمسية"],
    simplified: "سيارة تعمل بالطاقة الشمسية تدور حول العالم",
    imagine: "سيارة غريبة عليها ألواح شمسية تسير تحت الشمس",
    correct: "d"
};

HELP_DATA["lesen1_exam13_q5"] = {
    text: "Die Bundesregierung und ihre Spitzenbeamten - Fliegen statt fahren",
    meaning: "المسؤولون يفضلون الطيران على القطار حتى للرحلات الداخلية",
    keywords: ["Flugreisen = رحلات طيران", "Inlandsreisen = رحلات داخلية", "Bahn = قطار", "Kanzleramt = مستشارية"],
    simplified: "المسؤولون يختارون الطائرة بدل القطار داخل ألمانيا",
    imagine: "سياسي يصعد طائرة وقطار يمر أسفل منه حزينا",
    correct: "e"
};

// ========== Exam 14: Kaffee (صحيح: 9,1,7,0,5) ==========
HELP_DATA["lesen1_exam14_q1"] = {
    text: "Das erste Kaffeehaus in Leipzig - Ohne Kaffee geht hier nichts",
    meaning: "الساكسونيون لا يستغنون عن القهوة في حياتهم اليومية",
    keywords: ["Kaffee = قهوة", "Sachsen = ساكسونيا", "Getränk = مشروب", "Aroma = نكهة"],
    simplified: "شعب ساكسونيا لا يستغني عن القهوة الساخنة الحلوة",
    imagine: "قدح قهوة ساخن وكعكة تغمس فيه",
    correct: "j"
};

HELP_DATA["lesen1_exam14_q2"] = {
    text: "Eppingen liegt etwa auf halbem Weg - Attraktive Kleinstadt – touristischer Geheimtipp",
    meaning: "مدينة صغيرة جميلة وجهة سياحية غير معروفة كثيرا",
    keywords: ["Eppingen = إبينغن", "Altstadt = مدينة قديمة", "Museum = متحف", "Touristen = سياح"],
    simplified: "بلدة صغيرة جميلة ينصح بها السياحة",
    imagine: "بيوت خشبية قديمة وأزقة ضيقة بلا سياح",
    correct: "b"
};

HELP_DATA["lesen1_exam14_q3"] = {
    text: "Das Kloster Maulbronn wurde 1147 - Klösterliche Strenge für berühmte Schüler",
    meaning: "مدرسة داخلية قاسية تخرج منها مشاهير مثل هيرمان هيسه",
    keywords: ["Kloster Maulbronn = دير مولبرون", "Internat = مدرسة داخلية", "Hermann Hesse = هيرمان هيسه", "Disziplin = انضباط"],
    simplified: "مدرسة داخلية صارمة تخريج مشاهير الأدب",
    imagine: "طالب يجلس على مكتب بخشونة والراهب يراقبه",
    correct: "h"
};

HELP_DATA["lesen1_exam14_q4"] = {
    text: "Auf einer Anhöhe oberhalb des Bodensees - Altes Handwerk und alte Technik anschaulich präsentiert",
    meaning: "متحف يعرض الحرف والآلات القديمة بوضوح",
    keywords: ["Museum = متحف", "Feuerwehrmuseum = متحف إطفاء", "Weinbaumuseum = متحف خمر", "alte Geräte = آلات قديمة"],
    simplified: "متحف يشرح الحرف والتقنيات القديمة",
    imagine: "عربة إطفاء تجرها الخيول في قاعة متحف",
    correct: "a"
};

HELP_DATA["lesen1_exam14_q5"] = {
    text: "Vermutlich vor fast 900 Jahren - Entdeckung und Verbreitung des Kaffees",
    meaning: "قصة اكتشاف البن وانتشاره في العالم",
    keywords: ["Kaffee = قهوة", "Ziegenhirt = راعي ماعز", "Entdeckung = اكتشاف", "Legende = أسطورة"],
    simplified: "قصة اكتشاف البن وتجفيفه وغليه",
    imagine: "راعي ماعز يراقب ماعزه وهي تأكل حبوبا حمراء",
    correct: "f"
};

// ========== Exam 15: Programmierer (صحيح: 3,5,6,8,9) ==========
HELP_DATA["lesen1_exam15_q1"] = {
    text: "Martina Lux hat ein Hobby - Förderwochenende für junge Softwareentwickler",
    meaning: "نهاية أسبوع تدريبية لمطوري برمجيات صغار",
    keywords: ["programmiert = تبرمج", "Workshop = ورشة", "Jugend programmiert = شباب يبرمجون", "Informatiker = علماء حاسوب"],
    simplified: "ورشة تدريبية لصغار مبرمجي البرمجيات",
    imagine: "شاب يكتب كودا على حاسوبه ورفاقه بجانبه",
    correct: "d"
};

HELP_DATA["lesen1_exam15_q2"] = {
    text: "Jugend forscht ist ein bundesweiter Nachwuchswettbewerb - Spannende Gewinne für wissenschaftliche Nachwuchstalente",
    meaning: "جوائز مثيرة لمواهب علمية شابة من بينها رحلة لحفل نوبل",
    keywords: ["Jugend forscht = شباب يبحثون", "Preise = جوائز", "Studienreisen = رحلات دراسية", "Nobelpreis = جائزة نوبل"],
    simplified: "جوائز مشوقة للعباقرة الصغار في مسابقة علمية",
    imagine: "فتاة تقف على منصة وتستلم كأسا ذهبيا",
    correct: "f"
};

HELP_DATA["lesen1_exam15_q3"] = {
    text: "Die Industriellenvereinigung beklagt - Mehr Bemühungen um weiblichen Nachwuchs gefordert",
    meaning: "دعوات لتشجيع الفتيات على دراسة التخصصات التقنية",
    keywords: ["Fachkräftemangel = نقص كفاءات", "Mädchen = بنات", "technische Berufe = مهن تقنية", "Vorbilder = قدوات"],
    simplified: "مطالبات بجذب المزيد من الفتيات للهندسة",
    imagine: "مهندسة تشرح لفتاة كيفية عمل آلة",
    correct: "g"
};

HELP_DATA["lesen1_exam15_q4"] = {
    text: "Im Kulturzentrum war gestern Abend Tobias Meyer - Berufswahl: Jugendliche werden stark von ihrem Umfeld geprägt",
    meaning: "اختيار المهنة يتأثر بشدة بالبيئة الاجتماعية المحيطة بالشاب",
    keywords: ["Berufsorientierung = توجيه مهني", "soziale Umgebung = بيئة اجتماعية", "Vorbilder = قدوات", "Persönlichkeitsentwicklung = تطوير شخصية"],
    simplified: "البيئة المحيطة تؤثر بشدة على اختيار الشاب لمهنته",
    imagine: "شاب ينظر لوالده الطبيب ويحلم أن يصبح مثله",
    correct: "i"
};

HELP_DATA["lesen1_exam15_q5"] = {
    text: "Wie eine repräsentative Umfrage unter Studenten - Studienabsolventen technischer Fächer sehen ihre Zukunft meist in der Autoindustrie",
    meaning: "خريجو التقنية يرون مستقبلهم في صناعة السيارات",
    keywords: ["Automobilindustrie = صناعة سيارات", "Studenten = طلاب", "Ingenieure = مهندسين", "Arbeitgeber = أرباب عمل"],
    simplified: "خريجو الهندسة يفضلون العمل بشركات السيارات",
    imagine: "مهندس يقف بجانب سيارة حديثة ويبتسم",
    correct: "j"
};

// ========== Exam 16: Programmierer (التعديل 1) (صحيح: 3,7,6,1,8) ==========
HELP_DATA["lesen1_exam16_q1"] = {
    text: "Martina Lux hat ein Hobby - Förderwochenende für junge Softwareentwickler",
    meaning: "ورشة برمجة نهاية أسبوع للشباب",
    keywords: ["programmiert = تبرمج", "Workshop = ورشة", "Jugend programmiert = شباب يبرمجون"],
    simplified: "نهاية أسبوع لتعليم البرمجة للصغار",
    imagine: "صبي يشير إلى شاشة ويعرض كوده لصديقه",
    correct: "d"
};

HELP_DATA["lesen1_exam16_q2"] = {
    text: "Jugend forscht ist ein bundesweiter Nachwuchswettbewerb - Spannende Gewinne für wissenschaftliche Nachwuchstalente",
    meaning: "جوائز مذهلة للعباقرة الصغار",
    keywords: ["Jugend forscht = شباب يبحثون", "Preise = جوائز", "Nobelpreis = جائزة نوبل", "Sonderpreise = جوائز خاصة"],
    simplified: "رحلات وجوائز لأذكى الشباب في العلوم",
    imagine: "شاب يحمل تذكرة سفر إلى ستوكهولم",
    correct: "h"
};

HELP_DATA["lesen1_exam16_q3"] = {
    text: "Die Industriellenvereinigung beklagt - Mehr Bemühungen um weiblichen Nachwuchs gefordert",
    meaning: "دعوات لزيادة جهود جذب الفتيات للتقنية",
    keywords: ["Fachkräftemangel = نقص كفاءات", "Mädchen = بنات", "technische Berufe = مهن تقنية"],
    simplified: "حملات لتشجيع الفتيات على دراسة الهندسة",
    imagine: "مدرسة تشرح للطالبات آلية محرك سيارة",
    correct: "g"
};

HELP_DATA["lesen1_exam16_q4"] = {
    text: "Im Kulturzentrum war gestern Abend Tobias Meyer - Berufswahl: Jugendliche werden stark von ihrem gesellschaftlichen Umfeld geprägt",
    meaning: "البيئة الاجتماعية تؤثر بقوة على اختيار المهنة",
    keywords: ["Berufsorientierung = توجيه مهني", "soziale Umgebung = بيئة اجتماعية", "Persönlichkeitsentwicklung = تطوير شخصية"],
    simplified: "مجتمع الشاب يحدد مساره المهني",
    imagine: "شاب ينظر لأصدقائه وهم يعملون بمهنة واحدة",
    correct: "b"
};

HELP_DATA["lesen1_exam16_q5"] = {
    text: "Wie eine repräsentative Umfrage unter Studenten - Studienabsolventen technischer Fächer sehen ihre Zukunft meist in der Fahrzeugbranche",
    meaning: "خريجو التقنية يفضلون العمل بصناعة السيارات",
    keywords: ["Automobilindustrie = صناعة سيارات", "Studenten = طلاب", "Arbeitgeber = أرباب عمل"],
    simplified: "مهندسو المستقبل يريدون العمل بصناعة السيارات",
    imagine: "شاب يقف أمام معرض سيارات ويحلم بالعمل هناك",
    correct: "i"
};

// ========== Exam 17: Programmierer (التعديل 2) (صحيح: 6,2,3,8,1) ==========
HELP_DATA["lesen1_exam17_q1"] = {
    text: "Martina Lux hat ein Hobby - Förderwochenende für junge Softwareentwickler",
    meaning: "ورشة لصغار مبرمجي البرمجيات",
    keywords: ["Workshop = ورشة", "Programmierer = مبرمجين", "Berlin = برلين"],
    simplified: "دورة تدريبية في البرمجة للشباب",
    imagine: "طالبة تكتب كودا على حاسوبها المحمول",
    correct: "g"
};

HELP_DATA["lesen1_exam17_q2"] = {
    text: "Jugend forscht ist ein bundesweiter Nachwuchswettbewerb - Spannende Gewinne für wissenschaftliche Nachwuchstalente",
    meaning: "جوائز قيمة للشباب العبقري",
    keywords: ["Preise = جوائز", "Studienreisen = رحلات", "Nobelpreis = نوبل"],
    simplified: "رحلات علمية للمتميزين في مسابقة البحث العلمي",
    imagine: "تلميذ يقف على منصة التتويج",
    correct: "c"
};

HELP_DATA["lesen1_exam17_q3"] = {
    text: "Die Industriellenvereinigung beklagt - Mehr Bemühungen um weiblichen Nachwuchs gefordert",
    meaning: "جهود مطلوبة لجذب الفتيات للتخصصات التقنية",
    keywords: ["Fachkräftemangel = نقص كفاءات", "Mädchen = بنات", "technische Berufe = مهن تقنية"],
    simplified: "حملات لجذب النساء للهندسة والعلوم",
    imagine: "مهندسة تشرح لطالبات كيفية استخدام جهاز",
    correct: "d"
};

HELP_DATA["lesen1_exam17_q4"] = {
    text: "Im Kulturzentrum war gestern Abend Tobias Meyer - Berufswahl: Jugendliche werden stark von ihrem gesellschaftlichen Umfeld geprägt",
    meaning: "المهنة التي يختارها الشاب تتأثر بمحيطه",
    keywords: ["Berufsorientierung = توجيه مهني", "soziale Umgebung = بيئة اجتماعية", "Vorbilder = قدوات"],
    simplified: "صورة المجتمع تحدد مهنة الشاب",
    imagine: "شاب يقلد أباه في نفس المهنة",
    correct: "i"
};

HELP_DATA["lesen1_exam17_q5"] = {
    text: "Wie eine repräsentative Umfrage unter Studenten - Studienabsolventen technischer Fächer sehen ihre Zukunft meist in der Fahrzeugbranche",
    meaning: "خريجو الهندسة يفضلون العمل بشركات السيارات",
    keywords: ["Automobilindustrie = صناعة سيارات", "Studenten = طلاب", "Arbeitgeber = أرباب عمل"],
    simplified: "مهندسو المستقبل يفضلون العمل بالسيارات",
    imagine: "خريج يقف أمام شعار شركة سيارات",
    correct: "b"
};

// ========== Exam 18: Trampolin (صحيح: 8,5,4,9,1) ==========
HELP_DATA["lesen1_exam18_q1"] = {
    text: "Die meisten Menschen verbinden Barrierefreiheit - Informationen leichter verstehen",
    meaning: "خدمة إخبارية بلغة بسيطة وسهلة الفهم",
    keywords: ["leichter Sprache = لغة سهلة", "Nachrichtendienst = خدمة إخبارية", "A2 وB1 = مستويان لغويان"],
    simplified: "أخبار بلغة مبسطة وسهلة الفهم للجميع",
    imagine: "صحيفة مكتوب عليها عناوين كبيرة بسيطة ليفهمها الكل",
    correct: "i"
};

HELP_DATA["lesen1_exam18_q2"] = {
    text: "Die WHO warnt vor ungesunder Werbung im Internet - Medienkonsum fördert ungesunde Lebensweise",
    meaning: "استخدام وسائل الإعلام يعزز أنماط الحياة غير الصحية",
    keywords: ["WHO = منظمة صحة عالمية", "ungesunde Lebensmittel = أطعمة غير صحية", "Übergewicht = سمنة", "Bewegungsmangel = قلة حركة"],
    simplified: "الإعلانات في الإنترنت تشجع على العادات السيئة",
    imagine: "طفل يأكل حلوى وينظر إلى شاشة هاتفه وهو جالس",
    correct: "f"
};

HELP_DATA["lesen1_exam18_q3"] = {
    text: "Schüler sollen im Schulunterricht den Umgang mit Nachrichten lernen - Mit Nachrichten im Unterricht arbeiten",
    meaning: "استخدام الأخبار في التعليم المدرسي",
    keywords: ["Schüler = تلاميذ", "Nachrichten = أخبار", "Unterricht = درس", "kritischen Umgang = تعامل نقدي"],
    simplified: "تدريس الطلاب كيفية تحليل الأخبار بالمدرسة",
    imagine: "معلم وطلاب أمام شاشة تلفاز يناقشون نشرة أخبار",
    correct: "e"
};

HELP_DATA["lesen1_exam18_q4"] = {
    text: "Mit dem Trampolin den Körper in Schwung bringen - Fachleute warnen vor unsachgemäßer Nutzung von Trampolinen",
    meaning: "خبراء يحذرون من الاستخدام الخاطئ للترامبولين",
    keywords: ["Trampolin = ترامبولين", "Unfallgefahr = خطر حوادث", "Sicherheitsregeln = قواعد أمان", "Orthopäden = أطباء عظام"],
    simplified: "تحذيرات من إصابات الترامبولين بسبب الاستخدام السيئ",
    imagine: "طفل يسقط من على الترامبولين ويده تؤلمه",
    correct: "j"
};

HELP_DATA["lesen1_exam18_q5"] = {
    text: "Die Klage, dass Jugendliche kein Interesse mehr an Nachrichten haben - Traditionelle Nachrichtenmedien immer noch gefragt",
    meaning: "وسائل الإعلام التقليدية لا تزال مطلوبة عند الشباب",
    keywords: ["Nachrichten = أخبار", "Jugendliche = شباب", "klassischen Medien = وسائل تقليدية", "glaubwürdig = موثوقة"],
    simplified: "الشباب يفضلون الأخبار التقليدية وتثق بها",
    imagine: "شاب يقرأ جريدة ورقية ويبتسم",
    correct: "b"
};

// ========== Exam 19: Bonbons (صحيح: 7,4,8,2,1) ==========
HELP_DATA["lesen1_exam19_q1"] = {
    text: "Bonbons machen Kinder glücklich - Süßwaren mit langer Tradition",
    meaning: "حلويات السكاكر لها تاريخ طويل يمتد لأكثر من 1000 عام",
    keywords: ["Bonbons = سكاكر", "Museum = متحف", "Tradition = تقليد", "Zuckerwarenfabrik = مصنع سكاكر"],
    simplified: "تاريخ طويل لصناعة الحلويات والسكاكر الألمانية",
    imagine: "قطعة حلوى قديمة داخل علبة زجاجية في متحف",
    correct: "h"
};

HELP_DATA["lesen1_exam19_q2"] = {
    text: "Am Frankfurter Hauptbahnhof können Reisende - Naschen statt wegwerfen",
    meaning: "أكل الحلويات بدلا من رميها في القمامة",
    keywords: ["Retomat = آلة بيع عكسية", "abgelaufene Produkte = منتجات منتهية الصلاحية", "kürzer vor Ablauf = قريبة من الانتهاء"],
    simplified: "آلة لبيع الحلويات قريبة من صلاحيتها بدل إتلافها",
    imagine: "آلة بيع صفراء كبيرة تحوي شوكولاتة وسناكس بأسعار منخفضة",
    correct: "e"
};

HELP_DATA["lesen1_exam19_q3"] = {
    text: "Mehrere Badebecken sowie Räume - Wasser, Wärme, Wellness – antike Badefreuden",
    meaning: "متعة الاستحمام بالماء الدافئ والعناية بالجسم عند الرومان القدماء",
    keywords: ["Therme = حمامات حارة", "römische Badekultur = ثقافة الاستحمام الرومانية", "Wellness = عناية بالجسم", "antik = قديم"],
    simplified: "الرومان القدماء عرفوا متعة الحمام الدافئ والاسترخاء",
    imagine: "روماني يجلس في حوض ماء ساخن ويأكل العنب",
    correct: "i"
};

HELP_DATA["lesen1_exam19_q4"] = {
    text: "Nicht nur in Hollywoodfilmen tröstet man sich - Irrtum: Süßes macht doch nicht glücklich",
    meaning: "الاعتقاد بأن السكر يحسن المزاج هو خطأ",
    keywords: ["Zucker = سكر", "Stimmung = مزاج", "Wissenschaftler = علماء", "Müdigkeit = تعب"],
    simplified: "دراسة علمية تثبت أن السكر لا يجعلك سعيدا",
    imagine: "شخص يأكل قطعة حلوى ثم ينام متعبا بدل النشاط",
    correct: "c"
};

HELP_DATA["lesen1_exam19_q5"] = {
    text: "Wellness und der Besuch von Kurorten - In der Stadt der warmen Quellen",
    meaning: "في مدينة بودابست مدينة الينابيع الساخنة",
    keywords: ["Thermalquellen = ينابيع حارة", "Budapest = بودابست", "Kurort = منتجع صحي", "Bäder = حمامات"],
    simplified: "بودابست مدينة الينابيع الساخنة والحمامات التاريخية",
    imagine: "شخص يسترخي في حمام بخار في حوض كبير قديم",
    correct: "b"
};

// ========== Exam 20: Umwelt (صحيح: 2,8,5,0,9) ==========
HELP_DATA["lesen1_exam20_q1"] = {
    text: "Sie sind eine gut funktionierende Gemeinschaft - Neue Besitzer für nicht mehr gebrauchte Gegenstände",
    meaning: "مبادرة تبادل الأشياء التي لا تستخدم بدلا من رميها",
    keywords: ["Tauschring = حلقة تبادل", "Gegenstände = أشياء", "tauschen = تبادل", "wegwerfen = رمي"],
    simplified: "نادي لتبادل الأشياء المستعملة وإعطائها حياة جديدة",
    imagine: "طاولة كبيرة عليها كتب وملابس وأجهزة صغيرة للتبادل",
    correct: "c"
};

HELP_DATA["lesen1_exam20_q2"] = {
    text: "Man gönnt sich ja sonst nichts - Volle Einkaufstüten machen nur kurze Zeit Freude",
    meaning: "فرحة الشراء تدوم لفترة قصيرة فقط سرعان ما تزول",
    keywords: ["Einkauf = شراء", "Glückshormone = هرمونات السعادة", "Kaufrausch = جنون الشراء", "Stresshormone = هرمونات التوتر"],
    simplified: "أكياس التسوق الممتلئة تسبب سعادة لحظية ثم ندامة",
    imagine: "امرأة تحمل أكياس تسوق كثيرة ثم تجلس متعبة حزينة",
    correct: "i"
};

HELP_DATA["lesen1_exam20_q3"] = {
    text: "Geklickt, gekauft, zurückgeschickt - Rücksendungen verringern: Händler hoffen على Lösungen",
    meaning: "التجار يبحثون عن حلول لتقليل عمليات إعادة البضائع المرتجعة",
    keywords: ["Rücksendungen = إرجاع", "Online-Handel = تجارة إلكترونية", "Retouren = مرتجعات", "Kosten = تكاليف"],
    simplified: "تجار الإنترنت يبحثون عن طرق لتقليل عدد المرتجعات",
    imagine: "طرد بريدي كبير بمقبض سهم يدور في حلقة",
    correct: "f"
};

HELP_DATA["lesen1_exam20_q4"] = {
    text: "Keine Lust mehr auf die Konsum-Gesellschaft - Gemeinsam kaputte Geräte retten",
    meaning: "مقاهي إصلاح حيث يتعلم الناس إصلاح أجهزتهم المعطلة",
    keywords: ["Repair-Cafés = مقاهي إصلاح", "defekte Gegenstände = أشياء معطلة", "instandsetzen = إصلاح", "Wegwerfmentalität = ثقافة الرمي"],
    simplified: "مجموعات تتعلم كيفية إصلاح الأجهزة بدل رميها",
    imagine: "ثلاثة أشخاص يجلسون حول مكنسة كهربائية قديمة يصلحونها",
    correct: "a"
};

HELP_DATA["lesen1_exam20_q5"] = {
    text: "Viele Menschen sind erstaunlich großzügig - Wer Engagement zeigt, steigert sein Glücksgefühl",
    meaning: "العطاء والكرم يزيدان شعور الإنسان بالسعادة",
    keywords: ["Großzügigkeit = كرم", "Glücksgefühl = شعور بالسعادة", "ehrenamtlich = تطوعي", "Belohnungszentrum = مركز المكافأة في المخ"],
    simplified: "الكرم والتطوع يجعلان الإنسان أكثر سعادة",
    imagine: "يد تضع نقودا في صندوق تبرعات وصاحبها يبتسم",
    correct: "j"
};

// ============================================
// Lesen Teil 1 - Exams 21-30 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 21: Licht (صحيح: 8,4,1,0,5) ==========
HELP_DATA["lesen1_exam21_q1"] = {
    text: "Heute machen die elektrische Beleuchtung - Was tun, wenn es Nacht wird? Lichtquellen vergangener Zeiten",
    meaning: "معرض عن كيفية إضاءة المنازل قديما قبل الكهرباء",
    keywords: ["Beleuchtung = إضاءة", "Museum = متحف", "Feuer = نار", "Kerzen = شموع"],
    simplified: "معرض يشرح طرق الإضاءة القديمة قبل الكهرباء",
    imagine: "شخص يوقد مصباح زيت في غرفة مظلمة",
    correct: "i"
};

HELP_DATA["lesen1_exam21_q2"] = {
    text: "Jahrelang zog es vor allem junge Berufstätige - Stadtbewohner entdecken das Landleben",
    meaning: "سكان المدن يكتشفون جمال الحياة الريفية",
    keywords: ["Landleben = حياة ريفية", "Stadtflucht = هروب من المدينة", "Mieten = إيجارات", "Ruhe = هدوء"],
    simplified: "سكان المدن يهاجرون إلى الريف بحثا عن الهدوء",
    imagine: "عائلة تحمل صناديق وتدخل منزلا ريفيا جميلا",
    correct: "e"
};

HELP_DATA["lesen1_exam21_q3"] = {
    text: "Satellitenbilder der Erde bei Nacht - Die Auswirkungen künstlichen Lichts",
    meaning: "آثار الإضاءة الصناعية السلبية على الإنسان والحيوان",
    keywords: ["Lichtverschmutzung = تلوث ضوئي", "Insekten = حشرات", "Schlaf = نوم", "Vögel = طيور"],
    simplified: "الأضواء الصناعية تؤذي الحشرات والطيور والإنسان",
    imagine: "سماء مدينة مضيئة جدا ولا نجوم مرئية",
    correct: "b"
};

HELP_DATA["lesen1_exam21_q4"] = {
    text: "Vor zehn Jahren lebten Dirk und Antje Sebens - Der Wald als neues Zuhause",
    meaning: "الغابة تصبح منزلا جديدا لعائلة تركت المدينة",
    keywords: ["Forsthaus = منزل حراجي", "Wald = غابة", "autark = مكتفي ذاتيا", "Solaranlage = طاقة شمسية"],
    simplified: "عائلة تعيش في الغابة وتعتمد على نفسها بالكهرباء",
    imagine: "منزل خشبي صغير بين الأشجار وألواح شمسية على سطحه",
    correct: "a"
};

HELP_DATA["lesen1_exam21_q5"] = {
    text: "Wer verbringt nicht gerne sein Wochenende fernab der Stadt - Stadtbewohner leben umweltfreundlicher",
    meaning: "سكان المدن يعيشون بطريقة أكثر صداقة للبيئة",
    keywords: ["Emissionen = انبعاثات", "Carsharing = مشاركة سيارة", "öffentlicher Nahverkehr = مواصلات عامة", "umweltfreundlich = صديق للبيئة"],
    simplified: "سكان المدن يلوثون البيئة أقل من سكان الريف",
    imagine: "سيارة واحدة تقل عدة أشخاص بدل سيارات كثيرة",
    correct: "f"
};

// ========== Exam 22: Licht (التعديل 1) (صحيح: 8,4,1,0,5) ==========
HELP_DATA["lesen1_exam22_q1"] = {
    text: "Heute machen die elektrische Beleuchtung - Was tun, wenn es Nacht wird? Lichtquellen vergangener Zeiten",
    meaning: "معرض عن وسائل الإضاءة في الماضي قبل اختراع الكهرباء",
    keywords: ["Ausstellung = معرض", "Lichtquellen = مصادر ضوء", "Feuer = نار", "Kerzen = شموع"],
    simplified: "معرض عن الإضاءة في الزمن القديم",
    imagine: "جد يشرح لحفيده كيف كانت تضاء البيوت قديما",
    correct: "i"
};

HELP_DATA["lesen1_exam22_q2"] = {
    text: "Jahrelang zog es vor allem junge Berufstätige - Stadtbewohner entdecken das Landleben",
    meaning: "سكان المدن ينتقلون للعيش في الريف",
    keywords: ["ländliche Regionen = مناطق ريفية", "Metropolen = مدن كبيرة", "Mieten = إيجارات", "Ruhe = هدوء"],
    simplified: "الناس يتركون المدن ويعودون إلى الريف",
    imagine: "زوجان يشربان القهوة في شرفة منزلهما الريفي",
    correct: "e"
};

HELP_DATA["lesen1_exam22_q3"] = {
    text: "Satellitenbilder der Erde bei Nacht - Die Auswirkungen künstlichen Lichts",
    meaning: "الآثار السلبية للإضاءة الصناعية على الكائنات الحية",
    keywords: ["Lichtverschmutzung = تلوث ضوئي", "Insekten = حشرات", "Vögel = طيور", "Schlaf = نوم"],
    simplified: "الإضاءة الليلية تؤذي الحشرات والطيور",
    imagine: "فراشة تطير نحو الضوء وتحترق",
    correct: "b"
};

HELP_DATA["lesen1_exam22_q4"] = {
    text: "Vor zehn Jahren lebten Dirk und Antje Seebens - Der Wald als neues Zuhause",
    meaning: "عائلة تشتري منزلا في الغابة وتعيش بعيدا عن المدينة",
    keywords: ["Wochenendhaus = منزل عطلة نهاية أسبوع", "Solaranlage = طاقة شمسية", "Brunnen = بئر"],
    simplified: "عائلة تعيش في الغابة وتعتمد على الشمس والماء",
    imagine: "امرأة تسقي حديقتها من ماء بئر قرب منزلها الخشبي",
    correct: "a"
};

HELP_DATA["lesen1_exam22_q5"] = {
    text: "Wer verbringt nicht gerne sein Wochenende fernab der Stadt - Stadtbewohner leben umweltfreundlicher",
    meaning: "سكان المدن أكثر صداقة للبيئة بسبب وسائل النقل المتاحة",
    keywords: ["Emissionen = انبعاثات", "Carsharing = مشاركة سيارة", "Home-Office = عمل منزل", "Pendler = متنقل"],
    simplified: "العيش في المدينة أفضل للبيئة من الريف",
    imagine: "شخص يركب دراجة في المدينة وآخر يقود سيارة وحده",
    correct: "f"
};

// ========== Exam 23: Kartoffel (صحيح: 3,6,1,7,8) ==========
HELP_DATA["lesen1_exam23_q1"] = {
    text: "Über zehntausend wissenschaftliche Studien - Gesundes Leben schützt vor Zivilisationskrankheiten",
    meaning: "الحياة الصحية تحمي من أمراض العصر مثل السرطان والجلطات",
    keywords: ["WHO = منظمة صحة عالمية", "Herzinfarkt = جلطة قلبية", "Krebs = سرطان", "gesünder leben = حياة أصح"],
    simplified: "عيش بصحة تحمي نفسك من الأمراض الخطيرة",
    imagine: "شخص يأكل تفاحة ويركب دراجة بجانب رجل مدخن مريض",
    correct: "c"
};

HELP_DATA["lesen1_exam23_q2"] = {
    text: "Am Mittelmeer und in Mexiko wächst die Aloe-Vera-Pflanze - Pflanzliche Kosmetik für gesunde Haut",
    meaning: "مستحضرات تجميل نباتية لعلاج البشرة والحروق",
    keywords: ["Aloe Vera = صبار", "Kosmetik = تجميل", "Haut = بشرة", "Sonnenbrand = حروق شمس"],
    simplified: "نبات الصبار يستخدم في الكريمات لعلاج البشرة",
    imagine: "امرأة تضع جل الصبار على ذراعها المحترقة من الشمس",
    correct: "g"
};

HELP_DATA["lesen1_exam23_q3"] = {
    text: "Eine der ältesten bekannten Gemüsesorten ist der Spargel - Ein schlankes Gemüse für schlanke Leute",
    meaning: "الهليون لا يزيد الوزن لأنه فقير بالسعرات الحرارية",
    keywords: ["Spargel = هليون", "dick macht = يزيد الوزن", "Energie = طاقة", "schlank = نحيف"],
    simplified: "الهليون خضار لا يسبب السمنة ويناسب الرشيقين",
    imagine: "شخص نحيف يأكل هليون ويزن نفسه بسعادة",
    correct: "b"
};

HELP_DATA["lesen1_exam23_q4"] = {
    text: "Schlank sein ist 'in' - Tolle Figur durch ausgewogene Ernährung",
    meaning: "الرشاقة والجسم المثالي يأتيان بتغذية متوازنة",
    keywords: ["Diät = حمية", "Fettburner = محرق دهون", "Nährstoffe = مغذيات", "ausgewogene Ernährung = تغذية متوازنة"],
    simplified: "تغذية متوازنة تعطيك جسما رائعا بدون حرمان",
    imagine: "طبق ملون يحتوي خضارا وفاكهة وسمكة",
    correct: "h"
};

HELP_DATA["lesen1_exam23_q5"] = {
    text: "Als typisch deutsch gilt sie - Von der Wildpflanze zum international geschätzten Nahrungsmittel",
    meaning: "البطاطس انتقلت من نبات بري إلى غذاء عالمي",
    keywords: ["Kartoffel = بطاطس", "Südamerika = أمريكا الجنوبية", "Europa = أوروبا", "Basislebensmittel = غذاء أساسي"],
    simplified: "قصة البطاطس من أمريكا الجنوبية إلى العالم كله",
    imagine: "بطاطس تسافر على متن سفينة شراعية",
    correct: "i"
};

// ========== Exam 24: Kartoffel (التعديل 1) (صحيح: 2,5,1,6,8) ==========
HELP_DATA["lesen1_exam24_q1"] = {
    text: "Über zehntausend wissenschaftliche Studien - Gesundes Leben schützt vor Zivilisationskrankheiten",
    meaning: "الحياة الصحية تقي من أمراض العصر الخطيرة",
    keywords: ["WHO = منظمة صحة عالمية", "Herzinfarkt = جلطة قلبية", "Krebs = سرطان", "Apfel = تفاحة"],
    simplified: "صحتك في يدك بتغييرات بسيطة يوميا",
    imagine: "تفاحة وركوب دراجة يقفان أمام باب المستشفى",
    correct: "c"
};

HELP_DATA["lesen1_exam24_q2"] = {
    text: "Am Mittelmeer und in Mexiko wächst die Aloe-Vera-Pflanze - Pflanzliche Stoffe für die Gesundheit der Haut",
    meaning: "مواد نباتية تعالج البشرة وتحافظ على صحتها",
    keywords: ["Aloe Vera = صبار", "Haut = بشرة", "Cremes = كريمات", "Sonnenbrand = حروق شمس"],
    simplified: "الصبار مفيد لعلاج البشرة والحروق",
    imagine: "يد تضع كريما أخضر على يد محترقة",
    correct: "f"
};

HELP_DATA["lesen1_exam24_q3"] = {
    text: "Eine der ältesten bekannten Gemüsesorten ist der Spargel - Ein schlankes Gemüse für schlanke Leute",
    meaning: "الهليون خضار مناسب للرشاقة لفقره بالسعرات",
    keywords: ["Spargel = هليون", "schlank = نحيف", "Energie = طاقة", "dick macht = يزيد الوزن"],
    simplified: "من يأكل الهليون لا يزيد وزنه",
    imagine: "شخص نحيل يأكل الهليون أمام شخص بدين يأكل برغر",
    correct: "b"
};

HELP_DATA["lesen1_exam24_q4"] = {
    text: "Schlank sein ist 'in' - Tolle Figur durch ausgewogene Ernährung",
    meaning: "الجسم الرشيق بالتغذية المتوازنة لا بالحرمان",
    keywords: ["abnehmen = تخسيس", "Diät = حمية", "Fettburner = محرق دهون", "Nahrungsmittel = أطعمة"],
    simplified: "الوصول لوزن مثالي بأكل صحي وليس بتجويع النفس",
    imagine: "ميزان وطبق فواكه خضراوات يرفع ذراعه",
    correct: "g"
};

HELP_DATA["lesen1_exam24_q5"] = {
    text: "Als typisch deutsch gilt sie - Von der Wildpflanze zum international geschätzten Nahrungsmittel",
    meaning: "البطاطس من نبات بري في أمريكا إلى طعام عالمي",
    keywords: ["Kartoffel = بطاطس", "Südamerika = أمريكا الجنوبية", "Europa = أوروبا", "Sir Francis Drake = مستكشف"],
    simplified: "رحلة البطاطس من جبال الأنديز إلى مطابخ العالم",
    imagine: "خريطة وسهم من أمريكا الجنوبية إلى أوروبا وفوقه بطاطس",
    correct: "i"
};

// ========== Exam 25: Bienen (صحيح: 1,3,5,2,8) ==========
HELP_DATA["lesen1_exam25_q1"] = {
    text: "Kaffee verleiht neuen Schwung - Genussmittel erhöht die Wahrnehmung bestimmter Wörter",
    meaning: "الكافيين يحسن القدرة على إدراك الكلمات الإيجابية",
    keywords: ["Koffein = كافيين", "Wahrnehmung = إدراك", "positive Begriffe = كلمات إيجابية", "Kaffeetrinker = شارب قهوة"],
    simplified: "القهوة تجعلك تركز على الكلمات الجميلة أكثر",
    imagine: "شخص يشرب قهوة ثم يقرأ فقط الكلمات الجميلة في الجريدة",
    correct: "b"
};

HELP_DATA["lesen1_exam25_q2"] = {
    text: "Ihr Gehirn ist gerade ein Millionstel Mal so groß - Pflanzen und Insekten - eine gemeinsame Entwicklung",
    meaning: "النباتات والحشرات تطورت معا عبر ملايين السنين",
    keywords: ["Bienen = نحل", "Pflanzen = نباتات", "Evolution = تطور", "Bernstein = كهرمان"],
    simplified: "النحل والنباتات تطورا سويا منذ 100 مليون سنة",
    imagine: "نحلة على زهرة داخل قطعة كهرمان شفافة",
    correct: "d"
};

HELP_DATA["lesen1_exam25_q3"] = {
    text: "Bienen, die Pollen von Kaffee sammeln - Koffein im Blütennektar verbessert Gedächtnisleistung",
    meaning: "الكافيين في رحيق الأزهار يقوي ذاكرة النحل",
    keywords: ["Koffein = كافيين", "Bienen = نحل", "Gedächtnis = ذاكرة", "Pollen = حبوب لقاح"],
    simplified: "الكافيين يساعد النحل على تذكر روائح الأزهار",
    imagine: "نحلة تشرب رحيقا والكافيين يخرج من رأسها",
    correct: "f"
};

HELP_DATA["lesen1_exam25_q4"] = {
    text: "Es ist ein schwerer Gang im Leben jedes Imkers - Insektensterben in der kalten Jahreszeit",
    meaning: "نفوق أعداد كبيرة من النحل في فصل الشتاء",
    keywords: ["Imker = مربي نحل", "Bienenvölker = طوائف نحل", "Winter = شتاء", "tot = ميت"],
    simplified: "نحل يموت في الشتاء ويحزن مربيه",
    imagine: "رجل ينظر إلى خلية نحل ميتة ويداه على رأسه",
    correct: "c"
};

HELP_DATA["lesen1_exam25_q5"] = {
    text: "Viele Insekten überwintern als Puppe - Methoden zum Überleben in der kalten Jahreszeit",
    meaning: "طرق الحشرات المختلفة للبقاء على قيد الحياة في الشتاء",
    keywords: ["überwintern = يبيت شتاء", "gefriertolerant = يتحمل التجمد", "Frostschutzmittel = مواد مضادة للتجمد", "Engerlinge = يرقات"],
    simplified: "استراتيجيات الحشرات للنجاة من برد الشتاء",
    imagine: "نحلة ترتدي معطفا صغيرا وهي ترتجف من البرد",
    correct: "i"
};

// ========== Exam 26: Spiele (صحيح: 5,3,1,0,7) ==========
HELP_DATA["lesen1_exam26_q1"] = {
    text: "Die erste Kösener Puppenfabrik wurde 1912 - Naturgetreue Handarbeit für das Kinderzimmer",
    meaning: "صناعة دمى وألعاب قطيفة يدوية تبدو كالحيوانات الحقيقية",
    keywords: ["Plüschtiere = ألعاب قطيفة", "Handarbeit = يدوية", "authentisch = أصلي", "Käthe Kruse = كيتا كروزه"],
    simplified: "ألعاب قطيفة مصنوعة يدويا تشبه الحيوانات الحقيقية",
    imagine: "يدان تخيطان دبا قطيفا يشبه دبا حقيقيا",
    correct: "f"
};

HELP_DATA["lesen1_exam26_q2"] = {
    text: "Die Modelleisenbahn hat auch heute ihre Anziehungskraft - Kleine Züge mit langer Geschichte",
    meaning: "قطارات صغيرة لها تاريخ طويل من القرن التاسع عشر",
    keywords: ["Modelleisenbahn = قطار نموذجي", "Märklin = ماركلين", "Uhrwerkeisenbahn = قطار ساعة", "dampfbetrieben = يعمل بالبخار"],
    simplified: "قطارات الألعاب الصغيرة لها تاريخ يزيد عن 130 سنة",
    imagine: "قطار لعبة صغير يدور على قضبان في غرفة طفل",
    correct: "d"
};

HELP_DATA["lesen1_exam26_q3"] = {
    text: "Gedruckten Büchern wurde ein schnelles Ende vorausgesagt - Dinge zum Anfassen bleiben beliebt",
    meaning: "الأشياء المادية الملموسة لا تزال محبوبة رغم الرقمنة",
    keywords: ["Bücher = كتب", "Digitalisierung = رقمنة", "Schallplatte = أسطوانة", "Trend = اتجاه"],
    simplified: "الناس لا يزالون يحبون الكتب الورقية والأسطوانات",
    imagine: "يد تمسك كتابا ورقي وبجانبها هاتف به تطبيق قراءة",
    correct: "b"
};

HELP_DATA["lesen1_exam26_q4"] = {
    text: "Immer neue Spielekonsolen und Apps - Alte Spiele stärken das Miteinander",
    meaning: "الألعاب التقليدية تقوي العلاقات الاجتماعية بين الناس",
    keywords: ["Brettspiele = ألعاب لوحية", "Zusammengehörigkeit = انتماء", "Familie = عائلة", "Freunde = أصدقاء"],
    simplified: "ألعاب الطاولة تجمع العائلة والأصدقاء حول طاولة واحدة",
    imagine: "عائلة جالسة حول طاولة ترمي الزهر وتضحك",
    correct: "a"
};

HELP_DATA["lesen1_exam26_q5"] = {
    text: "Jahr für Jahr steigt der Umsatz der Spielzeughersteller - Überfluss im Kinderzimmer",
    meaning: "وفرة الألعاب في غرفة الطفل تقلل تركيزه",
    keywords: ["Spielzeug = ألعاب", "Konzentration = تركيز", "Kindergarten = روضة", "Kinderzimmer = غرفة طفل"],
    simplified: "كثرة الألعاب تشتت ذهن الطفل",
    imagine: "طفل يجلس وسط كومة ألعاب ولا يعرف بأي يلعب",
    correct: "h"
};

// ========== Exam 27: Geld (صحيح: 5,4,2,7,8) ==========
HELP_DATA["lesen1_exam27_q1"] = {
    text: "Spardosen sind Sammelbehälter - Sammelgefäße als Ausstellungsobjekte",
    meaning: "حاويات تجميع النقود (حصالات) معروضة في متحف",
    keywords: ["Spardosen = حصالات", "Museum = متحف", "Exemplare = قطع معروضة", "Münzen = عملات"],
    simplified: "حصالات قديمة معروضة في متحف",
    imagine: "حصالة أصفر على شكل خنزير في علبة زجاجية",
    correct: "f"
};

HELP_DATA["lesen1_exam27_q2"] = {
    text: "Wer beim leisen Klirren von Geldstücken - Lehrreicher Rundgang zu Finanzwissen",
    meaning: "جولة تعليمية في متحف لتعلم أساسيات المال والاقتصاد",
    keywords: ["Ausstellung = معرض", "Marktplatz = سوق", "Bank = بنك", "Börse = بورصة"],
    simplified: "جولة في متحف المال تعلمك كيف يعمل الاقتصاد",
    imagine: "شخص يمشي في ممرات متحف وخلفه رسوم أوراق نقدية",
    correct: "e"
};

HELP_DATA["lesen1_exam27_q3"] = {
    text: "Darum geht es, zu begreifen, wie Wirtschaft funktioniert - Finanz-ABC für Anfänger",
    meaning: "كتاب يشرح أساسيات المال بلغة بسيطة للمبتدئين",
    keywords: ["Buch = كتاب", "Finanzsektor = قطاع مالي", "Glossar = مسرد", "Fachwörter = مصطلحات"],
    simplified: "كتاب يعلمك اللغة المالية للمبتدئين",
    imagine: "كتاب مفتوح وعليه علامات الدولار واليورو",
    correct: "c"
};

HELP_DATA["lesen1_exam27_q4"] = {
    text: "Eine neue Untersuchung des Instituts - Interessante Tätigkeit wichtiger als hohes Gehalt",
    meaning: "الوظيفة الشيقة أهم من الراتب العالي للسعادة",
    keywords: ["Einkommen = دخل", "zufrieden = سعيد", "Arbeitnehmer = موظف", "emotional stabil = مستقر عاطفيا"],
    simplified: "الراتب العالي لا يسعد بقدر العمل الممتع",
    imagine: "رجل يضحك وهو يعمل على حاسوبه وآخر غني لكنه حزين",
    correct: "d"
};

HELP_DATA["lesen1_exam27_q5"] = {
    text: "Über Geld sprechen viele Deutsche nicht gerne - Wie Kinder den Umgang mit Geld lernen",
    meaning: "كيف يتعلم الأطفال التعامل مع المال من خلال التربية",
    keywords: ["Taschengeld = مصروف جيب", "Erziehung = تربية", "Kinder = أطفال", "Finanzverhalten = سلوك مالي"],
    simplified: "تعليم الأطفال التعامل مع المال يبدأ من المنزل",
    imagine: "أب يعطي ابنه نقودا ويشرح له كيفية ادخارها",
    correct: "i"
};

// ========== Exam 28: Kinder und Schulen (صحيح: 5,4,6,1,7) ==========
HELP_DATA["lesen1_exam28_q1"] = {
    text: "Nach der englischen Bezeichnung für 'Schultüte' - Traditionen zum Schulanfang",
    meaning: "تقاليد مختلفة حول العالم لبدء العام الدراسي",
    keywords: ["Schultüte = كيس مدرسي", "traditionen = تقاليد", "Schulanfang = بداية مدرسة", "Geschenke = هدايا"],
    simplified: "تقاليد متنوعة لاستقبال اليوم الأول في المدرسة",
    imagine: "طفل يحمل كيسا من الورق المقوى مليئا بالحلويات",
    correct: "f"
};

HELP_DATA["lesen1_exam28_q4"] = {
    text: "Raban Rabovic ist ein kleiner Rabe - Neues Buch für kleine Leseanfänger",
    meaning: "كتاب جديد لمساعدة الأطفال الصغار على القراءة",
    keywords: ["Erstlesebuch = كتاب قراءة أول", "Bilder = صور", "Rabe = غراب", "Schulanfang = بداية مدرسة"],
    simplified: "كتاب مصور للأطفال في أول سنة دراسية",
    imagine: "طفل يقرأ كتابا وعليها رسم غراب صغير يرتدي قبعة",
    correct: "e"
};

HELP_DATA["lesen1_exam28_q3"] = {
    text: "Auf den Straßen sind ab Schulbeginn - Vorsicht an Haltestellen!",
    meaning: "الحذر في مواقف الحافلات مع بداية العام الدراسي",
    keywords: ["Haltestellen = مواقف", "Autofahrer = سائقين", "Schulbus = باص مدرسة", "Überholen = تجاوز"],
    simplified: "احذر وأنت تقود بجانب مواقف الحافلات المدرسية",
    imagine: "حافلة مدرسية وأطفال ينزلون وسيارة تتوقف بجانبهم",
    correct: "g"
};

HELP_DATA["lesen1_exam28_q4"] = {
    text: "In Deutschland herrscht Schulpflicht - Das richtige Alter für die Einschulung",
    meaning: "العمر المناسب لدخول المدرسة يختلف حسب الرأي والولاية",
    keywords: ["Schuleintritt = دخول مدرسة", "Alter = سن", "Bundesländer = ولايات", "überfordern = إرهاق"],
    simplified: "العمر المناسب لدخول المدرسة يختلف بين الخبراء",
    imagine: "طفل يحمل حقيبة ظهر كبيرة ودمعة في عينه",
    correct: "b"
};

HELP_DATA["lesen1_exam28_q5"] = {
    text: "Ein Großteil des Busverkehrs dient dem Schulverkehr - Weniger Fahrten in den Schulferien",
    meaning: "عدد رحلات الحافلات يقل في العطل المدرسية",
    keywords: ["Schulverkehr = نقل مدرسي", "Ferien = عطلات", "Fahrpläne = جداول مواعيد", "Schultagen = أيام دراسة"],
    simplified: "باصات كثيرة تعمل أيام الدراسة فقط وتتوقف في العطل",
    imagine: "جدول مواعيد باص وعليه علامة تعليمية وحرف S",
    correct: "h"
};

// ========== Exam 29: Kindertelefon (صحيح: 2,5,4,1,9) ==========
HELP_DATA["lesen1_exam29_q1"] = {
    text: "Vielen Menschen verursachen sie ein mulmiges Gefühl - Moderne schnurlose Geräte vermindern die Strahlenbelastung",
    meaning: "الأجهزة اللاسلكية الحديثة تقلل الإشعاعات الضارة",
    keywords: ["Schnurlos-Telefone = هواتف لاسلكية", "Strahlenschutz = حماية من إشعاع", "strahlungsarm = قليل الإشعاع", "BfS = مكتب إشعاع"],
    simplified: "هواتف لاسلكية جديدة أقل إشعاعا من القديمة",
    imagine: "هاتف لاسلكي وعليه علامة لا للإشعاع",
    correct: "c"
};

HELP_DATA["lesen1_exam29_q2"] = {
    text: "Wenn Kinder ein Handy haben - Kinder-Überwachung für Eltern per Handy wird geplant",
    meaning: "تخطيط لتصنيع هاتف للأطفال يمكن الأهل من مراقبتهم",
    keywords: ["Handy = هاتف محمول", "Kontrolle = مراقبة", "Eltern = أهل", "Motorola = موتورولا"],
    simplified: "هاتف ذكي يسمح للآباء بمراقبة أطفالهم",
    imagine: "أم تشاهد مكان ابنها على خريطة في هاتفها",
    correct: "f"
};

HELP_DATA["lesen1_exam29_q3"] = {
    text: "Wer unter Palmen liegt, greift gern zum Handy - Handy im Ausland: aufpassen und tricksen!",
    meaning: "نصائح لتجنب فواتير الهاتف الباهظة عند السفر للخارج",
    keywords: ["Eurotarif = تعرفة أوروبية", "Ausland = خارج البلاد", "Verbraucherzentrale = مركز المستهلك", "Preislimits = حدود سعرية"],
    simplified: "انتبه لفواتير هاتفك وأنت مسافر في أوروبا",
    imagine: "شخص على الشاطئ يتصل ومعه فاتورة طويلة جدا",
    correct: "e"
};

HELP_DATA["lesen1_exam29_q4"] = {
    text: "Manche Momente muss man einfach festhalten - Profi-Tipps für bessere Urlaubsbilder",
    meaning: "نصائح احترافية لتحسين صور العطلات بكاميرات عادية",
    keywords: ["Fotos = صور", "Tricks = حيل", "Perspektive = زاوية", "Digitalkameras = كاميرات رقمية"],
    simplified: "نصائح بسيطة لتصوير أفضل في إجازتك",
    imagine: "شخص يصور غروب الشمس بزاوية جميلة وجالس على الأرض",
    correct: "b"
};

HELP_DATA["lesen1_exam29_q5"] = {
    text: "Es gibt wohl kaum eine bessere Chance für Handy-TV - Mobiler Fernsehgenuss wird zum Alltag",
    meaning: "مشاهدة التلفاز على الهاتف المحمول أصبح شيء عادي",
    keywords: ["Handy-TV = تلفاز محمول", "Fußball-WM = كأس العالم", "UMTS = نظام اتصالات", "Alltag = يومي"],
    simplified: "مشاهدة التلفاز على الموبايل أصبح متعة يومية",
    imagine: "شخص يشاهد مباراة كرة قدم على هاتفه في الحافلة",
    correct: "j"
};

// ========== Exam 30: Alpen (صحيح: 5,3,1,0,4) ==========
HELP_DATA["lesen1_exam30_q1"] = {
    text: "Für Raucher wird es an der Universität in Köln eng - Rauchverbot in Sportvereinen",
    meaning: "منع التدخين في المباني الجامعية وحتى المراحيض",
    keywords: ["Rauchverbot = منع تدخين", "Universität = جامعة", "Gebäude = مبانٍ", "Toiletten = حمامات"],
    simplified: "منع التدخين في كل مباني الجامعة بدون استثناء",
    imagine: "لافتة ممنوع التدخين على باب الحمام الجامعي",
    correct: "g"
};

HELP_DATA["lesen1_exam30_q2"] = {
    text: "Urlaub in den Bergen ist sehr gesund - Höhenluft - gut fürs Herz",
    meaning: "هواء المرتفعات مفيد للقلب والدورة الدموية",
    keywords: ["Höhenlagen = مرتفعات", "Blutdruck = ضغط دم", "Herz = قلب", "Kreislauf = دورة دموية"],
    simplified: "هواء الجبال العالية يقوي القلب ويخفض الضغط",
    imagine: "رجل يقف على قمة جبل ويضع يده على قلبه وهو يبتسم",
    correct: "d"
};

HELP_DATA["lesen1_exam30_q3"] = {
    text: "Schlechte Haut, übler Atem, leere Brieftasche - Mädchen geben mehr Geld für Zigaretten aus als Jungen",
    meaning: "الفتيات ينفقن مالا على السجائر أكثر من الأولاد",
    keywords: ["Rauchen = تدخين", "Mädchen = بنات", "Jungen = أولاد", "Sucht = إدمان"],
    simplified: "البنات يدخن أكثر من الشباب رغم أضرار التدخين الواضحة",
    imagine: "بنت تشعل سيجارة ومحفظتها فارغة بجانبها", 
    correct: "b"
};

HELP_DATA["lesen1_exam30_q4"] = {
    text: "Sport im Hochgebirge? Da denkt man zuallererst an Wintersport - Freizeitsport in den Alpen",
    meaning: "الرياضات الترفيهية في جبال الألب صيفا وشتاء",
    keywords: ["Hochgebirge = مرتفعات عالية", "Wintersport = رياضة شتوية", "Wandern = مشي", "Klettern = تسلق"],
    simplified: "رياضات متنوعة في جبال الألب لكل الفصول",
    imagine: "شخص يتزلج على ثلج وآخر يتسلق صخرة في الصيف",
    correct: "a"
};

HELP_DATA["lesen1_exam30_q5"] = {
    text: "Sportvereine spielen eine immer wichtigere Rolle - Junge Sportler: weniger suchtanfällig",
    meaning: "الشباب الرياضيون أقل عرضة للإدمان والمشاكل السلوكية",
    keywords: ["Sportvereine = أندية رياضية", "suchtanfällig = عرضة للإدمان", "rauchen = تدخين", "geselliger = أكثر اجتماعية"],
    simplified: "الرياضيون الشباب يدخنون أقل ويتمتعون بصحة نفسية أفضل",
    imagine: "شاب رياضي يشرب ماء وآخر غير رياضي يدخن وحيدا",
    correct: "e"
};

// ============================================
// Lesen Teil 1 - Exams 31-40 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 31: Alpen (التعديل 1) (صحيح: 7,3,1,0,4) ==========
HELP_DATA["lesen1_exam31_q1"] = {
    text: "Seit einigen Jahren schon gibt es das Projekt 'Aufklärung gegen Tabak' - Rauchverbot in Sportvereinen",
    meaning: "طلاب طب يوعون تلاميذ المدارس بمخاطر التدخين",
    keywords: ["Tabak = تبغ", "Studenten = طلاب", "Schüler = تلاميذ", "Rauchen = تدخين"],
    simplified: "طلاب الطب يحذرون تلاميذ المدارس من التدخين",
    imagine: "طالب طب يشرح لمجموعة من التلاميذ رئة مدخن سوداء",
    correct: "g"
};

HELP_DATA["lesen1_exam31_q2"] = {
    text: "Urlaub in den Bergen ist sehr gesund - Höhenluft - gut fürs Herz",
    meaning: "هواء الجبال العالي مفيد للقلب والدورة الدموية",
    keywords: ["Höhenlagen = مرتفعات", "Blutdruck = ضغط دم", "Herz = قلب", "Kreislauf = دورة دموية"],
    simplified: "هواء المرتفعات يقوي القلب ويخفض الضغط",
    imagine: "رجل على قمة جبل يضع يده على قلبه ويبتسم",
    correct: "d"
};

HELP_DATA["lesen1_exam31_q3"] = {
    text: "Schlechte Haut, übler Atem, leere Brieftasche - Mädchen geben mehr Geld für Zigaretten aus als Jungen",
    meaning: "الفتيات ينفقن مالا على السجائر أكثر من الأولاد",
    keywords: ["Rauchen = تدخين", "Mädchen = بنات", "Jungen = أولاد", "teuer = مكلف"],
    simplified: "البنات يصرفن على السجائر أكثر من الشباب",
    imagine: "بنت تشعل سيجارة ومحفظتها فارغة بجانب ولد يحفظ نقوده",
    correct: "b"
};

HELP_DATA["lesen1_exam31_q4"] = {
    text: "Sport im Hochgebirge? Da denkt man zuallererst an Wintersport - Freizeitsport in den Alpen",
    meaning: "رياضات ترفيهية متنوعة في جبال الألب صيفا وشتاء",
    keywords: ["Hochgebirge = مرتفعات عالية", "Wintersport = رياضة شتوية", "Wandern = مشي", "Klettern = تسلق"],
    simplified: "الرياضات الترفيهية في الألب صيفا في الجبال والبحيرات",
    imagine: "رجل يتزلج في الشتاء وآخر يتسلق صخرة في الصيف",
    correct: "a"
};

HELP_DATA["lesen1_exam31_q5"] = {
    text: "Sportvereine spielen eine immer wichtigere Rolle - Vereine wirken positiv auf Jugendliche",
    meaning: "الأندية الرياضية تحمي الشباب من العزلة والتدخين والعنف",
    keywords: ["Sportvereine = أندية رياضية", "Jugendliche = شباب", "rauchen = تدخين", "geselliger = أكثر اجتماعية"],
    simplified: "الشباب الرياضيون أكثر صحة وسعادة وأقل تدخينا",
    imagine: "شابان يلعبان كرة أحدهما رياضي والآخر جالس وحيدا",
    correct: "e"
};

// ========== Exam 32: Alpen (التعديل 2) (صحيح: 3,6,4,8,2) ==========
HELP_DATA["lesen1_exam32_q1"] = {
    text: "Seit einigen Jahren schon gibt es das Projekt 'Aufklärung gegen Tabak' - Studenten engagieren sich gegen das Rauchen",
    meaning: "طلاب الطب يتطوعون لتوعية التلاميذ بأضرار التدخين",
    keywords: ["Studenten = طلاب", "Tabak = تبغ", "Schüler = تلاميذ", "präventiv = وقائي"],
    simplified: "طلاب الطب يعلمون الصغار مخاطر السجائر",
    imagine: "طالب شاب يشرح لطلاب صغار رسمة لرئة مريضة",
    correct: "d"
};

HELP_DATA["lesen1_exam32_q2"] = {
    text: "Urlaub in den Bergen ist sehr gesund - Höhenluft fördert die Gesundheit",
    meaning: "هواء الجبال العالية يقوي صحة القلب ويتحكم بالضغط",
    keywords: ["Höhenlagen = مرتفعات", "Blutdruck = ضغط دم", "Herz = قلب", "Kreislauf = دورة دموية"],
    simplified: "هواء الجبال مفيد جدا لصحة القلب والتنفس",
    imagine: "امرأة تتنفس بعمق بين قمم الجبال المغطاة بالثلوج",
    correct: "g"
};

HELP_DATA["lesen1_exam32_q3"] = {
    text: "Schlechte Haut, übler Atem, leere Brieftasche - Mädchen geben mehr Geld für Zigaretten aus als Jungen",
    meaning: "الفتيات ينفقن على التدخين أكثر من الأولاد",
    keywords: ["Rauchen = تدخين", "Mädchen = بنات", "Jungen = أولاد", "Geld = مال"],
    simplified: "البنت تصرف على الدخان أكثر من الولد",
    imagine: "بنت تشتري سجائر وولد يشاهدها وهو يمسك محفظته السميكة",
    correct: "e"
};

HELP_DATA["lesen1_exam32_q4"] = {
    text: "Sport im Hochgebirge? Da denkt man zuallererst an Wintersport - Freizeitsport in den Alpen",
    meaning: "رياضات متعددة في جبال الألب تشمل الشتاء والصيف",
    keywords: ["Wintersport = رياضة شتوية", "Sommer = صيف", "Wandern = مشي", "Klettern = تسلق"],
    simplified: "رياضات كثيرة في الألب صيفا شتاء وجبال وبحيرات",
    imagine: "عائلة تتنزه في جبال الألب صيفا بين الزهور الجميلة",
    correct: "i"
};

HELP_DATA["lesen1_exam32_q5"] = {
    text: "Sportvereine spielen eine immer wichtigere Rolle - Vereine wirken positiv auf Jugendliche",
    meaning: "الأندية الرياضية تحمي الشباب من المخاطر الاجتماعية",
    keywords: ["Sportvereine = أندية رياضية", "Jugendliche = شباب", "Einsamkeit = وحدة", "rauchen = تدخين"],
    simplified: "النادي الرياضي يعطي الشباب بديلا صحيا عن العزلة",
    imagine: "شباب في نادي رياضي يضحكون ويلعبون معا",
    correct: "c"
};

// ========== Exam 33: Suchtmittel - Nase (صحيح: 7,1,4,9,8) ==========
HELP_DATA["lesen1_exam33_q1"] = {
    text: "Wie wollen wir von anderen gesehen werden? - Schönheitsoperationen nicht um jeden Preis",
    meaning: "عمليات تجميل الأنف ليست مناسبة للجميع وخاصة المراهقين",
    keywords: ["Nase = أنف", "Operation = عملية", "Chirurg = جراح", "ästhetisch = تجميلي"],
    simplified: "عمليات تجميل الأنف محدودة لبعض الحالات فقط",
    imagine: "جراح يشرح لامرأة شكل أنفها الجديد لكنه يرفض عمليات المراهقين",
    correct: "h"
};

HELP_DATA["lesen1_exam33_q2"] = {
    text: "Der Riechsinn ist unser ursprünglichster Sinn - Durch den Geruchssinn die Welt neu erfahren",
    meaning: "مكان تفاعلي لتدريب حاسة الشم واكتشاف العالم من خلال الروائح",
    keywords: ["Riechsinn = حاسة شم", "Geruch = رائحة", "Erfahrungsfeld = مجال تجريبي", "Sinne = حواس"],
    simplified: "استكشف العالم من خلال روائحه في مكان تفاعلي ممتع",
    imagine: "شخص يشم رائحة زهور ويغمض عينيه بتركيز في معرض تفاعلي",
    correct: "b"
};

HELP_DATA["lesen1_exam33_q3"] = {
    text: "Mit Drogen kennt sich Falko aus - Mit vierbeinigen Spürnasen gegen den Drogenschmuggel",
    meaning: "كلاب مدربة خصيصا لكشف المخدرات في الجمارك",
    keywords: ["Spürhunde = كلاب بوليسية", "Drogen = مخدرات", "Zoll = جمارك", "riechen = شم"],
    simplified: "كلاب بوليسية بمطار كشف المخدرات أبطال حقيقيون",
    imagine: "كلب يجلس بجانب حقيبة سفر ويضع علامة بقدمه",
    correct: "e"
};

HELP_DATA["lesen1_exam33_q4"] = {
    text: "Beim Menschen ist das Sehen der Sinn Nummer eins - Tierische Riechorgane - unterschiedlich ausgeprägt",
    meaning: "أجهزة شم الحيوانات تختلف قوتها بين أنواعها من كلب إلى فيل",
    keywords: ["Riechorgane = أعضاء شم", "Hund = كلب", "Elefant = فيل", "riechen = شم"],
    simplified: "قدرة حاسة الشم عند الحيوانات تختلف قوة من نوع لآخر",
    imagine: "كلب وكلب يتنافسان في الشم وفيل يشير بخرطومه",
    correct: "j"
};

HELP_DATA["lesen1_exam33_q5"] = {
    text: "Niesen ist eine Reaktion auf die Umwelt - Selbstreinigung für unser Riechorgan",
    meaning: "آلية العطاس تعمل على تنظيف الأنف من المهيجات تلقائيا",
    keywords: ["Niesen = عطاس", "Reflex = رد فعل", "Allergiker = حساسية", "Reiz = مهيج"],
    simplified: "العطاس طريقة الأنف في تنظيف نفسه من الأتربة",
    imagine: "شخص يعطس عدة مرات ويخرج منديلا وهو يضحك",
    correct: "i"
};

// ========== Exam 34: الانتخابات والمرأة الروسية (صحيح: 2,3,5,6,8) ==========
HELP_DATA["lesen1_exam34_q1"] = {
    text: "In Russland 1843 als Tochter eines Bauern - Eine Pionierin der akademischen Frauenausbildung",
    meaning: "أول امرأة تحصل على دكتوراه في الطب من روسيا",
    keywords: ["Ärztin = طبيبة", "Universität = جامعة", "promoviert = دكتوراه", "Nadeschda Suslowa = ناديجدا سوسلوفا"],
    simplified: "قصة الطبيبة الروسية أول دكتورة في بلدها",
    imagine: "امرأة ترتدي عباءة الدكتوراه في عام 1867",
    correct: "c"
};

HELP_DATA["lesen1_exam34_q2"] = {
    text: "Dass Frauen wählen und gewählt werden dürfen - Entwicklung des Frauenstimmrechts",
    meaning: "تاريخ تطور حق المرأة في التصويت والانتخاب في العالم",
    keywords: ["Frauenwahlrecht = حق تصويت النساء", "Revolution = ثورة", "Olympe de Gouges = أوليمب دو غوج", "Pitcairn = بيتكيرن"],
    simplified: "قصة كفاح المرأة للحصول على حق التصويت منذ 1838",
    imagine: "امرأة تضع ورقة اقتراع في صندوق وسط حشد من النساء",
    correct: "d"
};

HELP_DATA["lesen1_exam34_q3"] = {
    text: "Das Wahlverhalten von Frauen hat sich verändert - Geschlechtsspezifische Entscheidungen an der Wahlurne",
    meaning: "النساء والرجال يختلفون في توجهاتهم الانتخابية",
    keywords: ["Wahlverhalten = سلوك انتخابي", "Frauen = نساء", "Männer = رجال", "konservativ = محافظ"],
    simplified: "المرأة تصوت لصالح البيئة والمساواة أكثر من الرجل",
    imagine: "امرأة ورجل يضعان ورقتين مختلفتين في صندوق الاقتراع",
    correct: "f"
};

HELP_DATA["lesen1_exam34_q4"] = {
    text: "In den vergangenen Jahrzehnten hat sich das Geschlechterverhältnis - Studentinnen auf der Überholspur",
    meaning: "الطالبات الجامعيات يتفوقن على الطلاب في السرعة والإكمال",
    keywords: ["Studentinnen = طالبات", "Studium = دراسة", "Erfolg = نجاح", "Abschluss = تخرج"],
    simplified: "الطالبات ينهين دراستهن أسرع ويحققن نجاحا أكبر من الطلاب",
    imagine: "امرأة تقف على منصة التتويج ووراءها شاب يتعثر",
    correct: "g"
};

HELP_DATA["lesen1_exam34_q5"] = {
    text: "'Suffragetten' - so nannte man Anfang des 19. Jahrhunderts - Vorkämpferinnen für das Frauenwahlrecht",
    meaning: "مناضلات بريطانيا المطالبات بحق المرأة في التصويت",
    keywords: ["Suffragetten = ناشطات", "Wahlrecht = حق تصويت", "Emmeline Pankhurst = إيميلين بانكهورست", "Widerstand = مقاومة"],
    simplified: "ناشطات بريطانيا استخدمت كل الطرق لنيل حق المرأة في التصويت",
    imagine: "امرأة ترفع لافتة اقتراع ووراءها سيدة تشعل فتيل متفجر",
    correct: "i"
};

// ========== Exam 35: kein Zeit (صحيح: 9,1,2,5,8) ==========
HELP_DATA["lesen1_exam35_q1"] = {
    text: "Die Krüger sind eine ganz normale Familie - Keine Zeit für die Kinder",
    meaning: "الأهل مشغولون جدا لدرجة أنهم لا يجدون وقتا لأطفالهم",
    keywords: ["keine Zeit = لا وقت", "Kinder = أطفال", "Arbeit = عمل", "Familie = عائلة"],
    simplified: "أب وأم يعملان كثيرا ولا وقت لهما لقراءة كتاب أو رياضة",
    imagine: "أم تركض لتوصل أطفالها وبعدها تجري للعمل وأب يراجع الواجبات ليلا",
    correct: "a"
};

HELP_DATA["lesen1_exam35_q2"] = {
    text: "Der Wunsch nach Zweisamkeit hat sich zu einem Geschäft entwickelt - Vorsicht vor zweifelhaften Kontaktagenturen!",
    meaning: "احذر من وكالات التعارف الوهمية التي تضع صورا مزيفة",
    keywords: ["Kontaktagenturen = وكالات تعارف", "schwarze Schafe = سوداء", "Fotos = صور", "Telefonnummer = رقم هاتف"],
    simplified: "احذر من دعايات زواج وهمية تستدرجك لهاتف مدفوع",
    imagine: "شخص يلتقط السماعة ووجها مفاجأة سيدة خلف الستارة تبتسم",
    correct: "b"
};

HELP_DATA["lesen1_exam35_q3"] = {
    text: "Die Partnerschaft verläuft in Phasen - Liebe fürs Leben muss wachsen",
    meaning: "العلاقة الزوجية تمر بأطوار مختلفة يجب تجاوزها للوصول للحب الدائم",
    keywords: ["Partnerschaft = شراكة", "Liebe = حب", "Phasen = أطوار", "Alltag = روتين"],
    simplified: "طرق أبواب الحب الدائم تمر بمراحل الافتتان والنضج والتعايش",
    imagine: "زوجان يواجهان كومة من الأطباق المتسخة ويضحكان",
    correct: "c"
};

HELP_DATA["lesen1_exam35_q4"] = {
    text: "Knapp 13 Millionen Single-Haushalte in Deutschland - Wer sucht, der findet",
    meaning: "البحث النشط أفضل من انتظار شريك الحياة أن يأتي بالصدفة",
    keywords: ["Single = أعزب", "Partner = شريك", "finden = إيجاد", "Hoffnung = أمل"],
    simplified: "لا تنتظر الحظ بل ابحث عن شريك حياتك بنفسك",
    imagine: "شخص ينظر من نافذته وأمير الأحلام يطرق باب جاره",
    correct: "f"
};

HELP_DATA["lesen1_exam35_q5"] = {
    text: "Nach dem Abitur, zum Studium - Wenn die Kinder aus dem Haus sind",
    meaning: "شعور الأهل بالفراغ عندما يغادر الأطفال المنزل",
    keywords: ["Kinder = أطفال", "ausziehen = مغادرة", "Eltern = أهل", "Leere = فراغ"],
    simplified: "الأهل يمتلئون بالفرح والحزن معا عند خروج أولادهم للزواج",
    imagine: "أم تلتقط صورة لغرفة ابنها الفارغة وعيناها تدمعان",
    correct: "i"
};

// ========== Exam 36: kein Zeit (التعديل 1) (صحيح: 9,1,2,5,8) ==========
HELP_DATA["lesen1_exam36_q1"] = {
    text: "Die Krüger sind eine ganz normale Familie - Zeitprobleme in der Familie",
    meaning: "ضيق الوقت عند الأهل يؤثر سلبا على تربية الأبناء",
    keywords: ["Zeitprobleme = مشاكل وقت", "Familie = عائلة", "Arbeit = عمل", "Kinder = أطفال"],
    simplified: "الأهل لا يجدون وقتا للأبناء بسبب ضغوط العمل اليومية",
    imagine: "ساعة توقيت تدق وكل فرد في المنزل يجري في اتجاه مختلف",
    correct: "j"
};

HELP_DATA["lesen1_exam36_q2"] = {
    text: "Der Wunsch nach Zweisamkeit hat sich zu einem Geschäft entwickelt - Vorsicht vor zweifelhaften Kontaktagenturen!",
    meaning: "تحذير من وكالات التعارف النصابة التي تستخدم صورا مزيفة",
    keywords: ["Kontaktagenturen = وكالات تعارف", "schwarze Schafe = سوداء", "Fotos = صور", "echte Beziehung = علاقة حقيقية"],
    simplified: "لا تصدق الإعلانات الجميلة فقد تكون وجهة لشركة وهمية",
    imagine: "هاتف يرن ومكتب مليء بصور ممثلين مبتسمين",
    correct: "b"
};

HELP_DATA["lesen1_exam36_q3"] = {
    text: "Wie entsteht eine langfristige Beziehung? - Liebe fürs Leben muss wachsen",
    meaning: "الحب الدائم يحتاج للنضج عبر مراحل الزواج المختلفة",
    keywords: ["Beziehung = علاقة", "Liebe = حب", "Phasen = أطوار", "Alltag = روتين"],
    simplified: "علاقة الحب عمرها ما تبقى في مرحلة الشغف الأولى",
    imagine: "زوجان عجوزان يشاهدان فيلما لزفافهما ويضحكان",
    correct: "c"
};

HELP_DATA["lesen1_exam36_q4"] = {
    text: "Knapp 13 Millionen Single-Haushalte in Deutschland - Aktive Partnersuche gegen das Alleinsein",
    meaning: "البحث النشط عن شريك أفضل من انتظاره بالصدفة",
    keywords: ["Single = أعزب", "Partner = شريك", "Alleinsein = وحدة", "finden = إيجاد"],
    simplified: "لا تنتظر أن تطرق سندريلا بابك بل ابحث عنها بنفسك",
    imagine: "رجل في غرفة مليئة بالنوافذ لكن لا أحد يطرق بابها",
    correct: "f"
};

HELP_DATA["lesen1_exam36_q5"] = {
    text: "Nach dem Abitur, zum Studium - Wenn die Kinder aus dem Haus sind",
    meaning: "آثار مغادرة الأبناء للمنزل على حياة الأهل",
    keywords: ["Kinder = أطفال", "ausziehen = مغادرة", "Eltern = أهل", "Freude = فرح", "Leere = فراغ"],
    simplified: "خروج الأبناء من البيت يخلط الفرح بالحزن عند الأهل",
    imagine: "أب وأم يشربان القهوة في غرفة الجلوس الهادئة جدا",
    correct: "i"
};

// ========== Exam 37: Limonade (صحيح: 5,9,2,7,4) ==========
HELP_DATA["lesen1_exam37_q1"] = {
    text: "Möchten Sie Kraft, Jugend und Gesundheit aus der Flasche? - Frische Luft macht stark",
    meaning: "هواء نقي ونظيف يمنحك الطاقة والصحة مجانا دون حاجة لمشروبات مدفوعة",
    keywords: ["Sauerstoff = أكسجين", "frische Luft = هواء نقي", "kostenlos = مجاني", "Energie = طاقة"],
    simplified: "تنفس هواء نقي فهو صحي ومجاني ويغنيك عن مكملات الأكسجين",
    imagine: "رجل يتنفس بعمق في غابة وأمامه زجاجات ماء فوارة باهظة",
    correct: "f"
};

HELP_DATA["lesen1_exam37_q2"] = {
    text: "Wenn es regnet, dann fließt das Regenwasser - Vom Regen zum Mineralwasser",
    meaning: "رحلة قطرة المطر من السماء إلى أعماق الأرض لتصير ماء معدنيا",
    keywords: ["Regenwasser = ماء مطر", "Mineralwasser = ماء معدني", "Grundwasser = ماء جوفي", "Nitrat = نترات"],
    simplified: "قصة تكون الماء المعدني من ماء المطر بعد سنين طويلة",
    imagine: "قطرة مطر تسقط على الأرض وتخترق طبقات الصخر ببطء شديد",
    correct: "j"
};

HELP_DATA["lesen1_exam37_q3"] = {
    text: "Nach den Unwettern der letzten Sommer - Sommer bedeutet in Zukunft nicht unbedingt Sonne",
    meaning: "تغير المناخ يجعل الصيف عبارة عن فيضانات وعواصف وليس شمسا فقط",
    keywords: ["Sommer = صيف", "Klima = مناخ", "Unwetter = عواصف", "Überschwemmungen = فيضانات"],
    simplified: "صيف الغد قد يكون مطرا وعواصف بدل شمس وشواطئ",
    imagine: "شخص يجلس على شاطئ تحت مظلة شمس والمطر ينهمر بشدة",
    correct: "c"
};

HELP_DATA["lesen1_exam37_q4"] = {
    text: "Wozu noch Kästen mit Mineralwasserflaschen nach Hause schleppen - Sprudel hausgemacht – Zeit des Flaschen-Tragens ist vorbei",
    meaning: "اصنع مشروباتك الغازية في المنزل بآلة صغيرة",
    keywords: ["Sodamaschine = ماكينة صودا", "Sprudel = فوار", "Leitungswasser = ماء حنفية", "selbst herstellen = تصنيع منزلي"],
    simplified: "آلة منزلية تحول ماء الصنبور إلى مشروبات غازية حسب رغبتك",
    imagine: "رجل يضغط زر ماكينة وماء الصنبور يخرج فوارا",
    correct: "h"
};

HELP_DATA["lesen1_exam37_q5"] = {
    text: "'Wasser ist zum Waschen da' lautete ein deutscher Schlager - Viel Wasser trinken - Gesundheit tanken",
    meaning: "اشرب 2.5 لتر ماء يوميا لتعويض الأملاح وتجنب السكر",
    keywords: ["Wasser trinken = شرب ماء", "Mineralstoffe = معادن", "gesund = صحي", "Kalorien = سعرات"],
    simplified: "شرب الماء ضروري يوميا لتعويض الفاقد دون سعرات حرارية",
    imagine: "زجاجة ماء بجانبها زجاجة عصير ملون لكن يدي تمد للماء",
    correct: "e"
};

// ========== Exam 38: Limonade (التعديل 1) (صحيح: 2,9,6,7,8) ==========
HELP_DATA["lesen1_exam38_q1"] = {
    text: "Möchten Sie Kraft, Jugend und Gesundheit aus der Flasche? - Frische Luft als wahre Energiequelle",
    meaning: "طاقة وصحة حقيقية تنبع من الهواء النقي وليس من ماء مكلف",
    keywords: ["frische Luft = هواء نقي", "Energie = طاقة", "Sauerstoff = أكسجين", "kostenlos = مجاني"],
    simplified: "اصعد للهواء الطلق تجد الطاقة والحيوية دون دفع فلس واحد",
    imagine: "جبل أخضر ورجل يتنفس بعمق ويمد يديه للنافذة",
    correct: "c"
};

HELP_DATA["lesen1_exam38_q2"] = {
    text: "Wenn es regnet, dann fließt das Regenwasser - Vom Regen zum Mineralwasser",
    meaning: "رحلة الماء المعدني الطبيعي من سقوط المطر إلى تنقيته تحت الأرض",
    keywords: ["Regen = مطر", "Mineralwasser = ماء معدني", "Erdschichten = طبقات أرضية", "Nitrat = نترات"],
    simplified: "طبيعة تصنع مياه معدنية من مطر يخترق التربة لقرون",
    imagine: "قطرة ماء تسافر عبر حصى وصخور لسنوات طويلة جدا",
    correct: "j"
};

HELP_DATA["lesen1_exam38_q3"] = {
    text: "Nach den Unwettern der letzten Sommer - Sommer bedeutet in Zukunft nicht unbedingt Sonne",
    meaning: "الصيف في المستقبل قد يحمل عواصف وفيضانات أكثر من الشمس",
    keywords: ["Sommer = صيف", "Klimawandel = تغير مناخ", "Unwetter = عواصف", "Überschwemmungen = فيضانات"],
    simplified: "الصيف صار فوضى من مطر وبرد فيضانات وحر", 
    imagine: "شاطئ عاصف وأمواج ضخمة تجرف الكراسي",
    correct: "g"
};

HELP_DATA["lesen1_exam38_q4"] = {
    text: "Wozu noch Kästen mit Mineralwasserflaschen nach Hause schleppen - Sprudel hausgemacht – Zeit des Flaschen-Tragens ist vorbei",
    meaning: "آلة منزلية تحول ماء الصنبور العادي إلى مشروبات غازية",
    keywords: ["Sodamaschine = ماكينة صودا", "Leitungswasser = ماء حنفية", "Sprudel = فوار", "selbst machen = صناعة منزلية"],
    simplified: "اصنع سبرايتك الخاص في البيت بضغطة زر",
    imagine: "طفل يضغط على زر ماكينة والماء المثلج يخرج غازيا",
    correct: "h"
};

HELP_DATA["lesen1_exam38_q5"] = {
    text: "'Wasser ist zum Waschen da' lautete ein deutscher Schlager - Viel Wasser trinken - Gesundheit tanken",
    meaning: "شرب الماء يوميا 2.5 لتر عادة صحية أساسية بفوائد متعددة",
    keywords: ["Wasser = ماء", "trinken = شرب", "gesund = صحي", "Mineralstoffe = معادن"],
    simplified: "الماء ينظف جسمك ويعوض سوائلك وأملاحك دون سعرات",
    imagine: "ساعة تذكير تشرب ماء وكل ربع ساعة يرن المنبه",
    correct: "i"
};

// ========== Exam 39: Limonade (التعديل 2) (صحيح: 7,0,3,2,1) ==========
HELP_DATA["lesen1_exam39_q1"] = {
    text: "Möchten Sie Kraft, Jugend und Gesundheit aus der Flasche? - Frische Luft als wahre Energiequelle",
    meaning: "الهواء النقي مجان ويعطيك صحة أفضل من مشروبات الطاقة",
    keywords: ["frische Luft = هواء نقي", "Energie = طاقة", "Sauerstoff = أكسجين", "kostenlos = مجاني"],
    simplified: "أفضل صحة تجدها في هواء نقي مجاني وليس بزجاجات مدفوعة",
    imagine: "رجل يركض في حديقة وأسعار زجاجات المياه الباهظة خلفه",
    correct: "h"
};

HELP_DATA["lesen1_exam39_q2"] = {
    text: "Wenn es regnet, dann fließt das Regenwasser - Vom Regen zum Mineralwasser",
    meaning: "التربة تحول مطرا عاديا إلى مياه معدنية بعد تنقيته طبيعيا",
    keywords: ["Regen = مطر", "Mineralwasser = ماء معدني", "Erde = تربة", "Sandstein = حجر رملي"],
    simplified: "مسيرة قطرة من سقف السماء لبيع الزجاجات باهظة بعد قرون",
    imagine: "قطرة ماء تزحف بين حجارة وقد بدأت رحلتها البراقة",
    correct: "a"
};

HELP_DATA["lesen1_exam39_q3"] = {
    text: "Nach den Unwettern der letzten Sommer - Sommer bedeutet in Zukunft nicht unbedingt Sonne",
    meaning: "تغير الطقس ينذر بصيف مليء بالعواصف لا شمس فقط",
    keywords: ["Sommer = صيف", "Klima = مناخ", "Unwetter = عواصف", "Überschwemmungen = فيضانات"],
    simplified: "صيف شمس مشرق أصبح تراثا قديما بسبب الاحتباس الحراري",
    imagine: "طفل يبكي لأنه لا يستطيع السباحة بفعل الثلوج في شهر يوليو",
    correct: "d"
};

HELP_DATA["lesen1_exam39_q4"] = {
    text: "Wozu noch Kästen mit Mineralwasserflaschen nach Hause schleppen - Sprudel hausgemacht – Zeit des Flaschen-Tragens ist vorbei",
    meaning: "آلة منزلية صغيرة توفر عليك حمل قوارير المياه الغازية الثقيلة",
    keywords: ["Sodamaschine = ماكينة صودا", "Leitungswasser = ماء حنفية", "Sprudel = فوار", "individuell = حسب رغبة"],
    simplified: "آلة بسيطة تمنح ماء الصنبور الفوران والطعم الذي تريده",
    imagine: "رجل يمسك زجاجة فوارة بيد وصنبور ماء باليد الأخرى",
    correct: "c"
};

HELP_DATA["lesen1_exam39_q5"] = {
    text: "'Wasser ist zum Waschen da' lautete ein deutscher Schlager - Viel Wasser trinken - Gesundheit tanken",
    meaning: "شرب 2.5 لتر ماء يوميا عادة يوصي بها الأطباء",
    keywords: ["Wasser = ماء", "trinken = شرب", "Ärzte = أطباء", "Mineralstoffe = معادن"],
    simplified: "الماء أفضل مشروب صحي بلا سعرات وبفوائد لتوازن الجسم",
    imagine: "زجاجة ماء كبيرة إلى جانب طعام وطبيب يبتسم",
    correct: "b"
};

// ========== Exam 40: Auf dem Weg (صحيح: 2,0,3,8,9) ==========
HELP_DATA["lesen1_exam40_q1"] = {
    text: "Wir bieten Bewegungsförderung mit und auf Pferden - Ein tierischer Lernspaß für alle",
    meaning: "برنامج ترفيهي ورياضي على ظهور الخيل لتنشيط الأطفال",
    keywords: ["Pferde = خيول", "Bewegungsförderung = تشجيع حركي", "Teenies = مراهقين", "Reitlehrer = مدرب ركوب"],
    simplified: "مركز خيول يوفر تعليما حركيا ممتعا للشباب",
    imagine: "طفل يربت على رأس حصان بينما يصعد فوق السرج بمساعدة مدرب",
    correct: "c"
};

HELP_DATA["lesen1_exam40_q2"] = {
    text: "Die Schwimm- und Sportfreunde 1905 e.V. - Auf dem Weg zu internationalen Wettkämpfen",
    meaning: "ناد سباحة يعود بقوة ليتأهل أبطاله للمسابقات العالمية",
    keywords: ["Schwimmsport = سباحة", "Wettkämpfe = مسابقات", "Nationalmannschaft = منتخب وطني", "Teilzeitinternat = داخلية جزئية"],
    simplified: "نادي السباحة الألماني يعود لسابق أمجاده العالمية",
    imagine: "سباحة ناشئة تلمس حافة المسبح والجمهور يهتف باسمها",
    correct: "a"
};

HELP_DATA["lesen1_exam40_q3"] = {
    text: "In unserem modernen Studio bieten wir - Fit und gesund auch nach der Pensionierung",
    meaning: "الرياضة والتغذية السليمة مهمة لحيوية الإنسان بعد التقاعد",
    keywords: ["Rentenalter = سن تقاعد", "Ausdauertraining = تدريب تحمل", "Rückenschmerzen = آلام ظهر", "Fitnessstudio = نادي لياقة"],
    simplified: "ممارسة الرياضة تحافظ على نشاطك حتى سن الشيخوخة وتمنع آلام الظهر",
    imagine: "جد بجسم رياضي وابتسامة يعمل على آلة جري في نادي مجاور",
    correct: "d"
};

HELP_DATA["lesen1_exam40_q4"] = {
    text: "Das Trampolin ist ein einzigartiges Trainingsgerät - Schlank, fit und glücklich im Flug",
    meaning: "الترامبولين يحرق سعرات كالجري ويقوي العضلات ويطيل القامة",
    keywords: ["Trampolin = ترامبولين", "Gewichtsabnahme = تخسيس", "Muskeln = عضلات", "Kalorienverbrauch = حرق سعرات"],
    simplified: "القفز على الترامبولين رياضة ممتعة تخسيس وتنشيط ليمفاوي",
    imagine: "شخص يقفز عاليا على الترامبولين ويداه في الهواء بابتسام",
    correct: "i"
};

HELP_DATA["lesen1_exam40_q5"] = {
    text: "Sporttauchen ist eine fantastische Natursportart - Sport treiben wie ein Fisch unter Wasser",
    meaning: "رياضة الغطس تحت الماء تحتاج لياقة وتدريبا خاصا",
    keywords: ["Sporttauchen = غطس رياضي", "unter Wasser = تحت الماء", "tauchfit = لياقة تحت الماء", "Trainer = مدرب"],
    simplified: "الغوص رياضة تحت الماء تعتمد على التنفس الصحيح واللياقة البدنية",
    imagine: "غواص يرتدي سكوبا وأسماك ملونة تسبح حوله ومدرب يرشده",
    correct: "j"
};

// ============================================
// Lesen Teil 1 - Exams 41-47 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 41: Schlafzug (صحيح: 6,4,1,7,9) ==========
HELP_DATA["lesen1_exam41_q1"] = {
    text: "Wussten Sie, dass der längste dokumentierte Winterschlaf - Energiesparverhalten bei Tieren",
    meaning: "الحيوانات تدخل سباتا شتويا لتوفير الطاقة في فترات نقص الغذاء",
    keywords: ["Winterschlaf = سبات شتوي", "Energieverbrauch = استهلاك طاقة", "Körpertemperatur = حرارة جسم", "Nahrung = غذاء"],
    simplified: "الحيوانات تنام شتاء لتوفر طاقتها وتنقص حرارة جسمها",
    imagine: "قنفذ نائم ملفوف في كهف صغير والثلج يتساقط خارجه",
    correct: "g"
};

HELP_DATA["lesen1_exam41_q2"] = {
    text: "In Dänemark wurde ein umfangreiches Schulprojekt durchgeführt - Gutes Licht fördert den Lernerfolg",
    meaning: "الضوء الطبيعي الكبير يحسن تركيز وتحصيل الطلاب في الفصول الدراسية",
    keywords: ["Tageslicht = ضوء طبيعي", "Konzentrationsfähigkeit = قدرة تركيز", "bessere Testergebnisse = نتائج اختبار أفضل", "Wohlbefinden = راحة"],
    simplified: "الفصول المضيئة بالشمس تساعد الطلاب على التركيز والتفوق",
    imagine: "طلاب يجلسون في فصل كبير مليء بالنوافذ والشمس تدخل منهم",
    correct: "e"
};

HELP_DATA["lesen1_exam41_q3"] = {
    text: "Schon die alten Römer wussten, dass ausreichend Schlaf - Durch Schlaf wird man klüger",
    meaning: "النوم الكافي يحسن الذاكرة والتركيز ويساعد في تثبيت المعلومات",
    keywords: ["Schlaf = نوم", "Leistungsfähigkeit = قدرة أداء", "Melatonin = ميلاتونين", "Immunsystem = جهاز مناعي"],
    simplified: "النوم الجيد يقوي ذاكرتك ومناعتك ويحمي قلبك",
    imagine: "طفل نائم بجانب كتابه المدرسي وأحلام اليقظة تطير حوله",
    correct: "b"
};

HELP_DATA["lesen1_exam41_q4"] = {
    text: "Schon im Mittelalter unternahmen Menschen nächtliche Pilgerwege - Im Dunkeln wandern – Tipps für nächtliche Touren",
    meaning: "نصائح وإرشادات للمشي ليلا في الطبيعة بأمان وفوائد صحية",
    keywords: ["nächtliches Wandern = مشي ليلي", "Stresshormone = هرمونات توتر", "Melatonin = ميلاتونين", "Sicherheit = أمان"],
    simplified: "المشي ليلا في الطبيعة يخفف التوتر وينظم نومك",
    imagine: "شخص يمشي في غابة ليلا ويحمل مصباحا يدويا ويمسك خريطة باليد الأخرى",
    correct: "h"
};

HELP_DATA["lesen1_exam41_q5"] = {
    text: "Schon die Weltgesundheitsorganisation (WHO) weist seit Jahren - Was unsere Wintermüdigkeit verursacht",
    meaning: "أسباب الكسل والتعب في الشتاء مرتبطة بقلة ضوء الشمس وتأثيرها على الهرمونات",
    keywords: ["Wintermüdigkeit = تعب شتوي", "Melatonin = ميلاتونين", "Serotonin = سيروتونين", "Lichttherapie = علاج ضوئي"],
    simplified: "قلة ضوء الشمس شتاء تسبب الخمول والتعب بسبب هرمون النوم",
    imagine: "رجل نائم على مكتبه والنافذة مظلمة والثلج يتساقط خارجها",
    correct: "j"
};

// ========== Exam 42: Schlafzug (التعديل 1) (صحيح: 6,4,9,1,0) ==========
HELP_DATA["lesen1_exam42_q1"] = {
    text: "Viele Tiere können im Winter auf Sparflamme schalten - Tiere im Energiesparmodus",
    meaning: "الحيوانات تدخل سباتا شتويا لتقليل استهلاك الطاقة في أوقات الجوع",
    keywords: ["Winterschlaf = سبات شتوي", "Energiesparprogramm = برنامج توفير طاقة", "Nahrungsknappheit = نقص غذاء", "Lichtverhältnisse = ظروف ضوئية"],
    simplified: "الحيوانات تنام شتاء لتتغلب على البرد وقلة الأكل",
    imagine: "دب نائم في عرينه تحت الأرض والرياح تعوي فوقه",
    correct: "g"
};

HELP_DATA["lesen1_exam42_q2"] = {
    text: "Licht kann sich positiv auf die Gesundheit auswirken - Richtiges Licht fördert das Lernen",
    meaning: "الضوء الطبيعي يحسن الصحة والتركيز والأداء الدراسي",
    keywords: ["Tageslicht = ضوء طبيعي", "Leistungsfähigkeit = قدرة إنتاجية", "Klassenräume = فصول", "Konzentration = تركيز"],
    simplified: "النوافذ الكبيرة في الفصول تزيد من تركيز الطلاب وتحصيلهم",
    imagine: "طالب يقرأ كتابا بجانب نافذة كبيرة والشمس تضيء صفحته",
    correct: "e"
};

HELP_DATA["lesen1_exam42_q3"] = {
    text: "Im Winter würden wir morgens am liebsten lange im Bett bleiben - Was hinter unserer Wintermüdigkeit steckt",
    meaning: "السبب الحقيقي وراء الكسل والخمول في الشتاء هو قلة الضوء وتأثيره على هرمون النوم",
    keywords: ["Wintermüdigkeit = تعب شتوي", "Melatonin = ميلاتونين", "Tageslicht = ضوء طبيعي", "Schlafrhythmus = إيقاع نوم"],
    simplified: "كسل الشتاء مرتبط بهرمون النوم الذي يزداد في الظلام",
    imagine: "امرأة تتثاءب والنافذة مغلقة والسماء رمادية بالخارج",
    correct: "j"
};

HELP_DATA["lesen1_exam42_q4"] = {
    text: "Verfestigen sich gelernte Vokabeln, während wir schlafen? - Klug durch Schlaf",
    meaning: "النوم الجيد يساعد الدماغ على تثبيت المعلومات المستفادة خلال اليوم",
    keywords: ["Schlaf = نوم", "geistige Leistungsfähigkeit = قدرة عقلية", "merken = تذكر", "regelmäßige Schlafzeiten = أوقات نوم منتظمة"],
    simplified: "النوم العميق يقوي الذاكرة ويساعدك على حفظ الدروس",
    imagine: "طالب نائم وكتابه مفتوح على سريره وأحرف تخرج من رأسه",
    correct: "b"
};

HELP_DATA["lesen1_exam42_q5"] = {
    text: "Kürzere Tage, dunkle Wolken, Nieselregen - Bewegung macht gute Laune",
    meaning: "الحركة والرياضة في الهواء الطلق تحسن المزاج وتزيل كآبة الشتاء",
    keywords: ["Bewegung = حركة", "Winterblues = كآبة شتوية", "Glückshormone = هرمونات سعادة", "Stimmungsaufheller = محسن مزاج"],
    simplified: "رياضة المشي في الشتاء تفرز هرمونات السعادة وتزيل الكآبة",
    imagine: "شخص يمشي بسرعة في الحديقة والثلج يتساقط وهو يبتسم",
    correct: "a"
};

// ========== Exam 43: Löwen (صحيح: 1,6,4,7,8) ==========
HELP_DATA["lesen1_exam43_q1"] = {
    text: "Der Berliner Zoo gehört zu den bekanntesten Tierparks - Die Löwen sind sehr beliebt unter den Besuchern",
    meaning: "الأسود من أكثر الحيوانات جذبا للزوار في حديقة حيوان برلين",
    keywords: ["Löwen = أسود", "beliebt = محبوب", "Besucher = زوار", "Führungen = جولات إرشادية"],
    simplified: "الأسود هي الحيوان المفضل عند زوار حديقة برلين",
    imagine: "طفل يشير بإصبعه إلى أسد نائم والكل يصورونه بالهواتف",
    correct: "b"
};

HELP_DATA["lesen1_exam43_q2"] = {
    text: "In Südafrika gab es in den letzten Jahren immer wieder Konflikte - Mehr Bemühungen für den Tierschutz",
    meaning: "جهود أكبر لحماية الأسود من الانقراض وإنشاء محميات طبيعية",
    keywords: ["Konflikte = صراعات", "Schutzgebiete = مناطق محمية", "Artenschutz = حماية أنواع", "Ranger = حراس"],
    simplified: "حكومات تنشئ محميات لحماية الأسود من الصراع مع البشر",
    imagine: "رجل يرتدي زيا أخضر ويحمل منظارا يراقب أسدا بعيدا",
    correct: "g"
};

HELP_DATA["lesen1_exam43_q3"] = {
    text: "In den USA spielt der Tourismus eine wichtige Rolle - Löwen bringen Touristen in amerikanische Safari-Parks",
    meaning: "الأسود عامل جذب سياحي رئيسي في حدائق السفاري الأمريكية",
    keywords: ["Löwen = أسود", "Tourismus = سياحة", "Safari-Park = منتزه سفاري", "Übernachtungspakete = باقات مبيت"],
    simplified: "السياح يسافرون لأمريكا خصيصا لمشاهدة الأسود في موائلها الطبيعية",
    imagine: "سائح يصور أسدا من نافذة سيارته في منتزه سفاري",
    correct: "e"
};

HELP_DATA["lesen1_exam43_q4"] = {
    text: "In einigen asiatischen Ländern investieren wohlhabende Familien - Reiche Familien züchten exotische Tiere في Asien",
    meaning: "عائلات غنية في آسيا تقتني الحيوانات المفترسة كالأسود في قصورها",
    keywords: ["exotische Tiere = حيوانات غريبة", "Löwen = أسود", "artgerechte Haltung = تربية لائقة", "Tierschutzorganisationen = منظمات حماية حيوان"],
    simplified: "أثرياء آسيا يشترون الأسود والفهود كحيوانات أليفة في قصورهم",
    imagine: "رجل غني يجلس إلى جانب أسد مربوط في حديقة قصره",
    correct: "j"
};

HELP_DATA["lesen1_exam43_q5"] = {
    text: "Die internationale Tierschutzorganisation 'Save the Wildlife' - Planung für den Tierschutz",
    meaning: "تخطيط وإستراتيجيات لحماية الحيوانات المهددة بالانقراض خاصة الأسود",
    keywords: ["Tierschutzorganisation = منظمة حماية حيوان", "Schutzgebiete = مناطق محمية", "Aufklärung = توعية", "Ranger = حراس"],
    simplified: "منظمة عالمية تخطط لمحميات ودوريات لحماية الأسود من الصيد",
    imagine: "خريطة عليها مناطق خضراء وعلامات أسود وطيور",
    correct: "i"
};

// ========== Exam 44: Fisch (صحيح: 1,9,5,8,7) ==========
HELP_DATA["lesen1_exam44_q1"] = {
    text: "Willkommen in der Wüste. Die Sonne brennt - Extremer Lebensraum",
    meaning: "كيف تعيش الكائنات الحية في بيئات قاسية مثل الصحراء الحارقة",
    keywords: ["Wüste = صحراء", "extreme Umgebung = بيئة متطرفة", "Überlebenskünstler = فنان بقاء", "Bioniker = علماء المحاكاة الحيوية"],
    simplified: "كائنات حية تكيفت مع ظروف الصحراء القاسية",
    imagine: "سحلية تجري على رمال ساخنة ولسانها يخرج سريعا",
    correct: "b"
};

HELP_DATA["lesen1_exam44_q2"] = {
    text: "Denn Bioniker entwickeln technische Anlagen - Auf der Suche nach verborgenen Details",
    meaning: "علماء المحاكاة الحيوية يبحثون عن أسرار الطبيعة الصغيرة لصنع اختراعات مفيدة",
    keywords: ["Bionik = محاكاة حيوية", "Biologie = بيولوجيا", "Technik = تقنية", "Details = تفاصيل"],
    simplified: "علماء يقلدون أسرار الطبيعة لصنع تقنيات جديدة",
    imagine: "عالم ينظر بالميكروسكوب إلى حشرة صغيرة ويرسم تصميمها أمامه",
    correct: "j"
};

HELP_DATA["lesen1_exam44_q3"] = {
    text: "Der Sandfisch ist eigentlich gar kein Fisch - Ein Fisch in den Dünen",
    meaning: "سحلية صغيرة تسبح في الرمال كالسمكة في الماء بفضل جلدها الخشن",
    keywords: ["Sandfisch = سمكة رمل", "Echse = سحلية", "Sand = رمل", "Haut = جلد"],
    simplified: "سحلية تتحرك في الرمال الناعمة بسرعة مذهلة كأنها تسبح",
    imagine: "سحلية صغيرة تختفي فجأة في الرمال وتظهر بعد ثواني بعيدا",
    correct: "f"
};

HELP_DATA["lesen1_exam44_q4"] = {
    text: "Das größte Problem aller Wüstenbewohner ist die Wasserbeschaffung - Trinkwasser aus Nebel",
    meaning: "خنفساء الصحراء تستخلص الماء من الضباب على جسدها لتشرب",
    keywords: ["Wasserbeschaffung = توفير ماء", "Nebeltrinker-Käfer = خنفساء شرب الضباب", "kondensiert = يتكثف", "Nebelnetze = شبكات ضباب"],
    simplified: "خنفساء تشرب الماء المتكثف من الضباب على جسمها في الصحراء",
    imagine: "خنفساء تقف على رأسها في الصحراء وقطرات ماء تتجمع على ظهرها",
    correct: "i"
};

HELP_DATA["lesen1_exam44_q5"] = {
    text: "Beispiel Nummer drei: die Rollerspinne - Rasante Flucht",
    meaning: "عنكبوت يهرب بتدحرجه كعجلة أسفل الكثبان الرملية بسرعة خيالية",
    keywords: ["Rollerspinne = عنكبوت دوار", "Flucht = هروب", "Technische Anwendung = تطبيق تقني", "Mars-Auto = سيارة مريخ"],
    simplified: "عنكبوت يتدحرج مثل الكرة أسفل الكثبان ليهرب من الأعداء بسرعة",
    imagine: "عنكبوت يكور نفسه ويدور بسرعة أسفل كثيب رملي",
    correct: "h"
};

// ========== Exam 45: Frauen im Arbeitsmarkt (صحيح: 0,1,7,3,4) ==========
HELP_DATA["lesen1_exam45_q1"] = {
    text: "Ein hochwertiger Schulabschluss gilt gemeinhin - Schlechtere Chancen für Frauen am Arbeitsmarkt",
    meaning: "النساء أكثر تعليما من الرجال لكن فرصهن في العمل أقل",
    keywords: ["Schulabschluss = شهادة مدرسية", "Frauen = نساء", "Arbeitsmarkt = سوق عمل", "Karriere = مهنة"],
    simplified: "رغم تفوق النساء دراسيا إلا أن فرص عملهن أسوأ من الرجال",
    imagine: "امرأة تحمل شهادة بتفوق ورجل بجانبه يحصل على وظيفة هي التي تريدها",
    correct: "a"
};

HELP_DATA["lesen1_exam45_q2"] = {
    text: "Übergewicht könnte erheblich durch Krankheiten - Schnell essen macht dick",
    meaning: "تناول الطعام بسرعة يمنع إشارات الشبع ويسبب السمنة",
    keywords: ["schnelles Essen = أكل سريع", "Fettleibigkeit = بدانة", "Gehirn = مخ", "Sättigung = شبع"],
    simplified: "الأكل بسرعة يخدع المخ ويمنع إحساس الشبع فيزيد وزنك",
    imagine: "رجل يبتلع طعامه بسرعة وبطنه ينتفخ كالبالون",
    correct: "b"
};

HELP_DATA["lesen1_exam45_q3"] = {
    text: "Wenn Sie mehr über richtige Ernährung wissen wollen - Ernährungstipps kostenlos am Telefon",
    meaning: "خدمة هاتفية مجانية تقدم نصائح غذائية علمية وموثوقة",
    keywords: ["Ernährung = تغذية", "kostenlos = مجاني", "Telefon = هاتف", "wissenschaftlich fundiert = قائم على علم"],
    simplified: "ارقام هاتفية مجانية تعطيك نصائح الأكل الصحي من خبراء",
    imagine: "شخص يتصل هاتفيا وآذنه تسمع نصائح عن الفواكه والخضروات",
    correct: "h"
};

HELP_DATA["lesen1_exam45_q4"] = {
    text: "Das Arbeitsamt Berlin hat seine beiden Informationshefte - Was tun nach der Schule? Neue Ausbildungsmöglichkeiten",
    meaning: "كتيبات إرشادية للشباب عن بدائل الجامعة من تدريب مهني",
    keywords: ["Ausbildungsmöglichkeiten = فرص تدريب", "nach der Schule = بعد المدرسة", "Universitäten = جامعات", "Berufsausbildung = تدريب مهني"],
    simplified: "كتيبات تشرح للشباب طرق العمل والتدريب غير الجامعة",
    imagine: "شاب يقرأ كتيبا وعليه صور لعامل نجار وآخر مبرمج",
    correct: "d"
};

HELP_DATA["lesen1_exam45_q5"] = {
    text: "Junge Frauen in der Schweiz sollen nun mehr Chancen - Initiative: Frauen für Männerberufe begeistern",
    meaning: "حملة سويسرية لتشجيع الفتيات على دخول المهن التقنية والقيادية",
    keywords: ["Motivationskampagne = حملة تحفيز", "Frauen = نساء", "technische Berufe = مهن تقنية", "Berufswahl = اختيار مهنة"],
    simplified: "حملات إعلانية تشجع الفتيات على العمل في الميكانيكا والطب",
    imagine: "ملصق كبير عليه امرأة تصلح سيارة وأخرى تجري عملية قلب مفتوح",
    correct: "e"
};

// ========== Exam 46: Baby TV (صحيح: 7,0,3,4,8) ==========
HELP_DATA["lesen1_exam46_q1"] = {
    text: "Fernsehen ist der Sprachentwicklung bei Kleinkindern nicht förderlich - Schlechte Noten fürs Baby-TV",
    meaning: "برامج الأطفال التلفزيونية لا تساعد الرضع على تعلم الكلمات",
    keywords: ["Fernsehen = تلفاز", "Sprachentwicklung = تطور لغوي", "Kleinkinder = أطفال صغار", "Teletubbys = تليتبيز"],
    simplified: "مشاهدة التلفاز لا تعلم الطفل الصغير الكلمات رغم ألوانها الجميلة",
    imagine: "طفل صغير يحدق في شاشة ملونة ولا ينطق أي كلمة",
    correct: "h"
};

HELP_DATA["lesen1_exam46_q2"] = {
    text: "Pharmakologen am Universitätsklinikum Tübingen - Neue Richtlinie für Zertifizierung von Medikamenten für Kinder",
    meaning: "قواعد جديدة لتجربة أدوية الأطفال لأن كثيرا منها لم يختبر على الأطفال أصلا",
    keywords: ["Medikament = دواء", "Kinder = أطفال", "zugelassen = مرخص", "Dosierung = جرعة"],
    simplified: "أدوية كثيرة تصرف للأطفال رغم أنها لم تختبر عليهم من الأساس",
    imagine: "طبيب يصرف دواء لطفل صغير وعليه علامة استفهام",
    correct: "a"
};

HELP_DATA["lesen1_exam46_q3"] = {
    text: "Alternative Heilverfahren können vor allem bei leichten Erkrankungen - Alternative Heilverfahren: Wie gut sind sie wirklich?",
    meaning: "تقييم مدى فائدة الطب البديل كعلاج مكمل وليس بديلا عن الطب التقليدي",
    keywords: ["alternative Heilverfahren = علاجات بديلة", "Komplementärmedizin = طب تكميلي", "Akupunktur = وبر", "Homöopathie = معالجة مثلية"],
    simplified: "الطب البديل مفيد لحالات بسيطة كعلاج مساعد وليس أساسي",
    imagine: "إبر صينية بجانب علبة دواء عادي على طاولة الطبيب",
    correct: "d"
};

HELP_DATA["lesen1_exam46_q4"] = {
    text: "Die eine liebt Flora und Fauna, die andere hat ein Händchen - Naturkosmetik aus Geschwisterhand",
    meaning: "أختان تديران مزرعة الجينسنغ وتنتجان مستحضرات تجميل طبيعية منه",
    keywords: ["Ginseng = جينسنغ", "Kosmetiklinie = خط تجميل", "Arzneimittel = أدوية", "Anbau = زراعة"],
    simplified: "أختان تنتجان مستحضرات تجميل وأدوية من نبات الجينسنغ الطبي",
    imagine: "امرأتان تفحصان جذور الجينسنغ وسكتين قوارير بجانبهما",
    correct: "e"
};

HELP_DATA["lesen1_exam46_q5"] = {
    text: "Kinder essen zu viel Fast Food, aber zu wenig Obst - Studie: Schulkinder treiben zu wenig Sport",
    meaning: "الأطفال يعانون السمنة بسبب قلة الرياضة وكثرة الوجبات السريعة",
    keywords: ["übergewichtig = زيادة وزن", "Fast Food = وجبات سريعة", "Bewegungsmangel = قلة حركة", "Folgeerkrankungen = أمراض لاحقة"],
    simplified: "نقص الحركة والأكل السريع يجعل أطفال المدارس بدناء",
    imagine: "طفل سمين يجلس على أريكة يأكل برغر وشاشة التلفاز أمامه",
    correct: "i"
};

// ========== Exam 47: Bäder (صحيح: 1,0,5,3,8) ==========
HELP_DATA["lesen1_exam47_q1"] = {
    text: "Entdecken Sie interessante Städte und Regionen - Bäder, Seen und Natur – im hessischen Paradies",
    meaning: "منتجعات صحية وبحيرات وطبيعة خلابة في ولاية هيسن الألمانية",
    keywords: ["Kurorte = منتجعات صحية", "Natur pur = طبيعة نقية", "Edersee = بحيرة إيدر", "Luftkurort = منتجع هوائي"],
    simplified: "جبال وبحيرات وينابيع ساخنة في غرب ألمانيا وجهة سياحية خفية",
    imagine: "بحيرة زرقاء بين الجبال الخضراء ورجل جالس يتأمل",
    correct: "b"
};

HELP_DATA["lesen1_exam47_q2"] = {
    text: "Pferde waren schon immer Melanie Schilles Leidenschaft - Am Strand im Dienst – mehr Sicherheit für Urlauber",
    meaning: "دوريات أمنية على ظهور الخيل على شواطئ بحر الشمال لإنقاذ المصطافين",
    keywords: ["Strandwache = حراسة شاطئ", "Pferd = حصان", "Sicherheit = أمان", "Urlauber = مصطافين"],
    simplified: "فرسان يجوبون الشاطئ لمساعدة السباحين ومنع السرقة",
    imagine: "حصان يجري على الرمال وراكبته تنظر للبحر بمنظار",
    correct: "a"
};

HELP_DATA["lesen1_exam47_q3"] = {
    text: "Ein neuer Urlaubstrend setzt sich durch - Nach harter Arbeit durch nordische Gewässer",
    meaning: "قضاء العطلة على طوف خشبي يبنيه السائح بنفسه في أنهار السويد",
    keywords: ["Floß = طوف", "Abenteuerurlaub = عطلة مغامرة", "Wildnis = برية", "schwimmen lassen = تطفو"],
    simplified: "سياح يبنون أطوافا خشبية ويبحرون عليها في أنهار السويد",
    imagine: "عائلة تجلس على طوف خشبي وسط نهر هادئ وغابات كثيفة حولهم",
    correct: "f"
};

HELP_DATA["lesen1_exam47_q4"] = {
    text: "Von 9 bis 15 Uhr arbeitet Sebastian Keller - Jugendliche arbeiten für Jugendliche",
    meaning: "شباب يتطوعون في أعمال خدمية يوم اجتماعي سنوي لخدمة المجتمع",
    keywords: ["Jugendliche = شباب", "Sozialer Tag = يوم اجتماعي", "Senioren = مسنين", "Altenwohnheim = دار مسنين"],
    simplified: "شباب يتطوعون لمساعدة كبار السن والأطفال في يوم خيري",
    imagine: "مراهق يقرأ كتابا لرجل عجوز في غرفة استراحة دار مسنين",
    correct: "d"
};

HELP_DATA["lesen1_exam47_q5"] = {
    text: "Die Windjacken waren schon eingepackt - Wegen Niedrigwasser: vom Fluss auf die Straße",
    meaning: "انخفاض منسوب المياه في الأنهار يحول رحلة نهرية إلى رحلة حافلات",
    keywords: ["Niedrigwasser = منخفض مائي", "Flusskreuzfahrt = رحلة نهرية", "Bustour = رحلة باص", "Regenmangel = قلة مطر"],
    simplified: "رحلة نهرية ب 2500 يورو تحولت إلى رحلة باص بسبب جفاف النهر",
    imagine: "سفينة كبيرة عالقة في نهر ضحل وركاب يحملون حقائبهم إلى باص بجوارهم",
    correct: "i"
};







// ============================================
// lesen2.js - جميع شروحات Lesen Teil 2
// ============================================


// ============================================
// Exam 1 (exam1.json) - Krista
// ============================================

HELP_DATA["lesen2_exam1_q1"] = {
    text: "sind in der Milchproduktion beliebter als andere Rinderrassen.",
    meaning: "هي الأكثر شعبية في إنتاج الحليب مقارنة بسلالات الأبقار الأخرى.",
    keywords: ["Milchproduktion = إنتاج الحليب", "beliebter = أكثر شعبية"],
    simplified: "أبقار هولشتاين هي الأكثر استخداماً في إنتاج الحليب",
    imagine: "🐄🥛 بقرة تنتج الحليب بغزارة والأبقار الأخرى تنظر إليها"
};

HELP_DATA["lesen2_exam1_q2"] = {
    text: "hat bereits einige Preise gewonnen.",
    meaning: "فازت بالفعل بالعديد من الجوائز.",
    keywords: ["Preise = جوائز", "gewonnen = فازت"],
    simplified: "كريستا فازت بجوائز كثيرة",
    imagine: "🏆🐮 بقرة تقف على منصة التتويج وتحمل كأساً"
};

HELP_DATA["lesen2_exam1_q3"] = {
    text: "wurde Krista operiert.",
    meaning: "خضعت كريستا لعملية جراحية.",
    keywords: ["operiert = عملية جراحية", "wurde = خضعت"],
    simplified: "كريستا خضعت لعملية جراحية",
    imagine: "🏥🐄 أطباء بيطريون يجريون عملية لبقرة"
};

HELP_DATA["lesen2_exam1_q4"] = {
    text: "sind eine Folge des Verbraucherverhaltens.",
    meaning: "هي نتيجة لسلوك المستهلك.",
    keywords: ["Verbraucherverhaltens = سلوك المستهلك", "Folge = نتيجة"],
    simplified: "سلوك المستهلك سبب مشاكل مزارع الحليب",
    imagine: "🛒💰 متسوق يختار دائماً أرخص منتج حليب"
};

HELP_DATA["lesen2_exam1_q5"] = {
    text: "begeistert Kinobetreiber bislang nicht.",
    meaning: "لم يتحمس لها مشغلو دور السينما حتى الآن.",
    keywords: ["Kinobetreiber = مشغلو سينما", "begeistert = متحمس"],
    simplified: "أصحاب دور السينما غير متحمسين للفيلم",
    imagine: "🎬😐 رجل يقول: فيلم عن بقرة؟ لا شكراً"
};

// ============================================
// Exam 2 (exam2.json) - Krista (معدل)
// ============================================

HELP_DATA["lesen2_exam2_q1"] = {
    text: "dominieren als Rinderrasse die Milchviehwirtschaft",
    meaning: "تهيمن كسلالة أبقار على اقتصاد أبقار الحليب",
    keywords: ["dominieren = تهيمن", "Milchviehwirtschaft = اقتصاد أبقار الحليب"],
    simplified: "أبقار هولشتاين هي المسيطرة في إنتاج الحليب",
    imagine: "🐄👑 بقرة ترتدي تاجاً والمزارعون ينحنون لها"
};

HELP_DATA["lesen2_exam2_q2"] = {
    text: "hat bereits einige Preise gewonnen.",
    meaning: "فازت بالفعل بالعديد من الجوائز.",
    keywords: ["Preise = جوائز", "gewonnen = فازت"],
    simplified: "كريستا فازت بجوائز كثيرة",
    imagine: "🏆🐮 بقرة تضع كأساً فوق رأسها"
};

HELP_DATA["lesen2_exam2_q3"] = {
    text: "wurde Krista ärztlich behandelt.",
    meaning: "خضعت كريستا لعلاج طبي.",
    keywords: ["ärztlich = طبياً", "behandelt = عولجت"],
    simplified: "كريستا تلقت علاجاً طبياً",
    imagine: "🩺🐄 طبيب بيطري يسمع نبض قلب بقرة"
};

HELP_DATA["lesen2_exam2_q4"] = {
    text: "sind eine Folge des Verbraucherverhaltens.",
    meaning: "هي نتيجة لسلوك المستهلك.",
    keywords: ["Verbraucherverhaltens = سلوك المستهلك", "Folge = نتيجة"],
    simplified: "سلوك المستهلك سبب مشاكل مزارع الحليب",
    imagine: "🛒💰 متسوق يمد يده إلى حليب رخيص"
};

HELP_DATA["lesen2_exam2_q5"] = {
    text: "begeistert Kinobetreiber bislang nicht.",
    meaning: "لم يتحمس لها مشغلو دور السينما حتى الآن.",
    keywords: ["Kinobetreiber = مشغلو سينما", "begeistert = متحمس"],
    simplified: "أصحاب دور السينما غير متحمسين",
    imagine: "🎬😕 مدير سينما يتثاءب"

};

// ============================================
// Exam 3 (exam3.json) - Der Ein-Personen-Karneval
// ============================================

HELP_DATA["lesen2_exam3_q1"] = {
    text: "führt in Unna einen kleinen Karnevalsumzug durch.",
    meaning: "يقوم في أونا بموكب كرنفال صغير.",
    keywords: ["Karnevalsumzug = موكب كرنفال", "Unna = أونا"],
    simplified: "هيلموت شيرر يقود موكب كرنفال صغير في مدينة أونا",
    imagine: "🎭👨‍🦳 رجل يجر عربة صغيرة في شارع خالٍ"
};

HELP_DATA["lesen2_exam3_q2"] = {
    text: "stellt er sozialkritische Themen auf witzige Art und Weise dar.",
    meaning: "يقدم مواضيع نقد اجتماعي بطريقة فكاهية.",
    keywords: ["sozialkritische Themen = مواضيع نقد اجتماعي", "witzige Art = طريقة فكاهية"],
    simplified: "يعرض هيرلموت قضايا اجتماعية ناقدة بشكل كوميدي",
    imagine: "🎪📢 رجل يضحك الجمهور ويوجه رسالة ناقدة"
};

HELP_DATA["lesen2_exam3_q3"] = {
    text: "hatte zunächst wenig Verständnis für Helmut Scherer.",
    meaning: "لم يكن لديها فهم كبير لهيلموت شيرر في البداية.",
    keywords: ["wenig Verständnis = فهم قليل", "zunächst = في البداية"],
    simplified: "سكان أونا لم يفهموا هيلموت شيرر في البداية",
    imagine: "🤷‍♀️🤷‍♂️ سكان ينظرون إلى رجل غريب ويهزون رؤوسهم"
};

HELP_DATA["lesen2_exam3_q4"] = {
    text: "ist heute eine gute Reklame für die Stadt Unna.",
    meaning: "هو اليوم إعلان جيد لمدينة أونا.",
    keywords: ["Reklame = إعلان", "Stadt Unna = مدينة أونا"],
    simplified: "أصغر موكب كرنفال أصبح دعاية جيدة لأونا",
    imagine: "📢🎉 مدينة تفتخر برجل كرنفال وحيد"
};

HELP_DATA["lesen2_exam3_q5"] = {
    text: "hat an Karnevalsumzügen in mehreren Städten teilgenommen.",
    meaning: "شارك في مواكب كرنفال في عدة مدن.",
    keywords: ["teilgenommen = شارك", "mehreren Städten = عدة مدن"],
    simplified: "هيلموت شارك في كرنفالات مدن متعددة",
    imagine: "🎭🚂 رجل يسافر بعربته إلى مدن مختلفة"
};

// ============================================
// Exam 4 (exam4.json) - Der Ein-Personen-Karneval (معدل)
// ============================================

HELP_DATA["lesen2_exam4_q1"] = {
    text: "veranstaltet an Karneval allein einen Umzug.",
    meaning: "ينظم بمفرده موكباً في الكرنفال.",
    keywords: ["allein = بمفرده", "Umzug = موكب"],
    simplified: "هيلموت شيرر ينظم موكب كرنفال وحيداً",
    imagine: "🎭🚶‍♂️ رجل يمشي وحده في الشارع بملابس مهرج"
};

HELP_DATA["lesen2_exam4_q2"] = {
    text: "stellt er sozialkritische Themen auf witzige Art und Weise dar.",
    meaning: "يقدم مواضيع نقد اجتماعي بطريقة فكاهية.",
    keywords: ["sozialkritische Themen = مواضيع نقد اجتماعي", "witzige Art = طريقة فكاهية"],
    simplified: "يعرض قضايا اجتماعية ناقدة بشكل كوميدي",
    imagine: "🎪📢 رجل يضحك الجمهور ويوجه رسالة ناقدة"
};

HELP_DATA["lesen2_exam4_q3"] = {
    text: "hatte zunächst wenig Verständnis für Helmut Scherer.",
    meaning: "لم يكن لديها فهم كبير لهيلموت شيرر في البداية.",
    keywords: ["wenig Verständnis = فهم قليل", "zunächst = في البداية"],
    simplified: "سكان أونا لم يفهموا هيلموت في البداية",
    imagine: "🤷‍♀️🤷‍♂️ سكان ينظرون إلى رجل غريب ويهزون رؤوسهم"
};

HELP_DATA["lesen2_exam4_q4"] = {
    text: "ist heute eine gute Reklame für die Stadt Unna.",
    meaning: "هو اليوم إعلان جيد لمدينة أونا.",
    keywords: ["Reklame = إعلان", "Stadt Unna = مدينة أونا"],
    simplified: "أصغر موكب كرنفال أصبح دعاية جيدة لأونا",
    imagine: "📢🎉 مدينة تفتخر برجل كرنفال وحيد"
};

HELP_DATA["lesen2_exam4_q5"] = {
    text: "hat an Karnevalsumzügen in mehreren Städten teilgenommen.",
    meaning: "شارك في مواكب كرنفال في عدة مدن.",
    keywords: ["teilgenommen = شارك", "mehreren Städten = عدة مدن"],
    simplified: "هيلموت شارك في كرنفالات مدن متعددة",
    imagine: "🎭🚂 رجل يسافر بعربته إلى مدن مختلفة"
};

// ============================================
// Exam 5 (exam5.json) - ein leben für den Kaffee
// ============================================

HELP_DATA["lesen2_exam5_q1"] = {
    text: "gibt es nur noch wenige traditionelle Kaffeeröstereien.",
    meaning: "لا يوجد سوى عدد قليل من محامص القهوة التقليدية.",
    keywords: ["traditionelle Kaffeeröstereien = محامص قهوة تقليدية", "wenige = قليل"],
    simplified: "عدد محامص القهوة التقليدية قلّ جداً في ألمانيا",
    imagine: "🏭☕ مصنع قهوة قديم وحيد في شارع كانت فيه مصانع كثيرة"
};

HELP_DATA["lesen2_exam5_q2"] = {
    text: "steht eher die Qualität des Kaffees als der Preis im Vordergrund.",
    meaning: "جودة القهوة أهم من السعر.",
    keywords: ["Qualität = جودة", "Preis = سعر", "Vordergrund = الأولوية"],
    simplified: "محمصة مونشهاوزن تفضل الجودة على السعر",
    imagine: "☕💎 شخص يختار قهوة أغلى ثمناً لكنها أجود"
};

HELP_DATA["lesen2_exam5_q3"] = {
    text: "müssen nach dem Rösten handverlesen werden, um eine gleichbleibend hohe Qualität zu gewährleisten.",
    meaning: "يجب فرزها يدوياً بعد التحميص لضمان جودة عالية ثابتة.",
    keywords: ["handverlesen = فرز يدوي", "gleichbleibend = ثابت", "Qualität = جودة"],
    simplified: "حبوب القهوة تُفرز باليد بعد التحميص للحفاظ على الجودة",
    imagine: "🫘✋ شخص يفرز حبوب القهوة بيديه واحدة تلو الأخرى"
};

HELP_DATA["lesen2_exam5_q4"] = {
    text: "zusätzlich online vermarktet.",
    meaning: "يتم تسويقها أيضاً عبر الإنترنت.",
    keywords: ["online = عبر الإنترنت", "vermarktet = يتم تسويقها"],
    simplified: "حبوب القهوة تُباع أيضاً على الإنترنت",
    imagine: "💻☕ شاشة كمبيوتر تعرض صور قهوة وسلة شراء"
};

HELP_DATA["lesen2_exam5_q5"] = {
    text: "die Kaffeerösterei in ein Museum umwandeln.",
    meaning: "تحويل محمصة القهوة إلى متحف.",
    keywords: ["Museum = متحف", "umwandeln = تحويل"],
    simplified: "مالكات المحمصة يخططن لتحويلها إلى متحف",
    imagine: "🏛️☕ مبنى قديم مكتوب عليه متحف القهوة وزبائن يشربون قهوة"
};

// ============================================
// Exam 6 (exam6.json) - ein leben für den Kaffee (معدل 1)
// ============================================

HELP_DATA["lesen2_exam6_q1"] = {
    text: "nur noch eine geringe Zahl von Kaffeeröstereien.",
    meaning: "فقط عدد قليل من محامص القهوة.",
    keywords: ["geringe Zahl = عدد قليل", "Kaffeeröstereien = محامص قهوة"],
    simplified: "عدد محامص القهوة التقليدية أصبح قليلاً جداً",
    imagine: "🏭☕ محمصة قهوة وحيدة في مدينة كبيرة"
};

HELP_DATA["lesen2_exam6_q2"] = {
    text: "steht eher die Qualität des Kaffees als der Preis im Vordergrund.",
    meaning: "جودة القهوة أهم من السعر.",
    keywords: ["Qualität = جودة", "Preis = سعر", "Vordergrund = الأولوية"],
    simplified: "محمصة مونشهاوزن تفضل الجودة على السعر",
    imagine: "☕💎 شخص يختار قهوة أغلى ثمناً لكنها أجود"
};

HELP_DATA["lesen2_exam6_q3"] = {
    text: "müssen nach dem Rösten handverlesen werden, um eine gleichbleibend hohe Qualität zu gewährleisten.",
    meaning: "يجب فرزها يدوياً بعد التحميص لضمان جودة عالية ثابتة.",
    keywords: ["handverlesen = فرز يدوي", "gleichbleibend = ثابت", "Qualität = جودة"],
    simplified: "حبوب القهوة تُفرز باليد بعد التحميص للحفاظ على الجودة",
    imagine: "🫘✋ شخص يفرز حبوب القهوة بيديه واحدة تلو الأخرى"
};

HELP_DATA["lesen2_exam6_q4"] = {
    text: "in unterschiedlichen Geschmacksrichtungen verkauft",
    meaning: "تُباع بنكهات مختلفة",
    keywords: ["Geschmacksrichtungen = نكهات", "verkauft = تباع"],
    simplified: "حبوب القهوة تُباع بنكهات متنوعة",
    imagine: "☕🍫☕🍯 أكواب قهوة بنكهات مختلفة"
};

HELP_DATA["lesen2_exam6_q5"] = {
    text: "die Kaffeerösterei in ein Museum umwandeln.",
    meaning: "تحويل محمصة القهوة إلى متحف.",
    keywords: ["Museum = متحف", "umwandeln = تحويل"],
    simplified: "مالكات المحمصة يخططن لتحويلها إلى متحف",
    imagine: "🏛️☕ مبنى قديم مكتوب عليه متحف القهوة وزبائن يشربون قهوة"
};

// ============================================
// Exam 7 (exam7.json) - ein leben für den Kaffee (معدل 2)
// ============================================

HELP_DATA["lesen2_exam7_q1"] = {
    text: "gibt es nur noch wenige traditionelle Kaffeeröstereien.",
    meaning: "لا يوجد سوى عدد قليل من محامص القهوة التقليدية.",
    keywords: ["traditionelle Kaffeeröstereien = محامص قهوة تقليدية", "wenige = قليل"],
    simplified: "عدد محامص القهوة التقليدية قلّ جداً في ألمانيا",
    imagine: "🏭☕ مصنع قهوة قديم وحيد في شارع كانت فيه مصانع كثيرة"
};

HELP_DATA["lesen2_exam7_q2"] = {
    text: "stehen die Güte und Beschaffenheit des Kaffees im Vordergrund",
    meaning: "جودة وطبيعة القهوة هي الأولوية",
    keywords: ["Güte = جودة", "Beschaffenheit = طبيعة", "Vordergrund = الأولوية"],
    simplified: "الجودة والطبيعة أهم شيء في محمصة مونشهاوزن",
    imagine: "☕🔍 شخص يفحص حبوب القهوة بعدسة مكبرة"
};

HELP_DATA["lesen2_exam7_q3"] = {
    text: "müssen nach dem Rösten handverlesen werden, um eine gleichbleibend hohe Qualität zu gewährleisten.",
    meaning: "يجب فرزها يدوياً بعد التحميص لضمان جودة عالية ثابتة.",
    keywords: ["handverlesen = فرز يدوي", "gleichbleibend = ثابت", "Qualität = جودة"],
    simplified: "حبوب القهوة تُفرز باليد بعد التحميص للحفاظ على الجودة",
    imagine: "🫘✋ شخص يفرز حبوب القهوة بيديه واحدة تلو الأخرى"
};

HELP_DATA["lesen2_exam7_q4"] = {
    text: "zusätzlich online vermarktet.",
    meaning: "يتم تسويقها أيضاً عبر الإنترنت.",
    keywords: ["online = عبر الإنترنت", "vermarktet = يتم تسويقها"],
    simplified: "حبوب القهوة تُباع أيضاً على الإنترنت",
    imagine: "💻☕ شاشة كمبيوتر تعرض صور قهوة وسلة شراء"
};

HELP_DATA["lesen2_exam7_q5"] = {
    text: "die Kaffeerösterei zu Bildungszwecken zur Verfügung stellen",
    meaning: "تقديم محمصة القهوة للأغراض التعليمية",
    keywords: ["Bildungszwecken = أغراض تعليمية", "zur Verfügung stellen = تقديم"],
    simplified: "تحويل المحمصة إلى مكان تعليمي عن القهوة",
    imagine: "📚☕ طلاب يجلسون في محمصة قديمة ويتعلمون عن القهوة"
};

// ============================================
// Exam 8 (exam8.json) - Kreditkarte
// ============================================

HELP_DATA["lesen2_exam8_q1"] = {
    text: "gibt es für Jugendliche schon bei zahlreichen Geldinstituten.",
    meaning: "توجد للشباب بالفعل في العديد من المؤسسات المالية.",
    keywords: ["Jugendliche = شباب", "Geldinstituten = مؤسسات مالية"],
    simplified: "بطاقة الدفع المسبق موجودة للشباب في عدة بنوك",
    imagine: "💳🧑 بطاقة بلاستيكية بجانب مراهق يبتسم"
};

HELP_DATA["lesen2_exam8_q2"] = {
    text: "weil die Ausgaben durch das Guthaben begrenzt sind",
    meaning: "لأن المصاريف محدودة بالرصيد",
    keywords: ["Ausgaben = مصاريف", "Guthaben = رصيد", "begrenzt = محدودة"],
    simplified: "التحكم في التكاليف لأن الرصيد محدد",
    imagine: "💰🔒 محفظة مقفلة بقفل ويمكن فتحها بقدر محدود"
};

HELP_DATA["lesen2_exam8_q3"] = {
    text: "Jugendliche ohne festes Einkommen",
    meaning: "الشباب بدون دخل ثابت",
    keywords: ["Jugendliche = شباب", "kein festes Einkommen = لا دخل ثابت"],
    simplified: "بطاقة الدفع المسبق مناسبة للشباب بلا دخل ثابت",
    imagine: "💳🧑 مراهق يمسك بطاقة ومحفظته فارغة"
};

HELP_DATA["lesen2_exam8_q4"] = {
    text: "kosten ähnlich viel wie klassische Kreditkarten",
    meaning: "تكلف تقريباً مثل بطاقات الائتمان التقليدية",
    keywords: ["kosten = تكلف", "ähnlich = تقريباً", "klassische Kreditkarten = بطاقات ائتمان تقليدية"],
    simplified: "أسعار بطاقات الدفع المسبق مثل بطاقات الائتمان العادية",
    imagine: "💳💰 بطاقتان جنباً إلى جنب وسعرهما متساوٍ"
};

HELP_DATA["lesen2_exam8_q5"] = {
    text: "Erwachsene ab 21 Jahren eine höhere Jahresgebühr als Jugendliche",
    meaning: "البالغون من 21 سنة فما فوق رسوم سنوية أعلى من الشباب",
    keywords: ["Erwachsene = بالغون", "Jahresgebühr = رسوم سنوية", "höhere = أعلى"],
    simplified: "الكبار يدفعون رسوم سنوية أكثر من الشباب",
    imagine: "👨💳👦 رجل يدفع نقوداً أكثر من مراهق"
};

// ============================================
// Exam 9 (exam9.json) - Gedächtnis
// ============================================

HELP_DATA["lesen2_exam9_q1"] = {
    text: "junge und alte Menschen gleichermaßen",
    meaning: "الشباب وكبار السن على حد سواء",
    keywords: ["junge = شباب", "alte Menschen = كبار السن", "gleichermaßen = على حد سواء"],
    simplified: "ندوات ميلاني هوفمان يحضرها الشباب والكبار معاً",
    imagine: "👦🧓👧🧓 مجموعة من الشباب والكبار يجلسون في قاعة"
};

HELP_DATA["lesen2_exam9_q2"] = {
    text: "sich von den vielen Informationen überfordert fühlen",
    meaning: "يشعرون بالإرهاق من كثرة المعلومات",
    keywords: ["überfordert = مرهق", "vielen Informationen = معلومات كثيرة"],
    simplified: "المشاركون يشعرون بالإرهاق من كثرة المعلومات",
    imagine: "📚😫 شخص واقف أمام جبل من الكتب ولا يعرف من أين يبدأ"
};

HELP_DATA["lesen2_exam9_q3"] = {
    text: "vergisst die meisten Informationen innerhalb kürzester Zeit",
    meaning: "ينسى معظم المعلومات في أقصر وقت",
    keywords: ["vergisst = ينسى", "kürzester Zeit = أقصر وقت"],
    simplified: "الإنسان ينسى معظم المعلومات بسرعة",
    imagine: "🧠💨 شخص يقرأ شيئاً ثم يخرج من أذنه الأخرى"
};

HELP_DATA["lesen2_exam9_q4"] = {
    text: "emotional aufgeladene Situationen merken",
    meaning: "تذكر المواقف المشحونة عاطفياً",
    keywords: ["emotional = عاطفي", "aufgeladene Situationen = مواقف مشحونة"],
    simplified: "المواقف العاطفية تبقى في الذاكرة أكثر",
    imagine: "😢❤️ شخص يتذكر لحظة بكاء أو فرح بقوة"
};

HELP_DATA["lesen2_exam9_q5"] = {
    text: "verbindet Informationen mit Bildern",
    meaning: "تربط المعلومات بالصور",
    keywords: ["verbindet = تربط", "Informationen = معلومات", "Bildern = صور"],
    simplified: "سوما هارتمان تربط المعلومات بصور لتتذكرها",
    imagine: "🧠🖼️ شخص يربط رقم 2 بصورة بجعة"
};

// ============================================
// Exam 10 (exam10.json) - Gedächtnis (معدل)
// ============================================

HELP_DATA["lesen2_exam10_q1"] = {
    text: "sowohl aus jungen als auch alten Menschen",
    meaning: "من الشباب وكبار السن على حد سواء",
    keywords: ["jungen = شباب", "alten Menschen = كبار السن", "sowohl...als auch = كلاهما"],
    simplified: "ندوات سوزانا وينكلر يحضرها الشباب والكبار معاً",
    imagine: "👦🧓👧🧓 مجموعة من الشباب والكبار يجلسون في قاعة"
};

HELP_DATA["lesen2_exam10_q2"] = {
    text: "sich von den vielen Informationen überfordert fühlen",
    meaning: "يشعرون بالإرهاق من كثرة المعلومات",
    keywords: ["überfordert = مرهق", "vielen Informationen = معلومات كثيرة"],
    simplified: "المشاركون يشعرون بالإرهاق من كثرة المعلومات",
    imagine: "📚😫 شخص واقف أمام جبل من الكتب ولا يعرف من أين يبدأ"
};

HELP_DATA["lesen2_exam10_q3"] = {
    text: "vergisst die meisten Informationen innerhalb kürzester Zeit",
    meaning: "ينسى معظم المعلومات في أقصر وقت",
    keywords: ["vergisst = ينسى", "kürzester Zeit = أقصر وقت"],
    simplified: "الإنسان ينسى معظم المعلومات بسرعة",
    imagine: "🧠💨 شخص يقرأ شيئاً ثم يخرج من أذنه الأخرى"
};

HELP_DATA["lesen2_exam10_q4"] = {
    text: "intensive Gefühle merken",
    meaning: "تذكر المشاعر القوية",
    keywords: ["intensive Gefühle = مشاعر قوية", "merken = تذكر"],
    simplified: "المشاعر القوية تبقى في الذاكرة أكثر",
    imagine: "😢❤️ شخص يتذكر لحظة بكاء أو فرح بقوة"
};

HELP_DATA["lesen2_exam10_q5"] = {
    text: "verbindet Informationen mit Bildern",
    meaning: "تربط المعلومات بالصور",
    keywords: ["verbindet = تربط", "Informationen = معلومات", "Bildern = صور"],
    simplified: "جيني هيلفر تربط المعلومات بصور لتتذكرها",
    imagine: "🧠🖼️ شخص يربط رقم 2 بصورة بجعة"
};

// ============================================
// Exam 11 (exam11.json) - Kaufentscheidungen
// ============================================

HELP_DATA["lesen2_exam11_q1"] = {
    text: "welche Einflüsse bestimmte Faktoren auf das Kaufverhalten haben",
    meaning: "ما هي تأثيرات عوامل معينة على سلوك الشراء",
    keywords: ["Einflüsse = تأثيرات", "Kaufverhalten = سلوك الشراء"],
    simplified: "دراسات عن تأثير العوامل على قرارات الشراء",
    imagine: "🧠🛒 شخص أمام رف متجر ويحلل خياراته بجدية"
};

HELP_DATA["lesen2_exam11_q2"] = {
    text: "das Empfinden von Kälte zum Kauf romantischer Filme animiert",
    meaning: "الشعور بالبرد يحفز على شراء أفلام رومانسية",
    keywords: ["Empfinden von Kälte = الشعور بالبرد", "romantischer Filme = أفلام رومانسية"],
    simplified: "البرد يجعلك ترغب في مشاهدة أفلام رومانسية",
    imagine: "❄️📀 رجل يرتجف من البرد ويمد يده إلى فيلم رومانسي"
};

HELP_DATA["lesen2_exam11_q3"] = {
    text: "ob die Reihenfolge von Produktinformationen das Kaufverhalten beeinflusst",
    meaning: "هل ترتيب معلومات المنتج يؤثر على سلوك الشراء",
    keywords: ["Reihenfolge = ترتيب", "Produktinformationen = معلومات المنتج", "Kaufverhalten = سلوك الشراء"],
    simplified: "ترتيب المعلومات يؤثر على قرار الشراء",
    imagine: "📝🔢 شخص يقرأ عرضاً: 10 قطع بسعر 5 يورو أو 5 يورو لـ 10 قطع"
};

HELP_DATA["lesen2_exam11_q4"] = {
    text: "nutzt unter Zeitdruck vor allem die erste Information einer Botschaft",
    meaning: "يستخدم تحت ضغط الوقت أول معلومة في الرسالة",
    keywords: ["Zeitdruck = ضغط وقت", "erste Information = أول معلومة", "Botschaft = رسالة"],
    simplified: "تحت الضغط، الدماغ يصدق أول معلومة يسمعها",
    imagine: "⏰🧠 شخص ينظر سريعاً إلى رقم أول ويقرر الشراء"
};

HELP_DATA["lesen2_exam11_q5"] = {
    text: "Mengenangabe vor dem Preis genannt wird",
    meaning: "ذكر الكمية قبل السعر",
    keywords: ["Mengenangabe = ذكر الكمية", "Preis = سعر", "genannt = مذكور"],
    simplified: "ذكر الكمية قبل السعر يجعل العروض أكثر إغراءً",
    imagine: "🏷️🔢 كيس كبير كُتب عليه: 10 كيلوغرام - 20 يورو"
};

// ============================================
// Exam 12 (exam12.json) - Kellnern - Nebenjob
// ============================================

HELP_DATA["lesen2_exam12_q1"] = {
    text: "lässt sich gut mit dem Studium vereinbaren",
    meaning: "يمكن التوفيق بينه وبين الدراسة بسهولة",
    keywords: ["Studium = دراسة", "vereinbaren = التوفيق بين"],
    simplified: "عمل النادل يتناسب مع وقت الدراسة",
    imagine: "🍽️📚 نادل يذاكر في أثناء استراحة العمل"
};

HELP_DATA["lesen2_exam12_q2"] = {
    text: "sollte nicht aus der Ruhe zu bringen sein",
    meaning: "يجب ألا يفقد أعصابه بسهولة",
    keywords: ["aus der Ruhe bringen = يفقد أعصابه", "nicht = لا"],
    simplified: "النادل يجب أن يكون هادئ الأعصاب",
    imagine: "😤🍽️ زبون غاضب والنادل يبتسم ببقاء"
};

HELP_DATA["lesen2_exam12_q3"] = {
    text: "weil er mit dem Verdienst ganz zufrieden ist",
    meaning: "لأنه راضٍ تماماً عن دخله",
    keywords: ["Verdienst = دخل", "zufrieden = راضٍ"],
    simplified: "يان سعيد بدخله كساعي دراجة",
    imagine: "🚴‍♂️💰 شاب على دراجة يحسب نقوده ويبتسم"
};

HELP_DATA["lesen2_exam12_q4"] = {
    text: "dass er durch seinen Job keine Ausgaben für ein Fitnessstudio hat",
    meaning: "بسبب وظيفته ليس لديه مصاريف لنادي رياضي",
    keywords: ["Ausgaben = مصاريف", "Fitnessstudio = نادي رياضي"],
    simplified: "يان لا يحتاج نادياً رياضياً لأنه يتحرك كثيراً في العمل",
    imagine: "🚴‍♂️💪 شاب يركض بعربة ويقول: هذا ناديي الرياضي"
};

HELP_DATA["lesen2_exam12_q5"] = {
    text: "sich beim Einkauf an einen festen Ablauf halten",
    meaning: "تلتزم بتسلسل ثابت أثناء التسوق",
    keywords: ["festen Ablauf = تسلسل ثابت", "Einkauf = تسوق"],
    simplified: "ستيفاني تتبع خطوات محددة كمتسوقة اختبارية",
    imagine: "🛍️📋 امرأة تتسوق ومعها قائمة مهام تتبعها بدقة"
};

// ============================================
// Exam 13 (exam13.json) - die Ernährung
// ============================================

HELP_DATA["lesen2_exam13_q1"] = {
    text: "lassen das Frühstück aus Zeitmangel ausfallen",
    meaning: "يحذفون وجبة الإفطار لضيق الوقت",
    keywords: ["Zeitmangel = ضيق وقت", "ausfallen = يحذفون"],
    simplified: "بعض الأهل لا يعطون أطفالهم فطوراً لعدم وجود وقت",
    imagine: "⏰🍳 أم تنظر إلى ساعتها بسرعة وتخرج بدون فطور"
};

HELP_DATA["lesen2_exam13_q2"] = {
    text: "erhöht die Leistungen des Kindes",
    meaning: "يزيد من أداء الطفل",
    keywords: ["Leistungen = أداء", "erhöht = يزيد"],
    simplified: "الفطور الصحي يزيد تركيز الطفل وأداءه",
    imagine: "🥛🍌 طفل يأكل فطوراً ويبتسم بقوة في المدرسة"
};

HELP_DATA["lesen2_exam13_q3"] = {
    text: "wird in verschiedenen Geschmacksrichtungen angeboten",
    meaning: "تُقدم بنكهات مختلفة",
    keywords: ["Geschmacksrichtungen = نكهات", "angeboten = تُقدم"],
    simplified: "الحليب متوفر بنكهات متعددة كالفراولة والكاكاو",
    imagine: "🥛🍓🥛🍫 زجاجات حليب بألوان مختلفة"
};

HELP_DATA["lesen2_exam13_q4"] = {
    text: "denken von alleine nicht immer daran, genug zu trinken",
    meaning: "لا يتذكرون دائماً شرب كمية كافية من الماء",
    keywords: ["trinken = يشرب", "denken daran = يتذكر"],
    simplified: "الأطفال ينسون شرب الماء أثناء اللعب أو الدراسة",
    imagine: "🧒🎮👧 طفل يلعب ويبدو عطشاناً لكنه ينسى الشرب"
};

HELP_DATA["lesen2_exam13_q5"] = {
    text: "sollte in der Schule angeboten werden",
    meaning: "يجب أن يُقدم في المدرسة",
    keywords: ["Schule = مدرسة", "angeboten = يُقدم"],
    simplified: "يجب توفير وجبة غداء مناسبة في المدرسة",
    imagine: "🏫🍲 طفلة تحمل صينية طعام في كافتيريا المدرسة"
};

// ============================================
// Exam 14 (exam14.json) - Geschichte des Hauspersonals
// ============================================

HELP_DATA["lesen2_exam14_q1"] = {
    text: "damit sie lernten, einen Haushalt zu führen",
    meaning: "لكي تتعلم كيفية إدارة منزل",
    keywords: ["Haushalt führen = إدارة منزل", "lernten = تتعلم"],
    simplified: "الآباء أرسلوا بناتهم خادمات ليتعلمن التدبير المنزلي",
    imagine: "🧹👧 فتاة صغيرة تمسك مكنسة وتنظر إلى أمها"
};

HELP_DATA["lesen2_exam14_q2"] = {
    text: "alleine",
    meaning: "بمفردهن",
    keywords: ["alleine = بمفردها"],
    simplified: "الفتيات كن يجدن العمل بأنفسهن دون مساعدة",
    imagine: "🚉👧 فتاة واقعة في محطة قطار وتبدو ضائعة وحيدة"
};

HELP_DATA["lesen2_exam14_q3"] = {
    text: "auch bei den weniger reichen Leuten",
    meaning: "أيضاً عند الناس الأقل غنىً",
    keywords: ["weniger reichen = أقل غنىً", "Leuten = ناس"],
    simplified: "الخادمات كن موجودات حتى في البيوت المتوسطة",
    imagine: "🏠🧹 سيدة في منزل بسيط وخادمة بجانبها"
};

HELP_DATA["lesen2_exam14_q4"] = {
    text: "mussten länger arbeiten als Fabrikarbeiter",
    meaning: "كان عليهن العمل لفترة أطول من عمال المصانع",
    keywords: ["länger arbeiten = العمل لفترة أطول", "Fabrikarbeiter = عمال مصانع"],
    simplified: "الخادمات كن يعملن ساعات أطول من عمال المصانع",
    imagine: "⏰🧹 خادمة تعمل ليلاً وعامل مصنع نائم"
};

HELP_DATA["lesen2_exam14_q5"] = {
    text: "fast kein Geld",
    meaning: "تقريباً لا نقود",
    keywords: ["kein Geld = لا نقود", "fast = تقريباً"],
    simplified: "الخادمات كن يأخذن أجراً قليلاً جداً",
    imagine: "💰❌ يد فارغة بدون نقود"
};

// ============================================
// Exam 15 (exam15.json) - Österreich, das Land der Poolbesitzer
// ============================================

HELP_DATA["lesen2_exam15_q1"] = {
    text: "mehr Leute einen Pool bauen, weil Pools billiger geworden sind",
    meaning: "المزيد من الناس يبنون أحواض سباحة لأنها أصبحت أرخص",
    keywords: ["billiger = أرخص", "Pool bauen = بناء حوض سباحة"],
    simplified: "انتشار أحواض السباحة في النمسا بسبب انخفاض الأسعار",
    imagine: "🏊‍♂️💰 حوض سباحة جديد ولافتة مكتوب عليها سعر مخفض"
};

HELP_DATA["lesen2_exam15_q2"] = {
    text: "steht ein Pool nicht an erster Stelle auf der Wunschliste",
    meaning: "حوض السباحة ليس في المرتبة الأولى في قائمة الرغبات",
    keywords: ["erster Stelle = المرتبة الأولى", "Wunschliste = قائمة رغبات"],
    simplified: "حوض السباحة ليس أول ما يريده النمساويون",
    imagine: "📝1️⃣2️⃣ قائمة: شرفة، مرآب، حديقة، ثم حوض سباحة"
};

HELP_DATA["lesen2_exam15_q3"] = {
    text: "ihr Pool ein Anziehungspunkt für Freunde geworden ist",
    meaning: "حوض السباحة الخاص بها أصبح نقطة جذب للأصدقاء",
    keywords: ["Anziehungspunkt = نقطة جذب", "Freunde = أصدقاء"],
    simplified: "حوض ريجا جذب الأصدقاء والأقارب للزيارة",
    imagine: "🏊‍♀️👫 أصدقاء حول حوض سباحة يضحكون ويلهون"
};

HELP_DATA["lesen2_exam15_q4"] = {
    text: "brauchen keine chemischen Reinigungsmittel",
    meaning: "لا تحتاج إلى مواد تنظيف كيميائية",
    keywords: ["chemischen Reinigungsmittel = مواد تنظيف كيميائية", "brauchen = تحتاج"],
    simplified: "أحواض السباحة الطبيعية لا تحتاج لكيماويات للتنظيف",
    imagine: "🌿🏊‍♂️ حوض سباحة نظيف بالماء والنباتات فقط"
};

HELP_DATA["lesen2_exam15_q5"] = {
    text: "wird manchmal Wasser zum Befüllen von Pools gestohlen",
    meaning: "يتم أحياناً سرقة الماء لملء أحواض السباحة",
    keywords: ["gestohlen = مسروق", "Befüllen = ملء"],
    simplified: "بعض الناس يسرقون المياه من صنابير الشوارع لملء أحواضهم",
    imagine: "🚰🔓 رجل يملأ حوض سباحة من صنبور حريق الشارع بسرعة"
};

// ============================================
// Exam 16 (exam16.json) - Großraumbüros
// ============================================

HELP_DATA["lesen2_exam16_q1"] = {
    text: "belegt, dass die Mitarbeiter sich über Lärm im Großraumbüro beklagen",
    meaning: "تثبت أن الموظفين يتذمرون من الضوضاء في المكاتب المفتوحة",
    keywords: ["Lärm = ضوضاء", "beklagen = يتذمرون", "Großraumbüro = مكتب مفتوح"],
    simplified: "الدراسة أثبتت أن المكاتب المفتوحة مزعجة للموظفين",
    imagine: "🔊👂 شخص يضع يديه على أذنيه في مكتب مليء بالضوضاء"
};

HELP_DATA["lesen2_exam16_q2"] = {
    text: "sind kostengünstiger zu beheizen",
    meaning: "تكلفة تدفئتها أقل",
    keywords: ["kostengünstiger = أقل تكلفة", "beheizen = تدفئة"],
    simplified: "المكاتب المفتوحة أرخص في التدفئة",
    imagine: "🔥🏢 تدفئة مركزية واحدة تدفئ كل المكتب"
};

HELP_DATA["lesen2_exam16_q3"] = {
    text: "bevorzugen Einzelbüros",
    meaning: "يفضلون المكاتب الفردية",
    keywords: ["bevorzugen = يفضلون", "Einzelbüros = مكاتب فردية"],
    simplified: "الموظفون الألمان يفضلون مكاتب منفردة خاصة",
    imagine: "🚪🏢 شخص يغلق باب مكتبه ويرتاح"
};

HELP_DATA["lesen2_exam16_q4"] = {
    text: "wird in London oft unter mehreren Mitarbeitern aufgeteilt",
    meaning: "تُقسم غالباً بين عدة موظفين في لندن",
    keywords: ["aufgeteilt = مقسمة", "mehreren Mitarbeitern = عدة موظفين"],
    simplified: "مساحة العمل في لندن تُقسم بين عدة موظفين",
    imagine: "📏👥 عدة أشخاص يجلسون حول مكتب واحد صغير"
};

HELP_DATA["lesen2_exam16_q5"] = {
    text: "gibt es vor allem in Banken und Telekommunikationsunternehmen",
    meaning: "توجد خاصة في البنوك وشركات الاتصالات",
    keywords: ["Banken = بنوك", "Telekommunikationsunternehmen = شركات اتصالات"],
    simplified: "المكاتب المفتوحة موجودة بكثرة في البنوك وشركات الاتصالات",
    imagine: "🏢📱 مكتب مليء بموظفين يتحدثون على الهواتف"
};

// ============================================
// Exam 17 (exam17.json) - Korbjagd zu Pferde
// ============================================

HELP_DATA["lesen2_exam17_q1"] = {
    text: "bilden die deutsche Nationalmannschaft",
    meaning: "يشكلون المنتخب الألماني",
    keywords: ["Nationalmannschaft = منتخب وطني", "bilden = يشكلون"],
    simplified: "لاعبو فيسبادن هم المنتخب الألماني في الرمي بالخيل",
    imagine: "🏆🐎 فريق يرفع علم ألمانيا على صهوات الخيل"
};

HELP_DATA["lesen2_exam17_q2"] = {
    text: "sind so gedreht, dass ihre Öffnungen nach der Seite zeigen",
    meaning: "ملفوفة بحيث تكون فتحاتها جانبية",
    keywords: ["gedreht = ملفوفة", "Öffnungen = فتحات", "Seite = جانب"],
    simplified: "سلال كرة السلة في الرمي بالخيل موضوعة بشكل أفقي",
    imagine: "🏀➡️🥅 سلة موضوعة جانبياً بدلاً من أفقياً"
};

HELP_DATA["lesen2_exam17_q3"] = {
    text: "kann sein eigenes Pferd einsetzen",
    meaning: "يمكنه استخدام حصانه الخاص",
    keywords: ["eigenes Pferd = حصان خاص", "einsetzen = استخدام"],
    simplified: "المشارك في الدورة يمكنه استخدام حصانه الخاص إن أراد",
    imagine: "🐎✅ رجل يربت على رأس حصانه ويقول: هذا حصاني"
};

HELP_DATA["lesen2_exam17_q4"] = {
    text: "darf der Ball in die Hand genommen werden",
    meaning: "يمكن أخذ الكرة باليد",
    keywords: ["Ball = كرة", "Hand = يد", "genommen = مأخوذ"],
    simplified: "في الرمي بالخيل، يمكن للاعب الإمساك بالكرة بيده",
    imagine: "🤾‍♂️🐎 لاعب على حصان يمسك كرة بيده"
};

HELP_DATA["lesen2_exam17_q5"] = {
    text: "die Reiter oft mehr Stress zu empfinden scheinen als die Tiere",
    meaning: "يبدو أن الفرسان يعانون من إجهاد أكثر من الحيوانات",
    keywords: ["Stress = إجهاد", "Reiter = فرسان", "Tiere = حيوانات"],
    simplified: "التدريب مرهق للفرسان أكثر من الخيول",
    imagine: "😓🐴 فارس يتصبب عرقاً والحصان يبدو مرتاحاً"
};

// ============================================
// Exam 18 (exam18.json) - Mehrsprachige Erziehung
// ============================================

HELP_DATA["lesen2_exam18_q1"] = {
    text: "kommunikativer",
    meaning: "أكثر تواصلاً",
    keywords: ["kommunikativer = أكثر تواصلاً"],
    simplified: "الأطفال متعددي اللغة أكثر قدرة على التواصل",
    imagine: "🗣️👧👦 طفل وطفلة يتحدثان بلغات مختلفة ويفهمان بعضهما"
};

HELP_DATA["lesen2_exam18_q2"] = {
    text: "das Kind einen emotionalen Bezug zur Sprache hat",
    meaning: "الطفل لديه ارتباط عاطفي باللغة",
    keywords: ["emotionalen Bezug = ارتباط عاطفي", "Sprache = لغة"],
    simplified: "التعليم متعدد اللغات ينجح إذا أحب الطفل اللغة",
    imagine: "❤️📖 طفل يحضن كتاباً بلغة أجنبية ويبتسم"
};

HELP_DATA["lesen2_exam18_q3"] = {
    text: "sollte im Kindergarten mit der Sprachvermittlung begonnen werden",
    meaning: "يجب البدء بتعليم اللغة في الروضة",
    keywords: ["Kindergarten = روضة", "Sprachvermittlung = تعليم اللغة"],
    simplified: "تعليم الطفل لغة ثانية يُفضل أن يبدأ في عمر الروضة",
    imagine: "🏫👧 أطفال يجلسون في روضة ويغنون بلغة أجنبية"
};

HELP_DATA["lesen2_exam18_q4"] = {
    text: "bei systematischer Vermittlung der Sprache",
    meaning: "مع التعليم المنتظم للغة",
    keywords: ["systematischer = منتظم", "Vermittlung = تعليم"],
    simplified: "تعلم اللغة الثانية يحتاج إلى نظام وتنظيم",
    imagine: "📅📚 جدول منتظم يحتوي أياماً للغة الأولى وأياماً للغة الثانية"
};

HELP_DATA["lesen2_exam18_q5"] = {
    text: "schadet dies der Entwicklung der Zweitsprache nicht",
    meaning: "هذا لا يضر بتطور اللغة الثانية",
    keywords: ["schadet = يضر", "Entwicklung = تطور", "Zweitsprache = لغة ثانية"],
    simplified: "الاتصال القليل باللغة الثانية لا يضر بتعلمها",
    imagine: "⏰🧠 اتصال قصير لكنه كافٍ لتنمية مهارات اللغة"
};

// ============================================
// Exam 19 (exam19.json) - Mehrsprachige Erziehung (معدل)
// ============================================

HELP_DATA["lesen2_exam19_q1"] = {
    text: "mehr Offenheit und Flexibilität in ihrem Verhalten zeigen",
    meaning: "يظهرون انفتاحاً ومرونة أكثر في سلوكهم",
    keywords: ["Offenheit = انفتاح", "Flexibilität = مرونة", "Verhalten = سلوك"],
    simplified: "الأطفال متعددي اللغة أكثر انفتاحاً ومرونة",
    imagine: "🌍👧 طفلة تتحدث مع آخر من ثقافة مختلفة بثقة"
};

HELP_DATA["lesen2_exam19_q2"] = {
    text: "äußert Kritik an bestimmten Erziehungsabsichten der Eltern",
    meaning: "تعبر عن انتقاد لبعض نوايا التربية عند الآباء",
    keywords: ["Kritik = انتقاد", "Erziehungsabsichten = نوايا تربوية", "Eltern = آباء"],
    simplified: "سوزان هيلت تنتقد الآباء الذين يربون أبناءهم بلغات لأسباب فكرية فقط",
    imagine: "👩‍🏫🗣️ معلمة تتحدث إلى آباء وتشرح لهم"
};

HELP_DATA["lesen2_exam19_q3"] = {
    text: "reicht es, im Grundschulalter mit der Zweitsprache zu beginnen",
    meaning: "يكفي البدء باللغة الثانية في سن المدرسة الابتدائية",
    keywords: ["Grundschulalter = سن المدرسة الابتدائية", "Zweitsprache = لغة ثانية"],
    simplified: "يمكن تعليم الطفل لغة ثانية حتى لو بدأ في المدرسة الابتدائية",
    imagine: "📚👦 طفل في الصف الأول يدرس لغة جديدة"
};

HELP_DATA["lesen2_exam19_q4"] = {
    text: "man die zweite oder dritte Sprache wiederholt und ungezwungen spricht",
    meaning: "يتحدث اللغة الثانية أو الثالثة بشكل متكرر وطبيعي",
    keywords: ["wiederholt = بشكل متكرر", "ungezwungen = بشكل طبيعي"],
    simplified: "التعليم متعدد اللغات ينجح عندما تُستخدم اللغة بشكل طبيعي",
    imagine: "💬👩‍👦 أم تتحدث مع طفلها بلغة أجنبية في الحياة اليومية"
};

HELP_DATA["lesen2_exam19_q5"] = {
    text: "wird auf jeden Fall eine Neigung zum Sprachlernen bestehen bleiben",
    meaning: "ستبقى على الأقل رغبة في تعلم اللغة موجودة",
    keywords: ["Neigung = رغبة", "Sprachlernen = تعلم لغة", "bestehen bleiben = تبقى موجودة"],
    simplified: "الاتصال القليل باللغة الثانية يحفز الرغبة في تعلم اللغات",
    imagine: "💪🧠 طفل يسمع كلمات بلغة جديدة ويصبح فضولياً لتعلمها"
};

// ============================================
// Exam 20 (exam20.json) - Verpackungen im Supermarkt: Geht's auch ohne?
// ============================================

HELP_DATA["lesen2_exam20_q1"] = {
    text: "von den Kunden meist vollständig verbraucht",
    meaning: "يتم استهلاكها بالكامل من قبل العملاء غالباً",
    keywords: ["verbraucht = مستهلك", "vollständig = بالكامل", "Kunden = عملاء"],
    simplified: "السلع غير المغلفة يستهلكها العملاء بالكامل ولا يهدرونها",
    imagine: "🍎🛍️ تفاحة توضع مباشرة في السلة بدون تغليف وتُؤكل كلها"
};

HELP_DATA["lesen2_exam20_q2"] = {
    text: "möchte mehr umweltfreundliche Verpackungen verwenden",
    meaning: "يريد استخدام تغليف أكثر صديقاً للبيئة",
    keywords: ["umweltfreundliche = صديق للبيئة", "Verpackungen = تغليف", "verwenden = استخدام"],
    simplified: "صاحب السوبرماركت ديتر هيبر يريد تقليل التغليف البلاستيكي",
    imagine: "🛒♻️ رجل يمسك بشبكة قابلة لإعادة الاستخدام بدلاً من كيس بلاستيكي"
};

HELP_DATA["lesen2_exam20_q3"] = {
    text: "könnte eine praktikable Möglichkeit sein, Müll zu vermeiden",
    meaning: "قد تكون وسيلة عملية لتجنب النفايات",
    keywords: ["praktikable Möglichkeit = وسيلة عملية", "Müll vermeiden = تجنب النفايات"],
    simplified: "استخدام علب الطعام الخاصة في السوبرماركت يقلل النفايات",
    imagine: "🥫♻️ شخص يضع علبته الخاصة على منصة المحاسب"
};

HELP_DATA["lesen2_exam20_q4"] = {
    text: "rief allgemeine Zustimmung hervor",
    meaning: "أثار موافقة عامة",
    keywords: ["Zustimmung = موافقة", "allgemeine = عامة"],
    simplified: "عروض هيبر لتقليل البلاستيك لاقت قبولاً من الجميع",
    imagine: "👏🛒 عملاء يصفقون وهم يرون تغليفاً أقل في المتجر"
};

HELP_DATA["lesen2_exam20_q5"] = {
    text: "sich nur langsam durchsetzen",
    meaning: "سوف تنتشر ببطء فقط",
    keywords: ["langsam = ببطء", "durchsetzen = تنتشر"],
    simplified: "التسوق بدون تغليف سيستغرق وقتاً طويلاً ليشيع",
    imagine: "🐢🛍️ سلحفاة تدفع عربة تسوق ببطء نحو قسم الخضار"
};

// ============================================
// Exam 21 (exam21.json) - Der Puppenmacher
// ============================================

HELP_DATA["lesen2_exam21_q1"] = {
    text: "von einem französischen Schneider erfunden",
    meaning: "اخترعها خياط فرنسي",
    keywords: ["französischen Schneider = خياط فرنسي", "erfunden = اخترع"],
    simplified: "أول دمية عرض ملابس اخترعها خياط فرنسي",
    imagine: "✂️👗 خياط فرنسي يقف بجانب دمية خشبية"
};

HELP_DATA["lesen2_exam21_q2"] = {
    text: "darf Herr Bauerfeind keinen normalen Nagellack auftragen",
    meaning: "لا يُسمح للسيد باورفايند بوضع طلاء أظافر عادي",
    keywords: ["Nagellack = طلاء أظافر", "auftragen = وضع"],
    simplified: "باورفايند لا يستخدم طلاء الأظافر العادي لأنه يذيب الدهان",
    imagine: "💅🚫 زجاجة طلاء أظافر مكتوب عليها ممنوع"
};

HELP_DATA["lesen2_exam21_q3"] = {
    text: "konnte seine erste Schaufensterpuppe nicht auf einmal zahlen",
    meaning: "لم يستطع دفع ثمن أول دمية عرض له دفعة واحدة",
    keywords: ["erste = أول", "Schaufensterpuppe = دمية عرض", "auf einmal = دفعة واحدة"],
    simplified: "باورفايند اشترى أول دمية بالأقساط",
    imagine: "💳📆 رجل يوقع عقد أقساط لشراء دمية"
};

HELP_DATA["lesen2_exam21_q4"] = {
    text: "handelt mit Schaufensterpuppen anderer Produzenten",
    meaning: "يتاجر بدمى عرض من منتجين آخرين",
    keywords: ["handelt = يتاجر", "anderer Produzenten = منتجين آخرين"],
    simplified: "باورفايند يبيع دمى عرض لشركات أخرى أيضاً",
    imagine: "🤝💼 رجل يصافح آخر بجانب دمى عرض"
};

HELP_DATA["lesen2_exam21_q5"] = {
    text: "können mit umweltfreundlichen Farben bemalt werden",
    meaning: "يمكن دهنها بألوان صديقة للبيئة",
    keywords: ["umweltfreundlichen = صديق للبيئة", "Farben = ألوان", "bemalt = مدهونة"],
    simplified: "دمى العرض يمكن تلوينها بألوان غير ضارة بالبيئة",
    imagine: "🎨♻️ فرشاة دهان ودمية وألوان مكتوب عليها صديقة للبيئة"
};

// ============================================
// Exam 22 (exam22.json) - Der Puppenmacher (معدل)
// ============================================

HELP_DATA["lesen2_exam22_q1"] = {
    text: "von einem französischen Schneider erfunden",
    meaning: "اخترعها خياط فرنسي",
    keywords: ["französischen Schneider = خياط فرنسي", "erfunden = اخترع"],
    simplified: "أول دمية عرض ملابس اخترعها خياط فرنسي",
    imagine: "✂️👗 خياط فرنسي يقف بجانب دمية خشبية"
};

HELP_DATA["lesen2_exam22_q2"] = {
    text: "darf er keinen normalen Nagel lack auftragen",
    meaning: "لا يسمح له بوضع طلاء أظافر عادي",
    keywords: ["Nagel lack = طلاء أظافر", "auftragen = وضع"],
    simplified: "باورفايند لا يستخدم طلاء الأظافر العادي لأنه يذيب الدهان",
    imagine: "💅🚫 زجاجة طلاء أظافر مكتوب عليها ممنوع"
};

HELP_DATA["lesen2_exam22_q3"] = {
    text: "konnte seine erste Schaufensterpuppe nicht auf einmal zahlen",
    meaning: "لم يستطع دفع ثمن أول دمية عرض له دفعة واحدة",
    keywords: ["erste = أول", "Schaufensterpuppe = دمية عرض", "auf einmal = دفعة واحدة"],
    simplified: "باورفايند اشترى أول دمية بالأقساط",
    imagine: "💳📆 رجل يوقع عقد أقساط لشراء دمية"
};

HELP_DATA["lesen2_exam22_q4"] = {
    text: "handelt mit Schaufensterpuppen anderer Produzenten",
    meaning: "يتاجر بدمى عرض من منتجين آخرين",
    keywords: ["handelt = يتاجر", "anderer Produzenten = منتجين آخرين"],
    simplified: "باورفايند يبيع دمى عرض لشركات أخرى أيضاً",
    imagine: "🤝💼 رجل يصافح آخر بجانب دمى عرض"
};

HELP_DATA["lesen2_exam22_q5"] = {
    text: "können mit umweltfreundlichen Farben bemalt werden",
    meaning: "يمكن دهنها بألوان صديقة للبيئة",
    keywords: ["umweltfreundlichen = صديق للبيئة", "Farben = ألوان", "bemalt = مدهونة"],
    simplified: "دمى العرض يمكن تلوينها بألوان غير ضارة بالبيئة",
    imagine: "🎨♻️ فرشاة دهان ودمية وألوان مكتوب عليها صديقة للبيئة"
};

// ============================================
// Exam 23 (exam23.json) - Lehrkräftepreis
// ============================================

HELP_DATA["lesen2_exam23_q1"] = {
    text: "erhielt kurz vor Eintritt in den Ruhestand einen Preis",
    meaning: "حصلت على جائزة قبل دخولها التقاعد بفترة قصيرة",
    keywords: ["Ruhestand = تقاعد", "Preis = جائزة", "kurz vor = قبل فترة قصيرة"],
    simplified: "بريجيت فولمر حصلت على جائزة قبل التقاعد",
    imagine: "🏆👩‍🏫 معلمة تبتسم وتحمل جائزة وحقيبة تقاعد بجانبها"
};

HELP_DATA["lesen2_exam23_q2"] = {
    text: "womöglich nicht genug für ihren Lebensunterhalt verdienen könne",
    meaning: "ربما لا تستطيع كسب ما يكفي لقوت يومها",
    keywords: ["Lebensunterhalt = قوت يوم", "verdienen = تكسب", "nicht genug = لا يكفي"],
    simplified: "والدا فولمر خافا ألا تكسب ما يكفي من المال",
    imagine: "💰😟 والدان ينظران إلى ابنتهما بقلق والنقود قليلة"
};

HELP_DATA["lesen2_exam23_q3"] = {
    text: "die Schüler sich im Unterricht schlecht benehmen würden",
    meaning: "الطلاب سيتصرفون بسوء في الفصل",
    keywords: ["schlecht benehmen = تصرف سيء", "Unterricht = فصل"],
    simplified: "فولمر خافت من أن يكون الطلاب مشاغبين معها",
    imagine: "😠👦 طالب شقي يرمي ورقة في الفصل والمعلمة تنظر بقلق"
};

HELP_DATA["lesen2_exam23_q4"] = {
    text: "wollten ihr für die gelungene Prüfungsvorbereitung Anerkennung zeigen",
    meaning: "أرادوا إظهار تقديرهم لها لتحضيرها الناجح للامتحانات",
    keywords: ["Anerkennung = تقدير", "Prüfungsvorbereitung = تحضير امتحانات", "gelungene = ناجح"],
    simplified: "الطلاب رشحوا المعلمة فولمر تقديراً لإعدادهم الجيد للامتحانات",
    imagine: "📝👩‍🏫 طلاب يصفقون لمعلمتهم بعد امتحان ناجح"
};

HELP_DATA["lesen2_exam23_q5"] = {
    text: "mit ehemaligen Schülern ein Projekt zu planen",
    meaning: "للتخطيط لمشروع مع طلاب سابقين",
    keywords: ["ehemaligen Schülern = طلاب سابقين", "Projekt = مشروع", "planen = تخطيط"],
    simplified: "فولمر متحمسة للسفر إلى اليونان مع طلابها السابقين",
    imagine: "✈️🇬🇷 معلمة وطلاب سابقون يخططون لرحلة إلى اليونان"
};

// ============================================
// Exam 24 (exam24.json) - Wer parkt, muss zahlen
// ============================================

HELP_DATA["lesen2_exam24_q1"] = {
    text: "in der Schweiz und in Schweden",
    meaning: "في سويسرا والسويد",
    keywords: ["Schweiz = سويسرا", "Schweden = السويد"],
    simplified: "أول مواقف السيارات في أوروبا كانت في سويسرا والسويد",
    imagine: "🇨🇭🇸🇪 علم سويسرا والسويد وموقف سيارات قديم"
};

HELP_DATA["lesen2_exam24_q2"] = {
    text: "Bedürftige zu unterstützen",
    meaning: "لدعم المحتاجين",
    keywords: ["Bedürftige = محتاجين", "unterstützen = دعم"],
    simplified: "رسوم المواقف في دويسبورغ استخدمت لمساعدة الفقراء والمرضى",
    imagine: "🤲💰 يد تضع نقوداً في صندوق التبرعات"
};

HELP_DATA["lesen2_exam24_q3"] = {
    text: "konnten nur Münzen annehmen",
    meaning: "كانت تقبل العملات المعدنية فقط",
    keywords: ["Münzen = عملات معدنية", "annehmen = تقبل"],
    simplified: "أول مواقف السيارات كانت تقبل القطع النقدية فقط",
    imagine: "💰🚫 ورقة نقدية ترفضها آلة موقف سيارات قديمة"
};

HELP_DATA["lesen2_exam24_q4"] = {
    text: "sind flexibel im Hinblick auf die Art der Bezahlung",
    meaning: "مرنة فيما يتعلق بطريقة الدفع",
    keywords: ["flexibel = مرنة", "Art der Bezahlung = طريقة الدفع"],
    simplified: "أجهزة مواقف السيارات الجديدة تقبل عملات وبطاقات",
    imagine: "💳💰 آلة موقف سيارات تقبل نقوداً وبطاقة"
};

HELP_DATA["lesen2_exam24_q5"] = {
    text: "werden die höchsten Parkgebühren verlangt",
    meaning: "تُطلب أعلى رسوم مواقف",
    keywords: ["höchsten = أعلى", "Parkgebühren = رسوم مواقف"],
    simplified: "دوسلدورف وبرلين أغلى مدينتين للمواقف في ألمانيا",
    imagine: "💰🚗 مدينتان على خريطة ألمانيا مكتوب عليهما غالي"
};

// ============================================
// Exam 25 (exam25.json) - Wer parkt, muss zahlen (معدل)
// ============================================

HELP_DATA["lesen2_exam25_q1"] = {
    text: "in der Schweiz und in Schweden",
    meaning: "في سويسرا والسويد",
    keywords: ["Schweiz = سويسرا", "Schweden = السويد"],
    simplified: "أول مواقف السيارات في أوروبا كانت في سويسرا والسويد",
    imagine: "🇨🇭🇸🇪 علم سويسرا والسويد وموقف سيارات قديم"
};

HELP_DATA["lesen2_exam25_q2"] = {
    text: "Bedürftige zu unterstützen",
    meaning: "لدعم المحتاجين",
    keywords: ["Bedürftige = محتاجين", "unterstützen = دعم"],
    simplified: "رسوم المواقف في دويسبورغ استخدمت لمساعدة الفقراء والمرضى",
    imagine: "🤲💰 يد تضع نقوداً في صندوق التبرعات"
};

HELP_DATA["lesen2_exam25_q3"] = {
    text: "funktionierten nur mit Münzen",
    meaning: "كانت تعمل بالعملات المعدنية فقط",
    keywords: ["funktionierten = تعمل", "Münzen = عملات معدنية"],
    simplified: "أول مواقف السيارات كانت تعمل بالقطع النقدية فقط",
    imagine: "💰🚫 ورقة نقدية ترفضها آلة موقف سيارات قديمة"
};

HELP_DATA["lesen2_exam25_q4"] = {
    text: "versorgen sich selbst mit Strom",
    meaning: "تزود نفسها بالكهرباء بنفسها",
    keywords: ["Strom = كهرباء", "versorgen = تزود", "selbst = بنفسها"],
    simplified: "أجهزة مواقف السيارات الجديدة تعمل بالطاقة الشمسية",
    imagine: "☀️🔋 آلة موقف سيارات بألواح شمسية فوقها"
};

HELP_DATA["lesen2_exam25_q5"] = {
    text: "werden die höchsten Parkgebühren verlangt",
    meaning: "تُطلب أعلى رسوم مواقف",
    keywords: ["höchsten = أعلى", "Parkgebühren = رسوم مواقف"],
    simplified: "دوسلدورف وبرلين أغلى مدينتين للمواقف في ألمانيا",
    imagine: "💰🚗 مدينتان على خريطة ألمانيا مكتوب عليهما غالي"
};

// ============================================
// Exam 26 (exam26.json) - Familienglück oder Generationskonflikte?
// ============================================

HELP_DATA["lesen2_exam26_q1"] = {
    text: "als Kind glücklich waren",
    meaning: "كانوا سعداء في طفولتهم",
    keywords: ["Kind = طفل", "glücklich = سعيد"],
    simplified: "نصف كبار السن فقط قالوا إنهم كانوا سعداء في طفولتهم",
    imagine: "👴😐 رجل كبير ينظر إلى صورة طفولته ولا يبتسم كثيراً"
};

HELP_DATA["lesen2_exam26_q2"] = {
    text: "verstehen sich mit ihren Eltern gut",
    meaning: "علاقتهم مع والديهم جيدة",
    keywords: ["verstehen sich = يتفاهمون", "Eltern = والدان"],
    simplified: "معظم المراهقين لديهم علاقة جيدة مع آبائهم",
    imagine: "👨‍👩‍👧‍👦❤️ عائلة تجلس معاً وتضحك"
};

HELP_DATA["lesen2_exam26_q3"] = {
    text: "kaum Unterschiede in der Lebensart",
    meaning: "تقريباً لا فروق في نمط الحياة",
    keywords: ["Unterschiede = فروق", "Lebensart = نمط حياة"],
    simplified: "اليوم، الآباء والأبناء متشابهون في أسلوب الحياة",
    imagine: "👕👖 أب وابنه يرتديان ملابس متشابهة"
};

HELP_DATA["lesen2_exam26_q4"] = {
    text: "Geräte die Hausarbeit leichter machen",
    meaning: "الأجهزة تجعل الأعمال المنزلية أسهل",
    keywords: ["Geräte = أجهزة", "Hausarbeit = أعمال منزلية", "leichter = أسهل"],
    simplified: "الأم لديها وقت أكثر لأطفالها بفضل الأجهزة الحديثة",
    imagine: "🧺🤖 غسالة صحون وغسالة ملابس تعملان والأم جالسة مع أطفالها"
};

HELP_DATA["lesen2_exam26_q5"] = {
    text: "entsteht oft ein falsches Bild der Familie",
    meaning: "تتكون غالباً صورة خاطئة عن الأسرة",
    keywords: ["falsches Bild = صورة خاطئة", "Familie = أسرة"],
    simplified: "الإعلام يقدم صورة سلبية عن الأسرة غير واقعية",
    imagine: "📺😟 تلفاز يعرض أخباراً عن مشاكل عائلية والعائلة الحقيقية سعيدة بجانبه"
};

// ============================================
// Exam 27 (exam27.json) - Traumfrau und Traummann gesucht
// ============================================

HELP_DATA["lesen2_exam27_q1"] = {
    text: "die Lebensumstände es erschweren, den Partner oder die Partnerin fürs Leben zu finden",
    meaning: "ظروف الحياة تجعل من الصعب العثور على شريك الحياة",
    keywords: ["Lebensumstände = ظروف حياة", "erschweren = تجعل صعباً", "Partner finden = العثور على شريك"],
    simplified: "كثرة العمل والتنقل تجعل العثور على شريك للحياة صعباً",
    imagine: "💼🏃‍♂️ رجل يحمل حقيبة ويسافر بين المدن وينظر إلى هاتفه حزيناً"
};

HELP_DATA["lesen2_exam27_q2"] = {
    text: "in den Medien",
    meaning: "في وسائل الإعلام",
    keywords: ["Medien = إعلام"],
    simplified: "العزاب اليوم يبحثون عن شريك عبر الإنترنت والصحف",
    imagine: "📱💕 شخص يمرر أصابعه على تطبيق مواعدة"
};

HELP_DATA["lesen2_exam27_q3"] = {
    text: "jeden Tag Heiratswünsche gesendet",
    meaning: "تُرسل رغبات زواج كل يوم",
    keywords: ["Heiratswünsche = رغبات زواج", "gesendet = مرسلة"],
    simplified: "في الراديو، ناس يعبرون عن رغبتهم بالزواج يومياً",
    imagine: "📻💍 ميكروفون وشخص يقول أنا أريد الزواج"
};

HELP_DATA["lesen2_exam27_q4"] = {
    text: "beschreiben sich Partnersuchende oft im Rahmen konventioneller Rollenerwartungen",
    meaning: "الباحثون عن شريك يصفون أنفسهم غالباً في إطار التوقعات التقليدية للأدوار",
    keywords: ["konventioneller Rollenerwartungen = توقعات تقليدية للأدوار", "beschreiben = يصفون"],
    simplified: "النساء يصفن جمالهن والرجال يقدمون الأمان والوظيفة",
    imagine: "💃👔 امرأة تتحدث عن جمالها ورجل يتحدث عن منصبه"
};

HELP_DATA["lesen2_exam27_q5"] = {
    text: "zunächst eine Selbstanalyse vornehmen",
    meaning: "إجراء تحليل ذاتي أولاً",
    keywords: ["Selbstanalyse = تحليل ذاتي", "vornehmen = إجراء"],
    simplified: "يجب على الباحث عن شريك أن يعرف نفسه أولاً قبل البحث",
    imagine: "🪞🤔 شخص يقف أمام المرآة ويسأل نفسه من أنا"
};

// ============================================
// Exam 28 (exam28.json) - Traumfrau und Traummann gesucht (معدل)
// ============================================

HELP_DATA["lesen2_exam28_q1"] = {
    text: "die Lebensumstände es erschweren, den Partner oder die Partnerin fürs Leben zu finden",
    meaning: "ظروف الحياة تجعل من الصعب العثور على شريك الحياة",
    keywords: ["Lebensumstände = ظروف حياة", "erschweren = تجعل صعباً", "Partner finden = العثور على شريك"],
    simplified: "كثرة العمل والتنقل تجعل العثور على شريك للحياة صعباً",
    imagine: "💼🏃‍♂️ رجل يحمل حقيبة ويسافر بين المدن وينظر إلى هاتفه حزيناً"
};

HELP_DATA["lesen2_exam28_q2"] = {
    text: "in den Medien",
    meaning: "في وسائل الإعلام",
    keywords: ["Medien = إعلام"],
    simplified: "العزاب اليوم يبحثون عن شريك عبر الإنترنت والصحف",
    imagine: "📱💕 شخص يمرر أصابعه على تطبيق مواعدة"
};

HELP_DATA["lesen2_exam28_q3"] = {
    text: "jeden Tag Heiratswünsche gesendet",
    meaning: "تُرسل رغبات زواج كل يوم",
    keywords: ["Heiratswünsche = رغبات زواج", "gesendet = مرسلة"],
    simplified: "في الراديو، ناس يعبرون عن رغبتهم بالزواج يومياً",
    imagine: "📻💍 ميكروفون وشخص يقول أنا أريد الزواج"
};

HELP_DATA["lesen2_exam28_q4"] = {
    text: "klassische Rollenbilder bei der Selbstdarstellung in Kontaktanzeigen weiterhin stark verbreitet sind",
    meaning: "صور الأدوار التقليدية في التعبير عن الذات في إعلانات التعارف لا تزال منتشرة بقوة",
    keywords: ["klassische Rollenbilder = صور أدوار تقليدية", "Selbstdarstellung = تعبير عن الذات", "Kontaktanzeigen = إعلانات تعارف"],
    simplified: "الرجال يعرضون الأمان والنساء يعرضن الجمال في الإعلانات",
    imagine: "📰👔👗 إعلان: رجل ناجح يبحث عن امرأة جميلة"
};

HELP_DATA["lesen2_exam28_q5"] = {
    text: "zunächst eine Selbstanalyse vornehmen",
    meaning: "إجراء تحليل ذاتي أولاً",
    keywords: ["Selbstanalyse = تحليل ذاتي", "vornehmen = إجراء"],
    simplified: "يجب على الباحث عن شريك أن يعرف نفسه أولاً قبل البحث",
    imagine: "🪞🤔 شخص يقف أمام المرآة ويسأل نفسه من أنا"
};

// ============================================
// Exam 29 (exam29.json) - Wie Babys lernen
// ============================================

HELP_DATA["lesen2_exam29_q1"] = {
    text: "kaum auf ihre Umwelt reagieren",
    meaning: "يكادون لا يتفاعلون مع بيئتهم",
    keywords: ["kaum = بالكاد", "Umwelt = بيئة", "reagieren = يتفاعلون"],
    simplified: "كان يُعتقد قديماً أن الأطفال لا يشعرون بالألم",
    imagine: "👶😐 طفل رضيع لا يتفاعل مع من حوله"
};

HELP_DATA["lesen2_exam29_q2"] = {
    text: "im Kleinkindalter besonders wichtig",
    meaning: "مهمة بشكل خاص في سن الطفولة المبكرة",
    keywords: ["Kleinkindalter = سن الطفولة المبكرة", "besonders wichtig = مهمة بشكل خاص"],
    simplified: "البيئة مهمة جداً لتطور ذكاء الطفل الصغير",
    imagine: "🌳👶 طفل يلعب في الطبيعة مع أمه"
};

HELP_DATA["lesen2_exam29_q3"] = {
    text: "mehr altersgerechte Erfahrungen sie machen können",
    meaning: "كلما زادت الخبرات المناسبة لعمرهم",
    keywords: ["altersgerechte = مناسبة للعمر", "Erfahrungen = خبرات"],
    simplified: "الأطفال يتطورون بشكل أفضل عندما يمرون بتجارب مناسبة لعمرهم",
    imagine: "🧩👧 طفلة تركّب أحجية تناسب عمرها"
};

HELP_DATA["lesen2_exam29_q4"] = {
    text: "für die geistige Entwicklung eher ungeeignet",
    meaning: "غير مناسبة للتطور العقلي إلى حد ما",
    keywords: ["geistige Entwicklung = تطور عقلي", "ungeeignet = غير مناسب"],
    simplified: "التلفاز والألعاب الإلكترونية ليست مفيدة لتطور دماغ الطفل",
    imagine: "📺🧠 شاشة تلفاز ودماغ صغير خلفها يتباطأ"
};

HELP_DATA["lesen2_exam29_q5"] = {
    text: "fördert die Intelligenz des Babys am besten",
    meaning: "ينمي ذكاء الرضيع بشكل أفضل",
    keywords: ["fördert = ينمي", "Intelligenz = ذكاء", "am besten = بشكل أفضل"],
    simplified: "التفاعل مع الناس هو أفضل شيء لذكاء الطفل",
    imagine: "👩‍👧❤️ أم تحتضن طفلها وتتحدث معه"
};

// ============================================
// Exam 30 (exam30.json) - Volkskrankheit Rückenschmerz
// ============================================

HELP_DATA["lesen2_exam30_q1"] = {
    text: "kann durch eine Vielzahl von Faktoren ausgelöst werden",
    meaning: "يمكن أن تسببها عوامل متعددة",
    keywords: ["Vielzahl = تعدد", "Faktoren = عوامل", "ausgelöst = مسبب"],
    simplified: "آلام الظهر تنتج عن أسباب كثيرة مختلفة",
    imagine: "🔍🦴 أنواع كثيرة من الآلام تظهر على عمود فقري"
};

HELP_DATA["lesen2_exam30_q2"] = {
    text: "entstehen, weil angespannte Muskeln auf nahegelegene Nervenenden drücken",
    meaning: "تنشأ لأن العضلات المشدودة تضغط على نهايات عصبية قريبة",
    keywords: ["angespannte Muskeln = عضلات مشدودة", "Nervenenden = نهايات عصبية", "drücken = تضغط"],
    simplified: "آلام الظهر سببها عضلات متوترة تضغط على أعصاب",
    imagine: "💪⚡ عضلة مشدودة تضغط على عصب"
};

HELP_DATA["lesen2_exam30_q3"] = {
    text: "können zu Depressionen führen",
    meaning: "يمكن أن تؤدي إلى الاكتئاب",
    keywords: ["Depressionen = اكتئاب", "führen = تؤدي"],
    simplified: "آلام الظهر المزمنة قد تسبب الاكتئاب",
    imagine: "😢🦴 شخص حزين بسبب آلام ظهره المزمنة"
};

HELP_DATA["lesen2_exam30_q4"] = {
    text: "können durch verschiedene Erkrankungen hervorgerufen werden",
    meaning: "يمكن أن تنتج عن أمراض مختلفة",
    keywords: ["Erkrankungen = أمراض", "hervorgerufen = منتجة"],
    simplified: "تآكل العظام قد ينتج عن مرض هشاشة العظام",
    imagine: "🦴🦠 هيكل عظمي به ثقوب بسبب المرض"
};

HELP_DATA["lesen2_exam30_q5"] = {
    text: "sollte nicht zu lange mit dem Arztbesuch warten",
    meaning: "لا يجب الانتظار طويلاً قبل زيارة الطبيب",
    keywords: ["Arztbesuch = زيارة طبيب", "nicht zu lange = ليس طويلاً", "warten = انتظار"],
    simplified: "من يعاني من آلام ظهر متكررة يجب أن يذهب للطبيب",
    imagine: "🏥🦴 رجل يمسك ظهره ويدخل عيادة الطبيب"
};

// ============================================
// Exam 31 (exam31.json) - Volkskrankheit Rückenschmerz (معدل)
// ============================================

HELP_DATA["lesen2_exam31_q1"] = {
    text: "ist bei Frauen deutlich stärker ausgeprägt als bei Männern",
    meaning: "أكثر انتشاراً عند النساء بشكل ملحوظ من الرجال",
    keywords: ["Frauen = نساء", "deutlich stärker = بشكل أقوى", "Männern = رجال"],
    simplified: "آلام الظهر أكثر شيوعاً عند النساء منها عند الرجال",
    imagine: "👩🦴👨 إحصاء: نساء كثيرات ورجال أقل"
};

HELP_DATA["lesen2_exam31_q2"] = {
    text: "entstehen, weil angespannte Muskeln auf nahegelegene Nervenenden drücken",
    meaning: "تنشأ لأن العضلات المشدودة تضغط على نهايات عصبية قريبة",
    keywords: ["angespannte Muskeln = عضلات مشدودة", "Nervenenden = نهايات عصبية", "drücken = تضغط"],
    simplified: "آلام الظهر سببها عضلات متوترة تضغط على أعصاب",
    imagine: "💪⚡ عضلة مشدودة تضغط على عصب"
};

HELP_DATA["lesen2_exam31_q3"] = {
    text: "können unterschiedliche Auslöser haben",
    meaning: "يمكن أن يكون لها محفزات مختلفة",
    keywords: ["unterschiedliche = مختلفة", "Auslöser = محفزات"],
    simplified: "انزلاقات الغضاريف قد تنتج عن أسباب عديدة",
    imagine: "🔍🦴 قائمة بأسباب مختلفة لانزلاق الغضروف"
};

HELP_DATA["lesen2_exam31_q4"] = {
    text: "können durch verschiedene Erkrankungen hervorgerufen werden",
    meaning: "يمكن أن تنتج عن أمراض مختلفة",
    keywords: ["Erkrankungen = أمراض", "hervorgerufen = منتجة"],
    simplified: "تآكل العظام قد ينتج عن مرض هشاشة العظام",
    imagine: "🦴🦠 هيكل عظمي به ثقوب بسبب المرض"
};

HELP_DATA["lesen2_exam31_q5"] = {
    text: "sollte nicht zu lange mit dem Arztbesuch warten",
    meaning: "لا يجب الانتظار طويلاً قبل زيارة الطبيب",
    keywords: ["Arztbesuch = زيارة طبيب", "nicht zu lange = ليس طويلاً", "warten = انتظار"],
    simplified: "من يعاني من آلام ظهر متكررة يجب أن يذهب للطبيب",
    imagine: "🏥🦴 رجل يمسك ظهره ويدخل عيادة الطبيب"
};

// ============================================
// Exam 32 (exam32.json) - Die ganze Welt auf dem eigenen PC
// ============================================

HELP_DATA["lesen2_exam32_q1"] = {
    text: "von einigen Ländern ein genaueres Abbild bietet als früher",
    meaning: "تقدم صورة أكثر دقة لبعض الدول أكثر من السابق",
    keywords: ["genaueres Abbild = صورة أكثر دقة", "bietet = تقدم"],
    simplified: "النسخة الجديدة من غوغل إيرث تُظهر دولاً بدقة أعلى",
    imagine: "🌍🔍 خريطة العالم بتكبير عالٍ وتفاصيل أكثر"
};

HELP_DATA["lesen2_exam32_q2"] = {
    text: "sind alle nicht ganz neu",
    meaning: "كلها ليست جديدة تماماً",
    keywords: ["nicht ganz neu = ليست جديدة تماماً"],
    simplified: "صور غوغل إيرث قديمة بعدة شهور",
    imagine: "📸🗓️ صورة قديمة على شاشة الكمبيوتر"
};

HELP_DATA["lesen2_exam32_q3"] = {
    text: "Menschen aus vielen Berufsgruppen",
    meaning: "أشخاص من مجموعات مهنية عديدة",
    keywords: ["Berufsgruppen = مجموعات مهنية", "vielen = عديدة"],
    simplified: "اليوم كثير من الناس من مختلف المهن يستخدمون غوغل إيرث",
    imagine: "👨‍⚕️👩‍💻👨‍🏫 أشخاص من مهن مختلفة أمام شاشة غوغل إيرث"
};

HELP_DATA["lesen2_exam32_q4"] = {
    text: "persönliche Daten öffentlich verfügbar sind",
    meaning: "البيانات الشخصية متاحة للعموم",
    keywords: ["persönliche Daten = بيانات شخصية", "öffentlich = عموم", "verfügbar = متاحة"],
    simplified: "غوغل إيرث تعرض عناوين مجرمين وأسماءهم",
    imagine: "🔓👤 اسم وصورة شخص على خريطة علنية"
};

HELP_DATA["lesen2_exam32_q5"] = {
    text: "man sich damit orientieren kann",
    meaning: "يمكن للمرء أن يتوجه بواسطتها",
    keywords: ["orientieren = يتوجه", "kann = يمكن"],
    simplified: "غوغل إيرث مفيدة جداً للتخطيط للرحلات والتنقل",
    imagine: "🧭🗺️ شخص يخطط لرحلة باستخدام غوغل إيرث"
};

// ============================================
// Exam 33 (exam33.json) - Die deutschen und ihre Ernährung
// ============================================

HELP_DATA["lesen2_exam33_q1"] = {
    text: "gesund sein sollte",
    meaning: "يجب أن يكون صحياً",
    keywords: ["gesund = صحي", "sollte = يجب"],
    simplified: "معظم الألمان يفضلون الطعام الصحي على اللذيذ",
    imagine: "🥗✅ شخص يختار سلطة خضراء على برغر"
};

HELP_DATA["lesen2_exam33_q2"] = {
    text: "war früher wichtiger",
    meaning: "كان أكثر أهمية في السابق",
    keywords: ["früher = سابقاً", "wichtiger = أكثر أهمية"],
    simplified: "الاهتمام بالسعرات الحرارية كان أهم في الماضي",
    imagine: "📉🍰 رسم بياني ينخفض: الاهتمام بالسعرات قلت"
};

HELP_DATA["lesen2_exam33_q3"] = {
    text: "zu viele ungesunde Lebensmittel auf dem Markt sind",
    meaning: "يوجد الكثير من الأطعمة غير الصحية في السوق",
    keywords: ["ungesunde Lebensmittel = أطعمة غير صحية", "Markt = سوق"],
    simplified: "الخبراء يقولون إن المشكلة ليست في وعي الناس بل في توفر الأطعمة غير الصحية",
    imagine: "🛒🍟🍫🍔 متجر مليء بالأطعمة غير الصحية"
};

HELP_DATA["lesen2_exam33_q4"] = {
    text: "passiert bei älteren Menschen fast nie",
    meaning: "لا يحدث عند كبار السن تقريباً أبداً",
    keywords: ["älteren Menschen = كبار السن", "fast nie = تقريباً أبداً"],
    simplified: "كبار السن لا يرمون الطعام أبداً تقريباً",
    imagine: "👴🍝 جد يمسك طبقاً ويأكل كل حبة"
};

HELP_DATA["lesen2_exam33_q5"] = {
    text: "ist nicht in allen Altersgruppen gleich",
    meaning: "ليس متساوياً في كل الفئات العمرية",
    keywords: ["Altersgruppen = فئات عمرية", "nicht gleich = غير متساو"],
    simplified: "استهلاك اللحوم يختلف بين جيل الشباب وكبار السن",
    imagine: "🥩👦👴 شاب يأكل برغراً وجد يأكل خضروات"
};

// ============================================
// Exam 34 (exam34.json) - Weniger Euro-Blüten in Deutschland
// ============================================

HELP_DATA["lesen2_exam34_q1"] = {
    text: "gefälschten 50-Euro-Scheine ist in Deutschland besonders hoch",
    meaning: "تزوير أوراق 50 يورو مرتفع بشكل خاص في ألمانيا",
    keywords: ["gefälschten = مزورة", "50-Euro-Scheine = أوراق 50 يورو", "besonders hoch = مرتفع بشكل خاص"],
    simplified: "فئة 50 يورو هي الأكثر تزويراً في ألمانيا",
    imagine: "💶🔍 ورقة 50 يورو مع علامة استفهام"
};

HELP_DATA["lesen2_exam34_q2"] = {
    text: "die Ermittler gründlicher suchen",
    meaning: "المحققون يبحثون بشكل أكثر شمولاً",
    keywords: ["Ermittler = محققون", "gründlicher = بشكل أكثر شمولاً", "suchen = يبحثون"],
    simplified: "زيادة اكتشاف العملات المزيفة بسبب تحسن عمل الشرطة",
    imagine: "👮‍♂️🔎 شرطي يفحص عملة بعدسة مكبرة"
};

HELP_DATA["lesen2_exam34_q3"] = {
    text: "von Kassierern in Banken und Läden entdeckt",
    meaning: "يكتشفها الصرافون في البنوك والمتاجر",
    keywords: ["Kassierern = صرافون", "Banken = بنوك", "entdeckt = مكتشفة"],
    simplified: "معظم الأوراق المزيفة يكتشفها الصرافون وليس الناس العاديون",
    imagine: "💶👩‍💼 صرافة تفحص ورقة نقدية بعناية"
};

HELP_DATA["lesen2_exam34_q4"] = {
    text: "die Wahrscheinlichkeit sehr niedrig ist",
    meaning: "الاحتمال منخفض جداً",
    keywords: ["Wahrscheinlichkeit = احتمال", "niedrig = منخفض"],
    simplified: "احتمال أن تصادف نقوداً مزيفة قليل جداً",
    imagine: "🎲1️⃣ حجر نرد يظهر الرقم 1 فقط"
};

HELP_DATA["lesen2_exam34_q5"] = {
    text: "beim Druck Farben verwendet werden, die man nicht kopieren kann",
    meaning: "في الطباعة تُستخدم ألوان لا يمكن نسخها",
    keywords: ["Druck = طباعة", "Farben = ألوان", "nicht kopieren = لا يمكن نسخ"],
    simplified: "تقنيات جديدة في طباعة اليورو تجعل التزوير أصعب",
    imagine: "🖨️🚫 طابعة وفوقها علامة X حمراء"
};

// ============================================
// Exam 35 (exam35.json) - Nachtzug
// ============================================

HELP_DATA["lesen2_exam35_q1"] = {
    text: "man dort leicht mit Mitreisenden ins Gespräch kommt",
    meaning: "يمكن للمرء التحدث بسهولة مع المسافرين الآخرين",
    keywords: ["Mitreisenden = مسافرين آخرين", "ins Gespräch kommt = يبدأ محادثة"],
    simplified: "مارا تحب القطار الليلي لأنها تتعرف على ناس جدد",
    imagine: "🚂💬 أشخاص يتحدثون ويضحكون في عربة قطار ليلي"
};

HELP_DATA["lesen2_exam35_q2"] = {
    text: "verzichteten aus wirtschaftlichen Gründen zeitweise auf eigene Nachtzüge",
    meaning: "تخلوا لأسباب اقتصادية مؤقتاً عن قطاراتهم الليلية",
    keywords: ["wirtschaftlichen Gründen = أسباب اقتصادية", "zeitweise = مؤقتاً", "verzichteten = تخلوا"],
    simplified: "شركة السكك الحديدية الألمانية تخلت عن قطاراتها الليلية بسبب الخسائر",
    imagine: "📉🚂 رسم بياني ينخفض وقطار يقف"
};

HELP_DATA["lesen2_exam35_q3"] = {
    text: "hat den jüngsten Sohn der Familie begeistert",
    meaning: "ألهبت حماسة الابن الأصغر للعائلة",
    keywords: ["jüngsten Sohn = الابن الأصغر", "begeistert = ألهبت حماسة"],
    simplified: "القطار الليلي أثار حماسة ابن عائلة فينترفيلد الصغير",
    imagine: "👦🚂🎉 ولد صغير يقفز فرحاً بجانب القطار"
};

HELP_DATA["lesen2_exam35_q4"] = {
    text: "er mit dem Flugzeug deutlich Zeit spart",
    meaning: "يختصر الكثير من الوقت بالطائرة",
    keywords: ["Zeit spart = يختصر وقتاً", "deutlich = الكثير", "Flugzeug = طائرة"],
    simplified: "يوناس فالك يفضل الطائرة على القطار لتوفير الوقت",
    imagine: "✈️⏰ طائرة وساعة تدور بسرعة"
};

HELP_DATA["lesen2_exam35_q5"] = {
    text: "Fliegen schneller und auf vielen Strecken sogar günstiger ist",
    meaning: "الطيران أسرع وحتى أرخص على العديد من المسارات",
    keywords: ["schneller = أسرع", "günstiger = أرخص", "Strecken = مسارات"],
    simplified: "الطائرة أسرع وأرخص أحياناً من القطار",
    imagine: "✈️💰 طائرة ونقود وعلامة توفير"
};

// ============================================
// Exam 36 (exam36.json) - Nachtzug (معدل)
// ============================================

HELP_DATA["lesen2_exam36_q1"] = {
    text: "man dort leicht mit anderen Fahrgästen ins Gespräch kommt",
    meaning: "يمكن للمرء التحدث بسهولة مع الركاب الآخرين",
    keywords: ["Fahrgästen = ركاب", "ins Gespräch kommt = يبدأ محادثة"],
    simplified: "صوفيا تحب القطار الليلي للحديث مع المسافرين",
    imagine: "🚂💬 ركاب قطار ليلي يتحدثون معاً"
};

HELP_DATA["lesen2_exam36_q2"] = {
    text: "verzichtet aus ökonomischen Gründen auf eigene Nachtzüge",
    meaning: "تتخلى لأسباب اقتصادية عن قطاراتها الليلية الخاصة",
    keywords: ["ökonomischen Gründen = أسباب اقتصادية", "verzichtet = تتخلى", "eigene Nachtzüge = قطارات ليلية خاصة"],
    simplified: "شركة السكك الحديدية الألمانية تخلت عن القطارات الليلية لخسائرها",
    imagine: "📉🚂 رسم بياني ينخفض وقطار يتوقف"
};

HELP_DATA["lesen2_exam36_q3"] = {
    text: "hat Tom Schneiders Sohn begeistert",
    meaning: "ألهبت حماسة توم شنايدر ابنه",
    keywords: ["Sohn = ابن", "begeistert = ألهبت حماسة"],
    simplified: "القطار الليلي أثار حماسة ابن توم شنايدر",
    imagine: "👦🚂🎉 ولد صغير يقفز فرحاً بجانب القطار"
};

HELP_DATA["lesen2_exam36_q4"] = {
    text: "er mit dem Flugzeug Zeit spart",
    meaning: "يختصر الوقت بالطائرة",
    keywords: ["Zeit spart = يختصر وقتاً", "Flugzeug = طائرة"],
    simplified: "فلوريان كيرش يفضل الطائرة على القطار",
    imagine: "✈️⏰ طائرة وساعة"
};

HELP_DATA["lesen2_exam36_q5"] = {
    text: "den Fahrgästen viel Privatsphäre bieten",
    meaning: "توفير خصوصية كبيرة للركاب",
    keywords: ["Fahrgästen = ركاب", "Privatsphäre = خصوصية", "bieten = توفير"],
    simplified: "شركة فرنسية ناشئة تصمم قطارات ليلية مع خصوصية أكبر",
    imagine: "🚂🔒 عربة قطار بستائر ومقاعد مغلقة"
};

// ============================================
// Exam 37 (exam37.json) - Wie zwei US-Teenager Millionäre wurden
// ============================================

HELP_DATA["lesen2_exam37_q1"] = {
    text: "durch eine einfache Idee und mit der finanziellen Hilfe ihres Bruders reich geworden",
    meaning: "أصبحوا أغنياء بفضل فكرة بسيطة وبمساعدة مالية من أخيهم",
    keywords: ["einfache Idee = فكرة بسيطة", "finanziellen Hilfe = مساعدة مالية", "Bruders = أخيهم", "reich geworden = أصبحوا أغنياء"],
    simplified: "كاترين وديفيد أصبحا مليونيرين بفضل فكرة وأخيهما جيفري",
    imagine: "💡💰 فكرة مصباح وأخ يضع نقوداً في يديهما"
};

HELP_DATA["lesen2_exam37_q2"] = {
    text: "sowohl in den USA als auch in Deutschland erfolgreich",
    meaning: "ناجحة في كل من الولايات المتحدة وألمانيا",
    keywords: ["USA = الولايات المتحدة", "Deutschland = ألمانيا", "erfolgreich = ناجحة"],
    simplified: "مواقع التواصل الاجتماعي ناجحة في أمريكا وألمانيا",
    imagine: "🇺🇸📱🇩🇪 شاشة هاتف وعلم أمريكا وألمانيا"
};

HELP_DATA["lesen2_exam37_q3"] = {
    text: "alle für die Schüler wichtigen Sachen auf dieser Seite genauso passieren, als wäre es in der eigenen Schule",
    meaning: "جميع الأشياء المهمة للطلاب تحدث على هذا الموقع تماماً كما لو كانت في المدرسة نفسها",
    keywords: ["Schüler = طلاب", "Seite = موقع", "eigenen Schule = المدرسة نفسها"],
    simplified: "موقع مايريربوك يعيد أجواء المدرسة الثانوية على الإنترنت",
    imagine: "🏫💻 مدرسة افتراضية على شاشة الكمبيوتر"
};

HELP_DATA["lesen2_exam37_q4"] = {
    text: "um ihre Freizeit virtuell verbringen zu können",
    meaning: "لقضاء وقت فراغهم بشكل افتراضي",
    keywords: ["Freizeit = وقت فراغ", "virtuell = افتراضياً", "verbringen = قضاء"],
    simplified: "الشباب الأمريكي يستخدمون الإنترنت لقضاء وقت فراغهم",
    imagine: "🛋️📱 مراهق جالس على أريكة أمام هاتفه"
};

HELP_DATA["lesen2_exam37_q5"] = {
    text: "noch immer an ihrer Seite angemeldet",
    meaning: "لا تزال مسجلة الدخول إلى موقعها",
    keywords: ["Seite = موقع", "angemeldet = مسجلة دخول"],
    simplified: "كاترين لا تزال عضوة في مايريربوك رغم أنها تخرجت",
    imagine: "👩‍🎓💻 خريجة تبتسم أمام شاشة الكمبيوتر"
};

// ============================================
// Exam 38 (exam38.json) - (ملف غير موجود في ملفاتك، سأتخطاه)
// ============================================

// ============================================
// sprach1.js - جميع شروحات Sprachbausteine Teil 1
// ============================================

// ============================================
// lesen3.js - الجزء الأول (Exams 1-20)
// القاعدة: أول 5-7 كلمات من النص - أول 5-7 كلمات من الموقف
// ============================================

// ============================================
// Exam 1: Filme - Fernsehprogramme
// ============================================


// ============================================
// Lesen Teil 3 - Exams 1-12 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 1: Filme - Fernsehprogramme ==========
HELP_DATA["lesen3_exam1_q1"] = {
    text: "Ullrich Kasten und Hans-Hermann Hertle schildern - Eine Bekannte interessiert sich für die Geschichte des bis 1989 geteilten Berlins.",
    meaning: "أولريش كاستن وهانز-هيرمان هيرتل يصفان - إحدى المعارف مهتمة بتاريخ برلين المقسمة حتى عام 1989",
    keywords: ["Dokumentation = فيلم وثائقي", "Mauerbau = بناء الجدار", "geteilten Berlins = برلين المقسمة"],
    simplified: "فيلم وثائقي عن جدار برلين وتقسيم ألمانيا",
    imagine: "امرأة تشاهد فيلما بالأبيض والأسود عن جدار برلين",
    correct: 6
};

HELP_DATA["lesen3_exam1_q2"] = {
    text: "Ob Klassik, Rock'n'Roll oder Jazz - Sie suchen eine Musiksendung. Sie mögen besonders Klaviermusik.",
    meaning: "سواء كلاسيكي أو روك أو جاز - تبحث عن برنامج موسيقي تحب فيه البيانو",
    keywords: ["Klassik = كلاسيكي", "Jazz = جاز", "Pianist = عازف بيانو", "Musiksendung = برنامج موسيقي"],
    simplified: "برنامج تلفزيوني متنوع مع عازف بيانو ماهر",
    imagine: "شخص يغير القنوات ويتوقف عند عازف بيانو سريع الأصابع",
    correct: 2
};

HELP_DATA["lesen3_exam1_q3"] = {
    text: "Aus Sorge um die nationale Sicherheit - Sie sehen gern spannende, aber auch spaßige Agentenfilme.",
    meaning: "خوفا على الأمن القومي - تحب مشاهدة أفلام التجسس المثيرة والممتعة",
    keywords: ["Geheimdienst = مخابرات", "Psychiater = طبيب نفسي", "Agentenfilme = أفلام تجسس"],
    simplified: "فيلم تجسس كوميدي مع طبيب مجنون وعالم خطير",
    imagine: "رجل معصوب العينين وآخر يضحك كالمجنون خلفه",
    correct: 7
};

HELP_DATA["lesen3_exam1_q4"] = {
    text: "Er schreit wie am Spieß - Sie mögen Familienkomödien, besonders mit frechen Kindern.",
    meaning: "هو يصرخ بصوت عالٍ - تحب الكوميديا العائلية خاصة مع الأطفال الشقاة",
    keywords: ["schreit = يصرخ", "Vater = أب", "allein erziehend = عزب يربي", "Familienkomödie = كوميديا عائلية"],
    simplified: "أب أعزب يعاني مع طفله الشقي وحبيبته السابقة",
    imagine: "أب يجري وراء طفل صغير يضع قطة في كيس قمامة",
    correct: 5
};

HELP_DATA["lesen3_exam1_q5"] = {
    text: "Hier in Berlin bei meinen Freunden - Sie würden gern etwas über Großstadtjugendliche erfahren, die am Rand der Gesellschaft leben.",
    meaning: "هنا في برلين عند أصدقائي - ترغب في معرفة شيء عن شباب المدن الكبرى الذين يعيشون على الهامش",
    keywords: ["Berlin = برلين", "Straße = شارع", "jugendlich = مراهق", "obdachlos = بلا مأوى"],
    simplified: "مراهق يبلغ 16 عاما يعيش في شوارع برلين",
    imagine: "شاب يجلس على درج مبنى وبجانبه كيس نوم وكلب ضال",
    correct: 8
};

HELP_DATA["lesen3_exam1_q6"] = {
    text: "Mit Sandalen und T-Shirt - Sie möchten im nächsten Urlaub bergsteigen und sich über die Risiken informieren.",
    meaning: "بالصنادل والتي شيرت - ترغب في تسلق الجبال في الإجازة القادمة وتريد معرفة المخاطر",
    keywords: ["Sandalen = صنادل", "Bergwacht = خدمة إنقاذ جبلي", "Alpen = الألب", "Retter = منقذين"],
    simplified: "فيلم وثائقي عن حوادث الجبال وعمليات الإنقاذ",
    imagine: "رجل معلق بحبل على جرف ثلجي وطائرة هليكوبتر تحوم فوقه",
    correct: 9
};

HELP_DATA["lesen3_exam1_q7"] = {
    text: "'Schwere Jungs' bildet den Auftakt - Sie mögen Filme mit viel Action und viel Spaß.",
    meaning: "'شباب ثقال' تفتتح - تحب الأفلام التي تحتوي على الكثير من الأكشن والمرح",
    keywords: ["Actionkomödie = كوميديا أكشن", "Gauner = لصوص", "Mönche = رهبان", "Prügel = ضرب"],
    simplified: "فيلم أكشن كوميدي عن لصين يتحولان إلى راهبين",
    imagine: "رجلان يرتديان زي الرهبان ويتشاجران بقبضاتهم",
    correct: 3
};

HELP_DATA["lesen3_exam1_q8"] = {
    text: "Nach den Weltcup-Siegen - Bekannte interessieren sich für Wintersportveranstaltungen.",
    meaning: "بعد انتصارات كأس العالم - معارف مهتمون بفعاليات الرياضات الشتوية",
    keywords: ["Weltcup = كأس العالم", "Skispringen = قفز تزلج", "Österreich = النمسا", "Deutschland = ألمانيا"],
    simplified: "مسابقة القفز على الجليد بين ألمانيا والنمسا",
    imagine: "رجل يقفز من منحدر ثلجي كبير وذراعاه ممدودتان كالطائر",
    correct: 1
};

HELP_DATA["lesen3_exam1_q9"] = {
    text: "Man sollte meinen, Schauspieler Hendrik Höfgen - Ein Bekannter möchte einen Film sehen, der nach dem Werk eines Schriftstellers gedreht wurde.",
    meaning: "قد يعتقد المرء أن الممثل هندريك هوفجن - أحد المعارف يريد مشاهدة فيلم مقتبس عن عمل كاتب",
    keywords: ["Roman = رواية", "Klaus Mann = كلاوس مان", "Nazis = نازيين", "Theater = مسرح"],
    simplified: "فيلم درامي عن ممثل يبيع فنه للنازيين مأخوذ عن رواية",
    imagine: "ممثل يرتدي زي المسرح ويقف أمام علم أحمر عليه صليب معقوف",
    correct: 0
};

// ========== Exam 2: Filme - Fernsehprogramme (معدل) ==========
HELP_DATA["lesen3_exam2_q1"] = {
    text: "Ullrich Kasten und Hans-Hermann Hertle schildern - Eine Bekannte interessiert sich für informative Beiträge zur neueren Geschichte.",
    meaning: "أولريش كاستن وهانز-هيرمان هيرتل يصفان - إحدى المعارف مهتمة بالتقارير الإخبارية عن التاريخ الحديث",
    keywords: ["Dokumentation = فيلم وثائقي", "Mauerbau = بناء الجدار", "Zeitzeugen = شهود عيان"],
    simplified: "فيلم وثائقي عن جدار برلين مع مقابلات شهود عيان",
    imagine: "رجل عجوز يبكي أمام صورة جدار خرساني كبير",
    correct: 6
};

HELP_DATA["lesen3_exam2_q2"] = {
    text: "Ob Klassik, Rock'n'Roll oder Jazz - Sie suchen eine abwechslungsreiche Musiksendung mit Klaviermusik.",
    meaning: "سواء كلاسيكي أو روك أو جاز - تبحث عن برنامج موسيقي متنوع مع بيانو",
    keywords: ["Klassik = كلاسيكي", "Rock'n'Roll = روك", "Jazz = جاز", "Entertainer = مقدم ترفيه"],
    simplified: "برنامج موسيقي ممتع مع عازف بيانو وضيفة مغنية",
    imagine: "أصابع سريعة تضرب مفاتيح البيانو بالأبيض والأسود",
    correct: 2
};

HELP_DATA["lesen3_exam2_q3"] = {
    text: "Aus Sorge um die nationale Sicherheit - Sie sehen gern spannende, aber auch spaßige Agentenfilme.",
    meaning: "خوفا على الأمن القومي - تحب مشاهدة أفلام التجسس المثيرة والممتعة",
    keywords: ["Geheimdienst = مخابرات", "Psychiater = طبيب نفسي", "Gangster = قطاع طرق"],
    simplified: "فيلم تجسس كوميدي مع عالم مجنون وأطباء وقطاع طرق",
    imagine: "طبيب نفسي يرتدي نظارة سوداء ويبتسم بجنون",
    correct: 7
};

HELP_DATA["lesen3_exam2_q4"] = {
    text: "Er schreit wie am Spieß - Sie mögen Familienkomödien, besonders mit frechen Kindern.",
    meaning: "هو يصرخ بصوت عالٍ - تحب الكوميديا العائلية خاصة مع الأطفال الشقاة",
    keywords: ["schreit = يصرخ", "allein erziehend = عزب يربي", "Vater = أب", "Sohn = ابن"],
    simplified: "أب أعزب يعاني مع طفله الشقي",
    imagine: "طفل صغير يضع قطة في كيس قمامة وأبوه يركض خلفه",
    correct: 5
};

HELP_DATA["lesen3_exam2_q5"] = {
    text: "Hier in Berlin bei meinen Freunden - Sie würden gern etwas über Großstadtjugendliche erfahren, die am Rand der Gesellschaft leben.",
    meaning: "هنا في برلين عند أصدقائي - ترغب في معرفة شيء عن شباب المدن الكبرى الذين يعيشون على الهامش",
    keywords: ["Berlin = برلين", "obdachlos = بلا مأوى", "jugendlich = مراهق", "Notunterkünfte = ملاجئ طوارئ"],
    simplified: "فيلم عن مراهقين بلا مأوى في شوارع برلين",
    imagine: "شاب نائم على كرتون في محطة مترو ويرتجف من البرد",
    correct: 8
};

HELP_DATA["lesen3_exam2_q6"] = {
    text: "Mit Sandalen und T-Shirt - Sie möchten im nächsten Urlaub bergsteigen und sich über die Risiken informieren.",
    meaning: "بالصنادل والتي شيرت - ترغب في تسلق الجبال في الإجازة القادمة وتريد معرفة المخاطر",
    keywords: ["Sandalen = صنادل", "Bergwacht = خدمة إنقاذ جبلي", "Alpen = الألب", "Unfälle = حوادث"],
    simplified: "فيلم عن مخاطر تسلق الجبال في الألب",
    imagine: "رجل يسقط من على حافة جبل ورجال الإنقاذ يهرعون",
    correct: 9
};

HELP_DATA["lesen3_exam2_q7"] = {
    text: "'Schwere Jungs' bildet den Auftakt - Sie mögen Filme mit viel Action und viel Spaß.",
    meaning: "'شباب ثقال' تفتتح - تحب الأفلام التي تحتوي على الكثير من الأكشن والمرح",
    keywords: ["Actionkomödie = كوميديا أكشن", "Gauner = لصوص", "Mönche = رهبان", "Hau-drauf = اضرب بقوة"],
    simplified: "فيلم أكشن كوميدي عن لصين يتحولان إلى راهبين",
    imagine: "لصان يرتديان زي الرهبان ويضربان بعضهما بأيد عارية",
    correct: 3
};

HELP_DATA["lesen3_exam2_q8"] = {
    text: "Nach den Weltcup-Siegen - Ihre Bekannten verfolgen gern sportliche Wettkämpfe.",
    meaning: "بعد انتصارات كأس العالم - معارفك يحبون متابعة المسابقات الرياضية",
    keywords: ["Weltcup = كأس العالم", "Skispringen = قفز تزلج", "Österreich = النمسا", "Deutschland = ألمانيا"],
    simplified: "مسابقة القفز على الجليد بين النمسا وألمانيا",
    imagine: "شخص يطير في الهواء لمسافة 120 مترا والجمهور يصفق",
    correct: 1
};

HELP_DATA["lesen3_exam2_q9"] = {
    text: "Man sollte meinen, Schauspieler Hendrik Höfgen - Ein Bekannter möchte einen Film sehen, der nach dem Werk eines Schriftstellers gedreht wurde.",
    meaning: "قد يعتقد المرء أن الممثل هندريك هوفجن - أحد المعارف يريد مشاهدة فيلم مقتبس عن عمل كاتب",
    keywords: ["Roman = رواية", "Klaus Mann = كلاوس مان", "Nazis = نازيين", "Mephisto = مفستو"],
    simplified: "فيلم درامي عن ممثل يبيع روحه للنازيين مقتبس عن رواية",
    imagine: "ممثل يرتدي زي الشيطان ويقف أمام هتلر",
    correct: 0
};

// ========== Exam 3: Im Katalog eines Buchversands ==========
HELP_DATA["lesen3_exam3_q1"] = {
    text: "Die Nachfrage nach individueller Farb- und Stilberatung - Eine Bekannte möchte ihr äußeres Erscheinungsbild optimieren.",
    meaning: "الطلب على استشارات الألوان والأساليب الفردية كبيرة - إحدى المعارف تريد تحسين مظهرها الخارجي",
    keywords: ["Farbberatung = استشارة ألوان", "Stilberatung = استشارة أناقة", "Outfit = ملابس", "Selbstdarstellung = تقديم الذات"],
    simplified: "كتاب عن كيفية تحسين مظهرك الشخصي في العمل والحياة",
    imagine: "امرأة تقف أمام المرآة وتجرب ألوان ملابس مختلفة",
    correct: 5
};

HELP_DATA["lesen3_exam3_q2"] = {
    text: "Die meisten Menschen kennen keine Strategien - Eine Studentin sucht Informationen, wie sie besser und systematischer lernen kann.",
    meaning: "معظم الناس لا يعرفون استراتيجيات - طالبة تبحث عن معلومات حول كيف تتعلم بشكل أفضل ومنتظم",
    keywords: ["Gedächtnis = ذاكرة", "Lernverhalten = سلوك تعلم", "Techniken = تقنيات", "Informationen = معلومات"],
    simplified: "كتاب عن تقنيات الذاكرة وتعلم أسهل",
    imagine: "طالبة تجلس أمام كتب كثيرة وتضع أصابعها على رأسها",
    correct: 3
};

HELP_DATA["lesen3_exam3_q3"] = {
    text: "Dieses erstmals 1788 erschienene Buch - Ein Bekannter schreibt an einer Hausarbeit über gesellschaftliche Normen und Verhaltensregeln.",
    meaning: "هذا الكتاب الذي صدر لأول مرة عام 1788 - أحد المعارف يكتب بحثا عن الأعراف الاجتماعية وقواعد السلوك",
    keywords: ["Benehmen = سلوك", "Umgang = تعامل", "Verhaltensregeln = قواعد سلوك", "gesellschaftliche Normen = أعراف اجتماعية"],
    simplified: "كتاب قديم عن الأخلاق وآداب التعامل مع الناس",
    imagine: "طالب يقرأ كتابا قديما جدا ومغبرا وعليه علامات استفهام",
    correct: 7
};

HELP_DATA["lesen3_exam3_q4"] = {
    text: "Jeder Mensch kann seine kommunikativen Möglichkeiten entdecken - Eine Bekannte ist sehr verunsichert wegen ihrer Angst vor Reden auf Konferenzen.",
    meaning: "كل إنسان يمكنه اكتشاف قدراته التواصلية - إحدى المعارف قلقة جدا بسبب خوفها من التحدث في المؤتمرات",
    keywords: ["kommunikativ = تواصلي", "Rede = خطاب", "Vortrag = محاضرة", "Redeängste = مخاوف الكلام"],
    simplified: "كتاب عن التغلب على الخوف من التحدث أمام الجمهور",
    imagine: "امرأة ترتجف وتتعرق قبل صعودها على المسرح",
    correct: 9
};

HELP_DATA["lesen3_exam3_q5"] = {
    text: "Der Körper lügt nicht, Gesten und Gebärden - Ein Bekannter möchte wissen, welche Botschaften durch Gestik und Mimik transportiert werden.",
    meaning: "الجسد لا يكذب والإيماءات - أحد المعارف يريد معرفة الرسائل التي تنقلها الإيماءات وتعبيرات الوجه",
    keywords: ["Gesten = إيماءات", "Mimik = تعابير وجه", "Körpersprache = لغة جسد", "Signale = إشارات"],
    simplified: "كتاب عن لغة الجسد ومعاني الحركات والإشارات",
    imagine: "رجل يرفع إصبعه وامرأة أخرى تزم شفتيها",
    correct: 4
};

HELP_DATA["lesen3_exam3_q6"] = {
    text: "Rolph Barth 'Basiswissen: Bewerbungstraining' - Ein Bekannter ist sich unsicher, wie er sich bei einem Vorstellungsgespräch am besten präsentiert.",
    meaning: "رولف بارث 'أساسيات: تدريب التقديم' - أحد المعارف غير متأكد كيف يقدم نفسه بشكل جيد في مقابلة العمل",
    keywords: ["Bewerbung = تقديم", "Vorstellungsgespräch = مقابلة عمل", "Arbeitsmarkt = سوق عمل", "Anschreiben = رسالة تقديم"],
    simplified: "كتاب عن كيفية كتابة سيرة ذاتية والتصرف في مقابلة العمل",
    imagine: "شاب يرتدي بدلة ويقف متوترا أمام باب مغلق",
    correct: 6
};

HELP_DATA["lesen3_exam3_q7"] = {
    text: "Viele Menschen wissen nicht mehr, wo ihnen der Kopf steht - Ein befreundetes Ehepaar steht andauernd unter Stress ويريد وقتا لنفسه.",
    meaning: "كثير من الناس لا يعرفون أين رؤوسهم - زوجان صديقان تحت ضغط مستمر ويريدان وقتا لأنفسهما",
    keywords: ["Zeitdruck = ضغط وقت", "Zeitmanagement = إدارة وقت", "Prioritäten = أولويات", "Zeitfalle = فخ الوقت"],
    simplified: "كتاب عن إدارة الوقت والتخلص من الضغوط اليومية",
    imagine: "زوجان يجريان بين الساعة والمواعيد والأوراق تتناثر حولهما",
    correct: 1
};

// ========== Exam 4: kein Zeit (Theaterstücke und Veranstaltungen) ==========
HELP_DATA["lesen3_exam4_q1"] = {
    text: "In Pollekes elfjährigem Leben - Sie möchten mit Ihrer zwölfjährigen Tochter ein altersgerechtes Theaterstück sehen.",
    meaning: "في حياة بوليك ذات الحادية عشرة - تريد الذهاب مع ابنتك البالغة اثنتي عشرة سنة لعرض مسرحي مناسب لعمرها",
    keywords: ["Theaterstück = عرض مسرحي", "Alter ab 9 Jahren = عمر من 9 سنوات", "Theaterwerkstatt = ورشة مسرح", "Familie = عائلة"],
    simplified: "مسرحية لفتاة عمرها 11 سنة عن مشاكل العائلة والحب",
    imagine: "أم وابنتها تجلسان في مسرح وطفلة تمثل على الخشبة",
    correct: 4
};

HELP_DATA["lesen3_exam4_q2"] = {
    text: "Rasmus und der Landstreicher nach Astrid Lindgren - Sie möchten zusammen mit Ihrem kleinen Neffen einen Kinderfilm sehen.",
    meaning: "راسموس والمتشرد حسب أستريد ليندغرين - تريد الذهاب مع ابن أختك الصغير لمشاهدة فيلم أطفال",
    keywords: ["Kinderbuch = كتاب أطفال", "Astrid Lindgren = أستريد ليندغرين", "Bürgerkino = سينما المواطن", "Alter ab 5 Jahren = عمر من 5 سنوات"],
    simplified: "فيلم عن ولد يتيم يهرب من دار أطفال ويجد صديقا متشردا",
    imagine: "طفل صغير يضحك وفيلم كرتون على الشاشة أمامه",
    correct: 5
};

HELP_DATA["lesen3_exam4_q3"] = {
    text: "Beethovens Bonn - Ihre Schwester interessiert sich für die Biographien großer Musiker.",
    meaning: "بون بيتهوفن - أختك مهتمة بالسير الذاتية للموسيقيين العظماء",
    keywords: ["Beethoven = بيتهوفن", "Komponist = ملحن", "Biographien = سير ذاتية", "Bonn = بون"],
    simplified: "جولة في بون لزيارة أماكن حياة بيتهوفن",
    imagine: "امرأة تقف أمام منزل قديم وتحمل كتابا عن بيتهوفن",
    correct: 0
};

HELP_DATA["lesen3_exam4_q4"] = {
    text: "Radtour am Rhein - Sie wollen eine Stadtbesichtigung mit ein wenig Sport verbinden.",
    meaning: "جولة بالدراجة على نهر الراين - تريد دمج زيارة المدينة مع القليل من الرياضة",
    keywords: ["Radtour = جولة دراجات", "Rhein = راين", "ADFC = نادي الدراجات", "Stadtbesichtigung = زيارة مدينة"],
    simplified: "جولة بالدراجة على طول نهر الراين مع مرشد سياحي",
    imagine: "أشخاص يركبون دراجات بجانب نهر كبير وقصور قديمة",
    correct: 6
};

HELP_DATA["lesen3_exam4_q5"] = {
    text: "Drei Flöhe und das Jesuskind - Sie wollen mit Ihren Kindern eine etwas andere, eher lustige Seite von Weihnachten erleben.",
    meaning: "ثلاثة براغيث وطفل يسوع - تريد مع أطفالك تجربة جانب مختلف ومضحك بعض الشيء للكريسماس",
    keywords: ["Weihnachtsgeschichte = قصة عيد الميلاد", "Kinderstück = مسرحية أطفال", "humorvoll = فكاهي", "Alter ab 5 Jahren = عمر من 5 سنوات"],
    simplified: "مسرحية مضحكة عن قصة عيد الميلاد من وجهة نظر ثلاثة براغيث",
    imagine: "أطفال يضحكون وثلاث دمى على شكل براغيث على المسرح",
    correct: 8
};

HELP_DATA["lesen3_exam4_q6"] = {
    text: "Weihnachtsshow 'Stille Nacht' trifft 'Last Christmas' - Sie möchten alte und neue Weihnachtslieder hören.",
    meaning: "عرض عيد الميلاد 'ليلة صامتة' يواجه 'عيد الميلاد الماضي' - تريد سماع أغاني عيد الميلاد القديمة والجديدة",
    keywords: ["Weihnachtsshow = عرض كريسماس", "Weihnachtslieder = أغاني عيد الميلاد", "Gospel = غوسبل", "Konzerthallen = قاعات حفلات"],
    simplified: "حفل غنائي يجمع أغاني الكريسماس القديمة والحديثة",
    imagine: "مغنيون يقفون على مسرح ونجمة ضخمة فوقهم",
    correct: 3
};

HELP_DATA["lesen3_exam4_q7"] = {
    text: "Jazz vom Feinsten - Sie lieben Auftritte von herausragenden Musikern.",
    meaning: "جاز من الدرجة الأولى - تحب عروض الموسيقيين البارعين",
    keywords: ["Jazz = جاز", "Trompeter = عازف بوق", "virtuos = بارع", "Komponist = ملحن"],
    simplified: "حفل جاز لعازف بوق سويدي مشهور",
    imagine: "رجل ينفخ في البوق والجمهور يصفق بحماس",
    correct: 1
};

HELP_DATA["lesen3_exam4_q8"] = {
    text: "10 Jahre FÜR DIE KATZ - Sie wollen mit Bekannten ausgehen um mal wieder herzhaft lachen.",
    meaning: "10 سنوات من أجل القطة - تريد الخروج مع معارفك لتضحك من قلبك مرة أخرى",
    keywords: ["Komiker = كوميديان", "Comedy = كوميديا", "Kabarett = كباريه", "lustig = مضحك"],
    simplified: "عرض كوميدي بمناسبة مرور 10 سنوات على تأسيس فرقة كوميدية",
    imagine: "جمهور يضحك بصوت عال ورجلان على المسرح يرتدون ملابس مضحكة",
    correct: 9
};

HELP_DATA["lesen3_exam4_q9"] = {
    text: "Das Weihnachtsvarieté - Sie lieben künstlerische Vielfalt und wollen Weihnachten ausgehen.",
    meaning: "فاريتيه عيد الميلاد - تحب التنوع الفني وتريد الخروج في عيد الميلاد",
    keywords: ["Varieté = فاريتيه", "Akrobatik = ألعاب بهلوانية", "Jonglage = دحرجة", "Livemusiker = موسيقيون أحياء"],
    simplified: "عرض متنوع في عيد الميلاد يجمع الألعاب البهلوانية والموسيقى",
    imagine: "رجل يدحرج كرات نارية وآخر يعزف على البيانو",
    correct: 2
};

// ========== Exam 5: kein Zeit (معدل) ==========
HELP_DATA["lesen3_exam5_q1"] = {
    text: "In Pollekes elfjährigem Leben - Sie möchten mit Ihrer zwölfjährigen Tochter ein altersgerechtes Theaterstück sehen.",
    meaning: "في حياة بوليك ذات الحادية عشرة - تريد الذهاب مع ابنتك لمسرحية تناسب عمرها",
    keywords: ["Theaterwerkstatt = ورشة مسرح", "Alter ab 9 Jahren = عمر من 9 سنوات", "Familie = عائلة"],
    simplified: "مسرحية لطفلة عمرها 11 سنة عن مشاكل العائلة",
    imagine: "أم وابنتها في المسرح وطفلة تمثل على الخشبة",
    correct: 4
};

HELP_DATA["lesen3_exam5_q2"] = {
    text: "Rasmus und der Landstreicher nach Astrid Lindgren - Sie suchen einen Kinderfilm für ihren kleinen Sohn.",
    meaning: "راسموس والمتشرد حسب أستريد ليندغرين - تبحث عن فيلم أطفال لابنك الصغير",
    keywords: ["Kinderbuch = كتاب أطفال", "Astrid Lindgren = أستريد ليندغرين", "Bürgerkino = سينما المواطن", "Alter ab 5 = عمر من 5"],
    simplified: "فيلم عن ولد يتيم يهرب من دار أطفال",
    imagine: "طفل صغير يصفق وفيلم كرتون على الشاشة",
    correct: 5
};

HELP_DATA["lesen3_exam5_q3"] = {
    text: "Beethovens Bonn - Ihre Schwester interessiert sich für die Biographien großer Musiker.",
    meaning: "بون بيتهوفن - أختك مهتمة بالسير الذاتية للموسيقيين العظماء",
    keywords: ["Beethoven = بيتهوفن", "Komponist = ملحن", "Bonn = بون"],
    simplified: "جولة في بون لزيارة أماكن بيتهوفن",
    imagine: "امرأة أمام منزل قديم وتحمل كتابا عن بيتهوفن",
    correct: 0
};

HELP_DATA["lesen3_exam5_q4"] = {
    text: "Radtour am Rhein - Sie suchen für sportliche Sprachkursteilnehmer eine Möglichkeit, Bonn zu zeigen.",
    meaning: "جولة بالدراجة على الراين - تبحث عن طريقة لإظهار بون لمشتركين رياضيين في دورة لغة",
    keywords: ["Radtour = جولة دراجات", "ADFC = نادي دراجات", "Rhein = راين", "Sport = رياضة"],
    simplified: "جولة بالدراجة لاستكشاف مدينة بون",
    imagine: "مجموعة تلبس خوذات دراجات وتقف أمام كاتدرائية",
    correct: 6
};

HELP_DATA["lesen3_exam5_q5"] = {
    text: "Drei Flöhe und das Jesuskind - Sie wollen mit Ihren Kindern eine etwas andere, eher lustige Seite von Weihnachten erleben.",
    meaning: "ثلاثة براغيث وطفل يسوع - تريد تجربة جانب مختلف ومضحك للكريسماس مع أطفالك",
    keywords: ["Kinderstück = مسرحية أطفال", "humorvoll = فكاهي", "Weihnachtsgeschichte = قصة عيد الميلاد", "Alter ab 5 = عمر من 5"],
    simplified: "مسرحية مضحكة عن الكريسماس من وجهة نظر ثلاثة براغيث",
    imagine: "طفل يضحك ودمية برغوث على المسرح",
    correct: 8
};

HELP_DATA["lesen3_exam5_q6"] = {
    text: "Weihnachtsshow 'Stille Nacht' trifft 'Last Christmas' - Sie möchten alte und neue Weihnachtslieder hören.",
    meaning: "عرض 'ليلة صامتة' يواجه 'عيد الميلاد الماضي' - تريد سماع أغاني الكريسماس القديمة والجديدة",
    keywords: ["Weihnachtsshow = عرض كريسماس", "Weihnachtslieder = أغاني كريسماس", "Gospel = غوسبل"],
    simplified: "حفل يجمع أغاني الكريسماس القديمة والحديثة",
    imagine: "جوقة تغني على مسرح وأضواء ملونة",
    correct: 3
};

HELP_DATA["lesen3_exam5_q7"] = {
    text: "Jazz vom Feinsten - Sie lieben Auftritte von herausragenden Musikern.",
    meaning: "جاز من الدرجة الأولى - تحب عروض الموسيقيين البارعين",
    keywords: ["Jazz = جاز", "Trompeter = عازف بوق", "virtuos = بارع"],
    simplified: "حفل جاز لعازف بوق مشهور",
    imagine: "عازف بوق يغلق عينيه وهو يعزف",
    correct: 1
};

HELP_DATA["lesen3_exam5_q8"] = {
    text: "10 Jahre FÜR DIE KATZ - Sie wollen mit Bekannten ausgehen um mal wieder herzhaft lachen.",
    meaning: "10 سنوات من أجل القطة - تريد الخروج مع معارفك لتضحك من قلبك",
    keywords: ["Komiker = كوميديان", "Comedy = كوميديا", "Kabarett = كباريه"],
    simplified: "عرض كوميدي بمناسبة مرور 10 سنوات",
    imagine: "جمهور يضحك ورفاقه يصفقون على المسرح",
    correct: 9
};

// ========== Exam 6: Musik - spielt Gitarre ==========
HELP_DATA["lesen3_exam6_q1"] = {
    text: "Die Veranstaltungsprofis - Ein Bekannter hat bei der Messe Frankfurt gearbeitet und sucht eine andere Stelle في diesem Bereich.",
    meaning: "محترفو الفعاليات - أحد المعارف عمل في معرض فرانكفورت ويبحث عن وظيفة أخرى في هذا المجال",
    keywords: ["Messen = معارض", "Veranstaltungsorganisation = تنظيم فعاليات", "Ausbildung = تدريب", "reisefreudig = محب للسفر"],
    simplified: "وظيفة في مجال تنظيم المعارض والفعاليات في أوروبا",
    imagine: "رجل يقف أمام لوحة إعلانات تبحث عن موظفين",
    correct: 2
};

HELP_DATA["lesen3_exam6_q2"] = {
    text: "Gemeinsam mehr erleben - Ein Kollege möchte mit fünf Freunden eine mehrtägige Musikveranstaltung besuchen.",
    meaning: "تجربة المزيد معا - زميل يريد مع خمسة أصدقاء زيارة فعالية موسيقية لعدة أيام",
    keywords: ["Gruppenreisen = رحلات جماعية", "Jazzfestival = مهرجان جاز", "Klassikwoche = أسبوع كلاسيكي", "Veranstaltungen = فعاليات"],
    simplified: "رحلة منظمة لمدة 4 أيام لحضور مهرجان جاز",
    imagine: "خمسة أصدقاء يحملون حقائب ويدخلون قاعة حفلات",
    correct: 1
};

HELP_DATA["lesen3_exam6_q3"] = {
    text: "Musikfestival Taubertal - Sie mögen Musik und möchten in diesem Bereich einen Job.",
    meaning: "مهرجان تاوبرتال الموسيقي - تحب الموسيقى وتريد وظيفة في هذا المجال",
    keywords: ["Musikfestival = مهرجان موسيقي", "Job = وظيفة", "Ticketkontrolle = فحص تذاكر", "Musiker = موسيقيين"],
    simplified: "فرصة عمل في مهرجان موسيقي مع إمكانية مقابلة الموسيقيين",
    imagine: "شاب يحمل لافتة أمن في مهرجان موسيقي حاشد",
    correct: 7
};

HELP_DATA["lesen3_exam6_q4"] = {
    text: "Alle Veranstaltungen aus einer Hand - Sie möchten einer Freundin Eintrittskarten für eine Musikveranstaltung schenken.",
    meaning: "جميع الفعاليات من يد واحدة - تريد إعطاء صديقتك تذاكر دخول لفعالية موسيقية كهدية",
    keywords: ["Veranstaltungen = فعاليات", "Geschenkgutscheine = بطاقات هدايا", "Online-Shop = متجر إلكتروني", "Tickets = تذاكر"],
    simplified: "موقع لبيع تذاكر الحفلات الموسيقية مع خيار بطاقات الهدايا",
    imagine: "امرأة تطبع تذكرة حفل موسيقي من طابعة منزلها",
    correct: 3
};

HELP_DATA["lesen3_exam6_q5"] = {
    text: "I Gitarre, Violine & Co. - Die sechsjährige Tochter eines Nachbarn würde gerne mit anderen Kindern Musik machen.",
    meaning: "أنا جيتار وكمان وشركاه - ابنة الجيران البالغة ست سنوات تحب صنع الموسيقى مع أطفال آخرين",
    keywords: ["Musikverein = جمعية موسيقية", "Instrumente = آلات موسيقية", "Kinder = أطفال", "Probestunden = حصص تجريبية"],
    simplified: "جمعية موسيقية تعلم الأطفال العزف والغناء من سن سنتين",
    imagine: "ستة أطفال يجلسون في حلقة ومعلم يوزع الدفوف الصغيرة",
    correct: 5
};

HELP_DATA["lesen3_exam6_q6"] = {
    text: "Rhein/Ruhr-Festival - Eine Bekannte ist Musikerin und sucht Möglichkeiten, mit ihrer Gruppe aufzutreten.",
    meaning: "مهرجان الراين/الرور - إحدى المعارف موسيقية وتبحث عن فرص لتقديم عروض مع فرقتها",
    keywords: ["Festival = مهرجان", "Künstler = فنانين", "Bühnen = مسارح", "Musikgruppen = فرق موسيقية"],
    simplified: "مهرجان جديد يبحث عن فنانين منفردين وفرق لتقديم عروض",
    imagine: "شابة تحمل آلة جيتار وتقف خلف كواليس المسرح",
    correct: 9
};

HELP_DATA["lesen3_exam6_q7"] = {
    text: "Musiker gesucht - Ein Bekannter spielt Gitarre und möchte ein weiteres Instrument lernen.",
    meaning: "مطلوب موسيقيون - أحد المعارف يعزف الجيتار ويريد تعلم آلة موسيقية أخرى",
    keywords: ["Musiktandems = ثنائيات موسيقية", "Unterricht = دروس", "Instrument = آلة موسيقية", "registrieren = تسجيل"],
    simplified: "موقع لتبادل تعلم الآلات الموسيقية بين العازفين",
    imagine: "شاب يضع يده على كتف عازف كمان والآخر يبتسم",
    correct: 0
};

HELP_DATA["lesen3_exam6_q8"] = {
    text: "Wir organisieren Veranstaltungen in verschiedenen Größenordnungen - Ein Bekannter muss eine Jubiläumsfeier organisieren und sucht Unterstützung.",
    meaning: "نحن ننظم فعاليات بأحجام مختلفة - أحد المعارف عليه تنظيم حفل ذكرى سنوية ويبحث عن دعم",
    keywords: ["Veranstaltungen = فعاليات", "Familienfeier = حفل عائلي", "Firmenveranstaltungen = فعاليات شركات", "Beratung = استشارة"],
    simplified: "شركة تنظم حفلات من 10 إلى مئات الأشخاص وتقدم استشارات",
    imagine: "رجل يتصل هاتفيا ويسأل عن تنظيم حفل زفاف",
    correct: 6
};

// ========== Exam 7: المرأة الحامل ==========
HELP_DATA["lesen3_exam7_q1"] = {
    text: "Das Vorstellungsgespräch ist eine wichtige Hürde - Ihre Schwägerin erwartet ein Kind. Sie ist nicht sicher, ob sie في Vorstellungsgespräch darauf hinweisen muss.",
    meaning: "مقابلة العمل عقبة مهمة - زوجة أخيك تنتظر طفلا وهي غير متأكدة إذا كان يجب أن تذكر ذلك في المقابلة",
    keywords: ["Vorstellungsgespräch = مقابلة عمل", "Schwangerschaft = حمل", "Fragen = أسئلة", "wahrheitsgemäß = بصدق"],
    simplified: "نصائح عن ممنوع التحدث عنه في مقابلة العمل مثل الحمل",
    imagine: "امرأة حامل جالسة أمام مدير وظهرها متوتر",
    correct: 0
};

HELP_DATA["lesen3_exam7_q2"] = {
    text: "Robert Sonntag, Autor des Buches 'Hilfe, ich muss reden' - Eine Freundin, 20 Jahre alt, muss oft vor Arbeitskollegen Referate halten. مشكلتها الأساسية هي عصبيتها.",
    meaning: "روبرت سونتاغ مؤلف كتاب 'النجدة أنا يجب أن أتكلم' - صديقة عمرها 20 سنة غالبا ما تقدم عروضا أمام زملاء العمل ومشكلتها الأساسية هي عصبيتها",
    keywords: ["Angst = خوف", "Referate = عروض", "Körpersprache = لغة جسد", "Entspannungstechniken = تقنيات استرخاء"],
    simplified: "كتاب ونصائح عن التغلب على الخوف من التحدث أمام الجمهور",
    imagine: "فتاة ترتجف أمام زملائها في العمل وأوراقها تتطاير من يديها",
    correct: 2
};

HELP_DATA["lesen3_exam7_q3"] = {
    text: "Wer zu seinem Vorstellungsgespräch eingeladen wird - Eine Freundin sucht einen Ausbildungsplatz. Sie ist zu einem Vorstellungsgespräch eingeladen und weiß nicht, was sie anziehen soll.",
    meaning: "من تتم دعوته لمقابلة عمل - صديقة تبحث عن مكان تدريب ودُعيت لمقابلة عمل ولا تعرف ماذا ترتدي",
    keywords: ["Vorstellungsgespräch = مقابلة عمل", "Kleidung = ملابس", "Ausbildungsplatz = مكان تدريب", "repräsentieren = تمثيل"],
    simplified: "نصائح عن الملابس المناسبة لمقابلة العمل",
    imagine: "فتاة تقف أمام خزانة ملابسها وفكرها مشتوت",
    correct: 3
};

HELP_DATA["lesen3_exam7_q4"] = {
    text: "Ein Auszubildender bei einer Bank - Eine Bekannte möchte eine Ausbildung machen und vielleicht später einmal studieren.",
    meaning: "متدرِب في بنك - إحدى المعارف تريد القيام بتدريب وربما الدراسة لاحقا",
    keywords: ["Auszubildender = متدرب", "Bank = بنك", "Vergütung = تعويض", "Fortbildung = تدريب إضافي"],
    simplified: "معلومات عن رواتب المتدربين في البنوك وفرص الدراسة",
    imagine: "شابة تحمل نقودا وتضعها في حصالة على شكل جامعة",
    correct: 4
};

HELP_DATA["lesen3_exam7_q5"] = {
    text: "Für junge Leute kann das Internet zu einer Droge werden - Ein Freund surft täglich viele Stunden im Internet und تريد أن تنصحه لأنك تجد هذه الساعات كثيرة.",
    meaning: "الإنترنت يمكن أن يصبح مخدرا للشباب - صديق يتصفح الإنترنت ساعات طويلة يوميا وتريد نصحه",
    keywords: ["Internet = إنترنت", "Sucht = إدمان", "Surfzeiten = أوقات تصفح", "Psychologen = علماء نفس"],
    simplified: "نصائح للتغلب على إدمان الإنترنت مثل سجل الأوقات",
    imagine: "شاب جالس أمام شاشة وعيناه حمراوان والساعة تشير للخامسة صباحا",
    correct: 5
};

HELP_DATA["lesen3_exam7_q6"] = {
    text: "Nichts ist auf privaten Feierlichkeiten schlimmer - Ein älteres Ehepaar hat Goldene Hochzeit. Die Tochter möchte eine Rede halten und braucht dafür eine Anleitung.",
    meaning: "لا شيء أسوأ في الاحتفالات الخاصة من الخطب الطويلة - زوجان مسنان لديهما زفاف ذهبي والابنة تريد إلقاء خطاب وتحتاج دليلا",
    keywords: ["Ansprachen = خطابات", "Hochzeiten = أعراس", "Volkshochschulen = مدارس شعبية", "Seminare = ندوات"],
    simplified: "دورات نهاية أسبوع لتعلم كيفية إلقاء خطاب قصير وممتع في المناسبات",
    imagine: "امرأة واقفة على منصة وخلفها والديها يحملان بالونات ذهبية",
    correct: 8
};

HELP_DATA["lesen3_exam7_q7"] = {
    text: "Ein Freund möchte wissen, welche schulischen Leistungen bei der Vergabe von Ausbildungsplätzen im Bankgewerbe besonders wichtig sind.",
    meaning: "صديق يريد أن يعرف ما هي المعدلات المدرسية المهمة عند الحصول على أماكن تدريب في قطاع البنوك",
    keywords: ["Sparkassen-Akademie = أكاديمية بنوك ادخار", "Noten = درجات", "Deutsch = ألمانية", "Mathematik = رياضيات"],
    simplified: "المعرفة في البنوك تتطلب درجات جيدة في الألمانية والرياضيات",
    imagine: "شاب يحدق في شهادة دراسية ونقود تخرج منها",
    correct: 6
};

HELP_DATA["lesen3_exam7_q8"] = {
    text: "Viele junge Leute flüchten sich in die virtuelle Scheinwelt - Eine Bekannte sucht Rat bei Ihnen, weil ihr Sohn ständig im Internet surft und dabei die Schule vernachlässigt.",
    meaning: "كثير من الشباب يهربون إلى العالم الافتراضي - إحدى المعارف تطلب منك النصيحة لأن ابنها يتصفح الإنترنت دائما ويهمل المدرسة",
    keywords: ["Chatrooms = غرف محادثة", "vernachlässigen = يهمل", "Hausaufgaben = واجبات", "Eltern = آباء"],
    simplified: "نصائح للآباء عن كيفية التعامل مع إدمان الأبناء للإنترنت",
    imagine: "أم تجلس بجانب ابنها الصغير ويدها على كتفه وكلاهما ينظران إلى شاشة زرقاء",
    correct: 9
};

// ========== Exam 8: المرأة الحامل (معدل) ==========
HELP_DATA["lesen3_exam8_q1"] = {
    text: "Das Vorstellungsgespräch ist eine wichtige Hürde - Ihre Schwägerin erwartet ein Kind. Sie ist nicht sicher, ob sie في مقابلة عمل عليها الإشارة إلى ذلك.",
    meaning: "مقابلة العمل عقبة مهمة - زوجة أخيك تنتظر طفلا وهي غير متأكدة إذا كان يجب ذكر ذلك في مقابلة العمل",
    keywords: ["Vorstellungsgespräch = مقابلة عمل", "Schwangerschaft = حمل", "wahrheitsgemäß = بصدق", "Familienplanung = تنظيم الأسرة"],
    simplified: "لا يجب الكشف عن الحمل أو خطط الإنجاب في مقابلة العمل",
    imagine: "امرأة تضع يدها على بطنها ومدير ينظر إليها بنظرة حادة",
    correct: 0
};

HELP_DATA["lesen3_exam8_q2"] = {
    text: "Robert Sonntag, Autor des Buches 'Hilfe, ich muss reden' - Eine Freundin, 20 Jahre alt, muss oft vor Arbeitskollegen Referate halten. مشكلتها الأساسية هي عصبيتها.",
    meaning: "روبرت سونتاغ مؤلف كتاب 'النجدة أنا يجب أن أتكلم' - صديقة عمرها 20 سنة غالبا ما تقدم عروضا أمام زملاء العمل ومشكلتها الأساسية هي عصبيتها",
    keywords: ["Angst = خوف", "Körpersprache = لغة جسد", "Stimme = صوت", "Entspannungstechniken = تقنيات استرخاء"],
    simplified: "93 بالمئة من تأثير الخطاب يعتمد على لغة الجسد والصوت وليس الكلمات",
    imagine: "فتاة واقفة على منصة ويديها ترتجفان وورقتها تهتز",
    correct: 2
};

HELP_DATA["lesen3_exam8_q3"] = {
    text: "Wer zu seinem Vorstellungsgespräch eingeladen wird - Eine Freundin sucht einen Ausbildungsplatz. وهي مدعوة لمقابلة عمل ولا تعرف ماذا ترتدي.",
    meaning: "من تتم دعوته لمقابلة عمل - صديقة تبحث عن مكان تدريب ودُعيت لمقابلة عمل ولا تعرف ماذا ترتدي",
    keywords: ["Vorstellungsgespräch = مقابلة عمل", "Kleidung = ملابس", "repräsentieren = تمثيل", "zerrissene Jeans = جينز ممزق"],
    simplified: "الملابس النظيفة واللائقة أساسية في مقابلة العمل",
    imagine: "شابة تقف أمام باب زجاجي وتعكس صورتها مرآة وترتب قميصها",
    correct: 3
};

HELP_DATA["lesen3_exam8_q4"] = {
    text: "Ein Auszubildender bei einer Bank - Eine Bekannte möchte eine Ausbildung machen und vielleicht später einmal studieren.",
    meaning: "متدرِب في بنك - إحدى المعارف تريد القيام بتدريب وربما الدراسة لاحقا",
    keywords: ["Auszubildender = متدرب", "Bank = بنك", "Vergütung = تعويض", "Fortbildung = تدريب إضافي"],
    simplified: "رواتب المتدربين في البنوك من 690 إلى 800 يورو شهريا",
    imagine: "امرأة تحسب نقودا على آلة حاسبة وكتاب بجانبها",
    correct: 4
};

HELP_DATA["lesen3_exam8_q5"] = {
    text: "Für junge Leute kann das Internet zu einer Droge werden - Ein Freund surft täglich viele Stunden im Internet وترغب في إعطائه نصيحة.",
    meaning: "الإنترنت يمكن أن يصبح مخدرا للشباب - صديق يتصفح الإنترنت ساعات طويلة يوميا وتريد نصحه",
    keywords: ["Internetsucht = إدمان إنترنت", "Surfzeiten = أوقات تصفح", "Tagebuch = يوميات", "Regeln = قواعد"],
    simplified: "تسجيل ساعات التصفح والبحث عن بدائل واقعية يقلل الإدمان",
    imagine: "شاب يغلق حاسوبه ويخرج للنزهة مع كلبه وهو يبتسم",
    correct: 5
};

HELP_DATA["lesen3_exam8_q6"] = {
    text: "Nichts ist auf privaten Feierlichkeiten schlimmer - Ein älteres Ehepaar hat Goldene Hochzeit. الابنة تريد إلقاء خطاب وتحتاج دليلا.",
    meaning: "لا شيء أسوأ في الاحتفالات الخاصة من الخطب الطويلة - زوجان مسنان لديهما زفاف ذهبي والابنة تريد إلقاء خطاب وتحتاج دليلا",
    keywords: ["Goldene Hochzeit = زفاف ذهبي", "Rede = خطاب", "Volkshochschulen = مدارس شعبية", "Seminare = ندوات"],
    simplified: "ندوات نهاية أسبوع لتعليم الخطب القصيرة والممتعة للمناسبات",
    imagine: "ابنة وحيدة تقف أمام والديها وكلاهما يمسكان مناديل بيضاء",
    correct: 8
};

HELP_DATA["lesen3_exam8_q7"] = {
    text: "Ein Freund möchte wissen, welche schulischen Leistungen bei der Vergabe von Ausbildungsplätzen im Bankgewerbe besonders wichtig sind.",
    meaning: "صديق يريد أن يعرف ما هي المعدلات المدرسية المهمة عند الحصول على أماكن تدريب في قطاع البنوك",
    keywords: ["Sparkassen-Akademie = أكاديمية بنوك ادخار", "Noten = درجات", "Deutsch = ألمانية", "Mathematik = رياضيات", "Rollenspiele = لعب أدوار"],
    simplified: "البنك يطلب درجات جيدة في الألمانية والرياضيات واختبار مهارات التواصل",
    imagine: "شاب يمثل دور عميل غاضب أمام مدرب وكلاهما يحاولان إثبات وجهة نظرهما",
    correct: 6
};

HELP_DATA["lesen3_exam8_q8"] = {
    text: "Viele junge Leute flüchten sich in die virtuelle Scheinwelt - Eine Bekannte تطلب منك النصيحة لأن ابنها يهمل المدرسة بسبب الإنترنت.",
    meaning: "كثير من الشباب يهربون إلى العالم الافتراضي - إحدى المعارف تطلب منك النصيحة لأن ابنها يهمل المدرسة بسبب الإنترنت",
    keywords: ["Chatrooms = غرف محادثة", "vernachlässigen = يهمل", "Hausaufgaben = واجبات", "Alternativen = بدائل"],
    simplified: "التحدث مع الطفل بلطف وتقديم بدائل هو الحل الأمثل",
    imagine: "أم تحاول سحب ابنها من الكرسي أمام الكمبيوتر لكنه متمسك به",
    correct: 9
};

// ========== Exam 9: Unterstützung in Mathematik ==========
HELP_DATA["lesen3_exam9_q1"] = {
    text: "Neues Ziel, neues Glück! - Sie möchten in einer anderen Stadt eine Ausbildung machen und suchen dort eine Wohnung.",
    meaning: "هدف جديد حظ جديد - تريد القيام بتدريب في مدينة أخرى وتبحث عن شقة هناك",
    keywords: ["Umziehen = انتقال", "Wohnungen = شقق", "WG-Zimmer = غرفة مشاركة", "Miete = إيجار"],
    simplified: "بوابة إنترنت للعثور على شقق وغرف مشاركة في مدن ألمانية",
    imagine: "شاب يحمل حقيبة واقف أمام مبنى سكني كبير ينظر إلى هاتفه",
    correct: 3
};

HELP_DATA["lesen3_exam9_q2"] = {
    text: "Andere Länder, andere Sprachen - Sie möchten einen Sprachkurs in einem anderen Land machen.",
    meaning: "بلدان أخرى لغات أخرى - تريد القيام بدورة لغة في بلد آخر",
    keywords: ["Sprachen = لغات", "Einzelunterricht = دروس فردية", "Gruppe = مجموعة", "Arabisch = عربية", "Zulu = زولو"],
    simplified: "دورات لغة في الخارج من العربية إلى الزولو",
    imagine: "خريطة العالم ومجموعة من الأعلام المختلفة تغطيها",
    correct: 2
};

HELP_DATA["lesen3_exam9_q3"] = {
    text: "Was bedeutet 'Tandemlernen'? - Sie wollen gerne noch eine Sprache lernen und suchen einen festen Lernpartner.",
    meaning: "ماذا يعني التعلم الثنائي؟ - تريد تعلم لغة أخرى وتبحث عن شريك تعلم ثابت",
    keywords: ["Tandemlernen = تعلم ثنائي", "Muttersprachen = لغات أم", "Fremdsprache = لغة أجنبية", "Kultur = ثقافة"],
    simplified: "تبادل لغوي مجاني بين شخصين من لغات أم مختلفة",
    imagine: "شخصان يجلسان على طاولة وكلاهما يشيران إلى قاموسين مختلفين",
    correct: 7
};

HELP_DATA["lesen3_exam9_q4"] = {
    text: "Umzug mal anders - Sie wollen umziehen, haben aber eigentlich gar keine Zeit, sich darum zu kümmern.",
    meaning: "انتقال بطريقة مختلفة - تريد الانتقال ولكن لا وقت لديك للاهتمام بالأمر",
    keywords: ["Umzug = انتقال", "Service = خدمة", "Organisation = تنظيم", "fairer Preis = سعر عادل"],
    simplified: "شركة تقدم خدمات الانتقال الكامل من الألف إلى الياء",
    imagine: "رجل يضع قدميه على الطاولة ويشرب قهوة وعمال يحملون صناديق خلفه",
    correct: 8
};

HELP_DATA["lesen3_exam9_q5"] = {
    text: "Hilfe gesucht? Studierende und Auszubildende - Sie ziehen wegen einer Ausbildung um und suchen so günstig wie möglich Umzugshelfer.",
    meaning: "مطلوب مساعدة؟ طلاب ومتدربون - تنتقل من أجل التدريب وتبحث عن مساعدي نقل بأقل تكلفة ممكنة",
    keywords: ["Umzugshelfer = مساعدو نقل", "kostenlos = مجاني", "Netzwerk = شبكة", "gegenseitig = متبادل"],
    simplified: "شبكة مجانية لمساعدة الطلاب والمتدربين في انتقالاتهم",
    imagine: "ثلاثة شباب يحملون أريكة ويصعدون السلالم وهم يضحكون",
    correct: 4
};

HELP_DATA["lesen3_exam9_q6"] = {
    text: "Neu in der Stadt? - Sie sind gerade umgezogen und möchten neue Leute kennenlernen.",
    meaning: "جديد في المدينة؟ - انتقلت مؤخرا وتريد التعرف على أشخاص جدد",
    keywords: ["Umgezogen = منتقل", "Kontakte = معارف", "Stammtisch = لقاء دوري", "Freizeit = وقت فراغ"],
    simplified: "لقاءات دورية لمن يريدون تكوين صداقات جديدة في المدينة",
    imagine: "عدة أشخاص يجلسون حول طاولة مستديرة في مقهى ويتحدثون ويضحكون",
    correct: 5
};

HELP_DATA["lesen3_exam9_q7"] = {
    text: "Alle Informationen auf einer Seite - Sie möchten Physik studieren und möchten sich zunächst informieren.",
    meaning: "جميع المعلومات على صفحة واحدة - تريد دراسة الفيزياء وتريد الاستعلام أولا",
    keywords: ["Studium = دراسة", "Hochschulen = جامعات", "Studiengänge = تخصصات دراسية", "BAföG-Rechner = حاسبة مساعدات طلابية"],
    simplified: "بوابة إنترنت شاملة لكل ما يتعلق بالدراسة الجامعية في ألمانيا",
    imagine: "طالب يجلس أمام حاسبه وشاشة مليئة ببيوت الجامعات",
    correct: 1
};

HELP_DATA["lesen3_exam9_q8"] = {
    text: "Aller Anfang ist schwer - Sie brauchen Unterstützung in Mathematik und möchten في مجموعة صغيرة التعلم.",
    meaning: "كل البدايات صعبة - تحتاج دعم في الرياضيات وتريد التعلم في مجموعة صغيرة",
    keywords: ["Problemfächer = مواد صعبة", "Mathematik = رياضيات", "Lerngruppen = مجموعات تعلم", "pädagogische Ausbildung = تدريب تربوي"],
    simplified: "دورات دعم في الرياضيات في مجموعات من ثلاثة إلى خمسة أشخاص",
    imagine: "ثلاثة طلاب جالسين حول طاولة بيضاء وأستاذ يشرح معادلة على السبورة",
    correct: 0
};

// ========== Exam 10: Ganztagesausflug ==========
HELP_DATA["lesen3_exam10_q1"] = {
    text: "Entspannung am Wasser - Sie möchten einen Ganztagesausflug machen und sich dabei bewegen.",
    meaning: "استرخاء على الماء - تريد القيام برحلة ليوم كامل وتحريك جسمك فيها",
    keywords: ["Bootsverleih = تأجير قوارب", "Ruderboot = قارب تجديف", "Tretboot = قارب بدواسات", "Motorboot = قارب بمحرك", "Sport = رياضة"],
    simplified: "استئجار قوارب في بحيرة بالدويناي مع خيارات تجديف أو محرك",
    imagine: "رجل يجدف بقوة في بحيرة زرقاء ونفسه عالية",
    correct: 0
};

HELP_DATA["lesen3_exam10_q2"] = {
    text: "Kurzreise nach München - Sie interessieren sich für Technikgeschichte.",
    meaning: "رحلة قصيرة إلى ميونيخ - أنت مهتم بتاريخ التكنولوجيا",
    keywords: ["Deutsches Museum = متحف ألماني", "Technik = تقنية", "Führung = جولة إرشادية", "Geschichte = تاريخ"],
    simplified: "رحلة ليوم واحد إلى متحف ميونيخ التقني مع جولة خاصة",
    imagine: "رجل يضع يده على محرك بخاري قديم وعيناه شغوفتان",
    correct: 3
};

HELP_DATA["lesen3_exam10_q3"] = {
    text: "Schiffe versenken, Marmorkuchen und selbstgebastelte Papierhüte - Ihr Sohn möchte einen Kindergeburtstag feiern und braucht Hilfe bei der Organisation.",
    meaning: "إغراق السفن وكعكة الرخام وقبعات ورقية مصنوعة يدويا - ابنك يريد الاحتفال بعيد ميلاده ويحتاج مساعدة في التنظيم",
    keywords: ["Kindergeburtstag = عيد ميلاد طفل", "Dekoration = زينة", "Spiele = ألعاب", "Speisen = أطعمة"],
    simplified: "خدمة كاملة لتنظيم حفلات أعياد ميلاد الأطفال من أكل ولعب وديكور",
    imagine: "طفل ينفخ بالونات وأمه ترتب طاولة مزينة بملصقات ملونة",
    correct: 2
};

HELP_DATA["lesen3_exam10_q4"] = {
    text: "Deutschland aus einer anderen Perspektive - Ein Freund möchte gerne eine Schiffsreise machen.",
    meaning: "ألمانيا من منظور آخر - صديق يود القيام برحلة بحرية",
    keywords: ["Flusskreuzfahrten = رحلات نهرية", "Rhein = راين", "Mosel = موزيل", "Donau = دانوب", "Natur = طبيعة"],
    simplified: "رحلات بحرية على الأنهار الألمانية مع برامج سياحية على اليابسة",
    imagine: "سفينة بيضاء كبيرة تبحر بين تلال خضراء وجبال",
    correct: 4
};

HELP_DATA["lesen3_exam10_q5"] = {
    text: "Unser Stadtteil ist lebendig - Sie möchten helfen, Ihren Stadtteil zu gestalten.",
    meaning: "منطقتنا السكنية حية - تريد المساعدة في تصميم منطقتك السكنية",
    keywords: ["Stadtteil = منطقة سكنية", "Fest = مهرجان", "Helfer = مساعدين", "Planung = تخطيط"],
    simplified: "متطوعون مطلوبون لتنظيم مهرجان وتحسين المرافق في المنطقة",
    imagine: "عدة أشخاص يرتدون قمصانا خضراء ويزرعون زهورا في ساحة عامة",
    correct: 5
};

HELP_DATA["lesen3_exam10_q6"] = {
    text: "Neues Angebot der VHS - Sie sind neu in der Stadt und möchten Ihren Stadtteil kennenlernen.",
    meaning: "عرض جديد لمدرسة الشعب - أنت جديد في المدينة وتريد التعرف على منطقتك السكنية",
    keywords: ["VHS = مدرسة شعب", "Führungen = جولات إرشادية", "Stadtteil = منطقة سكنية", "kostenfrei = مجاني"],
    simplified: "جولات مشي مجانية لتعريف القادمين الجدد بمرافق الحي",
    imagine: "رجل يحمل خريطة ومجموعة من الجيران خلفه يشيرون إلى مباني",
    correct: 7
};

HELP_DATA["lesen3_exam10_q7"] = {
    text: "Nur auf Reisen lernt der Mensch - Ein Freund möchte mehr über die Geschichte deutscher Städte erfahren.",
    meaning: "فقط في السفر يتعلم الإنسان - صديق يريد معرفة المزيد عن تاريخ المدن الألمانية",
    keywords: ["Bildungsakademie = أكاديمية تعليمية", "Ausflüge = رحلات", "Geschichte = تاريخ", "Berlin = برلين", "Köln = كولونيا", "München = ميونيخ"],
    simplified: "رحلات تعليمية لعدة أيام لاستكشاف تاريخ المدن الألمانية الكبرى",
    imagine: "رجل يقف أمام بوابة براندنبورغ وكاتب يشرح له التاريخ",
    correct: 8
};

HELP_DATA["lesen3_exam10_q8"] = {
    text: "Technik - spannend und verständlich - Sie möchten etwas mit Ihrer 6-jährigen Nichte unternehmen, die gerne ins Museum geht.",
    meaning: "التقنية - مثيرة ومفهومة - تريد القيام بنشاط مع ابنة أختك البالغة 6 سنوات والتي تحب الذهاب إلى المتاحف",
    keywords: ["Technik-Museum = متحف تقني", "Kinder = أطفال", "spielerisch = بطريقة مرحة", "Führungen = جولات إرشادية"],
    simplified: "متحف تقني للأطفال من 6 إلى 12 سنوات مع جولات مناسبة لأعمارهم",
    imagine: "فتاة صغيرة تدير عجلة آلة قديمة وعيناها واسعتان بدهشة",
    correct: 9
};

// ========== Exam 11: Ihren Eltern zur Silberhochzeit ==========
HELP_DATA["lesen3_exam11_q1"] = {
    text: "Norwegen: Kirkenes-Bergen - Sie möchten Ihren Eltern zur Silberhochzeit eine besondere Schiffsreise auf dem Meer schenken.",
    meaning: "النرويج: كيركينيس-برغن - تريد إهداء والديك رحلة بحرية مميزة في البحر بمناسبة عيد زفافهما الفضي",
    keywords: ["Seereise = رحلة بحرية", "Norwegen = النرويج", "Postschiff = سفينة بريد", "Frühbucher-Bonus = خصم الحجز المبكر"],
    simplified: "رحلة بحرية لمدة 6 أيام على سفينة بريد في المضايق النرويجية",
    imagine: "زوجان مسنان يقفان على سطح سفينة والجبال الثلجية خلف صورتهما",
    correct: 0
};

HELP_DATA["lesen3_exam11_q2"] = {
    text: "Winterurlaub am Meer - Ihre Freundin möchte mit ihrem Mann Silvester und Neujahr im Urlaub feiern, aber nicht schon wieder im Gebirge.",
    meaning: "عطلة شتوية على البحر - صديقتك تريد الاحتفال برأس السنة مع زوجها في إجازة ولكن ليس في الجبال مجددا",
    keywords: ["Winterurlaub = عطلة شتوية", "Nordsee = بحر الشمال", "Ostsee = بحر البلطيق", "Boßeln = لعبة", "Robbensafari = سفاري الفقمة", "Pferdekutsche = عربة خيول"],
    simplified: "أنشطة شتوية على شواطئ بحر الشمال والبلطيق بدل الجبال",
    imagine: "امرأة ورجل يجلسان بجانب مدفأة ويشربان كأس نبيذ أحمر والثلج خارج النافذة",
    correct: 1
};

HELP_DATA["lesen3_exam11_q3"] = {
    text: "Meditation im Schnee - Ein Bekannter möchte im Winter ein besinnliches Wochenende في الجبال قضاء، denn er mag es, durch die verschneite Natur zu laufen.",
    meaning: "تأمل في الثلج - أحد المعارف يريد قضاء عطلة نهاية أسبوع تأملية في الجبال في الشتاء لأنه يحب المشي في الطبيعة المغطاة بالثلوج",
    keywords: ["Schneeschuhwanderung = مشي بأحذية ثلجية", "Ostschweizer = شرق سويسرا", "meditativ = تأملي", "Schlitten = زلاجة"],
    simplified: "عطلة نهاية أسبوع في الجبال السويسرية مع مشي بأحذية الثلج والتأمل",
    imagine: "رجل يمشي ببطء في غابة ثلجية صامتة والثلوج تتساقط على كتفيه",
    correct: 2
};

HELP_DATA["lesen3_exam11_q4"] = {
    text: "Fluss- und Radreise durch Belgien - Sie wollen wie jedes Jahr في النصف الثاني من العام eine organisierte Urlaubsreise von etwa أسبوع في أوروبا machen und sich dabei viel mit dem Fahrrad fortbewegen.",
    meaning: "رحلة نهرية بالدراجة عبر بلجيكا - تريد في النصف الثاني من كل عام رحلة أوروبية منظمة لمدة أسبوع مع حركة كثيرة بالدراجة",
    keywords: ["Flussreise = رحلة نهرية", "Radreise = رحلة دراجات", "Belgien = بلجيكا", "Brügge = بروج", "Brüssel = بروكسل"],
    simplified: "8 أيام رحلة نهرية بالدراجة في بلجيكا مع قارب ودراجة ومرشد",
    imagine: "أشخاص يركبون دراجات بجانب قناة مائية وقرى قديمة في الخلفية",
    correct: 4
};

HELP_DATA["lesen3_exam11_q5"] = {
    text: "Abend im Palladio - Sie möchten einen netten Abend mit Freunden bei gutem Essen und außergewöhnlichem Unterhaltungsprogramm verleben.",
    meaning: "مساء في بالاديو - تريد قضاء أمسية لطيفة مع الأصدقاء مع طعام جيد وبرنامج ترفيهي استثنائي",
    keywords: ["Gourmet-Theater = مسرح ذواقة", "Artistik = ألعاب بهلوانية", "Comedy = كوميديا", "Akrobaten = بهلوانيون", "Magier = سحرة", "Vier-Gang-Menü = قائمة من أربعة أطباق"],
    simplified: "أمسية تجمع بين السحرة والمهرجين والبهلوانيين مع عشاء فاخر",
    imagine: "أربعة أصدقاء يجلسون على طاولة مضاءة بالشموع وساحر يطفو فوق طاولتهم",
    correct: 5
};

HELP_DATA["lesen3_exam11_q6"] = {
    text: "Kloster Eberbach - Sie suchen für eine prunkvolle Hochzeitsfeier geeignete festliche Räumlichkeiten في stimmungsvoller klösterlicher Umgebung für zirka 50 Personen.",
    meaning: "دير إيبرباخ - تبحث عن قاعات احتفالية مناسبة لحفل زفاف فاخر في محيط دير خلاب لنحو 50 شخصا",
    keywords: ["Kloster Eberbach = دير إيبرباخ", "Hochzeiten = أعراس", "Veranstaltung = فعالية", "Bankett = مأدبة", "Räume = قاعات"],
    simplified: "قاعات دير من القرون الوسطى تأجير لحفلات الزفاف والاحتفالات حتى 1000 شخص",
    imagine: "عروس ترتدي فستانا أبيض طويلا وتمشي في ممر دير حجري قديم",
    correct: 6
};

HELP_DATA["lesen3_exam11_q7"] = {
    text: "Viel Lob von der Lokalpresse für einen neuen Stadt-Führer über Frankfurt - Sie sind neu in Frankfurt a. M. und suchen deshalb nach nützlichen Informationen und praktischen Tipps, um sich schnell في der neuen Umgebung einzuleben.",
    meaning: "مديح كبير من الصحافة المحلية لدليل مدينة جديد عن فرانكفورت - أنت جديد في فرانكفورت وتبحث عن معلومات مفيدة ونصائح عملية لتندمج بسرعة في البيئة الجديدة",
    keywords: ["Frankfurt = فرانكفورت", "Reise-Führer = دليل سفر", "Kultur = ثقافة", "Adressen = عناوين", "Öffnungszeiten = أوقات افتتاح"],
    simplified: "دليل ثقافي لفرانكفورت يحتوي آلاف العناوين والنصائح للقادمين الجدد",
    imagine: "شاب يحمل خريطة واقف أمام برجين شاهقين وينظر إليهما بدهشة",
    correct: 7
};

// ========== Exam 12: Rechtsanwalt ==========
HELP_DATA["lesen3_exam12_q1"] = {
    text: "Ihr kompetenter Partner für Rechtsberatung - Einem Bekannten wurde die Arbeitsstelle gekündigt. Er möchte bei einem Anwalt um Rat fragen.",
    meaning: "شريكك المختص في الاستشارات القانونية - أحد المعارف تم فصله من العمل ويريد استشارة محام",
    keywords: ["Rechtsberatung = استشارة قانونية", "Arbeit = عمل", "Kündigung = فصل", "Arbeitsvertrag = عقد عمل"],
    simplified: "محام متخصص في قضايا العمل من عقود إلى فصل تعسفي",
    imagine: "رجل جالس أمام محام وكلاهما يحدقان في أوراق بيضاء مبعثرة",
    correct: 0
};

HELP_DATA["lesen3_exam12_q2"] = {
    text: "Unser neues Wohnkonzept - Ihr Bekannter ist beruflich oft unterwegs und sucht eine Alternative zu Hotels. Dort soll es aber Internetzugang und Frühstück geben.",
    meaning: "مفهوم السكن الجديد - أحد المعارف غالبا ما يسافر للعمل ويبحث عن بديل للفنادق مع إنترنت وإفطار",
    keywords: ["Wohnkonzept = مفهوم سكني", "Geschäftsreise = رحلة عمل", "Internet = إنترنت", "Frühstück = إفطار", "persönlicher Service = خدمة شخصية"],
    simplified: "شقق مفروشة بالكامل مع إنترنت وإفطار لرجال الأعمال في 25 مدينة",
    imagine: "رجل يرتدي بدلة يجلس على مكتب خشبي فاخر ويتحدث بالفيديو مع عائلته",
    correct: 1
};

HELP_DATA["lesen3_exam12_q3"] = {
    text: "Urlaub auf dem Sofa - Sie möchten durch Europa reisen und privat übernachten.",
    meaning: "عطلة على الأريكة - تريد السفر عبر أوروبا والمبيت في منازل خاصة",
    keywords: ["Schlafplatz = مكان نوم", "Sofa = أريكة", "Frühstück = إفطار", "Europa = أوروبا", "Menschen = أناس"],
    simplified: "موقع للحجز في منازل أوروبية بأسعار زهيدة تشمل المبيت والإفطار",
    imagine: "مسافر يحمل حقيبة ويقف أمام باب منزل عادي ويبتسم",
    correct: 3
};

HELP_DATA["lesen3_exam12_q4"] = {
    text: "Kunstmarkt - Eine Bekannte malt sehr gut und sucht eine Gelegenheit, anderen ihre Bilder zu zeigen oder sie zu verkaufen.",
    meaning: "سوق فني - إحدى المعارف ترسم جيدا وتبحث عن فرصة لعرض لوحاتها أو بيعها للآخرين",
    keywords: ["Kunstmarkt = سوق فني", "junge Künstler = فنانين شباب", "Ausstellung = معرض", "Werke = أعمال فنية"],
    simplified: "معرض شهري للفنانين الشباب لعرض وبيع أعمالهم في صالات خاصة",
    imagine: "امرأة تعلق لوحة زيتية على جدار أبيض وثلاثة أشخاص يتأملونها",
    correct: 4
};

HELP_DATA["lesen3_exam12_q5"] = {
    text: "Zuhause bleiben und trotzdem was erleben - Sie möchten im Urlaub zwar nicht verreisen, aber trotzdem etwas unternehmen.",
    meaning: "ابق في المنزل ومع ذلك جرب شيئا - لا تريد السفر في الإجازة ولكن مع ذلك تريد القيام بنشاط",
    keywords: ["Urlaub zu Hause = إجازة في المنزل", "Veranstaltungstipps = نصائح فعاليات", "Konzerte = حفلات", "Theater = مسرح", "Kochkurse = دورات طبخ"],
    simplified: "موقع يقدم أفكارا وتذاكر لفعاليات محلية لقضاء إجازة ممتعة دون سفر",
    imagine: "شخص يجلس على أريكته ويضغط بهاتفه فتظهر أمامه قائمة حفلات موسيقية في مدينته",
    correct: 5
};

HELP_DATA["lesen3_exam12_q6"] = {
    text: "Ihr gutes Recht - Sie haben Streit mit Ihrem Vermieter wegen der Nebenkosten und möchten sich beraten lassen.",
    meaning: "حقك القانوني - لديك خلاف مع مالك العقار بسبب تكاليف الخدمات وتريد استشارة قانونية",
    keywords: ["Mietrecht = قانون إيجار", "Mieterhöhung = زيادة إيجار", "Kündigung = إخلاء", "Mieterschutzbund = اتحاد حماية المستأجرين"],
    simplified: "استشارات قانونية مجانية في قضايا الإيجار مع خيار العضوية ب 75 يورو سنويا",
    imagine: "رجل غاضب يمسك ورقة أمامه ويديه ترتجفان من الغضب",
    correct: 6
};

HELP_DATA["lesen3_exam12_q7"] = {
    text: "Kunst und Kultur für Einsteiger - Sie möchten ausprobieren, ob Ihnen Zeichnen Spaß macht.",
    meaning: "فن وثقافة للمبتدئين - تريد تجربة ما إذا كان الرسم يعجبك",
    keywords: ["Schnupperkurse = دورات تجريبية", "Malerei = رسم", "Musik = موسيقى", "Literatur = أدب", "Geschichte = تاريخ"],
    simplified: "دروس تجريبية مدتها 60 دقيقة في الرسم والموسيقى والأدب لمعرفة ما يناسبك",
    imagine: "شخص يمسك قلما ويرسم خطوطا عشوائية على ورقة بيضاء ويبتسم",
    correct: 7
};

HELP_DATA["lesen3_exam12_q8"] = {
    text: "Alte Möbel aufarbeiten - Ihre Möbel sehen nicht mehr so gut aus. Daran möchten Sie etwas ändern.",
    meaning: "ترميم الأثاث القديم - أثاثك لم يعد يبدو جيدا وتريد تغيير ذلك",
    keywords: ["Restauration = ترميم", "Möbel = أثاث", "Farbe = لون", "Werkstatt = ورشة", "Bezüge = أغطية"],
    simplified: "ورشة متخصصة في ترميم الأثاث القديم وتغيير ألوانه وأقمشته",
    imagine: "كرسي قديم متسخ يتحول فجأة إلى كرسي جديد أنيق ذهبي اللون",
    correct: 8
};

HELP_DATA["lesen3_exam12_q9"] = {
    text: "Günstig wohnen in über 70 Städten - Sie möchten mit Freunden durch Deutschland reisen und dabei günstig übernachten.",
    meaning: "سكن رخيص في أكثر من 70 مدينة - تريد السفر مع أصدقائك عبر ألمانيا والمبيت بتكلفة منخفضة",
    keywords: ["Pensionen = نُزل", "Mehrbettzimmer = غرف متعددة الأسرة", "zentral gelegen = موقع مركزي", "günstig = رخيص"],
    simplified: "نُزل رخيصة في 70 مدينة ألمانية بغرف متعددة الأسرة مناسبة للشباب",
    imagine: "ثلاثة شباب يحملون حقائب ظهر ويقفون أمام مبنى بسيط مكتوب عليه نُزل",
    correct: 9
};


// ============================================
// Lesen Teil 3 - Exams 13-24 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 13: Au-pair Mädchen (صحيح: 8,9,1,5,7,4,3,6) ==========

HELP_DATA["lesen3_exam13_q1"] = {
    text: "Infos zur Auslandsüberweisung - Sie wollen Geld nach Kanada überweisen. Sie möchten wissen, wie viel Sie für die Überweisung bezahlen müssen.",
    meaning: "معلومات حول التحويلات الدولية إلى خارج منطقة SEPA مع رسوم إضافية",
    keywords: ["Auslandsüberweisung = تحويل دولي", "SEPA = منطقة المدفوعات الأوروبية", "Spesen = رسوم", "Kanada = كندا"],
    simplified: "تحويل أموال إلى كندا يختلف عن التحويل داخل أوروبا",
    imagine: "شاب ينظر إلى هاتفه وورقة بنك أمامه",
    correct: 8
};

HELP_DATA["lesen3_exam13_q2"] = {
    text: "Französische Muttersprachler bieten Übersetzungen - Ein Freund aus Salzburg will sich في Frankreich bewerben. Er möchte seine Zeugnisse übersetzen lassen.",
    meaning: "مترجمون فرنسيون يقدمون ترجمة وثائق التقديم من الألمانية إلى الفرنسية",
    keywords: ["Übersetzungen = ترجمات", "Schulzeugnisse = شهادات مدرسية", "Bewerbungen = طلبات وظيفة", "Frankreich = فرنسا"],
    simplified: "ترجمة شهادات مدرسية وسير ذاتية من الألمانية للفرنسية",
    imagine: "رجل يحمل وثائق ويمسك هاتفه على أذنه وجواز سفر بجانبه",
    correct: 9
};

HELP_DATA["lesen3_exam13_q3"] = {
    text: "Als Austauschschüler/in verbringst du einige Monate - Ihre 14-jährige Nichte möchte sich über einen Auslandsaufenthalt informieren.",
    meaning: "برنامج تبادل طلابي للعيش مع عائلة مضيفة ودراسة في مدرسة محلية بالخارج",
    keywords: ["Austauschschüler = طالب تبادل", "Gastfamilie = عائلة مضيفة", "Ausland = خارج البلاد", "Informationsveranstaltungen = لقاءات معلوماتية"],
    simplified: "فرصة قضاء عدة أشهر أو سنة في الخارج مع عائلة مضيفة",
    imagine: "فتاة تحمل حقيبة ظهر واقفة أمام طائرة",
    correct: 1
};

HELP_DATA["lesen3_exam13_q4"] = {
    text: "Als gebürtige Engländerin biete ich Übersetzungen an - Sie sollen die neue Webseite Ihrer Firma ins Englische übersetzen lassen.",
    meaning: "مترجمة إنجليزية تقدم ترجمة نصوص تجارية ومواقع إلكترونية بخبرة 20 عاما",
    keywords: ["Übersetzungen = ترجمات", "Englisch = إنجليزية", "Websites = مواقع", "Firmenflyer = منشورات شركة"],
    simplified: "ترجمة مواقع ومنتجات شركة من الألمانية إلى الإنجليزية",
    imagine: "امرأة تجلس على حاسوبها وكومة من الملفات بجانبها",
    correct: 5
};

HELP_DATA["lesen3_exam13_q5"] = {
    text: "Mit einem Konto bei der RUFA profitieren Sie - Im Herbst beginnt Ihre Tochter ein Studium. Sie möchte ein Bankkonto eröffnen.",
    meaning: "حساب بنكي مجاني للطلاب مع تأمين ضد الحوادث وخصومات في المتاجر",
    keywords: ["Studentenkonto = حساب طلابي", "gratis = مجاني", "Unfallversicherung = تأمين حوادث", "Ermäßigungen = تخفيضات"],
    simplified: "حساب بنكي مجاني للطلاب حتى سن 24 عاما",
    imagine: "فتاة تمسك بطاقة بنكية وقبعة التخرج بجانبها",
    correct: 7
};

HELP_DATA["lesen3_exam13_q6"] = {
    text: "Wir laden Sie dazu ein, internationale Schüler aufzunehmen - Ihre kinderlose Nachbarsfamilie möchte für einige Zeit einen jungen Menschen aufnehmen.",
    meaning: "استضافة طلاب دوليين في المنزل لتبادل الثقافات والتعرف على عادات جديدة",
    keywords: ["aufnehmen = استضافة", "internationale Schüler = طلاب دوليين", "Gastfamilie = عائلة مضيفة", "Kultur = ثقافة"],
    simplified: "فرصة لاستضافة طالب أجنبي في المنزل بدون أطفال",
    imagine: "زوجان واقفان بجانب باب منزلهما وشاب يحمل حقيبة",
    correct: 4
};

HELP_DATA["lesen3_exam13_q7"] = {
    text: "Französisch ist Ihre Muttersprache? Wir suchen eine freie Mitarbeiterin - Eine französische Bekannte ist Übersetzerin und möchte gelegentlich arbeiten.",
    meaning: "مطلوب مترجم حر من الألمانية إلى الفرنسية للعمل من المنزل",
    keywords: ["freie Mitarbeiterin = موظفة حرة", "Übersetzungen = ترجمات", "Französisch = فرنسية", "Telefonate = مكالمات هاتفية"],
    simplified: "وظيفة ترجمة نصوص قصيرة ومكالمات هاتفية من المنزل",
    imagine: "امرأة تتحدث على الهاتف أمام حاسوبها المحمول",
    correct: 3
};

HELP_DATA["lesen3_exam13_q8"] = {
    text: "Ein Tag im Zeichen der guten Nachbarschaft - Sie kochen gerne und suchen nach Rezepten aus anderen Ländern.",
    meaning: "مهرجان للطهي العالمي مع وصفات من مختلف الثقافات متاحة عبر الإنترنت",
    keywords: ["Nachbarschaftstag = يوم الجوار", "Kochen = طهي", "Spezialitäten = أطباق خاصة", "Online-Kochbuch = كتاب طبخ إلكتروني"],
    simplified: "يوم للطهي المشترك يجمع وصفات من كل العالم",
    imagine: "ثلاثة أشخاص يطبخون حول قدر كبير وكتاب مفتوح أمامهم",
    correct: 6
};

// ========== Exam 14: Hautprobleme (صحيح: 2,6,3,9,8,5,0,4,1) ==========

HELP_DATA["lesen3_exam14_q1"] = {
    text: "Ratgeber 'Was bei Erkältung hilft' - Ihre Bekannte hat Fieber, möchte aber keine Tabletten nehmen.",
    meaning: "نصائح طبيعية لعلاج نزلات البرد مثل شرب الشاي وكمادات الماء",
    keywords: ["Erkältung = نزلة برد", "Fieber = حرارة", "Wadenwickel = كمادات", "Salbeitee = شاي الميرمية"],
    simplified: "علاج الحرارة والبرد بطرق منزلية بدون أدوية",
    imagine: "امرأة جالسة على سرير وتحمل كوبا من الشاي الساخن",
    correct: 2
};

HELP_DATA["lesen3_exam14_q2"] = {
    text: "Kochen und waschen um 1900 - Sie bekommen Besuch und möchten am Sonntagvormittag etwas Interessantes unternehmen.",
    meaning: "جولة إرشادية في متحف عن الحياة اليومية قبل 100 سنة بدون كهرباء",
    keywords: ["Museum = متحف", "Führung = جولة إرشادية", "Kochen = طبخ", "Waschen = غسل", "1900 = 1900"],
    simplified: "رحلة إلى الماضي لتعلم كيف كان أجدادنا يعيشون",
    imagine: "عائلة تقف أمام موقد قديم وأدوات نحاسية معلقة",
    correct: 6
};

HELP_DATA["lesen3_exam14_q3"] = {
    text: "Nachhilfe - Das Ehepaar, das unter Ihnen wohnt, möchte etwas über Computer lernen.",
    meaning: "دروس كمبيوتر مجانية يقدمها طلاب لتعليم الكبار أساسيات الحاسوب",
    keywords: ["Nachhilfe = دروس خصوصية", "Computer = كمبيوتر", "Schüler = طلاب", "Erwachsene = بالغين", "kostenlos = مجاني"],
    simplified: "طلاب يعلمون الكبار استخدام الكمبيوتر مجانا كل سبت",
    imagine: "زوجان جالسان أمام حاسوب وطالب صغير يشير إلى الشاشة",
    correct: 3
};

HELP_DATA["lesen3_exam14_q4"] = {
    text: "Zusatz-Versicherung - Sie wollen Informationen über eine Zahnversicherung, ohne telefonieren zu müssen.",
    meaning: "تأمين أسنان إضافي يضاعف دعم التأمين الصحي لتركيبات الأسنان",
    keywords: ["Zahnversicherung = تأمين أسنان", "Zuschuss = دعم مالي", "Krankenkasse = تأمين صحي", "Online = عبر الإنترنت"],
    simplified: "معلومات عن تأمين الأسنان متاحة عبر الإنترنت بدون اتصال هاتفي",
    imagine: "شخص يقرأ على حاسبه المحمول وابتسامة كبيرة على وجهه",
    correct: 4
};

HELP_DATA["lesen3_exam14_q5"] = {
    text: "Omnitamol 500 Tabletten - Ihre Nachbarin ist seit einer Woche erkältet. Naturheilmittel haben nicht geholfen.",
    meaning: "دواء لعلاج الألم والحمى مع تعليمات دقيقة للاستخدام للأطفال والبالغين",
    keywords: ["Tabletten = أقراص", "Schmerzen = ألم", "Fieber = حمى", "Erkältung = نزلة برد", "Kinder = أطفال"],
    simplified: "أدوية للحمى ونزلات البرد مع تنبيه لاستشارة الطبيب بعد 4 أيام",
    imagine: "امرأة تحمل علبة دواء ويسأل بيطري معطف أبيض إلى جوارها",
    correct: 5
};

HELP_DATA["lesen3_exam14_q6"] = {
    text: "Sofort-Versicherung - Sie haben ein Haustier, das im letzten Jahr viel Geld für den Tierarzt gekostet hat. Sie suchen eine Möglichkeit, Kosten zu sparen.",
    meaning: "تأمين صحي للحيوانات الأليفة يغطي تكاليف العلاج والعمليات الجراحية",
    keywords: ["Tierschutzversicherung = تأمين حيوانات", "Haustier = حيوان أليف", "Behandlung = علاج", "Operation = عملية جراحية"],
    simplified: "تأمين يغطي تكاليف علاج الحيوانات الأليفة حتى 1000 يورو",
    imagine: "كلب يجلس بجانب طبق من النقود ورجل يبتعد",
    correct: 8
};

HELP_DATA["lesen3_exam14_q7"] = {
    text: "Neue Kleidung kann krank machen - Ein Kollege hat seit ein paar Tagen Hautprobleme und weiß nicht, ما السبب.",
    meaning: "الملابس الجديدة قد تحتوي على مواد كيميائية تسبب حساسية الجلد",
    keywords: ["Kleidung = ملابس", "Allergien = حساسيات", "Hautreizungen = تهيج جلدي", "waschen = غسل"],
    simplified: "غسل الملابس الجديدة قبل ارتدائها يحمي من الحساسية",
    imagine: "رجل يحك يده وقميصه الجديد على الأرض بجانبه",
    correct: 0
};

HELP_DATA["lesen3_exam14_q8"] = {
    text: "Erkältungszeit = Theaterzeit - Sie möchten etwas mit Ihrer 7-jährigen Tochter unternehmen.",
    meaning: "مسرح عرائس لسن 6 فما فوق يعرض قصة طفل يعاني من الحساسية",
    keywords: ["Puppentheater = مسرح عرائس", "Kinder = أطفال", "Familie = عائلة", "Erkältung = نزلة برد"],
    simplified: "مسرحية عرائس عائلية عن الأنفلونزا لطفلة صغيرة",
    imagine: "بنت صغيرة ترفع يدها ودمية على المسرح خلفها",
    correct: 1
};

HELP_DATA["lesen3_exam14_q9"] = {
    text: "Vienna CONEKT - Sie möchten eine Versicherung für Ihren Neuwagen abschließen und sofort wissen, was es kostet.",
    meaning: "تأمين سيارة بحساب التكلفة مباشرة عبر الإنترنت وإمكانية الإلغاء شهريا",
    keywords: ["Auto versichern = تأمين سيارة", "Beitrag = قسط التأمين", "online berechnen = حساب عبر الإنترنت", "kündigen = إلغاء"],
    simplified: "حساب تكلفة تأمين السيارة فورا على الموقع الإلكتروني",
    imagine: "رجل واقف بجانب سيارته الجديدة وينظر إلى هاتفه المحمول",
    correct: 9
};

// ========== Exam 15: Eine Bekannte ist schwanger (صحيح: 8,3,1,4,6,7,9,2,0,5) ==========

HELP_DATA["lesen3_exam15_q1"] = {
    text: "Wenn eine schwangere Frau erkrankt - Eine Freundin bekommt ein Baby. Sie hat oft Schmerzen. Welche Möglichkeit gibt es, ihr zu helfen?",
    meaning: "الوخز بالإبر كعلاج بديل آمن للحوامل لتخفيف الألم دون أدوية",
    keywords: ["schwangere Frau = امرأة حامل", "Akupunktur = وبر إبر", "Schmerzmittel = مسكنات", "keine Gefahr = بدون خطر"],
    simplified: "علاج الألم للحوامل بالوخز بالإبر دون ضرر على الجنين",
    imagine: "امرأة حامل مستلقية وإبر صغيرة في جسمها وطبيب بجانبها",
    correct: 8
};

HELP_DATA["lesen3_exam15_q2"] = {
    text: "Die regelmäßige Ernährung mit Tomaten - Sie möchten durch pflanzliche Ernährung Ihren Körper vor schweren Krankheiten schützen.",
    meaning: "الطماطم المسلوقة مع زيت الزيتون تقلل خطر السرطان بنسبة 50 بالمئة",
    keywords: ["Tomaten = طماطم", "Krebserkrankungen = أمراض السرطان", "Lycopin = ليكوبين", "gesundheitsfördernd = معزز للصحة"],
    simplified: "أكل الطماطم المطبوخة يقي من السرطان أكثر من الطازجة",
    imagine: "طبق سباغيتي حمراء وطبق سلطة طماطم وآخر يختار الساخن",
    correct: 3
};

HELP_DATA["lesen3_exam15_q3"] = {
    text: "Dass zu langes In-der-Sonne-Liegen nicht gut ist - Ein Bekannter fliegt im Urlaub ans Meer. Sie möchten ihn über mögliche Risiken der Sonnenstrahlung informieren.",
    meaning: "حروق الشمس الخفيفة خطيرة وتزيد خطر سرطان الجلد، الفحص المبكر ضروري",
    keywords: ["Sonne = شمس", "Sonnenbrand = حروق شمس", "Hautkrebs = سرطان جلد", "Untersuchung = فحص"],
    simplified: "حتى الحروق البسيطة من الشمس قد تؤدي لسرطان الجلد",
    imagine: "رجل أحمر الجلد مستلق على كرسي شمس وواقي شمس بجانبه",
    correct: 1
};

HELP_DATA["lesen3_exam15_q4"] = {
    text: "In der Schwangerschaft haben Frauen erhöhten Bedarf - Eine Bekannte, die ein Kind erwartet, sucht Ernährungstipps.",
    meaning: "نصائح غذائية للحوامل: فواكه وخضروات وحبوب ومنتجات ألبان ولحوم قليلة الدهون",
    keywords: ["Schwangerschaft = حمل", "Vitamine = فيتامينات", "Mineralstoffe = معادن", "Eisen = حديد", "Calcium = كالسيوم"],
    simplified: "الحامل تحتاج لفواكه وخضروات وألبان ولحوم قليلة الدهون",
    imagine: "امرأة حامل تضع خضروات في سلة التسوق وتبتسم",
    correct: 4
};

HELP_DATA["lesen3_exam15_q5"] = {
    text: "Damenschuhe mit hohen Absätzen schaden der Gesundheit - Ihre Freundin denkt darüber nach, alle hochhackigen Schuhe wegzuwerfen, weil sie negative Auswirkungen befürchtet.",
    meaning: "دراسة تثبت أن الكعب العالي لا يسبب آلام الركبة والظهر كما كان يعتقد سابقا",
    keywords: ["hohe Absätze = كعب عالي", "Gesundheit = صحة", "Rücken = ظهر", "Knie = ركبة", "Vorurteil = تحيز"],
    simplified: "الكعب العالي ليس ضارا بالصحة كما يقال",
    imagine: "امرأة تمسك حذاء بكعب عال وتنظر إليه بتردد",
    correct: 6
};

HELP_DATA["lesen3_exam15_q6"] = {
    text: "Eine alte und höchst effektive Methode zur Entspannung - Eine Freundin hat viel Stress und möchte einen Ausgleich finden, der auch mit sportlichen Aktivitäten verbunden ist.",
    meaning: "التاي تشي هو رياضة صينية تجمع بين الحركات البطيئة والاسترخاء والتأمل",
    keywords: ["Tai Chi Chuan = تاي تشي", "Entspannung = استرخاء", "Bewegungen = حركات", "Konzentration = تركيز", "Harmonie = انسجام"],
    simplified: "رياضة تجمع بين التركيز والحركة الهادئة وتخفيف التوتر",
    imagine: "امرأة تتحرك ببطء شديد ويديها مرفوعتان مع أشخاص آخرين",
    correct: 7
};

HELP_DATA["lesen3_exam15_q7"] = {
    text: "Die Fußreflexzonenmassage entwickelte im Jahr 1913 - Ein Bekannter hat oft Kopfschmerzen. Er möchte jedoch keine Tabletten nehmen.",
    meaning: "تدليك نقاط معينة في القدمين ينشط شفاء الجسم الذاتي ويخفف الصداع",
    keywords: ["Fußreflexzonenmassage = تدليك نقاط القدم", "Kopfschmerzen = صداع", "Selbstheilungskraft = قدرة شفاء ذاتية", "Nervenreize = تنبيه عصبي"],
    simplified: "تدليك القدمين بديل طبيعي لعلاج الصداع وآلام الظهر",
    imagine: "رجل جالس وقدماه في حوض ماء ويد تمسك كرة صغيرة تحت قدميه",
    correct: 9
};

HELP_DATA["lesen3_exam15_q8"] = {
    text: "Gute Schuhe müssen nicht unbedingt teuer sein - Ein Bekannter möchte sich modische Schuhe kaufen. Er weiß aber nicht, ob er sich das leisten kann.",
    meaning: "الاختبارات أثبتت أن الحذاء البسيط قد يكون بنفس جودة الحذاء الفاخر والمكلف",
    keywords: ["Schuhe = أحذية", "teuer = غالي", "Qualität = جودة", "Designerschuh = حذاء مصمم", "billig = رخيص"],
    simplified: "لا تشتري الحذاء الغالي فالسعر ليس دليلا على الجودة",
    imagine: "رجل ينظر إلى حذاء رخيص وآخر غالي ويحك رأسه",
    correct: 2
};

HELP_DATA["lesen3_exam15_q9"] = {
    text: "Eine alte und höchst effektive Methode zur Entspannung - Eine Freundin hat viel Stress und möchte einen Ausgleich finden.",
    meaning: "تدليك الصوت بأوعية تبتة يحفز الاسترخاء ويخفف التوتر بدون مجهود بدني",
    keywords: ["Klangmassage = تدليك صوتي", "tibetanische Klangschalen = أوعية صوت تبتية", "Entspannung = استرخاء", "Vibration = اهتزاز"],
    simplified: "أوعية تبتية تخلق اهتزازات مريحة على الجسم والعقل",
    imagine: "امرأة مستلقية وأوعية معدنية على صدرها ورجل يقرعها خشب",
    correct: null
};

// ========== Exam 16: Die Tochter einer Bekannten wird vier Jahre alt (صحيح: 8,5,0,6,4,1,3,9,2,7) ==========

HELP_DATA["lesen3_exam16_q1"] = {
    text: "Expedition ins Reich der Schneeleoparden - Sie möchten mit Ihrem zwölfjährigen Sohn eine Ausstellung besuchen. Er interessiert sich für Tiere.",
    meaning: "معرض تفاعلي عن النمور الثلجية النادرة مناسب للكبار والصغار",
    keywords: ["Ausstellung = معرض", "Schneeleoparden = نمور ثلجية", "Großkatzen = قطط كبيرة", "interaktiv = تفاعلي", "Familie = عائلة"],
    simplified: "معرض لنمور الثلج المهددة بالانقراض للأطفال فوق 6 سنوات",
    imagine: "ولد صغير يضع يده على جدار زجاجي ونمر ثلجي خلفه",
    correct: 8
};

HELP_DATA["lesen3_exam16_q2"] = {
    text: "Alte Jeans, Blusen oder Kleider - Eine Freundin hat viele Kleidungsstücke, die sie nicht mehr trägt. Sie sucht Anregungen, was sie damit machen könnte.",
    meaning: "أفكار لصنع إكسسوارات جديدة من الملابس القديمة بأسلوب الخياطة اليدوية",
    keywords: ["alte Jeans = جينز قديم", "neue Accessoires = إكسسوارات جديدة", "nähen = خياطة", "Ratgeber = دليل"],
    simplified: "كتاب يعلمك تحويل الملابس القديمة إلى جدد وأغطية كراسي",
    imagine: "امرأة تمسك جينز قديم وتقصه بمقص ويدها مبتسمة",
    correct: 5
};

HELP_DATA["lesen3_exam16_q3"] = {
    text: "Es ist ein sonniger Herbsttag - Die Tochter einer Bekannten wird vier Jahre alt. Sie möchten ihr etwas zum Geburtstag mitbringen.",
    meaning: "قصة شتوية مصورة للأطفال من سن 3 سنوات عن مغامرة أميرة وثعلب ثلجي",
    keywords: ["Wintergeschichte = قصة شتوية", "Kinder = أطفال", "ab 3 Jahren = من 3 سنوات", "Prinzessin = أميرة", "Fuchs = ثعلب"],
    simplified: "كتاب مصور لقصة شتوية ساحرة للأميرات الصغيرات",
    imagine: "طفلة تحمل كتابا وتفرح ووجهها مبتسم",
    correct: 0
};

HELP_DATA["lesen3_exam16_q4"] = {
    text: "Schnee in der Kunst - Sie besuchen einen Freund, der sich für Malerei interessiert. Sie möchten ihm ein passendes Geschenk mitbringen.",
    meaning: "كتاب فني عن رسومات الثلوج عبر العصور من الرومانسية حتى اليوم",
    keywords: ["Schnee = ثلج", "Kunst = فن", "Gemälde = لوحات", "Romantik = رومانسية", "Impressionismus = انطباعية"],
    simplified: "كتاب فاخر يوثق جمال الثلج في لوحات عباقرة الرسم",
    imagine: "رجل يقلب صفحات كتاب يظهر فيه جبال ثلجية مرسومة",
    correct: 6
};

HELP_DATA["lesen3_exam16_q5"] = {
    text: "Märchenlandschaft aus Schnee und Eis - Ein Freund würde gerne im Winter verreisen. Er möchte viel Zeit an der frischen Luft verbringen und sich bewegen.",
    meaning: "عطلة مشي لمدة 8 أيام في جبال الألب مع إقامة في فندق 4 نجوم",
    keywords: ["Winterwanderungen = مشي شتوي", "Oberstdorf = أوبرستدورف", "Wellness = عناية صحية", "Gruppe = مجموعة", "Halbpension = نصف إقامة"],
    simplified: "سياحة مشي في الثلوج مع وجبات ومنتجع صحي شامل",
    imagine: "رجل يمشي بعصا في ثلوج عميقة وخلفه منتجع ضخم",
    correct: 4
};

HELP_DATA["lesen3_exam16_q6"] = {
    text: "Atemberaubende Fotos leicht gemacht - Ein Bekannter hat sich einen Fotoapparat gekauft und möchte die Grundlagen der Fotografie erlernen.",
    meaning: "ورشة تصوير للمناظر الطبيعية لتعلم تقنيات الإضاءة والتكوين الفني",
    keywords: ["Seminar = ورشة", "Fotografie = تصوير", "Landschaftsfotografie = تصوير طبيعة", "Techniken = تقنيات"],
    simplified: "دورة تدريبية في تصوير الطبيعة للمبتدئين",
    imagine: "رجل يحمل كاميرا ويجلس على صخرة تصور شلالا",
    correct: 1
};

HELP_DATA["lesen3_exam16_q7"] = {
    text: "Tolle Aufnahmen in einer spektakulären Landschaft - Eine Bekannte kann gut fotografieren und hat bereits einige Kurse gemacht. Sie würde gerne neue kreative Techniken kennenlernen.",
    meaning: "ورشة تصوير متقدمة لمدة يوم كامل في بحيرة كونيغسيه للمصورين المتمرسين",
    keywords: ["Workshop = ورشة", "Landschaftsfotografie = تصوير طبيعة", "Fortgeschrittene = متقدمون", "Kreativtechniken = تقنيات إبداعية"],
    simplified: "دورة تصوير متقدمة لمن جربوا الكاميرا من قبل",
    imagine: "امرأة ترتدي ملابس عملية وتضبط كاميرتها أمام منظر طبيعي ساحر",
    correct: 3
};

HELP_DATA["lesen3_exam16_q8"] = {
    text: "Sie treffen sich an einem Sonntagnachmittag mit einer Freundin, die sich gerne mit Mode und ihrer Geschichte beschäftigt. Sie möchten mit ihr etwas unternehmen.",
    meaning: "معرض عن تاريخ الجينز من ملابس العمل إلى منصات عروض الأزياء",
    keywords: ["Ausstellung = معرض", "Blue Jeans = جينز أزرق", "Mode = موضة", "Geschichte = تاريخ", "Designerstücke = قطع مصممة"],
    simplified: "معرض عن تطور الجينز عبر الزمن بالأصلية والجديدة",
    imagine: "صديقتان تقفان أمام جدار زجاجي فيه جينز قديم جدا",
    correct: null
};

// ========== Exam 17: Tierdokumentationen (صحيح: 4,0,8,3,6,2,5,9) ==========

HELP_DATA["lesen3_exam17_q1"] = {
    text: "Auf den Spuren der Wildkatze - Ihr Sohn wird nächste Woche zehn Jahre alt. Sie möchten ihn mit einer besonderen Feier überraschen.",
    meaning: "مكان متخصص في حفلات أعياد الميلاد للأطفال مع برنامج عن القطط البرية",
    keywords: ["Wildkatzendorf = قرية القطط البرية", "Kindergeburtstage = أعياد ميلاد أطفال", "Fütterungen = إطعام", "Kinderführungen = جولات أطفال"],
    simplified: "حفلة عيد ميلاد مميزة في قرية القطط البرية مع برنامج خاص",
    imagine: "أطفال واقفون حول سياج وقطة برية خلفه وعليها قبعة",
    correct: 4
};

HELP_DATA["lesen3_exam17_q2"] = {
    text: "Am 1. August zeigen wir den 90-minütigen Film - Ein Bekannter interessiert sich für Tierdokumentationen und würde gerne wissen, wie solche Filme entstehen.",
    meaning: "فيلم عن أشهر صانعي أفلام الطبيعة وراء الكواليس والمعدات المستخدمة",
    keywords: ["Tierfilmer = مصورو حيوانات", "Naturkulissen = مناظر طبيعية", "Dreharbeiten = تصوير", "Ausstattung = معدات"],
    simplified: "فيلم وثائقي يشرح خفايا تصوير الحيوانات البرية",
    imagine: "رجل يحمل كاميرا كبيرة ويختبئ خلف شجيرة وأسد أمامه",
    correct: 0
};

HELP_DATA["lesen3_exam17_q3"] = {
    text: "Ausstellung im Park - Sie suchen ein Geschenk für einen Freund, der sich für Kunst interessiert.",
    meaning: "معرض فني يضم رسومات ومنحوتات خشبية وسيراميك وحلي يمكن شراؤها",
    keywords: ["Ausstellung = معرض", "Künstler = فنانين", "Zeichnungen = رسومات", "Holzskulpturen = منحوتات خشبية", "Keramik = سيراميك"],
    simplified: "معرض فني مع إمكانية شراء اللوحات والمنحوتات",
    imagine: "رجل يشير إلى تمثال خشبي بجانبه لوحة زيتية على الحائط",
    correct: 8
};

HELP_DATA["lesen3_exam17_q4"] = {
    text: "Schon lange lebt Kaninchen Hoppi - Ihr siebenjähriger Neffe liebt phantasievolle Geschichten. Sie wollen nachmittags etwas mit ihm unternehmen.",
    meaning: "فيلم رسوم متحركة عن أرنب يحمي وكره من رجل شرير يريد بناء ملعب جولف",
    keywords: ["Animationsfilm = فيلم رسوم", "Kaninchen = أرنب", "Abenteuer = مغامرات", "Kinder ab 6 Jahren = أطفال من 6 سنوات"],
    simplified: "فيلم كوميدي عن عائلة أرانب تكافح لإنقاذ موطنها",
    imagine: "طفل صغير يصفق وأرنب أزرق على الشاشة أمامه",
    correct: 3
};

HELP_DATA["lesen3_exam17_q5"] = {
    text: "Du bist gern kreativ - Ihre zehnjährige Tochter zeichnet viel und möchte ihre Fähigkeiten weiter verbessern.",
    meaning: "دورة رسم منتظمة لصغار الفنانين من سن 10 سنوات بتدريب رسامة محترفة",
    keywords: ["Kurs = دورة", "Kreativ = إبداعي", "Nachwuchskünstler = فنانين صغار", "zeichnen = رسم", "malen = تلوين"],
    simplified: "دروس رسم أسبوعية للفنانين الصغار لتطوير مهاراتهم",
    imagine: "بنت تجلس أمام لوحة قماشية وفرشاة بألوان زاهية",
    correct: 6
};

HELP_DATA["lesen3_exam17_q6"] = {
    text: "Mit einem scharfen Blick fürs Detail gestaltete - Ihr Onkel möchte sich eine Ausstellung mit Gemälden ansehen.",
    meaning: "معرض للوحات طبيعة وحيوانات برسام بلطيقي دقيق التفاصيل",
    keywords: ["Ausstellung = معرض", "Gemälde = لوحات", "Tierbilder = صور حيوانات", "Landschaftsbilder = لوحات طبيعة"],
    simplified: "معرض فني لرسام مختص بالطبيعة والحياة البرية الأفريقية",
    imagine: "رجل واقف أمام لوحة لغابة ويلمس ذقنه متأملا",
    correct: 2
};

HELP_DATA["lesen3_exam17_q7"] = {
    text: "Noch nicht lange ist es her, dass Wildkatzen - Ihre 16-jährige Nichte interessiert sich für heimische Tierwelt und würde sich gerne einen Film ansehen.",
    meaning: "فيلم وثائقي عن القطط البرية الأوروبية وجهود إنقاذها من الانقراض",
    keywords: ["Wildkatzen = قطط برية", "Dokumentation = فيلم وثائقي", "Rettung = إنقاذ", "Wälder = غابات", "heimisch = محلي"],
    simplified: "فيلم عن القطط البرية في غابات أوروبا ومشروع لحمايتها",
    imagine: "فتاة تنظر إلى شاشة وقطة برية تمشي على خشب مقطوع",
    correct: 5
};

HELP_DATA["lesen3_exam17_q8"] = {
    text: "Heiße Rhythmen und kühle Drinks - Sie würden gerne abends etwas mit Freunden draußen unternehmen und dabei sportlich aktiv sein.",
    meaning: "حفل موسيقي على مسبح مع إمكانية السباحة ولعب كرة الشاطئ حتى منتصف الليل",
    keywords: ["Konzert = حفل موسيقي", "Waldschwimmbad = مسبح غابة", "baden = سباحة", "Beach-Volleyball = كرة شاطئ", "Jugendliche = شباب"],
    simplified: "حفلة صيفية على مسبح مع سباحة وموسيقى ورياضات شاطئية",
    imagine: "أربعة أصدقاء يلعبون كرة شاطئ بجانب مسبح وعليهم إضاءات ملونة",
    correct: 9
};

// ========== Exam 18: Aufräumen (صحيح: 0,3,2,9,1,8,6,4,7,5) ==========

HELP_DATA["lesen3_exam18_q1"] = {
    text: "Das große Aufräumbuch - Alle Ihre Schränke sind voll mit Sachen und Sie haben kaum mehr Platz في der Wohnung. Sie suchen Ideen, wie Sie das ändern können.",
    meaning: "كتاب إرشادي لتنظيم المنزل والتخلص من الأشياء غير الضرورية خطوة بخطوة",
    keywords: ["Aufräumen = ترتيب", "Ratgeber = دليل", "aussortieren = فرز", "wegwerfen = رمي", "Ordnung = نظام"],
    simplified: "دليل لتنظيم المنزل والتخلص من الفوضى والملابس القديمة",
    imagine: "شخص يقف أمام خزانة مفتوحة والملابس تتدافع خارجها",
    correct: 0
};

HELP_DATA["lesen3_exam18_q2"] = {
    text: "Einrichtungshaus Unterberg - Ihr Bruder sucht ein hochwertiges neues Sofa.",
    meaning: "متجر أثاث فاخر في هيلدسهايم يبيع أرائك وطاولات وحدائق بجودة عالية",
    keywords: ["Möbelhaus = متجر أثاث", "hochwertig = عالي الجودة", "Sofa = أريكة", "Ausstellung = معرض", "Design = تصميم"],
    simplified: "معرض أثاث فاخر بأجود الخامات والتصاميم العصرية",
    imagine: "رجل يجلس على أريكة بيضاء ويبتسم وبجانبه وسائد ملونة",
    correct: 3
};

HELP_DATA["lesen3_exam18_q3"] = {
    text: "Henrike Derendorf: Das neue Wohnbuch - Eine Bekannte zieht um und sucht Tipps zu Einrichtung und Wandfarben.",
    meaning: "كتاب ديكور يحتوي 1000 فكرة لتصميم منزلي واختيار الألوان المناسبة",
    keywords: ["Wohnbuch = كتاب منزلي", "Einrichtung = تأثيث", "Raumgestaltung = تنسيق غرف", "Farben = ألوان", "Stilrichtungen = أنماط"],
    simplified: "كتاب يقدم أفكارا لتأثيث وتزيين المنزل بأناقة",
    imagine: "امرأة تضع ديكورات على حائط غرفة نومها وتبتسم",
    correct: 2
};

HELP_DATA["lesen3_exam18_q4"] = {
    text: "Rat mal, wo die Tiere wohnen! - Sie suchen ein Kinderbuch für Ihren siebenjährigen Sohn. Er möchte gerne mehr über Tiere erfahren.",
    meaning: "كتاب علمي للأطفال عن حياة الحيوانات في الحديقة والغابة والمنزل",
    keywords: ["Kinderbuch = كتاب أطفال", "Tiere = حيوانات", "Zoologe = عالم حيوانات", "Entdeckungsreise = رحلة استكشافية", "ab 6 Jahren = من 6 سنوات"],
    simplified: "كتاب مصور عن الثعالب والعصافير والنحل في بيئاتهم الطبيعية",
    imagine: "ولد صغير يقرأ كتابا وعقرب ساعة وكلب نائم بجانبه",
    correct: 9
};

HELP_DATA["lesen3_exam18_q5"] = {
    text: "Tiere hautnah erleben - Eine Bekannte möchte mit ihrer Familie einen Ausflug machen und dabei am liebsten Tiere beobachten.",
    meaning: "حديقة حيوانات مفتوحة حيث يمكن إطعام ومداعبة الجمال والقرود",
    keywords: ["Wildpark = حديقة حيوانات برية", "Tiere beobachten = مراقبة حيوانات", "streicheln = مداعبة", "Kamele reiten = ركوب جمال"],
    simplified: "رحلة لعائلة لمشاهدة الحيوانات القريبة وتقديم الطعام لها",
    imagine: "أسرة تمشي في ممر خشبي وغزال يقترب منهم يريد أكل جزر",
    correct: 1
};

HELP_DATA["lesen3_exam18_q6"] = {
    text: "Geschichten für Kinder - Ihre Cousine studiert und würde gern في eine Wohngemeinschaft ziehen.",
    meaning: "ورشة تطوعية لكتابة قصص الأطفال وتعلم أساسيات النشر والرسم",
    keywords: ["Kinderbücher = كتب أطفال", "Basiskurs = دورة أساسية", "Illustrationen = رسوم", "Verlag = دار نشر"],
    simplified: "دورة كتابة قصص مصورة للأطفال للمبتدئين والمتقدمين",
    imagine: "شابة تمسك قلم وترسم وجه قطة على ورقة وأمامها كومة كتب",
    correct: null
};

HELP_DATA["lesen3_exam18_q7"] = {
    text: "Katze, Papagei, Meerschweinchen - Ihre Schwester möchte wissen, ob sie في ihre Mietwohnung einen Hund halten darf.",
    meaning: "محاضرة قانونية عن حقوق وواجبات مستأجر المنزل فيما يتعلق بتربية الحيوانات الأليفة",
    keywords: ["Mietrecht = قانون إيجار", "Haustiere = حيوانات أليفة", "Vermieter = مالك", "Nachbarn = جيران", "Vortrag = محاضرة"],
    simplified: "دليل قانوني حول شروط تربية الحيوانات الأليفة في الشقق المستأجرة",
    imagine: "امرأة تمسك كلبها الصغير أمام كتاب قانون وورقة رسمية",
    correct: 6
};

HELP_DATA["lesen3_exam18_q8"] = {
    text: "Helden der Kindheit - Sie möchten eine Ausstellung besuchen, die auch für Ihre Kinder interessant ist.",
    meaning: "معرض عن شخصيات كتب الأطفال مثل بيبي بيتسترومب مع ألعاب تفاعلية للأطفال",
    keywords: ["Ausstellung = معرض", "Kinderbücher = كتب أطفال", "Figuren = شخصيات", "Mitmachen = مشاركة", "Spiele = ألعاب"],
    simplified: "معرض ممتع لشخصيات كرتونية مع أنشطة تفاعلية للأطفال",
    imagine: "طفل يقفز أمام تمثال لشخصية كرتونية وأمه تلتقط الصورة",
    correct: 8
};

HELP_DATA["lesen3_exam18_q9"] = {
    text: "Wohnen in der Gründerzeit - Ihr Vater interessiert sich für alte wertvolle Möbel.",
    meaning: "معرض لأثاث الفخم من أواخر القرن التاسع عشر في قصر تاريخي",
    keywords: ["Ausstellung = معرض", "Gründerzeit = فترة تأسيس", "originale Möbel = أثاث أصلي", "Wohnkultur = ثقافة سكنية", "Bürgertum = طبقة برجوازية"],
    simplified: "جولة في متحف لأثاث فخم من زمن الأجداد",
    imagine: "رجل عجوز يمرر يده على طاولة خشبية منحوتة",
    correct: 4
};

HELP_DATA["lesen3_exam18_q10"] = {
    text: "Ihre Tochter geht zur Schule und sucht einen Praktikumsplatz - Ihre Tochter geht zur Schule und sucht einen Praktikumsplatz.",
    meaning: "دار نشر تطلب متدربين للتعرف على المهام التحريرية والتسويقية",
    keywords: ["Praktikum = تدريب عملي", "Verlag = دار نشر", "redaktionell = تحريري", "Marketing = تسويق", "Studenten = طلاب"],
    simplified: "فرصة تدريب في مجال النشر والعلاقات العامة لطلاب الجامعة",
    imagine: "فتاة تحمل كومة كتب وتقف أمام باب زجاجي مكتوب دار نشر",
    correct: null
};

// ========== Exam 19: Erholung und Reisen (صحيح: 8,4,2,7,0,5,6,3,1,9) ==========

HELP_DATA["lesen3_exam19_q1"] = {
    text: "Urlaubsregion Allgäuer Alpen - Ein Bekannter liebt die Bergwelt, kann aber keine steilen und anstrengenden Wege mehr gehen.",
    meaning: "منطقة جبلية في الألب مع تلفريك وكراسي معلقة توفر رؤية القمم بدون تعب",
    keywords: ["Allgäuer Alpen = ألب ألغاو", "Bergwanderer = متسلق جبال", "Bergbahnen = تلفريك", "Sessellifte = كراسي معلقة"],
    simplified: "جبال الألب الألمانية بمصاعد وكراسي معلقة لضعاف القلوب",
    imagine: "رجل عجوز يجلس على كرسي معلق فوق قمم ثلجية ويبتسم",
    correct: 8
};

HELP_DATA["lesen3_exam19_q2"] = {
    text: "Ferien im Harz - Ein Bekannter möchte im Urlaub auf einem See Boot fahren.",
    meaning: "مكان مرتفع في هارتس مع سد مائي يوفر رياضات مائية مثل التجديف والتزلج على الماء",
    keywords: ["Harz = هارتس", "Okertalsperre = سد أوكر", "Wassersport = رياضة مائية", "Surfen = ركمجة", "Paddeln = تجديف"],
    simplified: "بحيرة اصطناعية في هارتس لممارسة الرياضات المائية",
    imagine: "رجل على زورق صغير يحرك المجداف وبجانبه بحيرة زرقاء",
    correct: 4
};

HELP_DATA["lesen3_exam19_q3"] = {
    text: "Auf den Spuren des römischen Dichters Ausonius - Eine Bekannte möchte eine mehrtägige Fußwanderung machen und dabei etwas über die kulturelle Vergangenheit der Region erfahren.",
    meaning: "طريق روماني قديم بطول 140 كيلومترا لمسافرين متمكنين مع متاحف أثرية",
    keywords: ["Wanderweg = طريق مشاة", "römische Heerstraße = طريق روماني", "Museen = متاحف", "Vergangenheit = ماضي"],
    simplified: "جولة مشي لأيام على طريق الآثار الرومانية القديمة",
    imagine: "امرأة تحمل عصا وياقة عالية تمشي على طريق مرصوف بالحجارة وأعمدة رومانية خلفها",
    correct: 2
};

HELP_DATA["lesen3_exam19_q4"] = {
    text: "Durch das Watt - Eine Bekannte ist Hobbyzoologin und interessiert sich für den Lebensraum 'Küste'.",
    meaning: "المشي لمسافات طويلة في منطقة المد والجزر في بحر الشمال لمراقبة الفقمات والطيور",
    keywords: ["Wattwanderung = مشي في المد", "Nordsee = بحر الشمال", "Seehunde = فقمات", "Nationalpark = حديقة وطنية", "Halligen = جزر صغيرة"],
    simplified: "رحلة استكشافية إلى شواطئ بحر الشمال للتعرف على الكائنات الحية",
    imagine: "امرأة تحمل منظار تنظر إلى صخرة عليها فقمة صغيرة وكلبها بجانبها",
    correct: 7
};

HELP_DATA["lesen3_exam19_q5"] = {
    text: "Achtung, Kamera läuft! - Ein Bekannter möchte miterleben, wie spektakuläre Filmszenen gedreht werden.",
    meaning: "مدينة ملاهي سينمائية تتضمن محاكاة مشاهد حركة ومطاردة مع أفعوانيات ضخمة",
    keywords: ["Movie Park = منتزه سينمائي", "Action = أكشن", "Stunts = حركات بهلوانية", "Flugsimulator = محاكاة طيران", "Achterbahnen = قطارات متعرجة"],
    simplified: "منتزه ترفيهي يشعرك أنك في فيلم أكشن حقيقي",
    imagine: "شاب يجلس في مقعد طائرة وامرأة تصرخ خلفه وتحلق السحاب",
    correct: 0
};

HELP_DATA["lesen3_exam19_q6"] = {
    text: "Spiel und Spaß am Bodensee - Eine Familie möchte mit ihren Kindern einen aktiven und lustigen Tag verbringen.",
    meaning: "مدينة ألعاب مائية وخشبية مع أنشطة تفاعلية للأطفال عند بحيرة بودنسي",
    keywords: ["Spieleland = مدينة ألعاب", "Bodensee = بحيرة بودنسي", "Familie = عائلة", "Attraktionen = ألعاب", "Ravensburger = رافنسبورغر"],
    simplified: "حديقة ألعاب عائلية على بحيرة بودنسي مع 50 لعبة ممتعة",
    imagine: "أطفال يركضون في ملاهي وبحيرة زرقاء خلفهم ووالدهم يصورهم",
    correct: 5
};

HELP_DATA["lesen3_exam19_q7"] = {
    text: "Bad Elster - heilendes Wasser - Ein Bekannter hat ein neues Kniegelenk bekommen und sucht eine geeignete Kur.",
    meaning: "حمامات كبريتية ومعدنية لعلاج الروماتيزم وإصابات الرياضة بعد العمليات الجراحية",
    keywords: ["Bad Elster = باد إلستر", "Mineralquellen = ينابيع معدنية", "Kur = علاج", "Rheuma = روماتيزم", "Reha = تأهيل"],
    simplified: "ينابيع حارة وكبريتية لعلاج العظام والمفاصل",
    imagine: "رجل عجوز يجلس في ماء فقاعي ويداه على عصاة أمامه جبال خضراء",
    correct: 6
};

HELP_DATA["lesen3_exam19_q8"] = {
    text: "Bad Homburg - in einzigartiger Badekultur entspannen - Eine Bekannte möchte sich في einem Kurort von der Hektik des Alltags erholen.",
    meaning: "منتجع صحي بمياه معدنية وبرامج رياضية وعلاجية لمكافحة التوتر",
    keywords: ["Bad Homburg = باد هومبورغ", "Thermalwasser = مياه حرارية", "Entspannung = استرخاء", "Stress = توتر", "Fitness = لياقة"],
    simplified: "منتجع صحي فاخر بمياه معدنية وكهف استرخاء",
    imagine: "امرأة مستلقية على كرسي وكمادات على وجهها ومياه تنبع من حنفية أمامها",
    correct: 3
};

HELP_DATA["lesen3_exam19_q9"] = {
    text: "Eine Bekannte interessiert sich für CDs mit klassischer Musik - Eine Bekannte interessiert sich für CDs mit klassischer Musik.",
    meaning: "مجموعة سي دي لموسيقى كلاسيكية عالمية وارتجالات الجاز والأوركسترا",
    keywords: ["CDs = أقراص", "klassische Musik = موسيقى كلاسيكية", "Jazz = جاز", "Orchester = أوركسترا"],
    simplified: "سي دي لموسيقى كلاسيكية لأشهر عازفي العالم",
    imagine: "امرأة تضع سماعات في أذنيها وتغمض عينيها وأصابعها تضرب الهواء",
    correct: null
};

HELP_DATA["lesen3_exam19_q10"] = {
    text: "Eine Bekannte möchte Geschichten über Ritter und Burgen lesen - Eine Bekannte möchte Geschichten über Ritter und Burgen lesen.",
    meaning: "مهرجانات في قلاع ألمانية تشمل عروض فرسان وغناء وأسواقًا تقليدية",
    keywords: ["Burgen = قلاع", "Ritter = فرسان", "Mittelalter = قرون وسطى", "Feste = مهرجانات", "Handwerkskunst = حرف يدوية"],
    simplified: "مهرجانات في قلاع قديمة تعيد إحياء القرون الوسطى بالفرسان والمواكب",
    imagine: "أطفال وأهلهم واقفين بجانب ساحة وفارس على حصان أبيض خلفهم",
    correct: null
};

// ========== Exam 20: Sport (صحيح: 2,7,5,0,1,3,4,6,9,8) ==========

HELP_DATA["lesen3_exam20_q1"] = {
    text: "Die Österreicherin Gerlinde Kaltenbrunner - Sie möchten mehr über die psychischen Aspekte des Klettersports erfahren.",
    meaning: "محاضرة لأول امرأة تتسلق 14 قمة فوق 8000 متر عن الإرادة والانضباط",
    keywords: ["Bergsteigerin = متسلقة جبال", "Vortrag = محاضرة", "Leidenschaft = شغف", "Willensstärke = قوة إرادة", "Geduld = صبر"],
    simplified: "قصة تحديات أقوى متسلقة جبال في العالم بدون أكسجين",
    imagine: "امرأة تقف على منصة وصور جبال خلفها وشاشة عليها ثلوج",
    correct: 2
};

HELP_DATA["lesen3_exam20_q2"] = {
    text: "Neue Studie erschienen - Sie suchen Informationen zu den gesundheitlichen Auswirkungen von Sport.",
    meaning: "دراسة تؤكد أن الرياضة المعتدلة مفيدة لكن الإفراط فيها يعود بالضرر",
    keywords: ["Studie = دراسة", "Training = تمرين", "Diabetes = سكري", "Herzerkrankungen = أمراض قلب", "extrem = مفرط"],
    simplified: "الرياضة اليومية مفيدة لكن الإفراط فيها يزيد المخاطر الصحية",
    imagine: "شخص يركض بسرعة ثم ينهار على الأرض يتنفس بصعوبة ويداه على قلبه",
    correct: 7
};

HELP_DATA["lesen3_exam20_q3"] = {
    text: "Nervenkitzel pur: Bungee-Jumping - Sie möchten einem Freund ein besonderes Sporterlebnis schenken.",
    meaning: "فرصة القفز بالحبال من ارتفاع 100 متر فوق الماء ليلا أو نهارا",
    keywords: ["Bungee-Jumping = قفز بالحبال", "Extremsportart = رياضة متطرفة", "Nachtspringe = قفز ليلي", "Reservierung = حجز"],
    simplified: "قفزة مغامرة من أعلى الجسر إلى الماء بتأمين كامل",
    imagine: "شاب مربوط بحبل يقفز من أعلى جسر ويصيح والسماء زرقاء خلفه",
    correct: 5
};

HELP_DATA["lesen3_exam20_q4"] = {
    text: "Helfer und Helferinnen gesucht - Ein Freund von Ihnen möchte gerne bei einer Sportveranstaltung mitarbeiten.",
    meaning: "متطوعون مطلوبون لتنظيم ماراثون نصف سنوي بأعمال خفيفة متنوعة",
    keywords: ["Halbmarathon = نصف ماراثون", "Freiwillige = متطوعين", "Benefizveranstaltung = فعالية خيرية", "Verpflegung = تغذية", "Startnummer = رقم بداية"],
    simplified: "فرصة تطوع في سباق الركض الخيري لمساعدة المجتمع",
    imagine: "شاب يرتدي صدار أمان ويمنح العدائين أكواب ماء والجمهور يصفق خلفه",
    correct: 0
};

HELP_DATA["lesen3_exam20_q5"] = {
    text: "Spektakuläre Feuerwehrübung - Sie interessieren sich für Videos von besonderen Rettungseinsätzen.",
    meaning: "فيديو عن محاكاة لإنقاذ مصابين من برج مرتفع بواسطة سلم وسيارة إطفاء",
    keywords: ["Feuerwehrübung = تمرين إطفاء", "Rettungseinsätze = عمليات إنقاذ", "Drehleiter = سلم دوار", "Schwerverletzte = مصابين خطيرين"],
    simplified: "فيديو عن مهمة إنقاذ دراماتيكية لرجال الإطفاء في برج",
    imagine: "رجل معلق في سلم طويل وسيارات إطفاء زرقاء تحته ورجال على الأرض يلتقطونه",
    correct: 1
};

HELP_DATA["lesen3_exam20_q6"] = {
    text: "Aktion 'Sauberes Grün' - Sie möchten dazu beitragen, Ihre Stadt schöner zu machen.",
    meaning: "حملة تنظيف لمدة 3 أيام للحدائق والمتنزهات بمشاركة أفراد ومؤسسات",
    keywords: ["Aktion = حملة", "sauber machen = تنظيف", "Grünflächen = مساحات خضراء", "Parks = متنزهات", "Spielplätze = ملاعب أطفال"],
    simplified: "أيام تطوع لتنظيف وتجميل مرافق مدينتك العامة",
    imagine: "أشخاص يرتدون قفازات ويمسحون الأرض وحولهم أكياس كبيرة من القمامة",
    correct: 3
};

HELP_DATA["lesen3_exam20_q7"] = {
    text: "Tag der offenen Tür in der städtischen Bücherei - Ihre sechzehnjährige Cousine beschäftigt sich gerne mit kleinen Kindern.",
    meaning: "تطوع شباب لقراءة قصص للأطفال الصغار في المكتبة بمناسبة اليوم العالمي للكتاب",
    keywords: ["vorlesen = قراءة بصوت عال", "junge Leser = قراء صغار", "Ehrenamt = تطوع", "Kinderprogramm = برنامج أطفال", "Belohnung = مكافأة"],
    simplified: "فرصة تطوع لقراءة القصص للأطفال في يوم المكتبة المفتوح",
    imagine: "فتاة مراهقة تجلس أمام طفلة صغيرة وتقرأ كتابا وعليها صور فراشات",
    correct: 6
};

HELP_DATA["lesen3_exam20_q8"] = {
    text: "Ihr Vater plant, eine Familienchronik zu schreiben - Ihr Vater plant, eine Familienchronik zu schreiben.",
    meaning: "المتحف يرغب في استعارة صور تاريخية ورياضية قديمة من المواطنين لمعرض قادم",
    keywords: ["historische Aufnahmen = لقطات تاريخية", "private Bilder = صور شخصية", "Sportveranstaltungen = أحداث رياضية", "Jubiläum = ذكرى سنوية"],
    simplified: "المكتب الثقافي يبحث عن صور عائلية قديمة لعرضها في معرض المدينة",
    imagine: "رجل عجوز يخرج ألبوم صور أصفر من تحت السرير وينفض الغبار عنها",
    correct: null
};

HELP_DATA["lesen3_exam20_q9"] = {
    text: "Ihr kleiner Bruder möchte einmal ein Feuerwehrauto aus der Nähe sehen - Ihr kleiner Bruder möchte einmal ein Feuerwehrauto aus der Nähe sehen.",
    meaning: "عيد ميلاد احتفالي لمدينة الإطفاء بمشاركة سيارات ومعدات وعروض إطفاء حقيقية",
    keywords: ["Jubiläum = ذكرى سنوية", "Feuerwehr = إطفاء", "Löschfahrzeug = سيارة إطفاء", "Leistungsschau = عرض قدرات", "Grillfeuer = حفلة شواء"],
    simplified: "يوم مفتوح للاطفال لمشاهدة سيارات الإطفاء عن قرب في المدينة",
    imagine: "طفل صغير يضع خوذة حمراء ويجلس في مقعد سيارة إطفاء حمراء ويبتسم",
    correct: 9
};

HELP_DATA["lesen3_exam20_q10"] = {
    text: "Seniorenwohnhaus 'Zur alten Linde' - Seniorenwohnhaus 'Zur alten Linde'",
    meaning: "فرص تطوع لزيارة ودعم كبار السن في دار رعاية المسنين بأعمال بسيطة",
    keywords: ["Seniorenwohnhaus = دار مسنين", "ehrenamtlich = تطوع", "Besuchsdienste = خدمات زيارات", "Hilfestellung = مساعدة", "Begleitung = مرافقة"],
    simplified: "فرصة للتطوع في رعاية كبار السن بدار محلية",
    imagine: "رجل عجوز جالس على كرسي متحرك وامرأة تدفعه وإعلام ملون تحيطهما",
    correct: null
};

// ========== Exam 21: Sport ==========

HELP_DATA["lesen3_exam21_q1"] = {
    text: "Die Österreicherin Gerlinde Kaltenbrunner - Sie möchten mehr über die psychischen Aspekte des Klettersports erfahren.",
    meaning: "محاضرة لأول امرأة تتسلق 14 قمة فوق 8000 متر عن الإرادة والانضباط",
    keywords: ["Bergsteigerin = متسلقة جبال", "Vortrag = محاضرة", "Leidenschaft = شغف", "Willensstärke = قوة إرادة"],
    simplified: "قصة أقوى متسلقة جبال في العالم بدون أكسجين",
    imagine: "امرأة تقف على منصة وصور جبال ثلجية خلفها",
    correct: 2
};

HELP_DATA["lesen3_exam21_q2"] = {
    text: "Neue Studie erschienen - Sie suchen Informationen zu den gesundheitlichen Auswirkungen von Sport.",
    meaning: "دراسة تؤكد أن الرياضة المعتدلة مفيدة لكن الإفراط فيها يزيد المخاطر",
    keywords: ["Studie = دراسة", "Training = تمرين", "extrem = مفرط", "Diabetes = سكري", "Herzerkrankungen = أمراض قلب"],
    simplified: "الرياضة اليومية مفيدة لكن الإفراط فيها يضر",
    imagine: "شخص يركض بسرعة ثم ينهار على الأرض يلهث",
    correct: 7
};

HELP_DATA["lesen3_exam21_q3"] = {
    text: "Nervenkitzel pur: Bungee-Jumping - Sie möchten einem Freund ein besonderes Sporterlebnis schenken.",
    meaning: "فرصة القفز بالحبال من ارتفاع 100 متر فوق الماء ليلا أو نهارا",
    keywords: ["Bungee-Jumping = قفز بالحبال", "Extremsportart = رياضة متطرفة", "Nachtspringe = قفز ليلي"],
    simplified: "قفزة مغامرة من أعلى الجسر إلى الماء",
    imagine: "شاب مربوط بحبل يقفز من أعلى جسر ويصيح",
    correct: 5
};

HELP_DATA["lesen3_exam21_q4"] = {
    text: "Helfer und Helferinnen gesucht - Ein Freund von Ihnen möchte gerne bei einer Sportveranstaltung mitarbeiten.",
    meaning: "متطوعون مطلوبون لتنظيم ماراثون نصف سنوي بأعمال متنوعة",
    keywords: ["Halbmarathon = نصف ماراثون", "Freiwillige = متطوعين", "Benefizveranstaltung = فعالية خيرية"],
    simplified: "فرصة تطوع في سباق الركض الخيري لمساعدة المجتمع",
    imagine: "شاب يرتدي صدار أمان ويمنح العدائين أكواب ماء",
    correct: 0
};

HELP_DATA["lesen3_exam21_q5"] = {
    text: "Spektakuläre Feuerwehrübung - Sie interessieren sich für Videos von besonderen Rettungseinsätzen.",
    meaning: "فيديو عن إنقاذ مصابين من برج مرتفع بواسطة سلم وسيارة إطفاء",
    keywords: ["Feuerwehrübung = تمرين إطفاء", "Rettungseinsätze = عمليات إنقاذ", "Drehleiter = سلم دوار"],
    simplified: "فيديو عن مهمة إنقاذ دراماتيكية لرجال الإطفاء",
    imagine: "رجل معلق في سلم طويل وسيارات إطفاء تحته",
    correct: 1
};

HELP_DATA["lesen3_exam21_q6"] = {
    text: "Aktion 'Sauberes Grün' - Sie möchten dazu beitragen, Ihre Stadt schöner zu machen.",
    meaning: "حملة تنظيف لمدة 3 أيام للحدائق والمتنزهات",
    keywords: ["Aktion = حملة", "sauber machen = تنظيف", "Grünflächen = مساحات خضراء", "Parks = متنزهات"],
    simplified: "أيام تطوع لتنظيف وتجميل مرافق مدينتك",
    imagine: "أشخاص يرتدون قفازات ويمسحون الأرض وأكياس قمامة حولهم",
    correct: 3
};

HELP_DATA["lesen3_exam21_q7"] = {
    text: "Tag der offenen Tür in der städtischen Bücherei - Ihre sechzehnjährige Cousine beschäftigt sich gerne mit kleinen Kindern.",
    meaning: "تطوع شباب لقراءة قصص للأطفال الصغار في المكتبة",
    keywords: ["vorlesen = قراءة بصوت عال", "junge Leser = قراء صغار", "Ehrenamt = تطوع", "Kinderprogramm = برنامج أطفال"],
    simplified: "فرصة تطوع لقراءة القصص للأطفال في يوم المكتبة المفتوح",
    imagine: "فتاة مراهقة تجلس أمام طفلة صغيرة وتقرأ كتابا",
    correct: 6
};

HELP_DATA["lesen3_exam21_q8"] = {
    text: "150 Jahre Stadtfeuerwehr - Ihr kleiner Bruder möchte einmal ein Feuerwehrauto aus der Nähe sehen.",
    meaning: "يوم مفتوح للاحتفال بذكرى الإطفاء مع سيارات ومعدات وعروض",
    keywords: ["Jubiläum = ذكرى سنوية", "Feuerwehr = إطفاء", "Löschfahrzeug = سيارة إطفاء", "Leistungsschau = عرض قدرات"],
    simplified: "يوم مفتوح للأطفال لمشاهدة سيارات الإطفاء عن قرب",
    imagine: "طفل صغير يضع خوذة حمراء ويجلس في مقعد سيارة إطفاء",
    correct: 8
};

// ========== Exam 22: Sport (معدل) ==========

HELP_DATA["lesen3_exam22_q1"] = {
    text: "Neue Studie erschienen - Sie suchen Informationen zu den gesundheitlichen Auswirkungen von Sport.",
    meaning: "دراسة تؤكد أن الرياضة المعتدلة مفيدة والإفراط فيها يزيد المخاطر",
    keywords: ["Studie = دراسة", "Training = تمرين", "extrem = مفرط", "Diabetes = سكري", "Herzerkrankungen = أمراض قلب"],
    simplified: "الرياضة اليومية مفيدة لكن الإفراط فيها يضر بصحتك",
    imagine: "شخص يركض بسرعة ثم ينهار على الأرض وهو يتنفس بصعوبة",
    correct: 0
};

HELP_DATA["lesen3_exam22_q2"] = {
    text: "Spektakuläre Feuerwehrübung - Sie interessieren sich für Videos von besonderen Rettungseinsätzen.",
    meaning: "فيديو عن إنقاذ مصابين من برج مرتفع بواسطة سلم دوار",
    keywords: ["Feuerwehrübung = تمرين إطفاء", "Rettungseinsätze = عمليات إنقاذ", "Drehleiter = سلم دوار"],
    simplified: "فيديو درامي عن مهمة إنقاذ لرجال الإطفاء",
    imagine: "رجل معلق في سلم طويل وسيارات إطفاء زرقاء تحته",
    correct: 2
};

HELP_DATA["lesen3_exam22_q3"] = {
    text: "Die Österreicherin Gerlinde Kaltenbrunner - Sie möchten mehr über die psychischen Aspekte des Klettersports erfahren.",
    meaning: "محاضرة عن تسلق الجبال والإرادة والشغف والانضباط",
    keywords: ["Bergsteigerin = متسلقة جبال", "Vortrag = محاضرة", "Leidenschaft = شغف", "Willensstärke = قوة إرادة"],
    simplified: "قصة أقوى متسلقة جبال في العالم بدون أكسجين",
    imagine: "امرأة تقف على منصة وصور جبال ثلجية خلفها",
    correct: 3
};

HELP_DATA["lesen3_exam22_q4"] = {
    text: "Nervenkitzel pur: Bungee-Jumping - Sie möchten einem Freund ein besonderes Sporterlebnis schenken.",
    meaning: "فرصة القفز بالحبال من ارتفاع 100 متر فوق الماء",
    keywords: ["Bungee-Jumping = قفز بالحبال", "Extremsportart = رياضة متطرفة", "Nachtspringe = قفز ليلي"],
    simplified: "هدية مغامرة بالقفز من أعلى الجسر إلى الماء",
    imagine: "شاب مربوط بحبل يقفز من أعلى جسر ويصيح والسماء زرقاء",
    correct: 4
};

HELP_DATA["lesen3_exam22_q5"] = {
    text: "Aktion 'Sauberes Grün' - Sie möchten dazu beitragen, Ihre Stadt schöner zu machen.",
    meaning: "حملة تنظيف للحدائق والمتنزهات بمشاركة أفراد ومؤسسات",
    keywords: ["Aktion = حملة", "sauber machen = تنظيف", "Grünflächen = مساحات خضراء"],
    simplified: "أيام تطوع لتنظيف وتجميل حدائق مدينتك",
    imagine: "أشخاص يرتدون قفازات ويجمعون القمامة في أكياس كبيرة",
    correct: 5
};

HELP_DATA["lesen3_exam22_q6"] = {
    text: "Tag der offenen Tür in der städtischen Bücherei - Ihre sechzehnjährige Cousine beschäftigt sich gerne mit kleinen Kindern.",
    meaning: "تطوع لقراءة قصص للأطفال الصغار في المكتبة",
    keywords: ["vorlesen = قراءة بصوت عال", "junge Leser = قراء صغار", "Ehrenamt = تطوع", "Kinderprogramm = برنامج أطفال"],
    simplified: "فرصة تطوع لقراءة القصص للأطفال في يوم المكتبة المفتوح",
    imagine: "فتاة مراهقة تجلس أمام طفلة صغيرة وتقرأ كتابا وعليها صور",
    correct: 6
};

HELP_DATA["lesen3_exam22_q7"] = {
    text: "Ihr Vater plant, eine Familienchronik zu schreiben - Ihr Vater plant, eine Familienchronik zu schreiben.",
    meaning: "المتحف يبحث عن صور قديمة من المواطنين لمعرض قادم",
    keywords: ["historische Aufnahmen = لقطات تاريخية", "private Bilder = صور شخصية", "Jubiläum = ذكرى سنوية"],
    simplified: "المكتب الثقافي يبحث عن صور عائلية قديمة لعرضها",
    imagine: "رجل عجوز يخرج ألبوم صور أصفر من تحت السرير",
    correct: null
};

HELP_DATA["lesen3_exam22_q8"] = {
    text: "150 Jahre Stadtfeuerwehr - Ihr kleiner Bruder möchte einmal ein Feuerwehrauto aus der Nähe sehen.",
    meaning: "يوم مفتوح مع سيارات إطفاء ومعدات وعروض حقيقية",
    keywords: ["Jubiläum = ذكرى سنوية", "Feuerwehr = إطفاء", "Löschfahrzeug = سيارة إطفاء", "Leistungsschau = عرض قدرات"],
    simplified: "يوم مفتوح للأطفال لمشاهدة سيارات الإطفاء عن قرب",
    imagine: "طفل صغير يضع خوذة حمراء ويجلس في مقعد سيارة إطفاء ويبتسم",
    correct: 9
};

// ========== Exam 23: Wein und Insekten ==========

HELP_DATA["lesen3_exam23_q1"] = {
    text: "Insektenwelten - der neue Insektenführer - Ein Nachbar sucht ein illustriertes Buch, um Insektenarten erkennen zu können.",
    meaning: "دليل جيب يحتوي 1500 نوع حشرات أوروبية مع صور ورسومات ملونة",
    keywords: ["Insektenführer = دليل حشرات", "Bestimmungsbuch = كتاب تعريف", "Arten = أنواع", "Fotos = صور"],
    simplified: "كتيب مصور لكل أنواع الحشرات في أوروبا",
    imagine: "رجل ينظر إلى خنفساء ثم يفتح كتابه الصغير",
    correct: 0
};

HELP_DATA["lesen3_exam23_q2"] = {
    text: "Der Sturm deckt das Dach Ihres Wohnhauses ab - Ein Sturm hat Ihr Auto beschädigt. Sie möchten wissen, was Sie nun machen sollen.",
    meaning: "نصائح عن التأمين ضد أضرار الطقس وكيفية تجنبها والإجراءات اللازمة",
    keywords: ["Unwetterschäden = أضرار طقس", "Versicherungen = تأمين", "Schadensfall = حالة ضرر"],
    simplified: "دليل الحماية من أضرار العواصف والفيضانات",
    imagine: "رجل واقف أمام سيارته وغطاء المحرك مطوي والرياح تهب",
    correct: 1
};

HELP_DATA["lesen3_exam23_q3"] = {
    text: "Auf unserer Homepage finden Sie nicht nur aktuelle Wetterberichte - Eine Bekannte fährt في Urlaub und möchte wissen, wie das Wetter في Italien ist.",
    meaning: "موقع أرصاد جوية يقدم توقعات لأوروبا والعالم وتحذيرات من العواصف",
    keywords: ["Wetterberichte = تقارير طقس", "Vorhersagen = توقعات", "Unwetterwarnungen = تحذيرات عواصف"],
    simplified: "تطبيق هاتف للطقس في أي مدينة في العالم",
    imagine: "امرأة تنظر إلى شاشة هاتف وعليها شمس فوق خريطة إيطاليا",
    correct: 2
};

HELP_DATA["lesen3_exam23_q4"] = {
    text: "Für Liebhaber französischer Weine - Freunde von Ihnen möchten auf einer Reise im Ausland an Weinproben teilnehmen.",
    meaning: "رحلات مخصصة لمناطق النبيذ الفرنسية مع زيارة مزارع وفنادق فاخرة",
    keywords: ["Weinbaugebiete = مناطق نبيذ", "Frankreich = فرنسا", "Weingüter = مزارع نبيذ", "Verkostung = تذوق"],
    simplified: "جولات سياحية لنبيذ فرنسا مع مبيت في قصور",
    imagine: "زوجان يجلسان على طاولة وأكواب نبيذ أمامهما ومزارع خلف الزجاج",
    correct: 3
};

HELP_DATA["lesen3_exam23_q5"] = {
    text: "Wir bauen seit vier Generationen Wein an - Ihre Freundin interessiert sich für Bio-Weine und möchte Reisen und Arbeiten verbinden.",
    meaning: "مزرعة نبيذ عضوي في إيطاليا تطلب مساعدين مقابل سكن وطعام",
    keywords: ["Weingut = مزرعة نبيذ", "ökologischer Weinbau = زراعة عضوية", "Ernte = حصاد", "Helfer = مساعدين"],
    simplified: "فرصة عمل موسمي في مزرعة نبيذ إيطالية مع إقامة مجانية",
    imagine: "امرأة تقطف عنبا في حقل وبيت حجري قديم خلفها",
    correct: 5
};

HELP_DATA["lesen3_exam23_q6"] = {
    text: "23. November: Vortrag Zeinab Schmidt-Hussain - Sie möchten gerne mehr über die Lebensbedingungen bei extremer Kälte erfahren.",
    meaning: "محاضرة لعالمة مناخ عن حياتها في محطة أبحاث بالقطب الجنوبي",
    keywords: ["Vortrag = محاضرة", "Klimaforscherin = عالمة مناخ", "Südpol = قطب جنوبي", "Temperaturen = درجات حرارة"],
    simplified: "قصة عالمة في القطب الجنوبي تحت 40 درجة تحت الصفر",
    imagine: "امرأة ترتدي معطفا ثقيلا وتنظر إلى جليد أزرق",
    correct: 6
};

HELP_DATA["lesen3_exam23_q7"] = {
    text: "Das Städtische Museum beherbergt auch eine bedeutende Insektensammlung - Sie planen für den Kindergeburtstag Ihrer Tochter einen lehrreichen Nachmittag.",
    meaning: "متحف حشرات به نماذج عملاقة ومحاضرات مبسطة عن عالم الحشرات للأطفال",
    keywords: ["Insektensammlung = مجموعة حشرات", "Kinder = أطفال", "Vorträge = محاضرات", "Modelle = نماذج", "Museum = متحف"],
    simplified: "رحلة تعليمية ممتعة لمتحف الحشرات للصغار",
    imagine: "طفلة تضع يدها على نموذج نحلة عملاقة ووالدها يصورها",
    correct: 7
};

HELP_DATA["lesen3_exam23_q8"] = {
    text: "Sie sollen im Internet günstigen Wein für ein Familienfest bestellen - Sie sollen im Internet günstigen Wein für ein Familienfest bestellen.",
    meaning: "متجر إلكتروني يبيع أنواع نبيذ بأسعار مخفضة تصل إلى 40 بالمئة",
    keywords: ["Online-Shop = متجر إلكتروني", "Sonderpreise = أسعار خاصة", "Rabatt = خصم", "Wein = نبيذ"],
    simplified: "شراء نبيذ بأسعار الجملة عبر الإنترنت بخصم يصل لأربعين بالمئة",
    imagine: "شخص يضغط زر الشراء على حاسوبه وزجاجات نبيذ تظهر على الشاشة",
    correct: 8
};

// ========== Exam 24: Reiseführer ==========

HELP_DATA["lesen3_exam24_q1"] = {
    text: "Baden wie vor 2000 Jahren - Ein Bekannter möchte mit seiner zehnjährigen Tochter eine Ausstellung besuchen, es sollte auch Angebote für Kinder geben.",
    meaning: "متحف تاريخ الاستحمام للأطفال مع رسوم كوميدية وألعاب تفاعلية",
    keywords: ["Museum = متحف", "Badekultur = ثقافة الاستحمام", "Kinder = أطفال", "Comic = كوميكس", "Rallye = رالي"],
    simplified: "رحلة في تاريخ الحمامات الرومانية مع أنشطة للأطفال",
    imagine: "بنت صغيرة تقف أمام حوض روماني قديم ووالدها يشرح لها",
    correct: 0
};

HELP_DATA["lesen3_exam24_q2"] = {
    text: "Werden Sie Botschafter unserer Stadt! - Eine Freundin würde gerne als Stadtführerin arbeiten, hat aber noch keine Berufserfahrung.",
    meaning: "دورة تدريبية لمدة 100 ساعة لتصبح مرشدا سياحيا معتمدا في كوبلنز",
    keywords: ["Ausbildung = تدريب", "Stadtführer = مرشد سياحي", "Theorie = نظرية", "Praxis = تطبيق", "Fremdsprache = لغة أجنبية"],
    simplified: "دورة تأهيلية لتصبح مرشدا سياحيا في مدينتك",
    imagine: "امرأة تقف أمام مجموعة سياحية وتشير إلى نهر ومباني قديمة",
    correct: 1
};

HELP_DATA["lesen3_exam24_q3"] = {
    text: "Die Geschichte des Essens: Dessert - Ihr Bruder möchte einen Vortrag zu einem historischen Thema hören.",
    meaning: "محاضرة عن تاريخ الحلويات وأقدم وصفة كعكة في العالم قبل 3000 سنة",
    keywords: ["Vortrag = محاضرة", "Geschichte des Essens = تاريخ الطعام", "Dessert = حلوى", "Rezepte = وصفات", "Sumerer = سومريون"],
    simplified: "قصة الحلويات عبر العصور من سومر إلى اليوم",
    imagine: "رجل يجلس على كرسي ويستمع إلى مؤرخ يشرح كعكة سومرية قديمة",
    correct: 3
};

HELP_DATA["lesen3_exam24_q4"] = {
    text: "Echt sizilianisch! - Eine Freundin kocht gerne und sucht جديدة Anregungen",
    meaning: "كتاب طبخ يحتوي 80 وصفة عائلية من المطبخ الصقلي مع صور ملونة",
    keywords: ["Kochbuch = كتاب طبخ", "sizilianisch = صقلي", "Familienrezepte = وصفات عائلية", "Farbfotos = صور ملونة"],
    simplified: "وصفات صقلية أصلية من مطبخ عائلة إيطالية",
    imagine: "امرأة تقلب صفحات كتاب مليء بالصور وأطباق pasta و pizzas",
    correct: 2
};

HELP_DATA["lesen3_exam24_q5"] = {
    text: "Ein Bad fürs Leben - Ihre Schwester möchte bald ihr Bad renovieren lassen. Sie sucht Bilder von modernen Badezimmern.",
    meaning: "كتاب به صور وأفكار لتجديد الحمامات بأنماط وألوان مختلفة",
    keywords: ["Bad = حمام", "renovieren = تجديد", "Fotos = صور", "Grundrisse = مخططات", "Ausstattung = تجهيزات"],
    simplified: "كتاب إلهام لتصميم حمامات عصرية لكل الأذواق",
    imagine: "امرأة تحمل مجلة وصور حمام فاخر بالبلاط الرخامي",
    correct: 5
};

HELP_DATA["lesen3_exam24_q6"] = {
    text: "Ihre Tante möchte einen Vortrag über die Sehenswürdigkeiten Roms besuchen - Ihre Tante möchte einen Vortrag über die Sehenswürdigkeiten Roms besuchen.",
    meaning: "دليل سياحي لروما يحتوي جولات مشي وأسواق ومطاعم وتطبيق مجاني للهاتف",
    keywords: ["Stadtführer = دليل مدينة", "Rom = روما", "Sehenswürdigkeiten = معالم سياحية", "Spaziergänge = جولات مشي", "Shoppingtipps = نصائح تسوق"],
    simplified: "دليل سياحي شامل لروما مع خرائط إلكترونية",
    imagine: "امرأة مسنة تحمل خريطة وتقف أمام الكولوسيوم",
    correct: null
};

HELP_DATA["lesen3_exam24_q7"] = {
    text: "Rom bei Nacht - Sie möchten im Urlaub an einer besonderen Stadtführung teilnehmen.",
    meaning: "جولة ليلية في روما في مجموعة صغيرة مع عشاء بيتزا وزيارة الكولوسيوم",
    keywords: ["Stadtführung = جولة سياحية", "Rom = روما", "Nacht = ليل", "Pizza = بيتزا", "Kolosseum = كولوسيوم"],
    simplified: "جولة رومانسية في روما بالليل مع عشاء إيطالي",
    imagine: "زوجان يمشيان في شارع روماني قديم وأضواء صفراء وأعمدة أثرية",
    correct: 7
};

HELP_DATA["lesen3_exam24_q8"] = {
    text: "Ein Blick hinter die Kulissen - Sie möchten wissen, wie Pflegeprodukte hergestellt werden.",
    meaning: "جولة في مصنع مستحضرات تجميل طبيعية من الألب مع عينات مجانية",
    keywords: ["Fabrik = مصنع", "Naturkosmetik = مستحضرات تجميل طبيعية", "Führung = جولة إرشادية", "kostenfrei = مجاني", "Pröbchen = عينات"],
    simplified: "جولة مجانية في مصنع كريمات وشامبو الجبال الألمانية",
    imagine: "امرأة تنظر من نافذة زجاجية وآلات تمزج موادا بيضاء",
    correct: 8
};

HELP_DATA["lesen3_exam24_q9"] = {
    text: "Zwei Meister am Herd - Sie mögen leichte Unterhaltung und würden gerne mal wieder richtig lachen.",
    meaning: "فيلم كوميدي عن طباخين أحدهم نجم والآخر بطال يتعاونان لإبهار نقاد الطعام",
    keywords: ["Filmkomödie = فيلم كوميدي", "Spitzenkoch = طباخ نجم", "Kritiker = نقاد", "Witz = نكتة", "Humor = فكاهة"],
    simplified: "فيلم طهي مضحك عن طباخ محترف وآخر مهمل معا",
    imagine: "رجلان في مطبخ والقدر يطير في الهواء وهما يضحكان",
    correct: 9
};


// ============================================
// Lesen Teil 3 - Exams 25-36 (فقط الأسئلة الصحيحة)
// ============================================

// ========== Exam 25: Gartenbau ==========

HELP_DATA["lesen3_exam25_q1"] = {
    text: "Meisterwerke der Gartenarchitektur - Ein Kollege sammelt Bücher über Gartengestaltung في unterschiedlichen Ländern und Epochen.",
    meaning: "كتاب مصور عن حدائق العالم من العصور القديمة إلى الحديثة",
    keywords: ["Gartenarchitektur = هندسة حدائق", "Bildband = كتاب مصور", "italienisch = إيطالي", "französisch = فرنسي", "chinesisch = صيني"],
    simplified: "كتاب مصور عن أجمل حدائق العالم عبر التاريخ",
    imagine: "رجل يقلب صفحات كتاب مليء بصور حدائق قصور فرساي",
    correct: 1
};

HELP_DATA["lesen3_exam25_q2"] = {
    text: "Baden und Schwimmen ist nicht nur gesund - Eine Kollegin interessiert sich für Kultur- und Stadtgeschichte.",
    meaning: "معرض تاريخي عن ثقافة الاستحمام في فرانكفورت عبر العصور",
    keywords: ["Ausstellung = معرض", "Badekultur = ثقافة استحمام", "Frankfurt = فرانكفورت", "Mittelalter = قرون وسطى"],
    simplified: "معرض عن تاريخ الحمامات العامة في فرانكفورت",
    imagine: "امرأة تقف أمام صورة قديمة لحوض استحمام روماني",
    correct: 2
};

HELP_DATA["lesen3_exam25_q3"] = {
    text: "Die 'Gärten der Welt' sind zehn Themengärten - Ihr Nachbar beschäftigt sich gerne mit Architektur. Er möchte an einem freien Nachmittag spazierengehen und dabei interessante Bauwerke ansehen.",
    meaning: "حدائق عالمية في برلين تجمع عمارة الحدائق الصينية واليابانية والعربية",
    keywords: ["Gärten = حدائق", "Themengärten = حدائق موضوعية", "chinesisch = صيني", "japanisch = ياباني", "Brücken = جسور", "Pavillons = أكشاك"],
    simplified: "جولة في حدائق تعرض عمارة وتصميمات من كل العالم",
    imagine: "رجل واقف أمام جسر أحمر على طريقة الحدائق الصينية",
    correct: 3
};

HELP_DATA["lesen3_exam25_q4"] = {
    text: "Einen Garten ganz nach den eigenen Vorstellungen anlegen - Ihre Mutter möchte den Garten neu gestalten und sucht Tipps من der Praxis.",
    meaning: "كتاب إرشادي لتصميم الحدائق مع صور ورسومات ونصائح عملية",
    keywords: ["Gartenbau = بستنة", "Anleitungen = إرشادات", "Bepflanzung = زراعة", "Gartenarchitektur = هندسة حدائق"],
    simplified: "دليل عملي لتصميم حديقة الأحلام وزراعتها",
    imagine: "امرأة تخطط لحديقتها على ورقة وأمامها كتاب مفتوح عن الزهور",
    correct: 5
};

HELP_DATA["lesen3_exam25_q5"] = {
    text: "Erholung vom Alltagsstress und Ruhe findet man im Garten - Ihre Nichte studiert Kunst und möchte sich Bilder mit Naturmotiven ansehen.",
    meaning: "معرض لأكثر من 100 لوحة و رسم لحدائق من العصور الوسطى حتى اليوم",
    keywords: ["Ausstellung = معرض", "Gartenbilder = لوحات حدائق", "Gemälde = لوحات", "Zeichnungen = رسومات", "Künstler = فنانين"],
    simplified: "معرض فني يوثق جمال الحدائق في لوحات الزيتية",
    imagine: "فتاة تقف أمام لوحة زيتية لحديقة ملونة وأزهارها تتفتح",
    correct: 6
};

HELP_DATA["lesen3_exam25_q6"] = {
    text: "Obst und Gemüse im Garten anbauen - Ihre Schwester sucht einen Garten, in dem sie sich von ihrem anstrengenden Beruf erholen kann.",
    meaning: "حدائق منزلية صغيرة متاحة للإيجار في مدينة إنغرز لهواة البستنة",
    keywords: ["Kleingartenverein = جمعية حدائق صغيرة", "Garten bewirtschaften = زراعة حديقة", "Erholung = استرخاء", "frei = متاحة"],
    simplified: "فرصة لاستئجار قطعة أرض صغيرة للزراعة والاسترخاء",
    imagine: "امرأة تحمل سلة خضروات طازجة من حديقتها الصغيرة",
    correct: 7
};

HELP_DATA["lesen3_exam25_q7"] = {
    text: "Palmen in der Großstadt - Ihre Tante möchte exotische Vögel beobachten.",
    meaning: "حديقة نباتية في فرانكفورت مع نخيل و ببغاوات وأسماك استوائية",
    keywords: ["Palmengarten = حديقة نخيل", "Papageien = ببغاوات", "subtropisch = شبه استوائي", "Aquarien = أحواض سمك"],
    simplified: "حديقة استوائية وسط المدينة مع طيور ملونة ونخيل عالي",
    imagine: "امرأة تنظر إلى ببغاء أحمر في قفير زجاجي والنخيل حولها",
    correct: 8
};

HELP_DATA["lesen3_exam25_q8"] = {
    text: "Nach rechts, nach links oder geradeaus? - Sie möchten mit Ihrem zehnjährigen Sohn في der freien Natur einen abenteuerlichen und unterhaltsamen Nachmittag verbringen.",
    meaning: "حديقة متاهة لجميع الأعمار بمسافة 4 كيلومترات وأبراج مراقبة",
    keywords: ["Irrgarten = حديقة متاهة", "Labyrinth = متاهة", "Familie = عائلة", "Aussichtsturm = برج مراقبة", "Nervenkitzel = تشويق"],
    simplified: "متاهة خضراء عملاقة مع أبراج للعائلات والأطفال",
    imagine: "ولد صغير يركض في ممر بين شجيرات طويلة وأبوه يتبعه ويضحكان",
    correct: 9
};

// ========== Exam 26: Haushaltshilfe ==========

HELP_DATA["lesen3_exam26_q1"] = {
    text: "Brauchen Sie Unterstützung im Haushalt? - Ein Bekannter sucht eine Haushaltshilfe, die manchmal im Garten hilft.",
    meaning: "مساعدة منزلية للتنظيف والكي و الطهي وأعمال الحديقة ورياض الأطفال",
    keywords: ["Haushalt = منزل", "Gartenarbeit = أعمال حديقة", "zuverlässig = موثوق", "Erfahrung = خبرة"],
    simplified: "مساعدة منزلية تعتني بالتنظيف والحديقة والطبخ",
    imagine: "رجل واقف أمام بابه يجلس مع امرأة تحمل مكنسة وجزازة عشب",
    correct: 0
};

HELP_DATA["lesen3_exam26_q2"] = {
    text: "Intensivkurs zur Dekorateurin - Eine Bekannte möchte lernen, wie man Schaufenster gestaltet.",
    meaning: "دورة تركيز لمدة أربعة أسابيع لتعلم فن التزيين وعرض المنتجات في المتاجر",
    keywords: ["Dekorateurin = مزينة", "Auslagen = واجهات عرض", "Verkaufsräume = قاعات بيع", "Werkstoffe = مواد", "Arbeitstechniken = تقنيات عمل"],
    simplified: "دورة تدريبية لتصميم وتزيين واجهات المتاجر الجذابة",
    imagine: "امرأة تعلق ملابسا ملونة على مانيكان في واجهة زجاجية",
    correct: 1
};

HELP_DATA["lesen3_exam26_q3"] = {
    text: "TORTEN UND MEHR... - Eine Freundin möchte eine besondere Party für ihre siebenjährige Tochter organisieren.",
    meaning: "دورة طبخ كب كيك للأطفال مع تزيين وتصميم للحفلات الخاصة",
    keywords: ["Cupcakes = كب كيك", "Kinder = أطفال", "Geburtstagsfeiern = حفلات عيد ميلاد", "dekorieren = تزيين", "Spritzbeutel = كيس تزيين"],
    simplified: "حفلة تعلم الأطفال تزيين وتزيين الكب كيك",
    imagine: "أطفال صغار يرتدون مآزر وممسكين بأنابيب كريمة ملونة",
    correct: 2
};

HELP_DATA["lesen3_exam26_q4"] = {
    text: "BÄCKEREI - KONDITOREI BROTECKE - Eine Freundin möchte einmal einen Tag lang في einer Bäckerei arbeiten.",
    meaning: "فرصة تدريب وزيارة لمخبز لتعلم مهن الخباز والحلواني",
    keywords: ["Ausbildungsmöglichkeiten = فرص تدريب", "Bäcker = خباز", "Konditor = حلواني", "Schnuppertag = يوم تعريفي", "Praktikum = تدريب عملي"],
    simplified: "تجربة عمل ليوم واحد في مخبز لصنع الخبز والحلويات",
    imagine: "امرأة تعجن عجينة في مخبز والفرن يخرج خبزا ذهبيا",
    correct: 3
};

HELP_DATA["lesen3_exam26_q5"] = {
    text: "Während der dreijährigen Ausbildung zur Buchhändlerin - Ihr Neffe liest gerne und möchte sein Hobby zu seinem Beruf machen.",
    meaning: "تدريب لمدة ثلاث سنوات لتصبح بائع كتب مع تعلم تنظيم الفعاليات",
    keywords: ["Buchhändlerin = بائعة كتب", "Ausbildung = تدريب", "Sortiment = تشكيلة", "Events = فعاليات", "Autorenlesungen = قراءات كُتّاب"],
    simplified: "فرصة تدريب في مكتبة لتحب الكتب وتحب العمل مع الناس",
    imagine: "شاب يرتب كتبا على رف طويل وقارئ يختار أحدها مبتسما",
    correct: 4
};

HELP_DATA["lesen3_exam26_q6"] = {
    text: "Rebecca, 38. Ich bin auf der Suche nach Familien - Ihre Mutter braucht jemanden, der im Haushalt hilft und manchmal kocht.",
    meaning: "مساعدة منزلية ذات خبرة للتنظيف والكي وإعداد الوجبات ورعاية الأطفال",
    keywords: ["Unterstützung = دعم", "Haushalt = منزل", "Kinderbetreuung = رعاية أطفال", "Mahlzeiten zubereiten = إعداد وجبات"],
    simplified: "مساعدة منزلية موثوقة تنظف وتطبخ وتعتنى بالأطفال",
    imagine: "امرأة تغسل أطباقا في مطبخ كبير وطفل صغير يأكل بجانبها",
    correct: 5
};

HELP_DATA["lesen3_exam26_q7"] = {
    text: "LIZZIS BACKSTUBE - Sie möchten für Ihren Sohn eine Geburtstagstorte bestellen. Ihr Sohn verträgt keine Laktose.",
    meaning: "مخبز مخصص للحلويات يقدم كعكات خالية من الجلوتين ولاكتوز ونباتية حسب الطلب",
    keywords: ["Konditorei = محل حلويات", "Hochzeitstorten = كعكات زفاف", "laktosefrei = خال من اللاكتوز", "glutenfrei = خال من الجلوتين", "vegan = نباتي"],
    simplified: "تورتات مخصصة حسب الطلب لمرضى الحساسية و نباتيين",
    imagine: "طفل صغير ينظر إلى كعكة ملونة مكتوب عليها اسمه بطريقة سحرية",
    correct: 8
};

HELP_DATA["lesen3_exam26_q8"] = {
    text: "Die Produktion und der Verbrauch von Kunststoff steigen - Sie möchten في Ihrem Haushalt weniger Plastik verwenden.",
    meaning: "أفكار ونصائح لتقليل استخدام البلاستيك في المنزل بشكل تدريجي",
    keywords: ["Kunststoff = بلاستيك", "Verpackungsmüll = نفايات تغليف", "Haushalt = منزل", "verzichten = الاستغناء عن"],
    simplified: "دليل عملي للاستغناء التدريجي عن البلاستيك في بيتك",
    imagine: "سيدة تخرج بضائع من أكياس قماشية وتضعها في برطمانات زجاجية",
    correct: 9
};

// ========== Exam 27: Einwanderung ==========

HELP_DATA["lesen3_exam27_q1"] = {
    text: "14.01. - 10:00 Uhr (VOX) McLeods Töchter - Sie möchten sich einen Dokumentarfilm über die Einwanderung nach Australien und über den damit verbundenen Prozess ansehen.",
    meaning: "فيلم درامي عن إيطالي يعيش بطريقة غير شرعية في أستراليا ويواجه مشاكل الهجرة",
    keywords: ["Einwanderungsbehörde = دائرة الهجرة", "Australien = أستراليا", "illegal = غير قانوني", "Aufenthaltsgenehmigung = تصريح إقامة"],
    simplified: "قصة عاشق إيطالي في خطر الترحيل من أستراليا",
    imagine: "رجل وامرأة يقفان أمام مكتب هجرة ووجههما متوتر",
    correct: 0
};

HELP_DATA["lesen3_exam27_q2"] = {
    text: "14.01. - 16:00 Uhr (VOX) auf und davon - Ein junges Mädchen möchte später als Au-pair oder Austauschschülerin ins Ausland gehen deshalb interessiert es sich für das Thema.",
    meaning: "وثائقي عن تجارب شباب ألمانيا في الخارج كمربيات أطفال أو طلاب تبادل",
    keywords: ["Au-pair = مربية أطفال", "Austauschschüler = طالب تبادل", "Ausland = خارج البلاد", "Dokumentation = فيلم وثائقي"],
    simplified: "قصة طالبة ألمانية تترك عائلتها لتجربة الحياة في الخارج",
    imagine: "فتاة تحمل حقيبة ظهر وتقف أمام طائرة تبتسم",
    correct: 1
};

HELP_DATA["lesen3_exam27_q3"] = {
    text: "SPIEGEL TV Thema: Die Chemie des Todes - Ein Mann interessiert sich für die Aufdeckung von Verbrechen, die früher nicht gelöst werden konnten.",
    meaning: "فيلم وثائقي عن تقنيات الطب الشرعي الحديثة لحل جرائم القتل المستعصية",
    keywords: ["Forensiker = طب شرعي", "Kriminaltechnik = تقنيات إجرامية", "Mordfälle = قضايا قتل", "mikroskopisch = مجهري"],
    simplified: "كيف تحل الشرطة الجرائم القديمة ببصمات مجهرية تحت الميكروسكوب",
    imagine: "رجل يرتدي معطفا أبيض يفحص عينة تحت مجهر في مختبر",
    correct: 3
};

HELP_DATA["lesen3_exam27_q4"] = {
    text: "Sie haben großes Interesse daran, wie mithilfe von Computertechnik das Wetter an verschiedenen Orten der Welt vorhergesagt werden kann.",
    meaning: "فيلم وثائقي عن آلية عمل الطقس مع رسومات حاسوبية وأرشيف نادر",
    keywords: ["Wetter = طقس", "Dokumentation = فيلم وثائقي", "Computeranimationen = رسومات حاسوبية", "Wettermaschine = آلة الطقس"],
    simplified: "فيلم يشرح خفايا الطقس في أقصى بقاع الأرض",
    imagine: "شخص يقف أمام خريطة الطقس على شاشة عملاقة وعيون الشاشة على حركة السحب",
    correct: 4
};

HELP_DATA["lesen3_exam27_q5"] = {
    text: "Jamie At Home (RTL2) Samstags - Sie suchen ein Gartenmagazin, aus dem Sie alles über den Anbau von Gemüse- und Obstsorten erfahren können.",
    meaning: "برنامج طبخ ياباني عن زراعة الخضار واستخدامها مباشرة من الحديقة للمطبخ",
    keywords: ["Garten = حديقة", "Gemüse = خضروات", "Rezepte = وصفات", "anbauen = زراعة", "ernten = حصاد"],
    simplified: "طباخ مشهور يزرع خضاره بنفسه ويطهوه بأسهل طريقة",
    imagine: "رجل يقف في حديقة ويمسك طماطم حمراء طازجة في يده",
    correct: 6
};

HELP_DATA["lesen3_exam27_q6"] = {
    text: "Die Wahrheit und nichts als die Wahrheit - Sie möchten sich eine Quizsendung ansehen, an der Familienmitglieder teilnehmen.",
    meaning: "برنامج مسابقات تلفزيوني عائلي يربح المشاركون المال عن الإجابة الصادقة على أسئلة شخصية",
    keywords: ["Show = برنامج", "Quiz = مسابقة", "Familien = عائلات", "Wahrheit = حقيقة", "Fragen = أسئلة"],
    simplified: "برنامج مسابقات عائلي يجيب أفراد الأسرة عن أسئلة محرجة",
    imagine: "عائلة تجلس على منصة واستوديو تلفزيوني وجمهور يصفق",
    correct: 7
};

HELP_DATA["lesen3_exam27_q7"] = {
    text: "ML Mona Lisa (ZDF) - Traumurlaub ganz anders - Eine Bekannte von Ihnen sucht einen Reisefilm, ähnlich dem 'Traumschiff', في dem während eines Reiseaufenthaltes alles über den Aufenthaltsort gezeigt wird.",
    meaning: "فيلم عن طبيبة أسنان تتطوع في أكبر مستشفى عائم في العالم في إفريقيا",
    keywords: ["Ärzteschiff = سفينة طبية", "Urlaub = عطلة", "Afrika = إفريقيا", "Kreuzfahrtschiff = سفينة سياحية", "Klinik = عيادة"],
    simplified: "رحلة استثنائية على سفينة مستشفى وليس سفينة سياحية",
    imagine: "امرأة ترتدي معطف طبيب أبيض تقف على ظهر سفينة كبيرة بجانبها معدات طبية",
    correct: 8
};

HELP_DATA["lesen3_exam27_q8"] = {
    text: "Bauer sucht Frau - Ein Mann interessiert sich für das Bauernleben und sucht deshalb eine passende Sendung.",
    meaning: "برنامج تلفزيوني واقعي عن مزارعين ألمان يبحثون عن شريكات لحياتهم في مزارعهم",
    keywords: ["Bauer = مزارع", "Bauernhof = مزرعة", "Schweine = خنازير", "Biobauer = مزارع عضوي", "Familie = عائلة"],
    simplified: "برنامج عن مزارعين حقيقيين يبحثون عن حب في الريف الألماني",
    imagine: "رجل واقف في حظيرة خنازير وامرأة تبتسم بجانبه وجماهير تشاهد من الشاشة",
    correct: 9
};

// ========== Exam 28: Musikinstrumente ==========

HELP_DATA["lesen3_exam28_q1"] = {
    text: "Deutsch im Beruf - An Ihrem Arbeitsplatz müssen Sie viele deutsche Geschäftsbriefe schreiben, sind aber oft unsicher und suchen einen entsprechenden Kurs.",
    meaning: "دورة يوم السبت لتعلم قواعد كتابة الرسائل والإيميلات الرسمية باللغة الألمانية",
    keywords: ["Geschäftsbriefe = رسائل عمل", "E-Mails = بريد إلكتروني", "Telefonieren = مكالمات هاتفية", "Rechtschreibung = إملاء", "Grammatik = قواعد"],
    simplified: "دورات تحسين الألمانية الكتابية لأغراض العمل والمراسلات",
    imagine: "موظف يمسك قلمه ويصحح رسالة أمام حاسبه المكتبي",
    correct: 1
};

HELP_DATA["lesen3_exam28_q2"] = {
    text: "Grundlagen der Pressearbeit für Vereine - Ihr Freund ist Vorsitzender eines Golfclubs und muss immer wieder Informationen an die Medien geben. Er möchte diese Aufgabe professionell erledigen.",
    meaning: "دورة تعليم أساسيات النشر الصحفي للجمعيات: كيف تكتب بيانا صحفيا وكيف تجذب وسائل الإعلام",
    keywords: ["Pressearbeit = عمل صحفي", "Vereine = جمعيات", "Pressemitteilung = بيان صحفي", "Medien = وسائل إعلام", "Seminar = ندوة"],
    simplified: "دورة تدريبية في كتابة البيانات الصحفية وإدارة العلاقات الإعلامية",
    imagine: "رجل واقف على منصة ويمسك ميكروفونا أمامه جمهور من الصحفيين",
    correct: 2
};

HELP_DATA["lesen3_exam28_q3"] = {
    text: "Zeichnen für Anfänger - Eine Bekannte wird zur Erzieherin ausgebildet. Sie sucht einen Kurs, في dem sie die Fähigkeit zur bildlichen Darstellung entwickeln kann.",
    meaning: "دورة رسم للمبتدئين لتعلم رسم الأجسام والمنظورات مع قائمة الأدوات المطلوبة",
    keywords: ["Zeichnen = رسم", "Anfänger = مبتدئين", "Proportionen = تناسق", "Perspektive = منظور", "Bleistift = قلم رصاص"],
    simplified: "دورة تعليم الرسم من الصفر بقلم الرصاص وأساسيات المنظور",
    imagine: "امرأة ترسم إناء زهور على ورقة وقلم رصاص بين أصابعها",
    correct: 3
};

HELP_DATA["lesen3_exam28_q4"] = {
    text: "Physiotherapie - Sie suchen eine Berufsausbildung, bei der Sie viel mit Menschen zu tun haben. Und Sie interessieren sich für alles, was mit Gesundheit zu tun hat.",
    meaning: "تدريب مهني لمدة أربعة فصول دراسية لتصبح معالج طبيعي بمتوسط مؤهل واختبار قبول",
    keywords: ["Physiotherapie = علاج طبيعي", "Ausbildung = تدريب", "Patienten = مرضى", "Gesundheit = صحة", "Behandlung = علاج"],
    simplified: "تدريب معتمد لمدة عامين في العلاج الطبيعي لمساعدة المرضى",
    imagine: "رجل يضع يده على كتف امرأة ويساعدها على المشي",
    correct: 4
};

HELP_DATA["lesen3_exam28_q5"] = {
    text: "Entscheidungen leichter fällen - Ihre Freundin zögert häufig, sich auf eine Sache festzulegen. Hat sie endlich einen Entschluss gefasst, bereut sie diesen bisweilen",
    meaning: "دورة لتعلم تقنيات اتخاذ القرارات الصحيحة بثقة وتقبل النتائج",
    keywords: ["Entscheidungen = قرارات", "Techniken = تقنيات", "Zufriedenheit = رضا", "priorisieren = تحديد أولويات"],
    simplified: "كيف تتخذ قرارات أفضل وتتوقف عن التردد والندم",
    imagine: "امرأة جالسة أمام اثنين من الأبواب واحدة مفتوحة والأخرى مغلقة وحائرة",
    correct: 5
};

HELP_DATA["lesen3_exam28_q6"] = {
    text: "Traditionelle thailändische Speisen - Sie wollen Rezepte aus der fernöstlichen Küche kennen lernen.",
    meaning: "دورة طبخ طعام تايلاندي أصيل في عطلة نهاية الأسبوع مع أكلات مشهورة",
    keywords: ["thailändische Küche = مطبخ تايلاندي", "Gerichte = أطباق", "Vorspeisen = مقبلات", "Salate = سلطات", "weniger Kalorien = أقل سعرات"],
    simplified: "دورات تعلم الطبخ التايلاندي مع الحساء الحار والنودلز",
    imagine: "امرأة تقطع الخضار في مقلاة وتخرج منها ألسنة بخار ورائحة حارة",
    correct: 6
};

HELP_DATA["lesen3_exam28_q7"] = {
    text: "Referate und Hausarbeiten erfolgreich meistern - Sie beginnen gerade mit Ihrem Studium, beherrschen die wissenschaftlichen Arbeitstechniken noch nicht.",
    meaning: "دورة لتعلم كتابة الأبحاث الجامعية وإعداد العروض التقديمية والمراجع العلمية",
    keywords: ["Referate = عروض تقديمية", "Hausarbeiten = أبحاث", "Universität = جامعة", "Zitieren = اقتباس", "Klausuren = امتحانات"],
    simplified: "دورة في كتابة الأبحاث والعروض التقديمية للطلاب الجدد",
    imagine: "طالب يجلس أمام كومة كبيرة من الكتب والمراجع وأوراق بيضاء عديدة",
    correct: 7
};

HELP_DATA["lesen3_exam28_q8"] = {
    text: "Sie haben sich auf eine Arbeitsstelle beworben und wollen sich gut vorbereiten, falls man Sie persönlich kennen lernen möchte.",
    meaning: "دورة تحضيرية لمقابلات العمل مع تمارين لعب الأدوار وتسجيلات فيديو",
    keywords: ["Vorstellungsgespräch = مقابلة عمل", "Selbstpräsentation = تقديم ذات", "Rollenspiele = تمثيل أدوار", "Feedback = تغذية راجعة", "Videoaufzeichnungen = تسجيلات فيديو"],
    simplified: "دورة تحضيرية لمقابلات العمل مع محاكاة حقيقية",
    imagine: "شاب يقف أمام لجنة ويداه ترتجفان ويسجل نفسه على كاميرا الهاتف",
    correct: 9
};

// ========== Exam 29: Musikinstrumente (معدل) - نفس الأسئلة الصحيحة ==========

HELP_DATA["lesen3_exam29_q1"] = {
    text: "Deutsch im Beruf - An Ihrem Arbeitsplatz müssen Sie viele deutsche Geschäftsbriefe schreiben, sind aber oft unsicher.",
    meaning: "دورة تحسين التواصل الكتابي والهاتفي في العمل لتقليل الأخطاء",
    keywords: ["Geschäftsbriefe = رسائل عمل", "Rechtschreibung = إملاء", "E-Mails = بريد إلكتروني", "Telefonieren = مكالمات هاتفية"],
    simplified: "دورات اللغة الألمانية التطبيقية للشركات والموظفين",
    imagine: "موظفة تصلح رسالة بريد إلكتروني على حاسوبها",
    correct: 1
};

HELP_DATA["lesen3_exam29_q2"] = {
    text: "Grundlagen der Pressearbeit für Vereine - Ihr Freund ist Vorsitzender eines Golfclubs ويريد إتقان نشر أخبار ناديه.",
    meaning: "دورة تدريبية في إدارة العلاقات الإعلامية وإعداد التقارير للجمعيات",
    keywords: ["Pressearbeit = عمل صحفي", "Vereine = جمعيات", "Pressemitteilung = بيان صحفي", "Medien = وسائل إعلام"],
    simplified: "تعليم كتابة التقارير الإعلامية للجمعيات الأهلية",
    imagine: "رجل يوزع أوراقا على صحفيين وصورته تظهر على شاشة خلفية",
    correct: 2
};

HELP_DATA["lesen3_exam29_q3"] = {
    text: "Zeichnen für Anfänger - Eine Bekannte تدرس لتصبح مربية أطفال وتحتاج مهارات الرسم.",
    meaning: "دورة رسم لأساسيات المنظور والضوء والظل لغير الفنانين",
    keywords: ["Zeichnen = رسم", "Anfänger = مبتدئين", "Perspektive = منظور", "Bleistift = قلم رصاص", "Radiergummi = ممحاة"],
    simplified: "أساسيات الرسم بقلم الرصاص لعشاق الفن",
    imagine: "يد ترسم خطوطا متقاطعة على دفتر أبيض لتشكيل مكعب",
    correct: 3
};

HELP_DATA["lesen3_exam29_q4"] = {
    text: "Physiotherapie - Sie suchen تدريبا صحيا مع التعامل المباشر مع المرضى.",
    meaning: "برنامج تدريب معتمد في العلاج الطبيعي يؤهل للعمل في المستشفيات والعيادات",
    keywords: ["Physiotherapie = علاج طبيعي", "Ausbildung = تدريب", "Patienten = مرضى", "Heilung = شفاء", "Behandlung = علاج"],
    simplified: "تدريب عملي في العلاج الطبيعي مع شهادة رسمية",
    imagine: "معالج يضع يديه على ركبة مريضة وتظهر عليها الراحة",
    correct: 4
};

HELP_DATA["lesen3_exam29_q5"] = {
    text: "Entscheidungen leichter fällen - Ihre Freundin تعاني من التردد الدائم في اختياراتها.",
    meaning: "دورة في علم اتخاذ القرار وتقنيات تحليل الخيارات والخروج من دائرة الندم",
    keywords: ["Entscheidungen = قرارات", "Techniken = تقنيات", "Planung = تخطيط", "Analyse = تحليل"],
    simplified: "كيف تتخذ قراراتك بوضوح وتتوقف عن التردد والنوم",
    imagine: "امرأة جالسة أمام كتاب وقلم ووجهها يعلوه علامة تعجب",
    correct: 5
};

HELP_DATA["lesen3_exam29_q6"] = {
    text: "Traditionelle thailändische Speisen - تريد تعلم وصفات من المطبخ التايلاندي.",
    meaning: "دورة تعليم الأطباق التايلاندية الشهية كالحساء البيكار والسلطات",
    keywords: ["thailändische Küche = مطبخ تايلاندي", "Vorspeisen = مقبلات", "Hauptgerichte = أطباق رئيسية", "Salate = سلطات"],
    simplified: "دورات طبخ تايلاندي ياباني مع نكهات حارة حلوة",
    imagine: "امرأة ترتدي قبعة طبخ وتتبل مقلاة بالبهارات الصفراء والحمراء",
    correct: 6
};

HELP_DATA["lesen3_exam29_q7"] = {
    text: "Referate und Hausarbeiten erfolgreich meistern - أنت طالب جامعي جديد وتحتاج لتعلم كتابة الأبحاث.",
    meaning: "دورة في مهارات البحث العلمي وإعداد العروض التقديمية والرسائل الأكاديمية",
    keywords: ["Referate = عروض تقديمية", "Hausarbeiten = أبحاث", "Zitieren = اقتباس", "Klausuren = امتحانات", "E-Mail = بريد إلكتروني"],
    simplified: "دورة في أساليب البحث والكتابة الأكاديمية للطلاب الجدد",
    imagine: "طالب يمسك موسوعة ويبحث بين الصفحات ووجهه متحمس",
    correct: 7
};

HELP_DATA["lesen3_exam29_q8"] = {
    text: "Sie haben sich auf eine Arbeitsstelle beworben - وتحتاج للتحضير للمقابلة الشخصية.",
    meaning: "دورة تدريبية في مهارات المقابلة الشخصية مع تمارين عملية وتصحيح أخطاء",
    keywords: ["Vorstellungsgespräch = مقابلة عمل", "Selbstpräsentation = تقديم ذات", "Rollenspiele = تمثيل أدوار", "Videoaufzeichnungen = تسجيلات فيديو"],
    simplified: "دورة محاكاة لمقابلات العمل مع تغذية راجعة فورية",
    imagine: "شاب يضبط ربطة عنقه أمام مرآة ويتدرب على الابتسام",
    correct: 9
};

// ========== Exam 30: Arbeitsorganisation ==========

HELP_DATA["lesen3_exam30_q1"] = {
    text: "Zeitmanagement - Eine Kollegin kann ihren Arbeitsbereich nicht gut strukturieren و deshalb Probleme hat, ihre Aufgaben rechtzeitig zu erledigen",
    meaning: "دورة في إدارة الوقت وتحديد الأولويات وتجنب مضيعات الوقت اليومية",
    keywords: ["Zeitmanagement = إدارة وقت", "Stress = ضغط", "Prioritäten = أولويات", "Zeitdiebe = مضيعات وقت", "Tagesablauf = روتين يومي"],
    simplified: "دورة في تنظيم الوقت والتخلص من عوامل التشتيت",
    imagine: "امرأة تحمل مفكرة وقلم وساعة منبه خلفها على الطاولة",
    correct: 0
};

HELP_DATA["lesen3_exam30_q2"] = {
    text: "Hilfe mein Haustier ist krank! - Ein Bekannter hat einen kranken Hund und sucht tierärztliche Hilfe.",
    meaning: "ورشة إسعافات أولية للحيوانات الأليفة وكيفية التعرف على علامات المرض",
    keywords: ["Haustier = حيوان أليف", "krank = مريض", "erste Hilfe = إسعاف أولي", "Tierarzt = طبيب بيطري", "Fütterung = تغذية"],
    simplified: "دورة تعليمية في إسعاف الحيوانات الأليفة وعلاجها",
    imagine: "رجل يضع يده على رقبة كلبه وهو نائم على سرير صغير",
    correct: 1
};

HELP_DATA["lesen3_exam30_q3"] = {
    text: "Schwiegermütter - Schwiegertöchter - Eine Bekannte möchte ihre Beziehung zur Mutter des Mannes verändern.",
    meaning: "دورة تحسين العلاقة بين الزوجة ووالدة الزوج بطرق احترام وحل النزاعات",
    keywords: ["Schwiegermütter = حمات", "Schwiegertöchter = كنت", "Konflikte = نزاعات", "Miteinander = تعايش", "Respekt = احترام"],
    simplified: "دورة في التعامل الإيجابي مع حماتك وحل المشكلات",
    imagine: "امرأتان تجلسان على طاولة وكل منهما تضع يديها على فنجان شاي",
    correct: 2
};

HELP_DATA["lesen3_exam30_q4"] = {
    text: "Mit Männern Gespräche führen - Ein Freund möchte etwas über Konfliktgespräche mit Frauen erfahren.",
    meaning: "دورة للنساء حول كيفية التواصل الفعال مع الرجال في العمل وحل النزاعات",
    keywords: ["Gespräche = محادثات", "Männer = رجال", "Konfliktgespräche = محادثات نزاع", "Frau = امرأة", "Kommunikation = تواصل"],
    simplified: "دورات في فن الحوار مع الرجال وحل الخلافات بذكاء",
    imagine: "امرأة تقف أمام رجل وكلاهما يحاول إقناع الآخر بأوراق في يديه",
    correct: 3
};

HELP_DATA["lesen3_exam30_q5"] = {
    text: "Überwinde deinen inneren Schweinehund - Eine Freundin schiebt Dinge, die ihr keinen Spaß machen, immer vor sich her.",
    meaning: "دورة في التغلب على التسويف والمماطلة وتنفيذ المهام غير المحببة فورا",
    keywords: ["hinauszögern = تأجيل", "überwinde = تتغلب", "Strategien = استراتيجيات", "unangenehme Dinge = أشياء غير محببة", "sofort erledigen = تنفيذ فورا"],
    simplified: "كيف تتخلص من عادة تأجيل الأشياء غير المريحة",
    imagine: "امرأة جالسة أمام كومة من الأعمال غير المنتهية ورجل يشير لها من بعيد بعلامة تحفيز",
    correct: 5
};

HELP_DATA["lesen3_exam30_q6"] = {
    text: "Flirten leicht gemacht - Ein Bekannter möchte leichter Kontakt zu anderen Menschen finden.",
    meaning: "دورة في فن المجاملة والغزل والتواصل غير اللفظي للمبتدئين",
    keywords: ["Flirten = غزل", "Kontakt = تواصل", "Annäherung = تقارب", "Augen = عيون", "Lächeln = ابتسامة", "Wörter = كلمات"],
    simplified: "دورة تعلم فنون المغازلة والتواصل اللطيف مع الآخرين",
    imagine: "شاب يبتلع ريقته ويحاول بدء محادثة مع فتاة في المقهى",
    correct: 6
};

HELP_DATA["lesen3_exam30_q7"] = {
    text: "Kommunikation - Eine Freundin möchte Strategien erlernen, wie man wirkungsvoller argumentiert und dadurch leichter seine Ziele erreicht.",
    meaning: "دورة في مهارات التواصل الفعال وتقنيات الإقناع وتحقيق الأهداف",
    keywords: ["Kommunikation = تواصل", "argumentieren = يجادل", "Ziele erreichen = تحقيق أهداف", "Gesprächsverhalten = سلوك محادثة", "durchsetzen = يفرض"],
    simplified: "دورة في تقنيات الكلام والإقناع لتحقيق أهدافك بثقة",
    imagine: "امرأة واقفة على منصة وجمهور كبير أمامها وأصابعها تشير إلى شريحة عرض",
    correct: 8
};

HELP_DATA["lesen3_exam30_q8"] = {
    text: "Mit Hunden sprechen - Ein Bekannter hat eine Hundepension. Er glaubt, dass er die ihm anvertrauten Tiere oft missversteht.",
    meaning: "دورة في فهم لغة جسد الكلاب وتحليل سلوكها لتحسين التواصل معها",
    keywords: ["Hunde = كلاب", "Körpersprache = لغة جسد", "Reaktionen = ردود فعل", "verstehen = فهم", "Druck = ضغط"],
    simplified: "دورة في تفسير حركات الكلاب والتواصل معها بفعالية",
    imagine: "رجل جالس إلى كلبه ويداه على الأرض وكلاهما ينظران إلى بعضهما البعض بتركيز",
    correct: 9
};

// ========== Exam 31: Hunde ==========

HELP_DATA["lesen3_exam31_q1"] = {
    text: "Herbstzeit ist Lesezeit! - Ein Bekannter möchte alte Romane verschenken.",
    meaning: "سوق خيري لبيع الكتب المستعملة والأقراص المدمجة بأسعار من 1 يورو",
    keywords: ["Bücherflohmarkt = سوق كتب مستعملة", "Romane = روايات", "CDs = أقراص", "Spielesammlungen = ألعاب مجمعة", "soziale Zwecke = أغراض خيرية"],
    simplified: "سوق لبيع الكتب والقصص القديمة بأسعار رمزية",
    imagine: "رجل يضع كيسا كبيرا من الكتب على طاولة خيرية",
    correct: 0
};

HELP_DATA["lesen3_exam31_q2"] = {
    text: "In unserem Shop finden Sie mehr als 3000 verschiedene Produkte - Ein Freund braucht nur noch einen Hundekorb für seinen kleinen Hund.",
    meaning: "متجر إلكتروني متخصص في مستلزمات الكلاب مع خصم للمشترين الجدد",
    keywords: ["Hundezubehör = مستلزمات كلاب", "Körbe = سلال", "Schlafplätze = أماكن نوم", "Spielzeug = ألعاب", "Online-Hundeshop = متجر كلاب إلكتروني"],
    simplified: "متجر إلكتروني لكل شيء يحتاجه كلبك من سرير إلى طوق ولعبة",
    imagine: "شخص يضغط زر الشراء على هاتفه وظهور صورة سرير كلب بني جميل",
    correct: 1
};

HELP_DATA["lesen3_exam31_q3"] = {
    text: "Auenbacher Bach-Verein - Ihr Mann singt gerne und möchte Mitglied في einem Gesangverein werden.",
    meaning: "جوقة غنائية ترحب بأعضاء جدد بدون حاجة لتدريب صوتي مسبق",
    keywords: ["Chor = جوقة", "Mitglied = عضو", "Gesangsausbildung = تدريب غنائي", "Proben = تدريبات", "Musikschule = مدرسة موسيقى"],
    simplified: "فرقة غنائية تبحث عن أعضاء جدد بدون مؤهلات صوتية مسبقة",
    imagine: "رجل واقف بين جوقة ويفتح فمه ليغني وورقة موسيقية أمامه",
    correct: 3
};

HELP_DATA["lesen3_exam31_q4"] = {
    text: "Ihre Tochter wünscht sich einen Hund. Sie möchten sich zuerst informieren",
    meaning: "محاضرة توعوية عن كل ما يجب مراعاته قبل شراء كلب: السكن والوقت والتكلفة",
    keywords: ["Hund kaufen = شراء كلب", "informieren = استعلام", "Mietvertrag = عقد إيجار", "finanzielle Mittel = إمكانيات مالية", "Lebenssituation = حالة معيشية"],
    simplified: "محاضرة إرشادية قبل اتخاذ قرار تربية الكلب في المنزل",
    imagine: "امرأة جالسة بين والديها وورقة بقائمة شروط وبجانبهما كلب صغير",
    correct: 6
};

HELP_DATA["lesen3_exam31_q5"] = {
    text: "Sie möchten einen Kulturverein gründen und sich informieren",
    meaning: "محاضرة عن القوانين والإجراءات الرسمية لتأسيس الجمعيات في ألمانيا",
    keywords: ["Verein gründen = تأسيس جمعية", "gesetzliche Bestimmungen = أحكام قانونية", "Vortragsreihe = سلسلة محاضرات", "kostenlos = مجاني"],
    simplified: "محاضرة مجانية عن كيفية تأسيس جمعية ثقافية في ألمانيا",
    imagine: "رجال ونساء يجلسون في قاعة اجتماعات ويستمعون إلى محام يشرح أوراقا رسمية",
    correct: 8
};

HELP_DATA["lesen3_exam31_q6"] = {
    text: "Vier herzerliebste Mopswelpen - Sie suchen nach einem jungen Hund für Ihre Familie.",
    meaning: "جرو مخلص من مَوْبس مع شهادة صحية وتطعيمات كاملة ينمو بين قطط وخيول وأطفال",
    keywords: ["Mopswelpen = جرو مَوبْس", "Familienhunde = كلاب عائلية", "gechipt = مزود بشريحة", "entwurmt = معالج من الديدان", "tierärztliches Gesundheitszeugnis = شهادة صحية بيطرية"],
    simplified: "جرو صغير للتبني في بيئة عائلية مع قطط وخيول وأطفال",
    imagine: "أم وأب وطفل صغير يحملون جروا صغيرا أسود وأبوه يضحك",
    correct: 9
};

// ========== Exam 32: Schnelle Wasserfahrzeuge ==========

HELP_DATA["lesen3_exam32_q1"] = {
    text: "Die Nordseeküste wirbt für sich am Rhein - Ein Kollege interessiert sich für schnelle Wasserfahrzeuge.",
    meaning: "عرض سفينة كاتاماران حمراء سريعة تصل لسرعة 74 كيلومترا في الساعة تبحر على نهر الراين",
    keywords: ["Katamaran = كاتاماران", "schnell = سريع", "Knoten = عقدة بحرية", "Passagierschiff = سفينة ركاب", "Rhein = راين"],
    simplified: "سفينة حمراء سريعة جدا تبحر على نهر الراين لزوار المعرض",
    imagine: "قارب أحمر طويل يشق الماء بسرعة ويتطاير الرذاذ خلفه",
    correct: 0
};

HELP_DATA["lesen3_exam32_q2"] = {
    text: "Wattwanderung - Ein Bekannter möchte barfuß am Meer spazieren gehen.",
    meaning: "جولة مشي في الوحل على شواطئ بحر الشمال مع مرشد وزيارة جزر المد",
    keywords: ["Wattwanderung = مشي في المد", "barfuß = حافي القدمين", "Nordsee = بحر الشمال", "Meeresboden = قاع البحر", "Ebbe = جزر"],
    simplified: "نزهة حافية الأقدام في الطين ومياه بحر الشمال مع دليل سياحي",
    imagine: "رجل حافي القدمين يمشي في وحل ناعم وسمك صغير يقفز بجانبه",
    correct: 1
};

HELP_DATA["lesen3_exam32_q3"] = {
    text: "Ihre Nachbarn möchten, dass ihre 7- und 9-jährigen Töchter mehr über den Umgang mit Tieren lernen.",
    meaning: "جولات تعليمية شهرية في حديقة حيوان أوبل للأطفال مع برامج العطلات وركن للمداعبة وركوب الجمال",
    keywords: ["Opel-Zoo = حديقة حيوان أوبل", "pädagogische Führungen = جولات تعليمية", "Kinder = أطفال", "Streichelzoo = ركن المداعبة", "Abenteuerspielplatz = ملعب مغامرات"],
    simplified: "زيارة تعليمية لحديقة الحيوان مع برامج خاصة للأطفال",
    imagine: "بنتان صغيرتان تمدان أيديهما لمداعبة ماعز صغير وكلاهما يضحكان",
    correct: 3
};

HELP_DATA["lesen3_exam32_q4"] = {
    text: "Auf den Höhen des Rheins - Ein befreundetes Ehepaar macht gern Tageswanderungen في Gesellschaft.",
    meaning: "جولة مشي جماعية في جبال تاونوس بإطلالة على نهر الراين لمسافات طويلة",
    keywords: ["Wanderung = تنزه", "Gruppe = مجموعة", "Rhein = راين", "festes Schuhwerk = حذاء ثابت", "Gaststätten = مطاعم"],
    simplified: "جولة مشي لمشاهدة مناظر نهر الراين مع دليل ونشاطات أسبوعية",
    imagine: "زوجان واقفان على قمة جبل وأيديهما تشيران إلى نهر أزرق بعيد والناس يصفقون خلفهم",
    correct: 4
};

HELP_DATA["lesen3_exam32_q5"] = {
    text: "Der Wanderladen am Rathausplatz - Eine Bekannte möchte gute Laufschuhe kaufen.",
    meaning: "متجر متخصص في معدات التنزه والتسلق الجبلي مع منتجات أصلية ونصائح احترافية",
    keywords: ["Wanderladen = متجر تنزه", "Markenprodukte = منتجات ماركات", "Stiefel = حذاء", "fachkundige Beratung = استشارة متخصصة", "Bergsteigen = تسلق جبال"],
    simplified: "متجر لبيع أحذية المشي والتسلق والملابس الرياضية الأصلية",
    imagine: "امرأة تجرب حذاء جبلي ثقيل في متجر ومرآة طويلة أمامها",
    correct: 5
};

HELP_DATA["lesen3_exam32_q6"] = {
    text: "Der Rhein und seine Geschichte - Ein Bekannter interessiert sich für die Geschichte der Erde und möchte sich weiterbilden.",
    meaning: "سلسلة محاضرات جامعية عن جيولوجيا نهر الراين وتكون الحفريات قبل ملايين السنين",
    keywords: ["Vortragsreihe = سلسلة محاضرات", "Geologie = جيولوجيا", "Fossilien = حفريات", "Universität = جامعة", "Gesteinsformationen = تشكيلات صخرية"],
    simplified: "محاضرات علمية عن تاريخ نهر الراين الجيولوجي وعمر الأرض",
    imagine: "رجل يحمل صخرة قديمة ويشرح شكلها لجمهور من الطلاب",
    correct: 6
};

HELP_DATA["lesen3_exam32_q7"] = {
    text: "Eine Rheinfahrt, die ist lustig - Ihr Bruder interessiert sich für alte Fahrzeuge und möchte eine Tagesfahrt machen.",
    meaning: "رحلة نهرية على متن باخرة مجداف تاريخية من 1908 مع عشاء وغناء ومواكب أسطورية",
    keywords: ["Schaufelraddampfer = باخرة مجداف", "historisch = تاريخي", "Wein = نبيذ", "Gesang = غناء", "Loreley = لوريلاي"],
    simplified: "رحلة نهرية على سفينة بخارية قديمة مع طعام وشراب وأساطير الراين",
    imagine: "قارب ضخم بعجلات جانبية يتحرك ببطء على الماء ورجل يلوح من على سطح السفينة",
    correct: 7
};

HELP_DATA["lesen3_exam32_q8"] = {
    text: "Geschichte und Geschichten vom Rhein - Ein Freund sammelt Bücher mit den Autogrammen der Autoren.",
    meaning: "معرض تاريخي وأمسيات قراءة مع توقيعات الكُتّاب في مكتبة بينغن",
    keywords: ["Ausstellung = معرض", "Lesungen = قراءات", "Autogrammstunden = ساعات توقيع", "Schriftsteller = كتّاب", "Bibliothek = مكتبة"],
    simplified: "معرض عن أساطير الراين مع جلسات قراءة وتوقيعات للكتّاب",
    imagine: "شاب يقف في طابور وكتاب في يده وكاتب يجلس على طاولة ويوقع له",
    correct: 8
};

// ========== Exam 33: ein paar Tage in Berlin ==========

HELP_DATA["lesen3_exam33_q1"] = {
    text: "Eine Karte, 30 Häuser - Ein Bekannter ist ein paar Tage في Berlin und würde sich gerne verschiedene Kunstausstellungen ansehen.",
    meaning: "بطاقة دخول لمدة 3 أيام لأكثر من 30 متحفا في برلين بسعر مخفض",
    keywords: ["Museumspass = بطاقة متاحف", "Berlin = برلين", "Kunst = فن", "Eintritt = دخول", "Nationalgalerie = معرض وطني"],
    simplified: "بطاقة خصم لدخول المتاحف الفنية والتاريخية في برلين لمدة 3 أيام",
    imagine: "رجل يمسك بطاقة صفراء ويقف أمام بوابة متحف ضخم",
    correct: 0
};

HELP_DATA["lesen3_exam33_q2"] = {
    text: "Berlin Gendarmenmarkt - Eine Bekannte träumt davon, selbst einmal bei einem Film mitzuspielen.",
    meaning: "فرصة للتمثيل ككومبارس في فيلم عن برلين في العشرينيات الذهبية مقابل 75 يورو يوميا",
    keywords: ["Film = فيلم", "Komparsen = كومبارس", "Drehtag = يوم تصوير", "Gage = أجر", "Berlin = برلين"],
    simplified: "فرصة للمشاركة كدور صغير في فيلم تاريخي برليني بأجر يومي",
    imagine: "امرأة تقف أمام كاميرا وتلوح بيدها والمخرج يصرخ آكشن",
    correct: 1
};

HELP_DATA["lesen3_exam33_q3"] = {
    text: "Stadtführungen in Berlin - Eine Freundin sucht einen Nebenjob. Sie würde dabei gerne viel Zeit draußen verbringen.",
    meaning: "وظيفة كمرشد سياحي في برلين لمدة عام مع ساعات عمل مرنة ونظام 450 يورو",
    keywords: ["Stadtführungen = جولات سياحية", "Guide = مرشد", "Nebenjob = عمل جانبي", "Freiberufler = مستقل", "Berlin = برلين"],
    simplified: "فرصة عمل كمرشد سياحي في الهواء الطلق بأجر مرن",
    imagine: "فتاة تقف أمام مجموعة سياحية وتشير إلى مباني تاريخية وكلهم يتابعونها",
    correct: 3
};

HELP_DATA["lesen3_exam33_q4"] = {
    text: "Ihr Cousin ist Student und sucht für die Sommermonate einen Nebenjob.",
    meaning: "مطلوب مساعد في صالة سينما للعمل في العطلة الصيفية 25 ساعة أسبوعيا",
    keywords: ["Aushilfe = مساعد", "Kino = سينما", "Student = طالب", "Sommer = صيف", "Arbeit = عمل"],
    simplified: "وظيفة صيفية في سينما لطالب بمرتب شهري",
    imagine: "شاب يرتدي مئزر سينما ويبيع الفشار على الشباك وابتسامته عريضة",
    correct: 4
};

HELP_DATA["lesen3_exam33_q5"] = {
    text: "Das etwas gemütlichere Berlin - Sie möchten eine besondere Stadtführung في Berlin buchen",
    meaning: "جولة مشي لمدينة فريديناو في برلين تشمل تذوق طعام من ثلاثة مطابخ مختلفة",
    keywords: ["Stadtführung = جولة سياحية", "Berlin = برلين", "kulinarisch = شهي", "Altbauten = مبانٍ قديمة", "Café = مقهى"],
    simplified: "جولة غذائية ثقافية في أحياء برلين المخفية لمدة 3 ساعات",
    imagine: "سائحة تجلس في مقهى وتأكل معجنات إيطالية وكتاب دليل بين يديها",
    correct: 6
};

HELP_DATA["lesen3_exam33_q6"] = {
    text: "Das Comedy Filmfest - Sie möchten mit Freunden einen unterhaltsamen Film anschauen",
    meaning: "فيلم كوميدي رومانسي عن صاحبة متجر شوكولاتة وجارها المزعج في مهرجان الأفلام الكوميدية",
    keywords: ["Comedy = كوميديا", "Filmfest = مهرجان أفلام", "romantisch = رومانسي", "Berlin = برلين", "Schnellimbiss = مطعم سريع"],
    simplified: "فيلم رومانسي كوميدي أوروبي عن الحب والجيرة في مهرجان برلين",
    imagine: "زوجان يجلسان في صالة سينما ويضحكان وكلاهما يمسك يده الأخرى",
    correct: 7
};

HELP_DATA["lesen3_exam33_q7"] = {
    text: "Feiern wie in den Goldenen Zwanzigern - Sie sind zu einer Kostüm-Party eingeladen und brauchen dafür etwas zum Anziehen.",
    meaning: "متجر إلكتروني لبيع الملابس والإكسسوارات لحفلات تنكرية بموضوع العشرينيات الذهبية",
    keywords: ["Kostüm = زي تنكري", "Party = حفلة", "1920er = عشرينيات", "Kleidung = ملابس", "Accessoires = إكسسوارات"],
    simplified: "تسوق ملابس عصر العشرينيات الذهبية عبر النت للحفلات التنكرية",
    imagine: "فتاة تقف أمام مرآة وترتدي فستانا طويلا لامعا وريشا في رأسها",
    correct: 8
};

HELP_DATA["lesen3_exam33_q8"] = {
    text: "Berlin erleben - Sie würden gerne mit Freunden eine mehrtägige Stadttour machen und suchen ein Angebot",
    meaning: "رحلة 4 أيام إلى برلين مع القطار والفندق والإفطار بسعر يبدأ من 437 يورو",
    keywords: ["Städtereise = رحلة مدينة", "Berlin = برلين", "Hotel = فندق", "Frühstück = إفطار", "Deutsche Bahn = السكك الحديدية الألمانية"],
    simplified: "باقة سفر لبرلين تشمل المواصلات والإقامة والإفطار لعدة أيام",
    imagine: "أربعة أصدقاء يجلسون في قطار ويخططون لليوم التالي على خريطة أمامهم",
    correct: 9
};

// ========== Exam 34: ein paar Tage in Berlin (معدل) - نفس الأسئلة الصحيحة ==========

HELP_DATA["lesen3_exam34_q1"] = {
    text: "Eine Karte, 30 Häuser - Ein Bekannter hält sich einige Tage في Berlin auf und möchte في dieser Zeit verschiedene Kunstausstellungen besuchen.",
    meaning: "بطاقة متاحف برلين لثلاثة أيام تشمل 30 متحفا بأسعار مخفضة",
    keywords: ["Museumspass = بطاقة متاحف", "Kunstausstellungen = معارض فنية", "Eintritt = دخول", "Berlin = برلين", "Alte Nationalgalerie = المعرض الوطني القديم"],
    simplified: "تذكرة شاملة لدخول متاحف برلين الفنية لمدة 3 أيام",
    imagine: "رجال واقفون أمام لوحة مشهورة وبطاقة زرقاء في أيديهم",
    correct: 0
};

HELP_DATA["lesen3_exam34_q2"] = {
    text: "Berlin Gendarmenmarkt - Eine Freundin von mir wünscht sich, irgendwann selbst eine Rolle في einem Film zu spielen.",
    meaning: "فرصة للظهور ككومبارس في فيلم عن برلين في العشرينيات مع أجر",
    keywords: ["Filmrolle = دور فيلم", "Komparsen = كومبارس", "Berlin = برلين", "Drehtag = يوم تصوير", "Bewerbung = تقديم"],
    simplified: "اختبارات أداء لدور صغير في فيلم تاريخي في برلين",
    imagine: "فتاة تقف أمام لجنة اختيار وتمثل مشهدا خياليا أمام الكاميرا",
    correct: 1
};

HELP_DATA["lesen3_exam34_q3"] = {
    text: "Stadtführungen in Berlin - Eine Freundin sucht einen Nebenjob, bei dem sie gerne viel Zeit im Freien verbringen würde.",
    meaning: "وظيفة كمرشد سياحي في برلين بأجر 450 يورو شهريا وساعات مرنة",
    keywords: ["Stadtführungen = جولات سياحية", "Guide = مرشد", "Nebenjob = عمل جانبي", "Freiberufler = مستقل", "kommunikativ = اجتماعي"],
    simplified: "فرصة عمل في الهواء الطلق كمرشد سياحي في برلين",
    imagine: "امرأة ترتدي قبعة عريضة وتشير إلى مباني تاريخية وجمهور سياحي حولها",
    correct: 3
};

HELP_DATA["lesen3_exam34_q4"] = {
    text: "Ihr Cousin ist Student und möchte في den Sommermonaten einer Nebentätigkeit nachgehen.",
    meaning: "مطلوب مساعد صيفي في دار سينما لمدة 25 ساعة أسبوعيا في يوليو وأغسطس",
    keywords: ["Nebentätigkeit = عمل جانبي", "Student = طالب", "Sommer = صيف", "Kino = سينما", "Aushilfe = مساعد"],
    simplified: "وظيفة مؤقتة في سينما للطلاب في العطلة الصيفية",
    imagine: "شاب يرتدي بدلة موحدة ويمسك جهاز فحص تذاكر وقاعة سينما خلفه",
    correct: 4
};

HELP_DATA["lesen3_exam34_q5"] = {
    text: "Das etwas gemütlichere Berlin - Sie haben vor, eine besondere Stadtführung durch Berlin zu reservieren.",
    meaning: "جولة سياحية لحي فريديناو الهادئ مع تذوق مأكولات إيطالية وكورية ومغربية",
    keywords: ["Stadtführung = جولة سياحية", "Berlin = برلين", "kulinarisch = شهي", "Altbauten = مبانٍ قديمة", "Geheimtipp = نصيحة سرية"],
    simplified: "جولة مشي ثقافية لمدة 3 ساعات في أحياء برلين المخفية مع أكلات عالمية",
    imagine: "شابان يجلسان في مطعم عربي ويأكلان كسكس ومرشد سياحي يشرح بطاقة الطعام",
    correct: 6
};

HELP_DATA["lesen3_exam34_q6"] = {
    text: "Das Comedy Filmfest - Sie planen, mit Ihren Freunden einen Film zu schauen, der gute Unterhaltung bietet.",
    meaning: "فيلم كوميدي رومانسي في مهرجان الأفلام الكوميدية الأوروبي عن صاحبة شوكولاتة ومطعم وجبات سريعة",
    keywords: ["Comedy = كوميديا", "Filmfest = مهرجان أفلام", "romantisch = رومانسي", "Unterhaltung = ترفيه", "Berlin = برلين"],
    simplified: "فيلم أوروبي مضحك عن منافسة بين متجر شوكولا ومطعم همبرغر",
    imagine: "أربعة أصدقاء يجلسون في صف السينما ويضحكون وكلهم يحملون الفشار",
    correct: 7
};

HELP_DATA["lesen3_exam34_q7"] = {
    text: "Feiern wie in den Goldenen Zwanzigern - Sie gehen auf eine Kostümfeier und suchen dafür ein geeignetes Kostüm.",
    meaning: "متجر إلكتروني لملابس حفلات العشرينيات الذهبية من فساتين وبدلات وقبعات",
    keywords: ["Kostüm = زي تنكري", "Mottoparty = حفلة تنكرية", "1920er = عشرينيات", "Accessoires = إكسسوارات", "Online-Shop = متجر إلكتروني"],
    simplified: "أزياء حفلات مستوحاة من موضة العشرينيات الذهبية للنساء والرجال",
    imagine: "امرأة ترتدي فستانا مزينا بالترتر وقبعة صغيرة جانبية وبروش لامع",
    correct: 8
};

HELP_DATA["lesen3_exam34_q8"] = {
    text: "Berlin erleben - Sie planen eine mehrtägige Städtereise mit Freunden und möchten dafür ein geeignetes Angebot finden.",
    meaning: "باقة سفر لبرلين لمدة 4 أيام مع سفر بالقطار وإقامة فندقية مع إفطار",
    keywords: ["Städtereise = رحلة مدينة", "Berlin = برلين", "Hotelübernachtung = إقامة فندقية", "Frühstück = إفطار", "Pauschalreise = رحلة شاملة"],
    simplified: "رحلات جماعية لبرلين تشمل السفر والإقامة والإفطار لعدة أيام",
    imagine: "ثلاثة أشخاص يحملون حقائب سفر ويمسكون تذاكر قطار بابتسامات عريضة",
    correct: 9
};

// ========== Exam 35: Autos ==========

HELP_DATA["lesen3_exam35_q1"] = {
    text: "Entdeckungsreise in die Welt der Technik - Ein Bekannter interessiert sich für wertvolle alte Fahrzeuge.",
    meaning: "متحف تقني يضم سيارات كلاسيكية فاخرة وطائرات أسرع من الصوت وقاطرات بخارية",
    keywords: ["Technikmuseum = متحف تقني", "Oldtimer = سيارات كلاسيكية", "Rennwagen = سيارات سباق", "Flugzeuge = طائرات", "Dampfloks = قاطرات بخارية"],
    simplified: "زيارة متحف ضخم للسيارات القديمة والطائرات التاريخية",
    imagine: "رجل يضع يده على سيارة حمراء قديمة لامعة ويبتسم",
    correct: 0
};

HELP_DATA["lesen3_exam35_q2"] = {
    text: "Alles rund um das Thema Geld. Workshop - Ihr Bruder möchte في einem Kurs sein Wissen über Finanzen erweitern.",
    meaning: "دورة تدريبية لمدة يومين في التخطيط المالي وإدارة الديون والادخار والاستثمار",
    keywords: ["Workshop = ورشة عمل", "Finanzen = شؤون مالية", "Budgetplanung = تخطيط ميزانية", "Sparen = ادخار", "Kredit = قرض"],
    simplified: "دورة شاملة في إدارة المال الشخصي وميزانية المنزل والاستثمار",
    imagine: "رجل جالس أمام أوراق مالية وآلة حاسبة وسهم إشارة خضراء",
    correct: 2
};

HELP_DATA["lesen3_exam35_q3"] = {
    text: "Rasantes Abenteuer für Autofans - Ihr Cousin würde gerne mal mit einem schnellen Sportwagen fahren.",
    meaning: "تجربة قيادة سيارة فيراري على مضمار طائرات مهجور بسرعة غير محدودة",
    keywords: ["Ferrari = فيراري", "Rennwagen = سيارة سباق", "Fahrtraining = تدريب قيادة", "Vollgas = سرعة قصوى", "Flugplatz = مطار"],
    simplified: "قيادة سيارة أحلامك بسرعة جنونية على مدرج مهجور",
    imagine: "شاب يجلس في مقعد سيارة حمراء رياضية ويداه على المقود وأسنانه تنجز",
    correct: 3
};

HELP_DATA["lesen3_exam35_q4"] = {
    text: "Energiesparen leicht gemacht - Ihr Nachbar braucht einen neuen Kühlschrank und möchte sich über verschiedene Modelle informieren.",
    meaning: "موقع إلكتروني يساعد في اختيار الأجهزة المنزلية الموفرة للطاقة حسب الحجم والفعالية",
    keywords: ["Energiekosten = تكاليف طاقة", "Geräte = أجهزة", "Stromverbrauch = استهلاك كهرباء", "Effizienz = كفاءة", "Website = موقع"],
    simplified: "دليل شراء الأجهزة الكهربائية الجديدة حسب استهلاكها للكهرباء",
    imagine: "رجل واقف أمام ثلاجة يقرأ بطاقة الطاقة الخضراء والصفراء والحمراء",
    correct: 5
};

HELP_DATA["lesen3_exam35_q5"] = {
    text: "Unkompliziert und spontan unterwegs sein? - Ihre Schwester hat kein Auto. Für gelegentliche Fahrten sucht sie eine Alternative zu öffentlichen Verkehrsmitteln.",
    meaning: "خدمة مشاركة سيارات في نورنبرغ بأجرة شاملة للوقود والتأمين وحجز عبر الهاتف",
    keywords: ["Carsharing = مشاركة سيارة", "Mieten = استئجار", "kein eigenes Auto = لا سيارة خاصة", "Smartphone-App = تطبيق هاتف", "Online-Buchung = حجز عبر الإنترنت"],
    simplified: "استئجار سيارات قريبة منك بالدقيقة أو بالساعة بدون شروط شهرية",
    imagine: "امرأة تفتح تطبيق هاتفها وتختار سيارة زرقاء من خريطة قريبة منها",
    correct: 6
};

HELP_DATA["lesen3_exam35_q6"] = {
    text: "Sie brauchen bald neue Haushaltsgeräte, haben aber noch nicht genug Geld gespart.",
    meaning: "قرض استهلاكي مرن من 1000 إلى 50000 يورو بدون دفعة أولى وبأقساط شهرية بسيطة",
    keywords: ["Verbraucherkredit = قرض استهلاكي", "monatliche Raten = أقساط شهرية", "keine Anzahlung = بدون دفعة مسبقة", "Online-Kreditentscheidung = قرار قرض فوري"],
    simplified: "تمويل مشترياتك المنزلية بالتقسيط الشهري بدون فوائد مرتفعة",
    imagine: "عائلة جالسة على أريكة جديدة وسلة تسوق مليئة بالأجهزة وأوراق القرض أمامهم",
    correct: 7
};

HELP_DATA["lesen3_exam35_q7"] = {
    text: "Entspannt unterwegs في der Stadt und auf dem Land - Sie möchten auf Ihren PKW verzichten und suchen Tipps.",
    meaning: "كتاب عن الحياة بدون سيارة للعائلات في الريف والمدينة مع بدائل عملية كثيرة",
    keywords: ["Auto verzichten = الاستغناء عن سيارة", "Alternativen = بدائل", "Alltag = حياة يومية", "Familie = عائلة", "Dorf = قرية"],
    simplified: "تجارب و نصائح عائلية للعيش بدون سيارة في الريف والمدينة",
    imagine: "امرأة تدفع عربة بقالة في شارع رئيسي وباص يمر بجانبها",
    correct: 8
};

HELP_DATA["lesen3_exam35_q8"] = {
    text: "Versteckte Kosten? - Sie hatten eine hohe Stromrechnung und möchten wissen, wie viel Energie die Geräte في Ihrem Haushalt verbrauchen.",
    meaning: "جهاز قياس استهلاك الكهرباء للأجهزة المنزلية لحساب التكلفة الفعلية للتيار",
    keywords: ["Strommessgerät = جهاز قياس كهرباء", "Verbrauch = استهلاك", "Stromkosten = تكاليف كهرباء", "LCD-Display = شاشة عرض", "Haushalt = منزل"],
    simplified: "جهاز صغير يقيس استهلاك أجهزتك للكهرباء وتكلفتها الحقيقية",
    imagine: "يد تمسك جهاز صغير وتوصله بغسالة وأرقام حمراء تظهر على شاشته",
    correct: 9
};

// ========== Exam 36: Möbel für die neue Wohnung ==========

HELP_DATA["lesen3_exam36_q1"] = {
    text: "Ihr Kleiderschrank platzt aus allen Nähten - Eine Bekannte sucht Möbel für ihre neue Wohnung und wünscht sich viel Platz für ihre Kleidung.",
    meaning: "خزانة ملابس مخصصة بالقياس مع نظام داخلي متغير حسب احتياجاتك",
    keywords: ["Kleiderschrank = خزانة ملابس", "begehbarer Kleiderschrank = خزانة ملابس قابلة للمشي", "Innenausstattung = تجهيز داخلي", "Beratungstermin = موعد استشارة", "kostenlos = مجاني"],
    simplified: "خزانة ملابس مصممة حسب رغبتك تتسع لكل ملابسك",
    imagine: "امرأة تقف في غرفة كبيرة والجدران كلها أرفف معلقة ودرج ومرآة",
    correct: 0
};

HELP_DATA["lesen3_exam36_q2"] = {
    text: "Der perfekte Kleiderschrank - Eine Freundin hat viele Sachen zum Anziehen, die sie nie trägt. Sie möchte einen guten Kleidungsstيل entwickeln.",
    meaning: "كتاب عن الموضة يساعدك على اكتشاف ما يناسب شكلك وما لا يناسب وبناء خزانة أساسية مثالية",
    keywords: ["Kleiderschrank = خزانة ملابس", "Modetrends = صيحات موضة", "Typ = شخصية", "Qualität = جودة", "Garderobe = خزانة ملابس"],
    simplified: "دليل لبناء خزانة ملابس عصرية تناسب شخصيتك وميزانيتك",
    imagine: "امرأة تقف أمام خزانة ملابسها كاملة وتختار قطعة واحدة وقالت هذا أنا",
    correct: 1
};

HELP_DATA["lesen3_exam36_q3"] = {
    text: "www.selbstgemacht-info.net - Eine Nachbarin ist sehr kreativ und stellt Kleidung selbst her. Sie überlegt, ob sie diese auch verkaufen könnte.",
    meaning: "موقع يوفر معلومات عن أفضل منصات البيع لمنتجات يدوية وقوانين التجارة الإلكترونية",
    keywords: ["selbstgemacht = مصنوع يدويا", "vermarkten = تسويق", "Online-Shop = متجر إلكتروني", "rechtliche Bestimmungen = أحكام قانونية", "Internetplattformen = منصات إنترنت"],
    simplified: "دليل لبيع المشغولات اليدوية أونلاين من منصات إلى قوانين البيع",
    imagine: "امرأة تحمل حقيبة يد من القماش من تصميمها وتلتقط صورة لها بهاتفها",
    correct: 2
};

HELP_DATA["lesen3_exam36_q4"] = {
    text: "Regionale Musicalstars gesucht - Ihr 18-jähriger Bruder singt gerne في seiner Freizeit und träumt davon, mal auf der Bühne zu stehen.",
    meaning: "اختبارات أداء لموسيقيال جديد يبحث عن ممثلين للرقص والغناء والتمثيل من الهواة والمحترفين",
    keywords: ["Musical = مسرح غنائي", "Casting = اختبار أداء", "Tanz = رقص", "Gesang = غناء", "Schauspiel = تمثيل"],
    simplified: "فرصة للمواهب الشابة للانضمام إلى فريق عمل مسرحية غنائية جديدة",
    imagine: "شاب يقف على خشبة المسرح ويغني بكل قوته ولجنة الاختيار تنصت بتركيز",
    correct: 3
};

HELP_DATA["lesen3_exam36_q5"] = {
    text: "25 Jahre in Hamburg - Ihre Cousine schaut sich gerne Bühnenshows an und möchte wissen, welche Arbeiten hinter den Kulissen erledigt werden.",
    meaning: "جولة خلف الكواليس في مسرحية غنائية ناجحة مدتها 25 سنة مع فريق العمل وشرح مهامهم",
    keywords: ["Bühnenshow = عرض مسرحي", "hinter der Bühne = خلف الكواليس", "Mitarbeiter = موظفين", "Vorstellung = عرض", "Jubiläum = ذكرى سنوية"],
    simplified: "رحلة خلف ستار مسرح غنائي لرؤية أسرار الصنعة",
    imagine: "فتاة تضع سماعة رأس وتمسك بجهاز إضاءة ملون وممثلون خلفها على المسرح",
    correct: 5
};

HELP_DATA["lesen3_exam36_q6"] = {
    text: "Streifzug durch die Modewelt - Ihre Schwester studiert Geschichte und interessiert sich für Zeitschriften von früher.",
    meaning: "معرض لأزياء باريس القديمة من القرن العشرين مع ملابس أصلية وصور وتسجيلات نادرة",
    keywords: ["Ausstellung = معرض", "Mode = موضة", "Paris = باريس", "historische Kleidungsstücke = ملابس تاريخية", "Accessoires = إكسسوارات", "Tonaufnahmen = تسجيلات صوتية"],
    simplified: "معرض فني لتطور أزياء النساء في باريس قبل 100 سنة",
    imagine: "امرأة تقف أمام فستان عتيق طويل في زجاج شفاف ومصباح عليها",
    correct: 6
};

HELP_DATA["lesen3_exam36_q7"] = {
    text: "Mode, Stars, Lifestyle - Ihre Tochter ist Studentin und würde gerne Moderedakteurin werden. Sie möchte erste Erfahrungen في diesem Beruf sammeln.",
    meaning: "فرصة تدريب في مجلة أزياء دولية لاكتشاف صناعة المحتوى الإعلامي والموضة",
    keywords: ["Praktikum = تدريب", "Moderedakteurin = محررة أزياء", "Magazin = مجلة", "Trends = صيحات", "Medien = وسائل إعلام"],
    simplified: "تدريب في مجلة أزياء عالمية لمحبي الموضة والإعلام",
    imagine: "فتاة تقف أمام حاسوبها وفي يدها مجلة مفتوحة وصور ملابس ملونة خلفها",
    correct: 7
};

HELP_DATA["lesen3_exam36_q8"] = {
    text: "Filmhit als Musikspektakel - Sie möchten sich eine unterhaltsame Bühnenshow ansehen.",
    meaning: "مسرحية غنائية مستوحاة من فيلم كوميدي ناجح عن امرأة رئيسة تحرير متسلطة وموظفتها الجديدة",
    keywords: ["Musical = مسرحية غنائية", "Filmhit = فيلم ناجح", "Komödie = كوميديا", "Pop-Weltstar = نجم بوب عالمي", "Chefredakteurin = رئيسة تحرير"],
    simplified: "مسرحية غنائية كوميدية عن عالم المجلات والموضة بنجوم عالميين",
    imagine: "جمهور يصفق وامرأة ترتدي فستانا أنيقا تغني على المسرح وأضواء ملونة",
    correct: 9
};


// ============================================
// Exam 1 (exam1.json) - Hallo Ferdinand
// ============================================

HELP_DATA["sprach1_exam1_q1"] = {
    text: "um meine Miete bezahlen zu können",
    meaning: "لكي أتمكن من دفع إيجاري",
    keywords: ["um...zu = لكي", "Miete = إيجار", "bezahlen = يدفع"],
    simplified: "لكي أتمكن من دفع الإيجار",
    imagine: "🏠💰 شخص يدفع نقوداً لمالك المنزل"
};

HELP_DATA["sprach1_exam1_q2"] = {
    text: "ob ich das sonst durchhalten würde",
    meaning: "ما إذا كنت سأستمر بدونه",
    keywords: ["ob = ما إذا", "durchhalten = يستمر", "sonst = بدونه"],
    simplified: "لا أعرف إن كنت سأستمر بدونه",
    imagine: "🤔💪 شخص يتساءل هل سيكمل الطريق"
};

HELP_DATA["sprach1_exam1_q3"] = {
    text: "aber andererseits ist dauernd was los",
    meaning: "لكن من ناحية أخرى هناك دائماً شيء يحدث",
    keywords: ["aber = لكن", "andererseits = من ناحية أخرى", "dauernd = دائماً"],
    simplified: "مرهق لكن فيه حركة دائماً",
    imagine: "😫🎉 شخص متعب لكنه يضحك مع أصدقائه"
};

HELP_DATA["sprach1_exam1_q4"] = {
    text: "unbedingt Kellnerin werden",
    meaning: "بالتأكيد أصبح نادلة",
    keywords: ["unbedingt = بالتأكيد", "Kellnerin = نادلة", "werden = أصبح"],
    simplified: "أردت بشدة أن أصبح نادلة في سن الثامنة",
    imagine: "👧🍽️ طفلة صغيرة تحمل صينية وتضحك"
};

HELP_DATA["sprach1_exam1_q5"] = {
    text: "Wenn ich mich nicht täusche",
    meaning: "إن لم أكن مخطئاً",
    keywords: ["mich täusche = أخطئ", "wenn = إذا", "nicht = لا"],
    simplified: "إن لم أكن مخطئاً، ستتخرج بعد ستة أشهر",
    imagine: "🤔📅 شخص يحسب الأشهر على أصابعه"
};

HELP_DATA["sprach1_exam1_q6"] = {
    text: "als wir noch in der Schule gegangen sind",
    meaning: "عندما كنا لا نزال نذهب إلى المدرسة",
    keywords: ["als = عندما", "Schule = مدرسة", "gegangen = ذهبنا"],
    simplified: "عندما كنا في المدرسة",
    imagine: "🏫👧🧒 طفلان يمشيان إلى المدرسة"
};

HELP_DATA["sprach1_exam1_q7"] = {
    text: "Pläne für die kommenden Wochenenden",
    meaning: "خطط لعطل نهاية الأسبوع القادمة",
    keywords: ["kommenden = القادمة", "Wochenenden = عطل نهاية الأسبوع", "Pläne = خطط"],
    simplified: "خطط لعطل نهاية الأسبوع المقبلة",
    imagine: "📅🗓️ شخص يضع علامة على تقويم الأسبوع القادم"
};

HELP_DATA["sprach1_exam1_q8"] = {
    text: "hättest du Lust dazu",
    meaning: "هل لديك رغبة في ذلك",
    keywords: ["Lust = رغبة", "dazu = في ذلك", "hättest = هل لديك"],
    simplified: "هل ترغب في ذلك؟",
    imagine: "🤝❓ شخص يمد يده لآخر يسأله"
};

HELP_DATA["sprach1_exam1_q9"] = {
    text: "nicht nur sehr leckere Kuchen, sondern auch einige kleine Gerichte",
    meaning: "ليس فقط كعكات شهية جداً، بل أيضاً بعض الأطباق الصغيرة",
    keywords: ["sondern = بل", "nicht nur = ليس فقط", "auch = أيضاً"],
    simplified: "ليس فقط كعكاً لذيذاً بل أيضاً أطباقاً صغيرة",
    imagine: "🍰🥗 شخص يأكل كعكة وطبقاً صغيراً معاً"
};

HELP_DATA["sprach1_exam1_q10"] = {
    text: "Wäre das was für dich?",
    meaning: "هل هذا شيء يناسبك؟",
    keywords: ["für = لـ/يناسب", "dich = لك", "wäre = هل يكون"],
    simplified: "هل هذا مناسب لك؟",
    imagine: "☕❓ شخص يشير إلى كوب قهوة ويسأل صديقه"
};

// ============================================
// Exam 2 (exam2.json) - Hallo Ferdinand (معدل)
// ============================================

HELP_DATA["sprach1_exam2_q1"] = {
    text: "um meine Miete bezahlen zu können",
    meaning: "لكي أتمكن من دفع إيجاري",
    keywords: ["um...zu = لكي", "Miete = إيجار", "bezahlen = يدفع"],
    simplified: "لكي أتمكن من دفع الإيجار",
    imagine: "🏠💰 شخص يدفع نقوداً لمالك المنزل"
};

HELP_DATA["sprach1_exam2_q2"] = {
    text: "wie ich das sonst durchhalten würde",
    meaning: "كيف سأستمر بدونه",
    keywords: ["wie = كيف", "durchhalten = يستمر", "sonst = بدونه"],
    simplified: "لا أعرف كيف سأستمر بدونه",
    imagine: "🤔💪 شخص يتساءل كيف سيكمل الطريق"
};

HELP_DATA["sprach1_exam2_q3"] = {
    text: "doch andererseits ist dauernd was los",
    meaning: "لكن من ناحية أخرى هناك دائماً شيء يحدث",
    keywords: ["doch = لكن", "andererseits = من ناحية أخرى", "dauernd = دائماً"],
    simplified: "مرهق لكن فيه حركة دائماً",
    imagine: "😫🎉 شخص متعب لكنه يضحك مع أصدقائه"
};

HELP_DATA["sprach1_exam2_q4"] = {
    text: "unbedingt Kellnerin werden",
    meaning: "بالتأكيد أصبح نادلة",
    keywords: ["unbedingt = بالتأكيد", "Kellnerin = نادلة", "werden = أصبح"],
    simplified: "أردت بشدة أن أصبح نادلة في سن الثامنة",
    imagine: "👧🍽️ طفلة صغيرة تحمل صينية وتضحك"
};

HELP_DATA["sprach1_exam2_q5"] = {
    text: "Wenn ich mich nicht täusche",
    meaning: "إن لم أكن مخطئاً",
    keywords: ["mich = نفسي", "täusche = أخطئ", "nicht = لا"],
    simplified: "إن لم أكن مخطئاً، ستتخرج بعد ستة أشهر",
    imagine: "🤔📅 شخص يحسب الأشهر على أصابعه"
};

HELP_DATA["sprach1_exam2_q6"] = {
    text: "als wir noch in der Schule gegangen sind",
    meaning: "عندما كنا لا نزال نذهب إلى المدرسة",
    keywords: ["als = عندما", "Schule = مدرسة", "gegangen = ذهبنا"],
    simplified: "عندما كنا في المدرسة",
    imagine: "🏫👧🧒 طفلان يمشيان إلى المدرسة"
};

HELP_DATA["sprach1_exam2_q7"] = {
    text: "Pläne für die kommenden Wochenenden",
    meaning: "خطط لعطل نهاية الأسبوع القادمة",
    keywords: ["kommenden = القادمة", "Wochenenden = عطل نهاية الأسبوع", "Pläne = خطط"],
    simplified: "خطط لعطل نهاية الأسبوع المقبلة",
    imagine: "📅🗓️ شخص يضع علامة على تقويم الأسبوع القادم"
};

HELP_DATA["sprach1_exam2_q8"] = {
    text: "hättest du Lust dazu",
    meaning: "هل لديك رغبة في ذلك",
    keywords: ["Lust = رغبة", "dazu = في ذلك", "hättest = هل لديك"],
    simplified: "هل ترغب في ذلك؟",
    imagine: "🤝❓ شخص يمد يده لآخر يسأله"
};

HELP_DATA["sprach1_exam2_q9"] = {
    text: "nicht nur sehr leckere Kuchen, ebenso auch einige kleine Gerichte",
    meaning: "ليس فقط كعكات شهية جداً، وكذلك أيضاً بعض الأطباق الصغيرة",
    keywords: ["ebenso = وكذلك", "nicht nur = ليس فقط", "auch = أيضاً"],
    simplified: "ليس فقط كعكاً لذيذاً بل أيضاً أطباقاً صغيرة",
    imagine: "🍰🥗 شخص يأكل كعكة وطبقاً صغيراً معاً"
};

HELP_DATA["sprach1_exam2_q10"] = {
    text: "Wäre das was einfach dich?",
    meaning: "هل هذا شيء مناسب لك ببساطة؟",
    keywords: ["einfach = ببساطة", "dich = لك", "wäre = هل يكون"],
    simplified: "هل هذا مناسب لك ببساطة؟",
    imagine: "☕❓ شخص يشير إلى كوب قهوة ويسأل صديقه"
};

// ============================================
// Exam 3 (exam3.json) - Liebe Vanessa
// ============================================

HELP_DATA["sprach1_exam3_q1"] = {
    text: "über den ich mich total gefreut habe",
    meaning: "الذي فرحت به كثيراً",
    keywords: ["über den = الذي", "mich gefreut = فرحت", "total = كثيراً"],
    simplified: "الذي فرحت به كثيراً",
    imagine: "📨😊 شخص يفتح رسالة ويبتسم"
};

HELP_DATA["sprach1_exam3_q2"] = {
    text: "nichts mehr von mir gehört hast",
    meaning: "لم تسمع مني شيئاً بعد الآن",
    keywords: ["nichts mehr = لا شيء بعد الآن", "gehört = سمعت", "von mir = مني"],
    simplified: "لم تسمع مني شيئاً منذ ثلاث سنوات",
    imagine: "📞😐 شخص ينظر إلى هاتفه ولا توجد مكالمات"
};

HELP_DATA["sprach1_exam3_q3"] = {
    text: "Du weißt doch selbst",
    meaning: "أنت تعلمين بنفسك",
    keywords: ["doch = بالتأكيد", "selbst = بنفسك", "weißt = تعلمين"],
    simplified: "أنت تعلمين بنفسك كم هو مرهق",
    imagine: "🤷‍♀️🤦‍♀️ امرأة ترفع يديها وتقول أنت تعلمين"
};

HELP_DATA["sprach1_exam3_q4"] = {
    text: "Wie ist es übrigens",
    meaning: "كيف الحال بالمناسبة",
    keywords: ["Wie = كيف", "übrigens = بالمناسبة", "ist es = هو"],
    simplified: "كيف الحال بالمناسبة في عائلتك؟",
    imagine: "🤔❓ امرأة تسأل صديقتها"
};

HELP_DATA["sprach1_exam3_q5"] = {
    text: "am Fuß der Alpen",
    meaning: "عند سفح جبال الألب",
    keywords: ["Fuß = سفح", "der Alpen = جبال الألب", "am = عند"],
    simplified: "عند سفح جبال الألب",
    imagine: "⛰️🏔️ جبال عالية وقرية صغيرة عند أسفلها"
};

HELP_DATA["sprach1_exam3_q6"] = {
    text: "haben ständig die Füße weh getan",
    meaning: "كانت أقدامهم تؤلمهم باستمرار",
    keywords: ["weh getan = آلمت", "Füße = أقدام", "ständig = باستمرار"],
    simplified: "أقدامهم كانت تؤلمهم دائماً",
    imagine: "🦶😖 شخص يمسك بقدميه ويتألم"
};

HELP_DATA["sprach1_exam3_q7"] = {
    text: "bis sie vor Erschöpfung umfallen",
    meaning: "حتى يسقطوا من الإرهاق",
    keywords: ["umfallen = يسقط", "Erschöpfung = إرهاق", "bis = حتى"],
    simplified: "حتى يسقطوا من الإرهاق",
    imagine: "😫🧑‍🦯 شخص يسقط على الأرض بعد مشي طويل"
};

HELP_DATA["sprach1_exam3_q8"] = {
    text: "Stell dir vor",
    meaning: "تخيل لنفسك",
    keywords: ["Stell dir = تخيل لنفسك", "vor = إلى الأمام"],
    simplified: "تخيل لنفسك كل الناس يمشون حفاة",
    imagine: "🤔🩴 شخص يتخيل مشهداً غريباً"
};

HELP_DATA["sprach1_exam3_q9"] = {
    text: "jede Menge Hindernisse",
    meaning: "الكثير من العقبات",
    keywords: ["jede Menge = الكثير من", "Hindernisse = عقبات", "gibt es = هناك"],
    simplified: "هناك الكثير من العقبات أمام الحفرة",
    imagine: "⛳🏌️ جولف وعقبات كثيرة أمام الحفرة"
};

HELP_DATA["sprach1_exam3_q10"] = {
    text: "wollten gar nicht mehr damit aufhören",
    meaning: "لم يريدوا التوقف أبداً",
    keywords: ["damit = بهذا", "aufhören = يتوقف", "gar nicht = أبداً"],
    simplified: "لم يريدوا التوقف عن اللعب",
    imagine: "👦👧🏌️ أطفال يلعبون ويضحكون ولا يريدون المغادرة"
};

// ============================================
// Exam 4 (exam4.json) - Hallo Judith / Lina
// ============================================

HELP_DATA["sprach1_exam4_q1"] = {
    text: "Hoffentlich rufst du heute schon deine E-Mails ab",
    meaning: "آمل أن تتصفح رسائلك الإلكترونية اليوم",
    keywords: ["Hoffentlich = آمل", "E-Mails = رسائل إلكترونية", "abrufst = تتصفح"],
    simplified: "أتمنى أن تقرئي رسائلك اليوم",
    imagine: "📧🙏 شخص يتوسل أن يقرأ الآخر بريده"
};

HELP_DATA["sprach1_exam4_q2"] = {
    text: "Wir möchten nämlich unserer Kollegin Elena",
    meaning: "نحن نريد بالتحديد زميلتنا إيلينا",
    keywords: ["nämlich = بالتحديد", "Kollegin = زميلة", "möchten = نريد"],
    simplified: "نريد بالتحديد زميلتنا إيلينا",
    imagine: "👩‍💼🎁 فريق عمل يفكر في هدية لزميلتهم"
};

HELP_DATA["sprach1_exam4_q3"] = {
    text: "ist ja schon übermorgen abends",
    meaning: "هي بالفعل بعد غد مساءً",
    keywords: ["schon = بالفعل", "übermorgen = بعد غد", "abends = مساءً"],
    simplified: "حفلتها بعد غد مساءً",
    imagine: "📅🎉 تقويم يشير إلى يوم بعد غد"
};

HELP_DATA["sprach1_exam4_q4"] = {
    text: "Bist du damit einverstanden",
    meaning: "هل أنت موافقة على ذلك؟",
    keywords: ["damit = على ذلك", "einverstanden = موافقة", "bist du = هل أنت"],
    simplified: "هل توافقين على ذلك؟",
    imagine: "🤝✅ شخص يسأل الآخر هل توافق"
};

HELP_DATA["sprach1_exam4_q5"] = {
    text: "Als wir das letzte Mal gesammelt hatten",
    meaning: "عندما جمعنا آخر مرة",
    keywords: ["Als = عندما", "letzte Mal = آخر مرة", "gesammelt = جمعنا"],
    simplified: "عندما جمعنا التبرعات آخر مرة",
    imagine: "💰📦 شخص يجمع نقوداً في صندوق"
};

HELP_DATA["sprach1_exam4_q6"] = {
    text: "gehen dann nachmittags miteinander in der Stadt einkaufen",
    meaning: "نذهب بعد الظهر معاً للتسوق في المدينة",
    keywords: ["miteinander = معاً", "einkaufen = للتسوق", "nachmittags = بعد الظهر"],
    simplified: "نذهب معاً للتسوق بعد الظهر",
    imagine: "🛍️👭 صديقتان تتسوقان معاً"
};

HELP_DATA["sprach1_exam4_q7"] = {
    text: "könntest du dann übermorgen noch kurz vor der Feier unterschreiben",
    meaning: "يمكنك التوقيع بعد غد قبل الحفل بفترة قصيرة",
    keywords: ["kurz = لفترة قصيرة", "unterschreiben = التوقيع", "vor der Feier = قبل الحفل"],
    simplified: "يمكنك التوقيع قبل الحفل بفترة قصيرة",
    imagine: "✍️📝 شخص يوقع على بطاقة قبل الحفلة"
};

HELP_DATA["sprach1_exam4_q8"] = {
    text: "weshalb ich sehr viel zu tun hatte",
    meaning: "لذلك كان لدي الكثير لأفعله",
    keywords: ["weshalb = لذلك", "viel zu tun = الكثير لأفعله", "hatte = كان"],
    simplified: "لذلك كان لدي عمل كثير",
    imagine: "📋😫 شخص أمامه كومة من الأوراق"
};

HELP_DATA["sprach1_exam4_q9"] = {
    text: "vollkommen neue Entwicklungen",
    meaning: "تطورات جديدة تماماً",
    keywords: ["vollkommen = تماماً", "neue = جديدة", "Entwicklungen = تطورات"],
    simplified: "تطورات جديدة كلياً في الشركة",
    imagine: "🏢✨ شركة تتغير وتتطور"
};

HELP_DATA["sprach1_exam4_q10"] = {
    text: "Ich wünsche dir heute einen angenehmen Tag",
    meaning: "أتمنى لك يوماً لطيفاً اليوم",
    keywords: ["angenehmen = لطيفاً", "Tag = يوماً", "wünsche = أتمنى"],
    simplified: "أتمنى لك يوماً لطيفاً",
    imagine: "☀️😊 شخص يقول لآخر أتمنى لك يوماً جميلاً"
};

// ============================================
// Exam 5 (exam5.json) - Liebe Karin
// ============================================

HELP_DATA["sprach1_exam5_q1"] = {
    text: "das studieren, was du möchtest",
    meaning: "تدرس ما تريدينه",
    keywords: ["was = ما", "möchtest = تريدين", "studieren = تدرس"],
    simplified: "تدرسين ما تريدينه أخيراً",
    imagine: "📚😊 فتاة تدرس كتباً بفرح"
};

HELP_DATA["sprach1_exam5_q2"] = {
    text: "Wie ist es denn so an der Uni dort?",
    meaning: "كيف الحال في الجامعة هناك؟",
    keywords: ["denn = إذاً", "so = هكذا", "Uni = جامعة"],
    simplified: "كيف الحياة في الجامعة هناك؟",
    imagine: "🏫❓ شخص يسأل عن صديقته في الجامعة"
};

HELP_DATA["sprach1_exam5_q3"] = {
    text: "Musst du zuhause auch noch viel lernen?",
    meaning: "هل يجب عليك أن تتعلمي كثيراً أيضاً في المنزل؟",
    keywords: ["zuhause = في المنزل", "noch = أيضاً", "viel lernen = تعلمي كثيراً"],
    simplified: "هل لديك واجبات كثيرة في المنزل أيضاً؟",
    imagine: "🏠📚 طالبة تذاكر على مكتبها في المنزل"
};

HELP_DATA["sprach1_exam5_q4"] = {
    text: "Deshalb würde ich deine Einladung wirklich gerne annehmen",
    meaning: "لذلك أرغب حقاً في قبول دعوتك",
    keywords: ["annehmen = قبول", "Einladung = دعوة", "gerne = أرغب"],
    simplified: "أرغب حقاً في قبول دعوتك لزيارتك",
    imagine: "✉️👍 شخص يقرأ دعوة ويبتسم"
};

HELP_DATA["sprach1_exam5_q5"] = {
    text: "weil ich mich viel um Jonas kümmern muss",
    meaning: "لأنه يجب علي أن أعتني بيوناس كثيراً",
    keywords: ["kümmern = أعتني", "um = بـ", "viel = كثيراً"],
    simplified: "لأني أعتني كثيراً بيوناس الصغير",
    imagine: "👶🍼 امرأة تحمل طفلاً بين يديها"
};

HELP_DATA["sprach1_exam5_q6"] = {
    text: "Aber sobald frei hat, komme ich mal für ein, zwei Tage zu dir",
    meaning: "بمجرد أن يكون لديه إجازة، سآتي إليك ليوم أو يومين",
    keywords: ["sobald = بمجرد", "frei hat = لديه إجازة", "komme ich = سآتي"],
    simplified: "بمجرد أن يأخذ إجازة، سآتي إليك",
    imagine: "🗓️✈️ شخص ينظر إلى التقويم ويخطط لرحلة"
};

HELP_DATA["sprach1_exam5_q7"] = {
    text: "In einer Wohngemeinschaft zu leben, ist bestimmt toll, auch wenn es mal Streit gibt",
    meaning: "العيش في مجتمع سكني هو بالتأكيد رائع، حتى لو حدث شجار أحياناً",
    keywords: ["auch wenn = حتى لو", "Streit = شجار", "toll = رائع"],
    simplified: "العيش المشترك رائع حتى لو اختلفتم أحياناً",
    imagine: "🏠👥 شبان يعيشون معاً ويضحكون رغم الاختلافات"
};

HELP_DATA["sprach1_exam5_q8"] = {
    text: "Das freut mich wirklich für dich!",
    meaning: "هذا يسرني حقاً لأجلك!",
    keywords: ["freut mich = يسرني", "für dich = لأجلك", "wirklich = حقاً"],
    simplified: "أنا حقاً سعيدة لأجلك!",
    imagine: "😊🎉 شخص يفرح لنجاح صديقه"
};

HELP_DATA["sprach1_exam5_q9"] = {
    text: "Wir hatten neulich mal überlegt, in eine größere Wohnung zu ziehen",
    meaning: "كنا نفكر مؤخراً في الانتقال إلى شقة أكبر",
    keywords: ["neulich = مؤخراً", "überlegt = فكرنا", "größere Wohnung = شقة أكبر"],
    simplified: "كنا نفكر مؤخراً في الانتقال لشقة أكبر",
    imagine: "🏠📦 عائلة تنظر إلى شقة جديدة خالية"
};

HELP_DATA["sprach1_exam5_q10"] = {
    text: "und wir wollen uns nicht viel zumuten",
    meaning: "ولا نريد أن نرهق أنفسنا كثيراً",
    keywords: ["wollen = نريد", "zumuten = نرهق", "viel = كثيراً"],
    simplified: "لا نريد أن نضغط على أنفسنا كثيراً",
    imagine: "😌🚫 شخص يرفع يده رافضاً فكرة مرهقة"
};

// ============================================
// Exam 6 (exam6.json) - Liebe Karin (معدل)
// ============================================

HELP_DATA["sprach1_exam6_q1"] = {
    text: "Endlich kannst du auch das studieren, was du möchtest",
    meaning: "أخيراً يمكنك دراسة ما تريدينه",
    keywords: ["was = ما", "möchtest = تريدين", "endlich = أخيراً"],
    simplified: "تدرسين ما تريدينه أخيراً",
    imagine: "📚😊 فتاة تدرس كتباً بفرح"
};

HELP_DATA["sprach1_exam6_q2"] = {
    text: "Wie ist es denn so an der Uni dort?",
    meaning: "كيف الحال في الجامعة هناك؟",
    keywords: ["denn = إذاً", "so = هكذا", "Uni = جامعة"],
    simplified: "كيف الحياة في الجامعة هناك؟",
    imagine: "🏫❓ شخص يسأل عن صديقته في الجامعة"
};

HELP_DATA["sprach1_exam6_q3"] = {
    text: "Musst du zuhause auch noch viel lernen?",
    meaning: "هل يجب عليك أن تتعلمي كثيراً أيضاً في المنزل؟",
    keywords: ["zuhause = في المنزل", "noch = أيضاً", "viel lernen = تعلمي كثيراً"],
    simplified: "هل لديك واجبات كثيرة في المنزل أيضاً؟",
    imagine: "🏠📚 طالبة تذاكر على مكتبها في المنزل"
};

HELP_DATA["sprach1_exam6_q4"] = {
    text: "Jobbst du eigentlich noch nebenbei?",
    meaning: "هل تعملين بوظيفة جانبية أيضاً؟",
    keywords: ["nebenbei = جانبية", "jobbst = تعملين", "eigentlich = أيضاً"],
    simplified: "هل لديك عمل جانبي أيضاً؟",
    imagine: "💼👩‍💻 فتاة تعمل على حاسوبها بجانب الدراسة"
};

HELP_DATA["sprach1_exam6_q5"] = {
    text: "Deshalb würde ich deine Einladung wirklich gerne annehmen",
    meaning: "لذلك أرغب حقاً في قبول دعوتك",
    keywords: ["annehmen = قبول", "Einladung = دعوة", "gerne = أرغب"],
    simplified: "أرغب حقاً في قبول دعوتك لزيارتك",
    imagine: "✉️👍 شخص يقرأ دعوة ويبتسم"
};

HELP_DATA["sprach1_exam6_q6"] = {
    text: "Aber sobald frei hat, komme ich mal für ein, zwei Tage zu dir",
    meaning: "بمجرد أن يكون لديه إجازة، سآتي إليك ليوم أو يومين",
    keywords: ["sobald = بمجرد", "frei hat = لديه إجازة", "komme ich = سآتي"],
    simplified: "بمجرد أن يأخذ إجازة، سآتي إليك",
    imagine: "🗓️✈️ شخص ينظر إلى التقويم ويخطط لرحلة"
};

HELP_DATA["sprach1_exam6_q7"] = {
    text: "In einer Wohngemeinschaft zu leben, ist bestimmt toll, auch wenn es mal Streit gibt",
    meaning: "العيش في مجتمع سكني هو بالتأكيد رائع، حتى لو حدث شجار أحياناً",
    keywords: ["auch wenn = حتى لو", "Streit = شجار", "toll = رائع"],
    simplified: "العيش المشترك رائع حتى لو اختلفتم أحياناً",
    imagine: "🏠👥 شبان يعيشون معاً ويضحكون رغم الاختلافات"
};

HELP_DATA["sprach1_exam6_q8"] = {
    text: "dass ihr euch alle gut versteht",
    meaning: "أنكم جميعاً تتفاهمون جيداً",
    keywords: ["ihr = أنتم", "gut versteht = تتفاهمون جيداً", "alle = جميعاً"],
    simplified: "أنكم جميعاً تتفاهمون بشكل جيد",
    imagine: "🤝😊 مجموعة من الأصدقاء يضحكون معاً"
};

HELP_DATA["sprach1_exam6_q9"] = {
    text: "Wir hatten neulich mal überlegt, in eine größere Wohnung zu ziehen",
    meaning: "كنا نفكر مؤخراً في الانتقال إلى شقة أكبر",
    keywords: ["neulich = مؤخراً", "überlegt = فكرنا", "größere Wohnung = شقة أكبر"],
    simplified: "كنا نفكر مؤخراً في الانتقال لشقة أكبر",
    imagine: "🏠📦 عائلة تنظر إلى شقة جديدة خالية"
};

HELP_DATA["sprach1_exam6_q10"] = {
    text: "und wir wollen uns nicht viel zumuten",
    meaning: "ولا نريد أن نرهق أنفسنا كثيراً",
    keywords: ["wollen = نريد", "zumuten = نرهق", "viel = كثيراً"],
    simplified: "لا نريد أن نضغط على أنفسنا كثيراً",
    imagine: "😌🚫 شخص يرفع يده رافضاً فكرة مرهقة"
};

// ============================================
// Exam 7 (exam7.json) - Hallo Leon
// ============================================

HELP_DATA["sprach1_exam7_q1"] = {
    text: "Betreff: Grüße aus Berlin",
    meaning: "الموضوع: تحيات من برلين",
    keywords: ["Grüße = تحيات", "aus = من", "Berlin = برلين"],
    simplified: "تحياتي من برلين",
    imagine: "🏙️✉️ شخص يكتب رسالة من برلين"
};

HELP_DATA["sprach1_exam7_q2"] = {
    text: "Jetzt berichte ich dir, was alles los war",
    meaning: "الآن سأخبرك ماذا كان يحدث",
    keywords: ["was = ماذا", "los war = كان يحدث", "berichte = أخبر"],
    simplified: "سأخبرك بكل ما حدث",
    imagine: "📝🗣️ شخص يكتب رسالة ويشرح ما حدث"
};

HELP_DATA["sprach1_exam7_q3"] = {
    text: "weil drei Kollegen im Urlaub sind",
    meaning: "لأن ثلاثة زملاء في إجازة",
    keywords: ["weil = لأن", "Kollegen = زملاء", "Urlaub = إجازة"],
    simplified: "لأن ثلاثة زملاء في عطلة",
    imagine: "🏖️🙋 ثلاثة أشخاص على الشاطئ وزملاؤهم في المكتب متعبون"
};

HELP_DATA["sprach1_exam7_q4"] = {
    text: "Hoffentlich wird das in Zukunft besser organisiert",
    meaning: "آمل أن يتم تنظيم هذا بشكل أفضل في المستقبل",
    keywords: ["wird = سيكون", "besser = أفضل", "organisiert = منظم"],
    simplified: "أتمنى أن يتم التخطيط بشكل أفضل مستقبلاً",
    imagine: "📅🤔 شخص يخطط بجدية على تقويم"
};

HELP_DATA["sprach1_exam7_q5"] = {
    text: "Eigentlich war ich an dem Abend schon kaputt und wäre am liebsten zuhause geblieben",
    meaning: "كنت مرهقاً ذلك المساء وفضلت البقاء في المنزل",
    keywords: ["wäre geblieben = كنت سأبقى", "am liebsten = أفضل", "kaputt = مرهق"],
    simplified: "كنت مرهقاً وفضلت البقاء في المنزل",
    imagine: "🛋️😴 شخص مستلقٍ على الأريكة متعب"
};

HELP_DATA["sprach1_exam7_q6"] = {
    text: "Da konnte ich ja schlecht auf dem Sofa sitzen bleiben!",
    meaning: "لم أستطع البقاء جالساً على الأريكة!",
    keywords: ["konnte = استطعت", "schlecht = صعب", "bleiben = أبقى"],
    simplified: "لم أستطع البقاء على الأريكة!",
    imagine: "🛋️🚫 شخص يقف بسرعة من على الأريكة"
};

HELP_DATA["sprach1_exam7_q7"] = {
    text: "denn es war einfach nur super!",
    meaning: "لأنه كان رائعاً ببساطة!",
    keywords: ["denn = لأن", "super = رائع", "einfach = ببساطة"],
    simplified: "لأن الحفل كان رائعاً جداً!",
    imagine: "🎶🎸😍 شخص في حفل موسيقي مصاب بالدهشة"
};

HELP_DATA["sprach1_exam7_q8"] = {
    text: "Beides war zwar schön, aber auch anstrengend",
    meaning: "كلاهما كان جميلاً ولكنه مرهق أيضاً",
    keywords: ["Beides = كلاهما", "schön = جميل", "anstrengend = مرهق"],
    simplified: "كلاهما كان جميلاً ولكنه متعب",
    imagine: "😊😫 شخص يبتسم ويتثاءب في نفس الوقت"
};

HELP_DATA["sprach1_exam7_q9"] = {
    text: "Ich bin froh, dass wir für die kommenden Wochenenden noch keine Pläne haben",
    meaning: "أنا سعيد لأنه ليس لدينا خطط لعطل نهاية الأسبوع القادمة",
    keywords: ["noch = لا يزال", "keine Pläne = لا خطط", "froh = سعيد"],
    simplified: "سعيد لأنه لا توجد خطط لعطل نهاية الأسبوع",
    imagine: "🗓️😌 شخص ينظر إلى تقويم فارغ ويستريح"
};

HELP_DATA["sprach1_exam7_q10"] = {
    text: "ich freue mich auf deine nächste E-Mail!",
    meaning: "أنا متحمس لرسالتك الإلكترونية القادمة!",
    keywords: ["freue mich auf = متحمس لـ", "nächste = القادمة", "E-Mail = بريد إلكتروني"],
    simplified: "أنا متشوق لرسالتك القادمة!",
    imagine: "✉️🎉 شخص يشير إلى شاشة البريد الإلكتروني بسعادة"
};

// ============================================
// Exam 8 (exam8.json) - Sehr geehrter Herr Martini
// ============================================

HELP_DATA["sprach1_exam8_q1"] = {
    text: "zu der Studienreise Ihrer Schulklasse nach Frankfurt am Main",
    meaning: "بشأن رحلة الدراسة لصفك المدرسي إلى فرانكفورت",
    keywords: ["zu = بشأن", "Studienreise = رحلة دراسة", "Schulklasse = صف مدرسي"],
    simplified: "بخصوص رحلة صفك الدراسية إلى فرانكفورت",
    imagine: "🚌🏫 مجموعة من الطلاب في حافلة متجهة إلى رحلة"
};

HELP_DATA["sprach1_exam8_q2"] = {
    text: "im kommenden Oktober",
    meaning: "في شهر أكتوبر القادم",
    keywords: ["kommenden = القادم", "Oktober = أكتوبر", "im = في"],
    simplified: "في أكتوبر القادم",
    imagine: "📅🍁 تقويم يظهر شهر أكتوبر بورقة صفراء"
};

HELP_DATA["sprach1_exam8_q3"] = {
    text: "Die Familien werden von uns sorgfältig nach strengen Kriterien ausgewählt",
    meaning: "يتم اختيار العائلات من قبلنا بعناية وفق معايير صارمة",
    keywords: ["nach = وفق", "strengen = صارمة", "ausgewählt = مختارة"],
    simplified: "يتم اختيار العائلات بمعايير صارمة",
    imagine: "📋✅ شخص يضع علامات اختيار على قائمة معايير"
};

HELP_DATA["sprach1_exam8_q4"] = {
    text: "Unsere Gastfamilien bieten Halbpension an",
    meaning: "عائلاتنا المضيفة تقدم خدمة نصف إقامة",
    keywords: ["bieten = تقدم", "Halbpension = نصف إقامة", "Gastfamilien = عائلات مضيفة"],
    simplified: "العائلات المضيفة توفر الفطور والعشاء",
    imagine: "🍳🍲 طاولة عليها فطور وعشاء"
};

HELP_DATA["sprach1_exam8_q5"] = {
    text: "so dass der Weg von der Unterkunft zum Unterricht innerhalb von maximal 10 Minuten zu Fuß zurückgelegt werden kann",
    meaning: "بحيث يمكن قطع المسافة من السكن إلى الدرس سيراً على الأقدام في غضون 10 دقائق كحد أقصى",
    keywords: ["so dass = بحيث", "maximal = كحد أقصى", "zurückgelegt = مقطوعة"],
    simplified: "بحيث لا تستغرق المسافة من السكن إلى المدرسة أكثر من 10 دقائق سيراً",
    imagine: "🚶‍♂️⏱️ شخص يمشي والساعة تشير إلى 10 دقائق"
};

HELP_DATA["sprach1_exam8_q6"] = {
    text: "Gemeinsam mit Schülerinnen und Schülern der Partnerschule wird das Freizeit- und Kulturprogramm durchgeführt",
    meaning: "يتم تنفيذ برنامج الأنشطة والثقافة بمشاركة طلاب المدرسة الشريكة",
    keywords: ["Gemeinsam mit = بمشاركة", "Partnerschule = مدرسة شريكة", "durchgeführt = يتم تنفيذه"],
    simplified: "برنامج الأنشطة يتم بالتعاون مع طلاب المدرسة الشريكة",
    imagine: "👥🎨 طلاب ألمان وإيطاليون يرسمون معاً"
};

HELP_DATA["sprach1_exam8_q7"] = {
    text: "Dazu gehört z. B. der Besuch der Gemäldegalerie",
    meaning: "من ذلك مثلاً زيارة معرض اللوحات",
    keywords: ["Besuch = زيارة", "Gemäldegalerie = معرض لوحات", "gehört = يتضمن"],
    simplified: "من ضمن الأنشطة مثلاً زيارة معرض اللوحات",
    imagine: "🖼️🏛️ شخص واقف أمام لوحة فنية جميلة"
};

HELP_DATA["sprach1_exam8_q8"] = {
    text: "Auch ein Besuch beim Hessischen Rundfunk ist geplant",
    meaning: "من المخطط أيضاً زيارة إذاعة هيسن",
    keywords: ["geplant = مخطط", "Besuch = زيارة", "Rundfunk = إذاعة"],
    simplified: "من المخطط أيضاً زيارة استوديوهات الإذاعة",
    imagine: "🎙️📻 شخص يتحدث أمام ميكروفون في الإذاعة"
};

HELP_DATA["sprach1_exam8_q9"] = {
    text: "an denen die verschiedenen Aspekte und Unterschiede der deutschen und der italienischen Kultur besprochen werden sollen",
    meaning: "حيث سيتم مناقشة الجوانب المختلفة والاختلافات بين الثقافة الألمانية والإيطالية",
    keywords: ["besprochen = مناقشة", "Aspekte = جوانب", "Unterschiede = اختلافات"],
    simplified: "حيث يتم مناقشة أوجه التشابه والاختلاف بين الثقافتين",
    imagine: "🗣️🇩🇪🇮🇹 طلاب ألمان وإيطاليون يتحدثون معاً"
};

HELP_DATA["sprach1_exam8_q10"] = {
    text: "dass Sie und Ihre Klasse einen erlebnisreichen und unvergesslichen Aufenthalt in Frankfurt haben werden",
    meaning: "أنك أنت وصفك الدراسي ستقضون إقامة مليئة بالتجارب التي لا تُنسى في فرانكفورت",
    keywords: ["haben werden = سيكون لديكم", "erlebnisreichen = مليء بالتجارب", "unvergesslichen = لا يُنسى"],
    simplified: "أتمنى لكم إقامة لا تنسى في فرانكفورت",
    imagine: "🏙️✨ مجموعة من الطلاب ينظرون إلى أفق مدينة فرانكفورت"
};

// ============================================
// Exam 9 (exam9.json) - Sehr geehrter Herr Martini (معدل)
// ============================================

HELP_DATA["sprach1_exam9_q1"] = {
    text: "zu der Studienreise Ihrer Schulklasse nach Frankfurt am Main",
    meaning: "بشأن رحلة الدراسة لصفك المدرسي إلى فرانكفورت",
    keywords: ["Ihrer = صفك", "Studienreise = رحلة دراسة", "Schulklasse = صف مدرسي"],
    simplified: "بخصوص رحلة صفك الدراسية إلى فرانكفورت",
    imagine: "🚌🏫 مجموعة من الطلاب في حافلة متجهة إلى رحلة"
};

HELP_DATA["sprach1_exam9_q2"] = {
    text: "im kommenden Oktober",
    meaning: "في شهر أكتوبر القادم",
    keywords: ["kommenden = القادم", "Oktober = أكتوبر", "im = في"],
    simplified: "في أكتوبر القادم",
    imagine: "📅🍁 تقويم يظهر شهر أكتوبر بورقة صفراء"
};

HELP_DATA["sprach1_exam9_q3"] = {
    text: "Die Familien werden von uns sorgfältig nach strengen Kriterien ausgewählt",
    meaning: "يتم اختيار العائلات من قبلنا بعناية وفق معايير صارمة",
    keywords: ["nach = وفق", "strengen = صارمة", "ausgewählt = مختارة"],
    simplified: "يتم اختيار العائلات بمعايير صارمة",
    imagine: "📋✅ شخص يضع علامات اختيار على قائمة معايير"
};

HELP_DATA["sprach1_exam9_q4"] = {
    text: "Unsere Gastfamilien bieten Halbpension an",
    meaning: "عائلاتنا المضيفة تقدم خدمة نصف إقامة",
    keywords: ["bieten = تقدم", "Halbpension = نصف إقامة", "Gastfamilien = عائلات مضيفة"],
    simplified: "العائلات المضيفة توفر الفطور والعشاء",
    imagine: "🍳🍲 طاولة عليها فطور وعشاء"
};

HELP_DATA["sprach1_exam9_q5"] = {
    text: "so dass der Weg von der Unterkunft zum Unterricht innerhalb von maximal 10 Minuten zu Fuß zurückgelegt werden kann",
    meaning: "بحيث يمكن قطع المسافة من السكن إلى الدرس سيراً على الأقدام في غضون 10 دقائق كحد أقصى",
    keywords: ["so dass = بحيث", "maximal = كحد أقصى", "zurückgelegt = مقطوعة"],
    simplified: "بحيث لا تستغرق المسافة من السكن إلى المدرسة أكثر من 10 دقائق سيراً",
    imagine: "🚶‍♂️⏱️ شخص يمشي والساعة تشير إلى 10 دقائق"
};

HELP_DATA["sprach1_exam9_q6"] = {
    text: "Gemeinsam mit Schülerinnen und Schülern der Partnerschule wird das Freizeit- und Kulturprogramm durchgeführt",
    meaning: "يتم تنفيذ برنامج الأنشطة والثقافة بمشاركة طلاب المدرسة الشريكة",
    keywords: ["Gemeinsam mit = بمشاركة", "Partnerschule = مدرسة شريكة", "durchgeführt = يتم تنفيذه"],
    simplified: "برنامج الأنشطة يتم بالتعاون مع طلاب المدرسة الشريكة",
    imagine: "👥🎨 طلاب ألمان وإيطاليون يرسمون معاً"
};

HELP_DATA["sprach1_exam9_q7"] = {
    text: "Dazu gehört z. B. der Besuch der Gemäldegalerie",
    meaning: "من ذلك مثلاً زيارة معرض اللوحات",
    keywords: ["der Besuch = الزيارة", "Gemäldegalerie = معرض لوحات", "gehört = يتضمن"],
    simplified: "من ضمن الأنشطة مثلاً زيارة معرض اللوحات",
    imagine: "🖼️🏛️ شخص واقف أمام لوحة فنية جميلة"
};

HELP_DATA["sprach1_exam9_q8"] = {
    text: "Auch ein Besuch beim Hessischen Rundfunk ist geplant",
    meaning: "من المخطط أيضاً زيارة إذاعة هيسن",
    keywords: ["ist geplant = مخطط", "Besuch = زيارة", "Rundfunk = إذاعة"],
    simplified: "من المخطط أيضاً زيارة استوديوهات الإذاعة",
    imagine: "🎙️📻 شخص يتحدث أمام ميكروفون في الإذاعة"
};

HELP_DATA["sprach1_exam9_q9"] = {
    text: "an denen die verschiedenen Aspekte und Unterschiede der deutschen und der italienischen Kultur besprochen werden sollen",
    meaning: "حيث سيتم مناقشة الجوانب المختلفة والاختلافات بين الثقافة الألمانية والإيطالية",
    keywords: ["besprochen = مناقشة", "Aspekte = جوانب", "Unterschiede = اختلافات"],
    simplified: "حيث يتم مناقشة أوجه التشابه والاختلاف بين الثقافتين",
    imagine: "🗣️🇩🇪🇮🇹 طلاب ألمان وإيطاليون يتحدثون معاً"
};

HELP_DATA["sprach1_exam9_q10"] = {
    text: "dass Sie und Ihre Klasse einen erlebnisreichen und unvergesslichen Aufenthalt in Frankfurt haben werden",
    meaning: "أنك أنت وصفك الدراسي ستقضون إقامة مليئة بالتجارب التي لا تُنسى في فرانكفورت",
    keywords: ["haben werden = سيكون لديكم", "erlebnisreichen = مليء بالتجارب", "unvergesslichen = لا يُنسى"],
    simplified: "أتمنى لكم إقامة لا تنسى في فرانكفورت",
    imagine: "🏙️✨ مجموعة من الطلاب ينظرون إلى أفق مدينة فرانكفورت"
};

// ============================================
// Exam 10 (exam10.json) - Liebe Maria, lieber Timur
// ============================================

HELP_DATA["sprach1_exam10_q1"] = {
    text: "nachdem wir gestren aus dem Urlaub zurückgekommen waren",
    meaning: "بعد أن عدنا من العطلة بالأمس",
    keywords: ["waren zurückgekommen = كنا عدنا", "Urlaub = عطلة", "nachdem = بعد أن"],
    simplified: "بعد أن عدنا من الإجازة أمس",
    imagine: "✈️🏠 أشخاص يخرجون من المطار وهم يحملون حقائبهم"
};

HELP_DATA["sprach1_exam10_q2"] = {
    text: "Da gibt es nicht viel zu überlegen",
    meaning: "ليس هناك الكثير للتفكير فيه",
    keywords: ["Da = هناك", "nicht viel = ليس كثيراً", "zu überlegen = للتفكير"],
    simplified: "ليس هناك الكثير للنقاش فيه، بالطبع سنأتي",
    imagine: "💭❌ شخص يهز رأسه وكأنه يقول لا داعي للتفكير"
};

HELP_DATA["sprach1_exam10_q3"] = {
    text: "wir freuen uns sehr auf euch",
    meaning: "نحن متحمسون جداً لرؤيتكم",
    keywords: ["freuen uns = نحن متحمسون", "auf euch = لرؤيتكم", "sehr = جداً"],
    simplified: "نحن متشوقون جداً للقائكم",
    imagine: "👫🎉 زوجان يقفزان فرحاً لرؤية أصدقائهما"
};

HELP_DATA["sprach1_exam10_q4"] = {
    text: "sowohl in der Türkei als auch in Österreich zu feiern",
    meaning: "لإقامة الاحتفال سواء في تركيا أو في النمسا",
    keywords: ["sowohl...als auch = سواء...أو", "feiern = إقامة احتفال", "Türkei = تركيا"],
    simplified: "للاحتفال في تركيا وكذلك في النمسا",
    imagine: "🇹🇷🎉🇦🇹 علم تركيا وعلم النمسا ونجوم احتفال بينهما"
};

HELP_DATA["sprach1_exam10_q5"] = {
    text: "so können alle Freunde und Verwandten dabei sein",
    meaning: "بحيث يمكن لجميع الأصدقاء والأقارب الحضور",
    keywords: ["Verwandten = أقارب", "dabei sein = الحضور", "alle = جميع"],
    simplified: "بحيث يتمكن كل الأصدقاء والأقارب من المجيء",
    imagine: "👨‍👩‍👧‍👦🎊 عائلة وأصدقاء كبار يستعدون لحفل زفاف"
};

HELP_DATA["sprach1_exam10_q6"] = {
    text: "wir hoffen dass wir einige unserer alten Freunde wiedersehen werden",
    meaning: "نأمل أن نرى بعض أصدقائنا القدامى مرة أخرى",
    keywords: ["unserer = لنا", "alten Freunde = أصدقاء قدامى", "wiedersehen = نرى مرة أخرى"],
    simplified: "نأمل أن نلتقي ببعض أصدقائنا القدامى",
    imagine: "👥🤝 أصدقاء قديمون يعانقون بعضهم البعض بحرارة"
};

HELP_DATA["sprach1_exam10_q7"] = {
    text: "die wir dort als Jugendliche gemeinsam verbracht haben",
    meaning: "التي قضيناها هناك معاً كمراهقين",
    keywords: ["als = كـ", "Jugendliche = مراهقين", "verbracht = قضينا"],
    simplified: "التي قضيناها معاً هناك عندما كنا مراهقين",
    imagine: "👫🎶 شباب صغار يرقصون في حفلة ولا ينامون طوال الليل"
};

HELP_DATA["sprach1_exam10_q8"] = {
    text: "nun überlegen wir, ob wir nicht gleich ein Hotelzimmer für einige Tage buchen sollten",
    meaning: "الآن نفكر فيما إذا كنا لا يجب أن نحجز غرفة فندق لعدة أيام",
    keywords: ["ob = فيما إذا", "buchen = نحجز", "einige Tage = عدة أيام"],
    simplified: "الآن نفكر إذا كنا سنحجز غرفة فندق لبضعة أيام",
    imagine: "🏨🤔 زوجان ينظران إلى صور غرف فندق على الهاتف"
};

HELP_DATA["sprach1_exam10_q9"] = {
    text: "Ihr habt ja sicher mit den Vorbereitungen alle Hände voll zu tun",
    meaning: "أنتم بالتأكيد مشغولون جداً بالتحضيرات",
    keywords: ["zu tun = مشغولون", "Vorbereitungen = تحضيرات", "sicher = بالتأكيد"],
    simplified: "أنتم بالتأكيد مشغولون جداً بالتجهيزات",
    imagine: "💍🎂 عروسين يحملان الكثير من الصناديق ويتنقلان من مكان لآخر"
};

HELP_DATA["sprach1_exam10_q10"] = {
    text: "am Sonntag hätten wir die Gelegenheit, vor der Abreise noch gemütlich zusammen zu frühstücken",
    meaning: "يوم الأحد سنتاح لنا الفرصة لتناول الفطور معاً براحة قبل المغادرة",
    keywords: ["hätten wir = سنتاح لنا", "Gelegenheit = فرصة", "gemütlich = براحة"],
    simplified: "سيصبح لدينا وقت يوم الأحد لتناول فطور مريح معاً",
    imagine: "🍳🥞🍹 أصدقاء يجلسون حول طاولة إفطار"
};

// ============================================
// Exam 11 (exam11.json) - Lieber Justus
// ============================================

HELP_DATA["sprach1_exam11_q1"] = {
    text: "über die ich mich wirklich sehr gefreut habe",
    meaning: "التي فرحت بها حقاً كثيراً",
    keywords: ["über die = التي", "mich gefreut = فرحت", "sehr = كثيراً"],
    simplified: "التي أسعدتني كثيراً",
    imagine: "💌😊 شخص يقرأ بطاقة ويبتسم"
};

HELP_DATA["sprach1_exam11_q2"] = {
    text: "Ich wusste gar nicht, dass ihr gerne wandern geht",
    meaning: "لم أكن أعلم مطلقاً أنكم تحبون المشي لمسافات طويلة",
    keywords: ["gar nicht = مطلقاً", "wusste = علمت", "wandern = المشي لمسافات طويلة"],
    simplified: "لم أكن أعلم أنكم تحبون التنزه",
    imagine: "🥾🤔 رجل ينظر إلى خريطة طريق متعرجة"
};

HELP_DATA["sprach1_exam11_q3"] = {
    text: "aber mir hat das damals nicht besonders gefallen",
    meaning: "لكني لم أحب ذلك آنذاك بشكل خاص",
    keywords: ["besonders = بشكل خاص", "damals = آنذاك", "gefallen = أعجبني"],
    simplified: "لكن الأمر لم يعجبني عندما كنت صغيراً",
    imagine: "🚶‍♂️😒 طفل يمشي على طريق رملي ووجهه عابس"
};

HELP_DATA["sprach1_exam11_q4"] = {
    text: "schließlich habe ich schon im Alltag genug Stress",
    meaning: "ففي النهاية لدي ما يكفي من التوتر في حياتي اليومية",
    keywords: ["schließlich = في النهاية", "Alltag = الحياة اليومية", "Stress = إجهاد"],
    simplified: "لدي ما يكفي من المشاكل في روتيني اليومي",
    imagine: "😩💆‍♂️ رجل يضع يديه على وجهه تحت ضغط"
};

HELP_DATA["sprach1_exam11_q5"] = {
    text: "die Firma sogar noch weiter entfernt als deine alte?",
    meaning: "الشركة أبعد حتى من شركتك القديمة؟",
    keywords: ["entfernt = بعيدة", "weiter = أكثر", "Firma = شركة"],
    simplified: "هل مكان العمل الجديد أبعد من القديم؟",
    imagine: "📍🗺️ رجل يقيس على خريطة مسافة طويلة"
};

HELP_DATA["sprach1_exam11_q6"] = {
    text: "Ich denke im Moment auch darüber nach, die Stelle zu wechseln",
    meaning: "أفكر حالياً أيضاً في تغيير وظيفتي",
    keywords: ["wechseln = تغيير", "Stelle = وظيفة", "denke nach = أفكر"],
    simplified: "أفكر أيضاً في تغيير وظيفتي الحالية",
    imagine: "👔🤔 مستندات ووظيفة جديدة على مكتب"
};

HELP_DATA["sprach1_exam11_q7"] = {
    text: "Ehrlich gesagt langweile ich mich in den letzten Monaten immer häufiger",
    meaning: "بصراحة، أشعر بالملل بشكل متكرر في الأشهر الأخيرة",
    keywords: ["Ehrlich gesagt = بصراحة", "langweile = أشعر بالملل", "immer häufiger = بشكل متكرر"],
    simplified: "بصراحة، أشعر بالملل أكثر فأكثر مؤخراً",
    imagine: "😑⏱️ شخص ينظر إلى الساعة وهو يشعر بالملل في العمل"
};

HELP_DATA["sprach1_exam11_q8"] = {
    text: "Deshalb mache ich ab dem kommenden Monat erst mal eine Weiterbildung",
    meaning: "لذلك سأبدأ دورة تدريبية بدءاً من الشهر القادم أولاً",
    keywords: ["kommenden = القادم", "Weiterbildung = دورة تدريبية", "ab = بدءاً من"],
    simplified: "سأبدأ برنامجاً تدريبياً الشهر القادم أولاً",
    imagine: "📚🖊️ رجل يكتب بصورة ملهمة وكومة كتب أمامه"
};

HELP_DATA["sprach1_exam11_q9"] = {
    text: "Schließlich wird es auch immer schwieriger, je älter man ist",
    meaning: "ففي النهاية، الأمر يصبح أصعب كلما تقدمنا في السن",
    keywords: ["Schließlich = في النهاية", "schwieriger = أصعب", "je älter = كلما تقدم السن"],
    simplified: "من الأصعب العثور على عمل عندما يتقدم المرء في السن",
    imagine: "📉👴 رسم بياني يظهر انخفاضاً مع تقدم العمر"
};

HELP_DATA["sprach1_exam11_q10"] = {
    text: "Wie wäre es, wenn wir uns demnächst treffen würden?",
    meaning: "ما رأيك أن نلتقي قريباً؟",
    keywords: ["Wie wäre es = ما رأيك", "demnächst = قريباً", "treffen = نلتقي"],
    simplified: "هل لديك رغبة في لقاء قريباً؟",
    imagine: "🤝👋 شخصان يصافحان بعضهما البعض ويبتسمان"
};

// ============================================
// Exam 12 (exam12.json) - Lieber Justus (معدل)
// ============================================

HELP_DATA["sprach1_exam12_q1"] = {
    text: "über die ich mich wirklich sehr gefreut habe",
    meaning: "التي فرحت بها حقاً كثيراً",
    keywords: ["über die = التي", "mich gefreut = فرحت", "sehr = كثيراً"],
    simplified: "التي أسعدتني كثيراً",
    imagine: "💌😊 شخص يقرأ بطاقة ويبتسم"
};

HELP_DATA["sprach1_exam12_q2"] = {
    text: "Ich wusste ersten nicht, dass ihr gerne wandern geht",
    meaning: "لم أكن أعلم في البداية أنكم تحبون المشي لمسافات طويلة",
    keywords: ["ersten = في البداية", "wusste = علمت", "wandern = المشي لمسافات طويلة"],
    simplified: "لم أكن أعلم في البداية أنكم تحبون التنزه",
    imagine: "🥾🤔 رجل ينظر إلى خريطة طريق متعرجة"
};

HELP_DATA["sprach1_exam12_q3"] = {
    text: "aber mir hat das damals nicht besonders gefallen",
    meaning: "لكني لم أحب ذلك آنذاك بشكل خاص",
    keywords: ["besonders = بشكل خاص", "damals = آنذاك", "gefallen = أعجبني"],
    simplified: "لكن الأمر لم يعجبني عندما كنت صغيراً",
    imagine: "🚶‍♂️😒 طفل يمشي على طريق رملي ووجهه عابس"
};

HELP_DATA["sprach1_exam12_q4"] = {
    text: "schließen habe ich schon im Alltag genug Stress",
    meaning: "ففي النهاية لدي ما يكفي من التوتر في حياتي اليومية",
    keywords: ["schließen = في النهاية", "Alltag = الحياة اليومية", "Stress = إجهاد"],
    simplified: "لدي ما يكفي من المشاكل في روتيني اليومي",
    imagine: "😩💆‍♂️ رجل يضع يديه على وجهه تحت ضغط"
};

HELP_DATA["sprach1_exam12_q5"] = {
    text: "die Firma sogar noch weiter entfernt als deine alte?",
    meaning: "الشركة أبعد حتى من شركتك القديمة؟",
    keywords: ["entfernt = بعيدة", "weiter = أكثر", "Firma = شركة"],
    simplified: "هل مكان العمل الجديد أبعد من القديم؟",
    imagine: "📍🗺️ رجل يقيس على خريطة مسافة طويلة"
};

HELP_DATA["sprach1_exam12_q6"] = {
    text: "Ich denke im Moment auch darüber nach, die Stelle zu wechseln",
    meaning: "أفكر حالياً أيضاً في تغيير وظيفتي",
    keywords: ["wechseln = تغيير", "Stelle = وظيفة", "denke nach = أفكر"],
    simplified: "أفكر أيضاً في تغيير وظيفتي الحالية",
    imagine: "👔🤔 مستندات ووظيفة جديدة على مكتب"
};

HELP_DATA["sprach1_exam12_q7"] = {
    text: "Ehrlich zu sagen langweile ich mich in den letzten Monaten immer häufiger",
    meaning: "بصراحة، أشعر بالملل بشكل متكرر في الأشهر الأخيرة",
    keywords: ["zu sagen = القول", "langweile = أشعر بالملل", "immer häufiger = بشكل متكرر"],
    simplified: "بصراحة، أشعر بالملل أكثر فأكثر مؤخراً",
    imagine: "😑⏱️ شخص ينظر إلى الساعة وهو يشعر بالملل في العمل"
};

HELP_DATA["sprach1_exam12_q8"] = {
    text: "ab dem kommenden Monat eine Weiterbildung",
    meaning: "ابتداء من الشهر القادم دورة تدريبية",
    keywords: ["kommenden = القادم", "Weiterbildung = دورة تدريبية", "ab = ابتداء من"],
    simplified: "سأبدأ برنامجاً تدريبياً الشهر القادم",
    imagine: "📚🖊️ رجل يكتب بصورة ملهمة وكومة كتب أمامه"
};

HELP_DATA["sprach1_exam12_q9"] = {
    text: "je älter man ist, desto schwieriger wird es",
    meaning: "كلما تقدم المرء في السن، زادت الصعوبة",
    keywords: ["je älter = كلما تقدم السن", "schwieriger = أكثر صعوبة", "desto = كلما"],
    simplified: "من الأصعب العثور على عمل كلما تقدم المرء في السن",
    imagine: "📉👴 رسم بياني يظهر انخفاضاً مع تقدم العمر"
};

HELP_DATA["sprach1_exam12_q10"] = {
    text: "Wie wäre es, wenn wir uns demnächst treffen würden?",
    meaning: "ما رأيك أن نلتقي قريباً؟",
    keywords: ["Wie wäre es = ما رأيك", "demnächst = قريباً", "treffen = نلتقي"],
    simplified: "هل لديك رغبة في لقاء قريباً؟",
    imagine: "🤝👋 شخصان يصافحان بعضهما البعض ويبتسمان"
};

// ============================================
// Exam 13 (exam13.json) - Lieber Thomas
// ============================================

HELP_DATA["sprach1_exam13_q1"] = {
    text: "obwohl ich mir das bisher nie zugetraut hatte",
    meaning: "على الرغم من أنني لم أجرؤ على ذلك أبداً من قبل",
    keywords: ["obwohl = على الرغم من", "nie = أبداً", "zugetraut = تجرأت"],
    simplified: "بالرغم من أنني لم أعتقد أنني سأفعل هذا أبداً",
    imagine: "🎿😰 شخص خائف على قمة جبل ثلجي"
};

HELP_DATA["sprach1_exam13_q2"] = {
    text: "hatte sie schon einen individuellen Skikurs für mich gebucht",
    meaning: "كانت قد حجزت دورة تزلج خاصة لي",
    keywords: ["hatte gebucht = كانت قد حجزت", "individuellen = خاصة", "Skikurs = دورة تزلج"],
    simplified: "لقد حجزت دروس تزلج خاصة بي",
    imagine: "📅📞 فتاة تتحدث على الهاتف وتكتب في دفتر ملاحظات"
};

HELP_DATA["sprach1_exam13_q3"] = {
    text: "Ich wollte es mir schon anders überlegen",
    meaning: "كنت أرغب بالفعل في تغيير رأيي",
    keywords: ["wollte = أردت", "anders überlegen = تغيير رأيي", "schon = بالفعل"],
    simplified: "كنت أرغب بالفعل في العدول عن الفكرة",
    imagine: "🤔😬 رجل يضع يده على ذقنه وهو ينظر إلى الأسفل"
};

HELP_DATA["sprach1_exam13_q4"] = {
    text: "aber Lisa wollte nichts davon hören",
    meaning: "لكن ليزا لم ترغب في سماع أي شيء عن ذلك",
    keywords: ["davon = عن ذلك", "hören = تسمع", "nichts = لا شيء"],
    simplified: "لكن ليزا رفضت الاستماع عن التفكير في التخلي عن الأمر",
    imagine: "🙉💪 ليزا تضع أصابعها في أذنيها بقوة"
};

HELP_DATA["sprach1_exam13_q5"] = {
    text: "Einerseits war ich ziemlich aufgeregt",
    meaning: "من جهة كنت متوترة بعض الشيء",
    keywords: ["Einerseits = من جهة", "ziemlich = بعض الشيء", "aufgeregt = متوترة"],
    simplified: "من ناحية كنت متوترة جداً",
    imagine: "😰⛷️ فتاة ترتدي معدات التزلج ووجهها متوتر"
};

HELP_DATA["sprach1_exam13_q6"] = {
    text: "Sie hat mich abgeholt und mir dabei geholfen",
    meaning: "جاءت لاصطحابي وساعدتني في ذلك",
    keywords: ["dabei = في ذلك", "abgeholt = اصطحبت", "geholfen = ساعدت"],
    simplified: "لقد أتت لاصطحابي وساعدتني في هذا الأمر",
    imagine: "🤝👩‍🏫 امرأة تمد يدها لتساعد صديقتها"
};

HELP_DATA["sprach1_exam13_q7"] = {
    text: "Schuhe, Skier, Stöcke und einen Helm für mich auszusuchen",
    meaning: "لاختيار أحذية وزلاجات وعصي وخوذة لي",
    keywords: ["auszusuchen = لاختيار", "Schuhe = أحذية", "Skier = زلاجات"],
    simplified: "لمساعدتي في اختيار كافة المعدات التي أحتاجها",
    imagine: "🎿👢👟 مجموعة من معدات التزلج موضوعة على الرف"
};

HELP_DATA["sprach1_exam13_q8"] = {
    text: "grundlegende Dinge erklärt",
    meaning: "شرحت لي الأمور الأساسية",
    keywords: ["grundlegende = أساسية", "Dinge = أمور", "erklärt = شرحت"],
    simplified: "شرحت لي أساسيات التزلج",
    imagine: "📋🗣️ امرأة تشرح صورة لشخص يتزلج"
};

HELP_DATA["sprach1_exam13_q9"] = {
    text: "Die Kinder im Zwergerlkurs scheinen im Gegensatz zu mir überhaupt keine Angst zu haben",
    meaning: "يبدو أن الأطفال في دورة الأقزام على عكس مني لا يخافون إطلاقاً",
    keywords: ["im Gegensatz zu = على عكس", "überhaupt = إطلاقاً", "Angst = خوف"],
    simplified: "يبدو أن الأطفال الصغار في دورة تعليم التزلج لا يشعرون بالخوف أبداً على عكسي",
    imagine: "👧🎿 طفلة تبتعد وهي تنزلق بسهولة على المنحدر"
};

HELP_DATA["sprach1_exam13_q10"] = {
    text: "Ich weiß gar nicht, wie ich das schaffen soll",
    meaning: "لا أعرف مطلقاً كيف سأتمكن من فعل هذا",
    keywords: ["wie = كيف", "schaffen = أتمكن", "gar nicht = مطلقاً"],
    simplified: "أنا لا أفهم كيف سأتمكن من فعل هذا أصلاً",
    imagine: "😩🤷‍♀️ فتاة تنظر إلى منحدر ثلجي مرتفع وقد استسلمت"
};

// ============================================
// Exam 14 (exam14.json) - Sehr geehrte Frau Goronska
// ============================================

HELP_DATA["sprach1_exam14_q1"] = {
    text: "davon in Deutschland und zwei in Österreich",
    meaning: "منها في ألمانيا واثنتان في النمسا",
    keywords: ["davon = منها", "Deutschland = ألمانيا", "Österreich = النمسا"],
    simplified: "ثماني مدارس في ألمانيا واثنتان في النمسا",
    imagine: "🏫🇩🇪🏫🇦🇹 مدارس على خريطة بين دولتين"
};

HELP_DATA["sprach1_exam14_q2"] = {
    text: "an denen Sie ausnahmslos sowohl Ihr Deutsch verbessern als auch an einem anspruchsvollen Kultur- und Freizeitprogramm teilnehmen können",
    meaning: "حيث يمكنك دون استثناء تحسين لغتك الألمانية وكذلك المشاركة في برنامج ثقافي وترفيهي مكثف",
    keywords: ["denen = حيث", "ausnahmslos = دون استثناء", "sowohl...als auch = سواء...أو"],
    simplified: "حيث يمكنكم تحسين لغتكم الألمانية والمشاركة في الأنشطة الثقافية في نفس الوقت",
    imagine: "📚🎭 طالب في فصل دراسي ومرحلة مسرح في الخلف"
};

HELP_DATA["sprach1_exam14_q3"] = {
    text: "an fünf Tagen pro Woche statt",
    meaning: "تقام خمسة أيام في الأسبوع",
    keywords: ["an = في", "fünf Tagen = خمسة أيام", "statt = تقام"],
    simplified: "تقام حصص اللغة خمسة أيام أسبوعياً",
    imagine: "📅⏰ تقويم به خمسة أيام مميزة"
};

HELP_DATA["sprach1_exam14_q4"] = {
    text: "Mittwochs ist kein Nachmittagsunterricht",
    meaning: "لا توجد حصص بعد الظهر يوم الأربعاء",
    keywords: ["Mittwochs = أيام الأربعاء", "kein = لا يوجد", "Nachmittagsunterricht = حصص بعد الظهر"],
    simplified: "لا توجد دروس بعد الظهر يوم الأربعاء",
    imagine: "📅😴 تقويم عليه علامة إجازة يوم الأربعاء"
};

HELP_DATA["sprach1_exam14_q5"] = {
    text: "Zu Beginn jedes Kurses wird ein Einstufungstest durchgeführt",
    meaning: "في بداية كل دورة يتم إجراء اختبار تحديد مستوى",
    keywords: ["jedes Kurses = كل دورة", "Einstufungstest = اختبار تحديد مستوى", "durchgeführt = يتم إجراؤه"],
    simplified: "في بداية كل صف، سنجري اختباراً لتحديد مستواك",
    imagine: "📝✍️ شخص يكتب في اختبار وأستاذ ينظر إليه"
};

HELP_DATA["sprach1_exam14_q6"] = {
    text: "mit dessen Hilfe wir herausfinden, welcher Kurs für Sie der geeignete ist",
    meaning: "بمساعدة هذا (الاختبار) نكتشف الدورة المناسبة لك",
    keywords: ["dessen = هذا", "herausfinden = نكتشف", "geeignete = المناسبة"],
    simplified: "هذا سيساعدنا في معرفة الصف المناسب لمستواك",
    imagine: "📈📝 ورق اختبار وعلامة استفهام"
};

HELP_DATA["sprach1_exam14_q7"] = {
    text: "wenn Sie den Test bestehen",
    meaning: "إذا نجحت في الامتحان",
    keywords: ["wenn = إذا", "bestehen = نجحت", "Test = امتحان"],
    simplified: "ستحصل على شهادة معتمدة دولياً إذا نجحت في الاختبار",
    imagine: "📜🎓 يد تحمل شهادة واختام براقة"
};

HELP_DATA["sprach1_exam14_q8"] = {
    text: "Ihnen vor Ort angeboten werden",
    meaning: "تُعرض لك في المكان نفسه",
    keywords: ["Ihnen = لك", "vor Ort = في المكان نفسه", "angeboten = معروضة"],
    simplified: "سيتم شرح الخيارات المتاحة لك عند وصولك",
    imagine: "📍🗣️ امرأة تشرح شيئاً لسائحين"
};

HELP_DATA["sprach1_exam14_q9"] = {
    text: "Im Unterkunftspreis ist jeweils Halbpension eingeschlossen",
    meaning: "سعر الإقامة يشمل نصف إقامة في كل حالة",
    keywords: ["ist eingeschlossen = مشمول", "Halbpension = نصف إقامة", "Unterkunftspreis = سعر الإقامة"],
    simplified: "سعر الغرفة يشمل وجبتين في اليوم",
    imagine: "🍽️🛏️ سرير مع طاولة عليها طبق فطور ومائدة عشاء صغيرة"
};

HELP_DATA["sprach1_exam14_q10"] = {
    text: "eine Diät halten müssen",
    meaning: "يجب أن تتبع نظاماً غذائياً خاصاً",
    keywords: ["eine Diät = نظاماً غذائياً", "halten = تتبع", "müssen = يجب أن"],
    simplified: "يرجى إخبارنا إذا كنتم بحاجة لنظام غذائي خاص",
    imagine: "🥗🍚 طبق طعام صحي مع خضروات وحبوب"
};

// ============================================
// Exam 15 (exam15.json) - Liebe Agnieszka
// ============================================

HELP_DATA["sprach1_exam15_q1"] = {
    text: "dass ich dir das letzte Mal geschrieben habe",
    meaning: "أنني كتبت لك آخر مرة",
    keywords: ["her = الأن", "geschrieben = كتبت", "letzte Mal = آخر مرة"],
    simplified: "منذ أن كتبت لك آخر مرة",
    imagine: "📅✍️ ماضٍ منذ نصف عام"
};

HELP_DATA["sprach1_exam15_q2"] = {
    text: "ist unsere Lehrerin, Frau Reuter, erkrankt",
    meaning: "معلمتنا، السيدة روتر، مرضت",
    keywords: ["erkrankt = مرضت", "Lehrerin = معلمة", "Reuter = روتر"],
    simplified: "لقد مرضت معلمتنا فجأة",
    imagine: "🤒👩‍🏫 معلمة ترتدي منديلاً حول رقبتها"
};

HELP_DATA["sprach1_exam15_q3"] = {
    text: "als unsere Prüfung schon längst vorbei ist",
    meaning: "بينما تنتهي امتحاناتنا منذ وقت طويل",
    keywords: ["als = بينما", "längst = منذ وقت طويل", "vorbei = منتهية"],
    simplified: "وسوف تعود فقط بعد أن ننتهي من الامتحانات",
    imagine: "📅🎓 تقويم به علامة اكتمال وانتهاء"
};

HELP_DATA["sprach1_exam15_q4"] = {
    text: "ist zwar sehr nett",
    meaning: "هي لطيفة جداً بالفعل",
    keywords: ["zwar = بالفعل", "sehr nett = لطيفة جداً", "ist = هي"],
    simplified: "بديلة المعلمة لطيفة",
    imagine: "😊👩‍🏫 معلمة جديدة تبتعد قليلاً"
};

HELP_DATA["sprach1_exam15_q5"] = {
    text: "Und dann werde ich alle Bücher und Hefte in die Ecke legen",
    meaning: "وبعد ذلك سأضع جميع الكتب والدفاتر في الزاوية",
    keywords: ["werde = سأ", "alle Bücher = جميع الكتب", "in die Ecke = في الزاوية"],
    simplified: "سأضع كل كتبي في زاوية",
    imagine: "📚🗑️ شخص يرمي كتباً في الزاوية"
};

HELP_DATA["sprach1_exam15_q6"] = {
    text: "Darauf freue ich mich schon riesig",
    meaning: "أنا متحمسة جداً لذلك بالفعل",
    keywords: ["Darauf = لذلك", "freue ich mich = أنا متحمسة", "riesig = جداً"],
    simplified: "أنا متحمسة حقاً لذلك بالفعل",
    imagine: "🎉💃 امرأة تقفز فرحاً"
};

HELP_DATA["sprach1_exam15_q7"] = {
    text: "Was hältst du dazu?",
    meaning: "ما رأيك في ذلك؟",
    keywords: ["hältst du = رأيك", "dazu = في ذلك", "Was = ما"],
    simplified: "ما رأيك في رأيي؟",
    imagine: "🤔❓ رأس يدور وعلامة استفهام"
};

HELP_DATA["sprach1_exam15_q8"] = {
    text: "oder tanzen sie dir noch immer auf der Nase herum",
    meaning: "أم لا يزالون يستغلونك/يتلاعبون بك",
    keywords: ["dir = بك", "herumtanzen = يتلاعبون", "noch immer = لا يزالون"],
    simplified: "هل ما زالوا يعصون أوامرك",
    imagine: "🤹‍♀️👶 طفل صغير يقفز على شخص بالغ"
};

HELP_DATA["sprach1_exam15_q9"] = {
    text: "Es ist bestimmt nicht so leicht, einen zweijährigen Jungen und ein vierjähriges Mädchen den ganzen Tag zu beschäftigen",
    meaning: "ليس من السهل بالتأكيد إبقاء طفل عمره سنتان وفتاة عمرها أربع سنوات مشغولين طوال اليوم",
    keywords: ["zu beschäftigen = إبقاء مشغولين", "den ganzen Tag = طوال اليوم", "nicht so leicht = ليس سهلاً"],
    simplified: "من الصعب جداً رعاية طفلين صغيرين طوال اليوم",
    imagine: "👶🧒 اثنان من الأطفال يتجولان حول امرأة مرهقة"
};

HELP_DATA["sprach1_exam15_q10"] = {
    text: "wie du mit den Kindern zurechtkommst",
    meaning: "كيف تتعاملين مع الأطفال بنجاح",
    keywords: ["wie = كيف", "zurechtkommst = تتعاملين بنجاح", "Kindern = أطفال"],
    simplified: "لقد اكتشفت كيفية التعامل مع الأطفال",
    imagine: "🤝🧸 امرأة تلعب بهدوء مع طفل صغير"
};

// ============================================
// Exam 16 (exam16.json) - Liebe Anna
// ============================================

HELP_DATA["sprach1_exam16_q1"] = {
    text: "Jetzt ist schon bald ein halbes Jahr vergangen",
    meaning: "لقد مر الآن ما يقرب من نصف عام",
    keywords: ["vergangen = مر", "halb = نصف", "bald = قريباً"],
    simplified: "لقد مضى الآن حوالي ستة أشهر",
    imagine: "📅 مع مرور الوقت"
};

HELP_DATA["sprach1_exam16_q2"] = {
    text: "ist unsere Lehrerin, Frau Reuter, plötzlich erkrankt",
    meaning: "مرضت معلمتنا، السيدة روتر، فجأة",
    keywords: ["plötzlich = فجأة", "erkrankt = مرضت", "Lehrerin = معلمة"],
    simplified: "مرضت معلمتنا فجأة",
    imagine: "🤒👩‍🏫 معلمة تسعل"
};

HELP_DATA["sprach1_exam16_q3"] = {
    text: "wenn unsere Prüfung schon längst vorbei ist",
    meaning: "عندما تنتهي امتحاناتنا منذ فترة طويلة",
    keywords: ["wenn = عندما", "längst = منذ فترة طويلة", "vorbei = منتهية"],
    simplified: "لن تعود حتى انتهاء الامتحانات",
    imagine: "📅🎓 تقويم يشير إلى الانتهاء"
};

HELP_DATA["sprach1_exam16_q4"] = {
    text: "ist zwar sehr nett",
    meaning: "لطيفة جداً بالفعل",
    keywords: ["zwar = بالفعل", "sehr nett = لطيفة جداً", "ist = هي"],
    simplified: "معلمتنا البديلة لطيفة جداً",
    imagine: "😊👩‍🏫 معلمة لطيفة"
};

HELP_DATA["sprach1_exam16_q5"] = {
    text: "werde ich alle Bücher und Hefte in die Ecke legen",
    meaning: "كنت سأضع كل الكتب والدفاتر في الزاوية",
    keywords: ["werde = سأ", "alle Bücher = كل الكتب", "in die Ecke = في الزاوية"],
    simplified: "سأضع كل كتبي في الزاوية بعد الامتحان",
    imagine: "📚🗑️ كتب ترمى جانباً"
};

HELP_DATA["sprach1_exam16_q6"] = {
    text: "Darauf freue ich mich schon riesig",
    meaning: "أنا متحمسة جداً لذلك بالفعل",
    keywords: ["Darauf = لذلك", "freue ich mich = أنا متحمسة", "riesig = جداً"],
    simplified: "أتطلع لذلك بشدة بالفعل",
    imagine: "🎉💃 امرأة تقفز فرحاً"
};

HELP_DATA["sprach1_exam16_q7"] = {
    text: "Was hältst du davon?",
    meaning: "ما رأيك في ذلك؟",
    keywords: ["davon = في ذلك", "hältst du = رأيك", "Was = ما"],
    simplified: "ما هو رأيك؟",
    imagine: "🤔❓ شخص يفكر"
};

HELP_DATA["sprach1_exam16_q8"] = {
    text: "tanzen sie dir immer noch auf der Nase herum",
    meaning: "هل ما زالوا يستغلونك",
    keywords: ["auf = على", "herumtanzen = يتلاعبون", "dir = بك"],
    simplified: "هل ما زالوا يعصونك",
    imagine: "🤹‍♀️👶 طفل يلعب"
};

HELP_DATA["sprach1_exam16_q9"] = {
    text: "einen zweijährigen Jungen und ein vierjähriges Mädchen den ganzen Tag zu beschäftigen",
    meaning: "إبقاء طفل عمره سنتان وفتاة عمرها أربع سنوات مشغولين طوال اليوم",
    keywords: ["zu beschäftigen = إبقاء مشغولين", "den ganzen Tag = طوال اليوم", "nicht so leicht = ليس سهلاً"],
    simplified: "رعاية طفلين صغيرين صعب جداً",
    imagine: "👶🧒 أطفال مشاغبون"
};

HELP_DATA["sprach1_exam16_q10"] = {
    text: "wie du mit den Kindern zurechtkommst",
    meaning: "كيف تتعاملين مع الأطفال بنجاح",
    keywords: ["wie = كيف", "zurechtkommst = تتعاملين بنجاح", "Kindern = أطفال"],
    simplified: "لقد اكتشفت كيفية التعامل معهم",
    imagine: "🤝🧸 تتعامل بشكل جيد مع الأطفال"
};

// ============================================
// Exam 17 (exam17.json) - Sehr geehrter Herr Dr. Moosberger
// ============================================

HELP_DATA["sprach1_exam17_q1"] = {
    text: "Mit allergrößtem Interesse",
    meaning: "باهتمام بالغ للغاية",
    keywords: ["allergrößtem = بالغ", "Interesse = اهتمام", "Mit = بـ"],
    simplified: "باهتمام كبير جداً قرأت إعلانك",
    imagine: "📰👀 شخص يقرأ جريدة ويمسك قلماً"
};

HELP_DATA["sprach1_exam17_q2"] = {
    text: "in dem Sie eine Teilzeit-Mitarbeiterin suchen",
    meaning: "الذي تبحث فيه عن موظفة بدوام جزئي",
    keywords: ["in dem = الذي", "Teilzeit-Mitarbeiterin = موظفة بدوام جزئي", "suchen = تبحث"],
    simplified: "بحثك عن موظفة بدوام جزئي",
    imagine: "📋✍️ إعلان وظيفة يقرأ على جهاز لوحي"
};

HELP_DATA["sprach1_exam17_q3"] = {
    text: "in einem so renommierten Geschäft wie dem Ihren",
    meaning: "في متجر مرموق مثل متجركم",
    keywords: ["so = مثل هذا", "renommierten = مرموق", "Geschäft = متجر"],
    simplified: "فرصة عمل في متجر عريق مثلكم",
    imagine: "🏛️✨ واجهة متجر أنيقة وزبون يعجب"
};

HELP_DATA["sprach1_exam17_q4"] = {
    text: "eine verantwortungsvolle Aufgabe übernehmen zu können",
    meaning: "أن أتمكن من تولي مهمة تتطلب مسؤولية عالية",
    keywords: ["übernehmen = تولي", "verantwortungsvolle Aufgabe = مهمة تتطلب مسؤولية", "zu können = القدرة على"],
    simplified: "القبول بمهمة تتطلب مهارات عالية",
    imagine: "📁👔 محفظة جلدية بحجم شخص"
};

HELP_DATA["sprach1_exam17_q5"] = {
    text: "begann ich eine dreijährige Schreinerlehre",
    meaning: "بدأت تدريباً مهنياً لمدة ثلاث سنوات كنجار",
    keywords: ["begann = بدأت", "dreijährige = لمدة ثلاث سنوات", "Schreinerlehre = تدريب نجارة"],
    simplified: "التحقت بدورة تدريب مهني في النجارة",
    imagine: "🪚🔨 طاولة عمل خشبية مزودة بمشابك وأدوات"
};

HELP_DATA["sprach1_exam17_q6"] = {
    text: "arbeitete ich ein Jahr lang bei Stutz & Partner",
    meaning: "عملت لمدة عام في شركة شتوتز وشركاه",
    keywords: ["ein Jahr lang = لمدة عام", "arbeitete = عملت", "Stutz & Partner = شتوتز وشركاه"],
    simplified: "عملت في شركة تصميم أثاث لمدة سنة",
    imagine: "🪑🏢 موظف في مكتب تصميم أثاث عصري"
};

HELP_DATA["sprach1_exam17_q7"] = {
    text: "und entdeckte meine Liebe zu antiquarischen Möbelstücken",
    meaning: "واكتشفت حبي للأثاث العتيق",
    keywords: ["entdeckte = اكتشفت", "Liebe = حب", "antiquarischen = عتيق"],
    simplified: "هناك تعرفت على شغفي بالأثاث القديم",
    imagine: "🚪🪑 غرفة مليئة بالكراسي القديمة الجميلة"
};

HELP_DATA["sprach1_exam17_q8"] = {
    text: "Während meiner Berufstätigkeit und meines Studiums",
    meaning: "خلال فترة عملي ودراستي",
    keywords: ["Während = خلال", "Berufstätigkeit = عملي", "Studiums = دراستي"],
    simplified: "أثناء مسيرتي العملية ودراستي",
    imagine: "🎓💼 قبعة تخرج وحقيبة عمل جنباً إلى جنب"
};

HELP_DATA["sprach1_exam17_q9"] = {
    text: "sowohl in Nord- als auch in Südeuropa",
    meaning: "سواء في شمال أو جنوب أوروبا",
    keywords: ["sowohl...als auch = سواء...أو", "Nord = شمال", "Südeuropa = جنوب أوروبا",],
    simplified: "في جميع أنحاء أوروبا من الشمال إلى الجنوب",
    imagine: "🗺️🧭 خريطة أوروبا عليها أسهم تشير إلى كل مكان"
};

HELP_DATA["sprach1_exam17_q10"] = {
    text: "auf Ihre Anzeige zu antworten",
    meaning: "للاعلان على إعلانكم",
    keywords: ["antworten = الإعلان", "Anzeige = إعلان", "auf = على"],
    simplified: "أرد الرد على إعلان فرصة العمل",
    imagine: "📨✍️ ظرف مغلق عليه ختم شمعي"
};

// ============================================
// Exam 18 (exam18.json) - Sehr geehrter Herr Dr. Dobromil
// ============================================

HELP_DATA["sprach1_exam18_q1"] = {
    text: "Mit allergrößten Interesse",
    meaning: "باهتمام بالغ",
    keywords: ["allergrößten = بالغ", "Interesse = اهتمام", "Mit = بـ"],
    simplified: "باهتمام كبير جداً",
    imagine: "📰👀 شخص يقرأ جريدة"
};

HELP_DATA["sprach1_exam18_q2"] = {
    text: "an dem Sie eine Teilzeit-Mitarbeiterin suchen",
    meaning: "الذي تبحث فيه عن موظفة بدوام جزئي",
    keywords: ["an dem = الذي", "Teilzeit-Mitarbeiterin = موظفة بدوام جزئي", "suchen = تبحث"],
    simplified: "إعلانك عن وظيفة بدوام جزئي",
    imagine: "📋✍️ إعلان وظيفة"
};

HELP_DATA["sprach1_exam18_q3"] = {
    text: "den Ihren",
    meaning: "متجركم",
    keywords: ["Ihren = متجركم", "den = متجر", "Ihren = لكم"],
    simplified: "متجركم العريق",
    imagine: "🏛️✨ واجهة متجر كلاسيكية"
};

HELP_DATA["sprach1_exam18_q4"] = {
    text: "eine verantwortungsvolle Aufgabe übernehmen zu können",
    meaning: "أن أتمكن من تولي مهمة تتطلب مسؤولية",
    keywords: ["übernehmen = تولي", "verantwortungsvolle Aufgabe = مهمة تتطلب مسؤولية", "zu können = القدرة على"],
    simplified: "تولي منصب صعب",
    imagine: "📁👔 حقيبة أعمال"
};

HELP_DATA["sprach1_exam18_q5"] = {
    text: "bei der Firma Eichelbohrer & Co",
    meaning: "في شركة آيخلبورير وشركاه",
    keywords: ["bei = في", "Firma = شركة", "Eichelbohrer & Co = آيخلبورير وشركاه"],
    simplified: "بدأت تدريب النجارة في شركة متخصصة",
    imagine: "🏢🔨 شركة بها نجارين وحرفيين"
};

HELP_DATA["sprach1_exam18_q6"] = {
    text: "ein Jahr lang",
    meaning: "لمدة عام",
    keywords: ["Jahr = عام", "lang = لمدة", "ein = واحد"],
    simplified: "عملت لمدة اثني عشر شهراً متصلة",
    imagine: "📅🔄 عقارب الساعة تدور"
};

HELP_DATA["sprach1_exam18_q7"] = {
    text: "entdeckte meine Liebe zu antiquarischen Möbelstücken",
    meaning: "اكتشفت حبي للأثاث العتيق",
    keywords: ["entdeckte = اكتشفت", "Liebe = حب", "antiquarischen = عتيق"],
    simplified: "هناك تعرفت على شغفي بالأثاث القديم",
    imagine: "🔍🪑 غرفة بها كراسي عتيقة"
};

HELP_DATA["sprach1_exam18_q8"] = {
    text: "was Möbelstile und die Herstellungskunst",
    meaning: "ما يتعلق بأساليب الأثاث وفن الصناعة",
    keywords: ["was = ما", "Möbelstile = أساليب الأثاث", "Herstellungskunst = فن الصناعة"],
    simplified: "المتعلقة بأنماط الأثاث والحرف اليدوية",
    imagine: "🖼️📜 رسم تفصيلي لمقعد كلاسيكي"
};

HELP_DATA["sprach1_exam18_q9"] = {
    text: "sowohl in Nord- und in Südeuropa",
    meaning: "سواء في شمال أو جنوب أوروبا",
    keywords: ["sowohl = سواء", "Nord = شمال", "Südeuropa = جنوب أوروبا"],
    simplified: "في جميع أنحاء أوروبا",
    imagine: "🗺️✨ خريطة أوروبا"
};

HELP_DATA["sprach1_exam18_q10"] = {
    text: "auf Ihre Anzeige zu antworten",
    meaning: "للرد على إعلانكم",
    keywords: ["antworten = الرد", "Anzeige = إعلان", "auf = على"],
    simplified: "الرد على فرصة العمل",
    imagine: "📨✍️ ظرف به ختم شمعي أحمر"
};

// ============================================
// Exam 19 (exam19.json) - Liebe Lina, lieber Florian
// ============================================

HELP_DATA["sprach1_exam19_q1"] = {
    text: "Ihr sollt doch endlich unser neues Heim kennenlernen",
    meaning: "يجب أن تروا منزلنا الجديد أخيراً",
    keywords: ["sollt = يجب", "endlich = أخيراً", "kennenlernen = تتعرفون"],
    simplified: "حان وقت رؤية منزلنا الجديد",
    imagine: "🏠🚪 أشخاص يفتحون باب منزل لضيوف"
};

HELP_DATA["sprach1_exam19_q2"] = {
    text: "euch für das verlängerte Wochenende Anfang Juni einladen",
    meaning: "ندعوكم لعطلة نهاية الأسبوع الممتدة في بداية يونيو",
    keywords: ["euch = لكم", "einladen = ندعو", "verlängerte Wochenende = عطلة نهاية أسبوع ممتدة"],
    simplified: "نود أن تأتوا عندنا في عطلة نهاية الأسبوع الطويلة",
    imagine: "📅🎉 تقويم مميز في بداية يونيو"
};

HELP_DATA["sprach1_exam19_q3"] = {
    text: "bei uns",
    meaning: "عندنا",
    keywords: ["bei = عند", "uns = نحن", "bei uns = عندنا"],
    simplified: "يمكنكم المبيت في منزلنا بالطبع",
    imagine: "🛌🏠 سرير مريح وأضواء دافئة"
};

HELP_DATA["sprach1_exam19_q4"] = {
    text: "einiges zu bieten",
    meaning: "لديها الكثير لتقدمه",
    keywords: ["einiges = الكثير", "zu bieten = لتقدمه", "hat = لديها"],
    simplified: "المدينة لديها العديد من المعالم",
    imagine: "🏰🎨 برج قديم ومتحف"
};

HELP_DATA["sprach1_exam19_q5"] = {
    text: "auf den Turm der Stadtpfarrkirche steigen",
    meaning: "لصعود برج كنيسة الرعية",
    keywords: ["Turm = برج", "steigen = صعود", "Stadtpfarrkirche = كنيسة الرعية"],
    simplified: "يمكننا صعود برج الكنيسة الرئيسي",
    imagine: "🔔⛪ برج كنيسة مرتفع"
};

HELP_DATA["sprach1_exam19_q6"] = {
    text: "sind auch die wunderbare Schlossbibliothek zu besichtigen",
    meaning: "يمكن أيضاً زيارة مكتبة القصر الرائعة",
    keywords: ["sind = هناك", "wunderbare = رائعة", "Schlossbibliothek = مكتبة قصر"],
    simplified: "كما يمكننا أيضاً مشاهدة مكتبة القصر",
    imagine: "📚🏰 مكتبة مليئة بالكتب عند مدخل قصر"
};

HELP_DATA["sprach1_exam19_q7"] = {
    text: "wo man an den alten Bauten den Wandel der Industrie nachvollziehen kann",
    meaning: "حيث يمكن للمرء تتبع التغير الصناعي من خلال المباني القديمة",
    keywords: ["wo = حيث", "alten Bauten = المباني القديمة", "Wandel = التغير"],
    simplified: "المباني القديمة تحكي قصة التحول الصناعي",
    imagine: "🏭📜 مصنع قديم مع لافتات تاريخية"
};

HELP_DATA["sprach1_exam19_q8"] = {
    text: "Dabei erfährt man alles über die Eisenindustrie",
    meaning: "في ذلك نتعلم كل شيء عن صناعة الحديد",
    keywords: ["Dabei = في ذلك", "erfährt = نتعلم", "Eisenindustrie = صناعة الحديد"],
    simplified: "سنكتشف كيف ازدهرت المدينة بفضل صناعة الحديد",
    imagine: "⚙️🏭 عجلات مسننة وسندان"
};

HELP_DATA["sprach1_exam19_q9"] = {
    text: "an diesem Wochenende",
    meaning: "في عطلة نهاية الأسبوع هذه",
    keywords: ["diesem = هذه", "Wochenende = عطلة نهاية الأسبوع", "an = في"],
    simplified: "ستقام أيام الأدب السنوية في ذلك الوقت",
    imagine: "📚🗓️ تقويم مميز بكومة كتب"
};

HELP_DATA["sprach1_exam19_q10"] = {
    text: "Auch die Umgebung kann sich sehen lassen",
    meaning: "المنطقة المحيطة رائعة أيضاً",
    keywords: ["kann = يمكن", "sehen lassen = تتفاخر", "Umgebung = المنطقة المحيطة"],
    simplified: "المناطق الطبيعية من حولكم جميلة جداً",
    imagine: "🏞️🌳 غابة كثيفة وسماء زرقاء صافية"
};

// ============================================
// Exam 20 (exam20.json) - Liebes Julian
// ============================================

HELP_DATA["sprach1_exam20_q1"] = {
    text: "konntest dich gut erholen",
    meaning: "يمكن أن تسترخي جيداً",
    keywords: ["konntest = يمكن أن", "dich erholen = تسترخي", "gut = جيداً"],
    simplified: "لقد استطعت الراحة والاستجمام",
    imagine: "🏖️😎 على كرسي استرخاء تحت مظلة"
};

HELP_DATA["sprach1_exam20_q2"] = {
    text: "Ich würde ja auch gerne mal wieder ans Meer fahren",
    meaning: "أود أيضاً الذهاب إلى البحر مرة أخرى",
    keywords: ["würde = أود", "gerne = من دواعي سروري", "ans Meer = إلى البحر"],
    simplified: "أنا أيضاً أحلم يوماً برحلة بحرية",
    imagine: "🌊🏖️ أحلام يقظة أمام البحر"
};

HELP_DATA["sprach1_exam20_q3"] = {
    text: "Zeit für Urlaub",
    meaning: "وقت للإجازة",
    keywords: ["Zeit = وقت", "für = لـ", "Urlaub = إجازة"],
    simplified: "ليس لدي الوقت الكافي لأخذ إجازة الآن",
    imagine: "⏳💼 ساعة رمل وطائرة متجهة بعيداً"
};

HELP_DATA["sprach1_exam20_q4"] = {
    text: "Nach so vielen Jahren",
    meaning: "بعد كل هذه السنوات",
    keywords: ["vielen = العديد", "Jahren = سنوات", "nach = بعد"],
    simplified: "بعد كل هذا الوقت الذي قضيته في برلين",
    imagine: "🗓️🏙️ سنوات طويلة وسماء مدينة"
};

HELP_DATA["sprach1_exam20_q5"] = {
    text: "gefallen mir besonders die schönen Fachwerkhäuser",
    meaning: "تعجبني بشكل خاص المنازل نصف الخشبية الجميلة",
    keywords: ["gefallen = تعجبني", "besonders = بشكل خاص", "Fachwerkhäuser = منازل نصف خشبية"],
    simplified: "ما يلفت انتباهي كثيراً هو جمال وأصالة البيوت الخشبية",
    imagine: "🏚️❤️ منزل خشبي جميل على طريق مرصوف بالحصى"
};

HELP_DATA["sprach1_exam20_q6"] = {
    text: "denn dort gibt es viele kleine Läden",
    meaning: "لأن هناك العديد من المحلات الصغيرة",
    keywords: ["denn = لأن", "dort = هناك", "kleine Läden = محلات صغيرة"],
    simplified: "منطقة المشاة مليئة بالمتاجر والمقاهي الصغيرة اللطيفة",
    imagine: "🛍️☕ شارع تسوق نابض بالحياة"
};

HELP_DATA["sprach1_exam20_q7"] = {
    text: "Wenn du willst",
    meaning: "إذا أردت",
    keywords: ["Wenn = إذا", "du = أنت", "willst = تريد"],
    simplified: "يمكنني إرشادك في جولة بالمدينة إذا أحببت",
    imagine: "🗺️🤝 شخص يمد يده لشخص آخر أمام متجر سفر"
};

HELP_DATA["sprach1_exam20_q8"] = {
    text: "Wann ist bei mir der Umzugsstress vorbei",
    meaning: "متى سينتهي وقت الانتقال المزدحم بالنسبة لي؟",
    keywords: ["Umzugsstress = وقت الانتقال المزدحم", "vorbei = منتهي", "bei mir = بالنسبة لي"],
    simplified: "لقد انتهى معظم ضغط الانتقال الآن",
    imagine: "📦🏠 صناديق فارغة وزوجان مرتاحان يجلسان على أريكة"
};

HELP_DATA["sprach1_exam20_q9"] = {
    text: "eine große Anzahl nicht ausgeräumter Kisten",
    meaning: "عدد كبير من الصناديق غير المرتبة",
    keywords: ["große Anzahl = عدد كبير", "nicht ausgeräumter = غير مرتبة", "Kisten = صناديق"],
    simplified: "العديد من الصناديق التي لم تُفرغ بعد في غرفة المعيشة",
    imagine: "📦📦 غرفة معيشة مليئة بالصناديق"
};

HELP_DATA["sprach1_exam20_q10"] = {
    text: "weil sie geräumig und zentral gelegen ist",
    meaning: "لأنها فسيحة وتقع في موقع مركزي",
    keywords: ["weil = لأن", "geräumig = فسيحة", "zentral gelegen = موقع مركزي"],
    simplified: "لقد كنت محظوظاً بشقتي الجديدة لأنها واسعة وقريبة من كل شيء",
    imagine: "🏠🔑 زوجان يفتحان باب شقة واسعة ومشرقة"
};


// ============================================
// sprach1.js - جميع شروحات Sprachbausteine Teil 1
// ============================================


// ============================================
// Exam 21 (exam21.json) - Liebe Meike
// ============================================

HELP_DATA["sprach1_exam21_q1"] = {
    text: "mit deiner neuen Arbeit zufrieden bist",
    meaning: "أنت راضية عن عملك الجديد",
    keywords: ["neuen = الجديد", "Arbeit = عمل", "zufrieden = راضية"],
    simplified: "تشعرين بالرضا عن وظيفتك الجديدة",
    imagine: "👩‍💼😊 امرأة تبتسم أمام مكتبها"
};

HELP_DATA["sprach1_exam21_q2"] = {
    text: "Seit ich einen neuen Chef habe",
    meaning: "منذ أن أصبح لدي مدير جديد",
    keywords: ["Seit = منذ", "neuen Chef = مدير جديد", "habe = لدي"],
    simplified: "منذ قدوم المدير الجديد تغيرت الأمور",
    imagine: "👨‍💼😠 رجل جالس في مكتب بوجه عابس"
};

HELP_DATA["sprach1_exam21_q3"] = {
    text: "Daher habe ich oft darüber nachgedacht",
    meaning: "لذلك فكرت كثيراً في ذلك",
    keywords: ["Darüber = في ذلك", "nachgedacht = فكرت", "oft = كثيراً"],
    simplified: "لذلك كنت أفكر كثيراً في الأمر",
    imagine: "🤔💭 شخص جالس يفكر ويداه تحت ذقنه"
};

HELP_DATA["sprach1_exam21_q4"] = {
    text: "Ich habe mich an einer Fernuniversität eingeschrieben",
    meaning: "لقد سجلت نفسي في جامعة مفتوحة",
    keywords: ["mich = نفسي", "eingeschrieben = سجلت", "Fernuniversität = جامعة مفتوحة"],
    simplified: "لقد سجلت في جامعة التعليم عن بُعد",
    imagine: "💻🎓 شخص يضغط على زر التسجيل على شاشة الكمبيوتر"
};

HELP_DATA["sprach1_exam21_q5"] = {
    text: "Obwohl ich zuerst einige Bedenken hatte",
    meaning: "على الرغم من أن لدي بعض المخاوف في البداية",
    keywords: ["Obwohl = على الرغم من", "Bedenken = مخاوف", "zuerst = في البداية"],
    simplified: "رغم أنني كنت قلقة في البداية",
    imagine: "😟❓ امرأة تفكر وتبدو قلقة"
};

HELP_DATA["sprach1_exam21_q6"] = {
    text: "ob ich nebenberuflich ein Studium schaffen könnte",
    meaning: "ما إذا كنت سأنجح في الدراسة إلى جانب العمل",
    keywords: ["könnte = يمكنني", "nebenberuflich = إلى جانب العمل", "Studium = دراسة"],
    simplified: "هل سأتمكن من الدراسة والعمل معاً",
    imagine: "📚💼 شخص يحاول التوفيق بين الكتب والحقيبة"
};

HELP_DATA["sprach1_exam21_q7"] = {
    text: "wie war ich wirklich sehr nervös",
    meaning: "كنت متوترة جداً حقاً",
    keywords: ["wie = كيف", "nervös = متوترة", "wirklich = حقاً"],
    simplified: "كنت متوترة جداً بصدق",
    imagine: "😰🙏 شخص يقرص أصابعه بتوتر"
};

HELP_DATA["sprach1_exam21_q8"] = {
    text: "wie viel Zeit die Vorbereitungen in Anspruch nehmen",
    meaning: "كم من الوقت تستغرقه التحضيرات",
    keywords: ["nehmen = تستغرق", "Vorbereitungen = تحضيرات", "Zeit = وقت"],
    simplified: "لقد قللت من تقدير الوقت اللازم للتحضير",
    imagine: "⏰😲 شخص ينظر إلى الساعة مندهشاً"
};

HELP_DATA["sprach1_exam21_q9"] = {
    text: "Für mich ist es aber eine große Hilfe",
    meaning: "لكن بالنسبة لي إنها مساعدة كبيرة",
    keywords: ["mich = لي", "große Hilfe = مساعدة كبيرة", "ist = هي"],
    simplified: "بالنسبة لي إنه لمساعدة عظيمة",
    imagine: "🤝🙏 شخص يشكر آخر"
};

HELP_DATA["sprach1_exam21_q10"] = {
    text: "in denen man rund um die Uhr Fragen stellen kann",
    meaning: "حيث يمكن للمرء طرح الأسئلة على مدار الساعة",
    keywords: ["denen = حيث", "rund um die Uhr = على مدار الساعة", "Fragen stellen = طرح أسئلة"],
    simplified: "مجموعات المحادثة متاحة للاستفسارات في أي وقت",
    imagine: "💬🕒 فقاعات دردشة وساعة في كل مكان"
};

// ============================================
// Exam 22 (exam22.json) - Liebe Corinna (معدل)
// ============================================

HELP_DATA["sprach1_exam22_q1"] = {
    text: "dass ich dir seit Ewigkeiten nicht mehr geschrieben habe",
    meaning: "أنني لم أكتب لك منذ وقت طويل جداً",
    keywords: ["dass = أن", "Ewigkeiten = وقت طويل", "nicht mehr = لا...بعد الآن"],
    simplified: "لم أكتب لك منذ زمن طويل",
    imagine: "📬😔 بريد دون رسائل جديدة"
};

HELP_DATA["sprach1_exam22_q2"] = {
    text: "mich mit etwas Anderem zu beschäftigen als mit der neuen Arbeit",
    meaning: "لأنشغل بأي شيء آخر غير العمل الجديد",
    keywords: ["beschäftigen = أنشغل", "Anderem = شيء آخر", "neuen Arbeit = العمل الجديد"],
    simplified: "الانشغال بأي شيء آخر غير الوظيفة الجديدة",
    imagine: "📋🚫 شخص يرفض ملفات ويشير إلى ساعته"
};

HELP_DATA["sprach1_exam22_q3"] = {
    text: "Die gibt es doch wie Sand am Meer",
    meaning: "إنهم موجودون مثل الرمل على البحر",
    keywords: ["doch = في الواقع", "Sand am Meer = الرمل على البحر", "wie = مثل"],
    simplified: "هناك عدد لا يحصى منهم",
    imagine: "🏖️🌊 شاطئ به رمل لا يُعد"
};

HELP_DATA["sprach1_exam22_q4"] = {
    text: "insbesondere an die Obstbauern der näheren Umgebung",
    meaning: "خاصة لمزارعي الفاكهة في المنطقة المجاورة",
    keywords: ["insbesondere = خاصة", "Obstbauern = مزارعي فاكهة", "näheren Umgebung = المنطقة المجاورة"],
    simplified: "خاصة للمزارعين المحليين",
    imagine: "🌳🍎 بستان تفاح يقطف ثماره"
};

HELP_DATA["sprach1_exam22_q5"] = {
    text: "acht Stunden am Tag überwiegend im Freien zu arbeiten",
    meaning: "العمل في الهواء الطلق معظم اليوم لمدة ثماني ساعات",
    keywords: ["überwiegend = معظم", "im Freien = في الهواء الطلق", "acht Stunden = ثماني ساعات"],
    simplified: "العمل في الخارج لمدة ثماني ساعات كاملة",
    imagine: "☀️👒 شخص يعمل في الحديقة تحت الشمس"
};

HELP_DATA["sprach1_exam22_q6"] = {
    text: "fast eine dreiviertel Stunde",
    meaning: "حوالي خمسة وأربعين دقيقة",
    keywords: ["fast = حوالي", "dreiviertel Stunde = ثلاثة أرباع الساعة"],
    simplified: "ما يقرب من خمسة وأربعين دقيقة",
    imagine: "⏰🚆 ساعة محطة قطار"
};

HELP_DATA["sprach1_exam22_q7"] = {
    text: "nur wenig Lust, etwas zu unternehmen",
    meaning: "لا رغبة لدي للقيام بأي شيء",
    keywords: ["wenig = قليل", "Lust = رغبة", "zu unternehmen = للقيام به"],
    simplified: "لا أملك أي رغبة في فعل أي شيء",
    imagine: "🛋️😐 شخص مستلقٍ على أريكته يشعر بالملل"
};

HELP_DATA["sprach1_exam22_q8"] = {
    text: "Sie kommt wieder",
    meaning: "سوف تعود",
    keywords: ["kommt = تعود", "wieder = مجدداً", "Sie = هي"],
    simplified: "ستعود رغبتي مجدداً",
    imagine: "🔄😊 دائرة من الأسهم تشير إلى العودة"
};

HELP_DATA["sprach1_exam22_q9"] = {
    text: "Oder lässt du dir noch ein bisschen Zeit damit?",
    meaning: "أم أنك ستمنح نفسك بعض الوقت للقيام بذلك؟",
    keywords: ["lässt = تمنح", "Zeit = وقت", "bisschen = بعض"],
    simplified: "هل تمنح نفسك قسطاً من الوقت؟",
    imagine: "⏳🙋 شخص ينتظر"
};

HELP_DATA["sprach1_exam22_q10"] = {
    text: "Fang so früh wie möglich mit den Bewerbungen an",
    meaning: "ابدأ بتقديم الطلبات في أقرب وقت ممكن",
    keywords: ["möglich = ممكن", "früh = مبكراً", "Bewerbungen = طلبات"],
    simplified: "قدم طلباتك في أقرب فرصة",
    imagine: "📝✍️ شخص يكتب في نموذج بسرعة"
};

// ============================================
// Exam 23 (exam23.json) - Liebe Corinna
// ============================================

HELP_DATA["sprach1_exam23_q1"] = {
    text: "dass ich dir seit Ewigkeiten nicht mehr geschrieben habe",
    meaning: "أنني لم أكتب لك منذ وقت طويل جداً",
    keywords: ["dass = أن", "Ewigkeiten = وقت طويل", "nicht mehr = لا...بعد الآن"],
    simplified: "لم أكتب لك منذ زمن طويل",
    imagine: "📬😔 بريد دون رسائل جديدة"
};

HELP_DATA["sprach1_exam23_q2"] = {
    text: "mich mit etwas Anderem zu beschäftigen als mit der neuen Arbeit",
    meaning: "لأنشغل بأي شيء آخر غير العمل الجديد",
    keywords: ["beschäftigen = أنشغل", "Anderem = شيء آخر", "neuen Arbeit = العمل الجديد"],
    simplified: "الانشغال بأي شيء آخر غير الوظيفة الجديدة",
    imagine: "📋🚫 شخص يرفض ملفات ويشير إلى ساعته"
};

HELP_DATA["sprach1_exam23_q3"] = {
    text: "Die gibt es doch wie Sand am Meer",
    meaning: "إنهم موجودون مثل الرمل على البحر",
    keywords: ["doch = في الواقع", "Sand am Meer = الرمل على البحر", "wie = مثل"],
    simplified: "هناك عدد لا يحصى منهم",
    imagine: "🏖️🌊 شاطئ به رمل لا يُعد"
};

HELP_DATA["sprach1_exam23_q4"] = {
    text: "insbesondere an die Obstbauern der näheren Umgebung",
    meaning: "خاصة لمزارعي الفاكهة في المنطقة المجاورة",
    keywords: ["insbesondere = خاصة", "Obstbauern = مزارعي فاكهة", "näheren Umgebung = المنطقة المجاورة"],
    simplified: "خاصة للمزارعين المحليين",
    imagine: "🌳🍎 بستان تفاح يقطف ثماره"
};

HELP_DATA["sprach1_exam23_q5"] = {
    text: "acht Stunden am Tag überwiegend im Freien zu arbeiten",
    meaning: "العمل في الهواء الطلق معظم اليوم لمدة ثماني ساعات",
    keywords: ["überwiegend = معظم", "im Freien = في الهواء الطلق", "acht Stunden = ثماني ساعات"],
    simplified: "العمل في الخارج لمدة ثماني ساعات كاملة",
    imagine: "☀️👒 شخص يعمل في الحديقة تحت الشمس"
};

HELP_DATA["sprach1_exam23_q6"] = {
    text: "muss ich fast eine dreiviertel Stunde mit dem Zug fahren",
    meaning: "يجب أن أستقل القطار لمدة حوالي خمسة وأربعين دقيقة",
    keywords: ["muss = يجب", "Zug = قطار", "dreiviertel Stunde = ثلاثة أرباع الساعة"],
    simplified: "أحتاج إلى الساعة بالقطار كل يوم",
    imagine: "🚆😪 شخص متعب يستقل القطار"
};

HELP_DATA["sprach1_exam23_q7"] = {
    text: "nur wenig Lust, etwas zu unternehmen",
    meaning: "لا رغبة لدي للقيام بأي شيء",
    keywords: ["wenig = قليل", "Lust = رغبة", "zu unternehmen = للقيام به"],
    simplified: "لا أملك أي رغبة في فعل أي شيء",
    imagine: "🛋️😐 شخص مستلقٍ على أريكته يشعر بالملل"
};

HELP_DATA["sprach1_exam23_q8"] = {
    text: "Sie kommt wieder",
    meaning: "سوف تعود",
    keywords: ["kommt = تعود", "wieder = مجدداً", "Sie = هي"],
    simplified: "ستعود رغبتي مجدداً",
    imagine: "🔄😊 دائرة من الأسهم تشير إلى العودة"
};

HELP_DATA["sprach1_exam23_q9"] = {
    text: "Oder lässt du dir noch ein bisschen Zeit damit?",
    meaning: "أم أنك ستمنح نفسك بعض الوقت للقيام بذلك؟",
    keywords: ["lässt = تمنح", "Zeit = وقت", "bisschen = بعض"],
    simplified: "هل تمنح نفسك قسطاً من الوقت؟",
    imagine: "⏳🙋 شخص ينتظر"
};

HELP_DATA["sprach1_exam23_q10"] = {
    text: "Fang so früh wie möglich mit den Bewerbungen an",
    meaning: "ابدأ بتقديم الطلبات في أقرب وقت ممكن",
    keywords: ["möglich = ممكن", "früh = مبكراً", "Bewerbungen = طلبات"],
    simplified: "قدم طلباتك في أقرب فرصة",
    imagine: "📝✍️ شخص يكتب في نموذج بسرعة"
};

// ============================================
// Exam 24 (exam24.json) - Liebe Ida
// ============================================

HELP_DATA["sprach1_exam24_q1"] = {
    text: "auf die neue Stelle und das Leben in der Stadt gefreut",
    meaning: "سعيدة بالوظيفة الجديدة والحياة في المدينة",
    keywords: ["auf = على", "neue Stelle = وظيفة جديدة", "gefreut = سعيدة"],
    simplified: "لم أكن متحمسة للوظيفة والحياة الجديدة في البداية",
    imagine: "🏢😕 امرأة تنظر إلى مبنى جديد بقلق"
};

HELP_DATA["sprach1_exam24_q2"] = {
    text: "Ich hätte ja auch täglich mit dem Zug fahren können",
    meaning: "كان بإمكاني أيضاً ركوب القطار يومياً",
    keywords: ["hätte = كان بإمكاني", "Zug = قطار", "täglich = يومياً"],
    simplified: "كان ممكناً أن أستقل القطار يومياً بدلاً من ذلك",
    imagine: "🚆🤔 شخص ينظر إلى قطار"
};

HELP_DATA["sprach1_exam24_q3"] = {
    text: "mich in meiner neuen Wohnung auch gar nicht richtig wohlgefühlt",
    meaning: "لم أشعر بالراحة في شقتي الجديدة على الإطلاق",
    keywords: ["mich = نفسي", "wohlgefühlt = شعرت بالراحة", "gar nicht = على الإطلاق"],
    simplified: "لم أشعر بالارتياح في المكان الجديد",
    imagine: "🏠😞 امرأة تجلس على أريكة فارغة"
};

HELP_DATA["sprach1_exam24_q4"] = {
    text: "Nachdem ich meine Umzugskartons ausgepackt hatte",
    meaning: "بعد أن فتحت صناديق الانتقال الخاصة بي",
    keywords: ["ausgepackt hatte = كنت قد فتحت", "Umzugskartons = صناديق الانتقال"],
    simplified: "بعد أن أنهيت تفريغ الصناديق أخيراً",
    imagine: "📦🔓 شخص يفتح صندوقاً"
};

HELP_DATA["sprach1_exam24_q5"] = {
    text: "Das liegt vor allem daran, dass ich eine neue Freundin gefunden habe",
    meaning: "السبب الرئيسي يعود إلى أنني وجدت صديقة جديدة",
    keywords: ["daran = في ذلك", "neue Freundin = صديقة جديدة", "gefunden = وجدت"],
    simplified: "أصبحت أستمتع بفرانكفورت بفضل صديقتي الجديدة",
    imagine: "👭😊 اثنتان من النساء تحتضنان بعضهما"
};

HELP_DATA["sprach1_exam24_q6"] = {
    text: "Als wir miteinander ins Gespräch kamen",
    meaning: "عندما بدأنا التحدث مع بعضنا البعض",
    keywords: ["miteinander = معاً", "ins Gespräch = في الحديث", "kamen = بدأنا"],
    simplified: "ذات يوم بدأنا نتحدث بشكل عفوي",
    imagine: "💬👥 شخصان يتحدثان والفقاعات تملأ الشاشة"
};

HELP_DATA["sprach1_exam24_q7"] = {
    text: "Mein Leben sieht nun also ganz anders aus als noch vor drei Monaten",
    meaning: "لذا تبدو حياتي الآن مختلفة تماماً عما كانت عليه قبل ثلاثة أشهر",
    keywords: ["als = مقارنة بـ", "ganz anders = مختلفة تماماً", "drei Monaten = ثلاثة أشهر"],
    simplified: "الأمور تغيرت بشكل كبير عن ما كانت عليه في السابق",
    imagine: "📅➡️📅 تقويم قديم وآخر جديد بوجه مبتسم"
};

HELP_DATA["sprach1_exam24_q8"] = {
    text: "obwohl ich oft Überstunden machen muss",
    meaning: "على الرغم من أنني غالباً ما أضطر للعمل الإضافي",
    keywords: ["obwohl = على الرغم من", "Überstunden = ساعات عمل إضافية", "oft = غالباً"],
    simplified: "أنا سعيدة حتى لو اضطررت للبقاء لساعات متأخرة",
    imagine: "🕘😅 امرأة تعمل لوقت متأخر"
};

HELP_DATA["sprach1_exam24_q9"] = {
    text: "bei uns in der Abteilung",
    meaning: "في قسمنا",
    keywords: ["bei = في", "uns = قسمنا", "Abteilung = قسم"],
    simplified: "الجو العام لطيف بين زملاء العمل الذين أعمل معهم",
    imagine: "👥🏢 فريق عمل يبدو سعيداً ومرتاحاً"
};

HELP_DATA["sprach1_exam24_q10"] = {
    text: "wie es Dir eigentlich geht",
    meaning: "كيف حالك حقاً",
    keywords: ["eigentlich = حقاً", "geht = حالك", "Dir = لك"],
    simplified: "ولكن لم أسألك بعد عن أحوالك أنتِ",
    imagine: "📱❓ شخص يقرأ رسالة ويبدو فضولياً"
};

// ============================================
// Exam 25 (exam25.json) - Liebe Paola
// ============================================

HELP_DATA["sprach1_exam25_q1"] = {
    text: "dass wir sie bald kennenlernen",
    meaning: "أن نتعرف عليها قريباً",
    keywords: ["sie = لها", "bald = قريباً", "kennenlernen = نتعرف"],
    simplified: "لا نطاق رؤية الصغيرة قريباً",
    imagine: "👶💕 قلب يخرج من صورة طفل"
};

HELP_DATA["sprach1_exam25_q2"] = {
    text: "Deshalb warten wir lieber noch etwas",
    meaning: "لذلك سننتظر قليلاً بدلاً من ذلك",
    keywords: ["Deshalb = لذلك", "warten = ننتظر", "lieber = بدلاً من ذلك"],
    simplified: "من الأفضل لنا أن نمنحكم بعض الوقت أولاً",
    imagine: "⏰🤱 أيدي تشير إلى عدم التسرع مع طفل ينام"
};

HELP_DATA["sprach1_exam25_q3"] = {
    text: "wann euch ein Treffen lieb wäre",
    meaning: "متى ترغبون في اللقاء",
    keywords: ["wann = متى", "Treffen = لقاء", "lieb wäre = ترغبون"],
    simplified: "أخبرونا بالوقت المناسب لزيارتكم",
    imagine: "📅✉️ تقويم وظرف بريد"
};

HELP_DATA["sprach1_exam25_q4"] = {
    text: "auf jeden Fall bereit",
    meaning: "جاهزة بالتأكيد",
    keywords: ["auf = على", "jeden Fall = كل الأحوال", "bereit = جاهزة"],
    simplified: "لقد جهزنا شيئاً صغيراً لها بالفعل",
    imagine: "🎁👶 صندوق هدايا عليه شريط"
};

HELP_DATA["sprach1_exam25_q5"] = {
    text: "Seit diesem Jahr sind hier im Ort Grundschule und Kindergarten in demselben Gebäudekomplex untergebracht",
    meaning: "منذ هذا العام، تقع المدرسة الابتدائية ورياض الأطفال في نفس المجمع",
    keywords: ["Seit = منذ", "diesem Jahr = هذا العام", "Grundschule = مدرسة ابتدائية"],
    simplified: "المدرسة ورياض الأطفال أصبحتا الآن في مبنى واحد موحد",
    imagine: "🏫🏢 مبنى كبير به أطفال في الخارج"
};

HELP_DATA["sprach1_exam25_q6"] = {
    text: "ob ich nicht wieder anfangen soll, halbtags zu arbeiten",
    meaning: "ما إذا كان ينبغي لي أن أعمل بدوام جزئي مرة أخرى",
    keywords: ["ob = ما إذا", "anfangen = أبدأ", "halbtags = دوام جزئي"],
    simplified: "أفكر في العودة إلى العمل",
    imagine: "💼🤔 امرأة تنظر إلى حاسوب محمول"
};

HELP_DATA["sprach1_exam25_q7"] = {
    text: "ich kann mir gar nicht vorstellen",
    meaning: "لا أستطيع أن أتخيل ذلك على الإطلاق",
    keywords: ["vorstellen = أتخيل", "gar nicht = على الإطلاق", "kann = أستطيع"],
    simplified: "من الصعب جداً بالنسبة لي أن أتخيل كيف سأفعل ذلك",
    imagine: "🤷‍♀️💭 امرأة ترفع يديها بإحباط"
};

HELP_DATA["sprach1_exam25_q8"] = {
    text: "Was hältst du davon?",
    meaning: "ما رأيك في ذلك؟",
    keywords: ["davon = في ذلك", "hältst du = رأيكِ", "Was = ما"],
    simplified: "ما رأيكِ؟",
    imagine: "❓🤔 فتاتان تتحدثان وعلامة استفهام بينهما"
};

HELP_DATA["sprach1_exam25_q9"] = {
    text: "bei der meine Ausbildung als Krankenschwester von Vorteil wäre",
    meaning: "حيث يكون تدريبي كممرضة مفيداً",
    keywords: ["als = كـ", "Krankenschwester = ممرضة", "von Vorteil = مفيد"],
    simplified: "وظيفة تستفيد من خبرتي ومهاراتي",
    imagine: "🩺💼 سماعة طبيب وحقيبة"
};

HELP_DATA["sprach1_exam25_q10"] = {
    text: "Wie dem auch sei",
    meaning: "مهما يكن الأمر",
    keywords: ["sei = يكن", "auch = أيضاً", "Wie dem = مهما"],
    simplified: "على أية حال",
    imagine: "🤷‍♀️✨ امرأة ترفع يديها كعلامة على القبول"
};

// ============================================
// Exam 26 (exam26.json) - Liebe Jutta
// ============================================

HELP_DATA["sprach1_exam26_q1"] = {
    text: "ich hatte aber dafür einen triftigen Grund",
    meaning: "لكن كان لدي سبب وجيه لذلك",
    keywords: ["dafür = لذلك", "triftigen Grund = سبب وجيه", "hatte = كان لدي"],
    simplified: "كان لدي عذر مقبول تماماً",
    imagine: "📋✅ قائمة مكتوب عليها أسباب وجيهة"
};

HELP_DATA["sprach1_exam26_q2"] = {
    text: "Ich habe das Schreiben wegen meiner Krankheit vernachlässigt",
    meaning: "لقد أهملت الكتابة بسبب مرضي",
    keywords: ["wegen = بسبب", "Krankheit = مرض", "vernachlässigt = أهملت"],
    simplified: "لم أتمكن من الكتابة لأنني لم أكن بصحة جيدة",
    imagine: "🤒✍️ شخص مريض يحاول الكتابة"
};

HELP_DATA["sprach1_exam26_q3"] = {
    text: "ich habe die richtige Untersuchung immer wieder verschoben",
    meaning: "لقد أجلت إجراء الفحص المناسب مراراً وتكراراً",
    keywords: ["verschoben = أجلت", "Untersuchung = فحص", "richtige = المناسب"],
    simplified: "ظللت أؤجل الذهاب لإجراء الفحوصات اللازمة",
    imagine: "📅🏥 تقويم ومستشفى"
};

HELP_DATA["sprach1_exam26_q4"] = {
    text: "Schließlich konnte ich nicht mehr richtig schlafen",
    meaning: "في النهاية لم أعد أستطيع النوم جيداً",
    keywords: ["nicht mehr = لم أعد", "schlafen = أنام", "richtig = جيداً"],
    simplified: "أصبحت الأرق رفيق الليالي بالنسبة لي",
    imagine: "🛌😖 شخص مستلقٍ على السرير وعيناه مفتوحتان"
};

HELP_DATA["sprach1_exam26_q5"] = {
    text: "Mein Arzt hat mich ins Krankenhaus zu einigen Untersuchungen eingewiesen",
    meaning: "أحالني طبيبي إلى المستشفى لإجراء بعض الفحوصات",
    keywords: ["eingewiesen = أحال", "Arzt = طبيب", "Krankenhaus = مستشفى"],
    simplified: "نصحني الطبيب بالذهاب إلى المستشفى لإجراء أشعة وفحوصات",
    imagine: "👨‍⚕️🏨 طبيب يكتب تقريراً"
};

HELP_DATA["sprach1_exam26_q6"] = {
    text: "ein paar Kilo Übergewicht habe",
    meaning: "لدي بضعة كيلوغرامات من الوزن الزائد",
    keywords: ["Übergewicht = وزن زائد", "Kilo = كيلوغرامات", "paar = بضعة"],
    simplified: "الوزن الزائد يضغط على العمود الفقري",
    imagine: "⚖️📈 موازين تشير إلى رقم مرتفع"
};

HELP_DATA["sprach1_exam26_q7"] = {
    text: "Ich gehe jetzt einige Monate lang zur Behandlung",
    meaning: "سأذهب لتلقي العلاج لعدة أشهر الآن",
    keywords: ["zur = إلى", "Behandlung = علاج", "Monate = أشهر"],
    simplified: "أخطط للعلاج الطبيعي للأشهر المقبلة",
    imagine: "🏥💆‍♀️ امرأة في مركز علاج طبيعي"
};

HELP_DATA["sprach1_exam26_q8"] = {
    text: "Einige Behandlungen sind schon hinter mir",
    meaning: "لقد أكملت بالفعل بعض جلسات العلاج",
    keywords: ["hinter = خلف", "mir = لي", "sind = هي"],
    simplified: "لقد خضعت لبعض العلاجات بالفعل",
    imagine: "📋☑️ قائمة مهام"
};

HELP_DATA["sprach1_exam26_q9"] = {
    text: "der mir unter anderem auch geraten hat, mich mehr zu bewegen",
    meaning: "والذي نصحني أيضاً، من بين أمور أخرى، بممارسة المزيد من الحركة",
    keywords: ["unter anderem = من بين أمور أخرى", "geraten = نصح", "bewegen = أتحرك"],
    simplified: "أوصاني خبير طبي بأن أصبح أكثر نشاطاً",
    imagine: "🏃‍♀️🗣️ طبيب ينصح امرأة"
};

HELP_DATA["sprach1_exam26_q10"] = {
    text: "was mir gar nicht schaden würde",
    meaning: "وهو أمر لن يضرني بالتأكيد",
    keywords: ["gar nicht = بالتأكيد لا", "schaden = يضر", "würde = سيكون"],
    simplified: "لن يؤثر ذلك سلباً على صحتي على الإطلاق",
    imagine: "💪✅ شخص يرفع عضلة وعلامة صح"
};

// ============================================
// Exam 27 (exam27.json) - Liebe Familie Geissler
// ============================================

HELP_DATA["sprach1_exam27_q1"] = {
    text: "auf meine Bewerbung als Au-pair-Mädchen",
    meaning: "على طلبي كفتاة أوبير",
    keywords: ["auf = على", "Bewerbung = طلب", "Au-pair-Mädchen = فتاة أوبير"],
    simplified: "ردكم على طلبي للعمل كفتاة أوبير",
    imagine: "📄✉️ رسالة مكتوب عليها Au-pair"
};

HELP_DATA["sprach1_exam27_q2"] = {
    text: "schließe ich meine Schulausbildung ab",
    meaning: "أنهي تعليمي المدرسي",
    keywords: ["schließe...ab = أنهي", "Schulausbildung = تعليم مدرسي", "ich = أنا"],
    simplified: "سأتخرج من المدرسة قريباً",
    imagine: "🎓📜 يد تحمل شهادة"
};

HELP_DATA["sprach1_exam27_q3"] = {
    text: "möchte auch noch mein Deutsch ein bisschen verbessern",
    meaning: "أريد أيضاً تحسين لغتي الألمانية قليلاً",
    keywords: ["ein bisschen = قليلاً", "verbessern = تحسين", "Deutsch = الألمانية"],
    simplified: "أخطط لتحسين مهاراتي في اللغة الألمانية",
    imagine: "🇩🇪📚 علم ألمانيا وكتاب"
};

HELP_DATA["sprach1_exam27_q4"] = {
    text: "einen Sprachkurs an einer Sommerschule in meiner Heimat machen",
    meaning: "القيام بدورة لغة في مدرسة صيفية في بلدي",
    keywords: ["machen = القيام", "Sprachkurs = دورة لغة", "Sommerschule = مدرسة صيفية"],
    simplified: "سألتحق بدورة لغة في الصيف",
    imagine: "🏖️📝 كراسة شاطئية"
};

HELP_DATA["sprach1_exam27_q5"] = {
    text: "Ich habe noch eine Frage an Sie",
    meaning: "لدي سؤال لكم",
    keywords: ["an = إلى", "Frage = سؤال", "Sie = لكم"],
    simplified: "أود أن أستفسر عن شيء ما",
    imagine: "❓👪 عائلة تنتظر السؤال"
};

HELP_DATA["sprach1_exam27_q6"] = {
    text: "Kann ich mir diese Sachen bei irgendjemandem ausleihen?",
    meaning: "هل يمكنني استعارة هذه الأشياء من شخص ما؟",
    keywords: ["irgendjemandem = شخص ما", "ausleihen = استعارة", "Sachen = أشياء"],
    simplified: "هل من الممكن استئجار المعدات؟",
    imagine: "🎿❓ زلاجات وعلامة استفهام"
};

HELP_DATA["sprach1_exam27_q7"] = {
    text: "dass Sie mich am Flughafen abholen kommen",
    meaning: "أنكم ستأتون لاستقبالي من المطار",
    keywords: ["dass = أن", "abholen = استقبال", "Flughafen = مطار"],
    simplified: "شكراً لاستعدادكم لاستقبالي عند وصولي",
    imagine: "🛬👋 طائرة تهبط"
};

HELP_DATA["sprach1_exam27_q8"] = {
    text: "Ich habe meinen Flug nach Frankfurt schon gebucht",
    meaning: "لقد قمت بالفعل بحجز رحلتي إلى فرانكفورت",
    keywords: ["schon = بالفعل", "gebucht = حجزت", "Flug = رحلة"],
    simplified: "رحلة الطائرة محجوزة بالفعل",
    imagine: "🛫🎟️ بطاقة طيران"
};

HELP_DATA["sprach1_exam27_q9"] = {
    text: "Ich schlage vor, dass wir uns erst gegen 7:30 Uhr in einem Café treffen",
    meaning: "أقترح أن نلتقي في مقهى حوالي الساعة 7:30 صباحاً",
    keywords: ["vor = قبل", "Café = مقهى", "treffen = نلتقي"],
    simplified: "يمكننا اللقاء في وقت لاحق لتجنب الانتظار الطويل",
    imagine: "☕🕢 فنجان قهوة وساعة"
};

HELP_DATA["sprach1_exam27_q10"] = {
    text: "damit die Kinder schon ein bisschen mehr von mir sehen",
    meaning: "حتى يرى الأطفال المزيد عني قليلاً",
    keywords: ["mehr = المزيد", "sehen = يرى", "Kinder = أطفال"],
    simplified: "أرفق بعض الصور ليعرفني أطفالكم أكثر",
    imagine: "📸👧 صورة فتاة"
};

// ============================================
// Exam 28 (exam28.json) - Liebe Andrea
// ============================================

HELP_DATA["sprach1_exam28_q1"] = {
    text: "dass ich erst jetzt antworte",
    meaning: "أنني أجيب الآن فقط",
    keywords: ["erst = فقط", "jetzt = الآن", "antworte = أجيب"],
    simplified: "تأخر ردي بسبب عطل فني",
    imagine: "⏰💻 ساعة ومشكلة تقنية"
};

HELP_DATA["sprach1_exam28_q2"] = {
    text: "Jetzt funktioniert alles bestens",
    meaning: "الآن كل شيء يعمل بشكل ممتاز",
    keywords: ["bestens = ممتاز", "funktioniert = يعمل", "alles = كل شيء"],
    simplified: "لقد عاد الكمبيوتر للعمل بكفاءة كاملة",
    imagine: "💻✅ كمبيوتر سعيد"
};

HELP_DATA["sprach1_exam28_q3"] = {
    text: "du musst bald wieder mal bei uns kommen",
    meaning: "يجب أن تأتي إلى منزلنا مرة أخرى قريباً",
    keywords: ["bei = في منزل", "uns = نحن", "kommen = تأتي"],
    simplified: "تفضلي بزيارتنا مجدداً",
    imagine: "🏠👭 أصدقاء أمام منزل"
};

HELP_DATA["sprach1_exam28_q4"] = {
    text: "aber du bist ziemlich spät dran mit deiner Suche",
    meaning: "لكنك متأخرة جداً في بحثك",
    keywords: ["aber = لكن", "ziemlich = جداً", "spät = متأخرة"],
    simplified: "بدأتِ البحث في وقت متأخر بعض الشيء",
    imagine: "⏰🏃‍♀️ سباق مع الوقت"
};

HELP_DATA["sprach1_exam28_q5"] = {
    text: "Man braucht keine besondere Berufserfahrung",
    meaning: "لا حاجة لخبرة مهنية خاصة",
    keywords: ["besondere = خاصة", "Berufserfahrung = خبرة مهنية", "keine = لا حاجة"],
    simplified: "المؤهلات المطلوبة بسيطة جداً",
    imagine: "📜🆓 شهادة وختم مجاني"
};

HELP_DATA["sprach1_exam28_q6"] = {
    text: "eine weitere Fremdsprache wäre noch besser",
    meaning: "لغة أجنبية إضافية ستكون أفضل",
    keywords: ["weitere = إضافية", "Fremdsprache = لغة أجنبية", "besser = أفضل"],
    simplified: "إتقان لغة أخرى يُعتبر ميزة إضافية",
    imagine: "🌍💬 الأرض والكلمات"
};

HELP_DATA["sprach1_exam28_q7"] = {
    text: "Du musst dich allerdings sehr bald bewerben",
    meaning: "لكن يجب عليك تقديم طلبك قريباً جداً",
    keywords: ["bewerben = تقديم طلب", "sehr bald = قريباً جداً", "musst = يجب عليك"],
    simplified: "الموعد النهائي لتقديم الطلبات يقترب",
    imagine: "📝⏰ قلم وساعة"
};

HELP_DATA["sprach1_exam28_q8"] = {
    text: "Leider kenne ich die Hotelbesitzer nicht persönlich",
    meaning: "لسوء الحظ، لا أعرف أصحاب الفندق شخصياً",
    keywords: ["Leider = لسوء الحظ", "persönlich = شخصياً", "kenne = أعرف"],
    simplified: "لا توجد علاقة شخصية يمكن أن تساعدني في التوصية بك",
    imagine: "🏨😔 فندق ووجه حزين"
};

HELP_DATA["sprach1_exam28_q9"] = {
    text: "Ich werde übrigens wieder im Kinder-Feriencamp arbeiten",
    meaning: "بالمناسبة، سأعمل مرة أخرى في مخيم العطلات الصيفي للأطفال",
    keywords: ["übrigens = بالمناسبة", "wieder = مرة أخرى", "Kinder-Feriencamp = مخيم عطلات أطفال"],
    simplified: "لم أغير خطتي لهذا الصيف وسأعمل في نفس المخيم",
    imagine: "🏕️👦 مخيم أطفال"
};

HELP_DATA["sprach1_exam28_q10"] = {
    text: "aber dann habe ich mich doch entschieden hier zu bleiben",
    meaning: "لكنني في النهاية قررت البقاء هنا",
    keywords: ["entschieden = قررت", "hier = هنا", "bleiben = البقاء"],
    simplified: "لقد غيرت رأيي وفضلت البقاء",
    imagine: "🤷‍♀️🗺️ اختيار"
};

// ============================================
// Exam 29 (exam29.json) - Liebe Andrea (معدل)
// ============================================

HELP_DATA["sprach1_exam29_q1"] = {
    text: "dass ich erst jetzt antworte",
    meaning: "أنني أجيب الآن فقط",
    keywords: ["erst = فقط", "jetzt = الآن", "antworte = أجيب"],
    simplified: "تأخر ردي بسبب عطل فني",
    imagine: "⏰💻 ساعة ومشكلة تقنية"
};

HELP_DATA["sprach1_exam29_q2"] = {
    text: "Jetzt funktioniert alles bestens",
    meaning: "الآن كل شيء يعمل بشكل ممتاز",
    keywords: ["bestens = ممتاز", "funktioniert = يعمل", "alles = كل شيء"],
    simplified: "لقد عاد الكمبيوتر للعمل بكفاءة كاملة",
    imagine: "💻✅ كمبيوتر سعيد"
};

HELP_DATA["sprach1_exam29_q3"] = {
    text: "du musst bald wieder mal bei uns kommen",
    meaning: "يجب أن تأتي إلى منزلنا مرة أخرى قريباً",
    keywords: ["bei = في منزل", "uns = نحن", "kommen = تأتي"],
    simplified: "تفضلي بزيارتنا مجدداً",
    imagine: "🏠👭 أصدقاء أمام منزل"
};

HELP_DATA["sprach1_exam29_q4"] = {
    text: "aber du bist ziemlich spät dran mit deiner Suche",
    meaning: "لكنك متأخرة جداً في بحثك",
    keywords: ["ziemlich = جداً", "spät = متأخرة", "Suche = بحث"],
    simplified: "بدأتِ البحث في وقت متأخر بعض الشيء",
    imagine: "⏰🏃‍♀️ سباق مع الوقت"
};

HELP_DATA["sprach1_exam29_q5"] = {
    text: "Man braucht keine besondere Berufserfahrung",
    meaning: "لا حاجة لخبرة مهنية خاصة",
    keywords: ["besondere = خاصة", "Berufserfahrung = خبرة مهنية", "keine = لا حاجة"],
    simplified: "المؤهلات المطلوبة بسيطة جداً",
    imagine: "📜🆓 شهادة وختم مجاني"
};

HELP_DATA["sprach1_exam29_q6"] = {
    text: "eine weitere Fremdsprache wäre noch besser",
    meaning: "لغة أجنبية إضافية ستكون أفضل",
    keywords: ["weitere = إضافية", "Fremdsprache = لغة أجنبية", "besser = أفضل"],
    simplified: "إتقان لغة أخرى يُعتبر ميزة إضافية",
    imagine: "🌍💬 الأرض والكلمات"
};

HELP_DATA["sprach1_exam29_q7"] = {
    text: "Du musst dich allerdings sehr bald bewerben",
    meaning: "لكن يجب عليك تقديم طلبك قريباً جداً",
    keywords: ["bewerben = تقديم طلب", "sehr bald = قريباً جداً", "musst = يجب عليك"],
    simplified: "الموعد النهائي لتقديم الطلبات يقترب",
    imagine: "📝⏰ قلم وساعة"
};

HELP_DATA["sprach1_exam29_q8"] = {
    text: "sonst hätte ich mich natürlich sofort für dich eingesetzt",
    meaning: "وإلا لكنت دعمتك فوراً",
    keywords: ["sonst = وإلا", "eingesetzt = دعمت", "sofort = فوراً"],
    simplified: "لولا ذلك، لساعدتك بكل تأكيد",
    imagine: "🤝💪 يد تدعم"
};

HELP_DATA["sprach1_exam29_q9"] = {
    text: "Ich werde übrigens wieder im Kinder-Feriencamp arbeiten",
    meaning: "بالمناسبة، سأعمل مرة أخرى في مخيم العطلات الصيفي للأطفال",
    keywords: ["übrigens = بالمناسبة", "wieder = مرة أخرى", "Kinder-Feriencamp = مخيم عطلات أطفال"],
    simplified: "لم أغير خطتي لهذا الصيف وسأعمل في نفس المخيم",
    imagine: "🏕️👦 مخيم أطفال"
};

HELP_DATA["sprach1_exam29_q10"] = {
    text: "aber dann habe ich mich doch entschieden hier zu bleiben",
    meaning: "لكنني في النهاية قررت البقاء هنا",
    keywords: ["entschieden = قررت", "hier = هنا", "bleiben = البقاء"],
    simplified: "لقد غيرت رأيي وفضلت البقاء",
    imagine: "🤷‍♀️🗺️ اختيار"
};

// ============================================
// Exam 30 (exam30.json) - Hallo Maria
// ============================================

HELP_DATA["sprach1_exam30_q1"] = {
    text: "schicke ich dir noch rasch einige Zeilen",
    meaning: "سأرسل لك بضعة أسطر بسرعة",
    keywords: ["rasch = بسرعة", "Zeilen = أسطر", "schicke = سأرسل"],
    simplified: "فكرت أن أكتب لك قبل العودة للروتين",
    imagine: "✍️📨 يكتب"
};

HELP_DATA["sprach1_exam30_q2"] = {
    text: "wegen deiner Grippe nicht dabei sein konntest",
    meaning: "بسبب إصابتك بالإنفلونزا لم تستطيعي الحضور",
    keywords: ["wegen = بسبب", "Grippe = إنفلونزا", "dabei sein = الحضور"],
    simplified: "كنا نفتقدك حقاً خاصة عندما علمنا أنك مريضة",
    imagine: "🤧💊 أنسجة وأدوية"
};

HELP_DATA["sprach1_exam30_q3"] = {
    text: "Außer auf Michael sind alle mit dem Zug angereist",
    meaning: "باستثناء مايكل، سافر الجميع بالقطار",
    keywords: ["Außer = باستثناء", "Zug = قطار", "angereist = سافر"],
    simplified: "لقد سافرنا جميعاً بالقطار ما عدا هو",
    imagine: "🚆👋 قطار يسير"
};

HELP_DATA["sprach1_exam30_q4"] = {
    text: "Nachdem wir unser Gepäck abgestellt hatten",
    meaning: "بعد أن وضعنا أمتعتنا جانباً",
    keywords: ["abgestellt hatten = كنا قد وضعنا جانباً", "Gepäck = أمتعة", "Nachdem = بعد أن"],
    simplified: "بمجرد وضع الحقائب قمنا بجولة",
    imagine: "🧳🚪 حقائب عند الباب"
};

HELP_DATA["sprach1_exam30_q5"] = {
    text: "hat sich als ausgezeichnete Fremdenführerin erwiesen",
    meaning: "أثبتت أنها مرشدة سياحية ممتازة",
    keywords: ["als = كـ", "ausgezeichnete = ممتازة", "Fremdenführerin = مرشدة سياحية"],
    simplified: "عرفت ليلو كل شيء عن المنطقة وأرشدتنا بمهارة",
    imagine: "🗺️👩‍🏫 مرشدة سياحية"
};

HELP_DATA["sprach1_exam30_q6"] = {
    text: "Am Abend stand dann die Felsenbühne auf dem Programm",
    meaning: "في المساء كانت المسرح الصخري ضمن جدول الأعمال",
    keywords: ["auf = على", "Programm = جدول أعمال", "Felsenbühne = مسرح صخري"],
    simplified: "لقد شاهدنا عرضاً مسرحياً مميزاً في المساء",
    imagine: "⛰️🎭 مسرح في الجبال"
};

HELP_DATA["sprach1_exam30_q7"] = {
    text: "Die Wanderung am nächsten Tag war ganz schön anstrengend",
    meaning: "كانت رحلة اليوم التالي مرهقة حقاً",
    keywords: ["ganz schön = حقاً", "anstrengend = مرهقة", "Wanderung = رحلة"],
    simplified: "التسلق كان متعباً ولكنه يستحق العناء",
    imagine: "🥾😓 حذاء المشي"
};

HELP_DATA["sprach1_exam30_q8"] = {
    text: "Obwohl alle ziemlich erschöpft waren",
    meaning: "على الرغم من أن الجميع كانوا مرهقين جداً",
    keywords: ["Obwohl = على الرغم من", "erschöpft = مرهقين", "ziemlich = جداً"],
    simplified: "لم نستطع النوم مبكراً رغم التعب الشديد",
    imagine: "😴💬 شخص نائم بجانب آخر"
};

HELP_DATA["sprach1_exam30_q9"] = {
    text: "waren wir uns einig, dass wir bald wieder zusammen einen Ausflug machen sollten",
    meaning: "اتفقنا على أن ننظم رحلة أخرى معاً قريباً",
    keywords: ["sollten = يجب أن", "Ausflug = رحلة", "zusammen = معاً"],
    simplified: "لقد خططنا لاجتماع قادم بالفعل",
    imagine: "🗓️🤝 أيادي مصافحة"
};

HELP_DATA["sprach1_exam30_q10"] = {
    text: "Ich hoffe, dass es dir inzwischen schon wieder besser geht",
    meaning: "آمل أن تكوني قد تعافيتِ الآن",
    keywords: ["inzwischen = الآن", "besser = أفضل", "geht = تشعرين"],
    simplified: "أتمنى أن تكوني قد استعدت عافيتك تماماً",
    imagine: "💪😊 يد تعرض عضلة ووجه مبتسم"
};

// ============================================
// Exam 31 (exam31.json) - Sehr geehrte Frau Szabo
// ============================================

HELP_DATA["sprach1_exam31_q1"] = {
    text: "an unseren Deutschkursen",
    meaning: "بدوراتنا الألمانية",
    keywords: ["an = بدورات", "Deutschkursen = دورات ألمانية", "unseren = دوراتنا"],
    simplified: "اهتمامكم بدوراتنا الألمانية",
    imagine: "🇩🇪📚 علم ألماني وكتاب"
};

HELP_DATA["sprach1_exam31_q2"] = {
    text: "in Höhe von € 200,-",
    meaning: "بقيمة 200 يورو",
    keywords: ["Höhe = قيمة", "von = بقيمة", "€ 200,- = 200 يورو"],
    simplified: "دفعة أولى قدرها 200 يورو",
    imagine: "💰📄 ورقة نقدية يورو"
};

HELP_DATA["sprach1_exam31_q3"] = {
    text: "Zwecks besserer Einschätzung Ihrer Vorkenntnisse",
    meaning: "لغرض تقدير أفضل لمعرفتك المسبقة",
    keywords: ["Zwecks = لغرض", "Einschätzung = تقدير", "Vorkenntnisse = معرفة مسبقة"],
    simplified: "لتقييم مستواك بشكل أفضل",
    imagine: "📝🔍 ورقة امتحان وعدسة مكبرة"
};

HELP_DATA["sprach1_exam31_q4"] = {
    text: "anschließen",
    meaning: "يُلحق",
    keywords: ["anschließen = يلحق", "mündlicher Test = اختبار شفوي", "wird sich = سيكون"],
    simplified: "سيتم إجراء اختبار شفوي",
    imagine: "🗣️📝 فقاعة كلام وورقة"
};

HELP_DATA["sprach1_exam31_q5"] = {
    text: "bezüglich Ihrer Freizeitinteressen",
    meaning: "بخصوص اهتماماتك في أوقات الفراغ",
    keywords: ["bezüglich = بخصوص", "Freizeitinteressen = اهتمامات أوقات الفراغ", "Ihrer = اهتماماتك"],
    simplified: "استبيان حول هواياتك",
    imagine: "🎨⚽ رسم وكرات قدم"
};

HELP_DATA["sprach1_exam31_q6"] = {
    text: "so angenehm wie möglich",
    meaning: "بأكثر شكل مريح قدر الإمكان",
    keywords: ["angenehm = مريح", "möglich = ممكن", "wie = قدر"],
    simplified: "نجعل إقامتك ممتعة قدر الإمكان",
    imagine: "😊🏨 وجه مبتسم وفندق"
};

HELP_DATA["sprach1_exam31_q7"] = {
    text: "einer Privatunterkunft",
    meaning: "سكن خاص",
    keywords: ["einer = سكن", "Privatunterkunft = سكن خاص", "deutschen Gastfamilie = عائلة مضيفة ألمانية"],
    simplified: "الإقامة مع عائلة ألمانية",
    imagine: "🏠👨‍👩‍👧👦 منزل وعائلة"
};

HELP_DATA["sprach1_exam31_q8"] = {
    text: "Sobald Ihre Anmeldung bei uns eingegangen ist",
    meaning: "بمجرد استلام طلب التسجيل الخاص بك",
    keywords: ["Sobald = بمجرد", "Anmeldung = طلب تسجيل", "eingegangen = مستلم"],
    simplified: "عند وصول طلبك إلينا",
    imagine: "📬✉️ صندوق بريد ورسالة"
};

HELP_DATA["sprach1_exam31_q9"] = {
    text: "damit Sie den Weg zu uns ohne Umstände finden",
    meaning: "لتجد الطريق إلينا بسهولة",
    keywords: ["damit = لكي", "ohne Umstände = بسهولة", "finden = تجد"],
    simplified: "لتعثر على طريقك بدون متاعب",
    imagine: "🗺️📍 خريطة وعلامة موقع"
};

HELP_DATA["sprach1_exam31_q10"] = {
    text: "Für weitere Fragen",
    meaning: "للاستفسارات الأخرى",
    keywords: ["Für = لـ", "weitere = أخرى", "Fragen = استفسارات"],
    simplified: "لأي استفسارات إضافية",
    imagine: "❓☎️ علامة استفهام وسماعة هاتف"
};

// ============================================
// Exam 32 (exam32.json) - Sehr geehrte Frau Szabo (معدل)
// ============================================

HELP_DATA["sprach1_exam32_q1"] = {
    text: "anbei erhalten Sie das angeforderte Anmeldeformular",
    meaning: "مرفق تجدون نموذج التسجيل المطلوب",
    keywords: ["anbei = مرفق", "erhalten = تجدون", "Anmeldeformular = نموذج تسجيل"],
    simplified: "نموذج التسجيل مرفق بهذه الرسالة",
    imagine: "📎📄 مشبك ورق مع ورقة"
};

HELP_DATA["sprach1_exam32_q2"] = {
    text: "in Höhe von € 200,-",
    meaning: "بقيمة 200 يورو",
    keywords: ["Höhe = قيمة", "von = بقيمة", "€ 200,- = 200 يورو"],
    simplified: "دفعة أولى قدرها 200 يورو",
    imagine: "💰📄 ورقة نقدية يورو"
};

HELP_DATA["sprach1_exam32_q3"] = {
    text: "Zur genaueren Einschätzung Ihrer Vorkenntnisse",
    meaning: "لتقييم أكثر دقة لمعرفتك المسبقة",
    keywords: ["Zur = لـ", "genaueren = أكثر دقة", "Einschätzung = تقييم"],
    simplified: "لتحديد مستواك بدقة",
    imagine: "📊📝 رسم بياني وورقة"
};

HELP_DATA["sprach1_exam32_q4"] = {
    text: "wird sich ... ein mündlicher Test stattfinden",
    meaning: "سيتم إجراء اختبار شفوي",
    keywords: ["stattfinden = يتم إجراء", "mündlicher Test = اختبار شفوي", "wird sich = سيكون"],
    simplified: "سيكون هناك اختبار تحدث",
    imagine: "🗣️👂 شخص يتحدث وآخر يستمع"
};

HELP_DATA["sprach1_exam32_q5"] = {
    text: "bezüglich Ihrer Freizeitinteressen",
    meaning: "بخصوص اهتماماتك في أوقات الفراغ",
    keywords: ["bezüglich = بخصوص", "Freizeitinteressen = اهتمامات أوقات الفراغ", "Ihrer = اهتماماتك"],
    simplified: "استبيان حول هواياتك",
    imagine: "🎨⚽ رسم وكرات قدم"
};

HELP_DATA["sprach1_exam32_q6"] = {
    text: "möglichst angenehm zu gestalten",
    meaning: "لجعلها مريحة قدر الإمكان",
    keywords: ["möglichst = قدر الإمكان", "angenehm = مريحة", "zu gestalten = لجعل"],
    simplified: "نسعى لتوفير إقامة ممتعة",
    imagine: "😊🏨 وجه مبتسم وفندق"
};

HELP_DATA["sprach1_exam32_q7"] = {
    text: "einer Privatunterkunft",
    meaning: "سكن خاص",
    keywords: ["einer = سكن", "Privatunterkunft = سكن خاص", "deutschen Gastfamilie = عائلة مضيفة ألمانية"],
    simplified: "الإقامة مع عائلة ألمانية",
    imagine: "🏠👨‍👩‍👧‍👦 منزل وعائلة"
};

HELP_DATA["sprach1_exam32_q8"] = {
    text: "Sobald Ihre Anmeldung bei uns eingegangen ist",
    meaning: "بمجرد استلام طلب التسجيل الخاص بك",
    keywords: ["Sobald = بمجرد", "Anmeldung = طلب تسجيل", "eingegangen = مستلم"],
    simplified: "عند وصول طلبك إلينا",
    imagine: "📬✉️ صندوق بريد ورسالة"
};

HELP_DATA["sprach1_exam32_q9"] = {
    text: "damit Sie den Weg zu uns ohne Umstände finden",
    meaning: "لتجد الطريق إلينا بسهولة",
    keywords: ["damit = لكي", "ohne Umstände = بسهولة", "finden = تجد"],
    simplified: "لتعثر على طريقك بدون متاعب",
    imagine: "🗺️📍 خريطة وعلامة موقع"
};

HELP_DATA["sprach1_exam32_q10"] = {
    text: "Für weitere Fragen",
    meaning: "للاستفسارات الأخرى",
    keywords: ["Für = لـ", "weitere = أخرى", "Fragen = استفسارات"],
    simplified: "لأي استفسارات إضافية",
    imagine: "❓☎️ علامة استفهام وسماعة هاتف"
};

// ============================================
// Exam 33 (exam33.json) - Lieber Igor
// ============================================

HELP_DATA["sprach1_exam33_q1"] = {
    text: "über die ich mich sehr gefreut habe",
    meaning: "التي سررت بها كثيراً",
    keywords: ["über = التي", "mich gefreut = سررت", "sehr = كثيراً"],
    simplified: "التي أسعدتني كثيراً",
    imagine: "💌😊 رسالة ووجه مبتسم"
};

HELP_DATA["sprach1_exam33_q2"] = {
    text: "außerdem noch billiger",
    meaning: "وأيضاً أرخص",
    keywords: ["außerdem = أيضاً", "billiger = أرخص", "noch = أيضاً"],
    simplified: "والقطار أكثر اقتصاداً أيضاً",
    imagine: "🚆💰 قطار وعلامة توفير"
};

HELP_DATA["sprach1_exam33_q3"] = {
    text: "können wir ... Zug fahren",
    meaning: "يمكننا ركوب القطار",
    keywords: ["fahren = ركوب", "Zug = قطار", "können = يمكننا"],
    simplified: "السفر بالقطار في 30 دولة أوروبية",
    imagine: "🚆🗺️ قطار وخريطة أوروبا"
};

HELP_DATA["sprach1_exam33_q4"] = {
    text: "Da wir noch keine 26 Jahre alt sind",
    meaning: "بما أننا لم نبلغ 26 عاماً بعد",
    keywords: ["Da = بما أن", "noch = بعد", "26 Jahre alt = 26 عاماً"],
    simplified: "لأننا دون سن 26 عاماً، التذكرة ستكون رخيصة",
    imagine: "🎫👦 تذكرة وشخص شاب"
};

HELP_DATA["sprach1_exam33_q5"] = {
    text: "Der Preis hängt davon ab",
    meaning: "السعر يعتمد على ذلك",
    keywords: ["hängt ab = يعتمد", "davon = على ذلك", "Preis = سعر"],
    simplified: "السعر يتوقف على مدة الرحلة",
    imagine: "💰⏳ نقود وساعة"
};

HELP_DATA["sprach1_exam33_q6"] = {
    text: "Ich habe auch schon mit meiner Tante in Marseille gesprochen",
    meaning: "لقد تحدثت أيضاً مع عمتي في مرسيليا",
    keywords: ["gesprochen = تحدثت", "Tante = عمة", "Marseille = مرسيليا"],
    simplified: "اتصلت بعمتي التي تقيم في مرسيليا",
    imagine: "📞👩‍🦳 مكالمة هاتفية وامرأة"
};

HELP_DATA["sprach1_exam33_q7"] = {
    text: "dass wir einige Tage bei ihr verbringen",
    meaning: "أن نقضي بضعة أيام عندها",
    keywords: ["dass = أن", "verbringen = نقضي", "einige Tage = بضعة أيام"],
    simplified: "اقترحت عمتي أن نزورها لبضعة أيام",
    imagine: "🏠💕 منزل وقلب"
};

HELP_DATA["sprach1_exam33_q8"] = {
    text: "sich freuen, mit uns um die Häuser zu ziehen",
    meaning: "يسعدون بالخروج معنا",
    keywords: ["sich freuen = يسعدون", "um die Häuser ziehen = الخروج", "mit uns = معنا"],
    simplified: "سيكون ابن عمي سعيداً برفقتنا",
    imagine: "🎉👬 احتفال وصديقان"
};

HELP_DATA["sprach1_exam33_q9"] = {
    text: "deine Sprachkenntnisse",
    meaning: "مهاراتك اللغوية",
    keywords: ["deine = مهاراتك", "Sprachkenntnisse = مهارات لغوية", "der = الـ"],
    simplified: "لا تقلق بشأن الحاجز اللغوي",
    imagine: "🗣️💬 فقاعات كلام"
};

HELP_DATA["sprach1_exam33_q10"] = {
    text: "jedenfalls schon sehr auf unsere gemeinsame Reise",
    meaning: "على أية حال على رحلتنا المشتركة",
    keywords: ["jedenfalls = على أية حال", "gemeinsame = مشتركة", "Reise = رحلة"],
    simplified: "أتطلع لرحلتنا سوياً بكل تأكيد",
    imagine: "✈️😊 طائرة ووجه مبتسم"
};

// ============================================
// Exam 34 (exam34.json) - Liebe Lara
// ============================================

HELP_DATA["sprach1_exam34_q1"] = {
    text: "deinen Brief antworte",
    meaning: "أرد على رسالتك",
    keywords: ["deinen Brief = رسالتك", "antworte = أرد", "auf = على"],
    simplified: "تأخرت في الرد على رسالتك",
    imagine: "✉️⏰ رسالة وساعة"
};

HELP_DATA["sprach1_exam34_q2"] = {
    text: "weil du wirklich tolle Neuigkeiten mitzuteilen hast",
    meaning: "لأن لديك أخبار رائعة لتخبريها",
    keywords: ["weil = لأن", "tolle Neuigkeiten = أخبار رائعة", "mitzuteilen = لتخبريها"],
    simplified: "لأن لديك أخباراً سعيدة تودين مشاركتها",
    imagine: "📢🎉 مكبر صوت وزينة احتفال"
};

HELP_DATA["sprach1_exam34_q3"] = {
    text: "Ich weiß noch gut",
    meaning: "ما زلت أذكر جيداً",
    keywords: ["noch = ما زلت", "gut = جيداً", "weiß = أذكر"],
    simplified: "ما زلت أذكر كيف كنا نحلم بالسفر",
    imagine: "💭🌍 حلم وخريطة"
};

HELP_DATA["sprach1_exam34_q4"] = {
    text: "Für deinen Neubeginn wünschen Peter und ich dir alles Gute",
    meaning: "بمناسبة بدايتك الجديدة، نتمنى لك كل التوفيق أنا وبيتر",
    keywords: ["Für = بمناسبة", "Neubeginn = بداية جديدة", "alles Gute = كل التوفيق"],
    simplified: "نتمنى لك التوفيق في فصلك الجديد",
    imagine: "🍀✨ برسيم رباعي ونجوم"
};

HELP_DATA["sprach1_exam34_q5"] = {
    text: "auf seiner neuen Stelle",
    meaning: "في منصبه الجديد",
    keywords: ["neuen = الجديد", "Stelle = منصب", "seiner = منصبه"],
    simplified: "روبرت سعيد بعمله الجديد",
    imagine: "👔💼 ربطة عنق وحقيبة"
};

HELP_DATA["sprach1_exam34_q6"] = {
    text: "Du weißt ja, was das heißt",
    meaning: "أنت تعلمين ماذا يعني ذلك",
    keywords: ["ja = بالطبع", "weißt = تعلمين", "das heißt = يعني ذلك"],
    simplified: "أنت تعرفين كيف يكون المراهقون في هذا العمر",
    imagine: "🙄😏 تعبير وجه ساخر"
};

HELP_DATA["sprach1_exam34_q7"] = {
    text: "Darauf sind wir natürlich stolz",
    meaning: "نحن فخورون بذلك طبعاً",
    keywords: ["Darauf = بذلك", "stolz = فخورون", "natürlich = طبعاً"],
    simplified: "بالطبع هذا يجعلنا فخورين جداً",
    imagine: "🏆😊 كأس ووجه مبتسم"
};

HELP_DATA["sprach1_exam34_q8"] = {
    text: "Es wäre schön, wenn wir uns vor deiner Abreise noch einmal treffen würden",
    meaning: "سيكون من الرائع لو نلتقي مرة أخرى قبل مغادرتك",
    keywords: ["wäre = سيكون", "schön = رائعاً", "treffen = نلتقي"],
    simplified: "أتمنى لو نستطيع الاجتماع قبل رحيلك",
    imagine: "🤝😊 مصافحة ووجه مبتسم"
};

HELP_DATA["sprach1_exam34_q9"] = {
    text: "trotz der Umzugsvorbereitungen noch Zeit",
    meaning: "بالرغم من تحضيرات الانتقال بعض الوقت",
    keywords: ["trotz = بالرغم من", "Umzugsvorbereitungen = تحضيرات انتقال", "Zeit = وقت"],
    simplified: "أتمنى أن تجدي وقتاً رغم انشغالك بالتجهيز",
    imagine: "📦⚡ صناديق وبرق"
};

HELP_DATA["sprach1_exam34_q10"] = {
    text: "damit wir etwas abmachen können",
    meaning: "لكي نتمكن من ترتيب شيء",
    keywords: ["damit = لكي", "abmachen = نرتب", "können = نتمكن"],
    simplified: "لنتمكن من تحديد موعد اللقاء",
    imagine: "📅🗓️ تقويم وموعد"
};

// ============================================
// Exam 35 (exam35.json) - Lieber David
// ============================================

HELP_DATA["sprach1_exam35_q1"] = {
    text: "noch schöner ist es",
    meaning: "الأجمل أيضاً أنه",
    keywords: ["noch = أيضاً", "schöner = أجمل", "ist es = أنه"],
    simplified: "الجميل جداً أنك تريد زيارتنا رغم المسافة",
    imagine: "🚗❤️ سيارة وقلب"
};

HELP_DATA["sprach1_exam35_q2"] = {
    text: "obwohl Du in München zu tun hast und wir in Köln wohnen",
    meaning: "على الرغم من أن لديك ما تفعله في ميونخ ونحن نعيش في كولونيا",
    keywords: ["obwohl = على الرغم من", "München = ميونخ", "Köln = كولونيا"],
    simplified: "رغم أن عملك في ميونخ ونحن بعيدون في كولونيا",
    imagine: "📍🗺️ علامتا موقع بعيدتان على خريطة ألمانيا"
};

HELP_DATA["sprach1_exam35_q3"] = {
    text: "anschauen",
    meaning: "نشاهد",
    keywords: ["anschauen = نشاهد", "Kölner Dom = كاتدرائية كولونيا", "kannst = يمكنك"],
    simplified: "يمكنك زيارة الكاتدرائية الشهيرة والمعالم السياحية الأخرى",
    imagine: "⛪👀 كاتدرائية وعينان"
};

HELP_DATA["sprach1_exam35_q4"] = {
    text: "sollten wir genug Zeit für Gespräche haben",
    meaning: "يجب أن يكون لدينا وقت كافٍ للحديث",
    keywords: ["sollten = يجب", "Zeit = وقت", "Gespräche = للحديث"],
    simplified: "نتأكد من تخصيص وقت كافٍ للدردشة",
    imagine: "💬🕰️ فقاعات كلام وساعة"
};

HELP_DATA["sprach1_exam35_q5"] = {
    text: "ankommen wirst",
    meaning: "ستصل",
    keywords: ["ankommen = تصل", "wirst = سوف", "Hauptbahnhof = محطة القطار الرئيسية"],
    simplified: "أخبرنا بموعد وصولك إلى المحطة الرئيسية",
    imagine: "🚆🕞 قطار وثلاثة أرباع ساعة"
};

HELP_DATA["sprach1_exam35_q6"] = {
    text: "falls wir uns verspäten sollten",
    meaning: "في حال تأخرنا",
    keywords: ["falls = في حال", "uns verspäten = نتأخر", "sollten = قد"],
    simplified: "انتظرنا في الرصيف في حال وصلنا متأخرين قليلاً",
    imagine: "⏰🏃‍♂️ ساعة وشخص يجري"
};

HELP_DATA["sprach1_exam35_q7"] = {
    text: "seitdem für ihn, wenn er zu Besuch kommt",
    meaning: "منذ ذلك الحين نستخدمه لزياراته",
    keywords: ["seitdem = منذ ذلك الحين", "für ihn = لزياراته", "zu Besuch = ضيفاً"],
    simplified: "الغرفة أصبحت جاهزة لاستقبال الضيوف",
    imagine: "🛏️🚪 سرير وباب مفتوح"
};

HELP_DATA["sprach1_exam35_q8"] = {
    text: "Erinnerungen auffrischen",
    meaning: "نتذكر الأيام الخوالي",
    keywords: ["auffrischen = نستعيد", "Erinnerungen = ذكريات", "alte = قديمة"],
    simplified: "لنحضر ذكرياتنا الجميلة معاً",
    imagine: "📸🤝 ألبوم صور وأيدي متشابكة"
};

HELP_DATA["sprach1_exam35_q9"] = {
    text: "als wir bei Dir zu Besuch waren",
    meaning: "عندما زرناك",
    keywords: ["als = عندما", "bei Dir = عندك", "zu Besuch = للزيارة"],
    simplified: "التقطنا الكثير من الصور في آخر زيارة لنا",
    imagine: "📸👨‍👩‍👧 كاميرا وعائلة"
};

HELP_DATA["sprach1_exam35_q10"] = {
    text: "lass Dich überraschen...",
    meaning: "دع نفسك تفاجأ...",
    keywords: ["lass = دع", "Dich = نفسك", "überraschen = تفاجأ"],
    simplified: "لن نخبرك بكل شيء الآن وسنترك لك المفاجأة",
    imagine: "🎁🤫 هدية وإصبع على الفم"
};

// ============================================
// Exam 36 (exam36.json) - Sehr geehrter Herr Wenzel
// ============================================

HELP_DATA["sprach1_exam36_q1"] = {
    text: "für Ihre Anfrage",
    meaning: "على استفساركم",
    keywords: ["für = على", "Ihre Anfrage = استفساركم", "Dank = شكر"],
    simplified: "شكراً لاهتمامكم",
    imagine: "🙏📨 أيادٍ مضمومة ورسالة"
};

HELP_DATA["sprach1_exam36_q2"] = {
    text: "jeweils am ersten Montag",
    meaning: "في أول اثنين من كل شهر",
    keywords: ["jeweils = في", "ersten Montag = أول اثنين", "am = من"],
    simplified: "تقام الأمسيات الثقافية كل يوم اثنين أول الشهر",
    imagine: "📅🗓️ تقويم يشير إلى يوم اثنين"
};

HELP_DATA["sprach1_exam36_q3"] = {
    text: "gewidmet",
    meaning: "مخصص",
    keywords: ["gewidmet = مخصص", "kulturellen Aspekt = موضوع ثقافي", "ist = يكون"],
    simplified: "يتم تخصيص كل أمسية لموضوع ثقافي معين",
    imagine: "🎭📖 أقنعة وكتب"
};

HELP_DATA["sprach1_exam36_q4"] = {
    text: "vorbereitende Treffen",
    meaning: "لقاءات تحضيرية",
    keywords: ["vorbereitende = تحضيرية", "Treffen = لقاءات", "mehrere = عدة"],
    simplified: "لدينا عدة لقاءات تمهيدية قبل العروض المسرحية",
    imagine: "🤝📋 مصافحة وقائمة مهام"
};

HELP_DATA["sprach1_exam36_q5"] = {
    text: "die meisten unserer Mitglieder",
    meaning: "معظم أعضائنا",
    keywords: ["die meisten = معظم", "Mitglieder = أعضاء", "unserer = أعضائنا"],
    simplified: "رحلاتنا الدراسية تحظى باهتمام الكثيرين",
    imagine: "🚌👥 حافلة ومجموعة أشخاص"
};

HELP_DATA["sprach1_exam36_q6"] = {
    text: "entlang der Route deutscher Dichter",
    meaning: "على طول طريق الشعراء الألمان",
    keywords: ["entlang = على طول", "Route = طريق", "deutscher Dichter = شعراء ألمان"],
    simplified: "رحلات تمتد من فرانكفورت إلى فايمر",
    imagine: "🗺️✍️ خريطة وقلم"
};

HELP_DATA["sprach1_exam36_q7"] = {
    text: "Auf den Spuren Tschaikowskis nach Russland",
    meaning: "على خطى تشايكوفسكي إلى روسيا",
    keywords: ["Auf den Spuren = على خطى", "Tschaikowskis = تشايكوفسكي", "Russland = روسيا"],
    simplified: "رحلة استثنائية هذا العام على خطى الملحن العظيم",
    imagine: "🎵🇷🇺 روسيا وموسيقى تشايكوفسكي"
};

HELP_DATA["sprach1_exam36_q8"] = {
    text: "mit deren Hilfe Sie Ihr kulturelles Wissen erweitern können",
    meaning: "يمكنكم توسيع معرفتكم الثقافية بمساعدتهم",
    keywords: ["deren = بمساعدتهم", "erweitern = توسيع", "kulturelles Wissen = معرفة ثقافية"],
    simplified: "مرشدونا الخبراء سيساعدونكم على فهم الثقافة المحلية",
    imagine: "🎓🧠 قبعة تخرج ودماغ"
};

HELP_DATA["sprach1_exam36_q9"] = {
    text: "sofern dies organisatorisch möglich ist",
    meaning: "إذا كان ذلك ممكناً تنظيمياً",
    keywords: ["sofern = إذا", "organisatorisch = تنظيمياً", "möglich = ممكناً"],
    simplified: "بإمكانكم استبدال التذاكر بشرط توفر البدائل",
    imagine: "🎟️🔄 تذكرتان وكلمة تبادل"
};

HELP_DATA["sprach1_exam36_q10"] = {
    text: "erreichbar",
    meaning: "يمكن الوصول إليها",
    keywords: ["erreichbar = يمكن الوصول إليها", "Geschäftsstelle = مقر المكتب", "ist = يكون"],
    simplified: "مكتبنا متاح للجميع طوال أيام الأسبوع",
    imagine: "🏢☎️ مبنى وسماعة هاتف"
};

// ============================================
// Exam 37 (exam37.json) - Liebe Autorinnen und Autoren
// ============================================

HELP_DATA["sprach1_exam37_q1"] = {
    text: "Wie ihr alle wisst",
    meaning: "كما تعلمون جميعاً",
    keywords: ["Wie = كما", "ihr = أنتم", "wisst = تعلمون"],
    simplified: "وكما تعلمون جميعاً",
    imagine: "👥📢 مجموعة تتحدث ومكبر صوت"
};

HELP_DATA["sprach1_exam37_q2"] = {
    text: "alle Texte und Bilder vorliegen",
    meaning: "كل النصوص والصور تكون متوفرة",
    keywords: ["vorliegen = متوفرة", "Texte = نصوص", "Bilder = صور"],
    simplified: "لن تتمكن كلوديا من البدء بالتصميم قبل استلام كامل المواد",
    imagine: "📄🖼️ ورقة وصورة"
};

HELP_DATA["sprach1_exam37_q3"] = {
    text: "im Interesse der Autorinnen und Autoren",
    meaning: "بمصلحة الكاتبات والكتاب أنفسهم",
    keywords: ["im Interesse = بمصلحة", "Autorinnen = كاتبات", "Autoren = كتاب"],
    simplified: "الجميع يستفيد من التصميم الجيد",
    imagine: "🎨✍️ لوحة فنية وقلم"
};

HELP_DATA["sprach1_exam37_q4"] = {
    text: "Liefert also bitte eure Beiträge rechtzeitig ab",
    meaning: "لذا يرجى تسليم مساهماتكم في الوقت المحدد",
    keywords: ["abliefern = تسليم", "Beiträge = مساهمات", "rechtzeitig = في الوقت المحدد"],
    simplified: "لذا، نرجو منكم تسليم موادكم في الموعد المحدد",
    imagine: "🗓️✍️ تقويم وقلم"
};

HELP_DATA["sprach1_exam37_q5"] = {
    text: "bei euch",
    meaning: "لديكم",
    keywords: ["bei = لدى", "euch = أنتم", "Copyright = حقوق النشر"],
    simplified: "حقوق الطبع والنشر تبقى ملكاً لكم بالطبع",
    imagine: "©️🖼️ رمز حقوق الطبع وصورة"
};

HELP_DATA["sprach1_exam37_q6"] = {
    text: "stark zurückgegangen",
    meaning: "انخفضت بشكل كبير",
    keywords: ["stark = بشكل كبير", "zurückgegangen = انخفضت", "Verkaufszahlen = أرقام المبيعات"],
    simplified: "مبيعات الجريدة تراجعت هذا العام",
    imagine: "📉📰 رسم بياني ينخفض وجريدة"
};

HELP_DATA["sprach1_exam37_q7"] = {
    text: "euch alle noch einmal herzlich darum bitten",
    meaning: "نطلب منكم جميعاً مرة أخرى بإخلاص",
    keywords: ["darum = بذلك", "bitten = نطلب", "herzlich = بإخلاص"],
    simplified: "نرجو منكم مرة أخرى تركيز جهودكم",
    imagine: "🙏✨ أيادٍ مضمومة ونجوم"
};

HELP_DATA["sprach1_exam37_q8"] = {
    text: "ansprechen",
    meaning: "تخاطبهم وتهمهم",
    keywords: ["ansprechen = تخاطب", "Mitglieder = أعضاء", "unsere = القارئين"],
    simplified: "اختيار مواضيع تعني حقاً أعضاء النادي",
    imagine: "🎯👥 هدف ومجموعة أشخاص"
};

HELP_DATA["sprach1_exam37_q9"] = {
    text: "dass man große Themen wie Politik oder Gesellschaft nicht behandeln kann",
    meaning: "لا يمكن معالجة مواضيع كبيرة مثل السياسة أو المجتمع",
    keywords: ["dass = أن", "behandeln = معالجة", "große Themen = مواضيع كبيرة"],
    simplified: "لا نعني أنه يجب تجنب القضايا الكبرى تماماً،",
    imagine: "🗳️🌍 صناديق اقتراع وكرة أرضية"
};

HELP_DATA["sprach1_exam37_q10"] = {
    text: "als unabhängige Zeitung",
    meaning: "كصحيفة مستقلة",
    keywords: ["als = كـ", "unabhängige = مستقلة", "Zeitung = صحيفة"],
    simplified: "نحن فخورون بكوننا صحيفة ناطقة باسم قرائنا",
    imagine: "🗞️✊ جريدة وقبضة مرفوعة"
};

// ============================================
// Exam 38 (exam38.json) - Liebe Clara
// ============================================

HELP_DATA["sprach1_exam38_q1"] = {
    text: "voneinander gehört haben",
    meaning: "سمعنا بعضنا عن بعض",
    keywords: ["voneinander = بعضنا عن بعض", "gehört = سمع", "haben = سمعنا"],
    simplified: "مضى وقت طويل منذ آخر مرة سمعنا فيها أخبار بعضنا البعض",
    imagine: "📞🕰️ سماعة هاتف وساعة قديمة"
};

HELP_DATA["sprach1_exam38_q2"] = {
    text: "durch Europa",
    meaning: "عبر أوروبا",
    keywords: ["durch = عبر", "Europa = أوروبا", "Rundreise = جولة"],
    simplified: "أجوب أوروبا في رحلة واسعة",
    imagine: "🗺️🚂 خريطة وقطار"
};

HELP_DATA["sprach1_exam38_q3"] = {
    text: "wie du weißt",
    meaning: "كما تعلمين",
    keywords: ["wie = كما", "du = أنت", "weißt = تعلمين"],
    simplified: "وكما تعرفين",
    imagine: "🤷‍♀️❓ امرأة ترفع حاجبيها"
};

HELP_DATA["sprach1_exam38_q4"] = {
    text: "war zuerst nicht gerade von dieser Idee begeistert",
    meaning: "لم يكن متحمساً لهذه الفكرة تماماً في البداية",
    keywords: ["war = كان", "begeistert = متحمساً", "nicht gerade = لم يكن"],
    simplified: "لم يرق لمديري الأمر في البداية حقاً",
    imagine: "👨‍💼😒 رجل أعمال معبس الوجه"
};

HELP_DATA["sprach1_exam38_q5"] = {
    text: "es in der Firma ohnehin etwas ruhiger",
    meaning: "إن الأمور في الشركة هادئة نوعاً ما على أية حال",
    keywords: ["es = الأمور", "ruhiger = هادئة", "ohnehin = على أية حال"],
    simplified: "أشهر الصيف هادئة نسبياً في العمل أصلاً",
    imagine: "☀️🏢 مكتب هادئ ورجل أعمال متعب"
};

HELP_DATA["sprach1_exam38_q6"] = {
    text: "erste Station",
    meaning: "المحطة الأولى",
    keywords: ["erste = الأولى", "Station = محطة", "war = كانت"],
    simplified: "أمستردام كانت المحطة الأولى للرحلة",
    imagine: "🚉🟢 محطة قطار ورمز البداية"
};

HELP_DATA["sprach1_exam38_q7"] = {
    text: "daran denken",
    meaning: "أفكر في العودة إلى العمل",
    keywords: ["daran = في ذلك", "denken = أفكر", "zurück = العودة"],
    simplified: "أكره حتى التفكير في العودة إلى العمل يوماً ما",
    imagine: "💼😖 حقيبة ووجه متألم"
};

HELP_DATA["sprach1_exam38_q8"] = {
    text: "muss",
    meaning: "يجب أن أعود",
    keywords: ["muss = يجب", "zurück = أعود", "irgendwann = يوماً ما"],
    simplified: "أدري أنني مضطرة للعودة إلى العمل في النهاية",
    imagine: "🏢🔗 مكتب وسلسلة"
};

HELP_DATA["sprach1_exam38_q9"] = {
    text: "mir der Gedanke gekommen",
    meaning: "خطرت لي الفكرة",
    keywords: ["mir = لي", "Gedanke = فكرة", "gekommen = خطرت"],
    simplified: "فكرت في تغيير حياتي بالكامل",
    imagine: "💡🤔 مصباح وشخص يفكر"
};

HELP_DATA["sprach1_exam38_q10"] = {
    text: "auch etwas ganz Neues anfangen könnte",
    meaning: "يمكنني البدء بشيء جديد تماماً",
    keywords: ["könnte = يمكنني", "Neues = شيء جديد", "anfangen = البدء"],
    simplified: "لربما حان الوقت لتغيير مساري المهني",
    imagine: "🔄💼 تغيير وحقيبة"
};

// ============================================
// Exam 39 (exam39.json) - Sehr geehrte Frau Melchior
// ============================================

HELP_DATA["sprach1_exam39_q1"] = {
    text: "in dem Sie um nähere Informationen zu der geplanten Dresden-Reise gebeten haben",
    meaning: "الذي طلبت فيه معلومات مفصلة عن رحلة دريسدن المخطط لها",
    keywords: ["in dem = الذي", "gebeten = طلبت", "nähere Informationen = معلومات مفصلة"],
    simplified: "شكراً لاستفساركم عن رحلة دريسدن",
    imagine: "✉️❓ رسالة وعلامة استفهام"
};

HELP_DATA["sprach1_exam39_q2"] = {
    text: "Da unser Programmheft erst in zwei Wochen fertig ist",
    meaning: "بما أن كتيب البرنامج الخاص بنا لن يكتمل إلا بعد أسبوعين",
    keywords: ["Da = بما أن", "Programmheft = كتيب برنامج", "fertig = كامل"],
    simplified: "كتيب الرحلة سيكون جاهزاً خلال أسبوعين، لكن إليكم ملخص مسبق",
    imagine: "📖⏰ كتاب وساعة"
};

HELP_DATA["sprach1_exam39_q3"] = {
    text: "Untergebracht sind Sie im Hotel Corona",
    meaning: "ستقيمون في فندق كورونا",
    keywords: ["Untergebracht = مقيمون", "Hotel Corona = فندق كورونا", "sind = ستكون"],
    simplified: "الفندق الذي ستقيمون فيه يقع في وسط المدينة",
    imagine: "🏨📍 فندق وعلامة موقع"
};

HELP_DATA["sprach1_exam39_q4"] = {
    text: "sich in der Stadtmitte befindet",
    meaning: "يقع في وسط المدينة",
    keywords: ["sich befindet = يقع", "Stadtmitte = وسط المدينة", "in der = في"],
    simplified: "موقعه ممتاز بالقرب من كل المعالم السياحية",
    imagine: "🗺️📍 خريطة وعلامة موقع"
};

HELP_DATA["sprach1_exam39_q5"] = {
    text: "gezeigt werden",
    meaning: "سيتم عرضها",
    keywords: ["gezeigt = عرض", "werden = سيتم", "Sehenswürdigkeiten = معالم سياحية"],
    simplified: "سترون أجمل معالم دريسدن",
    imagine: "🏛️👀 مبنى تاريخي وعينان"
};

HELP_DATA["sprach1_exam39_q6"] = {
    text: "der Semper-Oper",
    meaning: "أوبرا سمبر",
    keywords: ["der = أوبرا", "Semper-Oper = أوبرا سمبر", "Besuch = زيارة"],
    simplified: "المسرح المخطط له في الليلة نفسها",
    imagine: "🎭✨ مسرح ونجوم"
};

HELP_DATA["sprach1_exam39_q7"] = {
    text: "für seine exotischen Pflanzen berühmt ist",
    meaning: "تشتهر بنباتاتها الغريبة",
    keywords: ["für = بنباتاتها", "exotischen Pflanzen = نباتات غريبة", "berühmt = مشهورة"],
    simplified: "الحديقة مشهورة عالمياً بأزهارها وأنواعها النادرة",
    imagine: "🌺🏞️ زهرة جميلة ومنظر طبيعي"
};

HELP_DATA["sprach1_exam39_q8"] = {
    text: "steht zu Ihrer freien Verfügung",
    meaning: "يكون تحت تصرفكم الحر",
    keywords: ["steht = يكون", "freien Verfügung = تصرف حر", "Ihrer = تحت تصرفكم"],
    simplified: "اليوم الأخير من الرحلة سيكون مخصصاً لاستكشاف المدينة بأنفسكم",
    imagine: "🗓️🙌 تقويم وأيادي مفتوحة"
};

HELP_DATA["sprach1_exam39_q9"] = {
    text: "teilnehmen",
    meaning: "المشاركة",
    keywords: ["teilnehmen = المشاركة", "Fahrt = رحلة", "möchten = ترغبون"],
    simplified: "قد تفضلون استكشاف المناطق الطبيعية بدلاً من التسوق",
    imagine: "🏞️🚗 منظر طبيعي وسيارة"
};

HELP_DATA["sprach1_exam39_q10"] = {
    text: "verschaffen",
    meaning: "تعطيكم لمحة عامة",
    keywords: ["verschaffen = تعطيكم", "Überblick = لمحة عامة", "Reise = الرحلة"],
    simplified: "آمل أن تكون هذه المعلومات كافية لمساعدتكم على التخطيط",
    imagine: "📋👀 قائمة وعينان"
};

// ============================================
// Exam 40 (exam40.json) - Liebe Sandra
// ============================================

HELP_DATA["sprach1_exam40_q1"] = {
    text: "dass ich Urlaub auf einer Nordseeinsel mache",
    meaning: "أنني أقضي عطلتي في جزيرة بحر الشمال",
    keywords: ["Urlaub = عطلة", "Nordseeinsel = جزيرة بحر الشمال", "mache = أقضي"],
    simplified: "قد تتفاجئين لأنني اخترت الشمال بدلاً من الجنوب",
    imagine: "🏝️🤔 جزيرة وعلامة استفهام"
};

HELP_DATA["sprach1_exam40_q2"] = {
    text: "das Richtige für mich sein könnte",
    meaning: "قد يكون الشيء المناسب لي",
    keywords: ["könnte = قد يكون", "Richtige = المناسب", "für mich = لي"],
    simplified: "صدقاً، لم أتوقع أن أحب إجازة هادئة بهذا الشكل",
    imagine: "😊🏖️ وجه مبتسم وشاطئ"
};

HELP_DATA["sprach1_exam40_q3"] = {
    text: "von der Hektik des Alltags erholen möchte",
    meaning: "أريد أن أسترد عافيتي من صخب الحياة اليومية",
    keywords: ["erholen = أسترد عافيتي", "Hektik = صخب", "Alltags = الحياة اليومية"],
    simplified: "إذا أردت الهروب من ضغوط الروتين، فهذا هو المكان المناسب",
    imagine: "😤➡️😌 وجه متوتر يتحول إلى آخر مرتاح"
};

HELP_DATA["sprach1_exam40_q4"] = {
    text: "als sehr angenehm empfinde",
    meaning: "أشعر أنه مريح جداً",
    keywords: ["als = أنه", "angenehm = مريح", "empfinde = أشعر"],
    simplified: "أحب الطقس هنا لأنه لطيف وليس حاراً أبداً",
    imagine: "🌡️😊 ميزان حرارة ووجه مبتسم"
};

HELP_DATA["sprach1_exam40_q5"] = {
    text: "aus zwei Inseln",
    meaning: "من جزيرتين",
    keywords: ["aus = من", "zwei Inseln = جزيرتين", "besteht = تتكون"],
    simplified: "هيلغولاند ليست جزيرة واحدة بل جزيرتان منفصلتان",
    imagine: "🏝️🏝️ جزيرتان"
};

HELP_DATA["sprach1_exam40_q6"] = {
    text: "die per Fähre zu erreichen ist",
    meaning: "يمكن الوصول إليها بالعبّارة",
    keywords: ["ist = يمكن", "erreichen = الوصول", "Fähre = عبارة"],
    simplified: "تربط العبارات بين الجزيرة الرئيسية والجزيرة الرملية الصغيرة",
    imagine: "⛴️🏝️ عبارة وجزيرة"
};

HELP_DATA["sprach1_exam40_q7"] = {
    text: "lebenden Tiere",
    meaning: "الحيوانات الحية",
    keywords: ["lebenden = الحية", "Tiere = حيوانات", "wild = برية"],
    simplified: "ترى الفقمات وهي تسبح بحرية في مياهها الصافية",
    imagine: "🦭🌊 فقمة وماء"
};

HELP_DATA["sprach1_exam40_q8"] = {
    text: "wenige Stunden auf der Insel",
    meaning: "بضع ساعات على الجزيرة",
    keywords: ["wenige = بضع", "Stunden = ساعات", "Insel = جزيرة"],
    simplified: "معظم الزوار يقضون بضع ساعات فقط ثم يغادرون",
    imagine: "🕒🏝️ ساعة وجزيرة"
};

HELP_DATA["sprach1_exam40_q9"] = {
    text: "Sobald die Tagesausflügler wieder abgefahren sind",
    meaning: "بمجرد مغادرة زوار اليوم الواحد",
    keywords: ["Sobald = بمجرد", "Tagesausflügler = زوار اليوم الواحد", "abgefahren = مغادرة"],
    simplified: "بمجرد رحيل الحشود، يصبح كل شيء هادئاً وساحراً",
    imagine: "🚤🌅 قارب وغروب شمس"
};

HELP_DATA["sprach1_exam40_q10"] = {
    text: "dass du gern umziehen würdest",
    meaning: "أنك ترغبين في الانتقال",
    keywords: ["würdest = ترغبين", "umziehen = الانتقال", "gern = بكل سرور"],
    simplified: "هل فكرتِ أكثر في السكن الجديد الذي تحدثتِ عنه؟",
    imagine: "🏠❓ منزل وعلامة استفهام"
};

// ============================================
// sprach2.js - جميع شروحات Sprachbausteine Teil 2
// ============================================



// ============================================
// Exam 1 (exam1.json) - Das Fahrrad
// ============================================

HELP_DATA["sprach2_exam1_q1"] = {
    text: "kaum einem anderen Land gibt es so viele Automobilfabriken",
    meaning: "بالكاد توجد في أي دولة أخرى مصانع سيارات بقدر ما في ألمانيا",
    keywords: ["kaum = بالكاد", "Automobilfabriken = مصانع سيارات"],
    simplified: "لا توجد دولة بها مصانع سيارات بقدر ألمانيا تقريباً",
    imagine: "🏭🚗 مصانع سيارات في كل مكان على الخريطة الألمانية"
};

HELP_DATA["sprach2_exam1_q2"] = {
    text: "auf ein anderes Verkehrsmittel umzusteigen",
    meaning: "التحول إلى وسيلة نقل أخرى",
    keywords: ["auf = إلى", "umzusteigen = التحول", "Verkehrsmittel = وسيلة نقل"],
    simplified: "للانتقال إلى وسيلة مواصلات أخرى",
    imagine: "🚲➡️🚗 دراجة وسيارة وسهم"
};

HELP_DATA["sprach2_exam1_q3"] = {
    text: "an den im Stau wartenden Fahrzeugen vorbeizufahren",
    meaning: "المرور بجانب السيارات المنتظرة في الازدحام المروري",
    keywords: ["vorbei = بجانب", "Stau = ازدحام", "vorbeizufahren = المرور"],
    simplified: "تمر بجانب السيارات المتوقفة في الزحام",
    imagine: "🚲🚗🚗🚗 دراجة تتجاوز سيارات واقفة"
};

HELP_DATA["sprach2_exam1_q4"] = {
    text: "Wer Fahrrad fährt statt zu sitzen",
    meaning: "من يركب دراجة بدلاً من الجلوس",
    keywords: ["statt = بدلاً من", "Fahrrad fährt = يركب دراجة", "zu sitzen = من الجلوس"],
    simplified: "ركوب الدراجة أفضل من الجلوس خلف المقود",
    imagine: "🚴‍♂️🪑 دراجة ومقعد سيارة"
};

HELP_DATA["sprach2_exam1_q5"] = {
    text: "innerhalb geschlossener Räume aufhalten",
    meaning: "يتواجدون داخل أماكن مغلقة",
    keywords: ["innerhalb = داخل", "geschlossener Räume = أماكن مغلقة", "aufhalten = يتواجدون"],
    simplified: "يقضون معظم وقتهم في مكاتب و مصانع مغلقة",
    imagine: "🏢🚪 مبنى به أبواب ونوافذ مغلقة"
};

HELP_DATA["sprach2_exam1_q6"] = {
    text: "sich die meiste Zeit innerhalb geschlossener Räume aufhalten müssen",
    meaning: "يضطرون لقضاء معظم وقتهم في أماكن مغلقة",
    keywords: ["müssen = يضطرون", "meiste Zeit = معظم الوقت", "aufhalten = قضاء"],
    simplified: "ممن يضطرون لقضاء وقتهم بالداخل",
    imagine: "💼😞 عامل مجبر على البقاء في مكتب ضيق"
};

HELP_DATA["sprach2_exam1_q7"] = {
    text: "Ein breites Angebot an Zubehör",
    meaning: "عرض واسع من الإكسسوارات",
    keywords: ["Angebot = عرض", "an = من", "Zubehör = إكسسوارات"],
    simplified: "متاجر تبيع إكسسوارات الدراجات",
    imagine: "🚲🔧 دراجة وأدوات جانبية"
};

HELP_DATA["sprach2_exam1_q8"] = {
    text: "die das Fahrrad fast so sicher wie einen Panzer machen sollen",
    meaning: "يجب أن تجعل الدراجة آمنة مثل الدبابة",
    keywords: ["sollen = يجب أن", "sicher = آمنة", "Panzer = دبابة"],
    simplified: "معدات مصممة لتوفير حماية قصوى للدراج",
    imagine: "🛡️🚲 دراجة ودرع"
};

HELP_DATA["sprach2_exam1_q9"] = {
    text: "dann sind die Autoschlangen wieder länger",
    meaning: "عندها تصبح طوابير السيارات أطول",
    keywords: ["dann = عندها", "Autoschlangen = طوابير سيارات", "länger = أطول"],
    simplified: "حينها ستعود الاختناقات المرورية",
    imagine: "🚗🚗🚗طابور سيارات طويل تحت المطر"
};

HELP_DATA["sprach2_exam1_q10"] = {
    text: "denn einen praktischen Wetterschutz für Radfahrer haben die Geschäfte noch nicht im Angebot",
    meaning: "فالمتاجر لا تقدم بعد حماية عملية من الطقس لراكبي الدراجات",
    keywords: ["denn = لأن", "Wetterschutz = حماية من الطقس", "Angebot = متوفرة"],
    simplified: "لأنه لا توجد معاطف مطر جيدة لركوب الدراجة بعد",
    imagine: "☔🚲 مطر ودراجة بدون مظلة"
};

// ============================================
// Exam 2 (exam2.json) - Das Fahrrad (معدل)
// ============================================

HELP_DATA["sprach2_exam2_q1"] = {
    text: "kaum einem anderen Land gibt es so viele Automobilfabriken",
    meaning: "بالكاد توجد في أي دولة أخرى مصانع سيارات بقدر ما في ألمانيا",
    keywords: ["kaum = بالكاد", "Automobilfabriken = مصانع سيارات"],
    simplified: "لا توجد دولة بها مصانع سيارات بقدر ألمانيا تقريباً",
    imagine: "🏭🚗 مصانع سيارات في كل مكان على الخريطة الألمانية"
};

HELP_DATA["sprach2_exam2_q2"] = {
    text: "auf ein anderes Verkehrsmittel umzusteigen",
    meaning: "التحول إلى وسيلة نقل أخرى",
    keywords: ["auf = إلى", "umzusteigen = التحول", "Verkehrsmittel = وسيلة نقل"],
    simplified: "للانتقال إلى وسيلة مواصلات أخرى",
    imagine: "🚲➡️🚗 دراجة وسيارة وسهم"
};

HELP_DATA["sprach2_exam2_q3"] = {
    text: "auf den zumeist gut ausgebauten Fahrradwegen",
    meaning: "على مسارات الدراجات الممهدة غالباً بشكل جيد",
    keywords: ["zumeist = غالباً", "gut ausgebauten = ممهدة بشكل جيد", "Fahrradwegen = مسارات دراجات"],
    simplified: "على ممرات الدراجات الجيدة",
    imagine: "🛣️🚲 ممر اسفلتي واضح مخصص للدراجات"
};

HELP_DATA["sprach2_exam2_q4"] = {
    text: "Wer Fahrrad fährt statt zu sitzen",
    meaning: "من يركب دراجة بدلاً من الجلوس",
    keywords: ["statt = بدلاً من", "Fahrrad fährt = يركب دراجة", "zu sitzen = من الجلوس"],
    simplified: "ركوب الدراجة أفضل من الجلوس خلف المقود",
    imagine: "🚴‍♂️🪑 دراجة ومقعد سيارة"
};

HELP_DATA["sprach2_exam2_q5"] = {
    text: "innerhalb geschlossener Räume aufhalten",
    meaning: "يتواجدون داخل أماكن مغلقة",
    keywords: ["innerhalb = داخل", "geschlossener Räume = أماكن مغلقة", "aufhalten = يتواجدون"],
    simplified: "يقضون معظم وقتهم في مكاتب و مصانع مغلقة",
    imagine: "🏢🚪 مبنى به أبواب ونوافذ مغلقة"
};

HELP_DATA["sprach2_exam2_q6"] = {
    text: "sich die meiste Zeit innerhalb geschlossener Räume aufhalten müssen",
    meaning: "يضطرون لقضاء معظم وقتهم في أماكن مغلقة",
    keywords: ["müssen = يضطرون", "meiste Zeit = معظم الوقت", "aufhalten = قضاء"],
    simplified: "ممن يضطرون لقضاء وقتهم بالداخل",
    imagine: "💼😞 عامل مجبر على البقاء في مكتب ضيق"
};

HELP_DATA["sprach2_exam2_q7"] = {
    text: "Ein breites Angebot an Zubehör",
    meaning: "عرض واسع من الإكسسوارات",
    keywords: ["Angebot = عرض", "an = من", "Zubehör = إكسسوارات"],
    simplified: "متاجر تبيع إكسسوارات الدراجات",
    imagine: "🚲🔧 دراجة وأدوات جانبية"
};

HELP_DATA["sprach2_exam2_q8"] = {
    text: "die das Fahrrad fast so sicher wie einen Panzer machen sollen",
    meaning: "يجب أن تجعل الدراجة آمنة مثل الدبابة",
    keywords: ["sollen = يجب أن", "sicher = آمنة", "Panzer = دبابة"],
    simplified: "معدات مصممة لتوفير حماية قصوى للدراج",
    imagine: "🛡️🚲 دراجة ودرع"
};

HELP_DATA["sprach2_exam2_q9"] = {
    text: "dann sind die Autoschlangen wieder länger",
    meaning: "عندها تصبح طوابير السيارات أطول",
    keywords: ["dann = عندها", "Autoschlangen = طوابير سيارات", "länger = أطول"],
    simplified: "حينها ستعود الاختناقات المرورية",
    imagine: "🚗🚗🚗طابور سيارات طويل تحت المطر"
};

HELP_DATA["sprach2_exam2_q10"] = {
    text: "denn einen praktischen Wetterschutz für Radfahrer haben die Geschäfte noch nicht im Angebot",
    meaning: "فالمتاجر لا تقدم بعد حماية عملية من الطقس لراكبي الدراجات",
    keywords: ["denn = لأن", "Wetterschutz = حماية من الطقس", "Angebot = متوفرة"],
    simplified: "لأنه لا توجد معاطف مطر جيدة لركوب الدراجة بعد",
    imagine: "☔🚲 مطر ودراجة بدون مظلة"
};

// ============================================
// Exam 3 (exam3.json) - Man(n) kocht selbst
// ============================================

HELP_DATA["sprach2_exam3_q1"] = {
    text: "Denn immer mehr Männer in Deutschland greifen jetzt selbst zum Kochtopf",
    meaning: "لأن المزيد من الرجال في ألمانيا يستخدمون قدر الطبخ بأنفسهم الآن",
    keywords: ["Denn = لأن", "Kochtopf = قدر طبخ", "greifen = يستخدمون"],
    simplified: "الرجال الآن يطبخون بأنفسهم أكثر من السابق",
    imagine: "👨‍🍳🍳 رجل يرتدي مئزراً ويقف أمام الموقد"
};

HELP_DATA["sprach2_exam3_q2"] = {
    text: "Ein Grund für diese Entwicklung",
    meaning: "سبب لهذا التطور",
    keywords: ["Grund = سبب", "für = لـ", "Entwicklung = تطور"],
    simplified: "أحد أسباب هذا التحول",
    imagine: "📈❓ سؤال وعلامة استفهام"
};

HELP_DATA["sprach2_exam3_q3"] = {
    text: "welch ein Unterschied besteht zwischen den Ansprüchen",
    meaning: "يا له من فرق بين المتطلبات",
    keywords: ["zwischen = بين", "Ansprüchen = متطلبات", "Unterschied = فرق"],
    simplified: "الفرق كبير جداً بين ما تتطلبه ربة المنزل والطاهي المنزلي",
    imagine: "⚖️👩‍🍳👨‍🍳 ميزان بين امرأة ورجل تطبخ في المطبخ"
};

HELP_DATA["sprach2_exam3_q4"] = {
    text: "Nicht irgendein Topf darf es für den selbsternannten Drei-Sterne-Küchenchef sein",
    meaning: "ليس أي قدر مناسب لطاهي النجوم الثلاثة المزعوم",
    keywords: ["irgendein = أي", "Topf = قدر", "Drei-Sterne-Küchenchef = طاهي ثلاث نجوم"],
    simplified: "طباخو المنازل يطلبون أواني طبخ فاخرة",
    imagine: "🍲✨ قدر لامع ومكلف"
};

HELP_DATA["sprach2_exam3_q5"] = {
    text: "Die zweite Voraussetzung dafür, dass die Gerichte auch gelingen",
    meaning: "الشرط الثاني لذلك، أن تنجح الأطباق",
    keywords: ["dafür = لذلك", "Voraussetzung = شرط", "gelingen = تنجح"],
    simplified: "لكي تنجح الوصفة يجب توفر شرطين",
    imagine: "📋✅ لائحة مكتوب عليها شرط 1, شرط 2"
};

HELP_DATA["sprach2_exam3_q6"] = {
    text: "Jetzt hängt es nur noch davon ab, was der Hobbykoch aus den Kochideen der Buchautoren macht",
    meaning: "الأمر يعتمد الآن فقط على ما يفعله الطباخ المنزلي بأفكار الطبخ لدى الكتاب",
    keywords: ["davon = على ذلك", "hängt ab = يعتمد", "Hobbykoch = طباخ منزلي"],
    simplified: "الأمر يعتمد على مهارة الطباخ باستخدام الوصفات",
    imagine: "👩‍🍳📖 طباخ ينظر إلى كتاب طبخ"
};

HELP_DATA["sprach2_exam3_q7"] = {
    text: "Helfen die Bücher nicht weiter",
    meaning: "إن لم تكن الكتب كافية",
    keywords: ["weiter = أكثر", "helfen = تساعد", "Bücher = كتب"],
    simplified: "إذا لم تنجح الكتب في مساعدتك",
    imagine: "📚🤷 شخص أمام كومة كتب يشعر بالضياع"
};

HELP_DATA["sprach2_exam3_q8"] = {
    text: "Das führt dazu, dass man(n) zu Hause immer öfter international kocht",
    meaning: "هذا يؤدي إلى أن المرء يطبخ بشكل دولي في المنزل غالباً",
    keywords: ["dazu = إلى ذلك", "führt = يؤدي", "international kocht = يطبخ دولياً"],
    simplified: "هذا يجعل الطهاة الهواة يجربون وصفات من مختلف المطابخ العالمية",
    imagine: "🌍🍲 أطباق من حول العالم"
};

HELP_DATA["sprach2_exam3_q9"] = {
    text: "dass es viel zu aufwändig ist, für sich alleine zu kochen",
    meaning: "أنه من المعقد جداً الطبخ بمفردك",
    keywords: ["dass = أن", "aufwändig = معقد", "alleine = بمفردك"],
    simplified: "الطبخ لشخص واحد معقد للغاية",
    imagine: "🍲😓 طباخ يواجه صعوبة في تحضير وجبة لشخص واحد"
};

HELP_DATA["sprach2_exam3_q10"] = {
    text: "Das Interessante daran ist, dass dabei unsere männlichen Chefköche feststellen müssen",
    meaning: "المثير للاهتمام في ذلك هو أن طهاةنا الذكور يجب أن يدركوا",
    keywords: ["daran = في ذلك", "Interessante = مثير للاهتمام", "feststellen = يدركوا"],
    simplified: "والجزء المضحك أن الرجال يكتشفون أن النساء طهاة ماهرات أيضاً",
    imagine: "👩‍🍳😊👨‍🍳 امرأة تطبخ والرجل مندهش"
};

// ============================================
// Exam 4 (exam4.json) - Jugend diskutiert - mach mit!
// ============================================

HELP_DATA["sprach2_exam4_q1"] = {
    text: "Den Wettbewerb 'Jugend diskutiert' gibt es bereits seit Herbst 2002",
    meaning: "مسابقة 'شباب يناقشون' موجودة منذ خريف 2002",
    keywords: ["seit = منذ", "Wettbewerb = مسابقة", "Herbst = خريف"],
    simplified: "المسابقة مستمرة منذ عدة سنوات",
    imagine: "📅🏆 تقويم وكأس"
};

HELP_DATA["sprach2_exam4_q2"] = {
    text: "Wie immer bereiten sich die Teilnehmer dann im Unterricht auf 'Jugend diskutiert' vor",
    meaning: "كالعادة، يستعد المشاركون في الفصل للمسابقة",
    keywords: ["Wie = كما", "immer = دائماً", "bereiten vor = يستعدون"],
    simplified: "المشاركون يستعدون في المدرسة كالعادة",
    imagine: "🏫📚 مدرسة وكتب"
};

HELP_DATA["sprach2_exam4_q3"] = {
    text: "Du fragst dich, warum du teilnehmen solltest?",
    meaning: "تتساءل لماذا يجب أن تشارك؟",
    keywords: ["warum = لماذا", "teilnehmen = تشارك", "fragst dich = تتساءل"],
    simplified: "قد تتساءل عن فائدة مشاركتك",
    imagine: "❓🤔 علامة استفهام وشخص يفكر"
};

HELP_DATA["sprach2_exam4_q4"] = {
    text: "Außerdem bietet dir 'Jugend diskutiert' die Chance, im Wettstreit mit anderen weiterzukommen",
    meaning: "بالإضافة إلى ذلك، تمنحك المسابقة فرصة التقدم بالتنافس مع الآخرين",
    keywords: ["Außerdem = بالإضافة إلى ذلك", "Chance = فرصة", "Wettstreit = تنافس"],
    simplified: "المنافسة نفسها تمنحك فرصة ثمينة للتطور",
    imagine: "🏃‍♂️🏆 سباق وشارة فوز"
};

HELP_DATA["sprach2_exam4_q5"] = {
    text: "die dann an Regionalwettbewerben teilnehmen",
    meaning: "الذين سيشاركون بعدها في مسابقات المناطق",
    keywords: ["an = في", "Regionalwettbewerben = مسابقات مناطقية", "teilnehmen = يشاركون"],
    simplified: "الطلاب الفائزون يتأهلون للمرحلة التالية",
    imagine: "🗺️📍 مراحل على خريطة"
};

HELP_DATA["sprach2_exam4_q6"] = {
    text: "Als Preise kann man professionelle Trainings gewinnen",
    meaning: "يمكن الفوز بتدريبات احترافية كجوائز",
    keywords: ["Als = مثل", "Preise = جوائز", "Trainings = تدريبات"],
    simplified: "الجوائز هي فرص تدريبية احترافية",
    imagine: "🎁🏋️ هدية وحقيبة رياضية"
};

HELP_DATA["sprach2_exam4_q7"] = {
    text: "Bei 'Jugend diskutiert' kannst du viel lernen",
    meaning: "في 'شباب يناقشون' يمكنك تعلم الكثير",
    keywords: ["Bei = في", "lernen = تعلم", "viel = الكثير"],
    simplified: "المشاركة في المسابقة تعلمك العديد من المهارات",
    imagine: "🧠📖 عقل وكتاب"
};

HELP_DATA["sprach2_exam4_q8"] = {
    text: "Du gewinnst mehr Selbstbewusstsein, weil du lernst, wie man das Wort ergreift",
    meaning: "تكتسب ثقة أكبر بالنفس لأنك تتعلم كيف تأخذ الكلمة",
    keywords: ["weil = لأن", "Selbstbewusstsein = ثقة بالنفس", "Wort ergreift = تأخذ الكلمة"],
    simplified: "ممارسة النقاشات تزيد من ثقتك بنفسك",
    imagine: "💪🗣️ شخص يتحدث بثقة وذراع قوية"
};

HELP_DATA["sprach2_exam4_q9"] = {
    text: "Die Sichtweisen der anderen zeigen dir darüber hinaus, was du vielleicht selbst noch nicht gesehen hast",
    meaning: "وجهات نظر الآخرين تريك أيضاً ما قد لا تكون قد لاحظته بنفسك",
    keywords: ["was = ما", "Sichtweisen = وجهات نظر", "gesehen = لاحظته"],
    simplified: "الاستماع لزملائك يمنحك أفكاراً جديدة",
    imagine: "👥🔭 شخصان ينظران من منظار"
};

HELP_DATA["sprach2_exam4_q10"] = {
    text: "Wer das alles im Unterricht gelernt hat, kann gemeinsam mit anderen viel bewegen!",
    meaning: "من تعلم كل هذا في الفصل، يمكنه تحقيق الكثير مع الآخرين!",
    keywords: ["Wer = من", "gelernt = تعلم", "bewegen = يحقق"],
    simplified: "المهارات المكتسبة تمنحك القدرة على إحداث تغيير",
    imagine: "🤝🌍 أيادٍ متشابكة وكوكب أرض"
};

// ============================================
// Exam 5 (exam5.json) - Theater für Kinder und Jugendliche
// ============================================

HELP_DATA["sprach2_exam5_q1"] = {
    text: "sondern auch die Körpererfahrung von Kindern",
    meaning: "بل أيضاً التجربة الجسدية للأطفال",
    keywords: ["sondern = بل", "Körpererfahrung = تجربة جسدية", "Kindern = أطفال"],
    simplified: "المسرح يطور الإبداع والوعي الجسدي للأطفال",
    imagine: "🎭💪 أقنعة وعضلات"
};

HELP_DATA["sprach2_exam5_q2"] = {
    text: "arbeitet seit vielen Jahren in der Jugendförderung",
    meaning: "يعمل منذ سنوات عديدة في تعزيز الشباب",
    keywords: ["seit = منذ", "Jugendförderung = تعزيز الشباب", "arbeitet = يعمل"],
    simplified: "النادي الخيري له تاريخ في دعم الشباب",
    imagine: "🧒📅 سنوات ووجه طفل"
};

HELP_DATA["sprach2_exam5_q3"] = {
    text: "die wegen familiärer und anderer Probleme Hilfe benötigen",
    meaning: "الذين يحتاجون مساعدة بسبب مشاكل عائلية وأخرى",
    keywords: ["wegen = بسبب", "familiärer = عائلية", "Hilfe = مساعدة"],
    simplified: "الأطفال الذين يعانون من مشاكل في المنزل يجدون مساعدتهم هنا",
    imagine: "🏠💔 منزل وقلب حزين"
};

HELP_DATA["sprach2_exam5_q4"] = {
    text: "ab dem kommenden Jahr die Welt des Theaters kennenlernen",
    meaning: "ابتداءً من العام القادم سيتعرفون على عالم المسرح",
    keywords: ["ab = ابتداءً من", "kommenden Jahr = العام القادم", "kennenlernen = يتعرفون"],
    simplified: "بدءاً من العام الجديد سيتعلمون عن المسرح",
    imagine: "📅🎭 تقويم وأقنعة مسرحية"
};

HELP_DATA["sprach2_exam5_q5"] = {
    text: "Am Ende des Projekts werden die Nachwuchsschauspieler bei einem Theaterfestival auftreten",
    meaning: "في نهاية المشروع، سوف يمثل الممثلون الشباب في مهرجان مسرحي",
    keywords: ["Am = في", "Ende = نهاية", "auftreten = يمثلون"],
    simplified: "سيظهر الأطفال على خشبة المسرح في مهرجان",
    imagine: "🎭🌟 مسرح وأضواء"
};

HELP_DATA["sprach2_exam5_q6"] = {
    text: "Allen Mitarbeitern ist es wichtig, dass die Kinder auf der Bühne Anerkennung für ihre Leistung bekommen",
    meaning: "كل الموظفين يعتبرون من المهم أن يحصل الأطفال على تقدير لعملهم على المسرح",
    keywords: ["es = ذلك", "wichtig = مهم", "Anerkennung = تقدير"],
    simplified: "فريق العمل يؤمن بأن التقدير المستحق للأطفال أمر حيوي",
    imagine: "👏🎭 تصفيق ووجه سعيد"
};

HELP_DATA["sprach2_exam5_q7"] = {
    text: "da bei der Stadt keine Gelder vorhanden waren",
    meaning: "لأنه لم تكن هناك أموال متوفرة في المدينة",
    keywords: ["da = لأن", "Gelder = أموال", "vorhanden = متوفرة"],
    simplified: "كان هذا مستحيلاً لولا الدعم المالي لأن المدينة لم تقدم أي تمويل",
    imagine: "💰🚫 نقود وعلامة ممنوع"
};

HELP_DATA["sprach2_exam5_q8"] = {
    text: "Der Verein kümmert sich auch darum, die Projekte bekannt zu machen",
    meaning: "النادي يهتم أيضاً بنشر المشاريع",
    keywords: ["darum = بذلك", "bekannt zu machen = بنشر", "kümmert sich = يهتم"],
    simplified: "النادي مسؤول عن الترويج للمشاريع",
    imagine: "📢🎭 مكبر صوت ومسرح"
};

HELP_DATA["sprach2_exam5_q9"] = {
    text: "Man hofft, auf diese Weise noch mehr Unterstützer zu finden",
    meaning: "يأملون بهذه الطريقة إيجاد المزيد من الداعمين",
    keywords: ["auf = بهذه", "Weise = طريقة", "Unterstützer = داعمين"],
    simplified: "آملين كسب دعم أكبر من المجتمع عبر الإعلانات",
    imagine: "🤝👥 أيدي متشابكة ومجموعة أشخاص"
};

HELP_DATA["sprach2_exam5_q10"] = {
    text: "Aktuell sammelt das Jugendzentrum Spenden, um weitere Projekte finanzieren zu können",
    meaning: "المركز الشبابي يجمع تبرعات حالياً لتمويل مشاريع أخرى",
    keywords: ["um = لـ", "zu finanzieren = لتمويل", "Projekte = مشاريع"],
    simplified: "تبرعاتنا الآن تستخدم لدعم مشاريع مستقبلية",
    imagine: "💰🎭 نقود وأقنعة مسرح"
};

// ============================================
// Exam 6 (exam6.json) - Umgang مع Haustieren
// ============================================

HELP_DATA["sprach2_exam6_q1"] = {
    text: "seltener krank als Kinder in Haushalten ohne Tiere",
    meaning: "يمرضون أقل من الأطفال في بيوت بلا حيوانات",
    keywords: ["als = من", "seltener = أقل", "krank = يمرضون"],
    simplified: "وجود حيوان أليف يرتبط بمرض أقل للطفل",
    imagine: "🐱👶 طفل وقطة"
};

HELP_DATA["sprach2_exam6_q2"] = {
    text: "Die Studie wurde in der vergangenen Woche veröffentlicht",
    meaning: "الدراسة نُشرت في الأسبوع الماضي",
    keywords: ["vergangenen = الماضي", "Woche = أسبوع", "veröffentlicht = نُشرت"],
    simplified: "النتائج نُشرت مؤخراً",
    imagine: "📰🗓️ جريدة وتقويم"
};

HELP_DATA["sprach2_exam6_q3"] = {
    text: "Es wurden zwar keine Erklärungen geliefert",
    meaning: "لم يتم تقديم تفسيرات ومع ذلك...",
    keywords: ["zwar = ومع ذلك", "Erklärungen = تفسيرات", "geliefert = تقديم"],
    simplified: "لن يقدم البحث سبباً علمياً محدداً",
    imagine: "❓🔍 تجربة وعلامة استفهام"
};

HELP_DATA["sprach2_exam6_q4"] = {
    text: "Hunde haben nämlich durch die täglichen Spaziergänge draußen viel Kontakt zu möglichen Krankheitserregern",
    meaning: "الكلاب تحديداً لديها اتصال كثير بمسببات الأمراض المحتملة أثناء المشي اليومي في الخارج",
    keywords: ["durch = عبر", "Spaziergänge = نزهات", "Kontakt = اتصال"],
    simplified: "خلال نزهاتهم اليومية، تتعرض الكلاب للجراثيم",
    imagine: "🐕🌿 كلب في الخارج بجانب نباتات"
};

HELP_DATA["sprach2_exam6_q5"] = {
    text: "haben demnach dieselbe Wirkung auf die Gesundheit der Kinder",
    meaning: "وبالتالي لديهم نفس التأثير على صحة الأطفال",
    keywords: ["dieselbe = نفس", "Wirkung = تأثير", "Gesundheit = صحة"],
    simplified: "القطط التي تخرج للخارج لها فائدة مماثلة",
    imagine: "🐈🍃 قطة تختبئ في الأدغال"
};

HELP_DATA["sprach2_exam6_q6"] = {
    text: "wurden in Finnland 397 Babys über den Zeitraum beobachtet",
    meaning: "تمت مراقبة 397 طفلاً في فنلندا على مدى فترة زمنية",
    keywords: ["wurden = تم", "beobachtet = مراقبة", "Zeitraum = فترة زمنية"],
    simplified: "شملت الدراسة 397 طفلاً فنلندياً",
    imagine: "👶📋 أطفال وأوراق"
};

HELP_DATA["sprach2_exam6_q7"] = {
    text: "ein um 30 % geringeres Risiko für Erkrankungen der Atemwege",
    meaning: "خطر أقل بنسبة 30٪ لأمراض الجهاز التنفسي",
    keywords: ["geringeres = أقل", "Risiko = خطر", "Atemwege = تنفسي"],
    simplified: "انخفاض خطر إصابة الأطفال بالربو والتهاب الشعب الهوائية",
    imagine: "📉😷 رسم بياني ينخفض وقناع"
};

HELP_DATA["sprach2_exam6_q8"] = {
    text: "Ohrenentzündungen weniger auftraten",
    meaning: "التهابات الأذن حدثت بشكل أقل",
    keywords: ["weniger = أقل", "auftraten = حدثت", "Ohrenentzündungen = التهابات أذن"],
    simplified: "أظهرت الدراسة نتائج مفاجئة حول التهابات الأذن",
    imagine: "👂🦷 أذن وأسنان"
};

HELP_DATA["sprach2_exam6_q9"] = {
    text: "dass die Gesundheit von Kindern in Gesellschaft von Tieren deutlich besser sei",
    meaning: "صحة الأطفال بصحبة الحيوانات أفضل بكثير",
    keywords: ["deutlich = بكثير", "besser = أفضل", "Gesellschaft = صحبة"],
    simplified: "العلاقة بين الحيوانات الأليفة وصحة الطفل قوية جداً",
    imagine: "🐕❤️👶 كلب وقلب وطفل"
};

HELP_DATA["sprach2_exam6_q10"] = {
    text: "Frühere Untersuchungen hatten das genaue Gegenteil ergeben",
    meaning: "دراسات سابقة أظهرت العكس تماماً",
    keywords: ["Gegenteil = عكس", "genaue = تماماً", "früheren = سابقة"],
    simplified: "نتائج اليوم معاكسة تماماً للدراسات السابقة الأمريكية",
    imagine: "🔄❌ سهم معاكس وعلامة منع"
};

// ============================================
// Exam 7 (exam7.json) - Liebesgrüße aus der Kühltruhe
// ============================================

HELP_DATA["sprach2_exam7_q1"] = {
    text: "Anhand des Inhalts des Tiefkühlfachs den Charakter seines Besitzers erkennen",
    meaning: "من خلال محتويات الفريزر يمكن التعرف على شخصية صاحبها",
    keywords: ["Anhand = من خلال", "Inhalts = محتويات", "Tiefkühlfachs = فريزر"],
    simplified: "ماذا يخبرك محتوى ثلاجة الرجل عن شخصيته؟",
    imagine: "🧊❄️ فريزر مفتوح وطعام مجمد"
};

HELP_DATA["sprach2_exam7_q2"] = {
    text: "unterscheiden fünf Kategorien von Single-Männern",
    meaning: "يميزون خمس فئات من الرجال العزاب",
    keywords: ["von = من", "Kategorien = فئات", "Single-Männern = رجال عزاب"],
    simplified: "العلماء يصنفون الرجال حسب نوع وجباتهم المجمدة",
    imagine: "🧑‍🤝‍🧑📋 رجال وأوراق تصنيف"
};

HELP_DATA["sprach2_exam7_q3"] = {
    text: "den spontanen Typ, den Bequemen, den Kreativen, sowie den Cocktail- und den Gourmet-Typen",
    meaning: "النوع العفوي، المريح، المبدع، بالإضافة إلى الكوكتيل والذواقة",
    keywords: ["sowie = وكذلك", "spontanen = عفوي", "Gourmet = ذواقة"],
    simplified: "الأنواع الخمسة للرجال تشمل الذواقة والمبدع والعفوي وغيرهم",
    imagine: "👨‍🍳👨‍💼🍸 رجال مع كوكتيل وطعام"
};

HELP_DATA["sprach2_exam7_q4"] = {
    text: "aus denen er eine Mahlzeit zusammenstellen kann",
    meaning: "يمكنه من خلالها تحضير وجبة",
    keywords: ["aus = من خلالها", "denen = التي", "zusammenstellen = تحضير"],
    simplified: "يخلطون الخضار واللحوم المجمدة لصنع وجبات بسيطة",
    imagine: "🍲🥦🥩 قدر به خضار و لحم"
};

HELP_DATA["sprach2_exam7_q5"] = {
    text: "Der Nachteil liegt auf der Hand",
    meaning: "العيب واضح للجميع",
    keywords: ["auf = على", "Hand = يد", "liegt = يقع"],
    simplified: "عيبه أنه نادر الوجود",
    imagine: "🤲👀 يد مفتوحة وعينان"
};

HELP_DATA["sprach2_exam7_q6"] = {
    text: "Ihnen ist es sogar zu anstrengend, zwei Tüten zu öffnen statt nur einer",
    meaning: "حتى فتح كيسين بدلاً من واحد مرهق جداً بالنسبة لهم",
    keywords: ["anstrengend = مرهق", "Tüten = أكياس", "öffnen = فتح"],
    simplified: "حتى رفع أكياس متعددة من الفريزر يتطلب مجهوداً كبيراً بالنسبة لهم",
    imagine: "🛍️😓 أكياس بقالة ووجه متعب"
};

HELP_DATA["sprach2_exam7_q7"] = {
    text: "Folglich kaufen diese Männer am häufigsten komplette Gerichte",
    meaning: "وبالتالي يشتري هؤلاء الرجال الأطباق الكاملة غالباً",
    keywords: ["Folglich = وبالتالي", "komplette Gerichte = أطباق كاملة", "kaufen = يشترون"],
    simplified: "يختارون الوجبات الجاهزة الكاملة توفيراً للوقت",
    imagine: "🍽️📺 طبق جاهز وتلفاز"
};

HELP_DATA["sprach2_exam7_q8"] = {
    text: "Zumindest Frauen sehen das wohl eher skeptisch",
    meaning: "على الأقل النساء ينظرن إلى ذلك بتشكك إلى حد ما",
    keywords: ["eher = إلى حد ما", "skeptisch = بتشكك", "Frauen = نساء"],
    simplified: "النساء متشككات نوعاً ما في هذه الفكرة",
    imagine: "🤨👩 امرأة ترفع حاجبها بتشكك"
};

HELP_DATA["sprach2_exam7_q9"] = {
    text: "Doch egal, zu welcher Kategorie ein Mann gehört",
    meaning: "ولكن بغض النظر عن الفئة التي ينتمي إليها الرجل",
    keywords: ["zu = إلى", "Kategorie = فئة", "gehört = ينتمي"],
    simplified: "بغض النظر عن النوع",
    imagine: "🧑‍🤝‍🧑🤷 أشخاص لا يهم تصنيفهم"
};

HELP_DATA["sprach2_exam7_q10"] = {
    text: "andere wohl eher keine Lust",
    meaning: "والبعض الآخر ربما ليس لديه رغبة",
    keywords: ["wohl = ربما", "eher = إلى حد ما", "Lust = رغبة"],
    simplified: "ينقصهم الحافز للطهي",
    imagine: "🍳🤷 طباخ ومطبخ نائم"
};

// ============================================
// Exam 8 (exam8.json) - Liebesgrüße aus der Kühltruhe (معدل)
// ============================================

HELP_DATA["sprach2_exam8_q1"] = {
    text: "Einer Studie zufolge kann man anhand des Inhalts den Charakter erkennen",
    meaning: "وفقاً لدراسة، يمكن من خلال المحتوى التعرف على الشخصية",
    keywords: ["zufolge = وفقاً لـ", "Studie = دراسة", "anhand = من خلال"],
    simplified: "نوع الطعام المجمد يفضح شخصيتك",
    imagine: "🧊🔬 فريزر ومجهر"
};

HELP_DATA["sprach2_exam8_q2"] = {
    text: "unterscheiden fünf Kategorien von Single-Männern",
    meaning: "يميزون خمس فئات من الرجال العزاب",
    keywords: ["von = من", "Kategorien = فئات", "Single-Männern = رجال عزاب"],
    simplified: "العلماء يصنفون الرجال حسب نوع وجباتهم المجمدة",
    imagine: "🧑‍🤝‍🧑📋 رجال وأوراق تصنيف"
};

HELP_DATA["sprach2_exam8_q3"] = {
    text: "den spontanen Typ, den Bequemen, den Kreativen, sowie den Cocktail- und den Gourmet-Typen",
    meaning: "النوع العفوي، المريح، المبدع، بالإضافة إلى الكوكتيل والذواقة",
    keywords: ["sowie = وكذلك", "spontanen = عفوي", "Gourmet = ذواقة"],
    simplified: "الأنواع الخمسة للرجال تشمل الذواقة والمبدع والعفوي وغيرهم",
    imagine: "👨‍🍳👨‍💼🍸 رجال مع كوكتيل وطعام"
};

HELP_DATA["sprach2_exam8_q4"] = {
    text: "aus denen er eine Mahlzeit zusammenstellen kann",
    meaning: "يمكنه من خلالها تحضير وجبة",
    keywords: ["denen = التي", "zusammenstellen = تحضير", "Mahlzeit = وجبة"],
    simplified: "يخلطون الخضار واللحوم المجمدة لصنع وجبات بسيطة",
    imagine: "🍲🥦🥩 قدر به خضار و لحم"
};

HELP_DATA["sprach2_exam8_q5"] = {
    text: "Hauptgewinn für jede Frau ist aber der Gourmet-Typ",
    meaning: "لكن الجائزة الكبرى لكل امرأة هو نوع الذواقة",
    keywords: ["jede = كل", "Frau = امرأة", "Gourmet-Typ = نوع الذواقة"],
    simplified: "وبالنسبة للمرأة، صائد الجوائز الكبرى هو الشيف المنزلي",
    imagine: "👩‍🍳🏆 طباخة وكأس"
};

HELP_DATA["sprach2_exam8_q6"] = {
    text: "Ihnen ist es sogar zu anstrengend, zwei Tüten zu öffnen statt nur einer",
    meaning: "حتى فتح كيسين بدلاً من واحد مرهق جداً بالنسبة لهم",
    keywords: ["anstrengend = مرهق", "Tüten = أكياس", "öffnen = فتح"],
    simplified: "حتى رفع أكياس متعددة من الفريزر يتطلب مجهوداً كبيراً بالنسبة لهم",
    imagine: "🛍️😓 أكياس بقالة ووجه متعب"
};

HELP_DATA["sprach2_exam8_q7"] = {
    text: "folglich kaufen diese Männer am häufigsten komplette Gerichte",
    meaning: "وبالتالي يشتري هؤلاء الرجال الأطباق الكاملة غالباً",
    keywords: ["folglich = وبالتالي", "komplette Gerichte = أطباق كاملة", "kaufen = يشترون"],
    simplified: "يختارون الوجبات الجاهزة الكاملة توفيراً للوقت",
    imagine: "🍽️📺 طبق جاهز وتلفاز"
};

HELP_DATA["sprach2_exam8_q8"] = {
    text: "ob sie so das Herz einer Frau erobern können?",
    meaning: "هل يمكنهم بهذه الطريقة كسب قلب امرأة؟",
    keywords: ["ob = هل", "Herz = قلب", "erobern = يكسبون"],
    simplified: "هذا التساؤل يراود الجميع: هل هذه هي الطريقة للسعادة؟",
    imagine: "💭❤️ فقاعة تفكير وقلب"
};

HELP_DATA["sprach2_exam8_q9"] = {
    text: "zu welcher Kategorie ein Mann gehört",
    meaning: "إلى أي فئة ينتمي الرجل",
    keywords: ["zu = إلى", "Kategorie = فئة", "gehört = ينتمي"],
    simplified: "لا يهم النوع، فالجميع متفق على شيء واحد",
    imagine: "🧑‍🤝‍🤝🏻 رجال بجميع أنواعهم"
};

HELP_DATA["sprach2_exam8_q10"] = {
    text: "Einige haben vermutlich wenig Zeit zum Kochen",
    meaning: "البعض ربما يملك وقتاً قليلاً للطهي",
    keywords: ["vermutlich = ربما", "wenig = قليلاً", "Kochen = للطهي"],
    simplified: "قد تكون ضغوط العمل سبباً لشراء الأغذية المجمدة",
    imagine: "💼⏰ حقيبة عمل وساعة تدور"
};

// ============================================
// Exam 9 (exam9.json) - Online-Sprachkurse
// ============================================

HELP_DATA["sprach2_exam9_q1"] = {
    text: "und sogar mit Smartphones kann man Sprachen lernen",
    meaning: "وحتى بالهواتف الذكية يمكن تعلم اللغات",
    keywords: ["sogar = حتى", "Smartphones = هواتف ذكية", "Sprachen = لغات"],
    simplified: "التكنولوجيا وسّعت خيارات تعلم اللغة",
    imagine: "📱🌍 هاتف وكرة أرضية"
};

HELP_DATA["sprach2_exam9_q2"] = {
    text: "eine Tandem-Partnerschaft mit einem Muttersprachler",
    meaning: "شراكة تبادل لغوي مع متحدث أصلي",
    keywords: ["mit = مع", "Tandem-Partnerschaft = شراكة تبادل لغوي", "Muttersprachler = متحدث أصلي"],
    simplified: "التعلم الثنائي يتطلب متحدثاً باللغة الأم",
    imagine: "🗣️👥 شخصان يتحدثان"
};

HELP_DATA["sprach2_exam9_q3"] = {
    text: "nicht nur lesen, sondern gleichzeitig auch hören",
    meaning: "ليس فقط القراءة، بل الاستماع في نفس الوقت",
    keywords: ["sondern = بل", "gleichzeitig = في نفس الوقت", "hören = الاستماع"],
    simplified: "تطبيقات تعلم اللغة تجمع بين البصر والسمع",
    imagine: "👂👀 أذن وعين"
};

HELP_DATA["sprach2_exam9_q4"] = {
    text: "ohne dass ein ganzer Kurs zuhört",
    meaning: "بدون أن يستمع فصل كامل",
    keywords: ["ohne = بدون", "Kurs = فصل", "zuhört = يستمع"],
    simplified: "التطبيقات توفر مساحة للتدريب دون خجل",
    imagine: "🎧😶 سماعات وصوت هادئ"
};

HELP_DATA["sprach2_exam9_q5"] = {
    text: "lieber mehrmals täglich in Fünf-Minuten-Blöcken wiederholen, anstatt sie in einer Stunde alle auf einmal zu lernen",
    meaning: "من الأفضل التكرار عدة مرات يومياً على فترات خمس دقائق بدلاً من تعلمها كلها دفعة واحدة في ساعة",
    keywords: ["anstatt = بدلاً من", "wiederholen = تكرار", "Fünf-Minuten-Blöcken = فترات خمس دقائق"],
    simplified: "التكرار القصير والمنتظم أفضل من المذاكرة الطويلة",
    imagine: "⏲️📖 ساعة رمل وكتاب"
};

HELP_DATA["sprach2_exam9_q6"] = {
    text: "sind besonders gut zum Vokabellernen geeignet",
    meaning: "مناسبة بشكل خاص لتعلم المفردات",
    keywords: ["besonders = بشكل خاص", "Vokabellernen = تعلم مفردات", "geeignet = مناسبة"],
    simplified: "تطبيقات الهاتف رائعة لتكرار الكلمات الجديدة",
    imagine: "📱🔤 هاتف وحروف"
};

HELP_DATA["sprach2_exam9_q7"] = {
    text: "aber Satzbau oder andere Grammatikthemen werden allenfalls kurz angesprochen",
    meaning: "لكن بناء الجملة وموضوعات النحو الأخرى بالكاد يتم التطرق إليها",
    keywords: ["aber = لكن", "Satzbau = بناء جملة", "kurz angesprochen = التطرق إليها"],
    simplified: "الجانب العملي مثل تركيب الجمل مهمل في هذه التطبيقات",
    imagine: "🏗️❌ بناء وهدم"
};

HELP_DATA["sprach2_exam9_q8"] = {
    text: "Dafür sollte man besser in einen Kurs gehen oder einen Tandem-Partner suchen",
    meaning: "بدلاً من ذلك، من الأفضل الذهاب إلى دورة تدريبية أو البحث عن شريك تبادل لغوي",
    keywords: ["sollte = يجب", "Kurs = دورة", "Tandem-Partner = شريك تبادل لغوي"],
    simplified: "للوصول لمستوى متقدم، النصيحة هي الانضمام لفصل أو البحث عن شريك",
    imagine: "👩‍🏫🤝 معلمة ومصافحة"
};

HELP_DATA["sprach2_exam9_q9"] = {
    text: "um einen passenden Tandem-Partner zu finden",
    meaning: "للعثور على شريك تبادل لغوي مناسب",
    keywords: ["um = لـ", "zu finden = للعثور على", "passenden Tandem-Partner = شريك تبادل لغوي مناسب"],
    simplified: "الإنترنت هو أسرع طريق للعثور على شريك",
    imagine: "🌐💻 إنترنت وحاسوب"
};

HELP_DATA["sprach2_exam9_q10"] = {
    text: "schon werden alle Treffer angezeigt",
    meaning: "سيتم عرض جميع النتائج على الفور",
    keywords: ["schon = على الفور", "Treffer = نتائج", "angezeigt = عرض"],
    simplified: "فقط بضع نقرات ستحصل على قائمة بالمرشحين",
    imagine: "🔍✅ بحث وعلامة صح"
};

// ============================================
// Exam 10 (exam10.json) - Deutschland – ein Paradies für Kinder?
// ============================================

HELP_DATA["sprach2_exam10_q1"] = {
    text: "Verglichen mit der Bevölkerungszahl von ungefähr 80 Millionen",
    meaning: "مقارنة بعدد السكان البالغ حوالي 80 مليوناً",
    keywords: ["mit = مع", "Bevölkerungszahl = عدد السكان", "verglichen = مقارنة"],
    simplified: "ما يقرب من طفل لكل أربعة أشخاص",
    imagine: "👶🧑🧑🧑 أربعة أشخاص وطفل"
};

HELP_DATA["sprach2_exam10_q2"] = {
    text: "drei Jahre bei dem Kind zu Hause zu bleiben",
    meaning: "البقاء مع الطفل في المنزل لمدة ثلاث سنوات",
    keywords: ["bei = مع", "Kind = طفل", "zu Hause = في المنزل"],
    simplified: "يبقى الأبوان مع المولود لمدة تصل إلى ثلاث سنوات",
    imagine: "👨‍👩‍👧🏠 عائلة في المنزل"
};

HELP_DATA["sprach2_exam10_q3"] = {
    text: "Das hat den Vorteil, dass der zu Hause bleibende Elternteil seinen Arbeitsplatz nicht verliert",
    meaning: "هذا له ميزة أن الوالد الذي يبقى في المنزل لا يفقد وظيفته",
    keywords: ["Das = هذا", "Vorteil = ميزة", "Arbeitsplatz = وظيفة"],
    simplified: "يتم حماية الوظيفة أثناء الإجازة الوالدية",
    imagine: "🛡️💼 درع وشنطة عمل"
};

HELP_DATA["sprach2_exam10_q4"] = {
    text: "Dies scheinen die Hauptgründe dafür zu sein",
    meaning: "هذه تبدو الأسباب الرئيسية لذلك",
    keywords: ["dafür = لذلك", "Hauptgründe = أسباب رئيسية", "scheinen = تبدو"],
    simplified: "وهذا يفسر أسباب تراجع معدلات المواليد",
    imagine: "📉👶 رسم بياني يهبط وطفل"
};

HELP_DATA["sprach2_exam10_q5"] = {
    text: "sondern stören mit ihrem Lachen und lauten Sprechen die anderen (kinderlosen) Gäste",
    meaning: "بل يزعجون الضيوف الآخرين (بدون أطفال) بضحكاتهم وكلامهم العالي",
    keywords: ["sondern = بل", "stören = يزعجون", "kinderlosen = بدون أطفال"],
    simplified: "الآباء مهمشون في المطاعم لأن أطفالهم يُنظر إليهم على أنهم مصدر إزعاج",
    imagine: "🍽️😠👶 أطفال يصدرون ضوضاء ورواد غاضبون"
};

HELP_DATA["sprach2_exam10_q6"] = {
    text: "Obwohl diese selbst häufig lautstark telefonieren, stört das niemanden",
    meaning: "على الرغم من أنهم أنفسهم يتحدثون بصوت عالٍ على الهاتف، لا أحد يزعجهم ذلك",
    keywords: ["Obwohl = على الرغم من", "lautstark = بصوت عالٍ", "niemanden = لا أحد"],
    simplified: "الكبار يمارسون سلوكاً مشابهاً دون توبيخ",
    imagine: "📱🗣️ شخص يتحدث بهاتفه بصوت عالٍ"
};

HELP_DATA["sprach2_exam10_q7"] = {
    text: "weil die Kinder die Ruhe der benachbarten (kinderlosen) Hausbewohner stören",
    meaning: "لأن الأطفال يزعجون هدوء سكان المنازل المجاورة (بدون أطفال)",
    keywords: ["weil = لأن", "Kinder = أطفال", "Ruhe = هدوء"],
    simplified: "الجيران يتذمرون من ضجيج الأطفال ويقاضون الحضانة",
    imagine: "⚖️🏢 محكمة ومبنى"
};

HELP_DATA["sprach2_exam10_q8"] = {
    text: "dass mit einem Kinderwagen kein Durchkommen ist",
    meaning: "أنه لا يمكن المرور بعربة الأطفال",
    keywords: ["dass = أن", "Kinderwagen = عربة أطفال", "Durchkommen = مرور"],
    simplified: "ممرات القطار لا تستوعب عربات الأطفال",
    imagine: "🚆🚫 قطار وعربة أطفال"
};

HELP_DATA["sprach2_exam10_q9"] = {
    text: "Anspruch auf einen Platz",
    meaning: "الحق في مقعد",
    keywords: ["auf = في", "Platz = مقعد", "Anspruch = حق"],
    simplified: "الركاب البالغون يطالبون بمقاعدهم بحجة التعب",
    imagine: "🪑👩 أم واقفة"
};

HELP_DATA["sprach2_exam10_q10"] = {
    text: "spricht man in Deutschland gerne von 'Problemen'",
    meaning: "يتحدث المرء في ألمانيا بسهولة عن 'مشاكل'",
    keywords: ["von = عن", "Problemen = مشاكل", "spricht = يتحدث"],
    simplified: "الإعلام يصف الأطفال بأنهم مشكلة",
    imagine: "📺😟 تلفاز ووجه قلق"
};

// ============================================
// Exam 11 (exam11.json) - Deutschland – ein Paradies für Kinder? (معدل 1)
// ============================================

HELP_DATA["sprach2_exam11_q1"] = {
    text: "steht ein Betreuungsplatz in einer Kindertagesstätte zur Verfügung",
    meaning: "يتوفر مكان رعاية في روضة أطفال",
    keywords: ["zur = لـ", "Verfügung = التوفر", "Betreuungsplatz = مكان رعاية"],
    simplified: "أماكن الحضانة لا تكفي سوى عُشر الأطفال",
    imagine: "🏫👶 روضة أطفال وطفل صغير"
};

HELP_DATA["sprach2_exam11_q2"] = {
    text: "drei Jahre bei dem Kind zu Hause zu bleiben",
    meaning: "البقاء مع الطفل في المنزل لمدة ثلاث سنوات",
    keywords: ["bei = مع", "Kind = طفل", "zu Hause = في المنزل"],
    simplified: "يبقى الأبوان مع المولود لمدة تصل إلى ثلاث سنوات",
    imagine: "👨‍👩‍👧🏠 عائلة في المنزل"
};

HELP_DATA["sprach2_exam11_q3"] = {
    text: "Das hat den Vorteil, dass der zu Hause bleibende Elternteil seinen Arbeitsplatz nicht verliert",
    meaning: "هذا له ميزة أن الوالد الذي يبقى في المنزل لا يفقد وظيفته",
    keywords: ["Das = هذا", "Vorteil = ميزة", "Arbeitsplatz = وظيفة"],
    simplified: "يتم حماية الوظيفة أثناء الإجازة الوالدية",
    imagine: "🛡️💼 درع وشنطة عمل"
};

HELP_DATA["sprach2_exam11_q4"] = {
    text: "Dennoch wird die Elternzeit für viele Eltern in finanzieller Hinsicht zu einem gravierenden Problem",
    meaning: "ومع ذلك، تصبح إجازة الأبوة مشكلة خطيرة لكثير من الآباء من الناحية المالية",
    keywords: ["Dennoch = ومع ذلك", "Elternzeit = إجازة أبوة", "Problem = مشكلة"],
    simplified: "اقتصادياً، قد تكون الإجازة الوالدية مرهقة للعائلات",
    imagine: "💰😟 نقود ووجه قلق"
};

HELP_DATA["sprach2_exam11_q5"] = {
    text: "Dies scheinen die Hauptgründe dafür zu sein",
    meaning: "هذه تبدو الأسباب الرئيسية لذلك",
    keywords: ["dafür = لذلك", "Hauptgründe = أسباب رئيسية", "scheinen = تبدو"],
    simplified: "وهذا يفسر أسباب تراجع معدلات المواليد",
    imagine: "📉👶 رسم بياني يهبط وطفل"
};

HELP_DATA["sprach2_exam11_q6"] = {
    text: "sondern stören mit ihrem Lachen und lauten Sprechen die anderen (kinderlosen) Gäste",
    meaning: "بل يزعجون الضيوف الآخرين (بدون أطفال) بضحكاتهم وكلامهم العالي",
    keywords: ["sondern = بل", "stören = يزعجون", "kinderlosen = بدون أطفال"],
    simplified: "الآباء مهمشون في المطاعم لأن أطفالهم يُنظر إليهم على أنهم مصدر إزعاج",
    imagine: "🍽️😠👶 أطفال يصدرون ضوضاء ورواد غاضبون"
};

HELP_DATA["sprach2_exam11_q7"] = {
    text: "stört das niemanden",
    meaning: "لا يزعج ذلك أحداً",
    keywords: ["niemanden = لا أحد", "stört = يزعج", "das = ذلك"],
    simplified: "الكبار يمارسون سلوكاً مشابهاً دون توبيخ",
    imagine: "📱🗣️ شخص يتحدث بهاتفه بصوت عالٍ"
};

HELP_DATA["sprach2_exam11_q8"] = {
    text: "weil die Kinder die Ruhe der benachbarten (kinderlosen) Hausbewohner stören",
    meaning: "لأن الأطفال يزعجون هدوء سكان المنازل المجاورة (بدون أطفال)",
    keywords: ["weil = لأن", "Kinder = أطفال", "Ruhe = هدوء"],
    simplified: "الجيران يتذمرون من ضجيج الأطفال ويقاضون الحضانة",
    imagine: "⚖️🏢 محكمة ومبنى"
};

HELP_DATA["sprach2_exam11_q9"] = {
    text: "dass mit einem Kinderwagen kein Durchkommen ist",
    meaning: "أنه لا يمكن المرور بعربة الأطفال",
    keywords: ["dass = أن", "Kinderwagen = عربة أطفال", "Durchkommen = مرور"],
    simplified: "ممرات القطار لا تستوعب عربات الأطفال",
    imagine: "🚆🚫 قطار وعربة أطفال"
};

HELP_DATA["sprach2_exam11_q10"] = {
    text: "Anspruch auf einen Platz",
    meaning: "الحق في مقعد",
    keywords: ["auf = في", "Platz = مقعد", "Anspruch = حق"],
    simplified: "الركاب البالغون يطالبون بمقاعدهم بحجة التعب",
    imagine: "🪑👩 أم واقفة"
};

// ============================================
// Exam 12 (exam12.json) - Deutschland – ein Paradies für Kinder? (معدل 2)
// ============================================

HELP_DATA["sprach2_exam12_q1"] = {
    text: "steht ein Betreuungsplatz in einer Kindertagesstätte zur Verfügung",
    meaning: "يتوفر مكان رعاية في روضة أطفال",
    keywords: ["zur = لـ", "Verfügung = التوفر", "Betreuungsplatz = مكان رعاية"],
    simplified: "أماكن الحضانة لا تكفي سوى عُشر الأطفال",
    imagine: "🏫👶 روضة أطفال وطفل صغير"
};

HELP_DATA["sprach2_exam12_q2"] = {
    text: "Dennoch wird die Elternzeit für viele Eltern in finanzieller Hinsicht zu einem gravierenden Problem",
    meaning: "ومع ذلك، تصبح إجازة الأبوة مشكلة خطيرة لكثير من الآباء من الناحية المالية",
    keywords: ["Dennoch = ومع ذلك", "Elternzeit = إجازة أبوة", "Problem = مشكلة"],
    simplified: "اقتصادياً، قد تكون الإجازة الوالدية مرهقة للعائلات",
    imagine: "💰😟 نقود ووجه قلق"
};

HELP_DATA["sprach2_exam12_q3"] = {
    text: "Kind und Karriere zu vereinbaren ist daher für die meisten Mütter so gut wie unmöglich",
    meaning: "لذلك يكاد يكون من المستحيل التوفيق بين الطفل والمهنة بالنسبة لمعظم الأمهات",
    keywords: ["vereinbaren = التوفيق", "Karriere = مهنة", "unmöglich = مستحيل"],
    simplified: "المرأة الألمانية تواجه صعوبة بالغة في الجمع بين العمل والأمومة",
    imagine: "👩‍💼👶 امرأة عاملة وطفل"
};

HELP_DATA["sprach2_exam12_q4"] = {
    text: "stört das niemanden",
    meaning: "لا يزعج ذلك أحداً",
    keywords: ["niemanden = لا أحد", "stört = يزعج", "das = ذلك"],
    simplified: "الكبار يمارسون سلوكاً مشابهاً دون توبيخ",
    imagine: "📱🗣️ شخص يتحدث بهاتفه بصوت عالٍ"
};

HELP_DATA["sprach2_exam12_q5"] = {
    text: "weil die Kinder die Ruhe der benachbarten (kinderlosen) Hausbewohner stören",
    meaning: "لأن الأطفال يزعجون هدوء سكان المنازل المجاورة (بدون أطفال)",
    keywords: ["weil = لأن", "Kinder = أطفال", "Ruhe = هدوء"],
    simplified: "الجيران يتذمرون من ضجيج الأطفال ويقاضون الحضانة",
    imagine: "⚖️🏢 محكمة ومبنى"
};

HELP_DATA["sprach2_exam12_q6"] = {
    text: "Spielplätze werden von Gerichts wegen geschlossen",
    meaning: "يتم إغلاق الملاعب بأمر من المحكمة",
    keywords: ["werden = يتم", "geschlossen = إغلاق", "Gerichts = محكمة"],
    simplified: "الأنشطة الترفيهية للأطفال محظورة الآن في بعض المناطق",
    imagine: "🚫🛝 لافتة ممنوع وأرجوحة"
};

HELP_DATA["sprach2_exam12_q7"] = {
    text: "dass mit einem Kinderwagen kein Durchkommen ist",
    meaning: "أنه لا يمكن المرور بعربة الأطفال",
    keywords: ["dass = أن", "Kinderwagen = عربة أطفال", "Durchkommen = مرور"],
    simplified: "ممرات القطار لا تستوعب عربات الأطفال",
    imagine: "🚆🚫 قطار وعربة أطفال"
};

HELP_DATA["sprach2_exam12_q8"] = {
    text: "haben sich schon andere Reisende breitgemacht",
    meaning: "مسافرون آخرون استولوا بالفعل على المكان",
    keywords: ["sich = أنفسهم", "breitgemacht = استولوا", "Reisende = مسافرون"],
    simplified: "المقاعد المخصصة للأمهات تحتلها شخصيات أخرى",
    imagine: "👤🪑 رجل جالس في مقعد مخصص للأم"
};

HELP_DATA["sprach2_exam12_q9"] = {
    text: "Anspruch auf einen Platz",
    meaning: "الحق في مقعد",
    keywords: ["auf = في", "Platz = مقعد", "Anspruch = حق"],
    simplified: "الركاب البالغون يطالبون بمقاعدهم بحجة التعب",
    imagine: "🪑👩 أم واقفة"
};

HELP_DATA["sprach2_exam12_q10"] = {
    text: "Man meint dabei die Kinder",
    meaning: "بذلك يقصدون الأطفال",
    keywords: ["dabei = بذلك", "meint = يقصدون", "Kinder = أطفال"],
    simplified: "وسائل الإعلام تصف الأطفال في سياق المشاكل",
    imagine: "📺👶 تلفاز وطفل"
};

// ============================================
// Exam 13 (exam13.json) - Das Schicksal des Braunbären
// ============================================

HELP_DATA["sprach2_exam13_q1"] = {
    text: "während der vergangen 12000 Jahre",
    meaning: "خلال الـ 12000 سنة الماضية",
    keywords: ["während = خلال", "vergangen = الماضية", "Jahre = سنوات"],
    simplified: "التغير المناخي على مدى 12 ألف سنة أثر على الدببة",
    imagine: "🐻📆 دب وتقويم"
};

HELP_DATA["sprach2_exam13_q2"] = {
    text: "Dadurch wurde der Lebensraum der Tiere verkleinert",
    meaning: "وبذلك تضاءلت مساحة موطن الحيوانات",
    keywords: ["Dadurch = وبذلك", "Lebensraum = موطن", "verkleinert = تضاءلت"],
    simplified: "تقلص موطن الدببة البنية مع ارتفاع درجات الحرارة",
    imagine: "🗺️📉 خريطة منطقتها تتناقص"
};

HELP_DATA["sprach2_exam13_q3"] = {
    text: "dass das Verschwinden der Braunbären mit der Landnutzung durch den Menschen zusammenhängt",
    meaning: "اختفاء الدببة البنية مرتبط باستخدام الأراضي من قبل البشر",
    keywords: ["dass = أن", "Verschwinden = اختفاء", "Landnutzung = استخدام الأراضي"],
    simplified: "من الثابت علمياً أن الزراعة أثرت على الدببة",
    imagine: "🚜🐻 جرار ودب"
};

HELP_DATA["sprach2_exam13_q4"] = {
    text: "Wintertemperatur ist in weiten Teilen Europas um zwei bis vier Grad angestiegen",
    meaning: "ارتفعت درجة حرارة الشتاء في معظم أنحاء أوروبا بمقدار درجتين إلى أربع درجات",
    keywords: ["um = بمقدار", "angestiegen = ارتفعت", "Wintertemperatur = درجة حرارة الشتاء"],
    simplified: "الشتاء الأكثر دفئاً يقلل من سبات الدببة",
    imagine: "🌡️📈 ميزان حرارة مرتفع"
};

HELP_DATA["sprach2_exam13_q5"] = {
    text: "bekamen die Braunbären weniger Nachkommen",
    meaning: "أنجبت الدببة البنية عدداً أقل من الأشبال",
    keywords: ["Nachkommen = ذرية", "weniger = أقل", "bekamen = أنجبت"],
    simplified: "ضعف التكاثر أدى إلى تقلص أعدادها",
    imagine: "🐻❌🐻‍❄️ دبان مع خط متقاطع"
};

HELP_DATA["sprach2_exam13_q6"] = {
    text: "Der Grund dafür ist",
    meaning: "السبب في ذلك هو",
    keywords: ["dafür = في ذلك", "Grund = سبب", "ist = هو"],
    simplified: "الإجابة تكمن في علم وظائف الأعضاء وعلاقته بالطقس",
    imagine: "🔍🐻 بحث ودب"
};

HELP_DATA["sprach2_exam13_q7"] = {
    text: "denn sie bringen im Winter ihre Jungen zur Welt",
    meaning: "لأنها تلد صغارها في الشتاء",
    keywords: ["denn = لأن", "Winter = شتاء", "Jungen = صغارها"],
    simplified: "الدببة تحتاج لطاقة إضافية للولادة في الشتاء",
    imagine: "🥶🐻 والدة دب في عرين ثلجي"
};

HELP_DATA["sprach2_exam13_q8"] = {
    text: "begünstigten auch die menschlichen Eingriffe",
    meaning: "شجعت أيضاً التدخلات البشرية",
    keywords: ["Eingriffe = تدخلات", "menschlichen = بشرية", "begünstigten = شجعت"],
    simplified: "الطقس الأكثر دفئاً ساعد المزارعين على التوسع في موطن الدببة",
    imagine: "🚜🌲 جرار وأشجار مقطوعة"
};

HELP_DATA["sprach2_exam13_q9"] = {
    text: "Am Ende der letzten Eiszeit war der Braunbär noch überall in Europa heimisch",
    meaning: "في نهاية العصر الجليدي الأخير، كان الدب البني لا يزال موطنه في كل مكان في أوروبا",
    keywords: ["noch = لا يزال", "Eiszeit = عصر جليدي", "heimisch = موطنه"],
    simplified: "الدببة كانت منتشرة في كل أوروبا ذات يوم",
    imagine: "🗺️🐻 خريطة بأوروبا مملوءة بدببة"
};

HELP_DATA["sprach2_exam13_q10"] = {
    text: "ging es mit dem Braunbären aber vor etwa 2000 Jahren bergab",
    meaning: "لكن أوضاع الدب البني تدهورت منذ حوالي 2000 عام",
    keywords: ["ging = تدهورت", "bergab = إلى الأسفل", "Braunbären = دب بني"],
    simplified: "منذ ألفي عام، بدأ عدد الدببة في التناقص السريع",
    imagine: "📉🐻 رسم بياني هابط مع دب"
};

// ============================================
// Exam 14 (exam14.json) - Das Schicksal des Braunbären (معدل)
// ============================================

HELP_DATA["sprach2_exam14_q1"] = {
    text: "während der vergangen 12000 Jahre",
    meaning: "خلال الـ 12000 سنة الماضية",
    keywords: ["während = خلال", "vergangen = الماضية", "Jahre = سنوات"],
    simplified: "التغير المناخي على مدى 12 ألف سنة أثر على الدببة",
    imagine: "🐻📆 دب وتقويم"
};

HELP_DATA["sprach2_exam14_q2"] = {
    text: "Dadurch wurde der Lebensraum der Tiere verkleinert",
    meaning: "وبذلك تضاءلت مساحة موطن الحيوانات",
    keywords: ["Dadurch = وبذلك", "Lebensraum = موطن", "verkleinert = تضاءلت"],
    simplified: "تقلص موطن الدببة البنية مع ارتفاع درجات الحرارة",
    imagine: "🗺️📉 خريطة منطقتها تتناقص"
};

HELP_DATA["sprach2_exam14_q3"] = {
    text: "dass das Verschwinden der Braunbären mit der Landnutzung durch den Menschen zusammenhängt",
    meaning: "اختفاء الدببة البنية مرتبط باستخدام الأراضي من قبل البشر",
    keywords: ["dass = أن", "Verschwinden = اختفاء", "Landnutzung = استخدام الأراضي"],
    simplified: "من الثابت علمياً أن الزراعة أثرت على الدببة",
    imagine: "🚜🐻 جرار ودب"
};

HELP_DATA["sprach2_exam14_q4"] = {
    text: "Wintertemperatur ist in weiten Teilen Europas um zwei bis vier Grad angestiegen",
    meaning: "ارتفعت درجة حرارة الشتاء في معظم أنحاء أوروبا بمقدار درجتين إلى أربع درجات",
    keywords: ["um = بمقدار", "angestiegen = ارتفعت", "Wintertemperatur = درجة حرارة الشتاء"],
    simplified: "الشتاء الأكثر دفئاً يقلل من سبات الدببة",
    imagine: "🌡️📈 ميزان حرارة مرتفع"
};

HELP_DATA["sprach2_exam14_q5"] = {
    text: "bekamen die Braunbären weniger Nachkommen",
    meaning: "أنجبت الدببة البنية عدداً أقل من الأشبال",
    keywords: ["Nachkommen = ذرية", "weniger = أقل", "bekamen = أنجبت"],
    simplified: "ضعف التكاثر أدى إلى تقلص أعدادها",
    imagine: "🐻❌🐻‍❄️ دبان مع خط متقاطع"
};

HELP_DATA["sprach2_exam14_q6"] = {
    text: "Der Grund dafür ist",
    meaning: "السبب في ذلك هو",
    keywords: ["dafür = في ذلك", "Grund = سبب", "ist = هو"],
    simplified: "الإجابة تكمن في علم وظائف الأعضاء وعلاقته بالطقس",
    imagine: "🔍🐻 بحث ودب"
};

HELP_DATA["sprach2_exam14_q7"] = {
    text: "denn sie bringen im Winter ihre Jungen zur Welt",
    meaning: "لأنها تلد صغارها في الشتاء",
    keywords: ["denn = لأن", "Winter = شتاء", "Jungen = صغارها"],
    simplified: "الدببة تحتاج لطاقة إضافية للولادة في الشتاء",
    imagine: "🥶🐻 والدة دب في عرين ثلجي"
};

HELP_DATA["sprach2_exam14_q8"] = {
    text: "begünstigten auch die menschlichen Eingriffe",
    meaning: "شجعت أيضاً التدخلات البشرية",
    keywords: ["Eingriffe = تدخلات", "menschlichen = بشرية", "begünstigten = شجعت"],
    simplified: "الطقس الأكثر دفئاً ساعد المزارعين على التوسع في موطن الدببة",
    imagine: "🚜🌲 جرار وأشجار مقطوعة"
};

HELP_DATA["sprach2_exam14_q9"] = {
    text: "Am Ende der letzten Eiszeit war der Braunbär noch überall in Europa heimisch",
    meaning: "في نهاية العصر الجليدي الأخير، كان الدب البني لا يزال موطنه في كل مكان في أوروبا",
    keywords: ["noch = لا يزال", "Eiszeit = عصر جليدي", "heimisch = موطنه"],
    simplified: "الدببة كانت منتشرة في كل أوروبا ذات يوم",
    imagine: "🗺️🐻 خريطة بأوروبا مملوءة بدببة"
};

HELP_DATA["sprach2_exam14_q10"] = {
    text: "ging es mit dem Braunbären aber vor etwa 2000 Jahren bergab",
    meaning: "لكن أوضاع الدب البني تدهورت منذ حوالي 2000 عام",
    keywords: ["ging = تدهورت", "bergab = إلى الأسفل", "Braunbären = دب بني"],
    simplified: "منذ ألفي عام، بدأ عدد الدببة في التناقص السريع",
    imagine: "📉🐻 رسم بياني هابط مع دب"
};

// ============================================
// Exam 15 (exam15.json) - Was steckt hinter Bio?
// ============================================

HELP_DATA["sprach2_exam15_q1"] = {
    text: "ob Bio-Produkte nun auch wirklich die gesünderen sind",
    meaning: "هل المنتجات العضوية هي حقاً الأكثر صحة",
    keywords: ["ob = هل", "Bio-Produkte = منتجات عضوية", "gesünderen = أكثر صحة"],
    simplified: "هل الأطعمة العضوية تستحق السعر الأعلى؟",
    imagine: "❓🥦 علامة استفهام وبروكلي"
};

HELP_DATA["sprach2_exam15_q2"] = {
    text: "Außerdem sind Bio-Produkte teurer",
    meaning: "بالإضافة إلى ذلك، المنتجات العضوية أغلى ثمناً",
    keywords: ["Außerdem = بالإضافة إلى ذلك", "teurer = أغلى ثمناً", "Bio-Produkte = منتجات عضوية"],
    simplified: "التكلفة الأعلى تثير الشكوك حول الجودة",
    imagine: "💰❓ نقود وعلامة استفهام"
};

HELP_DATA["sprach2_exam15_q3"] = {
    text: "Sie enthalten weniger Nitrat, mehr Nährstoffe",
    meaning: "تحتوي على نترات أقل ومغذيات أكثر",
    keywords: ["enthalten = تحتوي", "Nitrat = نترات", "Nährstoffe = مغذيات"],
    simplified: "الخضروات العضوية أكثر فائدة غنائية",
    imagine: "🥬💪 خضار وعضلات"
};

HELP_DATA["sprach2_exam15_q4"] = {
    text: "Bei vielen Verbrauchern steht hinter ihrem Einkaufsverhalten ein ökologisches Bewusstsein",
    meaning: "خلف سلوك الشراء لدى العديد من المستهلكين وعي بيئي",
    keywords: ["hinter = خلف", "Einkaufsverhalten = سلوك شراء", "ökologisches Bewusstsein = وعي بيئي"],
    simplified: "العديد من العملاء يشترون عضوياً لدافع بيئي",
    imagine: "🛒🌍 سلة تسوق وكوكب أرض"
};

HELP_DATA["sprach2_exam15_q5"] = {
    text: "Sie entlastet unsere Umwelt",
    meaning: "إنها تخفف العبء على بيئتنا",
    keywords: ["entlastet = تخفف العبء", "Umwelt = بيئة", "unsere = بيئتنا"],
    simplified: "المنتج العضوي يعني كوكباً أكثر صحة",
    imagine: "🌿❤️ نبات قلب"
};

HELP_DATA["sprach2_exam15_q6"] = {
    text: "kommen aus ökologischer Landwirtschaft",
    meaning: "تأتي من الزراعة العضوية",
    keywords: ["aus = من", "ökologischer Landwirtschaft = زراعة عضوية", "kommen = تأتي"],
    simplified: "الأطعمة العضوية تُزرع بنظام بيئي متوازن",
    imagine: "🌱🚜 مزرعة عضوية"
};

HELP_DATA["sprach2_exam15_q7"] = {
    text: "auf Wochenmärkten oder in Bio-Supermärkten",
    meaning: "في أسواق الأسبوع أو متاجر الأغذية العضوية الكبرى",
    keywords: ["auf = في", "Wochenmärkten = أسواق أسبوعية", "Bio-Supermärkten = متاجر عضوية"],
    simplified: "يمكن العثور على المنتجات العضوية في الأسواق الخارجية ومتاجر التجزئة المتخصصة",
    imagine: "🏪🥬 متجر وخضار"
};

HELP_DATA["sprach2_exam15_q8"] = {
    text: "dürfen weder Kunstdünger noch chemische Schädlingsbekämpfungsmittel verwendet werden",
    meaning: "لا يجوز استخدام الأسمدة الاصطناعية ولا مبيدات الآفات الكيميائية",
    keywords: ["verwendet = استخدام", "Kunstdünger = أسمدة اصطناعية", "Schädlingsbekämpfungsmittel = مبيدات آفات"],
    simplified: "الزراعة العضوية تمنع استخدام المواد الكيميائية الصناعية",
    imagine: "🚫🧪 علامة منع وأنبوب اختبار"
};

HELP_DATA["sprach2_exam15_q9"] = {
    text: "dürfen wirklich nur Bio-Lebensmittel benutzt werden",
    meaning: "يُسمح باستخدام الأطعمة العضوية فقط حقاً",
    keywords: ["wirklich = حقاً", "Bio-Lebensmittel = أطعمة عضوية", "benutzt = استخدام"],
    simplified: "الوصفة العضوية الحقيقية تتطلب مكونات عضوية معتمدة",
    imagine: "✅🍪 كعكة وعلامة صح"
};

HELP_DATA["sprach2_exam15_q10"] = {
    text: "die garantieren, dass die Produkte wirklich 'bio' sind",
    meaning: "التي تضمن أن المنتجات عضوية حقاً",
    keywords: ["dass = أن", "garantieren = تضمن", "Produkte = منتجات"],
    simplified: "العلامات تمنح المستهلك الثقة بأن المنتج يتبع معايير صارمة",
    imagine: "🔖✅ ملصق وعلامة صح"
};
// ============================================
// Exam 16 (exam16.json) - Was genau sind eigentlich Bio-Lebensmittel (معدل)
// ============================================

HELP_DATA["sprach2_exam16_q1"] = {
    text: "ob Bio-Produkte denn wirklich gesünder sind als herkömmliche Produkte",
    meaning: "هل المنتجات العضوية حقاً أكثر صحة من المنتجات التقليدية",
    keywords: ["ob = هل", "wirklich = حقاً", "gesünder = أكثر صحة"],
    simplified: "يتساءل الناس إذا كانت الأغذية العضوية تستحق السعر الأعلى",
    imagine: "❓🥦 علامة استفهام مع بروكلي عضوي"
};

HELP_DATA["sprach2_exam16_q2"] = {
    text: "Außerdem sind Bio-Produkte teurer",
    meaning: "بالإضافة إلى ذلك، المنتجات العضوية أغلى ثمناً",
    keywords: ["Außerdem = بالإضافة إلى ذلك", "teurer = أغلى", "Bio-Produkte = منتجات عضوية"],
    simplified: "التكلفة المرتفعة تجعل المستهلكين يفكرون مرتين",
    imagine: "💰❓ نقود مع علامة استفهام"
};

HELP_DATA["sprach2_exam16_q3"] = {
    text: "Sie enthalten weniger Nitrat, mehr Nährstoffe",
    meaning: "تحتوي على نترات أقل ومغذيات أكثر",
    keywords: ["enthalten = تحتوي", "Nitrat = نترات", "Nährstoffe = مغذيات"],
    simplified: "المنتجات العضوية أكثر فائدة وغنى بالعناصر الغذائية",
    imagine: "🥬📈 خضار مع رسم بياني مرتفع"
};

HELP_DATA["sprach2_exam16_q4"] = {
    text: "steht ein ökologisches Bewusstsein hinter ihrem Einkaufsverhalten",
    meaning: "يوجد وعي بيئي وراء سلوكهم الشرائي",
    keywords: ["hinter = خلف", "ökologisches Bewusstsein = وعي بيئي", "Einkaufsverhalten = سلوك شرائي"],
    simplified: "الكثير من الناس يشترون عضوياً بدافع حماية الطبيعة",
    imagine: "🛒🌍 عربة تسوق مع كرة أرضية"
};

HELP_DATA["sprach2_exam16_q5"] = {
    text: "weil sie unsere Umwelt entlastet",
    meaning: "لأنها تخفف العبء على بيئتنا",
    keywords: ["entlastet = تخفف العبء", "Umwelt = بيئة", "unsere = بيئتنا"],
    simplified: "الزراعة العضوية أفضل للبيئة",
    imagine: "🌿💚 نبات مع قلب أخضر"
};

HELP_DATA["sprach2_exam16_q6"] = {
    text: "kommen aus ökologischer Landwirtschaft",
    meaning: "تأتي من الزراعة العضوية",
    keywords: ["aus = من", "ökologischer Landwirtschaft = زراعة عضوية", "kommen = تأتي"],
    simplified: "المنتج العضوي مصدره مزارع مستدامة",
    imagine: "🚜🌾 جرار زراعي مع حقل أخضر"
};

HELP_DATA["sprach2_exam16_q7"] = {
    text: "auf Wochenmärkten oder in Bio-Supermärkten",
    meaning: "في أسواق الأسبوع أو متاجر الأغذية العضوية",
    keywords: ["auf = في", "Wochenmärkten = أسواق أسبوعية", "Bio-Supermärkten = متاجر عضوية"],
    simplified: "تتوفر المنتجات العضوية في أماكن متعددة",
    imagine: "🏪🥬 متجر صغير مع خضار"
};

HELP_DATA["sprach2_exam16_q8"] = {
    text: "dürfen weder Kunstdünger noch chemische Schädlingsbekämpfungsmittel verwendet werden",
    meaning: "لا يجوز استخدام الأسمدة الاصطناعية ولا مبيدات الآفات الكيميائية",
    keywords: ["verwendet = استخدام", "Kunstdünger = أسمدة اصطناعية", "Schädlingsbekämpfungsmittel = مبيدات آفات"],
    simplified: "الزراعة العضوية تحظر الكيماويات الضارة",
    imagine: "🚫🧪 علامة منع مع أنبوب اختبار"
};

HELP_DATA["sprach2_exam16_q9"] = {
    text: "dürfen wirklich nur Bio-Lebensmittel benutzt werden",
    meaning: "يُسمح باستخدام الأطعمة العضوية فقط حقاً",
    keywords: ["wirklich = حقاً", "Bio-Lebensmittel = أطعمة عضوية", "benutzt = استخدام"],
    simplified: "الكعكة العضوية تتطلب مكونات عضوية معتمدة",
    imagine: "✅🍰 كعكة مع علامة صح"
};

HELP_DATA["sprach2_exam16_q10"] = {
    text: "dass die Produkte wirklich 'bio' sind",
    meaning: "أن المنتجات عضوية حقاً",
    keywords: ["dass = أن", "wirklich = حقاً", "bio = عضوية"],
    simplified: "الختم الرسمي يضمن لك الجودة العضوية",
    imagine: "🔖✅ ملصق مع علامة صح"
};

// ============================================
// Exam 17 (exam17.json) - Sicherer Schulweg
// ============================================

HELP_DATA["sprach2_exam17_q1"] = {
    text: "deshalb ist es wichtig, dass Eltern sich den besten Schulweg überlegen",
    meaning: "لذلك من المهم أن يفكر الآباء في أفضل طريق للمدرسة",
    keywords: ["deshalb = لذلك", "wichtig = مهم", "Schulweg = طريق المدرسة"],
    simplified: "لذلك يجب على الآباء مساعدة أطفالهم في اختيار الطريق الآمن",
    imagine: "👩‍👧‍👦🗺️ أم مع طفل وخريطة"
};

HELP_DATA["sprach2_exam17_q2"] = {
    text: "Nicht immer ist der kürzeste Weg auch der ungefährlichste",
    meaning: "ليس دائماً أقصر طريق هو الأكثر أماناً",
    keywords: ["Nicht = ليس", "kürzeste = أقصر", "ungefährlichste = أآمن"],
    simplified: "الطريق القصير قد لا يكون الخيار الأكثر أماناً للأطفال",
    imagine: "⚠️🗺️ طريق قصير مع علامة خطر"
};

HELP_DATA["sprach2_exam17_q3"] = {
    text: "sich voll auf das Kind konzentrieren",
    meaning: "التركيز بشكل كامل على الطفل",
    keywords: ["konzentrieren = التركيز", "voll = كامل", "Kind = طفل"],
    simplified: "يجب أن يكرس الآباء وقتهم الكامل للتدريب",
    imagine: "🧠👧 عقل مع طفلة صغيرة"
};

HELP_DATA["sprach2_exam17_q4"] = {
    text: "sich auch selbst daran halten",
    meaning: "الالتزام بها بأنفسهم أيضاً",
    keywords: ["selbst = بأنفسهم", "halten = الالتزام", "daran = بها"],
    simplified: "يجب أن يكون الآباء قدوة حسنة لأطفالهم",
    imagine: "👨‍👦✨ أب مع طفل ونجوم"
};

HELP_DATA["sprach2_exam17_q5"] = {
    text: "Manchmal ist es hilfreich, wenn die Großen sich von ihren Kindern erzählen lassen",
    meaning: "أحياناً من المفيد أن يستمع الكبار لأطفالهم",
    keywords: ["hilfreich = مفيد", "Großen = كبار", "erzählen = يروي"],
    simplified: "الأطفال يرون الشارع بشكل مختلف، لذا من المفيد الاستماع لهم",
    imagine: "👧🗣️👩 طفلة تتحدث وأم تستمع"
};

HELP_DATA["sprach2_exam17_q6"] = {
    text: "Schritt für Schritt verlängern",
    meaning: "تمديدها خطوة بخطوة",
    keywords: ["Schritt = خطوة", "für = بخطوة", "verlängern = تمديد"],
    simplified: "تدريجياً يمكن زيادة المسافة التي يقطعها الطفل بمفرده",
    imagine: "➡️➡️ أسهم متتالية"
};

HELP_DATA["sprach2_exam17_q7"] = {
    text: "die wichtigsten Regeln für das Verhalten im Straßenverkehr",
    meaning: "أهم القواعد للسلوك في حركة المرور",
    keywords: ["Verhalten = سلوك", "Straßenverkehr = حركة المرور", "Regeln = قواعد"],
    simplified: "مراجعة قواعد السلامة على الطريق مع الأطفال",
    imagine: "🚦📋 إشارة مرور مع قائمة"
};

HELP_DATA["sprach2_exam17_q8"] = {
    text: "kritische Situationen besprechen",
    meaning: "مناقشة المواقف الحرجة",
    keywords: ["kritische = حرجة", "Situationen = مواقف", "besprechen = مناقشة"],
    simplified: "التحدث عن أسوأ السيناريوهات المحتملة",
    imagine: "⚠️💭 خطر مع فقاعة تفكير"
};

HELP_DATA["sprach2_exam17_q9"] = {
    text: "lernt das Kind, sich selbstbewusst im Straßenverkehr zu verhalten",
    meaning: "يتعلم الطفل التصرف بثقة في حركة المرور",
    keywords: ["selbstbewusst = بثقة", "verhalten = التصرف", "Straßenverkehr = حركة المرور"],
    simplified: "الممارسة تبني ثقة الطفل بنفسه على الطريق",
    imagine: "🧒💪 طفل يظهر عضلاته"
};

HELP_DATA["sprach2_exam17_q10"] = {
    text: "selbstständig Lösungen zu finden",
    meaning: "إيجاد حلول بشكل مستقل",
    keywords: ["selbstständig = بشكل مستقل", "Lösungen = حلول", "finden = إيجاد"],
    simplified: "الهدف النهائي هو تعليم الطفل كيف يحل مشاكله بنفسه",
    imagine: "🧒🔍 طفل يبحث في خريطة"
};

// ============================================
// Exam 18 (exam18.json) - Der Hund als intelligentes Wesen
// ============================================

HELP_DATA["sprach2_exam18_q1"] = {
    text: "was ihre Intelligenz betrifft",
    meaning: "فيما يتعلق بذكائهم",
    keywords: ["was = ما", "Intelligenz = ذكاء", "betrifft = يتعلق"],
    simplified: "كان يُعتقد أن الكلاب ذكاءها محدود",
    imagine: "🐕❓ كلب وعلامة استفهام"
};

HELP_DATA["sprach2_exam18_q2"] = {
    text: "jetzt haben wissenschaftliche Experimente die Hundeehre gerettet",
    meaning: "الآن الأنشطة العلمية أنقذت سمعة الكلاب",
    keywords: ["jetzt = الآن", "Experimente = تجارب", "gerettet = أنقذت"],
    simplified: "أثبتت التجارب أن الكلاب أذكى مما كنا نظن",
    imagine: "🔬🐕 مختبر وكلب"
};

HELP_DATA["sprach2_exam18_q3"] = {
    text: "an der Universität Wien",
    meaning: "في جامعة فيينا",
    keywords: ["an = في", "Universität = جامعة", "Wien = فيينا"],
    simplified: "العلماء في جامعات النمسا درسوا قدرات الكلاب",
    imagine: "🏛️🎓 مبنى جامعي وقبعة تخرج"
};

HELP_DATA["sprach2_exam18_q4"] = {
    text: "aus verschiedenen Bildern das richtige auswählen",
    meaning: "اختيار الصورة الصحيحة من بين صور مختلفة",
    keywords: ["aus = من", "verschiedenen = مختلفة", "richtige = الصحيحة"],
    simplified: "تم تدريب الكلب على التمييز بين الصور",
    imagine: "🖼️🐕 كلب ينظر إلى صور"
};

HELP_DATA["sprach2_exam18_q5"] = {
    text: "darauf entweder einen Menschen oder eine Landschaft erkennen",
    meaning: "عليها التعرف إما على شخص أو منظر طبيعي",
    keywords: ["darauf = عليها", "entweder = إما", "erkennen = التعرف"],
    simplified: "الكلب يتعلم الفرق بين صورة إنسان وصورة طبيعة",
    imagine: "👤🖼️🐕 شخص وصورة وكلب"
};

HELP_DATA["sprach2_exam18_q6"] = {
    text: "so dass der Hund mit der Schnauze auf das jeweils richtige Bild tippen konnte",
    meaning: "بحيث يمكن للكلب النقر بخطمه على الصورة الصحيحة",
    keywords: ["so dass = بحيث", "Schnauze = خطم", "tippen = النقر"],
    simplified: "الشاشة تعمل باللمس لتسجيل اختيارات الكلب",
    imagine: "🐕👆 كلب يضغط على شاشة بخطمه"
};

HELP_DATA["sprach2_exam18_q7"] = {
    text: "nicht nur mit einer ähnlichen Begeisterung am Bildschirm hing",
    meaning: "لم يكن فقط بحماس مماثل أمام الشاشة",
    keywords: ["nicht nur = ليس فقط", "Begeisterung = حماس", "hing = التصق"],
    simplified: "الكلب تفاعل بحماس كبير أثناء التجربة",
    imagine: "🐕🖥️ كلب متحمس أمام الكمبيوتر"
};

HELP_DATA["sprach2_exam18_q8"] = {
    text: "von denen eins Futter enthielt",
    meaning: "أحدهما يحتوي على طعام",
    keywords: ["denen = أحدهما", "eins = واحد", "Futter = طعام"],
    simplified: "وعاءان، واحد فقط به طعام مخفي",
    imagine: "🥣❓ وعاء وعلامة استفهام"
};

HELP_DATA["sprach2_exam18_q9"] = {
    text: "dass bestimmte Muster menschlicher Gestik und Mimik von den Hunden sehr treffsicher interpretiert werden können",
    meaning: "أن الكلاب تستطيع تفسير أنماط معينة من الإيماءات وتعبيرات الوجه البشرية بدقة عالية",
    keywords: ["dass = أن", "Gestik = إيماءات", "Mimik = تعابير وجه"],
    simplified: "الكلب يفهم الإشارات البشرية دون تدريب",
    imagine: "🐕👀 كلب ينظر إلى شخص يشير"
};

HELP_DATA["sprach2_exam18_q10"] = {
    text: "brachten keine vergleichbaren Resultate",
    meaning: "لم تحقق نتائج مماثلة",
    keywords: ["keine = لا", "vergleichbaren = مماثلة", "Resultate = نتائج"],
    simplified: "الذئاب لم تظهر نفس المستوى من الفهم",
    imagine: "🐺❌ ذئب وعلامة منع"
};

// ============================================
// Exam 19 (exam19.json) - Die wichtigsten Regeln auf der Skipiste
// ============================================

HELP_DATA["sprach2_exam19_q1"] = {
    text: "muss auch mit rechtlichen Folgen rechnen",
    meaning: "يجب أن يتوقع عواقب قانونية أيضاً",
    keywords: ["rechnen = يتوقع", "rechtlichen Folgen = عواقب قانونية", "mit = مع"],
    simplified: "الإهمال على المنحدرات قد يؤدي إلى عقوبات",
    imagine: "⚖️⛷️ ميزان عدالة مع زلاجات"
};

HELP_DATA["sprach2_exam19_q2"] = {
    text: "gültig",
    meaning: "ساري المفعول",
    keywords: ["gültig = ساري المفعول", "Strafgesetzbuch = قانون العقوبات", "ist = هو"],
    simplified: "القانون يطبق على الطرقات والمنحدرات الثلجية على حد سواء",
    imagine: "📜✅ مستند قانوني مع علامة صح"
};

HELP_DATA["sprach2_exam19_q3"] = {
    text: "sieht das Gesetz Freiheitsstrafen bis zu 6 Monaten vor",
    meaning: "ينص القانون على عقوبات سجن تصل إلى 6 أشهر",
    keywords: ["vor = ينص", "Freiheitsstrafen = عقوبات سجن", "Gesetz = قانون"],
    simplified: "الإصابات الخطيرة قد تؤدي إلى السجن",
    imagine: "⚖️🔒 ميزان عدالة مع قفل"
};

HELP_DATA["sprach2_exam19_q4"] = {
    text: "sollte diese Regeln kennen",
    meaning: "يجب أن يعرف هذه القواعد",
    keywords: ["sollte = يجب", "kennen = يعرف", "Regeln = قواعد"],
    simplified: "كل متزلج مطالب بمعرفة قانون المنحدرات",
    imagine: "📋⛷️ لائحة مع زلاجة"
};

HELP_DATA["sprach2_exam19_q5"] = {
    text: "so verhalten, dass er keinen anderen gefährdet",
    meaning: "يتصرف بحيث لا يعرض الآخرين للخطر",
    keywords: ["so = بحيث", "verhalten = يتصرف", "gefährdet = يعرض للخطر"],
    simplified: "السلوك الآمن يمنع الحوادث على المنحدر",
    imagine: "⚠️🚫 علامة خطر وعلامة ممنوع"
};

HELP_DATA["sprach2_exam19_q6"] = {
    text: "der eigenen Geschwindigkeit dem Gelände anpassen",
    meaning: "تكييف السرعة مع地形 (التضاريس)",
    keywords: ["anpassen = تكييف", "Geschwindigkeit = سرعة", "Gelände = تضاريس"],
    simplified: "يجب أن تتناسب سرعتك مع مستوى مهارتك والطقس",
    imagine: "🏔️📉 جبل ومقياس سرعة"
};

HELP_DATA["sprach2_exam19_q7"] = {
    text: "allerdings immer in einem Abstand",
    meaning: "لكن دائماً بمسافة",
    keywords: ["allerdings = لكن", "immer = دائماً", "Abstand = مسافة"],
    simplified: "التجاوز مسموح به لكن بحذر وبمسافة كافية",
    imagine: "➡️⬅️ سهمان متقابلان"
};

HELP_DATA["sprach2_exam19_q8"] = {
    text: "dürfen nur den Rand der Abfahrtstrecke benutzen",
    meaning: "يُسمح لهم باستخدام حافة مسار النزول فقط",
    keywords: ["Rand = حافة", "Abfahrtstrecke = مسار نزول", "benutzen = استخدام"],
    simplified: "المشي صعوداً على حافة المنحدر فقط",
    imagine: "⬆️⛷️ سهم لأعلى مع زلاجة"
};

HELP_DATA["sprach2_exam19_q9"] = {
    text: "müssen eine solche Stelle so schnell wie möglich freimachen",
    meaning: "يجب إخلاء مثل هذا المكان في أسرع وقت ممكن",
    keywords: ["Stelle = مكان", "freimachen = إخلاء", "schnell = بسرعة"],
    simplified: "المناطق الخطرة يجب إخلاؤها فوراً لتجنب الاصطدامات",
    imagine: "⚠️🏔️ علامة خطر مع جبل"
};

HELP_DATA["sprach2_exam19_q10"] = {
    text: "seine Personalien angeben",
    meaning: "تقديم بياناته الشخصية",
    keywords: ["angeben = تقديم", "Personalien = بيانات شخصية", "seine = بياناته"],
    simplified: "جميع المتزلجين مطالبون بتبادل المعلومات بعد حادث",
    imagine: "📝🆔 نموذج مع هوية شخصية"
};

// ============================================
// Exam 20 (exam20.json) - Kaffee und Kuchen – ein Stück Tradition
// ============================================

HELP_DATA["sprach2_exam20_q1"] = {
    text: "trifft man sich am Sonntagnachmittag zu Kaffee und Kuchen",
    meaning: "يجتمع الناس بعد ظهر الأحد لتناول القهوة والكعك",
    keywords: ["zu = لتناول", "Kaffee = قهوة", "Kuchen = كعك"],
    simplified: "طقس ألماني أصيل: القهوة والكعك يوم الأحد",
    imagine: "☕🍰 كوب قهوة مع قطعة كعكة"
};

HELP_DATA["sprach2_exam20_q2"] = {
    text: "Wie lange es den Brauch gibt, ist jedoch nicht bekannt",
    meaning: "لكن ليس معروفاً منذ متى يوجد هذا التقليد",
    keywords: ["Wie = منذ متى", "lange = طويلاً", "Brauch = تقليد"],
    simplified: "التقليد قديم جداً لدرجة أن تاريخ بدايته غير معروف",
    imagine: "❓📅 علامة استفهام مع تقويم"
};

HELP_DATA["sprach2_exam20_q3"] = {
    text: "Sicher ist nur, dass sich dieses Getränk im 17. Jahrhundert in Europa verbreitete",
    meaning: "المؤكد فقط أن هذا المشروب انتشر في أوروبا في القرن السابع عشر",
    keywords: ["Sicher = مؤكد", "Getränk = مشروب", "verbreitete = انتشر"],
    simplified: "القهوة وصلت إلى أوروبا في القرن السابع عشر",
    imagine: "☕🚢 فنجان قهوة مع سفينة"
};

HELP_DATA["sprach2_exam20_q4"] = {
    text: "Damals entstanden zahlreiche Kaffeehäuser",
    meaning: "في ذلك الوقت ظهرت العديد من المقاهي",
    keywords: ["Damals = في ذلك الوقت", "entstanden = ظهرت", "Kaffeehäuser = مقاهي"],
    simplified: "انتشرت ثقافة المقاهي في أوروبا",
    imagine: "🏛️☕ مقهى تاريخي مع فنجان قهوة"
};

HELP_DATA["sprach2_exam20_q5"] = {
    text: "sondern man konnte in Gesellschaft sein",
    meaning: "بل كان المرء برفقة الآخرين",
    keywords: ["sondern = بل", "Gesellschaft = برفقة", "konnte = كان"],
    simplified: "المقهى لم يكن للطعام فقط، بل للتجمعات الاجتماعية",
    imagine: "👥☕ مجموعة من الناس في مقهى"
};

HELP_DATA["sprach2_exam20_q6"] = {
    text: "wurde 1732 die berühmte Kaffeekantate von Johann Sebastian Bach uraufgeführt",
    meaning: "في عام 1732 تم عرض كانتاتا القهوة الشهيرة ليوهان سيباستيان باخ لأول مرة",
    keywords: ["von = بواسطة", "uraufgeführt = عرض لأول مرة", "Kaffeekantate = كانتاتا القهوة"],
    simplified: "باخ نفسه كرم القهوة بالموسيقى",
    imagine: "🎵☕ موسيقى مع فنجان قهوة"
};

HELP_DATA["sprach2_exam20_q7"] = {
    text: "das sich nur Adelige und wohlhabende Bürger leisten konnten",
    meaning: "الذي لم يستطع تحمله سوى النبلاء والمواطنين الأثرياء",
    keywords: ["konnten = استطاعوا", "leisten = تحمل", "Adelige = نبلاء"],
    simplified: "القهوة كانت يوماً سلعة فاخرة للأغنياء",
    imagine: "👑☕ تاج مع فنجان قهوة"
};

HELP_DATA["sprach2_exam20_q8"] = {
    text: "und ist es bis heute geblieben",
    meaning: "وبقي كذلك حتى اليوم",
    keywords: ["bis = حتى", "heute = اليوم", "geblieben = بقي"],
    simplified: "حافظت القهوة على مكانتها كمشروب مفضل",
    imagine: "🥇☕ ميدالية ذهبية مع فنجان قهوة"
};

HELP_DATA["sprach2_exam20_q9"] = {
    text: "Spezialitäten aus aller Welt",
    meaning: "أطباق خاصة من جميع أنحاء العالم",
    keywords: ["aus = من", "aller Welt = جميع أنحاء العالم", "Spezialitäten = أطباق خاصة"],
    simplified: "تنوع القهوة العالمية يزين القوائم الآن",
    imagine: "🌍☕ كرة أرضية مع فنجان قهوة"
};

HELP_DATA["sprach2_exam20_q10"] = {
    text: "setzten ihm immer häufiger Konkurrenz",
    meaning: "قدمت له منافسة بشكل متزايد",
    keywords: ["immer = بشكل متزايد", "häufiger = أكثر", "Konkurrenz = منافسة"],
    simplified: "أجهزة صنع القهوة الحديثة تنافس الآلة التقليدية",
    imagine: "☕⚙️ فنجان قهوة مع تروس"
};

// ============================================
// Exam 21 (exam21.json) - Fische sind schlauer, als wir denken
// ============================================

HELP_DATA["sprach2_exam21_q1"] = {
    text: "genau das Gegenteil ist der Fall",
    meaning: "العكس تماماً هو الصحيح",
    keywords: ["genau = تماماً", "Gegenteil = عكس", "Fall = حالة"],
    simplified: "الحقيقة المعاكسة تماماً هي الصحيحة",
    imagine: "🐟❌ سمكة وعلامة منع"
};

HELP_DATA["sprach2_exam21_q2"] = {
    text: "sie sind zu erstaunlichen kognitiven Leistungen fähig",
    meaning: "هم قادرون على قدرات إدراكية مذهلة",
    keywords: ["fähig = قادرون", "erstaunlichen = مذهلة", "kognitiven Leistungen = قدرات إدراكية"],
    simplified: "الأسماك تظهر مهارات عقلية مدهشة",
    imagine: "🧠🐟 دماغ مع سمكة"
};

HELP_DATA["sprach2_exam21_q3"] = {
    text: "entwickelten sie hochspezialisierte Sinnesfähigkeiten",
    meaning: "طوروا قدرات حسية عالية التخصص",
    keywords: ["entwickelten = طوروا", "hochspezialisierte = عالية التخصص", "Sinnesfähigkeiten = قدرات حسية"],
    simplified: "مرور الوقت ساعد الأسماك على تطوير حواس فريدة",
    imagine: "👂🐟 أذن مع سمكة"
};

HELP_DATA["sprach2_exam21_q4"] = {
    text: "lernen durch Beobachtung",
    meaning: "التعلم عن طريق الملاحظة",
    keywords: ["Beobachtung = ملاحظة", "lernen = تعلم", "durch = عن طريق"],
    simplified: "بعض أنواع الأسماك تتعلم بمشاهدة الآخرين",
    imagine: "👀🐟 عينان مع سمكة"
};

HELP_DATA["sprach2_exam21_q5"] = {
    text: "wurde Fischen noch nicht einmal zugetraut, dass sie hören können",
    meaning: "لم يكن يُعتقد حتى أن الأسماك قادرة على السمع",
    keywords: ["noch nicht einmal = حتى لم", "zugetraut = يُعتقد", "hören = السمع"],
    simplified: "حتى الثلاثينيات، ظن الباحثون أن السمكة لا تسمع",
    imagine: "🔇🐟 سمكة وعلامة كتم صوت"
};

HELP_DATA["sprach2_exam21_q6"] = {
    text: "bewies er übrigens auch als Erster",
    meaning: "أثبت بالمناسبة أيضاً أنه الأول",
    keywords: ["übrigens = بالمناسبة", "bewies = أثبت", "Erster = الأول"],
    simplified: "العالم نفسه اكتشف قدرة الأسماك على رؤية الألوان",
    imagine: "🔬🐟 عالم مع سمكة"
};

HELP_DATA["sprach2_exam21_q7"] = {
    text: "Doch warum wurden die Fähigkeiten der Fische so lange unterschätzt?",
    meaning: "لكن لماذا تم الاستهانة بقدرات الأسماك كل هذه المدة؟",
    keywords: ["Doch = لكن", "unterschätzt = الاستهانة", "Fähigkeiten = قدرات"],
    simplified: "هل نحن متحيزون ضد الأسماك لمجرد أنها تعيش في الماء؟",
    imagine: "❓🐟 علامة استفهام مع سمكة"
};

HELP_DATA["sprach2_exam21_q8"] = {
    text: "Für intelligent halten wir oft nur Tiere, die uns ähnlich sind",
    meaning: "نعتبر غالباً الحيوانات التي تشبهنا فقط ذكية",
    keywords: ["Für = نعتبر", "intelligent = ذكية", "ähnlich = تشبهنا"],
    simplified: "نحن البشر نميل للاعتقاد بأن ذكاء الكائنات يقاس بمدى قربها منا",
    imagine: "🧬🐕 دبل helix"
};

HELP_DATA["sprach2_exam21_q9"] = {
    text: "als Tiere an Land",
    meaning: "من الحيوانات على اليابسة",
    keywords: ["als = من", "Tiere = حيوانات", "Land = يابسة"],
    simplified: "الأسماك تعيش في بيئة مختلفة تماماً عن الحيوانات البرية",
    imagine: "🌊🐟 ماء مع سمكة"
};

HELP_DATA["sprach2_exam21_q10"] = {
    text: "wer mehr über Fische herausfinden wolle",
    meaning: "من يريد معرفة المزيد عن الأسماك",
    keywords: ["wer = من", "herausfinden = معرفة", "mehr = المزيد"],
    simplified: "نصيحة العالم: راقب سمكة واحدة في حوض للتعرف على شخصيتها",
    imagine: "🐟🔍 سمكة وعدسة مكبرة"
};

// ============================================
// Exam 22 (exam22.json) - Schwarzarbeit kann teuer werden
// ============================================

HELP_DATA["sprach2_exam22_q1"] = {
    text: "anstatt – wie durch das illegale Arbeitsverhältnis erhofft – Geld zu sparen",
    meaning: "بدلاً من توفير المال كما كان مأمولاً من خلال علاقة العمل غير القانونية",
    keywords: ["anstatt = بدلاً من", "sparen = توفير", "illegale = غير قانونية"],
    simplified: "بدلاً من التوفير، قد يدفع العميل ثمناً باهظاً",
    imagine: "💰🚫 نقود وعلامة منع"
};

HELP_DATA["sprach2_exam22_q2"] = {
    text: "ist nicht jede Gelegenheit so günstig, wie sie anfangs scheint",
    meaning: "ليست كل فرصة رخيصة كما تبدو في البداية",
    keywords: ["jede = كل", "Gelegenheit = فرصة", "günstig = رخيصة"],
    simplified: "الصفقات الرخيصة قد تأتي بنتائج عكسية",
    imagine: "🏷️⚠️ بطاقة سعر مع علامة خطر"
};

HELP_DATA["sprach2_exam22_q3"] = {
    text: "ein finanzielles Argument gegen illegale Arbeiter",
    meaning: "حجة مالية ضد العمال غير القانونيين",
    keywords: ["gegen = ضد", "finanzielles Argument = حجة مالية", "illegale Arbeiter = عمال غير قانونيين"],
    simplified: "توظيف عامل غير قانوني قد يحرمك من خصومات ضريبية",
    imagine: "💸⚖️ نقود مع ميزان عدالة"
};

HELP_DATA["sprach2_exam22_q4"] = {
    text: "Abgesehen davon, dass es strafbar ist",
    meaning: "بصرف النظر عن كونه يعاقب عليه القانون",
    keywords: ["Abgesehen = بصرف النظر", "davon = عن ذلك", "strafbar = يعاقب عليه"],
    simplified: "العمل تحت الطاولة له عواقب أسوأ من مجرد الغرامات",
    imagine: "🚫👷 علامة منع مع عامل بناء"
};

HELP_DATA["sprach2_exam22_q5"] = {
    text: "Das Finanzamt will eine ordentliche Rechnung sehen",
    meaning: "مكتب الضرائب يريد أن يرى فاتورة منظمة",
    keywords: ["will = يريد", "ordentliche Rechnung = فاتورة منظمة", "Finanzamt = مكتب الضرائب"],
    simplified: "بدون فاتورة، لا خصم ضريبي",
    imagine: "📄🏢 ورقة مع مبنى"
};

HELP_DATA["sprach2_exam22_q6"] = {
    text: "mängelfreie Bauten bilden eher die Ausnahme",
    meaning: "الأبنية الخالية من العيوب تشكل الاستثناء إلى حد ما",
    keywords: ["bilden = تشكل", "Ausnahme = استثناء", "eher = إلى حد ما"],
    simplified: "العمل غير الرسمي غالباً ما يكون دون المستوى المطلوب",
    imagine: "🏚️🔨 منزل متداعٍ مع مطرقة"
};

HELP_DATA["sprach2_exam22_q7"] = {
    text: "Verbraucher leer ausgehen",
    meaning: "يخسر المستهلكون",
    keywords: ["ausgehen = يخسرون", "leer = خاليين", "Verbraucher = مستهلكون"],
    simplified: "إذا انكسر شيء ما، لن تتمكن من استرداد أموالك",
    imagine: "💸😞 نقود مع وجه حزين"
};

HELP_DATA["sprach2_exam22_q8"] = {
    text: "hat für solche Fälle eine Haftpflichtversicherung",
    meaning: "لديه تأمين ضد المسؤولية لمثل هذه الحالات",
    keywords: ["solche = مثل هذه", "Fälle = حالات", "Haftpflichtversicherung = تأمين مسؤولية"],
    simplified: "الحرفي القانوني مؤمن ضد الحوادث",
    imagine: "🛡️🔧 درع مع أداة"
};

HELP_DATA["sprach2_exam22_q9"] = {
    text: "bekommen es gleich mehrere Behörden mit",
    meaning: "تتعامل معه عدة جهات حكومية مرة واحدة",
    keywords: ["bekommen = تتعامل", "mehrere = عدة", "Behörden = جهات حكومية"],
    simplified: "بمجرد اكتشاف الأمر، سيكون لديك مشاكل مع عدة هيئات",
    imagine: "🏛️🏛️🏛️ ثلاثة مبان حكومية"
};

HELP_DATA["sprach2_exam22_q10"] = {
    text: "braucht der Auftraggeber höchstens einen Anwalt",
    meaning: "يحتاج العميل على الأكثر إلى محامٍ",
    keywords: ["höchstens = على الأكثر", "Anwalt = محامٍ", "braucht = يحتاج"],
    simplified: "ستحتاج إلى مساعدة قانونية، وهذا سيكلفك أكثر",
    imagine: "⚖️👨‍⚖️ ميزان عدالة مع قاضي"
};

// ============================================
// Exam 23 (exam23.json) - Schwarzarbeit kann teuer werden (معدل 1)
// ============================================

HELP_DATA["sprach2_exam23_q1"] = {
    text: "anstatt – wie durch das illegale Arbeitsverhältnis erhofft – Geld zu sparen",
    meaning: "بدلاً من توفير المال كما كان مأمولاً من خلال علاقة العمل غير القانونية",
    keywords: ["anstatt = بدلاً من", "sparen = توفير", "illegale = غير قانونية"],
    simplified: "بدلاً من التوفير، قد يدفع العميل ثمناً باهظاً",
    imagine: "💰🚫 نقود وعلامة منع"
};

HELP_DATA["sprach2_exam23_q2"] = {
    text: "ist nicht jede Gelegenheit so günstig, wie sie anfangs scheint",
    meaning: "ليست كل فرصة رخيصة كما تبدو في البداية",
    keywords: ["jede = كل", "Gelegenheit = فرصة", "günstig = رخيصة"],
    simplified: "الصفقات الرخيصة قد تأتي بنتائج عكسية",
    imagine: "🏷️⚠️ بطاقة سعر مع علامة خطر"
};

HELP_DATA["sprach2_exam23_q3"] = {
    text: "ein finanzielles Argument gegen illegale Arbeiter",
    meaning: "حجة مالية ضد العمال غير القانونيين",
    keywords: ["gegen = ضد", "finanzielles Argument = حجة مالية", "illegale Arbeiter = عمال غير قانونيين"],
    simplified: "توظيف عامل غير قانوني قد يحرمك من خصومات ضريبية",
    imagine: "💸⚖️ نقود مع ميزان عدالة"
};

HELP_DATA["sprach2_exam23_q4"] = {
    text: "Abgesehen davon, dass es strafbar ist",
    meaning: "بصرف النظر عن كونه يعاقب عليه القانون",
    keywords: ["Abgesehen = بصرف النظر", "davon = عن ذلك", "strafbar = يعاقب عليه"],
    simplified: "العمل تحت الطاولة له عواقب أسوأ من مجرد الغرامات",
    imagine: "🚫👷 علامة منع مع عامل بناء"
};

HELP_DATA["sprach2_exam23_q5"] = {
    text: "Das Finanzamt will eine ordentliche Rechnung sehen",
    meaning: "مكتب الضرائب يريد أن يرى فاتورة منظمة",
    keywords: ["will = يريد", "ordentliche Rechnung = فاتورة منظمة", "Finanzamt = مكتب الضرائب"],
    simplified: "بدون فاتورة، لا خصم ضريبي",
    imagine: "📄🏢 ورقة مع مبنى"
};

HELP_DATA["sprach2_exam23_q6"] = {
    text: "mängelfreie Bauten wechseln eher die Ausnahme",
    meaning: "الأبنية الخالية من العيوب تشكل الاستثناء إلى حد ما",
    keywords: ["wechseln = تشكل", "Ausnahme = استثناء", "eher = إلى حد ما"],
    simplified: "العمل غير الرسمي غالباً ما يكون دون المستوى المطلوب",
    imagine: "🏚️🔨 منزل متداعٍ مع مطرقة"
};

HELP_DATA["sprach2_exam23_q7"] = {
    text: "Verbraucher leer ausgehen",
    meaning: "يخسر المستهلكون",
    keywords: ["ausgehen = يخسرون", "leer = خاليين", "Verbraucher = مستهلكون"],
    simplified: "إذا انكسر شيء ما، لن تتمكن من استرداد أموالك",
    imagine: "💸😞 نقود مع وجه حزين"
};

HELP_DATA["sprach2_exam23_q8"] = {
    text: "hat für solche Fälle eine Haftpflichtversicherung",
    meaning: "لديه تأمين ضد المسؤولية لمثل هذه الحالات",
    keywords: ["solche = مثل هذه", "Fälle = حالات", "Haftpflichtversicherung = تأمين مسؤولية"],
    simplified: "الحرفي القانوني مؤمن ضد الحوادث",
    imagine: "🛡️🔧 درع مع أداة"
};

HELP_DATA["sprach2_exam23_q9"] = {
    text: "bekommen es gleich mehrere Behörden mit",
    meaning: "تتعامل معه عدة جهات حكومية مرة واحدة",
    keywords: ["bekommen = تتعامل", "mehrere = عدة", "Behörden = جهات حكومية"],
    simplified: "بمجرد اكتشاف الأمر، سيكون لديك مشاكل مع عدة هيئات",
    imagine: "🏛️🏛️🏛️ ثلاثة مبان حكومية"
};

HELP_DATA["sprach2_exam23_q10"] = {
    text: "braucht der Auftraggeber höchstens einen Anwalt",
    meaning: "يحتاج العميل على الأكثر إلى محامٍ",
    keywords: ["höchstens = على الأكثر", "Anwalt = محامٍ", "braucht = يحتاج"],
    simplified: "ستحتاج إلى مساعدة قانونية، وهذا سيكلفك أكثر",
    imagine: "⚖️👨‍⚖️ ميزان عدالة مع قاضي"
};

// ============================================
// Exam 24 (exam24.json) - Schwarzarbeit kann teuer werden (معدل 2)
// ============================================

HELP_DATA["sprach2_exam24_q1"] = {
    text: "anstatt – wie durch das illegale Arbeitsverhältnis erhofft – Geld zu sparen",
    meaning: "بدلاً من توفير المال كما كان مأمولاً من خلال علاقة العمل غير القانونية",
    keywords: ["anstatt = بدلاً من", "sparen = توفير", "illegale = غير قانونية"],
    simplified: "بدلاً من التوفير، قد يدفع العميل ثمناً باهظاً",
    imagine: "💰🚫 نقود وعلامة منع"
};

HELP_DATA["sprach2_exam24_q2"] = {
    text: "ist nicht jede Gelegenheit so günstig, wie sie anfangs scheint",
    meaning: "ليست كل فرصة رخيصة كما تبدو في البداية",
    keywords: ["jede = كل", "Gelegenheit = فرصة", "günstig = رخيصة"],
    simplified: "الصفقات الرخيصة قد تأتي بنتائج عكسية",
    imagine: "🏷️⚠️ بطاقة سعر مع علامة خطر"
};

HELP_DATA["sprach2_exam24_q3"] = {
    text: "ein finanzielles Argument gegen illegale Arbeiter",
    meaning: "حجة مالية ضد العمال غير القانونيين",
    keywords: ["gegen = ضد", "finanzielles Argument = حجة مالية", "illegale Arbeiter = عمال غير قانونيين"],
    simplified: "توظيف عامل غير قانوني قد يحرمك من خصومات ضريبية",
    imagine: "💸⚖️ نقود مع ميزان عدالة"
};

HELP_DATA["sprach2_exam24_q4"] = {
    text: "Abgesehen davon, dass es strafbar ist",
    meaning: "بصرف النظر عن كونه يعاقب عليه القانون",
    keywords: ["Abgesehen = بصرف النظر", "davon = عن ذلك", "strafbar = يعاقب عليه"],
    simplified: "العمل تحت الطاولة له عواقب أسوأ من مجرد الغرامات",
    imagine: "🚫👷 علامة منع مع عامل بناء"
};

HELP_DATA["sprach2_exam24_q5"] = {
    text: "Das Finanzamt will eine ordentliche Rechnung sehen",
    meaning: "مكتب الضرائب يريد أن يرى فاتورة منظمة",
    keywords: ["will = يريد", "ordentliche Rechnung = فاتورة منظمة", "Finanzamt = مكتب الضرائب"],
    simplified: "بدون فاتورة، لا خصم ضريبي",
    imagine: "📄🏢 ورقة مع مبنى"
};

HELP_DATA["sprach2_exam24_q6"] = {
    text: "mängelfreie Bauten wechseln eher die Ausnahme",
    meaning: "الأبنية الخالية من العيوب تشكل الاستثناء إلى حد ما",
    keywords: ["wechseln = تشكل", "Ausnahme = استثناء", "eher = إلى حد ما"],
    simplified: "العمل غير الرسمي غالباً ما يكون دون المستوى المطلوب",
    imagine: "🏚️🔨 منزل متداعٍ مع مطرقة"
};

HELP_DATA["sprach2_exam24_q7"] = {
    text: "Verbraucher leer ausgehen",
    meaning: "يخسر المستهلكون",
    keywords: ["ausgehen = يخسرون", "leer = خاليين", "Verbraucher = مستهلكون"],
    simplified: "إذا انكسر شيء ما، لن تتمكن من استرداد أموالك",
    imagine: "💸😞 نقود مع وجه حزين"
};

HELP_DATA["sprach2_exam24_q8"] = {
    text: "hat für solche Fälle eine Haftpflichtversicherung",
    meaning: "لديه تأمين ضد المسؤولية لمثل هذه الحالات",
    keywords: ["solche = مثل هذه", "Fälle = حالات", "Haftpflichtversicherung = تأمين مسؤولية"],
    simplified: "الحرفي القانوني مؤمن ضد الحوادث",
    imagine: "🛡️🔧 درع مع أداة"
};

HELP_DATA["sprach2_exam24_q9"] = {
    text: "bekommen es gleich mehrere Behörden mit",
    meaning: "تتعامل معه عدة جهات حكومية مرة واحدة",
    keywords: ["bekommen = تتعامل", "mehrere = عدة", "Behörden = جهات حكومية"],
    simplified: "بمجرد اكتشاف الأمر، سيكون لديك مشاكل مع عدة هيئات",
    imagine: "🏛️🏛️🏛️ ثلاثة مبان حكومية"
};

HELP_DATA["sprach2_exam24_q10"] = {
    text: "braucht der Auftraggeber höchstens einen Anwalt",
    meaning: "يحتاج العميل على الأكثر إلى محامٍ",
    keywords: ["höchstens = على الأكثر", "Anwalt = محامٍ", "braucht = يحتاج"],
    simplified: "ستحتاج إلى مساعدة قانونية، وهذا سيكلفك أكثر",
    imagine: "⚖️👨‍⚖️ ميزان عدالة مع قاضي"
};

// ============================================
// Exam 25 (exam25.json) - Teamarbeit als Schlüssel zum Erfolg
// ============================================

HELP_DATA["sprach2_exam25_q1"] = {
    text: "konnte eindrücklich nachweisen",
    meaning: "تمكن من إثبات بشكل مقنع",
    keywords: ["nachweisen = إثبات", "eindrücklich = بشكل مقنع", "konnte = تمكن"],
    simplified: "الباحثون أثبتوا أن الشمبانزي يعمل ضمن فريق",
    imagine: "🐒🤝 قرد يصافح"
};

HELP_DATA["sprach2_exam25_q2"] = {
    text: "dass auch Schimpansen zu echter Teamarbeit fähig sind",
    meaning: "أن الشمبانزي أيضاً قادر على العمل الجماعي الحقيقي",
    keywords: ["zu = قادر على", "echter Teamarbeit = عمل جماعي حقيقي", "fähig = قادر"],
    simplified: "الشمبانزي يفهم أهمية التعاون لحل المشاكل",
    imagine: "🐒🔧 قرد يحل مشكلة"
};

HELP_DATA["sprach2_exam25_q3"] = {
    text: "Dazu bekam einer der beiden Affen zwei Werkzeuge",
    meaning: "لهذا الغرض، حصل أحد القردين على أداتين",
    keywords: ["Dazu = لهذا الغرض", "bekam = حصل", "Werkzeuge = أدوات"],
    simplified: "التجربة صممت لاختبار التعاون",
    imagine: "🔧🔧 أداتان"
};

HELP_DATA["sprach2_exam25_q4"] = {
    text: "musste er aber eines davon an seine Artgenossen weitergeben",
    meaning: "لكنه كان عليه أن يعطي واحدة منهما لأفراد جنسه",
    keywords: ["davon = منهما", "weitergeben = يعطي", "Artgenossen = أفراد جنسه"],
    simplified: "لا يمكنه الحصول على الطعام دون مساعدة شريكه",
    imagine: "🤲🍇 يد تعطي عنباً"
};

HELP_DATA["sprach2_exam25_q5"] = {
    text: "sei es sogar das richtige Werkzeug gewesen",
    meaning: "تبين أنها كانت الأداة الصحيحة",
    keywords: ["sei = كانت", "richtige = الصحيحة", "Werkzeug = أداة"],
    simplified: "في معظم الأوقات، اختار القرد الأداة المناسبة للمهمة",
    imagine: "✅🔧 علامة صح مع أداة"
};

HELP_DATA["sprach2_exam25_q6"] = {
    text: "ob diese Eigenschaft nur beim Menschen vorhanden ist",
    meaning: "ما إذا كانت هذه الخاصية موجودة فقط لدى البشر",
    keywords: ["nur = فقط", "Eigenschaft = خاصية", "vorhanden = موجودة"],
    simplified: "هل التعاون الاستراتيجي حكر على البشر؟",
    imagine: "🧬❓ حمض نووي مع علامة استفهام"
};

HELP_DATA["sprach2_exam25_q7"] = {
    text: "damit die Trauben auf den Boden fielen und die Affen sie fressen konnten",
    meaning: "لكي يسقط العنب على الأرض وتتمكن القرود من أكله",
    keywords: ["konnten = تمكنت", "fressen = أكل", "fielen = سقط"],
    simplified: "الهدف النهائي هو الحصول على العنب",
    imagine: "🍇🐒 عنب مع قرد"
};

HELP_DATA["sprach2_exam25_q8"] = {
    text: "liefert erste Hinweise darauf",
    meaning: "يقدم أولى الدلائل على ذلك",
    keywords: ["liefert = يقدم", "erste = أولى", "Hinweise = دلائل"],
    simplified: "الدراسة تقدم دليلاً جديداً على مهارات الشمبانزي الاجتماعية",
    imagine: "📊🐒 رسم بياني مع قرد"
};

HELP_DATA["sprach2_exam25_q9"] = {
    text: "auf die Handlungen ihres Partners Acht geben können",
    meaning: "يمكنهم الانتباه إلى تصرفات شريكهم",
    keywords: ["Acht geben = الانتباه", "Handlungen = تصرفات", "Partners = شريكهم"],
    simplified: "الشمبانزي يراقب ما يفعله الآخر",
    imagine: "👀🐒 قرد يراقب"
};

HELP_DATA["sprach2_exam25_q10"] = {
    text: "Genau wie den Menschen sei es den Affen möglich",
    meaning: "تماماً مثل البشر، القردة قادرة",
    keywords: ["wie = مثل", "Menschen = البشر", "möglich = قادرة"],
    simplified: "التعاون الاستراتيجي ليس حكراً على البشر",
    imagine: "🔄🐒 استنساخ مع قرد"
};

// ============================================
// Exam 26 (exam26.json) - Teamarbeit als Schlüssel zum Erfolg (معدل)
// ============================================

HELP_DATA["sprach2_exam26_q1"] = {
    text: "konnte eindrücklich nachweisen",
    meaning: "تمكن من إثبات بشكل مقنع",
    keywords: ["nachweisen = إثبات", "eindrücklich = بشكل مقنع", "konnte = تمكن"],
    simplified: "الباحثون أثبتوا أن الشمبانزي يعمل ضمن فريق",
    imagine: "🐒🤝 قرد يصافح"
};

HELP_DATA["sprach2_exam26_q2"] = {
    text: "dass auch Schimpansen zu echter Teamarbeit fähig sind",
    meaning: "أن الشمبانزي أيضاً قادر على العمل الجماعي الحقيقي",
    keywords: ["zu = قادر على", "echter Teamarbeit = عمل جماعي حقيقي", "fähig = قادر"],
    simplified: "الشمبانزي يفهم أهمية التعاون لحل المشاكل",
    imagine: "🐒🔧 قرد يحل مشكلة"
};

HELP_DATA["sprach2_exam26_q3"] = {
    text: "Dazu bekam einer der beiden Affen zwei Werkzeuge",
    meaning: "لهذا الغرض، حصل أحد القردين على أداتين",
    keywords: ["Dazu = لهذا الغرض", "bekam = حصل", "Werkzeuge = أدوات"],
    simplified: "التجربة صممت لاختبار التعاون",
    imagine: "🔧🔧 أداتان"
};

HELP_DATA["sprach2_exam26_q4"] = {
    text: "musste er aber eines davon an seine Artgenossen weitergeben",
    meaning: "لكنه كان عليه أن يعطي واحدة منهما لأفراد جنسه",
    keywords: ["davon = منهما", "weitergeben = يعطي", "Artgenossen = أفراد جنسه"],
    simplified: "لا يمكنه الحصول على الطعام دون مساعدة شريكه",
    imagine: "🤲🍇 يد تعطي عنباً"
};

HELP_DATA["sprach2_exam26_q5"] = {
    text: "sei es sogar das richtige Werkzeug gewesen",
    meaning: "تبين أنها كانت الأداة الصحيحة",
    keywords: ["sei = كانت", "richtige = الصحيحة", "Werkzeug = أداة"],
    simplified: "في معظم الأوقات، اختار القرد الأداة المناسبة للمهمة",
    imagine: "✅🔧 علامة صح مع أداة"
};

HELP_DATA["sprach2_exam26_q6"] = {
    text: "ob diese Eigenschaft nur beim Menschen vorhanden ist",
    meaning: "ما إذا كانت هذه الخاصية موجودة فقط لدى البشر",
    keywords: ["nur = فقط", "Eigenschaft = خاصية", "vorhanden = موجودة"],
    simplified: "هل التعاون الاستراتيجي حكر على البشر؟",
    imagine: "🧬❓ حمض نووي مع علامة استفهام"
};

HELP_DATA["sprach2_exam26_q7"] = {
    text: "damit die Trauben auf den Boden fielen und die Affen sie fressen konnten",
    meaning: "لكي يسقط العنب على الأرض وتتمكن القرود من أكله",
    keywords: ["konnten = تمكنت", "fressen = أكل", "fielen = سقط"],
    simplified: "الهدف النهائي هو الحصول على العنب",
    imagine: "🍇🐒 عنب مع قرد"
};

HELP_DATA["sprach2_exam26_q8"] = {
    text: "liefert erste Hinweise darauf",
    meaning: "يقدم أولى الدلائل على ذلك",
    keywords: ["liefert = يقدم", "erste = أولى", "Hinweise = دلائل"],
    simplified: "الدراسة تقدم دليلاً جديداً على مهارات الشمبانزي الاجتماعية",
    imagine: "📊🐒 رسم بياني مع قرد"
};

HELP_DATA["sprach2_exam26_q9"] = {
    text: "auf die Handlungen ihres Partners Acht geben können",
    meaning: "يمكنهم الانتباه إلى تصرفات شريكهم",
    keywords: ["Acht geben = الانتباه", "Handlungen = تصرفات", "Partners = شريكهم"],
    simplified: "الشمبانزي يراقب ما يفعله الآخر",
    imagine: "👀🐒 قرد يراقب"
};

HELP_DATA["sprach2_exam26_q10"] = {
    text: "Genau wie den Menschen sei es den Affen möglich",
    meaning: "تماماً مثل البشر، القردة قادرة",
    keywords: ["wie = مثل", "Menschen = البشر", "möglich = قادرة"],
    simplified: "التعاون الاستراتيجي ليس حكراً على البشر",
    imagine: "🔄🐒 استنساخ مع قرد"
};

// ============================================
// Exam 27 (exam27.json) - Wie Handschrift wieder cool wird (معدل)
// ============================================

HELP_DATA["sprach2_exam27_q1"] = {
    text: "weil Schreiben mit der Hand ungewohnt ist",
    meaning: "لأن الكتابة باليد غير معتادة",
    keywords: ["weil = لأن", "ungewohnt = غير معتادة", "Schreiben = الكتابة"],
    simplified: "نادراً ما يستخدم الأطفال أيديهم للكتابة، فيصابون بالتعب بسرعة",
    imagine: "✍️😖 كتابة ووجه متألم"
};

HELP_DATA["sprach2_exam27_q2"] = {
    text: "haben damit in der Schule immer mehr Probleme",
    meaning: "يعانون من مشاكل متزايدة في المدرسة",
    keywords: ["immer = متزايدة", "mehr = أكثر", "Probleme = مشاكل"],
    simplified: "ضعف قوة اليد يسبب صعوبات في أداء الواجبات المدرسية",
    imagine: "📝😞 قلم ووجه حزين"
};

HELP_DATA["sprach2_exam27_q3"] = {
    text: "der mit Handschrift zu tun hat",
    meaning: "الذي له علاقة بالكتابة اليدوية",
    keywords: ["tun = علاقة", "Handschrift = كتابة يدوية", "hat = له"],
    simplified: "هناك اتجاه جديد يركز على الرسم بالحروف",
    imagine: "🖌️✨ فرشاة ونجوم"
};

HELP_DATA["sprach2_exam27_q4"] = {
    text: "wie es früher unterrichtet und von einigen auch gefürchtet wurde",
    meaning: "كما تم تدريسه قديماً وكان يخشاه البعض أيضاً",
    keywords: ["wurde = كان", "unterrichtet = مدروساً", "gefürchtet = يخشاه"],
    simplified: "الخط الكلاسيكي الجميل لم يعد يُمارس أو يُدرس",
    imagine: "✒️😟 قلم حبر قديم ووجه قلق"
};

HELP_DATA["sprach2_exam27_q5"] = {
    text: "Die Verbindung von Schrift und Bild",
    meaning: "الربط بين الكتابة والصورة",
    keywords: ["von = بين", "Schrift = كتابة", "Bild = صورة"],
    simplified: "تقنية Lettering تدمج بين الرسم والكتابة",
    imagine: "🖼️✍️ صورة وقلم"
};

HELP_DATA["sprach2_exam27_q6"] = {
    text: "Erfahrungen damit hat auch die Wiener Designerin gemacht",
    meaning: "لديها خبرة بذلك أيضاً مصممة فيينا",
    keywords: ["damit = بذلك", "Erfahrungen = خبرة", "gemacht = لديها"],
    simplified: "مصممة محترفة تقدم ورشاً لتعليم Lettering للأطفال والكبار",
    imagine: "👩‍🎨🎨 فنانة ولوحة"
};

HELP_DATA["sprach2_exam27_q7"] = {
    text: "Auf spielerische Weise vermittelt die Künstlerin das Thema Schrift",
    meaning: "بطريقة مرحة تنقل الفنانة موضوع الكتابة",
    keywords: ["spielerische = مرحة", "vermittelt = تنقل", "Künstlerin = فنانة"],
    simplified: "التعلم عبر اللعب يجعل الكتابة اليدوية ممتعة مرة أخرى",
    imagine: "🎨🧸 لوحة وألعاب"
};

HELP_DATA["sprach2_exam27_q8"] = {
    text: "dass Kinder die Freude am Schreiben wieder entdecken",
    meaning: "أن يعيد الأطفال اكتشاف متعة الكتابة",
    keywords: ["dass = أن", "entdecken = اكتشاف", "Freude = متعة"],
    simplified: "شغف الفنانة هو إعادة الحماس للكتابة لدى الصغار",
    imagine: "😊✍️ وجه مبتسم مع قلم"
};

HELP_DATA["sprach2_exam27_q9"] = {
    text: "coole Einladungen und Logos zu gestalten",
    meaning: "تصميم دعوات وشعارات رائعة",
    keywords: ["gestalten = تصميم", "Einladungen = دعوات", "Logos = شعارات"],
    simplified: "التطبيق العملي للـ Lettering مفيد للحفلات والعلامات التجارية",
    imagine: "💌🎨 بطاقة دعوة وفرشاة"
};

HELP_DATA["sprach2_exam27_q10"] = {
    text: "bis ihnen das flüssig von der Hand geht",
    meaning: "حتى يصبح الأمر طليقاً لديهم",
    keywords: ["geht = يصبح", "flüssig = طليقاً", "Hand = يد"],
    simplified: "التدريب على أجزاء الحرف يبني الطلاقة أولاً",
    imagine: "✍️💧 قلم وقطرة ماء"
};

// ============================================
// Exam 28 (exam28.json) - Wie Handschrift wieder cool wird
// ============================================

HELP_DATA["sprach2_exam28_q1"] = {
    text: "weil Handschrift ungewohnt ist",
    meaning: "لأن الكتابة اليدوية غير معتادة",
    keywords: ["weil = لأن", "ungewohnt = غير معتادة", "Handschrift = كتابة يدوية"],
    simplified: "نادراً ما يستخدم الأطفال أيديهم للكتابة، فيصابون بالتعب بسرعة",
    imagine: "✍️😖 كتابة ووجه متألم"
};

HELP_DATA["sprach2_exam28_q2"] = {
    text: "haben mit dem Schreiben in der Schule immer mehr Probleme",
    meaning: "يعانون من مشاكل متزايدة في الكتابة بالمدرسة",
    keywords: ["immer = متزايدة", "mehr = أكثر", "Probleme = مشاكل"],
    simplified: "ضعف قوة اليد يسبب صعوبات في أداء الواجبات المدرسية",
    imagine: "📝😞 قلم ووجه حزين"
};

HELP_DATA["sprach2_exam28_q3"] = {
    text: "der mit Handschrift zu tun hat",
    meaning: "الذي له علاقة بالكتابة اليدوية",
    keywords: ["tun = علاقة", "Handschrift = كتابة يدوية", "hat = له"],
    simplified: "هناك اتجاه جديد يركز على الرسم بالحروف",
    imagine: "🖌️✨ فرشاة ونجوم"
};

HELP_DATA["sprach2_exam28_q4"] = {
    text: "Erfahrungen damit hat die Wiener Designerin gemacht",
    meaning: "لديها خبرة بذلك مصممة فيينا",
    keywords: ["damit = بذلك", "Erfahrungen = خبرة", "gemacht = لديها"],
    simplified: "مصممة محترفة تقدم ورشاً لتعليم الكتابة الجميلة",
    imagine: "👩‍🎨🖌️ فنانة وفرشاة"
};

HELP_DATA["sprach2_exam28_q5"] = {
    text: "Auf spielerische Weise vermittelt die Künstlerin das Thema Schrift",
    meaning: "بطريقة مرحة تنقل الفنانة موضوع الكتابة",
    keywords: ["spielerische = مرحة", "vermittelt = تنقل", "Künstlerin = فنانة"],
    simplified: "التعلم عبر اللعب يجعل الكتابة اليدوية ممتعة مرة أخرى",
    imagine: "🎨🧸 لوحة وألعاب"
};

HELP_DATA["sprach2_exam28_q6"] = {
    text: "dass Kinder die Freude am Schreiben wiederentdecken",
    meaning: "أن يعيد الأطفال اكتشاف متعة الكتابة",
    keywords: ["dass = أن", "wiederentdecken = إعادة اكتشاف", "Freude = متعة"],
    simplified: "شغف الفنانة هو إعادة الحماس للكتابة لدى الصغار",
    imagine: "😊✍️ وجه مبتسم مع قلم"
};

HELP_DATA["sprach2_exam28_q7"] = {
    text: "die eigene Handschrift zu beurteilen und zu gestalten",
    meaning: "تقييم وتصميم خط اليد الخاص بهم",
    keywords: ["gestalten = تصميم", "beurteilen = تقييم", "eigene Handschrift = خط يدهم الخاص"],
    simplified: "المراهقون يمكنهم تحسين وتطوير خطهم",
    imagine: "📝🔍 قلم وعدسة مكبرة"
};

HELP_DATA["sprach2_exam28_q8"] = {
    text: "bis ihnen das flüssig von der Hand geht",
    meaning: "حتى يصبح الأمر طليقاً لديهم",
    keywords: ["geht = يصبح", "flüssig = طليقاً", "Hand = يد"],
    simplified: "التدريب على أجزاء الحرف يبني الطلاقة أولاً",
    imagine: "✍️💧 قلم وقطرة ماء"
};

HELP_DATA["sprach2_exam28_q9"] = {
    text: "Die Verbindung von Schrift und Bild",
    meaning: "الربط بين الكتابة والصورة",
    keywords: ["von = بين", "Schrift = كتابة", "Bild = صورة"],
    simplified: "تقنية Lettering تدمج بين الرسم والكتابة",
    imagine: "🖼️✍️ صورة وقلم"
};

HELP_DATA["sprach2_exam28_q10"] = {
    text: "wie es früher unterrichtet und von einigen auch gefürchtet wurde",
    meaning: "كما تم تدريسه قديماً وكان يخشاه البعض أيضاً",
    keywords: ["wurde = كان", "unterrichtet = مدروساً", "gefürchtet = يخشاه"],
    simplified: "الخط الكلاسيكي الجميل لم يعد يُمارس أو يُدرس",
    imagine: "✒️😟 قلم حبر قديم ووجه قلق"
};

// ============================================
// Exam 29 (exam29.json) - Ausbildung mit über 30
// ============================================

HELP_DATA["sprach2_exam29_q1"] = {
    text: "Denn sie hat sich für einen beruflichen Neustart entschieden",
    meaning: "لأنها قررت بداية مهنية جديدة",
    keywords: ["Denn = لأن", "Neustart = بداية جديدة", "beruflichen = مهنية"],
    simplified: "قررت تغيير حياتها المهنية بالكامل",
    imagine: "🔄💼 عكس مسار مع حقيبة عمل"
};

HELP_DATA["sprach2_exam29_q2"] = {
    text: "möchte in den Streifendienst gehen",
    meaning: "ترغب في الذهاب إلى خدمة الدوريات",
    keywords: ["möchte = ترغب", "Streifendienst = خدمة دوريات", "gehen = الذهاب"],
    simplified: "تحلم بالعمل على أرض الواقع كضابطة شرطة",
    imagine: "👮‍♀️🚓 ضابطة شرطة"
};

HELP_DATA["sprach2_exam29_q3"] = {
    text: "da es heute in vielen Branchen aber an Nachwuchs fehlt",
    meaning: "لأنه في كثير من القطاعات اليوم هناك نقص في الكوادر الشابة",
    keywords: ["da = لأن", "Nachwuchs = كوادر شابة", "fehlt = نقص"],
    simplified: "يبحث أصحاب العمل الآن عن أي شخص مؤهل، بغض النظر عن العمر",
    imagine: "👥🔍 بحث عن موظفين"
};

HELP_DATA["sprach2_exam29_q4"] = {
    text: "geben sie öfter auch Älteren eine Chance",
    meaning: "يعطون فرصة أيضاً لكبار السن",
    keywords: ["Chance = فرصة", "Älteren = كبار السن", "geben = يعطون"],
    simplified: "فرص العمل متاحة الآن لمن تجاوزوا الثلاثين",
    imagine: "📄✅ استمارة طلب وظيفة"
};

HELP_DATA["sprach2_exam29_q5"] = {
    text: "warum sein Arbeitgeber gerne Ältere ausbildet",
    meaning: "لماذا يُدرب صاحب عمله كبار السن بكل سرور",
    keywords: ["warum = لماذا", "ausbildet = يُدرب", "gerne = بكل سرور"],
    simplified: "شرطة برلين تشرح فوائد توظيف المتدربين الأكبر سناً",
    imagine: "👮‍♂️📋 شرطي مع قائمة"
};

HELP_DATA["sprach2_exam29_q6"] = {
    text: "außerdem bereit, Verantwortung zu übernehmen",
    meaning: "بالإضافة إلى ذلك هم على استعداد لتحمل المسؤولية",
    keywords: ["übernehmen = تحمل", "Verantwortung = مسؤولية", "bereit = على استعداد"],
    simplified: "كبار السن موثوقون وجادون في عملهم",
    imagine: "🎯✅ هدف مع علامة صح"
};

HELP_DATA["sprach2_exam29_q7"] = {
    text: "könnten die Jüngeren unterstützen",
    meaning: "يمكنهم دعم الصغار",
    keywords: ["könnten = يمكنهم", "unterstützen = دعم", "Jüngeren = الصغار"],
    simplified: "الموظفون الأكبر سناً هم مرشدون ممتازون",
    imagine: "👨‍🏫🤝 مرشد يوجه"
};

HELP_DATA["sprach2_exam29_q8"] = {
    text: "stehen",
    meaning: "متاحين للعمل",
    keywords: ["stehen = متاحين", "Verfügung = للعمل", "zur = لـ"],
    simplified: "العيب الوحيد هو أنهم قد يتقاعدون مبكراً",
    imagine: "🕒➡️🚪 وقت المغادرة"
};

HELP_DATA["sprach2_exam29_q9"] = {
    text: "Trotzdem haben ältere Azubis in vielen Bereichen Möglichkeiten",
    meaning: "مع ذلك، لدى المتدربين الأكبر سناً فرص في العديد من المجالات",
    keywords: ["Trotzdem = مع ذلك", "Möglichkeiten = فرص", "ältere Azubis = متدربين أكبر سناً"],
    simplified: "الخيارات الوظيفية متاحة رغم العمر",
    imagine: "🗂️✨ ملفات ونجوم"
};

HELP_DATA["sprach2_exam29_q10"] = {
    text: "sondern es wird der individuelle Bedarf ermittelt",
    meaning: "بل يتم تحديد الاحتياج الفردي",
    keywords: ["sondern = بل", "individuelle = فردي", "Bedarf = احتياج"],
    simplified: "الدعم الحكومي يعتمد على احتياجاتك وليس عمرك",
    imagine: "🎯📊 استهداف وبيانات"
};

// ============================================
// Exam 30 (exam30.json) - Verlernen die Deutschen die Höflichkeit?
// ============================================

HELP_DATA["sprach2_exam30_q1"] = {
    text: "stimmen dieser Behauptung zu",
    meaning: "يوافقون على هذا الادعاء",
    keywords: ["stimmen = يوافقون", "Behauptung = ادعاء", "zu = على"],
    simplified: "ثلاثة أرباع الألمان يشعرون أن الأدب في تراجع",
    imagine: "📉👋 رسم بياني هابط ومصافحة"
};

HELP_DATA["sprach2_exam30_q2"] = {
    text: "meinen einer Umfrage zufolge 75 Prozent der Befragten",
    meaning: "يعتقد 75 بالمئة من المشاركين وفقاً لاستبيان",
    keywords: ["meinen = يعتقدون", "Umfrage = استبيان", "zufolge = وفقاً لـ"],
    simplified: "الجيل الأكبر يعتقد أن الشباب أقل احتراماً",
    imagine: "📋👥 قائمة استبيان مع مجموعة أشخاص"
};

HELP_DATA["sprach2_exam30_q3"] = {
    text: "der Wunsch nach gewissen Höflichkeitsformen",
    meaning: "الرغبة في بعض أشكال الأدب",
    keywords: ["nach = في", "gewissen = بعض", "Höflichkeitsformen = أشكال أدب"],
    simplified: "الصغار والكبار متفقون على ضرورة وجود بعض قواعد المجاملة",
    imagine: "🤝✅ مصافحة مع علامة صح"
};

HELP_DATA["sprach2_exam30_q4"] = {
    text: "für ein höfliches Miteinander",
    meaning: "للتفاعل المهذب معاً",
    keywords: ["miteinander = معاً", "höfliches = مهذب", "für = لـ"],
    simplified: "القواعد الواضحة تجعل العلاقات الاجتماعية أسهل للجميع",
    imagine: "👥🤝 مجموعة محددة"
};

HELP_DATA["sprach2_exam30_q5"] = {
    text: "sucht man sie oft vergeblich",
    meaning: "غالباً ما يبحث عنها المرء دون جدوى",
    keywords: ["vergeblich = دون جدوى", "sucht = يبحث", "oft = غالباً"],
    simplified: "من الصعب معرفة متى تنادي شخصاً بـ 'أنت' أو 'حضرتك'",
    imagine: "🔍❓ بحث وعلامة استفهام"
};

HELP_DATA["sprach2_exam30_q6"] = {
    text: "Gut die Hälfte der Deutschen gibt zu",
    meaning: "نصف الألمان يعترفون",
    keywords: ["Gut die Hälfte = نصف", "gibt zu = يعترفون", "Deutschen = الألمان"],
    simplified: "نصف الألمان مرتبكون بشأن آداب التحية",
    imagine: "🗣️😕 حوار ووجه حائر"
};

HELP_DATA["sprach2_exam30_q7"] = {
    text: "als normal oder sogar angenehm empfinden mögen",
    meaning: "قد يعتبرونها طبيعية أو حتى لطيفة",
    keywords: ["mögen = قد", "angenehm = لطيفة", "normal = طبيعية"],
    simplified: "الشباب لا يمانعون النادل الذي يناديهم بـ 'أنت'",
    imagine: "👨‍🍳👋 نادل يلوح"
};

HELP_DATA["sprach2_exam30_q8"] = {
    text: "besonders Ältere stören sich am ungefragten Duzen",
    meaning: "كبار السن تحديداً ينزعجون من مخاطبة 'أنت' غير المرغوب فيها",
    keywords: ["stören = ينزعجون", "gefragten Duzen = مخاطبة 'أنت'", "Ältere = كبار السن"],
    simplified: "الكثير من الناس فوق سن الخمسين يكرهون أن يناديهم الغرباء بـ 'أنت'",
    imagine: "👴😠 رجل كبير غاضب"
};

HELP_DATA["sprach2_exam30_q9"] = {
    text: "dass Männer Frauen die Tür aufhalten und ihnen den Vortritt lassen",
    meaning: "أن يمسك الرجال الباب للنساء ويتركونهم يتقدمون",
    keywords: ["lassen = يتركون", "Vortritt = يتقدمون", "aufhalten = يمسكون"],
    simplified: "بعض قواعد المجاملة التقليدية لا تزال حية",
    imagine: "🚪👨‍🦰👩 رجل يمسك باباً لامرأة"
};

HELP_DATA["sprach2_exam30_q10"] = {
    text: "wenn man weiß, was sich gehört",
    meaning: "إذا كان المرء يعرف ما هو مناسب",
    keywords: ["sich = ما", "gehört = مناسب", "weiß = يعرف"],
    simplified: "من الغريب أن ندرك كل هذه القواعد ولكننا لا نطبقها",
    imagine: "📖🤷 كتاب وعلامة استفهام"
};
// ============================================
// Exam 31 (exam31.json) - Joggen: Mehr als nur Laufen
// ============================================

HELP_DATA["sprach2_exam31_q1"] = {
    text: "Das moderne Leben ist bequem geworden",
    meaning: "أصبحت الحياة الحديثة مريحة",
    keywords: ["bequem = مريحة", "Leben = حياة", "moderne = حديثة"],
    simplified: "الحياة الحديثة تجعلنا نتحرك أقل ونعتمد على الراحة أكثر",
    imagine: "🛋️📺 أريكة وتلفاز"
};

HELP_DATA["sprach2_exam31_q2"] = {
    text: "Herz-Kreislauf-Erkrankungen sind in den westlichen Industrieländern mittlerweile die Todesursache Nummer Eins",
    meaning: "أمراض القلب والأوعية الدموية هي الآن السبب الأول للوفاة في الدول الصناعية الغربية",
    keywords: ["sind = هي", "Todesursache = سبب وفاة", "Herz-Kreislauf-Erkrankungen = أمراض قلب"],
    simplified: "أمراض القلب أصبحت القاتل الأول في الغرب الصناعي",
    imagine: "❤️📈 قلب مع رسم بياني مرتفع"
};

HELP_DATA["sprach2_exam31_q3"] = {
    text: "Wichtig ist immer richtig zu trainieren",
    meaning: "من المهم دائماً أن تتدرب بشكل صحيح",
    keywords: ["immer = دائماً", "richtig = بشكل صحيح", "trainieren = تتدرب"],
    simplified: "التدريب السليم أهم من مجرد التحرك",
    imagine: "🏋️✅ تمارين رياضية وعلامة صح"
};

HELP_DATA["sprach2_exam31_q4"] = {
    text: "Ausdauertraining unter Verbrennung von Sauerstoff",
    meaning: "تدريب التحمل مع حرق الأكسجين",
    keywords: ["unter = مع", "Verbrennung = حرق", "Sauerstoff = أكسجين"],
    simplified: "الجري يحسن كفاءة استخدام جسمك للأكسجين",
    imagine: "💨🔥 هواء ونار"
};

HELP_DATA["sprach2_exam31_q5"] = {
    text: "Dabei sollte der Puls kontrolliert werden",
    meaning: "يجب أن يُراقب النبض أثناء ذلك",
    keywords: ["sollte = يجب", "kontrolliert = يُراقب", "Puls = نبض"],
    simplified: "الحفاظ على معدل ضربات قلب صحيح يمنع الإصابات ويزيد من حرق الدهون",
    imagine: "💓📊 نبضات قلب ورسم بياني"
};

HELP_DATA["sprach2_exam31_q6"] = {
    text: "dass mehr Menschen den Schritt in ein aktiveres Leben wagen sollten",
    meaning: "أنه يجب على المزيد من الناس أن يخطوا خطوة نحو حياة أكثر نشاطاً",
    keywords: ["dass = أنه", "Schritt = خطوة", "aktiveres Leben = حياة أكثر نشاطاً"],
    simplified: "يجب على الجميع تحدي الكسل وقلة الحركة",
    imagine: "🚶‍♂️💪 رجل يمشي وذراع قوي"
};

HELP_DATA["sprach2_exam31_q7"] = {
    text: "Rund 40 Prozent aller Deutschen bringen zu viel auf die Waage",
    meaning: "حوالي 40 بالمئة من كل الألمان يعانون من الوزن الزائد",
    keywords: ["aller = كل", "Deutschen = الألمان", "zu viel auf die Waage = وزن زائد"],
    simplified: "نصف الألمان تقريباً يعانون من السمنة",
    imagine: "⚖️🍔 ميزان وبرغر"
};

HELP_DATA["sprach2_exam31_q8"] = {
    text: "nicht selten mit einem Herzinfarkt",
    meaning: "ليس نادراً بنوبة قلبية",
    keywords: ["einem = بنوبة", "Herzinfarkt = نوبة قلبية", "mit = بـ"],
    simplified: "قلة الحركة تؤدي إلى أمراض القلب والسكري",
    imagine: "❤️⚠️ قلب وعلامة خطر"
};

HELP_DATA["sprach2_exam31_q9"] = {
    text: "auch, und immer häufiger bei Frauen",
    meaning: "أيضاً، وبشكل متزايد لدى النساء",
    keywords: ["bei = لدى", "häufiger = بشكل متزايد", "Frauen = نساء"],
    simplified: "النساء الآن أكثر عرضة من أي وقت مضى للإصابة بأمراض القلب",
    imagine: "👩❤️ امرأة وقلب"
};

HELP_DATA["sprach2_exam31_q10"] = {
    text: "wie Milch und Milchprodukte, pflanzliche Lebensmittel",
    meaning: "مثل الحليب ومنتجات الألبان والأطعمة النباتية",
    keywords: ["wie = مثل", "Milch = حليب", "pflanzliche Lebensmittel = أطعمة نباتية"],
    simplified: "النظام الغذائي الصحي يعمل جنباً إلى جنب مع التمارين الرياضية",
    imagine: "🥛🥗 حليب وسلطة"
};

// ============================================
// Exam 32 (exam32.json) - Der klügste Freund des Menschen
// ============================================

HELP_DATA["sprach2_exam32_q1"] = {
    text: "gilt der Hund zwar als treuer Begleiter",
    meaning: "يُعتبر الكلب بالفعل رفيقاً مخلصاً",
    keywords: ["zwar = بالفعل", "treuer Begleiter = رفيق مخلص", "gilt = يُعتبر"],
    simplified: "منذ زمن طويل، الكلب هو أفضل صديق للإنسان",
    imagine: "🐕🤝 كلب ومصافحة"
};

HELP_DATA["sprach2_exam32_q2"] = {
    text: "durchgeführt wurden",
    meaning: "تم تنفيذها",
    keywords: ["wurden = تم", "durchgeführt = تنفيذ", "Untersuchungen = دراسات"],
    simplified: "الدراسة أجريت في جامعات مرموقة",
    imagine: "🔬🏛️ مختبر ومبنى جامعي"
};

HELP_DATA["sprach2_exam32_q3"] = {
    text: "lesen kommunikative Informationen besonders an den Augen ab",
    meaning: "يقرؤون المعلومات التواصلية خاصة من العيون",
    keywords: ["ab = من", "Augen = عيون", "lesen = يقرؤون"],
    simplified: "الكلاب بارعة في قراءة انتباهك من خلال عينيك",
    imagine: "🐕👀 كلب وعينان"
};

HELP_DATA["sprach2_exam32_q4"] = {
    text: "sie reagieren auch auf die Stimme und die Körpersprache",
    meaning: "يتفاعلون أيضاً مع الصوت ولغة الجسد",
    keywords: ["auf = مع", "Stimme = صوت", "Körpersprache = لغة جسد"],
    simplified: "يستجيب الكلب لنبرة صوتك وحركات جسدك",
    imagine: "🗣️🐕 كلام وكلب"
};

HELP_DATA["sprach2_exam32_q5"] = {
    text: "Ganz besonders der Blickkontakt sei für Hunde ein wichtiges Instrument",
    meaning: "الاتصال البصري مهم بشكل خاص للكلاب كأداة مهمة",
    keywords: ["sei = يكون", "wichtiges Instrument = أداة مهمة", "Blickkontakt = اتصال بصري"],
    simplified: "الكلاب تستخدم التواصل البصري لجمع المعلومات عن البشر",
    imagine: "👀🐕 عينان مع كلب"
};

HELP_DATA["sprach2_exam32_q6"] = {
    text: "War der Behälter nach dem Öffnen leer",
    meaning: "إذا كانت الحاوية فارغة بعد الفتح",
    keywords: ["War = كان", "leer = فارغة", "Öffnen = فتح"],
    simplified: "تفهم الكلاب مفهوم الأشياء المخفية",
    imagine: "📦🤔 صندوق وعلامة استفهام"
};

HELP_DATA["sprach2_exam32_q7"] = {
    text: "er leitet sie um Hindernisse herum",
    meaning: "يقودهم حول العوائق",
    keywords: ["um = حول", "Hindernisse = عوائق", "herum = حول"],
    simplified: "كلب الدليل حذق في إيجاد مسارات آمنة",
    imagine: "🦯🐕 عصا وكلب"
};

HELP_DATA["sprach2_exam32_q8"] = {
    text: "geht man davon aus",
    meaning: "يُفترض",
    keywords: ["davon = ذلك", "aus = من", "geht aus = يُفترض"],
    simplified: "الدراسات الجينية تكشف أصل الكلاب",
    imagine: "🧬🐕 حمض نووي وكلب"
};

HELP_DATA["sprach2_exam32_q9"] = {
    text: "können also stolz darauf sein",
    meaning: "يمكنهم بالتالي أن يفخروا بذلك",
    keywords: ["darauf = بذلك", "stolz = فخورين", "sein = يكونوا"],
    simplified: "أصحاب الكلاب اليوم لديهم سبب حقيقي للفخر",
    imagine: "🏆🐕 كأس وكلب"
};

HELP_DATA["sprach2_exam32_q10"] = {
    text: "nicht nur einen anhänglichen, sondern auch einen intelligenten Begleiter",
    meaning: "ليس فقط رفيقاً مخلصاً، بل أيضاً رفيقاً ذكياً",
    keywords: ["sondern = بل", "intelligent = ذكياً", "anhänglichen = مخلصاً"],
    simplified: "الكلب ليس وفيّاً فحسب، بل هو رفيق ذكي",
    imagine: "🧠🐕 دماغ وكلب"
};

// ============================================
// Exam 33 (exam33.json) - Der klügste Freund des Menschen (معدل)
// ============================================

HELP_DATA["sprach2_exam33_q1"] = {
    text: "gilt der Hund zwar als treuer Begleiter",
    meaning: "يُعتبر الكلب بالفعل رفيقاً مخلصاً",
    keywords: ["zwar = بالفعل", "treuer Begleiter = رفيق مخلص", "gilt = يُعتبر"],
    simplified: "منذ زمن طويل، الكلب هو أفضل صديق للإنسان",
    imagine: "🐕🤝 كلب ومصافحة"
};

HELP_DATA["sprach2_exam33_q2"] = {
    text: "durchgeführt wurden",
    meaning: "تم تنفيذها",
    keywords: ["wurden = تم", "durchgeführt = تنفيذ", "Untersuchungen = دراسات"],
    simplified: "الدراسة أجريت في جامعات مرموقة",
    imagine: "🔬🏛️ مختبر ومبنى جامعي"
};

HELP_DATA["sprach2_exam33_q3"] = {
    text: "lesen kommunikative Informationen besonders an den Augen ab",
    meaning: "يقرؤون المعلومات التواصلية خاصة من العيون",
    keywords: ["ab = من", "Augen = عيون", "lesen = يقرؤون"],
    simplified: "الكلاب بارعة في قراءة انتباهك من خلال عينيك",
    imagine: "🐕👀 كلب وعينان"
};

HELP_DATA["sprach2_exam33_q4"] = {
    text: "sie reagieren auch auf die Stimme und die Körpersprache",
    meaning: "يتفاعلون أيضاً مع الصوت ولغة الجسد",
    keywords: ["auf = مع", "Stimme = صوت", "Körpersprache = لغة جسد"],
    simplified: "يستجيب الكلب لنبرة صوتك وحركات جسدك",
    imagine: "🗣️🐕 كلام وكلب"
};

HELP_DATA["sprach2_exam33_q5"] = {
    text: "Ganz besonders der Blickkontakt sei für Hunde ein wichtiges Instrument",
    meaning: "الاتصال البصري مهم بشكل خاص للكلاب كأداة مهمة",
    keywords: ["sei = يكون", "wichtiges Instrument = أداة مهمة", "Blickkontakt = اتصال بصري"],
    simplified: "الكلاب تستخدم التواصل البصري لجمع المعلومات عن البشر",
    imagine: "👀🐕 عينان مع كلب"
};

HELP_DATA["sprach2_exam33_q6"] = {
    text: "War der Behälter nach dem Öffnen leer",
    meaning: "إذا كانت الحاوية فارغة بعد الفتح",
    keywords: ["War = كان", "leer = فارغة", "Öffnen = فتح"],
    simplified: "تفهم الكلاب مفهوم الأشياء المخفية",
    imagine: "📦🤔 صندوق وعلامة استفهام"
};

HELP_DATA["sprach2_exam33_q7"] = {
    text: "er leitet sie um Hindernisse herum",
    meaning: "يقودهم حول العوائق",
    keywords: ["um = حول", "Hindernisse = عوائق", "herum = حول"],
    simplified: "كلب الدليل حذق في إيجاد مسارات آمنة",
    imagine: "🦯🐕 عصا وكلب"
};

HELP_DATA["sprach2_exam33_q8"] = {
    text: "geht man davon aus",
    meaning: "يُفترض",
    keywords: ["davon = ذلك", "aus = من", "geht aus = يُفترض"],
    simplified: "الدراسات الجينية تكشف أصل الكلاب",
    imagine: "🧬🐕 حمض نووي وكلب"
};

HELP_DATA["sprach2_exam33_q9"] = {
    text: "können also stolz darauf sein",
    meaning: "يمكنهم بالتالي أن يفخروا بذلك",
    keywords: ["darauf = بذلك", "stolz = فخورين", "sein = يكونوا"],
    simplified: "أصحاب الكلاب اليوم لديهم سبب حقيقي للفخر",
    imagine: "🏆🐕 كأس وكلب"
};

HELP_DATA["sprach2_exam33_q10"] = {
    text: "nicht nur einen anhänglichen, sondern auch einen intelligenten Begleiter",
    meaning: "ليس فقط رفيقاً مخلصاً، بل أيضاً رفيقاً ذكياً",
    keywords: ["sondern = بل", "intelligent = ذكياً", "anhänglichen = مخلصاً"],
    simplified: "الكلب ليس وفيّاً فحسب، بل هو رفيق ذكي",
    imagine: "🧠🐕 دماغ وكلب"
};

// ============================================
// Exam 34 (exam34.json) - Manipulierte Bilder
// ============================================

HELP_DATA["sprach2_exam34_q1"] = {
    text: "mit einer Flut von Fotos konfrontiert",
    meaning: "نواجه طوفاناً من الصور",
    keywords: ["Flut = طوفان", "Fotos = صور", "konfrontiert = نواجه"],
    simplified: "كمية هائلة من الصور تغمرنا يومياً",
    imagine: "🌊📸 أمواج وكاميرا"
};

HELP_DATA["sprach2_exam34_q2"] = {
    text: "machen es sogar für Laien recht einfach",
    meaning: "تجعلها سهلة جداً حتى للهواة",
    keywords: ["recht = جداً", "einfach = سهلة", "Laien = هواة"],
    simplified: "أدوات التعديل متاحة بسهولة للجميع",
    imagine: "🖥️✏️ شاشة حاسوب وقلم رصاص"
};

HELP_DATA["sprach2_exam34_q3"] = {
    text: "aber die Möglichkeiten der Bildbearbeitung lassen sich natürlich auch für Betrügereien missbrauchen",
    meaning: "لكن إمكانيات تحرير الصور يمكن إساءة استخدامها بالطبع في الاحتيال",
    keywords: ["aber = لكن", "Betrügereien = احتيال", "missbrauchen = إساءة استخدام"],
    simplified: "التقنية سلاح ذو حدين، فقد تستخدم لخداع الناس",
    imagine: "🎭🖼️ قناع وصورة"
};

HELP_DATA["sprach2_exam34_q4"] = {
    text: "stellt sich die Frage",
    meaning: "يطرح السؤال",
    keywords: ["stellt = يطرح", "Frage = سؤال", "sich = نفسه"],
    simplified: "الباحثون تساءلوا عن مدى سهولة اكتشاف الصور المعدلة",
    imagine: "❓🤔 علامة استفهام وشخص يفكر"
};

HELP_DATA["sprach2_exam34_q5"] = {
    text: "Diesen Fragen sind Forscher nachgegangen",
    meaning: "الباحثون تحققوا من هذه الأسئلة",
    keywords: ["Diesen = هذه", "nachgegangen = تحققوا", "Fragen = أسئلة"],
    simplified: "أُجريت دراسة لاختبار مهارة الناس في كشف التزوير",
    imagine: "🔬🧪 مختبر وأنابيب اختبار"
};

HELP_DATA["sprach2_exam34_q6"] = {
    text: "Die meisten Teilnehmer waren nur eher zufällig in der Lage, ein manipuliertes Bild zu identifizieren",
    meaning: "معظم المشاركين كانوا قادرين فقط وبشكل عشوائي على تحديد الصورة المتلاعب بها",
    keywords: ["meisten = معظم", "zufällig = بشكل عشوائي", "identifizieren = تحديد"],
    simplified: "الغالبية العظمى فشلت في اكتشاف التلاعبات حتى الواضحة",
    imagine: "🖼️❓ صورة وعلامة استفهام"
};

HELP_DATA["sprach2_exam34_q7"] = {
    text: "konnten sie tatsächlich korrekt bestimmen",
    meaning: "تمكنوا من تحديدها بشكل صحيح",
    keywords: ["korrekt = بشكل صحيح", "bestimmen = تحديد", "konnten = تمكنوا"],
    simplified: "نسبة صغيرة فقط خمنت المكان الصحيح للتعديل",
    imagine: "📍✅ تحديد وعلامة صح"
};

HELP_DATA["sprach2_exam34_q8"] = {
    text: "unlogische Abweichungen",
    meaning: "انحرافات غير منطقية",
    keywords: ["unlogische = غير منطقية", "Abweichungen = انحرافات", "andere = أخرى"],
    simplified: "حتى الأخطاء الواضحة في الفيزياء لم تلفت انتباه المشاهدين",
    imagine: "🔍❌ بحث وعلامة خطأ"
};

HELP_DATA["sprach2_exam34_q9"] = {
    text: "nicht zwischen echten und gefälschten Details auf Fotos unterscheiden",
    meaning: "لا يستطيعون التمييز بين التفاصيل الحقيقية والمزيفة في الصور",
    keywords: ["unterscheiden = التمييز", "echten = حقيقية", "gefälschten = مزيفة"],
    simplified: "نحن نصدق ما نراه، حتى عندما يكون مزيفاً",
    imagine: "👀✅ عينان وعلامة صح"
};

HELP_DATA["sprach2_exam34_q10"] = {
    text: "Die Ergebnisse dokumentierten somit, dass wir recht leicht auf Fake-Fotos reinfallen können",
    meaning: "النتائج وثقت بالتالي أننا نقع بسهولة في فخ الصور المزيفة",
    keywords: ["somit = بالتالي", "dokumentierten = وثقت", "reinfallen = نقع في فخ"],
    simplified: "النتائج تؤكد ضعف الإنسان أمام التزييف البصري",
    imagine: "📸🎭 كاميرا وقناع"
};

// ============================================
// Exam 35 (exam35.json) - Maßgeschneidert nach Bodyscanning
// ============================================

HELP_DATA["sprach2_exam35_q1"] = {
    text: "darüber geärgert",
    meaning: "منزعج من ذلك",
    keywords: ["darüber = من ذلك", "geärgert = منزعج", "haben = كان"],
    simplified: "شعور الجميع عند تجربة ملابس لا تناسبهم",
    imagine: "👗😞 فستان ووجه حزين"
};

HELP_DATA["sprach2_exam35_q2"] = {
    text: "fast nur noch in den falschen Größen",
    meaning: "تقريباً فقط بمقاسات خاطئة",
    keywords: ["nur = فقط", "falschen = خاطئة", "Größen = مقاسات"],
    simplified: "يبدو أن مقاسات الملابس الجاهزة لا تناسب أحداً",
    imagine: "📏❌ شريط قياس وعلامة خطأ"
};

HELP_DATA["sprach2_exam35_q3"] = {
    text: "brachte nun ans Licht",
    meaning: "كشف الآن النقاب عن",
    keywords: ["ans = إلى", "Licht = النور", "brachte = كشف"],
    simplified: "الدراسة كشفت أن تغير شكل الجسم هو السبب",
    imagine: "💡📋 مصباح وأوراق"
};

HELP_DATA["sprach2_exam35_q4"] = {
    text: "weder den Kundinnen noch den Kunden passen",
    meaning: "لا تناسب العملاء ولا العميلات",
    keywords: ["weder...noch = لا...ولا", "passen = تناسب", "Kundinnen = عميلات"],
    simplified: "الأجسام تغيرت لكن المقاسات لم تتغير",
    imagine: "👥📈 مجموعة أشخاص ورسم بياني"
};

HELP_DATA["sprach2_exam35_q5"] = {
    text: "müssen",
    meaning: "يجب (عليهم البحث)",
    keywords: ["müssen = يجب", "suchen = البحث", "Grund = سبب"],
    simplified: "مصنعو الملابس يتحملون مسؤولية تجاهل تغيرات الجسم",
    imagine: "🏭👖 مصنع وسروال"
};

HELP_DATA["sprach2_exam35_q6"] = {
    text: "Da der Handel natürlich daran interessiert ist",
    meaning: "بما أن التجارة مهتمة بطبيعة الحال",
    keywords: ["Da = بما أن", "interessiert = مهتمة", "Handel = تجارة"],
    simplified: "صناعة الأزياء تريد حلولاً دقيقة لزيادة المبيعات",
    imagine: "💰👗 نقود وفستان"
};

HELP_DATA["sprach2_exam35_q7"] = {
    text: "ein neues Projekt geplant, das Aufschluss darüber geben soll",
    meaning: "تم التخطيط لمشروع جديد من شأنه أن يعطي معلومات عن",
    keywords: ["das = الذي", "Aufschluss = معلومات", "geben = يعطي"],
    simplified: "تكنولوجيا المسح ثلاثي الأبعاد ستحدث ثورة في عالم الموضة",
    imagine: "📸👤 كاميرا وشخص"
};

HELP_DATA["sprach2_exam35_q8"] = {
    text: "Diese dreidimensionalen Bilder sollen es ermöglichen",
    meaning: "هذه الصور ثلاثية الأبعاد ستجعل من الممكن",
    keywords: ["sollen = ست", "ermöglichen = تجعل من الممكن", "Bilder = صور"],
    simplified: "بيانات القياس الدقيقة ستؤدي إلى ملابس أفضل",
    imagine: "📐👔 زاوية وقميص"
};

HELP_DATA["sprach2_exam35_q9"] = {
    text: "dürfen wir uns außerdem darauf freuen",
    meaning: "يمكننا أيضاً أن نتطلع إلى ذلك",
    keywords: ["dürfen = يمكننا", "freuen = نتطلع", "außerdem = أيضاً"],
    simplified: "الفوائد الجانبية للثورة التقنية تشمل المستهلكين أيضاً",
    imagine: "🎉😊 احتفال ووجه مبتسم"
};

HELP_DATA["sprach2_exam35_q10"] = {
    text: "dass sich die Modefirmen vielleicht endlich dafür entscheiden",
    meaning: "أن تقرر شركات الأزياء أخيراً",
    keywords: ["dass = أن", "entscheiden = تقرر", "endlich = أخيراً"],
    simplified: "أحلم بيوم تصبح فيه مقاسات الملابس عالمية",
    imagine: "🌍👕 كرة أرضية وقميص"
};

// ============================================
// Exam 36 (exam36.json) - Maßgeschneidert nach Bodyscanning (معدل)
// ============================================

HELP_DATA["sprach2_exam36_q1"] = {
    text: "darüber aufgeregt",
    meaning: "منزعج من ذلك",
    keywords: ["darüber = من ذلك", "aufgeregt = منزعج", "haben = كان"],
    simplified: "شعور الجميع عند تجربة ملابس لا تناسبهم",
    imagine: "👗😞 فستان ووجه حزين"
};

HELP_DATA["sprach2_exam36_q2"] = {
    text: "fast nur noch in den falschen Größen",
    meaning: "تقريباً فقط بمقاسات خاطئة",
    keywords: ["nur = فقط", "falschen = خاطئة", "Größen = مقاسات"],
    simplified: "يبدو أن مقاسات الملابس الجاهزة لا تناسب أحداً",
    imagine: "📏❌ شريط قياس وعلامة خطأ"
};

HELP_DATA["sprach2_exam36_q3"] = {
    text: "kam nun zu der folgenden Erkenntnis",
    meaning: "توصل الآن إلى الاستنتاج التالي",
    keywords: ["kam = توصل", "Erkenntnis = استنتاج", "folgenden = التالي"],
    simplified: "الدراسة كشفت فجوة خطيرة بين أنماط الأجسام الحالية والمقاسات",
    imagine: "🔬📄 معمل وورقة استنتاجات"
};

HELP_DATA["sprach2_exam36_q4"] = {
    text: "weder den Kundinnen noch den Kunden passen",
    meaning: "لا تناسب العملاء ولا العميلات",
    keywords: ["weder...noch = لا...ولا", "passen = تناسب", "Kundinnen = عميلات"],
    simplified: "الأجسام تغيرت لكن المقاسات لم تتغير",
    imagine: "👥📈 مجموعة أشخاص ورسم بياني"
};

HELP_DATA["sprach2_exam36_q5"] = {
    text: "habe zugenommen",
    meaning: "قد زادت",
    keywords: ["habe = قد", "zugenommen = زادت", "Länge = طول"],
    simplified: "الأذرع والأجساد أصبحت أطول وأكبر مع مرور الزمن",
    imagine: "📈⬆️ رسم بياني صاعد"
};

HELP_DATA["sprach2_exam36_q6"] = {
    text: "Da man natürlich daran interessiert ist",
    meaning: "بما أن المرء مهتم بطبيعة الحال",
    keywords: ["Da = بما أن", "interessiert = مهتم", "natürlich = طبيعياً"],
    simplified: "صناعة الأزياء ترغب في حل مشكلة عدم تطابق المقاسات",
    imagine: "👗💡 فستان ومصباح"
};

HELP_DATA["sprach2_exam36_q7"] = {
    text: "ein neues Verfahren entwickelt, das Männer und Frauen neu vermessen soll",
    meaning: "تم تطوير إجراء جديد من المفترض أن يقيس الرجال والنساء من جديد",
    keywords: ["das = الذي", "neu = من جديد", "vermissen = يقيس"],
    simplified: "تم ابتكار تقنية عالية الدقة لحل هذه المشكلة",
    imagine: "📏💻 شريط قياس وحاسوب"
};

HELP_DATA["sprach2_exam36_q8"] = {
    text: "sollen es ermöglichen",
    meaning: "من المفترض أن تجعل من الممكن",
    keywords: ["sollen = من المفترض أن", "ermöglichen = تجعل من الممكن", "es = ذلك"],
    simplified: "سيتم رفع دقة القياسات إلى أقصى حد",
    imagine: "📊🎯 رسم بياني وهدف"
};

HELP_DATA["sprach2_exam36_q9"] = {
    text: "dass sich die Modefirmen vielleicht endlich dafür entscheiden",
    meaning: "أن تقرر شركات الأزياء أخيراً",
    keywords: ["dass = أن", "entscheiden = تقرر", "endlich = أخيراً"],
    simplified: "أحلم بيوم تصبح فيه مقاسات الملابس عالمية",
    imagine: "🌍👕 كرة أرضية وقميص"
};

HELP_DATA["sprach2_exam36_q10"] = {
    text: "gleich groß",
    meaning: "بنفس الحجم",
    keywords: ["gleich = نفس", "groß = حجم", "ist = يكون"],
    simplified: "التوحيد العالمي للمقاسات سيجعل التسوق أسهل للجميع",
    imagine: "🌍📏 كرة أرضية وشريط قياس"
};

// ============================================
// Exam 37 (exam37.json) - Im Restaurant
// ============================================

HELP_DATA["sprach2_exam37_q1"] = {
    text: "gehören nicht auf den Tisch",
    meaning: "لا ينبغي أن تكون على الطاولة",
    keywords: ["gehören = تنتمي", "Tisch = طاولة", "nicht = لا"],
    simplified: "آداب المائدة تحظر وضع المرفقين على الطاولة",
    imagine: "🍽️🚫 طعام وعلامة منع"
};

HELP_DATA["sprach2_exam37_q2"] = {
    text: "behält in jedem Fall an",
    meaning: "يبقيهما في كل الأحوال",
    keywords: ["behält = يبقي", "an = على", "Schuhe = حذاء"],
    simplified: "من غير اللائق خلع الحذاء في مطعم فاخر",
    imagine: "👞🚫 حذاء وعلامة منع"
};

HELP_DATA["sprach2_exam37_q3"] = {
    text: "so mancher vor einem Problem",
    meaning: "كثير من الناس أمام مشكلة",
    keywords: ["mancher = كثير من الناس", "Problem = مشكلة", "vor = أمام"],
    simplified: "حتى الخدمة اللطيفة يمكن أن تسبب حرجاً عندما يتعلق الأمر بالتحدث مع النادل",
    imagine: "🙋‍♂️😕 نادل ووجه حائر"
};

HELP_DATA["sprach2_exam37_q4"] = {
    text: "mit der Anrede 'Fräulein' an den Tisch zu rufen",
    meaning: "مناداتها بـ 'آنسة' إلى الطاولة",
    keywords: ["mit = بـ", "Anrede = مناداتها", "Fräulein = آنسة"],
    simplified: "بعض التسميات غير لائقة في عصر المساواة",
    imagine: "👩‍🦳❌ امرأة وعلامة منع"
};

HELP_DATA["sprach2_exam37_q5"] = {
    text: "ist dagegen zwar korrekt",
    meaning: "هو على العكس صحيح",
    keywords: ["dagegen = على العكس", "zwar = صحيح", "korrekt = صحيح"],
    simplified: "كلمة 'نادل' صحيحة نحويًا لكنها قديمة الطراز",
    imagine: "📖✅ كتاب وعلامة صح"
};

HELP_DATA["sprach2_exam37_q6"] = {
    text: "mit einem kleinen Wink mit der Hand den Kellner an den Tisch zu bitten",
    meaning: "لطلب النادل إلى الطاولة بإشارة صغيرة باليد",
    keywords: ["wink = إشارة", "Hand = يد", "kleinen = صغيرة"],
    simplified: "الإشارة الخفيفة هي أكثر الطرق تهذيباً لجذب الانتباه",
    imagine: "👋🤫 تلويح وصمت"
};

HELP_DATA["sprach2_exam37_q7"] = {
    text: "Ist man mit dem Essen fertig",
    meaning: "إذا انتهى الشخص من الطعام",
    keywords: ["fertig = منتهياً", "Essen = طعام", "ist = كان"],
    simplified: "لغة الجسد في المطاعم: وضعية السكين والشوكة علامة",
    imagine: "🍴🔚 شوكة وسكين ونهاية"
};

HELP_DATA["sprach2_exam37_q8"] = {
    text: "ist takt gefragt",
    meaning: "هناك حاجة إلى لباقة",
    keywords: ["takt = لباقة", "gefragt = مطلوبة", "ist = هناك"],
    simplified: "يتطلب عرض الدفع حساسية كبيرة لتجنب الإحراج",
    imagine: "💳🤝 بطاقة ائتمان ومصافحة"
};

HELP_DATA["sprach2_exam37_q9"] = {
    text: "macht er dies dem Kellner klar",
    meaning: "يجعل هذا الأمر واضحاً للنادل",
    keywords: ["klar = واضحاً", "Kellner = نادل", "macht = يجعل"],
    simplified: "الإشارة الواضحة لمن يدفع تمنع الالتباس",
    imagine: "👆💵 إصبع指向 وورقة نقدية"
};

HELP_DATA["sprach2_exam37_q10"] = {
    text: "was durchaus üblich ist",
    meaning: "وهو أمر شائع جداً",
    keywords: ["was = وهو", "üblich = شائع", "durchaus = جداً"],
    simplified: "الدفع المنفصل مقبول تماماً في ألمانيا",
    imagine: "💰💰 نقود ونقود"
};

// ============================================
// Exam 38 (exam38.json) - Im Restaurant (معدل)
// ============================================

HELP_DATA["sprach2_exam38_q1"] = {
    text: "gehören nicht auf den Tisch",
    meaning: "لا ينبغي أن تكون على الطاولة",
    keywords: ["gehören = تنتمي", "Tisch = طاولة", "nicht = لا"],
    simplified: "آداب المائدة تحظر وضع المرفقين على الطاولة",
    imagine: "🍽️🚫 طعام وعلامة منع"
};

HELP_DATA["sprach2_exam38_q2"] = {
    text: "behält in jedem Fall an",
    meaning: "يبقيهما في كل الأحوال",
    keywords: ["behält = يبقي", "an = على", "Schuhe = حذاء"],
    simplified: "من غير اللائق خلع الحذاء في مطعم فاخر",
    imagine: "👞🚫 حذاء وعلامة منع"
};

HELP_DATA["sprach2_exam38_q3"] = {
    text: "bereitet so manchem Probleme",
    meaning: "تسبب المشاكل لكثير من الناس",
    keywords: ["manchem = كثير من الناس", "Probleme = مشاكل", "bereitet = تسبب"],
    simplified: "حتى الخدمة اللطيفة يمكن أن تسبب حرجاً عندما يتعلق الأمر بالتحدث مع النادل",
    imagine: "🙋‍♂️😕 نادل ووجه حائر"
};

HELP_DATA["sprach2_exam38_q4"] = {
    text: "mit der Anrede 'Fräulein' an den Tisch zu rufen",
    meaning: "مناداتها بـ 'آنسة' إلى الطاولة",
    keywords: ["mit = بـ", "Anrede = مناداتها", "Fräulein = آنسة"],
    simplified: "بعض التسميات غير لائقة في عصر المساواة",
    imagine: "👩‍🦳❌ امرأة وعلامة منع"
};

HELP_DATA["sprach2_exam38_q5"] = {
    text: "ist dagegen zwar korrekt",
    meaning: "هو على العكس صحيح",
    keywords: ["dagegen = على العكس", "zwar = صحيح", "korrekt = صحيح"],
    simplified: "كلمة 'نادل' صحيحة نحويًا لكنها قديمة الطراز",
    imagine: "📖✅ كتاب وعلامة صح"
};

HELP_DATA["sprach2_exam38_q6"] = {
    text: "mit einem kleinen Wink mit der Hand den Kellner an den Tisch zu bitten",
    meaning: "لطلب النادل إلى الطاولة بإشارة صغيرة باليد",
    keywords: ["wink = إشارة", "Hand = يد", "kleinen = صغيرة"],
    simplified: "الإشارة الخفيفة هي أكثر الطرق تهذيباً لجذب الانتباه",
    imagine: "👋🤫 تلويح وصمت"
};

HELP_DATA["sprach2_exam38_q7"] = {
    text: "Wenn man mit dem Essen fertig ist",
    meaning: "إذا انتهى الشخص من الطعام",
    keywords: ["fertig = منتهياً", "Essen = طعام", "ist = كان"],
    simplified: "لغة الجسد في المطاعم: وضعية السكين والشوكة علامة",
    imagine: "🍴🔚 شوكة وسكين ونهاية"
};

HELP_DATA["sprach2_exam38_q8"] = {
    text: "ist taktgefühl wichtig",
    meaning: "اللباقة مهمة",
    keywords: ["taktgefühl = لباقة", "wichtig = مهمة", "ist = هناك"],
    simplified: "يتطلب عرض الدفع حساسية كبيرة لتجنب الإحراج",
    imagine: "💳🤝 بطاقة ائتمان ومصافحة"
};

HELP_DATA["sprach2_exam38_q9"] = {
    text: "macht er dies dem Kellner klar",
    meaning: "يجعل هذا الأمر واضحاً للنادل",
    keywords: ["klar = واضحاً", "Kellner = نادل", "macht = يجعل"],
    simplified: "الإشارة الواضحة لمن يدفع تمنع الالتباس",
    imagine: "👆💵 إصبع指向 وورقة نقدية"
};

HELP_DATA["sprach2_exam38_q10"] = {
    text: "was durchaus üblich ist",
    meaning: "وهو أمر شائع جداً",
    keywords: ["was = وهو", "üblich = شائع", "durchaus = جداً"],
    simplified: "الدفع المنفصل مقبول تماماً في ألمانيا",
    imagine: "💰💰 نقود ونقود"
};

// ============================================
// Exam 39 (exam39.json) - Lernen ist kein Privileg der Jugend
// ============================================

HELP_DATA["sprach2_exam39_q1"] = {
    text: "Senioren sind heute höchst rege aktiv",
    meaning: "كبار السن نشيطون جداً اليوم",
    keywords: ["rege = نشيطون", "aktiv = نشيطون", "Senioren = كبار السن"],
    simplified: "كبار السن أكثر حيوية ونشاطاً من أي وقت مضى",
    imagine: "👴💪 رجل كبير وقوي"
};

HELP_DATA["sprach2_exam39_q2"] = {
    text: "wie es an verschiedenen deutschen Universitäten angeboten wird",
    meaning: "كما هو معروض في جامعات ألمانية مختلفة",
    keywords: ["an = في", "angeboten = معروض", "Universitäten = جامعات"],
    simplified: "العديد من الجامعات تستقبل كبار السن كطلاب مستمعين",
    imagine: "🏛️👵 مبنى جامعي وامرأة مسنة"
};

HELP_DATA["sprach2_exam39_q3"] = {
    text: "Allein in Trier waren über 130 Personen der Altersgruppe 50+ als Gasthörer eingeschrieben",
    meaning: "في ترير وحدها، كان أكثر من 130 شخصاً من الفئة العمرية 50+ مسجلين كطلاب مستمعين",
    keywords: ["Allein = وحدها", "als = كـ", "Gasthörer = طلاب مستمعين"],
    simplified: "أعداد كبيرة من المتقاعدين تملأ قاعات المحاضرات",
    imagine: "👥🏫 مجموعة أشخاص في قاعة محاضرات"
};

HELP_DATA["sprach2_exam39_q4"] = {
    text: "Darauf folgten die neueren Sprach- und Literaturwissenschaften",
    meaning: "تبع ذلك علوم اللغة والأدب الحديثة",
    keywords: ["Darauf = بعد ذلك", "folgten = تبع", "neueren = الحديثة"],
    simplified: "مواد العلوم الإنسانية كانت الخيار الأول",
    imagine: "📖🏛️ كتاب ومبنى جامعي"
};

HELP_DATA["sprach2_exam39_q5"] = {
    text: "Die Gründe dafür dürften sein",
    meaning: "الأسباب لذلك قد تكون",
    keywords: ["dürften = قد تكون", "Gründe = أسباب", "dafür = لذلك"],
    simplified: "تفسير لكثرة النساء بين الطلاب المسنين",
    imagine: "👩‍🎓❓ طالبة وعلامة استفهام"
};

HELP_DATA["sprach2_exam39_q6"] = {
    text: "dass Frauen in ihren jüngeren Lebensjahren häufig auf eine berufliche Karriere verzichteten",
    meaning: "أن النساء في سنوات عمرهن الأصغر تخلىن غالباً عن مهنة",
    keywords: ["auf = عن", "verzichteten = تخلىن", "Karriere = مهنة"],
    simplified: "العديد من النساء قدمن أسرتهن على حساب طموحاتهن المهنية",
    imagine: "👩‍👧‍👦💼 أم وشنطة عمل"
};

HELP_DATA["sprach2_exam39_q7"] = {
    text: "Stattdessen setzten sie sich für die Familie und insbesondere für ihre Kinder ein",
    meaning: "بدلاً من ذلك، كرّسن أنفسهن للعائلة وخاصة لأطفالهن",
    keywords: ["Stattdessen = بدلاً من ذلك", "setzten ein = كرّسن", "Familie = عائلة"],
    simplified: "تفانوا في رعاية الأسرة وتربية الأطفال",
    imagine: "🏠❤️ منزل وقلب"
};

HELP_DATA["sprach2_exam39_q8"] = {
    text: "deren Einsatz in den 'Familienjahren' häufig zu kurz gekommen war",
    meaning: "الذي كان استخدامها في 'سنوات الأسرة' غالباً غير كافٍ",
    keywords: ["kurz = غير كافٍ", "Einsatz = استخدام", "Familienjahren = سنوات الأسرة"],
    simplified: "الآن حان الوقت لصقل تلك العقول المتعطشة للمعرفة",
    imagine: "🧠💡 عقل ومصباح"
};

HELP_DATA["sprach2_exam39_q9"] = {
    text: "Aufgrund dessen sehen sie keine Veranlassung",
    meaning: "وبسبب ذلك لا يرون سبباً",
    keywords: ["Aufgrund dessen = بسبب ذلك", "Veranlassung = سبباً", "sehen = يرون"],
    simplified: "الرجال أقل اهتماماً بالدراسة بعد التقاعد",
    imagine: "👴📚 رجل كبير وكتاب"
};

HELP_DATA["sprach2_exam39_q10"] = {
    text: "Er wird gespeist durch die Vitalität und die hohe Bildungsmotivation",
    meaning: "يتم تغذيته من خلال الحيوية والدافع التعليمي العالي",
    keywords: ["durch = من خلال", "Vitalität = حيوية", "Bildungsmotivation = دافع تعليمي"],
    simplified: "جوع كبار السن للمعرفة لا يشبع",
    imagine: "📚🔥 كتب ونار"
};

// ============================================
// Exam 40 (exam40.json) - Lernen ist kein Privileg der Jugend (معدل)
// ============================================

HELP_DATA["sprach2_exam40_q1"] = {
    text: "nutzen vielfach die Chance",
    meaning: "يستغلون الفرصة كثيراً",
    keywords: ["nutzen = يستغلون", "Chance = فرصة", "vielfach = كثيراً"],
    simplified: "كبار السن يغتنمون الفرص لتحقيق أحلامهم المؤجلة",
    imagine: "🌟👴 نجمة ورجل كبير"
};

HELP_DATA["sprach2_exam40_q2"] = {
    text: "wie es an verschiedenen deutschen Universitäten angeboten wird",
    meaning: "كما هو معروض في جامعات ألمانية مختلفة",
    keywords: ["angeboten = معروض", "Universitäten = جامعات", "an = في"],
    simplified: "جامعات كثيرة أصبحت ترحب بالطلاب المسنين",
    imagine: "🏛️👵 مبنى جامعي وامرأة مسنة"
};

HELP_DATA["sprach2_exam40_q3"] = {
    text: "als Gasthörer eingeschrieben",
    meaning: "مسجلين كطلاب مستمعين",
    keywords: ["als = كـ", "Gasthörer = طلاب مستمعين", "eingeschrieben = مسجلين"],
    simplified: "ظاهرة الطلاب المسنين في ارتفاع مستمر",
    imagine: "📈👴 رسم بياني ورجل كبير"
};

HELP_DATA["sprach2_exam40_q4"] = {
    text: "wurden dagegen weniger häufig gewählt",
    meaning: "على العكس، تم اختيارها بشكل أقل",
    keywords: ["dagegen = على العكس", "weniger = أقل", "häufig = بشكل"],
    simplified: "التخصصات العملية أقل جذباً لكبار السن",
    imagine: "⚖️📉 ميزان ورسم بياني هابط"
};

HELP_DATA["sprach2_exam40_q5"] = {
    text: "Die Gründe dafür könnten sein",
    meaning: "الأسباب لذلك قد تكون",
    keywords: ["könnten = قد تكون", "Gründe = أسباب", "dafür = لذلك"],
    simplified: "تفسير لكثرة النساء بين الطلاب المسنين",
    imagine: "👩‍🎓❓ طالبة وعلامة استفهام"
};

HELP_DATA["sprach2_exam40_q6"] = {
    text: "setzten sie sich für die Familie und ihre Kinder ein",
    meaning: "كرّسن أنفسهن للعائلة وأطفالهن",
    keywords: ["für = لـ", "setzten ein = كرّسن", "Familie = عائلة"],
    simplified: "تفانوا في رعاية الأسرة وتربية الأطفال",
    imagine: "🏠❤️ منزل وقلب"
};

HELP_DATA["sprach2_exam40_q7"] = {
    text: "Wenn die Kinder erwachsen sind",
    meaning: "عندما يكبر الأطفال",
    keywords: ["erwachsen = كباراً", "Kinder = أطفال", "sind = يكونوا"],
    simplified: "بعد مغادرة الأبناء للمنزل، تبدأ رحلة الأم الجديدة",
    imagine: "👩‍👧‍👦➡️👩 أسرة ثم امرأة وحيدة"
};

HELP_DATA["sprach2_exam40_q8"] = {
    text: "konnten häufiger während ihres Arbeitslebens",
    meaning: "تمكنوا غالباً خلال حياتهم العملية",
    keywords: ["während = خلال", "Arbeitslebens = حياة عملية", "häufiger = غالباً"],
    simplified: "الرجال حققوا ذواتهم مهنياً بينما كانت النساء في المنزل",
    imagine: "👔💼 رجل وحقيبة عمل"
};

HELP_DATA["sprach2_exam40_q9"] = {
    text: "Daher sehen sie keine Veranlassung",
    meaning: "لذلك لا يرون سبباً",
    keywords: ["Daher = لذلك", "Veranlassung = سبباً", "sehen = يرون"],
    simplified: "الرجال أقل اهتماماً بالدراسة بعد التقاعد",
    imagine: "👴📚 رجل كبير وكتاب"
};

HELP_DATA["sprach2_exam40_q10"] = {
    text: "neue Kompetenzen zu entwickeln",
    meaning: "لتطوير كفاءات جديدة",
    keywords: ["neue = جديدة", "Kompetenzen = كفاءات", "entwickeln = تطوير"],
    simplified: "جوع كبار السن للمعرفة لا يشبع",
    imagine: "📚🔥 كتب ونار"
};
// ============================================
// Exam 41 (exam41.json) - Wie TV-Bilder die Fantasie von Kindern prägen
// ============================================

HELP_DATA["sprach2_exam41_q1"] = {
    text: "durch brutale, von Gewalt geprägte Medieninhalte",
    meaning: "من خلال محتوى إعلامي وحشي ومليء بالعنف",
    keywords: ["durch = من خلال", "brutale = وحشي", "Gewalt = عنف"],
    simplified: "الأطفال والمراهقون يتأثرون بالمشاهد العنيفة في وسائل الإعلام",
    imagine: "📺💥 تلفاز وانفجار"
};

HELP_DATA["sprach2_exam41_q2"] = {
    text: "vor allem Jungen scheinen für extrem gewalttätige Bilder empfänglich zu sein",
    meaning: "يبدو أن الأولاد على وجه الخصوص قابلون للتأثر بالصور شديدة العنف",
    keywords: ["vor = على وجه الخصوص", "Jungen = أولاد", "empfänglich = قابلون للتأثر"],
    simplified: "الأولاد أكثر عرضة لتأثير العنف التلفزيوني",
    imagine: "👦💥 ولد وانفجار"
};

HELP_DATA["sprach2_exam41_q3"] = {
    text: "welche Bilder in den Köpfen von Kindern herumgeistern",
    meaning: "أي صور تتردد في أذهان الأطفال",
    keywords: ["welche = أي", "Bilder = صور", "herumgeistern = تتردد"],
    simplified: "دراسة تكشف أنواع الصور الذهنية لدى الأطفال",
    imagine: "🧠🖼️ عقل وصورة"
};

HELP_DATA["sprach2_exam41_q4"] = {
    text: "unterschieden sich deutlich",
    meaning: "اختلفت بشكل واضح",
    keywords: ["unterschieden = اختلفت", "deutlich = بشكل واضح", "sich = نفسها"],
    simplified: "خيالات الأولاد والبنات تختلف اختلافاً كبيراً",
    imagine: "👦⚔️👧 ولد وفتاة وسيف"
};

HELP_DATA["sprach2_exam41_q5"] = {
    text: "ließen das Märchen dagegen meist gewaltfrei enden",
    meaning: "على العكس، جعلن القصة الخيالية تنتهي بدون عنف في الغالب",
    keywords: ["ließen = جعلن", "dagegen = على العكس", "gewaltfrei = بدون عنف"],
    simplified: "الفتيات يفضلن النهايات الرومانسية على العنيفة",
    imagine: "👧💕 فتاة وقلب"
};

HELP_DATA["sprach2_exam41_q6"] = {
    text: "wie sehr Bilder aus den Medien die Vorstellungswelt von Jugendlichen prägen",
    meaning: "كم تشكل الصور الإعلامية عالم خيال المراهقين",
    keywords: ["wie = كم", "prägen = تشكل", "Vorstellungswelt = عالم خيال"],
    simplified: "التجربة تظهر تأثيراً عميقاً للتلفاز على خيال الطفل",
    imagine: "📺🧠 تلفاز وعقل"
};

HELP_DATA["sprach2_exam41_q7"] = {
    text: "von Jugendlichen",
    meaning: "للمراهقين",
    keywords: ["von = لـ", "Jugendlichen = مراهقين", "Vorstellungswelt = عالم خيال"],
    simplified: "التلفاز يشكل عقل الجيل الجديد",
    imagine: "👦📺 ولد وتلفاز"
};

HELP_DATA["sprach2_exam41_q8"] = {
    text: "mit dem man die Welt begreift",
    meaning: "الذي من خلاله يُفهم العالم",
    keywords: ["mit = من خلاله", "begreift = يُفهم", "Welt = عالم"],
    simplified: "المراهقون يشكلون مفرداتهم العاطفية من التلفاز",
    imagine: "📚❤️ كتاب وقلب"
};

HELP_DATA["sprach2_exam41_q9"] = {
    text: "was Musik überhaupt ist",
    meaning: "ما هي الموسيقى أصلاً",
    keywords: ["was = ما", "Musik = موسيقى", "überhaupt = أصلاً"],
    simplified: "لا يمكنك فهم شيء لم تختبره من قبل",
    imagine: "🎵❓ موسيقى وعلامة استفهام"
};

HELP_DATA["sprach2_exam41_q10"] = {
    text: "dann, wenn positive Alternativbilder fehlten",
    meaning: "عندها، عندما تفتقر إلى صور بديلة إيجابية",
    keywords: ["dann = عندها", "fehlten = تفتقر", "Alternativbilder = صور بديلة"],
    simplified: "غياب القدوة الحسنة يجعل الأطفال أكثر عرضة للخطر",
    imagine: "🖼️🚫 صورة وعلامة منع"
};

// ============================================
// Exam 42 (exam42.json) - Städte vor dem Infarkt
// ============================================

HELP_DATA["sprach2_exam42_q1"] = {
    text: "davon geträumt",
    meaning: "حلموا بذلك",
    keywords: ["davon = بذلك", "geträumt = حلموا", "haben = كانوا"],
    simplified: "طالما حلم الناس بالتنقل بلا قيود",
    imagine: "💭🚗 حلم وسيارة"
};

HELP_DATA["sprach2_exam42_q2"] = {
    text: "wer Auto fährt",
    meaning: "من يقود سيارة",
    keywords: ["wer = من", "fährt = يقود", "Auto = سيارة"],
    simplified: "السيارة رمز للمكانة الاجتماعية في كثير من الثقافات",
    imagine: "🚗👔 سيارة وربطة عنق"
};

HELP_DATA["sprach2_exam42_q3"] = {
    text: "dass für so viele Fahrzeuge der Platz nicht mehr ausreicht",
    meaning: "أن المساحة لم تعد كافية لهذا العدد الكبير من المركبات",
    keywords: ["dass = أن", "Platz = مساحة", "nicht mehr = لم تعد"],
    simplified: "المدن القديمة لم تصمم لاستيعاب الكم الهائل من السيارات الحالي",
    imagine: "🏙️🚗🚗 مدينة وسيارات كثيرة"
};

HELP_DATA["sprach2_exam42_q4"] = {
    text: "oft",
    meaning: "غالباً",
    keywords: ["oft = غالباً", "breit = واسعة", "genug = كفاية"],
    simplified: "الشوارع غالباً ليست واسعة بما يكفي",
    imagine: "🛣️📏 طريق وشريط قياس"
};

HELP_DATA["sprach2_exam42_q5"] = {
    text: "als sie fahren",
    meaning: "أكثر مما هي متحركة",
    keywords: ["fahren = تتحرك", "länger = أطول", "stehen = تقف"],
    simplified: "السيارات الآن تقف لفترة أطول مما هي في حركة",
    imagine: "🚗⏱️ سيارة وساعة"
};

HELP_DATA["sprach2_exam42_q6"] = {
    text: "denn die Zahl der Straßenfahrzeuge ist zu groß geworden",
    meaning: "لأن عدد المركبات على الطرق أصبح كبيراً جداً",
    keywords: ["denn = لأن", "Zahl = عدد", "zu groß = كبيراً جداً"],
    simplified: "شلل مروري بسبب كثرة السيارات",
    imagine: "🚦🚫 إشارة مرور وعلامة منع"
};

HELP_DATA["sprach2_exam42_q7"] = {
    text: "führt dazu",
    meaning: "يؤدي إلى ذلك",
    keywords: ["dazu = إلى ذلك", "führt = يؤدي", "Erwärmung = احترار"],
    simplified: "انبعاثات السيارات تساهم بشكل كبير في تغير المناخ",
    imagine: "🌡️🚗 ميزان حرارة وسيارة"
};

HELP_DATA["sprach2_exam42_q8"] = {
    text: "um dem Verkehrsinfarkt zuvorzukommen",
    meaning: "لمنع الشلل المروري",
    keywords: ["um = لـ", "zuvorzukommen = لمنع", "Verkehrsinfarkt = شلل مروري"],
    simplified: "مدن كثيرة تستثمر في وسائل النقل العام لتقليل الازدحام",
    imagine: "🚌🚊 حافلة وقطار"
};

HELP_DATA["sprach2_exam42_q9"] = {
    text: "graben sich die Tunnel der U-Bahnen immer weiter durch das Erdreich",
    meaning: "أنفاق المترو تحفر نفسها أعمق في الأرض",
    keywords: ["graben = تحفر", "Tunnel = أنفاق", "U-Bahnen = مترو"],
    simplified: "شبكات المترو تتوسع تحت المدن الكبرى",
    imagine: "🚇🕳️ مترو وحفرة"
};

HELP_DATA["sprach2_exam42_q10"] = {
    text: "kosten wird",
    meaning: "ستكلّف (جهداً كبيراً)",
    keywords: ["kosten = ستكلّف", "wird = سوف", "Überzeugungsarbeit = جهود إقناع"],
    simplified: "التخلص من الاعتماد على السيارات سيتطلب تغييراً كبيراً في الثقافة",
    imagine: "💪💰 جهد ونقود"
};

// ============================================
// Exam 43 (exam43.json) - Es ist erst 6 Uhr morgens
// ============================================

HELP_DATA["sprach2_exam43_q1"] = {
    text: "doch in der riesigen, hell erleuchteten Halle",
    meaning: "لكن في القاعة الضخمة المضاءة بشكل ساطع",
    keywords: ["doch = لكن", "Halle = قاعة", "hell erleuchteten = مضاءة بشكل ساطع"],
    simplified: "في الداخل، العمل على قدم وساق رغم هدوء الخارج",
    imagine: "🏭💡 مصنع وأضواء"
};

HELP_DATA["sprach2_exam43_q2"] = {
    text: "leitet einen Berliner Großmarkt",
    meaning: "يدير سوقاً كبيراً في برلين",
    keywords: ["leitet = يدير", "Großmarkt = سوق كبير", "Berliner = برليني"],
    simplified: "رجل مسؤول عن سوق الجملة في برلين",
    imagine: "👨‍💼🏪 مدير ومكتب"
};

HELP_DATA["sprach2_exam43_q3"] = {
    text: "bis sie auf dem Großmarkt ankommt",
    meaning: "حتى تصل إلى السوق الكبير",
    keywords: ["ankommt = تصل", "Großmarkt = سوق كبير", "auf = إلى"],
    simplified: "الفواكه تأتي من جميع أنحاء العالم إلى السوق المركزي",
    imagine: "🗺️🍎 خريطة وتفاحة"
};

HELP_DATA["sprach2_exam43_q4"] = {
    text: "nämlich auf dem Land-, Luft- oder Seeweg",
    meaning: "وهي عبر البر أو الجو أو البحر",
    keywords: ["nämlich = وهي", "Landweg = براً", "Seeweg = بحراً"],
    simplified: "الفواكه تُشحن بطرق متعددة للوصول طازجة إلى الأسواق",
    imagine: "🚢✈️🚛 سفينة وطائرة وشاحنة"
};

HELP_DATA["sprach2_exam43_q5"] = {
    text: "darf das empfindliche Obst und Gemüse keinesfalls Schaden nehmen",
    meaning: "لا يجوز أن تتلف الفواكه والخضروات الحساسة بأي حال من الأحوال",
    keywords: ["darf = يجوز", "keinesfalls = بأي حال", "Schaden nehmen = تتلف"],
    simplified: "النقل السريع ضروري للحفاظ على المنتجات طازجة",
    imagine: "🍓⏱️ فراولة وساعة"
};

HELP_DATA["sprach2_exam43_q6"] = {
    text: "Nichts ist schlimmer als verdorbene Ware",
    meaning: "لا شيء أسوأ من البضاعة الفاسدة",
    keywords: ["als = من", "verdorbene = فاسدة", "schlimmer = أسوأ"],
    simplified: "المنتج التالف يعني خسارة مالية للمورد",
    imagine: "🍌💸 موزة ونقود تطير"
};

HELP_DATA["sprach2_exam43_q7"] = {
    text: "schauen sich die Käufer alles genau an",
    meaning: "يفحص المشترون كل شيء بدقة",
    keywords: ["genau = بدقة", "schauen an = يفحصون", "Käufer = مشترون"],
    simplified: "فحص الجودة إجراء صارم في السوق",
    imagine: "🔍🥬 عدسة مكبرة وخس"
};

HELP_DATA["sprach2_exam43_q8"] = {
    text: "erwerben sie dagegen günstiger",
    meaning: "على العكس، يشترونها بسعر أقل",
    keywords: ["erwerben = يشترون", "dagegen = على العكس", "günstiger = بسعر أقل"],
    simplified: "الفواكه غير الكاملة تُباع بسعر مخفض للمصانع",
    imagine: "🥒💰 خيار ونقود"
};

HELP_DATA["sprach2_exam43_q9"] = {
    text: "sondern direkt verarbeitet",
    meaning: "بل تُعالج مباشرة",
    keywords: ["sondern = بل", "direkt = مباشرة", "verarbeitet = تُعالج"],
    simplified: "الجمال ليس شرطاً للفواكه التي تذهب إلى السلطات الجاهزة",
    imagine: "🥗🏭 سلطة ومصنع"
};

HELP_DATA["sprach2_exam43_q10"] = {
    text: "Wenn die Preisverhandlungen erfolgreich abgeschlossen sind",
    meaning: "عندما تنتهي مفاوضات الأسعار بنجاح",
    keywords: ["abgeschlossen = منتهية", "erfolgreich = بنجاح", "Preisverhandlungen = مفاوضات أسعار"],
    simplified: "بمجرد الاتفاق على السعر، تُحمل السلع وتُوزع",
    imagine: "🤝📦 مصافحة وصندوق"
};

// ============================================
// Exam 44 (exam44.json) - Die Katzen
// ============================================

HELP_DATA["sprach2_exam44_q1"] = {
    text: "in der Lage",
    meaning: "قادرة",
    keywords: ["Lage = قدرة", "in der = في الـ"],
    simplified: "القطط تستطيع تمييز أسمائها",
    imagine: "🐱👂 قطة وأذن"
};

HELP_DATA["sprach2_exam44_q2"] = {
    text: "Nach eigenen Angaben",
    meaning: "وفقاً لتصريحاتهم الخاصة",
    keywords: ["Angaben = تصريحات", "eigenen = خاصة", "nach = وفقاً لـ"],
    simplified: "الباحثون يقدمون أول دليل علمي على فهم القطط",
    imagine: "📄📑 مستندات"
};

HELP_DATA["sprach2_exam44_q3"] = {
    text: "sondern eine fremde Person",
    meaning: "بل شخص غريب",
    keywords: ["sondern = بل", "fremde Person = شخص غريب", "nicht = ليس"],
    simplified: "تستجيب القطة حتى عندما يتحدث الغريب باسمها",
    imagine: "🐱🗣️ قطة وشخص يتكلم"
};

HELP_DATA["sprach2_exam44_q4"] = {
    text: "von denen ihrer Artgenossen",
    meaning: "من تلك الخاصة بأفراد جنسها",
    keywords: ["denen = تلك", "Artgenossen = أفراد جنسها", "von = من"],
    simplified: "القطط في المنازل المتعددة تعرف أسماء بعضها البعض",
    imagine: "🐱🐱 قطتان"
};

HELP_DATA["sprach2_exam44_q5"] = {
    text: "das Verhalten von 78 Katzen untersucht",
    meaning: "درس سلوك 78 قطة",
    keywords: ["Verhalten = سلوك", "untersucht = درس", "Katzen = قطط"],
    simplified: "طُلب من 78 قطة المشاركة في الاختبار",
    imagine: "📋🐱 قائمة وقطة"
};

HELP_DATA["sprach2_exam44_q6"] = {
    text: "Zunächst spielten sie den Tieren vier japanische Wörter vom Band vor",
    meaning: "أولاً، قاموا بتشغيل أربع كلمات يابانية للحيوانات من شريط",
    keywords: ["Zunächst = أولاً", "vom Band = من شريط", "spielten vor = قاموا بتشغيل"],
    simplified: "لعب الباحثون كلمات متشابهة للقطط لاختبار ردود أفعالها",
    imagine: "📀🐱 قرص وقطة"
};

HELP_DATA["sprach2_exam44_q7"] = {
    text: "nahm die Aufmerksamkeit der Katzen immer weiter ab",
    meaning: "انخفض انتباه القطط بشكل متزايد",
    keywords: ["weiter = بشكل متزايد", "ab = انخفض", "Aufmerksamkeit = انتباه"],
    simplified: "الملل يصيب القطط مع تكرار الكلمات غير المألوفة",
    imagine: "😴🐱 قطة نائمة"
};

HELP_DATA["sprach2_exam44_q8"] = {
    text: "warum ist es bloß schwierig",
    meaning: "لماذا من الصعب فقط",
    keywords: ["bloß = فقط", "schwierig = صعب", "warum = لماذا"],
    simplified: "القطط ذكية لكن تدريبها صعب",
    imagine: "🤔🐱 تفكير وقطة"
};

HELP_DATA["sprach2_exam44_q9"] = {
    text: "sofern sie bereit sind mitzumachen",
    meaning: "بشرط أن تكون مستعدة للمشاركة",
    keywords: ["sofern = بشرط أن", "bereit = مستعدة", "mitzumachen = للمشاركة"],
    simplified: "القطط تتعلم فقط عندما تكون في حالة مزاجية مناسبة",
    imagine: "😼🐱 قطة ماكرة"
};

HELP_DATA["sprach2_exam44_q10"] = {
    text: "ist bekannt",
    meaning: "من المعروف",
    keywords: ["bekannt = معروف", "ist = هو", "aus = من"],
    simplified: "القطط تستجيب للإشارات البشرية مثل النقر والإيماءات",
    imagine: "👆🐱 إصبع وقطة"
};

// ============================================
// Exam 45 (exam45.json) - Teleshopping – nicht immer gut und günstig
// ============================================

HELP_DATA["sprach2_exam45_q1"] = {
    text: "eher enttäuschend",
    meaning: "مخيبة إلى حد ما",
    keywords: ["eher = إلى حد ما", "enttäuschend = مخيبة", "Qualität = جودة"],
    simplified: "جودة منتجات التسوق المنزلي سيئة في الغالب",
    imagine: "📺👍 تلفاز وإبهام لأسفل"
};

HELP_DATA["sprach2_exam45_q2"] = {
    text: "zog",
    meaning: "استخلص",
    keywords: ["zog = استخلص", "Fazit = خلاصة", "Stiftung = مؤسسة"],
    simplified: "تقرير المستهلك يشير إلى ضرورة الحذر",
    imagine: "📄✍️ ورقة وقلم"
};

HELP_DATA["sprach2_exam45_q3"] = {
    text: "bei Beschwerdefällen",
    meaning: "في حالات الشكاوى",
    keywords: ["bei = في", "Beschwerdefällen = حالات شكاوى", "Erfahrungen = خبرات"],
    simplified: "العملاء يواجهون مشاكل متكررة مع عمالقة التسوق المنزلي",
    imagine: "📞😠 مكالمة ووجه غاضب"
};

HELP_DATA["sprach2_exam45_q4"] = {
    text: "sondern es erfolgt nur eine Gutschrift",
    meaning: "بل يتم فقط إضافة رصيد",
    keywords: ["sondern = بل", "Gutschrift = إضافة رصيد", "nur = فقط"],
    simplified: "بدلاً من استرداد الأموال، تقدم الشركة رصيداً للتسوق فقط",
    imagine: "💰🔄 نقود وسهم دائري"
};

HELP_DATA["sprach2_exam45_q5"] = {
    text: "in voller Höhe",
    meaning: "بالمبلغ الكامل",
    keywords: ["Höhe = مبلغ", "voller = كامل", "in = بـ"],
    simplified: "حتى الرصيد لا يُمنح كاملاً في كثير من الأحيان",
    imagine: "💸📉 نقود ورسم بياني هابط"
};

HELP_DATA["sprach2_exam45_q6"] = {
    text: "Ganz abgesehen davon",
    meaning: "بصرف النظر تماماً عن ذلك",
    keywords: ["abgesehen = بصرف النظر", "davon = عن ذلك", "Ganz = تماماً"],
    simplified: "القانون الألماني يحمي المتسوقين حتى من الشركات الأجنبية",
    imagine: "⚖️🇩🇪 ميزان عدالة وعلم ألماني"
};

HELP_DATA["sprach2_exam45_q7"] = {
    text: "an deutsche Verbraucher wenden",
    meaning: "يوجهون أنفسهم للمستهلكين الألمان",
    keywords: ["wenden = يوجهون", "an = إلى", "Verbraucher = مستهلكون"],
    simplified: "الشركات العالمية تصل للمستهلك الألماني عبر الشاشات الصغيرة",
    imagine: "📺💻 تلفاز وحاسوب"
};

HELP_DATA["sprach2_exam45_q8"] = {
    text: "gilt sogar unbefristet",
    meaning: "ينطبق حتى بدون فترة محددة",
    keywords: ["sogar = حتى", "unbefristet = بدون فترة محددة", "gilt = ينطبق"],
    simplified: "حقوقك القانونية لا تنتهي أبداً",
    imagine: "📜🔏 مخطوطة وختم"
};

HELP_DATA["sprach2_exam45_q9"] = {
    text: "genauso konsequent ihre Rechte durchzusetzen",
    meaning: "لإنفاذ حقوقهم بنفس الحزم",
    keywords: ["genauso = بنفس", "konsequent = بحزم", "Rechte = حقوق"],
    simplified: "على المشاهدين أن يطالبوا بحقوقهم بقوة",
    imagine: "✊💪 قبضة وعضلة"
};

HELP_DATA["sprach2_exam45_q10"] = {
    text: "Dabei hilft die Verbraucherzentrale",
    meaning: "في ذلك تساعد مؤسسة حماية المستهلك",
    keywords: ["Dabei = في ذلك", "Verbraucherzentrale = مؤسسة حماية المستهلك", "hilft = تساعد"],
    simplified: "المنظمات الاستهلاكية موجودة لمساعدتك",
    imagine: "🏛️🤝 مبنى ومصافحة"
};
// ============================================
// Exam 46 (exam46.json) - Die Rückkehr des Nachtzugs
// ============================================

HELP_DATA["sprach2_exam46_q1"] = {
    text: "wieder in Mode bringt",
    meaning: "يعيد إلى الواجهة / الموضة",
    keywords: ["MODE = موضة / رائج (الكلمة الصحيحة)", "wieder = مرة أخرى", "bringt = يجلب"],
    simplified: "نقاش المناخ أعاد عربات النوم للواجهة من جديد",
    imagine: "🚂💃 قطار عجوز يرتدي باروكة ويرقص مينتو"
};

HELP_DATA["sprach2_exam46_q2"] = {
    text: "aber ganz so schnell wie mit dem Flugzeug ist es nicht",
    meaning: "لكنه ليس بنفس سرعة الطائرة تماماً",
    keywords: ["GANZ = تماماً / كلياً (الكلمة الصحيحة)", "aber = لكن", "so schnell wie = بنفس سرعة"],
    simplified: "قطار الليل أبطأ من الطائرة",
    imagine: "🐌✈️ حلزون يصرخ 'لحقي بي' والطائرة تضحك"
};

HELP_DATA["sprach2_exam46_q3"] = {
    text: "könnten wir das Angebot rasch deutlich ausweiten",
    meaning: "يمكننا توسيع العرض بسرعة وبشكل كبير",
    keywords: ["AUSWEITEN = يوسع / يكبر (الكلمة الصحيحة)", "rasch = بسرعة", "deutlich = بشكل كبير"],
    simplified: "نقدر نوسع الخدمة بسرعة لو عندنا عربات نوم أكثر",
    imagine: "🪄🚂 قطار سحري يضرب عصاه ويتضاعف"
};

HELP_DATA["sprach2_exam46_q4"] = {
    text: "Insgesamt seien in der Regel acht Mitarbeiter in einem Nachtzug unterwegs",
    meaning: "إجمالاً، يوجد عادةً ثمانية موظفين في قطار الليل",
    keywords: ["INSGESAMT = إجمالاً / في المجموع (الكلمة الصحيحة)", "in der Regel = عادةً", "Mitarbeiter = موظفين"],
    simplified: "عادةً 8 موظفين يشتغلون في قطار الليل",
    imagine: "🐙🚂 أخطبوط يرتدي 8 قبعات ويوزع القهوة"
};

HELP_DATA["sprach2_exam46_q5"] = {
    text: "eine neue Intercity-Nachtverbindung gestartet",
    meaning: "تم إطلاق خط ليلي جديد بين المدن",
    keywords: ["NEUE = جديدة (الكلمة الصحيحة)", "Intercity = بين المدن", "Nachtverbindung = خط ليلي", "gestartet = تم إطلاقه"],
    simplified: "خط قطارات ليلية جديد انطلق رسمياً",
    imagine: "🎉🚂 قطار بقبعة حفلة يطلق ألعاباً نارية زرقاء وصفراء"
};

HELP_DATA["sprach2_exam46_q6"] = {
    text: "rund tausend zusätzliche Mitarbeiter eingestellt werden",
    meaning: "سيتم توظيف حوالي ألف موظف إضافي",
    keywords: ["EINGESTELLT = تم توظيفه / تعيينه (الكلمة الصحيحة)", "rund = حوالي", "zusätzliche = إضافية"],
    simplified: "راح يوظفوا حوالي 1000 موظف زيادة",
    imagine: "👥💯 ألف دمية خشبية تصطف بدقة عسكرية أمام القطار"
};

HELP_DATA["sprach2_exam46_q7"] = {
    text: "warum nicht Konkurrenten dieses Angebot bei Nachtzügen übernehmen sollten",
    meaning: "لماذا لا يقوم المنافسون بتولي هذا العرض في قطارات الليل",
    keywords: ["KONKURRENTEN = منافسون (الكلمة الصحيحة)", "warum nicht = لماذا لا", "übernehmen = يتولى"],
    simplified: "المنافسون ليش ما ياخدوا هادي الخدمة",
    imagine: "🤼‍♂️🚂 متنافسان يتصارعان على عجلة قيادة القطار"
};

HELP_DATA["sprach2_exam46_q8"] = {
    text: "durch ein klimafreundliches Mobilitätsangebot zu reduzieren",
    meaning: "لتقليل الرحلات الجوية من خلال عرض تنقل صديق للبيئة",
    keywords: ["DURCH = من خلال / بواسطة (الكلمة الصحيحة)", "klimafreundliches = صديق للمناخ", "reduzieren = يقلل"],
    simplified: "نقل أخضر يقلل الحاجة للطيران",
    imagine: "✈️💚 طائرة تتحول إلى شجرة خضراء وتطير بجذورها"
};

HELP_DATA["sprach2_exam46_q9"] = {
    text: "in den blau-gelben Europafarben gestaltet wäre",
    meaning: "لو كان مصمماً بألوان أوروبا الزرقاء والصفراء",
    keywords: ["GESTALTET = مصمم / مزين (الكلمة الصحيحة)", "blau-gelben = أزرق-أصفر", "Europafarben = ألوان أوروبا"],
    simplified: "يتمنون لو صار لون القطار أزرق وأصفر",
    imagine: "🎨🚂 قطار يدهن نفسه باللون الأزرق والأصفر"
};

HELP_DATA["sprach2_exam46_q10"] = {
    text: "wurde wegen damals hoher Verluste 2016 eingestellt",
    meaning: "تم إيقافه في 2016 بسبب الخسائر الكبيرة آنذاك",
    keywords: ["WEGEN = بسبب (الكلمة الصحيحة)", "wurde eingestellt = تم إيقافه", "damals = آنذاك"],
    simplified: "قطار الليل الألماني توقف سنة 2016 بسبب الخسائر",
    imagine: "😢🚂 قطار يبكي ونقوده تطير كالفراشات"
};
// ============================================
// Mündlich (Teil 1-42) - السلسلة السحرية
// ============================================

// ============================================
// Mündlich (Teil 1-42) - السلسلة السحرية مع تخيل قوي
// ============================================

// Exam 1: Antibiotika – Gibt es Alternativen?
HELP_DATA["mündlich_exam1_q1"] = { text: "Antibiotika → Wirkung → früher viele Krankheiten → heute resistent → falsch verwendet → Heilpflanzen Alternative", meaning: "المضادات الحيوية كانت فعالة سابقاً لكن البكتيريا أصبحت مقاومة", keywords: ["Antibiotika", "Wirkung", "resistent", "Heilpflanzen"], simplified: "المضادات الحيوية كانت تقتل الجراثيم لكنها أصبحت لا تؤثر، فالنباتات الطبية هي الحل", imagine: "🧠 تخيل جيشًا من المضادات الحيوية 🔫 يقضي على الجراثيم 🦠 بسهولة في الماضي. لكن فجأة، تتحول الجراثيم إلى وحوش ضخمة 💪🦠 تخرج من المستشفى وترتدي دروعًا مكتوبًا عليها 'RESISTENT'. الطبيب يحاول إعطاء المزيد من المضادات لكنها لا تؤثر! فجأة، تأتي نباتات طبية 🌿 عملاقة وتقف أمام الوحوش وتوقفها. 🛑" };
HELP_DATA["mündlich_exam1_q2"] = { text: "Antibiotika nur wenn nötig → resistent → Heilpflanzen → gesunde Alternative", meaning: "المضادات الحيوية فقط عند الضرورة القصوى", keywords: ["nur wenn nötig", "resistent", "gesunde Alternative"], simplified: "الإفراط في المضادات يسبب المقاومة، لذا استخدمها فقط عند الضرورة وجرب النباتات الطبية بدلاً منها", imagine: "🧠 تخيل نفسك في صيدلية 🏥. تمد يدك لشراء مضاد حيوي 💊، فجأة يصرخ الصيدلي 🗣️ 'لا! فقط عند الضرورة!' ثم تظهر شاشة كبيرة 📺 مكتوب عليها 'استخدام زائد = بكتيريا RESISTENT! 🚫🦠'. ثم ينمو نبات النعناع 🌱 عملاق من الأرض ويعطيك إياه الصيدلي مبتسمًا 😊💚." };
HELP_DATA["mündlich_exam1_q3"] = { text: "Halsschmerzen → Arzt → Tee → Heilpflanzen → besser → nicht immer nötig", meaning: "تجربة شخصية مع التهاب الحلق", keywords: ["Halsschmerzen", "Arzt", "Tee", "Heilpflanzen"], simplified: "الطبيب نصحني بالشاي والنباتات الطبية بدل المضادات، وتحسنت بسرعة", imagine: "🧠 تخيل نفسك جالسًا في غرفة المعيشة 🛋️، حلقك يؤلمك بشدة 🔥. تذهب للطبيب 👨‍⚕️، لكنه بدل أن يعطيك دواء، يقدم لك كوب شاي أخضر 🍵 ضخم يخرج منه بخار على شكل نباتات طبية 🌿. تشرب الكوب وبعد لحظات يختفي الألم ✨ وتضحك قائلًا 'لم أكن بحاجة لمضاد حيوي!' 😄." };

// Exam 2: Selbst gekocht
HELP_DATA["mündlich_exam2_q1"] = { text: "Selber-Kochen → gesund → frisch → ohne Zusatzstoffe → wissen was drin → lohnt sich", meaning: "الطبخ المنزلي صحي وطازج", keywords: ["gesund", "frisch", "ohne Zusatzstoffe"], simplified: "عندما تطبخ بنفسك، أنت تتحكم في المكونات وتتجنب المواد الضارة", imagine: "🧠 تخيل مطبخًا منزليًا 🍳، وفجأة تقفز الخضروات 🥕🥦 من الثلاجة وترقص فرحًا لأنها ستصبح طعامًا صحيًا بدون مواد حافظة. وفي الزاوية، علبة طعام جاهز 🥫 تبكي لأنها وحيدة ومليئة بالمواد الكيميائية!" };
HELP_DATA["mündlich_exam2_q2"] = { text: "selbst kochen → besser → gesünder → Kontrolle → Zutaten", meaning: "الطبخ المنزلي أفضل وأصح", keywords: ["besser", "gesünder", "Kontrolle"], simplified: "الطبخ بنفسك يعني أنت من يقرر ماذا يدخل إلى جسدك", imagine: "🧠 تخيل نفسك قبطان سفينة 🚢، ويدك على مقود القيادة. كل مكون تضعه في الطبخة هو بوصلة توجه صحتك نحو الأمان. بينما الأكل الجاهز مثل سفينة بلا قبطان تصطدم بصخور 🪨 المواد الضارة!" };
HELP_DATA["mündlich_exam2_q3"] = { text: "letzte Woche → selbst gekocht → Gemüse → Obst → gut geschmeckt → gesund → lecker", meaning: "تجربة طبخ منزلية ناجحة", keywords: ["selbst gekocht", "Gemüse", "Obst", "lecker"], simplified: "جربت الطبخ المنزلي بالأسبوع الماضي وكان لذيذًا جدًا وصحيًا", imagine: "🧠 تخيل طبقًا عملاقًا من الخضروات الملونة 🥗 يبتسم لك ويقول: 'أنا لذيذ وصحي، تعال كلني!' وبجانبه، علبة وجبة سريعة 🍔 تتنهد وتقول: 'أنا سريع لكني لن أجعل سعيدًا مثل هذا الطبق!'" };

// Exam 3: Arbeiten bis 75
HELP_DATA["mündlich_exam3_q1"] = { text: "Rentenalter → Lebenserwartung steigt → länger arbeiten → Experten → flexible Rente → selbst entscheiden", meaning: "سن التقاعد يزداد مع ارتفاع متوسط العمر", keywords: ["Rentenalter", "Lebenserwartung", "flexible Rente"], simplified: "الناس يعيشون أطول، لذا يمكنهم العمل أكثر بمرونة واختيار وقت التقاعد بأنفسهم", imagine: "🧠 تخيل ساعة رملية عملاقة ⏳، الرمل يسقط ببطء. فجأة، تتوقف الساعة وتظهر يد 👋 توقف الرمل. شخص مسن 👴 يقف ويقول: 'أنا لست مجبرًا على التقاعد الآن، سأعمل طالما أشعر بالنشاط!' وتظهر شاشة 📺 مكتوب عليها 'اختر أنت متى تتقاعد!'" };
HELP_DATA["mündlich_exam3_q2"] = { text: "Rentenalter flexibel → entscheiden → in Rente gehen → Arbeitszeit einteilen", meaning: "سن التقاعد المرن يتيح لك الحرية", keywords: ["flexibel", "entscheiden", "Arbeitszeit"], simplified: "التقاعد المرن يعني أنت من تتحكم في وقت خروجك من العمل", imagine: "🧠 تخيل مفتاحًا ذهبيًا 🔑 يفتح بابين: باب مكتوب عليه 'تقاعد مبكر' 🚪 وباب مكتوب عليه 'عمل أكثر'. أنت تمسك المفتاح وتقرر أي باب تختار. تظهر علامة ✅ خضراء وتقول: 'القرار لك وحدك!'" };
HELP_DATA["mündlich_exam3_q3"] = { text: "Onkel → länger gearbeitet → Tischler → Arbeitszeiten selbst → zufrieden → sinnvoll", meaning: "تجربة العم مع ساعات العمل المرنة", keywords: ["Onkel", "länger gearbeitet", "zufrieden"], simplified: "عمي عمل بنفسه جدول عمله وكان سعيدًا جدًا، وهذا يؤكد فكرة العمل المرن", imagine: "🧠 تخيل عمك 🧔 يقف أمام ورشة نجارة 🪚، وعلى الحائط ساعة ⏰ عقاربها تشير إلى ساعات مختلفة. يقول عمك مبتسمًا: 'أنا الذي أحدد متى أعمل، لست عبدًا للساعة!' وتظهر قطعة خشب منحوتة 💺 رائعة كدليل على إتقانه رغم تقدمه في السن." };

// Exam 4: Praktische Lerntipps
HELP_DATA["mündlich_exam4_q1"] = { text: "Lernmethoden → mehrere Sinne → Hören 20% → Hören/Sehen/Reden/Tun 90% → Wiederholen → Zusammenfassen", meaning: "استخدام أكثر من حاسة في التعلم يرفع الفهم إلى 90%", keywords: ["mehrere Sinne", "Wiederholen", "Zusammenfassen"], simplified: "التعلم بالأذن فقط يعطيك 20%، أما إذا استعملت العين والأذن واليد والفم فترتفع النسبة إلى 90% مع التكرار والتلخيص", imagine: "🧠 تخيل دماغًا كبيرًا 🧠 وقد سحب لسانًا 👅 وعينين 👀 وأذنًا 👂 ويدًا ✋ نحوه. تقول الأذن: 'أنا 20% فقط!' فيقاطعها الدماغ: 'اجتمعوا جميعًا، ستصبحون 90%!' ثم تظهر ورقة 📝 وقلم ✍️ يكتبان التلخيص." };
HELP_DATA["mündlich_exam4_q2"] = { text: "Lerntipps sinnvoll → mehrere Sinne → regelmäßig wiederholen → länger im Gedächtnis", meaning: "نصائح التعلم مفيدة جدًا", keywords: ["sinnvoll", "regelmäßig wiederholen", "Gedächtnis"], simplified: "التكرار المنتظم واستخدام الحواس يثبت المعلومة في الذاكرة", imagine: "🧠 تخيل معلومات 📚 تريد الهروب من الدماغ. فجأة، تظهر أصفاد 🔗 وتقوم بربط كل معلومة بصور وأصوات وحركات. تحاول المعلومة الفرار لكنها لا تستطيع. ثم تظهر ساعة ⏰ تقول: 'كرر كل يوم، وستبقى المعلومات حبيسة في ذاكرتك إلى الأبد!'" };
HELP_DATA["mündlich_exam4_q3"] = { text: "letztes Jahr → Methode ausprobiert → Lernstoff zusammengefasst → wiederholt → besser erinnert → Prüfung bestanden", meaning: "تجربة شخصية مع طريقة التعلم الفعالة", keywords: ["Methode ausprobiert", "wiederholt", "Prüfung bestanden"], simplified: "طبقت هذه الطريقة ونجحت في الامتحان بسهولة لأني لخصت وكررت المواد", imagine: "🧠 تخيل نفسك جالسًا على مكتب 📚، وأمامك كومة من الكتب الضخمة. ترفع يدك وتشير إلى ورقة صغيرة 📝 كتبت عليها ملخصًا. فجأة، تطير الورقة إلى رأسك 🧠 وتختفي. ثم تظهر شهادة نجاح 🎓 وتقول: 'الملخص والتكرار هما سر نجاحك!' وعيناك تدمعان فرحًا." };

// Exam 5: Schuluniform – Pro und Kontra
HELP_DATA["mündlich_exam5_q1"] = { text: "Schuluniformen → sozialer Druck → Integration → ohne Markenklamotten → ausgeschlossen → Probleme nicht vollständig lösen", meaning: "الزي المدرسي يقلل الضغط الاجتماعي ويعزز الاندماج", keywords: ["sozialer Druck", "Integration", "Markenklamotten"], simplified: "الزي المدرسي يمنع التمييز بسبب الماركات لكنه لا يحل جميع المشاكل", imagine: "🧠 تخيل طلابًا في مدرسة 🏫، بعضهم يرتدي ماركات غالية 💎 وآخرون ملابس بسيطة. فجأة، تنزل زيًا مدرسيًا موحدًا 👕 من السماء ويغطي الجميع. تختفي الماركات، لكن تظهر فقاعة كلام 💬 تقول: 'المشاكل الاجتماعية تحتاج حلولًا أعمق، ليس مجرد ملابس!'" };
HELP_DATA["mündlich_exam5_q2"] = { text: "Schuluniformen helfen → sozialer Druck → Respekt → Kommunikation → wichtiger als Kleidung", meaning: "الزي المدرسي يساعد لكن الاحترام أهم", keywords: ["helfen", "Respekt", "Kommunikation"], simplified: "الاحترام والتواصل الجيد أهم من أي زي مهما كان", imagine: "🧠 تخيل طالبين يرتديان نفس الزي المدرسي 👕، لكن أحدهما يبتسم ويصافح الآخر 🤝 والثاني يتجاهله. فجأة، تظهر ميزان ⚖️، في كفة ملابس 👔 وفي الكفة الأخرى كلمة 'احترام' 💬. تغلب كلمة الاحترام وتجعل الميزان يميل بشدة!" };
HELP_DATA["mündlich_exam5_q3"] = { text: "Grundschule → Schürze → nicht schön → Mutter froh → keine teuren Klamotten → Vorteile", meaning: "تجربة شخصية مع الزي المدرسي", keywords: ["Schürze", "Mutter froh", "Vorteile"], simplified: "كنت أكره المريلة لكن أمي كانت سعيدة لأنها وفرت المال، وأدركت فوائدها لاحقًا", imagine: "🧠 تخيل طفلة صغيرة 👧 ترتدي مريلة زرقاء 🔵 ووجهها عابس 😒، وأمها 👩 مبتسمة 😊 وتحمل محفظة نقود 💰 ممتلئة. فجأة، تكبر الطفلة وتصبح مراهقة 👩‍🎓 وتقول: 'الآن أفهم، المريلة وفرت لنا المال!' وتظهر علامة ✅ خضراء." };

// ============================================
// Mündlich (Teil 1-42) - السلسلة السحرية مع تخيل قوي (كاملاً)
// ============================================

// Exam 1: Antibiotika – Gibt es Alternativen?
HELP_DATA["mündlich_exam1_q1"] = { text: "Antibiotika → Wirkung → früher viele Krankheiten → heute resistent → falsch verwendet → Heilpflanzen Alternative", meaning: "المضادات الحيوية كانت فعالة سابقاً لكن البكتيريا أصبحت مقاومة", keywords: ["Antibiotika", "Wirkung", "resistent", "Heilpflanzen"], simplified: "المضادات الحيوية كانت تقتل الجراثيم لكنها أصبحت لا تؤثر، فالنباتات الطبية هي الحل", imagine: "🧠 تخيل جيشًا من المضادات الحيوية 🔫 يقضي على الجراثيم 🦠 بسهولة في الماضي. لكن فجأة، تتحول الجراثيم إلى وحوش ضخمة 💪🦠 تخرج من المستشفى وترتدي دروعًا مكتوبًا عليها 'RESISTENT'. الطبيب يحاول إعطاء المزيد من المضادات لكنها لا تؤثر! فجأة، تأتي نباتات طبية 🌿 عملاقة وتقف أمام الوحوش وتوقفها. 🛑" };
HELP_DATA["mündlich_exam1_q2"] = { text: "Antibiotika nur wenn nötig → resistent → Heilpflanzen → gesunde Alternative", meaning: "المضادات الحيوية فقط عند الضرورة القصوى", keywords: ["nur wenn nötig", "resistent", "gesunde Alternative"], simplified: "الإفراط في المضادات يسبب المقاومة، لذا استخدمها فقط عند الضرورة وجرب النباتات الطبية بدلاً منها", imagine: "🧠 تخيل نفسك في صيدلية 🏥. تمد يدك لشراء مضاد حيوي 💊، فجأة يصرخ الصيدلي 🗣️ 'لا! فقط عند الضرورة!' ثم تظهر شاشة كبيرة 📺 مكتوب عليها 'استخدام زائد = بكتيريا RESISTENT! 🚫🦠'. ثم ينمو نبات النعناع 🌱 عملاق من الأرض ويعطيك إياه الصيدلي مبتسمًا 😊💚." };
HELP_DATA["mündlich_exam1_q3"] = { text: "Halsschmerzen → Arzt → Tee → Heilpflanzen → besser → nicht immer nötig", meaning: "تجربة شخصية مع التهاب الحلق", keywords: ["Halsschmerzen", "Arzt", "Tee", "Heilpflanzen"], simplified: "الطبيب نصحني بالشاي والنباتات الطبية بدل المضادات، وتحسنت بسرعة", imagine: "🧠 تخيل نفسك جالسًا في غرفة المعيشة 🛋️، حلقك يؤلمك بشدة 🔥. تذهب للطبيب 👨‍⚕️، لكنه بدل أن يعطيك دواء، يقدم لك كوب شاي أخضر 🍵 ضخم يخرج منه بخار على شكل نباتات طبية 🌿. تشرب الكوب وبعد لحظات يختفي الألم ✨ وتضحك قائلًا 'لم أكن بحاجة لمضاد حيوي!' 😄." };

// Exam 2: Selbst gekocht
HELP_DATA["mündlich_exam2_q1"] = { text: "Selber-Kochen → gesund → frisch → ohne Zusatzstoffe → wissen was drin → lohnt sich", meaning: "الطبخ المنزلي صحي وطازج", keywords: ["gesund", "frisch", "ohne Zusatzstoffe"], simplified: "عندما تطبخ بنفسك، أنت تتحكم في المكونات وتتجنب المواد الضارة", imagine: "🧠 تخيل مطبخًا منزليًا 🍳، وفجأة تقفز الخضروات 🥕🥦 من الثلاجة وترقص فرحًا لأنها ستصبح طعامًا صحيًا بدون مواد حافظة. وفي الزاوية، علبة طعام جاهز 🥫 تبكي لأنها وحيدة ومليئة بالمواد الكيميائية!" };
HELP_DATA["mündlich_exam2_q2"] = { text: "selbst kochen → besser → gesünder → Kontrolle → Zutaten", meaning: "الطبخ المنزلي أفضل وأصح", keywords: ["besser", "gesünder", "Kontrolle"], simplified: "الطبخ بنفسك يعني أنت من يقرر ماذا يدخل إلى جسدك", imagine: "🧠 تخيل نفسك قبطان سفينة 🚢، ويدك على مقود القيادة. كل مكون تضعه في الطبخة هو بوصلة توجه صحتك نحو الأمان. بينما الأكل الجاهز مثل سفينة بلا قبطان تصطدم بصخور 🪨 المواد الضارة!" };
HELP_DATA["mündlich_exam2_q3"] = { text: "letzte Woche → selbst gekocht → Gemüse → Obst → gut geschmeckt → gesund → lecker", meaning: "تجربة طبخ منزلية ناجحة", keywords: ["selbst gekocht", "Gemüse", "Obst", "lecker"], simplified: "جربت الطبخ المنزلي بالأسبوع الماضي وكان لذيذًا جدًا وصحيًا", imagine: "🧠 تخيل طبقًا عملاقًا من الخضروات الملونة 🥗 يبتسم لك ويقول: 'أنا لذيذ وصحي، تعال كلني!' وبجانبه، علبة وجبة سريعة 🍔 تتنهد وتقول: 'أنا سريع لكني لن أجعل سعيدًا مثل هذا الطبق!'" };

// Exam 3: Arbeiten bis 75
HELP_DATA["mündlich_exam3_q1"] = { text: "Rentenalter → Lebenserwartung steigt → länger arbeiten → Experten → flexible Rente → selbst entscheiden", meaning: "سن التقاعد يزداد مع ارتفاع متوسط العمر", keywords: ["Rentenalter", "Lebenserwartung", "flexible Rente"], simplified: "الناس يعيشون أطول، لذا يمكنهم العمل أكثر بمرونة واختيار وقت التقاعد بأنفسهم", imagine: "🧠 تخيل ساعة رملية عملاقة ⏳، الرمل يسقط ببطء. فجأة، تتوقف الساعة وتظهر يد 👋 توقف الرمل. شخص مسن 👴 يقف ويقول: 'أنا لست مجبرًا على التقاعد الآن، سأعمل طالما أشعر بالنشاط!' وتظهر شاشة 📺 مكتوب عليها 'اختر أنت متى تتقاعد!'" };
HELP_DATA["mündlich_exam3_q2"] = { text: "Rentenalter flexibel → entscheiden → in Rente gehen → Arbeitszeit einteilen", meaning: "سن التقاعد المرن يتيح لك الحرية", keywords: ["flexibel", "entscheiden", "Arbeitszeit"], simplified: "التقاعد المرن يعني أنت من تتحكم في وقت خروجك من العمل", imagine: "🧠 تخيل مفتاحًا ذهبيًا 🔑 يفتح بابين: باب مكتوب عليه 'تقاعد مبكر' 🚪 وباب مكتوب عليه 'عمل أكثر'. أنت تمسك المفتاح وتقرر أي باب تختار. تظهر علامة ✅ خضراء وتقول: 'القرار لك وحدك!'" };
HELP_DATA["mündlich_exam3_q3"] = { text: "Onkel → länger gearbeitet → Tischler → Arbeitszeiten selbst → zufrieden → sinnvoll", meaning: "تجربة العم مع ساعات العمل المرنة", keywords: ["Onkel", "länger gearbeitet", "zufrieden"], simplified: "عمي عمل بنفسه جدول عمله وكان سعيدًا جدًا، وهذا يؤكد فكرة العمل المرن", imagine: "🧠 تخيل عمك 🧔 يقف أمام ورشة نجارة 🪚، وعلى الحائط ساعة ⏰ عقاربها تشير إلى ساعات مختلفة. يقول عمك مبتسمًا: 'أنا الذي أحدد متى أعمل، لست عبدًا للساعة!' وتظهر قطعة خشب منحوتة 💺 رائعة كدليل على إتقانه رغم تقدمه في السن." };

// Exam 4: Praktische Lerntipps
HELP_DATA["mündlich_exam4_q1"] = { text: "Lernmethoden → mehrere Sinne → Hören 20% → Hören/Sehen/Reden/Tun 90% → Wiederholen → Zusammenfassen", meaning: "استخدام أكثر من حاسة في التعلم يرفع الفهم إلى 90%", keywords: ["mehrere Sinne", "Wiederholen", "Zusammenfassen"], simplified: "التعلم بالأذن فقط يعطيك 20%، أما إذا استعملت العين والأذن واليد والفم فترتفع النسبة إلى 90% مع التكرار والتلخيص", imagine: "🧠 تخيل دماغًا كبيرًا 🧠 وقد سحب لسانًا 👅 وعينين 👀 وأذنًا 👂 ويدًا ✋ نحوه. تقول الأذن: 'أنا 20% فقط!' فيقاطعها الدماغ: 'اجتمعوا جميعًا، ستصبحون 90%!' ثم تظهر ورقة 📝 وقلم ✍️ يكتبان التلخيص." };
HELP_DATA["mündlich_exam4_q2"] = { text: "Lerntipps sinnvoll → mehrere Sinne → regelmäßig wiederholen → länger im Gedächtnis", meaning: "نصائح التعلم مفيدة جدًا", keywords: ["sinnvoll", "regelmäßig wiederholen", "Gedächtnis"], simplified: "التكرار المنتظم واستخدام الحواس يثبت المعلومة في الذاكرة", imagine: "🧠 تخيل معلومات 📚 تريد الهروب من الدماغ. فجأة، تظهر أصفاد 🔗 وتقوم بربط كل معلومة بصور وأصوات وحركات. تحاول المعلومة الفرار لكنها لا تستطيع. ثم تظهر ساعة ⏰ تقول: 'كرر كل يوم، وستبقى المعلومات حبيسة في ذاكرتك إلى الأبد!'" };
HELP_DATA["mündlich_exam4_q3"] = { text: "letztes Jahr → Methode ausprobiert → Lernstoff zusammengefasst → wiederholt → besser erinnert → Prüfung bestanden", meaning: "تجربة شخصية مع طريقة التعلم الفعالة", keywords: ["Methode ausprobiert", "wiederholt", "Prüfung bestanden"], simplified: "طبقت هذه الطريقة ونجحت في الامتحان بسهولة لأني لخصت وكررت المواد", imagine: "🧠 تخيل نفسك جالسًا على مكتب 📚، وأمامك كومة من الكتب الضخمة. ترفع يدك وتشير إلى ورقة صغيرة 📝 كتبت عليها ملخصًا. فجأة، تطير الورقة إلى رأسك 🧠 وتختفي. ثم تظهر شهادة نجاح 🎓 وتقول: 'الملخص والتكرار هما سر نجاحك!' وعيناك تدمعان فرحًا." };

// Exam 5: Schuluniform – Pro und Kontra
HELP_DATA["mündlich_exam5_q1"] = { text: "Schuluniformen → sozialer Druck → Integration → ohne Markenklamotten → ausgeschlossen → Probleme nicht vollständig lösen", meaning: "الزي المدرسي يقلل الضغط الاجتماعي ويعزز الاندماج", keywords: ["sozialer Druck", "Integration", "Markenklamotten"], simplified: "الزي المدرسي يمنع التمييز بسبب الماركات لكنه لا يحل جميع المشاكل", imagine: "🧠 تخيل طلابًا في مدرسة 🏫، بعضهم يرتدي ماركات غالية 💎 وآخرون ملابس بسيطة. فجأة، تنزل زيًا مدرسيًا موحدًا 👕 من السماء ويغطي الجميع. تختفي الماركات، لكن تظهر فقاعة كلام 💬 تقول: 'المشاكل الاجتماعية تحتاج حلولًا أعمق، ليس مجرد ملابس!'" };
HELP_DATA["mündlich_exam5_q2"] = { text: "Schuluniformen helfen → sozialer Druck → Respekt → Kommunikation → wichtiger als Kleidung", meaning: "الزي المدرسي يساعد لكن الاحترام أهم", keywords: ["helfen", "Respekt", "Kommunikation"], simplified: "الاحترام والتواصل الجيد أهم من أي زي مهما كان", imagine: "🧠 تخيل طالبين يرتديان نفس الزي المدرسي 👕، لكن أحدهما يبتسم ويصافح الآخر 🤝 والثاني يتجاهله. فجأة، تظهر ميزان ⚖️، في كفة ملابس 👔 وفي الكفة الأخرى كلمة 'احترام' 💬. تغلب كلمة الاحترام وتجعل الميزان يميل بشدة!" };
HELP_DATA["mündlich_exam5_q3"] = { text: "Grundschule → Schürze → nicht schön → Mutter froh → keine teuren Klamotten → Vorteile", meaning: "تجربة شخصية مع الزي المدرسي", keywords: ["Schürze", "Mutter froh", "Vorteile"], simplified: "كنت أكره المريلة لكن أمي كانت سعيدة لأنها وفرت المال، وأدركت فوائدها لاحقًا", imagine: "🧠 تخيل طفلة صغيرة 👧 ترتدي مريلة زرقاء 🔵 ووجهها عابس 😒، وأمها 👩 مبتسمة 😊 وتحمل محفظة نقود 💰 ممتلئة. فجأة، تكبر الطفلة وتصبح مراهقة 👩‍🎓 وتقول: 'الآن أفهم، المريلة وفرت لنا المال!' وتظهر علامة ✅ خضراء." };

// Exam 6: Ist "bequemes Essen" gut für uns?
HELP_DATA["mündlich_exam6_q1"] = { text: "Convenience Food → sparen Zeit → leicht zuzubereiten → Qualität → Bio → ungesunde Inhaltsstoffe → Müll → Kochwissen", meaning: "الوجبات الجاهزة توفر الوقت لكنها غير صحية وتسبب النفايات", keywords: ["Zeit sparen", "ungesunde Inhaltsstoffe", "Müll"], simplified: "الأكل الجاهز سريع لكنه ضار بالصحة والبيئة ويفقدك مهارات الطبخ", imagine: "🧠 تخيل رجلاً واقفًا أمام فرن الميكروويف ⏲️ يبتسم لأنه أنهى طبخه في دقيقتين. فجأة، تخرج من الفرن سحابة سوداء ☁️ وتتحول إلى جبل من القمامة 🗑️. ثم تظهر يد 🔪 تقطع الخضار وتقول: 'الطبخ السريع يسرق منك متعة الإبداع!'" };
HELP_DATA["mündlich_exam6_q2"] = { text: "Fertigprodukte praktisch → sparen Zeit → selten essen → Gesundheit", meaning: "المنتجات الجاهزة عملية لكن تناولها نادرًا أفضل للصحة", keywords: ["praktisch", "sparen Zeit", "selten essen"], simplified: "الوجبات الجاهزة مفيدة للطوارئ لكن لا تعتمد عليها دائمًا", imagine: "🧠 تخيل ساعة ⏰ تجري بسرعة وعليها أجنحة 🕊️، ثم تقف فجأة وتلهث. تظهر فتاة صغيرة 👧 وتقول: 'الأكل السريع سريع لكنه يسرق طاقتك مثلما تجري هذه الساعة بلا توقف!' وتضع ملصقًا 'نادرًا' على علبة طعام جاهز." };
HELP_DATA["mündlich_exam6_q3"] = { text: "früher Fertiggerichte → müde → letztes Jahr → selbst kochen → gesünder → energiegeladen", meaning: "تجربة شخصية: الأكل الجاهز يسبب التعب، والطبخ المنزلي يمنح الطاقة", keywords: ["Fertiggerichte", "müde", "selbst kochen"], simplified: "كنت أتعب من الأكل الجاهز، ولما بدأت أطبخ بنفسي أصبحت نشيطًا", imagine: "🧠 تخيل شخصًا نائمًا على أريكة 🛋️ مغمى عليه، وفوقه علبة طعام جاهز 🍔 تقفز وتضربه. فجأة، يستيقذ ويذهب للمطبخ 🍳 ويبدأ بالطبخ. بعد الأكل، تظهر عضلات 💪 وتلمع عيناه ⚡. ثم يقول: 'هذه هي الطاقة الحقيقية!'" };

// Exam 7: Alternative Lebensform im Alter
HELP_DATA["mündlich_exam7_q1"] = { text: "Wohngemeinschaften → ältere Menschen → selbstbestimmt → soziale Kontakte → Konflikte → pflegebedürftig → überlegen", meaning: "سكن مشترك لكبار السن يوفر استقلالية وعلاقات اجتماعية", keywords: ["selbstbestimmt", "soziale Kontakte", "Konflikte"], simplified: "العيش مع كبار آخرين يمنحك الحرية والأصدقاء لكن قد تحدث خلافات", imagine: "🧠 تخيل منزلًا كبيرًا 🏠 تخرج منه وجوه مبتسمة لكبار السن 👴👵 يلعبون الورق ♠️ ويضحكون. فجأة، اثنان منهم يتشاجران على جهاز التحكم 📺، ثم يأتي وسيط 🤝 ويصلح بينهم. تظهر لوحة 📋 مكتوب عليها 'فكر قبل أن تنتقل!'" };
HELP_DATA["mündlich_exam7_q2"] = { text: "Pflege-WG positiv → unabhängig → Einsamkeit vermeiden → Hilfe → Bedürfnisse klären", meaning: "سكن الرعاية المشترك إيجابي يمنع الوحدة ويوفر المساعدة", keywords: ["unabhängig", "Einsamkeit vermeiden", "Bedürfnisse klären"], simplified: "العيش المشترك يبقيك مستقلاً ويمنع الوحدة لكن يجب تحديد احتياجاتك أولاً", imagine: "🧠 تخيد رجلاً كبيرًا 👴 جالسًا وحيدًا في غرفة كبيرة، حوله ظلال سوداء 🌑 ترمز للوحدة. فجأة، يفتح الباب 🚪 ويدخل أصدقاء جدد 🤝 وتختفي الظلال. ثم تظهر ورقة 📝 مكتوب عليها 'احتياجاتي: أصدقاء، مساعدة، حرية'" };
HELP_DATA["mündlich_exam7_q3"] = { text: "Großtante → WG → Schwierigkeiten → später gut eingelebt → nützlich", meaning: "تجربة الخالة مع السكن المشترك: صعوبات أولاً ثم تأقلمت", keywords: ["Großtante", "WG", "gut eingelebt"], simplified: "خالتي واجهت صعوبات في البداية لكنها تحب السكن المشترك الآن", imagine: "🧠 تخيل امرأة مسنة 👵 تحمل حقيبة 🧳 وتقف أمام باب منزل. تدخل بحذر، ترى غرباء فتهرب. ثم تعود بعد أيام وهي تبتسم 😊 وتحتضن أصدقاءها الجدد. تظهر شاشة 📺 مكتوب عليها 'تحتاج وقتًا فقط!'" };

// Exam 8: Glücklich ohne Geld und Karriere
HELP_DATA["mündlich_exam8_q1"] = { text: "Praktikanten → wenig Geld → trotzdem zufrieden → Branche → Qualifikation → nur wenige Branchen", meaning: "المتدربون راضون رغم قلة المال حسب القطاع والمؤهل", keywords: ["Praktikanten", "zufrieden", "Branche"], simplified: "المتدربون سعداء رغم قلة الراتب لكن هذا يختلف حسب المجال والمؤهلات", imagine: "🧠 تخيل متدربًا 👨‍🎓 جالسًا على مكتب، أمامه كومة نقود صغيرة 💰 لكنه يبتسم 😊. فجأة، تظهر مقابض 🔧 ومفاتيح 🔑 وترتفع النقود. ثم تظهر لافتات: 'طب' 🏥 'هندسة' 🔧 'إعلام' 📺، بعضها يرفع الراتب وبعضها لا." };
HELP_DATA["mündlich_exam8_q2"] = { text: "Praktika wichtig → Erfahrung → besser bezahlt → motiviert → fair behandelt", meaning: "التدريب العملي مهم للخبرة ويجب أن يكون الأجر أفضل", keywords: ["wichtig", "Erfahrung", "fair behandelt"], simplified: "التدريب يمنحك خبرة لكن يجب أن يُدفع لك جيدًا لتكون متحمسًا", imagine: "🧠 تخيل متدربًا يكتب على لوحة 📝 'خبرة' ويضعها في جيبه. فجأة، تظهر يد 🤲 تضع نقودًا 💰 بجانبها. ثم يبتسم المتدرب 😊 وتظهر علامة 'تحفيز' 🚀. ثم يظهر ميزان ⚖️ يحقق العدالة بين الجهد والأجر." };
HELP_DATA["mündlich_exam8_q3"] = { text: "Freund → Praktikum → wenig Geld → viel gelernt → neue Erfahrungen → später geholfen", meaning: "تجربة صديق: تدرب براتب قليل لكنه تعلم كثيرًا واستفاد لاحقًا", keywords: ["Praktikum", "viel gelernt", "später geholfen"], simplified: "صديقي تدرب براتب بسيط لكنه اكتسب خبرات ساعدته كثيرًا بعد ذلك", imagine: "🧠 تخيل صديقك 🧑 يضع نقودًا قليلة 💸 في جيب واحد، ويضع كتابًا 📚 كبيرًا في الجيب الآخر. بعد فترة، الكتاب يتحول إلى سلم 🪜 يصعد عليه نحو النجاح 🏆. ثم يلوح بيده ويقول: 'الخبرة أثمن من المال!'" };

// Exam 9: Schönheitsoperationen bei Minderjährigen
HELP_DATA["mündlich_exam9_q1"] = { text: "Schönheitsoperationen → Minderjährige → unnötige Eingriffe → Ausnahmen → schwierig unterscheiden", meaning: "عمليات التجميل للقصر محدودة ويصعب التمييز بين الحاجة والرغبة", keywords: ["Minderjährige", "unnötige Eingriffe", "schwierig unterscheiden"], simplified: "من الصعب التفرقة بين الحاجة الطبية ورغبة التجميل عند الأطفال", imagine: "🧠 تخيل طفلة 👧 تقف أمام مرآة 💇 وتنظر إلى أنفها. فجأة، يظهر ملاك 👼 ومعه سكين 🔪، وشيطان 👿 ومعه سكين آخر. الاثنان يصرخان: 'أنا الصواب!' تظهر علامة استفهام ❓ كبيرة وتتساءل: 'من على حق؟'" };
HELP_DATA["mündlich_exam9_q2"] = { text: "unnötige Operationen vermeiden → Notfälle okay → Kinder lernen → selbstbewusst umgehen", meaning: "تجنب العمليات غير الضرورية، والطوارئ استثناء، وعلّم طفلك الثقة بنفسه", keywords: ["vermeiden", "Notfälle", "selbstbewusst"], simplified: "لا تجري عمليات تجميل غير ضرورية للأطفال، وعلمهم أن يكونوا واثقين من أنفسهم", imagine: "🧠 تخيد طفلاً خجولاً 😔 ينظر إلى المرآة. فجأة، تسقط سماء الثقة 💪 عليه ويصبح واقفًا بشموخ 🦁. تظهر لوحة 🖼️ مكتوب عليها 'جمالك الداخلي أهم'. ثم يختفي المشرط 🔪 نهائيًا." };
HELP_DATA["mündlich_exam9_q3"] = { text: "Mitschüler → schiefe Zähne → Zahnspange → unsicher → unterstützt → selbstbewusst", meaning: "تجربة زميل: أسنان معوجة، تقويم، دعم الأهل، ثقة", keywords: ["schiefe Zähne", "Zahnspange", "selbstbewusst"], simplified: "زميلي كان خجولاً من أسنانه لكن الدعم حوله إلى شخص واثق", imagine: "🧠 تخيل فماً بأسنان معوجة 🦷، ثم توضع تقويمات معدنية 🔗. الوجه كان عابسًا 😒 ثم يظهر الأهل 👨‍👩‍👦 ويصفقون 👏. بعد فترة، تبتسم الأسنان 😁 وتتألق ⭐. ثم يقول الفم: 'شكرًا للداعمين!'" };

// Exam 10: Kinderuniversitäten
HELP_DATA["mündlich_exam10_q1"] = { text: "Kinderuniversitäten → 2002 → Kinder 8–12 → Universität Tübingen → freiwillig → ohne Noten → beliebt → Ärzte → Bewegung", meaning: "جامعات الأطفال من 8-12 سنة في توبنغن منذ 2002، تطوعية وبدون درجات لكن الأطباء ينتقدون قلة الحركة", keywords: ["Kinderuniversitäten", "freiwillig", "ohne Noten"], simplified: "أطفال يتعلمون في الجامعة بدون ضغط درجات، لكنهم يحتاجون لرياضة أكثر", imagine: "🧠 تخيل أطفالاً 👧🧒 يرتدون قبعات تخرج 🎓 ويجلسون في قاعة جامعية. فجأة، تظهر كرة قدم ⚽ وتطلب اللعب. الأطفال يتجاهلونها، فتحزن الكرة. ثم يظهر طبيب 👨‍⚕️ ويقول: 'تحركوا! الصحة أهم من القبعة!'" };
HELP_DATA["mündlich_exam10_q2"] = { text: "Kinderuniversitäten gute Idee → Interesse → Wissenschaft → Sport → Bewegung", meaning: "جامعات الأطفال فكرة جيدة تنمي الفضول العلمي مع ضرورة الرياضة", keywords: ["gute Idee", "Interesse", "Wissenschaft"], simplified: "جامعات الأطفال تنمي حب العلم لكن الرياضة ضرورية أيضًا", imagine: "🧠 تخيل دماغ طفل 🧠 ينمو وتخرج منه مجرة 🔭 وكواكب 🌍. فجأة، تظهر عضلات 💪 وترقص. الطفل يجري بين الكتاب 📖 والكرة ⚽ ويقول: 'أريد الاثنين معًا!' تظهر لافتة: 'توازن = نجاح'" };
HELP_DATA["mündlich_exam10_q3"] = { text: "Sommerferien → Hallenbad → schwimmen → ohne Noten → ohne Stress → Neues gelernt", meaning: "تجربة تعلم السباحة بدون ضغط في الصيف", keywords: ["Sommerferien", "schwimmen", "ohne Druck"], simplified: "تعلمت السباحة في الإجازة بدون درجات وبدون قلق، وكانت تجربة رائعة", imagine: "🧠 تخيل طفلاً يقفز في المسبح 🏊‍♂️، وفوق رأسه علامة 'بدون درجات' 🚫📝. يسبح ويضحك 😊، وتخرج من الماء نجمة ⭐. ثم يقول: 'تعلمت بدون خوف!' وتظهر سمكة 🐟 ترفع زعنفتها كعلامة نجاح." };

// Exam 11: Fast Food
HELP_DATA["mündlich_exam11_q1"] = { text: "Fast Food → Sucht → Ratten → Kontrolle verloren → Menschen achten", meaning: "الوجبات السريعة قد تسبب الإدمان مثلما حدث مع الفئران", keywords: ["Fast Food", "Sucht", "Ratten"], simplified: "الفئران فقدت السيطرة بعد أكل الدهون، والإنسان يجب أن يحذر", imagine: "🧠 تخيل فأرًا 🐭 يأكل برجر 🍔 بشراهة، ثم يدور في عجلة 🎡 بسرعة جنونية ولا يتوقف. فجأة، يتحول إلى فأر ضخم 💪🦷 ويكسر القفص. ثم تظهر لافتة ⚠️: 'هل أنت مثل هذا الفأر؟'" };
HELP_DATA["mündlich_exam11_q2"] = { text: "Fast Food vermeiden → süchtig → Gesundheit schaden → gesunde Ernährung besser", meaning: "تجنب الوجبات السريعة فهي تسبب الإدمان وتضر بالصحة", keywords: ["vermeiden", "süchtig", "gesunde Ernährung"], simplified: "الأكل الصحي أفضل دائمًا، والوجبات السريعة تدمر صحتك", imagine: "🧠 تخيل شخصًا يمسك بيده اليمنى سلطة 🥗 خضراء، وباليسرى برجر 🍔. فجأة، تتحرك اليد اليسرى وترمي البرجر بعيدًا 🗑️، بينما ترفع السلطة عاليًا 🌟. تظهر لافتة: 'اختر صحتك!'" };
HELP_DATA["mündlich_exam11_q3"] = { text: "Cousin → viel Fast Food → nicht aufhören → später gesünder → besser gefühlt", meaning: "تجربة ابن العم: أكل سريع بكثرة، ثم تحول للأكل الصحي وتحسن", keywords: ["Cousin", "Fast Food", "besser gefühlt"], simplified: "ابن عمي كان مدمنًا للوجبات السريعة، ولما تركها شعر بتحسن كبير", imagine: "🧠 تخيل ابن عمك 🧑 أمام جبل من وجبات سريعة 🍟🍔، وعليه قيود ⛓️. فجأة، ينفجر الجبل 💥 ويخرج من تحته سلطة خضراء 🥗. يركض نحوها ويأكلها، ثم تظهر عضلات 💪 ووجه مبتسم 😊. يقول: 'الحرية في الصحة!'" };

// Exam 12: Zweisprachigkeit bei Kindern
HELP_DATA["mündlich_exam12_q1"] = { text: "Zweisprachigkeit → Kinder → Vorteile Kultur → Denken → Zukunft", meaning: "تعدد اللغات عند الأطفال مفيد ثقافيًا وفكريًا ومستقبليًا", keywords: ["Zweisprachigkeit", "Vorteile", "Kultur"], simplified: "الطفل ثنائي اللغة يتمتع بميزات في التفكير والثقافة والفرص", imagine: "🧠 تخيل دماغ طفل 🧠 ينقسم إلى نصفين: نصف يتحدث ألمانيًا 🇩🇪، ونصف يتحدث عربيًا 🇸🇦. فجأة، يخرج من الدماغ أشعة 💡 تضيء العالم. تظهر خريطة 🗺️ وتتوسع، ثم تظهر فرص عمل 💼 وسفر ✈️." };
HELP_DATA["mündlich_exam12_q2"] = { text: "Zweisprachigkeit positiv → Kulturen → reisen → arbeiten → kommunizieren", meaning: "تعدد اللغات يفتح آفاق السفر والعمل والتواصل", keywords: ["positiv", "Kulturen", "kommunizieren"], simplified: "تعدد اللغات يسهل السفر والعمل والتفاهم مع الثقافات الأخرى", imagine: "🧠 تخيل طفلاً يركب طائرة ✈️ ويحمل جواز سفر يحمل أعلامًا متعددة 🏳️‍🌈. يهبط في بلد جديد، يتحدث مع الناس 💬، ويبدأ العمل 💼. ثم تظهر جسور 🌉 تربط بين الثقافات وتكتب 'لغة واحدة = جسر واحد، لغتان = جسران!'" };
HELP_DATA["mündlich_exam12_q3"] = { text: "Freund → kleine Schwester → zwei Sprachen → schwierig → später gut gesprochen", meaning: "تجربة أخت صديق: صعوبة في البداية ثم إتقان", keywords: ["kleine Schwester", "zwei Sprachen", "gut gesprochen"], simplified: "أخت صديق الصغيرة تعلمت لغتين، واجهت صعوبة ثم أتقنتهما", imagine: "🧠 تخيل طفلة صغيرة 👧 تحمل كتابين 📚📚، تسقط منهما فتتعثر. تبكي قليلاً 😢 ثم تمسح دموعها. بعد فترة، تطير الكتب ✈️ وتدخل إلى رأسها 🧠 بسلاسة. ثم تقف وتقول بكل فخر: 'أنا أتحدث لغتين!' وتظهر نجمة ⭐ على جبينها." };

// Exam 13: Blutspende
HELP_DATA["mündlich_exam13_q1"] = { text: "Blutspenden → Deutschland → 15.000 täglich → wenige spenden → Gesundheitscheck → Leben retten", meaning: "ألمانيا تحتاج 15,000 تبرع دم يوميًا، لكن القليل فقط يتبرعون", keywords: ["Blutspenden", "Gesundheitscheck", "Leben retten"], simplified: "الدم المنقول ينقذ حياة، والفحص الطبي مجاني، تبرع وانقذ حياة", imagine: "🧠 تخيل مستشفى 🏥، 15,000 سرير فارغ بانتظار الدم. فجأة، يدخل أشخاص 👥 قليلون فقط. لكن نقطة دم واحدة 🩸 تتحول إلى قلب ينبض ❤️ وتنقذ سريرًا. ثم تتضاعف النقاط وتملأ كل الأسرة. تظهر لافتة: 'تبرع واحد = حياة واحدة!'" };
HELP_DATA["mündlich_exam13_q2"] = { text: "Blutspenden wichtig → Leben retten → mehr Menschen spenden", meaning: "التبرع بالدم مهم جدًا، يجب أن يتبرع المزيد من الناس", keywords: ["wichtig", "Leben retten", "mehr Menschen"], simplified: "تبرع بالدم، فأنت تنقذ حياة بشر. أكثر الناس تفعل ذلك", imagine: "🧠 تخيل شخصًا جالسًا على كرسي 🪑، ويده متصلة بكيس دم 🩸. فجأة، يظهر شخص آخر 🧑 يركض ويجلس بجانبه. ثم ثالث ورابع. يتسابقون لملء الكيس. ثم تظهر شاشة 📺: 'كلما زاد عدد المتبرعين، زاد عدد الأرواح التي تُنقذ!'" };
HELP_DATA["mündlich_exam13_q3"] = { text: "Freund → Krankenhaus → Blutgruppe → eingeladen → gespendet", meaning: "تجربة تبرع بالدم: صديق دعاني، وعرفت فصيلتي وتبرعت", keywords: ["Krankenhaus", "Blutgruppe", "gespendet"], simplified: "صديق دعاني للتبرع، عرفت فصيلة دمي وتبرعت، كانت تجربة جميلة", imagine: "🧠 تخيل صديقين 🧑🤝🧑 يدخلان المستشفى 🏥. أحدهما يقول: 'تعال نعرف فصائل دمنا'. يخرجان وبطاقة في اليد 🃏 مكتوب عليها 'O+' و'A-'. ثم يتبرعان ويخرجان وهما يضحكان 😊. تظهر فقاعة: 'معًا نصنع الفارق!'" };

// Exam 14: Lachen und Gesundheit
HELP_DATA["mündlich_exam14_q1"] = { text: "Lachen → Kinder → häufiger → Angst reduzieren → Immunsystem stärken → Therapie", meaning: "الضحك يقلل الخوف ويقوي المناعة ويستخدم كعلاج في المستشفيات", keywords: ["Lachen", "Immunsystem", "Therapie"], simplified: "الضحك مفيد جدًا للصحة النفسية والجسدية ويستخدم في العلاج", imagine: "🧠 تخيل مستشفى 🏥، مرضى حزينون 😞. فجأة، يدخل مهرج 🤡 ويبدأ بإضحاكهم. تختفي الوجوه الحزينة وتظهر ضحكات 😂. ثم تظهر درع 🛡️ يحمي من الأمراض. تظهر لافتة: 'الضحك أفضل دواء!'" };
HELP_DATA["mündlich_exam14_q2"] = { text: "Lachen wichtig → Gesundheit → Alltag → vorsichtig → Auslachen verletzen", meaning: "الضحك مهم لكن السخرية تؤذي الآخرين", keywords: ["wichtig", "Gesundheit", "Auslachen"], simplified: "اضحك، لكن لا تسخر من الآخرين، فالضحك المفيد هو الذي مع الناس لا عليهم", imagine: "🧠 تخيل شخصًا يضحك بصوت عالٍ 😂 وفجأة يتحول ضحكه إلى سهام 🏹 تصيب شخصًا آخر فيؤلمه 😢. ثم يتوقف، ويبدأ بالضحك مع الشخص الآخر 🤝. ثم تظهر فقاعة: 'اضحك مع الناس، لا عليهم!'" };
HELP_DATA["mündlich_exam14_q3"] = { text: "Freunde → lustiger Film → viel gelacht → entspannter → Stress reduziert", meaning: "تجربة: فيلم مضحك مع الأصدقاء يقلل التوتر", keywords: ["lustiger Film", "viel gelacht", "Stress reduziert"], simplified: "شاهدت فيلمًا مضحكًا مع أصدقائي، ضحكنا كثيرًا وارتاح أعصابنا", imagine: "🧠 تخيل مجموعة أصدقاء 👥 جالسين على أريكة 🛋️ أمام تلفاز 📺. يخرج من التلفاز موجة ضحك 🌊 تغمرهم. ثم تظهر ساعة توقيت ⏱️ يقل فيها التوتر. ثم يتنفسون بعمق 🧘 ويقولون: 'هذا أفضل علاج!'" };

// Exam 15: Gefundene Sachen – behalten oder abgeben?
HELP_DATA["mündlich_exam15_q1"] = { text: "Gefundene Sachen → nicht behalten → Besitzer finden → Belohnung", meaning: "الأشياء المفقودة يجب إرجاعها لصاحبها، وقد تحصل على مكافأة", keywords: ["gefunden", "Besitzer finden", "Belohnung"], simplified: "لا تحتفظ بالشيء المفقود، ابحث عن صاحبه تكافأ", imagine: "🧠 تخيل شخصًا يجد محفظة نقود 💰 على الأرض. يحاول أن يفتحها، فتصرخ المحفظة: 'أنا لست لك!' فيصدم ويغلقها. ثم يذهب للشرطة 👮 ويسلمها. بعد يوم، يعود صاحبها 🧑 ويمنحه جائزة 🎁. ثم يبتسم 🥰." };
HELP_DATA["mündlich_exam15_q2"] = { text: "Gefundene Sachen abgeben → ehrlich → fair → Recht des Besitzers", meaning: "إرجاع المفقودات تصرف صادق وعادل، فالمالك له الحق", keywords: ["abgeben", "ehrlich", "fair"], simplified: "الصدق والعدل يقتضيان إرجاع المفقودات إلى أصحابها", imagine: "🧠 تخيل شخصين: الأول يحتفظ بشيء وجده 🕵️ ويظهر عليه علامة 'لص' 👎. والآخر يرجعه ويظهر عليه علامة 'صادق' 👍 وتاج 👑. ثم تظهر ميزان ⚖️ يرجح كفة الصدق. ثم يصرخ المالك: 'هذا حقي!'" };
HELP_DATA["mündlich_exam15_q3"] = { text: "Freund → Brieftasche → Polizei → abgegeben → Belohnung", meaning: "تجربة صديق: وجد محفظة، سلمها للشرطة، وكوفئ", keywords: ["Brieftasche", "Polizei", "Belohnung"], simplified: "صديقي وجد محفظة وذهب بها للشرطة، وشكره صاحبها وأعطاه مكافأة", imagine: "🧠 تخيل صديقك 🧑 يجد محفظة في الشارع، يركض بها إلى مركز الشرطة 🏢. ثم يعود مبتسمًا 😊. بعدها، يظهر شخص غريب 🧑 ويعانقه 🤗 ويضع في يده نقودًا 💰. ثم يقول صديقك: 'كنت سأشعر بالذنب لو احتفظت بها!'" };

// Exam 16: Tiere als Geschenk
HELP_DATA["mündlich_exam16_q1"] = { text: "Tiere → Geschenk → Freude → Verantwortung → Zeit → Pflege", meaning: "الحيوان هدية تجلب الفرحة لكنها تتطلب مسؤولية ووقتًا ورعاية", keywords: ["Tiere", "Verantwortung", "Zeit", "Pflege"], simplified: "الهدية الحيوانية تحتاج إلى تفكير عميق، فهي مسؤولية كبيرة", imagine: "🧠 تخيل طفلاً يفتح هدية 🎁 ويجد جروًا 🐶، يصرخ فرحًا. بعد أيام، الجرو يكبر ويحتاج للمشي والطعام والحمام. الطفل يركض خلف الجرو منهكًا. ثم تظهر لافتة: 'فكر قبل أن تهدي!'" };
HELP_DATA["mündlich_exam16_q2"] = { text: "Tier kein spontanes Geschenk → sprechen → Verantwortung → Zeit", meaning: "الحيوان هدية ليست مفاجئة جيدة، تحدث مع الشخص أولاً", keywords: ["kein Geschenk", "sprechen", "Verantwortung"], simplified: "لا تهدِ حيوانًا فجأة، ناقش الأمر مع الشخص أولاً، فالحيوان مسؤولية", imagine: "🧠 تخيل شخصًا يقدم جروًا كهدية مفاجئة 🎁، فيتفاجأ الشخص الآخر ويتراجع خائفًا 😨. ثم يظهر حوار 💬 بينهما يتفقان فيه على نوع الحيوان والمسؤولية. ثم تظهر علامة ✅ خضراء ويبتسمان معًا." };
HELP_DATA["mündlich_exam16_q3"] = { text: "Nachbar → Kind → Hund → glücklich → später kümmern", meaning: "الجار أهدى ابنه كلبًا، ابتهج أولاً ثم تطلب الرعاية", keywords: ["Nachbar", "Hund", "glücklich"], simplified: "الطفل كان سعيدًا جدًا بالكلب، لكن العائلة اضطرت للعناية به يوميًا لاحقًا", imagine: "🧠 تخيل طفلاً يلعب مع كلبه 🐕 ويضحك 😊. بعد فترة، الكلب يكبر ويجلس بجانب الباب 🚪 منتظرًا الخروج. الطفل يئن من التعب 😩 ويطلب المساعدة من والديه. ثم تظهر أيام الأسبوع 📅 كلها مكتوب عليها 'رعاية كلب'." };

// Exam 17: Hausaufgaben – notwendig oder nicht?
HELP_DATA["mündlich_exam17_q1"] = { text: "Hausaufgaben → müde → keine Hilfe → Wiederholen wichtig → Selbstständigkeit fördern", meaning: "الواجبات المنزلية مرهقة أحيانًا لكنها تقوي التكرار والاعتماد على الذات", keywords: ["Hausaufgaben", "müde", "Selbstständigkeit"], simplified: "البعض يرفضها للتعب، والبعض يراها ضرورية للتكرار والاستقلالية", imagine: "🧠 تخيل تلميذًا نائمًا على مكتبه 🥱، والكتب مبعثرة 📚. فجأة، تنهض الكتب وتصف نفسها وتجلس مكانه. ثم يستيقظ ويجد المهام منجزة 🎯. يتعلم كيف يعتمد على نفسه ويبتسم." };
HELP_DATA["mündlich_exam17_q2"] = { text: "Hausaufgaben notwendig → helfen → zu viele → müde → Freizeit weg", meaning: "الواجبات ضرورية أحيانًا لكن كثرتها مرهقة", keywords: ["notwendig", "helfen", "Freizeit"], simplified: "الواجب المنزلي مفيد لكن الإفراط فيه ينهك التلميذ ويضيع وقته", imagine: "🧠 تخيل جبلًا من الواجبات 📚⛰️، تلميذ يحاول تسلقه ويكاد يسقط. ثم تصبح مطرقة 🔨 وتكسر الجبل إلى قطع صغيرة. تظهر ساعة ⏰ ويجلس التلميذ ليستريح في حديقة 🌳. ثم تظهر لافتة: 'توازن!'" };
HELP_DATA["mündlich_exam17_q3"] = { text: "Ich → viele Hausaufgaben → müde → Wiederholen → besser verstanden → Prüfungen", meaning: "تجربة: تعبت من كثرة الواجبات لكن التكرار ساعدني في الامتحانات", keywords: ["viele Hausaufgaben", "Wiederholen", "Prüfungen"], simplified: "الواجبات كانت مرهقة لكنها ساعدتني في الفهم والنجاح", imagine: "🧠 تخيل شخصًا يركض في حلقة مفرغة 🏃، متعبًا لكنه يصرخ: 'سأنجح!' تظهر أمامه شهادة نجاح 🎓، فيسرع أكثر. يصل ويأخذ الشهادة ويجلس مرتاحًا 😌. ثم يقول: 'التعب كان يستحق العناء!'" };

// Exam 18: Wie lange dürfen Jugendliche abends ausgehen?
HELP_DATA["mündlich_exam18_q1"] = { text: "Jugendliche → abends ausgehen → Eltern schützen → Freiheit → Vertrauen → Verantwortung", meaning: "خروج المراهقين ليلاً: الأهل يريدون الحماية، والمراهقون يريدون الحرية", keywords: ["ausgehen", "Eltern schützen", "Freiheit"], simplified: "الحل هو الثقة والمسؤولية المتبادلة بين الأهل والمراهقين", imagine: "🧠 تخيل مراهقًا يريد الخروج ليلاً 🌙، وأمه تمسك بيده وتقول 'لا'. فجأة، يظهر مفتاح 🔑 ويفتح بابًا عليه كلمتا 'ثقة' و'مسؤولية'. يخرج المراهق ويعود في الوقت المحدد ⏰، وتصفق له الأم 👏." };
HELP_DATA["mündlich_exam18_q2"] = { text: "Jugendliche Freiheit → Eltern Regeln → schützen → Vertrauen", meaning: "المراهقون بحاجة لحرية مع قواعد واضحة من الأهل للحماية والثقة", keywords: ["Freiheit", "Regeln", "Vertrauen"], simplified: "الحرية مع القواعد تبني الثقة وتحقق الحماية", imagine: "🧠 تخيل طائرًا 🕊️ يطير في السماء، لكنه مربوط بحبل طويل إلى الأرض 🪢. الحبل يسمح له بالطيران لكن لا يضيعه. الأهل يمسكون الحبل ويطمئنون. ثم تظهر لافتة: 'حرية مسؤولة = أمان!'" };
HELP_DATA["mündlich_exam18_q3"] = { text: "Ich → Eltern gefragt → länger draußen → vertraut → pünktlich zurück → sagen wo", meaning: "تجربة: سألت والدي للبقاء خارجًا أطول، وثقوا بي، وكنت ملتزمًا", keywords: ["länger draußen", "vertraut", "pünktlich"], simplified: "طلبت من والدي البقاء خارجًا أكثر، وثقوا بي فلم أخيب ظنهم", imagine: "🧠 تخيل مراهقًا يتصل بوالديه 📱 ويقول: 'سأتأخر قليلاً، أنا عند صديقي'. ثم يعود في الوقت المحدد ⏰ ويجد ابتسامة ترحيب 😊. ثم تظهر شاشة 📺: 'الثقة تُبنى بالصدق!'" };

// Exam 19: Rauchen
HELP_DATA["mündlich_exam19_q1"] = { text: "Rauchen → Deutschland → 21 Millionen → Jugendliche → Werbung → cool → gefährlich", meaning: "21 مليون مدخن في ألمانيا، الشباب يتأثرون بالإعلانات، والتدخين خطر", keywords: ["Rauchen", "Jugendliche", "gefährlich"], simplified: "الإعلانات تجعل التدخين يبدو رائعًا لكنه في الحقيقة قاتل", imagine: "🧠 تخيل إعلانًا 📺 عن سيجارة دخان يخرج منها شاب وسيم 😎 يضحك. فجأة، يدخن فيتحول إلى هيكل عظمي 💀، وتخرج من الإعلان علامة خطر ⚠️. ثم تظهر رئة سوداء 🫁 مريضة وتقول: 'لا تنخدع!'" };
HELP_DATA["mündlich_exam19_q2"] = { text: "Niemand rauchen → Geld kostet → Gesundheit schadet → Verantwortung → Aufhören beste Entscheidung", meaning: "لا تدخن، فالتدخين يضيع المال ويضر الصحة، والإقلاع أفضل قرار", keywords: ["Geld", "Gesundheit", "Aufhören"], simplified: "الإقلاع عن التدخين هو أفضل هدية تقدمها لنفسك ولمن تحب", imagine: "🧠 تخيل محفظة نقود 💰 تشتعل فيها النار 🔥، ورئة 🫁 تسعل دماً. فجأة، تطفأ النار وتتحول النقود إلى وردة 🌹، وتتحول الرئة إلى قلب ينبض ❤️. ثم تظهر لافتة: 'الإقلاع = حياة جديدة!'" };
HELP_DATA["mündlich_exam19_q3"] = { text: "Onkel → stark geraucht → Sohn geboren → aufgehört → Vorbild → gesünder", meaning: "تجربة العم: كان مدخنًا شرسًا، فلما ولد ابنه أقلع وصار قدوة", keywords: ["stark geraucht", "aufgehört", "gesünder"], simplified: "ولادة ابنه جعلته يقلع عن التدخين، وأصبح أكثر صحة وقدوة حسنة", imagine: "🧠 تخيل رجلاً يدخن سيجارة 🚬، وفجأة يسمع بكاء طفل 👶. تخرج السيجارة من فمه وتتحطم 💥. ثم يركض نحو الطفل ويحمله 🫂، وتظهر حوله هالة نور ✨. ثم يقول: 'أجمل إقلاع في حياتي!'" };

// Exam 20: Hochbegabte Kinder – Spezialschulen oder Integration
HELP_DATA["mündlich_exam20_q1"] = { text: "Hochbegabte Kinder → Förderung → Spezialschulen → Integration → soziale Entwicklung", meaning: "الأطفال الموهوبون يحتاجون مدارس خاصة لكن الدمج مهم للنمو الاجتماعي", keywords: ["Hochbegabte", "Spezialschulen", "Integration"], simplified: "الموهوب يحتاج تحفيزًا عقليًا وتواصلًا اجتماعيًا معًا", imagine: "🧠 تخيل طفلًا ذكيًا 🧒 يحمل صاروخًا 🚀 يطير به في الفضاء. فجأة، يهبط في جزيرة وحيدة 🏝️ ويشعر بالوحدة. ثم تظهر أيدي 🤝 تأخذه إلى مجموعة من الأطفال يلعبون معًا. ثم يقول: 'الذكاء مع الأصدقاء أفضل!'" };
HELP_DATA["mündlich_exam20_q2"] = { text: "Mischung am besten → Förderung → Kontakt mit anderen → soziale Fähigkeiten entwickeln", meaning: "المزج بين التعليم الخاص والدمج هو الأفضل لتطوير المهارات الاجتماعية", keywords: ["Mischung", "Förderung", "soziale Fähigkeiten"], simplified: "اجمع بين التحفيز الذهني والتواصل الاجتماعي لتنمية متكاملة", imagine: "🧠 تخيل كعكة 🎂 نصفها كتاب 📚 ونصفها أطفال يلعبون 👧🧒. عندما تأكلها، تشعر أن عقلك ينمو 🧠 وتضحك 😊. ثم تظهر لافتة: 'التوازن = نجاح شامل!'" };
HELP_DATA["mündlich_exam20_q3"] = { text: "Mitschüler → sehr intelligent → zusätzliche Aufgaben → gleiche Klasse → gut entwickelt", meaning: "تجربة زميل موهوب: مهام إضافية في نفس الصف، تطور جيد", keywords: ["intelligent", "zusätzliche Aufgaben", "gut entwickelt"], simplified: "زميلي الذكي بقي في نفس الصف مع مهام إضافية وتطور بشكل رائع", imagine: "🧠 تخيل طالبًا ذكيًا 🧑‍🎓 يجلس في الصف 🏫، وأستاذ يضع بجانبه كتابًا إضافيًا 📖 ويسأله: 'هل تستطيع؟' فيجيب بنعم ويفتحه. بعد فترة، يخرج منه ضوء 💡 ويضيء الصف بأكمله. ثم يقول: 'الشدة تولد القوة!'" };

// Exam 21: Hochzeit nur zu zweit
HELP_DATA["mündlich_exam21_q1"] = { text: "Hochzeit → ohne Gäste → einfach → Geld sparen → ruhig genießen", meaning: "زواج بدون ضيوف بسيط يوفر المال ويسمح بالاستمتاع بهدوء", keywords: ["ohne Gäste", "einfach", "Geld sparen"], simplified: "احتفال بسيط بدون ضيوف يوفر المال ويكون هادئًا وممتعًا", imagine: "🧠 تخيل عروسين 👰🤵 على شاطئ البحر 🏖️، لا أحد معهما سوى طيور النورس 🕊️. يتبادلان الخواتم 💍 في هدوء، وتظهر نقود 💰 تتراقص فرحًا لتوفيرها. ثم يقولان: 'السعادة ليست في العدد!'" };
HELP_DATA["mündlich_exam21_q2"] = { text: "Kleine Hochzeit → gute Idee → Familie & Freunde wichtig", meaning: "الزفاف الصغير فكرة جيدة لكن وجود الأهل والأصدقاء مهم", keywords: ["kleine Hochzeit", "gute Idee", "Familie wichtig"], simplified: "الفرح الصغير جميل، لكن وجود الأحبة يضفي لمسة خاصة", imagine: "🧠 تخيل عروسين يرقصان في قاعة صغيرة 💒، وبجانبهما أمهما 👩‍👧 وأبوهما 👨‍👦 يصفقان. فجأة، ينفتح القلب ❤️ وتخرج منه قلوب صغيرة 🫀 تحيط بهما. ثم تظهر لافتة: 'العائلة نعمة!'" };
HELP_DATA["mündlich_exam21_q3"] = { text: "Freund → kleine Hochzeit → Geld sparen → ruhig genießen", meaning: "صديق يفضل الزفاف الصغير لتوفير المال والهدوء", keywords: ["Freund", "kleine Hochzeit", "ruhig genießen"], simplified: "صديقي يريد حفل زفاف صغيرًا لتوفير المال وقضاء يوم هادئ", imagine: "🧠 تخيل صديقك 🧑 يجلس مع خطيبته وينظران إلى حصالة نقود 🐖 تنمو. ثم يتجهان إلى مكان هادئ 🌲 ويجلسان تحت شجرة 🌳. ثم يرفعان كأسين 🥂 ويقولان: 'لحياة بسيطة وسعيدة!'" };

// Exam 22: Hausaufgaben (مكرر Exam 17 بنفس التخيل)

// Exam 23: Stadtwohnung oder Haus im Grünen
HELP_DATA["mündlich_exam23_q1"] = { text: "Stadtwohnung → Arbeit → Kultur → kurze Wege → Haus im Grünen → Ruhe → Natur → Umweltprobleme", meaning: "شقة المدينة توفر العمل والثقافة، والبيت في الريف يوفر الهدوء والطبيعة", keywords: ["Stadtwohnung", "Haus im Grünen", "Umweltprobleme"], simplified: "لكل نمط سكن مميزاته، الريف أفضل للصحة والأسرة", imagine: "🧠 تخيل شقة في المدينة 🏢 بها مصاعد وسيارات 🚗، وبيتًا في الريف 🏡 به أشجار وطيور 🕊️. فجأة، تتنافس الصورتان: صخب المطار 🛫 مقابل هدوء الغابة 🌲. ثم تظهر لافتة: 'اختر توازنك!'" };
HELP_DATA["mündlich_exam23_q2"] = { text: "Wohnformen Vorteile → Ruhe → Natur → Gesundheit → Familie", meaning: "الهدوء والطبيعة أفضل للصحة والأسرة", keywords: ["Ruhe", "Natur", "Gesundheit"], simplified: "العيش في الطبيعة يمنحك صحة أفضل ووقتًا أكبر للعائلة", imagine: "🧠 تخيل عائلة 👨‍👩‍👧‍👦 تجلس في حديقة 🌳، وأشعة الشمس ☀️ تضربهم. فجأة، تظهر قلوب ❤️ حولهم ويختفي التوتر. ثم يصعدون جبلًا ⛰️ وينظرون إلى الأفق. ثم تظهر لافتة: 'الطبيعة هي الصحة!'" };
HELP_DATA["mündlich_exam23_q3"] = { text: "Familie → Wochenende Land → ruhig → spazieren → frische Luft → Landleben mögen", meaning: "تجربة عطلة نهاية الأسبوع في الريف: هدوء، مشي، هواء نقي، وحب للحياة الريفية", keywords: ["Wochenende Land", "frische Luft", "Landleben"], simplified: "قضينا عطلة نهاية الأسبوع في الريف، كان هادئًا وجميلاً، وفهمت سحر الحياة الريفية", imagine: "🧠 تخيل عائلة تمشي على طريق ترابي 🥾، والهواء النقي يداعب وجوههم 💨. فجأة، تتوقف قطة صغيرة 🐱 وتربت عليها الطفلة. ثم يجلسون تحت شجرة 🌳 ويأكلون سندويشات 🥪. ثم يقولون: 'هذه هي الحياة!'" };

// Exam 24: Leistungssport und Doping
HELP_DATA["mündlich_exam24_q1"] = { text: "Doping → Leistungssport → erlauben oder verbieten → Fairness → Gesundheit → Kontrollen", meaning: "جدل حول المنشطات في الرياضة بين السماح والمنع، العدالة والصحة أهم", keywords: ["Doping", "Fairness", "Gesundheit"], simplified: "المنشطات تثير جدلاً: البعض يريد السماح بها، والبعض يرفضها لأسباب أخلاقية وصحية", imagine: "🧠 تخيل ميدانًا رياضيًا 🏟️، رياضيان 🏃‍♂️🏃‍♂️ يتسابقان. أحدهما يأخذ حقنة 💉 فيطير 🕊️ والآخر يركض طبيعيًا. فجأة، يظهر حكم 👨‍⚖️ ويشطب الأول. ثم تظهر لافتة: 'العدالة أهم من الفوز!'" };
HELP_DATA["mündlich_exam24_q2"] = { text: "Doping verboten → unfair → ungesund → Sport Vorbild", meaning: "المنشطات محظورة لأنها غير عادلة وغير صحية، والرياضة قدوة", keywords: ["verboten", "unfair", "Vorbild"], simplified: "المنشطات ضارة وغير عادلة، والرياضي النظيف قدوة حسنة", imagine: "🧠 تخيل رياضيًا يحمل كأسًا 🏆 نظيفًا، وآخر يحمل كأسًا به بقعة سوداء ⚫. فجأة، يتحول الكأس النظيف إلى تاج 👑، وتتشقق البقعة السوداء. ثم يصطف الأطفال 👧🧒 خلف الرياضي النظيف ويقلدونه. ثم تظهر لافتة: 'كن قدوة!'" };
HELP_DATA["mündlich_exam24_q3"] = { text: "Schule → Mitschüler → viele Sportler → verbotene Mittel → überrascht → nachgedacht", meaning: "نقاش مدرسي عن المنشطات: زميل قال إن رياضيين كثيرين يتعاطونها، فتفاجأت وفكرت", keywords: ["verbotene Mittel", "überrascht", "nachgedacht"], simplified: "ناقشنا المنشطات في المدرسة، فتفاجأت عندما علمت بانتشارها بين الرياضيين", imagine: "🧠 تخيل فصلًا دراسيًا 🏫، أستاذ يسأل: 'من يتعاطى المنشطات؟' يرفع أحدهم يده ويقول: 'كثيرون!' يسقط القلم من يد الأستاذ ✍️ في صدمة. ثم تظهر علامة تفكير 🤔 وتتساءل العقول 🧠." };

// Exam 25: Fernsehen bildet
HELP_DATA["mündlich_exam25_q1"] = { text: "Fernsehen → Unterhaltung → Wissensprogramme → Auswahl → Selbstdisziplin → Kinder", meaning: "التلفاز: برامج المعرفة مفيدة، لكن الاختيار والانضباط الذاتي مهمان خاصة مع الأطفال", keywords: ["Wissensprogramme", "Selbstdisziplin", "Kinder"], simplified: "بعض البرامج تثقف، والمهم هو الانتقاء الجيد والانضباط", imagine: "🧠 تخيل جهاز تحكم 📺 بيد طفل، أمامه شاشتان: الأولى تعرض فيلمًا كرتونيًا 🐭، والثانية تعرض وثائقيًا عن الفضاء 🚀. يختار اليد اليمنى الوثائقي 🌟 وتنمو أجنحة 🕊️ من ظهره. ثم تظهر لافتة: 'اختر ما ينفعك!'" };
HELP_DATA["mündlich_exam25_q2"] = { text: "Fernsehen nützlich → bewusst wählen → nicht alle geeignet", meaning: "التلفاز مفيد مع الاختيار الواعي، فليست كل البرامج مناسبة", keywords: ["nützlich", "bewusst wählen", "nicht geeignet"], simplified: "التلفاز يمكن أن يفيدك إذا اخترت البرامج الجيدة، وابتعدت عن الرديء", imagine: "🧠 تخيل شخصًا أمام جهاز تلفاز 📺، وعليه نظارات تصفية 🕶️ تظهر البرامج الجيدة فقط. البرامج السيئة تتحول إلى دخان أسود 💨 وتختفي. ثم تظهر نجمة ⭐ وتضيء وجهه. ثم يقول: 'الحكمة في الاختيار!'" };
HELP_DATA["mündlich_exam25_q3"] = { text: "Ich → Fernsehen → Dokumentationen → gelernt → Filme → keine Infos", meaning: "تجربة: تابعت وثائقيات مفيدة، وأفلامًا بدون فائدة", keywords: ["Dokumentationen", "gelernt", "keine Infos"], simplified: "شاهدت وثائقيات وتعلمت منها، وأفلامًا عادية بدون معلومات جديدة", imagine: "🧠 تخيل شخصًا أمام تلفاز 📺، تخرج من الشاشة كتب 📚 تطير إلى رأسه عندما يشاهد وثائقيًا. وعندما يشاهد فيلمًا، لا يخرج شيء. ثم تنمو عضلات 🧠 في الرأس وتقوى. ثم يقول: 'المفيد يبنيك، الفارغ يضيع وقتك!'" };

// Exam 26: Kinderkonten
HELP_DATA["mündlich_exam26_q1"] = { text: "Kinderkonten → früh Geld lernen → sparen → Bank → Vorteile → Kritik Banken → Verschuldung", meaning: "حسابات الأطفال تعلمهم التعامل مع المال مبكراً، لكن البنوك تنتقد الديون", keywords: ["Kinderkonten", "Geld lernen", "Verschuldung"], simplified: "تعليم الأطفال الادخار مفيد، لكن احذر من استغلال البنوك", imagine: "🧠 تخيل طفلاً 👧 يضع نقودًا في حصالة 🐖، وتكبر الحصالة وتتحول إلى بنك 🏦. فجأة، تخرج من البنك يد 🤲 تحاول أخذ النقود أكثر مما وضع. ثم تظهر لافتة: 'ادخر بحكمة!'" };
HELP_DATA["mündlich_exam26_q2"] = { text: "Kinderkonten sinnvoll → früh lernen → Eltern begleiten → kontrollieren", meaning: "حسابات الأطفال مفيدة مع مراقبة الوالدين", keywords: ["sinnvoll", "Eltern begleiten", "kontrollieren"], simplified: "افتح حسابًا لطفلك مع الإشراف، فهذا يعلمه المسؤولية المالية", imagine: "🧠 تخيل أبًا 👨 وابنه 🧑 جالسين أمام كمبيوتر 💻، يفتتحان حسابًا بنكيًا. فجأة، تظهر أيادي تراقب 👀 كل حركة. ثم تظهر كلمة 'مسؤولية' وتكبر. ثم يقول الأب: 'معًا نتعلم!'" };
HELP_DATA["mündlich_exam26_q3"] = { text: "Freund → Sparkonto → Taschengeld sparen → Besonderes gekauft → verantwortungsvoll Geld", meaning: "تجربة صديق: ادخر مصروفه في حساب توفير، اشترى شيئًا مميزًا وتعلم المسؤولية", keywords: ["Sparkonto", "Taschengeld sparen", "verantwortungsvoll"], simplified: "صديقي ادخر مصروف جيبه واشترى شيئًا ثمينًا، وتعلم التعامل المسؤول مع المال", imagine: "🧠 تخيل صديقك 🧑 يضع عملات معدنية 🪙 واحدة تلو الأخرى في بنك أصبع 🐷. تكبر العملات وتتحول إلى دراجة هوائية 🚲. يركبها ويضحك 😊. ثم تظهر لافتة: 'الصبر يوصلك!'" };

// Exam 27: Haustausch im Urlaub
HELP_DATA["mündlich_exam27_q1"] = { text: "Haustausch → günstig → spannend → Kulturen → Nachteile → Sicherheit → Risiken", meaning: "تبادل المنازل في الإجازة: رخيص ومثير لكنه ينطوي على مخاطر أمنية", keywords: ["Haustausch", "günstig", "Sicherheit"], simplified: "تبادل المنازل فكرة رائعة لكن احذر من المخاطر الأمنية", imagine: "🧠 تخيل منزلين 🏠🏠 يتبادلان الأبواب 🚪. شخص يدخل منزلًا غريبًا ويتجول بحذر 👀. فجأة، تظهر كلاب حراسة 🐕 وتراقبه. ثم تظهر لافتة: 'الثقة قبل التبادل!'" };
HELP_DATA["mündlich_exam27_q2"] = { text: "Haustausch keine gute Idee → Risiken groß → Hotels sicherer", meaning: "تبادل المنازل فكرة سيئة، المخاطر أكبر من الفوائد، والفنادق أكثر أمانًا", keywords: ["keine gute Idee", "Risiken", "Hotels sicherer"], simplified: "لا تخاطر بتبادل المنازل، احجز فندقًا يكون آمنًا ومنظمًا", imagine: "🧠 تخيل شخصًا يقرر بين منزل غريب 🏚️ وفندق 🏨. فجأة، يتحول المنزل الغريب إلى وحش 👹 والفندق إلى قلعة محصنة 🏰. يركض نحو القلعة ويغلق الباب خلفه. ثم تظهر لافتة: 'الأمان أولاً!'" };
HELP_DATA["mündlich_exam27_q3"] = { text: "Bekannter → Haustausch → unsicher → Sicherheit → Hotel gewählt", meaning: "تجربة مع تبادل المنازل: كان غير مرتاح واختار الفندق", keywords: ["Haustausch", "unsicher", "Hotel"], simplified: "صديق فكر بتبادل المنازل لكنه شعر بعدم الأمان وفضل الفندق", imagine: "🧠 تخيل شخصًا واقفًا بين بابين: باب مكتوب عليه 'تبادل منازل' والآخر 'فندق'. يفتح باب التبادل ويشم رائحة غريبة 👃، فيغلق بسرعة ويدخل الفندق 🏨. ثم يجلس مرتاحًا على سرير 🛏️ ويقول: 'الأفضل اللي مضمون!'" };

// Exam 28: Solarium im Winter – gut oder schlecht
HELP_DATA["mündlich_exam28_q1"] = { text: "Solarium → Gesundheit → Vitamin D → Hautschäden → Krebs", meaning: "أسرة التسمير في الشتاء: قد تضر البشرة وتسبب السرطان", keywords: ["Solarium", "Vitamin D", "Krebs"], simplified: "الشمس طبيعيًّة أفضل من أسرة التسمير، فهي خطيرة جدًا", imagine: "🧠 تخيل شخصًا يستلقي في سرير تسمير 🛏️، فتظهر بقع سوداء ⚫ على بشرته. فجأة، يصرخ السرير ويخرج منه دخان أسود 💨. ثم يركض نحو الشمس ☀️ ويستلقي تحتها سعيدًا. ثم تظهر لافتة: 'طبيعي دائمًا أفضل!'" };
HELP_DATA["mündlich_exam28_q2"] = { text: "Solarien vermeiden → besser natürlich gesund bleiben", meaning: "تجنب أسرة التسمير، والبقاء بصحة طبيعية أفضل", keywords: ["vermeiden", "natürlich", "gesund bleiben"], simplified: "ابتعد عن أسرة التسمير، فطبيعتك أجمل وأكثر صحة", imagine: "🧠 تخيل يدًا تحمل لافتة 'ممنوع' 🚫 على سرير تسمير. وفجأة، تتحول اليد إلى شجرة 🌳 وينمو حولها زهور 🌸. ثم تظهر أشعة شمس ☀️ ذهبية تضيء المكان. ثم تقول اليد: 'الطبيعة أم الجمال!'" };
HELP_DATA["mündlich_exam28_q3"] = { text: "Winter → müde → wenig Energie → Sonnenlicht fehlt", meaning: "تجربة: التعب وقلة الطاقة في الشتاء بسبب نقص الشمس", keywords: ["Winter", "müde", "Sonnenlicht"], simplified: "في الشتاء كنت متعبًا وأدركت أن السبب هو قلة الشمس", imagine: "🧠 تخيل شخصًا نائمًا في الشتاء ❄️ مغطى ببطانية، وعليه علامة 'تعب' 😴. فجأة، تشرق شمس ☀️ وتفتح الستائر، فينهض نشيطًا 🏃. ثم يبتسم ويقول: 'أنا بحاجة لشمسي!'" };

// Exam 29: Ist Schulqualität messbar?
HELP_DATA["mündlich_exam29_q1"] = { text: "Schulqualität → Tests → Deutsch → Mathematik → Kritik → Wohlbefinden → soziale Fähigkeiten", meaning: "اختبارات جودة المدرسة تقيس الرياضيات والألمانية فقط، وتهمل الرفاهية والمهارات الاجتماعية", keywords: ["Schulqualität", "Tests", "soziale Fähigkeiten"], simplified: "الاختبارات لا تكفي لقياس جودة المدرسة، فالسعادة والمهارات الاجتماعية لا تقاس", imagine: "🧠 تخيل ميزانًا ⚖️ يوضع فيه كتاب رياضيات 📐 وآخر ألماني 🇩🇪، لكن قلبًا ❤️ ويدًا 🤝 تسقطان من الكفة الأخرى. ثم تظهر لافتة: 'هناك ما هو أهم من الدرجات!'" };
HELP_DATA["mündlich_exam29_q2"] = { text: "Tests hilfreich → nicht ausreichend → mehr als Noten", meaning: "الاختبارات مفيدة لكنها غير كافية، فالمدرسة أكثر من درجات", keywords: ["hilfreich", "nicht ausreichend", "mehr als Noten"], simplified: "الاختبارات مفيدة، لكن المدرسة تعدك للحياة، وليس فقط للنجاح فيها", imagine: "🧠 تخيل طالبًا يحمل شهادة بتقدير ممتاز 🎓، لكنه يبدو حزينًا 😔. فجأة، تظهر أطفال يلعبون معه ويضحكون 😊، وتظهر مهارات اجتماعية كالنجوم حوله ⭐. ثم تظهر لافتة: 'النجاح ليس مجرد ورقة!'" };
HELP_DATA["mündlich_exam29_q3"] = { text: "Ich → viele Tests → gute Noten → Stress → nicht alles zeigen", meaning: "تجربة: اختبارات كثيرة ودرجات جيدة، لكن التوتر كان موجودًا، فالاختبارات لا تظهر كل شيء", keywords: ["viele Tests", "gute Noten", "Stress"], simplified: "حصلت على درجات عالية لكني كنت متوترًا، فالدرجات لا تعكس كل شيء", imagine: "🧠 تخيل طالبًا يجلس في امتحان ✍️، عرقه يتصبب 💦 ويده ترتجف. يخرج بشهادة ممتازة 🎓 لكن قلبه ينبض بسرعة 💓. ثم تظهر أيادي تطبطح على كتفه وتقول: 'هدئ، أنت أكثر من درجاتك!'" };

// Exam 30: Hausfrau auf Lebenszeit
HELP_DATA["mündlich_exam30_q1"] = { text: "Hausfrau → Familie → Kinder → Befürworter → Kritiker → Abhängigkeit → Rollenbilder", meaning: "ربة المنزل: مؤيدون يرون وقتًا للعائلة، ومعارضون يرون اعتمادًا وأدوارًا تقليدية", keywords: ["Hausfrau", "Abhängigkeit", "Rollenbilder"], simplified: "كونك ربة منزل اختيار شخصي، لكن الاستقلال المالي مهم أيضًا", imagine: "🧠 تخيل امرأة 👩 جالسة مع أطفالها 🧒👧، لكنها مقيدة بسلاسل ⛓️. فجأة، تظهر نقود 💰 وتقطع السلاسل. ثم تقف وتمشي بحرية 🕊️. ثم تظهر لافتة: 'الحرية المالية مهمة!'" };
HELP_DATA["mündlich_exam30_q2"] = { text: "Hausfrau Entscheidung → Unabhängigkeit wichtig", meaning: "كونك ربة منزل قرار شخصي، لكن الاستقلالية مهمة", keywords: ["Entscheidung", "Unabhängigkeit", "wichtig"], simplified: "لك الخيار في أن تكون ربة منزل، مع عدم التخلي عن استقلاليتك", imagine: "🧠 تخيل امرأة أمام بابين: باب مكتوب عليه 'بيت' 🏠 وباب مكتوب عليه 'عمل' 💼. تفتح البابين معًا وتخرج منهما أيادٍ 🤝 تمسك بيديها. ثم تظهر نجمة ⭐ وتضيء وجهها. ثم تقول: 'أنا أختار التوازن!'" };
HELP_DATA["mündlich_exam30_q3"] = { text: "Bekannte → Hausfrau → Kinder → Haushalt → Unsicherheit", meaning: "تجربة صديقة ربة منزل: كانت قلقة بشأن مستقبلها المهني", keywords: ["Bekannte", "Hausfrau", "Unsicherheit"], simplified: "صديقة ربة منزل كانت سعيدة لكنها قلقت أحيانًا من مستقبلها المهني", imagine: "🧠 تخيل امرأة تنظف المنزل 🧹، وفجأة تظهر أمامها ساعة ⏰ تسير بسرعة وتذكّرها بالوقت. تتوقف وتنظر إلى المرآة وتتساءل 🤔. ثم تظهر لافتة: 'التخطيط للمستقبل يريح البال!'" };

// Exam 31: Fernsehen macht Kinder dumm
HELP_DATA["mündlich_exam31_q1"] = { text: "Fernsehen → Kinder → schlechte Noten → weniger Bewegung → Gesundheit", meaning: "كثرة التلفاز تؤدي لدرجات أسوأ ونشاط أقل، وتضر بالصحة", keywords: ["schlechte Noten", "weniger Bewegung", "Gesundheit"], simplified: "الأطفال الذين يشاهدون تلفازًا كثيرًا تكون درجاتهم أسوأ وصحتهم أضعف", imagine: "🧠 تخيل طفلًا جالسًا أمام تلفاز 📺، تخرج من الشاشة أيادٍ 🖐️ تسحبه نحوها. درجاته تنخفض 📉 وعضلاته تضعف 💪. فجأة، يضغط زر الإيقاف ⏹️ ويخرج للحديقة 🌳. ثم تظهر لافتة: 'الحركة = حياة!'" };
HELP_DATA["mündlich_exam31_q2"] = { text: "Zu viel Fernsehen schlecht → gute Programme manchmal nützlich", meaning: "كثرة التلفاز مضرة، لكن البرامج الجيدة مفيدة أحيانًا", keywords: ["schlecht", "gute Programme", "nützlich"], simplified: "لا تفرط في التلفاز، لكن بعض البرامج الجيدة قد تفيدك", imagine: "🧠 تخيل جهاز تحكم 📺، يد تتحكم به وتقلب القنوات بسرعة ⏩. فجأة، تتوقف عند قناة وثائقية 🐘، فيتوقف العقل 🧠 ويتأمل. ثم تظهر لافتة: 'الجودة > الكمية!'" };
HELP_DATA["mündlich_exam31_q3"] = { text: "Ich → Kind → viel Fernsehen → Hausaufgaben schlecht → später besser konzentriert", meaning: "تجربة الطفولة: تلفاز كثير = واجبات مهملة، قلة تلفاز = تركيز أفضل", keywords: ["viel Fernsehen", "Hausaufgaben", "konzentriert"], simplified: "عندما كنت طفلاً شاهدت تلفازًا كثيرًا وأهملت واجباتي، ولما قللت، تحسن تركيزي", imagine: "🧠 تخيل طفلًا أمام تلفاز، يهمش واجباته 📚، فتظهر علامة 'مهمل' 🚫. ثم يغلق التلفاز ويبدأ بالمذاكرة ✍️، فتظهر علامة 'تركيز' 🔍. ثم يضحك 😊 ويقول: 'الآن فهمت!'" };

// Exam 32: Kinder unterschätzen Gefahren von Handy und Internet
HELP_DATA["mündlich_exam32_q1"] = { text: "Kinder → digitale Medien → täglich → Risiken → Gewalt → Cybermobbing → Fotos", meaning: "الأطفال يستخدمون الوسائط الرقمية يومياً لكنهم يقللون من مخاطر العنف والتنمر", keywords: ["digitale Medien", "Risiken", "Cybermobbing"], simplified: "احذر، فالعالم الرقمي مليء بالمخاطر التي لا يراها الأطفال", imagine: "🧠 تخيل طفلًا يحدق في هاتف 📱، وفجأة تخرج من الهاتف وحوش صغيرة 🦠 تتراقص حوله. ثم تظهر أيادٍ 👻 تحاول انتزاع صوره 📸. ثم تظهر لافتة: 'العالم الرقمي ليس آمنًا دائمًا!'" };
HELP_DATA["mündlich_exam32_q2"] = { text: "Nutzung wichtig → Gefahren erklären → Hilfe suchen", meaning: "الاستخدام مهم لكن يجب شرح المخاطر وتعليم طلب المساعدة", keywords: ["Nutzung wichtig", "Gefahren erklären", "Hilfe suchen"], simplified: "علّم طفلك استخدام الإنترنت مع شرح المخاطر وتعليمه طلب المساعدة عند الحاجة", imagine: "🧠 تخيل أبًا 👨 يمسك بيد ابنه 🧑، ويشرح له الهاتف 📱، وتظهر أيادٍ تحذر من بعض التطبيقات 🚫. ثم يضغط الطفل على زر 'مساعدة' 🆘 وتظهر نجاة 🛡️. ثم تظهر لافتة: 'الوعي هو الحماية!'" };
HELP_DATA["mündlich_exam32_q3"] = { text: "Freund → Handy → unbekannte Nachrichten → Eltern gefragt", meaning: "تجربة صديق: تلقى رسائل غريبة فسأل والديه", keywords: ["Handy", "unbekannte Nachrichten", "Eltern"], simplified: "صديقي تلقى رسائل من أشخاص لا يعرفهم فسأل والديه اللذين ساعداه", imagine: "🧠 تخيل صديقك 🧑 ينظر إلى هاتفه في ذهول، رسائل غريبة تظهر على الشاشة 📨. يركض إلى والديه 🏃 ويعرضها عليهما. ثم يبتسمان ويشرحان له كيف يتصرف. ثم تظهر لافتة: 'الأسرة هي الملاذ الآمن!'" };

// Exam 33: Sind Klassenfahrten sinnvoll?
HELP_DATA["mündlich_exam33_q1"] = { text: "Klassenfahrten → Gemeinschaft → Freundschaften → Lernen → Kosten → Organisation", meaning: "الرحلات المدرسية تقوي المجتمع وتعزز الصداقات وتسمح بالتعلم خارج المدرسة", keywords: ["Klassenfahrten", "Gemeinschaft", "Lernen"], simplified: "السفر مع الصف يقوي العلاقات ويتيح التعلم خارج الفصل الدراسي", imagine: "🧠 تخيل حافلة 🚌 مليئة بالأطفال يضحكون 😊، وهم يتجهون إلى متحف 🏛️. فجأة، تخرج قلوب ❤️ من الحافلة وتلتف حولهم. ثم تظهر لافتة: 'السفر معًا = ذكريات لا تنسى!'" };
HELP_DATA["mündlich_exam33_q2"] = { text: "Klassenfahrten sinnvoll → stärken Miteinander → gut planen", meaning: "الرحلات المدرسية مفيدة وتقوي العلاقات، مع ضرورة التخطيط الجيد", keywords: ["sinnvoll", "Miteinander", "planen"], simplified: "الرحلة المدرسية رائعة، لكنها تحتاج إلى تخطيط جيد حتى لا تكون مكلفة", imagine: "🧠 تخيد خريطة 🗺️، يد ترسم عليها خطوط الرحلة ✍️. فجأة، تظهر أيادٍ توزع المهام 🤝 وأخرى تمسك بالميزانية 💰. ثم تظهر لافتة: 'التخطيط = نجاح الرحلة!'" };
HELP_DATA["mündlich_exam33_q3"] = { text: "Ich → Klassenreise → Orte besucht → Mitschüler kennengelernt", meaning: "تجربة رحلة مدرسية: زرنا أماكن جميلة وتعرفت على زملائي أكثر", keywords: ["Klassenreise", "Orte besucht", "Mitschüler"], simplified: "رحلتي المدرسية كانت رائعة، زرنا أماكن جديدة وأصبحت أصدقاء مع زملائي", imagine: "🧠 تخيل نفسك في رحلة 🚌، تزور متحفًا 🏛️ وتتصور مع أصدقائك 📸. ثم تجلسون معًا على العشاء 🍕 وتضحكون. ثم تظهر لافتة: 'الأصدقاء الجدد = كنز!'" };

// Exam 34: Wo wohnt man am besten im Alter
HELP_DATA["mündlich_exam34_q1"] = { text: "Alter → Zuhause → Seniorenresidenz → Vorteile → Nachteile", meaning: "السكن في الشيخوخة: البيت أم دار المسنين، لكل优点 وعيوب", keywords: ["Zuhause", "Seniorenresidenz", "Einsamkeit"], simplified: "الخيار بين البيت ودار المسنين له إيجابيات وسلبيات، يعتمد على الشخص", imagine: "🧠 تخيل شخصًا مسنًا 👴 يقف بين منزله القديم 🏠 ودار مسنين حديثة 🏥. منزله يلمع بأضواء دافئة 🔥 والدار تلمع بأضواء باردة ❄️. يختار كلاهما ويمشي في الوسط ويبتسم. ثم تظهر لافتة: 'الخيار لك!'" };
HELP_DATA["mündlich_exam34_q2"] = { text: "Wohnform abhängig → Sicherheit → Kontakte → Selbstständigkeit", meaning: "أفضل شكل سكن يعتمد على احتياجات الشخص: الأمان، العلاقات، الاستقلالية", keywords: ["abhängig", "Kontakte", "Selbstständigkeit"], simplified: "اختر السكن الذي يوفر لك الأمان والعلاقات الاجتماعية والاستقلالية", imagine: "🧠 تخيل شخصًا مسنًا يحمل ثلاث مفاتيح 🔑🔑🔑: مفتاح أمان 🛡️، مفتاح علاقات 🤝، ومفتاح استقلال 🕊️. يفتح ثلاثة أبواب ويدخل ويجلس مرتاحًا. ثم تظهر لافتة: 'السكن المثالي = توازن!'" };
HELP_DATA["mündlich_exam34_q3"] = { text: "Großmutter → allein → Seniorenwohnung → sicherer → Kontakte", meaning: "تجربة الجدة: كانت وحيدة، انتقلت لشقة كبار السن فشعرت بالأمان والعلاقات", keywords: ["allein", "Seniorenwohnung", "sicherer"], simplified: "جدتي كانت وحيدة، فلما انتقلت لشقة كبار السن شعرت بالأمان والرفقة", imagine: "🧠 تخيل جدة 👵 جالسة وحدها، حولها ظلال سوداء 🌑. فجأة، تنتقل إلى شقة بها أصدقاء جدد 👭 وتظهر أضواء ملونة 🌈 حولها. ثم تبتسم وتقول: 'أخيرًا وجدت عائلتي الثانية!'" };

// Exam 35: Ganztagsschule – Pro und Contra
HELP_DATA["mündlich_exam35_q1"] = { text: "Ganztagsschule → Schüler → Kosten → Chancengleichheit → Verantwortung", meaning: "المدارس النهارية: تزايد الإقبال لأسباب اقتصادية وتكافؤ فرص ومسؤولية", keywords: ["Ganztagsschule", "Kosten", "Chancengleichheit"], simplified: "المدارس النهارية تحقق تكافؤ الفرص لكنها مكلفة وتختلف قواعدها", imagine: "🧠 تخيل مدرسة 🏫 تفتح ذراعيها 🫂 لاستقبال الطلاب. فجأة، تظهر نقود 💰 في يد، وكتاب 📖 في اليد الأخرى. ثم تظهر لافتة: 'تعليم جيد = مستقبل مشرق!'" };
HELP_DATA["mündlich_exam35_q2"] = { text: "Ganztagsschule praktisch → Eltern entscheiden", meaning: "المدارس النهارية عملية للعائلات، لكن القرار للآباء", keywords: ["praktisch", "Eltern", "entscheiden"], simplified: "المدرسة النهارية مفيدة لكن الآباء هم من يقررون ما يناسب أبناءهم", imagine: "🧠 تخيل أبًا وأمًا 👨‍👩 جالسين مع ابنهما 🧑، أمامهم ثلاثة خيارات 🎲: مدرسة عادية، مدرسة نهارية، تعليم منزلي. يختارون معًا ويبتسمون. ثم تظهر لافتة: 'الأسرة تختار الأفضل!'" };
HELP_DATA["mündlich_exam35_q3"] = { text: "Freund → besucht → zufrieden → später Freizeit vermisst", meaning: "تجربة صديق مع المدرسة النهارية: كان راضيًا ثم اشتاق للحرية", keywords: ["besucht", "zufrieden", "Freizeit vermisst"], simplified: "صديق التحق بمدرسة نهارية، كان سعيدًا في البداية لكنه اشتاق لأوقات فراغه لاحقًا", imagine: "🧠 تخيل صديقك 🧑 يجلس في مدرسة، يبدو سعيدًا 😊. ثم تمر الأيام ⏳ ويبدأ بالنظر إلى الساعة ⏰ ويتثاءب 😩. ثم تظهر لافتة: 'الحرية كنز!'" };

// Exam 36: Verbot von Gewaltspielen – Pro und Kontra
HELP_DATA["mündlich_exam36_q1"] = { text: "Gewaltspiele → verbieten → dagegen → Familie wichtiger", meaning: "ألعاب العنف: البعض يريد منعها والبعض لا، والتربية أهم", keywords: ["Gewaltspiele", "verbieten", "Familie"], simplified: "الأهم من حظر ألعاب العنف هو التربية الأسرية الجيدة", imagine: "🧠 تخيل لعبة عنف 🎮 تتحول إلى وحش 👹، ثم تظهر أسرة 👨‍👩‍👧‍👦 تمسك أيديها وتوقف الوحش. ثم تظهر لافتة: 'التربية أقوى من أي لعبة!'" };
HELP_DATA["mündlich_exam36_q2"] = { text: "Gewaltspiele eingeschränkt → Erziehung wichtiger", meaning: "ألعاب العنف يجب تقييدها، لكن التربية أهم", keywords: ["eingeschränkt", "Erziehung", "wichtiger"], simplified: "حد من ألعاب العنف، لكن ركز على تربية أبنائك فهي الأهم", imagine: "🧠 تخيل لعبة عنف مقيدة بالسلاسل ⛓️، بينما أسرة تزرع وردة 🌱 وتنمو لتصبح شجرة كبيرة 🌳. ثم تظهر لافتة: 'التربية = غرس القيم!'" };
HELP_DATA["mündlich_exam36_q3"] = { text: "Freund → gespielt → aggressiv → Mutter sprach → ruhiger", meaning: "تجربة صديق: لعب ألعاب عنف فصار عدوانيًا، تحدثت معه أمه فهدأ", keywords: ["gespielt", "aggressiv", "Mutter sprach"], simplified: "صديقي صار عدوانيًا من ألعاب العنف، لكن حديث أمه معه غيَّره", imagine: "🧠 تخيل صديقك 🧑 يلعب بعنف 🎮، عروقه تنتفخ 😤. فجأة، تظهر أمه 👩 وتجلس بجانبه وتتحدث معه 🗣️. ثم يبتسم ويغلق اللعبة. ثم تظهر لافتة: 'كلمة حانية تغيّر!'" };

// Exam 37: Eine Woche ohne Internet
HELP_DATA["mündlich_exam37_q1"] = { text: "Internet → Alltag → Einkaufen → Reisen → schwieriger → analoge Fähigkeiten", meaning: "الحياة بدون إنترنت صعبة، لكن البعض يستعيد مهاراته التقليدية", keywords: ["kein Internet", "analoge Fähigkeiten", "neue Möglichkeiten"], simplified: "بدون إنترنت تصبح بعض الأمور أصعب، لكنك تكتشف مهارات جديدة بداخلك", imagine: "🧠 تخيل شخصًا بلا هاتف 📱، يحاول شراء طعام 🛒 لكنه لا يستخدم تطبيقًا، فيذهب للسوق بنفسه 🚶. ثم يكتشف أنه يستطيع الطبخ 🍳. ثم تظهر لافتة: 'الإنسان أقوى مما يظن!'" };
HELP_DATA["mündlich_exam37_q2"] = { text: "Leben ohne Internet → kaum vorstellbar → Pause hilft", meaning: "الحياة بدون إنترنت صعبة التصور، لكن فترة راحة قصيرة مفيدة", keywords: ["kaum vorstellbar", "Pause", "hilft"], simplified: "قد تبدو الحياة بدون إنترنت مستحيلة، لكن جرب فترة راحة وسترى الفرق", imagine: "🧠 تخيل شخصًا مرتبطًا بالإنترنت كالحبل 🔗، فجأة يقطع الحبل ✂️ ويجلس في الطبيعة 🌲. ثم يتنفس بعمق 🧘 ويشعر بالراحة. ثم تظهر لافتة: 'انقطع لتتصل بنفسك!'" };
HELP_DATA["mündlich_exam37_q3"] = { text: "Ich → Tag ohne Internet → schwierig → später konzentriert", meaning: "تجربة يوم بدون إنترنت: صعب في البداية، ثم تحسن التركيز", keywords: ["Tag ohne Internet", "schwierig", "konzentriert"], simplified: "قضيت يومًا دون إنترنت، كان صعبًا أولاً ثم تحسن تركيزي بشكل كبير", imagine: "🧠 تخيل نفسك تبحث عن معلومة دون إنترنت 🔍، فتذهب للمكتبة 📚 وتقرأ كتابًا. فجأة، تشعر بتركيز عالٍ 🎯 وتفهم كل شيء. ثم تظهر لافتة: 'الدماغ يحتاج للراحة أحيانًا!'" };

// Exam 38: Tierversuche – Pro und Contra
HELP_DATA["mündlich_exam38_q1"] = { text: "Tierversuche → Forschung → Medizin → Medikamente → Kritik → Tierleid → Ethik", meaning: "تجارب الحيوانات في الأبحاث: مؤيد للطب، معارض لأخلاقيات ومعاناة الحيوانات", keywords: ["Tierversuche", "Tierleid", "Ethik"], simplified: "تجارب الحيوانات تحقق تقدمًا طبيًا لكنها تسبب آلامًا للحيوانات وتثير جدلاً أخلاقيًا", imagine: "🧠 تخيل معطف أبيض 👨‍🔬 وأرنب 🐇 يجري في عجلة 🎡. فجأة، تظهر دموع 💧 من عيني الأرنب، فتتوقف التجربة. ثم تظهر لافتة: 'الحياة لا تُجرَب!'" };
HELP_DATA["mündlich_exam38_q2"] = { text: "Tierversuche erlaubt → nur ohne Alternativen → Schutz wichtig", meaning: "تجارب الحيوانات مسموحة فقط عند عدم وجود بديل، وحماية الحيوان مهمة", keywords: ["Alternativen", "Schutz", "wichtig"], simplified: "لا تجرِب على الحيوان إلا عند الضرورة القصوى، واحمِه دائمًا", imagine: "🧠 تخيل فأرًا 🐭 يهرب من أنبوب اختبار 🧪، ويختبئ خلف درع 🛡️ مكتوب عليه 'حماية'. ثم تظهر لافتة: 'الرفق بالحيوان واجب!'" };
HELP_DATA["mündlich_exam38_q3"] = { text: "Biologieunterricht → Diskussion → Freund dagegen → andere dafür", meaning: "نقاش في حصة الأحياء: بعض الزملاء مع التجارب وآخرون ضدها", keywords: ["Biologieunterricht", "Diskussion", "dagegen"], simplified: "تناقشنا في المدرسة: البعض يرى تجارب الحيوانات ضرورية والبعض الآخر يرفضها", imagine: "🧠 تخيل فصلًا دراسيًا 🏫، أيادٍ مرتفعة 🙋🙋‍♂️، بعضها يحمل لافتة 'مع' ✅ وبعضها 'ضد' ❌. فجأة، يظهر الأستاذ ويهدئ الجميع. ثم تظهر لافتة: 'الاختلاف في الرأي لا يفسد الود!'" };

// Exam 39: Englisch als weltweite Unternehmenssprache
HELP_DATA["mündlich_exam39_q1"] = { text: "Englisch → internationale Firmen → Kommunikation → Missverständnisse → Akzent", meaning: "الإنجليزية لغة الشركات العالمية: تسهل التواصل لكن قد تسبب سوء فهم بسبب اللهجات", keywords: ["Englisch", "Kommunikation", "Missverständnisse"], simplified: "الإنجليزية ممتازة للتواصل العالمي، لكن احذر من سوء الفهم بسبب الاختلافات في النطق", imagine: "🧠 تخيل شخصين يتحدثان الإنجليزية 🗣️، لكن كل منهما بلهجة مختلفة 🗺️، فتخرج أسئلة ❓ بينهما. ثم تظهر لافتة: 'تواصل بوضوح!'" };
HELP_DATA["mündlich_exam39_q2"] = { text: "Englisch praktisch → andere Sprachen respektieren", meaning: "الإنجليزية عملية، لكن احترم اللغات الأخرى أيضًا", keywords: ["praktisch", "respektieren", "andere Sprachen"], simplified: "استخدم الإنجليزية حيث تكون مفيدة، لكن لا تهمش اللغات الأخرى", imagine: "🧠 تخيل علم بريطانيا 🇬🇧 وعلم فرنسا 🇫🇷 وعلم ألمانيا 🇩🇪 يرقصون معًا 💃. ثم تظهر لافتة: 'التنوع اللغوي ثراء!'" };
HELP_DATA["mündlich_exam39_q3"] = { text: "Freund → Laden → Englisch → Missverständnisse → funktioniert", meaning: "تجربة صديق: استخدم الإنجليزية في متجره، حدثت بعض سوء الفهم لكن الأمور سارت", keywords: ["Laden", "Englisch", "Missverständnisse"], simplified: "صديقي تحدث الإنجليزية مع زبائنه الأجانب، حدثت بعض الأخطاء لكن التواصل نجح", imagine: "🧠 تخيل صديقك 🧑 في متجره 🏪، يتحدث بالإنجليزية مع سائح 🧳. فجأة، يخطئ في الكلمة فيضحكان 😂 ثم يفهمان قصده. ثم تظهر لافتة: 'النوايا الحسنة تصل!'" };

// Exam 40: Trinkgeld geben
HELP_DATA["mündlich_exam40_q1"] = { text: "Trinkgeld → Anerkennung → Service → Unterschiede Länder", meaning: "البقشيش تقدير للخدمة الجيدة، لكن العادات تختلف بين الدول", keywords: ["Trinkgeld", "Anerkennung", "Unterschiede"], simplified: "البقشيش لفتة تقدير، لكن تختلف قواعده من بلد لآخر", imagine: "🧠 تخيل طبق طعام 🍽️، بجانبه عملات معدنية 🪙. فجأة، تخرج يد 🤲 وتعطيها للنادل 👨‍🍳 فيبتسم. ثم تظهر خريطة العالم 🗺️ وتتغير قواعد البقشيش حسب كل دولة. ثم تظهر لافتة: 'احترم عادات المكان!'" };
HELP_DATA["mündlich_exam40_q2"] = { text: "Trinkgeld zeigt Wertschätzung → nicht Pflicht", meaning: "البقشيش يظهر التقدير لكنه ليس إلزاميًا", keywords: ["Wertschätzung", "nicht Pflicht", "Service"], simplified: "البقشيش لفتة طيبة وليس إجبارًا", imagine: "🧠 تخيل يدًا تضع نقودًا 💰 بجانب طبق، ويدًا أخرى تشير 'ليس إجباريًا' 🚫. ثم يبتسم النادل 😊 ويقول: 'شكرًا لك على لطفك!' تظهر لافتة: 'العطاء من القلب يفرح!'" };
HELP_DATA["mündlich_exam40_q3"] = { text: "Ich → Restaurant → Kellnerin freundlich → Trinkgeld → zufrieden", meaning: "تجربة: نادلة لطيفة، أعطيتها بقشيشًا، شعرت بالرضا", keywords: ["Restaurant", "Kellnerin", "Trinkgeld"], simplified: "النادلة كانت ودودة، فأعطيتها بقشيشًا وكنت سعيدًا لأني شجعت الخدمة الجيدة", imagine: "🧠 تخيل نفسك جالسًا في مطعم 🍽️، نادلة لطيفة تخدمك بابتسامة 😊. تترك لها بقشيشًا 💰 فتفرح وتشكرك. ثم تخرج وأنت تشعر بالرضا 🌟. ثم تظهر لافتة: 'الخير يعود بالخير!'" };

// Exam 41: Teilzeitarbeit für Männer
HELP_DATA["mündlich_exam41_q1"] = { text: "Teilzeitarbeit → Männer → Familie → Flexibilität → Nachteile → Geld → Gesundheit", meaning: "العمل الجزئي للرجال: مزايا للعائلة ومرونة، وعيوب أقل مالًا ومخاطر صحية", keywords: ["Teilzeitarbeit", "Familie", "Gesundheit"], simplified: "العمل بدوام جزئي يمنح الرجل وقتًا للعائلة لكن قد يقلل الدخل ويسبب توترًا", imagine: "🧠 تخيل رجلاً 👨 يقف عند مفترق طرق، جهة العمل بدوام كامل 💼 وجهة العمل الجزئي ⏰. يختار الجزئي ويمشي مع أطفاله 🧒👧 وهم يضحكون. لكن نقوده تقل قليلاً 💸. ثم تظهر لافتة: 'التوازن = سعادة!'" };
HELP_DATA["mündlich_exam41_q2"] = { text: "Teilzeitarbeit gut → Familie → achten auf Geld", meaning: "العمل الجزئي مفيد للعائلة، لكن انتبه للمال والصحة", keywords: ["gut", "Familie", "Geld"], simplified: "العمل الجزئي جيد للأسرة، لكن راقب ميزانيتك وصحتك", imagine: "🧠 تخيل رجلاً يلعب مع أطفاله 🏀 ويبتسم، ثم ينظر إلى حسابه البنكي 💻 ويحسب بدقة. ثم يذهب لرياضة خفيفة 🏋️ ويشرب ماء 💧. ثم تظهر لافتة: 'نظم وقتك ومالك!'" };
HELP_DATA["mündlich_exam41_q3"] = { text: "Freund → Teilzeit → Kinder → glücklicher → weniger Geld", meaning: "تجربة صديق: عمل جزئي، زاد وقته مع أطفاله فسعد لكن دخله قل", keywords: ["Teilzeit", "Kinder", "glücklicher"], simplified: "صديقي سعيد لأن وقتًا أطول مع أطفاله رغم نقص المال قليلاً", imagine: "🧠 تخيل صديقك 🧑 يلعب مع أطفاله 🧒👧 ويضحك 😂، لكن محفظته خفيفة قليلاً 🪙. ثم ينظر إلى الأطفال ويقول: 'سعادتهم أغلى من المال!' ثم تظهر لافتة: 'السعادة لا تُشترى!'" };

// Exam 42: Nahrungsergänzungsmittel
HELP_DATA["mündlich_exam42_q1"] = { text: "Vitamine → Mineralstoffe → Gesundheit → Ergänzung → ausgewogen → Ernährung → Experten → Stress → Zeitmangel", meaning: "المكملات الغذائية: فيتامينات ومعادن، قد تكون مفيدة عند نقصها بسبب التوتر أو ضيق الوقت", keywords: ["Nahrungsergänzungsmittel", "Ernährung", "Stress"], simplified: "المكملات قد تساعد إذا كنت لا تأكل جيدًا أو تعاني من توتر، لكنها ليست ضرورية دائمًا", imagine: "🧠 تخيل شخصًا متعبًا 😩 يمسك بعلبة فيتامينات 💊، ويدًا أخرى تمسك بطبق خضروات 🥗. تتنافس اليدان ثم تتصافحان 🤝. ثم تظهر لافتة: 'الغذاء أولاً، ثم المكملات!'" };
HELP_DATA["mündlich_exam42_q2"] = { text: "nicht notwendig → gesunde Ernährung → wichtiger → manchmal sinnvoll", meaning: "المكملات ليست ضرورية، فالغذاء الصحي أهم، لكنها قد تفيد أحيانًا", keywords: ["nicht notwendig", "gesund", "vorsichtig"], simplified: "الطعام الصحي هو الأساس، والمكملات مجرد مساعد مؤقت", imagine: "🧠 تخيل ميزانًا ⚖️، في كفة طبق سلطة 🥗 وفي الكفة الأخرى علبة فيتامينات 💊. تطيش كفة السلطة للأسفل 💪، وتعلو المكملات إلى الأعلى. ثم تظهر لافتة: 'الطبيعة هي المصدر!'" };
HELP_DATA["mündlich_exam42_q3"] = { text: "Vitamine → müde → genommen → kurz → besser → Ernährung → verbessert → Gefühl gut", meaning: "تجربة: كنت متعبًا، تناولت فيتامينات، ثم حسنت غذائي فشعرت بتحسن", keywords: ["Vitamine", "müde", "Ernährung"], simplified: "حسنت غذائي وتناولت فيتامينات فاختفي التعب، وهذا يؤكد أهمية الغذاء", imagine: "🧠 تخيل شخصًا نائمًا 😴 وفوقه علامة 'تعب'. فجأة، يأكل تفاحة 🍎 ويشرب عصيرًا 🥤 فينتعش ✨. ثم يركض ويقفز 🏃. ثم تظهر لافتة: 'الغذاء هو وقود الجسم!'" };

// ============================================
// helpSystem.js - نظام المساعدة المتكامل (الإصدار النهائي)
// يدعم: hören1, hören2, hören3, lesen1, lesen2, lesen3, sprach1, sprach2, mündlich
// ============================================

let helpLayerActive = false;
let originalContentBackup = null;

// الأسئلة الصحيحة لكل امتحان (جميع الأجزاء)
function getCorrectQuestions(skill, examId) {
    const correctMap = {
        // Hören Teil 1 (27 أساسي + 18 جديد = 45 امتحان)
        'hoeren1_exam1': [2, 3], 'hoeren1_exam2': [3, 5], 'hoeren1_exam3': [2, 3, 5],
        'hoeren1_exam4': [1, 5], 'hoeren1_exam5': [2, 4], 'hoeren1_exam6': [2, 4],
        'hoeren1_exam7': [1, 2, 5], 'hoeren1_exam8': [3, 4, 5], 'hoeren1_exam9': [1, 2],
        'hoeren1_exam10': [1, 4], 'hoeren1_exam11': [1, 4], 'hoeren1_exam12': [1, 4],
        'hoeren1_exam13': [3, 4, 5], 'hoeren1_exam14': [1, 3], 'hoeren1_exam15': [2, 3],
        'hoeren1_exam16': [2, 3, 5], 'hoeren1_exam17': [4, 5], 'hoeren1_exam18': [1, 3, 5],
        'hoeren1_exam19': [1, 3, 5], 'hoeren1_exam20': [1, 3, 4], 'hoeren1_exam21': [3],
        'hoeren1_exam22': [1, 2, 5], 'hoeren1_exam23': [3, 5], 'hoeren1_exam24': [1, 3, 5],
        'hoeren1_exam25': [1, 2, 5], 'hoeren1_exam26': [1, 5], 'hoeren1_exam27': [1, 2],
        // Hören Teil 1 - مواضيع تركيا (exam28-45)
        'hoeren1_exam28': [1, 2, 4], 'hoeren1_exam29': [1, 2, 3], 'hoeren1_exam30': [3, 5],
        'hoeren1_exam31': [2, 4], 'hoeren1_exam32': [1, 3, 5], 'hoeren1_exam33': [1, 4],
        'hoeren1_exam34': [1, 3], 'hoeren1_exam35': [3, 4], 'hoeren1_exam36': [1, 2],
        'hoeren1_exam37': [1, 4, 5], 'hoeren1_exam38': [1, 2, 3], 'hoeren1_exam39': [1, 2, 4, 5],
        'hoeren1_exam40': [1, 3, 4], 'hoeren1_exam41': [2, 5], 'hoeren1_exam42': [2, 4],
        'hoeren1_exam43': [2, 5], 'hoeren1_exam44': [2, 4], 'hoeren1_exam45': [2, 4],
        
        // Hören Teil 2 (31 أساسي + 18 جديد = 49 امتحان)
        'hoeren2_exam1': [3, 4, 8, 9, 10], 'hoeren2_exam2': [1, 3, 4, 8],
        'hoeren2_exam3': [1, 3, 4, 7, 8], 'hoeren2_exam4': [2, 6, 8, 9, 10],
        'hoeren2_exam5': [2, 9, 10], 'hoeren2_exam6': [3, 4, 7], 'hoeren2_exam7': [3, 4, 7],
        'hoeren2_exam8': [1, 3, 4, 7, 8, 9], 'hoeren2_exam9': [1, 3, 4, 5, 8],
        'hoeren2_exam10': [1, 3, 4, 8, 9, 10], 'hoeren2_exam11': [1, 3, 4, 8, 9, 10],
        'hoeren2_exam12': [1, 4, 6, 7, 8], 'hoeren2_exam13': [1, 4, 6, 7, 8],
        'hoeren2_exam14': [2, 5, 8, 9, 10], 'hoeren2_exam15': [2, 3, 5, 6, 8, 10],
        'hoeren2_exam16': [2, 4, 5, 8, 10], 'hoeren2_exam17': [2, 4, 5, 8, 10],
        'hoeren2_exam18': [2, 3, 4, 7, 9, 10], 'hoeren2_exam19': [3, 4, 7, 9],
        'hoeren2_exam20': [2, 3, 5, 8, 9], 'hoeren2_exam21': [3, 5, 9],
        'hoeren2_exam22': [3, 4, 10], 'hoeren2_exam23': [1, 2, 4, 6],
        'hoeren2_exam24': [2, 3, 4, 6, 8, 10], 'hoeren2_exam25': [1, 2, 3, 4, 6, 8, 9],
        'hoeren2_exam26': [3, 5, 7, 8, 10], 'hoeren2_exam27': [2, 3, 4, 6, 8],
        'hoeren2_exam28': [1, 2, 4, 6, 8, 10], 'hoeren2_exam29': [4, 5, 9, 10],
        'hoeren2_exam30': [2, 3, 6, 7, 10], 'hoeren2_exam31': [2, 4, 5, 8, 9],
        // Hören Teil 2 - مواضيع تركيا (exam32-49)
        'hoeren2_exam32': [2, 3, 5, 6, 8, 10], 'hoeren2_exam33': [1, 2, 5, 7, 10],
        'hoeren2_exam34': [1, 2, 3, 5, 7, 10], 'hoeren2_exam35': [1, 2, 3, 7, 10],
        'hoeren2_exam36': [1, 4, 5, 7, 9, 10], 'hoeren2_exam37': [1, 6, 7, 8],
        'hoeren2_exam38': [1, 2, 3, 5, 6, 7, 9], 'hoeren2_exam39': [1, 2, 3, 6, 7, 8, 9, 10],
        'hoeren2_exam40': [1, 2, 5, 6, 8], 'hoeren2_exam41': [3, 6, 9],
        'hoeren2_exam42': [2, 4, 5, 8, 9], 'hoeren2_exam43': [3, 4, 5, 7, 8],
        'hoeren2_exam44': [1, 3, 6, 7, 9, 10], 'hoeren2_exam45': [2, 4, 6, 8, 10],
        'hoeren2_exam46': [3, 6, 8], 'hoeren2_exam47': [2, 3, 5, 9],
        'hoeren2_exam48': [3, 5, 6, 9, 10], 'hoeren2_exam49': [1, 2, 4, 6, 8, 10],
        
        // Hören Teil 3 (27 أساسي + 20 جديد = 47 امتحان)
        'hoeren3_exam1': [1], 'hoeren3_exam2': [1, 3], 'hoeren3_exam3': [1, 3],
        'hoeren3_exam4': [1, 4], 'hoeren3_exam5': [1, 4], 'hoeren3_exam6': [1, 5],
        'hoeren3_exam7': [1, 5], 'hoeren3_exam8': [1, 5], 'hoeren3_exam9': [1, 5],
        'hoeren3_exam10': [2, 5], 'hoeren3_exam11': [1, 2, 3], 'hoeren3_exam12': [3, 4],
        'hoeren3_exam13': [1, 2, 5], 'hoeren3_exam14': [1, 4, 5], 'hoeren3_exam15': [1, 2, 5],
        'hoeren3_exam16': [1, 3, 4, 5], 'hoeren3_exam17': [1, 3], 'hoeren3_exam18': [2, 3, 4],
        'hoeren3_exam19': [2, 4], 'hoeren3_exam20': [1, 3], 'hoeren3_exam21': [2],
        'hoeren3_exam22': [2, 4], 'hoeren3_exam23': [1, 5], 'hoeren3_exam24': [2],
        'hoeren3_exam25': [1, 3], 'hoeren3_exam26': [1, 3, 5], 'hoeren3_exam27': [1, 3],
        // Hören Teil 3 - مواضيع تركيا (exam28-47)
        'hoeren3_exam28': [2], 'hoeren3_exam29': [1, 4, 5], 'hoeren3_exam30': [1, 4],
        'hoeren3_exam31': [1, 2, 3], 'hoeren3_exam32': [3, 5], 'hoeren3_exam33': [2, 3, 4],
        'hoeren3_exam34': [1, 3], 'hoeren3_exam35': [1, 2, 4, 5], 'hoeren3_exam36': [1, 5],
        'hoeren3_exam37': [2], 'hoeren3_exam38': [2, 5], 'hoeren3_exam39': [1, 5],
        'hoeren3_exam40': [5], 'hoeren3_exam41': [1, 2], 'hoeren3_exam42': [1, 2, 5],
        'hoeren3_exam43': [1, 5], 'hoeren3_exam44': [2, 3], 'hoeren3_exam45': [3, 4],
        'hoeren3_exam46': [1, 4, 5], 'hoeren3_exam47': [1, 3],
        
        // Lesen Teil 1 (47 امتحان)
        'lesen1_exam1': [1,2,3,4,5], 'lesen1_exam2': [1,2,3,4,5], 'lesen1_exam3': [1,2,3,4,5],
        'lesen1_exam4': [1,2,3,4,5], 'lesen1_exam5': [1,2,3,4,5], 'lesen1_exam6': [1,2,3,4,5],
        'lesen1_exam7': [1,2,3,4,5], 'lesen1_exam8': [1,2,3,4,5], 'lesen1_exam9': [1,2,3,4,5],
        'lesen1_exam10': [1,2,3,4,5], 'lesen1_exam11': [1,2,3,4,5], 'lesen1_exam12': [1,2,3,4,5],
        'lesen1_exam13': [1,2,3,4,5], 'lesen1_exam14': [1,2,3,4,5], 'lesen1_exam15': [1,2,3,4,5],
        'lesen1_exam16': [1,2,3,4,5], 'lesen1_exam17': [1,2,3,4,5], 'lesen1_exam18': [1,2,3,4,5],
        'lesen1_exam19': [1,2,3,4,5], 'lesen1_exam20': [1,2,3,4,5], 'lesen1_exam21': [1,2,3,4,5],
        'lesen1_exam22': [1,2,3,4,5], 'lesen1_exam23': [1,2,3,4,5], 'lesen1_exam24': [1,2,3,4,5],
        'lesen1_exam25': [1,2,3,4,5], 'lesen1_exam26': [1,2,3,4,5], 'lesen1_exam27': [1,2,3,4,5],
        'lesen1_exam28': [1,2,3,4,5], 'lesen1_exam29': [1,2,3,4,5], 'lesen1_exam30': [1,2,3,4,5],
        'lesen1_exam31': [1,2,3,4,5], 'lesen1_exam32': [1,2,3,4,5], 'lesen1_exam33': [1,2,3,4,5],
        'lesen1_exam34': [1,2,3,4,5], 'lesen1_exam35': [1,2,3,4,5], 'lesen1_exam36': [1,2,3,4,5],
        'lesen1_exam37': [1,2,3,4,5], 'lesen1_exam38': [1,2,3,4,5], 'lesen1_exam39': [1,2,3,4,5],
        'lesen1_exam40': [1,2,3,4,5], 'lesen1_exam41': [1,2,3,4,5], 'lesen1_exam42': [1,2,3,4,5],
        'lesen1_exam43': [1,2,3,4,5], 'lesen1_exam44': [1,2,3,4,5], 'lesen1_exam45': [1,2,3,4,5],
        'lesen1_exam46': [1,2,3,4,5], 'lesen1_exam47': [1,2,3,4,5],
        
        // Lesen Teil 2 (37 امتحان)
        'lesen2_exam1': [1,2,3,4,5], 'lesen2_exam2': [1,2,3,4,5], 'lesen2_exam3': [1,2,3,4,5],
        'lesen2_exam4': [1,2,3,4,5], 'lesen2_exam5': [1,2,3,4,5], 'lesen2_exam6': [1,2,3,4,5],
        'lesen2_exam7': [1,2,3,4,5], 'lesen2_exam8': [1,2,3,4,5], 'lesen2_exam9': [1,2,3,4,5],
        'lesen2_exam10': [1,2,3,4,5], 'lesen2_exam11': [1,2,3,4,5], 'lesen2_exam12': [1,2,3,4,5],
        'lesen2_exam13': [1,2,3,4,5], 'lesen2_exam14': [1,2,3,4,5], 'lesen2_exam15': [1,2,3,4,5],
        'lesen2_exam16': [1,2,3,4,5], 'lesen2_exam17': [1,2,3,4,5], 'lesen2_exam18': [1,2,3,4,5],
        'lesen2_exam19': [1,2,3,4,5], 'lesen2_exam20': [1,2,3,4,5], 'lesen2_exam21': [1,2,3,4,5],
        'lesen2_exam22': [1,2,3,4,5], 'lesen2_exam23': [1,2,3,4,5], 'lesen2_exam24': [1,2,3,4,5],
        'lesen2_exam25': [1,2,3,4,5], 'lesen2_exam26': [1,2,3,4,5], 'lesen2_exam27': [1,2,3,4,5],
        'lesen2_exam28': [1,2,3,4,5], 'lesen2_exam29': [1,2,3,4,5], 'lesen2_exam30': [1,2,3,4,5],
        'lesen2_exam31': [1,2,3,4,5], 'lesen2_exam32': [1,2,3,4,5], 'lesen2_exam33': [1,2,3,4,5],
        'lesen2_exam34': [1,2,3,4,5], 'lesen2_exam35': [1,2,3,4,5], 'lesen2_exam36': [1,2,3,4,5],
        'lesen2_exam37': [1,2,3,4,5],
        
        // Lesen Teil 3 (35 امتحان)
        'lesen3_exam1': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam2': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam3': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam4': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam5': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam6': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam7': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam8': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam9': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam10': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam11': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam12': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam13': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam14': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam15': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam16': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam17': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam18': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam19': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam20': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam21': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam22': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam23': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam24': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam25': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam26': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam27': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam28': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam29': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam30': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam31': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam32': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam33': [1,2,3,4,5,6,7,8,9,10], 'lesen3_exam34': [1,2,3,4,5,6,7,8,9,10],
        'lesen3_exam35': [1,2,3,4,5,6,7,8,9,10],
        
        // Sprach Teil 1 (40 امتحان)
        'sprach1_exam1': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam2': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam3': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam4': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam5': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam6': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam7': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam8': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam9': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam10': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam11': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam12': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam13': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam14': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam15': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam16': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam17': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam18': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam19': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam20': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam21': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam22': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam23': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam24': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam25': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam26': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam27': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam28': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam29': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam30': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam31': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam32': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam33': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam34': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam35': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam36': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam37': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam38': [1,2,3,4,5,6,7,8,9,10],
        'sprach1_exam39': [1,2,3,4,5,6,7,8,9,10], 'sprach1_exam40': [1,2,3,4,5,6,7,8,9,10],
        
        // Sprach Teil 2 (45 امتحان)
        'sprach2_exam1': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam2': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam3': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam4': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam5': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam6': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam7': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam8': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam9': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam10': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam11': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam12': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam13': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam14': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam15': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam16': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam17': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam18': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam19': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam20': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam21': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam22': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam23': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam24': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam25': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam26': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam27': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam28': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam29': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam30': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam31': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam32': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam33': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam34': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam35': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam36': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam37': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam38': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam39': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam40': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam41': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam42': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam43': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam44': [1,2,3,4,5,6,7,8,9,10],
        'sprach2_exam45': [1,2,3,4,5,6,7,8,9,10], 'sprach2_exam46': [1,2,3,4,5,6,7,8,9,10],
        
        // Mündlich Teil 1-42
        'mündlich_exam1': [1,2,3], 'mündlich_exam2': [1,2,3], 'mündlich_exam3': [1,2,3],
        'mündlich_exam4': [1,2,3], 'mündlich_exam5': [1,2,3], 'mündlich_exam6': [1,2,3],
        'mündlich_exam7': [1,2,3], 'mündlich_exam8': [1,2,3], 'mündlich_exam9': [1,2,3],
        'mündlich_exam10': [1,2,3], 'mündlich_exam11': [1,2,3], 'mündlich_exam12': [1,2,3],
        'mündlich_exam13': [1,2,3], 'mündlich_exam14': [1,2,3], 'mündlich_exam15': [1,2,3],
        'mündlich_exam16': [1,2,3], 'mündlich_exam17': [1,2,3], 'mündlich_exam18': [1,2,3],
        'mündlich_exam19': [1,2,3], 'mündlich_exam20': [1,2,3], 'mündlich_exam21': [1,2,3],
        'mündlich_exam22': [1,2,3], 'mündlich_exam23': [1,2,3], 'mündlich_exam24': [1,2,3],
        'mündlich_exam25': [1,2,3], 'mündlich_exam26': [1,2,3], 'mündlich_exam27': [1,2,3],
        'mündlich_exam28': [1,2,3], 'mündlich_exam29': [1,2,3], 'mündlich_exam30': [1,2,3],
        'mündlich_exam31': [1,2,3], 'mündlich_exam32': [1,2,3], 'mündlich_exam33': [1,2,3],
        'mündlich_exam34': [1,2,3], 'mündlich_exam35': [1,2,3], 'mündlich_exam36': [1,2,3],
        'mündlich_exam37': [1,2,3], 'mündlich_exam38': [1,2,3], 'mündlich_exam39': [1,2,3],
        'mündlich_exam40': [1,2,3], 'mündlich_exam41': [1,2,3], 'mündlich_exam42': [1,2,3]
    };
    return correctMap[`${skill}_exam${examId}`] || [];
}

// الحصول على رقم الامتحان الحالي
function getCurrentExamId() {
    if (window.currentExamId && window.currentExamId > 0) return window.currentExamId;
    const title = document.getElementById('examTitle')?.textContent || '';
    const match = title.match(/Exam\s+(\d+)/i);
    if (match) return parseInt(match[1]);
    const numMatch = title.match(/\d+/);
    if (numMatch) return parseInt(numMatch[0]);
    return 1;
}

// الحصول على نوع المهارة الحالي
function getCurrentSkill() {
    if (document.getElementById('hoeren1')?.style.display === 'block') return 'hoeren1';
    if (document.getElementById('hoeren2')?.style.display === 'block') return 'hoeren2';
    if (document.getElementById('hoeren3')?.style.display === 'block') return 'hoeren3';
    if (document.getElementById('teil1')?.style.display === 'block') return 'lesen1';
    if (document.getElementById('teil2')?.style.display === 'block') return 'lesen2';
    if (document.getElementById('teil3')?.style.display === 'block') return 'lesen3';
    if (document.getElementById('sprach1')?.style.display === 'block') return 'sprach1';
    if (document.getElementById('sprach2')?.style.display === 'block') return 'sprach2';
    if (document.getElementById('mündlich')?.style.display === 'block') return 'mündlich';
    return 'hoeren1';
}

// الحصول على القسم النشط
function getActiveSection() {
    if (document.getElementById('hoeren1')?.style.display === 'block') return document.getElementById('hoeren1');
    if (document.getElementById('hoeren2')?.style.display === 'block') return document.getElementById('hoeren2');
    if (document.getElementById('hoeren3')?.style.display === 'block') return document.getElementById('hoeren3');
    if (document.getElementById('teil1')?.style.display === 'block') return document.getElementById('teil1');
    if (document.getElementById('teil2')?.style.display === 'block') return document.getElementById('teil2');
    if (document.getElementById('teil3')?.style.display === 'block') return document.getElementById('teil3');
    if (document.getElementById('sprach1')?.style.display === 'block') return document.getElementById('sprach1');
    if (document.getElementById('sprach2')?.style.display === 'block') return document.getElementById('sprach2');
    if (document.getElementById('mündlich')?.style.display === 'block') return document.getElementById('mündlich');
    return null;
}

// دالة البحث المرنة عن البيانات في HELP_DATA
function findHelpData(skill, examId, questionNumber) {
    if (typeof HELP_DATA === 'undefined') {
        console.warn('HELP_DATA غير موجود');
        return null;
    }
    
    const patterns = [
        `${skill}_exam${examId}_q${questionNumber}`,
        `${skill}_exam${examId}_${questionNumber}`,
        `${skill}_exam${examId}_${String.fromCharCode(96 + questionNumber)}`
    ];
    
    for (let pattern of patterns) {
        if (HELP_DATA[pattern]) {
            return HELP_DATA[pattern];
        }
    }
    
    for (let key in HELP_DATA) {
        if (key.includes(`exam${examId}`)) {
            if (key.includes(`q${questionNumber}`)) return HELP_DATA[key];
            if (key.includes(`_${questionNumber}`)) return HELP_DATA[key];
            const letter = String.fromCharCode(96 + questionNumber);
            if (key.endsWith(`_${letter}`)) return HELP_DATA[key];
        }
    }
    
    return null;
}

// إنشاء بطاقة شرح واحدة
function createHelpCard(questionNumber) {
    const examId = getCurrentExamId();
    const skill = getCurrentSkill();
    const data = findHelpData(skill, examId, questionNumber);
    
    const card = document.createElement('div');
    card.style.cssText = 'background:white;border-radius:12px;padding:20px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:1px solid #e0e0e0';
    
    if (data) {
        let keywordsHtml = '';
        if (data.keywords && data.keywords.length) {
            keywordsHtml = '<div style="margin:12px 0"><span style="color:#007bff;font-weight:bold">📌 كلمات مهمة :</span><br>';
            data.keywords.forEach(k => {
                keywordsHtml += `<span style="display:inline-block;background:#e3f2fd;padding:5px 12px;border-radius:20px;font-size:13px;margin:3px">${k}</span>`;
            });
            keywordsHtml += '</div>';
        }
        card.innerHTML = `
            <div style="font-weight:bold;color:#2c3e66;border-right:4px solid #007bff;padding-right:12px;margin-bottom:15px;font-size:17px">
                ${questionNumber}️⃣ ${data.text || ''}
            </div>
            <div style="margin-bottom:10px"><span style="color:#0056b3;font-weight:bold">📖 المعنى :</span> <span style="color:#333">${data.meaning || 'لا يوجد'}</span></div>
            ${keywordsHtml}
            <div style="margin-bottom:10px"><span style="color:#0056b3;font-weight:bold">✨ تبسيط :</span> <span style="color:#333">${data.simplified || data.meaning || 'لا يوجد'}</span></div>
            <div><span style="color:#0056b3;font-weight:bold">🎭 تخيل :</span> <span style="color:#333">${data.imagine || 'تخيل الجملة في سياقها'}</span></div>
        `;
    } else {
        card.innerHTML = `<div style="text-align:center;padding:20px;color:#999">❓ لا يوجد شرح للسؤال ${questionNumber}</div>`;
    }
    return card;
}

// إنشاء طبقة المساعدة
function createHelpLayer() {
    const container = document.createElement('div');
    container.id = 'helpLayerContainer';
    container.style.cssText = 'background:#f8f9fa;border-radius:16px;padding:20px;margin:20px 0';
    
    const skill = getCurrentSkill();
    const examId = getCurrentExamId();
    const correctQuestions = getCorrectQuestions(skill, examId);
    
    if (correctQuestions.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:#666">📚 لا توجد أسئلة صحيحة مسجلة في هذا الامتحان</div>';
        return container;
    }
    
    correctQuestions.sort((a, b) => a - b);
    
    if (correctQuestions.length === 10) {
        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:15px;';
        for (let i = 0; i < correctQuestions.length; i++) {
            const card = createHelpCard(correctQuestions[i]);
            card.style.marginBottom = '0';
            card.style.height = '100%';
            grid.appendChild(card);
        }
        container.appendChild(grid);
    } else {
        for (let i = 0; i < correctQuestions.length; i++) {
            container.appendChild(createHelpCard(correctQuestions[i]));
        }
    }
    return container;
}

// إخفاء محتوى الامتحان
function hideExamContent() {
    const hidden = [];
    const section = getActiveSection();
    if (!section) return hidden;
    
    const allChildren = [...section.children];
    for (let child of allChildren) {
        if (child.id !== 'helpLayerContainer') {
            if (child.style.display !== 'none') {
                child.dataset.originalDisplay = child.style.display || '';
                child.style.display = 'none';
                hidden.push(child);
            }
        }
    }
    return hidden;
}

// إظهار العناصر المخفية
function showElements(elements) {
    if (!elements) return;
    elements.forEach(el => {
        if (el) {
            const originalDisplay = el.dataset.originalDisplay;
            if (originalDisplay !== undefined) {
                el.style.display = originalDisplay;
                delete el.dataset.originalDisplay;
            } else {
                el.style.display = '';
            }
        }
    });
}

// إخفاء أزرار التصحيح
function hideButtons() {
    const hidden = [];
    document.querySelectorAll('button').forEach(btn => {
        const text = btn.textContent;
        if (text.includes('✅') || text.includes('تصحيح') || text.includes('Prüfen') || text.includes('↺') || text.includes('إعادة')) {
            if (btn.style.display !== 'none' && btn.id !== 'globalHelpButton') {
                btn.dataset.originalDisplayBtn = btn.style.display || '';
                btn.style.display = 'none';
                hidden.push(btn);
            }
        }
    });
    return hidden;
}

// إظهار الأزرار المخفية
function showButtons(buttons) {
    if (!buttons) return;
    buttons.forEach(btn => {
        if (btn) {
            const originalDisplay = btn.dataset.originalDisplayBtn;
            if (originalDisplay !== undefined) {
                btn.style.display = originalDisplay;
                delete btn.dataset.originalDisplayBtn;
            } else {
                btn.style.display = '';
            }
        }
    });
}

// تبديل وضع المساعدة
function toggleHelp() {
    const existing = document.getElementById('helpLayerContainer');
    const section = getActiveSection();
    
    if (helpLayerActive) {
        if (existing) existing.remove();
        if (originalContentBackup) {
            showElements(originalContentBackup.questions);
            showButtons(originalContentBackup.buttons);
            originalContentBackup = null;
        }
        helpLayerActive = false;
    } else {
        const hiddenQuestions = hideExamContent();
        const hiddenButtons = hideButtons();
        originalContentBackup = { questions: hiddenQuestions, buttons: hiddenButtons };
        const helpLayer = createHelpLayer();
        if (section && helpLayer.children.length > 0) section.appendChild(helpLayer);
        helpLayerActive = true;
    }
}

// إضافة زر المساعدة
function addHelpButton() {
    if (document.getElementById('globalHelpButton')) return;
    const nav = document.getElementById('examNavButtons');
    if (!nav) return;
    
    const btn = document.createElement('button');
    btn.id = 'globalHelpButton';
    btn.textContent = '🧠 مساعدة ذكية للنجاح';
    btn.style.cssText = 'background:linear-gradient(135deg,#007bff,#0056b3);color:white;border:none;border-radius:30px;padding:8px 20px;font-size:14px;font-weight:bold;cursor:pointer;margin-left:10px;box-shadow:0 2px 5px rgba(0,0,0,0.2);transition:all 0.3s';
    btn.onmouseenter = () => { btn.style.transform = 'scale(1.02)'; btn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)'; };
    btn.onmouseleave = () => { btn.style.transform = 'scale(1)'; btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)'; };
    btn.onclick = (e) => { e.stopPropagation(); toggleHelp(); };
    nav.appendChild(btn);
}

// مراقبة تغيير الامتحان
function setupExamChangeListener() {
    let lastExamId = getCurrentExamId();
    let lastSkill = getCurrentSkill();
    setInterval(() => {
        const currentId = getCurrentExamId();
        const currentSkill = getCurrentSkill();
        if (currentId !== lastExamId || currentSkill !== lastSkill) {
            lastExamId = currentId;
            lastSkill = currentSkill;
            if (helpLayerActive) toggleHelp();
            console.log(`🔄 تغير الامتحان إلى: ${currentSkill}_exam${currentId}`);
        }
    }, 500);
}

// ============================================
// دوال مساعدة للعبة التحدي السريع
// ============================================
if (typeof window.getCurrentExamId !== 'function') {
    window.getCurrentExamId = function() {
        return window.currentExamId || 1;
    };
}

if (typeof window.getCurrentSkill !== 'function') {
    window.getCurrentSkill = function() {
        if (document.getElementById('teil1')?.style.display === 'block') return 'lesen1';
        if (document.getElementById('teil2')?.style.display === 'block') return 'lesen2';
        if (document.getElementById('teil3')?.style.display === 'block') return 'lesen3';
        if (document.getElementById('sprach1')?.style.display === 'block') return 'sprach1';
        if (document.getElementById('sprach2')?.style.display === 'block') return 'sprach2';
        if (document.getElementById('hoeren1')?.style.display === 'block') return 'hoeren1';
        if (document.getElementById('hoeren2')?.style.display === 'block') return 'hoeren2';
        if (document.getElementById('hoeren3')?.style.display === 'block') return 'hoeren3';
        if (document.getElementById('schreiben')?.style.display === 'block') return 'schreiben';
        return 'lesen1';
    };
}

// ============================================
// بدء التشغيل
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        addHelpButton();
        setupExamChangeListener();
    });
} else {
    addHelpButton();
    setupExamChangeListener();
}

console.log('✅ helpSystem.js تم التحميل بنجاح');
console.log('📊 Hören Teil 1: 45 امتحان (1-27 أساسي + 28-45 تركيا)');
console.log('📊 Hören Teil 2: 49 امتحان (1-31 أساسي + 32-49 تركيا)');
console.log('📊 Hören Teil 3: 47 امتحان (1-27 أساسي + 28-47 تركيا)');
console.log('✅ دوال لعبة التحدي السريع جاهزة');
