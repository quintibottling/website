import Link from "next/link";
import { Fragment } from "react";

import { resolveLink } from "lib/utils";
import translate from "lib/locales";

function LanguageSwitcher({ locale, model, alts, altsProduct, handleClose }) {
  const locales = ["it", "en"];

  return (
    <>
      {locales &&
        locales.map((l, i) => {
          const isActive = locale === l;
          const link = alts?.find((alt) => alt.locale === l)?.value || "";
          const productLink =
            altsProduct?.find((p) => p.locale === l)?.value || "";

          return (
            <Fragment key={l}>
              {i > 0 && (
                <span className="px-2 text-xs text-white lg:px-0">-</span>
              )}
              <Link href={resolveLink(model, l, link, productLink)} locale={l}>
                <a
                  onClick={() => handleClose}
                  className={`${
                    isActive ? "" : "text-white/70"
                  } text-white duration-200 hover:text-orange lg:-mt-[1px] lg:ml-8 lg:block`}
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
