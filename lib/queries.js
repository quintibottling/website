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
  image {
    responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 450px", imgixParams: {auto: [format, compress], fit: crop, ar: "4:3"}){
      ...imgFrag
    }
  }
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

const slider = `
  id
  model: _modelApiKey
  image {
    responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "2:1"}){
      ...imgFrag
    }
  }
  description
`;

const galleryBlock = `
  id
  model: _modelApiKey
  layout
  sliders {
    ${slider}
  }
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
  text
  title
  icon {
    url
  }
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

const certificationCard = `
  id
  model: _modelApiKey
  text
  title
  logo {
    url
  }
`;

const certificationBlock = `
  id
  model: _modelApiKey
  certification {
    ${certificationCard}
  }
`;

const partner = `
  id
  model: _modelApiKey
  logo {
    url
    alt
    title
  }
`;

const formBlock = `
  id
  model: _modelApiKey
  text
  title
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

const row = `
  id
  model: _modelApiKey
`;

const download = `
  id
  model: _modelApiKey
`;

const section = `
  id
  model: _modelApiKey
  background
  content {
    ... on CertificationBlockRecord {
      ${certificationBlock}
    }
    ... on FormBlockRecord {
      ${formBlock}
    }
    ... on GalleryBlockRecord {
      ${galleryBlock}
    }
    ... on IconTitleTextBlockRecord {
      ${iconTitleTextBlock}
    }
    ... on ImageBlockRecord {
      ${imageBlock}
    }
    ... on PartnerRecord {
      ${partner}
    }
    ... on TextImageTwoColumnRecord {
      ${textImageTwoColumn}
    }
    ... on TitleTextBlockRecord {
      ${titleTextBlock}
    }
    ... on TwoColumnBlockRecord {
      ${twoColumnBlock}
    }
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
  footer: info(locale: $locale) {
    email
    phone
    social {
      link
      title
    }
  }
  allCompanyPages(locale: $locale) {
    id
    title
    labelMenu
    slug
    model: _modelApiKey
  }
  allProducts(locale: $locale) {
    id
    title
    slug
    code
    model: _modelApiKey
  }
  allTecnologies(locale: $locale) {
    id
    labelMenu
    title
    slug
    model: _modelApiKey
  }
  allEditorialPages(locale: $locale) {
    id
    slug
    labelMenu
    title
    inMenu
    model: _modelApiKey
  }
  contactPage(locale: $locale) {
    id
    slug
    labelMenu
    title
    model: _modelApiKey
  }
  indexNews(locale: $locale) {
    id
    slug
    labelMenu
    title
    model: _modelApiKey
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
    serviceBlock {
      ... on IconTitleTextBlockRecord {
        ${iconTitleTextBlock}
      }
      ... on TitleTextBlockRecord {
        ${titleTextBlock}
      }
    }
    titleNews,
    ctaNews,
    model: _modelApiKey
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
  indexNews(locale: $locale) {
    slug
    title
    model: _modelApiKey
  }
  news: allNews(first: "2", locale: $locale) {
    category {
      slug
      title
    }
    createdAt
    title
    id
    slug
    body {
      ... on TextBlockRecord {
        id
        text
      }
    }
  }
}
${imgFrag}
`;

export const getAllCompanyPages = `
query allCompanyPages{
  companyPages: allCompanyPages {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
    model: _modelApiKey
  }
}
`;

export const getCompanyPage = `
query companyPage($slug: String!, $locale: SiteLocale!){
  companyPage(filter: {slug: {eq: $slug}}, locale: $locale) {
    slug
    title
    seo: _seoMetaTags {
      ${seoBlock}
    }
    alts: _allSlugLocales {
      locale
      value
    }
    mobileImage: imageHero {
      responsiveImage(sizes: "100vw, 768px", imgixParams: {auto: [format, compress], fit: crop, ar: "1:1"}){
        ...imgFrag
      }
    }
    deskImage: imageHero {
      responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "2:1"}){
        ...imgFrag
      }
    }
    body {
      ${section}
    }
    titleHero
    model: _modelApiKey
  }
}
${imgFrag}
`;
