import React, { useState, useEffect } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 18;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = '';
          if (onLoaded) onLoaded();
        }, 350);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, 140);

    const safetyTimeout = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = '';
    };
  }, [onLoaded]);

  return (
    <div className={`loader ${isLoaded ? 'loaded' : ''}`} role="status" aria-label="Loading site">
      <div className="loader-inner">
        <div className="loader-glyph">K</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loader-percent">{progress}%</div>
      </div>
    </div>
  );
}
