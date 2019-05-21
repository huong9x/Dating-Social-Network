class PostController {
    constructor(knex) {
        this.knex = knex;
    }

    async viewPost(ctx) {
        if(!ctx.query.id) {
            return ctx.render('404Page.html');
        }
        let main_user        = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let post             = await ctx.postRepository.findPost(ctx.query.id);
        let user             = await ctx.userRepository.getUserInfo(post.getUserId());
        let comments         = await ctx.commentRepository.findComment(ctx.query.id);
        let likes            = await ctx.likeRepository.findLike(ctx.query.id);
        let likeExist        = await ctx.likeRepository.likeExist(ctx.session.loggedInUserId, ctx.query.id);
        let findPostOwner    = await ctx.postRepository.findPostOwner(ctx.query.id, ctx.session.loggedInUserId);
        let countLike        = likes.length;
        let countComment     = comments.length;
        
        if(ctx.query.ref_page == 'like') {
            if (likeExist == true) { 
                await ctx.likeRepository.unlikePost(ctx.session.loggedInUserId, ctx.query.id);
                return ctx.redirect('/post?id=' + ctx.query.id);
            } else {
                await ctx.likeRepository.likePost(ctx.session.loggedInUserId, ctx.query.id);
                return ctx.redirect('/post?id=' + ctx.query.id);
            }
        }

        return ctx.render('postdetail.html', { post, findPostOwner, ctx, countComment, comments, user, main_user, likeExist, countLike });
    }

    async editPost(ctx) {
        const {content} = ctx.request.body;
        let editPost = await ctx.postRepository.editPost(ctx.query.id, content);
        return ctx.redirect('/post?id=' + ctx.query.id, editPost);
    }

    async deletePost(ctx) {
        let deletepost = ctx.postRepository.deletePost(ctx.query.id);
        return ctx.redirect('/newsfeed', deletepost);
    }
}

module.exports = PostController;