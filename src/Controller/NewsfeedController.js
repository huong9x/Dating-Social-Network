class NewsfeedController {

    async getNewsfeed(ctx) {
        let posts = await ctx.postRepository.getUserFeedPost(ctx.session.loggedInUserId);

        ctx.render('newsfeed.html', { ctx, posts });
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