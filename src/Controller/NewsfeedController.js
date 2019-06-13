class NewsfeedController {

    async getNewsfeed(ctx) {
        let posts = await ctx.postRepository.getUserFeedPost(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { ctx, posts });
    }
}

module.exports = NewsfeedController;