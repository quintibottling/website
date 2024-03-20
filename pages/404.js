import Link from "next/link";
import Layout from "components/Layout";
import * as queries from "lib/queries";
import fetchDato from "lib/dato";
import { useEffect, useState } from "react";
import translate from "lib/locales";
import Button from "components/Button";

function tempate404({ data }) {
  const [locale, setLocale] = useState();

  useEffect(() => {
    const lang = () =>
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.userLanguage ||
          navigator.language ||
          navigator.browserLanguage ||
          "en";
    if (lang().indexOf("it") !== -1) {
      setLocale("it");
    } else {
      setLocale("en");
    }
  }, []);
  return (
    <Layout site={data} locale={locale} page="404">
      <div className="container--small">
        <div className="grid gap-3">
          <h1 className="text-xl text-gold lg:text-3xl">
            {translate("404title", locale)}
          </h1>
          <h2 className="text mb-2">{translate("404text", locale)}</h2>
          <div className="inline-block cursor-pointer">
            <Link href="/" locale={locale}>
              <Button data={translate("404cta", locale)} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale = "it" }) {
  const data = await fetchDato(queries.site, { locale });
  return {
    props: {
      locale,
      data,
    },
  };
}

export default tempate404;
