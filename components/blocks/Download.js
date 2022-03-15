import { ArrowDownIcon } from "@heroicons/react/solid";

export default function download({ locale, record }) {
  return (
    <>
      <div className="align-center flex max-w-[360px] justify-between border border-black px-6 py-4">
        <span>{record.title}</span>
        <ArrowDownIcon
          className="mt-[2px] h-4 w-4 text-orange"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
