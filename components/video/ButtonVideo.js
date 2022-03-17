import translate from "lib/locales";
import { PlayIcon } from "@heroicons/react/solid";

export default function ButtonVideo({ locale, data, template = null }) {
  return (
    <>
      <div
        className={`${
          template == "product"
            ? "group relative inline-block items-center space-x-2"
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-2 text-white"
        } z-20`}
      >
        <div className="absolute h-[37px] w-[37px] rounded-full bg-gold duration-300 group-hover:w-[115%] lg:h-[50px] lg:w-[50px]">
          <div className="absolute inset-y-1/2 left-[8px] h-[20px] w-[20px] -translate-y-1/2 rounded-full bg-white lg:left-[14px]"></div>
          <PlayIcon
            className="absolute inset-y-1/2 left-[4px] h-6 w-6 -translate-y-1/2 text-gold lg:left-[5px] lg:h-8 lg:w-8"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 pl-8 text-sm leading-[37px] lg:pl-10 lg:leading-[50px]">
          {translate("play_video", locale)}
        </div>
      </div>
    </>
  );
}
