const defaultConfig = {
  port: 8080,
  title: 'GOOMMERCE',
  favicon: 'favicon.ico',
  cloudfront: {
    domain: 'd1v1n6p63zq2b9.cloudfront.net',
  },
  apiRoot: 'http://localhost:8081',
};

const environmentConfig = {
  production: {
    port: 80,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(defaultConfig, environmentConfig);
