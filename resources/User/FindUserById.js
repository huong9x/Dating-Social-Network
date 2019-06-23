class FindUserById {
    constructor(user_id) {
        this.user_id = user_id;
    }

    buildSearchQuery(query) {
        return query.select('*')
                    .from('users')
                    .where('id', this.user_id);
    }
}

module.exports = FindUserById;
