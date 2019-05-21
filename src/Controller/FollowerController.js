class FollowerController {
    constructor(knex) {
        this.knex = knex;
    }

    async getFollowerRequest(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        let main_user = await ctx.userRepository.getUserInfo(my_id);
        if(ctx.query.ref_page == 'add'){
            
            let isFriend = await ctx.friendRepository.isFriend(my_id, uid);
            if(isFriend.length) {
                return ctx.redirect('/profile?id=' + uid);
            }
            await ctx.friendRepository.addFriend(my_id, uid);

            return ctx.redirect('/profile?id=' + uid);            
        }
        return ctx.render('404Page.html', { main_user });      
    }
    async getUnfollowRequest(ctx) {
        
    }
}

module.exports = ProfileController;