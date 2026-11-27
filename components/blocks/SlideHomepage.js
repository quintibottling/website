import { Image as DatoImage } from "react-datocms";

import SlideHomepageCaption from "/components/blocks/SlideHomepageCaption";

export default function SlideHomepage({ locale, slide, isActive }) {
  return (
    <div className="relative md:mt-8 md:translate-x-1/2 lg:-mt-[80px] xl:mt-0">
      <div className="absolute left-[40%] top-[var(--circle-top)] h-[var(--circle)] w-[var(--circle)] md:left-[5%] 3xl:-left-[0px]">
        <div
          className={`${
            isActive ? "scale-1" : "scale-0"
          } relative z-10 h-full w-full rounded-full bg-yellow-medium duration-[.6s] motion-reduce:transition-none`}
        />
        <div
          className={`${
            isActive ? "translate-x-0" : "translate-x-full"
          } absolute left-[-52%] top-[-12%] z-20 h-[112%] w-[134%] delay-100 duration-[1s] motion-reduce:transition-none md:bottom-[calc(13%+5rem)] md:left-[-12.5%] md:h-auto md:w-[125%] xl:bottom-[calc(13%+5.75rem)]`}
        >
          <DatoImage
            data={slide.image.responsiveImage}
            alt={slide.image.responsiveImage.alt}
            title={slide.image.responsiveImage.title}
            layout="fill"
            objectFit="contain"
            objectPosition="bottom"
            usePlaceholder={false}
          />
        </div>
        <div
          className={`${
            isActive ? "opacity-100" : "opacity-0"
          } absolute inset-x-0 bottom-[13%] z-30 hidden px-4 delay-200 duration-500 motion-reduce:transition-none md:block xl:px-10`}
        >
          <SlideHomepageCaption locale={locale} slide={slide} onCircle />
        </div>
      </div>
      <div className="px-4 pt-[var(--circle)] md:min-h-[calc(var(--circle-top)+var(--circle)+1.5rem)] md:pt-[40px]">
        <div
          className={`${
            isActive ? "" : "hidden"
          } relative z-30 mt-8 pb-10 md:hidden`}
        >
          <SlideHomepageCaption locale={locale} slide={slide} />
        </div>
      </div>
    </div>
  );
}
