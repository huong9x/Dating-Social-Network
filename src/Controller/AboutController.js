class AboutController {
    constructor(knex) {
        this.knex = knex;
    }

    async getAbout(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/about?id=' + ctx.session.loggedInUserId);
        }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('about.html', { ctx, user, main_user });        
    }
    async getNullPage(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        return ctx.render('404Page.html', { main_user });
    }
}

module.exports = AboutController;