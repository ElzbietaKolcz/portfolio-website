import { Link } from "react-scroll";
import styles from "../style";
import { t } from "../i18n";
import RichText from "./RichText";
export default function Home() {
  return (
    <header>
      <section
        id="home"
        aria-labelledby="home-heading"
        className={`${styles.flexCenter} flex-col md:flex-row`}
      >
        <div className="flex-1 flex-col md:w-3/5 text-center item-center px-6 pt-28 md:pt-20 md:text-left md:mx-5 xl:mx-6">
          <h1
            id="home-heading"
            className={`${styles.heading1} !mb-2 !pb-0`}
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {t("home.title")}
          </h1>

          <h2
            aria-label="Accessibility and WCAG, UX/UI Designer, Design and Code"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {t("home.fullName")}
          </h2>

          <p
            className={`${styles.paragraph} font-medium max-w-[55ch] lg:pb-5 px-5 my-3 sm:px-10 md:pl-0 md:mt-4 text-left`}
            data-aos="fade-down"
            data-aos-delay="400"
          >
            <RichText segments={t("home.description")} />
          </p>

          <div
            className={`${styles.flexCenter} gap-8 pt-6 pb-12 px-2 md:justify-start md:px-0 md:gap-10 xl:py-5`}
            data-aos="fade-down"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <Link
              id="contact-link"
              className={`${styles.flexCenter} button rounded btn-primary btn-animation`}
              to="contact"
              role="link"
              tabIndex={0}
              spy
              smooth
              offset={-100}
              duration={500}
              title={t("home.goToContact")}
              aria-label={t("home.navigateToContact")}
            >
              {t("home.contact")}
            </Link>
            <Link
              id="projects-link-cta"
              className="flex items-center button btn-secondary btn-animation whitespace-nowrap"
              to="projects"
              role="link"
              tabIndex={0}
              spy
              smooth
              offset={-100}
              duration={500}
              title={t("home.goToProjects")}
              aria-label={t("home.navigateToProjects")}
            >
              {t("home.projects")}
            </Link>
          </div>
        </div>

        <img
          src="/images/avatar_fot_Julia_Krzemianowska.webp"
          srcSet="/images/avatar_fot_Julia_Krzemianowska-400w.webp 400w, /images/avatar_fot_Julia_Krzemianowska-600w.webp 600w, /images/avatar_fot_Julia_Krzemianowska.webp 600w"
          sizes="(max-width: 768px) 50vw, 40vw"
          alt="A woman in elegant clothes standing with her hands at waist level, smiling gently."
          className="w-1/2 md:w-2/5 md:pl-2 lg:px-5 lg:mx-10 aspect-auto pt-28"
          fetchpriority="high"
          width="600"
          height="600"
          data-aos="zoom-in"
          data-aos-delay="300"
        />
      </section>
    </header>
  );
}
