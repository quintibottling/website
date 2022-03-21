import Link from "next/link";
import { Fragment } from "react";

import { resolveLink } from "lib/utils";
import translate from "lib/locales";

function LanguageSwitcher({ locale, model, alts, product }) {
  const locales = ["it", "en"];

  return (
    <>
      {locales &&
        locales.map((l, i) => {
          const isActive = locale === l;
          const isOther = locale !== l;
          const link = alts?.find((alt) => alt.locale === l)?.value || "";
          const productsLink =
            product?.find((p) => p.locale === l)?.value || "";

          let hrefCheck = product
            ? `/${resolveLink(model, l, link, productsLink)}`
            : `/${resolveLink(model, l, link)}`;
          return (
            <Fragment key={l}>
              {i > 0 && <span className="text-xs text-white">-</span>}
              <Link href={hrefCheck} locale={l}>
                <a
                  className={`${
                    isActive ? "" : "text-white/70"
                  } hidden text-white hover:text-orange lg:-mt-[1px] lg:ml-8 lg:block`}
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

export default LanguageSwitcher;
