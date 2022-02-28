import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image as DatoImage } from "react-datocms";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Gallery({ locale, record }) {
  const numberSliders = record.sliders.length;
  return (
    <>
      <div
        className={`${
          record.layout == "full" ? "" : "container--custom"
        } relative`}
      >
        <div
          className={`${record.background == "dark" ? "bg-brown" : ""} ${
            record.layout == "full"
              ? ""
              : "border-t border-brown md:py-8 md:px-16 xl:py-24"
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={0}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {record.sliders.map((slider, i) => (
              <div key={slider.key}>
                <SwiperSlide>
                  <div className="relative h-[470px] lg:h-[600px]">
                    {record.layout == "full" && (
                      <>
                        <div className="absolute inset-0 z-20 bg-black/40" />
                        <div className="absolute top-1/2 z-30 max-w-[800px] -translate-y-1/2 px-4 text-center font-serif text-base uppercase md:text-xl lg:left-1/2 lg:w-full lg:-translate-x-1/2 lg:px-0">
                          {slider.text}
                        </div>
                      </>
                    )}
                    <DatoImage
                      className="image--cover lg:hidden"
                      data={slider.mobileImage.responsiveImage}
                      alt={slider.mobileImage.responsiveImage.alt}
                      title={slider.mobileImage.responsiveImage.title}
                      layout="fill"
                    />
                    <DatoImage
                      className="image--cover hidden lg:block"
                      data={slider.deskImage.responsiveImage}
                      alt={slider.deskImage.responsiveImage.alt}
                      title={slider.deskImage.responsiveImage.title}
                      layout="fill"
                    />
                  </div>
                  {record.layout == "standard" && (
                    <>
                      <div className="px-4 py-4 md:flex md:items-start md:gap-2 md:px-0">
                        <div className="text-yellow md:w-[120px] md:text-base xl:absolute">
                          0{i + 1}
                          <span className="pl-1 text-white">
                            / 0{numberSliders}
                          </span>
                        </div>
                        <div className="text-sm md:text-base xl:w-full xl:px-20">
                          {slider.text}
                        </div>
                      </div>
                    </>
                  )}
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
