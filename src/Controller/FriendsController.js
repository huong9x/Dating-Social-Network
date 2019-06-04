class FriendsController {

    async getFriends(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        let friends   = await ctx.friendRepository.listFriend(ctx.query.id);
        if(!user) {
            return ctx.redirect('/404page');
        }
        return ctx.render('friends.html', { ctx, user, ctx, friends });        
    }
    async getFriendRequest(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        let ref   = ctx.query.ref_page;

        if(!uid || !my_id) {
            ctx.redirect('/404page');
        }
        if(ref == 'friendRequest') {
            await ctx.friendRepository.sendFriendRequest(my_id, uid);
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'cancel') {
            await ctx.friendRepository.unFriend(my_id, uid);
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'friendAccept') {
            await ctx.friendRepository.addFriend(my_id, uid);
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'requests') {

            return ctx.render('friendrequests.html', { ctx });
        }
        
    }
}

module.exports = FriendsController;