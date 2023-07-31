module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "jsx-quotes": [2, "prefer-single"],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/indent": "error"
  },
};
