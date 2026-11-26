import { Image as DatoImage } from "react-datocms";

import SlideHomepageCaption from "/components/blocks/SlideHomepageCaption";

export default function SlideHomepage({ locale, slide, isActive }) {
  const isTall = slide.image.responsiveImage.aspectRatio < 1.3;

  return (
    <div className="relative md:mt-8 md:translate-x-1/2 lg:-mt-[80px] xl:-mt-[8%] 2xl:-mt-[0px]">
      <div className="absolute left-[40%] top-0 h-[70vw] w-[70vw] md:top-16 md:left-[5%] md:h-[300px] md:w-[300px] lg:top-20 lg:h-[400px] lg:w-[400px] xl:top-28 xl:h-[600px] xl:w-[600px] 2xl:h-[700px] 2xl:w-[700px] 3xl:-left-[0px]">
        <div
          className={`${
            isActive ? "scale-1" : "scale-0"
          } relative z-10 h-full w-full rounded-full bg-yellow-medium duration-[.6s] motion-reduce:transition-none`}
        />
        <div
          className={`${
            isActive ? "opacity-100" : "opacity-0"
          } absolute inset-x-0 top-full z-30 mt-6 hidden px-4 delay-200 duration-500 motion-reduce:transition-none md:block xl:top-auto xl:bottom-[13%] xl:mt-0 xl:px-10`}
        >
          <SlideHomepageCaption locale={locale} slide={slide} onCircle />
        </div>
      </div>
      <div className="px-4 md:min-h-[490px] md:pt-[40px] lg:min-h-[600px] xl:min-h-[760px] 2xl:min-h-[860px] 3xl:-mt-12 3xl:pt-0">
        <div
          className={`${
            isTall
              ? "xl:mt-[42px] xl:h-[454px] 2xl:h-[541px] 3xl:mt-[82px]"
              : "xl:h-[52vw] 2xl:h-[42vw] 3xl:h-[800px]"
          } relative h-[70vw] w-full md:h-[50vw] md:w-[40vw] lg:h-[60vw] lg:w-[50vw] 3xl:w-full`}
        >
          <DatoImage
            className={`${
              isActive
                ? "translate-x-0 3xl:-translate-x-20"
                : "translate-x-full"
            } image--contain relative z-20 delay-100 duration-[1s] motion-reduce:transition-none lg:mb-20 3xl:mb-10 3xl:max-w-[900px]`}
            data={slide.image.responsiveImage}
            alt={slide.image.responsiveImage.alt}
            title={slide.image.responsiveImage.title}
            layout="fill"
            usePlaceholder={false}
            priority
          />
        </div>
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
