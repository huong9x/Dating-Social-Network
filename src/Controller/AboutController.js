class AboutController {

    async getAbout(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user = await ctx.userRepository.getUserInfo(ctx.query.id);
        let isFriend = await ctx.friendRepository.isFriend(ctx.session.loggedInUserId, ctx.query.id);

        if(!user) {
            return ctx.redirect('/404page');
        }
        
        return ctx.render('about.html', { ctx, user, isFriend});
    }

    async getNullPage(ctx) {
        return ctx.render('404Page.html', { ctx });
    }
}

module.exports = AboutController;