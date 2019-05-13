const Koa            = require('koa');
const database       = require('./config/database/database');
const config         = require('./knexfile');
const knex           = require('knex')(config); 
const routes         = require('./config/http/router');
const path           = require('path');
const static         = require('koa-static');
const bodyParser     = require('koa-bodyparser');
const session        = require('koa-session');

const authProvider   = require('./config/auth/Auth.Provider');
const userProvider   = require('./User/user.provider');
const postProvider   = require('./Posts/post.provider');
const hasherProvider = require('./config/hasher/hasherProvider');
const njProvider     = require('./nunjucks.provider');
const staticPath     = './config/views';


const app            = new Koa();
app.keys             = ['some-secret-key'];

console.log(path.join( __dirname, staticPath));
app.use(static(path.join( __dirname, staticPath)));

app.use(session(app));
app.use(hasherProvider(10));
app.use(bodyParser());
app.use(userProvider(knex));
app.use(postProvider(knex));
app.use(authProvider());
app.use(njProvider());
app.use(database.connectionProvider(config));
app.use(routes);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started on port: 5000');
});
