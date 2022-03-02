import { Image as DatoImage } from "react-datocms";
import translate from "lib/locales";

export default function ProductHero({ locale, data }) {
  return (
    <header>
      <div className="bg-brown text-white">
        <div className="mx-auto -mt-4 px-4 pt-8 lg:px-10 lg:pt-16 xl:container 2xl:px-28">
          <div className="grid gap-3 md:grid-cols-2 lg:gap-6">
            <div className="prefix text-gold-light md:col-span-2">
              {translate("liquid", locale)}
            </div>
            <h1 className="text-3xl lg:text-5xl">{data.titleHero}</h1>
            <h2 className="max-w-[530px] opacity-80 lg:text-lg">
              {data.textHero}
            </h2>
          </div>
          <div
            className={`${data.code} relative z-10 mt-8 h-[110px] w-[110px] xl:h-[140px] xl:w-[140px]`}
          ></div>
        </div>
      </div>
      <div className="relative z-0 -my-[55px] md:h-[30vw] xl:-my-[70px]">
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
      </div>
    </header>
  );
}
