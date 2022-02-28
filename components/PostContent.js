import Download from "./blocks/Download";
import ExternalLink from "./blocks/ExternalLink.js";
import FormBlock from "./blocks/FormBlock.js";
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

export default function PostContent({ record, locale, background }) {
  switch (record.model) {
    case "download":
      return <Download record={record} locale={locale} />;
    case "external_link":
      return <ExternalLink record={record} locale={locale} />;
    case "form_block":
      return <FormBlock record={record} locale={locale} />;
    case "gallery_block":
      return <GalleryBlock record={record} locale={locale} />;
    case "gallery_slide":
      return <GallerySlide record={record} locale={locale} />;
    case "icon_title_text_block":
      return <IconTitleTextBlock record={record} locale={locale} />;
    case "image_block":
      return <ImageBlock record={record} locale={locale} />;
    case "external_link_block":
      return <Partner record={record} locale={locale} />;
    case "internal_link":
      return (
        <InternalLink record={record} locale={locale} background={background} />
      );
    case "row":
      return <Row record={record} locale={locale} />;
    case "section":
      return <Section record={record} locale={locale} />;
    case "text_block":
      return <TextBlock record={record} locale={locale} />;
    case "text_image_two_column":
      return <TextImageTwoColumn record={record} locale={locale} />;
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
  }
}
