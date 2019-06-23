const FriendRequest       = require('../../resources/Friend/FriendRequest');
const FriendAcceptRequest = require('../../resources/Friend/FriendAcceptRequest');
const UnFriendRequest     = require('../../resources/Friend/UnFriendRequest');
const FindByUserId        = require('../../resources/Friend/FindByUserId');

class FriendsController {

    async getFriends(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user     = ctx.request.user;
        let friends  = ctx.request.friends;
        let isFriend = ctx.request.isFriend;  
        if(!user) {
            return ctx.redirect('/404page');
        }
        try {            
            return ctx.render('friends.html', { ctx, user, friends, isFriend});

            } catch (e) {
                console.log(e.message);
                return ctx.render('friends.html', { ctx, user});
            }
    }

    async getFriendRequest(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        let ref   = ctx.query.ref_page;

        if(!uid || !my_id) {
            ctx.redirect('/404page');
        }
        if(ref == 'friendRequest') {
            await ctx.friendRepository.send(new FriendRequest(my_id, uid));
            await ctx.notificationRepository.sendFriendRequestNotification(ctx.query.id, my_id);
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'cancel') {
            await ctx.friendRepository.send(new UnFriendRequest(my_id, uid));
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'friendAccept') {
            await ctx.friendRepository.send(new FriendAcceptRequest(my_id, uid));
            await ctx.notificationRepository.acceptFriendRequestNotification(ctx.query.id, my_id);
            return ctx.redirect('/profile?id=' + uid);
        }
        if(ref == 'requests') {
            return ctx.render('friendrequests.html', { ctx });
        }   
    }
}

module.exports = FriendsController;