class NewsfeedController {
    constructor(knex) {
        this.knex = knex;
    }

    async getNewsfeed(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { main_user });
    }
    async postStatus(ctx) {
        const {status} = ctx.request.body;
        let newpost    = ctx.postRepository.addNewPost(ctx.session.loggedInUserId, status);
        return ctx.redirect('/newsfeed', newpost);
    }

}

module.exports = NewsfeedController;