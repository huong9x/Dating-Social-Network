const PostDetailFinder = require('./PostDetailFinder');

module.exports = () => {

    return async (context, next) => {
        const postDetailFinder   = new PostDetailFinder(context.postRepository, context.mediaRepository);

        context.postDetailFinder = postDetailFinder;
        
        await next();
    };

};
