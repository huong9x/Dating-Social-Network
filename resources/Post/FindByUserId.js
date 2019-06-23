class FindByPostUserId {
    constructor(user_id) {
        this.user_id = user_id;
    }
    buildSearchQuery(query) {
        return query.select('*')
                    .from('posts')
                    .where('user_id', this.user_id)
                    .orderBy('time', 'desc');
    }

}

module.exports = FindByPostUserId;