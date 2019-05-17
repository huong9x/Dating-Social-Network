const { format } = require('timeago.js');

class Comment {
    constructor(comment_id, user_id, post_id, comment_text, comment_time) {
        this.comment_id   = comment_id;
        this.user_id      = user_id;
        this.post_id      = post_id;
        this.comment_text = comment_text;
        this.comment_time = comment_time;
    }

    getCommentId() {
        return this.comment_id;
    }
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
    getCommentText() {
        return this.comment_text;
    }
    getCommentTime() {
        return format(this.comment_time, 'en_US');
    }
}

module.exports = Comment;