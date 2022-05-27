import Script from "next/script";
import translate from "lib/locales";

export default function ShareToSocial({ locale, url }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/sharer.js@latest/sharer.min.js" />
      <div className="grid gap-1">
        <div className="text-black-dark mb-1 lg:text-lg">
          {translate("share", locale)}
        </div>
        <button
          className="block text-left text-xs text-black/80 lg:text-base"
          data-sharer="linkedin"
          data-url={url}
        >
          Linkedin
        </button>
        <button
          className="block text-left text-xs text-black/80 lg:text-base"
          data-sharer="twitter"
          data-url={url}
        >
          Twitter
        </button>
      </div>
    </>
  );
}
