class SettingsController {
    constructor(knex) {
        this.knex = knex;
    }

    async getSettings(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        return ctx.render('settings.html', { main_user });  
    }
    async postEditSettings(ctx) {
        const {first_name, last_name, email, phone_number, birth_date, gender, address, relationship} = ctx.request.body;
        await ctx.userRepository.editUser(ctx.session.loggedInUserId, first_name, last_name, email, phone_number, birth_date, gender, address, relationship);
        return ctx.redirect('/settings');
    }
}

module.exports = SettingsController;