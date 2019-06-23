const dateTime           = require('date-time');
const Comment            = require('../../resources/Comment/Comment');
const EditCommentContent = require('../../resources/Comment/EditCommentContent');
const FindByPostId       = require('../../resources/Comment/FindByPostId');

class CommentController {

    async postComment(ctx, next) {
        let {comment_text}    = ctx.request.body;
        await ctx.commentRepository.create(new Comment(ctx.session.loggedInUserId, ctx.query.id, comment_text, dateTime()));
        await next();
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

    async deleteComment(ctx, next) {
        await ctx.commentRepository.delete(ctx.query.idcomment);
        await next();
    }
}

module.exports = CommentController;