class FindByPostUserFeedId {
    constructor(user_id, friends) {
        this.user_id  = user_id;
        this.friends  = friends;
    }
    buildSearchQuery(query) {
        return query.select('*')
                    .from('posts')
                    .where('user_id', this.user_id)
                    .orWhereIn('user_id', this.friends)
                    .orderBy('time', 'desc');
    }

}

module.exports = FindByPostUserFeedId;