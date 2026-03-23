// Preloader.jsx
//
// Displays a semi-transparent overlay with the LogoAnimation centered on screen.
// Stays visible until the browser `load` event fires (all images, fonts, etc.
// have finished loading), then immediately fades out.

import { useState, useEffect } from 'react';
import LogoAnimation from './LogoAnimation';

const DELAY_MS = 200;
const FADE_DURATION_MS = 500;
const MAX_WAIT_MS = 1500;

export default function Preloader() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let delayTimer;
    let removeTimer;

    function startFadeOut() {
      delayTimer = setTimeout(() => {
        setFading(true);
        removeTimer = setTimeout(() => setGone(true), FADE_DURATION_MS);
      }, DELAY_MS);
    }

    // Start on DOMContentLoaded (or immediately if already ready)
    // with a hard cap of MAX_WAIT_MS so LCP is never blocked
    const maxTimer = setTimeout(startFadeOut, MAX_WAIT_MS);

    if (document.readyState !== 'loading') {
      clearTimeout(maxTimer);
      startFadeOut();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        clearTimeout(maxTimer);
        startFadeOut();
      }, { once: true });
    }

    return () => {
      clearTimeout(maxTimer);
      clearTimeout(delayTimer);
      clearTimeout(removeTimer);
    };
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
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <LogoAnimation />
    </div>
  );
}
