import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const touchMedia = window.matchMedia('(hover: none)');
    if (touchMedia.matches) {
      setIsTouch(true);
      return;
    }

    const ring = document.querySelector('.cursor-ring');
    const dot = document.querySelector('.cursor-dot');
    if (!ring || !dot) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let animFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      animFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameId = requestAnimationFrame(animateRing);

    const handleMouseEnter = () => ring.classList.add('hovered');
    const handleMouseLeave = () => ring.classList.remove('hovered');

    const updateHoverables = () => {
      const hoverables = document.querySelectorAll('a, button, [data-tilt], input, textarea, .filter-btn, .certificate-card');
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const timeout = setTimeout(updateHoverables, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
      clearTimeout(timeout);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div class="cursor-ring" aria-hidden="true"></div>
      <div class="cursor-dot" aria-hidden="true"></div>
    </>
  );
}
