import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a
          href="#home"
          className="footer-logo"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          KS
        </a>

        <nav className="footer-nav">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('skills');
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('projects');
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Contact
          </a>
        </nav>

        <div className="footer-socials">
          <a
            href="https://github.com/KishlaySingh1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href="https://www.linkedin.com/in/kishlay"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            IN
          </a>
          <a
            href="https://www.instagram.com/kxzlay_58"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>
        </div>

        <button
          className="back-to-top"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          ↑
        </button>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Kishlay Singh. All rights reserved.</p>
        <p>
          Made with <span className="heart">❤</span> by Kishlay Singh
        </p>
      </div>
    </footer>
  );
}
