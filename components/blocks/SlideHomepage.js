import { Image as DatoImage } from "react-datocms";
import { useSwiper } from "swiper/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";

import Link from "next/link";
import { resolveLink } from "lib/utils";

export default function SlideHomepage({
  locale,
  slide,
  i,
  numberSliders,
  isActive,
}) {
  const swiper = useSwiper();

  return (
    <div className="relative md:mt-8 md:translate-x-1/2 lg:-mt-[80px] xl:-mt-[8%] 2xl:-mt-[0px]">
      <div
        className={`${
          isActive ? "scale-1" : "scale-0"
        } absolute left-[40%] top-0 z-10 h-[70vw] w-[70vw] rounded-full bg-yellow-medium duration-[.6s] md:top-16 md:left-[5%] md:h-[300px] md:w-[300px] lg:top-20 lg:h-[400px] lg:w-[400px] xl:top-28 xl:h-[600px] xl:w-[600px] 2xl:h-[700px] 2xl:w-[700px] 3xl:-left-[0px]`}
      />
      <div className="px-4 md:pt-[40px] 3xl:-mt-12 3xl:pt-0">
        <div className="relative h-[70vw] w-full md:h-[50vw] md:w-[40vw] lg:h-[60vw] lg:w-[50vw] xl:h-[52vw] 2xl:h-[42vw] 3xl:h-[800px] 3xl:w-full">
          <DatoImage
            className={`${
              isActive
                ? "translate-x-0 3xl:-translate-x-20"
                : "translate-x-full"
            } image--contain relative z-20 delay-100 duration-[1s] lg:mb-20 3xl:mb-10 3xl:max-w-[900px]`}
            data={slide.image.responsiveImage}
            alt={slide.image.responsiveImage.alt}
            title={slide.image.responsiveImage.title}
            layout="fill"
            usePlaceholder={false}
          />
        </div>
        <div className="relative z-20 mt-8 flex items-center justify-between md:-ml-2 md:-mt-5 md:w-1/2 md:-translate-x-full md:-translate-y-[150px] lg:-mt-10 xl:-ml-6">
          <div
            className={`${
              isActive ? "opacity-100" : "opacity-0"
            } text-xs duration-100 xl:text-base`}
          >
            0{i + 1}
            <span className="pl-1 text-gold-light">- 0{numberSliders}</span>
          </div>
          <div className="flex gap-2">
            <div
              onClick={() => swiper.slidePrev()}
              className={`${
                isActive ? "opacity-100" : "opacity-0"
              } relative h-[50px] w-[50px] cursor-pointer rounded-full bg-white/10 duration-200 hover:bg-orange`}
            >
              <ArrowLeftIcon
                className="absolute--centered h-4 w-4 text-white"
                aria-hidden="true"
              />
            </div>
            <div
              onClick={() => swiper.slideNext()}
              className={`${
                isActive ? "opacity-100" : "opacity-0"
              } relative h-[50px] w-[50px] cursor-pointer rounded-full bg-white/10 duration-200 hover:bg-orange`}
            >
              <ArrowRightIcon
                className="absolute--centered h-4 w-4 text-white"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <Link
          href={resolveLink(
            slide.link.model,
            locale,
            slide.link.slug,
            slide.link.product.slug
          )}
        >
          <a
            title={slide.title}
            className={`${
              isActive ? "" : "hidden"
            } group relative z-30 bg-red duration-100`}
          >
            <div className="flex items-center gap-x-2 pt-3 md:-mt-[150px] md:-ml-2 md:-translate-x-1/2 xl:-ml-4">
              <div className="text-sm uppercase tracking-wide duration-200 group-hover:text-orange xl:text-base">
                {slide.titleLink}
              </div>
              <ArrowRightIcon
                className="h-4 w-4 -rotate-45 text-orange"
                aria-hidden="true"
              />
            </div>
            <div className="pb-10 text-xs tracking-wide opacity-80 md:-ml-3 md:w-1/2 md:-translate-x-full xl:-ml-6 xl:text-sm">
              {slide.subtitleLink}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
