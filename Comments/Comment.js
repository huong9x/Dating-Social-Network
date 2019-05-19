const { format } = require('timeago.js');

class Comment {
    constructor(rawComment) {
        // this.comment_id   = rawComment[0].comment_id;
        // this.user_id      = rawComment[0].user_id;
        // this.post_id      = rawComment[0].post_id;
        this.comment_text = rawComment.comment_text;
        // this.comment_time = rawComment[0].comment_time;
    }

    // getCommentId() {
    //     return this.comment_id;
    // }
    // getUserId() {
    //     return this.user_id;
    // }
    // getPostId() {
    //     return this.post_id;
    // }
    getCommentText() {
        return this.comment_text;
    }
    // getCommentTime() {
    //     return format(this.comment_time, 'en_US');
    // }
}

module.exports = Comment;