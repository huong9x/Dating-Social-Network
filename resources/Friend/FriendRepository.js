const Friend = require('./Friend');

class FriendRepository {
    constructor(knex) {
        this.knex = knex;
    }

    async sendFriendRequest(user_id, friend_id) {
        let requestFriend = await this.knex('followers').insert([{ user_id: user_id, friend_id: friend_id, follower_status: 'pending'},
                                                                 { user_id: friend_id, friend_id: user_id, follower_status: 'waiting'}]);
        return new Friend(requestFriend);
    }
    async addFriend(user_id, friend_id) {
        let friend = await this.knex('followers').where(function() {
                                                    this.where({ user_id: user_id, friend_id:friend_id})
                                                        .orWhere({ user_id: friend_id, friend_id: user_id })
                                                        })
                                                .update('follower_status', 'friend');
        return new Friend(friend);
    }
    async unFriend(user_id, friend_id) {
        let notFriend = await this.knex('followers').where(function() {
                this.where({ user_id: user_id, friend_id:friend_id})
                .orWhere({ user_id: friend_id, friend_id: user_id })
                }).del();
        return notFriend.length;
    }
    async listFriend(user_id) {
        let listFriend = await this.knex
                                    .select('first_name', 'last_name', 'user_avatar', 'followers.user_id', 'friend_id', 'follower_status', 'follower_id')
                                    .from('users')
                                    .join('followers', {'followers.friend_id': 'users.user_id'})
                                    .where({
                                        'followers.user_id' : user_id,
                                        follower_status: 'friend' }                                   
                                    );
        return listFriend.map((friend) => new Friend(friend));
    }
    async listFriendRequests(user_id) {
        let listFriendRequests = await this.knex
                                    .select('first_name', 'last_name', 'user_avatar', 'followers.user_id', 'friend_id', 'follower_status', 'follower_id')
                                    .from('users')
                                    .join('followers', {'followers.friend_id': 'users.user_id'})
                                    .where({
                                        'followers.user_id' : user_id,
                                        follower_status: 'waiting' }                                   
                                    );
        return listFriendRequests.map((friend) => new Friend(friend));

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

    async findRequestFollowers(user_id) {
        let findRequestFollowers = await this.knex
                                        .select('first_name', 'last_name', 'follower_id', 'followers.user_id', 'friend_id', 'follower_status')
                                        .from('followers')
                                        .join('users', {'users.user_id' : 'followers.friend_id'})
                                        .where({
                                            'followers.user_id' : user_id,
                                            follower_status : 'waiting'
                                        });
        return findRequestFollowers.map((friend) => new Friend(friend));
    }

}

module.exports = FriendRepository;
