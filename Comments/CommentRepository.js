const Comment = require('./Comment');
// const dateTime = require('date-time');

class CommentRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findComment(post_id) {
        let rawComment = await this.knex.select('*').from('comment').where('post_id', post_id).orderBy('comment_id', 'desc');
        if (rawComment.length) {
            return new Comment(rawComment);
        }
        return null;
    }
}

module.exports = CommentRepository;
