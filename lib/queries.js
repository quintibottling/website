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
  product {
    slug
    title
    id
  }
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
  cta
  link
`;

const textBlock = `
  id
  model: _modelApiKey
  text
`;

const imageBlock = `
  id
  model: _modelApiKey
  image {
    responsiveImage(sizes: "100vw, 600px", imgixParams: {auto: [format, compress], fit: crop}){
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

const functionsPlusBlock = `
  id
  model: _modelApiKey
  functions {
    id
    title
    description
  }
`;

const galleryBlock = `
  id
  model: _modelApiKey
  layout
  sliders {
    ${slider}
  }
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
    alt
    title
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
    title
    alt
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
  title
  text
`;

const download = `
  id
  model: _modelApiKey
  title
  file {
    url
  }
`;

const section = `
  id
  model: _modelApiKey
  background
  content {
    ... on FunctionsPlusBlockRecord {
      ${functionsPlusBlock}
    }
    ... on CertificationBlockRecord {
      ${certificationBlock}
    }
    ... on FormBlockRecord {
      ${formBlock}
    }
    ... on GalleryBlockRecord {
      ${galleryBlock}
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
  news: allNews(first: "2", locale: $locale, filter: {slug: {neq: null}}, orderBy: _publishedAt_DESC) {
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

export const getAllEditorialPages = `
query allEditorialPages{
  editorialPages: allEditorialPages {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
    model: _modelApiKey
  }
}
`;

export const getAllTechnologies = `
query allTecnologies{
  tecnologies: allTecnologies {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
    model: _modelApiKey
  }
}
`;

export const getAllBlogPosts = `
query allNews{
  allNews {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
    id
    model: _modelApiKey
  }
}
`;

export const getBlogPost = `
query news($slug: String!, $locale: SiteLocale!){
  allNews(filter: {slug: {neq: null}}, locale: $locale, first: "2", orderBy: _createdAt_DESC) {
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
  news(filter: {slug: {eq: $slug}}, locale: $locale) {
    slug
    id
    title
    seo: _seoMetaTags {
      ${seoBlock}
    }
    alts: _allSlugLocales {
      locale
      value
    }
    category {
      slug
      title
    }
    mobileImage: imageHero {
      responsiveImage(sizes: "100vw, 768px", imgixParams: {auto: [format, compress], fit: crop, ar: "1:1"}){
        ...imgFrag
      }
    }
    deskImage: imageHero {
      responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "7:2"}){
        ...imgFrag
      }
    }
    createdAt
    body {
      ... on GalleryBlockRecord {
        ${galleryBlock}
      }
      ... on ImageBlockRecord {
        ${imageBlock}
      }
      ... on TextBlockRecord {
        ${textBlock}
      }
    }
    model: _modelApiKey
  }
}
${imgFrag}
`;

export const getBlogIndex = `
query indexNews ($locale: SiteLocale!){
  indexNews (locale: $locale){
    title
    slug
    labelMenu
    id
    model: _modelApiKey
    seo: _seoMetaTags {
      ${seoBlock}
    }
    alts: _allSlugLocales {
      locale
      value
    }
    textHero
    titleHero
    prefixHero
  }
  news: allNews(locale: $locale, filter: {slug: {neq: null}}) {
    category {
      slug
      title
    }
    createdAt
    title
    id
    slug
    imageHero {
      responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 500px", imgixParams: {auto: [format, compress], fit: crop, ar: "7:5"}){
        ...imgFrag
      }
    }
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

export const getTecnology = `
query tecnology($slug: String!, $locale: SiteLocale!){
  tecnology(filter: {slug: {eq: $slug}}, locale: $locale) {
    slug
    title
    titleHero
    textHero
    mobileImage: imageHero {
      responsiveImage(sizes: "100vw, 768px", imgixParams: {auto: [format, compress], fit: crop, ar: "1:1"}){
        ...imgFrag
      }
    }
    deskImage: imageHero {
      responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "7:2"}){
        ...imgFrag
      }
    }
    video {
      ${videoBlock}
    }
    seo: _seoMetaTags {
      ${seoBlock}
    }
    alts: _allSlugLocales {
      locale
      value
    }
    titleHero
    model: _modelApiKey
    introBlock {
      ${twoColumnBlock}
    }
    tecnologyDetail {
      id
      model: _modelApiKey
      title
      titleDescription
      description
      multimedia {
        ... on GalleryBlockRecord {
          ${galleryBlock}
        }
        ... on ImageBlockRecord {
          ${imageBlock}
        }
        ... on VideoBlockRecord {
          ${videoBlock}
        }
      }
    }
    form {
      ${formBlock}
    }
  }
  allMachines {
    id
    title
    product {
      id
      code
      slug
      model: _modelApiKey
      title
    }
    tecnology {
      id
      title
    }
  }
}
${imgFrag}
`;

export const getContactPage = `
query contactPage($locale: SiteLocale!){
  contactPage(locale: $locale) {
    slug
    title
    id
    titleHero
    textHero
    model: _modelApiKey
    mobileImage: imageHero {
      responsiveImage(sizes: "100vw, 768px", imgixParams: {auto: [format, compress], fit: crop, ar: "1:1"}){
        ...imgFrag
      }
    }
    deskImage: imageHero {
      responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "7:2"}){
        ...imgFrag
      }
    }
    seo: _seoMetaTags {
      ${seoBlock}
    }
    alts: _allSlugLocales {
      locale
      value
    }
    prefix
    text
    linkWork {
      ${externalLink}
    }
    dealerBlock {
      ${textImageTwoColumn}
    }
    form {
      ${formBlock}
    }
  }
  info(locale: $locale) {
    email
    phone
    afterSale
    address
    social {
      link
      title
    }
  }
}
${imgFrag}
`;

export const getAllProducts = `
query allProducts{
  products: allProducts {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
    id
    title
    model: _modelApiKey
    code
    color
  }
}
`;

export const getProduct = `
query product($slug: String!, $locale: SiteLocale!){
  product(filter: {slug: {eq: $slug}}, locale: $locale) {
    slug
    title
    titleHero
    textHero
    code
    id
    intro {
      ${twoColumnBlock}
    }
    introTab {
      ${titleTextBlock}
    }
    introPlus {
      ${titleTextBlock}
    }
    introForm {
      ${formBlock}
    }
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
      responsiveImage(sizes: "100vw", imgixParams: {auto: [format, compress], fit: crop, ar: "7:2"}){
        ...imgFrag
      }
    }
    model: _modelApiKey
  }
  allTecnology: allTecnologyDetails(locale: $locale, first: "100") {
    id
    title
    subtitle
    request
    model: _modelApiKey
  }
  allMachines(locale: $locale) {
    title
    id
    model: _modelApiKey
    titleHero
    textHero
    slug
    imageHero {
      responsiveImage(sizes: "100vw, 400px", imgixParams: {auto: [format, compress]}){
        ...imgFrag
      }
    }
    tecnology {
      id
      title
      subtitle
      request
    }
    optional {
      title
      id
      description
    }
    product {
      id
    }
  }

}
${imgFrag}
`;

export const getAllMachines = `
query allMachines{
  machines: allMachines {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
    model: _modelApiKey
  }
}
`;

export const getAllOilMachines = `
query oilMachines{
  oilMachines: allMachines(filter: {product: {eq: "109839746"}}) {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
  }
}
`;

export const getAllWineMachines = `
query wineMachines{
  wineMachines: allMachines(filter: {product: {eq: "109839783"}}) {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
  }
}
`;

export const getAllBeerMachines = `
query beerMachines{
  beerMachines: allMachines(filter: {product: {eq: "109839755"}}) {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
  }
}
`;

export const getAllSpiritMachines = `
query spiritMachines{
  spiritMachines: allMachines(filter: {product: {eq: "109839737"}}) {
    slugs: _allSlugLocales {
      locale
      slug: value
    }
  }
}
`;

export const getMachine = `
query machine($slug: String!, $locale: SiteLocale!){
  machine(filter: {slug: {eq: $slug}}, locale: $locale) {
    slug
    id
    titleHero
    titleDoc
    textHero
    titleDetail
    title
    textIntro
    textDetail
    introFunction {
      ${titleTextBlock}
    }
    introBlock {
      ... on GalleryBlockRecord {
        ${galleryBlock}
      }
      ... on TitleTextBlockRecord {
        ${titleTextBlock}
      }
    }
    tecnology {
      id
      title
      request
      imagePreview {
        responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 500px", imgixParams: {auto: [format, compress]}){
          ...imgFrag
        }
      }
      titlePreview
      textPreview
      multimedia {
        ... on GalleryBlockRecord {
          ${galleryBlock}
        }
        ... on ImageBlockRecord {
          ${imageBlock}
        }
        ... on VideoBlockRecord {
          ${videoBlock}
        }
      }
    }
    optional {
      title
      id
      description
    }
    download {
      ${download}
    }
    form {
      ${formBlock}
    }
    alts: _allSlugLocales {
      locale
      value
    }
    product {
      slugProduct: _allSlugLocales {
        locale
        value
      }
      slug
      title
      code
      color
      introPlus {
        ${titleTextBlock}
      }
    }
    detail {
      ${row}
    }
    seo: _seoMetaTags {
      ${seoBlock}
    }
    model: _modelApiKey
    galleryHero {
      responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw, 700px", imgixParams: {auto: [format, compress]}){
        ...imgFrag
      }
    }
  }
}
${imgFrag}
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

export const getEditorialPage = `
query editorialPage($slug: String!, $locale: SiteLocale!){
  editorialPage(filter: {slug: {eq: $slug}}, locale: $locale) {
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
