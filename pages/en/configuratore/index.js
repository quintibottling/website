import Head from 'next/head';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/solid';

import Layout from 'components/Layout';
import * as queries from 'lib/queries';
import fetchDato from 'lib/dato';

const TIER_COLORS = {
  start: 'border-green',
  intermediate: 'border-gold',
  pro: 'border-orange',
};

const TIER_LEVELS = {
  start: 'Level 1',
  intermediate: 'Level 2',
  pro: 'Level 3',
};

const TIER_TEXT_COLORS = {
  start: 'text-green',
  intermediate: 'text-gold',
  pro: 'text-orange',
};

export default function ConfiguratoreIndex({ locale, site, machines }) {
  return (
    <Layout site={site} locale={locale} model="configurator">
      <Head>
        <title>Diamond Oil Configurator | Quinti Bottling</title>
        <meta
          name="description"
          content="Configure your Diamond Oil bottling line. Choose between Start, Intermediate and Pro."
        />
      </Head>

      <div className="min-h-screen bg-gray">
        <div className="container--standard">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold"></div>
              <span className="text-xs uppercase tracking-widest text-black/60">
                Choose your machine
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-black lg:text-5xl">
              Diamond Oil
            </h1>
            <p className="mx-auto max-w-2xl text-base text-black/70">
              Configure the perfect bottling line for your needs.
              Select a machine to get started.
            </p>
          </div>

          {/* Machine Cards */}
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {machines.map((machine) => {
              const colorClass = TIER_COLORS[machine.slug] || 'border-gold';
              const textColorClass = TIER_TEXT_COLORS[machine.slug] || 'text-gold';
              const level = TIER_LEVELS[machine.slug] || '';
              const fixedFunctions = machine.functions.filter(fn => fn.fixed);
              const optionalFunctions = machine.functions.filter(fn => !fn.fixed);

              return (
                <Link key={machine.id} href={`/en/configuratore/${machine.slug}`}>
                  <a className={`group block overflow-hidden rounded-lg border-2 bg-pink-light transition-all duration-300 hover:shadow-lg ${colorClass}`}>
                    {/* Badge */}
                    <div className="p-6">
                      <div className={`mb-4 inline-block rounded px-3 py-1 ${
                        machine.slug === 'start' ? 'bg-green' :
                        machine.slug === 'intermediate' ? 'bg-gold' : 'bg-orange'
                      }`}>
                        <span className="text-xxs font-semibold uppercase tracking-wider text-white">
                          {level}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-1 text-xl font-semibold text-black lg:text-2xl">
                        Diamond Oil
                      </h3>
                      <h4 className={`mb-4 text-2xl font-bold lg:text-3xl ${textColorClass}`}>
                        {machine.title.toUpperCase()}
                      </h4>

                      {/* Functions list */}
                      <div className="mb-6 space-y-2">
                        {fixedFunctions.slice(0, 3).map(fn => (
                          <div
                            key={fn.id}
                            className="flex items-center gap-2 text-sm text-black/70"
                          >
                            <span className="text-gold">+</span>
                            <span>{fn.title}</span>
                          </div>
                        ))}
                        {optionalFunctions.length > 0 && (
                          <div className="text-sm text-black/50">
                            + {optionalFunctions.length} configurable functions
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-gold transition-colors group-hover:text-gold-light">
                        <span className="text-sm font-medium">Configure</span>
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

export async function getStaticProps({ locale = 'en', preview }) {
  const response = await fetchDato(queries.getConfigurator, { locale }, preview);
  const site = await fetchDato(queries.site, { locale });

  // Sort machines by tier order
  const tierOrder = { start: 1, intermediate: 2, pro: 3 };
  const sortedMachines = [...(response?.allMachineConfs || [])].sort(
    (a, b) => tierOrder[a.slug] - tierOrder[b.slug]
  );

  return {
    props: {
      locale,
      site,
      machines: sortedMachines,
    },
  };
}
