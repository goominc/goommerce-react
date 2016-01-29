const defaultConfig = {
  port: 3000,
  title: 'GOOMMERCE',
  cloudfront: {
    domain: 'd1v1n6p63zq2b9.cloudfront.net',
  },
  bundle: {
    version: 'b9dde5176529a64fbff9031a61a492be4909ad67',
  },
};

const environmentConfig = {
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(defaultConfig, environmentConfig);
