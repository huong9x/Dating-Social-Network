class LikeCountUpdate {
    constructor(post_id, like_count) {
        this.post_id    = post_id;
        this.like_count = like_count;
    }

    buildUpdateQuery(query) {
        return query.where('posts.id', this.post_id)
                    .update('like_count', this.like_count);
    }
}

module.exports = LikeCountUpdate;
