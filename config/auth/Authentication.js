const SearchByUsername = require('../../resources/User/SearchByUsername');
const SearchByUserId   = require('../../resources/User/SearchByUserId');

class Authenticator {
    constructor(userProvider, hasher, session) {
        this.userProvider = userProvider;
        this.hasher       = hasher;
        this.session      = session;
    }

    async attempt(username, password) {
        let attemptingUser = await this.userProvider.searchUser(new SearchByUsername(username));

        if (!attemptingUser) {
            throw new Error('Wrong User Name');
        }

        if (!await this.hasher.check(password, attemptingUser.getUserPassword())) {
            throw new Error('wrong Password');
        }

        return attemptingUser;
    }

    async register (user) {
        if(user) {
            return this.login(user);
        }
    }

    login(user) {
        this.session.loggedInUserId = user.getUserId();
    }

    logout() {
        this.session.loggedInUserId = null;
    }

    check() {
        return !!this.session.loggedInUserId;
    }

    guest() {
        return ! this.check();
    }

    async user() {
        if (!this.session.loggedInUserId) {
            throw new Error('User has not logged in yet');
        }
        return await this.userProvider.searchUser(new SearchByUserId(this.session.loggedInUserId));
    }
}

module.exports = Authenticator;