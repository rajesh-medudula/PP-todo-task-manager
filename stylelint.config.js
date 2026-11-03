/** @type {import('stylelint').Config} */
/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // Completely disables class naming restrictions globally
    'selector-class-pattern': null,
  },
};
