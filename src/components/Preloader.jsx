// Preloader.jsx
//
// Displays a semi-transparent overlay with the LogoAnimation centered on screen.
// Stays visible until the browser `load` event fires (all images, fonts, etc.
// have finished loading), then immediately fades out.

import { useState, useEffect } from 'react';
import LogoAnimation from './LogoAnimation';

const DELAY_MS = 500;
const FADE_DURATION_MS = 700;

export default function Preloader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    function startFadeOut() {
      const delayTimer = setTimeout(() => {
        setFading(true);
        const removeTimer = setTimeout(() => setGone(true), FADE_DURATION_MS);
        return () => clearTimeout(removeTimer);
      }, DELAY_MS);
      return () => clearTimeout(delayTimer);
    }

    if (document.readyState === 'complete') {
      return startFadeOut();
    }

    window.addEventListener('load', startFadeOut, { once: true });
    return () => window.removeEventListener('load', startFadeOut);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        transition: `opacity ${FADE_DURATION_MS}ms ease-out`,
        opacity: fading ? 0 : 1,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xs pointer-events-none"
    >
      <LogoAnimation />
    </div>
  );
}
