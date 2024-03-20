import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import CompanyHero from "components/hero/CompanyHero";

function CompanyPage({ locale, data, companyPage }) {
  return (
    <Layout
      alts={companyPage.alts}
      site={data}
      locale={locale}
      model={companyPage.model}
    >
      <Head>{renderMetaTags(companyPage.seo.concat(data.site.favicon))}</Head>
      <CompanyHero data={companyPage} locale={locale} />
      <section>
        {companyPage.body.map((block) => {
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
  const response = await fetchDato(queries.getAllCompanyPages, {
    locale: 'en',
  });
  const paths = response.companyPages.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = 'en', preview }) {
  const { slug } = params;
  const response = await fetchDato(
    queries.getCompanyPage,
    { slug, locale },
    preview
  );
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      companyPage: response.companyPage,
      data,
    },
  };
}

export default CompanyPage;
