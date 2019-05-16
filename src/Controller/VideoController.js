class VideoController {
    constructor(knex) {
        this.knex = knex;
    }

    async getVideos(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/videos?id=' + ctx.session.loggedInUserId);
        }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('videos.html', { ctx, user, main_user });        
    }
}

module.exports = VideoController;