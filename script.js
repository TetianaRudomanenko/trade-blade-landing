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