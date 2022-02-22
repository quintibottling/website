const imgFrag = `
  fragment imgFrag on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    webpSrcSet
    width
    alt
    title
  }
`;

const seoBlock = `
tag
attributes
content
`;

const allLinks = `
... on ContactPageRecord {
  id
  slug
  title
}
... on companyPageRecord {
  id
  slug
  title
}
... on indexNewsRecord {
  id
  slug
  title
}
`;

export const site = `
query site($locale: SiteLocale!) {
  site: _site(locale: $locale) {
    favicon: faviconMetaTags {
      tag
      content
      attributes
    }
  }
  allCompanyPages(locale: $locale) {
    id
    title
    labelMenu
    slug
  }
  allProducts(locale: $locale) {
    id
    title
    slug
    code
  }
  allTecnologies(locale: $locale) {
    id
    labelMenu
    title
    slug
  }
  allEditorialPages(locale: $locale) {
    id
    slug
    labelMenu
    title
  }
  contactPage(locale: $locale) {
    id
    slug
    labelMenu
    title
  }
  indexNews(locale: $locale) {
    id
    slug
    labelMenu
    title
  }
}
`;
