const defaultConfig = {
  port: 3000,
  title: 'LinkShops',
  cloudfront: {
    domain: 'd1v1n6p63zq2b9.cloudfront.net',
  },
  bundle: {
    version: 'b9dde5176529a64fbff9031a61a492be4909ad67',
  },
  mobileSite: 'm.localhost:3000',
};

const environmentConfig = {
  ubuntu: {
    mobileSite: 'mt.linkshops.com',
  },
  production: {
    mobileSite: 'm.linkshops.com',
    ga: {
      desktop: 'UA-76557867-1',
      mobile: 'UA-76557867-2',
    },
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(defaultConfig, environmentConfig);
