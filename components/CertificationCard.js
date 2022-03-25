import Image from "next/image";
import { renderHTML } from "lib/utils";

export default function CertificationCard({ locale, item }) {
  return (
    <>
      <div>
        <div className="relative grid gap-4 rounded-[20px] bg-[#F2F0EB] p-4 py-6 lg:px-8 lg:py-12">
          <div className="relative h-[105px] w-[105px] xl:h-[150px] xl:w-[150px]">
            <Image
              src={item.logo.url}
              layout="fill"
              alt={item.logo.alt}
              title={item.logo.title}
            />
          </div>
          <h3 className="text-lg text-gold lg:mt-6 lg:text-2xl">
            {item.title}
          </h3>
          <div className="opacity-9 text-sm lg:text-base">
            {renderHTML(item.text)}
          </div>
        </div>
      </div>
    </>
  );
}
