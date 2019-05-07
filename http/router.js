const Router = require('koa-router');
const UserController = require('./user-controller');

const router = new Router();

router.get('/users', UserController.showUsers);

module.exports = router.routes();