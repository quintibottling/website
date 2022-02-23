import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";

export default function Home({ locale, site, home }) {
  return <Layout site={site} locale={locale} model={home.model}></Layout>;
}

export async function getStaticProps({ locale }) {
  const response = await fetchDato(queries.getHomepage, { locale });
  const site = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      home: response.homepage,
      site,
    },
  };
}
