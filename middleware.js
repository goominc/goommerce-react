const config = require('./config');
const MobileDetect = require('mobile-detect');
const serialize = require('serialize-javascript');
const serveStatic = require('serve-static');
const webpack = require('webpack');
const _ = require('lodash');

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

  if (!opts.cdnPath) {
    middlewares.push(serveStatic(`${__dirname}/dist`));
  }

  middlewares.push((req, res) => {
    const cdn = `//${config.cloudfront.domain}`;
    function path(name) {
      // 2016. 04. 19. [heekyu] do not use goommerce-react's build config
      // use gommerce's config(opts.cdnPath)
      if (opts.cdnPath) {
        return `${opts.cdnPath}/${name}`;
      }
      return `/${name}`;
    }
    const md = new MobileDetect(req.headers['user-agent']);

    /* copy viewport content from aliexpress */
    function sendMobile(initialState, gaid) {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="baidu-site-verification" content="bKrngH8Iko" />
            <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width">
            <meta name="keywords" content="韩国东大门代购 ">
            <meta name="description" content="东大门服装批发代购网站_韩国东大门代购_韩国进货攻略_韩国代购货源">
            <meta property="og:title" content="링크샵스"/>
            <meta property="og:type"          content="website" />
            <meta property="og:url" content="http://www.linkshops.com"/>
            <meta property="og:image" content="http://d3f03u7lex6hmc.cloudfront.net/front/resource/extra/linkshops_logo.png"/>
            <meta property="og:description" content="동대문 도매상품을 한 눈에! 주문만 하면 배송까지 한번에!"/>
            <title>${config.title}</title>
            <link href="//fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">
	        <link href="//fonts.googleapis.com/css?family=Roboto:400,500,700|Roboto+Condensed:400,700" rel="stylesheet" type="text/css">
          </head>
          <body>
            <div id='root'></div>
            <script src="${cdn}/vendor/jquery-1.11.3.min.js"></script>
            <script>window.__INITIAL_STATE__ = ${serialize(initialState)};</script>
            ${gaid ? `<script>window.gaid="${gaid}"</script>` : ''}
            <script src="${path('app.mobile.bundle.js')}"></script>
            <script src="https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js"></script>
          </body>
        </html>
      `);
    }

    function send(initialState, gaid) {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="baidu-site-verification" content="bKrngH8Iko" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="keywords" content="韩国东大门代购 ">
            <meta name="description" content="东大门服装批发代购网站_韩国东大门代购_韩国进货攻略_韩国代购货源">
            <meta property="og:title" content="링크샵스"/>
            <meta property="og:type"          content="website" />
            <meta property="og:url" content="http://www.linkshops.com"/>
            <meta property="og:image" content="http://d3f03u7lex6hmc.cloudfront.net/front/resource/extra/linkshops_logo.png"/>
            <meta property="og:description" content="동대문 도매상품을 한 눈에! 주문만 하면 배송까지 한번에!"/>
            <title>${config.title}</title>
          </head>
          <body>
            <div id='root'></div>
            <script src="${cdn}/vendor/jquery-1.11.3.min.js"></script>
            <script>window.__INITIAL_STATE__ = ${serialize(initialState)};</script>
            ${gaid ? `<script>window.gaid="${gaid}"</script>` : ''}
            <script src="${path('app.bundle.js')}"></script>
            <script src="//d3f03u7lex6hmc.cloudfront.net/front/resource/extra/pace.js"></script>
            <script src="https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js"></script>
          </body>
        </html>
      `);
    }

    if (req.method === 'GET' && req.accepts('html')) {
      const reportGA = (auth) => {
        if (!config.ga) {
          return false;
        }
        const blackList = ['175.192.225.185'];
        // http://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address#answer-10849772
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        for (var i = 0; i < blackList.length; i++) { // eslint-disable-line
          if (ip.indexOf(blackList[i]) > -1) { // eslint-disable-line
            return false;
          }
        }
        if (auth) {
          // 2016. 04. 19. [heekyu] TODO remove common logic
          for (var i = 0; i < (auth.roles || []).length; i++) { // eslint-disable-line
            const role = auth.roles[i]; // eslint-disable-line
            if (role.type === 'admin') {
              return false;
            }
          }
        }
        return true;
      };
      opts.getAuth(req, (err, auth) => {
        const host = req.get('host');
        const initialState = {
          currency: { activeCurrency: req.currency },
          // brand: { pathnameMap: { '/amore': 2038 } },
          brand: { pathnameMap: opts.getBrandPathnameMap ? opts.getBrandPathnameMap() : { '/amore': 2038 } },
        };
        if (!err) {
          initialState.auth = auth;
        }
        if (req.i18n) {
          initialState.i18n = req.i18n;
          initialState.i18n.activeLocale = req.locale;
        }

        const isReportGA = reportGA(auth);

        if (host === config.mobileSite) {
          return sendMobile(initialState, isReportGA ? _.get(config, 'ga.mobile') : null);
        }
        const mobileRedirectKey = 'mobile_redirect';
        // 2016. 05. 31. [heekyu] tablet is mobile since payment
        if (!req.cookies[mobileRedirectKey] && config.mobileSite && md.mobile()) {
          req.cookies[mobileRedirectKey] = true;
          // 2016. 04. 08. [heekyu] Use this on local test
          // return sendMobile(initialState);
          return res.redirect(`//${config.mobileSite}${req.originalUrl}`);
        }

        return send(initialState, isReportGA ? _.get(config, 'ga.desktop') : null);
      });
    }
  });
  return middlewares;
};
