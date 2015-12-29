require('babel-core/register');

const config = require('./config');

const app = require('./server/app');

app.listen(config.port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
