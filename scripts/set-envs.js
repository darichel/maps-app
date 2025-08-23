
const { writeFileSync, mkdirSync, mkdir } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev   = './src/environments/environment.development.ts';

const mapboxKey = process.env.MAPBOX_KEY;

if(!mapboxKey) {
  throw new Error("MAPBOX_KEY is not defined");
}

const envFileContent = `
export const environment = {
  production: false,
  MAPBOX_KEY: '${mapboxKey}'
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
