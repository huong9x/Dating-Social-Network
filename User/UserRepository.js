const User = require('./User');

class UserRepository {
    constructor(knex) {
        this.knex = knex;
    }
    async search(condition) {
        let searchQuery = condition.buildWhereCondition(this.knex.select('*').from('users'));
        let results     = await searchQuery;

        return results.map(result => new User(result.username, result.password));
    }
}

module.exports = UserRepository;

