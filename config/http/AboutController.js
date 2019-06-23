class AboutController {

    async getAbout(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user = ctx.request.user;
        let isFriend = ctx.request.isFriend;

        if(!user) {
            return ctx.redirect('/404page');
        }
        try {
            if(!isFriend) {
                throw new Error('This user is not your friend!');
            }
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