class PostController {

    async viewPost(ctx) {
        try {
            let post             = await ctx.postRepository.findPost(ctx.query.id);
            let user             = await ctx.userRepository.getUserInfo(post.getUserId());
            let userShare        = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
            let comments         = await ctx.commentRepository.findComment(ctx.query.id);
            let likeExist        = await ctx.likeRepository.likeExist(ctx.session.loggedInUserId, ctx.query.id);
            let findPostOwner    = await ctx.postRepository.findPostOwner(ctx.query.id, ctx.session.loggedInUserId);            

            if(!ctx.query.id) {
                return ctx.redirect('/404page');
            }

            if(ctx.query.ref_page == 'like') {
                let like_count_tmp = await ctx.postRepository.findPost(ctx.query.id);
                if (likeExist == true) {
                    let like_count = like_count_tmp.getLikeCount() - 1;
                    await ctx.postRepository.updateLikeCount(ctx.query.id, like_count);
                    await ctx.likeRepository.unlikePost(ctx.session.loggedInUserId, ctx.query.id);
                    return ctx.redirect('/post?id=' + ctx.query.id);
                } else {
                    let like_count = like_count_tmp.getLikeCount() + 1;
                    await ctx.postRepository.updateLikeCount(ctx.query.id, like_count);
                    await ctx.likeRepository.likePost(ctx.session.loggedInUserId, ctx.query.id);
                    return ctx.redirect('/post?id=' + ctx.query.id);
                }
            }

            if(ctx.query.ref_page == 'share') {
                // return ctx.render('postshare.html');
            }

            if (ctx.query.idcomment) {
                let findCommentOwner = await ctx.commentRepository.findCommentOwner(ctx.session.loggedInUserId, ctx.query.idcomment);
                return ctx.render('postdetail.html', { post, findPostOwner, findCommentOwner, ctx, comments, user, likeExist, userShare });            
            } else {            
                return ctx.render('postdetail.html', { post, findPostOwner, ctx, comments, user, likeExist, userShare });
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