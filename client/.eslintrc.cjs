import vitest from "eslint-plugin-vitest";

module.exports = {
  parser: "@typescript-eslint/parser",
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
    "plugin:vitest/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    quotes: ["error", "double"],
  },
  globals: {
    ...vitest.environments.env.globals,
  },
};
