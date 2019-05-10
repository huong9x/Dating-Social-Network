const config = require('../../knexfile');
const knex   = require('knex')(config); 

class SignupController {

    async postSignup(ctx, next) {
        const {first_name, last_name, email, username, password, birth_date, gender} = ctx.request.body;
        console.log(first_name, last_name, email, username, password, birth_date, gender);
        
        try {
            let user = await ctx.authenticator.preventDuplicate(username);

            ctx.authenticator.login(user);
            ctx.redirect('/newsfeed');

        } catch(e) {
            return ctx.redirect('/login');    
        }
        
    }
}

module.exports = SignupController;