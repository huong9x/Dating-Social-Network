const SearchByUserId   = require('../../resources/User/SearchByUserId');
const SearchByUsername = require('../../resources/User/SearchByUsername');

const topPanelProfile  = async (ctx, next) => {
    ctx.profile            = await ctx.userRepository.searchUser(new SearchByUserId(ctx.session.loggedInUserId));
    ctx.listFriendRequests = await ctx.friendRepository.listFriendRequests(ctx.session.loggedInUserId);
    ctx.SearchByUserId     = SearchByUserId;
    ctx.SearchByUsername   = SearchByUsername;
    await next();
}

module.exports = topPanelProfile;
