class SearchUserByName {
    constructor(name) {
        this.name = name;
    }

    buildSearchQuery(query) {
        return query.select('*')
                    .from('users')
                    .whereRaw('concat (first_name,  \' \', last_name) like ?', ['%' + this.name + '%']);
    }
}

module.exports = SearchUserByName;
