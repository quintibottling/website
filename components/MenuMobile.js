import { Popover, Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { ChevronRightIcon, XIcon } from "@heroicons/react/outline";
import translate from "lib/locales";
import LanguageSwitcher from "./LanguageSwitcher";

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
          className="absolute top-0 inset-x-0 transition transform origin-top lg:hidden overflow-hidden"
        >
          <div className="bg-brown min-h-[100vh]">
            <div className="pt-5 pb-6">
              <div className="px-4 flex items-center justify-between">
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
                  <Popover.Button className="inline-flex items-center justify-center text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
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
                        <Disclosure.Button className="py-4 text-white border-t border-gray/20 flex justify-between items-center px-4">
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
                            } w-5 h-5 rotate-90 text-gold-light`}
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
                          <Disclosure.Panel className="px-4 bg-[#312D26] py-4 space-y-1 grid border-t border-gray/20">
                            {site.allCompanyPages.map((item) => (
                              <Link
                                href={`/${translate("company_url", locale)}/${
                                  item.slug
                                }`}
                                locale={locale}
                              >
                                {" "}
                                <a href={item.slug} title={item.title}>
                                  <span className="text-white block text-sm">
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
                        <Disclosure.Button className="py-4 text-white border-t border-gray/20 flex justify-between items-center px-4">
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
                            } w-5 h-5 rotate-90 text-gold-light`}
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
                          <Disclosure.Panel className="px-4 bg-[#312D26] py-4 grid border-t border-gray/20 grid-cols-2">
                            {site.allProducts.map((item) => (
                              <Link
                                href={`/${translate("products_url", locale)}/${
                                  item.slug
                                }`}
                                locale={locale}
                              >
                                {" "}
                                <a
                                  key={item.slug}
                                  href={item.slug}
                                  title={item.title}
                                  className="flex items-center gap-x-2 py-[2px]"
                                >
                                  <div
                                    className={`${
                                      (item.slug == "olio") |
                                      (item.slug == "oil")
                                        ? "rounded-full rounded-tl-sm bg-green-light"
                                        : (item.slug == "vino") |
                                          (item.slug == "wine")
                                        ? "rounded-full bg-purple-light"
                                        : (item.slug == "birra") |
                                          (item.slug == "bear")
                                        ? "rounded-tl-full bg-yellow-light"
                                        : "bg-red-light"
                                    } w-3 h-3 -mt-[2px]`}
                                  />
                                  <div className="text-white text-sm">
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
                        <Disclosure.Button className="py-4 text-white border-t border-gray/20 flex justify-between items-center px-4">
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
                            } w-5 h-5 rotate-90 text-gold-light`}
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
                          <Disclosure.Panel className="px-4 bg-[#312D26] py-4 grid border-t border-gray/20 grid-cols-2">
                            {site.allTecnologies.map((item) => (
                              <Link
                                href={`/${translate(
                                  "technologies_url",
                                  locale
                                )}/${item.slug}`}
                                locale={locale}
                              >
                                {" "}
                                <a
                                  key={item.slug}
                                  href={item.slug}
                                  title={item.title}
                                  className="flex items-center gap-x-2 py-[2px]"
                                >
                                  <div className="text-white text-sm">
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
                  <div className="py-4 text-white border-t border-gray/20 grid gap-2 px-4">
                    {site.allEditorialPages.map((item) =>
                      item.inMenu == true ? (
                        <Link locale={locale} href={`/${item.slug}`}>
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
                      <a title={site.indexNews.slug} className="">
                        <span className={`menu_item`}>
                          {site.indexNews.labelMenu}
                        </span>
                      </a>
                    </Link>
                    {/* // Mobile Contatti */}
                    <Link locale={locale} href={`/${site.contactPage.slug}`}>
                      <a title={site.contactPage.slug} className="">
                        <span className={`menu_item`}>
                          {site.contactPage.labelMenu}
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
            <div className="pb-6 px-5 space-y-6">
              <div className="text-xxs text-white/70 mb-2">Lingua</div>
              <LanguageSwitcher model={model} />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
}
