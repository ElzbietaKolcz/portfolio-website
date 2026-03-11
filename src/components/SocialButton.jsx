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
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center rounded-full border-2 border-primary-50 bg-white text-primary-50 font-medium p-1"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <img src={icon} alt={alt} className="w-6 h-6" />
      <div
        style={styleOnDesktop}
        className="overflow-hidden transition-all duration-300 w-full whitespace-nowrap"
      >
        <span className="p-2" ref={ref}>
          {text}
        </span>
      </div>
    </a>
  );
}
