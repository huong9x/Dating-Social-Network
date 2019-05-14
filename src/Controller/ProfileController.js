class ProfileController {
    constructor(knex) {
        this.knex = knex;
    }

    async goProfile(ctx) {
        return ctx.redirect('/profile/' + ctx.session.loggedInUserId);
    }

    async getProfile(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user      = await ctx.userRepository.getUserInfo(ctx.params.userid);
        let posts     = await ctx.postRepository.getUserPost(ctx.params.userid);
        console.log(posts);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('profile.html', { ctx, user, posts, main_user });        
    }
}

module.exports = ProfileController;