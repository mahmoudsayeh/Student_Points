// ---- i18n ----

const I18N = {
  en: {
    brand: "Student Points",
    tabLeaderboard: "Leaderboard",
    tabMyPoints: "My Points",
    tabManage: "Manage Points",
    tabClasses: "Classes",
    tabWheel: "Wheel",
    wheelTitle: "Wheel of Names",
    wheelSubtitle: "Spin to pick a random student",
    spin: "Spin",
    spinning: "Spinning…",
    wheelWinnerTitle: "🎉 The wheel picked…",
    wheelWinnerMsg: "Good luck! 🍀",
    wheelNeedNames: "Add at least 2 students to spin the wheel.",
    classChampionsTitle: "🏆 Class Champions",
    noChampionsYet: "No classes have students yet.",
    deleteStudent: "Delete student",
    confirmDeleteStudent: "Delete {name}? This removes their points history too. This can't be undone.",
    couldNotDeleteStudent: "Could not delete this student.",
    tabExam: "Exam Grades",
    examTitle: "Exam Grades",
    examSubtitle: "Upload exam grades and award points automatically",
    examScaleTitle: "Grading scale (out of 20)",
    selectClass: "Select a class…",
    examFileHint: "Two columns: Name, Grade (out of 20)",
    selectClassFirst: "Select a class first.",
    couldNotImportExam: "Could not import that grades file.",
    matched: "matched",
    notMatched: "not matched",
    classesTitle: "Classes",
    classesSubtitle: "Create a class, then add students to it",
    newClassPlaceholder: "New class name (e.g. 5A)",
    addClass: "Add Class",
    classNameRequired: "Enter a class name.",
    classAlreadyExists: "A class with that name already exists.",
    couldNotLoadClasses: "Could not load classes.",
    couldNotCreateClass: "Could not create the class.",
    couldNotLoadClass: "Could not load this class.",
    addStudent: "Add Student",
    addStudents: "Add Students",
    addRow: "Add Row",
    studentNamePlaceholder: "Student name",
    studentNameRequired: "Enter a student name.",
    enterAtLeastOneName: "Enter at least one student name.",
    couldNotAddStudent: "Could not add this student.",
    couldNotAddStudents: "Could not add these students.",
    noStudentsInClass: "No students in this class yet.",
    studentsCount: "{n} student{s}",
    rename: "Rename",
    deleteClass: "Delete class",
    save: "Save",
    cancel: "Cancel",
    confirmDeleteClass: "Delete this class? This can't be undone.",
    classHasStudents: "Remove all students from this class first.",
    couldNotRenameClass: "Could not rename this class.",
    couldNotDeleteClass: "Could not delete this class.",
    moveTo: "Move to…",
    couldNotMoveStudent: "Could not move this student.",
    uploadFile: "Upload File",
    uploadFileHint: "Excel (.xlsx/.xls) or CSV — one name per row",
    fileTruncated: "Only the first 50 names from the file were loaded.",
    couldNotImportFile: "Could not import that file.",
    allClasses: "All Classes",
    managePasscodePrompt: "Enter the passcode to manage points",
    passcodePlaceholder: "Passcode",
    unlock: "Unlock",
    incorrectPasscode: "Incorrect passcode.",
    sessionExpired: "Session expired — please re-enter the passcode.",
    leaderboardTitle: "Class Leaderboard",
    leaderboardSubtitle: "See how every student ranks this term",
    shapePodium: "Podium",
    shapeMystery: "Mystery",
    mysteryHint: "Tap a level to reveal who's on top!",
    level: "Level {n}",
    myPointsTitle: "My Points",
    myPointsSubtitle: "Pick your name to see your points and history",
    selectYourName: "Select your name…",
    totalPoints: "total points",
    pointHistory: "Point History",
    noPointHistory: "No point history yet.",
    ofStudents: "of {n} students",
    manageTitle: "Manage Points",
    manageSubtitle: "Tap a student to add or remove points instantly",
    searchPlaceholder: "Search students…",
    grade: "Grade",
    pts: "pts",
    detailsHistory: "Details & history",
    deletePoint: "Delete Point",
    addWithReason: "Add with a Reason",
    amountPlaceholder: "Amount (e.g. 10 or -5)",
    reasonPlaceholder: "Reason (e.g. Homework completed)",
    apply: "Apply",
    setExactTotal: "Set Exact Total",
    setTotal: "Set Total",
    history: "History",
    undo: "undo",
    currentPoints: "current points",
    loading: "Loading…",
    noStudentsYet: "No students yet.",
    couldNotLoadLeaderboard: "Could not load the leaderboard. Please try again.",
    couldNotLoadStudents: "Could not load students.",
    couldNotLoadStudent: "Could not load this student.",
    couldNotLoadPoints: "Could not load points for this student.",
    enterNonZero: "Enter a non-zero amount.",
    reasonRequired: "A reason is required.",
    enterValidTotal: "Enter a valid non-negative total.",
    pointsUpdated: "Points updated — now {n}.",
    totalSetTo: "Total set to {n}.",
    couldNotUpdate: "Could not update points.",
    couldNotSet: "Could not set points.",
    champTitle: "Champion of the Class!",
    champMsg: "Unstoppable! Keep blazing through those points! 🔥",
    runnerTitle: "Amazing Runner-Up!",
    runnerMsg: "So close to the top — keep the fire burning! 🔥",
    thirdTitle: "Fantastic Third Place!",
    thirdMsg: "Great work climbing the ranks — keep it up! 🔥",
    tierPlatinum: "Platinum",
    tierGold: "Gold",
    tierSilver: "Silver",
    tierBronze: "Bronze",
  },
  ar: {
    brand: "نقاط الطلاب",
    tabLeaderboard: "لوحة الصدارة",
    tabMyPoints: "نقاطي",
    tabManage: "إدارة النقاط",
    tabClasses: "الصفوف",
    tabWheel: "العجلة",
    wheelTitle: "عجلة الأسماء",
    wheelSubtitle: "أدر العجلة لاختيار طالب عشوائياً",
    spin: "تدوير",
    spinning: "جارٍ التدوير…",
    wheelWinnerTitle: "🎉 اختارت العجلة…",
    wheelWinnerMsg: "بالتوفيق! 🍀",
    wheelNeedNames: "أضف طالبين على الأقل لتدوير العجلة.",
    classChampionsTitle: "🏆 أبطال الصفوف",
    noChampionsYet: "لا يوجد صفوف بها طلاب بعد.",
    deleteStudent: "حذف الطالب",
    confirmDeleteStudent: "حذف {name}؟ سيؤدي هذا أيضاً لحذف سجل نقاطه. لا يمكن التراجع عن هذا.",
    couldNotDeleteStudent: "تعذر حذف هذا الطالب.",
    tabExam: "درجات الامتحان",
    examTitle: "درجات الامتحان",
    examSubtitle: "ارفع درجات الامتحان وامنح النقاط تلقائياً",
    examScaleTitle: "سلم الدرجات (من 20)",
    selectClass: "اختر صفاً…",
    examFileHint: "عمودان: الاسم، الدرجة (من 20)",
    selectClassFirst: "اختر صفاً أولاً.",
    couldNotImportExam: "تعذر استيراد ملف الدرجات هذا.",
    matched: "تم المطابقة",
    notMatched: "لم تتم المطابقة",
    classesTitle: "الصفوف",
    classesSubtitle: "أنشئ صفاً، ثم أضف الطلاب إليه",
    newClassPlaceholder: "اسم الصف الجديد (مثال: 5A)",
    addClass: "إضافة صف",
    classNameRequired: "أدخل اسم الصف.",
    classAlreadyExists: "يوجد صف بهذا الاسم بالفعل.",
    couldNotLoadClasses: "تعذر تحميل الصفوف.",
    couldNotCreateClass: "تعذر إنشاء الصف.",
    couldNotLoadClass: "تعذر تحميل بيانات هذا الصف.",
    addStudent: "إضافة طالب",
    addStudents: "إضافة طلاب",
    addRow: "إضافة صف",
    studentNamePlaceholder: "اسم الطالب",
    studentNameRequired: "أدخل اسم الطالب.",
    enterAtLeastOneName: "أدخل اسم طالب واحد على الأقل.",
    couldNotAddStudent: "تعذر إضافة هذا الطالب.",
    couldNotAddStudents: "تعذر إضافة هؤلاء الطلاب.",
    noStudentsInClass: "لا يوجد طلاب في هذا الصف بعد.",
    studentsCount: "{n} طالب",
    rename: "إعادة تسمية",
    deleteClass: "حذف الصف",
    save: "حفظ",
    cancel: "إلغاء",
    confirmDeleteClass: "حذف هذا الصف؟ لا يمكن التراجع عن هذا.",
    classHasStudents: "أزل جميع الطلاب من هذا الصف أولاً.",
    couldNotRenameClass: "تعذر إعادة تسمية هذا الصف.",
    couldNotDeleteClass: "تعذر حذف هذا الصف.",
    moveTo: "نقل إلى…",
    couldNotMoveStudent: "تعذر نقل هذا الطالب.",
    uploadFile: "رفع ملف",
    uploadFileHint: "إكسل (.xlsx/.xls) أو CSV — اسم واحد في كل صف",
    fileTruncated: "تم تحميل أول 50 اسماً من الملف فقط.",
    couldNotImportFile: "تعذر استيراد هذا الملف.",
    allClasses: "كل الصفوف",
    managePasscodePrompt: "أدخل رمز الدخول لإدارة النقاط",
    passcodePlaceholder: "رمز الدخول",
    unlock: "فتح",
    incorrectPasscode: "رمز الدخول غير صحيح.",
    sessionExpired: "انتهت الجلسة — الرجاء إعادة إدخال رمز الدخول.",
    leaderboardTitle: "لوحة صدارة الصف",
    leaderboardSubtitle: "شاهد ترتيب كل طالب هذا الفصل",
    shapePodium: "المنصة",
    shapeMystery: "الغموض",
    mysteryHint: "اضغط على مستوى للكشف عن الفائز!",
    level: "المستوى {n}",
    myPointsTitle: "نقاطي",
    myPointsSubtitle: "اختر اسمك لرؤية نقاطك وسجلك",
    selectYourName: "اختر اسمك…",
    totalPoints: "إجمالي النقاط",
    pointHistory: "سجل النقاط",
    noPointHistory: "لا يوجد سجل نقاط بعد.",
    ofStudents: "من أصل {n} طالب",
    manageTitle: "إدارة النقاط",
    manageSubtitle: "اضغط على طالب لإضافة أو خصم النقاط فوراً",
    searchPlaceholder: "ابحث عن الطلاب…",
    grade: "الصف",
    pts: "نقطة",
    detailsHistory: "التفاصيل والسجل",
    deletePoint: "حذف نقطة",
    addWithReason: "إضافة مع سبب",
    amountPlaceholder: "الكمية (مثال: 10 أو -5)",
    reasonPlaceholder: "السبب (مثال: إكمال الواجب)",
    apply: "تطبيق",
    setExactTotal: "تحديد الإجمالي بدقة",
    setTotal: "تحديد الإجمالي",
    history: "السجل",
    undo: "تراجع",
    currentPoints: "النقاط الحالية",
    loading: "جارٍ التحميل…",
    noStudentsYet: "لا يوجد طلاب بعد.",
    couldNotLoadLeaderboard: "تعذر تحميل لوحة الصدارة. حاول مرة أخرى.",
    couldNotLoadStudents: "تعذر تحميل الطلاب.",
    couldNotLoadStudent: "تعذر تحميل بيانات هذا الطالب.",
    couldNotLoadPoints: "تعذر تحميل نقاط هذا الطالب.",
    enterNonZero: "أدخل قيمة غير صفرية.",
    reasonRequired: "السبب مطلوب.",
    enterValidTotal: "أدخل إجمالي صالح غير سالب.",
    pointsUpdated: "تم تحديث النقاط — الآن {n}.",
    totalSetTo: "تم تحديد الإجمالي إلى {n}.",
    couldNotUpdate: "تعذر تحديث النقاط.",
    couldNotSet: "تعذر تحديد النقاط.",
    champTitle: "بطل الصف!",
    champMsg: "لا يُوقَف! استمر في التألق! 🔥",
    runnerTitle: "وصيف رائع!",
    runnerMsg: "قريب جداً من القمة — حافظ على الحماس! 🔥",
    thirdTitle: "المركز الثالث الرائع!",
    thirdMsg: "عمل رائع في تسلق الترتيب — واصل! 🔥",
    tierPlatinum: "بلاتيني",
    tierGold: "ذهبي",
    tierSilver: "فضي",
    tierBronze: "برونزي",
  },
};

const SERVER_ERROR_KEYS = {
  "Reason is required": "reasonRequired",
  "Delta must be a non-zero integer": "enterNonZero",
  "Points must be a non-negative integer": "enterValidTotal",
  "Class name is required": "classNameRequired",
  "A class with that name already exists": "classAlreadyExists",
  "Remove all students from this class first": "classHasStudents",
  "At least one student name is required": "enterAtLeastOneName",
  "Incorrect passcode": "incorrectPasscode",
};

let lang = localStorage.getItem("student-points:lang") || (navigator.language.startsWith("ar") ? "ar" : "en");

function t(key, vars) {
  let str = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.replace(`{${k}}`, vars[k]);
    });
  }
  return str;
}

function translateServerError(msg) {
  const key = SERVER_ERROR_KEYS[msg];
  return key ? t(key) : msg;
}

function applyStaticI18n() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  const langToggle = document.getElementById("lang-toggle");
  langToggle.textContent = lang === "ar" ? "English" : "العربية";
}

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem("student-points:lang", lang);
  applyStaticI18n();

  closeCelebration();
  closeDetailModal();
  closeClassModal();

  loadLeaderboard();
  if (isManageUnlocked()) loadManageGrid();
  loadClasses();
  renderMyPointsClassFilter();
  if (lastExamResults) renderExamResults(lastExamResults);

  const picker = document.getElementById("student-picker");
  if (picker.value) loadStudentDetail(picker.value);
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLang(lang === "ar" ? "en" : "ar");
});

// ---- Tabs ----

const tabButtons = document.querySelectorAll(".tab-btn");
const views = {
  leaderboard: document.getElementById("leaderboard-view"),
  mypoints: document.getElementById("mypoints-view"),
  manage: document.getElementById("manage-view"),
  classes: document.getElementById("classes-view"),
  exam: document.getElementById("exam-view"),
  wheel: document.getElementById("wheel-view"),
};

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    Object.values(views).forEach((v) => v.classList.remove("active"));
    views[btn.dataset.view].classList.add("active");

    if (btn.dataset.view === "leaderboard") loadLeaderboard();
    if (btn.dataset.view === "manage") enterManageTab();
    if (btn.dataset.view === "classes") loadClasses();
    if (btn.dataset.view === "exam") enterExamTab();
    if (btn.dataset.view === "wheel") enterWheelTab();
  });
});

// ---- Helpers ----

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function rankSuffix(rank) {
  if (rank % 100 >= 11 && rank % 100 <= 13) return "th";
  switch (rank % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function tierFor(points) {
  if (points >= 90) return { icon: "💎", label: t("tierPlatinum") };
  if (points >= 70) return { icon: "🏅", label: t("tierGold") };
  if (points >= 50) return { icon: "🥈", label: t("tierSilver") };
  return { icon: "🎖️", label: t("tierBronze") };
}

function formatDate(sqlDate) {
  return new Date(sqlDate.replace(" ", "T")).toLocaleDateString(lang === "ar" ? "ar" : undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function historyItemHtml(h, { undo } = {}) {
  const negative = h.delta < 0;
  const sign = h.delta > 0 ? "+" : "";
  const undoBtn = undo
    ? `<button type="button" class="btn-undo" data-history-id="${h.id}">${t("undo")}</button>`
    : "";
  return `
    <div class="history-item">
      <div>
        <div class="history-reason">${escapeHtml(h.reason)}</div>
        <div class="history-date">${formatDate(h.created_at)}</div>
      </div>
      <div class="history-item-main">
        <div class="history-delta ${negative ? "negative" : ""}">${sign}${h.delta}</div>
        ${undoBtn}
      </div>
    </div>`;
}

// Fetches JSON from the API; on failure throws with the server's own error message, or the
// HTTP status when the response isn't JSON (e.g. a Netlify 502 or function timeout).
async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error((data && data.error) || `HTTP ${res.status} ${res.statusText}`.trim());
    err.status = res.status;
    throw err;
  }
  return data;
}

// A "could not load" message followed by the real reason it failed.
function loadErrorHtml(key, err) {
  const detail = err && err.message ? `<br /><small>${escapeHtml(err.message)}</small>` : "";
  return `<p class="empty-state">${t(key)}${detail}</p>`;
}

async function fetchStudents() {
  return fetchJson("/api/students");
}

const RANK_MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };

// ---- Leaderboard ----

let leaderboardCache = [];
let activeShape = "podium";
let activeLeaderboardClassId = null;

document.querySelectorAll(".shape-toggle .shape-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".shape-toggle .shape-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeShape = btn.dataset.shape;
    document.getElementById("podium-shape").classList.toggle("hidden", activeShape !== "podium");
    document.getElementById("mystery-shape").classList.toggle("hidden", activeShape !== "mystery");
    renderTop3();
  });
});

const leaderboardClassFilter = document.getElementById("leaderboard-class-filter");

function renderLeaderboardClassFilter() {
  renderClassFilterButtons(leaderboardClassFilter, activeLeaderboardClassId, (id) => {
    activeLeaderboardClassId = id;
    renderLeaderboardClassFilter();
    renderLeaderboardAll();
  });
}

function getFilteredLeaderboard() {
  const filtered =
    activeLeaderboardClassId === null
      ? leaderboardCache
      : leaderboardCache.filter((s) => s.class_id === activeLeaderboardClassId);
  return filtered
    .slice()
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    .map((s, i) => ({ ...s, rank: i + 1 }));
}

function renderTop3() {
  const top3 = getFilteredLeaderboard().filter((s) => s.rank <= 3);
  if (activeShape === "podium") {
    renderPodium(top3);
  } else {
    renderMystery(top3);
  }
}

function podiumColHtml(s, place) {
  if (!s) return "";
  const tier = tierFor(s.points);
  const crown = place === 1 ? '<div class="podium-crown">👑</div>' : "";
  return `
    <div class="podium-col place-${place}" data-id="${s.id}">
      ${crown}
      <div class="podium-medal">${RANK_MEDAL[place]}</div>
      <div class="podium-avatar" style="background:${s.avatar_color}">${initials(s.name)}</div>
      <div class="podium-name">${escapeHtml(s.name)}</div>
      <div class="podium-tier">${tier.icon} ${tier.label}</div>
      <div class="podium-points">${s.points} ${t("pts")}</div>
      <div class="podium-bar">#${place}</div>
    </div>`;
}

function renderPodium(top3) {
  const byRank = {};
  top3.forEach((s) => (byRank[s.rank] = s));
  const container = document.getElementById("podium-shape");

  if (!top3.length) {
    container.innerHTML = `<p class="empty-state">${t("noStudentsYet")}</p>`;
    return;
  }

  container.innerHTML = `
    <div class="podium-panel">
      <div class="podium-row">
        ${podiumColHtml(byRank[3], 3)}
        ${podiumColHtml(byRank[1], 1)}
        ${podiumColHtml(byRank[2], 2)}
      </div>
    </div>`;

  container.querySelectorAll(".podium-col").forEach((col) => {
    col.addEventListener("click", () => {
      const student = top3.find((s) => String(s.id) === col.dataset.id);
      if (student) openCelebration(student);
    });
  });
}

function renderMystery(top3) {
  const container = document.getElementById("mystery-shape");
  if (!top3.length) {
    container.innerHTML = `<p class="empty-state">${t("noStudentsYet")}</p>`;
    return;
  }

  container.innerHTML = `
    <div class="mystery-panel">
      <p class="mystery-hint">${t("mysteryHint")}</p>
      <div class="mystery-buttons">
        ${[1, 2, 3]
          .map(
            (rank) => `
          <button type="button" class="mystery-btn" data-rank="${rank}">
            <span class="mystery-icon">${RANK_MEDAL[rank]}</span>
            <span>${t("level", { n: rank })}</span>
          </button>`
          )
          .join("")}
      </div>
    </div>`;

  container.querySelectorAll(".mystery-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rank = Number(btn.dataset.rank);
      const student = top3.find((s) => s.rank === rank);
      if (student) openCelebration(student);
    });
  });
}

function renderLeaderboardList() {
  const container = document.getElementById("leaderboard-list");
  const list = getFilteredLeaderboard();
  const rest = list.filter((s) => s.rank > 3);

  if (!rest.length) {
    container.innerHTML = list.length ? "" : `<p class="empty-state">${t("noStudentsYet")}</p>`;
    return;
  }

  container.innerHTML = rest
    .map((s) => {
      return `
      <div class="rank-card" data-id="${s.id}" data-rank="${s.rank}">
        <div class="rank-badge">${s.rank}</div>
        <div class="avatar" style="background:${s.avatar_color}">${initials(s.name)}</div>
        <div class="card-info">
          <div class="card-name">${escapeHtml(s.name)}</div>
          <div class="card-grade">${escapeHtml(s.class_name)}</div>
        </div>
        <div class="card-points">${s.points} ${t("pts")}</div>
      </div>`;
    })
    .join("");
}

function renderLeaderboardAll() {
  renderTop3();
  renderLeaderboardList();
  renderClassChampions();
}

function renderClassChampions() {
  const container = document.getElementById("class-champions");
  if (!allClassesCache.length) {
    container.innerHTML = `<p class="empty-state">${t("noChampionsYet")}</p>`;
    return;
  }

  container.innerHTML = allClassesCache
    .map((c) => {
      const top3 = leaderboardCache
        .filter((s) => s.class_id === c.id)
        .slice()
        .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
        .slice(0, 3);

      const rows = top3.length
        ? top3
            .map(
              (s, i) => `
          <div class="champion-row">
            <span class="champion-medal">${RANK_MEDAL[i + 1]}</span>
            <span class="champion-name">${escapeHtml(s.name)}</span>
            <span class="champion-points">${s.points} ${t("pts")}</span>
          </div>`
            )
            .join("")
        : `<p class="empty-state">${t("noStudentsInClass")}</p>`;

      return `
        <div class="champion-card">
          <div class="champion-class-name">🏫 ${escapeHtml(c.name)}</div>
          ${rows}
        </div>`;
    })
    .join("");
}

async function loadLeaderboard() {
  const container = document.getElementById("leaderboard-list");
  try {
    leaderboardCache = await fetchStudents();
    renderLeaderboardClassFilter();
    renderLeaderboardAll();
  } catch (err) {
    container.innerHTML = loadErrorHtml("couldNotLoadLeaderboard", err);
  }
}

// ---- Celebration modal ----

const celebrationModal = document.getElementById("celebration-modal");
const celebrationBody = document.getElementById("celebration-modal-body");
const confettiLayer = document.getElementById("confetti-layer");
const celebrationClose = document.getElementById("celebration-modal-close");

const CELEBRATION_CONTENT = {
  1: { icon: "🥇", titleKey: "champTitle", msgKey: "champMsg" },
  2: { icon: "🥈", titleKey: "runnerTitle", msgKey: "runnerMsg" },
  3: { icon: "🥉", titleKey: "thirdTitle", msgKey: "thirdMsg" },
};

const CONFETTI_EMOJI = ["🎉", "✨", "⭐", "🎊", "🔥"];

function spawnConfetti(count = 36) {
  confettiLayer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.fontSize = `${1 + Math.random() * 0.8}rem`;
    confettiLayer.appendChild(piece);
  }
}

function showCelebrationModal({ icon, title, name, subLabel, subValue, message }) {
  const subBlock =
    subLabel != null
      ? `<div class="celebration-points-label">${subLabel}</div><div class="celebration-points">${subValue}</div>`
      : "";

  celebrationBody.innerHTML = `
    <span class="celebration-icon">${icon}</span>
    <span class="celebration-fire">🔥🔥🔥</span>
    <div class="celebration-title">${title}</div>
    <div class="celebration-name">${escapeHtml(name)}</div>
    ${subBlock}
    <p class="celebration-msg">${message}</p>
  `;

  celebrationModal.classList.remove("hidden");
  spawnConfetti();
}

function openCelebration(student) {
  const content = CELEBRATION_CONTENT[student.rank];
  if (!content) return;

  showCelebrationModal({
    icon: content.icon,
    title: t(content.titleKey),
    name: student.name,
    subLabel: t("totalPoints"),
    subValue: student.points,
    message: t(content.msgKey),
  });
}

function closeCelebration() {
  celebrationModal.classList.add("hidden");
  confettiLayer.innerHTML = "";
}

celebrationClose.addEventListener("click", closeCelebration);
celebrationModal.addEventListener("click", (e) => {
  if (e.target === celebrationModal) closeCelebration();
});

// ---- My Points tab ----

async function populateSelect(selectEl, { onRestoreSelection, classId = null } = {}) {
  try {
    const students = await fetchStudents();
    const filtered = classId === null ? students : students.filter((s) => s.class_id === classId);
    while (selectEl.options.length > 1) selectEl.remove(1);
    filtered
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = s.name;
        selectEl.appendChild(opt);
      });
    if (onRestoreSelection) onRestoreSelection(filtered);
  } catch (err) {
    // handled by whichever view is displaying data
  }
}

let activeMyPointsClassId = null;
const myPointsClassFilter = document.getElementById("mypoints-class-filter");

function renderMyPointsClassFilter() {
  renderClassFilterButtons(myPointsClassFilter, activeMyPointsClassId, (id) => {
    activeMyPointsClassId = id;
    renderMyPointsClassFilter();
    const picker = document.getElementById("student-picker");
    const previousValue = picker.value;
    populateSelect(picker, {
      classId: activeMyPointsClassId,
      onRestoreSelection: (students) => {
        if (students.some((s) => String(s.id) === previousValue)) {
          picker.value = previousValue;
        } else {
          picker.value = "";
          loadStudentDetail("");
        }
      },
    });
  });
}

async function loadStudentDetail(id) {
  const detail = document.getElementById("mypoints-detail");
  if (!id) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
    return;
  }

  detail.classList.remove("hidden");
  detail.innerHTML = `<p class="loading">${t("loading")}</p>`;

  try {
    const s = await fetchJson(`/api/students/${id}`);

    const historyHtml = s.history.length
      ? s.history.map((h) => historyItemHtml(h)).join("")
      : `<p class="empty-state">${t("noPointHistory")}</p>`;

    detail.innerHTML = `
      <div class="summary-card">
        <div>
          <div class="summary-points">${s.points}</div>
          <div class="summary-label">${t("totalPoints")}</div>
        </div>
        <div class="summary-rank">
          <div class="rank-value">${s.rank}${lang === "ar" ? "" : rankSuffix(s.rank)}</div>
          <div class="rank-label">${t("ofStudents", { n: s.totalStudents })}</div>
        </div>
      </div>
      <div class="history-heading">${t("pointHistory")}</div>
      ${historyHtml}
    `;
  } catch (err) {
    detail.innerHTML = loadErrorHtml("couldNotLoadPoints", err);
  }
}

document.getElementById("student-picker").addEventListener("change", (e) => {
  const id = e.target.value;
  if (id) {
    localStorage.setItem("student-points:selected", id);
  } else {
    localStorage.removeItem("student-points:selected");
  }
  loadStudentDetail(id);
});

// ---- Manage Points passcode gate ----

const MANAGE_PASSCODE_KEY = "student-points:managePasscode";
const manageGateEl = document.getElementById("manage-gate");
const manageContentEl = document.getElementById("manage-content");
const managePasscodeForm = document.getElementById("manage-passcode-form");
const managePasscodeInput = document.getElementById("manage-passcode-input");
const managePasscodeMsg = document.getElementById("manage-passcode-msg");

function isManageUnlocked() {
  return !!sessionStorage.getItem(MANAGE_PASSCODE_KEY);
}

function managePasscodeHeader() {
  const code = sessionStorage.getItem(MANAGE_PASSCODE_KEY);
  return code ? { "X-Manage-Passcode": code } : {};
}

function showManageGate() {
  manageGateEl.classList.remove("hidden");
  manageContentEl.classList.add("hidden");
}

function showManageContent() {
  manageGateEl.classList.add("hidden");
  manageContentEl.classList.remove("hidden");
}

function handlePasscodeExpired() {
  sessionStorage.removeItem(MANAGE_PASSCODE_KEY);
  showManageGate();
  showExamGate();
  showFormMsg(managePasscodeMsg, t("sessionExpired"), true);
  showFormMsg(examPasscodeMsg, t("sessionExpired"), true);
}

function enterManageTab() {
  if (isManageUnlocked()) {
    showManageContent();
    loadManageGrid();
  } else {
    showManageGate();
  }
}

async function verifyPasscode(passcode) {
  const res = await fetch("/api/verify-passcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passcode }),
  });
  return res.ok;
}

managePasscodeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const passcode = managePasscodeInput.value;
  if (!passcode || !(await verifyPasscode(passcode))) {
    showFormMsg(managePasscodeMsg, t("incorrectPasscode"), true);
    return;
  }

  sessionStorage.setItem(MANAGE_PASSCODE_KEY, passcode);
  managePasscodeInput.value = "";
  showManageContent();
  loadManageGrid();
});

// ---- Manage Points tab (card grid) ----

const manageGrid = document.getElementById("manage-grid");
const manageSearch = document.getElementById("manage-search");
let manageStudentsCache = [];

function manageCardHtml(s) {
  return `
    <div class="manage-card" data-id="${s.id}" data-class-id="${s.class_id}" data-name="${escapeHtml(s.name.toLowerCase())}">
      <div class="avatar" style="background:${s.avatar_color}">${initials(s.name)}</div>
      <div class="manage-card-name">${escapeHtml(s.name)}</div>
      <div class="manage-card-grade">${escapeHtml(s.class_name)}</div>
      <div class="manage-card-points" data-points>${s.points} ${t("pts")}</div>
      <div class="manage-card-actions">
        <button type="button" class="qbtn qbtn-add1" data-delta="1">+1</button>
        <button type="button" class="qbtn qbtn-add5" data-delta="5">+5</button>
        <button type="button" class="qbtn qbtn-del" data-delta="-1">${t("deletePoint")}</button>
      </div>
      <button type="button" class="card-link" data-details>${t("detailsHistory")}</button>
    </div>`;
}

async function loadManageGrid() {
  try {
    manageStudentsCache = await fetchStudents();
    manageGrid.innerHTML = manageStudentsCache
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(manageCardHtml)
      .join("");
    applyManageFilters();
  } catch (err) {
    manageGrid.innerHTML = loadErrorHtml("couldNotLoadStudents", err);
  }
}

// Shared icon-button class picker, reused by Leaderboard, My Points, and Manage Points.
function renderClassFilterButtons(container, activeId, onSelect) {
  const allBtn = `<button type="button" class="shape-btn ${activeId === null ? "active" : ""}" data-class-id="">📚 ${t("allClasses")}</button>`;
  const classBtns = allClassesCache
    .map(
      (c) =>
        `<button type="button" class="shape-btn ${activeId === c.id ? "active" : ""}" data-class-id="${c.id}">🏫 ${escapeHtml(c.name)}</button>`
    )
    .join("");
  container.innerHTML = allBtn + classBtns;

  container.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      onSelect(btn.dataset.classId ? Number(btn.dataset.classId) : null);
    });
  });
}

let activeManageClassId = null;

function applyManageFilters() {
  const q = manageSearch.value.trim().toLowerCase();
  manageGrid.querySelectorAll(".manage-card").forEach((card) => {
    const matchesSearch = !q || card.dataset.name.includes(q);
    const matchesClass = activeManageClassId === null || Number(card.dataset.classId) === activeManageClassId;
    card.classList.toggle("hidden", !(matchesSearch && matchesClass));
  });
}

manageSearch.addEventListener("input", applyManageFilters);

const manageClassFilter = document.getElementById("manage-class-filter");

function renderManageClassFilter() {
  renderClassFilterButtons(manageClassFilter, activeManageClassId, (id) => {
    activeManageClassId = id;
    renderManageClassFilter();
    applyManageFilters();
  });
}

manageGrid.addEventListener("click", async (e) => {
  const card = e.target.closest(".manage-card");
  if (!card) return;
  const id = card.dataset.id;

  const qbtn = e.target.closest(".qbtn");
  if (qbtn) {
    const delta = Number(qbtn.dataset.delta);
    const reason = delta > 0 ? `Quick +${delta} point${delta > 1 ? "s" : ""}` : "Quick point removed";

    card.querySelectorAll(".qbtn").forEach((b) => (b.disabled = true));
    try {
      const res = await fetch(`/api/students/${id}/points`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...managePasscodeHeader() },
        body: JSON.stringify({ delta, reason }),
      });
      if (res.status === 401) return handlePasscodeExpired();
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      const pointsEl = card.querySelector("[data-points]");
      pointsEl.textContent = `${data.points} ${t("pts")}`;
      pointsEl.classList.add("bump");
      setTimeout(() => pointsEl.classList.remove("bump"), 200);
    } catch (err) {
      // silently ignore; card stays at last known value
    } finally {
      card.querySelectorAll(".qbtn").forEach((b) => (b.disabled = false));
    }
    return;
  }

  if (e.target.closest("[data-details]")) {
    openDetailModal(id);
  }
});

// ---- Classes tab ----

const classesGrid = document.getElementById("classes-grid");
const addClassForm = document.getElementById("add-class-form");
const newClassNameInput = document.getElementById("new-class-name");
const addClassMsg = document.getElementById("add-class-msg");

let allClassesCache = [];

function classCardHtml(c) {
  return `
    <div class="class-card" data-id="${c.id}">
      <div class="class-icon">🏫</div>
      <div class="class-name">${escapeHtml(c.name)}</div>
      <div class="class-count">${t("studentsCount", { n: c.studentCount, s: c.studentCount === 1 ? "" : "s" })}</div>
    </div>`;
}

async function loadClasses() {
  try {
    const classes = await fetchJson("/api/classes");
    allClassesCache = classes;
    classesGrid.innerHTML = classes.length
      ? classes.map(classCardHtml).join("")
      : `<p class="empty-state">${t("noStudentsYet")}</p>`;

    classesGrid.querySelectorAll(".class-card").forEach((card) => {
      card.addEventListener("click", () => openClassModal(card.dataset.id));
    });

    renderManageClassFilter();
    renderLeaderboardClassFilter();
    renderMyPointsClassFilter();
    renderExamClassOptions();
    renderClassChampions();
    renderWheelClassFilter();
  } catch (err) {
    classesGrid.innerHTML = loadErrorHtml("couldNotLoadClasses", err);
  }
}

addClassForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = newClassNameInput.value.trim();
  if (!name) {
    showFormMsg(addClassMsg, t("classNameRequired"), true);
    return;
  }

  try {
    const res = await fetch("/api/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.status === 409 ? t("classAlreadyExists") : data.error || t("couldNotCreateClass"));
    }

    newClassNameInput.value = "";
    showFormMsg(addClassMsg, "", false);
    loadClasses();
  } catch (err) {
    showFormMsg(addClassMsg, err.message || t("couldNotCreateClass"), true);
  }
});

// ---- Class detail modal (roster + add student) ----

const classModal = document.getElementById("class-modal");
const classModalBody = document.getElementById("class-modal-body");
const classModalClose = document.getElementById("class-modal-close");
let currentClassId = null;

function closeClassModal() {
  classModal.classList.add("hidden");
  currentClassId = null;
}

classModalClose.addEventListener("click", closeClassModal);
classModal.addEventListener("click", (e) => {
  if (e.target === classModal) closeClassModal();
});

function classRosterItemHtml(s) {
  const otherClasses = allClassesCache.filter((c) => c.id !== currentClassId);
  const moveOptions = otherClasses.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join("");
  return `
    <div class="class-roster-item">
      <div class="avatar" style="background:${s.avatar_color}">${initials(s.name)}</div>
      <div class="class-roster-name">${escapeHtml(s.name)}</div>
      <div class="class-roster-points">${s.points} ${t("pts")}</div>
      <select class="move-select" data-student-id="${s.id}" ${otherClasses.length ? "" : "disabled"}>
        <option value="">${t("moveTo")}</option>
        ${moveOptions}
      </select>
      <button type="button" class="icon-btn icon-btn-danger delete-student-btn" data-student-id="${s.id}" data-student-name="${escapeHtml(s.name)}" title="${t("deleteStudent")}">🗑️</button>
    </div>`;
}

function studentRowHtml(rowIndex, value = "") {
  return `
    <tr class="student-row">
      <td class="row-index">${rowIndex}</td>
      <td><input type="text" class="student-name-input" placeholder="${t("studentNamePlaceholder")}" maxlength="80" value="${escapeHtml(value)}" /></td>
      <td><button type="button" class="row-remove-btn" title="✕">✕</button></td>
    </tr>`;
}

function renumberRows() {
  document.querySelectorAll("#add-students-rows .row-index").forEach((el, i) => {
    el.textContent = i + 1;
  });
}

async function openClassModal(id) {
  currentClassId = Number(id);
  classModal.classList.remove("hidden");
  classModalBody.innerHTML = `<p class="loading">${t("loading")}</p>`;

  try {
    const cls = await fetchJson(`/api/classes/${id}`);

    const rosterHtml = cls.students.length
      ? cls.students.map(classRosterItemHtml).join("")
      : `<p class="empty-state">${t("noStudentsInClass")}</p>`;

    classModalBody.innerHTML = `
      <div class="summary-card">
        <div class="class-name-row" id="class-name-row">
          <span class="class-name-display" id="class-name-display">${escapeHtml(cls.name)}</span>
          <button type="button" class="icon-btn" id="rename-class-btn" title="${t("rename")}">✏️</button>
          <button type="button" class="icon-btn icon-btn-danger" id="delete-class-btn" title="${t("deleteClass")}">🗑️</button>
        </div>
        <div class="summary-label">${t("studentsCount", { n: cls.students.length, s: cls.students.length === 1 ? "" : "s" })}</div>
      </div>
      <p class="form-msg" id="class-action-msg"></p>

      <div id="class-roster" class="class-roster">${rosterHtml}</div>
      <p class="form-msg" id="move-student-msg"></p>

      <h2 class="form-title">${t("addStudents")}</h2>
      <div class="file-upload-row">
        <label class="btn-icon-add file-upload-label" for="student-file-input">
          <span class="btn-icon-glyph">📁</span>
          <span>${t("uploadFile")}</span>
        </label>
        <input type="file" id="student-file-input" accept=".xlsx,.xls,.csv" class="visually-hidden" />
        <span class="file-upload-hint">${t("uploadFileHint")}</span>
      </div>
      <div class="add-students-table-wrap">
        <table class="add-students-table">
          <tbody id="add-students-rows">
            ${[1, 2, 3].map((n) => studentRowHtml(n)).join("")}
          </tbody>
        </table>
      </div>
      <div class="add-students-actions">
        <button type="button" class="card-link" id="add-row-btn">+ ${t("addRow")}</button>
        <button type="button" class="btn-icon-add" id="submit-students-btn">
          <span class="btn-icon-glyph">➕</span>
          <span>${t("addStudents")}</span>
        </button>
      </div>
      <p class="form-msg" id="add-student-msg"></p>
    `;

    currentClassName = cls.name;
    bindClassModalEvents();
  } catch (err) {
    classModalBody.innerHTML = loadErrorHtml("couldNotLoadClass", err);
  }
}

let currentClassName = "";

function bindClassModalEvents() {
  document.getElementById("rename-class-btn").addEventListener("click", enterRenameMode);
  document.getElementById("delete-class-btn").addEventListener("click", handleDeleteClass);

  document.getElementById("class-roster").addEventListener("change", (e) => {
    const select = e.target.closest(".move-select");
    if (select) handleMoveStudent(select);
  });

  document.getElementById("class-roster").addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-student-btn");
    if (btn) handleDeleteStudent(btn.dataset.studentId, btn.dataset.studentName);
  });

  document.getElementById("student-file-input").addEventListener("change", handleStudentFileUpload);

  document.getElementById("add-row-btn").addEventListener("click", () => {
    const tbody = document.getElementById("add-students-rows");
    tbody.insertAdjacentHTML("beforeend", studentRowHtml(tbody.children.length + 1));
  });

  document.getElementById("add-students-rows").addEventListener("click", (e) => {
    const btn = e.target.closest(".row-remove-btn");
    if (!btn) return;
    const tbody = document.getElementById("add-students-rows");
    const row = btn.closest("tr");
    if (tbody.children.length > 1) {
      row.remove();
      renumberRows();
    } else {
      row.querySelector(".student-name-input").value = "";
    }
  });

  document.getElementById("submit-students-btn").addEventListener("click", handleBulkAddStudents);
}

async function handleMoveStudent(select) {
  const studentId = select.dataset.studentId;
  const classId = Number(select.value);
  const msg = document.getElementById("move-student-msg");
  if (!classId) return;

  select.disabled = true;
  try {
    const res = await fetch(`/api/students/${studentId}/class`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t("couldNotMoveStudent"));

    openClassModal(currentClassId);
    loadClasses();
    loadManageGrid();
    populateSelect(document.getElementById("student-picker"));
    loadLeaderboard();
  } catch (err) {
    select.disabled = false;
    showFormMsg(msg, err.message || t("couldNotMoveStudent"), true);
  }
}

async function handleDeleteStudent(studentId, studentName) {
  if (!confirm(t("confirmDeleteStudent", { name: studentName }))) return;

  const msg = document.getElementById("move-student-msg");
  try {
    const res = await fetch(`/api/students/${studentId}`, {
      method: "DELETE",
      headers: managePasscodeHeader(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(translateServerError(data.error) || t("couldNotDeleteStudent"));

    openClassModal(currentClassId);
    loadClasses();
    loadManageGrid();
    populateSelect(document.getElementById("student-picker"));
    loadLeaderboard();
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotDeleteStudent"), true);
  }
}

async function handleStudentFileUpload(e) {
  const file = e.target.files[0];
  if (!file || !currentClassId) return;

  const msg = document.getElementById("add-student-msg");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`/api/classes/${currentClassId}/students/import`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t("couldNotImportFile"));

    openClassModal(currentClassId);
    loadClasses();
    loadManageGrid();
    populateSelect(document.getElementById("student-picker"));
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotImportFile"), true);
  } finally {
    e.target.value = "";
  }
}

function enterRenameMode() {
  const row = document.getElementById("class-name-row");
  row.innerHTML = `
    <input type="text" id="class-rename-input" value="${escapeHtml(currentClassName)}" maxlength="60" />
    <button type="button" class="icon-btn" id="save-rename-btn" title="${t("save")}">✔️</button>
    <button type="button" class="icon-btn" id="cancel-rename-btn" title="${t("cancel")}">✕</button>
  `;
  const input = document.getElementById("class-rename-input");
  input.focus();
  input.select();

  document.getElementById("save-rename-btn").addEventListener("click", saveRename);
  document.getElementById("cancel-rename-btn").addEventListener("click", () => openClassModal(currentClassId));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); saveRename(); }
    if (e.key === "Escape") openClassModal(currentClassId);
  });
}

async function saveRename() {
  const input = document.getElementById("class-rename-input");
  const msg = document.getElementById("class-action-msg");
  const name = input.value.trim();

  if (!name) {
    showFormMsg(msg, t("classNameRequired"), true);
    return;
  }

  try {
    const res = await fetch(`/api/classes/${currentClassId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(translateServerError(data.error) || t("couldNotRenameClass"));

    currentClassName = data.name;
    openClassModal(currentClassId);
    loadClasses();
    loadManageGrid();
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotRenameClass"), true);
  }
}

async function handleDeleteClass() {
  if (!confirm(t("confirmDeleteClass"))) return;

  const msg = document.getElementById("class-action-msg");
  try {
    const res = await fetch(`/api/classes/${currentClassId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new Error(translateServerError(data.error) || t("couldNotDeleteClass"));

    closeClassModal();
    loadClasses();
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotDeleteClass"), true);
  }
}

async function handleBulkAddStudents() {
  if (!currentClassId) return;

  const msg = document.getElementById("add-student-msg");
  const names = Array.from(document.querySelectorAll("#add-students-rows .student-name-input"))
    .map((el) => el.value.trim())
    .filter(Boolean);

  if (!names.length) {
    showFormMsg(msg, t("enterAtLeastOneName"), true);
    return;
  }

  try {
    const res = await fetch(`/api/classes/${currentClassId}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ names }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(translateServerError(data.error) || t("couldNotAddStudents"));

    openClassModal(currentClassId);
    loadClasses();
    loadManageGrid();
    populateSelect(document.getElementById("student-picker"));
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotAddStudents"), true);
  }
}

// ---- Exam Grades tab ----

const examGateEl = document.getElementById("exam-gate");
const examContentEl = document.getElementById("exam-content");
const examPasscodeForm = document.getElementById("exam-passcode-form");
const examPasscodeInput = document.getElementById("exam-passcode-input");
const examPasscodeMsg = document.getElementById("exam-passcode-msg");
const examClassSelect = document.getElementById("exam-class-select");
const examFileInput = document.getElementById("exam-file-input");
const examResultsEl = document.getElementById("exam-results");
const examMsg = document.getElementById("exam-msg");

function showExamGate() {
  examGateEl.classList.remove("hidden");
  examContentEl.classList.add("hidden");
}

function showExamContent() {
  examGateEl.classList.add("hidden");
  examContentEl.classList.remove("hidden");
}

function enterExamTab() {
  if (isManageUnlocked()) {
    showExamContent();
    renderExamClassOptions();
  } else {
    showExamGate();
  }
}

examPasscodeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const passcode = examPasscodeInput.value;
  if (!passcode || !(await verifyPasscode(passcode))) {
    showFormMsg(examPasscodeMsg, t("incorrectPasscode"), true);
    return;
  }

  sessionStorage.setItem(MANAGE_PASSCODE_KEY, passcode);
  examPasscodeInput.value = "";
  showExamContent();
  renderExamClassOptions();
});

function renderExamClassOptions() {
  const previous = examClassSelect.value;
  while (examClassSelect.options.length > 1) examClassSelect.remove(1);
  allClassesCache.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `🏫 ${c.name}`;
    examClassSelect.appendChild(opt);
  });
  if (Array.from(examClassSelect.options).some((o) => o.value === previous)) {
    examClassSelect.value = previous;
  }
  updateExamFileInputState();
}

function updateExamFileInputState() {
  const disabled = !examClassSelect.value;
  examFileInput.disabled = disabled;
  document.querySelector('label[for="exam-file-input"]').classList.toggle("disabled", disabled);
}

examClassSelect.addEventListener("change", () => {
  updateExamFileInputState();
  examResultsEl.innerHTML = "";
  showFormMsg(examMsg, "", false);
});

examFileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const classId = examClassSelect.value;
  if (!file) return;

  if (!classId) {
    showFormMsg(examMsg, t("selectClassFirst"), true);
    e.target.value = "";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`/api/classes/${classId}/exam-import`, {
      method: "POST",
      headers: managePasscodeHeader(),
      body: formData,
    });
    if (res.status === 401) return handlePasscodeExpired();
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || t("couldNotImportExam"));

    showFormMsg(examMsg, "", false);
    lastExamResults = data;
    renderExamResults(data);
    loadManageGrid();
    loadLeaderboard();
    const picker = document.getElementById("student-picker");
    if (picker.value) loadStudentDetail(picker.value);
  } catch (err) {
    showFormMsg(examMsg, err.message || t("couldNotImportExam"), true);
  } finally {
    e.target.value = "";
  }
});

let lastExamResults = null;

function renderExamResults(results) {
  examResultsEl.innerHTML = results
    .map((r) => {
      const gradeText = r.grade === null ? "—" : `${r.grade}/20`;

      if (!r.matched) {
        return `
          <div class="exam-result-item no-match">
            <div>
              <div class="exam-result-name">${escapeHtml(r.name)}</div>
              <div class="exam-result-grade">${gradeText} · ${t("notMatched")}</div>
            </div>
            <div class="exam-result-points unmatched">—</div>
          </div>`;
      }

      const cls = r.pointsAwarded > 0 ? "awarded" : "none";
      const sign = r.pointsAwarded > 0 ? "+" : "";
      return `
        <div class="exam-result-item">
          <div>
            <div class="exam-result-name">${escapeHtml(r.name)}</div>
            <div class="exam-result-grade">${gradeText} · ${t("matched")}</div>
          </div>
          <div class="exam-result-points ${cls}">${sign}${r.pointsAwarded} ${t("pts")}</div>
        </div>`;
    })
    .join("");
}

// ---- Wheel of Names ----

const WHEEL_COLORS = ["#8A1538", "#1E88A8", "#2E7D32", "#B8860B", "#6A4C93", "#C2410C", "#2563EB", "#BE185D"];

let activeWheelClassId = null;
let wheelNames = [];
let wheelRotation = 0;
let wheelSpinning = false;

const wheelDisc = document.getElementById("wheel-disc");
const wheelSpinBtn = document.getElementById("wheel-spin-btn");
const wheelMsg = document.getElementById("wheel-msg");

function renderWheelClassFilter() {
  renderClassFilterButtons(document.getElementById("wheel-class-filter"), activeWheelClassId, (id) => {
    activeWheelClassId = id;
    renderWheelClassFilter();
    wheelRotation = 0;
    wheelDisc.style.transition = "none";
    wheelDisc.style.transform = "rotate(0deg)";
    renderWheel();
  });
}

function renderWheel() {
  wheelNames = activeWheelClassId === null ? leaderboardCache : leaderboardCache.filter((s) => s.class_id === activeWheelClassId);
  const n = wheelNames.length;

  if (n < 2) {
    wheelDisc.style.background = "var(--surface)";
    wheelDisc.innerHTML = `<p class="wheel-empty">${t("wheelNeedNames")}</p>`;
    wheelSpinBtn.disabled = true;
    return;
  }

  wheelSpinBtn.disabled = false;
  const slice = 360 / n;
  const stops = wheelNames
    .map((s, i) => `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * slice}deg ${(i + 1) * slice}deg`)
    .join(",");
  wheelDisc.style.background = `conic-gradient(${stops})`;

  wheelDisc.innerHTML = wheelNames
    .map((s, i) => {
      const angle = slice * i + slice / 2;
      return `<div class="wheel-label" style="transform: rotate(${angle}deg)"><span>${escapeHtml(s.name)}</span></div>`;
    })
    .join("");
}

function enterWheelTab() {
  renderWheelClassFilter();
  renderWheel();
}

wheelSpinBtn.addEventListener("click", () => {
  if (wheelSpinning) return;
  const n = wheelNames.length;
  if (n < 2) {
    showFormMsg(wheelMsg, t("wheelNeedNames"), true);
    return;
  }

  wheelSpinning = true;
  wheelSpinBtn.disabled = true;
  showFormMsg(wheelMsg, "", false);

  const slice = 360 / n;
  const winnerIndex = Math.floor(Math.random() * n);
  const targetMid = winnerIndex * slice + slice / 2;

  const currentMod = ((wheelRotation % 360) + 360) % 360;
  const desiredMod = (360 - targetMid) % 360;
  let delta = desiredMod - currentMod;
  if (delta <= 0) delta += 360;
  delta += 360 * 5;
  wheelRotation += delta;

  wheelDisc.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 1)";
  wheelDisc.style.transform = `rotate(${wheelRotation}deg)`;

  const onEnd = () => {
    wheelDisc.removeEventListener("transitionend", onEnd);
    wheelSpinning = false;
    wheelSpinBtn.disabled = false;
    const winner = wheelNames[winnerIndex];
    showCelebrationModal({
      icon: "🎡",
      title: t("wheelWinnerTitle"),
      name: winner.name,
      subLabel: null,
      subValue: null,
      message: t("wheelWinnerMsg"),
    });
  };
  wheelDisc.addEventListener("transitionend", onEnd);
});

// ---- Detail modal (history, undo, set exact total, custom add) ----

const detailModal = document.getElementById("detail-modal");
const detailBody = document.getElementById("detail-modal-body");
const detailClose = document.getElementById("detail-modal-close");
let currentDetailId = null;

function closeDetailModal() {
  detailModal.classList.add("hidden");
  currentDetailId = null;
}

detailClose.addEventListener("click", closeDetailModal);
detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) closeDetailModal();
});

async function openDetailModal(id) {
  currentDetailId = Number(id);
  detailModal.classList.remove("hidden");
  detailBody.innerHTML = `<p class="loading">${t("loading")}</p>`;

  try {
    const s = await fetchJson(`/api/students/${id}`);

    const historyHtml = s.history.length
      ? s.history.map((h) => historyItemHtml(h, { undo: true })).join("")
      : `<p class="empty-state">${t("noPointHistory")}</p>`;

    detailBody.innerHTML = `
      <div class="summary-card">
        <div>
          <div class="summary-points">${s.points}</div>
          <div class="summary-label">${escapeHtml(s.name)} — ${t("totalPoints")}</div>
        </div>
      </div>

      <form id="award-form" class="manage-form">
        <h2 class="form-title">${t("addWithReason")}</h2>
        <div class="form-row">
          <input type="number" id="award-amount" placeholder="${t("amountPlaceholder")}" required />
        </div>
        <div class="form-row">
          <input type="text" id="award-reason" placeholder="${t("reasonPlaceholder")}" maxlength="200" required />
        </div>
        <button type="submit" class="btn-primary">${t("apply")}</button>
        <p class="form-msg" id="award-msg"></p>
      </form>

      <form id="set-form" class="manage-form">
        <h2 class="form-title">${t("setExactTotal")}</h2>
        <div class="form-row">
          <input type="number" id="set-amount" min="0" value="${s.points}" required />
        </div>
        <button type="submit" class="btn-secondary">${t("setTotal")}</button>
        <p class="form-msg" id="set-msg"></p>
      </form>

      <h2 class="form-title">${t("history")}</h2>
      <div id="detail-history" class="card-list">${historyHtml}</div>
    `;

    document.getElementById("award-form").addEventListener("submit", handleAwardSubmit);
    document.getElementById("set-form").addEventListener("submit", handleSetSubmit);
  } catch (err) {
    detailBody.innerHTML = loadErrorHtml("couldNotLoadStudent", err);
  }
}

function showFormMsg(el, text, isError) {
  el.textContent = text;
  el.className = `form-msg ${isError ? "error" : "success"}`;
  if (text) setTimeout(() => { el.textContent = ""; el.className = "form-msg"; }, 3000);
}

async function handleAwardSubmit(e) {
  e.preventDefault();
  if (!currentDetailId) return;

  const amountInput = document.getElementById("award-amount");
  const reasonInput = document.getElementById("award-reason");
  const msg = document.getElementById("award-msg");

  const delta = parseInt(amountInput.value, 10);
  const reason = reasonInput.value.trim();

  if (!Number.isInteger(delta) || delta === 0) {
    showFormMsg(msg, t("enterNonZero"), true);
    return;
  }
  if (!reason) {
    showFormMsg(msg, t("reasonRequired"), true);
    return;
  }

  try {
    const res = await fetch(`/api/students/${currentDetailId}/points`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...managePasscodeHeader() },
      body: JSON.stringify({ delta, reason }),
    });
    if (res.status === 401) return handlePasscodeExpired();
    const data = await res.json();
    if (!res.ok) throw new Error(translateServerError(data.error) || t("couldNotUpdate"));

    amountInput.value = "";
    reasonInput.value = "";
    showFormMsg(msg, t("pointsUpdated", { n: data.points }), false);
    openDetailModal(currentDetailId);
    loadManageGrid();
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotUpdate"), true);
  }
}

async function handleSetSubmit(e) {
  e.preventDefault();
  if (!currentDetailId) return;

  const setAmount = document.getElementById("set-amount");
  const msg = document.getElementById("set-msg");
  const points = parseInt(setAmount.value, 10);

  if (!Number.isInteger(points) || points < 0) {
    showFormMsg(msg, t("enterValidTotal"), true);
    return;
  }

  try {
    const res = await fetch(`/api/students/${currentDetailId}/points`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...managePasscodeHeader() },
      body: JSON.stringify({ points, reason: "Manual adjustment" }),
    });
    if (res.status === 401) return handlePasscodeExpired();
    const data = await res.json();
    if (!res.ok) throw new Error(translateServerError(data.error) || t("couldNotSet"));

    showFormMsg(msg, t("totalSetTo", { n: data.points }), false);
    openDetailModal(currentDetailId);
    loadManageGrid();
  } catch (err) {
    showFormMsg(msg, err.message || t("couldNotSet"), true);
  }
}

detailBody.addEventListener("click", async (e) => {
  const btn = e.target.closest(".btn-undo");
  if (!btn || !currentDetailId) return;
  const historyId = btn.dataset.historyId;

  try {
    const res = await fetch(`/api/history/${historyId}`, {
      method: "DELETE",
      headers: managePasscodeHeader(),
    });
    if (res.status === 401) return handlePasscodeExpired();
    if (!res.ok) throw new Error("Failed to undo");
    openDetailModal(currentDetailId);
    loadManageGrid();
  } catch (err) {
    // ignore
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!celebrationModal.classList.contains("hidden")) closeCelebration();
  if (!detailModal.classList.contains("hidden")) closeDetailModal();
  if (!classModal.classList.contains("hidden")) closeClassModal();
});

// ---- Init ----

applyStaticI18n();
loadLeaderboard();
populateSelect(document.getElementById("student-picker"), {
  onRestoreSelection: (students) => {
    const saved = localStorage.getItem("student-points:selected");
    const picker = document.getElementById("student-picker");
    if (saved && students.some((s) => String(s.id) === saved)) {
      picker.value = saved;
      loadStudentDetail(saved);
    }
  },
});
if (isManageUnlocked()) loadManageGrid();
loadClasses();
