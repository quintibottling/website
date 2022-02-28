import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

import { resolveLink } from "lib/utils";
import translate from "lib/locales";

export default function LanguageSwitcher({ locale, model, alts }) {
  const locales = ["it", "en"];
  return (
    <>
      {locales &&
        locales.map((l, i) => {
          const isActive = locale === l;
          const link = alts?.find((alt) => alt.locale === l)?.value || "/";
          return (
            <Fragment key={l}>
              {i > 0 && <span className="text-xs text-white">-</span>}
              <Link href={`/${link}`} locale={l}>
                <a
                  className={`${
                    isActive ? "" : "text-white/70"
                  } hidden text-white hover:text-orange lg:block`}
                >
                  {translate(`${l}`, locale)}
                </a>
              </Link>
              <Link href={`/${link}`} locale={l}>
                <a
                  className={`${
                    isActive ? "" : "text-white/70"
                  } mr-6 hover:text-orange lg:hidden`}
                >
                  {translate(`${l}`, locale)}
                </a>
              </Link>
            </Fragment>
          );
        })}
    </>
  );
}
