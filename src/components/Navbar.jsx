import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { logo, list, close } from "../assets/index";
import styles from "../style";

function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [click, setClick] = useState(false);
  const [menu, setMenuData] = useState([]);

  const sectionRefs = useRef({});

  const handleClick = () => setClick(!click);
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
            currElement.getBoundingClientRect().top,
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

  return (
    <div className="fixed  w-full top-0 left-0 z-50 backdrop-blur-md">
      <nav
        className={`${styles.flexCenter} m-3 flex justify-between items-center navbar  `}
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <a
          href="https://elzbietakolcz.github.io/portfolio-website/"
          className="flex"
        >
          <img
            src={logo}
            alt="logo"
            className="w-[176px] h-[44px] md:ml-3 my-2"
          />
        </a>

        <ul className="hidden md:flex md:justify-between md:items-center  md:px-10 md:py-1 xl:px-24">
          {menu.map((menu) => (
            <li
              className="mt-3 mb-6 py-1 md:my-0 mx-2"
              key={menu.id}
            >
              <Link
                className={`font-Assistant uppercase text-lg py-1 mt-10${
                  activeSection === menu.name
                    ? "border-b-4 border-primary-100 font-semibold text-primary-100"
                    : "hover:border-b-4 hover:border-primary-100 hover:font-semibold hover:text-primary-100"
                }`}
                to={menu.name}
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

        <div
          className="md:hidden mr-3 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleClick}
        >
          {click ? (
            <img
              src={close}
              alt="close-icon"
            />
          ) : (
            <img
              src={list}
              alt="list-icon"
            />
          )}
        </div>

        <ul
          className={`transform transition-transform duration-300 ease-in-out ${
            click ? "translate-x-0" : "translate-x-full"
          } md:hidden fixed h-screen w-1/2 p-5 top-11 right-0 px-4 bg-white mt-10`}
        >
          {menu.map((menu) => (
            <li
              className="mt-3 mb-6 py-1 md:my-0 mx-2"
              key={menu.id}
            >
              <Link
                className={`font-Assistant uppercase text-lg py-1 mt-10${
                  activeSection === menu.name
                    ? "border-b-4 border-primary-100 font-semibold text-primary-100"
                    : "hover:border-b-4 hover:border-primary-100 hover:font-semibold hover:text-primary-100"
                }`}
                to={menu.name}
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
      </nav>
    </div>
  );
}

export default Navbar;
