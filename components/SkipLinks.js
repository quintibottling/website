import translate from "lib/locales";

export default function SkipLinks({ locale }) {
  return (
    <div data-datocms-noindex>
      <a
        href="#content"
        className="absolute left-1/2 z-60 -translate-x-1/2 -translate-y-full bg-brown px-3 py-2 text-white duration-500 focus:translate-y-0"
      >
        {translate("skipContent", locale)}
      </a>
      <a
        href="#footer"
        className="absolute left-1/2 z-60 -translate-x-1/2 -translate-y-full bg-brown px-3 py-2 text-white duration-500 focus:translate-y-0"
      >
        {translate("skipFooter", locale)}
      </a>
    </div>
  );
}
