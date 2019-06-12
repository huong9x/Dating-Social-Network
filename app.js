const Koa                  = require('koa');
const database             = require('./config/database/database');
const config               = require('./knexfile');
const knex                 = require('knex')(config); 
const routes               = require('./router');
const path                 = require('path');
const static               = require('koa-static');
const bodyParser           = require('koa-bodyparser');
const session              = require('koa-session');

const userProvider         = require('./resources/User/user.provider');
const postProvider         = require('./resources/Posts/post.provider');
const likeProvider         = require('./resources/Likes/Like.Provider');
const commentProvider      = require('./resources/Comments/Comment.Provider');
const notificationProvider = require('./resources/Notifications/Notification.Provider');
const mediaProvider        = require('./resources/Media/Media.Provider');
const friendProvider       = require('./resources/Friend/Friend.Provider');


const authProvider         = require('./config/auth/Auth.Provider');
const hasherProvider       = require('./config/hasher/hasherProvider');

const njProvider           = require('./nunjucks.provider');
const staticPath           = './config/views';

const app                  = new Koa();
app.keys                   = ['some-secret-key'];


app.use(static(path.join( __dirname, staticPath)));


app.use(session(app));
app.use(hasherProvider(10));
app.use(bodyParser());
app.use(userProvider(knex));
app.use(postProvider(knex));
app.use(likeProvider(knex));
app.use(commentProvider(knex));
app.use(notificationProvider(knex));
app.use(mediaProvider(knex));
app.use(friendProvider(knex));
app.use(authProvider());
app.use(njProvider());
// app.use(multerProvider());
app.use(database.connectionProvider(config));
app.use(routes);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started on port: 5000');
});
