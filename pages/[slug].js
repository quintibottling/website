import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import CompanyHero from "components/hero/CompanyHero";

function EditorialPage({ locale, data, page }) {
  return (
    <Layout alts={page.alts} site={data} locale={locale} model={page.model}>
      <Head>{renderMetaTags(page.seo.concat(data.site.favicon))}</Head>
      <CompanyHero data={page} />
      <section>
        {page.body.map((block) => {
          return (
            <div key={block.id}>
              <PostContent record={block} background="light" locale={locale} />
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllEditorialPages);
  const routesWithLocales = response.editorialPages.reduce(
    (all, editorialPage) => {
      const { slugs } = editorialPage;
      const slugXLocale = slugs.map(({ locale, slug }) => {
        return { slug, locale };
      });
      return [...all, ...slugXLocale];
    },
    []
  );
  const paths = routesWithLocales.map(({ slug, locale }) => ({
    params: { slug },
    locale,
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  const response = await fetchDato(queries.getEditorialPage, { slug, locale });
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      page: response.editorialPage,
      data,
    },
  };
}

export default EditorialPage;
