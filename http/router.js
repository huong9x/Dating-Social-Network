const Router                       = require('koa-router');
const koaBody                      = require('koa-body');
const SearchByExactlyNameCondition = require('../User/SearchByExactlyNameCondition');
const router                       = new Router();

router
    .get('/login', koaBody(),async (context) => {
        context.render('login.html', {  });
    })
    .post('/login', koaBody(), async (context) => {
        var username = context.request.body.username;
        var password = context.request.body.password;
        let newusers    = await context.userRepository.search(new SearchByExactlyNameCondition(username));
        console.log(newusers);
    });

module.exports = router.routes();
