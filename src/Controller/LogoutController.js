const config = require('../../knexfile');
const knex   = require('knex')(config); 

class LogoutController {

    async getLogout(ctx) {
        ctx.authenticator.logout();
        return ctx.redirect('/newsfeed');
    };
};

module.exports = LogoutController;