import translate from "lib/locales";

export default function SkipLinks({ locale }) {
  return (
    <div data-datocms-noindex>
      <a
        href="#content"
        className="bg-brown absolute left-1/2 z-50 -translate-x-1/2 -translate-y-full px-3 py-2 text-white duration-500 focus:translate-y-0"
      >
        {translate("skipContent", locale)}
      </a>
      <a
        href="#footer"
        className="bg-brown absolute left-1/2 z-50 -translate-x-1/2 -translate-y-full px-3 py-2 text-white duration-500 focus:translate-y-0"
      >
        {translate("skipFooter", locale)}
      </a>
    </div>
  );
}
