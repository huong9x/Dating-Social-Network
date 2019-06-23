class UserAvatarUpdate {
    constructor(user_id, avatar) {
        this.user_id = user_id;
        this.avatar  = avatar;
    }

    changeInformation(query) {
        return query.where('users.id', this.user_id)
                    .update('avatar', this.avatar);
    }
}

module.exports = UserAvatarUpdate;
