const capitalize = require('capitalize-first-letter');
const createUser = function (rawUser) {
        this.user_id      = rawUser[0].user_id;
        this.first_name   = rawUser[0].first_name;
        this.last_name    = rawUser[0].last_name;
        this.birth_date   = rawUser[0].birth_date;
        this.gender       = rawUser[0].gender;
        this.email        = rawUser[0].email;
        this.relationship = rawUser[0].relationship;
        this.user_avatar  = rawUser[0].user_avatar;
        this.phone_number = rawUser[0].phone_number;
        this.address      = rawUser[0].address;
        this.password     = rawUser[0].password;
}

class User {
    constructor(rawUser) {
        this.user = new createUser(rawUser);
    }

    getUserId() {
        return this.user.user_id;
    }
    getUserPassword() {
        return this.user.password;
    }
    getName() {
        return capitalize(this.user.first_name);
    }
    getFirstName() {
        return this.user.first_name;
    }
    getLastName() {
        return this.user.last_name;
    }
    getPresentationName() {
        return capitalize(this.user.first_name + ' ' + this.user.last_name);
    }
    getBirthDate() {
        return this.user.birth_date.toISOString().split("T")[0];
    }
    getGender() {
        return this.user.gender;
    }
    getEmail() {
        return this.user.email;
    }
    getRelationship () {
        return this.user.relationship;
    }
    getUserAvatar() {
        return this.user.user_avatar;
    }
    getPhoneNumber() {
        return this.user.phone_number;
    }
    getAddress() {
        return this.user.address;
    }
}

module.exports = User;
