class SearchByUserId {
    constructor(user_id) {
        this.user_id = user_id;
    }

    buildSearchQuery(query) {
        return query.where('user_id', this.user_id);
    }
}

module.exports = SearchByUserId;