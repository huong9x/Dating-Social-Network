class UserPasswordUpdate {
    constructor(user_id, password) {
        this.user_id  = user_id;
        this.password = password;
    }

    changeInformation(query) {
        return query.where('users.id', this.user_id)
                    .update('password', this.password);
    }
}

module.exports = UserPasswordUpdate;
