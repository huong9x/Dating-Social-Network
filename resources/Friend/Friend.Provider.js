const FriendRepository = require('./FriendRepository');

module.exports = (knex) => {
    const friendRepository = new FriendRepository(knex);

    return async (context, next) => {
        context.friendRepository = friendRepository;
        await next();
    };

};
