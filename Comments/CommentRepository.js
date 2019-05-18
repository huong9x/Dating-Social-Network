const Comment = require('./Comment');
// const dateTime = require('date-time');

class CommentRepository {
    constructor(knex) {
        this.knex = knex;
    }

    // async findComment(post_id) {
    //     // let rawComment = await this.knex.select('*').from('comment').where('post_id', post_id).orderBy('comment_id', 'desc');

    //     let rawComment = await this.knex.select('*').from('comment').where('post_id', post_id);
    //     if (rawComment.length) {
    //         return new Comment(rawComment);
    //     }
    //     return null;
    //}

    async findComment(post_id) {
        // let rawComment = await this.knex.select('*').from('comment').where('post_id', post_id).orderBy('comment_id', 'desc');

        let comments = await this.knex.select('*').from('comment').where('post_id', post_id).orderBy('comment_id', 'desc');
        return comments.map((comment) => new Comment(comment.comment_id, comment.user_id, comment.post_id, comment.comment_text, comment.comment_time));
        
    }
}

module.exports = CommentRepository;
