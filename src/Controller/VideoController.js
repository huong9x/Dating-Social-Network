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

        return await ctx.render('videos.html', { ctx, user, getVideosProfile, isFriend });        
    }
}

module.exports = VideoController;