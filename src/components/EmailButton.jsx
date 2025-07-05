import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function EmailButton({ icon, text, copyText }) {
  const [hovered, setHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const ref = useRef(null);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const styleOnDesktop = isDesktop
    ? { width: hovered ? ref.current?.offsetWidth || 0 : 0 }
    : {};

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Na mobile nie ustawiamy hover na false, żeby napis był widoczny po tapnięciu
  const handleTouchStart = (e) => {
    e.preventDefault(); // zapobiega podwójnemu wywołaniu onClick i onTouchStart
    handleCopyToClipboard();
  };

  // Dla desktopa zachowujemy normalne hover
  const handleMouseEnter = () => {
    if (isDesktop) setHovered(true);
  };
  const handleMouseLeave = () => {
    if (isDesktop) setHovered(false);
  };

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCopyToClipboard}
      onTouchEnd={handleTouchStart}
      className="flex items-center rounded-lg border-2 border-primary-50 bg-white text-primary-50 font-medium whitespace-nowrap p-1"
      aria-label={`Copy email address "${copyText}" to clipboard`}
      title={`Copy email address "${copyText}" to clipboard`}
      tabIndex={0}
      role="button"
      id="email-icon"
    >
      <img src={icon} alt="Email icon" className="w-6 h-6" />
      <div
        style={styleOnDesktop}
        className={`overflow-hidden transition-all duration-300 w-full whitespace-nowrap ${isCopied ? "animate-pulse text-green-500" : ""
          }`}
      >
        <span className={`p-4 ${isCopied ? "px-2" : ""}`} ref={ref}>
          {isCopied ? "Copied to clipboard!" : text}
        </span>
      </div>
    </button>
  );
}
