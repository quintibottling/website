import { ArrowRightIcon } from "@heroicons/react/solid";

export default function Button({ data, background, template = null }) {
  return (
    <>
      <div className="group relative inline-block items-center space-x-2">
        <div className="absolute h-9 w-9 rounded-full bg-gold duration-300 group-hover:w-[115%] lg:h-10 lg:w-10">
          <ArrowRightIcon
            className={`${
              template == "reverse" ? "rotate-180" : ""
            } absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2 text-white lg:left-2 lg:h-6 lg:w-6`}
            aria-hidden="true"
          />
        </div>
        <div
          className={`${
            background == "dark" ? "text-white" : "text-black"
          } relative z-10 pl-10 text-sm leading-9 duration-300 group-hover:text-white lg:pl-10 lg:leading-10`}
        >
          {data}
        </div>
      </div>
    </>
  );
}
