import Link from "next/link";
import translate from "lib/locales";

export default function ExternalLink({ locale, record }) {
  return (
    <>
      <div className="mb-2">
        <Link href={record.link}>
          <a
            title={`Link ${record.link} - ${translate("externaLink", locale)} `}
            className="button"
            target="_blank"
          >
            {record.ctaLink}
          </a>
        </Link>
      </div>
    </>
  );
}
