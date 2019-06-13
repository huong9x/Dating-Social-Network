class NewsfeedController {

    async getNewsfeed(ctx) {
        let posts = await ctx.postRepository.getUserFeedPost(ctx.session.loggedInUserId);
        // console.log(posts);
        ctx.render('newsfeed.html', { ctx, posts });
    }
}

module.exports = NewsfeedController;