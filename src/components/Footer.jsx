import { t } from "../i18n";

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
