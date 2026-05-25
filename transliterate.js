function transliterateWord(word) {
  return word;
}

export function transliterate(text) {
  const tokens = text.split(/([a-zA-Z]+)/);
  const transliterated = tokens.map((token, i) => i % 2 === 1 ? transliterateWord(token) : token);
  return transliterated.join('');
}
