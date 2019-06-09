const Share = require('./Share');
const dateTime = require('date-time');

class ShareRepository {
    constructor(knex) {
        this.knex = knex;
    }
    
    async postShare(user_id, content, post_share_id) {
        let share = await this.knex('post')
                                    .insert([{
                                        user_id       : user_id,
                                        content       : content,
                                        like_count    : 0,
                                        comment_count : 0,
                                        share_count   : 0,
                                        post_share_id : post_share_id,
                                        post_time     : dateTime()
                                    }]);
        return new Share(share[0]);
    }
}

module.exports = ShareRepository;
