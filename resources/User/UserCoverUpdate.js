class UserCoverUpdate {
    constructor(user_id, cover) {
        this.user_id = user_id;
        this.cover   = cover;
    }

    changeInformation(query) {
        return query.where('users.id', this.user_id)
                    .update('cover', this.cover);
    }
}

module.exports = UserCoverUpdate;
