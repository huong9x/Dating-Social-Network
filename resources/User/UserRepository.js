const User           = require('./User');
const UserInfo       = require('./UserInfo');

class UserRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async findByUsername(username) {
        let rawUser = await this.knex.select('*').from('users').where('username', username);

        if(rawUser.length) {
            return new User(rawUser[0].id, rawUser[0].username, rawUser[0].password);
        }

        return null;
    }
    
    async getByUserId(user_id) {
        let rawUser = await this.knex.select('*').from('users').where('id', user_id);

        if(rawUser.length) {
            return new User(rawUser[0].id, rawUser[0].username, rawUser[0].password);
        } 

        return null;
    }

    async find(userWithCondition) {
        let users = userWithCondition.buildSearchQuery(this.knex);
        return users.map((user) => new UserInfo(user));

    }
    
    async add(user) {
        let newUser = await user.register(this.knex('users'));

        return new User(newUser[0]);

    }
    
    async update(user) {
        let updatedUser = await user.changeInformation(this.knex('users'));
        return new User(updatedUser[0])
    }

    async reportUser(user_id, content) {
        return await this.knex('reports').insert({
                                    id : user_id,
                                    content : content
                                    });
    }
}

module.exports = UserRepository;
