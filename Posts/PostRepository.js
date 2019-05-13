const Post = require('./Post');

class PostRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async addNewPost(content) {
        let post = await this.knex('post').insert([{user_id: 1, content: content}]);
        // return new Post(1, post[0].content, post[0].video_id, post[0].image_id, post[0].post_time)
    }
}

module.exports = PostRepository;

