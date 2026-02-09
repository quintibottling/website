import { useState, useCallback, useMemo } from 'react';

// Tier order for comparison
const TIER_ORDER = {
  start: 1,
  intermediate: 2,
  pro: 3,
};

export default function useConfigurator(machines, optionals) {
  // Find machines by slug
  const machinesBySlug = useMemo(() => {
    const map = {};
    machines.forEach(m => {
      map[m.slug] = m;
    });
    return map;
  }, [machines]);

  // Current selected machine
  const [currentMachineSlug, setCurrentMachineSlug] = useState('start');

  // State for function toggles (non-fixed functions)
  const [functionState, setFunctionState] = useState(() => {
    const state = {};
    machines.forEach(machine => {
      machine.functions.forEach(fn => {
        if (!fn.fixed) {
          state[fn.id] = true; // All optional functions ON by default
        }
      });
    });
    return state;
  });

  // State for plus functions (optionals)
  const [plusState, setPlusState] = useState(() => {
    const state = {};
    optionals.forEach(opt => {
      state[opt.id] = false; // All plus functions OFF by default
    });
    return state;
  });

  // Pending tier change for confirmation popup
  const [pendingTierChange, setPendingTierChange] = useState(null);

  // Sidebar state
  const [sidebarItem, setSidebarItem] = useState(null);

  // Quote form popup state
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // Get current machine
  const currentMachine = machinesBySlug[currentMachineSlug];

  // Get active functions for current machine
  const activeFunctions = useMemo(() => {
    if (!currentMachine) return { fixed: [], optional: [] };

    const fixed = currentMachine.functions.filter(fn => fn.fixed);
    const optional = currentMachine.functions.filter(fn => !fn.fixed && functionState[fn.id]);

    return { fixed, optional };
  }, [currentMachine, functionState]);

  // Get active plus functions
  const activePlus = useMemo(() => {
    return optionals.filter(opt => plusState[opt.id]);
  }, [optionals, plusState]);

  // Determine which machine should be selected based on active functions
  const determineMachine = useCallback((testFunctionState) => {
    // Sort machines by tier (highest first)
    const sortedMachines = [...machines].sort((a, b) =>
      TIER_ORDER[b.slug] - TIER_ORDER[a.slug]
    );

    for (const machine of sortedMachines) {
      const requiredFunctions = machine.functions.filter(fn => !fn.fixed);
      const allActive = requiredFunctions.every(fn => testFunctionState[fn.id]);

      if (allActive) {
        return machine.slug;
      }
    }

    return 'start';
  }, [machines]);

  // Toggle a function
  const toggleFunction = useCallback((functionId) => {
    const newState = {
      ...functionState,
      [functionId]: !functionState[functionId],
    };

    const newMachineSlug = determineMachine(newState);

    if (newMachineSlug !== currentMachineSlug) {
      // Show confirmation popup
      setPendingTierChange({
        from: currentMachineSlug,
        to: newMachineSlug,
        functionId,
        newFunctionState: newState,
      });
    } else {
      setFunctionState(newState);
    }
  }, [functionState, currentMachineSlug, determineMachine]);

  // Toggle a plus function
  const togglePlus = useCallback((optionalId) => {
    setPlusState(prev => ({
      ...prev,
      [optionalId]: !prev[optionalId],
    }));
  }, []);

  // Confirm tier change
  const confirmTierChange = useCallback(() => {
    if (pendingTierChange) {
      setFunctionState(pendingTierChange.newFunctionState);
      setCurrentMachineSlug(pendingTierChange.to);
      setPendingTierChange(null);
    }
  }, [pendingTierChange]);

  // Cancel tier change
  const cancelTierChange = useCallback(() => {
    setPendingTierChange(null);
  }, []);

  // Select a machine directly (from homepage)
  const selectMachine = useCallback((slug) => {
    setCurrentMachineSlug(slug);

    // Enable all functions for this machine
    const machine = machinesBySlug[slug];
    if (machine) {
      const newState = { ...functionState };
      machine.functions.forEach(fn => {
        if (!fn.fixed) {
          newState[fn.id] = true;
        }
      });
      setFunctionState(newState);
    }
  }, [machinesBySlug, functionState]);

  // Open sidebar with item details
  const openSidebar = useCallback((item, type) => {
    setSidebarItem({ item, type });
  }, []);

  // Close sidebar
  const closeSidebar = useCallback(() => {
    setSidebarItem(null);
  }, []);

  // Toggle from sidebar
  const sidebarToggle = useCallback(() => {
    if (!sidebarItem) return;

    if (sidebarItem.type === 'function') {
      toggleFunction(sidebarItem.item.id);
    } else if (sidebarItem.type === 'plus') {
      togglePlus(sidebarItem.item.id);
    }
  }, [sidebarItem, toggleFunction, togglePlus]);

  // Get configuration summary for quote
  const getConfigSummary = useCallback(() => {
    return {
      machine: currentMachine,
      functions: [...activeFunctions.fixed, ...activeFunctions.optional],
      plusFunctions: activePlus,
    };
  }, [currentMachine, activeFunctions, activePlus]);

  return {
    // Data
    machines,
    optionals,
    currentMachine,
    currentMachineSlug,
    activeFunctions,
    activePlus,
    functionState,
    plusState,

    // Actions
    selectMachine,
    toggleFunction,
    togglePlus,

    // Tier change popup
    pendingTierChange,
    confirmTierChange,
    cancelTierChange,

    // Sidebar
    sidebarItem,
    openSidebar,
    closeSidebar,
    sidebarToggle,

    // Quote form
    showQuoteForm,
    setShowQuoteForm,
    getConfigSummary,
  };
}
