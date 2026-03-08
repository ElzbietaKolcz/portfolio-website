import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import styles from "../style";
import { t } from "../i18n";

function SkillCard({ title, description, color }) {
  return (
    <div
      className="m-2 rounded-md"
      style={{ backgroundColor: color }}
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom"
    >
      <h2 className="px-2 pt-3">{title}</h2>
      <p className="px-2 pb-3">{description}</p>
    </div>
  );
}

function CertificationItem({ start, end, linkName, link, color }) {
  return (
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
      <p className="px-2 pb-3">
        {start}{" "}
        <span className="m-2 rounded-md" style={{ backgroundColor: color }}>
          {" "}
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            tabIndex={0}
            role="link"
            id={linkName}
            title={t("skills.certificateTitle", { name: linkName })}
            aria-label={t("skills.certificateAriaLabel", { name: linkName })}
          >
            <strong>{linkName}</strong>
          </a>
        </span>{" "}
        {end}{" "}
      </p>
    </div>
  );
}

function TimelineEntry({ title, dateStart, dateEnd, children }) {
  return (
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
      {title && <h3>{title}</h3>}
      <div className="timeline-row">
        <div>
          <p className="timeline-date">
            {dateStart}
            {dateEnd && (
              <>
                {" -\u00A0"}
                <span className="font-bold">{dateEnd}</span>
              </>
            )}
          </p>
        </div>
        <div className="timeline-body">{children}</div>
      </div>
    </div>
  );
}

function SkillsPanel({ heading, aosDirection, className = "", children }) {
  return (
    <div
      className={`lg:flex lg:flex-col p-2 m-2 ${className}`}
      data-aos={aosDirection}
      data-aos-delay="200"
    >
      <h2 className={`${styles.heading1Left}`}>{heading}</h2>
      {children}
    </div>
  );
}

const COLLECTIONS = ["skills", "certification", "education", "experience", "accomplishments"];

export default function Skills() {
  const [data, setData] = useState({
    skills: [],
    certification: [],
    education: [],
    experience: [],
    accomplishments: [],
  });

  useEffect(() => {
    const fetchCollection = async (name) => {
      const q = query(collection(db, name), orderBy("id"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };

    Promise.all(COLLECTIONS.map(fetchCollection)).then(
      ([skills, certification, education, experience, accomplishments]) => {
        setData({ skills, certification, education, experience, accomplishments });
      }
    );
  }, []);

  return (
    <section id="skills" className={`${styles.flexCol}`}>
      <div className="lg:flex lg:gap-6 pb-6">
        <div className="lg:flex-col">
          <SkillsPanel heading={t("skills.heading")} aosDirection="fade-right" className="pb-4">
            <div className={`${styles.flexCenter} md:max-w-xl`}>
              <div className="flex flex-wrap pr-8">
                {data.skills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    title={skill.title}
                    description={skill.description}
                    color={skill.color}
                  />
                ))}
              </div>
            </div>
          </SkillsPanel>

          <SkillsPanel heading={t("skills.certification")} aosDirection="fade-right">
            <div className={`${styles.flexCenter} lg:mr-5`}>
              <div className="flex flex-wrap">
                {data.certification.map((cert) => (
                  <CertificationItem
                    key={cert.id}
                    start={cert.start}
                    end={cert.end}
                    linkName={cert.linkName}
                    link={cert.link}
                    color={cert.color}
                  />
                ))}
              </div>
            </div>
          </SkillsPanel>
        </div>

        <div className="lg:flex lg:flex-col p-2 m-2 pb-4">
          <div className="mb-4" data-aos="fade-left" data-aos-delay="200">
            <h2 className={`${styles.heading1Left}`}>{t("skills.education")}</h2>
            <div className={`${styles.flexCenter} lg:mr-5`}>
              <div className="flex flex-wrap">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <TimelineEntry title={edu.title} dateStart={edu.timeStart} dateEnd={edu.timeEnd}>
                      <p>
                        {edu.fieldTitle01}{" "}
                        <span className="font-bold">{edu.field01}</span>
                      </p>
                      <p className="font-bold">
                        <span className="font-normal">{edu.fieldTitle02}{" "}</span>{" "}
                        {edu.field02}
                      </p>
                      <p>
                        {edu.fieldTitle03}
                        <span className="font-bold">{edu.field03}{" "}</span>
                      </p>
                    </TimelineEntry>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4" data-aos="fade-left" data-aos-delay="200">
            <h2 className={`${styles.heading1Left}`}>{t("skills.experience")}</h2>
            <div className="flex flex-wrap">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <TimelineEntry title={exp.title} dateStart={exp.timeStart} dateEnd={exp.timeEnd}>
                    <p className="font-normal">
                      {exp.fieldTitle01}{" "}
                      <span className="font-bold">{exp.position}</span>
                    </p>
                    <p className="font-bold">
                      <span className="font-normal">{exp.fieldTitle02}{" "}</span>{" "}
                      {exp.schedule}
                    </p>
                  </TimelineEntry>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4" data-aos="fade-left" data-aos-delay="200">
            <h2 className={`${styles.heading1Left}`}>{t("skills.accomplishments")}</h2>
            <div className="flex flex-wrap">
              {data.accomplishments.map((acc) => (
                <div key={acc.id}>
                  <TimelineEntry dateStart={acc.time}>
                    <p>{acc.description}</p>
                  </TimelineEntry>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
