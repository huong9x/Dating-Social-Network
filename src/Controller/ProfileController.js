const config = require('../../knexfile');
const knex   = require('knex')(config); 

class ProfileController {

    async getProfile(ctx) {
        let user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('profile.html', { user });
    }
}

module.exports = ProfileController;