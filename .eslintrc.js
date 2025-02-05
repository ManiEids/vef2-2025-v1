export default {
    env: {
      browser: true,
      node: true,
      es2021: true,
      vitest: true
    },
    extends: [
      "eslint:recommended"
      
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module"
    },
    rules: {}
  };
  