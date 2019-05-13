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
        return await ctx.render('friends.html', { user, main_user });
    }
}

module.exports = FriendsController;