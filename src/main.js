import fs from 'fs';
import { readJson, createIndexContent, createCategoryContent } from './lib/helpers.js';

/**
 * Skrifar skilaboð í console.
 *
 * @param {string} message - Skilaboð sem á að prenta.
 * @param {boolean} [isError=false] - Ef satt, prentar sem error.
 */
function log(message, isError = false) {
  if (isError) {
    console.error(`[ERROR] ${message}`);
  } else {
    console.log(`[LOG] ${message}`);
  }
}

/**
 * Býr til index.html með lista af spurningaflokkum.
 *
 * @param {Array} categories - Fylki af hlutum með 'title' og 'file'.
 */
function createIndex(categories) {
  log('Creating index.html');
  const html = createIndexContent(categories);
  fs.writeFileSync('./dist/index.html', html);
  log('index.html created');
}

/**
 * Býr til HTML síðu fyrir tiltekinn spurningaflokk.
 *
 * @param {string} fileName - Nafn á JSON skrá (t.d. html.json).
 * @param {string} title - Titill spurningaflokks.
 */
function createCategoryPage(fileName, title) {
  log(`Creating page for: ${title}`);
  let data;
  try {
    data = readJson(`./data/${fileName}`);
  } catch (error) {
    log(`Error reading data for ${fileName}: ${error.message}`, true);
    return;
  }
  let html;
  try {
    html = createCategoryContent(data, title);
  } catch (error) {
    log(`Error in data for ${fileName}: ${error.message}`, true);
    return;
  }
  const outputPath = `./dist/${fileName.replace('.json', '.html')}`;
  fs.writeFileSync(outputPath, html);
  log(`${outputPath} created`);
}

/**
 * Aðalfall sem keyrir forritið:
 *  - Athugar hvort dist/ möppan sé til og býr hana til ef ekki.
 *  - Les index.json og býr til index.html og síður fyrir hvern flokk.
 */
function main() {
  log('Starting application');

  // Athuga og búa til dist/ möppu ef hún er ekki til
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
    log('dist/ folder created');
  }

  // Lesa index.json
  let categories;
  try {
    categories = readJson('./data/index.json');
  } catch (error) {
    log(error.message, true);
    return;
  }
  if (!Array.isArray(categories)) {
    log('index.json does not contain an array', true);
    return;
  }

  // Veljum aðeins gildar flokka
  const validCategories = categories.filter(cat => cat.title && cat.file);
  if (validCategories.length < categories.length) {
    log('Some invalid categories were skipped', true);
  }

  // Búa til index.html
  createIndex(validCategories);

  // Búa til síður fyrir hvern flokk
  validCategories.forEach(cat => {
    createCategoryPage(cat.file, cat.title);
  });

  log('Application executed successfully');
}

main();
