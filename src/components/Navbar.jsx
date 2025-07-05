import { useState, useEffect, useRef } from "react";
import { Link, scroller } from "react-scroll";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { logo, list, close, listLight, closeLight } from "../assets/index";
import styles from "../style";
import FocusTrap from "focus-trap-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [click, setClick] = useState(false);
  const [menu, setMenuData] = useState([]);
  const sectionRefs = useRef({});
  const firstMenuLinkRef = useRef(null);

  const handleClick = () => {
    setClick((prev) => !prev);
  };
  const closeMenu = () => setClick(false);

  const fetchData = async (collectionRef, setData) => {
    const q = query(collectionRef, orderBy("id"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const menuCollectionRef = collection(db, "menu");
    fetchData(menuCollectionRef, setMenuData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (menu.length > 0) {
        const sections = menu.map((item) => item.name);

        const currentSection = sections.reduce((prev, curr) => {
          const currElement = sectionRefs.current[curr];
          if (!currElement) return prev;
          const currDistance = Math.abs(
            currElement.getBoundingClientRect().top
          );
          const prevElement = sectionRefs.current[prev];
          const prevDistance = prevElement
            ? Math.abs(prevElement.getBoundingClientRect().top)
            : Infinity;

          return currDistance < prevDistance ? curr : prev;
        }, "");

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menu]);

  useEffect(() => {
    setActiveSection("home");
  }, []);

  useEffect(() => {
    sectionRefs.current = menu.reduce((acc, item) => {
      acc[item.name] = document.getElementById(item.name);
      return acc;
    }, {});
  }, [menu]);

  useEffect(() => {
    if (click && firstMenuLinkRef.current) {
      firstMenuLinkRef.current.focus();
    }
  }, [click]);

  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const darkSections = document.querySelectorAll('[data-dark="true"]');

    if (!darkSections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const anyVisible = entries.some((entry) => entry.isIntersecting);
      setOnDarkSection(anyVisible);
    });

    darkSections.forEach((section) => observer.observe(section));

    return () => {
      darkSections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleMenuClick = (sectionName) => {
    setClick(false);
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
        className={`fixed w-full top-0 left-0 z-50 backdrop-blur-md ${onDarkSection ? "brightness-110" : ""
          }`}
      >
        <div
          className={`${styles.flexCenter} m-3 flex justify-between items-center`}
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <a
            id="ek-logo"
            href="https://elzbietakolcz.github.io/portfolio-website/"
            className="flex"
            tabIndex={0}
            role="button"
            title="Reload the page"
            aria-label="Logo button that refreshes the page"
          >
            <img
              src={logo}
              alt="Ek logo"
              className="w-[176px] h-[44px] md:ml-3 my-2"
            />
          </a>

          <ul role="menubar" className="hidden md:flex md:justify-between md:items-center  md:px-10 md:py-1 xl:px-24">
            {menu.map((menu) => (
              <li className="mt-3 mb-6 py-1 md:my-0 mx-2" key={menu.id}>
                <Link
                  className={`font-Assistant uppercase text-lg py-1 mt-10 transition-colors duration-300 ${activeSection === menu.name
                      ? `border-b-4 border-orange font-semibold ${onDarkSection
                        ? "text-orange border-primary-100"
                        : "text-primary-100"
                      }`
                      : `${onDarkSection ? "text-orange border-primary-100" : "text-black"
                      } hover:border-b-4 hover:border-primary-100 hover:font-semibold`
                    }`}
                  to={menu.name}
                  tabIndex={0}
                  role="menuitem"
                  title={"Go to " + menu.name}
                  aria-label={"Go to " + menu.name}
                  href="#"
                  spy
                  smooth
                  offset={-60}
                  duration={500}
                  onClick={closeMenu}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden mr-3 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onTouchStart={handleClick}
            aria-label={click ? "Close menu" : "Open menu"}
          >
            <img
              src={click ? (onDarkSection ? closeLight : close) : (onDarkSection ? listLight : list)}
              alt={click ? "close-icon" : "list-icon"}
              className="w-6 h-6 object-contain block"
            />
          </button>

          {click && (
            <FocusTrap
              focusTrapOptions={{
                clickOutsideDeactivates: false,
                escapeDeactivates: true,
                returnFocusOnDeactivate: true,
                fallbackFocus: () => firstMenuLinkRef.current,
              }}
            >
              <ul
                className={`transform transition-transform duration-300 ease-in-out ${click ? "translate-x-0" : "translate-x-full"
                  } md:hidden fixed h-screen w-1/2 p-5 top-11 right-0 px-4 bg-white mt-10`}
              >
                {menu.map((menu, index) => (
                  <li key={menu.id} className="mt-3 mb-6 py-1 md:my-0 mx-2">
                    <Link
                      tabIndex={0}
                      autoFocus={index === 0}
                      className={`font-Assistant uppercase text-lg py-1 mt-10 ${activeSection === menu.name
                          ? " border-b-4 border-orange font-semibold text-primary-100"
                          : " hover:border-b-4 hover:border-primary-100 hover:font-semibold hover:text-primary-100"
                        }`}
                      to={menu.name}
                      role="menuitem"
                      title={"Go to " + menu.name}
                      aria-label={"Go to " + menu.name}
                      href="#"
                      spy
                      smooth
                      offset={-60}
                      duration={500}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(menu.name);
                      }}
                    >
                      {menu.name}
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
