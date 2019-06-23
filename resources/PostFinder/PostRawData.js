class PostRawData {
    constructor(post_id) {
        this.post_id = post_id;
    }

    buildSearchQuery(query) {
        return query.select('posts.*', 'first_name', 'last_name', 'avatar')
                    .from('posts')
                    .join('users', {'users.id': 'posts.user_id'})
                    .where('posts.id', '=', this.post_id);
    }
}

module.exports = PostRawData;
