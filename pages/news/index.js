import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import NewsCard from "components/NewsCard";

function BlogIndex({ blogIndex, posts, site, locale }) {
  return (
    <Layout
      alts={blogIndex.alts}
      site={site}
      locale={locale}
      model={blogIndex.model}
    >
      <Head>{renderMetaTags(blogIndex.seo.concat(site.site.favicon))}</Head>
      <header>
        <div className="-mt-12 rounded-b-[20px] bg-brown pt-12 pb-16 text-white md:rounded-b-[50px]">
          <div className="mx-auto px-4 pt-8 lg:px-10 lg:pt-16 xl:container 2xl:px-28">
            <div className="grid gap-3 md:grid-cols-2 lg:gap-6">
              <div className="prefix text-gold-light md:col-span-2">
                {blogIndex.prefixHero}
              </div>
              <h1 className="text-3xl lg:text-5xl">{blogIndex.titleHero}</h1>
              {blogIndex.textHero && (
                <h2 className="max-w-[530px] opacity-80 lg:text-lg">
                  {blogIndex.textHero}
                </h2>
              )}
            </div>
          </div>
        </div>
      </header>
      <section className="container--small">
        <div className="grid gap-y-6 divide-y divide-pink lg:gap-y-8">
          {posts.map((item) => (
            <NewsCard
              key={item.id}
              data={item}
              locale={locale}
              template="twoColumns"
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const response = await fetchDato(queries.getBlogIndex, { locale });
  const site = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      blogIndex: response.indexNews,
      posts: response.news,
      site,
    },
  };
}

export default BlogIndex;
