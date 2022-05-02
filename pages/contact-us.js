import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import Link from "next/link";

import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import PostContent from "components/PostContent";
import ProdutcHero from "components/hero/ProdutcHero";
import translate from "lib/locales";
import { renderHTML } from "lib/utils";

export default function ContactPage({ locale, site, page, info }) {
  return (
    <Layout site={site} locale={locale} model={page.model}>
      <Head>{renderMetaTags(page.seo.concat(site.site.favicon))}</Head>
      <ProdutcHero data={page} />
      <section className="container--small">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-28 2xl:pt-20">
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 lg:text-lg">
            <div className="prefix mb-2 text-gold lg:col-span-2">
              {translate("contacts", locale)}
            </div>
            <div className="lg:col-span-2">
              <div className="mb-1 text-sm text-black/80 lg:text-base">
                {translate("address", locale)}
              </div>
              <p>{renderHTML(info.address)}</p>
            </div>
            <div>
              <div className="mb-1 text-sm text-black/80 lg:text-base">
                {translate("phone", locale)}
              </div>
              <Link href={`tel:${info.phone}`}>
                <a title="tel" className="hover:text-orange">
                  <span>{info.phone}</span>
                </a>
              </Link>
            </div>
            <div>
              <div className="mb-1 text-sm text-black/80 lg:text-base">
                Email
              </div>
              <Link href={`mailto:${info.email}`}>
                <a title="Email" className="hover:text-orange">
                  <p>{info.email}</p>
                </a>
              </Link>
            </div>
            <div>
              <div className="mb-1 text-sm text-black/80 lg:text-base">
                After Sales
              </div>
              <Link href={`tel:${info.afterSale}`}>
                <a title="tel" className="hover:text-orange">
                  <span>{info.afterSale}</span>
                </a>
              </Link>
            </div>
            <div>
              <div className="mb-1 text-sm text-black/80 lg:text-base">
                Social Media
              </div>
              {info.social.map((s) => (
                <Link href={s.link}>
                  <a
                    title={s.title}
                    target="_blank"
                    className="block duration-200 hover:text-orange"
                  >
                    {s.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="prefix mb-4 text-gold">{page.prefix}</div>
            <div className="my-2 text-lg lg:my-4 lg:pt-4">
              {renderHTML(page.text)}
            </div>
            <div className="mt-6">
              {page.linkWork.map((block) => {
                return (
                  <PostContent
                    key={block.id}
                    record={block}
                    background="light"
                    locale={locale}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="rounded-[20pt] bg-white lg:rounded-[50pt]">
          <div className="container--small">
            {page.dealerBlock.map((block) => (
              <PostContent key={block.id} record={block} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container--small">
          {page.form.map((block) => (
            <PostContent key={block.id} record={block} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const response = await fetchDato(queries.getContactPage, { locale });
  const site = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.contactPage,
      info: response.info,
      site,
    },
  };
}
