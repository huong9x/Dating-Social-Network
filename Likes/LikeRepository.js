const Like = require('./Like');
const dateTime = require('date-time');

class LikeRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async likePost(user_id, post_id) {
        let like = await this.knex('likes').insert([{user_id: user_id, post_id: post_id, like_time: dateTime()}]);
        return new Like(like[0]);
    }
}

module.exports = LikeRepository;
