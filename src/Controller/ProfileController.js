class ProfileController {
    constructor(knex) {
        this.knex = knex;
    }

    async getProfile(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/profile?id=' + ctx.session.loggedInUserId);
        }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        let posts     = await ctx.postRepository.getUserPost(ctx.query.id);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('profile.html', { ctx, user, posts, main_user });        
    }
}

module.exports = ProfileController;