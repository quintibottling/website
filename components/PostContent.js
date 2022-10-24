import Download from "./blocks/Download";
import ExternalLink from "./blocks/ExternalLink.js";
import FormBlock from "./blocks/FormBlock.js";
import Form from "./Form.js";
import GalleryBlock from "./blocks/GalleryBlock.js";
import GallerySlide from "./blocks/GallerySlide.js";
import IconTitleTextBlock from "./blocks/IconTitleTextBlock.js";
import ImageBlock from "./blocks/ImageBlock.js";
import InternalLink from "./blocks/InternalLink.js";
import Partner from "./blocks/Partner.js";
import Row from "./blocks/Row.js";
import Section from "./blocks/Section.js";
import TextBlock from "./blocks/TextBlock.js";
import TextImageTwoColumn from "./blocks/TextImageTwoColumn.js";
import TitleTextBlock from "./blocks/TitleTextBlock.js";
import TwoColumnBlock from "./blocks/TwoColumnBlock.js";
import CertificationBlock from "./blocks/CertificationBlock.js";
import VideoBlock from "./blocks/VideoBlock.js";
import FunctionsPlusBlock from "./blocks/FunctionsPlusBlock.js";

export default function PostContent({ record, locale, background, titlePage }) {
  switch (record.model) {
    case "download":
      return <Download record={record} locale={locale} />;
    case "external_link":
      return (
        <ExternalLink record={record} locale={locale} background={background} />
      );
    case "form_block":
      return (
        <div className="grid place-content-start md:grid-cols-2 md:items-start md:gap-10 lg:gap-20">
          <FormBlock record={record} locale={locale} />
          <Form locale={locale} titlePage={titlePage} />
        </div>
      );
    case "gallery_block":
      return <GalleryBlock record={record} locale={locale} />;
    case "gallery_slide":
      return <GallerySlide record={record} locale={locale} />;
    case "icon_title_text_block":
      return <IconTitleTextBlock record={record} locale={locale} />;
    case "image_block":
      return <ImageBlock record={record} locale={locale} />;
    case "partner":
      return <Partner record={record} locale={locale} />;
    case "internal_link":
      return (
        <InternalLink
          data={record.label}
          title={record.title}
          locale={locale}
          link={record.link.slug}
          background={background}
          model={record.link.model}
        />
      );
    case "row":
      return <Row record={record} locale={locale} />;
    case "section":
      return <Section record={record} locale={locale} />;
    case "text_block":
      return <TextBlock record={record} locale={locale} />;
    case "text_image_two_column":
      return (
        <TextImageTwoColumn
          record={record}
          background={background}
          locale={locale}
        />
      );
    case "title_text_block":
      return (
        <TitleTextBlock
          record={record}
          locale={locale}
          background={background}
        />
      );
    case "two_column_block":
      return <TwoColumnBlock record={record} locale={locale} />;
    case "certification_block":
      return <CertificationBlock record={record} locale={locale} />;
    case "video_block":
      return <VideoBlock record={record} locale={locale} />;
    case "functions_plus_block":
      return <FunctionsPlusBlock record={record} locale={locale} />;
    default:
      return record.model;
  }
}
