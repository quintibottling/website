import { renderHTML, resolveLink } from "lib/utils";
import Link from "next/link";
import translate from "lib/locales";

import PostContent from "components/PostContent";

export default function TecDetailCard({ data, products, locale }) {
  return (
    <>
      <div className="py-6 lg:py-10">
        <div className="grid gap-6 md:grid-cols-12 md:gap-12">
          <div className="grid gap-3 md:col-span-8 lg:gap-5">
            <h2 className="text-xl lg:text-2xl">{data.title}</h2>
            <div className="text-xs text-black/70 lg:text-base">
              {renderHTML(data.description)}
            </div>
          </div>
          <div className="grid content-start gap-3 md:col-span-4">
            <div className="text-xs">{translate("compatible", locale)}</div>
            <div className="">
              {products.map((p) => (
                <Link key={p.id} href={resolveLink(p.model, locale, p.slug)}>
                  <a title={p.title} className="group grid py-1">
                    <div className="flex items-center gap-x-2">
                      {console.log("p.model:", p.model)}
                      <div className={`${p.code} h-[12px] w-[12px]`}></div>
                      <div className="text-xs group-hover:text-orange">
                        {p.title}
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {data.multimedia.length > 0 && (
          <div className="mt-6 lg:mt-10">
            {data.multimedia.map((block, i) => (
              <PostContent locale={locale} record={block} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
