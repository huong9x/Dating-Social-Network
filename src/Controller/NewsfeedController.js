class NewsfeedController {

    async getNewsfeed(ctx) {

        let findRequestFollowers = ctx.friendRepository.findRequestFollowers(ctx.session.loggedInUserId);
        console.log(findRequestFollowers);
        ctx.render('newsfeed.html', { ctx, findRequestFollowers });
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