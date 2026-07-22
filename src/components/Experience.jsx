import React from 'react';

export default function Experience() {
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
    <section className="section" id="experience">
      <div className="section-inner">
        <p className="section-eyebrow reveal" data-reveal="fade-up">Journey So Far</p>
        <h2 className="section-title reveal" data-reveal="fade-up">
          Experience &amp; <span className="text-gradient">Goals</span>
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
              <p className="v-timeline-year">Seeking</p>
              <h3 className="v-timeline-title">Software Development Internship</h3>
              <p className="v-timeline-org">Open to Opportunities</p>
              <p className="v-timeline-desc">
                Actively looking for an internship to apply my web development and problem-solving skills on real-world products, and to learn from experienced engineering teams.
              </p>
            </div>
          </div>

          <div className="v-timeline-item reveal" data-reveal="fade-right" data-delay="150">
            <div className="v-timeline-dot"></div>
            <div
              className="glass-card v-timeline-card"
              data-tilt
              onMouseMove={handleTilt}
              onMouseLeave={handleResetTilt}
            >
              <p className="v-timeline-year">Future Goal</p>
              <h3 className="v-timeline-title">Full-Stack &amp; AI Engineering</h3>
              <p className="v-timeline-org">Long-Term Vision</p>
              <p className="v-timeline-desc">
                Growing into a well-rounded software engineer who builds thoughtful products at the intersection of web platforms and applied AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
