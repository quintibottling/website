import Header from "./Header";
import Footer from "./Footer";
import SkipLinks from "./SkipLinks";

function Layout({ children, locale, site, model, alts }) {
  return (
    <>
      <SkipLinks />
      <Header
        className="relative z-50"
        locale={locale}
        site={site}
        model={model}
        alts={alts}
      />
      <main id="content">{children}</main>
      <Footer id="footer" site={site} />
    </>
  );
}

export default Layout;
