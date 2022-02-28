import Link from "next/link";
import { resolveLink } from "lib/utils";
import Button from "components/Button";

export default function InternalLink({ locale, record, background }) {
  return (
    <>
      <Link href={resolveLink(record.link.model, locale, record.link.slug)}>
        <a title={`Link ${record.link.title}`}>
          <Button data={record.label} background={background} />
        </a>
      </Link>
    </>
  );
}
