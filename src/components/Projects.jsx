import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { isMobile, isTablet } from "react-device-detect";
import { db } from "../firebase";
import styles from "../style";

function Projects() {
  const [projects, setProjectsData] = useState([]);

  const fetchData = async (collectionRef, setData) => {
    const q = query(collectionRef, orderBy("id"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    fetchData(projectsCollectionRef, setProjectsData);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const largeImageRef = useRef(null);

  const scrollToProjectsHeader = () => {
    const scrollOffset = getScrollOffset();
    const projectsHeaderElement = document.getElementById("projects");
    if (projectsHeaderElement) {
      const scrollPosition =
        projectsHeaderElement.getBoundingClientRect().top +
        window.scrollY -
        scrollOffset;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const getScrollOffset = () => {
    const screenSizes = {
      mobile: 50,
      tablet: 20,
      desktop: 20,
      large: 60,
    };

    const { mobile, tablet, desktop, large } = screenSizes;

    if (isMobile) {
      return mobile;
    }
    if (isTablet) {
      return tablet;
    }
    if (window.innerWidth >= 1280) {
      return large;
    }
    return desktop;
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    scrollToProjectsHeader();
  };

  return (
    <section
      id="projects"
      className={`${styles.flexCenter}`}
    >
      <div className={`${styles.flexCenter} flex flex-col mb-2`}>
        <h1 className={`${styles.heading1}`}>Projects</h1>
        <div className="flex items-center justify-center flex-col">
          {projects.length > 0 && (
            <div className={`${styles.flexCenter} flex flex-col mb-2 relative`}>
              <div
                className="drop-shadow-xl md:flex md:justify-end pb-10 lg:pb-10"
                ref={largeImageRef}
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <div className="relative md:w-1/2 lg:w-80 bg-center bg-cover aspect-container">
                  <div
                    className=""
                    style={{ paddingBottom: "100%" }}
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg md:rounded-r-none md:rounded-l-24 md:rounded-l-lg lg:rounded-l-lg"
                      src={projects[activeIndex].imageUrl}
                      alt="Large"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:justify-between rounded-b-lg bg-zinc-100 p-4 lg:h-80 md:w-1/2 lg:w-96 md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-none">
                  <h3 className="ss:text-[24px] text-center m-2 px-2 md:text-left md:text-2xl pb-4 mt-2 md:pb-2 font-bold md:flex-shrink flex-grow">
                    {projects[activeIndex].title}
                  </h3>
                  <p
                    className={`${styles.paragraph} pb-4 md:pb-2 m-2 px-2 text-left md:flex-shrink flex-grow`}
                  >
                    {projects[activeIndex].description}
                  </p>
                  <div className="pb-4  m-2 px-2 text-center md:text-left md:flex-shrink flex-grow">
                    <a
                      className="font-semibold underline mobilehover:hover:no-underline relative justify-center text-primary-100 mobilehover:hover:text-primary-50"
                      href={projects[activeIndex].behanceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn more on Behance
                      <span className="underline-animation absolute bottom-0  left-0 right-full h-0.5 rounded-full bg-primary-50 transition-all duration-400 ease-out" />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.flexCenter} grid grid-cols-2 gap-4 pb-8 md:grid-cols-3 lg:grid-cols-6 lg:gap-4`}
              >
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    id={`thumbnail-${index}`}
                    className={`cursor-pointer ${
                      activeIndex === index ? "border-2 border-primary-100" : ""
                    } object-cover bg-center bg-cover h-32 w-42 rounded-xl md:h-44 md:w-52 lg:h-32 lg:w-36`}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleClick(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      className="object-cover w-full h-full rounded-xl"
                      src={project.imageUrl}
                      alt={`Thumbnail ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
