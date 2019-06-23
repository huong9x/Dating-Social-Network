class Friend {
    constructor(rawFriend) {
        this.follower_id     = rawFriend.id;
        this.user_id         = rawFriend.user_id;
        this.friend_id       = rawFriend.friend_id;
        this.follower_status = rawFriend.status;
        this.friend_since    = rawFriend.friend_since;
        this.friend_name     = rawFriend.first_name + ' ' + rawFriend.last_name;
        this.friend_avatar   = rawFriend.avatar;
    }

    getFollowerId() {
        return this.follower_id;
    }
    getUserId() {
        return this.user_id;
    }
    getFriendId() {
        return this.friend_id;
    }
    getFriendName() {
        return this.friend_name;
    }
    getFriendAvatar() {
        return this.friend_avatar ? '/UserFiles/' + this.friend_avatar : 'img/default-user.png';
    }
    getFollowerStatus() {
        return this.follower_status;
    }
    getTimeBecomeFriend() {
        return this.friend_since;
    }
}

module.exports = Friend;
