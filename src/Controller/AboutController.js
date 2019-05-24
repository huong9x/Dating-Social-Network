class AboutController {

    async getAbout(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/about?id=' + ctx.session.loggedInUserId);
        }
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        if(!user) {
            return ctx.redirect('/404page');
        }
        return await ctx.render('about.html', { ctx, user, ctx });        
    }
    async getNullPage(ctx) {
        return ctx.render('404Page.html', { ctx });
    }
}

module.exports = AboutController;