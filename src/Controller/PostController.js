class PostController {
    constructor(knex) {
        this.knex = knex;
    }

    async viewPost(ctx) {
        if(!ctx.query.id) {
            return ctx.render('404Page.html');
        }
        let main_user    = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let post         = await ctx.postRepository.findPost(ctx.query.id);
        let user         = await ctx.userRepository.getUserInfo(post.getUserId());
        let comments     = await ctx.commentRepository.findComment(ctx.query.id);
        let countComment = comments.length;
        // if( ctx.query.ref_page == 'like') {
        //     let like = await ctx.
        //     return ctx.render('postdetail.html', { post, countComment, comments, user, main_user });
        // }
        return ctx.render('postdetail.html', { post, countComment, comments, user, main_user });
    }
}

module.exports = PostController;