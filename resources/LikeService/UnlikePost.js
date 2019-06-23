class UnlikePost {
    constructor(user_id, post_id) {
        this.like = { user_id: user_id, post_id: post_id };
    }

    react(query) {
        return query.where(this.like).del();
    }
}

module.exports = UnlikePost;
