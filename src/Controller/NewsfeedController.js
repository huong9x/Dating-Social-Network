class NewsfeedController {
    constructor(knex) {
        this.knex = knex;
    }

    async getNewsfeed(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        ctx.render('newsfeed.html', { main_user });
    }
    // async postStatus(ctx) {
    //     const {status} = ctx.request.body;
    //     console.log(status);
    //     await ctx.upload.array('file', 10);
    //     // let a = ctx.req.files.map((file) => file.filename);
    //     console.log(ctx.req.files);
    //     // let newpost    = ctx.postRepository.addNewPost(ctx.session.loggedInUserId, status);
    //     return ctx.redirect('/newsfeed', true);
    // }
    async postStatus(ctx) {
        const {status} = ctx.request.body;
        let newpost    = ctx.postRepository.addNewPost(ctx.session.loggedInUserId, status);
        return ctx.redirect('/newsfeed', newpost);
    }
}

module.exports = NewsfeedController;