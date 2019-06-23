class PostMediaData {
    constructor(post_id) {
        this.post_id = post_id;
    }

    buildSearchQuery(query) {
        return query.select('*')
                    .from('medias')
                    .where('post_id', this.post_id)
    }
}

module.exports = PostMediaData;
