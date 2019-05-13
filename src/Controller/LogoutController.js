class LogoutController {
    constructor(knex) {
        this.knex = knex;
    }

    async getLogout(ctx) {
        ctx.authenticator.logout();
        return ctx.redirect('/newsfeed');
    };
};

module.exports = LogoutController;