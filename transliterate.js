import { dictionary } from 'cmu-pronouncing-dictionary';
import { map } from './arpabet-to-arabic-mapping.js';
import { englishToArabic } from './english-to-arabic-fallback.js';

function arpabetToArabic(arpabet) {
  const phonemes = arpabet.split(' ');
  const arabicChars = phonemes.map(phoneme => {
    const stripped = phoneme.replace(/[012]$/, '');
    return map[stripped] ?? `[${stripped}]`;
  });
  return arabicChars.join('');
}

function transliterateWord(word) {
  const pronunciation = dictionary[word.toLowerCase()];
  if (pronunciation) {
    return arpabetToArabic(pronunciation);
  }
  return englishToArabic(word);
}

const punctuation = {
  '.': '۔',
  ',': '،',
  '?': '؟',
  ';': '؛',
};

function convertPunctuation(token) {
  return token.split('').map(char => punctuation[char] ?? char).join('');
}

export function transliterate(text) {
  const tokens = text.split(/([a-zA-Z]+)/);
  const transliterated = tokens.map((token, i) => i % 2 === 1 ? transliterateWord(token) : convertPunctuation(token));
  return transliterated.join('');
}
