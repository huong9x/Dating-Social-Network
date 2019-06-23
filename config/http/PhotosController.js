const FindPhotoByUserId     = require('../../resources/Media/FindPhotoByUserId');
const FindLastPhotoByUserId = require('../../resources/Media/FindLastPhotosByUserId');

class PhotosController {

    async getPhotos(ctx) {
        let user     = ctx.request.user;
        let photos   = ctx.request.photos;
        let isFriend = ctx.request.isFriend;

        if(!ctx.query.id) {
            return ctx.redirect('/404page');
        }

        if(!user) {
            return ctx.redirect('/404page');
        }
        try {
            return ctx.render('photos.html', { ctx, user, photos, isFriend});
            } catch (e) {
                console.log(e.message);
                return ctx.render('photos.html', { ctx, user});
            }
    }
    async getProfilePhoto(ctx, next) {
        ctx.request.photos = await ctx.mediaRepository.find(new FindPhotoByUserId(ctx.query.id));
        await next();
    }
    async getLastPhotos(ctx, next) {
        let photo_count = ctx.request.photos.length;
        if(photo_count > 9 ) {
            ctx.request.lastPhotos = await ctx.mediaRepository.find(new FindLastPhotoByUserId(ctx.query.id, photo_count));
        } else {
            ctx.request.lastPhotos = ctx.request.photos;
        }
        await next();
    }
}

module.exports = PhotosController;