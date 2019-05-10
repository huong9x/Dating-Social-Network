
class UserInfo {
    constructor(user_id, username, password) {
        this.user_id  = user_id;
        this.username = username;
        this.password = password;
    }
    getPassword() {
        return this.password;
    }
    getUserId() {
        return this.user_id;
    }
}

module.exports = User;
