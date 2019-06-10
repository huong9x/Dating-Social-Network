const Like = require('./Like');
const dateTime = require('date-time');

class LikeRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async checkUserLike (user_id, post_id) {
        let like = await this.knex.select('*')
                                    .from('likes')
                                    .where({
                                        user_id: user_id,
                                        post_id: post_id
                                    });
        if (like.length) {
            return true;
        }
        return false;
    }

    async likePost(user_id, post_id) {
        let like = await this.knex('likes').insert([{user_id: user_id, post_id: post_id, like_time: dateTime()}]);
        return new Like(like);
    }

    async unlikePost(user_id, post_id) {
        let unlike = await this.knex('likes')
                                    .where({
                                        user_id: user_id,
                                        post_id: post_id
                                    })
                                    .del();
        return new Like(unlike);
    }

    async likeExist(user_id, post_id) {
        let like = await this.knex.select('*').from('likes').where({user_id: user_id, post_id: post_id});
        return like.length;
    }
}

module.exports = LikeRepository;
