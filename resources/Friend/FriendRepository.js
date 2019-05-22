const Friend = require('./Friend');

class FriendRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async addFriend(user_id, friend_id) {
        let requestFriend = await this.knex('followers').insert([{ user_id: user_id, friend_id: friend_id, follower_status: 'pending'}]);
        console.log(requestFriend);
        return new Friend(requestFriend);
    }
    async unFriend(user_id, friend_id) {
        let notFriend = await this.knex('followers').where({ user_id: user_id, friend_id: friend_id }).del();
        return notFriend.length;
    }
    async listFriend(user_id) {
        let listFriend = await this.knex
                                    .select('first_name', 'last_name', 'followers.user_id', 'friend_id', 'follower_status', 'follower_id')
                                    .from('users')
                                    .join('followers', {'followers.friend_id': 'users.user_id'})
                                    .where({
                                        'followers.user_id' : user_id,
                                        follower_status: 'friend' }                                   
                                    );
        return listFriend.map((friend) => new Friend(friend));
    }
    async isFriend(user_id, friend_id) {
        let friend = await this.knex
                                .select('*')
                                .from('followers')
                                .where({ user_id: user_id, friend_id: friend_id });
        if(!friend.length) {
            throw new Error('Not a Friend');
        }
        return new Friend(friend[0]);
    }

}

module.exports = FriendRepository;