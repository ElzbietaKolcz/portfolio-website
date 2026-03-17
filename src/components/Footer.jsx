import { behanceFooter, gitHubFooter, linkedInFooter } from "../assets";
import { t } from "../i18n";

const SOCIAL_LINKS = [
  { id: "behance-link", href: "https://www.behance.net/elbietakocz/", icon: behanceFooter, key: "behance" },
  { id: "github-link", href: "https://www.github.com/ElzbietaKolcz", icon: gitHubFooter, key: "github" },
  { id: "linkedin-link", href: "https://www.linkedin.com/in/elzbieta-kolcz", icon: linkedInFooter, key: "linkedin" },
];

export default function Footer() {
  return (
    <footer className=" px-4 pb-8 justify-center">
      <p className="text-xs md:text-sm md:font-medium text-center text-[#45024B]">
        {" "}
        {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
      </p>
     
    </footer>
  );
}
