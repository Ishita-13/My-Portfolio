/* ========== Helpers ========== */
const q = (sel) => document.querySelector(sel);
const qAll = (sel) => Array.from(document.querySelectorAll(sel));

/* ========== DOM elements ========== */
const themeToggle = q("#theme-toggle");
const topBtn = q("#scroll-top");
const mobileToggle = q("#mobile-menu-toggle");
const navLinksContainer = q(".nav-links");
const navLinks = qAll(".nav-link");
const sections = qAll(".section");
const typingEl = q("#typing-text");
const contactForm = q("#contact-form");

/* ========== THEME: light/dark toggle + persisted preference ========== */
const THEME_KEY = "teal_portfolio_theme";
function setTheme(isDark) {
  if (isDark) document.body.classList.add("dark");
  else document.body.classList.remove("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}
themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  setTheme(isDark);
});
// on load, restore
(function restoreTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") setTheme(true);
  else setTheme(false);
})();

/* ========== MOBILE NAV TOGGLE ========== */
mobileToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("show");
});

/* Close mobile menu when clicking any nav link (mobile) */
navLinks.forEach(a => a.addEventListener("click", () => navLinksContainer.classList.remove("show")));

/* ========== TYPING EFFECT ========== */
const words = ["Frontend Developer", "Designer", "Learner"];
let wIndex = 0, cIndex = 0, deleting = false;
function typeLoop() {
  const word = words[wIndex];
  typingEl.textContent = word.slice(0, cIndex);
  if (!deleting) {
    if (cIndex < word.length) { cIndex++; setTimeout(typeLoop, 90); }
    else { deleting = true; setTimeout(typeLoop, 900); }
  } else {
    if (cIndex > 0) { cIndex--; setTimeout(typeLoop, 50); }
    else { deleting = false; wIndex = (wIndex + 1) % words.length; setTimeout(typeLoop, 300); }
  }
}
if (typingEl) typeLoop();

/* ========== SCROLL REVEAL for sections ========== */
function handleScrollReveal() {
  const viewportH = window.innerHeight;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < viewportH - 120) sec.classList.add("active");
    else sec.classList.remove("active");
  });
}
window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

/* ========== NAV LINK HIGHLIGHT based on scroll ========== */
function updateActiveNav() {
  let current = sections[0].id;
  for (const s of sections) {
    const top = s.getBoundingClientRect().top;
    if (top <= 120) current = s.id;
  }
  navLinks.forEach(a => {
    const href = a.getAttribute("href");
    a.classList.toggle("active", href === `#${current}`);
  });
}
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

/* ========== SCROLL TO TOP BUTTON ========== */
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 320 ? "flex" : "none";
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ========== CONTACT FORM (placeholder: integrate EmailJS/Netlify Forms etc.) ========== */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Replace with EmailJS or real backend integration if desired
    alert("Thanks — message received! (This is a placeholder; connect EmailJS for production.)");
    contactForm.reset();
  });
}

/* ========== SMOOTH SCROLL helper used by in-page buttons ========== */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
/* Expose for inline onclick usage */
window.scrollToSection = scrollToSection;

/* ========== Accessibility: close mobile nav on Escape ========== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") navLinksContainer.classList.remove("show");
});

