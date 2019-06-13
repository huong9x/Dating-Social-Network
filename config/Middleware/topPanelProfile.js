const topPanelProfile = async (ctx, next) => {
    ctx.profile            = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
    ctx.listFriendRequests = await ctx.friendRepository.listFriendRequests(ctx.session.loggedInUserId);
    ctx.countNotifications = await ctx.notificationRepository.countNotification(ctx.session.loggedInUserId);
    ctx.notifications      = await ctx.notificationRepository.getNotification(ctx.session.loggedInUserId);
    await next();
}

module.exports = topPanelProfile;
