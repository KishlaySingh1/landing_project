import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { count: 12, label: 'Projects Built', suffix: '+' },
  { count: 20, label: 'GitHub Repositories', suffix: '+' },
  { count: 800, label: 'Coding Hours', suffix: '+' },
  { count: 90, label: 'Gym Consistency', suffix: '%' },
];

export default function About() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const sectionRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (startedRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        startedRef.current = true;

        STATS.forEach((stat, idx) => {
          const duration = 1400;
          const stepTime = 16;
          const steps = duration / stepTime;
          const increment = stat.count / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.count) {
              current = stat.count;
              clearInterval(timer);
            }
            setCounts((prev) => {
              const updated = [...prev];
              updated[idx] = Math.floor(current);
              return updated;
            });
          }, stepTime);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleResetTilt = (e) => {
    e.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-eyebrow reveal" data-reveal="fade-up">About Me</p>
        <h2 className="section-title reveal" data-reveal="fade-up">
          Turning ideas into <span className="text-gradient">interfaces</span>
        </h2>

        <div className="about-grid">
          <div
            className="glass-card about-card reveal"
            data-reveal="fade-right"
            data-tilt
            onMouseMove={handleTilt}
            onMouseLeave={handleResetTilt}
          >
            <p className="about-text">
              I'm a Computer Science Engineering student at JECRC University with a deep
              curiosity for how software shapes everyday experiences. My focus lives at the
              crossroads of <strong>Web Development</strong> and <strong>Artificial Intelligence</strong> —
              I enjoy building things that are fast, thoughtful, and a little bit delightful.
            </p>
            <p className="about-text">
              Outside of code, you'll find me in the gym working on discipline as much as
              strength, reading tech blogs to stay sharp, and experimenting with new
              frameworks and tools just to see how they tick. I'm currently on the lookout
              for a <strong>Software Development Internship</strong> where I can learn fast
              and contribute meaningfully.
            </p>

            <div className="about-timeline">
              <div className="timeline-row">
                <span className="timeline-dot"></span>
                <div>
                  <p className="timeline-title">Career Objective</p>
                  <p className="timeline-desc">
                    Aspiring Software Developer passionate about Web Development, AI, and building impactful digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats reveal" data-reveal="fade-left">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card stat-card"
                data-tilt
                onMouseMove={handleTilt}
                onMouseLeave={handleResetTilt}
              >
                <span className="stat-number">{counts[i]}</span>
                <span className="stat-plus">{stat.suffix}</span>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
