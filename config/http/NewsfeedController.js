const FindByUserFeedId = require('../../resources/Post/FindByUserFeedId');

class NewsfeedController {

    async getNewsfeed(ctx) {
        let list_friends = ctx.request.friends;

        let friends = list_friends.map((friend) => friend.getUserId())
        let list_post  = await ctx.postRepository.find(new FindByUserFeedId(ctx.session.loggedInUserId, friends));
        let posts = [];
        for (var i = 0; i < list_post.length; i++) {
            let post = await ctx.postDetailFinder.find(list_post[i].getPostId());
            posts.push(post);
          };
        ctx.render('newsfeed.html', { ctx, posts });
    }
}

module.exports = NewsfeedController;