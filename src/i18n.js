import en from "./locales/en.json";
import pl from "./locales/pl.json";
import cs from "./locales/cs.json";

const locales = { en, pl, cs };

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

/**
 * Translates a dot-notation key with optional parameter interpolation.
 *
 * Language is read from the <html lang="..."> attribute (defaults to "en").
 * Falls back to English if the key is missing in the active locale.
 *
 * @param {string} key   - e.g. "contact.heading"
 * @param {object} params - e.g. { year: 2025 }
 * @returns {string}
 *
 * @example
 * t("footer.copyright", { year: 2025 })
 * t("nav.menu.goTo", { section: "about" })
 */
export const t = (key, params = {}) => {
  const lang = document.documentElement.lang?.slice(0, 2) || "en";
  const locale = locales[lang] ?? locales.en;

  let value =
    getNestedValue(locale, key) ??
    getNestedValue(locales.en, key) ??
    key;

  return Object.entries(params).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, v),
    value
  );
};
