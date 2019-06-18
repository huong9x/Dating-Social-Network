const Comment = require('./Comment');
const dateTime = require('date-time');

class CommentRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findCommentOwner(user_id, comment_id) {
        let comment = await this.knex.select('*').from('comment').where({
            user_id: user_id,
            comment_id: comment_id
        });
        
        return new Comment(comment);
    }

    async findComment(post_id) {
        let comments = 
        await this.knex.select(
            'first_name',
            'last_name',
            'user_avatar',
            'comment_id',
            'comment.user_id',
            'post_id',
            'comment_text',
            'comment_time'
        )
        .from('comment')
        .leftJoin('users', 'comment.user_id', 'users.user_id')
        .where({
            post_id: post_id
        })
        .orderBy('comment_time', 'desc');

        return comments.map((comment) => { return new Comment(comment)} );
    }

    async postComment(user_id, post_id, comment_text) {
        let comment = await this.knex('comment')
                        .insert({
                            user_id: user_id,
                            post_id: post_id,
                            comment_text: comment_text,
                            comment_time: dateTime()
                        });
        return new Comment(comment);
    }

    async editComment(user_id, comment_id, comment_text) {
        let comment = await this.knex('comment')
        //comment content
                        .update('comment_text', comment_text)
                        .where({
                            comment_id: comment_id,
                            user_id: user_id
                        });
        return new Comment(comment);
    }

    async deleteComment(comment_id) {
        return await this.knex('comment')
                        .where({
                            comment_id: comment_id
                        })
                        .del();
    }
}

module.exports = CommentRepository;
