class CommentController {

    async postComment(ctx) {
        const {comment_text}  = ctx.request.body;
        let newcomment        = await ctx.commentRepository.postComment(ctx.session.loggedInUserId, ctx.query.id, comment_text);
        let comment_count_tmp = await ctx.postRepository.findPost(ctx.query.id);
        let comment_count     = comment_count_tmp.getCommentCount() + 1;
        await ctx.postRepository.updateCommentCount(ctx.query.id, comment_count);
        return ctx.redirect('/post?id=' + ctx.query.id, newcomment);
    }
    
    async editComment(ctx) {
        const {comment_text} = ctx.request.body;
        let editComment      = await ctx.commentRepository.editComment(ctx.session.loggedInUserId, ctx.query.idcomment, comment_text);
        return ctx.redirect('/post?id=' + ctx.query.id, {ctx, editComment});
    }

    async deleteComment(ctx) {
        let deletecomment = ctx.commentRepository.deleteComment(ctx.query.idcomment);
        let comment_count_tmp = await ctx.postRepository.findPost(ctx.query.id);
        let comment_count     = comment_count_tmp.getCommentCount() - 1;
        await ctx.postRepository.updateCommentCount(ctx.query.id, comment_count);
        return ctx.redirect('/post?id=' + ctx.query.id, deletecomment);
    }
}

module.exports = CommentController;