module.exports = {
  use: [
    'neutrino-preset-mozilla-frontend-infra/styleguide',
    ['neutrino-preset-mozilla-frontend-infra/react-components', {
      targets: {
        browsers: 'ie 9',
      },
    }],
  ],
};
