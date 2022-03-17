import { Image as DatoImage } from "react-datocms";
import Image from "next/image";
import translate from "lib/locales";
import VideoHero from "components/VideoHero";

export default function ProductHero({ locale, data }) {
  return (
    <header>
      <div className="bg-brown text-white">
        <div className="mx-auto -mt-4 px-4 pt-8 lg:px-10 lg:pt-16 xl:container 2xl:px-28">
          <div className="grid gap-3 md:grid-cols-2 lg:gap-6">
            <div className="prefix text-gold-light md:col-span-2">
              {data.model == "product" ? (
                <>{translate("liquid", locale)}</>
              ) : data.model == "tecnology" ? (
                <>{translate("technology", locale)}</>
              ) : null}
            </div>
            <h1 className="text-3xl lg:text-5xl">{data.titleHero}</h1>
            <h2 className="max-w-[530px] opacity-80 lg:text-lg">
              {data.textHero}
            </h2>
          </div>
          {data.model == "product" ? (
            <div
              className={`${data.code} relative z-10 mt-8 h-[110px] w-[110px] xl:h-[140px] xl:w-[140px]`}
            ></div>
          ) : null}
        </div>
      </div>
      <div
        className={`${
          data.model == "product"
            ? "-my-[55px] xl:-my-[70px]"
            : "rounded-b-[20px] bg-brown pt-12 md:rounded-b-[50px]"
        } relative z-0 md:h-[40vw] xl:h-[30vw]`}
      >
        {data.deskImage != null ? (
          <>
            <DatoImage
              className="relative overflow-hidden rounded-b-[20px] md:hidden"
              data={data.mobileImage.responsiveImage}
              alt={data.mobileImage.alt}
              title={data.mobileImage.title}
            />
            <DatoImage
              className="image--cover relative hidden max-h-[700px] overflow-hidden rounded-b-[50px] md:block"
              data={data.deskImage.responsiveImage}
              alt={data.deskImage.alt}
              title={data.deskImage.title}
              layout="fill"
            />
          </>
        ) : data.video.length > 0 && data.model != "tecnology" ? (
          <VideoHero locale={locale} data={data} />
        ) : data.video.length > 0 && data.model == "tecnology" ? (
          <>
            {data.video.map((video) => (
              <div className="image--cover relative h-[380px] overflow-hidden rounded-b-[20px] md:h-full md:rounded-b-[50px]">
                <Image
                  key={video.id}
                  src={video.internalVideo.video.thumbnailUrl}
                  layout="fill"
                  alt={data.title}
                  title={data.title}
                />
                <VideoHero locale={locale} data={data} />
              </div>
            ))}
          </>
        ) : null}
      </div>
    </header>
  );
}
