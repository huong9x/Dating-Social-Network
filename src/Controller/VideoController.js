class VideoController {

    async getVideos(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user             = await ctx.userRepository.getUserInfo(ctx.query.id);
        let getVideosProfile = await ctx.mediaRepository.getVideosProfile(ctx.query.id);
        let isFriend = await ctx.friendRepository.isFriend(ctx.session.loggedInUserId, ctx.query.id);        

        if(!user) {
            return ctx.redirect('/404page');
        }
        try {
            let isFriend = await ctx.friendRepository.isFriend(ctx.session.loggedInUserId, ctx.query.id); 
            return ctx.render('about.html', { ctx, user, friends, getVideosProfile, isFriend});
            } catch (e) {
                console.log(e.message);
                return ctx.render('about.html', { ctx, user});
            }
    }
}

module.exports = VideoController;