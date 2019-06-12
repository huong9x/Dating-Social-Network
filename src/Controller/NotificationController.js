class NotificationController {

    async getNotifications(ctx) {
        return ctx.render('notifications.html', { ctx });
    }

}

module.exports = NotificationController;