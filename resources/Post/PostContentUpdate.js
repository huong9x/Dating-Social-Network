class PostContentUpdate {
    constructor(user_id, post_id, content) {
        this.user_id = user_id;
        this.post_id = post_id;
        this.content = content;
    }

    buildUpdateQuery(query) {
        return query.where('posts.id', this.post_id)
                    .andWhere('user_id', this.user_id)
                    .update('content', this.content);
    }
}

module.exports = PostContentUpdate;
