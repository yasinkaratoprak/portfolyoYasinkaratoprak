/* ============================================================
   PORTFOLIO — script.js
   Theme (system-aware), language (EN/TR), active nav, contact-form status
   ============================================================ */

// ——————————————————————————————————————————————
// 1. TRANSLATIONS
// ——————————————————————————————————————————————
const translations = {
  en: {
    nav_about: "About", nav_projects: "Projects", nav_talks: "Talks", nav_contact: "Contact",
    hero_role: "Security Researcher & Developer",
    hero_text: "I work on web security, AI security, and network security, build open-source tools, and write about what I learn on my blog.",
    about_title: "About",
    about_text: "I have been involved in computer security since I was 16. I am a Computer Engineering student at Yaşar University. I am currently interested in web security, AI security, and network security. In my spare time, I develop open-source tools and create content.",
    about_label_uni: "University", about_uni: "Yaşar University — Computer Engineering",
    about_label_focus: "Focus", about_focus: "Web, AI & Network Security",
    projects_title: "Projects",
    proj_csrfpoc_desc: "A Burp Suite extension that turns a request from HTTP history into a CSRF proof of concept. It handles urlencoded forms, JSON sent as text/plain, and multipart file uploads, and copies the generated PoC to the clipboard.",
    proj_repoverse_desc: "A web tool that builds a setup script for a fresh machine. Pick developer tools, security packages, and everyday apps, and it generates the install commands for your package manager (apt, pacman, yay, brew, and others).",
    talks_title: "Talks",
    pres_title: "IDOR Workshop",
    pres_desc: "Detection and Analysis of IDOR Vulnerabilities",
    pres_meta: "Yaşar University Cybersecurity Society",
    contact_title: "Contact",
    contact_text: "Questions, collaboration ideas, or anything security-related — send a message and I'll get back to you.",
    form_name: "Name", form_name_ph: "Your name",
    form_email: "Email", form_email_ph: "you@example.com",
    form_subject: "Subject", form_subject_ph: "What is this about?",
    form_message: "Message", form_message_ph: "Write your message…",
    form_send: "Send message",
    form_sent: "Your message has been sent. Thanks — I'll get back to you soon.",
  },
  tr: {
    nav_about: "Hakkımda", nav_projects: "Projeler", nav_talks: "Sunumlar", nav_contact: "İletişim",
    hero_role: "Güvenlik Araştırmacısı & Geliştirici",
    hero_text: "Web güvenliği, yapay zeka güvenliği ve ağ güvenliği üzerine çalışıyorum; açık kaynak araçlar geliştiriyor, öğrendiklerimi blogumda paylaşıyorum.",
    about_title: "Hakkımda",
    about_text: "16 yaşımdan beri bilgisayar güvenliği ile ilgileniyorum. Yaşar Üniversitesi'nde Bilgisayar Mühendisliği öğrencisiyim. Şu anda web güvenliği, yapay zeka güvenliği ve ağ güvenliği alanlarıyla ilgileniyorum. Boş zamanlarımda açık kaynaklı araçlar geliştiriyor ve içerik üretiyorum.",
    about_label_uni: "Üniversite", about_uni: "Yaşar Üniversitesi — Bilgisayar Mühendisliği",
    about_label_focus: "İlgi Alanı", about_focus: "Web, Yapay Zeka & Ağ Güvenliği",
    projects_title: "Projeler",
    proj_csrfpoc_desc: "HTTP geçmişindeki bir isteği CSRF PoC'sine dönüştüren Burp Suite eklentisi. urlencoded formları, text/plain olarak gönderilen JSON'u ve multipart dosya yüklemelerini destekler; oluşturulan PoC'yi panoya kopyalar.",
    proj_repoverse_desc: "Yeni bir makine için kurulum betiği hazırlayan web aracı. Seçtiğiniz geliştirici araçları, güvenlik paketleri ve günlük uygulamalar için paket yöneticinize uygun kurulum komutlarını üretir (apt, pacman, yay, brew vb.).",
    talks_title: "Sunumlar",
    pres_title: "IDOR Atölyesi",
    pres_desc: "IDOR Zafiyetlerinin Tespiti ve Analizi",
    pres_meta: "Yaşar Üniversitesi Siber Güvenlik Topluluğu",
    contact_title: "İletişim",
    contact_text: "Sorularınız, iş birliği fikirleriniz veya güvenlikle ilgili her konu için mesaj gönderebilirsiniz; en kısa sürede dönüş yaparım.",
    form_name: "İsim", form_name_ph: "Adınız Soyadınız",
    form_email: "E-posta", form_email_ph: "siz@ornek.com",
    form_subject: "Konu", form_subject_ph: "Konu nedir?",
    form_message: "Mesaj", form_message_ph: "Mesajınızı yazın…",
    form_send: "Mesaj gönder",
    form_sent: "Mesajınız gönderildi. En kısa sürede dönüş yapacağım.",
  },
};

const root = document.documentElement;
const $ = (s) => document.querySelector(s);

// localStorage can throw when storage is blocked; never let that stop the script
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} },
};

// ——————————————————————————————————————————————
// 2. THEME — follows system preference unless overridden
// ——————————————————————————————————————————————
const themeToggle = $("#theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

const icon = (paths) =>
  `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const ICON_SUN = icon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>');
const ICON_MOON = icon('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>');

function effectiveTheme() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}
function renderThemeToggle() {
  themeToggle.innerHTML = effectiveTheme() === "dark" ? ICON_SUN : ICON_MOON;
}

// The saved theme is applied before first paint by theme-init.js

themeToggle.addEventListener("click", () => {
  const next = effectiveTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  store.set("theme", next);
  renderThemeToggle();
});
systemDark.addEventListener("change", renderThemeToggle);
renderThemeToggle();

// ——————————————————————————————————————————————
// 3. LANGUAGE
// ——————————————————————————————————————————————
const langToggle = $("#lang-toggle");
let currentLang =
  store.get("lang") ||
  ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en");

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });
  root.lang = lang;
  langToggle.querySelectorAll("[data-lang]").forEach((el) => {
    el.classList.toggle("is-current", el.dataset.lang === lang);
  });
}
langToggle.addEventListener("click", () => {
  const next = currentLang === "en" ? "tr" : "en";
  store.set("lang", next);
  applyLanguage(next);
});
applyLanguage(currentLang);

// ——————————————————————————————————————————————
// 4. ACTIVE NAV — marks the section currently in view
// ——————————————————————————————————————————————
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const navSections = navLinks.map((a) => document.querySelector(a.hash));

function updateActiveNav() {
  const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
  let active = atBottom ? navLinks.length - 1 : -1;
  if (!atBottom) {
    navSections.forEach((s, i) => {
      if (s.getBoundingClientRect().top <= innerHeight * 0.4) active = i;
    });
  }
  navLinks.forEach((a, i) => {
    if (i === active) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
}

let navTicking = false;
addEventListener("scroll", () => {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    updateActiveNav();
    navTicking = false;
  });
}, { passive: true });
updateActiveNav();

// ——————————————————————————————————————————————
// 5. CONTACT FORM — success notice after FormSubmit redirect
// ——————————————————————————————————————————————
if (new URLSearchParams(location.search).has("sent")) {
  const status = $("#form-status");
  if (status) status.hidden = false;
  history.replaceState(null, "", location.pathname + "#contact");
}
