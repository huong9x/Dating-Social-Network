class PhotosController {

    async getPhotos(ctx) {
        let user             = await ctx.userRepository.getUserInfo(ctx.query.id);
        let getPhotosProfile = await ctx.mediaRepository.getPhotosProfile(ctx.query.id);
        let isFriend = await ctx.friendRepository.isFriend(ctx.session.loggedInUserId, ctx.query.id);        

        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }

        if(!user) {
            return ctx.redirect('/404page');
        }
        
        return await ctx.render('photos.html', { ctx, user, getPhotosProfile, isFriend });
    }
}

module.exports = PhotosController;