class CommentCountUpdate {
    constructor(post_id, comment_count) {
        this.post_id       = post_id;
        this.comment_count = comment_count;
    }

    buildUpdateQuery(query) {
        return query.where('posts.id', this.post_id)
                    .update('comment_count', this.comment_count);
    }
}

module.exports = CommentCountUpdate;
