import { Image as DatoImage } from "react-datocms";

export default function ImageBlock({ record }) {
  return (
    <>
      <div className="">
        <DatoImage
          className="w-100"
          data={record.image.responsiveImage}
          alt={record.image.responsiveImage.alt}
          title={record.image.responsiveImage.title}
          layout="responsive"
        />
      </div>
    </>
  );
}
