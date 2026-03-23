import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../constants";

export default function SocialButton({
  icon,
  link,
  text,
  ariaLabel,
  disableDesktopAnimation = false,
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const isDesktop = useMediaQuery({ query: BREAKPOINTS.MD, defaultMatches: false });

  // Jeśli CV i desktop → brak animacji, tekst zawsze widoczny
  const shouldDisableAnimation = disableDesktopAnimation && isDesktop;

  // Styl dynamiczny tylko gdy animacja włączona
  const style = !shouldDisableAnimation && isDesktop
    ? { width: hovered ? ref.current?.offsetWidth || 0 : 0 }
    : {};

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => {
        if (!shouldDisableAnimation) setHovered(true);
      }}
      onMouseLeave={() => {
        if (!shouldDisableAnimation) setHovered(false);
      }}
      onFocus={() => {
        if (!shouldDisableAnimation) setHovered(true);
      }}
      onBlur={() => {
        if (!shouldDisableAnimation) setHovered(false);
      }}
      className="flex items-center rounded-full border-2 border-primary-50 bg-white text-primary-50 font-medium p-1"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <img src={icon} alt="" className="w-6 h-6" />

      <div
        style={style}
        className={`overflow-hidden whitespace-nowrap w-full ${

          !shouldDisableAnimation ? "transition-all duration-300" : ""
        } ${

          shouldDisableAnimation ? "ml-2" : ""
        }`}
      >
        <span className="p-2" ref={ref}>
          {text}
        </span>
      </div>
    </a>
  );
}