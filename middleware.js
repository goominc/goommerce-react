const config = require('./config');
const MobileDetect = require('mobile-detect');
const serialize = require('serialize-javascript');
const serveStatic = require('serve-static');
const webpack = require('webpack');

module.exports = (opts) => {
  opts = opts || {};
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
    webpackRuntime('./webpack.desktop.config');
    webpackRuntime('./webpack.mobile.config');
  }

  if (opts.localBundle) {
    middlewares.push(serveStatic(`${__dirname}/dist`));
  }

  middlewares.push((req, res) => {
    const cdn = `//${config.cloudfront.domain}`;
    function path(name) {
      if (opts.hot || opts.localBundle) {
        return `/${name}`;
      }
      return `//${config.cloudfront.domain}/app/${config.bundle.version}/${name}`;
    }
    const md = new MobileDetect(req.headers['user-agent']);

    /* copy viewport content from aliexpress */
    function sendMobile(initialState) {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
            <title>${config.title}</title>
            <link rel="stylesheet" href="${cdn}/vendor/owl.carousel.css">
          </head>
          <body>
            <div id='root'></div>
            <script src="${cdn}/vendor/jquery-1.11.3.min.js"></script>
            <script src="${cdn}/vendor/owl.carousel.min.js"></script>
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
            <link rel="stylesheet" href="${cdn}/vendor/owl.carousel.css">
            <link href='//s3.ap-northeast-2.amazonaws.com/linkshops/front/resource/font/noto_sans.css' rel='stylesheet' type='text/css'>
	        <link href='//s3.ap-northeast-2.amazonaws.com/linkshops/front/resource/font/roboto.css' rel='stylesheet' type='text/css'>
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
        const initialState = {
          currency: { activeCurrency: req.currency },
        };
        if (!err) {
          initialState.auth = auth;
        }
        if (req.i18n) {
          initialState.i18n = req.i18n;
          initialState.i18n.activeLocale = req.locale;
        }
        if (host === config.mobileSite) {
          return sendMobile(initialState);
        }
        const mobileRedirectKey = 'mobile_redirect';
        if (!req.cookies[mobileRedirectKey] && config.mobileSite && md.mobile() && !md.tablet()) {
          req.cookies[mobileRedirectKey] = true;
          // 2016. 04. 08. [heekyu] Use this on local test
          // return sendMobile(initialState);
          return res.redirect(`//${config.mobileSite}/`);
        }
        return send(initialState);
      });
    }
  });
  return middlewares;
};
