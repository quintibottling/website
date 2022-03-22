import PostContent from "components/PostContent";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";

export default function TextImageTwoColumn({ locale, record, background }) {
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
