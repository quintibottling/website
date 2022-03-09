import { renderHTML } from "lib/utils";
import InternalLink from "components/blocks/InternalLink";
import translate from "lib/locales";

export default function FormBlock({ locale, record }) {
  return (
    <div className="grid gap-2 lg:gap-4">
      <div className="text-2xl text-gold lg:text-4xl xl:text-5xl">
        {record.title}
      </div>
      <div className="">{renderHTML(record.text)}</div>
      <InternalLink
        locale={locale}
        background="white"
        data={translate("contact_us", locale)}
        model="contact_page"
        link={translate("contact_url", locale)}
        title={translate("contact_us", locale)}
      />
    </div>
  );
}
