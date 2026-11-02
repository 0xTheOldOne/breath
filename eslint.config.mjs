import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**", ".playwright-mcp/**"],
  },
  js.configs.recommended,
  // "essential" only: correctness rules, no formatting churn.
  ...pluginVue.configs["flat/essential"],
  {
    files: ["src/**/*.{js,vue}"],
    rules: {
      // Existing single-word names (Menu, Breather); renaming them is a separate refactor.
      "vue/multi-word-component-names": "off",
      "vue/no-reserved-component-names": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        // Injected by webpack DefinePlugin / used by require.context.
        process: "readonly",
        require: "readonly",
      },
    },
  },
  {
    files: ["*.config.js", "vue.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
];
