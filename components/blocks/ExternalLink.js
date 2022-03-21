import Link from "next/link";
import translate from "lib/locales";
import Button from "components/Button";

export default function ExternalLink({ locale, record, background }) {
  return (
    <>
      <div className="mb-2">
        <Link href={record.link}>
          <a
            title={`Link ${record.link} - ${translate("externaLink", locale)} `}
            className="button"
            target="_blank"
          >
            <Button data={record.cta} background={background} />
          </a>
        </Link>
      </div>
    </>
  );
}
