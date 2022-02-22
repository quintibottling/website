import Header from "./Header";
import Footer from "./Footer";
import SkipLinks from "./SkipLinks";

function Layout({ locale, site }) {
  return (
    <>
      <SkipLinks />
      <Header locale={locale} site={site} />
      <main id="content"></main>
      <Footer id="footer" />
    </>
  );
}

export default Layout;
