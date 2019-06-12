class UploadController {

    async uploadAvatar(ctx, next) {
        await ctx.upload.single('user_avatar');
        await next();
    }

    async uploadCover(ctx, next) {
        await ctx.upload.single('user_cover');
        await next();
    }
}

module.exports = UploadController;