import React, { useState, useRef } from "react";
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

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        flex items-center rounded-lg border-2 border-primary-50 bg-white 
        text-primary-50 font-medium whitespace-nowrap p-1 
      `}
      onClick={handleCopyToClipboard}
    >
      <img
        src={icon}
        alt={text}
      />
      <div
        style={{ ...styleOnDesktop }}
        className={`
           overflow-hidden transition-all duration-300 w-full whitespace-nowrap 
          ${isCopied ? "animate-pulse text-green-500" : ""}
        `}
      >
        <span
          className={`p-4  ${isCopied ? "px-2" : ""}`}
          ref={ref}
        >
          {isCopied ? "Copied to clipboard!" : text}
        </span>
      </div>
    </button>
  );
}
