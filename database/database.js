const knex = require('knex');

exports.createConnection = (config) => {
    return knex(config);
};

exports.connectionProvider = (config) => {

    const connection = exports.createConnection(config);

    return async (context, next) => {
        context.database = connection;

        await next();
    };
};