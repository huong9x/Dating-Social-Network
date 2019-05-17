const CommentRepository = require('./CommentRepository');

module.exports = (knex) => {
    const commentRepository = new PostRepository(knex);

    return async (context, next) => {
        context.commentRepository = commentRepository;
        await next();
    };

};
