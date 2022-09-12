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
      <Script
        id="iubenda-cs"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="afterInteractive"
      />
      <Script
        id="iubenda"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "lang":"${locale}",
            "siteId":${IUBENDA_SITE_ID},
            "cookiePolicyId":${translate("cookiePolicyId", locale)},
            perPurposeConsent: true,
            consentOnDocument: true,
            purposes: "1, 3, 4",
            "banner":{
              "acceptButtonDisplay":true,
              "customizeButtonDisplay":true,
              "position":"float-bottom-right",
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
              "closeButtonRejects":true
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
    </>
  );
}

export default MyApp;
