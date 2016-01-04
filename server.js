const config = require('./config');

const app = new (require('express'))();

app.use(require('./middleware')({
  hot: app.get('env') === 'development',
}));

app.listen(config.port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
