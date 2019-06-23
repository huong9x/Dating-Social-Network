const PostDetail = require('./PostDetail');

class PostRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findPostOwner(post_id, user_id) {
        return await this.knex.select('*').from('posts').where({user_id: user_id, id: post_id});
    }

    async find(condition) {
        let posts = await condition.buildSearchQuery(this.knex);
        return posts.map((post) => new PostDetail(post));
    }
    
    async create(newPost) {
        let post = await newPost.make(this.knex('posts'));
        return post[0];
    }

    async update(post) {
        return await post.buildUpdateQuery(this.knex('posts'));
    }
    
    async deletePost(post_id) {
        return await this.knex('posts').where('id', post_id ).del();
    }
}

module.exports = PostRepository;