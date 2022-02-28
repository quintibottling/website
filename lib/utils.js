import translate from "lib/locales";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

export function resolveLink(model, locale, link) {
  if (model == "product") {
    return `/${translate("products_url", locale)}/${link}`;
  }
  if (model == "company_page") {
    return `/${translate("company_url", locale)}/${link}`;
  }
  if (model == "tecnology") {
    return `/${translate("tecnology_url", locale)}/${link}`;
  }
  if (model == "machine") {
    return `/${translate("products_url", locale)}/olio/${link}`;
  }
  return `/${link}`;
}

export function renderHTML(dirt) {
  const clean = DOMPurify.sanitize(dirt, { USE_PROFILES: { html: true } });
  return parse(clean);
}
