import Script from "next/script";
import translate from "lib/locales";

export default function ShareToSocial({ locale }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/sharer.js@latest/sharer.min.js" />
      <div className="grid gap-1">
        <div className="text-black-dark mb-1 lg:text-lg">
          {translate("share", locale)}
        </div>
        <button
          className="block text-left text-xs text-black/80 lg:text-base"
          data-sharer="facebook"
          data-hashtag="hashtag"
          data-url="https://ellisonleao.github.io/sharer.js/"
        >
          Facebook
        </button>
        <button
          className="block text-left text-xs text-black/80 lg:text-base"
          data-sharer="linkedin"
          data-url="https://ellisonleao.github.io/sharer.js/"
        >
          Linkedin
        </button>
        <button
          className="block text-left text-xs text-black/80 lg:text-base"
          data-sharer="twitter"
          data-title="Checkout Sharer.js!"
          data-hashtags="awesome, sharer.js"
          data-url="https://ellisonleao.github.io/sharer.js/"
        >
          Twitter
        </button>
      </div>
    </>
  );
}
