const Koa                  = require('koa');
const database             = require('./config/database/database');
const config               = require('./knexfile')
const knex                 = require('knex')(config);
const routes               = require('./router');
const path                 = require('path');
const static               = require('koa-static');
const bodyParser           = require('koa-bodyparser');
const session              = require('koa-session');

const userProvider         = require('./resources/User/User.Provider');
const postProvider         = require('./resources/Post/Post.Provider');
const likeProvider         = require('./resources/LikeService/Like.Provider');
const commentProvider      = require('./resources/Comment/Comment.Provider');
const notificationProvider = require('./resources/Notification/Notification.Provider');
const mediaProvider        = require('./resources/Media/Media.Provider');
const friendProvider       = require('./resources/Friend/Friend.Provider');
const PostFinderService    = require('./resources/PostFinder/PostFinderService');


const authProvider         = require('./resources/Auth/Auth.Provider');
const hasherProvider       = require('./resources/Hasher/hasherProvider');

const njProvider           = require('./nunjucks.provider');
const viewsPath            = './views';
const storagePath          = './storage';

const app                  = new Koa();
app.keys                   = ['some-secret-key'];


app.use(static(path.join( __dirname, viewsPath)));
app.use(static(path.join( __dirname, storagePath)));


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
app.use(PostFinderService());
app.use(authProvider());
app.use(njProvider());


app.use(database.connectionProvider(config));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('Server started on port: ' + process.env.PORT);
});
