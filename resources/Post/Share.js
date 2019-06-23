class Share {
    constructor(user_id, content, share_id, post_time) {
        this.postShare = {
            user_id: user_id,
            content: content,
            like_count: 0,
            comment_count: 0,
            share_count: 0,
            share_id: share_id,
            time: post_time
        };
    }
    make(query) {
        return query.insert(this.postShare)
    }
}

module.exports = Share;
