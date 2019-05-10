const Router                   = require('koa-router');
const logginRequiredMiddleware = require('../../Middleware/logginRequiredMiddleware');
const LoginController          = require('../../src/Controller/LoginController');
const NewsfeedController       = require('../../src/Controller/NewsfeedController');
const LogoutController         = require('../../src/Controller/LogoutController');
const ProfileController        = require('../../src/Controller/ProfileController');

const router                   = new Router();
const loginController          = new LoginController();
const logoutController         = new LogoutController();
const newsfeedController       = new NewsfeedController();
const profileController        = new ProfileController();

router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.postLogin)
    .get('/logout', logoutController.getLogout)
    .post('/signup', () => {
        ctx.body = {message: signup};
    })   
    .get('/newsfeed', logginRequiredMiddleware, newsfeedController.getNewsfeed)
    .get('/profile', logginRequiredMiddleware, profileController.getProfile)
    ;

module.exports = router.routes();
