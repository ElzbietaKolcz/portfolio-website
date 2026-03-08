import { behanceFooter, gitHubFooter, linkedInFooter } from "../assets";
import { t } from "../i18n";

export default function Footer() {
  return (
    <div className="bg-primary-40 p-4 flex justify-between items-center">
      <p className="text-xs md:text-sm md:font-medium text-[#45024B]">
        {" "}
        {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
      </p>
      <div className="flex space-x-2 ">
        <a
          href="https://www.behance.net/elbietakocz/"
          target="_blank"
          rel="noreferrer"
          id="behance-link"
          role="link"
          tabIndex="0"
          title={t("footer.behance.title")}
          aria-label={t("footer.behance.ariaLabel")}
        >
          <img
            src={behanceFooter}
            alt={t("footer.behance.imgAlt")}
          />
        </a>

        <a
          href="https://www.github.com/ElzbietaKolcz"
          target="_blank"
          rel="noreferrer"
          id="github-link"
          role="link"
          tabIndex="0"
          title={t("footer.github.title")}
          aria-label={t("footer.github.ariaLabel")}
        >
          <img
            src={gitHubFooter}
            alt={t("footer.github.imgAlt")}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/elzbieta-kolcz"
          target="_blank"
          rel="noreferrer"
          id="linkedin-link"
          role="link"
          tabIndex="0"
          title={t("footer.linkedin.title")}
          aria-label={t("footer.linkedin.ariaLabel")}
        >
          <img
            src={linkedInFooter}
            alt={t("footer.linkedin.imgAlt")}
          />
        </a>
      </div>

    </div>
  );
}
