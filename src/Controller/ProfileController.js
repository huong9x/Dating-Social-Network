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
        return ctx.render('profile.html', { ctx, user, posts, ctx , isFriend });                    
        } catch (error) {
            console.log(error);
            return ctx.render('profile.html', { ctx, user, posts, ctx });                    
        }    
    }
    async updateProfileAvatar(ctx) {
        // let my_id = ctx.session.loggedInUserId;

    }
    async updateProfileCover(ctx) {

    }
    async getChangePassword(ctx) {
        return ctx.render('changepassword.html', { ctx });
    }
    async postChangePassword(ctx) {
        const {oldpassword, newpassword, confirmpassword} = ctx.request.body;
        console.log(ctx.request.body);
        console.log(ctx.profile.getUserPassword());
        if (!await ctx.hasher.check(oldpassword, ctx.profile.getUserPassword())) {
            console.log('Your Old Passowrd did not match your current');
            return new Error('Your Old Passowrd did not match your current');
        }
        if (newpassword != confirmpassword) {
            console.log('Confirm new password error');
            return new Error('Confirm new password error');
        }
        await ctx.userRepository.changeUserPassword(ctx.session.loggedInUserId, await ctx.hasher.generate(newpassword));
        return ctx.redirect('/newsfeed');

    }

}

module.exports = ProfileController;