class FindByPostId {
    constructor(post_id) {
        this.post_id = post_id;
    }

    buildCondition(query) {
        return query.select(
                    'first_name',
                    'last_name',
                    'avatar',
                    'comments.id',
                    'comments.user_id',
                    'post_id',
                    'content',
                    'time'
                )
                .from('comments')
                .leftJoin('users', 'comments.user_id', 'users.id')
                .where({
                    post_id: this.post_id
                })
                .orderBy('time', 'desc');
    }

}

module.exports = FindByPostId;