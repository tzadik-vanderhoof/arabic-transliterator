import { dictionary } from 'cmu-pronouncing-dictionary';

const testWords = ['hello', 'world', 'church', 'the', 'transliteration'];

for (const word of testWords) {
  const pronunciation = dictionary[word];
  console.log(`${word}: ${pronunciation}`);
}
