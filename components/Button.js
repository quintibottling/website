import { ArrowRightIcon } from "@heroicons/react/solid";

export default function Button({ locale, data, background }) {
  return (
    <>
      <div className="group relative inline-block items-center space-x-2">
        <div className="absolute h-[37px] w-[37px] rounded-full bg-gold duration-300 group-hover:w-[115%] lg:h-[50px] lg:w-[50px]">
          <ArrowRightIcon
            className="absolute inset-y-1/2 left-[8px] h-4 w-4 -translate-y-1/2 text-white lg:left-[14px]"
            aria-hidden="true"
          />
        </div>
        <div
          className={`${
            background == "light" ? "text-black" : "text-white"
          } relative z-10 pl-8 text-sm leading-[37px] duration-300 group-hover:text-white lg:pl-10 lg:leading-[50px]`}
        >
          {data}
        </div>
      </div>
    </>
  );
}
