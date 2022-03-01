import Link from "next/link";
import { resolveLink } from "lib/utils";
import Button from "components/Button";

export default function InternalLink({
  locale,
  background,
  data,
  model,
  link,
  title,
}) {
  return (
    <>
      <Link href={resolveLink(model, locale, link)}>
        <a title={`Link ${title}`}>
          <Button data={data} background={background} />
        </a>
      </Link>
    </>
  );
}
