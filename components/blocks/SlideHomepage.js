import { Image as DatoImage } from "react-datocms";

import SlideHomepageCaption from "/components/blocks/SlideHomepageCaption";

export default function SlideHomepage({ locale, slide, isActive }) {
  return (
    <div className="relative md:mt-8 md:translate-x-1/2 lg:-mt-[80px] xl:-mt-[8%] 2xl:-mt-[0px]">
      <div className="absolute left-[40%] top-0 h-[70vw] w-[70vw] md:left-[5%] md:top-16 md:h-[300px] md:w-[300px] lg:top-20 lg:h-[400px] lg:w-[400px] xl:top-28 xl:h-[600px] xl:w-[600px] 2xl:h-[700px] 2xl:w-[700px] 3xl:-left-[0px]">
        <div
          className={`${
            isActive ? "scale-1" : "scale-0"
          } relative z-10 h-full w-full rounded-full bg-yellow-medium duration-[.6s] motion-reduce:transition-none`}
        />
        <div
          className={`${
            isActive ? "translate-x-0" : "translate-x-full"
          } absolute left-[-52%] top-[-12%] z-20 h-[112%] w-[134%] delay-100 duration-[1s] motion-reduce:transition-none md:left-[-12.5%] md:h-[72%] md:w-[125%] lg:h-[78%] xl:h-[83%] 2xl:h-[85%]`}
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
      <div className="px-4 pt-[70vw] md:min-h-[400px] md:pt-[40px] lg:min-h-[520px] xl:min-h-[760px] 2xl:min-h-[860px] 3xl:-mt-12 3xl:pt-0">
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
