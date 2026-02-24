import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import translate from "lib/locales";

const TIER_LABELS = {
  start: "Start",
  intermediate: "Intermediate",
  pro: "Pro",
};

export default function TierChangePopup({
  isOpen,
  onClose,
  onConfirm,
  fromTier,
  toTier,
  locale,
}) {
  const fromLabel = TIER_LABELS[fromTier];
  const toLabel = TIER_LABELS[toTier];

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
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all lg:max-w-2xl lg:p-12">
              <div className="text-center text-xs uppercase text-orange-dark">
                {translate("tierUpgradeTitle", locale)}
              </div>

              {/* Message */}
              <p className="my-2 text-center text-sm lg:text-lg">
                {translate("tierUpgradeMsg", locale)}{" "}
                <span className="font-bold">{toLabel}</span>.
              </p>

              {/* Tier change visualization */}
              <div className="mb-8 mt-6 flex items-center justify-center gap-2 bg-gray-dark/10 p-6">
                <div className="flex flex-col items-center rounded-sm border border-pink bg-white p-2 py-4 text-xs lg:p-8 lg:text-base">
                  <span className="mb-1 text-black/50">Diamond</span>
                  <span className="font-bold uppercase text-black lg:text-lg">
                    {fromLabel}
                  </span>
                </div>
                <div className="flex h-5 w-5 items-center justify-center lg:h-10 lg:w-10">
                  <ArrowRightIcon
                    className="block h-5 w-5 text-orange-dark lg:h-8 lg:w-8"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col items-center rounded-sm border border-[#709A33] bg-[#709A33] px-2 py-4 text-white lg:p-8 lg:text-base">
                  <span className="mb-1">Diamond</span>
                  <span className="font-bold uppercase lg:text-lg">
                    {toLabel}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="gap-3 space-y-2 md:flex md:space-y-0">
                <button
                  type="button"
                  className="w-full rounded-full border border-black bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-dark/10"
                  onClick={onClose}
                >
                  {translate("stayOn", locale)} {fromLabel}
                </button>
                <button
                  type="button"
                  className="w-full rounded-full border border-orange-dark bg-orange-dark px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-dark/80"
                  onClick={onConfirm}
                >
                  {translate("goTo", locale)} {toLabel}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
