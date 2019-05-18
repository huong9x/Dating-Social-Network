const Post = require('./Post');
const dateTime = require('date-time');

class PostRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findPostOwner(post_id, user_id) {
        return await this.knex.select('*').from('post').where({
            user_id: user_id,
            post_id: post_id
        });
    }
    async findPost(post_id) {
        let post = await this.knex.select('*').from('post').where('post_id', '=', post_id);
        return new Post(post[0].post_id, post[0].user_id, post[0].content, post[0].video_id, post[0].image_id, post[0].post_time);
    }
    async addNewPost(user_id, content) {
        let post = await this.knex('post').insert([{user_id: user_id, content: content, post_time: dateTime()}]);
        return new Post(post[0]);
    }
    async getUserPost(user_id) {
        let posts = await this.knex.select('*').from('post').where('user_id', user_id).orderBy('post_time', 'desc');
        return posts.map(async (post) => {
            let media = await this.knex.select('*').from('media').where('post_id', post.post_id);
            return new Post(post.post_id, post.user_id, post.content, media, post.post_time);
        });

    }
    async editPost(post_id, content) {
        return await this.knex('post').where('post_id','=', post_id)
                            .update({ content: content })
    }
}

module.exports = PostRepository;

