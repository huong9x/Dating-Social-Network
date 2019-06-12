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
            return new UserInfo(rawUser[0]);
        } 

        return null;
    }

    async addUser(username, password, first_name, last_name, email, birth_date, gender) {
        let user = await this.knex('users').insert([{username: username, password: password, first_name: first_name, last_name: last_name, email: email, birth_date: birth_date, gender}]);
        return new User(user[0]);
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
    
    async changeUserPassword(user_id, password) {
        return await this.knex('users')
                            .where('user_id', user_id)
                            .update('password', password);
    }

    async reportUser(user_id, content) {
        return await this.knex('reports').insert({
                                    user_id : user_id,
                                    content : content
                                    });
    }

    async searchUser(name) {
        let users = await this.knex.select('*')
                                    .from('users')
                                    .whereRaw('concat (first_name,  \' \', last_name) like ?', ['%' + name + '%']);
        return users.map((user) => new UserInfo(user));
    }

    // async searchUser(user_id, name) {
    //     let users = await this.knex.select(
    //                                 'first_name',
    //                                 'last_name',
    //                                 'friend_id',
    //                                 'follower_status')
    //                                 .from('followers')
    //                                 .leftJoin('users', 'users.user_id', 'followers.friend_id')
    //                                 .where('followers.user_id', '=', user_id, 'and', 'first_name', 'like', '%' + name + '%')
    //                                 .orWhere('followers.user_id', '=', user_id, 'and', 'last_name', 'like', '%' + name + '%');
    //     return users.map((user) => new UserInfo(user));
    // }
}

module.exports = UserRepository;

