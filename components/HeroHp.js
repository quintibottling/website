import { Navigation, A11y, EffectFade } from "swiper";
// import { useRef } from "react";
import DialogVideo from "./DialogVideo";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import SlideHomepage from "./blocks/SlideHomepage";

export default function HeroHp({ locale, data }) {
  // const videoUrl = data.video.video.mp4Url;
  const numberSliders = data.slider.length;
  return (
    <div className="rounded-b-[50pt] bg-brown text-white">
      <div className="xl:pl-[calc((100vw-1280px)/2)] 2xl:pl-[calc((100vw-1350px)/2)] 3xl:container 3xl:mx-auto 3xl:pl-0">
        <div className="md:-mt-6 md:grid md:grid-cols-2">
          <div className="-mt-6 px-4 pt-12 md:mt-4 md:max-w-[370px] md:pl-6 md:pr-0 lg:max-w-[520px] xl:max-w-[650px] xl:px-0">
            <h2 className="mb-6 text-lg lg:pt-16 lg:text-3xl xl:text-4xl">
              {data.titleHero}
            </h2>
            <DialogVideo locale={locale} data={data} />
          </div>
          <div className="swiper--homepage md:col-span-2 md:-mt-[30%]">
            <Swiper
              modules={[Navigation, A11y, EffectFade]}
              spaceBetween={0}
              navigation
              effect="fade"
              slidesPerView={1}
            >
              {data.slider.map((slide, i) => (
                <SwiperSlide>
                  {({ isActive }) => (
                    <SlideHomepage
                      locale={locale}
                      slide={slide}
                      i={i}
                      numberSliders={numberSliders}
                      isActive={isActive}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
