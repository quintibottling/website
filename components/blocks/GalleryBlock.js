import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image as DatoImage } from "react-datocms";
import "swiper/css";
import "swiper/css/navigation";

export default function GalleryBlock({ locale, record }) {
  return (
    <div className="blockGallery">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        navigation
        slidesPerView={1}
      >
        {record.sliders.map((slider, i) => (
          <div key={slider.key}>
            <SwiperSlide>
              <div className="relative h-[270px] max-h-[600px] w-full overflow-hidden rounded-t-[20px] md:h-[40vw]">
                <DatoImage
                  className="image--cover w-full lg:block"
                  data={slider.image.responsiveImage}
                  alt={slider.image.responsiveImage.alt}
                  title={slider.image.responsiveImage.title}
                  layout="fill"
                />
              </div>
              {slider.description && (
                <div className="pt-2 text-center text-xs text-black/70 lg:pt-8 lg:text-base">
                  {slider.description}
                </div>
              )}
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
}
