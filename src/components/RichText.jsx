import { Link } from "react-scroll";
import { t } from "../i18n";
import styles from "../style";

const COLOR_MAP = {
  primary: "text-primary-100",
  orange: "text-primary-50",
  black: "text-black",
  purple: "text-primary-50",
};

function Segment({ seg }) {
  const classes = [
    seg.bold ? "font-semibold" : "",
    seg.italic ? "italic" : "",
    seg.color ? (COLOR_MAP[seg.color] ?? "") : seg.italic ? "text-primary-50" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (seg.link) {
    return (
      <Link
        className={styles.link}
        to={seg.link.to}
        spy
        smooth
        offset={-100}
        duration={500}
        role="link"
        tabIndex={0}
        title={t("nav.goToContact")}
        aria-label={t("nav.navigateToContact")}
      >
        {seg.text}
        <span className={styles.linkUnderline} />
      </Link>
    );
  }

  if (classes) {
    return <span className={classes}>{seg.text}</span>;
  }

  return seg.text;
}

export default function RichText({ segments }) {
  if (typeof segments === "string") return segments;

  return (
    <>
      {segments.map((seg, i) => (
        <Segment key={i} seg={seg} />
      ))}
    </>
  );
}
