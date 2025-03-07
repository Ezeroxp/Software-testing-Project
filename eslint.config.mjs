import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ["dist/**"],
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}", "src/**/*.{js,ts}"],
    languageOptions: {
      parser: tsparser,
      globals: {...globals.browser, process: true},
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-unused-vars": "off", // Explicitly disable the base rule
      "@typescript-eslint/no-unused-vars": ["off", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],

      "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true }],
    },
  },
];