
class Post {
    constructor(user_id, content, video_id, image_id, post_time) {
        this.user_id   = user_id;
        this.content   = content;
        this.video_id  = video_id;
        this.image_id  = image_id;
        this.post_time = post_time;
    }
    
    getUserId() {
        return this.user_id;
    }
    getContent() {
        return this.content;
    }
}

module.exports = Post;
