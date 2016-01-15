const config = require('./config');

const app = new (require('express'))();

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

app.all('/api/*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:8080' });
});

app.use(require('./middleware')({
  hot: app.get('env') === 'development',
}));

app.listen(config.port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
