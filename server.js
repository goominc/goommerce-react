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
  const i18n = {
    en: {},
    ko: {},
    'zh-cn': {},
    'zh-tw': {},
  };
  const allTexts = require('./desktop-site/i18n/texts.js');
  const dfs = (prefix, node) => {
    if (node.en) {
      Object.keys(i18n).forEach((locale) => {
        if (node[locale]) {
          _.set(i18n[locale], prefix, node[locale]);
        }
      });
    } else {
      Object.keys(node).forEach((k) => dfs(`${prefix}.${k}`, node[k]));
    }
  };
  Object.keys(allTexts).forEach((k) => dfs(k, allTexts[k]));
  req.i18n = i18n;
  req.locale = 'en';
  req.currency = 'KRW';
  next();
});

app.use(require('./middleware')({
  hot: app.get('env') === 'development',
  getAuth: (req, callback) => {
    request
      .get('http://localhost:8080/api/v1/login')
      .set('Cookie', `connect.sid=${req.cookies['connect.sid']}`)
      .end((err, res) => callback(err, res && res.body));
  },
}));

app.listen(config.port, (error) => {
  console.log('Server is listening on', config.port); // eslint-disable-line no-console
  if (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
