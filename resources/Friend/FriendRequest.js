class FriendRequest {
    constructor(user_id, friend_id) {
        this.friend_request = [
            { user_id: user_id, friend_id: friend_id, status: 'pending'},
            { user_id: friend_id, friend_id: user_id, status: 'waiting'}
        ];
    }
    make(query) {
        return query.insert(this.friend_request);
    }
}

module.exports = FriendRequest;
