import Head from "next/head";
import Link from "next/link";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Image as DatoImage } from "react-datocms";
import { ArrowRightIcon } from "@heroicons/react/solid";

import Layout from "components/Layout";
import FunctionOption from "components/configurator/FunctionOption";
import ConfigSidebar from "components/configurator/ConfigSidebar";
import TierChangePopup from "components/configurator/TierChangePopup";
import QuoteForm from "components/configurator/QuoteForm";

import * as queries from "lib/queries";
import fetchDato from "lib/dato";

const TIER_ORDER = { start: 1, intermediate: 2, pro: 3 };

const STEPS = [
  { id: 1, label: "Funzioni Base" },
  { id: 2, label: "Funzioni Plus" },
  { id: 3, label: "Riepilogo" },
  { id: 4, label: "Invia Richiesta" },
];

const TIER_BADGE = {
  start: { label: "Base", color: "bg-[#DDD2B8] text-black" },
  intermediate: { label: "Intermediate", color: "bg-gray-dark text-white" },
  pro: { label: "PRO", color: "bg-gray-dark text-white" },
};

export default function ConfiguratoreMachine({
  locale,
  site,
  currentMachine,
  allMachines,
  allFunctions,
  optionals,
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get function IDs that belong to current machine
  const currentMachineFunctionIds = useMemo(() => {
    return new Set(currentMachine.functions.map((fn) => fn.id));
  }, [currentMachine]);

  // State for function toggles - initialize based on current machine
  const [functionState, setFunctionState] = useState(() => {
    const state = {};
    allFunctions.forEach((fn) => {
      state[fn.id] = currentMachineFunctionIds.has(fn.id);
    });
    return state;
  });

  // State for plus functions (optionals)
  const [plusState, setPlusState] = useState(() => {
    const state = {};
    optionals.forEach((opt) => {
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

  // Mobile step dropdown
  const [stepDropdownOpen, setStepDropdownOpen] = useState(false);
  const stepDropdownRef = useRef(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        stepDropdownRef.current &&
        !stepDropdownRef.current.contains(e.target)
      ) {
        setStepDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine which machine a function belongs to (the lowest tier that has it)
  const getFunctionMachine = useCallback(
    (functionId) => {
      const sortedMachines = [...allMachines].sort(
        (a, b) => TIER_ORDER[a.slug] - TIER_ORDER[b.slug],
      );
      for (const machine of sortedMachines) {
        if (machine.functions.some((fn) => fn.id === functionId)) {
          return machine;
        }
      }
      return null;
    },
    [allMachines],
  );

  // Determine required machine based on active functions
  // Find the lowest-tier machine whose function set contains ALL active functions
  const determineRequiredMachine = useCallback(
    (testFunctionState) => {
      const activeIds = new Set(
        Object.entries(testFunctionState)
          .filter(([, active]) => active)
          .map(([id]) => id),
      );

      const sortedMachines = [...allMachines].sort(
        (a, b) => TIER_ORDER[a.slug] - TIER_ORDER[b.slug],
      );

      for (const machine of sortedMachines) {
        const machineFunctionIds = new Set(
          machine.functions.map((fn) => fn.id),
        );
        const containsAll = [...activeIds].every((id) =>
          machineFunctionIds.has(id),
        );
        if (containsAll) {
          return machine;
        }
      }

      return sortedMachines[sortedMachines.length - 1];
    },
    [allMachines],
  );

  // Toggle a function
  const toggleFunction = useCallback(
    (functionId) => {
      const fn = allFunctions.find((f) => f.id === functionId);
      if (!fn || fn.fixed) return;

      const newState = {
        ...functionState,
        [functionId]: !functionState[functionId],
      };

      const requiredMachine = determineRequiredMachine(newState);

      if (
        requiredMachine.slug !== currentMachine.slug &&
        TIER_ORDER[requiredMachine.slug] > TIER_ORDER[currentMachine.slug]
      ) {
        setPendingNavigation({
          from: currentMachine.slug,
          to: requiredMachine.slug,
          newFunctionState: newState,
        });
      } else {
        setFunctionState(newState);
      }
    },
    [functionState, currentMachine, allFunctions, determineRequiredMachine],
  );

  // Toggle a plus function
  const togglePlus = useCallback((optionalId) => {
    setPlusState((prev) => ({
      ...prev,
      [optionalId]: !prev[optionalId],
    }));
  }, []);

  // Confirm navigation to new machine
  const confirmNavigation = useCallback(() => {
    if (pendingNavigation) {
      sessionStorage.setItem(
        "configuratorState",
        JSON.stringify({
          functionState: pendingNavigation.newFunctionState,
          plusState,
        }),
      );
      const targetSlug = pendingNavigation.to;
      setPendingNavigation(null);
      router.push(`/configuratore/${targetSlug}`);
    }
  }, [pendingNavigation, plusState, router]);

  // Cancel navigation
  const cancelNavigation = useCallback(() => {
    setPendingNavigation(null);
  }, []);

  // Load state from sessionStorage or reset to defaults when machine changes
  useEffect(() => {
    const saved = sessionStorage.getItem("configuratorState");
    if (saved) {
      try {
        const { functionState: savedFn, plusState: savedPlus } =
          JSON.parse(saved);
        if (savedFn) {
          const mergedState = { ...savedFn };
          currentMachineFunctionIds.forEach((id) => {
            mergedState[id] = true;
          });
          setFunctionState(mergedState);
        }
        if (savedPlus) setPlusState(savedPlus);
        sessionStorage.removeItem("configuratorState");
      } catch (e) {
        // Ignore parse errors
      }
    } else {
      const defaultState = {};
      allFunctions.forEach((fn) => {
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
    if (sidebarItem.type === "function") {
      toggleFunction(sidebarItem.item.id);
    } else if (sidebarItem.type === "plus") {
      togglePlus(sidebarItem.item.id);
    }
    closeSidebar();
  }, [sidebarItem, toggleFunction, togglePlus, closeSidebar]);

  // Get active functions for preview
  const activeFunctions = useMemo(() => {
    return allFunctions.filter((fn) => functionState[fn.id]);
  }, [allFunctions, functionState]);

  // Get active plus for preview
  const activePlus = useMemo(() => {
    return optionals.filter((opt) => plusState[opt.id]);
  }, [optionals, plusState]);

  // Find the best matching configuration images based on active functions
  const currentGallery = useMemo(() => {
    const configImages = currentMachine.configurationImages || [];
    const activeIds = new Set(
      allFunctions.filter((fn) => functionState[fn.id]).map((fn) => fn.id),
    );

    let bestMatch = null;
    let bestScore = -1;

    for (const entry of configImages) {
      if (entry.model !== "link_function") continue;
      const entryFnIds = (entry.links || []).map((l) => l.id);

      const isSubset = entryFnIds.every((id) => activeIds.has(id));
      if (!isSubset) continue;

      const score = entryFnIds.length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestMatch.gallery && bestMatch.gallery.length > 0) {
      return bestMatch.gallery;
    }

    // Fallback to previewImage
    return currentMachine.previewImage ? [currentMachine.previewImage] : [];
  }, [currentMachine, allFunctions, functionState]);

  // Reset image index when gallery changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentGallery]);

  // Config summary for quote
  const getConfigSummary = useCallback(
    () => ({
      machine: currentMachine,
      functions: activeFunctions,
      plusFunctions: activePlus,
    }),
    [currentMachine, activeFunctions, activePlus],
  );

  // Separate fixed and optional functions
  const fixedFunctions = allFunctions.filter((fn) => fn.fixed);
  const optionalFunctions = allFunctions.filter((fn) => !fn.fixed);

  // Handle step click - step 4 opens the quote form modal
  const handleStepClick = (stepId) => {
    if (stepId === 4) {
      setShowQuoteForm(true);
    } else {
      setCurrentStep(stepId);
    }
  };

  return (
    <Layout site={site} locale={locale} model="configurator">
      <Head>
        <title>
          Diamond Oil {currentMachine.title} - Configuratore | Quinti Bottling
        </title>
        <meta
          name="description"
          content={`Configura la tua Diamond Oil ${currentMachine.title}. Personalizza le funzioni e richiedi un preventivo.`}
        />
      </Head>

      {/* Header bar with step navigation */}
      <div className="sticky top-0 z-50 rounded-b-2xl bg-pink-light">
        <div className="mx-auto space-y-5 px-4 lg:space-y-10 xl:container">
          <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xxs uppercase tracking-wider">
                Versione
              </span>
              <h1 className="text-lg lg:text-xl">
                Diamond Oil{" "}
                <span className="font-bold">
                  {currentMachine.title.toUpperCase()}
                </span>
              </h1>
            </div>
            {/* Mobile: accessible dropdown */}
            <div className="relative md:hidden" ref={stepDropdownRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={stepDropdownOpen}
                aria-label="Seleziona fase"
                onClick={() => setStepDropdownOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setStepDropdownOpen(false);
                }}
                className="flex w-full items-center justify-between bg-white px-4 py-3 text-sm font-medium text-black"
              >
                <span>
                  {currentStep}.{" "}
                  {STEPS.find((s) => s.id === currentStep)?.label}
                </span>
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${
                    stepDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {stepDropdownOpen && (
                <ul
                  role="listbox"
                  aria-label="Fasi di configurazione"
                  aria-activedescendant={`step-option-${currentStep}`}
                  className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-black/10 bg-white shadow-lg"
                >
                  {STEPS.map((step) => (
                    <li
                      key={step.id}
                      id={`step-option-${step.id}`}
                      role="option"
                      aria-selected={currentStep === step.id}
                      tabIndex={0}
                      onClick={() => {
                        handleStepClick(step.id);
                        setStepDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStepClick(step.id);
                          setStepDropdownOpen(false);
                        }
                        if (e.key === "Escape") setStepDropdownOpen(false);
                      }}
                      className={`cursor-pointer px-4 py-3 text-sm transition-colors hover:bg-black/5 ${
                        currentStep === step.id
                          ? "bg-black/5 font-semibold text-black"
                          : "text-black/70"
                      }`}
                    >
                      {step.id}. {step.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Desktop: tabs */}
            <nav className="hidden gap-6 md:flex lg:gap-8">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`whitespace-nowrap pb-1 text-sm text-black/70 transition-colors md:text-xs ${
                    currentStep === step.id
                      ? "border-b-2 border-orange font-semibold"
                      : "hover:text-black/80"
                  }`}
                >
                  {step.id}. {step.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-screen bg-white">
        <div className="container--standard py-12">
          <div className="grid items-start gap-12 lg:grid-cols-2 xl:grid-cols-12">
            {/* Left: Machine image carousel */}
            <div className="top-40 flex flex-col items-center lg:sticky xl:col-span-8">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
                {currentGallery.length > 0 &&
                  currentGallery[currentImageIndex]?.responsiveImage && (
                    <DatoImage
                      data={currentGallery[currentImageIndex].responsiveImage}
                      alt={
                        currentGallery[currentImageIndex].responsiveImage.alt ||
                        ""
                      }
                      title={
                        currentGallery[currentImageIndex].responsiveImage
                          .title || ""
                      }
                      objectFit="cover"
                      layout="fill"
                    />
                  )}
              </div>
              {/* Carousel dots */}
              {currentGallery.length > 1 && (
                <div className="mt-4 flex items-center gap-2">
                  {currentGallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2.5 w-2.5 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? "scale-110 bg-orange"
                          : "bg-black/20 hover:bg-black/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="xl:col-span-4">
              {currentStep === 1 && (
                <>
                  <h2 className="mb-4 border-b pb-2 lg:mb-6 lg:text-lg">
                    Funzioni <span className="font-bold">Base</span>
                  </h2>

                  {/* Fixed functions */}
                  <h3 className="mb-3 text-xxs font-bold uppercase tracking-wider">
                    Funzioni di serie
                  </h3>
                  <div className="mb-8 space-y-3">
                    {fixedFunctions.map((fn) => (
                      <FunctionOption
                        key={fn.id}
                        item={fn}
                        locale={locale}
                        isActive={true}
                        isFixed={true}
                        onInfo={() => openSidebar(fn, "function")}
                        badgeText="Di serie"
                        badgeColor="bg-[#DDD2B8] text-black"
                      />
                    ))}
                  </div>

                  {/* Optional functions */}
                  <h3 className="mb-3 text-xxs font-bold uppercase tracking-wider">
                    Funzioni opzionali
                  </h3>
                  <div className="mb-8 space-y-3">
                    {optionalFunctions.map((fn) => {
                      const belongsToMachine = getFunctionMachine(fn.id);
                      const badge = belongsToMachine
                        ? TIER_BADGE[belongsToMachine.slug]
                        : null;

                      return (
                        <FunctionOption
                          key={fn.id}
                          item={fn}
                          locale={locale}
                          isActive={functionState[fn.id]}
                          isFixed={false}
                          onToggle={toggleFunction}
                          onInfo={() => openSidebar(fn, "function")}
                          badgeText={badge?.label}
                          badgeColor={badge?.color}
                        />
                      );
                    })}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 rounded-full bg-black py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 lg:py-4"
                    >
                      Vai alle funzioni plus
                    </button>
                    <Link href="/configuratore">
                      <a className="block rounded-full border border-black px-4 py-2 text-center text-sm font-medium text-black transition-colors hover:bg-black/5 md:block lg:py-4 lg:px-8">
                        Torna all&apos;inizio
                      </a>
                    </Link>
                  </div>
                </>
              )}

              {/* Step 2: Funzioni Plus */}
              {currentStep === 2 && (
                <>
                  <h2 className="mb-2 text-2xl">
                    Funzioni <span className="font-bold">Plus</span>
                  </h2>
                  <p className="mb-8 text-sm text-black/60">
                    Accessori aggiuntivi disponibili per tutte le versioni
                  </p>

                  <div className="space-y-3">
                    {optionals.map((opt) => (
                      <FunctionOption
                        key={opt.id}
                        item={opt}
                        locale={locale}
                        isActive={plusState[opt.id]}
                        isFixed={false}
                        onToggle={togglePlus}
                        onInfo={() => openSidebar(opt, "plus")}
                        badgeText="Plus"
                        badgeColor="bg-green-dark"
                      />
                    ))}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 rounded-full bg-black py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 lg:py-4"
                    >
                      Vai al riepilogo
                    </button>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="rounded-full border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5 lg:py-4 lg:px-8"
                    >
                      Torna alle funzioni base
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Riepilogo */}
              {currentStep === 3 && (
                <>
                  <h2 className="mb-4 text-xl text-orange-dark">
                    La tua macchina
                  </h2>

                  <div className="mb-6 rounded-lg bg-white">
                    <div className="mb-8">
                      <div className="text-lg text-black">
                        Diamond Oil
                        <span className="font-bold">
                          {currentMachine.title.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Active base functions */}
                    <div className="mb-4 mt-2 border-t pt-8">
                      <span className="block pb-2 text-sm font-semibold uppercase tracking-wider text-black">
                        Funzioni Base
                      </span>
                      <ul className="mt-2 space-y-2">
                        {activeFunctions.map((fn) => (
                          <li
                            key={fn.id}
                            className="flex items-center justify-start gap-2 text-sm"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-orange" />
                            <span className="text-black/80">{fn.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Active plus functions */}
                    {activePlus.length > 0 && (
                      <div>
                        <span className="mt-8 block pb-2 text-sm font-semibold uppercase tracking-wider text-black">
                          Funzioni Plus
                        </span>
                        <div className="mt-2 space-y-2">
                          {activePlus.map((opt) => (
                            <div
                              key={opt.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-black/80">{opt.title}</span>
                              <span className="rounded-full bg-gray-dark px-2 py-0.5 text-xxs font-bold uppercase text-white">
                                Plus
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      onClick={() => setShowQuoteForm(true)}
                      className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-dark py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 lg:py-4"
                    >
                      Richiedi preventivo
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="rounded-full border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5 lg:py-4 lg:px-8"
                    >
                      Torna alle funzioni plus
                    </button>
                  </div>
                </>
              )}
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
          sidebarItem?.type === "function"
            ? sidebarItem?.item?.fixed || functionState[sidebarItem?.item?.id]
            : plusState[sidebarItem?.item?.id]
        }
        isFixed={sidebarItem?.type === "function" && sidebarItem?.item?.fixed}
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
  const response = await fetchDato(queries.getConfigurator, { locale: "it" });

  const paths = (response?.allMachineConfs || []).map((machine) => ({
    params: { slug: machine.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale = "it", preview }) {
  const response = await fetchDato(
    queries.getConfigurator,
    { locale },
    preview,
  );
  const site = await fetchDato(queries.site, { locale });

  // Sort machines by tier order
  const tierOrder = { start: 1, intermediate: 2, pro: 3 };
  const sortedMachines = [...response.allMachineConfs].sort(
    (a, b) => tierOrder[a.slug] - tierOrder[b.slug],
  );

  // Find current machine
  const currentMachine = sortedMachines.find((m) => m.slug === params.slug);

  if (!currentMachine) {
    return { notFound: true };
  }

  // Collect ALL unique functions from all machines
  const allFunctionsMap = new Map();
  sortedMachines.forEach((machine) => {
    machine.functions.forEach((fn) => {
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
