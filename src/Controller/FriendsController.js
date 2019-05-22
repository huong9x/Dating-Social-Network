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
        let friends   = await ctx.friendRepository.listFriend(ctx.query.id);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return ctx.render('friends.html', { ctx, user, main_user, friends });        
    }
    async getFriendRequest(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        let ref   = ctx.query.ref_page;

        if(!uid || !my_id) {
            ctx.redirect('/404page');
        }

        if(ref == 'add') {
            await ctx.friendRepository.addFriend(my_id, uid);
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'cancel') {
            await ctx.friendRepository.unFriend(my_id, uid);
            return ctx.redirect('/profile?id=' + uid);
        }


        
    }
}

module.exports = FriendsController;