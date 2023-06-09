import { Image as DatoImage } from "react-datocms";
import Image from "next/image";
import translate from "lib/locales";
import VideoHero from "components/VideoHero";

export default function ProductHero({ locale, data }) {
  return (
    <header>
      <div className="bg-brown text-white">
        <div className="mx-auto -mt-4 px-4 pt-8 md:pb-10 lg:px-10 lg:pb-16 lg:pt-16 xl:container 2xl:px-28">
          <div className="grid gap-3 md:grid-cols-2 lg:gap-6">
            <div className="prefix text-gold-light md:col-span-2">
              {data.model == "product" ? (
                <>{translate("liquid", locale)}</>
              ) : data.model == "tecnology" ? (
                <>{translate("technology", locale)}</>
              ) : data.model == "contact_page" ? (
                <>{data.title}</>
              ) : null}
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl">
              {data.titleHero}
            </h1>
            <h2 className="max-w-[530px] opacity-80 lg:text-lg">
              {data.textHero}
            </h2>
          </div>
          {data.model == "product" ? (
            <div
              className={`${data.code} relative z-10 mt-8 -mb-12 h-[110px] w-[110px] xl:h-40 xl:w-40`}
            ></div>
          ) : null}
        </div>
      </div>
      <div
        className={`${
          data.model == "product"
            ? "-my-[55px] xl:-my-[70px]"
            : "rounded-b-[20px] bg-brown pt-12 md:rounded-b-[50px] lg:pt-24"
        } relative z-0 max-h-[500px] md:h-[40vw] xl:h-[40vw]`}
      >
        {data.deskImage != null ? (
          <>
            <DatoImage
              className="relative overflow-hidden rounded-b-[20px] md:hidden"
              data={data.mobileImage.responsiveImage}
              alt={data.mobileImage.responsiveImage.alt}
              title={data.mobileImage.responsiveImage.title}
            />
            <div className="image--cover relative hidden h-full max-h-[500px] overflow-hidden rounded-b-[50px] md:block xl:h-[30vw]">
              <DatoImage
                data={data.deskImage.responsiveImage}
                alt={data.deskImage.responsiveImage.alt}
                title={data.deskImage.responsiveImage.title}
                layout="fill"
              />
            </div>
          </>
        ) : data.video?.length > 0 && data.model != "tecnology" ? (
          <VideoHero locale={locale} data={data} />
        ) : data.video?.length > 0 && data.model == "tecnology" ? (
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
                <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </header>
  );
}
