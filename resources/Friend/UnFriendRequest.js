class UnFriendRequest {
    constructor(user_id, friend_id) {
        this.user_id   = user_id;
        this.friend_id = friend_id;
    }

    make(query) {
        return query.where({ user_id: this.user_id, friend_id: this.friend_id})
                    .orWhere({ user_id: this.friend_id, friend_id: this.user_id})
                    .del();
    }
}

module.exports = UnFriendRequest;
