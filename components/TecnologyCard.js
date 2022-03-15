import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { Disclosure, Transition } from "@headlessui/react";
import { Image as DatoImage } from "react-datocms";
import { renderHTML } from "lib/utils";

export default function TecnologyCard({ locale, data, i, machine }) {
  let prefix;
  if (i < 10) {
    prefix = 0;
  }

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? "" : "border-b"
              } flex w-full items-center justify-between py-3 first-of-type:border-t focus:outline-none lg:py-6`}
            >
              <div className="">
                <span className="pr-3 text-xs text-gold lg:pt-0 lg:pr-6 lg:text-base">
                  {prefix}
                  {i + 1}
                </span>
                {data.request == true ? (
                  <div
                    className={`${machine.product.code} mr-3 inline-block h-3 w-3 lg:mr-6 lg:h-4 lg:w-4`}
                  />
                ) : (
                  ""
                )}
                <span className={`${open ? "font-semibold	" : ""} lg:text-2xl`}>
                  {data.title}
                </span>
              </div>
              {open ? (
                <MinusIcon className="mt-1 h-4 w-4 text-orange lg:mt-0 lg:h-6 lg:w-6" />
              ) : (
                <PlusIcon className="mt-1 h-4 w-4 text-orange lg:mt-0 lg:h-6 lg:w-6" />
              )}
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <Disclosure.Panel className="border-b px-4 pb-6 text-sm text-gray-500 lg:px-10 lg:pb-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-x-8">
                  {data.imagePreview && (
                    <div className="">
                      <DatoImage
                        className=""
                        data={data.imagePreview.responsiveImage}
                        alt={data.imagePreview.alt}
                        title={data.imagePreview.title}
                      />
                    </div>
                  )}
                  <div className="grid content-start gap-2">
                    {data.titlePreview && (
                      <div className="text-xs uppercase tracking-widest text-gold lg:text-sm">
                        {data.titlePreview}
                      </div>
                    )}
                    {data.textPreview && (
                      <div className="text-sm lg:text-base">
                        {renderHTML(data.textPreview)}
                      </div>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
}
