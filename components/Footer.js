import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import translate from "lib/locales";

export default function Footer({ locale, site }) {
  const data = site.footer;
  const year = new Date().getFullYear();
  return (
    <>
      <footer
        id="footer"
        data-datocms-noindex
        className="rounded-t-[50px] bg-brown text-white"
      >
        <div className="container--small">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-10 mb-6 lg:hidden">
              <Image
                src="/logo/quinti_white.svg"
                height={30}
                width={125}
                alt="Logo Quinti Bottling"
              />
            </div>
            <div className="hidden lg:col-span-1 lg:block">
              <Image
                src="/logo/marchio_quinti.svg"
                height={50}
                width={50}
                alt="logo Quinti Bottling"
              />
            </div>

            <div className="col-span-10 grid grid-cols-2 md:col-span-3 md:block md:space-y-4">
              <div className="grid gap-1 lg:gap-3">
                <div className="text-xs lg:text-base">
                  {translate("phone", locale)}
                </div>
                <div className="text-xs opacity-70 lg:text-base">
                  {data.phone}
                </div>
              </div>
              <div className="grid gap-1 lg:gap-3">
                <div className="text-xs lg:text-base">
                  {translate("email", locale)}
                </div>
                <div className="text-xs opacity-70 lg:text-base">
                  {data.email}
                </div>
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-2 md:col-span-3 md:space-y-4 lg:col-span-2">
              <div className="grid content-start gap-1 lg:gap-3">
                <div className="text-xs lg:text-base">
                  {translate("company", locale)}
                </div>
                {site.allCompanyPages.map((item) => (
                  <Link
                    href={`/${translate("company_url", locale)}/${item.slug}`}
                    locale={locale}
                  >
                    <a className="group" title={item.title}>
                      <span className="block whitespace-nowrap text-xs opacity-70 group-hover:text-orange group-hover:opacity-100 lg:text-base">
                        {item.labelMenu}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-2 md:col-span-2 md:space-y-4 lg:col-span-2">
              <div className="-ml-2 grid content-start gap-1 lg:ml-0 lg:gap-3">
                <div className="text-xs lg:text-base">
                  {translate("products", locale)}
                </div>
                {site.allProducts.map((item) => (
                  <Link
                    href={`/${translate("products_url", locale)}/${item.slug}`}
                    locale={locale}
                  >
                    <a
                      title={item.title}
                      className="group flex items-center gap-x-2 py-[2px]"
                    >
                      <div className={`${item.code} -mt-[2px] h-2 w-2`} />
                      <span className="block whitespace-nowrap text-xs opacity-70 group-hover:text-orange group-hover:opacity-100 lg:text-base">
                        {item.title}
                      </span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-10 grid grid-cols-2 content-start gap-1 md:col-span-2 md:grid-cols-1 lg:col-span-2 lg:gap-3">
              {site.allEditorialPages.map((item) =>
                item.inMenu == true ? (
                  <Link href={item.slug} locale={locale}>
                    <a key={item.slug} href={item.slug} title={item.title}>
                      <span className="block text-xs hover:text-orange lg:text-base">
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
                  <span className="block text-xs hover:text-orange lg:text-base">
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
                  <span className="block text-xs hover:text-orange lg:text-base">
                    {site.contactPage.labelMenu}
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-y border-pink/10">
          <div className="mx-auto lg:px-10 xl:container 2xl:px-28">
            <div className="lg:flex lg:flex-row-reverse xl:justify-between">
              <div className="space-y-5 py-4 lg:w-1/3 lg:space-y-10 lg:py-6 xl:w-1/3">
                <div className="grid grid-cols-2 px-4 xl:place-items-end">
                  <div className="text-xs lg:text-base">Social Media</div>
                  <div className="text-xs lg:flex lg:gap-4 lg:pt-1">
                    {site.footer.social.map((social) => (
                      <div key={social.id}>
                        <Link href={social.link}>
                          <a
                            title={`${translate("externaLink", locale)} ${
                              social.title
                            }`}
                            className="opacity-70 hover:text-orange"
                            target="_blank"
                            rel="noopener"
                          >
                            {social.title}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-y border-pink/10 lg:w-2/3 lg:border-y-0 xl:w-1/2">
                <div className="space-y-1 py-4 px-4 lg:px-0 lg:py-6">
                  <div className="text-xs opacity-70">
                    <span>@ {year} Quinti srl</span>
                    <span className="px-1"> - </span>
                    <span>P.IVA 01614390514</span>
                  </div>
                  <div className="text-xs opacity-70">
                    <a
                      href="https://www.cantierecreativo.net"
                      title={`${translate(
                        "externalLink",
                        locale
                      )} Cantiere Creativo Agenzia web Firenze`}
                      className="hover:text-orange"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Design & dev Cantiere Creativo
                    </a>
                    <span className="px-1"> - </span>
                    <a
                      href="https://datocms.com"
                      title={`${translate(
                        "externalLink",
                        locale
                      )} Cantiere Creativo Agenzia web Firenze`}
                      className="hover:text-orange"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Made with DatoCMS
                    </a>
                  </div>
                  <div className="text-xs opacity-70">
                    <a
                      href={`https://www.iubenda.com/privacy-policy/${translate(
                        "cookiePolicyId"
                      )}`}
                      title={`${translate(
                        "externaLink",
                        locale
                      )} Privacy Policy`}
                      className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe hover:text-orange"
                    >
                      Privacy Policy
                    </a>
                    <span className="px-1"> - </span>
                    <a
                      href={`https://www.iubenda.com/privacy-policy/${translate(
                        "cookiePolicyId"
                      )}/cookie-policy`}
                      title={`${translate(
                        "externaLink",
                        locale
                      )} Cookie Policy`}
                      className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe hover:text-orange"
                    >
                      Cookie Policy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
