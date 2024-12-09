import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { 
      globals: globals.node,
      parserOptions: {
        project: "*/tsconfig.json" // Adiciona o caminho do tsconfig.json
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];