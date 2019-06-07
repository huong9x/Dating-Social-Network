class PostController {

    async viewPost(ctx) {
        try {
            let post             = await ctx.postRepository.findPost(ctx.query.id);
            let user             = await ctx.userRepository.getUserInfo(post.getUserId());
            let userShare        = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
            let comments         = await ctx.commentRepository.findComment(ctx.query.id);
            let shares           = await ctx.shareRepository.findShare(ctx.query.id);
            let likes            = await ctx.likeRepository.findLike(ctx.query.id);
            let likeExist        = await ctx.likeRepository.likeExist(ctx.session.loggedInUserId, ctx.query.id);
            let findPostOwner    = await ctx.postRepository.findPostOwner(ctx.query.id, ctx.session.loggedInUserId);            
            let countLike        = likes.length;
            let countComment     = comments.length;
            let countShare       = shares.length;

            if(!ctx.query.id) {
                return ctx.redirect('/404page');
            }

            if(ctx.query.ref_page == 'like') {
                if (likeExist == true) { 
                    await ctx.likeRepository.unlikePost(ctx.session.loggedInUserId, ctx.query.id);
                    return ctx.redirect('/post?id=' + ctx.query.id);
                } else {
                    await ctx.likeRepository.likePost(ctx.session.loggedInUserId, ctx.query.id);
                    return ctx.redirect('/post?id=' + ctx.query.id);
                }
            }
            if (ctx.query.idcomment) {
                let findCommentOwner = await ctx.commentRepository.findCommentOwner(ctx.session.loggedInUserId, ctx.query.idcomment);
                return ctx.render('postdetail.html', { post, findPostOwner, findCommentOwner, ctx, countComment, comments, user, likeExist, countLike, userShare, countShare });            
            } else {            
                return ctx.render('postdetail.html', { post, findPostOwner, ctx, countComment, comments, user, likeExist, countLike, userShare, countShare });
            }
        }
        catch(e) {
            console.log(e);
            return ctx.redirect('/404page');
        }
    }

    async editPost(ctx) {
        const {content} = ctx.request.body;
        let editPost = await ctx.postRepository.editPost(ctx.session.loggedInUserId, ctx.query.id, content);
        return ctx.redirect('/post?id=' + ctx.query.id, editPost);
    }

    async deletePost(ctx) {
        let deletepost = ctx.postRepository.deletePost(ctx.query.id);
        return ctx.redirect('/newsfeed', deletepost);
    }
}

module.exports = PostController;