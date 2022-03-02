import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import CompanyHero from "components/CompanyHero";

function Home({ locale, data, companyPage }) {
  return (
    <Layout
      alts={companyPage.alts}
      site={data}
      locale={locale}
      model={companyPage.model}
    >
      <Head>{renderMetaTags(companyPage.seo.concat(data.site.favicon))}</Head>
      <CompanyHero data={companyPage} />
      <section>
        {companyPage.body.map((block) => {
          return (
            <div key={block.id}>
              {console.log("block:", block)}
              <PostContent record={block} background="light" locale={locale} />
            </div>
          );
        })}
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllCompanyPages);
  const routesWithLocales = response.companyPages.reduce((all, companyPage) => {
    const { slugs } = companyPage;
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

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  const response = await fetchDato(queries.getCompanyPage, { slug, locale });
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      companyPage: response.companyPage,
      data,
    },
  };
}

export default Home;
