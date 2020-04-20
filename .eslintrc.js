module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [0, 'never'],
    "no-tabs": "off",
    'no-console': 'off',
    // "vue/html-self-closing": ["error", {
    //   "html": {
    //     "void": "never",
    //     "normal": "any",
    //     "component": "any"
    //   },
    //   "svg": "always",
    //   "math": "always"
    // }],
    // "vue/max-attributes-per-line": [2, {
    //   "singleline": 10,
    //   "multiline": {
    //     "max": 1,
    //     "allowFirstLine": false
    //   }
    // }],
    // "vue/singleline-html-element-content-newline": "off",
    // "vue/multiline-html-element-content-newline": "off",
    // "vue/name-property-casing": ["error", "PascalCase"],
    // "vue/no-v-html": "off",
    // 'accessor-pairs': 2,
    // 'arrow-spacing': [2, {
    //   'before': true,
    //   'after': true
    // }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ]
}
