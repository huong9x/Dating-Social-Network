class FriendsController {
    constructor(knex) {
        this.knex = knex;
    }

    async goFriends(ctx) {
        return ctx.redirect('/friends/' + ctx.session.loggedInUserId);
    }

    async getFriends(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('friends.html', { ctx, user, main_user });
    }
}

module.exports = FriendsController;