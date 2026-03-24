import { useState } from "react";
import { TIMING } from "../constants";
import { t } from "../i18n";

export default function EmailButton({ icon, text, copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), TIMING.COPY_FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={handleCopyToClipboard}
      className="flex items-center rounded-full border-2 border-primary-50 bg-white text-primary-50 font-medium p-2 h-10 space-x-2"
      aria-label={t("emailButton.ariaLabel", { email: copyText })}
      title={t("emailButton.ariaLabel", { email: copyText })}
    >
      <img src={icon} alt="" className="w-6 h-6" loading="lazy" />
      <span className={isCopied ? "text-green-500 font-semibold" : ""}>
        {isCopied ? t("emailButton.copied") : text}
      </span>
    </button>
  );
}