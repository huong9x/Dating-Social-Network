const UserInformationUpdate = require('../../resources/User/UserInformationUpdate');

class SettingsController {

    async getSettings(ctx) {
        return ctx.render('settings.html', { ctx });  
    }
    async postEditSettings(ctx) {
        const {
                first_name,
                last_name,
                email,
                phone_number,
                birth_date,
                gender,
                address,
                relationship
                } = ctx.request.body;
        await ctx.userRepository.update(
            new UserInformationUpdate(
                ctx.user.getUserId(),
                first_name,
                last_name,
                email,
                phone_number,
                birth_date,
                gender,
                address,
                relationship
            )
        );
        return ctx.redirect('/settings');
    }
}

module.exports = SettingsController;