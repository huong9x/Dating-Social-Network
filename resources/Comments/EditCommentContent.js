class EditCommentContent {
    constructor(comment_id, content) {
        this.comment_id = comment_id;
        this.content    = content;
    }
    editComment(query) {
        return query.update('comment_text', this.content)
                    .where('comment_id', this.comment_id);
    }
}

module.exports = EditCommentContent;