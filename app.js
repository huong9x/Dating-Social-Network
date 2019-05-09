const Koa            = require('koa');
const database       = require('./database/database');
const config         = require('./knexfile');
const knex           = require('knex')(config.development); 
const routes         = require('./http/router');
const path           = require('path');
const static         = require('koa-static');

const userProvider   = require('./User/user.provider');
const hasherProvider  = require('./hasher/hasherProvider');
const njProvider     = require('./nunjucks.provider');




const app = new Koa();

const staticPath = './views';

app.use(static(
  path.join( __dirname,  staticPath)
));

app.use(hasherProvider(10));
app.use(userProvider(knex));
app.use(njProvider());
app.use(database.connectionProvider(config));
app.use(routes);

app.listen(process.env.PORT);
