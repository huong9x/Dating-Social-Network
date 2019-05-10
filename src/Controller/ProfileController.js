const config = require('../../knexfile');
const knex   = require('knex')(config); 

class ProfileController {

    async getProfile(ctx) {
        ctx.render('profile.html', true);
    }
}

module.exports = ProfileController;