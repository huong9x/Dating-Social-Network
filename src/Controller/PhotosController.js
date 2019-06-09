class PhotosController {

    async getPhotos(ctx) {
        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }
        let user = await ctx.userRepository.searchUser(new ctx.SearchByUserId(ctx.query.id));
        if(!user) {
            return ctx.redirect('/404page');
        }
        return await ctx.render('photos.html', { ctx, user });        
    }

}

module.exports = PhotosController;