const defaultConfig = {
  port: 3000,
  title: 'GOOMMERCE',
  cloudfront: {
    domain: 'd1v1n6p63zq2b9.cloudfront.net',
  },
  apiRoot: 'http://localhost:8080',
};

const environmentConfig = {
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(defaultConfig, environmentConfig);
