'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import sharp from 'sharp';

const EXT = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

async function resizeDir(src, size = 2100) {
  const dest = path.resolve(src, 'resized');
  fs.mkdirSync(dest, { recursive: true });

  const files = fs.readdirSync(src);
  for (const name of files) {
    const file = path.resolve(src, name);
    const stat = fs.lstatSync(file);
    if (stat.isDirectory()) {
      continue;
    }
    const ext = path.parse(name).ext.toLowerCase();
    if (!EXT.includes(ext)) {
      continue;
    }
    console.log('resize', file);
    const buffer = fs.readFileSync(file);
    let resultBuffer;
    if (['.jpeg', '.jpg'].includes(ext)) {
      resultBuffer = await sharp(buffer, { animated: true })
        .resize({ width: size, height: size, fit: 'inside' })
        .withMetadata()
        .toBuffer();
    } else {
      resultBuffer = await sharp(buffer, { animated: true })
        .resize({ width: size, height: size, fit: 'inside' })
        .withMetadata()
        .jpeg({
          quality: 80,
          chromaSubsampling: '4:4:4',
        })
        .toBuffer();
    }
    const resultFileName = `${path.parse(name).name}-x${size}${ext}`;
    const resultFile = path.resolve(dest, resultFileName);
    fs.writeFileSync(resultFile, resultBuffer);
  }
}

const targetPath = path.resolve(__dirname, '../' + process.argv[2]);

resizeDir(targetPath);
