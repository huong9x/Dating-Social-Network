const { format } = require('timeago.js');

class Comment {
    constructor(rawComment) {
        this.comment_id   = rawComment.comment_id;
        this.user_id      = rawComment.user_id;
        this.post_id      = rawComment.post_id;
        this.comment_text = rawComment.comment_text;
        this.comment_time = rawComment.comment_time;
        this.fullname     = rawComment.first_name + ' ' + rawComment.last_name;
    }

    getCommentId() {
        return this.comment_id;
    }
    getUserId() {
        return this.user_id;
    }
    getFullName() {
        return this.fullname;
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