const Friend = require('./Friend');

class FriendRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async send(request) {
        let newRequest = await request.make(this.knex('followers'));
        return newRequest[0];
    }

    async find(condition) {
        let friends = await condition.buildSearchQuery(this.knex);
        return friends.map((friend) => new Friend(friend));
    }

    async isFriend(user_id, friend_id) {
        let friend = await this.knex.select('*')
                                .from('followers')
                                .where({ user_id: user_id, friend_id: friend_id });
        if(friend.length) {
            return new Friend(friend[0]);
        }
        return null;
    }

    async listFriend(user_id) {
        let listFriend = await this.knex
                            .select('first_name', 'last_name', 'avatar', 'followers.*')
                            .from('users')
                            .join('followers', {'followers.friend_id': 'users.id'})
                            .where({
                                'followers.user_id' : user_id,
                                status: 'friend' }                                   
                            );
        return listFriend.map((friend) => new Friend(friend));
    }
}

module.exports = FriendRepository;
