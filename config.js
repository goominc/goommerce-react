const defaultConfig = {
  port: 3000,
  title: 'GOOMMERCE',
  cloudfront: {
    domain: 'd1v1n6p63zq2b9.cloudfront.net',
  },
  bundle: {
    version: '6a4b58c1468aa5e58822c698a545998ee0fcd15f',
  },
};

const environmentConfig = {
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(defaultConfig, environmentConfig);
