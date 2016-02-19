// Copyright (C) 2016 Goom Inc. All rights reserved.

const _ = require('lodash');
const config = require('./config');

const Express = require('express');
const app = new Express();

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
app.all('/api/*', (req, res) => {
  apiProxy.web(req, res, { target: 'http://localhost:8080' });
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const request = require('superagent');

app.use((req, res, next) => {
  // 2016. 02. 13. [heekyu] this is not efficient but only for development
  const i18n = {
    ko: _.assign({}, require('./pc-site/i18n/mainpage.ko.json')),
  };
  req.i18n = i18n;
  req.locale = 'ko';
  req.currency = 'KRW';
  next();
});

app.use(require('./middleware')({
  hot: app.get('env') === 'development',
  localBundle: app.get('env') === 'production',
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
