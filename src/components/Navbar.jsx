import { useState, useEffect } from "react";
import { Link, scroller } from "react-scroll";
import { menu as menuData } from "../data/menu";
import { logo } from "../assets/index";
import { FocusTrap } from "focus-trap-react";
import { SCROLL, TIMING, INTERSECTION } from "../constants";
import { t } from "../i18n";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = menuData;
  const [onDarkSection, setOnDarkSection] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-dark="true"]');
    if (!darkSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => setOnDarkSection(entries.some((e) => e.isIntersecting)),
      { threshold: INTERSECTION.THRESHOLD },
    );

    darkSections.forEach((s) => observer.observe(s));
    return () => darkSections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    if (!menu.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveSection(entry.target.id.toLowerCase());
        });
      },
      { threshold: 0, rootMargin: "-10% 0px -85% 0px" },
    );

    menu.forEach((item) => {
      const el = document.getElementById(item.name.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menu]);

  const handleMenuClick = (sectionName) => {
    closeMenu();
    setTimeout(
      () =>
        scroller.scrollTo(sectionName, {
          smooth: true,
          offset: SCROLL.OFFSET_DEFAULT,
          duration: SCROLL.DURATION,
        }),
      TIMING.MENU_CLOSE_DELAY,
    );
  };

  const iconColor = onDarkSection ? "text-orange" : "text-black";
  const activeLinkClass =
    "border-b-4 border-primary-100 font-semibold text-primary-100";
  const inactiveLinkClass = `${onDarkSection ? "text-orange" : "text-black"} hover:border-b-4 hover:border-primary-100 hover:font-semibold`;

  return (
    <nav aria-label={t("nav.ariaLabel")}>
      {/* Backdrop overlay — closes menu on outside click */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Navbar bar */}
      <div
        className={`fixed w-full left-0 z-[60] backdrop-blur-md ${
          onDarkSection ? "brightness-110" : ""
        }`}
      >
        <div
          className="mx-10 my-5 flex justify-between"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {/* Logo */}
          <a
            id="ek-logo"
            href={window.location.pathname}
            className="flex"
            title={t("nav.logo.title")}
            aria-label={t("nav.logo.ariaLabel")}
          >
            <img src={logo} alt="" className="h-11" width="111" height="44" />
          </a>

          {/* Desktop menu */}
          <ul
            aria-label={t("nav.menu.ariaLabel")}
            className="hidden md:flex md:justify-between md:items-center md:pl-10 xl:pl-24"
          >
            {menu.map((item) => (
              <li className="mx-2" key={item.id}>
                <Link
                  className={`font-Assistant uppercase text-lg transition-colors duration-300 pb-1 ${
                    activeSection === item.name.toLowerCase()
                      ? activeLinkClass
                      : inactiveLinkClass
                  }`}
                  to={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  title={t("nav.menu.goTo", { section: item.name })}
                  aria-label={t("nav.menu.goTo", { section: item.name })}
                  aria-current={activeSection === item.name.toLowerCase() ? "true" : undefined}
                  spy
                  smooth
                  offset={SCROLL.OFFSET_DEFAULT}
                  duration={SCROLL.DURATION}
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger → X button */}
          <button
            className={`md:hidden mr-3 flex flex-col justify-center gap-[5px] w-6 h-6 ${iconColor}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t("nav.menu.close") : t("nav.menu.open")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 origin-center ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 origin-center ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — always mounted for exit animation, hidden via transform */}
      <FocusTrap
        active={isMenuOpen}
        focusTrapOptions={{
          escapeDeactivates: true,
          onDeactivate: closeMenu,
          returnFocusOnDeactivate: true,
          allowOutsideClick: true,
        }}
      >
        <div
          id="mobile-menu"
          className={`fixed h-dvh w-1/2 p-5 pt-[88px] top-0 right-0 bg-white z-50 transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          {...(!isMenuOpen && { inert: "" })}
        >
          {/* Close button inside the menu — reliable on mobile touch */}
          <button
            className="absolute top-5 right-5 flex flex-col justify-center gap-[5px] w-6 h-6 text-black"
            onClick={closeMenu}
            aria-label={t("nav.menu.close")}
          >
            <span className="block h-0.5 w-6 bg-current rounded translate-y-[3px] rotate-45 origin-center" />
            <span className="block h-0.5 w-6 bg-current rounded -translate-y-[3px] -rotate-45 origin-center" />
          </button>

          <ul aria-label={t("nav.menu.ariaLabel")}>
            {menu.map((item) => (
              <li key={item.id} className="mb-6 mx-2">
                <Link
                  className={`font-Assistant uppercase text-lg pb-1 ${
                    activeSection === item.name.toLowerCase()
                      ? activeLinkClass
                      : "text-black hover:border-b-4 hover:border-primary-100 hover:font-semibold hover:text-primary-100"
                  }`}
                  to={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  title={t("nav.menu.goTo", { section: item.name })}
                  aria-label={t("nav.menu.goTo", { section: item.name })}
                  aria-current={activeSection === item.name.toLowerCase() ? "true" : undefined}
                  spy
                  smooth
                  offset={SCROLL.OFFSET_DEFAULT}
                  duration={SCROLL.DURATION}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.name);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FocusTrap>
    </nav>
  );
}
