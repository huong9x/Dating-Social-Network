
class Post {
    constructor(user_id, username, password) {
        this.user_id  = user_id;
        this.username = username;
        this.password = password;
    }
    
    getUserId() {
        return this.user_id;
    }
    getPostId() {
        return this.post_id;
    }
}

module.exports = User;
