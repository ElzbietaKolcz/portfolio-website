import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { collection, getDocs } from "firebase/firestore";
import styles from "../style";
import { pdf, behance, gitHub, linkedIn } from "../assets";
import { db } from "../firebase";
import avatarImage from '../assets/images/avatar_fot_Julia_Krzemianowska.webp';

export default function Home() {
  const [cvData, setCvData] = useState([]);
  const [homeData, setHomeData] = useState({
    fullName: {},
    title: {},
    description: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const homeCollectionRef = collection(db, "home");
      const homeSnapshot = await getDocs(homeCollectionRef);

      const home = {};
      homeSnapshot.forEach((doc) => {
        home[doc.id] = doc.data();
      });
      setHomeData(home);
    };

    const fetchCv = async () => {
      const cvCollectionRef = collection(db, "cv");
      const cvSnapshot = await getDocs(cvCollectionRef);
      setCvData(cvSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
    fetchCv();
  }, []);

  return (
    <header role="banner">
      <section
        id="home"
        className={`${styles.flexCenter} flex flex-col md:flex-row`}
      >
        <img
          src={avatarImage}
          alt="A woman in elegant clothes standing with her hands at waist level, smiling gently."
          className="w-1/2 md:w-2/5 pt-28 md:pl-2 mb-2 lg:px-5 lg:mx-10"
          data-aos="zoom-in"
          data-aos-delay="300"
        />

        <div className="flex-1 flex-col md:w-3/5 text-center px-6 pt-2 md:pt-20 md:text-left md:mx-5 xl:mx-10">
          {homeData.fullName?.fullName && (
            <h2
              className="font-light ss:text-[24px] md:text-2xl md:pr-10 mt-4"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              {homeData.fullName.fullName}
            </h2>
          )}

          {homeData.title?.title && (
            <h1
              className="text-5xl md:text-6xl font-medium font-LifeSugarly md:mt-1 ss:text-[24px] md:text-7xl md:pr-10 whitespace-nowrap text-black"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <span className="text-primary-100">{homeData.title.span}</span>{" "}
              {homeData.title.title}
            </h1>
          )}

          {homeData.description?.start && (
            <p
              className={`${styles.paragraph} font-medium max-w-[500px] lg:pb-5 px-5 mt-8 sm:px-10 md:pl-0 md:mt-4 text-left md:max-w-[450px]`}
              data-aos="fade-down"
              data-aos-delay="400"
            >
              {homeData.description.start}
              <span className="text-primary-100 font-bold">
                {" "}
                {homeData.description.span01}
              </span>{" "}
              {homeData.description.first}{" "}
              <span className="text-primary-100 font-bold">
                {homeData.description.span02}
              </span>{" "}
              {homeData.description.second}{" "}
              <span className="text-primary-100 font-bold">
                {homeData.description.span03}
              </span>{" "}
              {homeData.description.end}
            </p>
          )}

          <div
            className={`${styles.flexCenter} pt-6 pb-8 px-2 flex gap-8 grid-cols-2 md:justify-start md:px-0 md:gap-10 xl:py-5`}
            data-aos="fade-down"
            data-aos-delay="400"
            data-aos-once="true"
          >
            {cvData.map((cv) => (
              <a
                id="cv-link"
                tabIndex={0}
                role="link"
                key={cv.id}
                href={cv.href}
                target="_blank"
                className="items-center button btn-primary btn-animation whitespace-nowrap flex"
                rel="noreferrer"
                title="Open Elzbieta Kolcz CV"
                aria-label="Link to Elzbieta Kolcz CV"
              >
                Review CV{" "}
                <img
                  className="pl-2 min-h-[20px] min-w-[20px]"
                  alt="pdf-icon"
                  src={pdf}
                />
              </a>
            ))}

            <Link
              id="projects-link"
              className={`${styles.flexCenter} button btn-secendary btn-animation flex `}
              to="projects"
              role="link"
              tabIndex={0}
              spy
              smooth
              offset={-100}
              duration={500}
              title="Go to projects section"
              aria-label="Navigate to projects section"
            >
              Projects
            </Link>
          </div>

          <div className="items-center justify-center pt-2 pb-16 flex gap-8 md:justify-start xl:py-5">
            <a
              className="icon-animation"
              href="https://www.behance.net/elbietakocz/"
              target="_blank"
              rel="noreferrer"
              id="behance-link"
              role="link"
              tabIndex={0}
              title="Open Elzbieta Kolcz behance profile"
              aria-label="Link to Elzbieta Kolcz behance profile"
              data-aos="zoom-in"
              data-aos-delay="300"
              data-aos-once="true"
            >
              <img src={behance} alt="behance-logo" />
            </a>
            <a
              className="icon-animation"
              href="https://www.github.com/ElzbietaKolcz"
              target="_blank"
              rel="noreferrer"
              id="github-link"
              role="link"
              tabIndex={0}
              title="Open Elzbieta Kolcz GitHub profile"
              aria-label="Link to Elzbieta Kolcz GitHub profile"
              data-aos="zoom-in"
              data-aos-delay="400"
              data-aos-once="true"
            >
              <img src={gitHub} alt="gitHub-logo" />
            </a>
            <a
              className="icon-animation"
              href="https://www.linkedin.com/in/elzbietakolcz/"
              target="_blank"
              rel="noreferrer"
              id="linkedin-link"
              role="link"
              tabIndex={0}
              title="Open Elzbieta Kolcz LinkedIn profile"
              aria-label="Link to Elzbieta Kolcz LinkedIn profile"
              data-aos="zoom-in"
              data-aos-delay="500"
              data-aos-once="true"
            >
              <img src={linkedIn} alt="linkedIn-logo" />
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}
