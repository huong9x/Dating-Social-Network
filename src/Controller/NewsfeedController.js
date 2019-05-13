class NewsfeedController {
    constructor(knex) {
        this.knex = knex;
    }

    async getNewsfeed(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { main_user });
    }
    async postStatus(context) {
        const {status} = context.request.body;
        let newpost    =  context.postRepository.addNewPost(status);
        return context.redirect('/newsfeed', newpost);
    }

}

module.exports = NewsfeedController;