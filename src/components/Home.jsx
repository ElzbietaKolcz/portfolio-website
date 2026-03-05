import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { collection, getDocs } from "firebase/firestore";
import styles from "../style";
import { db } from "../firebase";
const avatarImage = '/images/avatar_fot_Julia_Krzemianowska.webp';

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
        className={`${styles.flexCenter} flex-col md:flex-row`}
      >
        <img
          src={avatarImage}
          alt="A woman in elegant clothes standing with her hands at waist level, smiling gently."
          className="w-1/2 md:w-2/5 pt-28 md:pl-2 lg:px-5 lg:mx-10"
          data-aos="zoom-in"
          data-aos-delay="300"
        />

        <div className="flex-1 flex-col md:w-3/5 text-center px-6 md:pt-20 md:text-left md:mx-5 xl:mx-10">
           {homeData.title?.title && (
            <h1
              className={`${styles.heading1}`}
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <span className="text-primary-100">{homeData.title.span}</span>{" "}
              {homeData.title.title}
            </h1>
          )}

          {homeData.fullName?.fullName && (
            <h2
              className="${styles.heading2}"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              {homeData.fullName.fullName}
            </h2>
          )}
          
          {homeData.description?.start && (
            <p
              className={`${styles.paragraph} font-medium max-w-[500px] lg:pb-5 px-5 my-3 sm:px-10 md:pl-0 md:mt-4 text-left md:max-w-[450px]`}
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
            className={`${styles.flexCenter} gap-8 pt-6 pb-8 px-2 md:justify-start md:px-0 md:gap-10 xl:py-5`}
            data-aos="fade-down"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <Link
              id="projects-link-cta"
              className="flex items-center button btn-primary btn-animation whitespace-nowrap"
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

            <Link
              id="contact-link"
              className={`${styles.flexCenter} button rounded btn-secondary btn-animation`}
              to="contact"
              role="link"
              tabIndex={0}
              spy
              smooth
              offset={-100}
              duration={500}
              title="Go to contact section"
              aria-label="Navigate to contact section"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
}
