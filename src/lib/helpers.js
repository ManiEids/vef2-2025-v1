import fs from 'fs';

/**
 * Les JSON skrá og skilar parsed hlut.
 *
 * @param {string} filePath - Slóð á skrána.
 * @returns {any} Parsed JSON.
 * @throws Ef skráin finnst ekki eða innihald hennar er ógilt.
 */
export function readJson(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading file ${filePath}: ${error.message}`);
  }
}

/**
 * Býr til HTML streng fyrir forsíðu með spurningaflokkum.
 *
 * @param {Array} categories - Fylki af hlutum með 'title' og 'file'.
 * @returns {string} HTML innihald fyrir index síðu.
 */
export function createIndexContent(categories) {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quiz Categories</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 1rem; text-align: center; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { text-decoration: none; color: #333; }
    footer { margin-top: 2rem; font-size: 0.9rem; color: #666; }
    .banana { width: 100px; margin: 1rem auto; }
  </style>
</head>
<body>
  <h1>Quiz Categories</h1>
  <p>Created by <strong>Máni Eiðsson (mfe5)</strong></p>
  <img src="https://media.giphy.com/media/11bX0V2WibFJIk/giphy.gif" alt="Dancing Banana" class="banana">
  <ul>
`;
  categories.forEach(cat => {
    if (cat.title && cat.file) {
      html += `    <li><a href="${cat.file.replace('.json', '.html')}">${cat.title}</a></li>\n`;
    }
  });
  html += `  </ul>
  <footer>Thank you for visiting!</footer>
</body>
</html>
`;
  return html;
}

/**
 * Býr til HTML streng fyrir spurningaflokkssíðu.
 *
 * @param {object} categoryData - Gögn sem innihalda 'questions'.
 * @param {string} title - Titill spurningarflokkssíðunnar.
 * @returns {string} HTML innihald fyrir flokkssíðu.
 * @throws Ef gögnin eru ógild.
 */
export function createCategoryContent(categoryData, title) {
  if (!categoryData || !Array.isArray(categoryData.questions)) {
    throw new Error('Invalid category data');
  }
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 1rem; text-align: center; }
    .question { margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
    button { padding: 0.5rem 1rem; border: 1px solid #ccc; cursor: pointer; background-color: #f0f0f0; }
    button:disabled { cursor: default; opacity: 0.6; }
    .banana { width: 100px; margin: 1rem auto; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <img src="https://media.giphy.com/media/11bX0V2WibFJIk/giphy.gif" alt="Dancing Banana" class="banana">
`;
  categoryData.questions.forEach(question => {
    if (question.question && Array.isArray(question.answers)) {
      html += `
  <div class="question">
    <p>${question.question}</p>
    <ul>
`;
      question.answers.forEach(answer => {
        if (answer.answer) {
          html += `      <li><button data-correct="${answer.correct}">${answer.answer}</button></li>\n`;
        }
      });
      html += `    </ul>
  </div>
`;
    }
  });
  html += `
  <footer>Created by <strong>Máni Eiðsson (mfe5)</strong></footer>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const buttons = document.querySelectorAll('button[data-correct]');
      buttons.forEach(button => {
        button.addEventListener('click', function() {
          const isCorrect = button.getAttribute('data-correct') === 'true';
          const siblingButtons = button.closest('ul').querySelectorAll('button');
          siblingButtons.forEach(btn => { btn.disabled = true; });
          if (isCorrect) {
            button.style.backgroundColor = 'lightgreen';
            button.textContent += ' - Correct!';
          } else {
            button.style.backgroundColor = 'lightcoral';
            button.textContent += ' - Incorrect!';
          }
        });
      });
    });
  </script>
</body>
</html>
`;
  return html;
}
