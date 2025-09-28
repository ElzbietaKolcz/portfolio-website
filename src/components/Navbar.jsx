import { useState, useEffect } from "react";
import { Link, scroller } from "react-scroll";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { logo, list, close, listLight, closeLight } from "../assets/index";
import FocusTrap from "focus-trap-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [onDarkSection, setOnDarkSection] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const fetchMenu = async () => {
      const q = query(collection(db, "menu"), orderBy("id"));
      const data = await getDocs(q);

      const filtered = data.docs.map((doc) => {
        const { name, path } = doc.data();
        return {
          id: name,
          name,
          path,
        };
      });

      setMenu(filtered);
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-dark="true"]');
    if (!darkSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setOnDarkSection(anyVisible);
      },
      { threshold: 0.5 },
    );

    darkSections.forEach((section) => observer.observe(section));

    return () => {
      darkSections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (!menu.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.toLowerCase());
          }
        });
      },
      { threshold: 0.5 },
    );

    menu.forEach((menuItem) => {
      const el = document.getElementById(menuItem.name.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menu]);

  const handleMenuClick = (sectionName) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      scroller.scrollTo(sectionName, {
        smooth: true,
        offset: -60,
        duration: 500,
      });
    }, 300);
  };

  return (
    <nav role="navigation">
      <div
        className={`fixed w-full left-0 z-50 backdrop-blur-md ${
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
            href="https://elzbietakolcz.github.io/portfolio-website/"
            className="flex"
            role="button"
            title="Reload the page"
            aria-label="Logo button that refreshes the page"
          >
            <img
              src={logo}
              alt="Ek logo"
              className="h-11"
            />
          </a>

          {/* Menu desktop */}
          <ul
            role="menu"
            className="hidden md:flex md:justify-between md:items-center md:pl-10 xl:pl-24"
          >
            {menu.map((menuItem) => (
              <li
                className="mx-2"
                role="none"
                key={menuItem.id}
              >
                <Link
                  className={`font-Assistant uppercase text-lg transition-colors duration-300 pb-1 ${
                    activeSection === menuItem.name.toLowerCase()
                      ? "border-b-4 border-primary-100 font-semibold text-primary-100"
                      : `${
                          onDarkSection ? "text-orange" : "text-black"
                        } hover:border-b-4 hover:border-primary-100 hover:font-semibold`
                  }`}
                  to={menuItem.name}
                  role="menuitem"
                  title={"Go to " + menuItem.name}
                  aria-label={"Go to " + menuItem.name}
                  spy
                  smooth
                  offset={-60}
                  duration={500}
                  onClick={closeMenu}
                >
                  {menuItem.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden mr-3 cursor-pointer"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={
                isMenuOpen
                  ? onDarkSection
                    ? closeLight
                    : close
                  : onDarkSection
                  ? listLight
                  : list
              }
              alt={isMenuOpen ? "close-icon" : "list-icon"}
              className="w-6 h-6 object-contain block"
            />
          </button>

          {isMenuOpen && (
            <FocusTrap
              focusTrapOptions={{
                escapeDeactivates: true,
                returnFocusOnDeactivate: true,
              }}
            >
              <ul
                role="menu"
                className={`transform transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden fixed h-screen w-1/2 p-5 top-13 right-0 bg-white mt-10`}
              >
                {menu.map((menuItem, index) => (
                  <li
                    key={menuItem.id}
                    className="mb-6 mx-2"
                    role="none"
                  >
                    <Link
                      tabIndex={0}
                      autoFocus={index === 0}
                      className="font-Assistant uppercase text-lg hover:border-b-4 hover:border-primary-100 hover:font-semibold hover:text-primary-100"
                      to={menuItem.name}
                      role="menuitem"
                      title={"Go to " + menuItem.name}
                      aria-label={"Go to " + menuItem.name}
                      spy
                      smooth
                      offset={-60}
                      duration={500}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(menuItem.name);
                      }}
                    >
                      {menuItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </FocusTrap>
          )}
        </div>
      </div>
    </nav>
  );
}
