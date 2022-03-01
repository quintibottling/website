import { showCategories, formatDate, renderHTML } from "lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/solid";
import translate from "lib/locales";

export default function NewsCard({ locale, data }) {
  const firstTextBlock = data.body[0];
  return (
    <>
      <Link href={`/news/${data.slug}`} locale={locale}>
        <a title={data.title} className="group">
          <div className="mt-2 flex content-start items-center gap-4 py-3 xl:gap-8">
            <div className="inline-block rounded-full bg-pink px-3 py-1 text-xxs text-gold lg:text-sm">
              {showCategories(data.category)}
            </div>
            <div className="text-xs text-black">
              {formatDate(data.createdAt, locale)}
            </div>
          </div>
          <h2 className="duration-100 group-hover:text-orange lg:text-lg">
            {data.title}
          </h2>
          {firstTextBlock && (
            <h3 className="my-3 text-sm opacity-80 line-clamp-4 lg:text-base xl:line-clamp-2">
              {renderHTML(firstTextBlock.text)}
            </h3>
          )}
          <div className="mt-2 flex items-center gap-x-2 lg:mt-4">
            <div className="text-sm tracking-wide xl:text-base">
              {translate("more", locale)}
            </div>
            <ArrowRightIcon
              className="h-4 w-4 -rotate-45 text-orange duration-300 group-hover:-rotate-[22.5px]"
              aria-hidden="true"
            />
          </div>
        </a>
      </Link>
    </>
  );
}
