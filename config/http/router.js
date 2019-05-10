const Router                   = require('koa-router');
const logginRequiredMiddleware = require('../../Middleware/logginRequiredMiddleware');
const LoginController          = require('../../src/Controller/LoginController');
const DatingController         = require('../../src/Controller/DatingController');
const LogoutController = require('../../src/Controller/LogoutController');

const router                   = new Router();
const loginController          = new LoginController();
const logoutController = new LogoutController();
const datingController         = new DatingController();

router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.postLogin)
    .get('/logout', logoutController.getLogout)
    .post('/signup', () => {
        ctx.body = {message: signup};
    })   
    .get('/newsfeed', logginRequiredMiddleware, datingController.getNewsfeed);

module.exports = router.routes();
