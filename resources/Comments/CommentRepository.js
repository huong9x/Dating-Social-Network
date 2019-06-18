const CommentDetail = require('./CommentDetail');

class CommentRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findCommentOwner(user_id, comment_id) {
        let comment = await this.knex.select('*').from('comment').where({
            user_id: user_id,
            comment_id: comment_id
        });
        
        return new CommentDetail(comment);
    }

    async find(condition) {

        let comments = await condition.buildCondition(this.knex('comment'));

        return comments.map((comment) => { return new CommentDetail(comment)});
    }

    async create(comment) {

        let newComment = await comment.makeComment(this.knex('comment'));

        return new CommentDetail(newComment[0]);
    }

    async edit(comment) {

        return await comment.editComment(this.knex('comment'));

    }

    async delete(comment_id) {
        return await this.knex('comment').where('comment_id', comment_id).del();
    }
}

module.exports = CommentRepository;
