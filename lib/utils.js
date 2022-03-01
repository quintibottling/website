import translate from "lib/locales";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";
import * as dayjs from "dayjs";
import "dayjs/locale/it";

export function resolveLink(model, locale, link) {
  if (model == "product") {
    return `/${translate("products_url", locale)}/${link}`;
  }
  if (model == "company_page") {
    return `/${translate("company_url", locale)}/${link}`;
  }
  if (model == "tecnology") {
    return `/${translate("technologies_url", locale)}/${link}`;
  }
  if (model == "news") {
    return `/news/${link}`;
  }
  if (model == "machine") {
    return `/${translate("products_url", locale)}/olio/${link}`;
  } else return `/${link}`;
}

export function renderHTML(dirt) {
  const clean = DOMPurify.sanitize(dirt, { USE_PROFILES: { html: true } });
  return parse(clean);
}

export function showCategories(category) {
  let categoryTitle;
  if (category) {
    // Controllo se esite
    if (Array.isArray(category)) {
      // controllo se è un arrey
      categoryTitle = category
        .map((cat) => {
          return cat.title;
        })
        .join(", ");
    } else {
      categoryTitle = category.title;
    }
  }
  return categoryTitle;
}

export function formatDate(str, locale) {
  const fmt = "DD MMMM YYYY";
  return dayjs(str).locale(locale).format(fmt);
}
