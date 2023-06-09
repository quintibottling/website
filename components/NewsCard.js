import { showCategories, formatDate, renderHTML } from "lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import translate from "lib/locales";
import { Image as DatoImage } from "react-datocms";

export default function NewsCard({ locale, data, template = null }) {
  const firstTextBlock = data.body[0];
  return (
    <>
      <Link href={`/news/${data.slug}`} locale={locale}>
        <a
          title={data.title}
          className={`${
            template == "twoColumns"
              ? "md:grid md:grid-cols-2 md:gap-8 lg:gap-24"
              : ""
          } group pt-8`}
        >
          {data.imageHero && (
            <div className="relative">
              <DatoImage
                data={data.imageHero.responsiveImage}
                alt={data.imageHero.responsiveImage.alt}
                title={data.imageHero.responsiveImage.title}
              />
            </div>
          )}
          <div className="">
            <div
              className={`${
                template == "twoColumns" ? "" : "mb-2"
              } flex content-start items-center gap-4 py-3 xl:gap-8`}
            >
              <div className="inline-block rounded-full bg-pink px-3 py-1 text-xxs text-gold lg:text-sm">
                {showCategories(data.category)}
              </div>
              <div className="text-xs text-black">
                {formatDate(data.createdAt, locale)}
              </div>
            </div>
            <h2 className="lg:text-lg">{data.title}</h2>
            {firstTextBlock && (
              <div className="my-3 text-sm opacity-80 line-clamp-4 lg:text-base xl:line-clamp-4">
                {renderHTML(firstTextBlock.text)}
              </div>
            )}
            <div className="mt-2 flex items-center gap-x-2 lg:mt-4">
              <div className="text-sm tracking-wide duration-200 group-hover:text-orange xl:text-base">
                {translate("more", locale)}
              </div>
              <ArrowRightIcon
                className="h-4 w-4 -rotate-45 text-orange duration-300 group-hover:-rotate-[22.5px]"
                aria-hidden="true"
              />
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
