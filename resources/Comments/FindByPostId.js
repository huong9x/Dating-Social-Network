class FindByPostId {
    constructor(post_id) {
        this.post_id = post_id;
    }

    buildCondition(query) {
        return query.select(
                    'first_name',
                    'last_name',
                    'user_avatar',
                    'comment_id',
                    'comment.user_id',
                    'post_id',
                    'comment_text',
                    'comment_time'
                )
                .from('comment')
                .leftJoin('users', 'comment.user_id', 'users.user_id')
                .where({
                    post_id: this.post_id
                })
                .orderBy('comment_time', 'desc');
    }

}

module.exports = FindByPostId;