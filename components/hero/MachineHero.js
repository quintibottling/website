import { Navigation, A11y, EffectFade } from "swiper";
// import { useRef } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import SlideMachine from "components/blocks/SlideMachine";

export default function MachineHero({ locale, data, category }) {
  const numberSliders = data.galleryHero.length;
  return (
    <div
      className={`${category.color} relative rounded-b-[20pt] text-white xl:rounded-b-[50pt]`}
    >
      <div className="container -mt-20 px-4 pt-24 pb-10 md:px-6 md:pb-24 lg:pb-36">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5 lg:max-w-[300px]">
            <h1 className="mb-2 text-3xl lg:pt-10 lg:text-3xl xl:text-5xl">
              {data.titleHero}
            </h1>
            <h2 className="text-sm opacity-80 lg:mt-2 xl:text-base">
              {data.textHero}
            </h2>
          </div>
          <div className="swiper--homepage lg:col-span-7">
            <Swiper
              modules={[Navigation, A11y, EffectFade]}
              spaceBetween={0}
              navigation
              rewind="true"
              effect="fade"
              slidesPerView={1}
            >
              {data.galleryHero.map((slide, i) => (
                <SwiperSlide>
                  {({ isActive }) => (
                    <SlideMachine
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
          <div
            className={`${category.code} absolute -bottom-[50px] h-[100px] w-[100px] lg:left-10 lg:h-[215px] lg:w-[215px] xl:left-16 2xl:left-[calc(((100vw-1350px)/2)+7rem)]`}
          ></div>
        </div>
      </div>
    </div>
  );
}
