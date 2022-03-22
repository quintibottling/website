import { renderHTML } from "lib/utils";

export default function TwoColumnBlock({ locale, record }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-10 md:gap-x-10 lg:gap-8 lg:gap-x-24">
        <div className="md:col-span-8">
          {record.typeTitle == true ? (
            <h2 className="text-black-dark text-2xl lg:text-4xl xl:text-5xl">
              {record.title}
            </h2>
          ) : (
            <h2 className="prefix text-gold">{record.prefix}</h2>
          )}
        </div>
        <h3 className="md:col-span-5 lg:text-lg">
          {renderHTML(record.bigText)}
        </h3>
        <div className="text-sm text-black/80 md:col-span-4 lg:text-base">
          {renderHTML(record.smallText)}
        </div>
      </div>
    </>
  );
}
