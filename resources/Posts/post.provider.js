const PostRepository = require('./PostRepository');

module.exports = (knex) => {
    const postRepository = new PostRepository(knex);

    return async (context, next) => {
        context.postRepository = postRepository;
        await next();
    };

};
