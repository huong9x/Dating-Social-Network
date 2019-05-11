const Post = require('./Post');

class PostRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async addNewPost(content) {
        let post = await this.knex('post').insert([{user_id: user_id}, {content: content}])
        return new 
    }
}

module.exports = PostRepository;

