class FriendsController {
    constructor(knex) {
        this.knex = knex;
    }

    async getFriends(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/friends?id=' + ctx.session.loggedInUserId);
        }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('friends.html', { ctx, user, main_user });        
    }
}

module.exports = FriendsController;