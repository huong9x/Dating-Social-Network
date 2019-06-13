class Friend {
    constructor(rawFriend) {
        this.follower_id     = rawFriend.follower_id;
        this.user_id         = rawFriend.user_id;
        this.friend_id       = rawFriend.friend_id;
        this.friend_avatar   = rawFriend.user_avatar;
        this.follower_status = rawFriend.follower_status;
        this.followerName    = rawFriend.first_name + " " + rawFriend.last_name;
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
    getFriendAvatar() {
        if(!this.friend_avatar) {
            return 'img/default-user.png';
        }
        return '/uploadedFiles/' + this.friend_avatar;
    }
    getFollowerStatus() {
        return this.follower_status;
    }
    getFollowerName() {
        return this.followerName;
    }
}

module.exports = Friend;
