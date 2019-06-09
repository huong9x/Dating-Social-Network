const { format } = require('timeago.js');
class Post {
    constructor(post_id, user_id, content, like_count, comment_count, share_count, post_share_id, post_time) {
        this.post_id       = post_id;
        this.user_id       = user_id;
        this.content       = content;
        this.like_count    = like_count;
        this.comment_count = comment_count;
        this.share_count   = share_count;
        this.post_share_id = post_share_id;
        this.post_time     = post_time;
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
    getPostShareId() {
        return this.post_share_id;
    }
    getPostTime() {
        return format(this.post_time, 'en_US');
    }
    getRawPostTime() {
        return this.post_time;
    }
    
}

module.exports = Post;
