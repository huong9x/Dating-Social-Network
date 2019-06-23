const { format } = require('timeago.js');
class PostDetail {
    constructor(rawPost) {
        this.post_id       = rawPost.id;
        this.user_id       = rawPost.user_id;
        this.user_avatar   = rawPost.avatar;
        this.first_name    = rawPost.first_name;
        this.last_name     = rawPost.last_name;
        this.content       = rawPost.content; 
        this.like_count    = rawPost.like_count;
        this.comment_count = rawPost.comment_count;
        this.share_count   = rawPost.share_count;
        this.share_id      = rawPost.share_id;
        this.post_time     = rawPost.time;
    }

    getPostId() {
        return this.post_id;
    }
    getUserId() {
        return this.user_id;
    }
    getUserAvatar() {
        return this.user_avatar ? '/UserFiles/' + this.user_avatar : 'img/default-user.png';
    }
    getUserPresentationName() {
        return this.first_name + ' ' + this.last_name;
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
        return this.share_id;
    }
    getPostTime() {
        return format(this.post_time, 'en_US');
    }
    getRawPostTime() {
        return this.post_time;
    }
    
}

module.exports = PostDetail;