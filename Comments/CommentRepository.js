const Comment = require('./Comment');
const dateTime = require('date-time');

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

    // async findComment(post_id) {
    //     // let rawComment = await this.knex.select('*').from('comment').where('post_id', post_id).orderBy('comment_id', 'desc');

    //     let comments = await this.knex.select('*').from('comment').where('post_id', post_id).orderBy('comment_id', 'desc');
    //     // return comments.map((comment) => new Comment(comment.comment_id, comment.user_id, comment.post_id, comment.comment_text, comment.comment_time));
    //     return new Comment(comments);
    // }
    async findComment(post_id) {
        let comments = await this.knex.select('*').from('comment').where('post_id', post_id);
        return comments.map((comment) => new Comment(comment.comment_id, comment.user_id, comment.post_id, comment.comment_text, comment.comment_time));
    }

    async postComment(user_id, post_id, comment_text) {
        let comment = await this.knex('comment').insert([{user_id: user_id, post_id: post_id, comment_text: comment_text, comment_time: dateTime()}]);
        return new Comment(comment[0]);
    }
}

module.exports = CommentRepository;
