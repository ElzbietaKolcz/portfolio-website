import React, { useState, useEffect, useRef } from "react";
import { isMobile, isTablet } from "react-device-detect";
import styles from "../style";

/* =========================
   CONFIG CONSTANTS
========================= */

const AUTO_DELAY_MS = 5000;

const SCROLL_OFFSET = {
  MOBILE: 50,
  TABLET: 20,
  DESKTOP: 20,
  LARGE: 60,
};

const LARGE_BREAKPOINT = 1280;

/* =========================
   LOCAL PROJECT DATA
========================= */

export const projects = [
    {
    id: 1,
    title: "MacMeeting event website",
    description:
      "A project focused on creating a clean, informative event page that consolidates all essential details about MacMeeting while providing an intuitive registration process for attendees.",
    imageUrl: "/projects/macmeeting.webp",
    behanceUrl: "https://macmeeting.pl/",
    updated: "March 3, 2026",
  },
  {
    id: 2,
    title: "ZodiaCal - Engineering thesis",
    description:
      "A multifunctional personal calendar designed to enhance time management while incorporating a daily skin care planner for holistic support of users’ routines.",
    imageUrl: "/projects/zodiacal.webp",
    behanceUrl: "https://www.behance.net/gallery/221123967/ZodiaCal-Engineering-thesis",
    updated: "August 9, 2023",
  },
  {
    id: 3,
    title: "Event post for WWDC25 keynote",
    description:
      "A project focused on designing an engaging social media post to promote the joint viewing WWDC25 viewing event hosted by k7 and MacGadka.",
    imageUrl: "/projects/wwdc.webp",
    behanceUrl:
      "https://www.behance.net/gallery/230309835/Event-post-for-WWDC25-keynote",
    updated: "July 14, 2025",
  },
  {
    id: 4,
    title: "MAD logo & stickers",
    description:
      "Logo project for MAD Academic Club at WSB Merito in Wrocław, paired with custom stickers designed to support promotion and encourage student engagement.",
    imageUrl: "/projects/mad.webp",
    behanceUrl: "https://www.behance.net/gallery/193437693/MAD-Logo-LinkedIn-Profile",
    updated: "August 9, 2023",
  },
    {
    id: 5,
    title: "Newsletter & 404 Page",
    description:
      "This UI was created during the recruitment process for a design studio based in Poland.",
    imageUrl: "/projects/newsletter.webp",
    behanceUrl: "https://www.behance.net/gallery/130217645/Newsletter-404-Page?tracking_source=project_owner_other_projects",
    updated: "March 3, 2026",
  },
  {
    id: 6,
    title: "Idź Pan w UI! -  3 projects",
    description:
      "‘Idź Pan w UI!’ is a monthly design challenge created by Natalia Bienias. In its 26th edition, my project was featured and discussed in a video on the By Zebza YouTube channel.",
    imageUrl: "/projects/dashbord.webp",
    behanceUrl: "https://www.behance.net/gallery/134270851/Idz-Pan-w-UI",
    updated: "March 3, 2026",
  },
];



export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);


  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, AUTO_DELAY_MS);

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);



  const getScrollOffset = () => {
    if (isMobile) return SCROLL_OFFSET.MOBILE;
    if (isTablet) return SCROLL_OFFSET.TABLET;
    if (window.innerWidth >= LARGE_BREAKPOINT)
      return SCROLL_OFFSET.LARGE;
    return SCROLL_OFFSET.DESKTOP;
  };

  const scrollToProjectsHeader = () => {
    const offset = getScrollOffset();
    const element = document.getElementById("projects");
    if (!element) return;

    const position =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    scrollToProjectsHeader();
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      className={`${styles.flexCenter}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`${styles.flexCenter} flex-col mb-2`}>
        <h1 className={`${styles.heading1}`}>Projects</h1>

        <div className={`${styles.flexCenter} flex-col`}>
          <div className="flex flex-col mb-2 relative">

            {/* MAIN DISPLAY */}
            <div className="drop-shadow-xl md:flex md:justify-center md:items-center pb-10">
              <div className="relative md:w-1/2 lg:w-80">
                <div style={{ paddingBottom: "100%" }}>
                  <img
                    key={activeProject.id}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg md:rounded-l-lg transition-opacity duration-500"
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                  />
                </div>
              </div>

              <div className="flex flex-col md:justify-between rounded-b-lg bg-zinc-100 p-4 lg:h-80 md:w-1/2 lg:w-96 md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-none">
                <h2 className="text-center m-2 px-2 md:text-left text-2xl font-bold">
                  {activeProject.title}
                </h2>

                <p className={`${styles.paragraph} pb-4 m-2 px-2`}>
                  {activeProject.description}
                </p>

                <div className="pb-4 m-2 px-2 text-center md:text-left">
                  <a
                    className="font-semibold underline hover:no-underline text-primary-100"
                    href={activeProject.behanceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Learn more on Behance
                  </a>
                </div>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="grid grid-cols-2 gap-4 pb-8 md:grid-cols-3 lg:grid-cols-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`cursor-pointer rounded-xl overflow-hidden transition-all ${
                    activeIndex === index
                      ? "border-2 border-orange scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    className="object-cover w-full h-32"
                    src={project.imageUrl}
                    alt={project.title}
                    title={project.title}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}