import React, { useState } from 'react';

const PROJECTS = [
  {
    id: '01',
    title: 'Personal Portfolio Website',
    desc: 'A responsive personal portfolio built to showcase projects, skills, and experience with smooth animations.',
    tags: ['html', 'javascript'],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/KishlaySingh1',
    demo: '#',
  },
  {
    id: '02',
    title: 'AI-Based Utility Tool',
    desc: 'A Python-based automation project exploring practical applications of artificial intelligence concepts.',
    tags: ['python'],
    stack: ['Python'],
    github: 'https://github.com/KishlaySingh1',
    demo: '#',
  },
  {
    id: '03',
    title: 'Interactive Web App',
    desc: 'A dynamic, interactive front-end application built with vanilla JavaScript, focused on smooth UX.',
    tags: ['javascript'],
    stack: ['JavaScript', 'CSS3'],
    github: 'https://github.com/KishlaySingh1',
    demo: '#',
  },
  {
    id: '04',
    title: 'Landing Page Concept',
    desc: 'A pixel-perfect marketing landing page focused on clean structure and semantic markup.',
    tags: ['html'],
    stack: ['HTML5', 'CSS3'],
    github: 'https://github.com/KishlaySingh1',
    demo: '#',
  },
];

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'HTML', value: 'html' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === 'all' || p.tags.includes(activeFilter)
  );

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
    <section className="section" id="projects">
      <div className="section-inner">
        <p className="section-eyebrow reveal" data-reveal="fade-up">Selected Work</p>
        <h2 className="section-title reveal" data-reveal="fade-up">
          Featured <span className="text-gradient">Projects</span>
        </h2>

        <div className="filter-row reveal" data-reveal="fade-up">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-card project-card"
              data-tilt
              onMouseMove={handleTilt}
              onMouseLeave={handleResetTilt}
            >
              <div className="project-image">
                <span>{project.id}</span>
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item} className="stack-chip">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-small"
                  >
                    GitHub
                  </a>
                  <a href={project.demo} className="btn-small btn-small-outline">
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
