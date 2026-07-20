/* ============================================================
   AfriConnect Summit — JavaScript principal
   Vanilla JS · Dark mode · Animations · Interactivité
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initHamburger();
  initScrollAnimations();
  initBackToTop();
  initDynamicYear();
  initCountdown();
  initStatCounters();
  initProgramTabs();
  initSpeakerFilter();
  initContactForm();
});

/* --- 1. Dark Mode / Light Mode --- */
function initTheme() {
  const toggle = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("africonnect-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("africonnect-theme", next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;
  const icon = toggle.querySelector("i");
  if (icon) {
    icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  }
}

/* --- 2. Navbar dynamique --- */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* --- Menu hamburger mobile --- */
function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".navbar-nav");
  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("open");
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
    });
  });
}

/* --- 3. Animations au scroll (IntersectionObserver) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --- 7. Bouton retour en haut --- */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --- 8. Année dynamique dans le footer --- */
function initDynamicYear() {
  const yearEls = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = year;
  });
}

/* --- Compte à rebours --- */
function initCountdown() {
  const countdownEl = document.querySelector(".countdown");
  if (!countdownEl) return;

  const conferenceDate = new Date("2026-09-15T09:00:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = conferenceDate - now;

    if (diff <= 0) {
      countdownEl.innerHTML = "<p>L'événement a commencé !</p>";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = countdownEl.querySelector("[data-unit='days']");
    const hoursEl = countdownEl.querySelector("[data-unit='hours']");
    const minutesEl = countdownEl.querySelector("[data-unit='minutes']");
    const secondsEl = countdownEl.querySelector("[data-unit='seconds']");

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* --- Compteurs animés (chiffres clés) --- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((el) => animateCounter(el));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) observer.observe(statsSection);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const suffix = el.getAttribute("data-suffix") || "";
  const prefix = el.getAttribute("data-prefix") || "";
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString("fr-FR") + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target.toLocaleString("fr-FR") + suffix;
    }
  }

  requestAnimationFrame(step);
}

/* --- 4. Onglets du programme --- */
function initProgramTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });
}

/* --- 5. Filtrage dynamique des intervenants --- */
function initSpeakerFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const speakerCards = document.querySelectorAll(".speaker-full-card");
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      speakerCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* --- 6. Validation du formulaire de contact --- */
function initContactForm() {
  const form = document.getElementById("registration-form");
  if (!form) return;

  const fields = {
    fullname: {
      validate: (v) => v.trim().length >= 2,
      message: "Le nom doit contenir au moins 2 caractères.",
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: "Veuillez entrer une adresse email valide.",
    },
    phone: {
      validate: (v) => /^\d{8,}$/.test(v.replace(/[\s\-+()]/g, "")),
      message: "Le téléphone doit contenir au moins 8 chiffres.",
    },
    participation: {
      validate: (v) => v !== "",
      message: "Veuillez sélectionner un type de participation.",
    },
    country: {
      validate: (v) => v !== "",
      message: "Veuillez sélectionner votre pays.",
    },
    message: {
      validate: (v) => v.trim().length >= 20,
      message: "Le message doit contenir au moins 20 caractères.",
    },
  };

  Object.keys(fields).forEach((name) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.addEventListener("blur", () => validateField(input, fields[name]));
      input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) {
          validateField(input, fields[name]);
        }
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach((name) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input && !validateField(input, fields[name])) {
        isValid = false;
      }
    });

    if (isValid) {
      const successMsg = document.querySelector(".form-success");
      if (successMsg) successMsg.classList.add("show");
      form.reset();
      Object.keys(fields).forEach((name) => {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) {
          input.classList.remove("valid", "invalid");
        }
      });

      setTimeout(() => {
        if (successMsg) successMsg.classList.remove("show");
      }, 5000);
    }
  });
}

function validateField(input, rule) {
  const errorEl = input.parentElement.querySelector(".error-message");
  const isValid = rule.validate(input.value);

  input.classList.remove("valid", "invalid");
  input.classList.add(isValid ? "valid" : "invalid");

  if (errorEl) {
    errorEl.textContent = isValid ? "" : rule.message;
  }

  return isValid;
}