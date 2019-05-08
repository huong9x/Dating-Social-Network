const UserRepository = require('./UserRepository');

module.exports = (knex) => {
    const userRepository = new UserRepository(knex);

    return async (context, next) => {
        context.userRepository = userRepository;
        await next();
    };

};
