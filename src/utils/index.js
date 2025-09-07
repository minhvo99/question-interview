import { LEVELMAPPING } from '@constants/constant';

const decodeEntities = (text) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};

export const cleanHtml = (description = '') => {
  const noTags = description
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return decodeEntities(noTags);
};

const MIN_ALLOWED_FONT_SIZE = 8;
const MAX_ALLOWED_FONT_SIZE = 72;

export const parseAllowedFontSize = (input) => {
  const match = input.match(/^(\d+(?:\.\d+)?)px$/);
  if (match) {
    const n = Number(match[1]);
    if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
      return input;
    }
  }
  return '';
};

export function parseAllowedColor(input) {
  return /^rgb\(\d+, \d+, \d+\)$/.test(input) ? input : '';
}
export const getLevelKeyFromName = (name) => {
  const entry = Object.entries(LEVELMAPPING).find(
    ([, value]) => value.name.toLowerCase() === name.toLowerCase(),
  );
  return entry ? entry[0] : '';
};
