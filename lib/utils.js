import translate from "lib/locales";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";
import * as dayjs from "dayjs";
import "dayjs/locale/it";

export function resolveLink(model, locale, link, productLink = null) {
  const base = locale === "it" ? "" : "/" + locale;

  if (model == "product") {
    return `${base}/${translate("products_url", locale)}/${link}`;
  }
  if (model == "company_page") {
    return `${base}/${translate("company_url", locale)}/${link}`;
  }
  if (model == "editorial_page") {
    return `${base}/${link}`;
  }
  if (model == "tecnology") {
    return `${base}/${translate("technologies_url", locale)}/${link}`;
  }
  if (model == "news") {
    return `${base}/news/${link}`;
  }
  if (model == "conf_page") {
    return `${base}/${translate("configurator_url", locale)}`;
  }
  if (model == "machine") {
    return `${base}/${translate(
      "products_url",
      locale
    )}/${productLink}/${link}`;
  } else return `${base}/${link}`;
}

export function renderHTML(dirt) {
  const clean = DOMPurify.sanitize(dirt, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target"],
  });
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

export const PRODUCT_ALTS = {
  olio: [
    { locale: "it", value: "olio" },
    { locale: "en", value: "olive-oil" },
  ],
  vino: [
    { locale: "it", value: "vino" },
    { locale: "en", value: "wine" },
  ],
  birra: [
    { locale: "it", value: "birra" },
    { locale: "en", value: "beer" },
  ],
  liquori: [
    { locale: "it", value: "liquori" },
    { locale: "en", value: "spirits" },
  ],
};

// Show common array from 2 objects by ID
export function getCommon(array1, array2) {
  return array1.filter((object1) => {
    return array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
}
