import fs from 'fs';
import { readJson, createIndexContent, createCategoryContent } from './lib/helpers.js';

/**
 * Skrifar skilaboð bæði í console og í log-skrána.
 *
 * @param {string} message - Skilaboð sem á að prenta.
 * @param {boolean} [isError=false] - Ef satt, prentar sem error.
 */
function logToFile(message, isError = false) {
  const logFilePath = './dist/terminalOutput.txt';
  if (isError) {
    console.error(message);
  } else {
    console.log(message);
  }
  fs.appendFileSync(logFilePath, `${isError ? '[ERROR]' : '[LOG]'} ${message}\n`);
}

/**
 * Býr til index.html með lista af spurningaflokkum.
 *
 * @param {Array} categories - Fylki af hlutum með 'title' og 'file'.
 */
function createIndex(categories) {
  logToFile('Creating index.html');
  const html = createIndexContent(categories);
  fs.writeFileSync('./dist/index.html', html);
  logToFile('index.html created');
}

/**
 * Býr til HTML síðu fyrir tiltekinn spurningaflokk.
 *
 * @param {string} fileName - Nafn á JSON skrá (t.d. html.json).
 * @param {string} title - Titill spurningaflokks.
 */
function createCategoryPage(fileName, title) {
  logToFile(`Creating page for: ${title}`);
  let data;
  try {
    data = readJson(`./data/${fileName}`);
  } catch (error) {
    logToFile(error.message, true);
    return;
  }
  let html;
  try {
    html = createCategoryContent(data, title);
  } catch (error) {
    logToFile(`Error in data for ${fileName}: ${error.message}`, true);
    return;
  }
  const outputPath = `./dist/${fileName.replace('.json', '.html')}`;
  fs.writeFileSync(outputPath, html);
  logToFile(`${outputPath} created`);
}

/**
 * Aðalfall sem keyrir forritið:
 *  - Athugar hvort dist/ möppan sé til og býr hana til ef ekki.
 *  - Hreinsar log-skrána.
 *  - Les index.json og býr til index.html og síður fyrir hvern flokk.
 */
function main() {
  logToFile('Starting application');

  // Athuga og búa til dist/ möppu ef hún er ekki til
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
    logToFile('dist/ folder created');
  }

  // Hreinsa log-skrána
  const logFilePath = './dist/terminalOutput.txt';
  fs.writeFileSync(logFilePath, '');

  // Lesa index.json
  let categories;
  try {
    categories = readJson('./data/index.json');
  } catch (error) {
    logToFile(error.message, true);
    return;
  }
  if (!Array.isArray(categories)) {
    logToFile('index.json does not contain an array', true);
    return;
  }

  // Veljum aðeins gildar flokka
  const validCategories = categories.filter(cat => cat.title && cat.file);
  if (validCategories.length < categories.length) {
    logToFile('Some invalid categories were skipped', true);
  }

  // Búa til index.html
  createIndex(validCategories);

  // Búa til síður fyrir hvern flokk
  validCategories.forEach(cat => {
    createCategoryPage(cat.file, cat.title);
  });

  logToFile('Application executed successfully');
}

main();
