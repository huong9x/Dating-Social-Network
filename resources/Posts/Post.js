const { format } = require('timeago.js');
class Post {
    constructor(post_id, user_id, content, post_time) {
        this.post_id    = post_id;
        this.user_id    = user_id;
        this.content    = content;
        this.post_time  = post_time;
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
    getPostTime() {
        return format(this.post_time, 'en_US');
    }
    getRawPostTime() {
        return this.post_time;
    }
    async getPostLikes() {
        let likes = await this.knex.select('*').from('likes').where('post_id', post_id);
    }
    getPostCmts() {
        return this.post_cmts;
    }
}

module.exports = Post;
