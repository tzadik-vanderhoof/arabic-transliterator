import { dictionary } from 'cmu-pronouncing-dictionary';
import { map } from './arpabet-to-arabic-mapping.js';

function arpabetToArabic(arpabet) {
  const phonemes = arpabet.split(' ');
  const arabicChars = phonemes.map(phoneme => {
    const stripped = phoneme.replace(/[012]$/, '');
    const arabic = map[stripped];
    return arabic ?? `[${stripped}]`;
  });
  return arabicChars.join('');
}

const testWords = ['hello', 'world', 'church', 'the', 'python', 'love', 'thing'];

for (const word of testWords) {
  const arpabet = dictionary[word];
  if (arpabet) {
    const arabic = arpabetToArabic(arpabet);
    console.log(`${word}: ${arpabet}`);
    console.log(arabic);
  } else {
    console.log(`${word}: not in dictionary`);
  }
  console.log();
}
