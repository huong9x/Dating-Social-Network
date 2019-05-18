const { format } = require('timeago.js');
class Post {
    constructor(post_id, user_id, content, media, post_time) {
        this.post_id   = post_id;
        this.user_id   = user_id;
        this.content   = content;
        this.media     = media;
        this.post_time = post_time;
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
    getMedia() {
        return this.media;
    }
    getPostTime() {
        return format(this.post_time, 'en_US');
    }
    getRawPostTime() {
        return this.post_time;
    }
}

module.exports = Post;
