import React, { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import BackgroundFx from './components/BackgroundFx';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Global scroll reveal handler
  useEffect(() => {
    const revealOnScroll = () => {
      const triggerPoint = window.innerHeight * 0.88;
      const revealEls = document.querySelectorAll('.reveal');

      revealEls.forEach((el) => {
        if (el.classList.contains('in-view')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          const delay = el.dataset.delay || 0;
          setTimeout(() => el.classList.add('in-view'), Number(delay));
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    // Initial check
    setTimeout(revealOnScroll, 100);
    setTimeout(revealOnScroll, 500);

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  const handleLoaderLoaded = () => {
    const triggerPoint = window.innerHeight * 0.88;
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('in-view'), Number(delay));
      }
    });
  };

  return (
    <>
      {/* Noise and Grid Overlays */}
      <div className="noise-overlay" aria-hidden="true"></div>
      <div className="grid-overlay" aria-hidden="true"></div>

      {/* Interactive FX Components */}
      <CustomCursor />
      <Loader onLoaded={handleLoaderLoaded} />
      <ScrollProgress />
      <BackgroundFx />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
