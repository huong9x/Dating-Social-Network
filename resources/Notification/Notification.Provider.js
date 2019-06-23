const NotificationRepository = require('./NotificationRepository');

module.exports = (knex) => {
    const notificationRepository = new NotificationRepository(knex);

    return async (context, next) => {
        context.notificationRepository = notificationRepository;
        await next();
    };

};
