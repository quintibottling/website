import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { renderHTML } from "lib/utils";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import MachineHero from "components/hero/MachineHero";
import translate from "lib/locales";
import TecnologyCard from "components/TecnologyCard";
import OptionalCard from "components/OptionalCard";

function MachineDetail({ locale, machine, data, allProducts }) {
  const requestTecnology = [];
  machine.tecnology.map((tecnology) => {
    if (tecnology.request == true) {
      requestTecnology.push(tecnology.title);
    }
  });
  return (
    <Layout
      alts={machine.alts}
      site={data}
      locale={locale}
      model={machine.model}
      product={machine.product.slugProduct}
    >
      <Head>{renderMetaTags(machine.seo.concat(data.site.favicon))}</Head>
      <MachineHero locale={locale} data={machine} category={machine.product} />

      <section className="mt-10 xl:mt-16">
        <div className="container--small">
          {machine.textHero && (
            <div className="text-black lg:text-lg">
              {renderHTML(machine.textIntro)}
            </div>
          )}
          {machine.introBlock.map((block) => {
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
        <div className="rounded-[30pt] bg-white pb-8 lg:rounded-[50pt]">
          <div className="container--small">
            {machine.introFunction.map((block) => {
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
              <div
                className={`${machine.product.code} mx-1 inline-block h-3 w-3`}
              />
              ):
            </div>
            <span className="text-black/80 lg:text-lg">
              {requestTecnology.join(", ")}
            </span>
          </div>
          <div className="mx-auto mb-6 px-4 lg:px-10 xl:container 2xl:px-28">
            {machine.tecnology.map((tecnology, i) => (
              <TecnologyCard
                key={tecnology.id}
                data={tecnology}
                locale={locale}
                machine={machine}
                i={i}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container--small">
          {machine.product.introPlus.map((block) => {
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
            {machine.optional.map((data) => (
              <OptionalCard locale={locale} data={data} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="rounded-[30pt] bg-brown pb-8 lg:rounded-[50pt]">
          <div className="container--small">
            <div className="grid gap-5 md:col-span-full md:gap-x-10 lg:gap-x-12 lg:gap-y-8 xl:gap-x-24">
              <h2 className="text-2xl text-gold-light lg:text-4xl xl:text-5xl">
                {machine.titleDetail}
              </h2>
              <h3 className="text-white lg:text-lg">
                {renderHTML(machine.textDetail)}
              </h3>
            </div>
          </div>
          <div className="container--small-x pb-8 lg:pb-16">
            {machine.detail.map((block) => (
              <div key={block.id}>
                <PostContent record={block} background="dark" locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container--small">
        <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
          <div className="grid content-start gap-5">
            <div className="text-xs uppercase tracking-widest text-gold lg:text-sm">
              {translate("doc", locale)}
            </div>
            <div className="text-lg">{machine.titleDoc}</div>
          </div>
          <div className="mt-2 grid gap-5 lg:mt-0">
            {machine.download.map((block) => (
              <PostContent
                key={block.id}
                record={block}
                background="light"
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="-mb-8 rounded-t-[30px] bg-white pb-8 lg:rounded-t-[50px]">
          <div className="container--small">
            {machine.form.map((block) => {
              return (
                <div key={block.id}>
                  <PostContent
                    record={block}
                    background="white"
                    locale={locale}
                    titlePage={machine.title}
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
  const response = await fetchDato(queries.getAllOilMachines);
  const routesWithLocales = response.oilMachines.reduce((all, machine) => {
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
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  const response = await fetchDato(queries.getMachine, { slug, locale });
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      machine: response.machine,
      // allProducts: response.allProducts,
      data,
    },
  };
}

export default MachineDetail;
