const config = require('../../knexfile');
const knex   = require('knex')(config); 

class NewsfeedController {

    async getNewsfeed(ctx) {
        let user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { user });
    }

}

module.exports = NewsfeedController;