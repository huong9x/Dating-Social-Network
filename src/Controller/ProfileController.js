const config = require('../../knexfile');
const knex   = require('knex')(config); 

class ProfileController {

    async goProfile(ctx) {
        ctx.redirect('/profile/' + ctx.session.loggedInUserId);
    }

    async getProfile(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        return await ctx.render('profile.html', { user, main_user });
    }
}

module.exports = ProfileController;