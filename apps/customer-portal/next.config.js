// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const { i18n } = require('../../next-i18next.config');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  swcMinify: true,
  i18n,
  async redirects() {
    return [
      {
        source: '/my-account',
        destination: '/my-account/personal-details',
        permanent: true
      }
    ]
  }
};

module.exports = withNx(nextConfig);
