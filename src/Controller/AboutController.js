class AboutController {

    async getAbout(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user = await ctx.userRepository.getUserInfo(ctx.query.id);

        if(!user) {
            return ctx.redirect('/404page');
        }
        try {
            let isFriend = await ctx.friendRepository.isFriend(ctx.session.loggedInUserId, ctx.query.id); 
            return ctx.render('about.html', { ctx, user, isFriend});
            } catch (e) {
                console.log(e.message);
                return ctx.render('about.html', { ctx, user});
            }
    }

    async getNullPage(ctx) {
        return ctx.render('404Page.html', { ctx });
    }
}

module.exports = AboutController;