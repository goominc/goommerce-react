const config = require('./config');

const express = require('express');
const app = new express();
if (app.get('env') === 'production') {
  app.use(express.static(`${__dirname}/dist/`));
}

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
app.all('/api/*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:8080' });
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const request = require('superagent');
app.use(require('./middleware')({
  hot: app.get('env') === 'development',
  localBundle: true,
  getAuth: (req, callback) => {
    request
      .get('http://localhost:8080/api/v1/login')
      .set('Cookie', `connect.sid=${req.cookies['connect.sid']}`)
      .end((err, res) => callback(err, res && res.body));
  },
}));

app.listen(config.port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
