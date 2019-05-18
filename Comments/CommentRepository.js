const Comment = require('./Comment');
// const dateTime = require('date-time');

class CommentRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findComment(post_id) {
        let rawComment = await this.knex.select('*').from('commment').where('post_id', post_id);
        console.log(rawComment);
        if (rawComment.length) {
            return new Comment(rawComment[0].comment_id, rawComment[0].user_id, rawComment[0].post_id, rawComment[0].comment_text, rawComment[0].comment_time);
        }
        return null;
    }
}

module.exports = CommentRepository;
