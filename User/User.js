
class User {
    constructor(username, password) {
        this.username     = username;
        this.password     = password;
    }
    getName() {
        return this.password;
    }
    getusername() {
        return this.username;
    }
}

module.exports = User;
