const Router                   = require('koa-router');
const logginRequiredMiddleware = require('../../Middleware/logginRequiredMiddleware');
const LoginController          = require('../../src/Controller/LoginController');
const NewsfeedController         = require('../../src/Controller/NewsfeedController');
const LogoutController = require('../../src/Controller/LogoutController');

const router                   = new Router();
const loginController          = new LoginController();
const logoutController = new LogoutController();
const newsfeedController         = new NewsfeedController();

router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.postLogin)
    .get('/logout', logoutController.getLogout)
    .post('/signup', () => {
        ctx.body = {message: signup};
    })   
    .get('/newsfeed', logginRequiredMiddleware, newsfeedController.getNewsfeed);

module.exports = router.routes();
