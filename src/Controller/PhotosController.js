class PhotosController {
    constructor(knex) {
        this.knex = knex;
    }

    async goPhotos(ctx) {
        return ctx.redirect('/photos/' + ctx.session.loggedInUserId);
    }

    async getPhotos(ctx) {
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user = await ctx.userRepository.getUserInfo(ctx.params.userid);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('photos.html', { ctx, user, main_user });
    }
}

module.exports = PhotosController;