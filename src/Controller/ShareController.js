class ShareController {

    async postShare(ctx) {
        const {content}     = ctx.request.body;
        let share_count_tmp = await ctx.postRepository.findPost(ctx.query.id);        
        let share_count     = share_count_tmp.getShareCount() + 1;
        await ctx.postRepository.updateShareCount(ctx.query.id, share_count);
        await ctx.shareRepository.postShare(ctx.session.loggedInUserId, content, ctx.query.id);
        return ctx.redirect('/post?id=' + ctx.query.id);
    }
    
}

module.exports = ShareController;