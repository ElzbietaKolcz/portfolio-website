import styles from "../style";
import { t } from "../i18n";
import InterestCard from "./InterestCard";
import RichText from "./RichText";

const image = "/images/fot_Julia_Krzemianowska.webp";

const paraClass = `${styles.paragraph} text-left`;

function AboutParagraph({ item, direction = "fade-right" }) {
  return (
    <div className="mb-4" data-aos={direction} data-aos-delay="100">
      <p>
        <RichText segments={item.segments} />
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className={`${styles.flexCol}`}>
      <h2 className={`${styles.heading1}`}>{t("about.heading")}</h2>

      {/* Row 1: About | Photo | About */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center pb-10 px-5 sm:px-10">
        {/* Left column */}
        <div className={`${paraClass}`}>
          {t("about.left").map((item) => (
            <AboutParagraph key={item.id} item={item} direction="fade-right" />
          ))}
        </div>

        {/* Center: photo */}
        <div
          className="flex justify-center"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <img
            src={image}
            alt="A woman in elegant clothes working at a computer and writing notes."
            className="rounded-3xl w-full max-w-[280px] lg:max-w-[320px] aspect-auto"
          />
        </div>

        {/* Right column */}
        <div className={`${paraClass}`}>
          {t("about.right").map((item) => (
            <AboutParagraph key={item.id} item={item} direction="fade-left" />
          ))}
        </div>
      </div>

      {/* Row 2: Interest cards */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-5 sm:px-10 pb-12">
        {t("interests").map((interest) => (
          <InterestCard
            key={interest.id}
            icon={interest.icon}
            title={interest.title}
            description={interest.description}
          />
        ))}
      </div>
    </section>
  );
}
