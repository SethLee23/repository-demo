module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // allow optionalDependencies
    // try to fix the line break problem
    'linebreak-style': ['error', 'windows'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
