const  Comment = require('./Comment');
// const dateTime = require('date-time');

class CommentRepository {
    constructor(knex) {
        this.knex = knex;
    }

}

module.exports = CommentRepository;
