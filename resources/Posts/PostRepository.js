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
        let post = await this.knex
                                .select('first_name', 'last_name', 'users.user_avatar', 'post_id', 'post.user_id', 'content', 'like_count', 'comment_count', 'share_count', 'post_share_id', 'post_time')
                                .from('post')
                                .join('users', {'users.user_id': 'post.user_id'})
                                .where('post_id', '=', post_id);
        if (!post.length) {
            throw new Error("Post does not exist");
        }
        if(post[0].post_share_id) {
            let originalPost = await this.knex
                                    .select('first_name', 'last_name', 'post_id', 'post.user_id', 'content', 'like_count', 'comment_count', 'share_count', 'post_share_id', 'post_time')
                                    .from('post')
                                    .join('users', {'users.user_id': 'post.user_id'})
                                    .where('post_id', '=', post[0].post_share_id);
            let mediaPost = await this.knex.select('*').from('media').where('post_id', post[0].post_id);
            let medias = mediaPost.map((media) => media.filename);
            return new Post(post[0].post_id, post[0].user_id, originalPost[0].user_avatar, post[0].first_name, post[0].last_name,post[0].content, medias, post[0].like_count, post[0].comment_count, post[0].share_count, post[0].post_share_id, post[0].post_time, originalPost[0].post_id, originalPost[0].post_time, originalPost[0].content, originalPost[0].first_name, originalPost[0].last_name, originalPost[0].user_id);            
        }
        let mediaPost = await this.knex.select('*').from('media').where('post_id', post[0].post_id);
        let medias = mediaPost.map((media) => media.filename);
        return new Post(post[0].post_id, post[0].user_id, post[0].user_avatar, post[0].first_name, post[0].last_name, post[0].content, medias, post[0].like_count, post[0].comment_count, post[0].share_count, post[0].post_share_id, post[0].post_time);
    }
    
    async addNewPost(user_id, content) {
        let post = await this.knex('post').insert([{user_id: user_id, content: content, like_count: 0, comment_count: 0, share_count: 0, post_time: dateTime()}]);
        return new Post(post[0]);
    }
    
    async getUserPost(user_id) {
        let posts = await this.knex
                                .select('first_name', 'last_name', 'post_id', 'post.user_id', 'content', 'like_count', 'comment_count', 'share_count', 'post_share_id', 'post_time', 'users.user_avatar')
                                .from('post')
                                .join('users', {'users.user_id': 'post.user_id'})
                                .where('post.user_id', user_id)
                                .orderBy('post_time', 'desc');
        let result =  posts.map(async (post) => {
            if(post.post_share_id) {
                let originalPost = await this.knex
                                                .select('first_name', 'last_name', 'post_id', 'post.user_id', 'content', 'post_time', 'users.user_avatar')
                                                .from('post')
                                                .join('users', {'users.user_id': 'post.user_id'})
                                                .where('post_id', '=', post.post_share_id);
                let mediaPost = await this.knex.select('*').from('media').where('post_id', post.post_share_id);
                let medias = mediaPost.map((media) => media.filename);
                return new Post(post.post_id, post.user_id, originalPost[0].user_avatar, post.first_name, post.last_name, post.content, medias, post.like_count, post.comment_count, post.share_count, post.post_share_id, post.post_time, originalPost[0].post_id, originalPost[0].post_time, originalPost[0].content, originalPost[0].first_name, originalPost[0].last_name, originalPost[0].user_id);            
            }
            let mediaPost = await this.knex.select('*').from('media').where('post_id', post.post_id);
            let medias = mediaPost.map((media) => media.filename);
            return new Post(post.post_id, post.user_id, post.user_avatar, post.first_name, post.last_name, post.content, medias, post.like_count, post.comment_count, post.share_count, post.post_share_id, post.post_time);
        });
        return Promise.all(result);
    }

    async getUserFeedPost(user_id) {
        let posts = await this.knex
                                .select('first_name', 'last_name', 'post_id', 'users.user_avatar', 'post.user_id', 'content', 'like_count', 'comment_count', 'share_count', 'post_share_id', 'post_time')
                                .from('post')
                                .join('users', {'users.user_id': 'post.user_id'})
                                .where('post.user_id', user_id)
                                .orWhereIn('post.user_id', function() {
                                                this.select('friend_id').from('followers').where({'user_id': user_id, 'follower_status': 'friend'});
                                              })
                                .orderBy('post_time', 'desc');
        let result =  posts.map(async (post) => {
            if(post.post_share_id) {
                let originalPost = await this.knex
                                                .select('first_name', 'last_name', 'users.user_avatar', 'post_id', 'post.user_id', 'content', 'post_time')
                                                .from('post')
                                                .join('users', {'users.user_id': 'post.user_id'})
                                                .where('post_id', '=', post.post_share_id);
                let mediaPost = await this.knex.select('*').from('media').where('post_id', post.post_share_id);
                let medias = mediaPost.map((media) => media.filename);
                return new Post(post.post_id, post.user_id, originalPost[0].user_avatar, post.first_name, post.last_name, post.content, medias, post.like_count, post.comment_count, post.share_count, post.post_share_id, post.post_time, originalPost[0].post_id, originalPost[0].post_time, originalPost[0].content, originalPost[0].first_name, originalPost[0].last_name, originalPost[0].user_id);            
            }
            let mediaPost = await this.knex.select('*').from('media').where('post_id', post.post_id);
            let medias = mediaPost.map((media) => media.filename);
            return new Post(post.post_id, post.user_id, post.user_avatar, post.first_name, post.last_name, post.content, medias, post.like_count, post.comment_count, post.share_count, post.post_share_id, post.post_time);
        });
        return Promise.all(result);
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