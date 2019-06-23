class IsFriend {
    constructor(user_id, friend_id) {
        this.user_id   = user_id;
        this.friend_id = friend_id;
    }

    buildSearchQuery(query) {
        return query.select('*')
                    .from('followers')
                    .where({ user_id: this.user_id, friend_id: this.friend_id });
    }
}

module.exports = IsFriend;
