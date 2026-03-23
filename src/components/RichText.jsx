import { Link } from "react-scroll";
import { t } from "../i18n";

const COLOR_MAP = {
  primary: "text-primary-100",
  orange: "text-orange",
  black: "text-black",
  purple: "text-primary-50",
};

function Segment({ seg }) {
  const classes = [
    seg.bold ? "font-semibold" : "",
    seg.italic ? "italic" : "",
    seg.color ? (COLOR_MAP[seg.color] ?? "") : seg.italic ? "text-orange" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (seg.link) {
    return (
      <Link
        className="font-semibold underline mobilehover:hover:no-underline relative text-primary-100 mobilehover:hover:text-primary-50"
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
        <span className="underline-animation absolute bottom-0 left-0 right-full h-0.5 rounded-full bg-orange transition-all duration-400 ease-out" />
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
