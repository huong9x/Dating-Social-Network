const Like = require('./Like');

class LikeRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async reacting(post) {
        return await post.react(this.knex('likes'));
    }

    async likeExist(user_id, post_id) {
        return await this.knex.select('*').from('likes').where({user_id: user_id, post_id: post_id});
    }
}

module.exports = LikeRepository;
