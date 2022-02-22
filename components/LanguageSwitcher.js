import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

// import { resolveLink } from "lib/utils";
import translate from "lib/locales";

// export default function LanguageSwitcher({ locale, alts, model }) {
export default function LanguageSwitcher({}) {
  const locales = ["it", "en"];
  return (
    <>
      {/* {locales &&
        locales.map((l, i) => {
          const isActive = locale === l;
          const link = alts?.find((alt) => alt.locale === l)?.value || "/";
          // const resolveLink = resolveLink(model, locale);
          return (
            <Fragment key={l}>
              <Link href={`/${resolveLink(model, locale, link)}`} locale={l}>
                <a
                  title="Switch lingua"
                  className={`group ${l === locale ? "hidden" : ""}`}
                >
                  <div className="flex items-center">
                    <span className="hover:text-yellow text-sm uppercase tracking-widest">
                      {locale == "it" ? "English" : "Italiano"}
                    </span>
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="text-yellow ml-2 h-5 w-5 duration-300 ease-in group-hover:ml-3"
                    />
                  </div>
                </a>
              </Link>
            </Fragment>
          );
        })} */}
      <div className="text-white">
        <div className="text-xxs text-white/70 mb-2">Lingua</div>
        <div className="menu_item">italiano / inglese</div>
      </div>
    </>
  );
}
