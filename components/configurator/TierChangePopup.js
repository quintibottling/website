import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const TIER_LABELS = {
  start: 'START',
  intermediate: 'INTERMEDIATE',
  pro: 'PRO',
};

export default function TierChangePopup({
  isOpen,
  onClose,
  onConfirm,
  fromTier,
  toTier,
  locale,
}) {
  const fromLabel = TIER_LABELS[fromTier] || fromTier?.toUpperCase();
  const toLabel = TIER_LABELS[toTier] || toTier?.toUpperCase();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-pink-light p-6 shadow-xl transition-all">
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                <span className="text-3xl">🔄</span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-center text-2xl font-bold text-black">
                Cambio Macchina
              </h3>

              {/* Message */}
              <p className="mb-6 text-center text-base text-black/70">
                Questa configurazione richiede il passaggio alla macchina {toLabel}.
              </p>

              {/* Tier change visualization */}
              <div className="mb-8 flex items-center justify-center gap-4">
                <div className="flex flex-col items-center rounded-lg border border-pink bg-white px-6 py-4">
                  <span className="mb-1 text-xs uppercase text-black/50">Da</span>
                  <span className="text-lg font-bold text-black">{fromLabel}</span>
                </div>
                <div className="text-2xl text-gold">→</div>
                <div className="flex flex-col items-center rounded-lg border border-gold bg-gold/10 px-6 py-4">
                  <span className="mb-1 text-xs uppercase text-black/50">A</span>
                  <span className="text-lg font-bold text-gold">{toLabel}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-brown/20 bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-pink"
                  onClick={onClose}
                >
                  Resta su {fromLabel}
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg bg-gold px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
                  onClick={onConfirm}
                >
                  Vai a {toLabel}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
