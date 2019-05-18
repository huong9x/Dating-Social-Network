const MediaRepository = require('./Media.Repository');

module.exports = (knex) => {
    const mediaRepository = new MediaRepository(knex);

    return async (context, next) => {
        context.mediaRepository = mediaRepository;
        await next();
    };

};
