import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import HeroHP from "components/hero/HeroHp";
import PostContent from "components/PostContent";
import ProductCard from "components/ProductCard";
import InternalLink from "components/blocks/InternalLink";
import NewsCard from "components/NewsCard";

export default function Home({
  locale,
  site,
  home,
  products,
  indexNews,
  news,
}) {
  return (
    <Layout site={site} locale={locale} model={home.model}>
      <Head>{renderMetaTags(home.seo.concat(site.site.favicon))}</Head>
      <h1 className="sr-only">Homepage | Quinti Bottling</h1>
      <HeroHP locale={locale} data={home} />
      <section className="container--small">
        {home.introBlock.map((block) => {
          return (
            <div key={block.id}>
              <PostContent record={block} background="light" locale={locale} />
            </div>
          );
        })}
      </section>
      <section className="rounded-[20px] bg-brown xl:rounded-[50px]">
        <div className="container--small">
          {home.productsBlock.map((block) => {
            return (
              <div key={block.id}>
                <PostContent record={block} background="dark" locale={locale} />
              </div>
            );
          })}
          <div className="md:grid md:grid-cols-2 md:gap-4 lg:gap-8 xl:gap-x-24">
            {products.map((product) => {
              return (
                <div key={products.id}>
                  <ProductCard data={product} locale={locale} />
                </div>
              );
            })}
          </div>
          ;
        </div>
      </section>
      <section className="container--standard">
        <div className="grid gap-y-10 xl:gap-y-24">
          {home.blockContent.map((block) => {
            return (
              <div key={block.id}>
                <PostContent
                  record={block}
                  background="light"
                  locale={locale}
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className="rounded-[20px] bg-pink xl:rounded-[50px]">
        <div className="container--small">
          <div className="grid gap-5 md:grid-cols-3 lg:gap-y-16 lg:gap-x-8">
            {home.serviceBlock.map((block) => {
              return (
                <PostContent
                  key={block.id}
                  record={block}
                  background="yellow"
                  locale={locale}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className="container--small">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl">{home.titleNews}</h2>
          <InternalLink
            locale={locale}
            background="light"
            data={home.ctaNews}
            model={indexNews.model}
            link={indexNews.slug}
            title={indexNews.title}
          />
        </div>
        <div className="grid gap-y-6 divide-y divide-black/40 lg:grid-cols-2 lg:gap-x-8 lg:divide-y-0 xl:gap-x-20">
          {news.map((item) => (
            <div key={item.id}>
              <NewsCard data={item} locale={locale} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const response = await fetchDato(queries.getHomepage, { locale });
  const site = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      home: response.homepage,
      products: response.allProducts,
      indexNews: response.indexNews,
      news: response.news,
      site,
    },
  };
}
