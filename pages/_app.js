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
            "countryDetection":true,
            "enableFadp":true,
            "enableLgpd":true,
            "lgpdAppliesGlobally":false,
            "perPurposeConsent":true,
            "whitelabel":true,
            "tcfPurposes":{"2":"consent_only","7":"consent_only","8":"consent_only","9":"consent_only","10":"consent_only","11":"consent_only"},
            "lang":"${locale}",
            "siteId":${IUBENDA_SITE_ID},
            "cookiePolicyId":${translate("cookiePolicyId", locale)},
            perPurposeConsent: true,
            consentOnContinuedBrowsing: false,
            consentOnDocument: true,
            purposes: "1, 3, 4",
            "banner":{
              "prependOnBody":true,
              "listPurposes":true,
              "showPurposesToggles":true,
              "explicitWithdrawal":true,
              "acceptButtonDisplay":true,
              "customizeButtonDisplay":true,
              "position":"float-top-center",
              "closeButtonDisplay":false,
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
            callback: {
              onPreferenceExpressedOrNotNeeded: function(preference) {
                window.consentIsGiven = preference;
              }
            }
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
        type="text/javascript"
        src="//cdn.iubenda.com/cs/tcf/stub-v2.js"
      ></Script>
      <Script
        type="text/javascript"
        src="//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js"
      ></Script>
      <Script
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        charset="UTF-8"
        async
      ></Script>
    </>
  );
}

export default MyApp;

