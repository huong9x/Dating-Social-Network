const { format } = require('timeago.js');

class Like {
    constructor(rawLike) {
        this.like_id   = rawLike.like_id;
        this.user_id   = rawLike.user_id;
        this.post_id   = rawLike.post_id;
        this.like_time = rawLike.like_time;
    }

    getLikeId() {
        return this.like_id;
    }
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
    getLikeTime() {
        return format(this.like_time, 'en_US');
    }
}

module.exports = Like;