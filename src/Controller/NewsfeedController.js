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
        return await ctx.postRepository.addNewStatus(new NewStatus(ctx.session.loggedInUserId, status));
    }

}

module.exports = NewsfeedController;