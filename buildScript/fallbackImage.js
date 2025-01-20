// -----------------------------------
// vite-plugin-webp-and-pathだとjpgやpngがwebpにされて元拡張子が消えてしまうため、
// vite-plugin-webp-and-pathとvite-plugin-imageminを切り替えて元拡張子を残すようにする
// -----------------------------------
import fs from 'fs';

const filePath = './dev.config.json';
const setFallbackImage = (value) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const config = JSON.parse(fileContent);
  config.fallbackImage = value;
  const updatedContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
};

const value = process.argv[2] === 'true';
setFallbackImage(value);
