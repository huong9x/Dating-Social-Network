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
        return ctx.render('profile.html', { ctx, user, posts, isFriend });                    
        } catch (e) {
            console.log(e.message);
            await ctx.render('profile.html', { ctx, user, posts });                    
        }    
    }

    async updateProfileAvatar(ctx) {
        await ctx.userRepository.changeUserAvatar(ctx.session.loggedInUserId, ctx.req.file.filename);
        return ctx.redirect('/profile?id=' + ctx.session.loggedInUserId);

    }

    async updateProfileCover(ctx) {
        await ctx.userRepository.changeUserCover(ctx.session.loggedInUserId, ctx.req.file.filename);
        return ctx.redirect('/profile?id=' + ctx.session.loggedInUserId);
    }

    async getChangePassword(ctx) {
        return ctx.render('changepass.html', { ctx });
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
        return ctx.redirect('/');
    }

    async reportUser(ctx) {
        const {content} = ctx.request.body;
        let reportUser  = await ctx.userRepository.reportUser(ctx.query.id, content);
        return ctx.redirect('/profile?id=' + ctx.query.id, reportUser);
    }

    async searchUser(ctx) {
        let users = await ctx.userRepository.searchUser(ctx.query.user);
        return ctx.render('searchpage.html', { ctx, users });
    }

    async searchNearBy(ctx) {
        return ctx.render('searchnearby.html', { ctx });
    }

}

module.exports = ProfileController;