const Post     = require('./Post');
const dateTime = require('date-time');

class PostRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findPostOwner(post_id, user_id) {
        let findPostOwner = await this.knex.select('*').from('post').where({
            user_id: user_id,
            post_id: post_id
        });
        return new Post(findPostOwner);
    }
    
    async findPost(post_id) {
        let post = await this.knex.select('*').from('post').where('post_id', '=', post_id);        
        if (!post.length) {
            throw new Error("Post do not exist");
        }
        return new Post(post[0].post_id, post[0].user_id, post[0].content, post[0].like_count, post[0].comment_count, post[0].share_count, post[0].post_time);
    }
    
    async addNewPost(user_id, content) {
        let post = await this.knex('post').insert([{user_id: user_id, content: content, like_count: 0, comment_count: 0, share_count: 0, post_time: dateTime()}]);
        return new Post(post[0]);
    }
    
    async getUserPost(user_id) {
        let posts = await this.knex.select('*')
                                            .from('post')
                                            .where('user_id', user_id)
                                            .orderBy('post_time', 'desc');
        return posts.map((post) => {
            return new Post(post.post_id, post.user_id, post.content, post.like_count, post.comment_count, post.share_count, post.post_share_id, post.post_time);
        });
    }

    async findShare(user_id) {
        let posts = await this.knex.select('*')
                                            .from('post')
                                            .where('user_id', user_id);
        return posts.map((post) => {
            return new Post(post.post_id, post.user_id, post.content, post.like_count, post.comment_count, post.share_count, post.post_share_id, post.post_time);
        });
    }

    async updateLikeCount(post_id, like_count) {
        let post = await this.knex('post')
                                    .where({
                                        post_id    : post_id
                                    })
                                    .update({
                                        like_count : like_count
                                    });
        return post;
    }

    async updateCommentCount(post_id, comment_count) {
        let post = await this.knex('post')
                                    .where({
                                        post_id       : post_id
                                    })
                                    .update({
                                        comment_count : comment_count
                                    });
        return post;
    }

    async updateShareCount(post_id, share_count) {
        let post = await this.knex('post')
                                    .where({
                                        post_id       : post_id
                                    })
                                    .update({
                                        share_count : share_count
                                    });
        return post;
    }

    async editPost(user_id, post_id, content) {
        let post = await this.knex('post')
                                .where({
                                    post_id: post_id,
                                    user_id: user_id,
                                })
                                .update({ content: content });
        return new Post(post[0]);
    }
    
    async deletePost(post_id) {
        let post = await this.knex('post')
                                    .where(
                                        'post_id', post_id
                                    )
                                    .del();
        return new Post(post[0]);
    }

    async postShare(user_id, content, post_share_id) {
        let post = await this.knex('post')
                                    .insert([{
                                        user_id       : user_id,
                                        content       : content,
                                        like_count    : 0,
                                        comment_count : 0,
                                        share_count   : 0,
                                        post_share_id : post_share_id,
                                        post_time     : dateTime()
                                    }]);
        return new Post(post[0]);
    }
}

module.exports = PostRepository;
