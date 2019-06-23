class Comment {
    constructor(user_id, post_id, content, comment_time) {
        this.user_id      = user_id;
        this.post_id      = post_id;
        this.content      = content;
        this.comment_time = comment_time;
    }

    makeComment(query) {
        return query.insert({
            user_id: this.user_id,
            post_id: this.post_id,
            content: this.content,
            time   : this.comment_time
        });
    }
}

module.exports = Comment;