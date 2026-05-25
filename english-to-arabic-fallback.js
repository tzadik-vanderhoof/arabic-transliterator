const digraphs = {
  'ph': 'ف',
  'sh': 'ش',
  'ch': 'تش',
  'th': 'ث',
  'ng': 'نچ',
  'wh': 'و',
  'ck': 'ك',
  'dg': 'ج',
};

const letters = {
  'a': 'ا',
  'b': 'ب',
  'c': 'ك',
  'd': 'د',
  'e': 'ي',
  'f': 'ف',
  'g': 'چ',
  'h': 'ه',
  'i': 'ي',
  'j': 'ج',
  'k': 'ك',
  'l': 'ل',
  'm': 'م',
  'n': 'ن',
  'o': 'و',
  'p': 'پ',
  'q': 'ك',
  'r': 'ر',
  's': 'س',
  't': 'ت',
  'u': 'و',
  'v': 'ڤ',
  'w': 'و',
  'x': 'كس',
  'y': 'ي',
  'z': 'ز',
};

export function englishToArabic(word) {
  const lower = word.toLowerCase();
  const arabicChars = [];
  let i = 0;
  while (i < lower.length) {
    const digraph = lower.slice(i, i + 2);
    if (digraphs[digraph]) {
      arabicChars.push(digraphs[digraph]);
      i += 2;
    } else {
      arabicChars.push(letters[lower[i]] ?? lower[i]);
      i += 1;
    }
  }
  return arabicChars.join('');
}
