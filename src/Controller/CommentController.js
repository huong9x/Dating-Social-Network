const dateTime = require('date-time');
const Comment = require('../../resources/Comments/Comment');
const EditCommentContent = require('../../resources/Comments/EditCommentContent');
const FindByPostId       = require('../../resources/Comments/FindByPostId');

class CommentController {

    async postComment(ctx) {
        let {comment_text}    = ctx.request.body;
        await ctx.commentRepository.create(new Comment(ctx.session.loggedInUserId, ctx.query.id, comment_text, dateTime()));
        let post                = await ctx.postRepository.findPost(ctx.query.id);
        let comment_count_tmp   = await ctx.postRepository.findPost(ctx.query.id);
        let comment_count       = comment_count_tmp.getCommentCount() + 1;
        await ctx.postRepository.updateCommentCount(ctx.query.id, comment_count);
        if (post.getUserId() != ctx.session.loggedInUserId) {
            await ctx.notificationRepository.commentNotification(post.getUserId(), ctx.session.loggedInUserId, ctx.query.id);            
        }
        return ctx.redirect('/post?id=' + ctx.query.id);
    }
    
    async editComment(ctx) {
        const {comment_text} = ctx.request.body;
        await ctx.commentRepository.edit(new EditCommentContent(ctx.query.idcomment , comment_text));
        return ctx.redirect('/post?id=' + ctx.query.id);
    }

    async getPostComment(ctx, next) {
        ctx.request.comments = await ctx.commentRepository.find(new FindByPostId(ctx.query.id));
        await next();
    }

    async deleteComment(ctx) {
        let deletecomment = ctx.commentRepository.delete(ctx.query.idcomment);
        let comment_count_tmp = await ctx.postRepository.findPost(ctx.query.id);
        let comment_count     = comment_count_tmp.getCommentCount() - 1;
        await ctx.postRepository.updateCommentCount(ctx.query.id, comment_count);
        return ctx.redirect('/post?id=' + ctx.query.id, deletecomment);
    }
}

module.exports = CommentController;