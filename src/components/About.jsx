import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-scroll";
import { db } from "../firebase";
import styles from "../style";

function About() {
  const [aboutData, setAboutData] = useState([]);
  const [hobbyData, setHobbyData] = useState([]);

  const fetchData = async (collectionRef, setData) => {
    const q = query(collectionRef, orderBy("id"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const aboutCollectionRef = collection(db, "aboutMe");
    fetchData(aboutCollectionRef, setAboutData);

    const hobbyCollectionRef = collection(db, "hobby");
    fetchData(hobbyCollectionRef, setHobbyData);
  }, []);

  return (
    <section
      id="about"
      className={`${styles.flexCenter} flex flex-col `}
    >
      <h1 className={`${styles.heading1}`}>About me</h1>

      <div className="lg:flex lg:flex-row pb-12">
        <div>
          {aboutData.map((about) => (
            <div
              key={about.id}
              className={`${styles.paragraph} max-w-[500px]  md:max-w-4xl lg:max-w-7xl  px-5 mt-1 sm:px-10 md:mt-4 text-left  `}
            >
              <div
                className="mb-4"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <p>
                  {about.description}{" "}
                  <Link
                    className="font-semibold underline mobilehover:hover:no-underline relative justify-center text-primary-100 mobilehover:hover:text-primary-50"
                    to="contact"
                    spy
                    smooth
                    offset={-100}
                    duration={500}
                  >
                    {about.link}
                    <span className="underline-animation absolute bottom-0 left-0 right-full h-0.5 rounded-full bg-primary-50 transition-all duration-400 ease-out" />
                  </Link>{" "}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${styles.flexCenter} mt-4 mb-6  flex flex-col  md:flex-row`}
        >
          <div className=" w-1/2 md:w-2/5 py-8 rounded-lg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/portfolioui-962a3.appspot.com/o/images%2Ffot_Julia_Krzemianowska.jpg?alt=media&token=9ef0d948-e53a-4b4f-a6d1-520ede8cbd41"
              alt="fot_Krzemianowska_02"
              data-aos="zoom-in"
              data-aos-delay="200"
              className="rounded-3xl"
            />
          </div>

          <div className="md:ml-4 ">
            {hobbyData.map((hobby) => (
              <div
                key={hobby.id}
                className={`${styles.paragraph} max-w-[500px] px-5 mt-1 sm:px-10 md:mt-4 text-left md:max-w-[450px]`}
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <div className="mb-4">
                  <p className="font-bold">
                    {hobby.title}{" "}
                    <span className="font-normal">{hobby.description}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
