import "./styles.css";

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".mobile-nav");

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

const countryImages = {
  uk: {
    src: "https://images.unsplash.com/photo-1707065634977-ad779c889242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveGZvcmQlMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwVUt8ZW58MXx8fHwxNzU4MDE2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Oxford University campus UK",
  },
  usa: {
    src: "https://images.unsplash.com/photo-1733846559897-24709ae35c3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2YXJkJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMFVTQXxlbnwxfHx8fDE3NTgwMTY5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Harvard University campus USA",
  },
  canada: {
    src: "https://images.unsplash.com/photo-1618255630366-f402c45736f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwdG9yb250byUyMGNhbmFkYSUyMGNhbXB1c3xlbnwxfHx8fDE3NTgwMTY5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "University of Toronto campus Canada",
  },
  australia: {
    src: "https://images.unsplash.com/photo-1717656604892-ac50747171c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3lkbmV5JTIwYXVzdHJhbGlhJTIwY2FtcHVzfGVufDF8fHx8MTc1ODAxNjk3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "University of Sydney campus Australia",
  },
  ireland: {
    src: "https://images.unsplash.com/photo-1663942465101-18af0f5e7760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmluaXR5JTIwY29sbGVnZSUyMGR1YmxpbiUyMGlyZWxhbmR8ZW58MXx8fHwxNzU4MDE2OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Trinity College Dublin campus Ireland",
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
    countryImage.src = data.src;
    countryImage.alt = data.alt;
  });
});

const cards = [...document.querySelectorAll(".testimonial-card")];
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let activeIndex = 0;

function showTestimonial(index) {
  if (!cards.length) return;
  activeIndex = (index + cards.length) % cards.length;
  cards.forEach((card, i) => card.classList.toggle("active", i === activeIndex));
}

prevBtn?.addEventListener("click", () => showTestimonial(activeIndex - 1));
nextBtn?.addEventListener("click", () => showTestimonial(activeIndex + 1));
