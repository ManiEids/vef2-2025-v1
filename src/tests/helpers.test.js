import { describe, it, expect, vi } from 'vitest'; // Prófunartól
import { readJson, createIndexContent, createCategoryContent } from '../lib/helpers.js';
import fs from 'fs'; // Til að herma eftir skráalestri

// Herma eftir fs (mock)
vi.mock('fs');

describe('readJson Function', () => {
  it('les rétt JSON skrá', () => {
    // Herma eftir skrá
    fs.readFileSync.mockReturnValue('{"key":"value"}');
    const result = readJson('mock.json');
    expect(result).toEqual({ key: 'value' });
  });

  it('error - skrá ekki til', () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });
    expect(() => readJson('invalid.json')).toThrow('Error reading file invalid.json: File not found');
  });
});

describe('createIndexContent Function', () => {
  it('býr til rétt HTML fyrir categories', () => {
    const categories = [
      { title: 'HTML', file: 'html.json' },
      { title: 'CSS', file: 'css.json' },
    ];
    const html = createIndexContent(categories);
    expect(html).toContain('<h1>Quiz Categories</h1>'); // Próf fyrirsögn
    expect(html).toContain('<li><a href="html.html">HTML</a></li>'); // Próf HTML category
    expect(html).toContain('<li><a href="css.html">CSS</a></li>'); // Próf CSS category
  });
});

describe('createCategoryContent Function', () => {
  it('býr til rétt HTML fyrir spurningar', () => {
    const categoryData = {
      questions: [
        {
          question: 'What is HTML?',
          answers: [
            { answer: 'HyperText Markup Language', correct: true },
            { answer: 'Wrong Answer', correct: false },
          ],
        },
      ],
    };
    const html = createCategoryContent(categoryData, 'HTML');
    expect(html).toContain('<h1>HTML</h1>'); // Fyrirsögn
    expect(html).toContain('<p>What is HTML?</p>'); // Spurning
    expect(html).toContain('<button data-correct="true">HyperText Markup Language</button>'); // Rétt svar
    expect(html).toContain('<button data-correct="false">Wrong Answer</button>'); // Rangt svar
  });

  it('error check - category data', () => {
    expect(() => createCategoryContent(null, 'HTML')).toThrow('Invalid category data');
  });
});
