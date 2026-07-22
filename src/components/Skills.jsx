import React, { useState, useEffect, useRef } from 'react';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    items: [
      { name: 'HTML5', progress: 90, icon: '◆' },
      { name: 'CSS3', progress: 85, icon: '◆' },
      { name: 'JavaScript', progress: 80, icon: '◆' },
    ],
  },
  {
    title: 'Programming',
    items: [
      { name: 'Python', progress: 82, icon: '◇' },
      { name: 'C++', progress: 75, icon: '◇' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', progress: 85, icon: '◈' },
      { name: 'GitHub', progress: 88, icon: '◈' },
    ],
  },
  {
    title: 'Soft Skills',
    items: [
      { name: 'Problem Solving', progress: 88, icon: '✦' },
      { name: 'UI/UX Thinking', progress: 78, icon: '✦' },
    ],
  },
];

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (animated || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        setAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

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
    <section className="section" id="skills" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-eyebrow reveal" data-reveal="fade-up">What I Work With</p>
        <h2 className="section-title reveal" data-reveal="fade-up">
          Skills &amp; <span className="text-gradient">Toolkit</span>
        </h2>

        <div className="skills-categories">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div
              key={cat.title}
              className="skills-category reveal"
              data-reveal="fade-up"
              data-delay={catIdx * 100}
            >
              <h3 className="skills-category-title">{cat.title}</h3>
              <div className="skills-grid">
                {cat.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card skill-card"
                    data-tilt
                    onMouseMove={handleTilt}
                    onMouseLeave={handleResetTilt}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <p className="skill-name">{skill.name}</p>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: animated ? `${skill.progress}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
