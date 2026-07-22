/* =================================================================
   KISHLAY SINGH — PORTFOLIO SCRIPT
   Loader, cursor, backgrounds, parallax, tilt, reveal, form, nav
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------
     1. LOADER
  ---------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const barFill = document.getElementById('loaderBarFill');
  const percentText = document.getElementById('loaderPercent');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      barFill.style.width = '100%';
      percentText.textContent = '100%';
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
        // Trigger reveal check once loader is gone
        revealOnScroll();
      }, 350);
    } else {
      barFill.style.width = progress + '%';
      percentText.textContent = Math.floor(progress) + '%';
    }
  }, 140);

  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 2200);

  /* ---------------------------------------------------------------
     2. CUSTOM CURSOR
  ---------------------------------------------------------------- */
  const cursorRing = document.querySelector('.cursor-ring');
  const cursorDot = document.querySelector('.cursor-dot');
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice && cursorRing && cursorDot) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverables = document.querySelectorAll('a, button, [data-tilt], input, textarea');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
  }

  /* ---------------------------------------------------------------
     3. SCROLL PROGRESS BAR
  ---------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }

  /* ---------------------------------------------------------------
     4. NAVBAR — scrolled state + active section highlight
  ---------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }

  function updateActiveSection() {
    let current = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
    updateActiveSection();
    revealOnScroll();
  }, { passive: true });

  updateScrollProgress();
  updateNavbar();
  updateActiveSection();

  /* ---------------------------------------------------------------
     5. MOBILE MENU
  ---------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------------
     6. TYPING ANIMATION (Hero)
  ---------------------------------------------------------------- */
  const typingEl = document.getElementById('typingText');
  const roles = ['Software Developer', 'Web Developer', 'Problem Solver', 'AI Enthusiast', 'Fitness Enthusiast'];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typingEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------------------------------------------------------------
     7. SCROLL REVEAL
  ---------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.88;
    revealEls.forEach(el => {
      if (el.classList.contains('in-view')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('in-view'), delay);
      }
    });
  }
  revealOnScroll();

  /* ---------------------------------------------------------------
     8. COUNT-UP STATISTICS
  ---------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const aboutSection = document.getElementById('about');
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const duration = 1400;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, stepTime);
      });
    }
  }
  window.addEventListener('scroll', startCounters, { passive: true });
  startCounters();

  /* ---------------------------------------------------------------
     9. SKILL PROGRESS BARS
  ---------------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      skillsAnimated = true;
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.progress + '%';
      });
    }
  }
  window.addEventListener('scroll', animateSkillBars, { passive: true });
  animateSkillBars();

  /* ---------------------------------------------------------------
     10. MOUSE PARALLAX (hero layers + background glow)
  ---------------------------------------------------------------- */
  const parallaxLayers = document.querySelectorAll('[data-parallax-layer]');
  const mouseGlow = document.getElementById('mouseGlow');

  window.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth) - 0.5;
    const yPct = (e.clientY / window.innerHeight) - 0.5;

    parallaxLayers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0.2;
      layer.style.transform = `translate(${xPct * depth * 60}px, ${yPct * depth * 60}px)`;
    });

    if (mouseGlow) {
      mouseGlow.style.left = e.clientX + 'px';
      mouseGlow.style.top = e.clientY + 'px';
    }
  });

  /* ---------------------------------------------------------------
     11. 3D TILT EFFECT (cards + profile image)
  ---------------------------------------------------------------- */
  const tiltEls = document.querySelectorAll('[data-tilt], #tiltProfile');

  tiltEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ---------------------------------------------------------------
     12. MAGNETIC BUTTONS
  ---------------------------------------------------------------- */
  const magneticEls = document.querySelectorAll('[data-magnetic]');

  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });

  /* ---------------------------------------------------------------
     13. PROJECT FILTER
  ---------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const tags = card.dataset.tags;
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------------------------------------------------------------
     14. CERTIFICATE LIGHTBOX
  ---------------------------------------------------------------- */
  const certCards = document.querySelectorAll('.certificate-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.certificate-name').textContent;
      lightboxContent.innerHTML = `<p style="padding:0 24px;text-align:center;">${name}<br><span style="font-size:0.8rem;">Certificate preview placeholder</span></p>`;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() { lightbox.classList.remove('open'); }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------------------------------------------------------------
     15. CONTACT FORM VALIDATION
  ---------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function setError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    const group = document.getElementById(fieldId).closest('.form-group');
    errorEl.textContent = message;
    group.classList.toggle('error', !!message);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) { setError('name', 'Please enter your name.'); valid = false; }
    else setError('name', '');

    if (!isValidEmail(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
    else setError('email', '');

    if (subject.length < 3) { setError('subject', 'Please enter a subject.'); valid = false; }
    else setError('subject', '');

    if (message.length < 10) { setError('message', 'Message should be at least 10 characters.'); valid = false; }
    else setError('message', '');

    if (valid) {
      formSuccess.classList.add('show');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }
  });

  /* ---------------------------------------------------------------
     16. BACK TO TOP
  ---------------------------------------------------------------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------------
     17. FOOTER YEAR
  ---------------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------
     18. PARTICLE CANVAS (floating dots)
  ---------------------------------------------------------------- */
  const particleCanvas = document.getElementById('particleCanvas');
  const pCtx = particleCanvas.getContext('2d');
  let particles = [];

  function resizeCanvases() {
    [particleCanvas, starCanvas].forEach(c => {
      c.width = window.innerWidth;
      c.height = document.documentElement.scrollHeight;
    });
  }

  function initParticles() {
    particles = [];
    const count = Math.min(70, Math.floor(window.innerWidth / 22));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        r: Math.random() * 1.8 + 0.5,
        speedY: Math.random() * 0.35 + 0.08,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.15,
        color: ['0,245,255', '123,97,255', '0,255,163'][Math.floor(Math.random() * 3)]
      });
    }
  }

  function drawParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pCtx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      pCtx.fill();

      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = particleCanvas.height + 10;
        p.x = Math.random() * particleCanvas.width;
      }
      if (p.x < -10) p.x = particleCanvas.width + 10;
      if (p.x > particleCanvas.width + 10) p.x = -10;
    });
    requestAnimationFrame(drawParticles);
  }

  /* ---------------------------------------------------------------
     19. STAR CANVAS (twinkling stars)
  ---------------------------------------------------------------- */
  const starCanvas = document.getElementById('starCanvas');
  const sCtx = starCanvas.getContext('2d');
  let stars = [];

  function initStars() {
    stars = [];
    const count = Math.min(120, Math.floor(window.innerWidth / 14));
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        r: Math.random() * 1.2 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars(time) {
    sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(s => {
      const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.35 + 0.65;
      sCtx.beginPath();
      sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      sCtx.fillStyle = `rgba(255,255,255,${s.baseOpacity * twinkle})`;
      sCtx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resizeCanvases();
  initParticles();
  initStars();
  drawParticles();
  requestAnimationFrame(drawStars);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvases();
      initParticles();
      initStars();
    }, 250);
  });

  // Recalculate canvas height after content loads/reveals shift layout
  setTimeout(resizeCanvases, 1200);

});
