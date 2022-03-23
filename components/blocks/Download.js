import { ArrowDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function download({ locale, record }) {
  return (
    <>
      <Link href={record.file.url}>
        <a title={record.title} className="group">
          <div className="flex max-w-[360px] items-center justify-between border border-black px-6 py-4">
            <span className="duration-200 group-hover:text-orange">
              {record.title}
            </span>
            <ArrowDownIcon
              className="mt-[2px] h-4 w-4 text-orange duration-200 group-hover:scale-110 lg:h-6 lg:w-6"
              aria-hidden="true"
            />
          </div>
        </a>
      </Link>
    </>
  );
}
