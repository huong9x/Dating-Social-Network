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

    async friendNotification() {

    }

    // async findCommentOwner(user_id, comment_id) {
    //     let comment = await this.knex.select('*').from('comment').where({
    //         user_id: user_id,
    //         comment_id: comment_id
    //     });
        
    //     return new Comment(comment);
    // }

    // async findComment(post_id) {
    //     let comments = await this.knex.select(
    //                                         'first_name',
    //                                         'last_name',
    //                                         'comment_id',
    //                                         'comment.user_id',
    //                                         'post_id',
    //                                         'comment_text',
    //                                         'comment_time'
    //                                     )
    //                                     .from('comment')
    //                                     .leftJoin('users', 'comment.user_id', 'users.user_id')
    //                                     .where({
    //                                         post_id: post_id
    //                                     })
    //                                     .orderBy('comment_time', 'desc');

    //     return comments.map((comment) => { return new Comment(comment)} );
    // }

    // async postComment(user_id, post_id, comment_text) {
    //     let comment = await this.knex('comment')
    //                                 .insert([{
    //                                     user_id: user_id,
    //                                     post_id: post_id,
    //                                     comment_text: comment_text,
    //                                     comment_time: dateTime()
    //                                 }]);
    //     return new Comment(comment[0]);
    // }

    // async editComment(user_id, comment_id, comment_text) {
    //     let comment = await this.knex('comment')
    //                                 .update('comment_text', comment_text)
    //                                 .where({
    //                                     comment_id: comment_id,
    //                                     user_id: user_id
    //                                 });
    //     return new Comment(comment);
    // }

    // async deleteComment(comment_id) {
    //     let comment = await this.knex('comment')
    //                                 .where({
    //                                     comment_id: comment_id
    //                                 })
    //                                 .del();
    //     return new Comment(comment[0]);
    // }
}

module.exports = NotificationRepository;
