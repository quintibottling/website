import { renderHTML } from "lib/utils";

export default function Row({ locale, record }) {
  return (
    <>
      <div className="grid gap-2 border-t border-gray/40 pt-4 md:grid-cols-2">
        <div className="uppercase text-white/70">{record.title}</div>
        <div className="text-white">{renderHTML(record.text)}</div>
      </div>
    </>
  );
}
