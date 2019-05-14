class Authenticator {
    constructor(userProvider, hasher, session) {
        this.userProvider = userProvider;
        this.hasher       = hasher;
        this.session      = session;
    }

    async attempt(username, password) {
        let attemptingUser = await this.userProvider.findByUsername(username);

        if (!attemptingUser) {
            throw new Error('Wrong User Name');
        }

        if (!await this.hasher.check(password, attemptingUser.getPassword())) {
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
        return await this.userProvider.getByUserId(this.session.loggedInUserId);
    }
}

module.exports = Authenticator;