import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import MachineHero from "components/MachineHero";
import MachineCard from "components/MachineCard";
import ComparisonTab from "components/ComparisonTab";
import OptionalCard from "components/OptionalCard";
import translate from "lib/locales";

function MachineDetail({ locale, machine, data, products }) {
  // get category (products) of machine
  const page = machine;
  let category;
  products.map((product) => {
    product.machine.map((machine) => {
      if (Object.values(machine).indexOf(page.id) > -1) {
        category = product;
      }
    });
  });

  return (
    <Layout
      alts={machine.alts}
      site={data}
      locale={locale}
      model={machine.model}
    >
      <Head>{renderMetaTags(machine.seo.concat(data.site.favicon))}</Head>
      <MachineHero locale={locale} data={machine} category={category} />
      <section className="mt-10 xl:mt-16">
        <div className="container--small">
          <h2 className="text-black">{category.title}</h2>
          {/* {product.intro.map((block) => {
            return (
              <div key={block.id}>
                <PostContent
                  record={block}
                  background="light"
                  locale={locale}
                />
              </div>
            );
          })} */}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getAllMachines);
  const routesWithLocales = response.machines.reduce((all, machine) => {
    const { slugs } = machine;
    const slugXLocale = slugs.map(({ locale, slug }) => {
      return { slug, locale };
    });
    return [...all, ...slugXLocale];
  }, []);
  const paths = routesWithLocales.map(({ slug, locale }) => ({
    params: { slug },
    locale,
  }));
  {
    console.log("paths:", paths);
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { product, slug } = params;
  const response = await fetchDato(queries.getMachine, { slug, locale });
  const responseProducts = await fetchDato(queries.getAllProducts, {
    slug,
    locale,
  });
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      products: responseProducts.products,
      machine: response.machine,
      data,
    },
  };
}

export default MachineDetail;
