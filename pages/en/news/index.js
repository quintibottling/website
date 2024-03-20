import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import { useState, useEffect } from "react";
import NewsCard from "components/NewsCard";
import { resolveLink } from "lib/utils";
import Pagination from "components/Pagination";

function BlogIndex({ blogIndex, items, itemsForPage, site, locale }) {
  items = items.articles;
  let totals = 0;
  for (const key in items) {
    if (Object.prototype.hasOwnProperty.call(items, key)) {
      totals += items[key].length;
    }
  }
  const numberOfArrays = Object.keys(items).length;
  const router = useRouter();
  const pageSize = itemsForPage;
  const [currentPage, setCurrentPage] = useState(1);
  const results = items[currentPage];

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(router.query.page);
    }
  }, [router.query.page]);

  function changePage(p) {
    router.push(
      `/${locale === "en" ? "/en" : ""}/news?page=${p}#top`,
      undefined,
      {
        shallow: true,
      }
    );
  }

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
                <div className="max-w-[530px] opacity-80 lg:text-lg">
                  {blogIndex.textHero}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <section id="top" className="container--small">
        <div className="grid gap-y-6 divide-y divide-pink lg:gap-y-8">
          {results.map((item) => (
            <NewsCard
              key={item.id}
              data={item}
              locale={locale}
              template="twoColumns"
            />
          ))}
        </div>
        <div className="">
          {totals > pageSize && (
            <Pagination
              currentPage={currentPage}
              totals={totals}
              pageSize={pageSize}
              handleChangePage={(p) => changePage(p)}
              totPages={numberOfArrays}
              locale={locale}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ locale = 'en', preview }) {
  let flag = true;
  let articles = {};
  let page = 0;
  const itemsForPage = 10;

  while (flag) {
    const responseArticles = await fetchDato(queries.getBlogIndex, {
      locale,
      skip: page * itemsForPage,
      first: itemsForPage,
    });
    if (responseArticles?.news?.length > 0) {
      articles[page + 1] = responseArticles.news;
      page++;
    } else {
      flag = false;
    }
  }

  const response = await fetchDato(queries.getBlogIndex, { locale }, preview);
  const site = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      blogIndex: response.indexNews,
      items: { articles },
      site,
      itemsForPage,
    },
  };
}

export default BlogIndex;
