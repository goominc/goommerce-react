const config = require('../config');

const app = module.exports = new (require('express'))();

if (app.get('env') === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

const serialize = require('serialize-javascript');
app.use((req, res) => {
  function path(name) {
    if (app.env === 'production') {
      return `//${config.cloudfront.domain}/app/${config.bundle.version}/${name}`;
    }
    return `/${name}`;
  }

  if (req.method === 'GET' && req.accepts('html')) {
    const initialState = {};
    const cdn = '//' + config.cloudfront.domain;

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${config.title}</title>
          <link rel="stylesheet" href="${cdn}/vendor/bootstrap-3.3.6/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="${path('app.css')}">
        </head>
        <body>
          <div id='root'></div>
          <script src="//widget.cloudinary.com/global/all.js"></script>
          <script src="${cdn}/vendor/jquery-1.11.3.min.js"></script>
          <script>window.__INITIAL_STATE__ = ${serialize(initialState)};</script>
          <script src="${path('app.bundle.js')}"></script>
        </body>
      </html>
      `);
  }
});
