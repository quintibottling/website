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
        } absolute left-[40%] top-0 z-10 h-[70vw] w-[70vw] rounded-full bg-yellow-medium duration-[.6s] md:top-10 md:left-[5%] md:h-[440px] md:w-[440px] lg:top-6 lg:h-[680px] lg:w-[680px] xl:h-[770px] xl:w-[770px] 2xl:h-[700px] 2xl:w-[700px] 3xl:-left-[0px]`}
      />
      <div className="px-4 md:pt-[40px] 3xl:-mt-12 3xl:pt-0">
        <div className="relative md:w-[70vw] 3xl:w-full">
          <DatoImage
            className={`${
              isActive
                ? "translate-x-0 3xl:-translate-x-20"
                : "translate-x-full"
            } relative z-20 h-auto w-full max-w-[800px] delay-100 duration-[1s] lg:mb-20 3xl:mb-10 3xl:max-w-[900px]`}
            data={slide.image.responsiveImage}
            alt={slide.image.responsiveImage.alt}
            title={slide.image.responsiveImage.title}
            layout="responsive"
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
              className="relative h-[50px] w-[50px] cursor-pointer rounded-full bg-white/10 duration-200 hover:bg-orange"
            >
              <ArrowLeftIcon
                className="absolute--centered h-4 w-4 text-white"
                aria-hidden="true"
              />
            </div>
            <div
              onClick={() => swiper.slideNext()}
              className="relative h-[50px] w-[50px] cursor-pointer rounded-full bg-white/10 duration-200 hover:bg-orange"
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
              isActive ? "opacity-100" : "opacity-0"
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
            <div className="pb-10 text-xs tracking-wide opacity-80 md:-ml-2 md:-translate-x-1/2 xl:-ml-4 xl:text-sm">
              {slide.subtitleLink}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
