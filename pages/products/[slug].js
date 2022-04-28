import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { getCommon } from "lib/utils";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import ProdutcHero from "components/hero/ProdutcHero";
import MachineCard from "components/hero/MachineCard";
import ComparisonTab from "components/ComparisonTab";
import OptionalCard from "components/OptionalCard";
import translate from "lib/locales";

function ProductDetail({ locale, data, product, allTecnology, machines }) {
  const machineCheck = [];

  // Check machines of the products
  machines.map((machine) => {
    if (Object.values(machine.product).indexOf(product.id) > -1) {
      machineCheck.push(machine);
    }
  });

  // remove duplicate array from object
  const allTecnologyArray = [];
  machineCheck.map((machine) =>
    machine.tecnology.map((tecnology) => {
      allTecnologyArray.push(tecnology);
    })
  );
  const uniqueIds = new Set();
  const resultAllTecnologyArray = allTecnologyArray.filter((element) => {
    const isDuplicate = uniqueIds.has(element.id);
    uniqueIds.add(element.id);
    if (!isDuplicate) {
      return true;
    }
  });

  const orderedTecnology = getCommon(allTecnology, resultAllTecnologyArray);

  // remove duplicate array from object
  const allOptionalArray = [];
  machineCheck.map((machine) =>
    machine.optional.map((optional) => {
      allOptionalArray.push(optional);
    })
  );
  const idsOpt = allOptionalArray.map((o) => o.id);
  const filtered = allOptionalArray.filter(
    ({ id }, index) => !idsOpt.includes(id, index + 1)
  );

  return (
    <Layout
      alts={product.alts}
      site={data}
      locale={locale}
      model={product.model}
    >
      <Head>{renderMetaTags(product.seo.concat(data.site.favicon))}</Head>
      <ProdutcHero data={product} locale={locale} />
      <section className="mt-10 xl:mt-16">
        <div className="container--small">
          {product.intro.map((block) => {
            return (
              <div key={block.id}>
                <PostContent
                  record={block}
                  background="light"
                  locale={locale}
                />
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <div className="container--small-x">
          <div className="grid gap-7 pb-12">
            {machineCheck.map((machine) => (
              <MachineCard
                locale={locale}
                machine={machine}
                productSlug={product.slug}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="rounded-t-[30px] bg-white lg:rounded-t-[50px]">
          <div className="container--small">
            {product.introTab.map((block) => {
              return (
                <div key={block.id}>
                  <PostContent
                    record={block}
                    background="white"
                    locale={locale}
                  />
                </div>
              );
            })}
            <div className="font-bold text-black/80 lg:text-lg">
              {translate("compoment-no-remove", locale)} (
              <div className={`${product.code} mx-1 inline-block h-3 w-3`} />
              ):
            </div>
            {/* <span className="text-black/80 lg:text-lg">
              {uniqueArray.join(", ")}
            </span> */}
          </div>
        </div>
        <div className="rounded-b-[30px] bg-white pb-12 lg:rounded-b-[50px] lg:pb-16 xl:pb-20">
          <ComparisonTab
            locale={locale}
            machines={machineCheck}
            product={product}
            resultAllTecnologyArray={orderedTecnology}
          />
        </div>
      </section>
      <section>
        <div className="container--small">
          {product.introPlus.map((block) => {
            return (
              <div key={block.id}>
                <PostContent
                  record={block}
                  background="light"
                  locale={locale}
                />
              </div>
            );
          })}
          <div className="grid divide-y divide-pink md:grid-cols-3 md:gap-x-4 md:gap-y-4 md:divide-y-0 lg:gap-x-4 xl:gap-x-10">
            {filtered.map((data) => (
              <OptionalCard locale={locale} data={data} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="-mb-8 rounded-t-[30px] bg-white pb-8 lg:rounded-t-[50px]">
          <div className="container--small">
            {product.introForm.map((block) => {
              return (
                <div key={block.id}>
                  <PostContent
                    record={block}
                    background="white"
                    locale={locale}
                    titlePage={product.title}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
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
      allTecnology: response.allTecnology,
      machines: response.allMachines,
      data,
    },
  };
}

export default ProductDetail;
