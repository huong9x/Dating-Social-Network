class PostController {
    constructor(knex) {
        this.knex = knex;
    }

    async editPost(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        if(ctx.query.ref_page == 'edit') {
            return ctx.render('404Page.html', { main_user });
        }
        let content = ctx.request.body;
        if(!ctx.userRepository.findPostOwner(ctx.query.id, ctx.session.loggedInUserId)) {
            return ctx.render('403Page.html', { main_user });
        }
        return ctx.userRepository.editPost(ctx.query.id, content);

    }
    // async viewPost(ctx) {
    //     let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
    //     // if(ctx.query.ref_page == 'view') {
    //     //     return ctx.render('404Page.html');
    //     // }
    //     console.log(ctx.query.id, await ctx.postRepository.findPost(3));
    //     let post = await ctx.postRepository.findPost(ctx.query.id);
    //     return ctx.render('post.html', { post, main_user });
    // }
    async viewPost(ctx) {
        // let comments  = await ctx.commentRepository.findComment(ctx.query.id);
        // let userComment = await ctx.userRepository.getUserInfo(comment.getUserId()); userComment
        // let showCountComment = await ctx.commentRepository.showCountComment(ctx.query.id);
        if(!ctx.query.id) {
            return ctx.render('404Page.html');
        }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let post      = await ctx.postRepository.findPost(ctx.query.id);
        let user      = await ctx.userRepository.getUserInfo(post.getUserId());
        // let comments  = await ctx.commentRepository.findComment(ctx.query.id);
        return ctx.render('postdetail.html', { post, user, main_user });
    }
}

module.exports = PostController;