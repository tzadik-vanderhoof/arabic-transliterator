import sharp from 'sharp';
import { mkdirSync } from 'fs';

const sizes = [16, 48, 128];

mkdirSync('icons', { recursive: true });

for (const size of sizes) {
  const fontSize = Math.floor(size * 0.7);
  const y = Math.floor(size * 0.78);
  const radius = Math.floor(size * 0.15);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="#1a73e8"/>
    <text x="${size / 2}" y="${y}" font-size="${fontSize}" text-anchor="middle" fill="white" font-family="Arial, Segoe UI, sans-serif">ع</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(`icons/icon${size}.png`);
  console.log(`icons/icon${size}.png`);
}
