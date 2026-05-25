import { readFileSync, writeFileSync } from 'fs';
import { transliterate } from './transliterate.js';

const [,, inputFile, outputFile] = process.argv;
if (!inputFile || !outputFile) {
  console.error('Usage: node cli.js <inputFile> <outputFile>');
  process.exit(1);
}
let input;
try {
  input = readFileSync(inputFile, 'utf8');
} catch {
  console.error(`Error: could not read file "${inputFile}"`);
  process.exit(1);
}
const output = transliterate(input);
writeFileSync(outputFile, output, 'utf8');
