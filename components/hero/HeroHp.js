import { useState } from "react";
import { Navigation, A11y, EffectFade } from "swiper";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import DialogVideo from "/components/DialogVideo";
import translate from "lib/locales";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import SlideHomepage from "/components/blocks/SlideHomepage";
import HistoricEnterpriseBadge from "/components/blocks/HistoricEnterpriseBadge";

export default function HeroHp({ locale, data }) {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="relative rounded-b-[50pt] bg-brown text-white">
      <div className="xl:pl-[max(5.5rem,calc((100vw-1280px)/2))] 2xl:pl-[max(5.5rem,calc((100vw-1350px)/2))] 3xl:container 3xl:mx-auto 3xl:pl-0">
        <div className="md:-mt-6 md:grid md:grid-cols-2 xl:pt-10">
          <div className="-mt-6 px-4 pt-12 md:mt-4 md:max-w-[370px] md:pl-6 md:pr-0 lg:max-w-[520px] xl:max-w-[650px] xl:px-0">
            <h2 className="mb-6 text-lg lg:pt-16 lg:text-3xl xl:pt-24 xl:text-4xl 3xl:pt-32">
              {data.titleHero}
            </h2>
            <DialogVideo locale={locale} data={data} template="product" />
            <div className="relative z-30 mt-10 lg:mt-12 xl:mt-16">
              <HistoricEnterpriseBadge locale={locale} />
            </div>
          </div>
          <div className="swiper--homepage md:col-span-2 md:-mt-[30%] xl:mt-[calc(-30%-168px)]">
            <Swiper
              modules={[Navigation, A11y, EffectFade]}
              spaceBetween={0}
              navigation
              rewind="true"
              effect="fade"
              slidesPerView={1}
              onSwiper={setSwiper}
            >
              {data.slider.map((slide, i) => (
                <SwiperSlide key={slide.id || i}>
                  {({ isActive }) => (
                    <SlideHomepage
                      locale={locale}
                      slide={slide}
                      isActive={isActive}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="relative z-40 flex justify-end gap-2 px-4 pb-10 md:mt-16 lg:mt-0 xl:pointer-events-none xl:absolute xl:inset-x-5 xl:top-1/2 xl:-translate-y-1/2 xl:justify-between xl:px-0 xl:pb-0 3xl:inset-x-14">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          className="group relative h-[50px] w-[50px] rounded-full bg-black/50 ring-1 ring-white/25 duration-200 hover:bg-orange hover:ring-orange focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-orange motion-reduce:transition-none xl:pointer-events-auto 3xl:h-[60px] 3xl:w-[60px]"
        >
          <span className="sr-only">{translate("prevSlide", locale)}</span>
          <ArrowLeftIcon
            className="absolute--centered h-4 w-4 text-white duration-200 group-hover:text-black motion-reduce:transition-none"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          className="group relative h-[50px] w-[50px] rounded-full bg-black/50 ring-1 ring-white/25 duration-200 hover:bg-orange hover:ring-orange focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-orange motion-reduce:transition-none xl:pointer-events-auto 3xl:h-[60px] 3xl:w-[60px]"
        >
          <span className="sr-only">{translate("nextSlide", locale)}</span>
          <ArrowRightIcon
            className="absolute--centered h-4 w-4 text-white duration-200 group-hover:text-black motion-reduce:transition-none"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
