/**
 * Load partials by [data-include] attribute
 * and initialize interactive features after insertion.
 */
document.addEventListener('DOMContentLoaded', async () => {
  await includePartials();
  initSmoothScroll();
  initBurger();
  initModals();
  initForms();
});

async function includePartials() {
  const blocks = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(blocks.map(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      el.outerHTML = await res.text();
    } catch (e) {
      console.error('Include error:', url, e);
    }
  }));
}

 /* Numbers section. Counter animation */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".numbers__value");

  const animateValue = (element, target, duration = 3500) => { // медленнее
  const startTime = performance.now();

  const update = (currentTime) => {
  const progress = Math.min((currentTime - startTime) / duration, 1);

  const eased = 1 - Math.pow(2, -8 * progress);

  const value = Math.floor(eased * target);
  const formatted = value.toLocaleString("ru-RU");

  element.textContent = element.dataset.percent ? formatted + "%" : formatted;

  if (progress < 1) {
  requestAnimationFrame(update);
} else {
  element.classList.remove("animate");
}
};

  element.classList.add("animate");
  requestAnimationFrame(update);
};

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
  if (entry.isIntersecting && !entry.target.classList.contains("counted")) {

  entry.target.classList.add("counted");

  const target = parseInt(entry.target.dataset.target);
  animateValue(entry.target, target);
}
});
}, { threshold: 1 });

  counters.forEach(counter => observer.observe(counter));
});


/* Past Trades section. SWIPER */
const pastSwiper = new Swiper(".pastSwiper", {
  slidesPerView: "auto",
  spaceBetween: 24,
  loop: true,
  loopAdditionalSlides: 24,
  allowTouchMove: false,
  speed: 6000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  }
});



