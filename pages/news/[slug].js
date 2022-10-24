import Head from "next/head";
import Link from "next/link";
import { renderMetaTags } from "react-datocms";

import translate from "lib/locales";
import NewsCard from "components/NewsCard";
import PostContent from "components/PostContent";
import Layout from "components/Layout";
import NewsHero from "components/hero/NewsHero";
import ShareToSocial from "components/ShareToSocial";
import { useRouter } from "next/router";

import * as queries from "lib/queries";
import fetchDato from "lib/dato";

function BlogPost({ blogPost, allNews, site, locale }) {
  const router = useRouter();
  const path = Object(router.asPath);
  const lang = locale == "it" ? "" : `/${locale}`;
  const url = `https://quintibottling.com${lang}${path}`;

  return (
    <>
      <Layout
        alts={blogPost.alts}
        site={site}
        locale={locale}
        model={blogPost.model}
      >
        <Head>{renderMetaTags(blogPost.seo.concat(site.site.favicon))}</Head>
        <NewsHero data={blogPost} locale={locale} />
        <section className="rounded-b-[20px] bg-white lg:rounded-b-[50px]">
          <div className="container--small">
            <div className="grid gap-4 md:grid-cols-6">
              <div className="md:col-span-5 md:grid md:gap-4 md:pr-12">
                {blogPost.body.map((block) => {
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
              <div className="md:sticky md:top-0">
                <div className="border-t border-pink pt-1 md:col-span-1">
                  <ShareToSocial locale={locale} url={url} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container--small">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl">
              {translate("otherNews", locale)}
            </h2>
          </div>
          <div className="grid gap-y-6 divide-y divide-black/40 lg:grid-cols-2 lg:gap-x-8 lg:divide-y-0 xl:gap-x-20">
            {allNews.map((item) => (
              <div key={item.id}>
                <NewsCard data={item} locale={locale} />
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllBlogPosts);
  const routesWithLocales = response.allNews.reduce((all, blogPost) => {
    const { slugs } = blogPost;
    const slugXLocale = slugs.map(({ locale, slug }) => {
      return { slug, locale };
    });
    return [...all, ...slugXLocale];
  }, []);
  const paths = routesWithLocales.map(({ slug, locale }) => ({
    params: { slug },
    locale,
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale, preview }) {
  const { slug } = params;
  const site = await fetchDato(queries.site, { locale });
  const response = await fetchDato(
    queries.getBlogPost,
    { slug, locale },
    preview
  );
  const responseBlogIndex = await fetchDato(queries.getBlogIndex, { locale });
  return {
    props: {
      blogPost: response.news,
      site,
      locale,
      allNews: response.allNews,
    },
  };
}

export default BlogPost;
