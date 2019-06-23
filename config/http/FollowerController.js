class FollowerController {

    async getFollowerRequest(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        if(ctx.query.ref_page == 'add'){
            
            let isFriend = await ctx.friendRepository.isFriend(my_id, uid);
            if(isFriend.length) {
                return ctx.redirect('/profile?id=' + uid);
            }
            await ctx.friendRepository.addFriend(my_id, uid);

            return ctx.redirect('/profile?id=' + uid);            
        }
        return ctx.redirect('/404page');
    }
    async getUnfollowRequest(ctx) {
        
    }
}

module.exports = FollowerController;