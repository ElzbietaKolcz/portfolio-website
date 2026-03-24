export function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.aosDelay ? parseInt(el.dataset.aosDelay, 10) : 0;
          setTimeout(() => el.classList.add('aos-animate'), delay);
          scrollObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  function observeElement(el) {
    if (prefersReduced || isMobile) {
      el.classList.add('aos-animate');
    } else {
      scrollObserver.observe(el);
    }
  }

  document.querySelectorAll('[data-aos]').forEach(observeElement);

  // Observe data-aos elements added later by lazy-loaded components
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.hasAttribute('data-aos')) observeElement(node);
        node.querySelectorAll('[data-aos]').forEach(observeElement);
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}