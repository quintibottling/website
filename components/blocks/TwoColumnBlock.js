import { renderHTML } from "lib/utils";

export default function TwoColumnBlock({ locale, record }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-10 md:gap-x-10 lg:gap-x-24">
        <h2
          className={`${
            record.typeTitle == true
              ? "text-black-dark text-2xl md:col-span-6 lg:text-4xl xl:text-5xl"
              : ""
          }`}
        >
          {record.title}
        </h2>
        <h3 className="md:col-span-5 lg:text-lg">{record.bigText}</h3>
        <div className="text-sm text-black/80 md:col-span-4 lg:text-base">
          {renderHTML(record.smallText)}
        </div>
      </div>
    </>
  );
}
