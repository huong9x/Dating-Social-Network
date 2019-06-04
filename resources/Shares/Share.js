const { format } = require('timeago.js');

class Share {
    constructor(rawShare) {
        this.share_id   = rawShare.share_id;
        this.user_id    = rawShare.user_id;
        this.post_id    = rawShare.post_id;
        this.content    = rawShare.content;
        this.share_time = rawShare.share_time;
        this.fullname   = rawShare.first_name + ' ' + rawShare.last_name;
    }

    getShareId() {
        return this.share_id;
    }
    getUserId() {
        return this.user_id;
    }
    getFullName() {
        return this.fullname;
    }
    getPostId() {
        return this.post_id;
    }
    getShareText() {
        return this.content;
    }
    getShareTime() {
        return format(this.share_time, 'en_US');
    }
}

module.exports = Share;