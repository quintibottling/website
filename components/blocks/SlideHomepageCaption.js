import Link from "next/link";
import Button from "components/Button";
import translate from "lib/locales";
import { resolveLink } from "lib/utils";

export default function SlideHomepageCaption({
  locale,
  slide,
  onCircle = false,
}) {
  return (
    <div className={onCircle ? "text-center" : ""}>
      <div
        className={`${
          onCircle ? "text-brown" : "text-white"
        } text-sm uppercase tracking-wide xl:text-lg`}
      >
        {slide.titleLink}
      </div>
      <Link
        href={resolveLink(
          slide.link.model,
          locale,
          slide.link.slug,
          slide.link.product.slug
        )}
        locale={locale}
      >
        <a
          title={slide.titleLink}
          className="mt-2 inline-block rounded-full focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-orange"
        >
          <Button
            data={translate("discoverMachine", locale)}
            background={onCircle ? "light" : "dark"}
          />
        </a>
      </Link>
    </div>
  );
}
