import { Popover, Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ChevronRightIcon, XIcon } from "@heroicons/react/outline";
import translate from "lib/locales";
import LanguageSwitcher from "./LanguageSwitcher";
import { resolveLink } from "lib/utils";

export default function MenuMobile({ site, locale, model }) {
  return (
    <>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top transform overflow-hidden transition lg:hidden"
        >
          <div className="relative z-50 min-h-[100vh] bg-brown">
            <div className="pt-5 pb-6">
              <div className="flex items-center justify-between px-4">
                <div>
                  <Image
                    priority
                    src="/logo/quinti_white.svg"
                    height={35}
                    width={150}
                    alt="Logo Quinti Bottling"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="text-gray-400 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-9 w-9 text-white" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <nav className="mt-3">
                <div className="grid border-b border-gray/20">
                  {/* // Mobile Azienda */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between border-t border-gray/20 py-4 px-4 text-white">
                          <span
                            className={`${
                              open ? "text-gold-light" : ""
                            } menu_item`}
                          >
                            {translate("company", locale)}
                          </span>
                          <ChevronRightIcon
                            className={`${
                              open ? "-rotate-90" : ""
                            } h-5 w-5 rotate-90 text-gold-light`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-500 ease-out"
                          enterFrom="transform opacity-0"
                          enterTo="transform opacity-100"
                          leave="transition duration-100 ease-out"
                          leaveFrom="transform opacity-100"
                          leaveTo="transform opacity-0"
                        >
                          <Disclosure.Panel className="grid space-y-1 border-t border-gray/20 bg-[#312D26] px-4 py-4">
                            {site.allCompanyPages.map((item) => (
                              <Link
                                href={resolveLink(
                                  item.model,
                                  locale,
                                  item.slug
                                )}
                                locale={locale}
                              >
                                <a title={item.title}>
                                  <span className="block text-sm text-white">
                                    {item.labelMenu}
                                  </span>
                                </a>
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  {/* // Mobile Prodotti */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between border-t border-gray/20 py-4 px-4 text-white">
                          <span
                            className={`${
                              open ? "text-gold-light" : ""
                            } menu_item`}
                          >
                            {translate("products", locale)}
                          </span>
                          <ChevronRightIcon
                            className={`${
                              open ? "-rotate-90" : ""
                            } h-5 w-5 rotate-90 text-gold-light`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-500 ease-out"
                          enterFrom="transform opacity-0"
                          enterTo="transform opacity-100"
                          leave="transition duration-100 ease-out"
                          leaveFrom="transform opacity-100"
                          leaveTo="transform opacity-0"
                        >
                          <Disclosure.Panel className="grid grid-cols-2 border-t border-gray/20 bg-[#312D26] px-4 py-4">
                            {site.allProducts.map((item) => (
                              <Link
                                href={resolveLink(
                                  item.model,
                                  locale,
                                  item.slug
                                )}
                                locale={locale}
                              >
                                <a
                                  key={item.slug}
                                  title={item.title}
                                  className="flex items-center gap-x-2 py-[2px]"
                                >
                                  <div
                                    className={`${item.code} -mt-[2px] h-3 w-3`}
                                  />
                                  <div className="text-sm text-white">
                                    {item.title}
                                  </div>
                                </a>
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  {/* // Mobile Tecnologie */}
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between border-t border-gray/20 py-4 px-4 text-white">
                          <span
                            className={`${
                              open ? "text-gold-light" : ""
                            } menu_item`}
                          >
                            {translate("technologies", locale)}
                          </span>
                          <ChevronRightIcon
                            className={`${
                              open ? "-rotate-90" : ""
                            } h-5 w-5 rotate-90 text-gold-light`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-500 ease-out"
                          enterFrom="transform opacity-0"
                          enterTo="transform opacity-100"
                          leave="transition duration-100 ease-out"
                          leaveFrom="transform opacity-100"
                          leaveTo="transform opacity-0"
                        >
                          <Disclosure.Panel className="grid grid-cols-2 border-t border-gray/20 bg-[#312D26] px-4 py-4">
                            {site.allTecnologies.map((item) => (
                              <Link
                                href={resolveLink(
                                  item.model,
                                  locale,
                                  item.slug
                                )}
                                locale={locale}
                              >
                                <a
                                  key={item.slug}
                                  title={item.title}
                                  className="flex items-center gap-x-2 py-[2px]"
                                >
                                  <div className="text-sm text-white">
                                    {item.title}
                                  </div>
                                </a>
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                  {/* // Mobile Altre pagine editoriali */}
                  <div className="grid gap-2 border-t border-gray/20 py-4 px-4 text-white">
                    {site.allEditorialPages.map((item) =>
                      item.inMenu == true ? (
                        <Link
                          locale={locale}
                          href={resolveLink(item.model, locale, item.slug)}
                        >
                          <a title={item.slug} className="">
                            <span className={`menu_item`}>
                              {item.labelMenu}
                            </span>
                          </a>
                        </Link>
                      ) : null
                    )}
                    {/* // Mobile News */}
                    <Link locale={locale} href={`/${site.indexNews.slug}`}>
                      <a title={site.indexNews.title} className="">
                        <span className={`menu_item`}>
                          {site.indexNews.labelMenu}
                        </span>
                      </a>
                    </Link>
                    {/* // Mobile Contatti */}
                    <Link locale={locale} href={`/${site.contactPage.slug}`}>
                      <a title={site.contactPage.title} className="">
                        <span className={`menu_item`}>
                          {site.contactPage.labelMenu}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
            <div className="space-y-6 px-5 pb-6">
              <div className="mb-2 text-xxs text-white/70">Lingua</div>
              <LanguageSwitcher model={model} />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
