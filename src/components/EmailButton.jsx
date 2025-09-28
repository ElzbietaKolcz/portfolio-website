import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function EmailButton({ icon, text, copyText }) {
  const [hovered, setHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Desktop hover
  const handleMouseEnter = () => {
    if (isDesktop) setHovered(true);
  };
  const handleMouseLeave = () => {
    if (isDesktop) setHovered(false);
  };

  // Mobile tap
  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleCopyToClipboard();
    setHovered(true); // pokazuje napis po tapnięciu
    setTimeout(() => setHovered(false), 2000); // schowaj po czasie
  };

  return (
    <button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCopyToClipboard}
      onTouchEnd={handleTouchEnd}
      className="flex items-center rounded-full border-2 border-primary-50 bg-white text-primary-50 font-medium whitespace-nowrap p-1 overflow-hidden h-9"
      aria-label={`Copy email address "${copyText}" to clipboard`}
      title={`Copy email address "${copyText}" to clipboard`}
    >
      <img src={icon} alt="Email icon" className="w-6 h-6" />

      <div
        className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
          (hovered || isCopied || !isDesktop)
            ? "max-w-[500px] ml-2"
            : "max-w-0"
        }`}
      >
        <span
          className={`inline-block p-2 ${
            isCopied ? "animate-pulse text-green-500" : ""
          }`}
        >
          {isCopied ? "Copied to clipboard!" : text}
        </span>
      </div>
    </button>
  );
}
