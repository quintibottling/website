import labels from './labels.json';

const { it, en } = labels;
const strings = { en, it };

function translate(label, locale = 'it') {
  let text = '-';
  if (strings[locale] && strings[locale][label]) {
    text = strings[locale][label];
  }
  return text;
}

export default translate;
