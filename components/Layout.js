import Header from "./Header";
import Footer from "./Footer";
import SkipLinks from "./SkipLinks";

function Layout({ children, locale, site, model, alts, altsProduct = null }) {
  return (
    <>
      <SkipLinks />
      <Header
        className="relative z-40"
        locale={locale}
        site={site}
        model={model}
        alts={alts}
        altsProduct={altsProduct}
      />
      <main id="content">{children}</main>
      <Footer id="footer" site={site} locale={locale} />
    </>
  );
}

export default Layout;
