import Image from "next/image";

export default function IconTitleTextBlock({ locale, record }) {
  return (
    <div className="grid content-start gap-2">
      <div
        aria-hidden="true"
        className="relative mx-auto mb-1 h-[250px] w-[250px] lg:mx-0"
      >
        <Image src={record.icon.url} layout="fill" alt={record.title} />
      </div>
      <div className="text-lg lg:text-xl">{record.title}</div>
      <div className="text-sm text-black/80 lg:text-base">{record.title}</div>
    </div>
  );
}
