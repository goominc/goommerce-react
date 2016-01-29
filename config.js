const defaultConfig = {
  port: 3000,
  title: 'GOOMMERCE',
  cloudfront: {
    domain: 'd1v1n6p63zq2b9.cloudfront.net',
  },
  bundle: {
    version: 'acd81ce2975a2eb837d8f04141677648e180d939',
  },
};

const environmentConfig = {
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(defaultConfig, environmentConfig);
