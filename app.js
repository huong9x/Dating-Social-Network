const Koa            = require('koa');
const database       = require('./database/database');
const config         = require('./knexfile');
const routes         = require('./http/router');

const app = new Koa();

app.use(database.connectionProvider(config));
app.use(routes);

app.listen(process.env.PORT);
