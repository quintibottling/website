import Button from "components/Button";
import Link from "next/link";
import translate from "lib/locales";
import { Image as DatoImage } from "react-datocms";
import { showCategories, formatDate, renderHTML } from "lib/utils";

export default function NewsHero({ locale, data }) {
  return (
    <>
      <div className="-mt-4 bg-white pt-6 pb-4 text-white xl:pt-12">
        <div className="divide-y divide-black/10 lg:container lg:mx-auto lg:flex lg:flex-row-reverse lg:justify-between lg:divide-y-0">
          <div className="align-right flex justify-end pb-3 lg:w-[25%] lg:pt-6">
            <Link href="/news" locale={locale}>
              <a className="px-4" title="News">
                <Button
                  data={translate("backNews", locale)}
                  background="white"
                  template="reverse"
                />
              </a>
            </Link>
          </div>
          <div className="px-4 py-2 lg:w-[75%] lg:pt-4">
            <div className="flex content-start items-center gap-4 py-3 xl:gap-8">
              <div className="inline-block rounded-full bg-pink px-3 py-1 text-xxs text-gold lg:text-sm">
                {showCategories(data.category)}
              </div>
              <div className="text-xs text-black xl:text-sm">
                {formatDate(data.createdAt, locale)}
              </div>
            </div>
            <h1 className="pt-2 text-lg text-black xl:text-4xl">
              {data.title}
            </h1>
          </div>
        </div>
        <div className="mt-12 max-h-[700px] rounded-b-[20px] md:relative md:h-[40vw] md:rounded-b-[50px] lg:pt-24">
          <DatoImage
            className="relative overflow-hidden rounded-b-[20px] md:hidden"
            data={data.mobileImage.responsiveImage}
            alt={data.mobileImage.responsiveImage.alt}
            title={data.mobileImage.responsiveImage.title}
          />
          <DatoImage
            className="image--cover hidden h-full overflow-hidden rounded-b-[50px] md:block"
            data={data.deskImage.responsiveImage}
            alt={data.deskImage.responsiveImage.alt}
            title={data.deskImage.responsiveImage.title}
            layout="fill"
          />
        </div>
      </div>
    </>
  );
}
