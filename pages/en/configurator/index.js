import Head from "next/head";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import { renderMetaTags } from "react-datocms";
import { Image as DatoImage } from "react-datocms";
import { useMemo } from "react";

import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";

const TIER_COLORS = {
  start: "border-green",
  intermediate: "border-gold",
  pro: "border-orange",
};

export default function ConfiguratoreIndex({
  locale,
  site,
  machines,
  configurator,
}) {
  const allFunctions = useMemo(() => {
    const fnMap = new Map();
    machines.forEach((machine) => {
      machine.functions.forEach((fn) => {
        if (!fnMap.has(fn.id)) {
          fnMap.set(fn.id, { id: fn.id, title: fn.title });
        }
      });
    });
    return Array.from(fnMap.values());
  }, [machines]);

  return (
    <Layout site={site} locale={locale} model="conf_page" alts={configurator.alts}>
      <Head>{renderMetaTags(configurator.seo.concat(site.site.favicon))}</Head>
      <div className="min-h-screen">
        <div className="container--standard">
          <div className="mb-6 md:flex md:gap-12">
            <div className="mb-6 lg:w-1/2">
              <h1 className="text-2xl font-semibold text-orange lg:text-2xl xl:text-3xl">
                {configurator.title}
              </h1>
              <p className="mx-auto max-w-2xl text-2xl font-semibold xl:text-3xl">
                {configurator.titleHero}
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: configurator.text }}
              className="lg:w-1/2"
            />
          </div>
          <div className="xl:gap-18 mx-auto grid max-w-[1300px] gap-6 pt-12 md:grid-cols-3 lg:gap-16">
            {machines.map((machine) => {
              const colorClass = TIER_COLORS[machine.slug] || "border-gold";
              const machineFnIds = new Set(
                machine.functions.map((fn) => fn.id),
              );

              return (
                <Link key={machine.id} href={`/en/configurator/${machine.slug}`}>
                  <a
                    className={`group block overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg ${colorClass}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-md text-black lg:text-lg">
                            Diamond Oil
                          </h3>
                          <h4
                            className={`mb-4 text-xl font-bold md:text-base lg:text-lg`}
                          >
                            {machine.title.toUpperCase()}
                          </h4>
                        </div>
                        <div className="rounded-full bg-orange p-4 md:p-2 lg:p-4">
                          <div className="flex items-center gap-2 text-white transition-colors">
                            <ArrowRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                      <DatoImage
                        data={machine.previewImage.responsiveImage}
                        alt={machine.previewImage.responsiveImage.alt}
                        title={machine.previewImage.responsiveImage.title}
                      />
                      {machine.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: machine.description,
                          }}
                          className="py-4 text-xxs text-black/60"
                        />
                      )}
                      <div className="text-xxs font-bold text-black/80">
                        Funzioni
                      </div>
                      <div className="my-4 space-y-2">
                        {allFunctions.map((fn) => {
                          const hasFn = machineFnIds.has(fn.id);
                          return (
                            <div
                              key={fn.id}
                              className="flex items-center justify-between gap-2 text-xs"
                            >
                              <span className="text-black/60">{fn.title}</span>
                              {hasFn ? (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#58D44F]">
                                  <CheckIcon className="h-3 w-3 text-white" />
                                </span>
                              ) : (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-dark/60">
                                  <XIcon className="h-3 w-3 text-white" />
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale = "en", preview }) {
  const response = await fetchDato(
    queries.getConfigurator,
    { locale },
    preview,
  );
  const site = await fetchDato(queries.site, { locale });

  // Sort machines by tier order
  const tierOrder = { start: 1, intermediate: 2, pro: 3 };
  const sortedMachines = [...(response?.allMachineConfs || [])].sort(
    (a, b) => tierOrder[a.slug] - tierOrder[b.slug],
  );

  return {
    props: {
      locale,
      site,
      machines: sortedMachines,
      configurator: response?.confPage,
    },
  };
}
