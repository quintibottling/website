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
... on CompanyPageRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on ContactPageRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on EditorialPageRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on IndexNewsRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on MachineRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on NewsRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on ProductRecord {
  id
  slug
  model: _modelApiKey
  title
}
... on TecnologyRecord {
  id
  slug
  model: _modelApiKey
  title
}
`;

const internalLink = `
  id
  model: _modelApiKey
  label
  link {
    ${allLinks}
  }
`;

const externalLink = `
  id
  model: _modelApiKey
`;

const textBlock = `
  id
  model: _modelApiKey
`;

const imageBlock = `
  id
  model: _modelApiKey
`;

const videoBlock = `
  id
  model: _modelApiKey
  muted
  externalVideo {
    url
    height
    width
    title
    provider
    providerUid
    thumbnailUrl
  }
  internalVideo {
    height
    width
    title
    url
    video {
      mp4Url
      thumbnailUrl
      streamingUrl
    }
  }
`;

const galleryBlock = `
  id
  model: _modelApiKey
`;

const gallerySlide = `
  id
  model: _modelApiKey
`;

const twoColumnBlock = `
  id
  model: _modelApiKey
  title
  smallText
  prefix
  bigText
  typeTitle
`;

const titleTextBlock = `
  id
  model: _modelApiKey
  title
  text
`;

const iconTitleTextBlock = `
  id
  model: _modelApiKey
`;

const textImageTwoColumn = `
  id
  model: _modelApiKey
  layout
  prefix
  title
  text
  link {
    ${internalLink}
  }
  image {
    responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 450px", imgixParams: {auto: [format, compress], fit: crop, ar: "4:3"}){
      ...imgFrag
    }
  }
`;

const section = `
  id
  model: _modelApiKey
`;

const partner = `
  id
  model: _modelApiKey
`;

const slideHomepage = `
  id
  model: _modelApiKey
  image {
    responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 700px", imgixParams: {auto: [format, compress]}){
      ...imgFrag
    }
  }
  link {
    ${allLinks}
  }
  subtitleLink
  titleLink
`;

const formBlock = `
  id
  model: _modelApiKey
`;

const row = `
  id
  model: _modelApiKey
`;

const download = `
  id
  model: _modelApiKey
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
    inMenu
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

export const getHomepage = `
query homepage($locale: SiteLocale!) {
  homepage(locale: $locale) {
    slider {
      ${slideHomepage}
    }
    video {
      ${videoBlock}
    }
    introBlock {
      ... on InternalLinkRecord {
        ${internalLink}
      }
      ... on TwoColumnBlockRecord {
        ${twoColumnBlock}
      }
    }
    productsBlock{
      ${titleTextBlock}
    }
    blockContent{
      ${textImageTwoColumn}
    }
    model: _modelApiKey
    alts: _allSlugLocales {
      locale
      value
    }
    titleHero
    title
    seo: _seoMetaTags {
      ${seoBlock}
    }
  }
  allProducts: allProducts(locale: $locale) {
    id
    slug
    title
    textHero
    titleHero
    imageHero {
      responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 450px", imgixParams: {auto: [format, compress], fit: crop, ar: "5:3"}){
        ...imgFrag
      }
    }
    code
  }
}
${imgFrag}
`;
