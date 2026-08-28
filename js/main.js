// ============================================================
// SNIFFR landing page — scroll reveal + light interactivity
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll-triggered reveal animations ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .hero-sequence');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ---- Mobile nav toggle ----
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
    mobileNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
      })
    );
  }

  // ---- Header shadow on scroll ----
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.style.boxShadow = '0 8px 24px -18px rgba(69,63,65,0.35)';
    else header.style.boxShadow = 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Smooth in-page anchor scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---- Touch/press feedback for cards (visible glow + pop on press) ----
  // Layered for reliability: CSS :active is a zero-JS fallback that always
  // fires; these listeners add pointer AND mouse/touch events on top so the
  // highlight also lingers briefly after release, across every input type.
  document.querySelectorAll('.benefit-card, .m-card').forEach((card) => {
    let releaseTimer;
    const press = () => {
      clearTimeout(releaseTimer);
      card.classList.add('is-pressed');
    };
    const release = () => {
      releaseTimer = setTimeout(() => card.classList.remove('is-pressed'), 420);
    };
    card.addEventListener('pointerdown', press);
    card.addEventListener('pointerup', release);
    card.addEventListener('pointerleave', release);
    card.addEventListener('pointercancel', release);
    // Fallback layer in case Pointer Events aren't supported/forwarded
    card.addEventListener('mousedown', press);
    card.addEventListener('mouseup', release);
    card.addEventListener('mouseleave', release);
    card.addEventListener('touchstart', press, { passive: true });
    card.addEventListener('touchend', release, { passive: true });
    card.addEventListener('touchcancel', release, { passive: true });
  });

  // ---- Simba card: neon highlight on touch + click-to-open lightbox ----
  const simbaCard = document.querySelector('.simba-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');

  if (simbaCard && lightbox && lightboxClose) {
    const openLightbox = () => {
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    simbaCard.addEventListener('click', openLightbox);
    let simbaReleaseTimer;
    const simbaPress = () => {
      clearTimeout(simbaReleaseTimer);
      simbaCard.classList.add('is-touched');
    };
    const simbaRelease = () => {
      simbaReleaseTimer = setTimeout(() => simbaCard.classList.remove('is-touched'), 450);
    };
    simbaCard.addEventListener('pointerdown', simbaPress);
    simbaCard.addEventListener('pointerup', simbaRelease);
    simbaCard.addEventListener('pointerleave', simbaRelease);
    simbaCard.addEventListener('pointercancel', simbaRelease);

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});
