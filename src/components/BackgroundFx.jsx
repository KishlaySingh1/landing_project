import React, { useEffect, useRef } from 'react';

export default function BackgroundFx() {
  const mouseGlowRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const starCanvasRef = useRef(null);

  useEffect(() => {
    // Mouse movement parallax & mouse glow tracking
    const handleMouseMove = (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;

      const parallaxLayers = document.querySelectorAll('[data-parallax-layer]');
      parallaxLayers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0.2;
        layer.style.transform = `translate(${xPct * depth * 60}px, ${yPct * depth * 60}px)`;
      });

      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = e.clientX + 'px';
        mouseGlowRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Canvas logic
    const particleCanvas = particleCanvasRef.current;
    const starCanvas = starCanvasRef.current;
    if (!particleCanvas || !starCanvas) return;

    const pCtx = particleCanvas.getContext('2d');
    const sCtx = starCanvas.getContext('2d');

    let particles = [];
    let stars = [];
    let animParticleId, animStarId;

    const resizeCanvases = () => {
      const fullHeight = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      [particleCanvas, starCanvas].forEach((c) => {
        c.width = window.innerWidth;
        c.height = fullHeight;
      });
    };

    const initParticles = () => {
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
          color: ['0,245,255', '123,97,255', '0,255,163'][
            Math.floor(Math.random() * 3)
          ],
        });
      }
    };

    const drawParticles = () => {
      pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      particles.forEach((p) => {
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
      animParticleId = requestAnimationFrame(drawParticles);
    };

    const initStars = () => {
      stars = [];
      const count = Math.min(120, Math.floor(window.innerWidth / 14));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          r: Math.random() * 1.2 + 0.3,
          baseOpacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawStars = (time) => {
      sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      stars.forEach((s) => {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.35 + 0.65;
        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(255,255,255,${s.baseOpacity * twinkle})`;
        sCtx.fill();
      });
      animStarId = requestAnimationFrame(drawStars);
    };

    resizeCanvases();
    initParticles();
    initStars();
    drawParticles();
    animStarId = requestAnimationFrame(drawStars);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvases();
        initParticles();
        initStars();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    const heightCheckTimeout = setTimeout(resizeCanvases, 1200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animParticleId);
      cancelAnimationFrame(animStarId);
      clearTimeout(resizeTimeout);
      clearTimeout(heightCheckTimeout);
    };
  }, []);

  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>
      <div className="aurora aurora-3"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="mouse-glow" ref={mouseGlowRef}></div>
      <canvas ref={particleCanvasRef} id="particleCanvas"></canvas>
      <canvas ref={starCanvasRef} id="starCanvas"></canvas>
    </div>
  );
}
