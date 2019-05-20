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

        let post = await ctx.postRepository.addNewPost(ctx.session.loggedInUserId, status);

        let data = ctx.req.files.map(file => ({ post_id: post.getPostId(), filename: file.filename}));
        // console.log(ctx.mediaRepository.addMedia);

        let mediaPost = await ctx.mediaRepository.addMedia(data);
        // console.log(mediaPost.getPostId());

        return ctx.redirect('/newsfeed', main_user, mediaPost);
    }

}

module.exports = NewsfeedController;