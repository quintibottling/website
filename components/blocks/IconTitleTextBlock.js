import Image from "next/image";
import { renderHTML } from "lib/utils";

export default function IconTitleTextBlock({ locale, record }) {
  return (
    <div className="grid content-start gap-2">
      <div
        aria-hidden="true"
        className="relative mx-auto mb-4 h-[180px] w-[180px] lg:mx-0"
      >
        <Image src={record.icon.url} layout="fill" alt={record.title} />
      </div>
      <div className="text-lg lg:text-xl">{record.title}</div>
      <div className="text-sm text-black/80 lg:text-base">
        {renderHTML(record.text)}
      </div>
    </div>
  );
}
