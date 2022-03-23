import { renderHTML } from "lib/utils";

export default function TextBlock({ locale, record }) {
  return (
    <>
      <div className="grid gap-5 md:col-span-full md:gap-x-10 lg:gap-x-12 lg:gap-y-8 xl:gap-x-24">
        <p className="text-xs lg:text-base">{renderHTML(record.text)}</p>
      </div>
    </>
  );
}
