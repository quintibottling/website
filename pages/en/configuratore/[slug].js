import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowRightIcon } from '@heroicons/react/solid';

import Layout from 'components/Layout';
import FunctionOption from 'components/configurator/FunctionOption';
import ConfigSidebar from 'components/configurator/ConfigSidebar';
import TierChangePopup from 'components/configurator/TierChangePopup';
import QuoteForm from 'components/configurator/QuoteForm';

import * as queries from 'lib/queries';
import fetchDato from 'lib/dato';

const TIER_ORDER = { start: 1, intermediate: 2, pro: 3 };
const TIER_LEVELS = { start: 'Level 1', intermediate: 'Level 2', pro: 'Level 3' };

export default function ConfiguratoreMachine({
  locale,
  site,
  currentMachine,
  allMachines,
  allFunctions,
  optionals,
}) {
  const router = useRouter();

  // Get function IDs that belong to current machine
  const currentMachineFunctionIds = useMemo(() => {
    return new Set(currentMachine.functions.map(fn => fn.id));
  }, [currentMachine]);

  // State for function toggles - initialize based on current machine
  const [functionState, setFunctionState] = useState(() => {
    const state = {};
    allFunctions.forEach(fn => {
      state[fn.id] = currentMachineFunctionIds.has(fn.id);
    });
    return state;
  });

  // State for plus functions (optionals)
  const [plusState, setPlusState] = useState(() => {
    const state = {};
    optionals.forEach(opt => {
      state[opt.id] = false;
    });
    return state;
  });

  // Pending navigation for tier change
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Sidebar state
  const [sidebarItem, setSidebarItem] = useState(null);

  // Quote form state
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // Determine which machine a function belongs to (the lowest tier that has it)
  const getFunctionMachine = useCallback((functionId) => {
    const sortedMachines = [...allMachines].sort(
      (a, b) => TIER_ORDER[a.slug] - TIER_ORDER[b.slug]
    );

    for (const machine of sortedMachines) {
      if (machine.functions.some(fn => fn.id === functionId)) {
        return machine;
      }
    }
    return null;
  }, [allMachines]);

  // Determine required machine based on active functions
  const determineRequiredMachine = useCallback((testFunctionState) => {
    const sortedMachines = [...allMachines].sort(
      (a, b) => TIER_ORDER[b.slug] - TIER_ORDER[a.slug]
    );

    for (const machine of sortedMachines) {
      const machineFunctionIds = machine.functions.map(fn => fn.id);
      const allActive = machineFunctionIds.every(id => testFunctionState[id]);

      if (allActive) {
        return machine;
      }
    }

    return allMachines.find(m => m.slug === 'start') || allMachines[0];
  }, [allMachines]);

  // Toggle a function
  const toggleFunction = useCallback((functionId) => {
    const fn = allFunctions.find(f => f.id === functionId);
    if (!fn || fn.fixed) return;

    const newState = {
      ...functionState,
      [functionId]: !functionState[functionId],
    };

    const requiredMachine = determineRequiredMachine(newState);

    if (requiredMachine.slug !== currentMachine.slug) {
      setPendingNavigation({
        from: currentMachine.slug,
        to: requiredMachine.slug,
        newFunctionState: newState,
      });
    } else {
      setFunctionState(newState);
    }
  }, [functionState, currentMachine, allFunctions, determineRequiredMachine]);

  // Toggle a plus function
  const togglePlus = useCallback((optionalId) => {
    setPlusState(prev => ({
      ...prev,
      [optionalId]: !prev[optionalId],
    }));
  }, []);

  // Confirm navigation to new machine
  const confirmNavigation = useCallback(() => {
    if (pendingNavigation) {
      sessionStorage.setItem('configuratorState', JSON.stringify({
        functionState: pendingNavigation.newFunctionState,
        plusState,
      }));
      const targetSlug = pendingNavigation.to;
      // Close popup before navigating
      setPendingNavigation(null);
      router.push(`/en/configuratore/${targetSlug}`);
    }
  }, [pendingNavigation, plusState, router]);

  // Cancel navigation
  const cancelNavigation = useCallback(() => {
    setPendingNavigation(null);
  }, []);

  // Load state from sessionStorage or reset to defaults when machine changes
  useEffect(() => {
    const saved = sessionStorage.getItem('configuratorState');
    if (saved) {
      try {
        const { functionState: savedFn, plusState: savedPlus } = JSON.parse(saved);
        if (savedFn) {
          // Merge saved state with current machine's functions
          // Current machine's functions should always be active
          const mergedState = { ...savedFn };
          currentMachineFunctionIds.forEach(id => {
            mergedState[id] = true;
          });
          setFunctionState(mergedState);
        }
        if (savedPlus) setPlusState(savedPlus);
        sessionStorage.removeItem('configuratorState');
      } catch (e) {
        // Ignore parse errors
      }
    } else {
      // No saved state - reset to current machine defaults
      const defaultState = {};
      allFunctions.forEach(fn => {
        defaultState[fn.id] = currentMachineFunctionIds.has(fn.id);
      });
      setFunctionState(defaultState);
    }
  }, [currentMachine.slug]);

  // Open sidebar
  const openSidebar = useCallback((item, type) => {
    setSidebarItem({ item, type });
  }, []);

  // Close sidebar
  const closeSidebar = useCallback(() => {
    setSidebarItem(null);
  }, []);

  // Sidebar toggle action
  const sidebarToggle = useCallback(() => {
    if (!sidebarItem) return;

    if (sidebarItem.type === 'function') {
      toggleFunction(sidebarItem.item.id);
    } else if (sidebarItem.type === 'plus') {
      togglePlus(sidebarItem.item.id);
    }
    closeSidebar();
  }, [sidebarItem, toggleFunction, togglePlus, closeSidebar]);

  // Get active functions for preview
  const activeFunctions = useMemo(() => {
    return allFunctions.filter(fn => functionState[fn.id]);
  }, [allFunctions, functionState]);

  // Get active plus for preview
  const activePlus = useMemo(() => {
    return optionals.filter(opt => plusState[opt.id]);
  }, [optionals, plusState]);

  // Config summary for quote
  const getConfigSummary = useCallback(() => ({
    machine: currentMachine,
    functions: activeFunctions,
    plusFunctions: activePlus,
  }), [currentMachine, activeFunctions, activePlus]);

  // Separate fixed and optional functions
  const fixedFunctions = allFunctions.filter(fn => fn.fixed);
  const optionalFunctions = allFunctions.filter(fn => !fn.fixed);

  return (
    <Layout site={site} locale={locale} model="configurator">
      <Head>
        <title>Diamond Oil {currentMachine.title} - Configurator | Quinti Bottling</title>
        <meta
          name="description"
          content={`Configure your Diamond Oil ${currentMachine.title}. Customize functions and request a quote.`}
        />
      </Head>

      <div className="min-h-screen bg-gray">
        <div className="container--standard">
          {/* Back button */}
          <Link href="/en/configuratore">
            <a className="mb-6 inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-gold">
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              <span>Back to machines</span>
            </a>
          </Link>

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className={`mb-2 inline-block rounded px-3 py-1 ${
                currentMachine.slug === 'start' ? 'bg-green' :
                currentMachine.slug === 'intermediate' ? 'bg-gold' : 'bg-orange'
              }`}>
                <span className="text-xs font-semibold uppercase text-white">
                  {TIER_LEVELS[currentMachine.slug]}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-black lg:text-4xl">
                Diamond Oil {currentMachine.title.toUpperCase()}
              </h1>
            </div>
            <div className="rounded-lg border border-pink bg-white px-6 py-4">
              <div className="text-xs uppercase text-black/50">Current Configuration</div>
              <div className={`text-xl font-bold ${
                currentMachine.slug === 'start' ? 'text-green' :
                currentMachine.slug === 'intermediate' ? 'text-gold' : 'text-orange'
              }`}>
                {currentMachine.title.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Configuration Panel */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-pink bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold text-black">Modules</h2>

                {/* Fixed Functions */}
                <div className="mb-6">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">
                    Fixed Functions (always present)
                  </h3>
                  <div className="space-y-3">
                    {fixedFunctions.map((fn) => (
                      <FunctionOption
                        key={fn.id}
                        item={fn}
                        locale={locale}
                        isActive={true}
                        isFixed={true}
                        onInfo={() => openSidebar(fn, 'function')}
                        badgeText="Fixed"
                        badgeColor="bg-gray-dark"
                      />
                    ))}
                  </div>
                </div>

                {/* Optional Functions */}
                <div className="mb-6">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">
                    Optional Functions
                  </h3>
                  <div className="space-y-3">
                    {optionalFunctions.map((fn) => {
                      const belongsToCurrentMachine = currentMachineFunctionIds.has(fn.id);
                      const belongsToMachine = getFunctionMachine(fn.id);

                      return (
                        <FunctionOption
                          key={fn.id}
                          item={fn}
                          locale={locale}
                          isActive={functionState[fn.id]}
                          isFixed={false}
                          onToggle={toggleFunction}
                          onInfo={() => openSidebar(fn, 'function')}
                          badgeText={belongsToCurrentMachine ? 'Included' : belongsToMachine?.title}
                          badgeColor={belongsToCurrentMachine ? 'bg-gold' : 'bg-gray-dark/50'}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Plus Functions */}
              <div className="mt-8 rounded-xl border border-pink bg-white p-6">
                <h2 className="mb-2 text-lg font-semibold text-black">Plus Functions</h2>
                <p className="mb-6 text-sm text-black/60">
                  Additional accessories available for all versions
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {optionals.map((opt) => (
                    <FunctionOption
                      key={opt.id}
                      item={opt}
                      locale={locale}
                      isActive={plusState[opt.id]}
                      isFixed={false}
                      onToggle={togglePlus}
                      onInfo={() => openSidebar(opt, 'plus')}
                      badgeText="Plus"
                      badgeColor="bg-green"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Preview Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-pink bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold text-black">Preview</h2>

                {/* Machine preview */}
                <div className="mb-6 text-center">
                  <div className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full ${
                    currentMachine.slug === 'start' ? 'bg-green/10' :
                    currentMachine.slug === 'intermediate' ? 'bg-gold/10' : 'bg-orange/10'
                  }`}>
                    <span className="text-4xl">⚙️</span>
                  </div>
                  <div className={`mb-1 inline-block rounded px-2 py-0.5 text-xxs font-semibold uppercase text-white ${
                    currentMachine.slug === 'start' ? 'bg-green' :
                    currentMachine.slug === 'intermediate' ? 'bg-gold' : 'bg-orange'
                  }`}>
                    Version {currentMachine.title}
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    Diamond Oil {currentMachine.title.toUpperCase()}
                  </h3>
                </div>

                {/* Active modules */}
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-black/50">
                    Active Modules
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeFunctions.map((fn) => (
                      <span
                        key={fn.id}
                        className={`rounded px-2 py-1 text-xxs font-medium uppercase text-white ${
                          fn.fixed ? 'bg-brown' : 'bg-gold'
                        }`}
                      >
                        {fn.title}
                      </span>
                    ))}
                    {activePlus.map((opt) => (
                      <span
                        key={opt.id}
                        className="rounded bg-green px-2 py-1 text-xxs font-medium uppercase text-white"
                      >
                        {opt.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 rounded-xl border border-gold bg-brown p-6 lg:p-8">
            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">
                  Configuration complete?
                </h3>
                <p className="text-sm text-white/70">
                  Request a personalized quote for your Diamond Oil line
                </p>
              </div>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="group flex items-center gap-2 rounded-lg bg-gold px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-gold-light"
              >
                <span>Request Quote</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <ConfigSidebar
        isOpen={!!sidebarItem}
        onClose={closeSidebar}
        item={sidebarItem?.item}
        type={sidebarItem?.type}
        isActive={
          sidebarItem?.type === 'function'
            ? sidebarItem?.item?.fixed || functionState[sidebarItem?.item?.id]
            : plusState[sidebarItem?.item?.id]
        }
        isFixed={sidebarItem?.type === 'function' && sidebarItem?.item?.fixed}
        onToggle={sidebarToggle}
        locale={locale}
        allMachines={allMachines}
      />

      {/* Tier Change Popup */}
      <TierChangePopup
        isOpen={!!pendingNavigation}
        onClose={cancelNavigation}
        onConfirm={confirmNavigation}
        fromTier={pendingNavigation?.from}
        toTier={pendingNavigation?.to}
        locale={locale}
      />

      {/* Quote Form */}
      <QuoteForm
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        configSummary={getConfigSummary()}
        locale={locale}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetchDato(queries.getConfigurator, { locale: 'en' });

  const paths = (response?.allMachineConfs || []).map((machine) => ({
    params: { slug: machine.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale = 'en', preview }) {
  const response = await fetchDato(queries.getConfigurator, { locale }, preview);
  const site = await fetchDato(queries.site, { locale });

  const tierOrder = { start: 1, intermediate: 2, pro: 3 };
  const sortedMachines = [...response.allMachineConfs].sort(
    (a, b) => tierOrder[a.slug] - tierOrder[b.slug]
  );

  const currentMachine = sortedMachines.find(m => m.slug === params.slug);

  if (!currentMachine) {
    return { notFound: true };
  }

  const allFunctionsMap = new Map();
  sortedMachines.forEach(machine => {
    machine.functions.forEach(fn => {
      if (!allFunctionsMap.has(fn.id)) {
        allFunctionsMap.set(fn.id, fn);
      }
    });
  });
  const allFunctions = Array.from(allFunctionsMap.values());

  return {
    props: {
      locale,
      site,
      currentMachine,
      allMachines: sortedMachines,
      allFunctions,
      optionals: response.allOptionals,
    },
  };
}
