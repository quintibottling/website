import { Image as DatoImage } from "react-datocms";
import translate from "lib/locales";

export default function CompanyHero({ locale, data }) {
  return (
    <header>
      <div className="-mt-4 bg-white">
        <div className="grid gap-4 px-4 pt-10 pb-6 md:pt-14 md:pb-10 lg:pt-20 lg:pb-16">
          <div className="prefix text-gold md:text-center">
            {translate("company", locale)}
          </div>
          <h1 className="max-w-[1080px] text-lg text-brown md:text-center lg:mx-auto lg:text-4xl">
            {data.titleHero}
          </h1>
        </div>
      </div>
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
      />
    </header>
  );
}
