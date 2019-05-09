const User = require('./User');

class UserRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async findByUsername(username) {
        let rawUser = await this.knex.select('*').from('users').where('username', username);

        if(rawUser.length) {
            return new User(rawUser[0].user_id, rawUser[0].username, rawUser[0].password);
        } 

        return null;
    }
    async getByUserId(id) {
        let rawUser = await this.knex.select('*').from('users').where('user_id', user_id);

        if(rawUser.length) {
            return new User(rawUser[0].user_id, rawUser[0].username, rawUser[0].password);
        } 

        return null;
    }
}

module.exports = UserRepository;

