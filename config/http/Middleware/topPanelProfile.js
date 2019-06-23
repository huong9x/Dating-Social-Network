const FindFriendRequestByUserId = require('../../../resources/Friend/FindFriendRequestByUserId');
const FindUserById              = require('../../../resources/User/FindUserById');

const topPanelProfile = async (ctx, next) => {
    ctx.user            = await ctx.authenticator.user();
    let user_id         =       ctx.user.getUserId()    
    let profile         = await ctx.userRepository.find(new FindUserById(user_id));

    ctx.profile         = profile[0];

    let request         = await ctx.friendRepository.find(new FindFriendRequestByUserId(user_id));
    let friend_requests = [];
    if(request) {
        for (var i = 0; i < request.length; i++) {

            let friend_id   = request[i].getFriendId();

            let friend      = await ctx.userRepository.find(new FindUserById(friend_id));

            friend_requests = friend
          };
    }  
    ctx.friend_requests = friend_requests;
    ctx.countNotifications = await ctx.notificationRepository.countNotification(ctx.session.loggedInUserId);
    ctx.notifications      = await ctx.notificationRepository.getNotification(ctx.session.loggedInUserId);

    await next();
}

module.exports = topPanelProfile;
