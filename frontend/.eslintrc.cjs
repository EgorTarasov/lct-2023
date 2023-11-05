module.exports = {
  env: {
    browser: true,

    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:prettier/recommended", "plugin:jsx-a11y/recommended"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  plugins: ["@typescript-eslint", "react", "jsx-a11y"],
  rules: {
    indent: "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "linebreak-style": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-unused-vars": "off",
    "no-undef": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-namespace": "off"
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
};
