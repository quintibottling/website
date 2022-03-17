import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import ProdutcHero from "components/hero/ProdutcHero";

function TecnologyPage({ locale, data, technology }) {
  return (
    <Layout
      alts={technology.alts}
      site={data}
      locale={locale}
      model={technology.model}
    >
      <Head>{renderMetaTags(technology.seo.concat(data.site.favicon))}</Head>
      <ProdutcHero data={technology} />
      {/* <section>
        {technology.body.map((block) => {
          return (
            <div key={block.id}>
              <PostContent record={block} background="light" locale={locale} />
            </div>
          );
        })}
      </section> */}
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllTechnologies);
  const routesWithLocales = response.tecnologies.reduce((all, tecnology) => {
    const { slugs } = tecnology;
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
  const response = await fetchDato(queries.getTecnology, { slug, locale });
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      technology: response.tecnology,
      data,
    },
  };
}

export default TecnologyPage;
