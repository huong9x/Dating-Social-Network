class NewsfeedController {
    constructor(knex) {
        this.knex = knex;
    }

    async getNewsfeed(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { main_user });
    }
    async postStatus(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);

        const {status} = ctx.req.body;
        let files = ctx.req.files.map((file) => file.filename)
        console.log(status);
        console.log(files);
        // let post = await ctx.userRepository.addNewPost(ctx.session.loggedInUserId, status);
        // let media = await ctx.mediaRepository.addNewMedia(post.getPostId(), )
        return ctx.redirect('/newsfeed', main_user);
    }

}

module.exports = NewsfeedController;