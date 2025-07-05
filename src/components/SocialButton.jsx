import React, { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function SocialButton({ icon, link, text }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const styleOnDesktop = isDesktop
    ? { width: hovered ? ref.current?.offsetWidth || 0 : 0 }
    : {};

  const altText = text.toLowerCase().includes("cv")
    ? "CV icon"
    : text.toLowerCase().includes("message")
    ? "LinkedIn icon"
    : "Social link icon";

  const ariaText = text.toLowerCase().includes("cv")
    ? "Open CV document in new tab"
    : text.toLowerCase().includes("message")
    ? "Open LinkedIn to send a message"
    : `Open link: ${link}`;

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center rounded-lg border-2 border-primary-50 bg-white text-primary-50 font-medium whitespace-nowrap p-1"
      onClick={() => window.open(link, "_blank")}
      aria-label={ariaText}
      title={ariaText}
      tabIndex={0}
      role="link"
      id={altText}
    >
      <img src={icon} alt={altText} className="w-6 h-6" title={ariaText} />
      <div
        style={styleOnDesktop}
        className="overflow-hidden transition-all duration-300 w-full whitespace-nowrap"
      >
        <span
          className="p-2"
          ref={ref}
          title={ariaText}
          aria-label={ariaText}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
