const topPanelProfile = async (ctx, next) => {
    ctx.profile            = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
    ctx.listFriendRequests = await ctx.friendRepository.listFriendRequests(ctx.session.loggedInUserId);
    await next();
}

module.exports = topPanelProfile;
