import Head from "next/head";
import { renderMetaTags } from "react-datocms";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import ProdutcHero from "components/hero/ProdutcHero";
import TecDetailCard from "components/TecDetailCard";

function TecnologyPage({ locale, data, technology, machines }) {
  let productArray = [];
  technology.tecnologyDetail.map((tDetail, i) => {
    machines.map((m) => {
      m.tecnology.map((t) => {
        if (Object.values(t).indexOf(tDetail.id) > -1) {
          productArray.push(m.product);
        }
      });
    });
    const idsCheck = productArray.map((prod) => prod.id);
    const resultProd = productArray.filter(
      ({ id }, index) => !idsCheck.includes(id, index + 1)
    );
    productArray = [];
  });

  return (
    <Layout
      alts={technology.alts}
      site={data}
      locale={locale}
      model={technology.model}
    >
      <Head>{renderMetaTags(technology.seo.concat(data.site.favicon))}</Head>
      <ProdutcHero data={technology} locale={locale} />
      <section className="mt-10 xl:mt-16">
        <div className="container--small">
          {technology.introBlock.map((block) => {
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
      <section className="rounded-[20px] bg-white lg:rounded-[50px]">
        <div className="container--small">
          <div className="divide-y divide-black/70">
            {technology.tecnologyDetail.map((tDetail, i) => {
              machines.map((m) => {
                m.tecnology.map((t) => {
                  if (Object.values(t).indexOf(tDetail.id) > -1) {
                    productArray.push(m.product);
                  }
                });
              });
              const idsCheck = productArray.map((prod) => prod.id);
              const resultProd = productArray.filter(
                ({ id }, index) => !idsCheck.includes(id, index + 1)
              );
              productArray = [];
              const products =
                resultProd.length > 0 ? resultProd : tDetail.products;
              return (
                <TecDetailCard
                  data={tDetail}
                  products={products}
                  locale={locale}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="">
          <div className="container--small">
            {technology.form.map((block) => {
              return (
                <div key={block.id}>
                  <PostContent
                    record={block}
                    background="white"
                    locale={locale}
                    titlePage={technology.title}
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
      machines: response.allMachines,
      data,
    },
  };
}

export default TecnologyPage;
