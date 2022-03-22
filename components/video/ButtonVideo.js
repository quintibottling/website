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
        <div className="absolute h-9 w-9 rounded-full bg-gold duration-300 group-hover:w-[115%] lg:h-10 lg:w-10">
          <div className="absolute inset-y-1/2 left-2 h-5 w-5 -translate-y-1/2 rounded-full bg-white"></div>
          <PlayIcon
            className="absolute inset-y-1/2 left-1 h-7 w-7 -translate-y-1/2 text-gold lg:h-8 lg:w-8"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 pl-10 leading-9 lg:leading-10">
          {translate("play_video", locale)}
        </div>
      </div>
    </>
  );
}
