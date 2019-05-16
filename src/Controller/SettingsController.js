class SettingsController {
    constructor(knex) {
        this.knex = knex;
    }

    async getSettings(ctx) {
        // if(!ctx.query.id) {
        //     return ctx.redirect('/settings');
        // }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        // let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        // if(!user) {
        //     return ctx.render('404Page.html', { main_user });
        // }
        // return await ctx.render('settings.html', { ctx, user, main_user });
        return ctx.render('settings.html', { main_user });  
    }
}

module.exports = SettingsController;