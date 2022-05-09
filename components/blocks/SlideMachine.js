import { Image as DatoImage } from "react-datocms";
import { useSwiper } from "swiper/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";

export default function SlideMachine({
  locale,
  slide,
  i,
  numberSliders,
  isActive,
}) {
  const swiper = useSwiper();

  return (
    <div className="relative">
      <DatoImage
        className={`${
          isActive ? "translate-x-0" : "translate-x-full"
        } relative z-20 delay-100 duration-[1s]`}
        data={slide.responsiveImage}
        alt={slide.responsiveImage.alt}
        title={slide.responsiveImage.title}
        layout="responsive"
        usePlaceholder={false}
      />
      {i > 0 ? (
        <div className="relative z-20 my-2 mb-6 flex items-center justify-between">
          <div
            className={`${
              isActive ? "opacity-100" : "opacity-0"
            } text-xs duration-100 xl:text-base`}
          >
            0{i + 1}
            <span className="pl-1 text-gold-light">- 0{numberSliders}</span>
          </div>
          {numberSliders > 1 ? (
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
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
