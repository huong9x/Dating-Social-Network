const capitalize = require('capitalize-first-letter');
class UserInfo {
    constructor(rawUser) {
        this.user_id         = rawUser.id;
        this.first_name      = rawUser.first_name;
        this.last_name       = rawUser.last_name;
        this.birth_date      = rawUser.birth_date;
        this.gender          = rawUser.gender;
        this.email           = rawUser.email;
        this.relationship    = rawUser.relationship;
        this.user_avatar     = rawUser.avatar;
        this.phone_number    = rawUser.phone_number;
        this.address         = rawUser.address;
        this.user_avatar     = rawUser.avatar;
        this.user_cover      = rawUser.cover;
    }

    getUserId() {
        return this.user_id;
    }
    getName() {
        return capitalize(this.first_name);
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getPresentationName() {
        return capitalize(this.first_name + ' ' + this.last_name);
    }
    getBirthDate() {
        return this.birth_date.toISOString().split("T")[0];
    }
    getGender() {
        return this.gender;
    }
    getEmail() {
        return this.email;
    }
    getRelationship () {
        return this.relationship;
    }
    getUserAvatar() {
        return this.user_avatar ? '/UserFiles/' + this.user_avatar : 'img/default-user.png';       
    }
    getUserCover() {
        return '/UserFiles/' + this.user_cover;
    }
    getPhoneNumber() {
        return this.phone_number;
    }
    getAddress() {
        return this.address;
    }
    getExistAvatar() {
        return this.user_avatar;
    }
}

module.exports = UserInfo;
