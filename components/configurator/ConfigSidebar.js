import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Image } from 'react-datocms';

export default function ConfigSidebar({
  isOpen,
  onClose,
  item,
  type,
  isActive,
  isFixed,
  onToggle,
  locale,
}) {
  if (!item) return null;

  const canToggle = type === 'function' ? !isFixed : true;
  const imageData = type === 'function' ? item.img : item.image;

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

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col bg-pink-light">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-pink bg-white px-6 py-4">
                    <h2 className="text-lg font-semibold text-black">
                      Dettagli
                    </h2>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-pink transition-colors hover:bg-brown hover:text-white"
                      onClick={onClose}
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-6">
                    {/* Image */}
                    {imageData?.responsiveImage ? (
                      <div className="mb-6 overflow-hidden rounded-lg bg-white">
                        <Image data={imageData.responsiveImage} />
                      </div>
                    ) : (
                      <div className="mb-6 flex h-48 items-center justify-center rounded-lg bg-brown/10">
                        <span className="text-4xl">
                          {type === 'function' ? '⚙️' : '✨'}
                        </span>
                      </div>
                    )}

                    {/* Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-block rounded px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${
                          isFixed
                            ? 'bg-gray-dark'
                            : type === 'function'
                            ? 'bg-gold'
                            : 'bg-green'
                        }`}
                      >
                        {isFixed ? 'Fisso' : type === 'function' ? 'Funzione' : 'Optional'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-2xl font-bold text-black">
                      {item.title}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p className="text-base leading-relaxed text-black/70">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex gap-3 border-t border-pink bg-white px-6 py-4">
                    <button
                      onClick={onClose}
                      className="flex-1 rounded-lg border border-brown/20 bg-white px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-pink"
                    >
                      Chiudi
                    </button>
                    {canToggle && (
                      <button
                        onClick={() => {
                          onToggle();
                          onClose();
                        }}
                        className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors ${
                          isActive
                            ? 'bg-red-light hover:bg-red'
                            : 'bg-green hover:bg-green/80'
                        }`}
                      >
                        {isActive ? 'Rimuovi' : 'Aggiungi'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
