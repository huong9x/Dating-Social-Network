class CommentController {

    async postComment(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        const {comment_text} = ctx.request.body;
        let newcomment =  ctx.commentRepository.postComment(main_user.getUserId(), ctx.query.id, comment_text);
        return ctx.redirect('/post?id=' + ctx.query.id, newcomment);
    }
    
    async editComment(post_id, content) {
        let post = await this.knex(comment)
                                .where('post_id','=', post_id)
                                .update({ content: content });
        return new Post(post[0]);
    }

    async deleteComment(ctx) {
        let deletecomment = ctx.commentRepository.deleteComment(ctx.query.idcomment);
        return ctx.redirect('/post?id=' + ctx.query.id, deletecomment);
    }
}

module.exports = CommentController;