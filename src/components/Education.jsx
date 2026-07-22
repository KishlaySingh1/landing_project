import React from 'react';

export default function Education() {
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
    <section className="section" id="education">
      <div className="section-inner">
        <p className="section-eyebrow reveal" data-reveal="fade-up">Academic Path</p>
        <h2 className="section-title reveal" data-reveal="fade-up">
          My <span className="text-gradient">Education</span>
        </h2>

        <div className="v-timeline">
          <div className="v-timeline-item reveal" data-reveal="fade-right">
            <div className="v-timeline-dot"></div>
            <div
              className="glass-card v-timeline-card"
              data-tilt
              onMouseMove={handleTilt}
              onMouseLeave={handleResetTilt}
            >
              <p className="v-timeline-year">Current</p>
              <h3 className="v-timeline-title">B.Tech — Computer Science Engineering</h3>
              <p className="v-timeline-org">JECRC University</p>
              <p className="v-timeline-desc">
                Pursuing a Bachelor's degree in Computer Science Engineering with a focus on software development, web technologies, and artificial intelligence. CGPA: <em>to be updated</em>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
