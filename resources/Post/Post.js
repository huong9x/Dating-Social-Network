class Post {
    constructor(user_id, content, post_time) {
        this.data = {
            user_id: user_id,
            content: content,
            like_count: 0,
            comment_count: 0,
            share_count: 0,
            time: post_time
        };
    }
    make(query) {
        return query.insert(this.data)
    }
}

module.exports = Post;
