class VideoController {
    constructor(knex) {
        this.knex = knex;
    }

    async goVideos(ctx) {
        return ctx.redirect('/videos/' + ctx.session.loggedInUserId);
    }

    async getVideos(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        if(ctx.params.userid == ctx.session.loggedInUserId) {
            var profile_settings = true;
        }
        return await ctx.render('videos.html', { user, main_user, profile_settings });        
    }
}

module.exports = VideoController;