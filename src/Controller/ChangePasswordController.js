class ChangePasswordController {
    constructor(knex) {
        this.knex = knex;
    }

    async getChangePassword(ctx) {
        
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        return ctx.render('changepassword.html', { main_user });
    }
    async postEditChangePassWord(ctx) {
        const {oldpassword, newpassword, confirmpassword} = ctx.request.body;
        let user = await ctx.userRepository.getByUserId(ctx.session.loggedInUserId);
        if (await ctx.hasher.check(oldpassword, user.getPassword())) {
            console.log('Password not match oldpass');
        }
        if(newpassword != confirmpassword) {
            console.log('New Password not Confirm');
        }
        let result = await ctx.userRepository.changePassword(ctx.session.loggedInUserId, await ctx.hasher.generate(newpassword));
        if(!result) {
            console.log('Mysql Error');
        }
        return ctx.body = {ok: 'ok'};
    }
}
module.exports = ChangePasswordController;