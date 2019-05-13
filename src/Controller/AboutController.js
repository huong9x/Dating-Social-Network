class AboutController {
    constructor(knex) {
        this.knex = knex;
    }

    async goAbout(ctx) {
        return ctx.redirect('/about/' + ctx.session.loggedInUserId);
    }

    async getAbout(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        return await ctx.render('about.html', { user, main_user });
    }
}

module.exports = AboutController;