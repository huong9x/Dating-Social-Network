const Koa            = require('koa');
const database       = require('./database/database');
const config         = require('./knexfile');
const routes         = require('./http/router');
const njProvider     = require('./nunjucks.provider');
const path           = require('path');
const static         = require('koa-static');

const app = new Koa();

const staticPath = './views';

app.use(static(
  path.join( __dirname,  staticPath)
));


app.use(njProvider());
app.use(database.connectionProvider(config));
app.use(routes);

app.listen(process.env.PORT);
