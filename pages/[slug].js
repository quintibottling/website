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
              <PostContent record={block} locale={locale} />
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllEditorialPages, {
    locale: "it",
  });
  const paths = response.editorialPages.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const { slug } = params;
  const response = await fetchDato(
    queries.getEditorialPage,
    { slug, locale },
    preview
  );
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
