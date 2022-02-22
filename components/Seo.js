import Head from "next/head";
import { renderMetaTags } from "react-datocms";

const SEO = ({ tags, alt = [] }) => {
  return (
    <Head>
      {renderMetaTags(tags)}
      {alt.map((a) => {
        const url = `${a.locale}/${a.slug}`;
        return (
          <link
            key={url}
            href={url}
            hrefLang={a.locale}
            title={a.slug}
            rel="alternate"
            type="text/html"
          />
        );
      })}
    </Head>
  );
};

export default SEO;
