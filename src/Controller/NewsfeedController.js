class NewsfeedController {

    async getNewsfeed(ctx) {
        ctx.render('newsfeed.html', { ctx });
    }
    async postStatus(ctx) {
        const {status} = ctx.req.body;

        let post = await ctx.postRepository.addNewPost(ctx.session.loggedInUserId, status);

        let data = ctx.req.files.map(file => ({ post_id: post.getPostId(), filename: file.filename}));

        let mediaPost = await ctx.mediaRepository.addMedia(data);

        return ctx.redirect('/newsfeed');
    }
}

module.exports = NewsfeedController;