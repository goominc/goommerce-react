const config = require('./config');

const app = new (require('express'))();

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
  getAuth: (req, callback) => {
    request
      .get('http://localhost:8080/api/v1/login')
      .set('Cookie', `connect.sid=${req.cookies['connect.sid']}`)
      .end(callback);
  },
}));

app.listen(config.port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
