const Router          = require('koa-router');
const LoginController = require('../../src/Controller/LoginController');

const router          = new Router();
const loginController = new LoginController();


router
    .get('/login', loginController.getLogin)
    .post('/login', loginController.postLogin)

module.exports = router.routes();
