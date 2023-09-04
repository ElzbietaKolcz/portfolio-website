import { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

function SocialButton({ icon, link, text }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const styleOnDesktop = isDesktop
    ? { width: hovered ? ref.current?.offsetWidth || 0 : 0 }
    : {};

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        flex items-center rounded-lg border-2 border-primary-50 bg-white 
        text-primary-50 font-medium whitespace-nowrap p-1
      `}
      onClick={() => window.open(link, "_blank")}
    >
      <img
        src={icon}
        alt={text}
      />
      <div
        style={{ ...styleOnDesktop }}
        className="overflow-hidden transition-all duration-300 w-full whitespace-nowrap"
      >
        <span
          className="p-2"
          ref={ref}
        >
          {text}
        </span>
      </div>
    </button>
  );
}

export default SocialButton;
