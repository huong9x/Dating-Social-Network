class ProfileController {
    constructor(knex) {
        this.knex = knex;
    }

    async getProfile(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        
        if(!uid) {
            return ctx.redirect('/profile?id=' + my_id);
        }

        let main_user = await ctx.userRepository.getUserInfo(my_id);
        let user      = await ctx.userRepository.getUserInfo(uid);
        let posts     = await ctx.postRepository.getUserPost(uid);

        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }

        let isFriend = await ctx.friendRepository.isFriend(my_id, uid);
                
        return await ctx.render('profile.html', { ctx, user, posts, main_user, isFriend });        
    }

}

module.exports = ProfileController;