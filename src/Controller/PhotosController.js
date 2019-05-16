class PhotosController {
    constructor(knex) {
        this.knex = knex;
    }

    async getPhotos(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/photos?id=' + ctx.session.loggedInUserId);
        }
        let main_user = await ctx.userRepository.getUserInfo(ctx.session.loggedInUserId);
        let user      = await ctx.userRepository.getUserInfo(ctx.query.id);
        if(!user) {
            return ctx.render('404Page.html', { main_user });
        }
        return await ctx.render('photos.html', { ctx, user, main_user });        
    }

}

module.exports = PhotosController;