import Script from "next/script";
import "/styles/global.css";
import { useRouter } from "next/router";

import translate from "lib/locales";

const GTM = process.env.NEXT_PUBLIC_GTM;
const IUBENDA_SITE_ID = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Component {...pageProps} />
      <Script id="iubenda-cs" src="//cdn.iubenda.com/cs/iubenda_cs.js" />
      <Script
        id="iubenda"
        dangerouslySetInnerHTML={{
          __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "askConsentAtCookiePolicyUpdate":true,
            "cookiePolicyInOtherWindow":true,
            "countryDetection":true,
            "enableFadp":true,
            "enableLgpd":true,
            "lgpdAppliesGlobally":false,
            "perPurposeConsent":true,
            "lang":"${locale}",
            "whitelabel":true,
            "siteId":${IUBENDA_SITE_ID},
            "cookiePolicyId":${translate("cookiePolicyId", locale)},
            purposes: "1, 3, 4",
            "banner":{
              "prependOnBody":true,
              "showPurposesToggles":true,
              "acceptButtonDisplay":true,
              "closeButtonDisplay":false,
              "explicitWithdrawal":true,
              "listPurposes":true,
              "position":"bottom",
              "acceptButtonColor":"#6d5b31",
              "acceptButtonCaptionColor":"white",
              "customizeButtonColor":"#6d5b31",
              "customizeButtonCaptionColor":"white",
              "rejectButtonColor":"#6d5b31",
              "rejectButtonCaptionColor":"white",
              "textColor":"#ffffff",
              "backgroundColor":"#27231B",
              "rejectButtonDisplay":true,
              "closeButtonRejects":true,
              "logo":"/logo/quinti_white.svg"
            },
          }
          `,
        }}
      />
      <Script
        type="plain/text"
        className="_iub_cs_activate"
        data-iub-purposes="4"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM}`}
      />
      <Script
        id="google-analytics-script"
        type="plain/text"
        className="_iub_cs_activate"
        data-iub-purposes="4"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTM}', {
          page_path: window.location.pathname,
        });
        `,
        }}
      />
      <Script
        id="autoblocking"
        type="text/javascript"
        src={`https://cs.iubenda.com/autoblocking/${IUBENDA_SITE_ID}.js`}
      />
      <Script
        id="iubenda_cs"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        charset="UTF-8"
        async={true}
      />
    </>
  );
}

export default MyApp;
