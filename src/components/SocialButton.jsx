import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../constants";

export default function SocialButton({ icon, link, text, alt, ariaLabel }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const isDesktop = useMediaQuery({ query: BREAKPOINTS.MD });

  const styleOnDesktop = isDesktop
    ? { width: hovered ? ref.current?.offsetWidth || 0 : 0 }
    : {};

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center rounded-full border-2 border-primary-50 bg-white text-primary-50 font-medium p-1"
      onClick={() => window.open(link, "_blank")}
      aria-label={ariaLabel}
      title={ariaLabel}
      tabIndex={0}
      role="link"
      id={alt}
    >
      <img src={icon} alt={alt} className="w-6 h-6" title={ariaLabel} />
      <div
        style={styleOnDesktop}
        className="overflow-hidden transition-all duration-300 w-full whitespace-nowrap"
      >
        <span
          className="p-2"
          ref={ref}
          title={ariaLabel}
          aria-label={ariaLabel}
        >
          {text}
        </span>
      </div>
    </button>
  );
}
