class AccountController {
    constructor(knex) {
        this.knex = knex;
    }

    async getAccount(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        // let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        // if(!user) {
        //     return ctx.render('404Page.html', { main_user });
        // }
        return ctx.render("account.html", { main_user});

    }
}

module.exports = AccountController;