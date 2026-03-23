import PostContent from "components/PostContent";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";

export default function TextImageTwoColumn({ locale, record, background }) {
  if (record.configurator) {
    return (
      <div className="max-w-screen relative ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] flex  items-center justify-center overflow-hidden rounded-[20px] bg-[#B6E0AC] px-6 py-12 md:py-32 xl:rounded-[50px] 2xl:py-48">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={record.banner.responsiveImage.src}
            srcSet={record.banner.responsiveImage.srcSet}
            sizes="100vw"
            alt={record.banner.responsiveImage.alt || ""}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl text-brown md:text-3xl lg:text-4xl">
            {record.title}
          </h2>
          <div className="mt-4 text-sm opacity-80 lg:mt-6 lg:text-base">
            {renderHTML(record.text)}
          </div>
          <div className="mt-6 inline-flex items-center justify-center lg:mt-8">
            {record.link.map((block) => (
              <div key={block.id}>
                <PostContent
                  record={block}
                  background="light"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          record.layout == true ? "md:flex-row-reverse" : ""
        } md:colum grid gap-5 align-top md:flex md:items-start lg:gap-x-12 xl:gap-x-24`}
      >
        <div className="grid gap-5 md:w-1/2 lg:w-5/12">
          <div>
            <div className="inline-block rounded-full bg-pink px-3 py-1 text-xxs text-gold lg:text-sm">
              {record.prefix}
            </div>
          </div>
          <div
            className={`${background == "dark" ? "text-white" : ""} lg:text-xl`}
          >
            {record.title}
          </div>
          <div
            className={`${
              background == "dark" ? "text-white" : ""
            } text-sm opacity-80 lg:text-base`}
          >
            {renderHTML(record.text)}
          </div>
          <div>
            {record.link.map((block) => {
              return (
                <div key={block.id}>
                  <PostContent
                    record={block}
                    background="light"
                    locale={locale}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:w-1/2 lg:w-7/12">
          <DatoImage
            data={record.image.responsiveImage}
            alt={record.image.responsiveImage.alt}
            title={record.image.responsiveImage.title}
          />
        </div>
      </div>
    </>
  );
}
