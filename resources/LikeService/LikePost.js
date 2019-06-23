class LikePost {
    constructor(user_id, post_id) {
        this.like = { user_id: user_id, post_id: post_id }
    }
    react(query) {
        return query.insert(this.like);
    }
}

module.exports = LikePost;
