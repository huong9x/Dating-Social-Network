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

}

module.exports = NotificationController;