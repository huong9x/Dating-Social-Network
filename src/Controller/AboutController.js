class AboutController {
    constructor(knex) {
        this.knex = knex;
    }

    async getAbout(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        // let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        return await ctx.render('about.html', { main_user });
    }
}

module.exports = AboutController;