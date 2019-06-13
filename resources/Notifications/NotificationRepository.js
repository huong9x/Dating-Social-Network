const Notification = require('./Notification');
const dateTime = require('date-time');

class NotificationRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async getNotification(owner_id) {
        let notifications = await this.knex
                                        .select(
                                            'user_avatar',
                                            'first_name',
                                            'last_name',
                                            'notifications.*'
                                        )
                                        .from('notifications')
                                        .join('users', 'users.user_id', 'notifications.user_id')
                                        .where({
                                            owner_id : owner_id
                                        })
                                        .orderBy('notification_time', 'desc');
        return notifications.map((notification) => { return new Notification(notification) });
    }

    async countNotification(owner_id) {
        let countNotifications = await this.knex('notifications')
                                        .select('notification_id')
                                        .where({
                                            notification_status : 'unread',
                                            owner_id            : owner_id
                                        });
        return countNotifications.map((countNotification) => { return new Notification(countNotification) });
    }

    async markAsRead(owner_id, notification_id) {
        return await this.knex('notifications')
                                .update({
                                    notification_status : 'read'
                                })
                                .where({
                                    notification_id : notification_id,
                                    owner_id        : owner_id
                                })
    }

    async markAllAsRead(owner_id) {
        return await this.knex('notifications')
                                .update({
                                    notification_status : 'read'
                                })
                                .where({
                                    owner_id : owner_id
                                })
    }

    async deleteNotification(owner_id, notification_id) {
        return await this.knex('notifications')
                                .where({
                                    owner_id        : owner_id,
                                    notification_id : notification_id
                                })
                                .del();
    }

    async likeNotification(owner_id, user_id, like_id) {
        let likeNotification = await this.knex('notifications')
                                         .insert({
                                            owner_id            : owner_id,
                                            user_id             : user_id,
                                            like_id             : like_id,
                                            notification_status : 'unread',
                                            notification_time   : dateTime()
                                         });
        return new Notification(likeNotification[0]);
    }

    async commentNotification(owner_id, user_id, comment_id) {
        let commentNotification = await this.knex('notifications')
                                         .insert({
                                            owner_id            : owner_id,
                                            user_id             : user_id,
                                            comment_id          : comment_id,
                                            notification_status : 'unread',
                                            notification_time   : dateTime()
                                         });
        return new Notification(commentNotification[0]);
    }

    async shareNotification(owner_id, user_id, post_share_id) {
        let shareNotification = await this.knex('notifications')
                                         .insert({
                                            owner_id            : owner_id,
                                            user_id             : user_id,
                                            post_share_id       : post_share_id,
                                            notification_status : 'unread',
                                            notification_time   : dateTime()
                                         });
        return new Notification(shareNotification[0]);
    }

    async sendFriendRequestNotification(owner_id, user_id) {
        return await this.knex('notifications')
                                .insert({
                                    owner_id            : owner_id,
                                    user_id             : user_id,
                                    friend_type         : 'waiting',
                                    notification_status : 'unread',
                                    notification_time   : dateTime()
                                });
    }

    async acceptFriendRequestNotification(owner_id, user_id) {
        return await this.knex('notifications')
                                .insert({
                                    owner_id            : owner_id,
                                    user_id             : user_id,
                                    friend_type         : 'friend',
                                    notification_status : 'unread',
                                    notification_time   : dateTime()
                                });
    }
}

module.exports = NotificationRepository;
