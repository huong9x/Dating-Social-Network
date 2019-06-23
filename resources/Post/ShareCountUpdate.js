class ShareCountUpdate {
    constructor(post_id, share_count) {
        this.post_id     = post_id;
        this.share_count = share_count;
    }

    buildUpdateQuery(query) {
        return query.where('posts.id', this.post_id)
                    .update('share_count', this.share_count);
    }
}

module.exports = ShareCountUpdate;
