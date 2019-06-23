const FindVideoByUserId = require('../../resources/Media/FindVideoByUserId');

class VideoController {

    async getVideos(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user     = ctx.request.user;
        let videos   = ctx.request.videos;
        let isFriend = ctx.request.isFriend;
        if(!user) {
            return ctx.redirect('/404page');
        }
        try {
            return ctx.render('videos.html', { ctx, user, videos, isFriend });

            } catch (e) {
                console.log(e.message);
                return ctx.render('videos.html', { ctx, user, videos});
            }
    }
    async getProfileVideo(ctx, next) {
        ctx.request.videos = await ctx.mediaRepository.find(new FindVideoByUserId(ctx.query.id));
        await next();
    }
}

module.exports = VideoController;