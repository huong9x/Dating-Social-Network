const { format } = require('timeago.js');
class Post {
    constructor(post_id, user_id, user_avatar, first_name, last_name, content, medias, like_count, comment_count, share_count, post_share_id, post_time, post_id_o, post_time_o, content_o, first_name_o, last_name_o, user_id_o, user_avatar_o) {
        this.post_id       = post_id;
        this.user_id       = user_id;
        this.user_avatar   = user_avatar;
        this.first_name    = first_name;
        this.last_name     = last_name;
        this.content       = content;
        this.medias        = medias;
        this.like_count    = like_count;
        this.comment_count = comment_count;
        this.share_count   = share_count;
        this.post_share_id = post_share_id;
        this.post_time     = post_time;
        this.post_id_o     = post_id_o;
        this.post_time_o   = post_time_o;
        this.content_o     = content_o;
        this.first_name_o  = first_name_o;
        this.last_name_o   = last_name_o;
        this.user_id_o     = user_id_o;
        this.user_avatar_o = user_avatar_o;
    }
    
    getUserId() {
        return this.user_id;
    }
    getUserAvatar() {
        return this.user_avatar ? '/uploadedFiles/' + this.user_avatar : 'img/default-user.png';
    }
    getUserPresentationName() {
        return this.first_name + ' ' + this.last_name;;
    }
    getPostId() {
        return this.post_id;
    }
    getContent() {
        return this.content;
    }
    getPostMedia() {
        return this.medias;
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
    getOriginalPostName() {
        return this.first_name_o + ' ' + this.last_name_o;
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
    getOriginalPostAvatar() {
        return this.user_avatar_o ? '/uploadedFiles/' + this.user_avatar_o : 'img/default-user.png';
    }
    getOriginalPostUserId() {
        return this.user_id_o;
    }
    
}

module.exports = Post;