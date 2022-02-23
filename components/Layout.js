import Header from "./Header";
import Footer from "./Footer";
import SkipLinks from "./SkipLinks";

function Layout({ locale, site, model, alts }) {
  return (
    <>
      <SkipLinks />
      <Header locale={locale} site={site} model={model} alts={alts} />
      <main id="content"></main>
      <Footer id="footer" />
    </>
  );
}

export default Layout;
