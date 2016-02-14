const config = require('./config');
const serialize = require('serialize-javascript');
const serveStatic = require('serve-static');

module.exports = (opts) => {
  opts = opts || {}; // eslint-disable-line no-param-reassign
  opts.getAuth = opts.getAuth || ((req, callback) => callback(null, {}));
  const middlewares = [];

  function webpackRuntime(configPath) {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require(configPath);

    const compiler = webpack(webpackConfig);
    middlewares.push(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }));
    middlewares.push(webpackHotMiddleware(compiler));
  }

  if (opts.hot) {
    const webpack = require('webpack');
    webpackRuntime('./webpack.config');
    webpackRuntime('./webpack.mobile.config');
  }

  if (opts.localBundle) {
    middlewares.push(serveStatic(__dirname + '/dist'));
  }

  middlewares.push((req, res) => {
    const cdn = '//' + config.cloudfront.domain;
    function path(name) {
      if (opts.hot || opts.localBundle) return `/${name}`;
      return `//${config.cloudfront.domain}/app/${config.bundle.version}/${name}`;
    }

    function sendMobile(initialState) {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${config.title}</title>
          </head>
          <body>
            <div id='root'></div>
            <script src="${cdn}/vendor/jquery-1.11.3.min.js"></script>
            <script>window.__INITIAL_STATE__ = ${serialize(initialState)};</script>
            <script src="${path('app.mobile.bundle.js')}"></script>
          </body>
        </html>
      `);
    }

    function send(initialState) {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${config.title}</title>
            <link rel="stylesheet" href="${path('app.css')}">
          </head>
          <body>
            <div id='root'></div>
            <script src="${cdn}/vendor/jquery-1.11.3.min.js"></script>
            <script src="${cdn}/vendor/owl.carousel.min.js"></script>
            <script>window.__INITIAL_STATE__ = ${serialize(initialState)};</script>
            <script src="${path('app.bundle.js')}"></script>
          </body>
        </html>
      `);
    }

    if (req.method === 'GET' && req.accepts('html')) {
      opts.getAuth(req, (err, auth) => {
        const host = req.get('host');
        // 2016. 01. 30. [heekyu] cannot use let
        var initialState = {};
        if (!err) {
          initialState = { auth };
        }
        if (req.i18n) {
          initialState.i18n = req.i18n;
          if (auth && auth.options && auth.options.locale) {
            initialState.i18n.activeLang = auth.options.locale;
          } else {
            initialState.i18n.activeLang = 'ko'; // default
          }
        }
        if (host.startsWith(config.mobileHostPrefix)) {
          return sendMobile(initialState);
        }
        send(initialState);
      });
    }
  });

  return middlewares;
};
