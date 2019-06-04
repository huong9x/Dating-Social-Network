class ProfileController {

    async getProfile(ctx) {
        let my_id = ctx.session.loggedInUserId;
        let uid   = ctx.query.id;
        
        if(!uid) {
            return ctx.redirect('/404page');
        }

        let user  = await ctx.userRepository.getUserInfo(uid);
        let posts = await ctx.postRepository.getUserPost(uid);

        if(!user) {
            return ctx.redirect('/404page');
        }
        try {
        let isFriend = await ctx.friendRepository.isFriend(my_id, uid);            
        return ctx.render('profile.html', { ctx, user, posts , isFriend });                    
        } catch (error) {
            console.log(error);
            return ctx.render('profile.html', { ctx, user, posts });                    
        }    
    }
    async updateProfileAvatar(ctx) {
        // let my_id = ctx.session.loggedInUserId;

    }
    async updateProfileCover(ctx) {

    }

}

module.exports = ProfileController;