import React, { useState, useEffect, useRef } from 'react';

const ROLES = [
  'Software Developer',
  'Web Developer',
  'Problem Solver',
  'AI Enthusiast',
  'Fitness Enthusiast',
];

export default function Hero() {
  const [roleText, setRoleText] = useState('');
  const profileRef = useRef(null);

  // Typing effect
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const typeLoop = () => {
      const currentRole = ROLES[roleIndex];

      if (!deleting) {
        charIndex++;
        setRoleText(currentRole.slice(0, charIndex));
        if (charIndex === currentRole.length) {
          deleting = true;
          timeoutId = setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        setRoleText(currentRole.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      timeoutId = setTimeout(typeLoop, deleting ? 35 : 65);
    };

    typeLoop();

    return () => clearTimeout(timeoutId);
  }, []);

  // 3D Tilt for profile
  const handleProfileMouseMove = (e) => {
    const el = profileRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleProfileMouseLeave = () => {
    const el = profileRef.current;
    if (el) {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  // Magnetic button hover
  const handleMagneticMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-content" data-parallax-layer data-depth="0.2">
          <p className="hero-eyebrow reveal" data-reveal="fade-up">Hi, I'm</p>
          <h1 className="hero-name reveal" data-reveal="fade-up" data-delay="100">
            <span className="text-gradient">Kishlay Singh</span>
          </h1>
          <div className="hero-typing reveal" data-reveal="fade-up" data-delay="200">
            <span>{roleText}</span><span className="typing-cursor">|</span>
          </div>
          <p className="hero-intro reveal" data-reveal="fade-up" data-delay="300">
            B.Tech Computer Science Engineering student at JECRC University, building
            impactful digital experiences at the intersection of web development and
            artificial intelligence. Currently seeking Software Development Internship
            opportunities.
          </p>

          <div className="hero-cta-row reveal" data-reveal="fade-up" data-delay="400">
            <button
              className="btn btn-primary"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Get Resume</span>
            </button>
            <a
              href="#contact"
              className="btn btn-outline"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Contact Me</span>
            </a>
          </div>

          <div className="hero-socials reveal" data-reveal="fade-up" data-delay="500">
            <a
              href="https://github.com/KishlaySingh1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-icon"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.78 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kishlay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-icon"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/kxzlay_58"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39A5.86 5.86 0 0 0 .62 4.14c-.3.76-.5 1.64-.56 2.91C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 24 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.39 5.86 5.86 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.39-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
              </svg>
            </a>
            <a
              href="mailto:kishlaysingh073@gmail.com"
              aria-label="Email"
              className="social-icon"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2.3 7.3 5.98a.8.8 0 0 0 1 0l7.3-5.98A.5.5 0 0 0 19.5 5h-15a.5.5 0 0 0-.3.8Z" />
              </svg>
            </a>
            <a
              href="tel:+916205189816"
              aria-label="Phone"
              className="social-icon"
              data-magnetic
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.1 15.1 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual" data-parallax-layer data-depth="0.4">
          <div className="profile-orbit">
            <div className="glow-ring ring-1"></div>
            <div className="glow-ring ring-2"></div>
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div
              className="profile-frame"
              ref={profileRef}
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
            >
              <div className="profile-placeholder">
                <span>KS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll down"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="scroll-cue-dot"></span>
      </a>
    </section>
  );
}
