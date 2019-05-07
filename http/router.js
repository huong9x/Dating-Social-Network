const Router = require('koa-router');
// const UserController = require('./user-controller');

const router = new Router();

router
    .get('/login', async (context) => {
        context.render('login.html', { username: 'username' });
    });

module.exports = router.routes();