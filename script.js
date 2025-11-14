/**
 * Load partials by [data-include] attribute
 * and initialize interactive features after insertion.
 */
document.addEventListener('DOMContentLoaded', async () => {
  await includePartials();
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
  loopedSlides: 8,
  speed: 5000,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  }
});


/* Tariffs section. Tabs */
const switchButtons = document.querySelectorAll(".switch-btn");
const spotBlock = document.getElementById("spot-tariffs");
const futuresBlock = document.getElementById("futures-tariffs");

switchButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    switchButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.dataset.type === "spot") {
      spotBlock.classList.remove("hidden");
      futuresBlock.classList.add("hidden");
    } else {
      futuresBlock.classList.remove("hidden");
      spotBlock.classList.add("hidden");
    }

  });
});


/* Tariff: dynamic price calculation */
function initTariffPrices() {
  const selects = document.querySelectorAll('.tariff-period');

  selects.forEach(select => {
    const priceWrapper = select.closest('.price');
    const priceEl = priceWrapper.querySelector('.price-value');
    const base = Number(priceEl.dataset.base);

    const updatePrice = () => {
      const months = Number(select.value);
      const monthly = base / 12;
      const newPrice = Math.round(monthly * months);
      priceEl.textContent = `$${newPrice}`;
    };

    updatePrice();

    select.addEventListener('change', updatePrice);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTariffPrices();
});


/* FAQ accordion */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      items.forEach(i => {
        i.classList.remove("active");
        const c = i.querySelector(".faq-answer");
        c.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});

