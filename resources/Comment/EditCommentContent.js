class EditCommentContent {
    constructor(comment_id, content) {
        this.comment_id = comment_id;
        this.content    = content;
    }
    editComment(query) {
        return query.update('content', this.content)
                    .where('comments.id', this.comment_id);
    }
}

module.exports = EditCommentContent;