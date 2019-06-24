class NotificationController {

    async getNotifications(ctx) {
        let notifications = await ctx.notificationRepository.getNotification(ctx.session.loggedInUserId);
        return ctx.render('notifications.html', { ctx, notifications });
    }

    async markAsRead(ctx) {
        await ctx.notificationRepository.markAsRead(ctx.session.loggedInUserId, ctx.query.id);
        return ctx.redirect('/notifications', { ctx });
    }

    async markAllAsRead(ctx) {
        await ctx.notificationRepository.markAllAsRead(ctx.session.loggedInUserId);
        return ctx.redirect('/notifications', { ctx });
    }

    async deleteNotification(ctx) {
        await ctx.notificationRepository.deleteNotification(ctx.session.loggedInUserId, ctx.query.id);
        return ctx.redirect('/notifications', { ctx });        
    }
    
    async notifyNewComment(ctx) {
        let user_id = ctx.request.post.getUserId()
        if (user_id != ctx.session.loggedInUserId) {
            await ctx.notificationRepository.commentNotification(user_id, ctx.session.loggedInUserId, ctx.query.id);            
        }
        return ctx.redirect('/post?id=' + ctx.query.id);
    }

    async notifyNewReaction(ctx) {
        let user_id = ctx.request.post.getUserId();
        let my_id   = ctx.session.loggedInUserId;
        if (user_id != my_id) {
            await ctx.notificationRepository.likeNotification(user_id, my_id, ctx.request.body.post_id);
        }
    }

    async notifyNewShare(ctx) {
        if (ctx.request.post.getUserId() != ctx.session.loggedInUserId) {
            await ctx.notificationRepository.shareNotification(ctx.request.post.getUserId(), ctx.session.loggedInUserId, ctx.query.id);            
        }
        return ctx.redirect('/post?id=' + ctx.query.id);
    }

}

module.exports = NotificationController;