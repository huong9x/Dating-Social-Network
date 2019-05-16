const { format } = require('timeago.js');
class Post {
    constructor(post_id, user_id, content, video_id, image_id, post_time) {
        this.post_id   = post_id;
        this.user_id   = user_id;
        this.content   = content;
        this.video_id  = video_id;
        this.image_id  = image_id;
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
    getVideoId() {
        return this.video_id;
    }
    getImageId() {
        return this.image_id;
    }
    getPostTime() {
        return format(this.post_time, 'en_US');
    }
    getRawPostTime() {
        return this.post_time;
    }
}

module.exports = Post;
