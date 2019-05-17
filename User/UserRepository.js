const User           = require('./User');
const UserInfo       = require('./UserInfo');

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
    async getByUserId(user_id) {
        let rawUser = await this.knex.select('*').from('users').where('user_id', user_id);

        if(rawUser.length) {
            return new User(rawUser[0].user_id, rawUser[0].username, rawUser[0].password);
        } 

        return null;
    }

    async getUserInfo(user_id) {
        let rawUser = await this.knex.select('*').from('users').where('user_id', user_id);

        if(rawUser.length) {
            return new UserInfo(rawUser);
        } 

        return null;
    }

    async addUser(username, password, first_name, last_name, email, birth_date, gender) {
        return await this.knex('users').insert([{username: username, password: password, first_name: first_name, last_name: last_name, email: email, birth_date: birth_date, gender}]);
    }

    async editUser(user_id, first_name, last_name, email, phone_number, birth_date, gender, address, relationship) {
        return await this.knex('users')
                                .where('user_id', user_id)
                                .update({
                                    first_name  : first_name,
                                    last_name   : last_name,
                                    email       : email,
                                    phone_number: phone_number,
                                    birth_date  : birth_date,
                                    gender      : gender,
                                    address     : address,
                                    relationship: relationship
                                });
    }
}

module.exports = UserRepository;

