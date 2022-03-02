import Image from "next/image";

export default function Partner({ locale, record }) {
  return (
    <div className="mx-auto px-4 pb-12 lg:px-10 lg:pb-16 xl:container xl:pb-24 2xl:px-28">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
        {record.logo.map((item) => (
          <div>
            <div
              className="relative h-[75px] w-full bg-gold-light/20 lg:h-[105px]"
              key={item.id}
            >
              <div className="absolute inset-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2">
                <Image src={item.url} layout="fill" alt={item.title} />
              </div>
            </div>
            <div className="py-2 text-center text-xxs opacity-70 lg:text-xs">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
