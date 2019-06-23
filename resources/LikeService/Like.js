class Like {
    constructor(rawLike) {
        this.like_id   = rawLike.id;
        this.user_id   = rawLike.user_id;
        this.post_id   = rawLike.post_id;
    }

    getLikeId() {
        return this.like_id;
    }
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
}

module.exports = Like;