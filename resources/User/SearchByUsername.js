class SearchByUsername {
    constructor(username) {
        this.username = username;
    }

    buildSearchQuery(query) {
        return query.where('username', this.username);
    }
}

module.exports = SearchByUsername;