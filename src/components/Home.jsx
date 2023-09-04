import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import styles from "../style";
import { pdf, behance, gitHub, linkedIn } from "../assets";
import { db } from "../firebase";

function Home() {
  const [cvData, setCvData] = useState([]);

  const fetchData = async (collectionRef, setData) => {
    const q = query(collectionRef, orderBy("id"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const cvCollectionRef = collection(db, "cv");
    fetchData(cvCollectionRef, setCvData);
  }, []);

  return (
    <section
      id="home"
      className={`${styles.flexCenter} flex flex-col md:flex-row`}
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/images%2Favatar_fot_Julia_Krzemianowska.png?alt=media&token=8d938bb1-68cf-458a-9ad2-8b5a3f66df2d"
        alt="avatar-circle"
        className=" w-1/2 md:w-2/5 pt-28 md:pl-2 mb-2 lg:px-5 lg:mx-10 "
        data-aos="zoom-in"
        data-aos-delay="300"
      />

      <div className="flex-1 flex-col md:w-3/5 text-center px-6 pt-2 md:pt-20 md:text-left md:mx-5 xl:mx-10">
        <h3
          className="font-light ss:text-[24px] md:text-2xl md:pr-10 mt-4"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          Elżbieta Kołcz
        </h3>

        <h1
          className=" text-5xl md:text-6xl font-medium font-LifeSugarly md:mt-1 ss:text-[24px] md:text-7xl md:pr-10 whitespace-nowrap text-black"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <span className="text-primary-100">UI</span> Designer
        </h1>

        <p
          className={`${styles.paragraph}  max-w-[500px] lg:pb-5 px-5 mt-8 sm:px-10 md:pl-0 md:mt-4 text-left  md:max-w-[450px] `}
          data-aos="fade-down"
          data-aos-delay="400"
        >
          I design{" "}
          <span className="text-primary-100 font-medium">
            {" "}
            responsive websites
          </span>{" "}
          that are easy to use and provide users with an excellent browsing
          experience. My portfolio includes website designs with a particular
          emphasis on{" "}
          <span className="text-primary-100 font-medium">mobile</span> versions.
        </p>

        <div
          className={`${styles.flexCenter} pt-6 pb-8 px-2 flex gap-8 grid-cols-2 md:justify-start md:px-0 md:gap-10  xl:py-5`}
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-once="true"
        >
          {cvData.map((cv) => (
            <a
              key={cv.id}
              href={cv.href}
              target="_blank"
              className="items-center button btn-primary btn-animation whitespace-nowrap flex"
              rel="noreferrer"
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
            className={`${styles.flexCenter} button btn-secendary btn-animation flex `}
            to="projects"
            href="#"
            spy
            smooth
            offset={-100}
            duration={500}
          >
            Projects
          </Link>
        </div>

        <div className=" items-center justify-center pt-2 pb-16 flex gap-8 md:justify-start xl:py-5  ">
          <a
            className="icon-animation"
            href="https://www.behance.net/elbietakocz/"
            target="_blank"
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-once="true"
            rel="noreferrer"
          >
            {" "}
            <img
              src={behance}
              alt="behance-logo"
            />
          </a>
          <a
            className="icon-animation"
            href="https://www.github.com/ElzbietaKolcz"
            target="_blank"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-once="true"
            rel="noreferrer"
          >
            {" "}
            <img
              src={gitHub}
              alt="gitHub-logo"
            />
          </a>
          <a
            className="icon-animation"
            href="https://www.linkedin.com/in/elzbieta-kolcz"
            target="_blank"
            data-aos="zoom-in"
            data-aos-delay="500"
            data-aos-once="true"
            rel="noreferrer"
          >
            {" "}
            <img
              src={linkedIn}
              alt="linkedIn-logo"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
export default Home;
