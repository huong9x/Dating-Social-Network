const ShareRepository = require('./ShareRepository');

module.exports = (knex) => {
    const shareRepository = new ShareRepository(knex);

    return async (context, next) => {
        context.shareRepository = shareRepository;
        await next();
    };

};
