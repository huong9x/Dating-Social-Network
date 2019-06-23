class FindByUserId {
    constructor(user_id) {
        this.user_id = user_id;
    }

    buildSearchQuery(query) {
        return query.select('first_name', 'last_name', 'avatar', 'followers.*')
                    .from('users')
                    .join('followers', {'followers.friend_id': 'users.id'})
                    .where({'followers.user_id' : this.user_id, status: 'friend' }                                   
                    );
    }
}

module.exports = FindByUserId;