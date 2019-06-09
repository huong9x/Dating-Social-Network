const User = require('./User');

class UserRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async searchUser(condition) {
        let rawUser = await condition.buildSearchQuery(this.knex.select('*').from('users'));

        if(rawUser.length) { return new User(rawUser); } 
        return null;
    }

    async addUser(username, password, first_name, last_name, email, birth_date, gender) {
        let user = await this.knex('users').insert([{username: username, password: password, first_name: first_name, last_name: last_name, email: email, birth_date: birth_date, gender}]);
        let rawUser = await this.knex.select('*').from('users').where('user_id', user[0]);
        return new User(rawUser);
    }

    async editUser(user_id, information) {
        return await information.buildUpdateQuery(this.knex('users').where('user_id', user_id));
    }
    async changeUserPassword(user_id, password) {
        return await this.knex('users')
                            .where('user_id', user_id)
                            .update('password', password);
    }
}

module.exports = UserRepository;

