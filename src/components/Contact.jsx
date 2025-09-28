import { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { email, cvImage, linkedIn } from "../assets";
import SocialButton from "./SocialButton";
import EmailButton from "./EmailButton";
import styles from "../style";
import { db } from "../firebase";

export default function Contact() {
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

  const contact = useRef(null);
  return (
    <section
      id="contact"
      ref={contact}
      className=" h-auto"
    >
      <div className="container mx-auto pb-11 md:pb-6 ">
        <div className="flex items-center justify-center ">
          <h1 className={`${styles.heading1}`}>Let&apos;s chat!</h1>
        </div>

        <div className="flex justify-center pb-10 md:pb-8 ">
          <p className="mx-10 md:mx-20 ">
            I am more than happy to take the time and discuss how we can
            collaborate. I speak English and Polish.{" "}
          </p>
        </div>

        <div className="items-center justify-center flex flex-col lg:flex-row gap-8 pb-2">
          <EmailButton
            icon={email}
            text="Send me an email"
            copyText="contact@elzbietakol.cz"
          />
          <SocialButton
            icon={linkedIn}
            text="Send me a message"
            link="https://www.linkedin.com/in/"
          />
          {cvData.map((cv) => (
            <SocialButton
              key={cv.id}
              icon={cvImage}
              text="Review CV"
              link={cv.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
