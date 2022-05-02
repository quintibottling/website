import { Image as DatoImage } from "react-datocms";
import translate from "lib/locales";

export default function CompanyHero({ locale, data }) {
  return (
    <header>
      <div className="-mt-4 bg-white">
        <div className="grid gap-4 px-4 pt-10 pb-6 md:pt-14 md:pb-10 lg:pt-20 lg:pb-16">
          <div className="prefix text-gold md:text-center">
            {data.model == "company_page" ? (
              <>{translate("company", locale)}</>
            ) : (
              <>{data.title}</>
            )}
          </div>
          <h1 className="max-w-[1080px] text-lg text-brown md:text-center lg:mx-auto lg:text-4xl">
            {data.titleHero}
          </h1>
        </div>
      </div>
      <DatoImage
        className="relative overflow-hidden rounded-b-[20px] md:hidden"
        data={data.mobileImage.responsiveImage}
        alt={data.mobileImage.responsiveImage.alt}
        title={data.mobileImage.responsiveImage.title}
      />
      <div className="image--cover relative hidden h-[50vw] max-h-[500px] overflow-hidden rounded-b-[50px] md:block xl:h-[30vw]">
        <DatoImage
          data={data.deskImage.responsiveImage}
          alt={data.deskImage.responsiveImage.alt}
          title={data.deskImage.responsiveImage.title}
          layout="fill"
        />
      </div>
    </header>
  );
}
