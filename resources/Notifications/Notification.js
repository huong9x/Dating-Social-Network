const { format } = require('timeago.js');

class Notification {
    constructor(rawNotification) {
        this.notification_id   = rawNotification.notification_id;
        this.user_id           = rawNotification.user_id;
        this.post_id           = rawNotification.post_id;
        this.like_id           = rawNotification.like_id;
        this.comment_id        = rawNotification.comment_id;
        this.post_share_id     = rawNotification.post_share_id;
        this.friend_id         = rawNotification.friend_id;
        this.notification_time = rawNotification.notification_time;
    }

    getNotificationId() {
        return this.notification_id;
    }
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
    getLikeId() {
        return this.like_id;
    }
    getCommentId() {
        return this.comment_id;
    }
    getPostShareId() {
        return this.post_share_id;
    }
    getFriendId() {
        return this.friend_id;
    }
    getNotificationTime() {
        return format(this.notification_time, 'en_US');
    }
}

module.exports = Notification;