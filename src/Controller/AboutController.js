class AboutController {

    async getAbout(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user = await ctx.userRepository.searchUser(new ctx.SearchByUserId(ctx.query.id));
        if(!user) {
            return ctx.redirect('/404page');
        }  
        return ctx.render('about.html', { ctx, user });     
    }
    async getNullPage(ctx) {
        return ctx.render('404Page.html', { ctx });
    }
}

module.exports = AboutController;