class SearchByExactlyNameCondition {
    constructor(name) {
        this.name = name;
    }

    buildWhereCondition(query) {
        return query.where('username', '=', this.name);
    }
}

module.exports = SearchByExactlyNameCondition;
