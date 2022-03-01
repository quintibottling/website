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
  },
  async rewrites() {
    return [
      {
        source: "/azienda/:slug",
        destination: "/company/:slug",
      },
      // {
      //   source: "/contatti",
      //   destination: "/contacts",
      // },
    ];
  },
};
