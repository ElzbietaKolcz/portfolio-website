import { useLang } from "../LangContext";

const LANGS = ["en", "pl", "cs"];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1 ml-4">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLang(l)}
            className={`text-xs uppercase font-medium transition-colors duration-200 ${
              lang === l
                ? "text-primary-100 font-bold"
                : "text-gray-400 hover:text-primary-100"
            }`}
            aria-label={`Switch language to ${l.toUpperCase()}`}
            aria-pressed={lang === l}
          >
            {l.toUpperCase()}
          </button>
          {i < LANGS.length - 1 && (
            <span className="text-gray-300 mx-1 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
