class ShareController {

    async postShare(ctx) {
        const {content} = ctx.request.body;
        let newshare    = ctx.shareRepository.postShare(ctx.session.loggedInUserId, ctx.query.postid, content);
        return ctx.redirect('/post?id=' + ctx.query.postid, newshare);
    }
    
}

module.exports = ShareController;