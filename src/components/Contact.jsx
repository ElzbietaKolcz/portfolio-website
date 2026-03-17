import { email, cvImage, linkedIn, behance, gitHub } from "../assets";
import SocialButton from "./SocialButton";
import EmailButton from "./EmailButton";
import LogoAnimation from "./LogoAnimation";
import styles from "../style";
import { t } from "../i18n";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container mx-auto pb-3 md:pb-0 px-6 md:px-0">
        {/* Grid layout: 3 kolumny — lewa, środek (logo), prawa */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-start">

          {/* Left — heading, description, email & CV */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className={`${styles.heading1}`}>{t("contact.heading")}</h2>
            <p className="pb-6">{t("contact.description")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <EmailButton
                icon={email}
                text={t("contact.emailButton")}
                copyText="contact@elzbietakol.cz"
              />
              <SocialButton
                icon={cvImage}
                text={t("contact.cvButton")}
                link="/CV/Kolcz_CV.pdf"
                ariaLabel={t("socialButton.openCv")}
                disableDesktopAnimation
              />
            </div>
          </div>

          {/* Center — logo animation */}
          <div className="flex justify-center lg:justify-center lg:mx-30">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
              <LogoAnimation size="small" />
            </div>
          </div>

          {/* Right — social links */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className={`${styles.heading1}`}>{t("socialMedia.heading")}</h2>
            {/* Ten paragraf będzie wyrównany w pionie z lewym */}
            <p className="pb-4">{t("socialMedia.description")}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:items-end justify-center lg:justify-start">
              <SocialButton
                icon={linkedIn}
                text={t("socialMedia.linkedinButton")}
                link="https://www.linkedin.com/in/"
                ariaLabel={t("socialButton.openLinkedin")}
              />
              <SocialButton
                icon={behance}
                text={t("socialMedia.behanceButton")}
                link="https://www.behance.net/elbietakocz/"
                ariaLabel={t("socialButton.openBehance")}
              />
              <SocialButton
                icon={gitHub}
                text={t("socialMedia.githubButton")}
                link="https://www.github.com/ElzbietaKolcz"
                ariaLabel={t("socialButton.openGithub")}
              />
            </div>
            <p className="pt-2 text-mauve-700">{t("socialMedia.location")}</p>
          </div>

        </div>
      </div>
    </section>
  );
}