import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

mkdirSync('docs/screenshots', { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

await page.goto('https://en.wikipedia.org/wiki/Coffee', { waitUntil: 'networkidle2' });

await page.screenshot({ path: 'docs/screenshots/before.png' });
console.log('docs/screenshots/before.png');

await page.addScriptTag({ path: 'screenshot-bundle.js' });
await new Promise(r => setTimeout(r, 1000));

await page.screenshot({ path: 'docs/screenshots/after.png' });
console.log('docs/screenshots/after.png');

await browser.close();
