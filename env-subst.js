const fs = require('fs');
const dotenv = require('dotenv');

const envFile = fs.readFileSync('.env.production', 'utf-8');
const envConfig = dotenv.parse(envFile);

const prodConfigFile = fs.readFileSync('src/environments/environment.prod.template.ts', 'utf-8');
const newConfigFile = prodConfigFile
  .replace('${MEILISEARCH_API_KEY}', envConfig.MEILISEARCH_API_KEY)
  .replace('${MEILISEARCH_API_URL}', envConfig.MEILISEARCH_API_URL)
  .replace('${API_URL}', envConfig.API_URL);

fs.writeFileSync('src/environments/environment.prod.template.ts', newConfigFile);
