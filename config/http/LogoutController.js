class LogoutController {

    async getLogout(ctx) {
        ctx.authenticator.logout();
        return ctx.redirect('/newsfeed');
    };
};

module.exports = LogoutController;