import Link from "next/link";
import { resolveLink } from "lib/utils";
import translate from "lib/locales";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Image as DatoImage } from "react-datocms";

export default function MachineCard({ locale, machine }) {
  return (
    <>
      <Link href={resolveLink("machine", locale, machine.slug)}>
        <a className="group" title={machine.title}>
          <div className="grid gap-2 border border-gold-light/40 bg-white px-4 py-6 md:flex md:flex-row-reverse md:gap-10 lg:p-12">
            <div className="grid md:content-center md:gap-2 lg:w-1/2 xl:gap-x-12">
              <h2 className="text-2xl group-hover:text-orange xl:text-3xl">
                {machine.title}
              </h2>
              <div className="max-w-[400px] text-xs opacity-70 lg:text-xs">
                {machine.textHero}
              </div>
              <div className="mt-2 flex items-center gap-x-2">
                <div className="text-sm tracking-wide xl:text-base">
                  {translate("more", locale)}
                </div>
                <ArrowRightIcon
                  className="h-4 w-4 -rotate-45 text-orange"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <DatoImage
                className="duration-300 group-hover:scale-110"
                data={machine.imageHero.responsiveImage}
                alt={machine.imageHero.alt}
                title={machine.imageHero.title}
                layout=""
              />
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
