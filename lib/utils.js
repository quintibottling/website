const prefix = [
  { en: "company", it: "azienda" },
  { en: "products", it: "prodotti" },
  { en: "technologies", it: "tecnologie" },
];

export function resolveLink(model, locale, link) {
  if (
    (model == "product") |
    (model == "company_page") |
    (model == "tecnology")
  ) {
    return `/${prefix[locale]}/${link}`;
  }
  return `/${link}`;
}
