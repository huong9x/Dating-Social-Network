class CommentController {
    constructor(knex) {
        this.knex = knex;
    }

    async postComment(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        const {comment_text} = ctx.request.body;
        let newcomment =  ctx.commentRepository.postComment(main_user.getUserId(), ctx.query.id, comment_text);
        return ctx.redirect('/post?id=' + ctx.query.id, newcomment);
    }
    
}

module.exports = CommentController;