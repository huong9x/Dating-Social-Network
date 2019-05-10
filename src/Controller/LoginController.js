const config = require('../../knexfile');
const knex   = require('knex')(config); 

class LoginController {

    async getLogin(ctx) {
        if (ctx.authenticator.check()) {
            return ctx.redirect('/newsfeed');
        }

        ctx.render('login.html', true);
    }

    async postLogin(ctx, next) {
        const {username, password} = ctx.request.body;
        console.log(username, password);
        
        try {
            let user = await ctx.authenticator.attempt(username, password); 

            ctx.authenticator.login(user);
            ctx.redirect('/newsfeed');

        } catch(e) {
            return ctx.redirect('/login');    
        }
        
    }
}

module.exports = LoginController;