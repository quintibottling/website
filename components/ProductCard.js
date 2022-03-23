import Link from "next/link";
import { Image as DatoImage } from "react-datocms";
import { ArrowRightIcon } from "@heroicons/react/solid";

import { resolveLink } from "lib/utils";

export default function ProductCard({ locale, data }) {
  return (
    <>
      <Link href={resolveLink("product", locale, data.slug)}>
        <a title={data.title} className="group grid gap-2 py-2 lg:gap-6">
          <div className="relative xl:pr-[41px]">
            <DatoImage
              className=""
              data={data.imageHero.responsiveImage}
              alt={data.imageHero.responsiveImage.alt}
              title={data.imageHero.responsiveImage.title}
              layout=""
            />
            <div
              className={`${data.code} absolute right-4 -bottom-[41px] h-[82px] w-[82px] duration-300 group-hover:scale-110 xl:right-0 xl:h-[120px] xl:w-[120px]`}
            ></div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <h2 className="text-xl text-white group-hover:text-orange xl:text-3xl">
              {data.title}
            </h2>
            <ArrowRightIcon
              className="mt-1 h-5 w-5 -rotate-45 text-orange duration-300 group-hover:rotate-[22.5] xl:h-8 xl:w-8"
              aria-hidden="true"
            />
          </div>
          <div className="text-sm text-white/80 xl:w-5/6 xl:text-base">
            {data.textHero}
          </div>
        </a>
      </Link>
    </>
  );
}
