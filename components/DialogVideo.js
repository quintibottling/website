import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import VideoBlock from "./blocks/VideoBlock";
import ButtonVideo from "./video/ButtonVideo";

export default function DialogVideo({ locale, data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <ButtonVideo locale={locale} data={data.video} />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          onClose={setOpen}
          className="fixed inset-0 z-10 overflow-y-auto"
          as="div"
        >
          <div className="flex min-h-screen items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-700"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block h-[169px] w-[300px] transform pt-5 transition-all md:h-[430px] md:w-[720px]">
                <div className="absolute -top-6 right-0">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                {data.video.map((video) => (
                  <div className="h-full" key={video.id}>
                    <VideoBlock record={video} />
                  </div>
                ))}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
