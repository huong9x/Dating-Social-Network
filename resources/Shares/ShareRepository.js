const Share = require('./Share');
const dateTime = require('date-time');

class ShareRepository {
    constructor(knex) {
        this.knex = knex;
    }
    
    async postShare(user_id, post_id, content) {
        let share = await this.knex('share')
                                    .insert([{
                                        user_id: user_id,
                                        post_id: post_id,
                                        content: content,
                                        share_time: dateTime()
                                    }]);
        return new Share(share[0]);
    }
}

module.exports = ShareRepository;
