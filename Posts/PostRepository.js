const Post = require('./Post');
const getCurrentTime = require('../config/time/getCurrentTime');

class PostRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async addNewPost(user_id, content) {
        let post = await this.knex('post').insert([{user_id: user_id, content: content, post_time: getCurrentTime()}]);
        return new Post(post[0]);
    }
    async getUserPost(user_id) {
        let posts = await this.knex.select('*').from('post').where('user_id', user_id);
        return posts.map((post) => new Post(post.post_id, post.user_id, post.content, post.video_id, post.image_id, post.post_time));
    }
}

module.exports = PostRepository;

