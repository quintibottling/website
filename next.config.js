// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
  },
  optimizeCss: {
    inlineFonts: true,
    preloadFonts: true,
    logLevel: "error",
  },
  images: {
    domains: ["www.datocms-assets.com"],
    domains: ["image.mux.com"],
  },
  async rewrites() {
    return [
      {
        source: "/azienda/:slug",
        destination: "/company/:slug",
      },
      {
        source: "/prodotti/:slug",
        destination: "/products/:slug",
      },
      {
        source: "/prodotti/olio/:slug",
        destination: "/products/olive-oil/:slug",
      },
      {
        source: "/prodotti/liquori/:slug",
        destination: "/products/spirits/:slug",
      },
      {
        source: "/prodotti/birra/:slug",
        destination: "/products/beer/:slug",
      },
      {
        source: "/prodotti/vino/:slug",
        destination: "/products/wine/:slug",
      },
      {
        source: "/tecnologie/:slug",
        destination: "/technologies/:slug",
      },
      // {
      //   source: "/contatti",
      //   destination: "/contacts",
      // },
    ];
  },
};
