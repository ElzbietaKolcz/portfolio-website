import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import styles from "../style";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [certification, setCertification] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [accomplishments, setAccomplishments] = useState([]);

  const fetchData = async (collectionRef, setData) => {
    const q = query(collectionRef, orderBy("id"));
    const data = await getDocs(q);
    setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const skillsCollectionRef = collection(db, "skills");
    fetchData(skillsCollectionRef, setSkills);

    const certificationCollectionRef = collection(db, "certification");
    fetchData(certificationCollectionRef, setCertification);

    const educationCollectionRef = collection(db, "education");
    fetchData(educationCollectionRef, setEducation);

    const experienceCollectionRef = collection(db, "experience");
    fetchData(experienceCollectionRef, setExperience);

    const accomplishmentsCollectionRef = collection(db, "accomplishments");
    fetchData(accomplishmentsCollectionRef, setAccomplishments);
  }, []);

  return (
    <section
      id="skills"
      className={`${styles.flexCol}`}
    >
      <div className="lg:flex lg:gap-6 pb-6">
        <div className="lg:flex-col">
          <div
            className="lg:flex lg:flex-col p-2 m-2 pb-4"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h1 className={`${styles.heading1Left}`}>Skills</h1>

            <div className={`${styles.flexCenter} md:max-w-xl`}>
              <div className="flex flex-wrap pr-8">
                {skills.map((skills) => {
                  return (
                    <div
                      key={skills.id}
                    >
                      <div
                        className="m-2 rounded-md"
                        style={{ backgroundColor: skills.color }}
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <h2 className="px-2 pt-3 ">{skills.title}</h2>
                        <p className="px-2 pb-3">{skills.description} </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="lg:flex lg:flex-col p-2 m-2"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h1 className={`${styles.heading1Left} pb-5`}>
              Certification
            </h1>

            <div className={`${styles.flexCenter}   lg:mr-5`}>
              <div className="flex flex-wrap  ">
                {certification.map((certification) => {
                  return (
                    <div
                      key={certification.id}
                    >
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                      >
                        <p className="px-2 pb-3">
                          {certification.start}{" "}
                          <span className="m-2 rounded-md" style={{ backgroundColor: certification.color }}>
                            {" "}
                            <a href={certification.link}
                              target="_blank"
                              rel="noreferrer"
                              tabIndex={0}
                              role="link"
                              id={certification.linkName}
                              title={"Open Elzbieta Kolcz certificate " + certification.linkName + " confirmation link"}
                              aria-label={"Link to Elzbieta Kolcz certificate " + certification.linkName + " confirmation link"}
                            >
                              <strong>{certification.linkName}</strong>
                            </a>
                          </span>{" "}
                          {certification.end}{" "}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:flex-col p-2 m-2 pb-4">
          <div
            className="mb-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h1 className={`${styles.heading1Left}`}>
              Education
            </h1>

            <div className={`${styles.flexCenter}  lg:mr-5`}>
              <div className="flex flex-wrap ">
                {education.map((education) => (
                  <div
                    key={education.id}
                  >
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <h2> {education.title}</h2>
                      <div className="timeline-row">
                        <div>
                          <p className="timeline-date">
                            {education.timeStart}
                            {" -\u00A0"}
                            <span className="font-bold">
                              {education.timeEnd}
                            </span>
                          </p>
                        </div>

                        <div className="timeline-body">
                          <p>
                            {education.fieldTitle01}{" "}
                            <span className="font-bold">
                              {education.field01}
                            </span>
                          </p>
                          <p className="font-bold">
                            <span className="font-normal">
                              {education.fieldTitle02}{" "}
                            </span>{" "}
                            {education.field02}
                          </p>
                          <p>
                            {education.fieldTitle03}
                            <span className="font-bold">
                              {education.field03}{" "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mb-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h1 className={`${styles.heading1Left}`}>
              Experience
            </h1>

            <div>
              <div className="flex flex-wrap ">
                {experience.map((experience) => (
                  <div
                    key={experience.id}
                  >
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <h2> {experience.title}</h2>
                      <div className="timeline-row">
                        <div>
                          <p className="timeline-date">
                            {experience.timeStart} {" -\u00A0"}
                            <span className="font-bold">
                              {experience.timeEnd}
                            </span>
                          </p>
                        </div>

                        <div className="timeline-body">
                          <p className="font-normal">
                            {experience.fieldTitle01}{" "}
                            <span className="font-bold">
                              {experience.position}
                            </span>
                          </p>
                          <p className="font-bold">
                            <span className="font-normal">
                              {experience.fieldTitle02}{" "}
                            </span>{" "}
                            {experience.schedule}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mb-4"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h1 className={`${styles.heading1Left}`}>
              Accomplishments
            </h1>

            <div>
              <div className="flex flex-wrap ">
                {accomplishments.map((accomplishments) => (
                  <div
                    key={accomplishments.id}
                  >
                    <div
                      data-aos="fade-up"
                      data-aos-anchor-placement="bottom-bottom"
                    >
                      <div className="timeline-row">
                        <div>
                          <p className="timeline-date">
                            {accomplishments.time}
                          </p>
                        </div>

                        <div className="timeline-body">
                          <p>{accomplishments.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}