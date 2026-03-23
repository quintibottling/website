import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { renderHTML } from "lib/utils";

import PostContent from "components/PostContent";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import MachineHero from "components/hero/MachineHero";
import translate from "lib/locales";
import OptionalCard from "components/OptionalCard";

function MachineDetail({ locale, machine, data, blockContent }) {
  const altsProduct = [
    { locale: "it", value: "olio" },
    { locale: "en", value: "olive-oil" },
  ];
  return (
    <Layout
      alts={machine.alts}
      site={data}
      locale={locale}
      model={machine.model}
      altsProduct={altsProduct}
    >
      <Head>{renderMetaTags(machine.seo.concat(data.site.favicon))}</Head>
      <MachineHero locale={locale} data={machine} category={machine.product} />

      <section className="mt-10 xl:mt-16">
        <div className="container--small grid gap-10 lg:gap-16">
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
      {blockContent && blockContent.length > 0 && (
        <section className="container--standard">
          <div className="grid gap-y-10 xl:gap-y-24">
            {blockContent.map((block) => (
              <div key={block.id}>
                <PostContent
                  record={block}
                  background="light"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>
      )}
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
  const response = await fetchDato(queries.getAllOilMachines, {
    locale: "it",
  });
  const paths = response.oilMachines.map(({ slug }) => ({
    params: { slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale = "it" }) {
  const { slug } = params;
  const response = await fetchDato(queries.getMachine, { slug, locale });
  const data = await fetchDato(queries.site, { locale });
  const configuratorBlock = response.homepage?.blockContent?.filter(
    (block) => block.configurator
  ) || [];
  return {
    props: {
      locale,
      machine: response.machine,
      blockContent: configuratorBlock,
      data,
    },
  };
}

export default MachineDetail;
