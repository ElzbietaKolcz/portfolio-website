import { behanceFooter, gitHubFooter, linkedInFooter } from "../assets";
import { t } from "../i18n";

const SOCIAL_LINKS = [
  { id: "behance-link", href: "https://www.behance.net/elbietakocz/", icon: behanceFooter, key: "behance" },
  { id: "github-link", href: "https://www.github.com/ElzbietaKolcz", icon: gitHubFooter, key: "github" },
  { id: "linkedin-link", href: "https://www.linkedin.com/in/elzbieta-kolcz", icon: linkedInFooter, key: "linkedin" },
];

export default function Footer() {
  return (
    <div className="bg-primary-40 p-4 flex justify-between items-center">
      <p className="text-xs md:text-sm md:font-medium text-[#45024B]">
        {" "}
        {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
      </p>
      <div className="flex space-x-2">
        {SOCIAL_LINKS.map(({ id, href, icon, key }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer"
            id={id}
            role="link"
            tabIndex="0"
            title={t(`footer.${key}.title`)}
            aria-label={t(`footer.${key}.ariaLabel`)}
          >
            <img src={icon} alt={t(`footer.${key}.imgAlt`)} />
          </a>
        ))}
      </div>
    </div>
  );
}
