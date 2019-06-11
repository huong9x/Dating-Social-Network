const { format } = require('timeago.js');
class Share {
    constructor(post_id, user_id, content, like_count, comment_count, share_count, post_time, post_id_o, post_time_o, content_o, first_name_o, last_name_o) {
        this.post_id       = post_id;
        this.user_id       = user_id;
        this.content       = content;
        this.like_count    = like_count;
        this.comment_count = comment_count;
        this.share_count   = share_count;
        this.post_time     = post_time;
        this.post_id_o     = post_id_o;
        this.post_time_o   = post_time_o;
        this.content_o     = content_o;
        this.first_name_o  = first_name_o;
        this.last_name_o   = last_name_o;
    }
    
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
    getContent() {
        return this.content;
    }
    getLikeCount() {
        return this.like_count;
    }
    getCommentCount() {
        return this.comment_count;
    }
    getShareCount() {
        return this.share_count;
    }
    getPostTime() {
        return format(this.post_time, 'en_US');
    }
    getRawPostTime() {
        return this.post_time;
    }
    getOriginalPostName() {
        return this.first_name_o + this.last_name_o;
    }
    getOriginalPostId() {
        return this.post_id_o;
    }
    getOriginalPostContent() {
        return this.content_o;
    }
    getOriginalPostTime() {
        return format(this.post_time_o, 'en_US');
    }
    
}

module.exports = Share;
