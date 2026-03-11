import { email, cvImage, linkedIn } from "../assets";
import SocialButton from "./SocialButton";
import EmailButton from "./EmailButton";
import styles from "../style";
import { t } from "../i18n";

export default function Contact() {
  return (
    <section
      id="contact"
    >
      <div className="container mx-auto pb-11 md:pb-6 ">
        <div className="flex items-center justify-center ">
          <h2 className={`${styles.heading1}`}>{t("contact.heading")}</h2>
        </div>

        <div className="flex justify-center pb-10 md:pb-8 ">
          <p className="mx-10 md:mx-20 text-center">
            {t("contact.description")}{" "}
          </p>
        </div>

        <div className={`${styles.flexCenter} flex-col lg:flex-row gap-8 pb-2`}>
          <EmailButton
            icon={email}
            text={t("contact.emailButton")}
            copyText="contact@elzbietakol.cz"
          />
          <SocialButton
            icon={linkedIn}
            text={t("contact.linkedinButton")}
            link="https://www.linkedin.com/in/"
            alt={t("socialButton.linkedinIconAlt")}
            ariaLabel={t("socialButton.openLinkedin")}
          />
          <SocialButton
            icon={cvImage}
            text={t("contact.cvButton")}
            link="/CV/Kolcz_CV.pdf"
            alt={t("socialButton.cvIconAlt")}
            ariaLabel={t("socialButton.openCv")}
          />
        </div>
      </div>
    </section>
  );
};
