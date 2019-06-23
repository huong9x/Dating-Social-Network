const { format } = require('timeago.js');

class Notification {
    constructor(rawNotification) {
        this.notification_id     = rawNotification.id;
        this.user_avatar         = rawNotification.avatar;
        this.user_name           = rawNotification.first_name + ' ' + rawNotification.last_name;
        this.owner_id            = rawNotification.owner_id;
        this.user_id             = rawNotification.user_id;
        this.post_id             = rawNotification.post_id;
        this.like_id             = rawNotification.like_id;
        this.comment_id          = rawNotification.comment_id;
        this.share_id            = rawNotification.share_id;
        this.friend_type         = rawNotification.friend_type;
        this.notification_status = rawNotification.status;
        this.notification_time   = rawNotification.notification_time;
    }

    getNotificationId() {
        return this.notification_id;
    }
    getUserAvatar() {
        if(!this.user_avatar) {
            return 'img/default-user.png';
        }
        return '/UserFiles/' + this.user_avatar; 
    }
    getUserName() {
        return this.user_name;
    }
    getOwnerId() {
        return this.owner_id;
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
        return this.share_id;
    }
    getFriendType() {
        return this.friend_type;
    }
    getNotificationStatus() {
        return this.notification_status;
    }
    getNotificationTime() {
        return format(this.notification_time, 'en_US');
    }
}

module.exports = Notification;