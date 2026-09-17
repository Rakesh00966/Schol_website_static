/* =========================================================
   SRIVANI ENGLISH MEDIUM SCHOOL — DEMO WEBSITE
   Vanilla JS interactions. Edit js/config.js for site data —
   this file should not normally need editing.
   ========================================================= */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};

  /* ---------- Populate config-driven content ---------- */
  function applyConfig() {
    const waLink = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.whatsappMessage || "")}`;

    const whatsappCta = document.getElementById("whatsappCta");
    if (whatsappCta) whatsappCta.href = waLink;

    const contactWhatsapp = document.getElementById("contactWhatsapp");
    if (contactWhatsapp) contactWhatsapp.href = waLink;

    const footerWhatsapp = document.getElementById("footerWhatsapp");
    if (footerWhatsapp) footerWhatsapp.href = waLink;

    const contactPhone = document.getElementById("contactPhone");
    if (contactPhone) {
      contactPhone.textContent = cfg.phone || "";
      contactPhone.href = `tel:${(cfg.phone || "").replace(/\s+/g, "")}`;
    }

    const contactEmail = document.getElementById("contactEmail");
    if (contactEmail) {
      contactEmail.textContent = cfg.email || "";
      contactEmail.href = `mailto:${cfg.email || ""}`;
    }

    const mapLink = document.getElementById("mapLink");
    if (mapLink) {
      mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.mapsQuery || cfg.address || "")}`;
    }

    const social = cfg.socialLinks || {};
    const fb = document.getElementById("footerFacebook");
    const ig = document.getElementById("footerInstagram");
    const yt = document.getElementById("footerYoutube");
    if (fb) fb.href = social.facebook || "#";
    if (ig) ig.href = social.instagram || "#";
    if (yt) yt.href = social.youtube || "#";
  }

  /* ---------- Sticky header shadow ---------- */
  function initStickyHeader() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile hamburger menu ---------- */
  function initMobileNav() {
    const btn = document.getElementById("hamburgerBtn");
    const nav = document.getElementById("mainNav");
    if (!btn || !nav) return;

    const closeMenu = () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    };
    const openMenu = () => {
      nav.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
    };

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  function initActiveNav() {
    const links = Array.from(document.querySelectorAll(".nav-link"));
    if (!links.length) return;
    const sections = links
      .map((l) => document.querySelector(l.getAttribute("href")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          links.forEach((l) => l.classList.toggle("active-link", l.getAttribute("href") === id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    const toggle = () => {
      const show = window.scrollY > 480;
      btn.hidden = !show;
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Admission form CTA ---------- */
  function initAdmissionButtons() {
    const url = cfg.admissionFormUrl;
    const buttons = [document.getElementById("admissionFormBtn")].filter(Boolean);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!url || url === "YOUR_GOOGLE_FORM_URL_HERE") {
          alert(
            "Admission form link not configured yet.\n\n" +
              "Add your Google Form URL to SITE_CONFIG.admissionFormUrl in js/config.js."
          );
          return;
        }
        window.open(url, "_blank", "noopener");
      });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  function initLightbox() {
    const grid = document.getElementById("galleryGrid");
    const lightbox = document.getElementById("lightbox");
    if (!grid || !lightbox) return;

    const items = Array.from(grid.querySelectorAll(".gallery-item"));
    const imgEl = document.getElementById("lightboxImg");
    const captionEl = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    let currentIndex = 0;
    let lastFocused = null;

    function show(index) {
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      const img = item.querySelector("img");
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      captionEl.textContent = item.getAttribute("data-caption") || img.alt;
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      lightbox.hidden = false;
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    items.forEach((item, index) => {
      item.addEventListener("click", () => open(index));
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => show(currentIndex - 1));
    nextBtn.addEventListener("click", () => show(currentIndex + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });
  }

  /* ---------- Enquiry form validation + submission ---------- */
  function initEnquiryForm() {
    const form = document.getElementById("enquiryForm");
    if (!form) return;
    const status = document.getElementById("formStatus");

    const validators = {
      parentName: (v) => v.trim().length >= 2 || "Please enter the parent/guardian name.",
      studentName: (v) => v.trim().length >= 2 || "Please enter the student's name.",
      phone: (v) => /^[0-9+\-\s()]{7,15}$/.test(v.trim()) || "Please enter a valid phone number.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email address.",
      classInterested: (v) => v.trim().length > 0 || "Please select a class.",
    };

    function showError(name, message) {
      const el = form.querySelector(`[data-error-for="${name}"]`);
      if (el) el.textContent = message || "";
    }

    function validateField(field) {
      const rule = validators[field.name];
      if (!rule) return true;
      const result = rule(field.value);
      if (result === true) {
        showError(field.name, "");
        return true;
      }
      showError(field.name, result);
      return false;
    }

    Array.from(form.elements).forEach((field) => {
      if (!field.name || !validators[field.name]) return;
      field.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;
      Object.keys(validators).forEach((name) => {
        const field = form.elements[name];
        if (field && !validateField(field)) valid = false;
      });

      if (!valid) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status error";
        return;
      }

      const endpoint = cfg.enquiryFormEndpoint;
      if (!endpoint || endpoint === "YOUR_FORM_ENDPOINT_HERE") {
        status.textContent =
          "Thanks! This demo form isn't connected to a live endpoint yet — see js/config.js to connect Formspree or Google Forms.";
        status.className = "form-status success";
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (res.ok) {
          status.textContent = "Thank you! Your enquiry has been sent.";
          status.className = "form-status success";
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        status.textContent = "Something went wrong. Please try again or contact us on WhatsApp.";
        status.className = "form-status error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    initStickyHeader();
    initMobileNav();
    initActiveNav();
    initScrollReveal();
    initBackToTop();
    initAdmissionButtons();
    initLightbox();
    initEnquiryForm();
  });
})();
