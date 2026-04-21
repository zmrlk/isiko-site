/* ═══════════════════════════════════════════════════════════════════
   isiko.pl · main.js v3 · 8 slides, new logo order, no mouse tracking
   ═══════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const hasGSAP = typeof gsap !== 'undefined';

  // ════════════════════════════════════════════════════
  // 1 · LOGO DRAWING ANIMATION · NEW ORDER (Karol's spec)
  //    1. White ring draws (from 12 o'clock, rotating)
  //    2. Arc draws underneath (left → right)
  //    3. Sage disc pops in the middle
  //    4. "isiko" written letter by letter
  // ════════════════════════════════════════════════════
  const logoRing = $('#logo-ring');
  const logoArc  = $('#logo-arc');
  const logoDisc = $('#logo-disc');
  const letters  = $$('#logo-word .letter');
  const heroLogoWrap = $('#hero-logo-wrap');

  if (logoDisc) logoDisc.setAttribute('r', '0');

  const heroTL = hasGSAP ? gsap.timeline({ defaults: { ease: 'expo.out' }}) : null;

  if (heroTL) {
    // 1 · Ring draws (900ms)
    heroTL.to(logoRing, {
      attr: { 'stroke-dashoffset': 0 },
      duration: 1.1,
      ease: 'power2.inOut'
    }, 0.3);

    // 2 · Arc draws L→R (600ms)
    heroTL.to(logoArc, {
      attr: { 'stroke-dashoffset': 0 },
      duration: 0.75,
      ease: 'power2.inOut'
    }, 1.2);

    // 3 · Sage disc pops (back.out bounce)
    heroTL.to(logoDisc, {
      attr: { r: 105 },
      duration: 0.7,
      ease: 'back.out(1.5)'
    }, 1.85);

    // 4 · Letters i-s-i-k-o cascade (stagger 110ms per letter)
    heroTL.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.11,
      ease: 'power2.out',
      from: { opacity: 0, y: 8 }
    }, 2.55);

    // 5 · Hero left content reveals in parallel with wordmark finish
    heroTL.to('.eyebrow-pill', {
      opacity: 1,
      duration: 0.5
    }, 2.7);

    heroTL.to('.hero-headline .line', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.14
    }, 2.85);

    heroTL.to('.hero-sub', { opacity: 1, duration: 0.55 }, 3.3);
    heroTL.to('.hero-cta', { opacity: 1, duration: 0.5 }, 3.5);
    heroTL.to('.hero-meta', { opacity: 1, duration: 0.5 }, 3.7);

    // 6 · Chrome reveals
    heroTL.add(() => {
      $('.top-mark')?.classList.add('visible');
      $('.top-actions')?.classList.add('visible');
      $('.dots')?.classList.add('visible');
      $('#hint')?.classList.add('visible');
    }, 3.6);

    // 7 · Logo starts breathing after settle
    heroTL.add(() => {
      heroLogoWrap?.classList.add('idle-pulse');
    }, 4.5);
  }

  if (prefersReducedMotion && heroTL) {
    heroTL.progress(1).pause();
  }

  // Fallback for no-GSAP: show everything
  if (!hasGSAP) {
    $$('.hero-headline .line, .hero-sub, .hero-cta, .hero-meta, .eyebrow-pill')
      .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    letters.forEach(l => { l.style.opacity = '1'; });
    if (logoDisc) logoDisc.setAttribute('r', '105');
    if (logoRing) logoRing.setAttribute('stroke-dashoffset', '0');
    if (logoArc)  logoArc.setAttribute('stroke-dashoffset', '0');
    $('.top-mark')?.classList.add('visible');
    $('.top-actions')?.classList.add('visible');
    $('.dots')?.classList.add('visible');
    $('#hint')?.classList.add('visible');
  }

  // ════════════════════════════════════════════════════
  // 2 · SLIDE NAVIGATION (vertical scroll)
  // ════════════════════════════════════════════════════
  const slidesWrap = $('#slides');
  const slides = $$('.slide', slidesWrap);
  const dots = $$('.dot');
  const progressBar = $('#progress-bar');
  const hint = $('#hint');
  let currentSlide = 0;

  const goToSlide = (i, smooth = true) => {
    i = clamp(i, 0, slides.length - 1);
    slides[i]?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start'
    });
  };

  const updateActive = () => {
    const viewportMid = window.scrollY + window.innerHeight / 2;
    let nearest = 0;
    let minDist = Infinity;
    slides.forEach((s, i) => {
      const mid = s.offsetTop + s.offsetHeight / 2;
      const d = Math.abs(mid - viewportMid);
      if (d < minDist) { minDist = d; nearest = i; }
    });
    const idx = nearest;
    if (idx !== currentSlide) {
      currentSlide = idx;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      if (idx > 0) hint?.classList.add('hidden');
    }
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = (window.scrollY / Math.max(docHeight, 1)) * 100;
      progressBar.style.width = `${clamp(p, 0, 100)}%`;
    }
  };

  dots[0]?.classList.add('active');
  window.addEventListener('scroll', updateActive, { passive: true });
  window.addEventListener('resize', updateActive);

  // Click handlers (dots + [data-slide-to])
  $$('[data-slide-to]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const i = parseInt(el.dataset.slideTo, 10);
      goToSlide(i);
    });
  });

  // ════════════════════════════════════════════════════
  // 3 · KEYBOARD NAV (arrows ↑↓, PageUp/Dn, Home/End, 1-8)
  // ════════════════════════════════════════════════════
  window.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        goToSlide(currentSlide + 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        goToSlide(currentSlide - 1);
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(slides.length - 1);
        break;
    }
    if (/^[1-8]$/.test(e.key)) {
      const i = parseInt(e.key, 10) - 1;
      if (i < slides.length) goToSlide(i);
    }
  });

  // ════════════════════════════════════════════════════
  // 5 · CTO SECTION · reveal on enter
  // ════════════════════════════════════════════════════
  const ctoSlide = $('.slide-cto');
  if (ctoSlide && 'IntersectionObserver' in window) {
    let shown = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !shown) {
          shown = true;
          const lines = $$('[data-cto-line]', ctoSlide);
          if (hasGSAP && !prefersReducedMotion) {
            gsap.to(lines, {
              opacity: 1, y: 0, duration: 0.7,
              stagger: 0.12, ease: 'expo.out'
            });
          } else {
            lines.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
          }
        }
      });
    }, { threshold: 0.4, root: isMobile ? null : slidesWrap });
    io.observe(ctoSlide);
  }

  // ════════════════════════════════════════════════════
  // 6 · KONTAKT · reveal on enter
  // ════════════════════════════════════════════════════
  const kontaktSlide = $('.slide-kontakt');
  if (kontaktSlide && 'IntersectionObserver' in window) {
    let shown = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !shown) {
          shown = true;
          const lines = $$('[data-kontakt-line]', kontaktSlide);
          if (hasGSAP && !prefersReducedMotion) {
            gsap.to('.kontakt-hero .line', {
              opacity: 1, y: 0, duration: 0.8,
              stagger: 0.14, ease: 'expo.out'
            });
            gsap.to('.kontakt-sub',  { opacity: 1, duration: 0.6, delay: 0.3 });
            gsap.to('.kontakt-cta',  { opacity: 1, duration: 0.5, delay: 0.5 });
            gsap.to('.kontakt-form', { opacity: 1, duration: 0.5, delay: 0.7 });
            gsap.to('.kontakt-meta', { opacity: 1, duration: 0.5, delay: 0.9 });
          } else {
            lines.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
            $$('.kontakt-hero .line, .kontakt-sub, .kontakt-cta, .kontakt-form, .kontakt-meta')
              .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
          }
        }
      });
    }, { threshold: 0.4, root: isMobile ? null : slidesWrap });
    io.observe(kontaktSlide);
  }

  // ════════════════════════════════════════════════════
  // 7 · HIDE HINT after first scroll
  // ════════════════════════════════════════════════════
  let hintHidden = false;
  window.addEventListener('scroll', () => {
    if (!hintHidden && window.scrollY > 120) {
      hintHidden = true;
      hint?.classList.add('hidden');
    }
  }, { passive: true });

  // ════════════════════════════════════════════════════
  // 8 · EASTER EGG · Konami code
  // ════════════════════════════════════════════════════
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key.toLowerCase() === konami[konamiIdx].toLowerCase() || key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        triggerKonami();
      }
    } else {
      konamiIdx = 0;
    }
  });

  const triggerKonami = () => {
    console.log('%c found it. ', 'background:#C7F05A;color:#0A0A0A;font-weight:700;padding:4px 10px;border-radius:3px');
    for (let i = 0; i < 40; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:fixed;width:8px;height:8px;border-radius:50%;
        background:${Math.random() > 0.5 ? '#C7F05A' : '#FFD84D'};
        left:50%;top:50%;z-index:1000;pointer-events:none;
      `;
      document.body.appendChild(dot);
      if (hasGSAP) {
        gsap.to(dot, {
          x: (Math.random() - 0.5) * 1000,
          y: (Math.random() - 0.5) * 700,
          opacity: 0,
          duration: 1.2 + Math.random() * 1,
          ease: 'power2.out',
          onComplete: () => dot.remove()
        });
      } else {
        setTimeout(() => dot.remove(), 2000);
      }
    }
  };

  // ════════════════════════════════════════════════════
  // 9 · KONTAKT FORM · open mailto with filled body
  // ════════════════════════════════════════════════════
  const kform = $('#kontakt-form');

  const showFormMsg = (text, type) => {
    const existing = kform?.querySelector('.kf-success, .kf-error');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.className = type === 'error' ? 'kf-error' : 'kf-success';
    div.textContent = text;
    kform?.appendChild(div);
    if (hasGSAP) {
      gsap.fromTo(div, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 });
    }
    setTimeout(() => { div.remove(); }, 6000);
  };

  if (kform) {
    kform.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name  = $('#kf-name')?.value.trim()  || '';
      const email = $('#kf-email')?.value.trim() || '';
      const msg   = $('#kf-boli')?.value.trim()  || '';

      if (!name || !email || !msg) {
        showFormMsg('Wypełnij imię, email i co Cię boli.', 'error');
        return;
      }

      const submitBtn = kform.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'wysyłam...';
      }

      try {
        const formData = new FormData(kform);
        // Fallback: jeśli token nie wklejony, użyj mailto
        const token = formData.get('access_key');
        if (!token || token === 'WEB3FORMS_ACCESS_KEY') {
          // Fallback: mailto
          const subject = `isiko · ${name}`;
          const body = [
            `Od: ${name}`,
            `Email: ${email}`,
            (formData.get('phone') ? `Telefon: ${formData.get('phone')}` : null),
            '',
            '— Co boli:',
            msg,
            '',
            '—',
            'wysłane z isiko.pl (fallback mailto)'
          ].filter(Boolean).join('\n');
          window.location.href = `mailto:karol@isiko.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          showFormMsg('otwieramy pocztę — wyślij maila. Odpowiemy w 24h.', 'success');
          return;
        }

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        const data = await response.json();

        if (data.success) {
          kform.reset();
          showFormMsg('✓ wysłane. Odpowiemy w 24h.', 'success');
        } else {
          throw new Error(data.message || 'Błąd wysyłki');
        }
      } catch (err) {
        console.error('[form]', err);
        showFormMsg('Coś nie zadziałało. Napisz bezpośrednio na karol@isiko.pl', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'wyślij →';
        }
      }
    });
  }

  // ════════════════════════════════════════════════════
  // 10 · LOGO 5× CLICK · lang cycle
  // ════════════════════════════════════════════════════
  const logoFull = $('#hero-logo');
  if (logoFull) {
    const langs = [
      'kultura w języku zulu',
      'culture in zulu',
      'cultura en zulú'
    ];
    let clicks = 0;
    let langIdx = 0;
    let clickTimer = null;

    logoFull.style.cursor = 'pointer';
    logoFull.addEventListener('click', () => {
      clicks++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clicks = 0; }, 600);
      if (clicks >= 5) {
        clicks = 0;
        langIdx = (langIdx + 1) % langs.length;
        const metaFirst = $('.hero-meta span:first-child');
        if (metaFirst) metaFirst.textContent = `isiko · ${langs[langIdx]}`;
        if (hasGSAP) {
          gsap.fromTo(logoFull,
            { rotation: 0 },
            { rotation: 360, duration: 1, ease: 'power2.inOut', transformOrigin: 'center' }
          );
        }
      }
    });
  }

  // ════════════════════════════════════════════════════
  // 11 · COOKIES BANNER · minimal RODO
  // ════════════════════════════════════════════════════
  const cookiesEl = $('#cookies');
  const cookiesBtn = $('#cookies-accept');
  const COOKIE_KEY = 'isiko-cookies-ok';

  if (cookiesEl) {
    const accepted = (() => { try { return localStorage.getItem(COOKIE_KEY) === '1'; } catch (e) { return false; }})();
    if (!accepted) {
      cookiesEl.hidden = false;
      setTimeout(() => cookiesEl.classList.add('visible'), 1400);
    }
    cookiesBtn?.addEventListener('click', () => {
      try { localStorage.setItem(COOKIE_KEY, '1'); } catch (e) {}
      cookiesEl.classList.remove('visible');
      setTimeout(() => { cookiesEl.hidden = true; }, 400);
    });
  }

  // ════════════════════════════════════════════════════
  // READY
  // ════════════════════════════════════════════════════
  console.log('%c isiko ', 'background:#C7F05A;color:#0A0A0A;font-weight:700;padding:6px 12px;border-radius:3px;font-family:monospace', 'kultura w języku zulu · ←→ nav · 1-8 jump · konami ↑↑↓↓←→←→ba · click logo 5×');

})();
