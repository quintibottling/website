import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon, XCircleIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Image } from "react-datocms";
import translate from "lib/locales";

export default function ConfigSidebar({
  isOpen,
  onClose,
  item,
  type,
  isActive,
  isFixed,
  onToggle,
  locale,
  allMachines = [],
}) {
  const lastItem = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (item) lastItem.current = item;
  }, [item]);

  useEffect(() => {
    setActiveSlide(0);
  }, [item?.id]);

  const displayItem = item || lastItem.current;
  const canToggle = type === "function" ? !isFixed : true;

  // both functions and optionals now use images (array)
  const images = (displayItem?.images || []).filter(
    (img) => img?.responsiveImage,
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-2xl">
                <div className="flex h-full flex-col bg-white">
                  {/* Header */}
                  <div className="absolute top-0 right-0 z-10 flex items-center justify-end gap-2 px-6 py-4 text-xxs">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black bg-white transition-colors hover:bg-brown hover:text-white"
                      onClick={onClose}
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                    {translate("close", locale)}
                  </div>

                  {displayItem && (
                    <>
                      <div className="flex-1 overflow-y-auto">
                        {images.length > 0 ? (
                          <div className="mb-8 flex flex-col items-center">
                            <div className="relative aspect-[16/9] w-full">
                              <Image
                                data={images[activeSlide].responsiveImage}
                                alt={
                                  images[activeSlide].responsiveImage.alt || ""
                                }
                                title={
                                  images[activeSlide].responsiveImage.title ||
                                  ""
                                }
                                objectFit="contain"
                                layout="fill"
                              />
                            </div>
                            {images.length > 1 && (
                              <div className="mt-4 flex items-center gap-2">
                                {images.map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setActiveSlide(i)}
                                    className={`h-2.5 w-2.5 -translate-y-12 rounded-full transition-all ${
                                      i === activeSlide
                                        ? "scale-110 bg-orange"
                                        : "bg-gray-dark"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="py-12"></div>
                        )}

                        {/* Badge */}
                        <div className="mb-2 px-4 md:px-8">
                          <span
                            className={`inline-block py-1 text-xs font-semibold uppercase tracking-wide text-orange`}
                          >
                            {isFixed
                              ? translate("fixedFunction", locale)
                              : translate("optionalFunction", locale)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-4 px-4 text-lg text-black md:px-8">
                          {displayItem.title}
                        </h3>

                        {/* Description */}
                        {displayItem.description && (
                          <>
                            <div className="mb-2 px-4 text-xs md:px-8">
                              {translate("info", locale)}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: displayItem.description,
                              }}
                              className="px-4 text-sm leading-relaxed text-black/70 md:px-8"
                            />
                          </>
                        )}

                        {/* Compatibility */}
                        {type === "function" && allMachines.length > 0 && (
                          <div className="mt-4 px-4 pt-2 md:px-8">
                            <div className="mb-4 border-t border-black/10 pt-6 text-xs">
                              {translate("compatibility", locale)}
                            </div>
                            <div className="space-y-1">
                              {allMachines.map((machine) => {
                                const compatible = machine.functions.some(
                                  (fn) => fn.id === displayItem.id,
                                );
                                return (
                                  <div
                                    key={machine.id}
                                    className="flex items-center justify-between"
                                  >
                                    <span className="text-xs text-black/70">
                                      Diamond Oil &ldquo;
                                      <span className="font-bold">
                                        {machine.title.toUpperCase()}
                                      </span>
                                      &rdquo;
                                    </span>
                                    {compatible ? (
                                      <CheckCircleIcon className="h-5 w-5 text-[#58D44F]" />
                                    ) : (
                                      <XCircleIcon className="h-5 w-5 text-black/25" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <div className="mt-6 space-y-2 px-6 py-4 md:px-8 lg:flex lg:items-center lg:justify-between lg:gap-4 lg:space-y-0 lg:py-0 lg:pb-12">
                          {canToggle && (
                            <button
                              onClick={() => {
                                onToggle();
                                onClose();
                              }}
                              className={`w-full rounded-full px-4 py-3 text-sm font-medium text-white transition-colors ${
                                isActive
                                  ? "bg-red-light hover:bg-red"
                                  : "bg-[#CE7F00] hover:bg-[#CE7F00]/80"
                              }`}
                            >
                              {isActive
                                ? translate("removeFromConfig", locale)
                                : translate("addToConfig", locale)}
                            </button>
                          )}
                          <button
                            onClick={onClose}
                            className="w-full rounded-full border border-black bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-dark/10"
                          >
                            {translate("goBack", locale)}
                          </button>
                        </div>
                      </div>

                      {/* Footer */}
                    </>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
