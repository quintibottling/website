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
    <header className="relative z-50">
      <Popover className="relative rounded-b-2xl bg-brown">
        <div className="px-4 sm:px-6 xl:px-12">
          <div className="xl:container xl:mx-auto">
            <div className="flex items-center justify-between py-6 lg:justify-start lg:space-x-5">
              <div className="flex items-center justify-start lg:w-0 lg:flex-1">
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
              <div className="-my-2 -mr-2 lg:hidden">
                <Popover.Button className="inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
                  <span className="sr-only">Open menu</span>
                  <MenuAlt3Icon className="h-9 w-9" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden space-x-5 lg:flex">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="group inline-flex items-center text-sm text-white hover:text-orange focus:outline-none">
                        <span>{translate("company", locale)}</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180 text-orange" : "text-gold-light",
                            "mt ml-1 h-6 w-6 "
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
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-auto max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid divide-y divide-black/5 bg-white text-xs">
                              {site.allCompanyPages.map((item) => (
                                <Link
                                  href={`/${translate("company_url", locale)}/${
                                    item.slug
                                  }`}
                                  locale={locale}
                                >
                                  <a title={item.title}>
                                    <span className="block whitespace-nowrap py-2 px-4 pr-12 text-sm text-black">
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
                      <Popover.Button className="group inline-flex items-center text-sm text-white hover:text-orange focus:outline-none">
                        <span>{translate("products", locale)}</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180 text-orange" : "text-gold-light",
                            "mt ml-1 h-6 w-6 "
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
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-auto max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid divide-y divide-black/5 bg-white text-xs">
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
                                      className={`${item.code} mx-4 -mt-[2px] h-3 w-3`}
                                    />
                                    <span className="block whitespace-nowrap py-2 pr-12 text-sm text-black">
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
                      <Popover.Button className="group inline-flex items-center text-sm text-white hover:text-orange focus:outline-none">
                        <span>{translate("technologies", locale)}</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180 text-orange" : "text-gold-light",
                            "mt ml-1 h-6 w-6 "
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
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-auto max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid divide-y divide-black/5 bg-white text-xs">
                              {site.allTecnologies.map((item) => (
                                <Link
                                  href={`/${translate(
                                    "technologies_url",
                                    locale
                                  )}/${item.slug}`}
                                  locale={locale}
                                >
                                  <a title={item.title}>
                                    <span className="block whitespace-nowrap py-2 px-4 pr-12 text-sm text-black">
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
                <div className="hidden items-center space-x-1 lg:flex">
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
