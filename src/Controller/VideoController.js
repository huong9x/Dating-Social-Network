class VideoController {

    async getVideos(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        if(!user) {
            return ctx.redirect('/404page');
        }
        return await ctx.render('videos.html', { ctx, user, ctx });        
    }
}

module.exports = VideoController;