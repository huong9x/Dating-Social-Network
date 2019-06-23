const FindPostByUserId   = require('../../resources/Post/FindByUserId');
const FindFriendByUserId = require('../../resources/Friend/FindByUserId');
const IsFriend           = require('../../resources/Friend/IsFriend');
const FindUserById       = require('../../resources/User/FindUserById');
const UserPasswordUpdate = require('../../resources/User/UserPasswordUpdate');
const UserAvatarUpdate   = require('../../resources/User/UserAvatarUpdate');
const UserCoverUpdate    = require('../../resources/User/UserCoverUpdate');
const SearchUserByName   = require('../../resources/User/SearchUserByName');

class ProfileController {

    async getProfile(ctx) {

        let user       = ctx.request.user;
        let posts      = ctx.request.posts;
        let lastPhotos = ctx.request.lastPhotos;
        let friends    = ctx.request.friends;
        let isFriend   = ctx.request.isFriend;
        
        try {
            if(!isFriend) {
                throw new Error('This user is not your friend!');
            }
            return ctx.render('profile.html', { ctx, friends, user, posts, isFriend, lastPhotos });  
        } catch (e) {
            console.log(e.message);
            return ctx.render('profile.html', { ctx, user, posts, lastPhotos , friends});  
        }
            

    }

    async getProfileInfo(ctx, next) {
        let user         = await ctx.userRepository.find(new FindUserById(ctx.query.id));
        ctx.request.user = user[0];
        await next();
    }

    async getUserFriend(ctx, next) {
        let list_friend = await ctx.friendRepository.find(new FindFriendByUserId(ctx.session.loggedInUserId));
        let friends = [];
        for (var i = 0; i < list_friend.length; i++) {
            let user_id = list_friend[i].getFriendId();
            let friend = await ctx.userRepository.find(new FindUserById(user_id));
            friends = friend
          };
        ctx.request.friends = friends;
        await next();
    }

    async getListFriend(ctx, next) {
        let friend_ids = await ctx.friendRepository.find(new FindFriendByUserId(ctx.query.id));
        let friends = [];
        for (var i = 0; i < friend_ids.length; i++) {

            let user_id = friend_ids[i].getFriendId();

            let friend = await ctx.userRepository.find(new FindUserById(user_id));

            friends    = friend;
          };
        ctx.request.friends = friends;
        await next();
    }

    async IsFriendCheck(ctx, next) {
        let isFriendChecker = await ctx.friendRepository.find(new IsFriend(ctx.user.getUserId(), ctx.query.id));
        ctx.request.isFriend = isFriendChecker[0];
        await next();
    }

    async getUserPosts(ctx, next) {
        let post_ids  = await ctx.postRepository.find(new FindPostByUserId(ctx.query.id));
        let posts = [];
        for (var i = 0; i < post_ids.length; i++) {
            let post = await ctx.postDetailFinder.find(post_ids[i].getPostId());
            posts.push(post);
          };
        ctx.request.posts = posts;
        await next();
    }

    async updateProfileAvatar(ctx) {
        await ctx.userRepository.update(new UserAvatarUpdate(ctx.user.getUserId(), ctx.req.file.filename));
        return ctx.redirect('/profile?id=' + ctx.session.loggedInUserId);

    }

    async updateProfileCover(ctx) {
        await ctx.userRepository.update(new UserCoverUpdate(ctx.user.getUserId(), ctx.req.file.filename));
        return ctx.redirect('/profile?id=' + ctx.session.loggedInUserId);
    }

    async getChangePassword(ctx) {
        return ctx.render('changepass.html', { ctx });
    }

    async postChangePassword(ctx) {
        const {oldpassword, newpassword, confirmpassword} = ctx.request.body;
        let user          = await ctx.authenticator.user();
        let user_id       = user.getUserId();
        let user_password = user.getPassword();

        try {
            if (!await ctx.hasher.check(oldpassword, user_password)) {
                throw new Error('Your Old Passowrd did not match your current');
            }
            if (newpassword != confirmpassword) {
                throw new Error('Confirm new password error');
            }

            let password       = await ctx.hasher.generate(newpassword);
            let changePassword = await ctx.userRepository.update(new UserPasswordUpdate(user_id, password));
            if (changePassword) {
                throw new Error('Password successfully changed!');
            }         
            
            return ctx.redirect('/changepassword');

        } catch (e) {
            console.log(e.message);

            return await ctx.redirect('/changepassword');
        }
        
        
    }

    async reportUser(ctx) {
        const {content} = ctx.request.body;
        let reportUser  = await ctx.userRepository.reportUser(ctx.query.id, content);
        return ctx.redirect('/profile?id=' + ctx.query.id, reportUser);
    }

    async searchUser(ctx) {
        let users = await ctx.userRepository.find(new SearchUserByName(ctx.query.user));
        return ctx.render('searchpage.html', { ctx, users });
    }

    async searchNearBy(ctx) {
        return ctx.render('searchnearby.html', { ctx });
    }

}

module.exports = ProfileController;