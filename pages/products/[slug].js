import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import ProdutcHero from "components/ProdutcHero";

function Home({ locale, data, product }) {
  return (
    <Layout
      alts={product.alts}
      site={data}
      locale={locale}
      model={product.model}
    >
      <Head>{renderMetaTags(product.seo.concat(data.site.favicon))}</Head>
      <ProdutcHero data={product} locale={locale} />
      <section></section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllProducts);
  const routesWithLocales = response.products.reduce((all, product) => {
    const { slugs } = product;
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
  const response = await fetchDato(queries.getProduct, { slug, locale });
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      product: response.product,
      data,
    },
  };
}

export default Home;
