const config = require('../../knexfile');
const knex   = require('knex')(config); 

class NewsfeedController {

    async getNewsfeed(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { main_user });
    }
    async postStatus(ctx) {
        const {status} = ctx.request.body;
        let a =  await ctx.userRepository.addNewStatus(new AddNewStatus(ctx.session.loggedInUserId, status));
        return ctx.redirect('/newsfeed');
    }

}

module.exports = NewsfeedController;