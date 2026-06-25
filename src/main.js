import "./styles.css";

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".mobile-nav");
const header = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

toggle?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

function initPageReady() {
  document.body.classList.add("js");
  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
}

function initHeaderScroll() {
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initScrollReveal() {
  const groups = [
    { selector: ".section-head", variant: "reveal" },
    { selector: ".service-grid article", variant: "reveal", stagger: 70 },
    { selector: ".stats-row > div", variant: "reveal", stagger: 90 },
    { selector: ".country-tabs", variant: "reveal-fade" },
    { selector: ".country-showcase", variant: "reveal-scale" },
    { selector: ".writing-intro", variant: "reveal" },
    { selector: ".writing-grid article", variant: "reveal", stagger: 60 },
    { selector: ".inline-stats > div", variant: "reveal", stagger: 80 },
    { selector: ".testimonial-shell", variant: "reveal" },
    { selector: ".carousel-dots", variant: "reveal-fade" },
    { selector: ".stories-footer", variant: "reveal-fade" },
    { selector: ".contact-copy", variant: "reveal" },
    { selector: ".contact-checklist li", variant: "reveal", stagger: 70 },
    { selector: ".contact-stats > div", variant: "reveal", stagger: 80 },
    { selector: ".footer-grid > div", variant: "reveal", stagger: 70 },
    { selector: ".footer-bottom", variant: "reveal-fade" },
  ];

  const revealElements = [];

  groups.forEach(({ selector, variant, stagger = 0 }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal", variant);
      if (stagger) {
        element.style.setProperty("--reveal-delay", `${index * stagger}ms`);
      }
      revealElements.push(element);
    });
  });

  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual) revealElements.push(heroVisual);

  if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements.forEach((element) => observer.observe(element));
}

function parseStatValue(text) {
  const trimmed = text.trim();
  if (!/^[\d,.]/.test(trimmed) || trimmed.includes("/")) return null;

  const match = trimmed.match(/^([\d,.]+)(.*)$/);
  if (!match) return null;
  return {
    target: Number(match[1].replace(/,/g, "")),
    suffix: match[2],
    decimals: match[1].includes(".") ? 1 : 0,
  };
}

function animateStat(element) {
  const parsed = parseStatValue(element.textContent);
  if (!parsed || Number.isNaN(parsed.target)) return;

  const { target, suffix, decimals } = parsed;
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = target * eased;
    element.textContent = `${decimals ? value.toFixed(decimals) : Math.round(value)}${suffix}`;

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function initStatCounters() {
  const stats = document.querySelectorAll(
    ".hero-stats dt, .stats-row dt, .inline-stats dt, .contact-stats dt",
  );

  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateStat(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  stats.forEach((stat) => observer.observe(stat));
}

const countryImages = {
  uk: {
    src: "https://images.unsplash.com/photo-1707065634977-ad779c889242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveGZvcmQlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwVUt8ZW58MXx8fHwxNzU4MDE2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Oxford University campus, United Kingdom",
  },
  usa: {
    src: "https://images.unsplash.com/photo-1733846559897-24709ae35c3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMFVTQXxlbnwxfHx8fDE3NTgwMTY5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Harvard University campus, United States",
  },
  canada: {
    src: "https://images.unsplash.com/photo-1618255630366-f402c45736f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG9yb250byUyMGNhbmFkYSUyMGNhbXB1c3xlbnwxfHx8fDE3NTgwMTY5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "University of Toronto campus, Canada",
  },
  australia: {
    src: "https://images.unsplash.com/photo-1717656604892-ac50747171c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3lkbmV5JTIwYXVzdHJhbGlhJTIwY2FtcHVzfGVufDF8fHx8MTc1ODAxNjk3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "University of Sydney campus, Australia",
  },
  ireland: {
    src: "https://images.unsplash.com/photo-1663942465101-18af0f5e7760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmluaXR5JTIwY29sbGVnZSUyMGR1YmxpbiUyMGlyZWxhbmR8ZW58MXx8fHwxNzU4MDE2OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Trinity College Dublin campus, Ireland",
  },
  malta: {
    src: "https://images.unsplash.com/photo-1661193488322-7a1cb292b925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbWFsdGElMjBjYW1wdXMlMjBtZWRpdGVycmFuZWFufGVufDF8fHx8MTc1ODAxNjk4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "University of Malta campus",
  },
};

const countryImage = document.querySelector("#country-image");
const countryTabs = document.querySelectorAll(".country-tab");

countryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const country = tab.dataset.country;
    const data = countryImages[country];
    if (!data || !countryImage) return;

    countryTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    if (countryImage.getAttribute("src") === data.src) return;

    countryImage.classList.add("is-fading");

    window.setTimeout(() => {
      let settled = false;

      const settle = () => {
        if (settled) return;
        settled = true;
        countryImage.classList.remove("is-fading");
        countryImage.removeEventListener("load", onLoad);
        countryImage.removeEventListener("error", onError);
        window.clearTimeout(fallbackId);
      };

      const onLoad = () => settle();
      const onError = () => settle();
      const fallbackId = window.setTimeout(settle, 5000);

      countryImage.addEventListener("load", onLoad);
      countryImage.addEventListener("error", onError);
      countryImage.src = data.src;
      countryImage.alt = data.alt;

      if (countryImage.complete) settle();
    }, prefersReducedMotion ? 0 : 180);
  });
});

const cards = [...document.querySelectorAll(".testimonial-card")];
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");
let activeIndex = 0;

function showTestimonial(index) {
  if (!cards.length) return;

  activeIndex = (index + cards.length) % cards.length;
  cards.forEach((card, i) => card.classList.toggle("active", i === activeIndex));
  dotsContainer?.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
    dot.setAttribute("aria-selected", String(i === activeIndex));
  });
}

cards.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = `carousel-dot${index === 0 ? " active" : ""}`;
  dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-selected", String(index === 0));
  dot.addEventListener("click", () => showTestimonial(index));
  dotsContainer?.append(dot);
});

prevBtn?.addEventListener("click", () => showTestimonial(activeIndex - 1));
nextBtn?.addEventListener("click", () => showTestimonial(activeIndex + 1));

const navLinks = [...document.querySelectorAll(".desktop-nav a, .mobile-nav a")].filter(
  (link) => link.getAttribute("href")?.startsWith("#"),
);
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean)
  .sort((a, b) => a.offsetTop - b.offsetTop);

function updateActiveNav() {
  const offset = window.scrollY + 120;
  let current = sections[0];

  for (const section of sections) {
    if (section.offsetTop <= offset) current = section;
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

initPageReady();
initHeaderScroll();
initScrollReveal();
initStatCounters();
