import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Popover, Disclosure, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { MenuAlt3Icon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

import MenuMobile from "./MenuMobile";
import translate from "lib/locales";
import LanguageSwitcher from "./LanguageSwitcher";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header(props) {
  const { locale, site, model, alts } = props;
  const router = useRouter();

  return (
    <header>
      <Popover className="relative rounded-b-2xl bg-brown">
        <div className="px-4 sm:px-6 mb-40">
          <div className="container">
            <div className="flex justify-between items-center py-6 lg:justify-start lg:space-x-5">
              <div className="flex justify-start items-center lg:w-0 lg:flex-1">
                <Link href="/" locale={locale} key="homepage">
                  <a title="Homepage" className="h-[35px]">
                    <Image
                      priority
                      src="/logo/quinti_white.svg"
                      height={35}
                      width={150}
                      alt="Logo Quinti Bottling"
                    />
                  </a>
                </Link>
              </div>
              <div className="-mr-2 -my-2 lg:hidden">
                <Popover.Button className="inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
                  <span className="sr-only">Open menu</span>
                  <MenuAlt3Icon className="h-9 w-9" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden lg:flex space-x-5">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="group inline-flex items-center text-white text-sm hover:text-orange focus:outline-none">
                        <span>{translate("company", locale)}</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180 text-orange" : "text-gold-light",
                            "ml-1 mt h-6 w-6 "
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-auto max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative bg-white text-xs divide-y grid divide-black/5">
                              {site.allCompanyPages.map((item) => (
                                <Link
                                  href={`/${translate("company_url", locale)}/${
                                    item.slug
                                  }`}
                                  locale={locale}
                                >
                                  <a title={item.title}>
                                    <span className="text-black block text-sm py-2 px-4 pr-12 whitespace-nowrap">
                                      {item.labelMenu}
                                    </span>
                                  </a>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="group inline-flex items-center text-white text-sm hover:text-orange focus:outline-none">
                        <span>{translate("products", locale)}</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180 text-orange" : "text-gold-light",
                            "ml-1 mt h-6 w-6 "
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-auto max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative bg-white text-xs divide-y grid divide-black/5">
                              {site.allProducts.map((item) => (
                                <Link
                                  href={`/${translate(
                                    "products_url",
                                    locale
                                  )}/${item.slug}`}
                                  locale={locale}
                                >
                                  <a
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
                                      } w-3 h-3 -mt-[2px] mx-4`}
                                    />
                                    <span className="text-black block text-sm py-2 pr-12 whitespace-nowrap">
                                      {item.title}
                                    </span>
                                  </a>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="group inline-flex items-center text-white text-sm hover:text-orange focus:outline-none">
                        <span>{translate("technologies", locale)}</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180 text-orange" : "text-gold-light",
                            "ml-1 mt h-6 w-6 "
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-auto max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative bg-white text-xs divide-y grid divide-black/5">
                              {site.allTecnologies.map((item) => (
                                <Link
                                  href={`/${translate(
                                    "technologies_url",
                                    locale
                                  )}/${item.slug}`}
                                  locale={locale}
                                >
                                  <a title={item.title}>
                                    <span className="text-black block text-sm py-2 px-4 pr-12 whitespace-nowrap">
                                      {item.labelMenu}
                                    </span>
                                  </a>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                {site.allEditorialPages.map((item) =>
                  item.inMenu == true ? (
                    <Link href={item.slug}>
                      <a key={item.slug} href={item.slug} title={item.title}>
                        <span className="text-white hover:text-orange">
                          {item.labelMenu}
                        </span>
                      </a>
                    </Link>
                  ) : null
                )}
                <Link href={site.indexNews.slug}>
                  <a
                    key={site.indexNews.slug}
                    href={site.indexNews.slug}
                    title={site.indexNews.title}
                  >
                    <span className="text-white hover:text-orange">
                      {site.indexNews.labelMenu}
                    </span>
                  </a>
                </Link>
                <Link href={site.contactPage.slug}>
                  <a
                    key={site.contactPage.slug}
                    href={site.contactPage.slug}
                    title={site.contactPage.title}
                  >
                    <span className="text-white hover:text-orange">
                      {site.contactPage.labelMenu}
                    </span>
                  </a>
                </Link>
                <div className="hidden lg:flex space-x-1 items-center">
                  <LanguageSwitcher locale={locale} alts={alts} model={model} />
                </div>
              </Popover.Group>
            </div>
          </div>
        </div>
        <MenuMobile site={site} locale={locale} />
      </Popover>
    </header>
  );
}

export default Header;
